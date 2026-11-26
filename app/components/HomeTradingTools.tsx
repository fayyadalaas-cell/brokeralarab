import Link from "next/link";

import {
  ShieldCheck,
  Calculator,
  ChartNoAxesCombined,
  ChartColumn,
  ChartLine,
  Target,
  Scale,
  TrendingDown,
  Coins,
  Layers,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";

/* =========================================================
   BROKER ALARAB — HOME TRADING TOOLS & LICENSES
========================================================= */

/* =========================================================
   TRADING CALCULATORS
========================================================= */

const TOOLS = [
  {
    title: "حاسبة إدارة المخاطر",
    desc: "تحديد قيمة المخاطرة",
    href: "/tools/risk-calculator",
    icon: ShieldCheck,
  },
  {
    title: "حاسبة حجم اللوت",
    desc: "تحديد حجم الصفقة",
    href: "/tools/lot-size-calculator",
    icon: ChartColumn,
  },
  {
    title: "حاسبة النقاط",
    desc: "حساب قيمة النقطة",
    href: "/tools/pip-calculator",
    icon: Target,
  },
  {
    title: "حاسبة الأرباح والخسائر",
    desc: "تقدير نتائج الصفقات",
    href: "/tools/profit-calculator",
    icon: ChartNoAxesCombined,
  },
  {
    title: "حاسبة الهامش",
    desc: "حساب الهامش المطلوب",
    href: "/tools/margin-calculator",
    icon: Calculator,
  },
  {
    title: "حاسبة الرافعة المالية",
    desc: "حساب الرافعة المالية",
    href: "/tools/leverage-calculator",
    icon: Scale,
  },
  {
    title: "حاسبة التراجع",
    desc: "حساب تراجع رأس المال",
    href: "/tools/drawdown-calculator",
    icon: TrendingDown,
  },
  {
    title: "حاسبة الفائدة المركبة",
    desc: "تقدير نمو رأس المال",
    href: "/tools/compound-calculator",
    icon: Coins,
  },
  {
    title: "حاسبة فيبوناتشي",
    desc: "مستويات التصحيح والامتداد",
    href: "/tools/fibonacci-calculator",
    icon: ChartLine,
  },
  {
    title: "حاسبة نقاط الارتكاز",
    desc: "مستويات الدعم والمقاومة",
    href: "/tools/pivot-point-calculator",
    icon: Layers,
  },
];

/* =========================================================
   REGULATORY LICENSES
========================================================= */

const LICENSES = [
  {
    code: "FCA",
    title: "الترخيص البريطاني",
    flag: "gb",
    href: "/licenses/fca",
  },
  {
    code: "ASIC",
    title: "الترخيص الأسترالي",
    flag: "au",
    href: "/licenses/asic",
  },
  {
    code: "CySEC",
    title: "الترخيص القبرصي",
    flag: "cy",
    href: "/licenses/cysec",
  },
  {
    code: "DFSA",
    title: "ترخيص دبي المالي",
    flag: "ae",
    href: "/licenses/dfsa",
  },
  {
    code: "FSCA",
    title: "ترخيص جنوب أفريقيا",
    flag: "za",
    href: "/licenses/fsca",
  },
  {
    code: "CIRO",
    title: "الترخيص الكندي",
    flag: "ca",
    href: "/licenses/ciro",
  },
  {
    code: "FSA",
    title: "ترخيص سيشل",
    flag: "sc",
    href: "/licenses/fsa",
  },
  {
    code: "CIMA",
    title: "ترخيص جزر كايمان",
    flag: "ky",
    href: "/licenses/cima",
  },
];

/* =========================================================
   MOBILE FEATURED ITEMS
========================================================= */

const MOBILE_TOOLS = TOOLS.filter((item) =>
  [
    "/tools/risk-calculator",
    "/tools/lot-size-calculator",
    "/tools/profit-calculator",
    "/tools/margin-calculator",
  ].includes(item.href)
);

const MOBILE_LICENSES = LICENSES.filter((item) =>
  ["FCA", "ASIC", "CySEC", "DFSA"].includes(item.code)
);

const LICENSE_SHORT_NAMES: Record<string, string> = {
  FCA: "بريطانيا",
  ASIC: "أستراليا",
  CySEC: "قبرص",
  DFSA: "دبي",
  FSCA: "جنوب أفريقيا",
  CIRO: "كندا",
  FSA: "سيشل",
  CIMA: "جزر كايمان",
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HomeTradingTools() {

  return (

    <div
      dir="rtl"
      className="grid min-w-0 grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch"
    >

      {/* =================================================
          MAIN CONTENT — TRADING CALCULATORS
      ================================================== */}

      <section
        id="home-trading-tools"
        aria-labelledby="home-trading-tools-title"
        className="flex min-w-0 flex-col py-3 sm:py-4"
      >

        {/* EXTERNAL SECTION HEADER */}

        <div className="mb-4 flex min-h-[44px] shrink-0 items-center">

          <h2
            id="home-trading-tools-title"
            className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
          >

            <Link
              href="/tools"
              className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
            >

              أدوات التداول والحاسبات المالية

              <ChevronLeft
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover/title:-translate-x-1"
              />

            </Link>

          </h2>

        </div>

        {/* =================================================
            MOBILE — FEATURED TRADING CALCULATORS
            FOUR COMPACT HORIZONTAL ROWS
        ================================================== */}

        <div className="overflow-hidden rounded-[15px] border border-slate-200 bg-white sm:hidden">

          <div className="divide-y divide-slate-200">

            {MOBILE_TOOLS.map((item) => {

              const Icon = item.icon;

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-[76px] min-w-0 items-center gap-3 px-3.5 py-3 transition duration-200 active:bg-[#edf3fc]"
                >

                  {/* MOBILE TOOL ICON */}

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#edf3fc] text-[#194b92] transition group-hover:bg-[#194b92] group-hover:text-white">

                    <Icon
                      size={24}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />

                  </span>

                  {/* MOBILE TOOL INFORMATION */}

                  <div className="min-w-0 flex-1">

                    <h3 className="text-[14px] font-black leading-6 text-[#10233f] transition-colors group-hover:text-brand-600">

                      {item.title}

                    </h3>

                    <p className="mt-0.5 text-[11px] font-medium leading-5 text-slate-500">

                      {item.desc}

                    </p>

                  </div>

                  {/* MOBILE NAVIGATION ARROW */}

                  <ChevronLeft
                    size={17}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="shrink-0 text-[#194b92] transition-transform group-hover:-translate-x-1"
                  />

                </Link>

              );

            })}

          </div>

          {/* ALL TRADING TOOLS */}

          <Link
            href="/tools"
            className="group flex min-h-[46px] items-center justify-center gap-2 bg-gradient-to-l from-[#102e55] to-[#194b92] px-3 text-[12px] font-black text-white transition duration-200 active:opacity-90"
          >

            استكشف جميع أدوات التداول

            <ArrowLeft
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1"
            />

          </Link>

        </div>

        {/* =================================================
    TABLET + DESKTOP — TRADING CALCULATORS GRID

    TABLET: 5 COLUMNS × 2 ROWS — COMPACT
    DESKTOP: ORIGINAL DESIGN
================================================== */}

<div className="hidden min-w-0 flex-1 auto-rows-fr grid-cols-5 gap-2.5 sm:grid lg:gap-3">

  {TOOLS.map((item) => {

    const Icon = item.icon;

    return (

      <Link
        key={item.href}
        href={item.href}
        className="group flex min-h-[115px] min-w-0 flex-col items-center justify-center rounded-[13px] border border-slate-200 bg-white px-1.5 py-3 text-center transition duration-200 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_5px_18px_rgba(15,23,42,0.05)] lg:min-h-[125px] xl:min-h-[170px] xl:rounded-[18px] xl:px-2 xl:py-4"
      >

        {/* TOOL ICON */}

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#edf3fc] text-[#194b92] transition duration-200 group-hover:bg-[#194b92] group-hover:text-white xl:h-12 xl:w-12 xl:rounded-[13px]">

          <Icon
            size={25}
            strokeWidth={1.7}
            aria-hidden="true"
            className="h-[22px] w-[22px] xl:h-[25px] xl:w-[25px]"
          />

        </span>

        {/* TOOL TITLE */}

        <h3 className="mt-2 flex min-h-[36px] min-w-0 items-center justify-center break-words text-[12px] font-black leading-5 text-[#10233f] transition-colors group-hover:text-brand-600 lg:text-[14px] xl:mt-3 xl:min-h-[40px] xl:text-[15px]">

          {item.title}

        </h3>

        {/* TOOL DESCRIPTION — DESKTOP ONLY */}

        <p className="mt-0.5 hidden text-[12px] font-medium leading-5 text-slate-500 xl:block">

          {item.desc}

        </p>

        {/* TOOL LINK — DESKTOP ONLY */}

        <span className="mt-3 hidden items-center justify-center gap-1.5 text-[11px] font-bold text-[#194b92] xl:flex">

          فتح الحاسبة

          <ArrowLeft
            size={13}
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          />

        </span>

      </Link>

    );

  })}

</div>

      </section>

      {/* =================================================
          REGULATORY LICENSES
      ================================================== */}

      <aside
        aria-labelledby="home-licenses-title"
        className="flex min-w-0 flex-col py-3 sm:py-4"
      >

        {/* EXTERNAL SECTION HEADER */}

        <div className="mb-4 flex min-h-[44px] shrink-0 items-center">

          <h2
            id="home-licenses-title"
            className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
          >

            <Link
              href="/licenses"
              className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
            >

              <span className="sm:hidden">
                أبرز الهيئات الرقابية
              </span>

              <span className="hidden sm:inline">
                الهيئات الرقابية
              </span>

              <ChevronLeft
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover/title:-translate-x-1"
              />

            </Link>

          </h2>

        </div>

        {/* =================================================
            MOBILE — FEATURED REGULATORY AUTHORITIES
            INSTITUTIONAL COMPACT STRIP
        ================================================== */}

        <div className="overflow-hidden rounded-[15px] border border-[#d5e3f5] bg-white sm:hidden">

          {/* MOBILE INTRODUCTION */}

          <div className="flex items-center gap-3 bg-gradient-to-l from-[#edf3fc] to-[#f8fafc] px-3.5 py-4">

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-blue-100 bg-white text-[#194b92]">

              <ShieldCheck
                size={25}
                strokeWidth={1.6}
                aria-hidden="true"
              />

            </span>

            <div className="min-w-0 flex-1">

              <h3 className="text-[14px] font-black leading-6 text-[#10233f]">

                تعرف على تراخيص شركات التداول

              </h3>

              <p className="mt-1 text-[11px] font-medium leading-5 text-slate-600">

                الجهات الرقابية ومعايير حماية المتداولين

              </p>

            </div>

          </div>

          {/* ===============================================
              FOUR FEATURED REGULATORY AUTHORITIES
          ================================================ */}

          <div className="grid grid-cols-4 border-t border-slate-200 px-2 py-5">

            {MOBILE_LICENSES.map((item, index) => (

              <Link
                key={item.code}
                href={item.href}
                aria-label={`${item.code} — ${item.title}`}
                title={item.title}
                className={`group flex min-w-0 flex-col items-center justify-center gap-2 px-1 text-center transition duration-200 active:opacity-70 ${
                  index !== 0
                    ? "border-r border-slate-100"
                    : ""
                }`}
              >

                {/* REGULATORY FLAG */}

                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-slate-100 ring-1 ring-slate-200 transition duration-200 group-hover:ring-blue-300">

                  <img
                    src={`https://flagcdn.com/w80/${item.flag}.png`}
                    alt=""
                    width={42}
                    height={42}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                </span>

                {/* REGULATORY CODE */}

                <span
                  dir="ltr"
                  className="text-[14px] font-black leading-5 text-[#10233f] transition-colors group-hover:text-brand-600"
                >

                  {item.code}

                </span>

                {/* SHORT COUNTRY NAME */}

                <span className="text-[11px] font-medium leading-4 text-slate-500">

                  {LICENSE_SHORT_NAMES[item.code]}

                </span>

              </Link>

            ))}

          </div>

          {/* ALL REGULATORY AUTHORITIES */}

          <Link
            href="/licenses"
            className="group flex min-h-[46px] items-center justify-center gap-2 border-t border-slate-200 bg-[#f8fafc] px-3 text-[12px] font-black text-[#194b92] transition duration-200 active:bg-blue-50"
          >

            عرض جميع الهيئات الرقابية

            <ArrowLeft
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1"
            />

          </Link>

        </div>

{/* =================================================
    TABLET — REGULATORY AUTHORITIES
    4 COLUMNS × 2 ROWS
================================================== */}

<div className="hidden w-full min-w-0 overflow-hidden rounded-[16px] border border-slate-200 bg-white sm:block xl:hidden">

  {/* TABLET REGULATORY GRID */}

  <div className="grid grid-cols-4">

    {LICENSES.map((item, index) => (

      <Link
        key={item.code}
        href={item.href}
        aria-label={`${item.code} — ${item.title}`}
        title={item.title}
        className={`group flex min-h-[115px] min-w-0 flex-col items-center justify-center gap-2 px-2 py-4 text-center transition duration-200 hover:bg-[#edf3fc] ${
          index % 4 !== 0
            ? "border-r border-slate-200"
            : ""
        } ${
          index >= 4
            ? "border-t border-slate-200"
            : ""
        }`}
      >

        {/* REGULATORY FLAG */}

        <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-slate-100 ring-1 ring-slate-200 transition duration-200 group-hover:ring-blue-300 lg:h-[48px] lg:w-[48px]">

          <img
            src={`https://flagcdn.com/w80/${item.flag}.png`}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            className="h-full w-full object-cover"
          />

        </span>

        {/* REGULATORY CODE */}

        <span
          dir="ltr"
          className="text-[15px] font-black leading-5 text-[#10233f] transition-colors group-hover:text-brand-600 lg:text-[16px]"
        >

          {item.code}

        </span>

        {/* COUNTRY NAME */}

        <span className="text-[11px] font-medium leading-5 text-slate-500 lg:text-[12px]">

          {LICENSE_SHORT_NAMES[item.code]}

        </span>

      </Link>

    ))}

  </div>

  {/* TABLET FOOTER */}

  <div className="border-t border-slate-200 bg-[#f8fafc] p-2.5">

    <Link
      href="/licenses"
      className="group flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#194b92] px-3 text-[12px] font-black text-white transition duration-200 hover:bg-brand-600"
    >

      عرض جميع الهيئات الرقابية

      <ArrowLeft
        size={15}
        strokeWidth={2}
        aria-hidden="true"
        className="transition-transform group-hover:-translate-x-1"
      />

    </Link>

  </div>

</div>

        {/* =================================================
            DESKTOP — LICENSES CARD
            ORIGINAL DESIGN — UNCHANGED
        ================================================== */}

        <div className="hidden min-w-0 flex-1 flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white xl:flex">

          {/* TABLE HEADER */}

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-[#f8fafc] px-3 py-2.5">

            <span className="text-[11px] font-semibold text-slate-500">

              الجهة الرقابية

            </span>

            <span className="text-[11px] font-semibold text-slate-500">

              التفاصيل

            </span>

          </div>

          {/* LICENSE ROWS */}

          <div className="flex flex-1 flex-col divide-y divide-slate-100 px-3">

            {LICENSES.map((item) => (

              <Link
                key={item.code}
                href={item.href}
                className="group flex min-h-[42px] flex-1 items-center justify-between gap-2 py-1.5 transition duration-200 hover:bg-[#f8fafc]"
              >

                {/* LICENSE FLAG AND NAME */}

                <div className="flex min-w-0 items-center gap-2.5">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">

                    <img
                      src={`https://flagcdn.com/w80/${item.flag}.png`}
                      alt=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                  </span>

                  <div className="min-w-0">

                    <div className="flex items-center gap-1.5">

                      <span
                        dir="ltr"
                        className="text-[13px] font-black leading-5 text-[#10233f] transition-colors group-hover:text-brand-600"
                      >

                        {item.code}

                      </span>

                    </div>

                    <p className="text-[11px] font-medium leading-4 text-slate-500">

                      {item.title}

                    </p>

                  </div>

                </div>

                {/* LICENSE ARROW */}

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf3fc] text-[#194b92] transition duration-200 group-hover:bg-[#194b92] group-hover:text-white">

                  <ChevronLeft
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                  />

                </span>

              </Link>

            ))}

          </div>

          {/* LICENSES FOOTER */}

          <div className="shrink-0 border-t border-slate-200 bg-[#f8fafc] p-2.5">

            <Link
              href="/licenses"
              className="group flex min-h-[38px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#194b92] px-3 text-[11px] font-black text-white transition duration-200 hover:bg-brand-600"
            >

              عرض جميع الهيئات الرقابية

              <ArrowLeft
                size={14}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1"
              />

            </Link>

          </div>

        </div>

      </aside>

    </div>

  );

}