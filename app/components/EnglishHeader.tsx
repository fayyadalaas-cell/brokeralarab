"use client";

import Link from "next/link";
import Image from "next/image";
import MobileNavMenu from "@/app/components/MobileNavMenu";

const brokerLogoMap: Record<string, string> = {
  activtrades: "/brokers/activtrade.png",
  activtrade: "/brokers/activtrade.png",
  alpari: "/brokers/alpari.png",
  avatrade: "/brokers/avatrade.png",
  equiti: "/brokers/equiti.png",
  exness: "/brokers/exness.png",
  "exness-platform": "/brokers/exness-platform.png",
  exness2: "/brokers/exness2.png",
  fxpro: "/brokers/FxPro.png",
  "ic-markets": "/brokers/ic-markets.png",
  icmarkets: "/brokers/ic-markets.png",
  justmarkets: "/brokers/justmarkets.png",
  justmarket: "/brokers/justmarket.png",
  "just-markets": "/brokers/justmarkets.png",
  pepperstone: "/brokers/pepperstone.png",
  vantage: "/brokers/vantage.png",
  xm: "/brokers/xm.png",
  xs: "/brokers/xs.png",
  multibank: "/brokers/MultibankGroup.png",
  "multi-bank": "/brokers/MultibankGroup.png",
  "multi-bank-group": "/brokers/MultibankGroup.png",
    "markets-com": "/brokers/markets-com.png",
  marketscom: "/brokers/markets-com.png",
  plus500: "/brokers/plus500.png",
  "capital-com": "/brokers/capital-com.png",
};

function getBrokerLogo(slug: string): string {
  return brokerLogoMap[slug] || "/brokers/BrokerLogo.png";
}

function getLearnTradingTitle(item: any) {
  if (item.href === "/learn-trading/how-to-start-trading-from-zero") {
    return "How to Start Trading from Zero";
  }

  return item.title_en || item.title || "Learn Trading";
}

function getLearnTradingHref(item: any) {
  if (item.href?.startsWith("/en/")) {
    return item.href;
  }

  return `/en${item.href}`;
}

const tradingToolsEn = [
  { title: "Risk Calculator", href: "/en/tools/risk-calculator" },
  { title: "Lot Size Calculator", href: "/en/tools/lot-size-calculator" },
  { title: "Pip Calculator", href: "/en/tools/pip-calculator" },
  { title: "Profit Calculator", href: "/en/tools/profit-calculator" },
  { title: "Margin Calculator", href: "/en/tools/margin-calculator" },
  { title: "Fibonacci Calculator", href: "/en/tools/fibonacci-calculator" },
  { title: "Pivot Point Calculator", href: "/en/tools/pivot-point-calculator" },
  { title: "Compound Calculator", href: "/en/tools/compound-calculator" },
];

const verificationToolsEn = [
  {
    title: "Verify a Broker License",
    desc: "Search any forex broker by name or license number and verify its regulatory status.",
    href: "/en/licenses",
  },
];

const accountTypePagesEn = [
  {
    title: "Best Cent Account Brokers",
    shortLabel: "Cent Accounts",
    href: "/en/best-brokers/accounts/cent",
    symbol: "¢",
  },
  {
    title: "Best Standard Account Brokers",
    shortLabel: "Standard Accounts",
    href: "/en/best-brokers/accounts/standard",
    symbol: "S",
  },
  {
    title: "Best Raw Spread Brokers",
    shortLabel: "Raw Spread Accounts",
    href: "/en/best-brokers/accounts/raw-spread",
    symbol: "R",
  },
];

const mainLinkClass =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-extrabold text-slate-700 transition hover:bg-slate-100 xl:px-5";

const dropdownClass =
  "invisible absolute left-0 top-full z-50 mt-3 translate-y-2 rounded-[28px] border border-slate-200 bg-white p-4 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100";

  const wideDropdownClass =
  "invisible absolute left-1/2 top-full z-50 mt-3 w-[1020px] max-w-[calc(100vw-32px)] -translate-x-1/2 translate-y-2 rounded-[28px] border border-slate-200 bg-white p-5 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100";

const menuCardClass =
  "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-[13px] font-extrabold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600";

const logoBoxClass =
  "flex h-11 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm";

