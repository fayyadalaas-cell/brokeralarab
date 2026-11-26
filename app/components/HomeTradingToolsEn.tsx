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
  ChevronRight,
  ArrowRight,
} from "lucide-react";

/* =========================================================
   BROKER ALARAB — HOME TRADING TOOLS & LICENSES (ENGLISH)
========================================================= */

/* =========================================================
   TRADING CALCULATORS
========================================================= */

const TOOLS = [
  {
    title: "Risk Calculator",
    desc: "Calculate your trading risk",
    href: "/en/tools/risk-calculator",
    icon: ShieldCheck,
  },
  {
    title: "Lot Size Calculator",
    desc: "Calculate position size",
    href: "/en/tools/lot-size-calculator",
    icon: ChartColumn,
  },
  {
    title: "Pip Calculator",
    desc: "Calculate pip value",
    href: "/en/tools/pip-calculator",
    icon: Target,
  },
  {
    title: "Profit Calculator",
    desc: "Estimate trading profit or loss",
    href: "/en/tools/profit-calculator",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Margin Calculator",
    desc: "Calculate required margin",
    href: "/en/tools/margin-calculator",
    icon: Calculator,
  },
  {
    title: "Leverage Calculator",
    desc: "Calculate trading leverage",
    href: "/en/tools/leverage-calculator",
    icon: Scale,
  },
  {
    title: "Drawdown Calculator",
    desc: "Measure capital drawdown",
    href: "/en/tools/drawdown-calculator",
    icon: TrendingDown,
  },
  {
    title: "Compound Calculator",
    desc: "Estimate capital growth",
    href: "/en/tools/compound-calculator",
    icon: Coins,
  },
  {
    title: "Fibonacci Calculator",
    desc: "Retracement and extension levels",
    href: "/en/tools/fibonacci-calculator",
    icon: ChartLine,
  },
  {
    title: "Pivot Point Calculator",
    desc: "Support and resistance levels",
    href: "/en/tools/pivot-point-calculator",
    icon: Layers,
  },
];

/* =========================================================
   REGULATORY LICENSES
========================================================= */

const LICENSES = [
  {
    code: "FCA",
    title: "United Kingdom Regulation",
    flag: "gb",
    href: "/en/licenses/fca",
  },
  {
    code: "ASIC",
    title: "Australian Regulation",
    flag: "au",
    href: "/en/licenses/asic",
  },
  {
    code: "CySEC",
    title: "Cyprus Regulation",
    flag: "cy",
    href: "/en/licenses/cysec",
  },
  {
    code: "DFSA",
    title: "Dubai Financial Regulation",
    flag: "ae",
    href: "/en/licenses/dfsa",
  },
  {
    code: "FSCA",
    title: "South African Regulation",
    flag: "za",
    href: "/en/licenses/fsca",
  },
  {
    code: "CIRO",
    title: "Canadian Regulation",
    flag: "ca",
    href: "/en/licenses/ciro",
  },
  {
    code: "FSA",
    title: "Seychelles Regulation",
    flag: "sc",
    href: "/en/licenses/fsa",
  },
  {
    code: "CIMA",
    title: "Cayman Islands Regulation",
    flag: "ky",
    href: "/en/licenses/cima",
  },
];

/* =========================================================
   MOBILE FEATURED ITEMS
========================================================= */

const MOBILE_TOOLS = TOOLS.filter((item) =>
  [
    "/en/tools/risk-calculator",
    "/en/tools/lot-size-calculator",
    "/en/tools/profit-calculator",
    "/en/tools/margin-calculator",
  ].includes(item.href)
);

const MOBILE_LICENSES = LICENSES.filter((item) =>
  ["FCA", "ASIC", "CySEC", "DFSA"].includes(item.code)
);

