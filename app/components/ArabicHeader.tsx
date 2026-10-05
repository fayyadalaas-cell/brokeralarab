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

const accountTypePagesAr = [
  {
    title: "أفضل وسطاء حساب السنت",
    shortLabel: "حساب السنت",
    href: "/best-brokers/accounts/cent",
    symbol: "¢",
  },
  {
    title: "أفضل وسطاء الحساب القياسي",
    shortLabel: "الحساب القياسي",
    href: "/best-brokers/accounts/standard",
    symbol: "S",
  },
  {
    title: "أفضل وسطاء حساب Raw Spread",
    shortLabel: "حساب Raw Spread",
    href: "/best-brokers/accounts/raw-spread",
    symbol: "R",
  },
];

const mainLinkClass =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-extrabold text-slate-700 transition hover:bg-slate-100 xl:px-5";

const dropdownClass =
  "invisible absolute right-0 top-full z-50 mt-3 translate-y-2 rounded-[28px] border border-slate-200 bg-white p-4 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100";

  const wideDropdownClass =
  "invisible absolute left-1/2 top-full z-50 mt-3 w-[940px] max-w-[calc(100vw-32px)] -translate-x-1/2 translate-y-2 rounded-[28px] border border-slate-200 bg-white p-5 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100";

const menuCardClass =
  "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-[13px] font-extrabold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600";

const logoBoxClass =
  "flex h-11 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm";

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
    label: "أفضل شركات التداول في الجزائر",
    shortLabel: "الجزائر",
    href: "/best-brokers/algeria",
    flag: "https://flagcdn.com/w80/dz.png",
  },

  {
    label: "أفضل شركات التداول في فلسطين",
    shortLabel: "فلسطين",
    href: "/best-brokers/palestine",
    flag: "https://flagcdn.com/w80/ps.png",
  },

  {
    label: "أفضل شركات التداول في لبنان",
    shortLabel: "لبنان",
    href: "/best-brokers/lebanon",
    flag: "https://flagcdn.com/w80/lb.png",
  },

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

  {
    label: "أفضل شركات التداول في اليمن",
    shortLabel: "اليمن",
    href: "/best-brokers/yemen",
    flag: "https://flagcdn.com/w80/ye.png",
  },
];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
     <div
  className={`mx-auto w-full ${
    wide ? "max-w-[1560px]" : "max-w-7xl"
  } px-4 sm:px-6 lg:px-8`}
>
        <div dir="rtl" className="relative flex h-16 items-center justify-between 2xl:h-20">
          <a
  href="/"
  aria-label="العودة إلى الصفحة الرئيسية"
  className="min-w-0 shrink-0 lg:justify-self-end"
>
  <Image
    src="/logo/Asset 4@6x.png"
    alt="Broker Alarab"
    width={500}
    height={160}
    priority
    className="h-auto w-[130px] sm:w-[155px] 2xl:w-[180px]"
  />
