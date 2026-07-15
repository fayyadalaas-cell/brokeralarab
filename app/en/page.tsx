import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinderEN from "@/app/components/BrokerFinderEN";

export const metadata: Metadata = {
  title: {
    absolute: "Best Brokers & Trading Reviews | Broker AlArab",
  },
  description:
    "Discover the best brokers through detailed reviews and broker comparisons, including regulation, fees, and trading platforms to help you choose the right broker with confidence.",
  keywords: [
    "Broker AlArab",
    "broker reviews",
    "broker comparison",
    "forex brokers",
    "best trading broker",
    "trusted brokers",
    "trading reviews",
    "broker comparisons",
    "Islamic account",
    "best brokers",
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
  title: "Best Brokers & Trading Reviews | Broker AlArab",
  description:
    "Discover the best brokers through detailed reviews and broker comparisons, including regulation, fees, and trading platforms to help you choose the right broker with confidence.",
  url: "https://brokeralarab.com/en",
  siteName: "Broker AlArab",
  type: "website",
  locale: "en_US",
  images: [
    {
      url: "https://brokeralarab.com/og-image.png",
      width: 1560,
      height: 377,
      alt: "Broker Alarab",
    },
  ],
},
twitter: {
  card: "summary_large_image",
  title: "Best Brokers & Trading Reviews | Broker AlArab",
  description:
    "Discover the best brokers through detailed reviews and broker comparisons, including regulation, fees, and trading platforms to help you choose the right broker with confidence.",
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
        status
      `)
      .eq("status", "upcoming")
      .not("title_en", "is", null)
      .not("slug", "is", null)
      .gte("end_date", today)
      .order("start_date", { ascending: true })
      .limit(3),
  ]);

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.slug && b.name);
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
      name: "How do I choose the right trading broker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose a broker based on regulation, minimum deposit, trading platforms, account types, fees, and whether an Islamic account is available if that matters to you.",
      },
    },
    {
      "@type": "Question",
      name: "Is a low minimum deposit always better?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A low minimum deposit can help beginners, but you should also consider regulation strength, execution quality, platform options, and total trading costs.",
      },
    },
    {
      "@type": "Question",
      name: "Are broker comparisons important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Broker comparisons save time and highlight the real differences between brokers in fees, regulation, account types, and platforms.",
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
          <div className="relative mx-auto w-full max-w-[1560px] px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
           <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_430px] xl:grid-cols-[minmax(0,1fr)_470px] xl:gap-12">
              
              {/* BROKER LOGOS - DESKTOP ONLY */}
              <div className="order-2 hidden h-full lg:block">
                <div className="relative mx-auto h-full max-w-[430px]">
                  <div className="absolute -inset-6 rounded-[42px] bg-gradient-to-br from-brand-100/70 via-blue-100/20 to-transparent blur-2xl" />

                  <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,#0b1f3a_0%,#102f59_58%,#174f8f_100%)] p-5 shadow-[0_28px_75px_rgba(6,25,53,0.28)]">
                    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="text-left">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-black text-blue-100">
                          Reviewed Brokers
                        </span>

                        <h2 className="mt-2 text-[20px] font-black text-white">
                          Trusted brokers in one place
                        </h2>

                        <p className="mt-1 text-[11px] font-semibold text-blue-100/75">
                          Compare ratings, regulation and account options
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
                          className="group flex h-[86px] items-center justify-center rounded-[20px] border border-white/15 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_34px_rgba(0,0,0,0.18)]"
                        >
                          {broker.logo ? (
                            <img
                              src={broker.logo}
                              alt={`${broker.name} logo`}
                              className="max-h-[72px] max-w-[125px] object-contain transition duration-300 group-hover:scale-105"
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
                          Independent reviews and updated data
                        </div>

                        <div className="mt-1 text-[10px] font-semibold text-blue-100/75">
                          Rankings are not based on payment or advertising
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
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[11px] font-black text-[#174f9f] shadow-[0_10px_28px_rgba(15,79,168,0.14)] backdrop-blur sm:text-xs">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50">
                    ✓
                  </span>
                  Independent broker reviews and comparisons
                </span>

                <h1 className="mt-4 text-[34px] font-black leading-[1.1] tracking-[-0.035em] text-[#07111f] sm:text-[46px] lg:text-[52px] xl:text-[58px]">
                  Best Trading Brokers

                  <span className="mt-1 hidden leading-[1.18] text-brand-600 sm:block sm:text-[36px] lg:text-[40px] xl:text-[44px]">
                    Broker Reviews, Fees and Regulation
                  </span>
                </h1>

                <p className="mx-auto mt-3 max-w-[760px] text-[14px] font-semibold leading-7 text-slate-700 sm:text-[16px] sm:leading-8 lg:mx-0">
                  Compare the best trading brokers by regulation, spreads,
                  trading fees, withdrawal speed, platforms and account
                  conditions, then choose a trusted broker that matches your needs.
                </p>

                {/* TRUST POINTS */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-extrabold text-[#174f9f] sm:text-[12px] lg:justify-start">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-[10px] shadow-sm">
                      ✓
                    </span>
                    Independent reviews
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-[10px] shadow-sm">
                      ✓
                    </span>
                    Regulation comparison
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-[10px] shadow-sm">
                      ✓
                    </span>
                    Updated broker data
                  </span>
                </div>

                <div className="mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                  <a
                    href="#finder"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-brand-500 px-7 text-[14px] font-black text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                  >
                    Find the Best Broker
                  </a>

                  <Link
                    href="/en/compare"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 text-[14px] font-black text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-600"
                  >
                    Browse Comparisons
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["50+", "Brokers reviewed"],
                    ["150+", "Rating criteria"],
                    ["10", "Trading tools"],
                    ["18+", "Regulators covered"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="group rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 text-center shadow-[0_10px_28px_rgba(15,79,168,0.11)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_16px_34px_rgba(15,79,168,0.16)]"
                    >
                      <div className="text-[19px] font-black text-brand-600 transition duration-300 group-hover:scale-105 sm:text-[20px]">
                        {value}
                      </div>

                      <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:text-[11px]">
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
  className="scroll-mt-24 mx-auto max-w-7xl px-0 py-3 sm:py-4"
>
  <BrokerFinderEN brokers={brokers} />
</section>

    {/* HOW WE RATE - CLEAN TRUST SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {(() => {
      const ratingItems = [
        {
          num: "01",
          title: "Regulation & Fund Protection",
          desc: "We review licensing, regulatory strength, and how client funds are protected.",
        },
        {
          num: "02",
          title: "Fees, Spreads & Commissions",
          desc: "We compare spreads, commissions, and the real cost of trading forex and CFDs.",
        },
        {
          num: "03",
          title: "Trading Platforms & Execution",
          desc: "We assess MT4, MT5, platform usability, execution quality, and trading tools.",
        },
        {
          num: "04",
          title: "Deposits & Withdrawals",
          desc: "We compare payment methods, withdrawal speed, processing times, and transparency.",
        },
        {
          num: "05",
          title: "Swap-Free Account Options",
          desc: "We check whether swap-free accounts are available and how they work in practice.",
        },
        {
          num: "06",
          title: "Support & User Experience",
          desc: "We evaluate customer support, account setup, accessibility, and overall usability.",
        },
      ];

      return (
        <>
          {/* DESKTOP */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[1fr_270px] gap-5 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-5">
              <div>
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
                  Broker Rating Methodology
                </span>

                <h2 className="mt-4 text-[36px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f]">
                  How We Choose the Best Trading Brokers
                </h2>

                <p className="mt-3 max-w-3xl text-[15px] font-semibold leading-9 text-slate-600">
                  We review trading brokers based on regulation, fees, spreads,
                  withdrawal speed, trading platforms, swap-free accounts, and
                  the real trader experience before recommending any trusted
                  forex or CFD broker.
                </p>
              </div>

             <div className="flex flex-col justify-center rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
  <div className="mt-1.5 text-[18px] font-black leading-6 text-[#07111f]">
    Practical broker reviews for smarter trading decisions
  </div>

  <div className="mt-5 grid gap-2">
    <Link
      href="/en/how-we-review-brokers"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:bg-brand-600"
    >
      View Our Rating Methodology
    </Link>

    <Link
      href="/en/brokers"
      className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:text-brand-600"
    >
      Browse All Reviews
    </Link>
  </div>
</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-5">
              {ratingItems.map((item) => (
                <div
                  key={item.num}
                  className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-[12px] font-black text-brand-600 ring-1 ring-[#bfdbfe]">
                      {item.num}
                    </span>

                    <div>
                      <h3 className="text-[18px] font-black leading-6 text-[#07111f]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            <div className="border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] to-[#eef5ff] px-4 py-4 text-center">
              <h2 className="mx-auto mt-3 max-w-[320px] text-[24px] font-black leading-[1.2] tracking-[-0.02em] text-[#07111f]">
                How We Choose the Best Trading Brokers
              </h2>

              <p className="mx-auto mt-2 max-w-[320px] text-[12px] font-semibold leading-6 text-slate-600">
                We review regulation, fees, platforms, withdrawals, and account
                conditions before recommending any broker.
              </p>

             <div className="mt-3 grid gap-2">
  <Link
    href="/en/how-we-review-brokers"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-10 items-center justify-center rounded-2xl bg-brand-500 px-4 text-[11px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)]"
  >
    View Our Rating Methodology
  </Link>

  <Link
    href="/en/brokers"
    className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-[11px] font-black text-slate-800"
  >
    All Reviews
  </Link>
</div>
            </div>

            <div className="grid grid-cols-1 gap-2 bg-white p-3.5">
              {ratingItems.map((item) => (
                <div
                  key={item.num}
                  className="rounded-[18px] border border-slate-200 bg-[#fbfdff] px-3.5 py-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-600 ring-1 ring-[#bfdbfe]">
                      {item.num}
                    </span>

                    <div>
                      <h3 className="text-[14px] font-black leading-5 text-[#07111f]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
            Broker Comparisons
          </span>

          <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
            Most Popular Broker Comparisons
          </h2>

          <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
            Explore the most popular trading broker comparisons and understand
            the differences in regulation, account types, fees, spreads, and
            platforms such as MT4 and MT5 before choosing the best broker for
            your trading needs.
          </p>
        </div>

        <div className="flex justify-center lg:self-center lg:pr-2">
          <Link
            href="/en/compare"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
          >
            Browse All Comparisons
          </Link>
        </div>
      </div>
    </div>

    {/* MOBILE */}
    <div className="grid gap-3 p-4 md:hidden">
      {topComparisons.map((cmp, index) => (
        <article
          key={cmp.id}
          className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="h-1 bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

          <div className="p-3.5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                #{index + 1} Most Viewed
              </span>

              <span className="text-[11px] font-bold text-slate-400">
                {cmp.views_count ?? 0} views
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
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
                  className="mt-2 text-[15px] font-black leading-none text-[#0f172a] transition hover:text-brand-500"
                >
                  {cmp.broker_1?.name_en || cmp.broker_1?.name || "Broker 1"}
                </Link>

              <span
  aria-label={`${cmp.broker_1?.name_en || cmp.broker_1?.name || "Broker 1"} rating ${cmp.broker_1?.rating?.toFixed(1) ?? "not available"} out of 5`}
  className="mt-2 text-[12px] font-bold text-[#f59e0b]"
>
  ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
</span>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[11px] font-extrabold text-brand-500 shadow-sm">
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
                  className="mt-2 text-[15px] font-black leading-none text-[#0f172a] transition hover:text-brand-500"
                >
                  {cmp.broker_2?.name_en || cmp.broker_2?.name || "Broker 2"}
                </Link>

                <span
  aria-label={`${cmp.broker_2?.name_en || cmp.broker_2?.name || "Broker 2"} rating ${cmp.broker_2?.rating?.toFixed(1) ?? "not available"} out of 5`}
  className="mt-1 text-[12px] font-bold text-[#f59e0b]"
>
  ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
</span>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href={`/en/compare/${cmp.slug}`}
                className="mt-3 flex w-full items-center justify-center rounded-xl bg-brand-500 py-2.5 text-[14px] font-bold text-white hover:bg-brand-600"
              >
                {`Compare ${cmp.broker_1?.name_en || cmp.broker_1?.name} vs ${
                  cmp.broker_2?.name_en || cmp.broker_2?.name
                }`}
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
          className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
        >
          <div className="h-1 bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

          <div className="p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">
                #{index + 1} Most Viewed
              </span>

              <span className="text-[12px] font-bold text-slate-400">
                {cmp.views_count ?? 0} views
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

<span
  aria-label={`${cmp.broker_1?.name_en || cmp.broker_1?.name || "Broker 1"} rating ${cmp.broker_1?.rating?.toFixed(1) ?? "not available"} out of 5`}
  className="mt-2 text-[12px] font-bold text-[#f59e0b]"
>
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

                <span
  aria-label={`${cmp.broker_2?.name_en || cmp.broker_2?.name || "Broker 2"} rating ${cmp.broker_2?.rating?.toFixed(1) ?? "not available"} out of 5`}
  className="mt-2 text-[12px] font-bold text-[#f59e0b]"
>
  ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
</span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={`/en/compare/${cmp.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-[15px] font-extrabold text-white transition hover:bg-brand-600"
              >
                {`Compare ${cmp.broker_1?.name_en || cmp.broker_1?.name} vs ${
                  cmp.broker_2?.name_en || cmp.broker_2?.name
                }`}
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
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
              By Country
            </span>

            <h2 className="mt-3 text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
              Best Trading Brokers by Country
            </h2>

            <p className="mx-auto mt-3 max-w-[880px] text-[13px] font-semibold leading-7 text-slate-600 sm:text-[15px] sm:leading-8 lg:mx-0">
              Compare forex and CFD brokers by country, including regulation,
              platforms, fees, spreads, deposits, withdrawals, and account conditions.
            </p>
          </div>

          <div className="hidden lg:flex">
            <Link
              href="/en/best-brokers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
            >
              All Other Countries
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

{/* LOWEST SPREAD HOME SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <div className="relative">
      {/* DESKTOP HEADER */}
      <div className="hidden border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4 lg:block">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
              Low Spread Trading Accounts
            </span>

            <h2 className="mt-4 text-[36px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f]">
              Lowest Real Spreads by Account Type
            </h2>

            <p className="mt-3 max-w-[860px] text-[15px] font-semibold leading-9 text-slate-600">
              Compare the lowest spread brokers by account type, including
              Standard, Raw Spread, ECN, and Cent accounts. This section helps
              forex and CFD traders understand real trading costs before choosing
              the right broker account.
            </p>
          </div>

          <div className="hidden shrink-0 justify-center md:flex lg:self-center lg:pr-4">
            <Link
              href="/en/lowest-spread-brokers"
              className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
            >
              Lowest Spread Brokers
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="relative px-4 py-6 sm:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent_28%)]" />

        <div className="relative">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="text-left lg:max-w-4xl">
              <h2 className="text-[28px] font-black leading-[1.15] tracking-[-0.02em] text-slate-950 sm:text-[34px] lg:text-[42px]">
                Lowest Real Spreads
                <span className="text-brand-500"> by Account Type</span>
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                Compare Standard, Raw, ECN, and Cent accounts to find the most
                suitable low-spread broker account for your trading style.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/en/lowest-spread-brokers"
                className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
              >
                Lowest Spread Brokers
              </Link>
            </div>
          </div>

          {/* MOBILE ROWS */}
          <div className="mt-6 w-full sm:hidden">
            <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
              {[
                {
                  title: "Best Standard Accounts",
                  suitable: "For beginners",
                },
                {
                  title: "Best Raw Spread Accounts",
                  suitable: "For scalping",
                },
                {
                  title: "Best ECN Accounts",
                  suitable: "Fast execution",
                },
                {
                  title: "Best Cent / Micro Accounts",
                  suitable: "Small capital",
                },
              ].map((item, index) => (
                <a
                  key={item.title}
                  href="/en/lowest-spread-brokers#account-types"
                  className={`block px-4 py-3.5 transition hover:bg-brand-50/30 ${
                    index !== 0 ? "border-t border-slate-200" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 text-left">
                      <div className="text-[14px] font-black text-slate-950">
                        {item.title}
                      </div>
                    </div>

                    <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-500 px-4 py-2 text-[11px] font-extrabold text-white">
                      View
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP / TABLET ROWS */}
      <div className="hidden p-5 sm:block">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Standard Accounts",
              desc: "Simple trading accounts with clear pricing and no complex cost structure.",
              tag: "Beginners",
            },
            {
              title: "Low Spread Accounts",
              desc: "Lower spreads with a separate commission for more accurate trading costs.",
              tag: "Scalping",
            },
            {
              title: "Professional ECN Accounts",
              desc: "Designed for traders who need faster execution and deeper market access.",
              tag: "Fast Execution",
            },
            {
              title: "Cent / Micro Accounts",
              desc: "Suitable for testing strategies or starting with smaller trading capital.",
              tag: "Small Capital",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href="/en/lowest-spread-brokers#account-types"
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-full flex-col">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-80" />

                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-500">
                    {item.tag}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                    →
                  </span>
                </div>

                <h3 className="text-[19px] font-black leading-6 text-[#07111f]">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-[60px] text-[13px] font-medium leading-7 text-slate-600">
                  {item.desc}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[12px] font-bold text-slate-400">
                    Compare accounts
                  </span>

                  <span className="inline-flex items-center gap-1 text-[13px] font-black text-brand-500 transition group-hover:translate-x-1">
                    View details
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

   {/* HOW TO CHOOSE A BROKER - PREMIUM SEO SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
            Broker Selection Guide
          </span>

          <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
            How to Choose the Best Trading Broker for You?
          </h2>

          <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
            Choosing the best forex or CFD broker is not about popularity alone.
            You should compare regulation, trading fees, spreads, platforms,
            deposits, withdrawals, account types, and real trading conditions before
            opening a live account.
          </p>
        </div>

        <div className="hidden shrink-0 justify-center md:flex lg:self-center lg:pr-4">
          <Link
            href="/en/best-brokers"
            className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
          >
            Best Brokers
          </Link>
        </div>
      </div>
    </div>

    {/* MOBILE */}
    <div className="px-4 py-4 sm:hidden">
      <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
        <p className="text-sm leading-8 text-slate-600">
          The best trading broker is not always the most advertised one. A good
          broker should combine strong regulation, transparent fees, reliable
          platforms, and smooth deposit and withdrawal options.
        </p>

        <details className="mt-4 overflow-hidden rounded-[18px] border border-slate-200 bg-white">
          <summary className="cursor-pointer list-none px-4 py-3.5 text-center text-sm font-extrabold text-brand-600">
            Read More
          </summary>

          <div className="space-y-4 border-t border-slate-200 px-4 py-4 text-sm leading-7 text-slate-600">
            <p>
              Start with <strong>regulation and licensing</strong>. A trusted
              regulator is one of the strongest signals of broker transparency and
              client fund protection.
            </p>

            <p>
              Then compare the <strong>real trading cost</strong>, including
              spreads, commissions, swap fees, and any additional charges that may
              affect your results.
            </p>

            <p>
              You should also evaluate the <strong>trading platform</strong>,
              whether you prefer MT4, MT5, WebTrader, or a mobile trading app.
            </p>

            <p>
              Finally, check <strong>account types</strong>, deposit methods,
              withdrawal speed, customer support, and whether the broker fits your
              country and trading style.
            </p>
          </div>
        </details>
      </div>
    </div>

    {/* DESKTOP */}
    <div className="hidden p-5 sm:block">
      <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
        {/* ARTICLE */}
        <div className="lg:col-span-8">
          <article className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-55" />

            <div className="space-y-4 text-[15px] font-medium leading-[2.05] text-slate-600">
              <p>
                If you are looking for the <strong>best trading broker</strong>,
                your decision should not be based only on brand awareness or online
                advertising. A reliable broker should offer strong regulation,
                transparent pricing, stable execution, suitable platforms, and clear
                account conditions.
              </p>

              <p>
                The first factor to check is <strong>regulation</strong>. Brokers
                regulated by recognized authorities usually follow stricter standards
                for transparency, reporting, and client fund handling.
              </p>

              <p>
                The second factor is the <strong>real cost of trading</strong>.
                Many traders focus only on spreads, but the full cost may include
                commissions, swap charges, inactivity fees, deposit fees, or withdrawal
                fees.
              </p>

              <p>
                The <strong>trading platform</strong> also matters. Some traders
                prefer MT4 for simplicity, others prefer MT5 for advanced tools, while
                many traders rely heavily on mobile apps and WebTrader access.
              </p>

              <p>
                Account types are also important. Beginners may prefer low minimum
                deposits and simple Standard accounts, while active traders may look
                for Raw Spread, ECN, or low-commission accounts with faster execution.
              </p>

              <p>
  Finally, always compare brokers based on your own trading goals rather
  than marketing claims. The best broker for a beginner may not be the best
  choice for an experienced trader, so checking support quality, withdrawals,
  platforms, and real account conditions is essential before making a decision.
</p>
            </div>
          </article>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
              <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] to-white px-5 py-5">
                <h3 className="text-[22px] font-black leading-[1.45] text-[#07111f]">
                  What should you check before opening an account?
                </h3>
              </div>

              <div className="px-6 pb-6 pt-5">
                <div className="space-y-3">
                  {[
                    "Regulation and license strength",
                    "Spreads, commissions, and fees",
                    "Trading platform and execution",
                    "Deposit and withdrawal methods",
                    "Account types and minimum deposit",
                    "Customer support and user experience",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-brand-100 hover:bg-[#fcfdff] hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-xs font-black text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                        {index + 1}
                      </span>

                      <span className="text-sm font-bold leading-6 text-[#0f172a]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
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
    <div className="grid gap-3 p-4 sm:hidden">
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
          className="rounded-[16px] border border-slate-200 bg-[#f8fbff] px-4 py-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-100 bg-white text-[11px] font-black text-brand-600">
              {index + 1}
            </span>

            <h3 className="text-[15px] font-black leading-6 text-[#0f172a]">
              {item.title}
            </h3>
          </div>

          <p className="mt-2 text-[13px] leading-6 text-slate-600">
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

{/* EVENTS SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm">
            Forex & FinTech Events
          </span>

          <h2 className="mx-auto mt-3 max-w-[320px] text-[26px] font-black leading-[1.15] text-[#07111f] sm:max-w-none sm:text-[36px]">
            Major Forex and FinTech Expos in 2026
          </h2>

          <p className="mx-auto mt-3 max-w-[320px] text-[13px] font-semibold leading-7 text-slate-600 sm:max-w-[900px] sm:text-[15px] sm:leading-8 lg:mx-0">
            Follow key forex, trading, fintech, and online brokerage events bringing together brokers, fintech providers, investors, IBs, prop firms, and financial brands worldwide.
          </p>
        </div>

        <Link
          href="/en/events"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-600 lg:mx-0"
        >
          View All Events
        </Link>
      </div>
    </div>

    <div className="grid gap-3 p-3 md:grid-cols-3 lg:gap-4 lg:p-5">
      {eventList.map((event) => {
        const count = eventCountdown(event.start_date, event.end_date);
        const eventTitle = (event.title_en || "Trading Expo")
  .replace(/\s*2026\s*/i, " ")
  .trim();

const eventLocation =
  event.city_en?.trim() ||
  event.country_en?.trim() ||
  "";

        return (
          <article
            key={event.id}
            className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)] sm:rounded-[24px]"
          >
          <div className="relative flex min-h-[78px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-3 py-3 text-center sm:min-h-[90px] sm:px-4 sm:py-4">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.20),transparent_48%)]" />

  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />

  <div className="relative flex flex-col items-center justify-center">
    <h3 className="text-[16px] font-black leading-5 text-white sm:text-[18px] sm:leading-6">
      {eventTitle}
    </h3>

    <div className="mt-1 min-h-[20px] text-[12px] font-black text-white/85 sm:text-[13px]">
      {eventLocation || "\u00A0"}
    </div>
  </div>
</div>

            {count.status === "live" ? (
              <div className="flex h-[64px] flex-col items-center justify-center border-b border-emerald-100 bg-emerald-50 px-3 text-center sm:h-[76px]">
                <div className="text-[20px] font-black text-emerald-600 sm:text-[22px]">
                  Live Now
                </div>
                <div className="mt-0.5 text-[10px] font-bold text-emerald-700 sm:mt-1 sm:text-[11px]">
                  Event is currently taking place
                </div>
              </div>
            ) : (
              <div className="grid h-[64px] grid-cols-2 border-b border-slate-100 bg-[#f8fbff] sm:h-[76px]">
                <div className="border-r border-slate-100 px-3 py-2 text-center sm:py-3">
                  <div className="text-[21px] font-black text-brand-600 sm:text-[24px]">
                    {count.days}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
                    Days
                  </div>
                </div>

                <div className="px-3 py-2 text-center sm:py-3">
                  <div className="text-[21px] font-black text-brand-600 sm:text-[24px]">
                    {count.hours}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
                    Hours
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-1 flex-col p-3.5 sm:p-5">
              <div className="flex h-[58px] flex-col items-center justify-center gap-1 text-center text-[12px] font-bold leading-5 text-slate-700 sm:h-[96px] sm:gap-2 sm:text-[13px] sm:leading-6">
                <div>{formatEventDate(event.start_date, event.end_date)}</div>

                <div>
                  {event.city_en}
                  {event.country_en ? `, ${event.country_en}` : ""}
                </div>

                <div className="hidden sm:block">
                  {event.venue_en || "To be announced"}
                </div>
              </div>

              <p className="mt-4 hidden h-[84px] overflow-hidden text-center text-[13px] leading-7 text-slate-600 sm:block">
                {event.excerpt_en || "Event details will be updated soon."}
              </p>

              <Link
                href={`/en/events/${event.slug}`}
                className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-brand-500 px-4 py-2.5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.18)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:py-3 sm:text-[14px]"
              >
                View Event Details
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>

{/* FAQ */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="text-center lg:text-left">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
          Frequently Asked Questions
        </span>

        <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
          Common Questions Before Choosing a Broker
        </h2>

        <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
          Answers to key questions about broker regulation, safety, spreads,
          MT4, MT5, account types, minimum deposits, and broker comparisons.
        </p>
      </div>
    </div>

    {(() => {
      const faqItems = [
        {
          q: "How do I choose the best trading broker?",
          a: (
            <>
              The best broker depends on your country, trading style, platform,
              fees, and regulation. Start with our{" "}
              <Link href="/en/best-brokers" className="font-bold text-brand-500 hover:underline">
                Best Brokers
              </Link>{" "}
              page to compare trusted options.
            </>
          ),
        },
        {
          q: "What is the safest regulated broker?",
          a: "The safest brokers are usually regulated by respected authorities such as FCA, ASIC, CySEC, or FSCA. Always verify the license before opening an account.",
        },
        {
          q: "Which broker has the lowest spreads?",
          a: (
            <>
              Low spreads depend on the account type. Raw Spread and ECN accounts
              often have tighter spreads. See our{" "}
              <Link href="/en/lowest-spread-brokers" className="font-bold text-brand-500 hover:underline">
                Lowest Spread Brokers
              </Link>{" "}
              page for more details.
            </>
          ),
        },
        {
          q: "How much money do I need to start trading?",
          a: "Some brokers allow deposits from $5 to $100, but beginners should focus on risk management and avoid trading with money they cannot afford to lose.",
        },
        {
          q: "What is the difference between MT4 and MT5?",
          a: "MT4 is simple and widely used, while MT5 has more advanced tools, extra timeframes, and additional features. The best choice depends on your trading style.",
        },
        {
          q: "How can I verify a broker's regulation?",
          a: "Check the broker’s license number on its website, then verify it directly on the regulator’s official website.",
        },
        {
          q: "What is the difference between Standard and ECN accounts?",
          a: "Standard accounts usually include trading costs inside the spread. ECN accounts usually offer lower spreads with a separate commission.",
        },
        {
          q: "Where can I compare brokers side by side?",
          a: (
            <>
              Visit our{" "}
              <Link href="/en/compare" className="font-bold text-brand-500 hover:underline">
                Broker Comparison
              </Link>{" "}
              section to compare regulation, fees, platforms, spreads, and account types.
            </>
          ),
        },
        {
          q: "Are low-deposit brokers good for beginners?",
          a: "Low-deposit brokers can help beginners start with less capital, but regulation, fees, platform quality, and withdrawal reliability are more important than deposit size alone.",
        },
        {
          q: "Should I choose a broker by country?",
          a: "Yes. Broker availability, payment methods, leverage, and regulation can vary by country, so country-based broker rankings can help you narrow your options.",
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
                {faqItems.slice(0, 5).map((item, index) => (
                  <FAQItem key={item.q} item={item} index={index} />
                ))}
              </div>

              <div className="space-y-3">
                {faqItems.slice(5, 10).map((item, index) => (
                  <FAQItem key={item.q} item={item} index={index + 5} />
                ))}
              </div>
            </div>
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* FEATURED BROKERS BEFORE FOOTER - DESKTOP ONLY */}
<section className="mx-auto hidden max-w-7xl px-4 pb-0 pt-3 sm:px-6 md:block lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-6 text-center">
      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-600 shadow-sm">
        ⭐ Best Brokers 2026
      </span>

      <h2 className="mt-3 text-[30px] font-black leading-[1.15] text-[#07111f] lg:text-[36px]">
        Broker Alarab Recommended Brokers
      </h2>

      <p className="mx-auto mt-2 max-w-3xl text-[13px] font-semibold leading-7 text-slate-600 lg:text-[14px]">
        A curated list of the highest-rated trading brokers based on regulation, fees, accounts, platforms, and user experience.
      </p>

      <Link
        href="/en/brokers"
        className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] hover:bg-brand-600"
      >
        View All Brokers
      </Link>
    </div>

    <div className="grid gap-3 bg-white px-4 pb-2 pt-4 md:grid-cols-5">
      {footerFeaturedBrokers.map((broker, index) => {
        const rankBadges = ["👑", "🥈", "🥉", "#4", "#5"];

        return (
          <article
            key={broker.id}
            className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#fbfdff] p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_18px_38px_rgba(15,23,42,0.10)]"
          >
            <div className="absolute inset-x-0 top-0 h-[6px] rounded-t-[26px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

            <div className="mb-3 flex items-center justify-between gap-2 pt-1">
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-brand-50 px-2 text-[11px] font-black text-brand-600 ring-1 ring-brand-100">
                {rankBadges[index]}
              </span>
            </div>

            <Link
              href={`/en/brokers/${broker.slug}`}
              className="mx-auto flex h-[76px] w-[94px] items-center justify-center rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_8px_22px_rgba(15,23,42,0.06)]"
            >
              <img
                src={broker.logo || ""}
                alt={broker.name_en || broker.name || "Trading broker"}
                className="max-h-[68px] max-w-[96%] object-contain transition duration-300 group-hover:scale-[1.12]"
              />
            </Link>

            <Link
              href={`/en/brokers/${broker.slug}`}
              className="mt-3 block truncate text-[18px] font-black text-slate-950 hover:text-brand-500"
            >
              {broker.name_en || broker.name}
            </Link>

            <p className="mt-1 line-clamp-1 text-[11px] font-bold text-slate-500">
              {broker.best_for_en || broker.best_for || "Trusted trading broker"}
            </p>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <div className="text-[22px] font-extrabold leading-none text-brand-600">
                {broker.rating?.toFixed(1) ?? "—"}
              </div>
              <div className="mt-1 text-[10px] font-black text-slate-500">
                Overall rating
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={`/en/brokers/${broker.slug}`}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-[11px] font-black text-slate-700 hover:bg-slate-50"
              >
                Review
              </Link>

             <a
  href={broker.real_account_url || `/en/brokers/${broker.slug}`}
  target="_blank"
  rel="nofollow sponsored noopener noreferrer"
  className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-500 text-[11px] font-black text-white hover:bg-brand-600"
>
  Open Account
</a>
            </div>
          </article>
        );
      })}
    </div>
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
        Browse reviews of leading forex and CFD brokers.
      </p>
    </div>

    {/* BROKER LIST */}
    <div className="border-b border-slate-200 bg-white px-3 py-2">
      <div className="space-y-1.5">
        {sidebarBrokers.map((broker, index) => {
          const isFeatured = index === 0;

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
                  ? "border border-[#0f2747] bg-gradient-to-r from-white via-[#f8fbff] to-[#edf5ff] shadow-[0_12px_28px_rgba(15,39,71,0.12)]"
                  : "border border-transparent hover:border-slate-200 hover:bg-[#f8fbff]"
              }`}
            >
              <div className="flex h-[48px] w-[104px] shrink-0 items-center justify-center rounded-[14px] border border-slate-200 bg-white px-2 shadow-sm">
                {broker.logo ? (
                  <img
                    src={broker.logo}
                    alt={`${broker.name_en || broker.name} logo`}
                    className="max-h-[52px] max-w-[112px] object-contain transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-[10px] font-black text-slate-700">
                    {broker.name_en || broker.name}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 text-left">
                {isFeatured && (
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full border border-[#0f2747] bg-white px-2 py-0.5 text-[8px] font-black text-[#0f2747]">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    Featured Partner
                  </span>
                )}

                <div className="truncate text-[12px] font-black text-[#07111f]">
                  {broker.name_en || broker.name}
                </div>

                <div className="mt-1 text-[9px] font-black text-[#f59e0b]">
                  ★ {broker.rating?.toFixed(1) ?? "—"}
                </div>
              </div>

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] font-black transition ${
                  isFeatured
                    ? "bg-brand-500 text-white shadow-[0_8px_18px_rgba(37,99,235,0.22)]"
                    : "bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white"
                }`}
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>

    {/* REGULATORS */}
    <div className="mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] to-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-black text-[#07111f]">
              Broker Regulation
            </h3>

            <p className="mt-1 text-[9px] font-medium text-slate-500">
              Learn about major financial regulators.
            </p>
          </div>

          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50">
            🛡
          </span>
        </div>
      </div>

      {[
        ["FCA", "UK Regulation", "/en/regulators/fca"],
        ["ASIC", "Australian Regulation", "/en/regulators/asic"],
        ["DFSA", "Dubai Regulation", "/en/regulators/dfsa"],
        ["CySEC", "Cyprus Regulation", "/en/regulators/cysec"],
        ["FSCA", "South Africa Regulation", "/en/regulators/fsca"],
      ].map(([code, title, href]) => (
        <Link
          key={code}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-[#f8fbff]"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex min-w-[46px] items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700">
              {code}
            </span>

            <span className="text-[11px] font-bold text-slate-700">
              {title}
            </span>
          </div>

          <span className="text-brand-500">→</span>
        </Link>
      ))}

      <Link
        href="/en/licenses"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-emerald-50 px-4 py-3 text-[11px] font-black text-emerald-700"
      >
        View All Regulators →
      </Link>
    </div>

    {/* TRADING TERMS */}
    <div className="mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] to-white px-4 py-3">
        <h3 className="text-[15px] font-black text-[#07111f]">
          Essential Trading Terms
        </h3>

        <p className="mt-1 text-[9px] font-medium text-slate-500">
          Understand the basics before you trade.
        </p>
      </div>

      {[
        ["Spread", "/en/learn-trading/spread"],
        ["Financial Leverage", "/en/learn-trading/leverage"],
        ["Margin", "/en/learn-trading/margin"],
        ["Lot Size", "/en/learn-trading/lot-size"],
        ["Stop Loss", "/en/learn-trading/stop-loss"],
      ].map(([title, href]) => (
        <Link
          key={title}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-[#f8fbff]"
        >
          <span className="text-[11px] font-bold text-slate-700">
            {title}
          </span>

          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            →
          </span>
        </Link>
      ))}

      <Link
        href="/en/learn-trading"
        className="flex items-center justify-center bg-brand-50 px-4 py-3 text-[11px] font-black text-brand-600"
      >
        Browse Trading Education →
      </Link>
    </div>

    {/* CALCULATORS */}
    <div className="mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] to-white px-4 py-3">
        <h3 className="text-[15px] font-black text-[#07111f]">
          Trading Calculators
        </h3>

        <p className="mt-1 text-[9px] font-medium text-slate-500">
          Practical tools for risk and trade planning.
        </p>
      </div>

      {[
        ["Risk Calculator", "/en/tools/risk-calculator"],
        ["Pip Calculator", "/en/tools/pip-calculator"],
        ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
        ["Margin Calculator", "/en/tools/margin-calculator"],
        ["Profit Calculator", "/en/tools/profit-calculator"],
      ].map(([title, href]) => (
        <Link
          key={title}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-[#f8fbff]"
        >
          <span className="text-[11px] font-bold text-slate-700">
            {title}
          </span>

          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            →
          </span>
        </Link>
      ))}

      <Link
        href="/en/tools"
        className="flex items-center justify-center bg-violet-50 px-4 py-3 text-[11px] font-black text-violet-600"
      >
        View All Trading Tools →
      </Link>
    </div>
    </div>
</aside>

  </div>
</div>

</main>
  );
}