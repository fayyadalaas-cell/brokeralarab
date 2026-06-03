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

export default async function HomePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("*")
    .order("rating", { ascending: false });

    const { data: comparisonsData } = await supabase
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
  .limit(3);

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.slug && b.name);
  const topBrokers = brokers.slice(0, 6);
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

  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

{/* HERO - DESKTOP IMPROVED / MOBILE KEEP */}
<section className="relative overflow-hidden border-b border-slate-800 bg-[#07111f]">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.24),transparent_28%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_34%)]" />
    <div className="absolute right-[-140px] top-[-140px] h-[360px] w-[360px] rounded-full bg-[#2563eb]/20 blur-3xl" />
    <div className="absolute left-[-100px] bottom-[-120px] h-[300px] w-[300px] rounded-full bg-[#0ea5e9]/12 blur-3xl" />
    <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]" />
  </div>

  {(() => {
    const heroBrokers = Array.from(
      ((brokers || []) as Broker[]).reduce((acc, broker) => {
        if (!broker || !broker.name) return acc;

        const key = String(broker.name).trim().toLowerCase();
        const existing = acc.get(key);

        if (!existing || Number(broker.rating || 0) > Number(existing.rating || 0)) {
          acc.set(key, broker);
        }

        return acc;
      }, new Map<string, Broker>()).values()
    )
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .slice(0, 3)
      .map((b, index) => ({
        id: b.id,
        name: b.name_en || b.name || "Broker",
        slug: b.slug || "",
        rating: b.rating ? Number(b.rating).toFixed(1) : "—",
        deposit:
          b.min_deposit !== null && b.min_deposit !== undefined
            ? money(b.min_deposit)
            : "Not specified",
        subtitle: b.best_for_en || b.best_for || "Recommended trading broker",
        logo: b.logo || null,
        rank: index + 1,
      }));

    return (
      <>
        {/* DESKTOP ONLY */}
<div className="hidden lg:block">
  {(() => {
    const allHeroBrokers = Array.from(
      ((brokers || []) as Broker[]).reduce((acc, broker) => {
        if (!broker || !broker.name) return acc;

        const key = String(broker.name).trim().toLowerCase();
        const existing = acc.get(key);

        if (!existing || Number(broker.rating || 0) > Number(existing.rating || 0)) {
          acc.set(key, broker);
        }

        return acc;
      }, new Map<string, Broker>()).values()
    )
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .map((b) => ({
        id: b.id,
        name: b.name_en || b.name || "Broker",
        slug: b.slug || "",
        rating: b.rating ? Number(b.rating).toFixed(1) : "—",
        logo: b.logo || null,
      }));

    const marquee = [...allHeroBrokers, ...allHeroBrokers, ...allHeroBrokers];

    return (
      <>
        <style>{`
          @keyframes brokerMarquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <div className="relative overflow-hidden bg-[#07111f]">
          {/* BACKGROUND */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.34),transparent_42%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_55%,rgba(14,165,233,0.12),transparent_34%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_45%,rgba(59,130,246,0.11),transparent_30%)]" />
            <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:58px_58px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07111f]/10 to-[#07111f]/75" />
          </div>

         {/* HERO CONTENT */}
          <div className="relative mx-auto max-w-7xl px-6 py-14 xl:py-16">
            <div dir="ltr" className="mx-auto max-w-6xl text-center">
              <h1 className="mx-auto max-w-6xl text-[52px] font-black leading-[1.05] tracking-[-0.04em] text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.35)] xl:text-[64px]">
                Find the Best Trading Brokers
                <span className="block bg-gradient-to-r from-white via-blue-200 to-[#60a5fa] bg-clip-text text-transparent">
                  Compare Fees, Spreads & Regulation
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-[17px] leading-8 text-slate-300">
                Compare trusted brokers by regulation, fees, spreads, and real
                trading conditions — so you choose with confidence, not marketing.
              </p>

              <div className="mt-7 flex items-center justify-center gap-4">
                <a
                  href="#finder"
                  className="rounded-full bg-white px-8 py-3.5 text-[15px] font-black text-[#07111f] shadow-[0_12px_50px_rgba(59,130,246,0.25)] transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Find Best Broker
                </a>

                <Link
                  href="/en/compare"
                  className="rounded-full border border-white/20 bg-white/[0.045] px-8 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Compare Brokers
                </Link>
              </div>
            </div>
          </div>

          {/* LOGO STRIP */}
          <div className="relative z-10 border-y border-slate-200 bg-white">
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white to-transparent" />

            <div className="overflow-hidden">
              <div className="flex w-max [animation:brokerMarquee_150s_linear_infinite] hover:[animation-play-state:paused]">
                {marquee.map((broker, index) => (
                  <Link
                    key={`broker-${broker.id}-${index}`}
                    href={`/en/brokers/${broker.slug}`}
                    className="group flex h-[92px] w-[300px] shrink-0 items-center justify-center border-r border-slate-100 bg-white px-6 transition hover:bg-slate-50"
                  >
                    <div className="flex w-full items-center justify-center gap-4">
                      <div className="flex h-[68px] w-[94px] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
                        {broker.logo ? (
                          <img
                            src={broker.logo}
                            alt={broker.name}
                            className="max-h-[60px] max-w-[92px] object-contain transition duration-300 group-hover:scale-[1.08]"
                          />
                        ) : (
                          <span className="text-sm font-bold text-slate-900">
                            {broker.name.slice(0, 2)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="max-w-[160px] truncate text-[15px] font-bold text-slate-900">
                          {broker.name}
                        </div>
                        <div className="text-[12px] text-slate-500">
                          Rating {broker.rating}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  })()}
</div>

        {/* MOBILE - KEEP AS IS */}
        <div className="lg:hidden">
          <div className="relative mx-auto max-w-7xl px-4 pt-2 pb-6 sm:px-6">
            <div className="grid items-center gap-10">
              <div className="order-1">
                <h1 className="mt-3 text-[30px] font-black text-white sm:text-[46px]">
                  Best Trading Brokers
                  <span className="block text-blue-400">
                    Reviews & Comparisons
                  </span>
                </h1>

                <p className="mt-5 text-[15px] text-slate-300">
                  Compare brokers and find the best one for your needs quickly and easily.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#finder"
                    className="bg-[#2563eb] text-white px-6 py-3 rounded-2xl"
                  >
                    Start Comparison
                  </a>

                  <Link
                    href="/en/best-brokers"
                    className="border border-white/20 px-6 py-3 rounded-2xl text-white"
                  >
                    Top Brokers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  })()}
</section>

      {/* FINDER */}
<section
  id="finder"
  className="scroll-mt-24 mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4"
>
  <BrokerFinderEN brokers={brokers} />
</section>

    {/* HOW WE RATE - CLEAN TRUST SECTION */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
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
                <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
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

                <Link
                  href="/en/brokers"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:bg-[#1d4ed8]"
                >
                  Browse All Reviews
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-5">
              {ratingItems.map((item) => (
                <div
                  key={item.num}
                  className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eff6ff] text-[12px] font-black text-[#1d4ed8] ring-1 ring-[#bfdbfe]">
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

              <Link
                href="/en/brokers"
                className="mt-3 inline-flex h-9 items-center justify-center rounded-2xl bg-[#2563eb] px-4 text-[11px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)]"
              >
                All Reviews
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-2 bg-white p-3.5">
              {ratingItems.map((item) => (
                <div
                  key={item.num}
                  className="rounded-[18px] border border-slate-200 bg-[#fbfdff] px-3.5 py-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[10px] font-black text-[#1d4ed8] ring-1 ring-[#bfdbfe]">
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
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
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
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-[#1d4ed8]"
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
          <div className="h-1 bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent" />

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
                  className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-blue-200 hover:bg-blue-50"
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
                  className="mt-2 text-[15px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb]"
                >
                  {cmp.broker_1?.name_en || cmp.broker_1?.name || "Broker 1"}
                </Link>

                <span className="mt-1 text-[11px] font-bold text-[#f59e0b]">
                  ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
                </span>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[11px] font-extrabold text-blue-600 shadow-sm">
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
                  className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-blue-200 hover:bg-blue-50"
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
                  className="mt-2 text-[15px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb]"
                >
                  {cmp.broker_2?.name_en || cmp.broker_2?.name || "Broker 2"}
                </Link>

                <span className="mt-1 text-[11px] font-bold text-[#f59e0b]">
                  ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href={`/en/compare/${cmp.slug}`}
                className="mt-3 flex w-full items-center justify-center rounded-xl bg-[#2563eb] py-2.5 text-[14px] font-bold text-white hover:bg-[#1d4ed8]"
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
          className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
        >
          <div className="h-1 bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent" />

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
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50 lg:h-20 lg:w-20"
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
                  className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb] lg:text-[18px]"
                >
                  {cmp.broker_1?.name_en || cmp.broker_1?.name || "Broker 1"}
                </Link>

                <span className="mt-2 text-[12px] font-bold text-[#f59e0b]">
                  ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
                </span>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[12px] font-extrabold text-blue-600 shadow-sm">
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
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50 lg:h-20 lg:w-20"
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
                  className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb] lg:text-[18px]"
                >
                  {cmp.broker_2?.name_en || cmp.broker_2?.name || "Broker 2"}
                </Link>

                <span className="mt-2 text-[12px] font-bold text-[#f59e0b]">
                  ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={`/en/compare/${cmp.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-[15px] font-extrabold text-white transition hover:bg-[#1d4ed8]"
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
<section className="bg-[#f4f7fb] py-3 sm:py-4">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
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
              className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-[#1d4ed8]"
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
              className="group rounded-[14px] border border-slate-200 bg-white px-2.5 py-2.5 shadow-[0_3px_10px_rgba(15,23,42,0.04)] transition hover:border-[#bfdbfe] hover:bg-[#f8fbff]"
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

                <span className="shrink-0 text-[13px] font-bold text-slate-400 transition group-hover:translate-x-[2px] group-hover:text-[#2563eb]">
                  →
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/en/best-brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="group col-span-2 rounded-[14px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-3 py-3 shadow-[0_3px_10px_rgba(15,23,42,0.04)] transition hover:bg-[#eff6ff]"
          >
            <div className="flex items-center justify-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white shadow-sm">
                🌍
              </div>

              <h3 className="text-[13px] font-black text-[#07111f]">
                All Other Countries
              </h3>

              <span className="text-[13px] font-bold text-slate-400 transition group-hover:translate-x-[2px] group-hover:text-[#2563eb]">
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
              className="group rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:bg-[#fcfdff] hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
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

                <span className="shrink-0 text-[18px] font-black text-[#2563eb] transition group-hover:translate-x-[3px]">
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white shadow-sm">
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

              <span className="text-[18px] font-black text-[#2563eb] transition group-hover:translate-x-[3px]">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

{/* LOWEST SPREAD HOME SECTION */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <div className="relative">
      {/* DESKTOP HEADER */}
      <div className="hidden border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4 lg:block">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
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
              className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-[#1d4ed8]"
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
                <span className="text-[#2563eb]"> by Account Type</span>
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                Compare Standard, Raw, ECN, and Cent accounts to find the most
                suitable low-spread broker account for your trading style.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/en/lowest-spread-brokers"
                className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
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
                  className={`block px-4 py-3.5 transition hover:bg-blue-50/30 ${
                    index !== 0 ? "border-t border-slate-200" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 text-left">
                      <div className="text-[14px] font-black text-slate-950">
                        {item.title}
                      </div>
                    </div>

                    <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#2563eb] px-4 py-2 text-[11px] font-extrabold text-white">
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
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#93c5fd] hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-full flex-col">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent opacity-80" />

                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-blue-100 bg-[#eff6ff] px-3 py-1 text-[11px] font-black text-[#2563eb]">
                    {item.tag}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-[#f8fbff] text-[13px] font-black text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white">
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

                  <span className="inline-flex items-center gap-1 text-[13px] font-black text-[#2563eb] transition group-hover:translate-x-1">
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
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
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
            className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-[#1d4ed8]"
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
          <summary className="cursor-pointer list-none px-4 py-3.5 text-center text-sm font-extrabold text-[#1d4ed8]">
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
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent opacity-55" />

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
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:bg-[#fcfdff] hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#eff6ff] text-xs font-black text-[#1d4ed8] transition group-hover:bg-[#2563eb] group-hover:text-white">
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

{/* WHY TRUST BROKER AL ARAB */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="text-center lg:text-left">
        <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
          Why Broker Al Arab?
        </span>

        <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
          Why Do Traders Trust Broker Al Arab?
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
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[11px] font-black text-[#1d4ed8]">
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
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#93c5fd] hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent opacity-55" />

            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-blue-100 bg-[#eff6ff] px-3 py-1 text-[11px] font-black text-[#2563eb]">
                {item.tag}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-[#f8fbff] text-[13px] font-black text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white">
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

{/* FAQ */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="text-center lg:text-left">
        <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
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
              <Link href="/en/best-brokers" className="font-bold text-[#2563eb] hover:underline">
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
              <Link href="/en/lowest-spread-brokers" className="font-bold text-[#2563eb] hover:underline">
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
              <Link href="/en/compare" className="font-bold text-[#2563eb] hover:underline">
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
        <details className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:border-[#bfdbfe] hover:bg-[#fcfdff] hover:shadow-[0_14px_32px_rgba(15,23,42,0.05)] open:border-[#93c5fd]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#eff6ff] text-xs font-black text-[#1d4ed8] transition group-open:bg-[#2563eb] group-open:text-white">
                {index + 1}
              </span>

              <span className="text-[15px] font-black leading-7 text-[#07111f] sm:text-[16px]">
                {item.q}
              </span>
            </div>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#f8fbff] text-[14px] font-black text-[#2563eb] transition group-open:rotate-180 group-open:bg-[#2563eb] group-open:text-white">
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
              <summary className="mt-2 flex cursor-pointer list-none items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-[13px] font-black text-[#2563eb]">
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
    </main>
  );
}