</a>

          <nav
  className={`hidden items-center justify-center 2xl:flex ${
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

                      <div
  className={
    broker.slug === "capital-com"
      ? "flex h-11 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm"
      : logoBoxClass
  }
>
  <Image
    src={broker.logo || getBrokerLogo(broker.slug)}
    alt={broker.name}
    width={broker.slug === "capital-com" ? 56 : 40}
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

                           {/* ===================================================
                BEST BROKERS
            =================================================== */}
            <div className="group relative">
              <Link href="/best-brokers" className={mainLinkClass}>
                أفضل الوسطاء

                <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className={wideDropdownClass}>
                <div className="grid grid-cols-[1.35fr_1fr_0.9fr] gap-5">

                  {/* ===================================================
                      COUNTRIES
                  =================================================== */}
                  <div className="flex flex-col border-l border-slate-200 pl-5">
                    <div className="mb-3 flex min-h-[44px] items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[14px] font-black text-slate-950">
                          أفضل الوسطاء حسب الدولة
                        </h3>

                        <p className="mt-1 text-[10px] font-semibold text-slate-500">
                          اختر الوسطاء المتاحين في دولتك
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                        حسب موقعك
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

                          <span className="min-w-0 flex-1 text-center text-[12px] font-black text-slate-700 transition group-hover/country:text-brand-600">
                            {item.shortLabel}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/best-brokers"
                      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                    >
                      عرض جميع الدول
                      <span className="text-sm">←</span>
                    </Link>
                  </div>

                  {/* ===================================================
                      CATEGORIES
                  =================================================== */}
                  <div className="flex flex-col border-l border-slate-200 pl-5">
                    <div className="mb-3 min-h-[44px]">
                      <h3 className="text-[14px] font-black text-slate-950">
                        أفضل الوسطاء حسب الفئة
                      </h3>

                      <p className="mt-1 text-[10px] font-semibold text-slate-500">
                        اختر السوق أو نوع التداول الذي يناسبك
                      </p>
                    </div>

                    {/* MARKETS */}
                    <div>
                      <div className="mb-2 text-[9px] font-black text-slate-400">
                        حسب السوق
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/best-brokers"
                          className="group/market flex h-[60px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[9px] font-black text-brand-600 transition group-hover/market:bg-brand-600 group-hover/market:text-white">
                            FX
                          </span>

                          <span className="text-[11px] font-black text-slate-700 transition group-hover/market:text-brand-600">
                            الفوركس
                          </span>
                        </Link>

                        <Link
                          href="/best-brokers/stocks"
                          className="group/market flex h-[60px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[10px] font-black text-brand-600 transition group-hover/market:bg-brand-600 group-hover/market:text-white">
                            S
                          </span>

                          <span className="text-[11px] font-black text-slate-700 transition group-hover/market:text-brand-600">
                            الأسهم
                          </span>
                        </Link>

                        <Link
                          href="/best-brokers/indices"
                          className="group/market flex h-[60px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[10px] font-black text-brand-600 transition group-hover/market:bg-brand-600 group-hover/market:text-white">
                            I
                          </span>

                          <span className="text-[11px] font-black text-slate-700 transition group-hover/market:text-brand-600">
                            المؤشرات
                          </span>
                        </Link>

                        <Link
                          href="/best-brokers/commodities"
                          className="group/market flex h-[60px] items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-3 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[10px] font-black text-brand-600 transition group-hover/market:bg-brand-600 group-hover/market:text-white">
                            C
                          </span>

                          <span className="text-[11px] font-black text-slate-700 transition group-hover/market:text-brand-600">
                            السلع
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* POPULAR */}
                    <div className="mt-3">
                      <div className="mb-2 text-[9px] font-black text-slate-400">
                        تصنيفات شائعة
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            label: "تداول الذهب",
                            href: "/best-brokers/gold",
                            symbol: "Au",
                          },
                          {
                            label: "الأقل سبريد",
                            href: "/lowest-spread-brokers",
                            symbol: "↔",
                          },
                          {
                            label: "أقل إيداع",
                            href: "/best-brokers/low-minimum-deposit",
                            symbol: "$",
                          },
                          {
                            label: "السكالبينج",
                            href: "/best-brokers/scalping",
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
                      href="/best-brokers"
                      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                    >
                      عرض أفضل الوسطاء
                      <span className="text-sm">←</span>
                    </Link>
                  </div>

                  {/* ===================================================
                      ACCOUNT TYPES
                  =================================================== */}
                  <div className="flex flex-col">
                    <div className="mb-3 min-h-[44px]">
                      <h3 className="text-[14px] font-black text-slate-950">
                        أفضل الوسطاء حسب الحساب
                      </h3>

                      <p className="mt-1 text-[10px] font-semibold text-slate-500">
                        قارن الحسابات واختر الأنسب لطريقة تداولك
                      </p>
                    </div>

                    <div className="space-y-2">
                      {accountTypePagesAr.map((item) => (
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
                              مقارنة أفضل الوسطاء
                            </span>
                          </div>

                          <span className="shrink-0 text-[12px] font-black text-slate-400 transition group-hover/account:-translate-x-0.5 group-hover/account:text-brand-600">
                            ←
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* ACCOUNT GUIDE */}
                    <Link
                      href="/best-brokers"
                      className="group/guide mt-3 overflow-hidden rounded-[16px] border border-brand-100 bg-gradient-to-l from-brand-50/80 to-white transition hover:border-brand-200 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3 p-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-[15px] font-black text-white shadow-sm">
                          ?
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-black text-slate-800 transition group-hover/guide:text-brand-600">
                            أي حساب يناسبني؟
                          </div>

                          <div className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                            تعرف على الفروقات بين أنواع الحسابات
                          </div>
                        </div>

                        <span className="text-[13px] font-black text-brand-600 transition group-hover/guide:-translate-x-0.5">
                          ←
                        </span>
                      </div>
                    </Link>

                    <div className="mt-3 border-t border-slate-100 pt-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/best-brokers/low-minimum-deposit"
                          className="rounded-xl bg-slate-50 px-2 py-2.5 text-center transition hover:bg-brand-50"
                        >
                          <span className="block text-[9px] font-black text-slate-700">
                            رأس مال صغير
                          </span>
                          <span className="mt-0.5 block text-[8px] font-bold text-slate-400">
                            أقل إيداع
                          </span>
                        </Link>

                        <Link
                          href="/lowest-spread-brokers"
                          className="rounded-xl bg-slate-50 px-2 py-2.5 text-center transition hover:bg-brand-50"
                        >
                          <span className="block text-[9px] font-black text-slate-700">
                            تداول نشط
                          </span>
                          <span className="mt-0.5 block text-[8px] font-bold text-slate-400">
                            سبريد أقل
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
              <Link href="/licenses" className={mainLinkClass}>
                التراخيص

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
                          التراخيص والجهات الرقابية
                        </h3>
                      </div>

                      <p className="mr-10 mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                        تعرف على أبرز الجهات الرقابية المنظمة لشركات التداول
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                      دليل التراخيص
                    </span>
                  </div>
                </div>

                {/* REGULATORS */}
                <div>
                  <div className="mb-2 text-[9px] font-black text-slate-400">
                    أهم الجهات الرقابية
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        code: "FCA",
                        country: "بريطانيا",
                        href: "/licenses/fca",
                      },
                      {
                        code: "ASIC",
                        country: "أستراليا",
                        href: "/licenses/asic",
                      },
                      {
                        code: "CySEC",
                        country: "قبرص",
                        href: "/licenses/cysec",
                      },
                      {
                        code: "DFSA",
                        country: "دبي",
                        href: "/licenses/dfsa",
                      },
                      {
                        code: "FSCA",
                        country: "جنوب أفريقيا",
                        href: "/licenses/fsca",
                      },
                      {
                        code: "SCA",
                        country: "الإمارات",
                        href: "/licenses/sca",
                      },
                      {
                        code: "FSA",
                        country: "سيشل",
                        href: "/licenses/fsa",
                      },
                      {
                        code: "CIMA",
                        country: "جزر كايمان",
                        href: "/licenses/cima",
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
                            ترخيص {regulator.code}
                          </span>

                          <span className="mt-0.5 block text-[9px] font-semibold text-slate-500">
                            {regulator.country}
                          </span>
                        </div>

                        <span className="shrink-0 text-[11px] font-black text-slate-400 transition group-hover/license:-translate-x-0.5 group-hover/license:text-brand-600">
                          ←
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* LICENSE CHECK */}
                <Link
                  href="/licenses"
                  className="group/check mt-4 block overflow-hidden rounded-[16px] border border-brand-100 bg-gradient-to-l from-brand-50/80 to-white transition hover:border-brand-200 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3 p-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-[17px] font-black text-white shadow-sm">
                      ✓
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-black text-slate-900 transition group-hover/check:text-brand-600">
                        تحقق من ترخيص وسيطك
                      </div>

                      <div className="mt-1 text-[9px] font-semibold leading-5 text-slate-500">
                        ابحث باسم الشركة أو رقم الترخيص وتعرف على الجهة الرقابية
                      </div>
                    </div>

                    <span className="text-[14px] font-black text-brand-600 transition group-hover/check:-translate-x-0.5">
                      ←
                    </span>
                  </div>
                </Link>

                {/* FOOTER CTA */}
                <Link
                  href="/licenses"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                >
                  عرض جميع التراخيص والجهات الرقابية
                  <span className="text-sm">←</span>
                </Link>
              </div>
            </div>

            {/* ===================================================
                TRADING TOOLS
            =================================================== */}
            <div className="group relative">
              <Link href="/tools" className={mainLinkClass}>
                الأدوات

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
                          أدوات وحاسبات التداول
                        </h3>
                      </div>

                      <p className="mr-10 mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                        احسب المخاطر والصفقات والهامش قبل اتخاذ قرارك
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                      أدوات مجانية
                    </span>
                  </div>
                </div>

                {/* FEATURED TOOLS */}
                <div>
                  <div className="mb-2 text-[9px] font-black text-slate-400">
                    أشهر أدوات التداول
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {tradingToolsAr.slice(0, 8).map((tool, index) => {
                      const toolSymbols = [
                        "%",
                        "P",
                        "•",
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

                          <span className="shrink-0 text-[11px] font-black text-slate-400 transition group-hover/tool:-translate-x-0.5 group-hover/tool:text-brand-600">
                            ←
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* QUICK TOOL GROUPS */}
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="block text-[9px] font-black text-slate-700">
                        إدارة المخاطر
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        حجم الصفقة
                      </span>
                    </div>

                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="block text-[9px] font-black text-slate-700">
                        حساب الأرباح
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        قبل التداول
                      </span>
                    </div>

                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="block text-[9px] font-black text-slate-700">
                        الهامش
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        والرافعة
                      </span>
                    </div>
                  </div>
                </div>

                {/* FOOTER CTA */}
                <Link
                  href="/tools"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                >
                  عرض جميع أدوات التداول
                  <span className="text-sm">←</span>
                </Link>
              </div>
            </div>

                    {/* ===================================================
                LEARN TRADING
            =================================================== */}
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
                          تعلم التداول خطوة بخطوة
                        </h3>
                      </div>

                      <p className="mr-10 mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                        أدلة ومفاهيم واستراتيجيات تساعدك على فهم الأسواق
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                      مركز التعلم
                    </span>
                  </div>
                </div>

                {/* MAIN LEARNING GUIDE */}
                {learnTradingMenuItems.slice(0, 1).map((item: any) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group/learn block overflow-hidden rounded-[16px] border border-brand-100 bg-gradient-to-l from-brand-50/80 to-white transition hover:border-brand-200 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 p-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-[15px] font-black text-white shadow-sm">
                        01
                      </span>

                      <div className="min-w-0 flex-1 text-right">
                        <div className="text-[12px] font-black leading-6 text-slate-900 transition group-hover/learn:text-brand-600">
                          {item.title}
                        </div>

                        <div className="mt-0.5 text-[9px] font-semibold leading-5 text-slate-500">
                          ابدأ من الأساسيات وتعرف على أهم مفاهيم التداول
                        </div>
                      </div>

                      <span className="shrink-0 text-[14px] font-black text-brand-600 transition group-hover/learn:-translate-x-0.5">
                        ←
                      </span>
                    </div>
                  </Link>
                ))}

                {/* LEARNING SECTIONS */}
                <div className="mt-4">
                  <div className="mb-2 text-[9px] font-black text-slate-400">
                    استكشف مواضيع التداول
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* ECONOMIC INDICATORS */}
                    <Link
                      href="/learn-trading/economic-indicators"
                      className="group/topic flex min-h-[82px] flex-col justify-between rounded-[14px] border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-slate-100 bg-white text-[12px] font-black text-brand-600 shadow-sm transition group-hover/topic:bg-brand-600 group-hover/topic:text-white">
                          %
                        </span>

                        <span className="text-[11px] font-black text-slate-400 transition group-hover/topic:-translate-x-0.5 group-hover/topic:text-brand-600">
                          ←
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="text-[11px] font-black leading-5 text-slate-800 transition group-hover/topic:text-brand-600">
                          المؤشرات الاقتصادية
                        </div>

                        <div className="mt-0.5 text-[8px] font-semibold leading-4 text-slate-500">
                          وتأثيرها على الأسواق
                        </div>
                      </div>
                    </Link>

                    {/* STRATEGIES */}
                    <Link
                      href="/strategies"
                      className="group/topic flex min-h-[82px] flex-col justify-between rounded-[14px] border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-slate-100 bg-white text-[11px] font-black text-brand-600 shadow-sm transition group-hover/topic:bg-brand-600 group-hover/topic:text-white">
                          ↗
                        </span>

                        <span className="text-[11px] font-black text-slate-400 transition group-hover/topic:-translate-x-0.5 group-hover/topic:text-brand-600">
                          ←
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="text-[11px] font-black leading-5 text-slate-800 transition group-hover/topic:text-brand-600">
                          استراتيجيات الفوركس
                        </div>

                        <div className="mt-0.5 text-[8px] font-semibold leading-4 text-slate-500">
                          استراتيجيات وأساليب التداول
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* LEARNING PATH */}
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="mb-2 text-[9px] font-black text-slate-400">
                    مسار التعلم
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-[9px] font-black text-brand-600">
                        1
                      </span>

                      <span className="mt-1.5 block text-[9px] font-black text-slate-700">
                        الأساسيات
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        فهم التداول
                      </span>
                    </div>

                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-[9px] font-black text-brand-600">
                        2
                      </span>

                      <span className="mt-1.5 block text-[9px] font-black text-slate-700">
                        تحليل السوق
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        قراءة المؤشرات
                      </span>
                    </div>

                    <div className="rounded-[12px] bg-slate-50 px-2 py-2.5 text-center">
                      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-[9px] font-black text-brand-600">
                        3
                      </span>

                      <span className="mt-1.5 block text-[9px] font-black text-slate-700">
                        الاستراتيجيات
                      </span>

                      <span className="mt-0.5 block text-[8px] font-semibold text-slate-400">
                        تطوير أسلوبك
                      </span>
                    </div>
                  </div>
                </div>

                {/* FOOTER CTA */}
                <Link
                  href="/learn-trading"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 text-[12px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-100"
                >
                  عرض جميع دروس التداول
                  <span className="text-sm">←</span>
                </Link>
              </div>
            </div>

            <Link href="/about" className={mainLinkClass}>
              عن الموقع
            </Link>
          </nav>

          <div className="hidden min-w-[105px] items-center justify-start 2xl:flex">
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