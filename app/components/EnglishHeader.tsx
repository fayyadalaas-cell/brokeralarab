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

const mainLinkClass =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-extrabold text-slate-700 transition hover:bg-slate-100";

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
    return (
    <header
      dir="ltr"
      className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        <div
          className="relative flex h-16 items-center justify-between lg:h-20"
          dir="ltr"
        >
          <Link href="/en" className="min-w-0 shrink-0">
            <Image
              src="/logo/Asset 1@3x.png"
              alt="Broker Al Arab"
              width={300}
              height={90}
              priority
              className="h-auto w-[120px] sm:w-[135px] lg:w-[180px]"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
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

            {/* BEST BROKERS */}
            <div className="group relative">
              <Link href="/en/best-brokers" className={mainLinkClass}>
                Best Brokers
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[380px]`}>
                <div className="px-3 pb-3 pt-1 text-xs font-black tracking-wide text-slate-500">
                  Best Broker Guides
                </div>

                <div className="grid gap-2.5">
                  <Link
                    href="/en/best-brokers"
                    className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-[13px] font-extrabold leading-6 text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Best Forex Brokers in 2026
                  </Link>

                  <Link
                    href="/en/best-brokers/gold"
                    className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-[13px] font-extrabold leading-6 text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Best Gold Brokers
                  </Link>
                </div>
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

                <div className="my-4 h-px bg-slate-200" />

                <div className="px-3 pb-2 text-xs font-black tracking-wide text-slate-500">
                  Broker Verification Tools
                </div>

                {verificationToolsEn.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group/license flex items-center justify-between gap-4 rounded-[22px] border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-slate-50 px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_30px_rgba(59,130,246,0.14)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-base font-black text-white shadow-md transition group-hover/license:scale-105">
                      →
                    </span>

                    <div className="min-w-0 flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <div className="text-[15px] font-black text-slate-950 transition group-hover/license:text-brand-600">
                          {tool.title}
                        </div>

                        <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-brand-700">
                          New
                        </span>
                      </div>

                      <div className="mt-1 text-[12px] font-bold leading-6 text-slate-500">
                        {tool.desc}
                      </div>
                    </div>
                  </Link>
                ))}

                <Link
                  href="/en/tools"
                  className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                >
                  View All Tools →
                </Link>
              </div>
            </div>

          {/* LEARN TRADING */}
<div className="group relative">
  <Link
    href="/en/learn-trading/how-to-start-trading-from-zero"
    className={mainLinkClass}
  >
    Learn Trading
    <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
      ▼
    </span>
  </Link>

  <div className={`${dropdownClass} w-[420px]`}>
    <div className="px-3 pb-3 pt-1 text-xs font-black tracking-wide text-slate-500">
      Learn Trading Guide
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

        <div className={logoBoxClass}>
          <Image
            src={item.image || "/articles/how-to-start-trading-from-zero.png"}
            alt={getLearnTradingTitle(item)}
            width={40}
            height={40}
            className="h-full w-full object-contain p-1"
          />
        </div>
      </Link>
    ))}

    <Link
      href="/en/learn-trading/how-to-start-trading-from-zero"
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

          <div className="hidden min-w-[105px] items-center justify-end lg:flex">
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