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

const tradingToolsAr = [
  { title: "حاسبة إدارة المخاطر", href: "/tools/risk-calculator" },
  { title: "حاسبة حجم اللوت", href: "/tools/lot-size-calculator" },
  { title: "حاسبة النقاط", href: "/tools/pip-calculator" },
  { title: "حاسبة الأرباح والخسائر", href: "/tools/profit-calculator" },
  { title: "حاسبة الهامش", href: "/tools/margin-calculator" },
  { title: "حاسبة فيبوناتشي", href: "/tools/fibonacci-calculator" },
  { title: "حاسبة نقاط الارتكاز", href: "/tools/pivot-point-calculator" },
  { title: "حاسبة الفائدة المركبة", href: "/tools/compound-calculator" },
];

const verificationToolsAr = [
  {
    title: "التحقق من تراخيص الوسطاء",
    desc: "ابحث باسم الشركة أو رقم الترخيص وتحقق من الجهة الرقابية.",
    href: "/licenses",
  },
];

const mainLinkClass =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-extrabold text-slate-700 transition hover:bg-slate-100 xl:px-5";

const dropdownClass =
  "invisible absolute right-0 top-full z-50 mt-3 translate-y-2 rounded-[28px] border border-slate-200 bg-white p-4 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100";

const menuCardClass =
  "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-[13px] font-extrabold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600";

const logoBoxClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm";

