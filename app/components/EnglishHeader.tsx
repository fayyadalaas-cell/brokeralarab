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
              className="h-auto w-[120px] sm:w-[135px] lg:w-[200px]"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
            <Link
              href="/en"
              className="rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
            >
              Home
            </Link>

            <div className="group relative">
              <Link
                href="/en/brokers"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
              >
                Broker Reviews
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="invisible absolute left-0 top-full z-50 mt-1 w-[360px] translate-y-2 rounded-[28px] border border-slate-200 bg-white p-3 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="px-3 pb-2 pt-1 text-xs font-black tracking-wide text-slate-500">
                  Top 5 Reviews Right Now
                </div>

                {topBrokers.length > 0 ? (
                  topBrokers.map((broker: any) => (
                    <Link
                      key={broker.slug}
                      href={`/en/brokers/${broker.slug}`}
                      className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3 transition hover:bg-blue-50"
                    >
                      <div className="min-w-0 text-left">
                        <div className="text-[15px] font-extrabold text-slate-800">
                          {broker.name_en || broker.name} Review
                        </div>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
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
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  View All Reviews →
                </Link>
              </div>
            </div>

            <div className="group relative">
              <Link
                href="/en/compare"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
              >
                Comparisons
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="invisible absolute left-0 top-full z-50 mt-1 w-[340px] translate-y-2 rounded-[28px] border border-slate-200 bg-white p-3 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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
                      className="flex items-center justify-between gap-3 rounded-2xl px-3 py-3 transition hover:bg-blue-50"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
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

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
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
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  View All Comparisons →
                </Link>
              </div>
            </div>

            <div className="group relative">
              <Link
                href="/en/best-brokers"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
              >
                Best Brokers
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="invisible absolute left-0 top-full z-50 mt-1 w-[360px] translate-y-2 rounded-[28px] border border-slate-200 bg-white p-4 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="px-2 pb-3 pt-1 text-xs font-black tracking-wide text-slate-500">
  Best Broker Guides
</div>

<Link
  href="/en/best-brokers"
  className="block rounded-2xl px-3 py-3 transition hover:bg-blue-50"
>
  <div className="text-[16px] font-black text-slate-900">
    Best Forex Brokers in 2026
  </div>
</Link>

<Link
  href="/en/best-brokers/gold"
  className="block rounded-2xl px-3 py-3 transition hover:bg-blue-50"
>
  <div className="text-[16px] font-black text-slate-900">
    Best Gold Brokers
  </div>
</Link>
              </div>
            </div>

            <div className="group relative">
              <Link
                href="/en/learn-trading/how-to-start-trading-from-zero"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
              >
                Learn Trading
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="invisible absolute left-0 top-full z-50 mt-3 w-[320px] translate-y-2 rounded-[24px] border border-slate-200 bg-white p-4 opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {learnTradingMenuItems.slice(0, 1).map((item: any) => (
                  <Link
                    key={item.href}
                    href={getLearnTradingHref(item)}
                    className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                      <Image
                        src={
                          item.image ||
                          "/articles/how-to-start-trading-from-zero.png"
                        }
                        alt={getLearnTradingTitle(item)}
                        fill
                        className="object-contain p-1.5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-[16px] font-black leading-7 text-slate-950">
                        {getLearnTradingTitle(item)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/en/about"
              className="rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
            >
              About
            </Link>
          </nav>

          <div className="hidden min-w-[120px] items-center justify-end lg:flex">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-blue-300 bg-white px-4 py-2 text-[13px] font-bold text-blue-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50"
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