export default function EnglishHeader({
  topBrokers,
  countryMenuItems,
  featuredCategories,
  featuredComparisons,
  learnTradingMenuItems,
}: any) {
  const extendedCountryMenuItems = [
  {
    label: "Best Forex Brokers in Vietnam",
    shortLabel: "Vietnam",
    href: "/en/best-brokers/vietnam",
    flag: "https://flagcdn.com/w80/vn.png",
  },

  {
    label: "Best Forex Brokers in Indonesia",
    shortLabel: "Indonesia",
    href: "/en/best-brokers/indonesia",
    flag: "https://flagcdn.com/w80/id.png",
  },

  {
    label: "Best Forex Brokers in Malaysia",
    shortLabel: "Malaysia",
    href: "/en/best-brokers/malaysia",
    flag: "https://flagcdn.com/w80/my.png",
  },

  {
    label: "Best Forex Brokers in the United Kingdom",
    shortLabel: "UK",
    href: "/en/best-brokers/united-kingdom",
    flag: "https://flagcdn.com/w80/gb.png",
  },

  {
    label: "Best Forex Brokers in Australia",
    shortLabel: "Australia",
    href: "/en/best-brokers/australia",
    flag: "https://flagcdn.com/w80/au.png",
  },

  {
    label: "Best Forex Brokers in South Africa",
    shortLabel: "South Africa",
    href: "/en/best-brokers/south-africa",
    flag: "https://flagcdn.com/w80/za.png",
  },

  {
    label: "Best Forex Brokers in Singapore",
    shortLabel: "Singapore",
    href: "/en/best-brokers/singapore",
    flag: "https://flagcdn.com/w80/sg.png",
  },

  {
  label: "Best Forex Brokers in Ghana",
  shortLabel: "Ghana",
  href: "/en/best-brokers/ghana",
  flag: "https://flagcdn.com/w80/gh.png",
},

  {
    label: "Best Forex Brokers in Nigeria",
    shortLabel: "Nigeria",
    href: "/en/best-brokers/nigeria",
    flag: "https://flagcdn.com/w80/ng.png",
  },

  {
    label: "Best Forex Brokers in Thailand",
    shortLabel: "Thailand",
    href: "/en/best-brokers/thailand",
    flag: "https://flagcdn.com/w80/th.png",
  },

  {
    label: "Best Forex Brokers in the Philippines",
    shortLabel: "Philippines",
    href: "/en/best-brokers/philippines",
    flag: "https://flagcdn.com/w80/ph.png",
  },

  {
    label: "Best Forex Brokers in Kenya",
    shortLabel: "Kenya",
    href: "/en/best-brokers/kenya",
    flag: "https://flagcdn.com/w80/ke.png",
  },
];

    return (
    <header
      dir="ltr"
      className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <div
          className="relative flex h-16 items-center justify-between 2xl:h-20"
          dir="ltr"
        >
          <a
  href="/en"
  aria-label="Back to homepage"
  className="min-w-0 shrink-0 lg:justify-self-start"
>
  <Image
    src="/logo/Asset 1@3x.png"
    alt="Broker Alarab"
    width={300}
    height={90}
    priority
    className="h-auto w-[130px] sm:w-[155px] 2xl:w-[180px]"
  />
</a>

          <nav className="mx-8 hidden flex-1 items-center justify-evenly gap-2 2xl:flex xl:mx-12 xl:gap-4">
            {/* REVIEWS */}
            <div className="group relative">
              <Link href="/en/brokers" className={mainLinkClass}>
                Broker Reviews
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[420px]`}>
                <div className="px-3 pb-2 pt-1 text-xs font-black tracking-wide text-slate-500">
                  Top 5 Reviews Right Now
                </div>

                {topBrokers.length > 0 ? (
                  topBrokers.map((broker: any) => (
                    <Link
                      key={broker.slug}
                      href={`/en/brokers/${broker.slug}`}
                      className={`${menuCardClass} mb-2 flex items-center justify-between gap-4`}
                    >
                      <div className="min-w-0 text-left">
                        <div className="text-[15px] font-extrabold text-slate-800">
                          {broker.name_en || broker.name} Review
                        </div>
                      </div>

                      <div className={logoBoxClass}>
                        <Image
                          src={broker.logo || getBrokerLogo(broker.slug)}
                          alt={broker.name_en || broker.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-3 text-sm font-bold text-slate-500">
                    No reviews available right now.
                  </div>
                )}

                <Link
                  href="/en/brokers"
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                >
                  View All Reviews →
                </Link>
              </div>
            </div>

            
{/* ===================================================
    COMPARE - BROKERS & ACCOUNTS
=================================================== */}
<div className="group relative">
  <Link href="/en/compare" className={mainLinkClass}>
    Comparisons
    <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
      ▼
    </span>
  </Link>

  <div
    className={`${dropdownClass} w-[500px] max-w-[calc(100vw-32px)]`}
    dir="ltr"
  >
    {/* HEADER */}
    <div className="mb-4 flex items-start justify-between gap-3 px-1">
      <div>
        <h3 className="text-[14px] font-black text-slate-950">
          Broker & Trading Account Comparisons
        </h3>
        <p className="mt-1 text-[10px] font-semibold text-slate-500">
          Compare brokers and accounts to find your best fit
        </p>
      </div>

      <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
        Compare
      </span>
    </div>

    {/* BROKER COMPARISONS */}
    <div className="mb-2 flex items-center justify-between px-1">
      <h4 className="text-[12px] font-black text-slate-800">
        Broker Comparisons
      </h4>
      <span className="text-[9px] font-bold text-slate-400">
        Popular Comparisons
      </span>
    </div>

    <div className="space-y-2">
      {featuredComparisons.slice(0, 4).map((item: any) => {
        const parts = item.label.split(" vs ");

        return (
          <Link
            key={item.href}
            href={item.href.startsWith("/en/") ? item.href : `/en${item.href}`}
            className="group/compare flex min-h-[48px] items-center justify-center rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-brand-200 hover:bg-brand-50"
          >
            <div className="grid w-full max-w-[330px] grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] items-center gap-3">
              <span className="truncate text-center text-[12px] font-black text-slate-800 group-hover/compare:text-brand-600">
                {parts[0]}
              </span>

              <span className="flex h-7 w-9 items-center justify-center rounded-full bg-white text-[10px] font-black text-slate-500">
                VS
              </span>

              <span className="truncate text-center text-[12px] font-black text-slate-800 group-hover/compare:text-brand-600">
                {parts[1]}
              </span>
            </div>
          </Link>
        );
      })}
    </div>

    {/* ACCOUNT COMPARISONS */}
    <div className="mt-4 border-t border-slate-100 pt-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <h4 className="text-[12px] font-black text-slate-800">
          Trading Account Comparisons
        </h4>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[9px] font-black text-brand-600">
          NEW
        </span>
      </div>

      <Link
        href="/en/compare-accounts"
        className="group/account flex min-h-[65px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-brand-200 hover:bg-brand-50"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-[13px] font-black text-brand-600 shadow-sm">
          VS
        </span>

        <div className="min-w-0 flex-1">
          <div className="text-[12px] font-black text-slate-800 group-hover/account:text-brand-600">
            Compare Any Two Trading Accounts
          </div>

          <div className="mt-1 text-[10px] font-semibold text-slate-500">
            Compare spreads, commissions and minimum deposits
          </div>
        </div>

        <span className="text-[13px] font-black text-brand-600">
          →
        </span>
      </Link>
    </div>

    {/* FOOTER */}
    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
      <Link
        href="/en/compare"
        className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 text-center text-[10px] font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
      >
        All Broker Comparisons
        <span>→</span>
      </Link>

      <Link
        href="/en/compare-accounts"
        className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50 px-2 text-center text-[10px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
      >
        All Account Comparisons
        <span>→</span>
      </Link>
    </div>
  </div>
</div>


                          {/* ===================================================
                BEST BROKERS
            =================================================== */}
            <div className="group relative">
              <Link href="/en/best-brokers" className={mainLinkClass}>
                Best Brokers

                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={wideDropdownClass}>
                <div className="grid grid-cols-[1.12fr_0.95fr_1.05fr] gap-5">

                  {/* ===================================================
                      COUNTRIES
                  =================================================== */}
                  <div className="flex flex-col border-r border-slate-200 pr-5">
                    <div className="mb-3 flex min-h-[44px] items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[14px] font-black text-slate-950">
                          Best Brokers by Country
                        </h3>

                        <p className="mt-1 text-[10px] font-semibold text-slate-500">
                          Find brokers available in your country
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                        By Location
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {extendedCountryMenuItems.map((item: any) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          title={item.label}
                          className="group/country flex h-[46px] items-center gap-2.5 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <img
                            src={item.flag}
                            alt={item.shortLabel}
                            className="h-6 w-6 shrink-0 rounded-full border border-white object-cover shadow-sm"
                          />

                          <span className="min-w-0 flex-1 text-center text-[11px] font-black text-slate-700 transition group-hover/country:text-brand-600">
                            {item.shortLabel}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/en/best-brokers"
                      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                    >
                      View All Countries
                      <span className="text-sm">→</span>
                    </Link>
                  </div>

                  {/* ===================================================
                      CATEGORIES
                  =================================================== */}
                  <div className="flex flex-col border-r border-slate-200 pr-5">
                    <div className="mb-3 min-h-[44px]">
                      <h3 className="text-[14px] font-black text-slate-950">
                        Best Brokers by Category
                      </h3>

                      <p className="mt-1 text-[10px] font-semibold text-slate-500">
                        Choose a market or trading category
                      </p>
                    </div>

                    {/* MARKETS */}
                    <div>
                      <div className="mb-2 text-[9px] font-black uppercase tracking-wide text-slate-400">
                        By Market
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/en/best-brokers"
                          className="group/market flex h-[60px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[9px] font-black text-brand-600 transition group-hover/market:bg-brand-600 group-hover/market:text-white">
                            FX
                          </span>

                          <span className="text-[11px] font-black text-slate-700 transition group-hover/market:text-brand-600">
                            Forex
                          </span>
                        </Link>

                        <Link
                          href="/en/best-brokers/stocks"
                          className="group/market flex h-[60px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[10px] font-black text-brand-600 transition group-hover/market:bg-brand-600 group-hover/market:text-white">
                            S
                          </span>

                          <span className="text-[11px] font-black text-slate-700 transition group-hover/market:text-brand-600">
                            Stocks
                          </span>
                        </Link>

                        <Link
                          href="/en/best-brokers/indices"
                          className="group/market flex h-[60px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[10px] font-black text-brand-600 transition group-hover/market:bg-brand-600 group-hover/market:text-white">
                            I
                          </span>

                          <span className="text-[11px] font-black text-slate-700 transition group-hover/market:text-brand-600">
                            Indices
                          </span>
                        </Link>

                        <Link
                          href="/en/best-brokers/commodities"
                          className="group/market flex h-[60px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[10px] font-black text-brand-600 transition group-hover/market:bg-brand-600 group-hover/market:text-white">
                            C
                          </span>

                          <span className="text-[11px] font-black text-slate-700 transition group-hover/market:text-brand-600">
                            Commodities
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* POPULAR CATEGORIES */}
                    <div className="mt-3">
                      <div className="mb-2 text-[9px] font-black uppercase tracking-wide text-slate-400">
                        Popular Categories
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            label: "Gold Trading",
                            href: "/en/best-brokers/gold",
                            symbol: "Au",
                          },
                          {
                            label: "Low Spreads",
                            href: "/en/lowest-spread-brokers",
                            symbol: "↔",
                          },
                          {
                            label: "Low Deposit",
                            href: "/en/best-brokers/low-minimum-deposit",
                            symbol: "$",
                          },
                          {
                            label: "Scalping",
                            href: "/en/best-brokers/scalping",
                            symbol: "⚡",
                          },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group/category flex h-[52px] items-center gap-2.5 rounded-[13px] border border-slate-200 bg-slate-50 px-2.5 transition hover:border-brand-200 hover:bg-brand-50"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white text-[9px] font-black text-brand-600 shadow-sm">
                              {item.symbol}
                            </span>

                            <span className="min-w-0 text-[10px] font-black leading-4 text-slate-700 transition group-hover/category:text-brand-600">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/en/best-brokers"
                      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                    >
                      View Best Brokers
                      <span className="text-sm">→</span>
                    </Link>
                  </div>

                  {/* ===================================================
                      ACCOUNT TYPES
                  =================================================== */}
                  <div className="flex flex-col">
                    <div className="mb-3 min-h-[44px]">
                      <h3 className="text-[14px] font-black text-slate-950">
                        Best Brokers by Account Type
                      </h3>

                      <p className="mt-1 text-[10px] font-semibold text-slate-500">
                        Compare accounts for your trading style
                      </p>
                    </div>

                    <div className="space-y-2">
                      {accountTypePagesEn.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          title={item.title}
                          className="group/account flex h-[56px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-[13px] font-black text-brand-600 shadow-sm transition group-hover/account:border-brand-200 group-hover/account:bg-brand-600 group-hover/account:text-white">
                            {item.symbol}
                          </span>

                          <div className="min-w-0 flex-1">
                            <span className="block text-[11px] font-black leading-5 text-slate-800 transition group-hover/account:text-brand-600">
                              {item.shortLabel}
                            </span>

                            <span className="mt-0.5 block text-[9px] font-semibold text-slate-500">
                              Compare top brokers
                            </span>
                          </div>

                          <span className="shrink-0 text-[12px] font-black text-slate-400 transition group-hover/account:translate-x-0.5 group-hover/account:text-brand-600">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* ACCOUNT GUIDE */}
                    <Link
                      href="/en/best-brokers"
                      className="group/guide mt-3 overflow-hidden rounded-[16px] border border-brand-100 bg-gradient-to-r from-brand-50/80 to-white transition hover:border-brand-200 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3 p-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-[15px] font-black text-white shadow-sm">
                          ?
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-black text-slate-800 transition group-hover/guide:text-brand-600">
                            Which account is right for me?
                          </div>

                          <div className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                            Compare the main account types
                          </div>
                        </div>

                        <span className="text-[13px] font-black text-brand-600 transition group-hover/guide:translate-x-0.5">
                          →
                        </span>
                      </div>
                    </Link>

                    <div className="mt-3 border-t border-slate-100 pt-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/en/best-brokers/low-minimum-deposit"
                          className="rounded-xl bg-slate-50 px-2 py-2.5 text-center transition hover:bg-brand-50"
                        >
                          <span className="block text-[9px] font-black text-slate-700">
                            Smaller Capital
                          </span>

                          <span className="mt-0.5 block text-[8px] font-bold text-slate-400">
                            Low Deposit
                          </span>
                        </Link>

                        <Link
                          href="/en/lowest-spread-brokers"
                          className="rounded-xl bg-slate-50 px-2 py-2.5 text-center transition hover:bg-brand-50"
                        >
                          <span className="block text-[9px] font-black text-slate-700">
                            Active Trading
                          </span>

                          <span className="mt-0.5 block text-[8px] font-bold text-slate-400">
                            Lower Spreads
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ===================================================
                LICENSES
            =================================================== */}
            <div className="group relative">
              <Link href="/en/licenses" className={mainLinkClass}>
                Licenses

                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[500px]`}>
                {/* HEADER */}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brand-50 text-[12px] font-black text-brand-600">
                          ✓
                        </span>

                        <h3 className="text-[14px] font-black text-slate-950">
                          Broker Licenses & Regulators
                        </h3>
                      </div>

                      <p className="ml-10 mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                        Explore major financial regulators and broker licenses
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                      License Guide
                    </span>
                  </div>
                </div>

                {/* REGULATORS */}
                <div>
                  <div className="mb-2 text-[9px] font-black uppercase tracking-wide text-slate-400">
                    Major Regulators
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        code: "FCA",
                        country: "United Kingdom",
                        href: "/en/licenses/fca",
                      },
                      {
                        code: "ASIC",
                        country: "Australia",
                        href: "/en/licenses/asic",
                      },
                      {
                        code: "CySEC",
                        country: "Cyprus",
                        href: "/en/licenses/cysec",
                      },
                      {
                        code: "DFSA",
                        country: "Dubai",
                        href: "/en/licenses/dfsa",
                      },
                      {
                        code: "FSCA",
                        country: "South Africa",
                        href: "/en/licenses/fsca",
                      },
                      {
                        code: "SCA",
                        country: "UAE",
                        href: "/en/licenses/sca",
                      },
                      {
                        code: "FSA",
                        country: "Seychelles",
                        href: "/en/licenses/fsa",
                      },
                      {
                        code: "CIMA",
                        country: "Cayman Islands",
                        href: "/en/licenses/cima",
                      },
                    ].map((regulator) => (
                      <Link
                        key={regulator.href}
                        href={regulator.href}
                        className="group/license flex h-[58px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                      >
                        <span className="flex h-9 min-w-[48px] shrink-0 items-center justify-center rounded-[10px] border border-slate-100 bg-white px-2 text-[10px] font-black text-brand-600 shadow-sm transition group-hover/license:border-brand-100 group-hover/license:bg-brand-600 group-hover/license:text-white">
                          {regulator.code}
                        </span>

                        <div className="min-w-0 flex-1">
                          <span className="block text-[11px] font-black text-slate-800 transition group-hover/license:text-brand-600">
                            {regulator.code} License
                          </span>

                          <span className="mt-0.5 block text-[9px] font-semibold text-slate-500">
                            {regulator.country}
                          </span>
                        </div>

                        <span className="shrink-0 text-[11px] font-black text-slate-400 transition group-hover/license:translate-x-0.5 group-hover/license:text-brand-600">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* LICENSE CHECK */}
                <Link
                  href="/en/licenses"
                  className="group/check mt-4 block overflow-hidden rounded-[16px] border border-brand-100 bg-gradient-to-r from-brand-50/80 to-white transition hover:border-brand-200 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3 p-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-[17px] font-black text-white shadow-sm">
                      ✓
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-black text-slate-900 transition group-hover/check:text-brand-600">
                        Verify a Broker License
                      </div>

                      <div className="mt-1 text-[9px] font-semibold leading-5 text-slate-500">
                        Search by broker name or license number and check the regulator
                      </div>
                    </div>

                    <span className="text-[14px] font-black text-brand-600 transition group-hover/check:translate-x-0.5">
                      →
                    </span>
                  </div>
                </Link>

                {/* FOOTER CTA */}
                <Link
                  href="/en/licenses"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                >
                  View All Licenses & Regulators
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* ===================================================
                TRADING TOOLS
            =================================================== */}
            <div className="group relative">
              <Link href="/en/tools" className={mainLinkClass}>
                Tools

                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[500px]`}>
                {/* HEADER */}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brand-50 text-[13px] font-black text-brand-600">
                          ∑
                        </span>

                        <h3 className="text-[14px] font-black text-slate-950">
                          Trading Tools & Calculators
                        </h3>
                      </div>

                      <p className="ml-10 mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                        Calculate risk, position size, margin and potential results
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                      Free Tools
                    </span>
                  </div>
                </div>

                {/* FEATURED TOOLS */}
                <div>
                  <div className="mb-2 text-[9px] font-black uppercase tracking-wide text-slate-400">
                    Popular Trading Tools
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {tradingToolsEn.slice(0, 8).map((tool, index) => {
                      const toolSymbols = [
                        "%",
                        "L",
                        "P",
                        "$",
                        "M",
                        "ƒ",
                        "R",
                        "+",
                      ];

                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="group/tool flex h-[58px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-slate-100 bg-white text-[11px] font-black text-brand-600 shadow-sm transition group-hover/tool:border-brand-100 group-hover/tool:bg-brand-600 group-hover/tool:text-white">
                            {toolSymbols[index] ?? "•"}
                          </span>

                          <span className="min-w-0 flex-1 text-[11px] font-black leading-5 text-slate-800 transition group-hover/tool:text-brand-600">
                            {tool.title}
                          </span>

                          <span className="shrink-0 text-[11px] font-black text-slate-400 transition group-hover/tool:translate-x-0.5 group-hover/tool:text-brand-600">
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* QUICK GROUPS */}
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="block text-[9px] font-black text-slate-700">
                        Risk Management
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        Position Sizing
                      </span>
                    </div>

                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="block text-[9px] font-black text-slate-700">
                        Profit Planning
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        Before Trading
                      </span>
                    </div>

                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="block text-[9px] font-black text-slate-700">
                        Margin
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        & Leverage
                      </span>
                    </div>
                  </div>
                </div>

                {/* FOOTER CTA */}
                <Link
                  href="/en/tools"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                >
                  View All Trading Tools
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* ===================================================
                LEARN TRADING
            =================================================== */}
            <div className="group relative">
              <Link
                href="/en/learn-trading"
                className={mainLinkClass}
              >
                Learn Trading

                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[500px]`}>
                {/* HEADER */}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brand-50 text-[13px] font-black text-brand-600">
                          📘
                        </span>

                        <h3 className="text-[14px] font-black text-slate-950">
                          Learn Trading Step by Step
                        </h3>
                      </div>

                      <p className="ml-10 mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                        Guides, market concepts and trading strategies
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                      Learning Hub
                    </span>
                  </div>
                </div>

                {/* MAIN GUIDE */}
                {learnTradingMenuItems.slice(0, 1).map((item: any) => (
                  <Link
                    key={item.href}
                    href={getLearnTradingHref(item)}
                    className="group/learn block overflow-hidden rounded-[16px] border border-brand-100 bg-gradient-to-r from-brand-50/80 to-white transition hover:border-brand-200 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 p-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-[15px] font-black text-white shadow-sm">
                        01
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-black leading-6 text-slate-900 transition group-hover/learn:text-brand-600">
                          {getLearnTradingTitle(item)}
                        </div>

                        <div className="mt-0.5 text-[9px] font-semibold leading-5 text-slate-500">
                          Start with the fundamentals of online trading
                        </div>
                      </div>

                      <span className="shrink-0 text-[14px] font-black text-brand-600 transition group-hover/learn:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </Link>
                ))}

                {/* TOPICS */}
                <div className="mt-4">
                  <div className="mb-2 text-[9px] font-black uppercase tracking-wide text-slate-400">
                    Explore Trading Topics
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/en/learn-trading/economic-indicators"
                      className="group/topic flex min-h-[82px] flex-col justify-between rounded-[14px] border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-slate-100 bg-white text-[12px] font-black text-brand-600 shadow-sm transition group-hover/topic:bg-brand-600 group-hover/topic:text-white">
                          %
                        </span>

                        <span className="text-[11px] font-black text-slate-400 transition group-hover/topic:translate-x-0.5 group-hover/topic:text-brand-600">
                          →
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="text-[11px] font-black leading-5 text-slate-800 transition group-hover/topic:text-brand-600">
                          Economic Indicators
                        </div>

                        <div className="mt-0.5 text-[8px] font-semibold leading-4 text-slate-500">
                          How data moves financial markets
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/en/strategies"
                      className="group/topic flex min-h-[82px] flex-col justify-between rounded-[14px] border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-slate-100 bg-white text-[11px] font-black text-brand-600 shadow-sm transition group-hover/topic:bg-brand-600 group-hover/topic:text-white">
                          ↗
                        </span>

                        <span className="text-[11px] font-black text-slate-400 transition group-hover/topic:translate-x-0.5 group-hover/topic:text-brand-600">
                          →
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="text-[11px] font-black leading-5 text-slate-800 transition group-hover/topic:text-brand-600">
                          Forex Strategies
                        </div>

                        <div className="mt-0.5 text-[8px] font-semibold leading-4 text-slate-500">
                          Trading methods and strategies
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* LEARNING PATH */}
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="mb-2 text-[9px] font-black uppercase tracking-wide text-slate-400">
                    Learning Path
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-[9px] font-black text-brand-600">
                        1
                      </span>

                      <span className="mt-1.5 block text-[9px] font-black text-slate-700">
                        Basics
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        Learn Trading
                      </span>
                    </div>

                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-[9px] font-black text-brand-600">
                        2
                      </span>

                      <span className="mt-1.5 block text-[9px] font-black text-slate-700">
                        Market Analysis
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        Read the Market
                      </span>
                    </div>

                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-[9px] font-black text-brand-600">
                        3
                      </span>

                      <span className="mt-1.5 block text-[9px] font-black text-slate-700">
                        Strategies
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        Build Your Approach
                      </span>
                    </div>
                  </div>
                </div>

                {/* FOOTER CTA */}
                <Link
                  href="/en/learn-trading"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                >
                  View All Trading Guides
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            <Link href="/en/about" className={mainLinkClass}>
              About
            </Link>
          </nav>

          <div className="hidden min-w-[125px] items-center justify-start pl-3 2xl:flex xl:pl-5">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-blue-300 bg-white px-3 py-1.5 text-[12px] font-bold text-brand-600 shadow-sm transition hover:border-blue-400 hover:bg-brand-50"
            >
              العربية
            </Link>
          </div>

          <MobileNavMenu
            topBrokers={topBrokers}
            countryMenuItems={countryMenuItems}
            featuredCategories={featuredCategories}
            featuredComparisons={featuredComparisons}
            learnTradingMenuItems={learnTradingMenuItems}
          />
        </div>
      </div>
    </header>
  );
}