export default function ArabicHeader({
  topBrokers,
  countryMenuItems,
  featuredCategories,
  featuredComparisons,
  learnTradingMenuItems,
  wide = false,
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
     <div
  className={`mx-auto w-full ${
    wide ? "max-w-[1560px]" : "max-w-7xl"
  } px-4 sm:px-6 lg:px-8`}
>
        <div dir="rtl" className="relative flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="min-w-0 shrink-0 lg:justify-self-end">
            <Image
              src="/logo/Asset 4@6x.png"
              alt="Broker Alarab"
              width={500}
              height={160}
              priority
              className="h-auto w-[130px] sm:w-[155px] lg:w-[180px]"
            />
          </Link>

          <nav
  className={`hidden items-center justify-center lg:flex ${
    wide
      ? "mx-8 flex-1 justify-evenly gap-2 xl:mx-12 xl:gap-4"
      : "flex-1 gap-0.5 xl:gap-1"
  }`}
>
            {/* REVIEWS */}
            <div className="group relative">
              <Link href="/brokers" className={mainLinkClass}>
                تقييمات الوسطاء
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[460px]`}>
                <div className="px-3 pb-2 pt-1 text-xs font-black tracking-wide text-slate-500">
                  أعلى 5 تقييمات حاليًا
                </div>

                {topBrokers.length > 0 ? (
                  topBrokers.map((broker: any) => (
                    <Link
                      key={broker.slug}
                      href={`/brokers/${broker.slug}`}
                      className={`${menuCardClass} mb-2 flex items-center justify-between gap-4 text-right`}
                    >
                      <div className="min-w-0 text-right">
                        <div className="text-[15px] font-extrabold text-slate-800">
                          تقييم {broker.name}
                        </div>
                      </div>

                      <div className={logoBoxClass}>
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
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                >
                  جميع المراجعات ←
                </Link>
              </div>
            </div>

            {/* COMPARE */}
            <div className="group relative">
              <Link href="/compare" className={mainLinkClass}>
                المقارنات
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[460px]`}>
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
                      className={`${menuCardClass} mb-2 grid grid-cols-[52px_1fr_44px_1fr_52px] items-center gap-2`}
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
                  className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                >
                  جميع المقارنات ←
                </Link>
              </div>
            </div>

            {/* BEST BROKERS */}
            <div className="group relative">
              <Link href="/best-brokers" className={mainLinkClass}>
                أفضل الوسطاء
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={`${dropdownClass} w-[760px] max-w-[calc(100vw-40px)]`}>
                <div className="grid grid-cols-[1.25fr_0.95fr] gap-6 divide-x divide-slate-200 divide-x-reverse">
                  <div className="pr-1">
                    <div className="mb-4 text-sm font-black text-slate-900">
                      أفضل الوسطاء حسب الدولة
                    </div>

                    <div className="grid grid-cols-3 gap-3.5">
                      {extendedCountryMenuItems.map((item: any) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex h-[52px] min-w-[120px] items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[13px] font-extrabold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                          title={item.label}
                        >
                          <img
                            src={item.flag}
                            alt={item.shortLabel}
                            className="h-[22px] w-[22px] shrink-0 rounded-full object-cover"
                          />
                         <span className="flex-1 text-center text-[13px] font-extrabold text-slate-700">
                            {item.shortLabel}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/best-brokers"
                      className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                    >
                      جميع الدول ←
                    </Link>
                  </div>

                  <div className="pl-6">
                    <div className="mb-4 text-sm font-black text-slate-900">
                      أفضل الوسطاء حسب الفئة
                    </div>

                    <div className="grid gap-2.5">
                      {featuredCategories.map((item: any) => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-right text-[13px] font-extrabold leading-6 text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/best-brokers"
                      className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                    >
                      جميع التصنيفات ←
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* TRADING TOOLS */}
            <div className="group relative">
              <Link href="/tools" className={mainLinkClass}>
                الأدوات
                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

           <div className="invisible absolute right-0 top-full z-50 mt-3 w-[460px] translate-y-2 rounded-[28px] border border-slate-200 bg-white p-4 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
  <div className="px-3 pb-3 pt-1 text-xs font-black tracking-wide text-slate-500">
    حاسبات وأدوات للمتداولين
  </div>

  <div className="grid grid-cols-2 gap-2">
    {tradingToolsAr.map((tool) => (
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
    أدوات التحقق
  </div>

  {verificationToolsAr.map((tool) => (
    <Link
      key={tool.href}
      href={tool.href}
      className="group/license flex items-center justify-between gap-4 rounded-[22px] border border-brand-100 bg-gradient-to-l from-brand-50 via-white to-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_30px_rgba(59,130,246,0.14)]"
    >
      <div className="text-right">
        <div className="text-[15px] font-black text-slate-950 transition group-hover/license:text-brand-600">
          {tool.title}
        </div>
        <div className="mt-1 text-[12px] font-bold leading-6 text-slate-500">
          {tool.desc}
        </div>
      </div>

      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-lg font-black text-brand-600 shadow-sm transition group-hover/license:bg-brand-500 group-hover/license:text-white">
  ←
</span>
    </Link>
  ))}

  <Link
    href="/tools"
    className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
  >
    عرض جميع أدوات التداول ←
  </Link>
</div>
            </div>

        {/* LEARN TRADING */}
<div className="group relative">
  <Link
  href="/learn-trading"
  className={mainLinkClass}
>
  تعلم التداول
    <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
      ▼
    </span>
  </Link>

  <div className={`${dropdownClass} w-[420px]`}>
    <div className="px-3 pb-3 pt-1 text-xs font-black tracking-wide text-slate-500">
  دليل تعلم التداول
</div>

   {learnTradingMenuItems.slice(0, 1).map((item: any) => (
  <Link
    key={item.href}
    href={item.href}
    className={`${menuCardClass} flex items-center justify-between gap-4 text-right`}
  >
    <div className="min-w-0 flex-1 text-right">
      <div className="line-clamp-2 text-[13px] font-extrabold leading-6 text-slate-700">
        {item.title}
      </div>
    </div>

    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg font-black text-brand-600 shadow-sm">
      ←
    </span>
  </Link>
))}
<Link
  href="/learn-trading/economic-indicators"
  className={`${menuCardClass} mt-2 flex items-center justify-between gap-4 text-right`}
>
  <div className="min-w-0 flex-1 text-right">
    <div className="line-clamp-2 text-[13px] font-extrabold leading-6 text-slate-700">
      المؤشرات الاقتصادية وتأثيرها على التداول
    </div>
  </div>

  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg font-black text-brand-600 shadow-sm">
    ←
  </span>
</Link>
    <Link
      href="/learn-trading"
      className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
    >
      جميع دروس التداول ←
    </Link>
  </div>
</div>

            <Link href="/about" className={mainLinkClass}>
              عن الموقع
            </Link>
          </nav>

          <div className="hidden min-w-[105px] items-center justify-start lg:flex">
            <Link
              href="/en"
              className="inline-flex items-center rounded-full border border-blue-300 bg-white px-3 py-1.5 text-[12px] font-bold text-brand-600 shadow-sm transition hover:border-blue-400 hover:bg-brand-50"
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