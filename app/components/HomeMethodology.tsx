import Link from "next/link";

import {
  ShieldCheck,
  Calculator,
  Monitor,
  CreditCard,
  Wallet,
  Headset,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";

/* =========================================================
   BROKER ALARAB — REVIEW METHODOLOGY
========================================================= */

const CRITERIA = [
  {
    title: "التنظيم وحماية الأموال",
    desc: "التراخيص والكيانات القانونية وآليات حماية أموال العملاء.",
    icon: ShieldCheck,
  },
  {
    title: "تكاليف التداول",
    desc: "السبريد والعمولات ورسوم التبييت والتكاليف الإضافية.",
    icon: Calculator,
  },
  {
    title: "المنصات والتنفيذ",
    desc: "جودة التنفيذ واستقرار المنصات وسهولة الاستخدام.",
    icon: Monitor,
  },
  {
    title: "الإيداع والسحب",
    desc: "وسائل الدفع وسرعة العمليات والرسوم المرتبطة بها.",
    icon: CreditCard,
  },
  {
    title: "الحساب الإسلامي",
    desc: "شروط الحساب الإسلامي والقيود والرسوم المرتبطة به.",
    icon: Wallet,
  },
  {
    title: "الدعم وتجربة الاستخدام",
    desc: "جودة خدمة العملاء وسهولة فتح الحساب وتجربة التداول.",
    icon: Headset,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HomeMethodology() {

  return (

    <section
      id="home-methodology"
      aria-labelledby="home-methodology-title"
      dir="rtl"
      className="mx-auto w-full min-w-0 py-3 sm:py-4"
    >

      {/* =================================================
          EXTERNAL SECTION HEADER
      ================================================== */}

      <div className="mb-4 flex min-h-[44px] items-center">

        <h2
          id="home-methodology-title"
          className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
        >

          <Link
            href="/how-we-review-brokers"
            className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
          >

            منهجية بروكر العرب في تقييم الوسطاء

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
          MAIN INSTITUTIONAL CONTAINER
      ================================================== */}

      <div className="relative isolate overflow-hidden rounded-[15px] border border-[#d2dff0] bg-[linear-gradient(135deg,#f5f9ff_0%,#e7effa_55%,#dfeaf8_100%)] sm:rounded-[18px]">

        {/* ===============================================
            DECORATIVE BACKGROUND
        ================================================ */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >

          {/* SOFT LIGHT */}

          <div className="absolute -right-24 -top-40 h-[400px] w-[400px] rounded-full bg-white/70 blur-[90px]" />

          <div className="absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full bg-blue-200/25 blur-[90px]" />

          {/* DECORATIVE RINGS */}

          <div className="absolute -left-32 -top-32 hidden h-[390px] w-[390px] rounded-full border border-[#194b92]/[0.045] lg:block" />

          <div className="absolute -left-20 -top-20 hidden h-[300px] w-[300px] rounded-full border border-[#194b92]/[0.045] lg:block" />

          <div className="absolute -left-8 -top-8 hidden h-[210px] w-[210px] rounded-full border border-[#194b92]/[0.045] lg:block" />

        </div>

        {/* ===============================================
            CENTERED INSTITUTIONAL INTRODUCTION
        ================================================ */}

        <div className="relative px-4 pb-4 pt-5 text-center sm:px-10 sm:pb-6 sm:pt-9">

          {/* MOBILE INTRODUCTION ICON */}

          <ShieldCheck
            size={30}
            strokeWidth={1.6}
            aria-hidden="true"
            className="mx-auto mb-2 text-[#194b92] sm:hidden"
          />

          {/* ENGLISH LABEL — DESKTOP ONLY */}

          <span
            dir="ltr"
            className="hidden text-[11px] font-bold tracking-[0.18em] text-[#194b92] sm:inline-block"
          >

            BROKER ALARAB METHODOLOGY

          </span>

          {/* MAIN TITLE */}

          <h3 className="text-[21px] font-black leading-[1.5] tracking-tight text-[#10233f] sm:mt-3 sm:text-[34px]">

            كيف نقيّم شركات التداول؟

          </h3>

          {/* MOBILE INTRODUCTION */}

          <p className="mx-auto mt-2 max-w-[340px] text-[12px] font-medium leading-6 text-slate-600 sm:hidden">

            تقييمات مستقلة تستند إلى ستة معايير رئيسية
            لمساعدتك على اختيار وسيط التداول المناسب.

          </p>

          {/* DESKTOP INTRODUCTION — UNCHANGED */}

          <p className="mx-auto mt-3 hidden max-w-[850px] text-[15px] font-medium leading-8 text-slate-600 sm:block">

            بروكر العرب منصة متخصصة في تقييم ومقارنة شركات
            التداول باللغتين العربية والإنجليزية. تستند
            تقييماتنا إلى ستة معايير رئيسية تساعد المتداولين
            على فهم جودة خدمات الوسطاء وتكاليف التداول
            ومستويات الحماية.

          </p>

        </div>

        {/* ===============================================
            SIX REVIEW CRITERIA
            MOBILE: 3 COLUMNS / 2 ROWS
            DESKTOP: ORIGINAL DESIGN
        ================================================ */}

        <div className="relative mx-auto max-w-[1200px] px-3 pb-4 pt-1 sm:px-10 sm:pb-9 sm:pt-2">

          <div className="mb-3 border-t border-[#d2dff0] sm:hidden" />

          <div className="grid grid-cols-3 gap-x-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-7 md:grid-cols-3 md:gap-x-8 md:gap-y-8">

            {CRITERIA.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="group flex min-w-0 flex-col items-center px-0.5 py-1 text-center sm:px-4 sm:py-2"
                >

                  {/* CRITERIA ICON */}

                  <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-white/80 bg-white text-[#194b92] shadow-[0_5px_18px_rgba(25,75,146,0.07)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_22px_rgba(25,75,146,0.12)] sm:h-[64px] sm:w-[64px]">

                    <Icon
                      size={28}
                      strokeWidth={1.65}
                      aria-hidden="true"
                      className="h-[21px] w-[21px] sm:h-7 sm:w-7"
                    />

                  </span>

                  {/* CRITERIA TITLE */}

                  <h4 className="mt-2 text-[11px] font-black leading-[18px] text-[#10233f] sm:mt-3 sm:text-[17px] sm:leading-6">

                    {item.title}

                  </h4>

                  {/* CRITERIA DESCRIPTION — DESKTOP ONLY */}

                  <p className="mt-1 hidden max-w-[300px] text-[13px] font-medium leading-6 text-slate-600 sm:block">

                    {item.desc}

                  </p>

                </div>

              );

            })}

          </div>

        </div>

        {/* ===============================================
            EDITORIAL INDEPENDENCE — DARK TRUST BAR
        ================================================ */}

        <div className="relative px-2.5 pb-2.5 sm:px-5 sm:pb-5">

          <div className="relative isolate flex flex-col items-center gap-3 overflow-hidden rounded-[11px] bg-[linear-gradient(120deg,#10233f_0%,#102e55_60%,#194b92_100%)] px-3 py-3.5 text-center sm:gap-5 sm:rounded-[14px] sm:px-7 sm:py-5 lg:flex-row lg:justify-between lg:text-right">

            {/* BACKGROUND ACCENT */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-32 -z-10 h-[280px] w-[280px] rounded-full bg-blue-400/10 blur-[70px]"
            />

            {/* TRUST MESSAGE */}

            <div className="flex min-w-0 flex-1 flex-row items-center gap-2.5 text-right sm:flex-col sm:gap-3 sm:text-center lg:flex-row lg:gap-4 lg:text-right">

              {/* TRUST ICON */}

              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[9px] border border-white/15 bg-white/10 text-blue-200 sm:h-[54px] sm:w-[54px] sm:rounded-[14px]">

                <ShieldCheck
                  size={29}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className="h-5 w-5 sm:h-[29px] sm:w-[29px]"
                />

              </span>

              {/* TRUST CONTENT */}

              <div className="min-w-0">

                <h3 className="text-[13px] font-black leading-6 text-white sm:text-[20px] sm:leading-7">

                  استقلالية التقييم وشفافية المعلومات

                </h3>

                <p className="mt-0.5 text-[10px] font-medium leading-5 text-blue-100/85 sm:mt-1 sm:text-[13px] sm:leading-6">

                  الإعلانات لا تؤثر على منهجية تقييم الوسطاء.

                </p>

              </div>

            </div>

            {/* METHODOLOGY BUTTON */}

            <Link
              href="/how-we-review-brokers"
              className="group inline-flex min-h-[38px] w-full shrink-0 items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-[11px] font-black text-[#102e55] transition duration-200 hover:bg-blue-50 sm:min-h-[46px] sm:w-auto sm:min-w-[210px] sm:gap-3 sm:rounded-[10px] sm:px-6 sm:text-[13px]"
            >

              اطّلع على منهجية التقييم

              <ArrowLeft
                size={17}
                strokeWidth={2}
                aria-hidden="true"
                className="h-[14px] w-[14px] shrink-0 transition-transform duration-200 group-hover:-translate-x-1 sm:h-[17px] sm:w-[17px]"
              />

            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}