const LICENSE_SHORT_NAMES: Record<string, string> = {
  FCA: "UK",
  ASIC: "Australia",
  CySEC: "Cyprus",
  DFSA: "Dubai",
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HomeTradingToolsEn() {

  return (

    <div
      dir="ltr"
      lang="en"
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
              href="/en/tools"
              className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
            >

              Trading Tools & Calculators

              <ChevronRight
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover/title:translate-x-1"
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

                  <ChevronRight
                    size={17}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="shrink-0 text-[#194b92] transition-transform group-hover:translate-x-1"
                  />

                </Link>

              );

            })}

          </div>

          {/* ALL TRADING TOOLS */}

          <Link
            href="/en/tools"
            className="group flex min-h-[46px] items-center justify-center gap-2 bg-gradient-to-r from-[#102e55] to-[#194b92] px-3 text-[12px] font-black text-white transition duration-200 active:opacity-90"
          >

            Explore All Trading Tools

            <ArrowRight
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>

        {/* =================================================
            DESKTOP — TRADING CALCULATORS GRID
            ORIGINAL DESIGN
        ================================================== */}

        <div className="hidden flex-1 auto-rows-fr grid-cols-2 gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-5">

          {TOOLS.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[170px] min-w-0 flex-col items-center justify-center rounded-[18px] border border-slate-200 bg-white px-2 py-4 text-center transition duration-200 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_5px_18px_rgba(15,23,42,0.05)]"
              >

                {/* TOOL ICON */}

                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] bg-[#edf3fc] text-[#194b92] transition duration-200 group-hover:bg-[#194b92] group-hover:text-white">

                  <Icon
                    size={25}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                </span>

                {/* TOOL TITLE */}

                <h3 className="mt-3 flex min-h-[40px] items-center justify-center text-[13px] font-black leading-5 text-[#10233f] transition-colors group-hover:text-brand-600 sm:text-[15px]">

                  {item.title}

                </h3>

                {/* TOOL DESCRIPTION */}

                <p className="mt-0.5 text-[11px] font-medium leading-5 text-slate-500 sm:text-[12px]">

                  {item.desc}

                </p>

                {/* TOOL LINK */}

                <span className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#194b92]">

                  Open Calculator

                  <ArrowRight
                    size={13}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
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
              href="/en/licenses"
              className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
            >

              <span className="sm:hidden">
                Major Regulatory Authorities
              </span>

              <span className="hidden sm:inline">
                Regulatory Authorities
              </span>

              <ChevronRight
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover/title:translate-x-1"
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

          <div className="flex items-center gap-3 bg-gradient-to-r from-[#edf3fc] to-[#f8fafc] px-3.5 py-4">

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-blue-100 bg-white text-[#194b92]">

              <ShieldCheck
                size={25}
                strokeWidth={1.6}
                aria-hidden="true"
              />

            </span>

            <div className="min-w-0 flex-1">

              <h3 className="text-[14px] font-black leading-6 text-[#10233f]">

                Understand Broker Regulation

              </h3>

              <p className="mt-1 text-[11px] font-medium leading-5 text-slate-600">

                Regulatory authorities and trader protection standards

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
                    ? "border-l border-slate-100"
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
            href="/en/licenses"
            className="group flex min-h-[46px] items-center justify-center gap-2 border-t border-slate-200 bg-[#f8fafc] px-3 text-[12px] font-black text-[#194b92] transition duration-200 active:bg-blue-50"
          >

            View All Regulatory Authorities

            <ArrowRight
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>

        {/* =================================================
            DESKTOP — LICENSES CARD
            ORIGINAL DESIGN
        ================================================== */}

        <div className="hidden min-w-0 flex-1 flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white sm:flex">

          {/* TABLE HEADER */}

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-[#f8fafc] px-3 py-2.5">

            <span className="text-[11px] font-semibold text-slate-500">

              Regulatory Authority

            </span>

            <span className="text-[11px] font-semibold text-slate-500">

              Details

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

                  <ChevronRight
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
              href="/en/licenses"
              className="group flex min-h-[38px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#194b92] px-3 text-[11px] font-black text-white transition duration-200 hover:bg-brand-600"
            >

              View All Regulatory Authorities

              <ArrowRight
                size={14}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </aside>

    </div>

  );

}