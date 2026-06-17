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

  // 🔴 الشركات اللي كانت عندك المشكلة فيها
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

const brokerNamesAr: Record<string, string> = {
  exness: "إكسنس",
  xm: "إكس إم",
  pepperstone: "بيبرستون",
  fxpro: "اف اكس برو",
  avatrade: "افاتريد",
  alpari: "الباري",
  xs: "اكس اس",
  equiti: "اكويتي",
  vantage: "فانتج",
};

export default function ArabicHeader({
  topBrokers,
  countryMenuItems,
  featuredCategories,
  featuredComparisons,
  learnTradingMenuItems,
}: any) {
  const extendedCountryMenuItems = [
    ...countryMenuItems,
    {
      label: "أفضل شركات التداول في العراق",
      shortLabel: "العراق",
      href: "/best-brokers/iraq",
      flag: "https://flagcdn.com/w80/iq.png",
    },
    {
      label: "أفضل شركات التداول في ليبيا",
      shortLabel: "ليبيا",
      href: "/best-brokers/libya",
      flag: "https://flagcdn.com/w80/ly.png",
    },
    {
      label: "أفضل شركات التداول في سوريا",
      shortLabel: "سوريا",
      href: "/best-brokers/syria",
      flag: "https://flagcdn.com/w80/sy.png",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        <div className="relative flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="min-w-0 shrink-0 lg:justify-self-end">
           <Image
  src="/logo/Asset 4@6x.png"
  alt="Broker Al Arab"
  width={500}
  height={160}
  priority
  className="h-auto w-[130px] sm:w-[155px] lg:w-[200px]"
/>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
            <Link
              href="/"
              className="rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
            >
              الرئيسية
            </Link>

            {/* REVIEWS */}
            <div className="group relative">
              <Link
                href="/brokers"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
              >
                تقييمات الوسطاء
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="invisible absolute right-0 top-full z-50 mt-1 w-[360px] translate-y-2 rounded-[28px] border border-slate-200 bg-white p-3 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="px-3 pb-2 pt-1 text-xs font-black tracking-wide text-slate-500">
                  أعلى 5 تقييمات حاليًا
                </div>

                {topBrokers.length > 0 ? (
                  topBrokers.map((broker: any) => (
                    <Link
                      key={broker.slug}
                      href={`/brokers/${broker.slug}`}
                      className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3 transition hover:bg-blue-50"
                    >
                      <div className="min-w-0 text-right">
                        <div className="text-[15px] font-extrabold text-slate-800">
                          تقييم {broker.name}
                        </div>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                        <Image
                          src={broker.logo || getBrokerLogo(broker.slug)}
                          alt={broker.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-3 text-sm font-bold text-slate-500">
                    لا توجد تقييمات متاحة حاليًا.
                  </div>
                )}

                <Link
                  href="/brokers"
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  جميع المراجعات ←
                </Link>
              </div>
            </div>

            {/* COMPARE */}
            <div className="group relative">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
              >
                المقارنات
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="invisible absolute right-0 top-full z-50 mt-1 w-[420px] translate-y-2 rounded-[28px] border border-slate-200 bg-white p-3 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="px-3 pb-2 pt-1 text-xs font-black tracking-wide text-slate-500">
                  أشهر المقارنات
                </div>

               {featuredComparisons.map((item: any) => {
  const parts = item.label.split(" vs ");
  const leftSlug = parts[0]?.toLowerCase().replace(/\s+/g, "-");
  const rightSlug = parts[1]?.toLowerCase().replace(/\s+/g, "-");

  const leftName = brokerNamesAr[leftSlug] || parts[0];
  const rightName = brokerNamesAr[rightSlug] || parts[1];

  return (
    <Link
      key={item.href}
      href={item.href}
      className="grid grid-cols-[52px_1fr_44px_1fr_52px] items-center gap-2 rounded-2xl px-3 py-3 transition hover:bg-blue-50"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
        <Image
          src={getBrokerLogo(rightSlug)}
          alt={rightName}
          width={40}
          height={40}
          className="h-full w-full object-contain p-1"
        />
      </div>

      <span className="min-w-0 truncate text-right text-[14px] font-extrabold text-slate-800">
        {rightName}
      </span>

      <span className="mx-auto inline-flex shrink-0 items-center justify-center rounded-full bg-slate-100 px-2.5 py-[2px] text-[11px] font-extrabold text-slate-600">
        VS
      </span>

      <span className="min-w-0 truncate text-left text-[14px] font-extrabold text-slate-800">
        {leftName}
      </span>

      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
        <Image
          src={getBrokerLogo(leftSlug)}
          alt={leftName}
          width={40}
          height={40}
          className="h-full w-full object-contain p-1"
        />
      </div>
    </Link>
  );
})}

<Link
  href="/compare"
  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
>
  جميع المقارنات ←
</Link>
              </div>
            </div>

            {/* BEST BROKERS */}
            <div className="group relative">
              <Link
                href="/best-brokers"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
              >
                أفضل الوسطاء
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="invisible absolute right-0 top-full z-50 mt-1 w-[640px] max-w-[calc(100vw-40px)] translate-y-2 rounded-[30px] border border-slate-200 bg-white p-5 opacity-0 shadow-[0_28px_80px_rgba(15,23,42,0.15)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid grid-cols-[1.15fr_0.95fr] gap-6 divide-x divide-slate-200 divide-x-reverse">
                  {/* COUNTRIES */}
                  <div className="pr-1">
                    <div className="mb-4 text-sm font-black text-slate-900">
                      أفضل الوسطاء حسب الدولة
                    </div>

                    <div className="grid grid-cols-3 gap-x-3 gap-y-1">
  {extendedCountryMenuItems.map((item: any) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-blue-50"
                          title={item.label}
                        >
                         <img
  src={item.flag}
  alt={item.shortLabel}
  className="h-[22px] w-[22px] shrink-0 rounded-full object-cover"
/>
                          <span className="whitespace-nowrap text-[14px] font-bold text-slate-700 transition hover:text-blue-700">
                            {item.shortLabel}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/best-brokers"
                      className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                    >
                      جميع الدول ←
                    </Link>
                  </div>

                  {/* CATEGORIES */}
                  <div className="pl-5">
                    <div className="mb-4 text-sm font-black text-slate-900">
                      أفضل الوسطاء حسب الفئة
                    </div>

                    <div className="grid gap-2">
                      {featuredCategories.map((item: any) => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          className="rounded-2xl px-3 py-3 text-[15px] font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/best-brokers"
                      className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                    >
                      جميع التصنيفات ←
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* LEARN TRADING */}
            <div className="group relative">
              <Link
                href="/learn-trading/how-to-start-trading-from-zero"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
              >
                تعلم التداول
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="invisible absolute right-0 top-full z-50 mt-3 w-[320px] translate-y-2 rounded-[24px] border border-slate-200 bg-white p-4 opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="mb-3 flex items-center justify-between"></div>

                {learnTradingMenuItems.slice(0, 1).map((item: any) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                        <Image
                          src={item.image || "/articles/how-to-start-trading-from-zero.png"}
                          alt={item.title}
                          fill
                          className="object-contain p-1.5"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-[16px] font-black leading-7 text-slate-950">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href="/about"
              className="rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
            >
              عن الموقع
            </Link>
          </nav>

     <div className="hidden lg:flex items-center justify-start min-w-[120px]">
  <Link
    href="/en"
    className="inline-flex items-center rounded-full border border-blue-300 bg-white px-4 py-2 text-[13px] font-bold text-blue-700 shadow-sm transition hover:bg-blue-50 hover:border-blue-400"
  >
    English
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