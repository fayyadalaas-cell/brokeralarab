import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinderEN from "@/app/components/BrokerFinderEN";

export const metadata: Metadata = {
  title: "Best Brokers & Trading Reviews | Broker Arab",
  description:
    "Discover the best brokers through detailed reviews and broker comparisons, including regulation, fees, and trading platforms to help you choose the right broker with confidence.",
  keywords: [
    "Broker Arab",
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
    },
  },
  openGraph: {
    title: "Best Brokers & Trading Reviews | Broker Arab",
    description:
      "Discover the best brokers through detailed reviews and broker comparisons, including regulation, fees, and trading platforms to help you choose the right broker with confidence.",
    url: "https://brokeralarab.com/en",
    siteName: "Broker Arab",
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
  if (!value) return "غير محدد";
  return value.replace("JustMarkets Mobile App", "Mobile").trim();
}

function getCountryPages() {
  return [
    {
      title: "Best Brokers in Jordan",
      href: "/en/best-brokers/jordan",
      desc: "Top brokers suitable for traders in Jordan based on accounts, regulation, and platforms.",
      shortDesc: "Best brokers for Jordanian traders",
      flag: "/flags/jo.svg",
      badge: "Jordan",
    },
    {
      title: "Best Brokers in Saudi Arabia",
      href: "/en/best-brokers/saudi-arabia",
      desc: "Brokers suitable for traders in Saudi Arabia, including Islamic accounts, deposits, and regulation.",
      shortDesc: "Best brokers for Saudi traders",
      flag: "/flags/sa.svg",
      badge: "Saudi Arabia",
    },
    {
      title: "Best Brokers in Kuwait",
      href: "/en/best-brokers/kuwait",
      desc: "Top trading platforms for Kuwaiti traders based on account types, deposits, and support.",
      shortDesc: "Best options in Kuwait",
      flag: "/flags/kw.svg",
      badge: "Kuwait",
    },
    {
      title: "Best Brokers in the UAE",
      href: "/en/best-brokers/uae",
      desc: "Compare the best brokers for traders in the UAE based on platforms, fees, and features.",
      shortDesc: "Top brokers in the UAE",
      flag: "/flags/ae.svg",
      badge: "UAE",
    },
    {
      title: "Best Brokers in Qatar",
      href: "/en/best-brokers/qatar",
      desc: "Compare brokers suitable for traders in Qatar based on regulation and account types.",
      shortDesc: "Top options in Qatar",
      flag: "/flags/qa.svg",
      badge: "Qatar",
    },
    {
      title: "Best Brokers in Bahrain",
      href: "/en/best-brokers/bahrain",
      desc: "Trading platforms for Bahraini traders with a focus on fees and deposit methods.",
      shortDesc: "Best brokers in Bahrain",
      flag: "/flags/bh.svg",
      badge: "Bahrain",
    },
    {
      title: "Best Brokers in Oman",
      href: "/en/best-brokers/oman",
      desc: "Brokers suitable for traders in Oman based on ease of use, accounts, and platforms.",
      shortDesc: "Top brokers in Oman",
      flag: "/flags/om.svg",
      badge: "Oman",
    },
    {
      title: "Best Brokers in Egypt",
      href: "/en/best-brokers/egypt",
      desc: "Best brokers for Egyptian traders focusing on low deposits and suitable platforms.",
      shortDesc: "Top options in Egypt",
      flag: "/flags/eg.svg",
      badge: "Egypt",
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
        name: "كيف أختار شركة التداول المناسبة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اختر شركة التداول بناءً على التراخيص، الحد الأدنى للإيداع، المنصات، الحسابات، الرسوم، والحساب الإسلامي إذا كان مهمًا بالنسبة لك.",
        },
      },
      {
        "@type": "Question",
        name: "هل الأفضل اختيار شركة بإيداع منخفض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الإيداع المنخفض مفيد للمبتدئين، لكن يجب النظر أيضًا إلى قوة الترخيص وجودة التنفيذ وتنوع الحسابات والمنصات.",
        },
      },
      {
        "@type": "Question",
        name: "هل المقارنات بين شركات الفوركس مهمة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، المقارنات تختصر الوقت وتوضح الفروقات الحقيقية بين الشركات في الرسوم والتراخيص والحسابات والمنصات.",
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
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_24%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.10),transparent_30%)]" />
    <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#2563eb]/15 blur-3xl" />
    <div className="absolute left-[-80px] bottom-[-100px] h-[260px] w-[260px] rounded-full bg-[#0ea5e9]/10 blur-3xl" />
    <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]" />
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
          <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-10">
            <div dir="ltr" className="grid items-stretch gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
              
              {/* LEFT PANEL */}
              <div dir="ltr" className="relative">
                <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(10,18,32,0.94))] p-5 shadow-[0_25px_60px_rgba(2,8,23,0.45)] backdrop-blur-xl h-full flex flex-col">

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[12px] font-extrabold text-blue-300">
                        Quick Comparison
                      </div>
                      <h2 className="mt-1 text-[18px] font-black text-white">
                        Top Broker Picks
                      </h2>
                    </div>

                    <span className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-200">
                      Updated Regularly
                    </span>
                  </div>

                  <div className="relative z-10 mt-6 space-y-4 flex-1">
                    {heroBrokers.map((broker) => (
                      <div
                        key={broker.id}
                        className="group rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-5"
                      >
                        <div className="flex items-center gap-3">

                          <Link
                            href={`/en/brokers/${broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1"
                          >
                            {broker.logo ? (
                              <img
                                src={broker.logo}
                                alt={broker.name}
                                className="h-9 w-9 object-contain"
                              />
                            ) : (
                              <span className="text-[10px] text-slate-400">
                                Logo
                              </span>
                            )}
                          </Link>

                          <div className="flex-1">
                            <Link
                              href={`/en/brokers/${broker.slug}`}
                              className="text-[18px] font-black text-white hover:text-blue-300"
                            >
                              {broker.name}
                            </Link>

                            <p className="mt-1 text-[13px] text-slate-400">
                              {broker.subtitle}
                            </p>
                          </div>

                          <div className="text-right">
                            <div className="text-[11px] text-slate-400">Rating</div>
                            <div className="text-[22px] font-black text-white">
                              {broker.rating}
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      href="/en/compare"
                      className="h-12 flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-white"
                    >
                      View Comparisons
                    </Link>

                    <Link
                      href="/en/best-brokers"
                      className="h-12 flex items-center justify-center rounded-2xl bg-[#2563eb] text-white"
                    >
                      Top Brokers
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div dir="ltr" className="text-left">
                <h1 className="text-[58px] font-black text-white xl:text-[72px]">
                  Best Trading Brokers
                  <span className="block text-blue-400">
                    Reviews & Comparisons
                  </span>
                </h1>

                <p className="mt-6 text-[19px] text-slate-300">
                  Compare regulation, fees, platforms, and account types in one place.
                  Choose the broker that truly fits your needs instead of relying on ads.
                </p>

                <div className="mt-8 flex gap-4">
                  <a
                    href="#finder"
                    className="bg-[#2563eb] text-white px-6 py-3 rounded-2xl font-bold"
                  >
                    Start Quick Comparison
                  </a>

                  <Link
                    href="/en/compare"
                    className="border border-white/20 px-6 py-3 rounded-2xl text-white"
                  >
                    Browse Comparisons
                  </Link>
                </div>
              </div>

            </div>
          </div>
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

     {/* HOW WE RATE - PREMIUM STEPS */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-sm sm:rounded-[32px]">
    {(() => {
      const ratingItems = [
        {
          num: "01",
          title: "Regulation & Licensing",
          desc: "We evaluate regulatory authorities, license strength, and client fund protection levels.",
        },
        {
          num: "02",
          title: "Accounts & Fees",
          desc: "We review spreads, commissions, and real account conditions—not marketing promises.",
        },
        {
          num: "03",
          title: "Platforms & Tools",
          desc: "We assess MT4, MT5, usability, and tools suitable for daily trading.",
        },
        {
          num: "04",
          title: "Deposits & Withdrawals",
          desc: "We compare payment methods, withdrawal speed, and transparency of terms.",
        },
        {
          num: "05",
          title: "Islamic Account",
          desc: "We verify its availability and how it is actually implemented in practice.",
        },
        {
          num: "06",
          title: "Support & User Experience",
          desc: "We evaluate support quality, accessibility, and overall user experience.",
        },
      ];

      return (
        <>
          {/* DESKTOP */}
          <div className="hidden lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-0">
            {/* RIGHT INTRO */}
            <div className="border-l border-slate-200 p-7 xl:p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                
                <h2 className="mt-4 text-[34px] font-black leading-[1.1] text-[#0f172a]">
                  How We Rate
                  <span className="mt-1 block text-[#2563eb]">Trading Brokers?</span>
                </h2>

                <p className="mt-4 text-[14px] leading-7 text-slate-600">
                  We do not rely on marketing slogans. Each broker is evaluated
                  based on real factors that directly impact the trader’s experience,
                  from account setup to withdrawals and support.
                </p>

                <div className="mt-6 flex justify-center">
                  <Link
                    href="/en/brokers"
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)] transition hover:bg-[#1d4ed8]"
                  >
                    Browse All Reviews
                  </Link>
                </div>
              </div>
            </div>

            {/* LEFT STEPS */}
            <div className="p-6 xl:p-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {ratingItems.map((item) => (
                  <div
                    key={item.num}
                    className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-[0_16px_35px_rgba(15,23,42,0.06)]"
                  >
                    <div className="absolute left-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_100%)] opacity-80" />

                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-[12px] font-black text-white">
                        {item.num}
                      </span>

                      <h3 className="text-[18px] font-black text-[#0f172a]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] leading-6 text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET */}
          <div className="lg:hidden">
            <div className="border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <h2 className="text-[28px] font-black leading-[1.15] text-[#0f172a] sm:text-[28px]">
                  How We Rate Trading Brokers
                </h2>

                <p className="mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-700 sm:text-[14px] sm:leading-7">
                  We evaluate each broker based on real factors that impact the trading experience.
                </p>

                <div className="mt-3">
                  <Link
                    href="/en/brokers"
                    className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#2563eb] px-4 text-[12px] font-extrabold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:bg-[#1d4ed8]"
                  >
                    All Reviews
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-3">
                {ratingItems.map((item) => (
                  <div
                    key={item.num}
                    className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    <div className="absolute right-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_100%)] opacity-80" />

                    <div className="flex items-start gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] text-[10px] font-black text-white">
                        {item.num}
                      </span>

                      <h3 className="text-[13px] font-black leading-5 text-[#0f172a]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-700">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* TOP COMPARISONS */}
<section className="bg-[#f4f7fb] py-3 sm:py-4">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
      {/* HEADER */}
      <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-5 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-4 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div className="max-w-none text-center lg:text-left">
            <h2 className="text-[28px] font-black leading-[1.15] text-[#0f172a] sm:text-[34px] lg:text-[42px]">
              Top Broker Comparisons
            </h2>

            {/* Mobile */}
            <p className="mt-3 max-w-[900px] text-[14px] leading-7 text-slate-600 md:hidden">
              Explore the most popular broker comparisons and discover the differences in regulation,
              platforms, and fees before choosing the right broker.
            </p>

            {/* Desktop */}
            <p className="hidden md:block mt-3 max-w-[950px] text-[15px] leading-8 text-slate-600">
              Browse the most popular broker comparisons and understand the differences in regulation,
              account types, fees, and platforms such as MT4 and MT5. This section helps you clearly
              evaluate brokers and choose the one that fits your trading style and needs.
            </p>
          </div>

          <div className="flex justify-center md:hidden">
            <Link
              href="/en/compare"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-[13px] font-extrabold text-[#0f172a] shadow-sm transition hover:border-[#93c5fd] hover:bg-[#eff6ff]"
            >
              Browse All Comparisons
            </Link>
          </div>

          <div className="hidden md:flex shrink-0 justify-center lg:justify-start">
            <Link
              href="/en/compare"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-extrabold text-[#0f172a] shadow-sm transition hover:border-[#93c5fd] hover:bg-[#eff6ff]"
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
                    href={`/en/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                    className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    {cmp.broker_1?.logo ? (
                      <img
                        src={cmp.broker_1.logo}
                        alt={cmp.broker_1.name || "Broker 1"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[9px] text-slate-400">Logo</span>
                    )}
                  </Link>

                  <Link
                    href={`/en/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
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
                    href={`/en/brokers/${cmp.broker_2?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_2?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_2?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_2?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                    className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    {cmp.broker_2?.logo ? (
                      <img
                        src={cmp.broker_2.logo}
                        alt={cmp.broker_2.name || "Broker 2"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[9px] text-slate-400">Logo</span>
                    )}
                  </Link>

                  <Link
                    href={`/en/brokers/${cmp.broker_2?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_2?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_2?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_2?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
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
                  {`Compare ${cmp.broker_1?.name_en || cmp.broker_1?.name} vs ${cmp.broker_2?.name_en || cmp.broker_2?.name}`}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* DESKTOP / TABLET */}
      <div className="hidden gap-5 p-4 md:grid md:grid-cols-2 md:p-5 xl:grid-cols-3">
        {topComparisons.map((cmp, index) => (
          <article
            key={cmp.id}
            className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)]"
          >
            <div className="h-1 bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent" />

            <div className="p-5 lg:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">
                  #{index + 1} Most Viewed
                </span>

                <span className="text-[12px] font-bold text-slate-400">
                  {cmp.views_count ?? 0} views
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-4">
                <div className="flex flex-col items-center text-center">
                  <Link
                    href={`/en/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                    className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50 lg:h-24 lg:w-24"
                  >
                    {cmp.broker_1?.logo ? (
                      <img
                        src={cmp.broker_1.logo}
                        alt={cmp.broker_1.name || "Broker 1"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-slate-400">Logo</span>
                    )}
                  </Link>

                  <Link
                    href={`/en/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                    className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb] lg:text-[20px]"
                  >
                    {cmp.broker_1?.name_en || cmp.broker_1?.name || "Broker 1"}
                  </Link>

                  <span className="mt-2 text-[12px] font-bold text-[#f59e0b] lg:text-[13px]">
                    ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[13px] font-extrabold text-blue-600 shadow-sm">
                    VS
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <Link
                    href={`/en/brokers/${cmp.broker_2?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_2?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_2?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_2?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                    className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50 lg:h-24 lg:w-24"
                  >
                    {cmp.broker_2?.logo ? (
                      <img
                        src={cmp.broker_2.logo}
                        alt={cmp.broker_2.name || "Broker 2"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-slate-400">Logo</span>
                    )}
                  </Link>

                  <Link
                    href={`/en/brokers/${cmp.broker_2?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_2?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_2?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_2?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                    className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb] lg:text-[20px]"
                  >
                    {cmp.broker_2?.name_en || cmp.broker_2?.name || "Broker 2"}
                  </Link>

                  <span className="mt-2 text-[12px] font-bold text-[#f59e0b] lg:text-[13px]">
                    ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href={`/en/compare/${cmp.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-[15px] font-extrabold text-white transition hover:bg-[#1d4ed8] lg:min-h-[52px] lg:text-base"
                >
                  {`Compare ${cmp.broker_1?.name_en || cmp.broker_1?.name} vs ${cmp.broker_2?.name_en || cmp.broker_2?.name}`}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
</section>

{/* COUNTRIES DIRECTORY - FINAL */}
<section className="bg-[#f4f7fb] py-3 sm:py-4">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
      
      {/* HEADER */}
      <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-5 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          
          <div className="max-w-none text-center lg:max-w-[920px] lg:text-left">
            <h2 className="text-[28px] font-black leading-[1.1] tracking-[-0.02em] text-[#0f172a] sm:text-[42px]">
              Best Trading Brokers
              <span className="text-[#2563eb]"> by Country</span>
            </h2>

            {/* Mobile */}
            <p className="mt-2 text-[14px] leading-7 text-slate-600 md:hidden">
              Choose the best trading brokers based on your country, and discover the most suitable platforms in terms of regulation, accounts, and deposit/withdrawal methods.
            </p>

            {/* Desktop */}
            <p className="hidden md:block mt-3 max-w-[820px] text-[15px] leading-8 text-slate-600">
              Explore the best trading brokers by country and compare them based on regulation, Islamic accounts, deposit and withdrawal methods, and ease of account setup. This section helps you quickly find brokers that match your country and trading needs.
            </p>
          </div>

          <div className="hidden md:flex shrink-0 justify-center lg:justify-start">
            <Link
              href="/en/best-brokers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-extrabold text-[#0f172a] shadow-sm transition hover:border-[#93c5fd] hover:bg-[#eff6ff]"
            >
              All Countries
            </Link>
          </div>

        </div>
      </div>

      {/* MOBILE */}
      <div className="p-3 md:hidden">
        <div className="grid grid-cols-2 gap-2.5">
          {countryPages.map((item) => (
            <Link
              key={item.href}
              href={`/en${item.href}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Best brokers in ${item.badge}`}
              className="group rounded-[14px] border border-slate-200 bg-white px-2 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-[#bfdbfe] hover:bg-[#f8fbff]"
            >
              <div className="flex flex-col items-center justify-center gap-0.5 text-center">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                    <img
                      src={item.flag}
                      alt={item.badge}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  </div>

                  <h3 className="text-[14px] font-extrabold leading-5 text-[#0f172a]">
                    {item.badge}
                  </h3>
                </div>

                <span className="text-[13px] text-slate-500 transition group-hover:translate-x-[2px] group-hover:text-[#2563eb]">
                  →
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/en/best-brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 group rounded-[14px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-2.5 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:bg-[#eff6ff]"
          >
            <div className="flex flex-col items-center justify-center gap-0.5 text-center">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white shadow-sm">
                  🌍
                </div>

                <h3 className="text-[14px] font-extrabold text-[#0f172a]">
                  All Countries
                </h3>
              </div>

              <span className="text-[13px] text-slate-500 transition group-hover:translate-x-[2px] group-hover:text-[#2563eb]">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden p-4 md:block lg:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {countryPages.map((item) => (
            <Link
              key={item.href}
              href={`/en${item.href}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Best brokers in ${item.badge}`}
              className="group rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:bg-[#f8fbff]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#f8fafc] overflow-hidden">
                  <img src={item.flag} className="h-7 w-7 rounded-full object-cover" />
                </div>

                <div className="flex-1">
                  <h3 className="text-[18px] font-black text-[#0f172a]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[13px] text-slate-500">
                    {item.shortDesc || item.desc}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Open</div>
                  <div className="text-[20px] text-[#2563eb]">→</div>
                </div>
              </div>
            </Link>
          ))}

          <Link
            href="/en/best-brokers"
            className="md:col-span-2 mx-auto max-w-[520px] rounded-[22px] border border-dashed border-[#93c5fd] bg-[#eff6ff] px-5 py-4 text-center"
          >
            All Countries
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>

{/* LOWEST SPREAD HOME SECTION */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
    <div className="relative px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent_28%)]" />

      <div className="relative">
        {/* HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          
          {/* TITLE */}
          <div className="text-left lg:max-w-4xl">
            <h2 className="text-[28px] font-black leading-[1.15] tracking-[-0.02em] text-slate-950 sm:text-[34px] lg:text-[42px]">
              Lowest Spreads
              <span className="text-[#2563eb]"> by Account Type</span>
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
              A quick comparison of the best accounts based on real trading costs,
              with a clear separation between Standard, Raw, ECN, and Cent accounts,
              helping you find the most suitable option for your trading style.
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center lg:justify-start">
            <Link
              href="/en/lowest-spread-brokers"
              className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
            >
              Lowest Spread Brokers
            </Link>
          </div>
        </div>

        {/* DESKTOP / TABLET */}
        <div className="mt-6 hidden w-full sm:block">
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
            {[
              {
                title: "Best Standard Accounts",
                desc: "Simpler accounts with clear cost structures and no complex conditions.",
              },
              {
                title: "Best Raw Accounts",
                desc: "Lower spreads with separate commission for more precise trading costs.",
              },
              {
                title: "Best ECN Accounts",
                desc: "Ideal for traders focused on execution speed and professional structure.",
              },
              {
                title: "Best Cent / Micro Accounts",
                desc: "Suitable for beginners or trading with small capital.",
              },
            ].map((item, index) => (
              <a
                key={item.title}
                href="/en/lowest-spread-brokers#account-types"
                className={`block transition hover:bg-blue-50/30 ${
                  index !== 0 ? "border-t border-slate-200" : ""
                }`}
              >
                <div className="grid grid-cols-[1fr_1.2fr_88px] items-center gap-6 px-5 py-4">
                  
                  {/* TITLE */}
                  <div className="min-w-0 text-left">
                    <div className="text-[16px] font-black text-slate-950">
                      {item.title}
                    </div>
                  </div>

                  {/* DESC */}
                  <div className="min-w-0 text-left text-sm leading-7 text-slate-600">
                    {item.desc}
                  </div>

                  {/* ACTION */}
                  <div className="flex justify-center">
                    <span className="inline-flex min-w-[68px] items-center justify-center rounded-xl bg-[#2563eb] px-3 py-2 text-[11px] font-extrabold text-white transition hover:bg-[#1d4ed8]">
                      View
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="mt-6 w-full sm:hidden">
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
            {[
              { title: "Best Standard Accounts" },
              { title: "Best Raw Accounts" },
              { title: "Best ECN Accounts" },
              { title: "Best Cent / Micro Accounts" },
            ].map((item, index) => (
              <a
                key={item.title}
                href="/en/lowest-spread-brokers#account-types"
                className={`block px-4 py-3.5 transition hover:bg-blue-50/30 ${
                  index !== 0 ? "border-t border-slate-200" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  
                  {/* TITLE */}
                  <div className="min-w-0 text-left">
                    <div className="text-[14px] font-black text-slate-950">
                      {item.title}
                    </div>
                  </div>

                  {/* BUTTON */}
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
  </div>
</section>

     {/* HOW TO CHOOSE A BROKER - PREMIUM SEO SECTION */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5 sm:px-8 sm:py-7">
      <h2 className="text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[40px]">
        How to Choose the Best Trading Broker for You?
      </h2>

      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
        Choosing the best broker is not just about brand popularity or advertising.
        It depends on regulation, trading costs, platforms, and real user experience.
        Here are the key factors that help you choose the right broker with confidence.
      </p>
    </div>

    {/* MOBILE */}
    <div className="px-4 py-4 sm:hidden">
      <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
        <p className="text-sm leading-8 text-slate-600">
          The best broker is not always the most popular one, but the one that combines
          strong regulation, transparent fees, a suitable platform, and easy deposit
          and withdrawal options. That’s why evaluating brokers from a practical
          perspective is essential before opening an account.
        </p>

        <details className="mt-4 overflow-hidden rounded-[18px] border border-slate-200 bg-white">
          <summary className="cursor-pointer list-none px-4 py-3.5 text-center text-sm font-extrabold text-[#1d4ed8]">
            Read More
          </summary>

          <div className="space-y-4 border-t border-slate-200 px-4 py-4 text-sm leading-7 text-slate-600">
            <p>
              The first step when choosing a broker is to check the
              <strong> regulation and licensing</strong>. A well-known regulatory
              authority indicates better compliance and transparency in handling client funds.
            </p>

            <p>
              Next comes the <strong>trading cost</strong>. This is not limited to
              spreads only, but also includes commissions, swap fees, and any hidden
              charges that may affect your real results.
            </p>

            <p>
              You should also consider the <strong>trading platform</strong>,
              whether you prefer MT4, MT5, or mobile apps, as execution speed and
              usability directly impact your trading experience.
            </p>

            <p>
              For many traders, especially in the Arab region, having an
              <strong> Islamic account</strong>, <strong>Arabic support</strong>,
              and flexible deposit and withdrawal options are very important factors
              that should not be ignored.
            </p>
          </div>
        </details>
      </div>
    </div>

    {/* DESKTOP */}
    <div className="hidden px-8 py-8 sm:block">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* ARTICLE */}
        <div className="lg:col-span-8">
          <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="space-y-5 text-[16px] leading-9 text-slate-600">
              <p>
                If you are looking for the <strong>best trading broker</strong>,
                it is important to understand that your decision should not be based
                on brand popularity alone, but on practical factors that directly
                affect your fund safety, execution quality, and long-term trading costs.
                The first of these is <strong>regulation</strong>, as brokers regulated
                by well-known authorities tend to follow stricter standards and transparency.
              </p>

              <p>
                Then comes the <strong>actual trading cost</strong>. Many traders
                focus only on spreads, but the full picture includes commissions,
                swap fees, and any additional charges that may not be clearly shown
                in marketing materials.
              </p>

              <p>
                The <strong>trading platform</strong> is also a key factor.
                Some traders prefer MT4 for its simplicity, while others choose MT5
                for its advanced tools. Many rely heavily on mobile apps, making
                usability and execution speed extremely important.
              </p>

              <p>
                You should also consider <strong>account types</strong>.
                Beginners may need low-deposit accounts with simple conditions,
                while experienced traders may look for tighter spreads and faster execution.
                Choosing a broker with multiple account options is always a better approach.
              </p>

              <p>
                For many traders, having an <strong>Islamic account</strong>,
                <strong>Arabic support</strong>, and flexible deposit and withdrawal
                methods are essential. At Broker Arab, we rely on these factors when
                reviewing and comparing brokers, helping you find the right broker
                without relying only on advertising.
              </p>
            </div>
          </article>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[24px] border border-[#dbeafe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-sm">
              <div className="border-b border-[#dbeafe] px-5 py-5">
                <h3 className="text-[24px] font-black leading-[1.25] text-[#0f172a]">
                  What should you check before opening an account?
                </h3>
              </div>

              <div className="p-5">
                <div className="space-y-3">
                  {[
                    "Regulation and licensing strength",
                    "Spreads and commissions",
                    "Platform type and usability",
                    "Deposit and withdrawal methods",
                    "Islamic account availability",
                    "Customer support and Arabic support",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-xs font-black text-[#1d4ed8]">
                        {index + 1}
                      </span>
                      <span className="text-sm font-bold leading-6 text-[#0f172a]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[18px] border border-slate-200 bg-[#f8fbff] px-4 py-4">
                  <p className="text-sm leading-7 text-slate-600">
                    Do not choose a broker based on advertising alone. Always check
                    regulation, real trading costs, and whether the account type fits
                    your capital and trading style.
                  </p>
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
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">

    {/* HEADER */}
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5 sm:px-8 sm:py-6">

      <h2 className="text-[24px] font-black leading-[1.2] text-[#0f172a] sm:text-[36px] lg:text-[42px]">
        Why do traders trust
        <span className="text-[#2563eb]"> Broker Arab?</span>
      </h2>

      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        Broker Arab is a platform that helps traders understand the real differences
        between brokers in terms of regulation, fees, platforms, and account types,
        so they can make decisions based on clear and reliable information.
      </p>

    </div>

    {/* MOBILE */}
    <div className="grid gap-3 p-4 sm:hidden">
      {[
        {
          title: "Clear and Structured Reviews",
          desc: "Each broker has a dedicated page showing accounts, regulation, and fees in a simple format.",
        },
        {
          title: "Practical Broker Comparisons",
          desc: "Direct comparisons that highlight real differences quickly and clearly.",
        },
        {
          title: "Focused on Arab Traders",
          desc: "Special attention to Islamic accounts, Arabic support, and deposit methods.",
        },
        {
          title: "Strong SEO Structure",
          desc: "Well-connected review, comparison, and country pages for better navigation and discovery.",
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
    <div className="hidden p-6 sm:block sm:p-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Clear and Structured Reviews",
            desc: "Each broker has a dedicated page showing accounts, platforms, regulation, and fees in a clear format.",
          },
          {
            title: "Practical Broker Comparisons",
            desc: "Comparison pages that highlight real differences instead of making users navigate multiple pages.",
          },
          {
            title: "Focused on Arab Traders",
            desc: "We prioritize Islamic accounts, Arabic support, flexible deposits, and regional needs.",
          },
          {
            title: "Strong SEO & Scalable Structure",
            desc: "Well-connected review, comparison, and country pages that enhance both UX and SEO.",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="group rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-5 py-5 shadow-sm transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[12px] font-black text-[#1d4ed8]">
                {index + 1}
              </span>

              <div className="min-w-0">
                <h3 className="text-[18px] font-black leading-[1.35] text-[#0f172a]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

{/* FAQ */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-6 sm:px-8 sm:py-8">
      <div className="inline-flex rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-extrabold text-[#1d4ed8] sm:text-sm">
        Frequently Asked Questions
      </div>

      <h2 className="mt-3 text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[36px]">
        Key Questions Before Choosing a Broker
      </h2>

      <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        These are the most common questions traders ask before opening an account.
        We’ve summarized the key answers clearly to help you make a better decision.
      </p>
    </div>

    {/* MOBILE */}
    <div className="space-y-3 px-4 py-4 sm:hidden">
      {[
        {
          q: "What is the best broker for beginners?",
          a: "The best broker for beginners combines clear regulation, an easy-to-use platform, a low minimum deposit, and strong customer support. You should not choose based on popularity alone, but on ease of use, transparency, and suitability for your starting level.",
        },
        {
          q: "Are trading brokers safe and reliable?",
          a: "Not all brokers offer the same level of safety. The most reliable brokers are regulated by well-known authorities, provide transparent terms, and offer clear deposit, withdrawal, and support systems.",
        },
        {
          q: "What is the minimum amount to open a trading account?",
          a: "The minimum deposit varies between brokers. Some allow you to start with small amounts, but what matters most is choosing an account that fits your capital and avoids unnecessary trading pressure.",
        },
        {
          q: "How can I check if a broker is regulated?",
          a: "You can verify this on the broker’s website under the regulation section, where the regulator name and license number should be clearly displayed. You can also confirm the license directly with the regulator if needed.",
        },
        {
          q: "What is the difference between MT4 and MT5?",
          a: "MT4 is widely used and known for its simplicity, while MT5 offers more advanced tools and features. The better choice depends on your trading style, but platform stability and ease of use are more important than the name itself.",
        },
      ].map((item, index) => (
        <details
          key={item.q}
          className="group overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8fbff] shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left">
            <span className="text-[15px] font-black leading-7 text-[#0f172a]">
              {item.q}
            </span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[15px] font-black text-[#1d4ed8] transition group-open:rotate-180">
              ▾
            </span>
          </summary>

          <div className="border-t border-slate-200 bg-white px-4 py-4">
            <p className="text-[13px] leading-7 text-slate-600">{item.a}</p>
          </div>
        </details>
      ))}
    </div>

    {/* DESKTOP */}
    <div className="hidden px-8 py-8 sm:block">
      <div className="grid gap-4">
        {[
          {
            q: "What is the best broker for beginners?",
            a: "The best broker for beginners is one that offers clear regulation, an easy-to-use platform, a suitable minimum deposit, and transparent fees. Beginners should focus on usability and learning support rather than brand popularity alone.",
          },
          {
            q: "Are trading brokers safe and reliable?",
            a: "Safety varies between brokers. Reliable brokers are usually regulated by reputable authorities, provide transparent fee structures, and offer structured deposit and withdrawal processes along with strong customer support.",
          },
          {
            q: "What is the minimum deposit to open a trading account?",
            a: "The minimum deposit depends on the broker and account type. Some brokers allow small deposits, but it is more important to choose an account that matches your capital and trading approach.",
          },
          {
            q: "How can I verify if a broker is regulated?",
            a: "You can check the regulation page on the broker’s website, where the regulator and license number should be clearly stated. For extra security, verify the license directly through the regulator’s official website.",
          },
          {
            q: "What is the difference between MT4 and MT5?",
            a: "MT4 is known for its simplicity and wide adoption, while MT5 offers additional tools and improved features. The best choice depends on your needs, but platform stability and usability matter more than the platform name itself.",
          },
        ].map((item) => (
          <details
            key={item.q}
            className="group overflow-hidden rounded-[22px] border border-slate-200 bg-[#f8fbff] shadow-sm open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5">
              <span className="text-lg font-black leading-8 text-[#0f172a]">
                {item.q}
              </span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-lg font-black text-[#1d4ed8] transition group-open:rotate-180">
                ▾
              </span>
            </summary>

            <div className="border-t border-slate-200 px-5 py-5">
              <p className="text-sm leading-8 text-slate-600">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </div>
</section>
    </main>
  );
}