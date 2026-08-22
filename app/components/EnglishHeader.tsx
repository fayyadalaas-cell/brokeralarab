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

const menuCardClass =
  "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-[13px] font-extrabold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600";

const logoBoxClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm";

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
          className="relative flex h-16 items-center justify-between lg:h-20"
          dir="ltr"
        >
          <Link href="/en" className="min-w-0 shrink-0 lg:justify-self-start">
            <Image
              src="/logo/Asset 1@3x.png"
              alt="Broker Alarab"
              width={300}
              height={90}
              priority
              className="h-auto w-[130px] sm:w-[155px] lg:w-[180px]"
            />
          </Link>

          <nav className="mx-8 hidden flex-1 items-center justify-evenly gap-2 lg:flex xl:mx-12 xl:gap-4">
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

            {/* COMPARE */}
            <div className="group relative">
              <Link href="/en/compare" className={mainLinkClass}>
                Comparisons
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[420px]`}>
                <div className="px-3 pb-2 pt-1 text-xs font-black tracking-wide text-slate-500">
                  Popular Comparisons
                </div>

                {featuredComparisons.map((item: any) => {
                  const parts = item.label.split(" vs ");
                  const leftSlug = parts[0]?.toLowerCase().replace(/\s+/g, "-");
                  const rightSlug = parts[1]?.toLowerCase().replace(/\s+/g, "-");

                  return (
                    <Link
                      key={item.href}
                      href={`/en${item.href}`}
                      className={`${menuCardClass} mb-2 flex items-center justify-between gap-3`}
                    >
                      <div className={logoBoxClass}>
                        <Image
                          src={getBrokerLogo(leftSlug)}
                          alt={leftSlug || ""}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>

                      <div className="flex-1 text-center text-[15px] font-extrabold text-slate-800">
                        {item.label}
                      </div>

                      <div className={logoBoxClass}>
                        <Image
                          src={getBrokerLogo(rightSlug)}
                          alt={rightSlug || ""}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                    </Link>
                  );
                })}

                <Link
                  href="/en/compare"
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                >
                  View All Comparisons →
                </Link>
              </div>
            </div>

               {/* =========================================================
    BEST BROKERS
========================================================= */}
<div className="group relative">

  <Link
    href="/en/best-brokers"
    className={mainLinkClass}
  >
    Best Brokers

    <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
      ▼
    </span>
  </Link>


  <div
    className={`${dropdownClass} w-[940px] max-w-[calc(100vw-32px)] p-5`}
  >

    <div className="grid grid-cols-[1.35fr_0.85fr_0.85fr] items-stretch gap-5">

      {/* =====================================================
          COUNTRIES
      ====================================================== */}
      <div className="flex h-full flex-col border-r border-slate-200 pr-5">

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
            By Market
          </span>

        </div>


        <div className="grid grid-cols-3 gap-2.5">

          {extendedCountryMenuItems.map(
            (item: any) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className="group/country flex h-[48px] items-center gap-2.5 rounded-[15px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
              >

                <img
                  src={item.flag}
                  alt={item.shortLabel}
                  className="h-6 w-6 shrink-0 rounded-full border border-white object-cover shadow-sm"
                />


                <span className="min-w-0 flex-1 text-center text-[12px] font-black text-slate-700 transition group-hover/country:text-brand-600">
                  {item.shortLabel}
                </span>

              </Link>
            ),
          )}

        </div>


        <div className="mt-auto pt-3">

          <Link
            href="/en/best-brokers"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
          >
            View All Countries

            <span className="text-sm">
              →
            </span>
          </Link>

        </div>

      </div>


      {/* =====================================================
          CATEGORIES
      ====================================================== */}
      <div className="flex h-full flex-col border-r border-slate-200 pr-5">

        <div className="mb-3 min-h-[44px]">

          <h3 className="text-[14px] font-black text-slate-950">
            Best Brokers by Category
          </h3>

          <p className="mt-1 text-[10px] font-semibold text-slate-500">
            Popular broker rankings
          </p>

        </div>


        <div className="space-y-2">

          {[
            {
              label: "Best Forex Brokers in 2026",
              href: "/en/best-brokers",
            },

            {
              label: "Best Low Spread Forex Brokers",
              href: "/en/lowest-spread-brokers",
            },

            {
              label: "Best Gold Trading Brokers",
              href: "/en/best-brokers/gold",
            },

            {
              label: "Low Minimum Deposit Brokers",
              href: "/en/best-brokers/low-minimum-deposit",
            },

            {
              label: "Best Scalping Brokers",
              href: "/en/best-brokers/scalping",
            },
          ].map((item) => (

            <Link
              key={item.href}
              href={item.href}
              className="group/category flex min-h-[48px] items-center justify-between gap-3 rounded-[15px] border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition hover:border-brand-200 hover:bg-brand-50"
            >

              <span className="min-w-0 text-[12px] font-black leading-5 text-slate-700 transition group-hover/category:text-brand-600">
                {item.label}
              </span>


              <span className="shrink-0 text-[12px] font-black text-slate-400 transition group-hover/category:translate-x-0.5 group-hover/category:text-brand-600">
                →
              </span>

            </Link>

          ))}

        </div>


        <div className="mt-auto pt-3">

          <Link
            href="/en/best-brokers"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
          >
            View All Rankings

            <span className="text-sm">
              →
            </span>
          </Link>

        </div>

      </div>


      {/* =====================================================
          ACCOUNT TYPES
      ====================================================== */}
      <div className="flex h-full flex-col">

        <div className="mb-3 min-h-[44px]">

          <h3 className="text-[14px] font-black text-slate-950">
            Best Brokers by Account Type
          </h3>

          <p className="mt-1 text-[10px] font-semibold text-slate-500">
            Choose the account that fits your trading style
          </p>

        </div>


        <div className="space-y-2">

          {accountTypePagesEn.map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                className="group/account flex min-h-[56px] items-center gap-3 rounded-[15px] border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:border-brand-200 hover:bg-brand-50"
              >

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-[13px] font-black text-brand-600 shadow-sm transition group-hover/account:border-brand-200 group-hover/account:bg-brand-600 group-hover/account:text-white">
                  {item.symbol}
                </span>


                <div className="min-w-0 flex-1">

                  <span className="block text-[12px] font-black leading-5 text-slate-800 transition group-hover/account:text-brand-600">
                    {item.shortLabel}
                  </span>

                  <span className="mt-0.5 block text-[9px] font-semibold text-slate-500">
                    Compare the best brokers
                  </span>

                </div>


                <span className="shrink-0 text-[12px] font-black text-slate-400 transition group-hover/account:translate-x-0.5 group-hover/account:text-brand-600">
                  →
                </span>

              </Link>
            ),
          )}

        </div>


        <div className="mt-auto pt-3">

          <div className="flex h-11 w-full items-center justify-center rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-center">

            <p className="text-[10px] font-bold leading-5 text-brand-700">
              Choose the account type that fits your trading style
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

                        {/* LICENSES */}
            <div className="group relative">
              <Link href="/en/licenses" className={mainLinkClass}>
                Licenses
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[460px]`}>
                <div className="px-3 pb-3 pt-1 text-xs font-black tracking-wide text-slate-500">
                  Major Financial Regulators
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      title: "FCA License - United Kingdom",
                      href: "/en/licenses/fca",
                    },
                    {
                      title: "ASIC License - Australia",
                      href: "/en/licenses/asic",
                    },
                    {
                      title: "CySEC License - Cyprus",
                      href: "/en/licenses/cysec",
                    },
                    {
                      title: "DFSA License - Dubai",
                      href: "/en/licenses/dfsa",
                    },
                    {
                      title: "FSCA License - South Africa",
                      href: "/en/licenses/fsca",
                    },
                    {
                      title: "SCA License - UAE",
                      href: "/en/licenses/sca",
                    },
                    {
                      title: "FSA License - Seychelles",
                      href: "/en/licenses/fsa",
                    },
                    {
                      title: "CIMA License - Cayman Islands",
                      href: "/en/licenses/cima",
                    },
                  ].map((regulator) => (
                    <Link
                      key={regulator.href}
                      href={regulator.href}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-[13px] font-extrabold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                    >
                      {regulator.title}
                    </Link>
                  ))}
                </div>

                <div className="my-4 h-px bg-slate-200" />

                <Link
                  href="/en/licenses"
                  className={`${menuCardClass} flex items-center justify-between gap-4`}
                >
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-[13px] font-extrabold text-slate-800">
                      Verify a Broker License
                    </div>

                    <div className="mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                      Search by broker name or license number and verify the regulator
                    </div>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg font-black text-brand-600 shadow-sm">
                    →
                  </span>
                </Link>

                <Link
                  href="/en/licenses"
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                >
                  View All Licenses & Regulators →
                </Link>
              </div>
            </div>

            {/* TRADING TOOLS */}
            <div className="group relative">
              <Link href="/en/tools" className={mainLinkClass}>
                Tools
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[460px]`}>
                <div className="px-3 pb-3 pt-1 text-xs font-black tracking-wide text-slate-500">
                  Trading Calculators & Tools
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {tradingToolsEn.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-[13px] font-extrabold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/en/tools"
                  className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                >
                  View All Trading Tools →
                </Link>
              </div>
            </div>

          {/* LEARN TRADING */}
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

  <div className={`${dropdownClass} w-[420px]`}>
    <div className="px-3 pb-3 pt-1 text-xs font-black tracking-wide text-slate-500">
      Trading Guides
    </div>

    {learnTradingMenuItems.slice(0, 1).map((item: any) => (
  <Link
    key={item.href}
    href={getLearnTradingHref(item)}
    className={`${menuCardClass} flex items-center justify-between gap-4`}
  >
    <div className="min-w-0 flex-1">
      <div className="line-clamp-2 text-[13px] font-extrabold leading-6 text-slate-700">
        {getLearnTradingTitle(item)}
      </div>
    </div>

    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg font-black text-brand-600 shadow-sm">
      →
    </span>
  </Link>
))}
<Link
  href="/en/learn-trading/economic-indicators"
  className={`${menuCardClass} mt-2 flex items-center justify-between gap-4`}
>
  <div className="min-w-0 flex-1">
    <div className="line-clamp-2 text-[13px] font-extrabold leading-6 text-slate-700">
      Economic Indicators and Their Impact on Trading
    </div>
  </div>

  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg font-black text-brand-600 shadow-sm">
    →
  </span>
</Link>
    <Link
      href="/en/learn-trading"
      className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
    >
      View All Guides →
    </Link>
  </div>
</div>

            <Link href="/en/about" className={mainLinkClass}>
              About
            </Link>
          </nav>

          <div className="hidden min-w-[125px] items-center justify-start pl-3 lg:flex xl:pl-5">
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