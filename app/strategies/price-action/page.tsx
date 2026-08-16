import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   PRICE ACTION STRATEGY
   Broker Alarab
   Path: /strategies/price-action
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/price-action`;

const PAGE_TITLE =
  "استراتيجية البرايس أكشن Price Action بدون مؤشرات";

const PAGE_DESCRIPTION =
  "تعلم استراتيجية البرايس أكشن وكيفية قراءة حركة السعر بدون مؤشرات، مع شرح هيكل السوق والدعم والمقاومة والاختراقات والارتدادات ونماذج الشموع وإدارة المخاطر.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
    languages: {
      ar: PAGE_URL,
      en: `${BASE_URL}/en/strategies/price-action`,
      "x-default": `${BASE_URL}/en/strategies/price-action`,
    },
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    locale: "ar_AR",
    siteName: "Broker Alarab",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "دليل شامل لفهم البرايس أكشن وقراءة حركة السعر وهيكل السوق والدعم والمقاومة بدون الاعتماد على المؤشرات.",
  },
};


/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    q: "ما هي استراتيجية البرايس أكشن؟",
    a: "البرايس أكشن هو أسلوب لتحليل السوق يعتمد بصورة أساسية على قراءة حركة السعر نفسها، مثل القمم والقيعان والاتجاه والدعم والمقاومة والاختراقات والشموع، بدل الاعتماد على المؤشرات الفنية كعنصر رئيسي لاتخاذ القرار.",
  },
  {
    q: "هل يمكن التداول بالبرايس أكشن بدون مؤشرات؟",
    a: "نعم. يمكن استخدام البرايس أكشن بدون مؤشرات لأن التحليل يعتمد أساسًا على السعر وهيكل السوق والمستويات المهمة. وقد يستخدم بعض المتداولين مؤشرات بسيطة كأداة مساعدة، لكن ذلك ليس شرطًا لتطبيق البرايس أكشن.",
  },
  {
    q: "هل البرايس أكشن مناسب للمبتدئين؟",
    a: "يمكن للمبتدئ تعلم البرايس أكشن، لكن من الأفضل البدء بفهم الاتجاه والقمم والقيعان والدعم والمقاومة قبل الانتقال إلى نماذج الشموع والاختراقات الكاذبة وأساليب الدخول الأكثر تقدمًا.",
  },
  {
    q: "ما أفضل إطار زمني للبرايس أكشن؟",
    a: "لا يوجد إطار زمني واحد مناسب للجميع. الإطارات الأكبر قد تساعد على رؤية هيكل السوق بصورة أوضح، بينما يمكن استخدام إطار أصغر لتحسين توقيت الدخول وفق أسلوب وخطة المتداول.",
  },
  {
    q: "هل البرايس أكشن يضمن صفقات ناجحة؟",
    a: "لا. البرايس أكشن أسلوب لتحليل حركة السعر وليس نظامًا يضمن الربح. يمكن أن تفشل الاختراقات والارتدادات والنماذج السعرية، لذلك تبقى إدارة المخاطر ووقف الخسارة جزءًا أساسيًا من أي خطة تداول.",
  },
  {
    q: "ما الفرق بين البرايس أكشن والتحليل باستخدام المؤشرات؟",
    a: "البرايس أكشن يركز بصورة مباشرة على حركة السعر وبنية السوق، بينما تعتمد المؤشرات على حسابات مشتقة من بيانات مثل السعر أو الحجم. ويمكن الجمع بين الطريقتين، لكن البرايس أكشن لا يتطلب وجود مؤشر لتفسير حركة السوق.",
  },
];


/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
      {children}
    </span>
  );
}


function ImportantBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-brand-100 bg-brand-50/60 p-4 md:p-5">
      <div className="flex items-start gap-3">

        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-black text-white">
          !
        </div>

        <div className="min-w-0">

          <h3 className="text-[16px] font-black text-slate-950 md:text-[17px]">
            {title}
          </h3>

          <div className="mt-2 text-justify text-[13px] leading-7 text-slate-700 md:text-[14px] md:leading-8">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}


/* =========================================================
   HERO CHART — DESKTOP
========================================================= */

function PriceActionHeroDesktopChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">

        <div className="flex items-center justify-between gap-3">

          <div>
            <div className="text-[13px] font-black text-slate-950">
              قراءة حركة السعر
            </div>

            <div className="mt-0.5 text-[10px] text-slate-500">
              هيكل السوق ← مستوى مهم ← رد فعل السعر ← قرار التداول
            </div>
          </div>

          <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
            Price Action
          </span>

        </div>

      </div>


      <svg
        viewBox="0 0 720 400"
        className="block w-full"
        role="img"
        aria-label="رسم يوضح قراءة حركة السعر باستخدام البرايس أكشن من خلال الاتجاه والدعم والمقاومة والاختراق"
      >
        <defs>

          <linearGradient id="paHeroBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          <marker
            id="paArrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill="#2563eb" />
          </marker>

        </defs>


        <rect
          width="720"
          height="400"
          fill="url(#paHeroBg)"
        />


        {/* GRID */}
        {[75, 135, 195, 255, 315].map((y) => (
          <line
            key={`h-${y}`}
            x1="45"
            y1={y}
            x2="680"
            y2={y}
            stroke="#e8edf4"
            strokeWidth="1"
          />
        ))}

        {[120, 220, 320, 420, 520, 620].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="40"
            x2={x}
            y2="345"
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}


        {/* RESISTANCE */}
        <line
          x1="70"
          y1="118"
          x2="435"
          y2="118"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeDasharray="8 6"
        />

        <text
          x="80"
          y="100"
          fontSize="13"
          fontWeight="900"
          fill="#dc2626"
        >
          مقاومة
        </text>


        {/* SUPPORT */}
        <line
          x1="70"
          y1="292"
          x2="380"
          y2="292"
          stroke="#16a34a"
          strokeWidth="2.5"
          strokeDasharray="8 6"
        />

        <text
          x="80"
          y="318"
          fontSize="13"
          fontWeight="900"
          fill="#15803d"
        >
          دعم
        </text>


        {/* PRICE ACTION */}
        <polyline
          points="
            60,310
            115,255
            155,278
            210,205
            255,235
            315,155
            360,195
            415,120
            455,165
            505,108
            545,135
            600,78
            665,58
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* HIGHER LOW */}
        <circle
          cx="360"
          cy="195"
          r="7"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="360"
          y="220"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          قاع أعلى
        </text>


        {/* BREAKOUT */}
        <circle
          cx="415"
          cy="120"
          r="8"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <line
          x1="430"
          y1="92"
          x2="485"
          y2="70"
          stroke="#2563eb"
          strokeWidth="2"
          markerEnd="url(#paArrow)"
        />

        <text
          x="495"
          y="68"
          fontSize="13"
          fontWeight="900"
          fill="#1d4ed8"
        >
          اختراق
        </text>


        {/* RETEST */}
        <circle
          cx="455"
          cy="165"
          r="8"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        <text
          x="455"
          y="190"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          إعادة اختبار
        </text>


        {/* CONTINUATION */}
        <line
          x1="530"
          y1="105"
          x2="610"
          y2="72"
          stroke="#16a34a"
          strokeWidth="3"
          markerEnd="url(#paArrow)"
        />

        <text
          x="570"
          y="125"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          استمرار الاتجاه
        </text>


        {/* BOTTOM EXPLANATION */}
        <rect
          x="105"
          y="345"
          width="510"
          height="34"
          rx="17"
          fill="#0f172a"
        />

        <text
          x="360"
          y="367"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#ffffff"
        >
          اتجاه صاعد ← اختراق المقاومة ← إعادة اختبار ← استمرار حركة السعر
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   HERO CHART — MOBILE
   NO FULLSCREEN / NO ZOOM
========================================================= */

function PriceActionHeroMobileChart() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

        <span className="text-[11px] font-black text-slate-800">
          قراءة البرايس أكشن
        </span>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
          حركة السعر
        </span>

      </div>


      {/* MOBILE CHART */}
      <svg
        viewBox="0 0 360 260"
        className="block w-full"
        role="img"
        aria-label="مثال مبسط لقراءة حركة السعر باستخدام البرايس أكشن"
      >
        <rect
          width="360"
          height="260"
          fill="#ffffff"
        />


        {/* GRID */}
        {[55, 105, 155, 205].map((y) => (
          <line
            key={`hero-mobile-${y}`}
            x1="20"
            y1={y}
            x2="340"
            y2={y}
            stroke="#eef2f7"
            strokeWidth="1"
          />
        ))}


        {/* RESISTANCE */}
        <line
          x1="35"
          y1="105"
          x2="220"
          y2="105"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        <text
          x="42"
          y="93"
          fontSize="9"
          fontWeight="900"
          fill="#dc2626"
        >
          مقاومة
        </text>


        {/* PRICE */}
        <polyline
          points="
            25,215
            65,175
            100,195
            140,145
            175,165
            215,105
            245,135
            280,88
            330,58
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* BREAKOUT */}
        <circle
          cx="215"
          cy="105"
          r="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        <text
          x="215"
          y="86"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          اختراق
        </text>


        {/* RETEST */}
        <circle
          cx="245"
          cy="135"
          r="6"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        <text
          x="245"
          y="157"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#b45309"
        >
          إعادة اختبار
        </text>


        {/* CONTINUATION */}
        <text
          x="302"
          y="45"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          استمرار
        </text>


        {/* SUMMARY */}
        <rect
          x="45"
          y="222"
          width="270"
          height="25"
          rx="12.5"
          fill="#0f172a"
        />

        <text
          x="180"
          y="238"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#ffffff"
        >
          اتجاه ← مستوى ← اختراق ← إعادة اختبار
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   MARKET STRUCTURE CHART
========================================================= */

function MarketStructureChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      {/* HEADER */}
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          مثال على هيكل سوق صاعد
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          قمم أعلى وقيعان أعلى تدعم الاتجاه الصاعد
        </p>

      </div>


      {/* =================================================
          DESKTOP CHART
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 700 300"
          className="block w-full"
          role="img"
          aria-label="مثال على هيكل سوق صاعد باستخدام قمم أعلى وقيعان أعلى"
        >
          <rect width="700" height="300" fill="#ffffff" />


          {[60, 120, 180, 240].map((y) => (
            <line
              key={`market-desktop-${y}`}
              x1="35"
              y1={y}
              x2="665"
              y2={y}
              stroke="#f1f5f9"
            />
          ))}


          <polyline
            points="
              45,240
              135,150
              205,205
              300,115
              375,165
              470,78
              540,125
              645,48
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* HH */}
          <circle cx="300" cy="115" r="7" fill="#2563eb" />

          <text
            x="300"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#1d4ed8"
          >
            قمة أعلى
          </text>


          {/* HL */}
          <circle cx="375" cy="165" r="7" fill="#16a34a" />

          <text
            x="375"
            y="192"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#15803d"
          >
            قاع أعلى
          </text>


          {/* HH */}
          <circle cx="470" cy="78" r="7" fill="#2563eb" />

          <text
            x="470"
            y="57"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#1d4ed8"
          >
            قمة أعلى
          </text>


          {/* HL */}
          <circle cx="540" cy="125" r="7" fill="#16a34a" />

          <text
            x="540"
            y="151"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#15803d"
          >
            قاع أعلى
          </text>

        </svg>

      </div>


      {/* =================================================
          MOBILE PREVIEW — CLICK TO EXPAND
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#market-structure-chart-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="فتح رسم هيكل السوق بالحجم الكامل"
        >

          <div className="overflow-hidden">

            <svg
              viewBox="0 0 360 255"
              className="block w-full"
              role="img"
              aria-label="مثال مبسط على هيكل سوق صاعد للموبايل"
            >
              <rect width="360" height="255" fill="#ffffff" />


              {[55, 110, 165, 220].map((y) => (
                <line
                  key={`market-mobile-${y}`}
                  x1="18"
                  y1={y}
                  x2="342"
                  y2={y}
                  stroke="#f1f5f9"
                />
              ))}


              <polyline
                points="
                  20,220
                  70,155
                  105,190
                  155,120
                  200,155
                  245,85
                  285,120
                  340,48
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="155"
                cy="120"
                r="6"
                fill="#2563eb"
              />

              <text
                x="155"
                y="100"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#1d4ed8"
              >
                قمة أعلى
              </text>


              <circle
                cx="200"
                cy="155"
                r="6"
                fill="#16a34a"
              />

              <text
                x="200"
                y="178"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#15803d"
              >
                قاع أعلى
              </text>


              <circle
                cx="245"
                cy="85"
                r="6"
                fill="#2563eb"
              />

              <text
                x="245"
                y="66"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#1d4ed8"
              >
                قمة أعلى
              </text>


              <circle
                cx="285"
                cy="120"
                r="6"
                fill="#16a34a"
              />

              <text
                x="285"
                y="143"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#15803d"
              >
                قاع أعلى
              </text>

            </svg>

          </div>


          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">

              <span>
                تكبير الرسم
              </span>

              <span className="text-[14px]">
                ↗
              </span>

            </div>

          </div>

        </a>

      </div>


      {/* =================================================
          FULLSCREEN LIGHTBOX
      ================================================= */}
      <div
        id="market-structure-chart-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#market-structure"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                مثال على هيكل سوق صاعد
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                قمم أعلى وقيعان أعلى تدعم استمرار الاتجاه
              </div>

            </div>


            <a
              href="#market-structure"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>


          {/* MOBILE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">

            <span className="text-[16px]">
              ↔
            </span>

            <span>
              حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل
            </span>

          </div>


          {/* FULL CHART */}
          <div className="overflow-auto bg-white p-2">

            <svg
              viewBox="0 0 700 300"
              className="block min-w-[760px] w-full"
              role="img"
              aria-label="الرسم الكامل لهيكل السوق الصاعد"
            >
              <rect width="700" height="300" fill="#ffffff" />


              {[60, 120, 180, 240].map((y) => (
                <line
                  key={`market-full-${y}`}
                  x1="35"
                  y1={y}
                  x2="665"
                  y2={y}
                  stroke="#f1f5f9"
                />
              ))}


              <polyline
                points="
                  45,240
                  135,150
                  205,205
                  300,115
                  375,165
                  470,78
                  540,125
                  645,48
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle cx="300" cy="115" r="7" fill="#2563eb" />

              <text
                x="300"
                y="92"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#1d4ed8"
              >
                قمة أعلى
              </text>


              <circle cx="375" cy="165" r="7" fill="#16a34a" />

              <text
                x="375"
                y="192"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#15803d"
              >
                قاع أعلى
              </text>


              <circle cx="470" cy="78" r="7" fill="#2563eb" />

              <text
                x="470"
                y="57"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#1d4ed8"
              >
                قمة أعلى
              </text>


              <circle cx="540" cy="125" r="7" fill="#16a34a" />

              <text
                x="540"
                y="151"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#15803d"
              >
                قاع أعلى
              </text>

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SUPPORT / RESISTANCE CHART
========================================================= */

function SupportResistanceChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      {/* HEADER */}
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          كيف يتفاعل السعر مع الدعم والمقاومة؟
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          المنطقة أهم من البحث عن سعر واحد دقيق
        </p>

      </div>


      {/* =================================================
          DESKTOP CHART
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 700 320"
          className="block w-full"
          role="img"
          aria-label="رسم يوضح مناطق الدعم والمقاومة في استراتيجية البرايس أكشن"
        >
          <rect width="700" height="320" fill="#ffffff" />


          {/* RESISTANCE ZONE */}
          <rect
            x="45"
            y="60"
            width="610"
            height="42"
            rx="10"
            fill="#fff1f2"
            stroke="#fecdd3"
          />


          <rect
            x="70"
            y="68"
            width="115"
            height="26"
            rx="13"
            fill="#ffffff"
            stroke="#fecdd3"
          />


          <text
            x="127.5"
            y="81"
            fontSize="12"
            fontWeight="900"
            fill="#be123c"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            منطقة مقاومة
          </text>


          {/* SUPPORT ZONE */}
          <rect
            x="45"
            y="225"
            width="610"
            height="42"
            rx="10"
            fill="#f0fdf4"
            stroke="#bbf7d0"
          />


          <rect
            x="70"
            y="233"
            width="105"
            height="26"
            rx="13"
            fill="#ffffff"
            stroke="#bbf7d0"
          />


          <text
            x="122.5"
            y="246"
            fontSize="12"
            fontWeight="900"
            fill="#15803d"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            منطقة دعم
          </text>


          {/* PRICE */}
          <polyline
            points="
              65,235
              130,175
              185,90
              245,155
              300,240
              365,170
              420,82
              485,145
              540,235
              600,170
              640,110
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* REACTIONS */}
          <circle
            cx="185"
            cy="90"
            r="7"
            fill="#ffffff"
            stroke="#e11d48"
            strokeWidth="3"
          />

          <circle
            cx="300"
            cy="240"
            r="7"
            fill="#ffffff"
            stroke="#16a34a"
            strokeWidth="3"
          />

          <circle
            cx="420"
            cy="82"
            r="7"
            fill="#ffffff"
            stroke="#e11d48"
            strokeWidth="3"
          />

          <circle
            cx="540"
            cy="235"
            r="7"
            fill="#ffffff"
            stroke="#16a34a"
            strokeWidth="3"
          />

        </svg>

      </div>


      {/* =================================================
          MOBILE PREVIEW — CLICK TO EXPAND
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#support-resistance-chart-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="فتح رسم الدعم والمقاومة بالحجم الكامل"
        >

          <div className="overflow-hidden">

            <svg
              viewBox="0 0 360 280"
              className="block w-full"
              role="img"
              aria-label="مثال مبسط للدعم والمقاومة للموبايل"
            >
              <rect width="360" height="280" fill="#ffffff" />


              {/* RESISTANCE */}
              <rect
                x="25"
                y="48"
                width="310"
                height="35"
                rx="9"
                fill="#fff1f2"
                stroke="#fecdd3"
              />

              <rect
                x="40"
                y="54"
                width="92"
                height="23"
                rx="11"
                fill="#ffffff"
                stroke="#fecdd3"
              />

              <text
                x="86"
                y="65.5"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight="900"
                fill="#be123c"
              >
                مقاومة
              </text>


              {/* SUPPORT */}
              <rect
                x="25"
                y="205"
                width="310"
                height="35"
                rx="9"
                fill="#f0fdf4"
                stroke="#bbf7d0"
              />

              <rect
                x="40"
                y="211"
                width="82"
                height="23"
                rx="11"
                fill="#ffffff"
                stroke="#bbf7d0"
              />

              <text
                x="81"
                y="222.5"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight="900"
                fill="#15803d"
              >
                دعم
              </text>


              {/* PRICE */}
              <polyline
                points="
                  30,215
                  75,165
                  110,72
                  150,130
                  185,215
                  225,150
                  260,68
                  295,130
                  330,205
                  345,150
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="110"
                cy="72"
                r="6"
                fill="#ffffff"
                stroke="#e11d48"
                strokeWidth="2.5"
              />

              <circle
                cx="185"
                cy="215"
                r="6"
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="2.5"
              />

              <circle
                cx="260"
                cy="68"
                r="6"
                fill="#ffffff"
                stroke="#e11d48"
                strokeWidth="2.5"
              />

              <circle
                cx="330"
                cy="205"
                r="6"
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="2.5"
              />

            </svg>

          </div>


          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">

              <span>
                تكبير الرسم
              </span>

              <span className="text-[14px]">
                ↗
              </span>

            </div>

          </div>

        </a>

      </div>


      {/* =================================================
          FULLSCREEN LIGHTBOX
      ================================================= */}
      <div
        id="support-resistance-chart-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#support-resistance"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                الدعم والمقاومة في البرايس أكشن
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                راقب تفاعل السعر مع المنطقة بدل الاعتماد على خط دقيق
              </div>

            </div>


            <a
              href="#support-resistance"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>


          {/* MOBILE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">

            <span className="text-[16px]">
              ↔
            </span>

            <span>
              حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل
            </span>

          </div>


          {/* FULL CHART */}
          <div className="overflow-auto bg-white p-2">

            <svg
              viewBox="0 0 700 320"
              className="block min-w-[760px] w-full"
              role="img"
              aria-label="الرسم الكامل لمناطق الدعم والمقاومة"
            >
              <rect width="700" height="320" fill="#ffffff" />


              {/* RESISTANCE ZONE */}
              <rect
                x="45"
                y="60"
                width="610"
                height="42"
                rx="10"
                fill="#fff1f2"
                stroke="#fecdd3"
              />

              <rect
                x="70"
                y="68"
                width="115"
                height="26"
                rx="13"
                fill="#ffffff"
                stroke="#fecdd3"
              />

              <text
                x="127.5"
                y="81"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="900"
                fill="#be123c"
              >
                منطقة مقاومة
              </text>


              {/* SUPPORT ZONE */}
              <rect
                x="45"
                y="225"
                width="610"
                height="42"
                rx="10"
                fill="#f0fdf4"
                stroke="#bbf7d0"
              />

              <rect
                x="70"
                y="233"
                width="105"
                height="26"
                rx="13"
                fill="#ffffff"
                stroke="#bbf7d0"
              />

              <text
                x="122.5"
                y="246"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="900"
                fill="#15803d"
              >
                منطقة دعم
              </text>


              {/* PRICE */}
              <polyline
                points="
                  65,235
                  130,175
                  185,90
                  245,155
                  300,240
                  365,170
                  420,82
                  485,145
                  540,235
                  600,170
                  640,110
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="185"
                cy="90"
                r="7"
                fill="#ffffff"
                stroke="#e11d48"
                strokeWidth="3"
              />

              <circle
                cx="300"
                cy="240"
                r="7"
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="3"
              />

              <circle
                cx="420"
                cy="82"
                r="7"
                fill="#ffffff"
                stroke="#e11d48"
                strokeWidth="3"
              />

              <circle
                cx="540"
                cy="235"
                r="7"
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="3"
              />

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function PriceActionStrategyPage() {

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",

  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  url: PAGE_URL,
  inLanguage: "ar",

  datePublished: "2026-08-16",
  dateModified: "2026-08-16",

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },

  author: {
    "@type": "Organization",
    name: "Broker Alarab",
    url: BASE_URL,
  },

  publisher: {
    "@type": "Organization",
    name: "Broker Alarab",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo/email-signature-icon.png`,
    },
  },

  about: [
    {
      "@type": "Thing",
      name: "استراتيجية البرايس أكشن",
    },
    {
      "@type": "Thing",
      name: "Price Action Trading",
    },
    {
      "@type": "Thing",
      name: "Price Action Strategy",
    },
    {
      "@type": "Thing",
      name: "Market Structure",
    },
    {
      "@type": "Thing",
      name: "Support and Resistance",
    },
    {
      "@type": "Thing",
      name: "Candlestick Patterns",
    },
    {
      "@type": "Thing",
      name: "Breakout Trading",
    },
    {
      "@type": "Thing",
      name: "Pullback Trading",
    },
  ],

  keywords: [
    "استراتيجية البرايس أكشن",
    "برايس أكشن",
    "Price Action",
    "Price Action Trading",
    "Price Action Strategy",
    "التداول بدون مؤشرات",
    "حركة السعر",
    "هيكل السوق",
    "الدعم والمقاومة",
    "نماذج الشموع",
    "Pin Bar",
    "Engulfing",
    "Breakout",
    "Pullback",
    "Retest",
    "الاختراق",
    "إعادة الاختبار",
  ],
};


  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "استراتيجيات التداول",
        item: `${BASE_URL}/strategies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "استراتيجية البرايس أكشن",
        item: PAGE_URL,
      },
    ],
  };


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };


  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50/40 pb-6 text-right md:pb-10"
    >

      {/* =====================================================
          BREADCRUMBS
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-4 pt-3 md:px-6">

        <nav
          aria-label="مسار التنقل"
          className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500"
        >

          <Link
            href="/"
            className="transition hover:text-brand-600"
          >
            الرئيسية
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <Link
            href="/strategies"
            className="transition hover:text-brand-600"
          >
            استراتيجيات التداول
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <span className="text-slate-700">
            البرايس أكشن
          </span>

        </nav>

      </div>


      {/* =====================================================
          HERO — SAME ICT / SCALPING STYLE
      ===================================================== */}

      <section className="mx-auto max-w-[1520px] px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">

        {/* ===================================================
            DESKTOP HERO
        =================================================== */}

        <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm md:block">

          <div className="grid min-h-[390px] lg:grid-cols-[1.18fr_0.82fr]">

            {/* TEXT */}
            <div className="flex flex-col justify-center px-8 py-7 lg:px-10 xl:px-12">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                  استراتيجيات التداول
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
                  Price Action
                </span>

              </div>


              <h1 className="mt-4 max-w-[880px] text-[34px] font-black leading-[1.28] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                استراتيجية البرايس أكشن: قراءة حركة السعر بدون مؤشرات
              </h1>


              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                تعلّم كيف تقرأ{" "}
                <strong className="font-black text-slate-900">
                  حركة السعر وهيكل السوق والدعم والمقاومة
                </strong>{" "}
                وتستخدم الاختراقات وإعادة الاختبار وسلوك الشموع لبناء
                سيناريو تداول واضح دون الاعتماد على مجموعة كبيرة من المؤشرات.
              </p>


              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  هيكل السوق
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-black text-green-700">
                  دعم ومقاومة
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  إعادة اختبار
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  سلوك الشموع
                </span>

              </div>


              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                <span>
                  📅 16 أغسطس 2026
                </span>

                <span className="text-slate-300">•</span>

                <span>
                  وقت القراءة: 15–20 دقيقة
                </span>

              </div>

            </div>


            {/* VISUAL */}
            <div className="flex items-center justify-center border-r border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:p-8">

              <div className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">

                <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  </div>

                  <span className="text-[10px] font-black text-slate-700">
                    Price Action Model
                  </span>

                </div>

                <div className="p-4">
                  <PriceActionHeroDesktopChart />
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            MOBILE HERO — COMPACT
        =================================================== */}

        <div className="md:hidden">

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

            {/* TEXT */}
            <div className="px-4 pb-2.5 pt-3.5">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
                  استراتيجيات التداول
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600">
                  Price Action
                </span>

              </div>


              <h1 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950">
                استراتيجية البرايس أكشن: قراءة حركة السعر بدون مؤشرات
              </h1>


              <p className="mt-3 text-[14px] leading-[1.9] text-slate-600">
                دليل عملي لفهم{" "}
                <strong className="font-black text-slate-900">
                  هيكل السوق والمستويات والاختراق وإعادة الاختبار
                </strong>{" "}
                من خلال حركة السعر نفسها.
              </p>


              <div className="mt-2.5 flex items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 16 أغسطس 2026
                </span>

                <span className="text-slate-300">•</span>

                <span>
                  ⏱ 15–20 دقيقة
                </span>

              </div>

            </div>


            {/* MOBILE CHART */}
            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

                <PriceActionHeroMobileChart />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ARTICLE
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-3 py-5 sm:px-4 md:px-6 md:py-8 lg:px-8">

        <article className="space-y-6 md:space-y-8">


          {/* =================================================
              01 — WHAT IS PRICE ACTION?
          ================================================= */}

          <section
            id="what-is-price-action"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — المفهوم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما هي استراتيجية البرايس أكشن Price Action؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                مصطلح Price Action يعني ببساطة{" "}
                <strong className="font-black text-slate-900">
                  حركة السعر
                </strong>
                . وعند استخدامه كأسلوب تداول، يحاول المتداول فهم ما يفعله
                المشترون والبائعون من خلال سلوك السعر على الرسم البياني،
                بدل انتظار إشارة جاهزة من مؤشر فني.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:gap-5">

                {/* EXPLANATION */}
                <div>

                  <h3 className="text-[17px] font-black text-slate-950 md:text-[20px]">
                    ماذا يقرأ متداول البرايس أكشن؟
                  </h3>

                  <p className="mt-2 text-justify text-[13px] leading-7 text-slate-600 md:text-[14px] md:leading-8">
                    لا ينظر المتداول إلى كل شمعة بشكل منفصل. القراءة الأفضل
                    تبدأ من الصورة الأكبر: هل السوق صاعد أم هابط أم يتحرك
                    داخل نطاق؟ أين توجد القمم والقيعان المهمة؟ وهل يقترب
                    السعر من مستوى سبق أن ظهر عنده ضغط شراء أو بيع؟
                  </p>


                  <div className="mt-4 grid grid-cols-2 gap-2.5">

                    {[
                      "الاتجاه العام",
                      "القمم والقيعان",
                      "الدعم والمقاومة",
                      "الاختراقات",
                      "إعادة الاختبار",
                      "سلوك الشموع",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-[12px] border border-slate-200 bg-slate-50/60 px-3 py-2.5"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-brand-600" />

                        <span className="text-[11px] font-black text-slate-700 md:text-[12px]">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>


                {/* SIMPLE LOGIC */}
                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                  <div className="text-[10px] font-black text-brand-600">
                    الفكرة الأساسية
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
                    السعر أولًا، ثم القرار
                  </h3>


                  <div className="mt-4 space-y-2">

                    {[
                      {
                        no: "1",
                        text: "حدد حالة السوق واتجاهه.",
                      },
                      {
                        no: "2",
                        text: "حدد المناطق والمستويات المهمة.",
                      },
                      {
                        no: "3",
                        text: "راقب طريقة وصول السعر إليها.",
                      },
                      {
                        no: "4",
                        text: "انتظر رد فعل أو تأكيدًا واضحًا.",
                      },
                      {
                        no: "5",
                        text: "حدد الدخول والوقف والهدف قبل التنفيذ.",
                      },
                    ].map((item) => (
                      <div
                        key={item.no}
                        className="flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                          {item.no}
                        </div>

                        <span className="text-[11px] font-bold leading-5 text-slate-700 md:text-[12px]">
                          {item.text}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>

              </div>


              <div className="mt-5">

                <ImportantBox title="البرايس أكشن لا يعني التداول العشوائي بدون مؤشرات">
                  إزالة المؤشرات من الرسم البياني لا تجعل أي قرار تداول
                  برايس أكشن. يجب أن تكون هناك طريقة واضحة لقراءة الهيكل
                  والمستويات وسلوك السعر، إضافة إلى قواعد محددة لإدارة
                  المخاطر.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              02 — HOW PRICE ACTION WORKS
          ================================================= */}

          <section
            id="how-it-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — طريقة القراءة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تعمل استراتيجية البرايس أكشن؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                الفكرة ليست توقع الحركة التالية من شكل شمعة واحدة، بل بناء
                سيناريو تدريجي. يبدأ التحليل من سياق السوق، ثم المستوى الذي
                يتفاعل معه السعر، وبعد ذلك يتم تقييم رد الفعل قبل التفكير
                في الدخول.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP FLOW */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "السياق",
                    text: "حدد الاتجاه أو النطاق الذي يتحرك داخله السوق.",
                  },
                  {
                    no: "02",
                    title: "المستوى",
                    text: "حدد دعمًا أو مقاومة أو منطقة سعرية مهمة.",
                  },
                  {
                    no: "03",
                    title: "الوصول",
                    text: "راقب كيف يصل السعر إلى المنطقة وقوة الحركة.",
                  },
                  {
                    no: "04",
                    title: "رد الفعل",
                    text: "ابحث عن رفض أو اختراق أو إعادة اختبار واضحة.",
                  },
                  {
                    no: "05",
                    title: "الخطة",
                    text: "حدد الدخول ووقف الخسارة والهدف والمخاطرة.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[14px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-justify text-[11px] leading-5 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE FLOW */}
              <div className="md:hidden">

                <div className="overflow-hidden rounded-[18px] border border-slate-200">

                  {[
                    {
                      no: "01",
                      title: "حدد السياق",
                      text: "هل السوق صاعد، هابط أم داخل نطاق؟",
                    },
                    {
                      no: "02",
                      title: "حدد المستوى",
                      text: "ابحث عن منطقة سعرية لها أهمية واضحة.",
                    },
                    {
                      no: "03",
                      title: "راقب الوصول",
                      text: "لاحظ قوة الحركة عند اقتراب السعر.",
                    },
                    {
                      no: "04",
                      title: "انتظر رد الفعل",
                      text: "رفض، اختراق أو إعادة اختبار.",
                    },
                    {
                      no: "05",
                      title: "ضع الخطة",
                      text: "دخول ووقف وهدف ومخاطرة محددة.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.no}
                      className={`flex items-center gap-3 px-3.5 py-3 ${
                        index !== 4 ? "border-b border-slate-100" : ""
                      }`}
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-[13px] font-black text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                          {item.text}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-5">

                <PriceActionHeroDesktopChart />

              </div>


              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
                  لماذا السياق أهم من شكل الشمعة؟
                </h3>

                <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                  ظهور شمعة رفض في منتصف حركة عشوائية لا يحمل نفس المعنى
                  الذي قد تحمله شمعة مشابهة عند دعم واضح داخل اتجاه صاعد.
                  لذلك يتم تقييم نماذج الشموع ضمن{" "}
                  <strong className="font-black text-slate-800">
                    مكانها وسياقها
                  </strong>
                  ، وليس كإشارات منفصلة عن بقية الرسم البياني.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              03 — MARKET STRUCTURE
          ================================================= */}

          <section
            id="market-structure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — هيكل السوق
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                قراءة الاتجاه والقمم والقيعان في البرايس أكشن
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                قبل البحث عن نموذج دخول، يجب فهم بنية حركة السعر. القمم
                والقيعان تساعد على معرفة ما إذا كان المشترون أو البائعون
                يسيطرون على الحركة، أو ما إذا كان السوق يفتقد اتجاهًا واضحًا.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                {/* UPTREND */}
                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black text-emerald-700">
                    اتجاه صاعد
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    قمم أعلى + قيعان أعلى
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
                    عندما ينجح السعر بصورة متكررة في تكوين قمم وقيعان أعلى،
                    يكون هيكل السوق الصاعد قائمًا ما لم تظهر علامات واضحة
                    على فقدان هذا التسلسل.
                  </p>

                </article>


                {/* DOWNTREND */}
                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                  <div className="text-[9px] font-black text-rose-700">
                    اتجاه هابط
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    قمم أدنى + قيعان أدنى
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
                    استمرار تكوين قمم وقيعان أدنى يشير إلى هيكل هابط،
                    ويصبح البحث عن صفقات شراء عكس الاتجاه بحاجة إلى مبرر
                    أقوى من مجرد وصول السعر إلى مستوى منخفض.
                  </p>

                </article>


                {/* RANGE */}
                <article className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="text-[9px] font-black text-slate-500">
                    سوق عرضي
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    لا يوجد اتجاه واضح
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
                    عندما يتحرك السعر بين حدود متكررة دون تكوين تسلسل واضح،
                    يصبح التعامل معه كنطاق سعري أكثر منطقية من إجباره على
                    تصنيف صاعد أو هابط.
                  </p>

                </article>

              </div>


              <div className="mt-5">
                <MarketStructureChart />
              </div>


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <div className="rounded-[16px] border border-slate-200 bg-white p-4">

                  <h3 className="text-[14px] font-black text-slate-950">
                    لا تحكم على الاتجاه من آخر شمعتين
                  </h3>

                  <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    هبوط قصير داخل اتجاه صاعد قد يكون مجرد تصحيح، كما أن
                    ارتفاعًا قصيرًا داخل اتجاه هابط لا يعني بالضرورة بداية
                    اتجاه جديد. انظر إلى تسلسل القمم والقيعان والسياق الأكبر.
                  </p>

                </div>


                <div className="rounded-[16px] border border-slate-200 bg-white p-4">

                  <h3 className="text-[14px] font-black text-slate-950">
                    استخدم أكثر من إطار زمني عند الحاجة
                  </h3>

                  <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    يمكن استخدام إطار زمني أكبر لفهم الاتجاه والمستويات
                    الرئيسية، ثم الانتقال إلى إطار أصغر لمراقبة سلوك السعر
                    بصورة أدق عند منطقة الاهتمام.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              04 — SUPPORT & RESISTANCE
          ================================================= */}

          <section
            id="support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — المستويات
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                الدعم والمقاومة في استراتيجية البرايس أكشن
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                الدعم والمقاومة من أهم الأدوات في تحليل حركة السعر، لكن
                التعامل معهما كخطوط دقيقة جدًا قد يكون مضللًا. في كثير من
                الحالات يكون من الأفضل التفكير في{" "}
                <strong className="font-black text-slate-900">
                  مناطق سعرية
                </strong>{" "}
                يظهر حولها تفاعل متكرر بدل افتراض أن السعر يجب أن يرتد من
                رقم واحد بالضبط.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">

                <div>

                  <div className="space-y-3">

                    <div className="rounded-[16px] border border-emerald-100 bg-emerald-50/40 p-4">

                      <h3 className="text-[15px] font-black text-slate-950">
                        منطقة الدعم
                      </h3>

                      <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                        منطقة أظهر السعر حولها سابقًا قدرة على إيقاف الهبوط
                        أو جذب طلب كافٍ لدفع السعر إلى الأعلى. لكنها لا
                        تضمن حدوث ارتداد جديد في كل زيارة.
                      </p>

                    </div>


                    <div className="rounded-[16px] border border-rose-100 bg-rose-50/40 p-4">

                      <h3 className="text-[15px] font-black text-slate-950">
                        منطقة المقاومة
                      </h3>

                      <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                        منطقة ظهر حولها سابقًا ضغط بيع أو توقف في الصعود.
                        عند العودة إليها يراقب المتداول رد فعل السعر بدل
                        افتراض أن المقاومة ستصمد تلقائيًا.
                      </p>

                    </div>


                    <div className="rounded-[16px] border border-brand-100 bg-brand-50/40 p-4">

                      <h3 className="text-[15px] font-black text-slate-950">
                        تحول الأدوار
                      </h3>

                      <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                        بعد اختراق مقاومة مهمة قد تعود المنطقة لتعمل كدعم،
                        والعكس ممكن بعد كسر الدعم. لكن التحول ليس قاعدة
                        مضمونة ويجب تقييم رد فعل السعر عند إعادة الاختبار.
                      </p>

                    </div>

                  </div>

                </div>


                <SupportResistanceChart />

              </div>


              <div className="mt-5 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[12px] font-black text-white">
                    !
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
                      كثرة رسم المستويات تفسد قراءة الرسم البياني
                    </h3>

                    <p className="mt-1 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      إذا تم اعتبار كل قمة وقاع صغير مستوى دعم أو مقاومة،
                      سيمتلئ الرسم بخطوط لا تساعد على اتخاذ القرار. ركز على
                      المناطق التي يظهر حولها تفاعل واضح أو التي تتوافق مع
                      هيكل السوق والسياق الذي تتداوله.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>
                   {/* =================================================
              05 — CANDLESTICK PRICE ACTION
          ================================================= */}

          <section
            id="candlestick-patterns"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* =================================================
                HEADER
            ================================================= */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — سلوك الشموع
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                نماذج الشموع في البرايس أكشن: ماذا تخبرك فعلًا؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                نماذج الشموع ليست إشارات مستقلة للشراء والبيع. قيمتها الحقيقية
                تظهر عندما تقرأها داخل سياق واضح، مثل دعم أو مقاومة أو اتجاه
                قائم أو بعد اختراق وإعادة اختبار.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* =================================================
                  CANDLE TYPES
              ================================================= */}
              <div className="grid gap-3 md:grid-cols-3">

                {/* LONG WICK */}
                <article className="rounded-[18px] border border-brand-100 bg-brand-50/40 p-4">

                  <div className="text-[9px] font-black text-brand-600">
                    رفض سعري
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    شمعة بظل طويل
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
                    الظل الطويل قد يشير إلى أن السعر وصل إلى منطقة معينة ثم
                    واجه ضغطًا معاكسًا. لكن مكان ظهور الشمعة أهم من شكلها وحده.
                  </p>

                </article>


                {/* ENGULFING */}
                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black text-emerald-700">
                    تغير في الزخم
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    شمعة ابتلاعية
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
                    قد تعكس انتقالًا واضحًا في الزخم عندما تظهر عند منطقة مهمة
                    وبعد حركة سابقة مفهومة، وليس فقط لأن جسم الشمعة كبير.
                  </p>

                </article>


                {/* DOJI */}
                <article className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="text-[9px] font-black text-slate-500">
                    تردد
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    شمعة صغيرة أو Doji
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
                    قد تدل على توازن مؤقت أو تردد، لكنها لا تعني تلقائيًا
                    انعكاس الاتجاه. تحتاج إلى تأكيد وسياق.
                  </p>

                </article>

              </div>


              {/* =================================================
                  CANDLE READING LOGIC
              ================================================= */}
              <div className="mt-4 grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">

                {/* =================================================
                    MAIN READING LOGIC
                ================================================= */}
                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <div className="text-[9px] font-black text-brand-600">
                        قراءة السياق
                      </div>

                      <h3 className="mt-1 text-[17px] font-black text-slate-950">
                        كيف تقرأ الشمعة بشكل صحيح؟
                      </h3>

                    </div>


                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[14px] font-black text-brand-600 sm:flex">
                      5
                    </div>

                  </div>


                  <p className="mt-2 max-w-3xl text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    لا تبدأ باسم النموذج. ابدأ بالسياق الذي ظهرت فيه الشمعة،
                    ثم قيّم موقعها واتجاه الحركة السابقة وما إذا كان هناك
                    تأكيد بعد ظهورها.
                  </p>


                  {/* =================================================
                      DESKTOP / TABLET CHECKLIST
                  ================================================= */}
                  <div className="mt-4 hidden gap-2.5 sm:grid sm:grid-cols-2">

                    {[
                      {
                        no: "01",
                        title: "مكان ظهور الشمعة",
                        text: "هل ظهرت عند دعم أو مقاومة أو مستوى مهم؟",
                      },
                      {
                        no: "02",
                        title: "الاتجاه السابق",
                        text: "ما الحركة التي سبقت ظهور النموذج؟",
                      },
                      {
                        no: "03",
                        title: "حجم ورد فعل الشمعة",
                        text: "هل يظهر النموذج رفضًا أو انتقالًا واضحًا في الزخم؟",
                      },
                      {
                        no: "04",
                        title: "التأكيد",
                        text: "هل جاءت بعدها حركة تدعم السيناريو؟",
                      },
                      {
                        no: "05",
                        title: "إلغاء الفكرة",
                        text: "هل يوجد مستوى واضح يمكن وضع وقف الخسارة خلفه؟",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.no}
                        className={`flex items-start gap-3 rounded-[13px] border border-slate-100 bg-slate-50/60 px-3 py-3 ${
                          index === 4 ? "sm:col-span-2" : ""
                        }`}
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                          {item.no}
                        </div>

                        <div className="min-w-0">

                          <h4 className="text-[12px] font-black text-slate-900">
                            {item.title}
                          </h4>

                          <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                            {item.text}
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>


                  {/* =================================================
                      MOBILE CHECKLIST
                  ================================================= */}
                  <div className="mt-3 overflow-hidden rounded-[14px] border border-slate-100 sm:hidden">

                    {[
                      ["01", "مكان الشمعة", "عند مستوى مهم أم في منتصف الحركة؟"],
                      ["02", "الاتجاه السابق", "ما الحركة التي سبقت النموذج؟"],
                      ["03", "قوة النموذج", "هل يظهر رفضًا أو تغيرًا واضحًا؟"],
                      ["04", "التأكيد", "هل جاءت حركة تدعم المعنى؟"],
                      ["05", "إلغاء الفكرة", "هل يوجد وقف خسارة منطقي؟"],
                    ].map(([no, title, text], index) => (
                      <div
                        key={no}
                        className={`flex items-center gap-3 px-3 py-2.5 ${
                          index !== 4 ? "border-b border-slate-100" : ""
                        }`}
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                          {no}
                        </div>

                        <div className="min-w-0">

                          <div className="text-[12px] font-black text-slate-900">
                            {title}
                          </div>

                          <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                            {text}
                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>


                {/* =================================================
                    COMMON MISTAKE
                ================================================= */}
                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/55 p-4 md:p-5">

                  <div className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-black text-amber-700">
                    خطأ شائع
                  </div>

                  <h3 className="mt-2 text-[17px] font-black leading-7 text-slate-950">
                    حفظ أسماء الشموع بدون فهم السياق
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    يمكن العثور على Pin Bar أو Engulfing أو Doji في أماكن
                    كثيرة جدًا على الرسم البياني. وجود النموذج وحده لا يعني
                    وجود فرصة تداول.
                  </p>


                  <div className="mt-4 rounded-[14px] border border-amber-100 bg-white/80 p-3">

                    <div className="text-[10px] font-black text-slate-700">
                      بدل البحث عن اسم النموذج اسأل:
                    </div>

                    <div className="mt-2 space-y-2">

                      {[
                        "أين ظهر النموذج؟",
                        "ما الذي حدث قبله؟",
                        "هل يوجد مستوى مهم؟",
                        "هل تغير سلوك السعر بعده؟",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2"
                        >

                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />

                          <span className="text-[11px] leading-5 text-slate-600">
                            {item}
                          </span>

                        </div>
                      ))}

                    </div>

                  </div>


                  <div className="mt-4 border-t border-amber-100 pt-3">

                    <p className="text-[11px] leading-5 text-slate-500">
                      الهدف هو فهم ما يفعله المشترون والبائعون، وليس جمع أكبر
                      عدد ممكن من أسماء نماذج الشموع.
                    </p>

                  </div>

                </aside>

              </div>


              {/* =================================================
                  IMPORTANT NOTE
              ================================================= */}
              <div className="mt-4">

                <ImportantBox title="الشمعة تأكيد وليست سبب الصفقة وحدها">
                  إذا ظهر نموذج قوي داخل منطقة غير مهمة أو ضد هيكل سوق واضح،
                  فإن احتمال نجاحه قد يكون أقل. تعامل مع الشموع كجزء من
                  السيناريو وليس كإشارة منفصلة.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              06 — PIN BAR & ENGULFING
          ================================================= */}

          <section
            id="pin-bar-engulfing"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — نماذج مشهورة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Pin Bar وEngulfing في البرايس أكشن
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                من أشهر نماذج البرايس أكشن شمعة Pin Bar والشمعة الابتلاعية
                Engulfing. لكن استخدامها بشكل فعّال يتطلب قراءة المكان الذي
                ظهرت فيه، وليس مجرد التعرف على شكلها.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                {/* PIN BAR */}
                <article className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <div className="text-[9px] font-black text-brand-600">
                        Price Rejection
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        Pin Bar
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brand-50 text-[14px] font-black text-brand-600">
                      P
                    </div>

                  </div>


                  <p className="mt-3 text-justify text-[13px] leading-6 text-slate-600">
                    تتميز عادة بظل واضح مقارنة بجسم الشمعة، ما يعكس محاولة
                    السعر التحرك في اتجاه معين ثم عودته قبل الإغلاق.
                  </p>


                  <div className="mt-3 rounded-[14px] border border-slate-100 bg-slate-50/70 p-3">

                    <div className="text-[10px] font-black text-slate-700">
                      تصبح أكثر أهمية عندما:
                    </div>

                    <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">
                      <li>• تظهر عند دعم أو مقاومة واضحة.</li>
                      <li>• تتوافق مع الاتجاه العام.</li>
                      <li>• يتبعها تأكيد في نفس الاتجاه.</li>
                    </ul>

                  </div>

                </article>


                {/* ENGULFING */}
                <article className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <div className="text-[9px] font-black text-emerald-700">
                        Momentum Shift
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        Engulfing
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-emerald-50 text-[14px] font-black text-emerald-700">
                      E
                    </div>

                  </div>


                  <p className="mt-3 text-justify text-[13px] leading-6 text-slate-600">
                    الشمعة الابتلاعية تعكس تغيرًا واضحًا في قوة الحركة عندما
                    يغطي جسمها حركة الشمعة السابقة بصورة ملحوظة.
                  </p>


                  <div className="mt-3 rounded-[14px] border border-slate-100 bg-slate-50/70 p-3">

                    <div className="text-[10px] font-black text-slate-700">
                      تصبح أكثر فائدة عندما:
                    </div>

                    <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">
                      <li>• تظهر بعد حركة ممتدة.</li>
                      <li>• تتكون عند مستوى سعري مهم.</li>
                      <li>• يكون جسمها واضحًا مقارنة بالحركة السابقة.</li>
                    </ul>

                  </div>

                </article>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  مثال على الفرق بين النموذج والسياق
                </h3>

                <div className="mt-3 grid gap-2 md:grid-cols-2">

                  <div className="rounded-[14px] border border-rose-100 bg-white p-3">

                    <div className="text-[10px] font-black text-rose-700">
                      نموذج ضعيف
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      Pin Bar في منتصف نطاق سعري بلا دعم أو مقاومة واضحة.
                    </p>

                  </div>


                  <div className="rounded-[14px] border border-emerald-100 bg-white p-3">

                    <div className="text-[10px] font-black text-emerald-700">
                      نموذج أقوى نسبيًا
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      Pin Bar عند دعم واضح داخل اتجاه صاعد مع ظهور تأكيد بعده.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              07 — BREAKOUT & FALSE BREAKOUT
          ================================================= */}

          <section
            id="breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — الاختراق
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                استراتيجية الاختراق والاختراق الكاذب في البرايس أكشن
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                عندما يخترق السعر دعمًا أو مقاومة، لا يعني ذلك تلقائيًا أن
                الحركة ستستمر. بعض الاختراقات تنجح وتتحول إلى اتجاه جديد،
                بينما يعود بعضها سريعًا داخل المنطقة ويصبح اختراقًا كاذبًا.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                <div className="rounded-[17px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="text-[9px] font-black text-brand-600">
                    01
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    الاختراق
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    السعر يتجاوز مستوى مهم ويغلق خارجه، لكن هذا وحده لا يكفي
                    للحكم على استمرار الحركة.
                  </p>

                </div>


                <div className="rounded-[17px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black text-emerald-700">
                    02
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    إعادة الاختبار
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    يعود السعر إلى المنطقة المخترقة ثم يثبت فوقها أو أسفلها،
                    ما قد يعطي تأكيدًا أفضل من الدخول لحظة الاختراق.
                  </p>

                </div>


                <div className="rounded-[17px] border border-rose-100 bg-rose-50/40 p-4">

                  <div className="text-[9px] font-black text-rose-700">
                    03
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    الاختراق الكاذب
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    يتجاوز السعر المستوى لفترة قصيرة ثم يعود داخله، ما قد
                    يشير إلى فشل الحركة الأصلية.
                  </p>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  ما الذي يجعل الاختراق أكثر موثوقية؟
                </h3>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">

                  {[
                    "وجود مستوى واضح تم اختباره سابقًا.",
                    "حركة قوية نسبيًا عند كسر المستوى.",
                    "إغلاق واضح خارج المنطقة.",
                    "عدم العودة السريعة داخل النطاق.",
                    "ظهور إعادة اختبار ناجحة.",
                    "توافق الاختراق مع اتجاه السوق الأكبر.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-[12px] bg-slate-50 px-3 py-2.5"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />

                      <span className="text-[11px] leading-5 text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[12px] font-black text-white">
                    !
                  </div>

                  <div>

                    <h3 className="text-[14px] font-black text-slate-950">
                      لا تطارد الاختراق بعد حركة كبيرة
                    </h3>

                    <p className="mt-1 text-justify text-[12px] leading-6 text-slate-600">
                      الدخول بعد امتداد سعري قوي قد يعني أن وقف الخسارة أصبح
                      بعيدًا وأن نسبة العائد إلى المخاطرة لم تعد مناسبة. في
                      كثير من الحالات يكون انتظار إعادة الاختبار أكثر منطقية.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


                   {/* =================================================
              08 — PULLBACK & RETEST
          ================================================= */}

          <section
            id="pullback-retest"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* =================================================
                HEADER
            ================================================= */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                08 — العودة إلى المنطقة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Pullback وRetest: كيف تدخل بعد التصحيح؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                بدل الدخول بعد حركة ممتدة، ينتظر بعض متداولي البرايس أكشن
                عودة السعر إلى مستوى أو منطقة لها معنى، ثم يراقبون رد فعل
                السعر لمعرفة ما إذا كان الاتجاه الأصلي قادرًا على الاستمرار.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* =================================================
                  MAIN EXPLANATION + VISUAL
              ================================================= */}
              <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">

                {/* =================================================
                    EXPLANATION
                ================================================= */}
                <div className="rounded-[20px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[9px] font-black text-brand-600">
                    مثال على اتجاه صاعد
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
                    كيف يعمل Pullback داخل اتجاه صاعد؟
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    الفكرة ليست شراء السعر بمجرد أن يتراجع. أولًا يجب أن يكون
                    الاتجاه مفهومًا، ثم ننتظر عودة السعر إلى منطقة منطقية
                    ونراقب هل يظهر رفض للهبوط أو عودة للزخم الصاعد.
                  </p>


                  <div className="mt-4 space-y-2">

                    {[
                      {
                        no: "01",
                        title: "اتجاه صاعد",
                        text: "السوق يكوّن قممًا وقيعانًا أعلى.",
                      },
                      {
                        no: "02",
                        title: "اختراق مستوى",
                        text: "السعر يتجاوز مقاومة أو قمة محلية واضحة.",
                      },
                      {
                        no: "03",
                        title: "عودة السعر",
                        text: "يعود السعر إلى المنطقة بدل الاستمرار مباشرة.",
                      },
                      {
                        no: "04",
                        title: "رد فعل",
                        text: "يظهر رفض للهبوط أو عودة للزخم الصاعد.",
                      },
                      {
                        no: "05",
                        title: "الدخول بعد التأكيد",
                        text: "يتم تقييم الصفقة بعد ظهور التأكيد وليس أثناء الهبوط.",
                      },
                    ].map((item) => (
                      <div
                        key={item.no}
                        className="flex items-start gap-3 rounded-[13px] bg-slate-50/70 px-3 py-2.5"
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                          {item.no}
                        </div>

                        <div className="min-w-0">

                          <h4 className="text-[12px] font-black text-slate-900">
                            {item.title}
                          </h4>

                          <p className="mt-0.5 text-[10px] leading-5 text-slate-500 md:text-[11px]">
                            {item.text}
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>


                  <div className="mt-4 rounded-[14px] border border-brand-100 bg-brand-50/50 p-3">

                    <h4 className="text-[12px] font-black text-slate-900">
                      ما الذي يلغي الفكرة؟
                    </h4>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      إذا كسر السعر المنطقة بوضوح وبدأ في تكوين هيكل هابط،
                      فالتراجع لم يعد مجرد Pullback وقد يكون السيناريو قد تغير.
                    </p>

                  </div>

                </div>


                {/* =================================================
    VISUAL CHART — PULLBACK / RETEST
================================================= */}
<div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

  {/* CHART HEADER */}
  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">

    <div>

      <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
        مثال بصري: اختراق ثم إعادة اختبار
      </h3>

      <p className="mt-0.5 text-[10px] text-slate-500">
        الاتجاه ← الاختراق ← العودة ← التأكيد ← الاستمرار
      </p>

    </div>

    <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[8px] font-black text-brand-600">
      Retest
    </span>

  </div>


  {/* =================================================
      DESKTOP CHART
  ================================================= */}
  <div className="hidden md:block">

    <svg
      viewBox="0 0 820 430"
      className="block w-full"
      role="img"
      aria-label="مثال توضيحي لاختراق مقاومة ثم إعادة اختبار في استراتيجية البرايس أكشن"
    >
      <rect width="820" height="430" fill="#ffffff" />


      {[75, 145, 215, 285, 355].map((y) => (
        <line
          key={`pullback-desktop-${y}`}
          x1="45"
          y1={y}
          x2="775"
          y2={y}
          stroke="#eef2f7"
          strokeWidth="1"
        />
      ))}


      {/* OLD RESISTANCE / NEW SUPPORT */}
      <rect
        x="65"
        y="247"
        width="545"
        height="44"
        rx="10"
        fill="#eef5fd"
        stroke="#93c5fd"
      />

      <text
        x="170"
        y="273"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#1e5bb8"
      >
        مقاومة سابقة
      </text>


      {/* PRICE */}
      <polyline
        points="
          65,350
          135,310
          205,325
          275,265
          335,285
          400,220
          465,245
          525,170
          585,118
          640,182
          680,255
          720,205
          770,118
        "
        fill="none"
        stroke="#0f172a"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />


      {/* BREAKOUT */}
      <circle
        cx="525"
        cy="170"
        r="9"
        fill="#eff6ff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <text
        x="525"
        y="143"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill="#1d4ed8"
      >
        اختراق
      </text>


      {/* RETEST */}
      <circle
        cx="680"
        cy="255"
        r="10"
        fill="#fff7ed"
        stroke="#f59e0b"
        strokeWidth="4"
      />

      <text
        x="680"
        y="287"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill="#b45309"
      >
        إعادة اختبار
      </text>


      {/* CONFIRMATION */}
      <circle
        cx="720"
        cy="205"
        r="9"
        fill="#dcfce7"
        stroke="#16a34a"
        strokeWidth="3"
      />

      <text
        x="720"
        y="181"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#15803d"
      >
        تأكيد
      </text>


      {/* ENTRY */}
      <line
        x1="745"
        y1="280"
        x2="745"
        y2="203"
        stroke="#16a34a"
        strokeWidth="3.5"
      />

      <polygon
        points="745,190 737,208 753,208"
        fill="#16a34a"
      />

      <text
        x="760"
        y="235"
        fontSize="12"
        fontWeight="900"
        fill="#15803d"
      >
        دخول
      </text>


      {/* STOP */}
      <line
        x1="630"
        y1="312"
        x2="750"
        y2="312"
        stroke="#ef4444"
        strokeWidth="2.5"
      />

      <text
        x="690"
        y="335"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#dc2626"
      >
        إلغاء الفكرة
      </text>


      {/* CONTINUATION */}
      <line
        x1="720"
        y1="145"
        x2="770"
        y2="112"
        stroke="#16a34a"
        strokeWidth="3"
      />

      <text
        x="700"
        y="92"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#15803d"
      >
        استمرار الاتجاه
      </text>


      {/* SUMMARY */}
      <rect
        x="150"
        y="375"
        width="520"
        height="34"
        rx="17"
        fill="#f8fafc"
        stroke="#e2e8f0"
      />

      <text
        x="410"
        y="397"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="#475569"
      >
        لا تدخل أثناء التراجع — انتظر أن يثبت السعر المنطقة أولًا
      </text>

    </svg>

  </div>


  {/* =================================================
      MOBILE PREVIEW — CLICKABLE
  ================================================= */}
  <div className="md:hidden">

    <a
      href="#pullback-chart-fullscreen"
      className="group block cursor-zoom-in"
      aria-label="تكبير رسم الاختراق وإعادة الاختبار"
    >

      <svg
        viewBox="0 0 360 310"
        className="block w-full"
        role="img"
        aria-label="مثال مبسط لإعادة الاختبار على الهاتف"
      >
        <rect width="360" height="310" fill="#ffffff" />


        {[55, 110, 165, 220].map((y) => (
          <line
            key={`pullback-mobile-${y}`}
            x1="20"
            y1={y}
            x2="340"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <rect
          x="30"
          y="185"
          width="245"
          height="32"
          rx="8"
          fill="#eef5fd"
          stroke="#93c5fd"
        />


        <polyline
          points="
            20,245
            60,215
            95,230
            135,180
            175,198
            215,145
            250,105
            285,195
            315,160
            340,95
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle
          cx="250"
          cy="105"
          r="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        <text
          x="250"
          y="87"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#1d4ed8"
        >
          اختراق
        </text>


        <circle
          cx="285"
          cy="195"
          r="7"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        <text
          x="285"
          y="220"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#b45309"
        >
          إعادة اختبار
        </text>


        <circle
          cx="315"
          cy="160"
          r="6"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="2.5"
        />

        <text
          x="315"
          y="145"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#15803d"
        >
          تأكيد
        </text>


        <rect
          x="55"
          y="260"
          width="250"
          height="30"
          rx="15"
          fill="#0f172a"
        />

        <text
          x="180"
          y="279"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#ffffff"
        >
          اختراق ← عودة ← تأكيد ← استمرار
        </text>

      </svg>


      {/* ZOOM */}
      <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">

          <span>
            تكبير الرسم
          </span>

          <span className="text-[14px]">
            ↗
          </span>

        </div>

      </div>

    </a>

  </div>


  {/* EXPLANATION */}
  <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3">

    <p className="text-justify text-[11px] leading-5 text-slate-600 md:text-[12px] md:leading-6">
      <strong className="font-black text-slate-900">
        كيف تقرأ الرسم؟
      </strong>{" "}
      المقاومة يتم اختراقها أولًا، ثم يعود السعر إليها. الفكرة لا تعتمد
      على مجرد لمس المنطقة، بل على ظهور رد فعل يؤكد أن المشترين ما زالوا
      يدافعون عنها.
    </p>

  </div>


  {/* =================================================
      FULLSCREEN LIGHTBOX
  ================================================= */}
  <div
    id="pullback-chart-fullscreen"
    className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
  >

    <a
      href="#pullback-retest"
      className="absolute inset-0"
      aria-label="إغلاق الرسم"
    />


    <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

        <div>

          <div className="text-[14px] font-black text-slate-950">
            اختراق ثم إعادة اختبار
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            راقب الاختراق ثم عودة السعر والتأكيد
          </div>

        </div>


        <a
          href="#pullback-retest"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
          aria-label="إغلاق"
        >
          ×
        </a>

      </div>


      <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">

        <span className="text-[16px]">
          ↔
        </span>

        <span>
          حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل
        </span>

      </div>


      <div
        dir="ltr"
        className="overflow-x-auto overflow-y-auto bg-white"
      >

        <svg
          viewBox="0 0 820 430"
          className="block min-w-[900px] w-full"
          role="img"
          aria-label="الرسم الكامل للاختراق وإعادة الاختبار"
        >
          <rect width="820" height="430" fill="#ffffff" />


          {[75, 145, 215, 285, 355].map((y) => (
            <line
              key={`pullback-full-${y}`}
              x1="45"
              y1={y}
              x2="775"
              y2={y}
              stroke="#eef2f7"
              strokeWidth="1"
            />
          ))}


          <rect
            x="65"
            y="247"
            width="545"
            height="44"
            rx="10"
            fill="#eef5fd"
            stroke="#93c5fd"
          />

          <text
            x="170"
            y="273"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#1e5bb8"
          >
            مقاومة سابقة
          </text>


          <polyline
            points="
              65,350
              135,310
              205,325
              275,265
              335,285
              400,220
              465,245
              525,170
              585,118
              640,182
              680,255
              720,205
              770,118
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          <circle
            cx="525"
            cy="170"
            r="9"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="3"
          />

          <text
            x="525"
            y="143"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#1d4ed8"
          >
            اختراق
          </text>


          <circle
            cx="680"
            cy="255"
            r="10"
            fill="#fff7ed"
            stroke="#f59e0b"
            strokeWidth="4"
          />

          <text
            x="680"
            y="287"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#b45309"
          >
            إعادة اختبار
          </text>


          <circle
            cx="720"
            cy="205"
            r="9"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="3"
          />

          <text
            x="720"
            y="181"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#15803d"
          >
            تأكيد
          </text>


          <line
            x1="745"
            y1="280"
            x2="745"
            y2="203"
            stroke="#16a34a"
            strokeWidth="3.5"
          />

          <polygon
            points="745,190 737,208 753,208"
            fill="#16a34a"
          />

          <text
            x="760"
            y="235"
            fontSize="12"
            fontWeight="900"
            fill="#15803d"
          >
            دخول
          </text>


          <line
            x1="630"
            y1="312"
            x2="750"
            y2="312"
            stroke="#ef4444"
            strokeWidth="2.5"
          />

          <text
            x="690"
            y="335"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#dc2626"
          >
            إلغاء الفكرة
          </text>


          <text
            x="700"
            y="92"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#15803d"
          >
            استمرار الاتجاه
          </text>


          <rect
            x="150"
            y="375"
            width="520"
            height="34"
            rx="17"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="410"
            y="397"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#475569"
          >
            لا تدخل أثناء التراجع — انتظر أن يثبت السعر المنطقة أولًا
          </text>

        </svg>

      </div>

    </div>

  </div>

</div>
</div>


              {/* =================================================
                  THREE CONDITIONS
              ================================================= */}
              <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                {[
                  {
                    no: "01",
                    label: "السياق",
                    title: "اتجاه واضح",
                    text: "التصحيح يجب أن يحدث داخل حركة مفهومة.",
                  },
                  {
                    no: "02",
                    label: "المكان",
                    title: "منطقة ذات معنى",
                    text: "العودة تكون إلى دعم أو مقاومة أو مستوى واضح.",
                  },
                  {
                    no: "03",
                    label: "التأكيد",
                    title: "رد فعل حقيقي",
                    text: "لا تعتمد على مجرد لمس المنطقة.",
                  },
                ].map((item) => (
                  <div
                    key={item.no}
                    className="flex items-center gap-3 rounded-[15px] border border-slate-200 bg-slate-50/60 p-3"
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[9px] font-black text-white">
                      {item.no}
                    </div>

                    <div className="min-w-0">

                      <div className="text-[8px] font-black text-brand-600">
                        {item.label}
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-slate-950">
                        {item.title}
                      </div>

                      <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                        {item.text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>


              {/* IMPORTANT */}
              <div className="mt-4">

                <ImportantBox title="Pullback ليس انعكاسًا بالضرورة">
                  التراجع داخل اتجاه صاعد قد يكون مجرد تصحيح مؤقت. لكن إذا
                  بدأ السعر بكسر القيعان المهمة وتكوين قمم وقيعان أدنى، فإن
                  هيكل السوق نفسه قد يكون بدأ يتغير، وعندها يجب إعادة تقييم
                  السيناريو بدل افتراض استمرار الاتجاه.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              09 — COMPLETE TRADE EXAMPLE
          ================================================= */}

          <section
            id="complete-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* =================================================
                HEADER
            ================================================= */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — مثال تطبيقي
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مثال كامل على صفقة برايس أكشن خطوة بخطوة
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                الآن نجمع العناصر السابقة في سيناريو واحد: اتجاه واضح،
                مقاومة مهمة، اختراق، إعادة اختبار، تأكيد سعري، ثم تحديد
                الدخول ووقف الخسارة والهدف قبل تنفيذ الصفقة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* =================================================
                  STEPS
              ================================================= */}

              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  {
                    no: "01",
                    title: "حدد الاتجاه",
                    text: "هيكل السوق صاعد.",
                  },
                  {
                    no: "02",
                    title: "حدد المقاومة",
                    text: "منطقة أوقفت السعر سابقًا.",
                  },
                  {
                    no: "03",
                    title: "انتظر الاختراق",
                    text: "إغلاق واضح فوق المنطقة.",
                  },
                  {
                    no: "04",
                    title: "راقب العودة",
                    text: "السعر يعيد اختبار المستوى.",
                  },
                  {
                    no: "05",
                    title: "انتظر التأكيد",
                    text: "رد فعل صاعد بعد العودة.",
                  },
                  {
                    no: "06",
                    title: "خطط للصفقة",
                    text: "دخول ووقف وهدف.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[11px] font-black leading-5 text-slate-950 lg:text-[12px]">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-1.5 text-[9px] leading-5 text-slate-500 lg:text-[10px]">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "حدد الاتجاه", "هيكل صاعد."],
                  ["02", "حدد المقاومة", "منطقة واضحة."],
                  ["03", "انتظر الاختراق", "إغلاق فوق المنطقة."],
                  ["04", "راقب العودة", "إعادة اختبار."],
                  ["05", "انتظر التأكيد", "عودة المشترين."],
                  ["06", "خطط للصفقة", "دخول ووقف وهدف."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 5 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </div>

                    <div className="min-w-0">

                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>


              {/* =================================================
                  COMPLETE VISUAL + TRADE LOGIC
              ================================================= */}
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">

                {/* =================================================
    FULL VISUAL CHART — EXPANDABLE ON MOBILE
================================================= */}
<div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

  {/* HEADER */}
  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">

    <div>

      <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
        الرسم الكامل للسيناريو
      </h3>

      <p className="mt-0.5 text-[10px] text-slate-500">
        اتجاه ← مقاومة ← اختراق ← Retest ← دخول ← هدف
      </p>

    </div>

    <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[8px] font-black text-white">
      مثال تعليمي
    </span>

  </div>


  {/* =================================================
      DESKTOP
  ================================================= */}
  <div className="hidden md:block">

    <svg
      viewBox="0 0 900 500"
      className="block w-full"
      role="img"
      aria-label="مثال كامل على صفقة برايس أكشن من الاتجاه والاختراق إلى الدخول والهدف"
    >
      <rect width="900" height="500" fill="#ffffff" />


      {[85, 165, 245, 325, 405].map((y) => (
        <line
          key={`example-desktop-${y}`}
          x1="55"
          y1={y}
          x2="845"
          y2={y}
          stroke="#eef2f7"
        />
      ))}


      {/* RESISTANCE */}
      <rect
        x="70"
        y="235"
        width="520"
        height="42"
        rx="10"
        fill="#fff1f2"
        stroke="#fecdd3"
      />

      <rect
        x="90"
        y="243"
        width="110"
        height="26"
        rx="13"
        fill="#ffffff"
        stroke="#fecdd3"
      />

      <text
        x="145"
        y="256"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="900"
        fill="#be123c"
      >
        مقاومة سابقة
      </text>


      {/* PRICE */}
      <polyline
        points="
          70,390
          135,345
          195,360
          265,300
          325,325
          390,260
          450,285
          515,215
          575,155
          630,195
          680,258
          730,205
          790,135
          840,92
        "
        fill="none"
        stroke="#0f172a"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />


      {/* BREAKOUT */}
      <circle
        cx="515"
        cy="215"
        r="9"
        fill="#eff6ff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <text
        x="515"
        y="188"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#1d4ed8"
      >
        اختراق
      </text>


      {/* RETEST */}
      <circle
        cx="680"
        cy="258"
        r="10"
        fill="#fff7ed"
        stroke="#f59e0b"
        strokeWidth="4"
      />

      <text
        x="680"
        y="290"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#b45309"
      >
        إعادة اختبار
      </text>


      {/* CONFIRMATION */}
      <circle
        cx="730"
        cy="205"
        r="9"
        fill="#dbeafe"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <text
        x="730"
        y="181"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#1d4ed8"
      >
        تأكيد
      </text>


      {/* ENTRY */}
      <line
        x1="758"
        y1="300"
        x2="758"
        y2="205"
        stroke="#16a34a"
        strokeWidth="4"
      />

      <polygon
        points="758,192 750,210 766,210"
        fill="#16a34a"
      />

      <text
        x="780"
        y="245"
        fontSize="12"
        fontWeight="900"
        fill="#15803d"
      >
        دخول
      </text>


      {/* STOP */}
      <line
        x1="650"
        y1="330"
        x2="800"
        y2="330"
        stroke="#ef4444"
        strokeWidth="2.5"
      />

      <text
        x="725"
        y="352"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#dc2626"
      >
        وقف الخسارة
      </text>


      {/* TARGET */}
      <line
        x1="755"
        y1="105"
        x2="840"
        y2="105"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeDasharray="8 6"
      />

      <text
        x="795"
        y="83"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#15803d"
      >
        الهدف
      </text>


      {/* SUMMARY */}
      <rect
        x="145"
        y="425"
        width="610"
        height="38"
        rx="19"
        fill="#f8fafc"
        stroke="#e2e8f0"
      />

      <text
        x="450"
        y="449"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="#475569"
      >
        لا يوجد دخول قبل اكتمال السياق + المنطقة + التأكيد + إدارة المخاطر
      </text>

    </svg>

  </div>


  {/* =================================================
      MOBILE PREVIEW
  ================================================= */}
  <div className="md:hidden">

    <a
      href="#complete-example-chart-fullscreen"
      className="group block cursor-zoom-in"
      aria-label="تكبير مثال صفقة البرايس أكشن"
    >

      <svg
        viewBox="0 0 360 330"
        className="block w-full"
        role="img"
        aria-label="مثال مبسط لصفقة برايس أكشن على الهاتف"
      >
        <rect width="360" height="330" fill="#ffffff" />


        {[55, 110, 165, 220, 275].map((y) => (
          <line
            key={`trade-mobile-${y}`}
            x1="20"
            y1={y}
            x2="340"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <rect
          x="28"
          y="190"
          width="230"
          height="30"
          rx="8"
          fill="#fff1f2"
          stroke="#fecdd3"
        />


        <polyline
          points="
            20,260
            60,225
            100,245
            140,200
            180,215
            220,165
            255,125
            285,200
            310,165
            340,90
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle
          cx="220"
          cy="165"
          r="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        <text
          x="220"
          y="148"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#1d4ed8"
        >
          اختراق
        </text>


        <circle
          cx="285"
          cy="200"
          r="7"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        <text
          x="285"
          y="223"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#b45309"
        >
          Retest
        </text>


        <circle
          cx="310"
          cy="165"
          r="6"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="2.5"
        />


        <line
          x1="278"
          y1="240"
          x2="335"
          y2="240"
          stroke="#ef4444"
          strokeWidth="2"
        />

        <text
          x="306"
          y="256"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#dc2626"
        >
          وقف
        </text>


        <rect
          x="45"
          y="285"
          width="270"
          height="28"
          rx="14"
          fill="#0f172a"
        />

        <text
          x="180"
          y="303"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          اتجاه ← اختراق ← عودة ← تأكيد ← دخول
        </text>

      </svg>


      <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">

          <span>
            تكبير الرسم
          </span>

          <span className="text-[14px]">
            ↗
          </span>

        </div>

      </div>

    </a>

  </div>


  {/* =================================================
      FULLSCREEN
  ================================================= */}
  <div
    id="complete-example-chart-fullscreen"
    className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
  >

    <a
      href="#complete-example"
      className="absolute inset-0"
      aria-label="إغلاق الرسم"
    />


    <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

        <div>

          <div className="text-[14px] font-black text-slate-950">
            المثال الكامل لصفقة البرايس أكشن
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            اتجاه ← مقاومة ← اختراق ← إعادة اختبار ← دخول ← هدف
          </div>

        </div>


        <a
          href="#complete-example"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
          aria-label="إغلاق"
        >
          ×
        </a>

      </div>


      <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">

        <span className="text-[16px]">
          ↔
        </span>

        <span>
          حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل
        </span>

      </div>


      <div
        dir="ltr"
        className="overflow-x-auto overflow-y-auto bg-white"
      >

        <svg
          viewBox="0 0 900 500"
          className="block min-w-[980px] w-full"
          role="img"
          aria-label="الرسم الكامل لصفقة البرايس أكشن"
        >
          <rect width="900" height="500" fill="#ffffff" />


          {[85, 165, 245, 325, 405].map((y) => (
            <line
              key={`trade-full-${y}`}
              x1="55"
              y1={y}
              x2="845"
              y2={y}
              stroke="#eef2f7"
            />
          ))}


          <rect
            x="70"
            y="235"
            width="520"
            height="42"
            rx="10"
            fill="#fff1f2"
            stroke="#fecdd3"
          />

          <rect
            x="90"
            y="243"
            width="110"
            height="26"
            rx="13"
            fill="#ffffff"
            stroke="#fecdd3"
          />

          <text
            x="145"
            y="256"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="900"
            fill="#be123c"
          >
            مقاومة سابقة
          </text>


          <polyline
            points="
              70,390
              135,345
              195,360
              265,300
              325,325
              390,260
              450,285
              515,215
              575,155
              630,195
              680,258
              730,205
              790,135
              840,92
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          <circle
            cx="515"
            cy="215"
            r="9"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="3"
          />

          <text
            x="515"
            y="188"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#1d4ed8"
          >
            اختراق
          </text>


          <circle
            cx="680"
            cy="258"
            r="10"
            fill="#fff7ed"
            stroke="#f59e0b"
            strokeWidth="4"
          />

          <text
            x="680"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#b45309"
          >
            إعادة اختبار
          </text>


          <circle
            cx="730"
            cy="205"
            r="9"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="3"
          />

          <text
            x="730"
            y="181"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#1d4ed8"
          >
            تأكيد
          </text>


          <line
            x1="758"
            y1="300"
            x2="758"
            y2="205"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <polygon
            points="758,192 750,210 766,210"
            fill="#16a34a"
          />

          <text
            x="780"
            y="245"
            fontSize="12"
            fontWeight="900"
            fill="#15803d"
          >
            دخول
          </text>


          <line
            x1="650"
            y1="330"
            x2="800"
            y2="330"
            stroke="#ef4444"
            strokeWidth="2.5"
          />

          <text
            x="725"
            y="352"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#dc2626"
          >
            وقف الخسارة
          </text>


          <line
            x1="755"
            y1="105"
            x2="840"
            y2="105"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          <text
            x="795"
            y="83"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#15803d"
          >
            الهدف
          </text>


          <rect
            x="145"
            y="425"
            width="610"
            height="38"
            rx="19"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="450"
            y="449"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#475569"
          >
            لا يوجد دخول قبل اكتمال السياق + المنطقة + التأكيد + إدارة المخاطر
          </text>

        </svg>

      </div>

    </div>

  </div>

</div>


                {/* =================================================
                    TRADE LOGIC
                ================================================= */}
                <aside className="rounded-[20px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black text-brand-600">
                    منطق السيناريو
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    لماذا أصبحت الفكرة قابلة للدراسة؟
                  </h3>

                  <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
                    لأن القرار لم يعتمد على شمعة أو اختراق منفرد، بل اجتمعت
                    عدة عناصر تدعم نفس السيناريو.
                  </p>


                  <div className="mt-4 space-y-2">

                    {[
                      ["السياق", "اتجاه صاعد"],
                      ["المنطقة", "مقاومة سابقة"],
                      ["الحدث", "اختراق واضح"],
                      ["العودة", "إعادة اختبار"],
                      ["التأكيد", "عودة الزخم الصاعد"],
                      ["إلغاء الفكرة", "كسر المنطقة لأسفل"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[11px] border border-brand-100/70 bg-white px-3 py-2.5"
                      >

                        <span className="text-[10px] text-slate-500">
                          {label}
                        </span>

                        <span className="text-[11px] font-black text-slate-800">
                          {value}
                        </span>

                      </div>
                    ))}

                  </div>


                  <div className="mt-4 rounded-[14px] border border-emerald-100 bg-emerald-50/60 p-3">

                    <div className="text-[10px] font-black text-emerald-700">
                      الفكرة الأساسية
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      كل عنصر يضيف معلومة جديدة. كلما كان السيناريو واضحًا
                      قبل الدخول، أصبح من الأسهل أيضًا معرفة متى تكون الفكرة
                      خاطئة والخروج منها.
                    </p>

                  </div>

                </aside>

              </div>


              {/* =================================================
                  ENTRY / STOP / TARGET
              ================================================= */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">

                <div className="rounded-[14px] border border-brand-100 bg-brand-50/40 px-3 py-3 text-center">

                  <div className="text-[8px] font-black text-brand-600 md:text-[9px]">
                    الدخول
                  </div>

                  <div className="mt-1 text-[11px] font-black text-slate-950 md:text-[13px]">
                    بعد التأكيد
                  </div>

                </div>


                <div className="rounded-[14px] border border-rose-100 bg-rose-50/40 px-3 py-3 text-center">

                  <div className="text-[8px] font-black text-rose-600 md:text-[9px]">
                    وقف الخسارة
                  </div>

                  <div className="mt-1 text-[11px] font-black text-slate-950 md:text-[13px]">
                    خلف إلغاء الفكرة
                  </div>

                </div>


                <div className="rounded-[14px] border border-emerald-100 bg-emerald-50/40 px-3 py-3 text-center">

                  <div className="text-[8px] font-black text-emerald-700 md:text-[9px]">
                    الهدف
                  </div>

                  <div className="mt-1 text-[11px] font-black text-slate-950 md:text-[13px]">
                    مستوى منطقي
                  </div>

                </div>

              </div>


              {/* IMPORTANT */}
              <div className="mt-4">

                <ImportantBox title="لا تدخل لأنك رأيت اختراقًا فقط">
                  المثال لا يعتمد على عنصر واحد. الاتجاه والمستوى والاختراق
                  وإعادة الاختبار ورد الفعل كلها أجزاء مترابطة من السيناريو.
                  إذا غاب السياق أو فشل إعادة الاختبار، يجب إعادة تقييم الفكرة
                  بدل تنفيذها تلقائيًا.
                </ImportantBox>

              </div>

            </div>

          </section>

                    {/* =================================================
              10 — BEST TIMEFRAMES
          ================================================= */}

          <section
            id="timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                10 — الأطر الزمنية
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما أفضل إطار زمني لاستراتيجية البرايس أكشن؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا يوجد إطار زمني واحد يعتبر الأفضل للجميع. اختيار الإطار
                يعتمد على أسلوب التداول ومدة الصفقة، لكن الإطارات الأكبر
                تساعد غالبًا على رؤية هيكل السوق والمستويات بصورة أوضح،
                بينما يمكن استخدام إطار أصغر لتحسين توقيت الدخول.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    label: "سكالبينج",
                    timeframe: "1m – 5m",
                    text: "حركة سريعة وضوضاء أعلى وتتطلب تنفيذًا دقيقًا.",
                  },
                  {
                    label: "تداول يومي",
                    timeframe: "15m – 1H",
                    text: "توازن جيد بين التفاصيل ووضوح هيكل السوق.",
                  },
                  {
                    label: "Swing Trading",
                    timeframe: "4H",
                    text: "مناسب لقراءة الاتجاهات والمستويات الأوسع.",
                  },
                  {
                    label: "تحليل طويل",
                    timeframe: "Daily",
                    text: "مفيد لفهم الاتجاه والسياق العام للسوق.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/60 p-4"
                  >

                    <div className="text-[9px] font-black text-brand-600">
                      {item.label}
                    </div>

                    <div
                      dir="ltr"
                      className="mt-1 text-right text-[17px] font-black text-slate-950"
                    >
                      {item.timeframe}
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  نموذج بسيط لاستخدام أكثر من إطار زمني
                </h3>

                <div className="mt-3 grid gap-2 md:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "4 ساعات أو يومي",
                      text: "حدد الاتجاه والمستويات الرئيسية.",
                    },
                    {
                      no: "02",
                      title: "ساعة أو 15 دقيقة",
                      text: "حدد منطقة الفرصة بصورة أدق.",
                    },
                    {
                      no: "03",
                      title: "إطار أصغر",
                      text: "راقب سلوك السعر لتحسين الدخول.",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="flex items-center gap-3 rounded-[12px] bg-slate-50 px-3 py-2.5"
                    >

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <div>
                        <div className="text-[12px] font-black text-slate-950">
                          {item.title}
                        </div>

                        <div className="mt-0.5 text-[10px] text-slate-500">
                          {item.text}
                        </div>
                      </div>

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="لا تجعل الإطار الأصغر يغير السيناريو الأكبر">
                  الانتقال إلى إطار صغير قد يظهر عشرات الحركات القصيرة، لكن
                  هذا لا يعني تجاهل اتجاه وهيكل السوق على الإطار الأكبر.
                  استخدم كل إطار لغرض واضح ضمن الخطة.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              11 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black text-orange-700">
                11 — إدارة المخاطر
              </span>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                إدارة المخاطر في البرايس أكشن: وقف الخسارة وحجم الصفقة
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                قوة التحليل لا تلغي احتمال فشل الصفقة. حتى السيناريو الذي
                يجمع اتجاهًا واضحًا ومستوى قويًا ونموذجًا سعريًا مناسبًا
                يمكن أن يفشل، لذلك يجب تحديد وقف الخسارة ومبلغ المخاطرة
                قبل الدخول.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* QUICK RULES */}
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">

                {[
                  {
                    label: "المخاطرة",
                    value: "محددة مسبقًا",
                    text: "اعرف المبلغ قبل الدخول.",
                  },
                  {
                    label: "وقف الخسارة",
                    value: "خلف إلغاء الفكرة",
                    text: "ليس في مكان عشوائي.",
                  },
                  {
                    label: "حجم الصفقة",
                    value: "حسب الوقف",
                    text: "يتغير مع مسافة وقف الخسارة.",
                  },
                  {
                    label: "العائد",
                    value: "مخطط",
                    text: "حدد الهدف قبل التنفيذ.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4"
                  >

                    <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[14px] font-black leading-6 text-slate-950 md:text-[16px]">
                      {item.value}
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500 md:text-[11px]">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* EXAMPLE */}
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <span className="text-[9px] font-black text-brand-600">
                    مثال تعليمي
                  </span>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
                    وقف الخسارة يجب أن يرتبط بالسيناريو
                  </h3>

                  <p className="mt-2.5 text-justify text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
                    إذا كانت فكرة الشراء تعتمد على نجاح إعادة اختبار دعم
                    جديد، فإن كسر المنطقة بوضوح قد يعني أن السيناريو لم يعد
                    صالحًا. لذلك يمكن استخدام المنطقة نفسها لتحديد مكان
                    منطقي لإلغاء الفكرة.
                  </p>

                  <div className="mt-3 rounded-[14px] border border-brand-100 bg-white px-3 py-3">

                    <div className="grid grid-cols-3 gap-2 text-center">

                      <div>
                        <div className="text-[9px] font-black text-slate-500">
                          ENTRY
                        </div>

                        <div className="mt-1 text-[12px] font-black text-slate-950">
                          بعد التأكيد
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] font-black text-rose-600">
                          STOP
                        </div>

                        <div className="mt-1 text-[12px] font-black text-slate-950">
                          أسفل المنطقة
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] font-black text-green-600">
                          TARGET
                        </div>

                        <div className="mt-1 text-[12px] font-black text-slate-950">
                          مستوى منطقي
                        </div>
                      </div>

                    </div>

                  </div>

                </div>


                {/* CALCULATOR */}
                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[16px] font-black text-brand-600">
                      ∑
                    </div>

                    <div>

                      <h3 className="text-[17px] font-black text-slate-950 md:text-[19px]">
                        احسب حجم المخاطرة قبل الصفقة
                      </h3>

                      <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                        بعد تحديد مكان وقف الخسارة، استخدم حاسبة المخاطر
                        لمعرفة حجم الصفقة المناسب للمبلغ الذي تريد المخاطرة به.
                      </p>

                    </div>

                  </div>


                  <Link
                    href="/tools/risk-calculator"
                    className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700"
                  >
                    فتح حاسبة المخاطر
                    <span className="mr-2">←</span>
                  </Link>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-rose-600 text-[13px] font-black text-white">
                    !
                  </div>

                  <div>

                    <h3 className="text-[15px] font-black text-slate-950">
                      لا توسّع وقف الخسارة لأن الصفقة بدأت تخسر
                    </h3>

                    <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
                      إذا وصل السعر إلى المستوى الذي يلغي السيناريو، فإن
                      تحريك الوقف بعيدًا فقط لتجنب الخسارة يغيّر الخطة
                      الأصلية ويزيد المخاطرة بعد الدخول.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              12 — PROS / CONS / MISTAKES
          ================================================= */}

          <section
            id="pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                12 — التقييم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مميزات وعيوب استراتيجية البرايس أكشن
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                البرايس أكشن يمنح المتداول طريقة مباشرة لقراءة السوق، لكنه
                يحتاج إلى تدريب وخبرة في تفسير السياق والمستويات. كما أن
                جزءًا من التحليل قد يكون تقديريًا ويختلف من متداول لآخر.
              </p>

            </div>


            <div className="grid md:grid-cols-2">

              {/* PROS */}
              <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-l md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-50 text-[14px] font-black text-green-700">
                    ✓
                  </div>

                  <div>

                    <div className="text-[9px] font-black text-green-700">
                      نقاط القوة
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      مميزات البرايس أكشن
                    </h3>

                  </div>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-green-100">

                  {[
                    "يعتمد بصورة مباشرة على حركة السعر وهيكل السوق.",
                    "يمكن تطبيقه بدون الحاجة إلى عدد كبير من المؤشرات.",
                    "يصلح لأطر زمنية وأسواق مختلفة حسب خطة المتداول.",
                    "يساعد على التفكير في السياق والمستوى قبل البحث عن الدخول.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3 ? "border-b border-green-100/70" : ""
                      }`}
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-[11px] font-black text-green-700">
                        ✓
                      </div>

                      <p className="text-[12px] leading-6 text-slate-700 md:text-[13px] md:leading-7">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              {/* CONS */}
              <div className="p-4 md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-rose-50 text-[14px] font-black text-rose-700">
                    ×
                  </div>

                  <div>

                    <div className="text-[9px] font-black text-rose-700">
                      نقاط يجب الانتباه لها
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      عيوب وتحديات البرايس أكشن
                    </h3>

                  </div>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-rose-100">

                  {[
                    "تفسير بعض المستويات والنماذج قد يختلف من متداول إلى آخر.",
                    "يحتاج إلى وقت لتطوير القدرة على قراءة السياق بشكل جيد.",
                    "يمكن أن يؤدي الإفراط في رسم المستويات والنماذج إلى تحليل زائد.",
                    "لا توجد إشارة برايس أكشن تضمن نجاح الصفقة.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3 ? "border-b border-rose-100/70" : ""
                      }`}
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[11px] font-black text-rose-700">
                        ×
                      </div>

                      <p className="text-[12px] leading-6 text-slate-700 md:text-[13px] md:leading-7">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>


            {/* COMMON MISTAKES */}
            <div className="border-t border-slate-200 bg-slate-50/50 p-4 md:p-6">

              <h3 className="text-[16px] font-black text-slate-950 md:text-[18px]">
                6 أخطاء شائعة في تداول البرايس أكشن
              </h3>

              <div className="mt-3 grid gap-2 md:grid-cols-3 lg:grid-cols-6">

                {[
                  ["01", "تجاهل الاتجاه"],
                  ["02", "رسم مستويات كثيرة"],
                  ["03", "شراء كل Pin Bar"],
                  ["04", "مطاردة الاختراق"],
                  ["05", "الدخول بلا تأكيد"],
                  ["06", "إهمال المخاطر"],
                ].map(([no, title]) => (
                  <div
                    key={no}
                    className="flex items-center gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2.5 md:block"
                  >

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-slate-900 text-[9px] font-black text-white">
                      {no}
                    </div>

                    <div className="text-[11px] font-black text-slate-700 md:mt-2">
                      {title}
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              BEGINNER ROADMAP
          ================================================= */}

          <section
            id="beginner-roadmap"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                خطة تعلم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تتعلم البرايس أكشن كمبتدئ بدون تعقيد؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا تبدأ بحفظ عشرات نماذج الشموع. الأفضل بناء الفهم بالترتيب:
                هيكل السوق أولًا، ثم المستويات، وبعدها سلوك السعر عند هذه
                المناطق، وأخيرًا إدارة الدخول والمخاطر.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "هيكل السوق",
                    text: "تعلم قراءة القمم والقيعان والاتجاه.",
                  },
                  {
                    no: "02",
                    title: "المستويات",
                    text: "تعلم تحديد الدعم والمقاومة المهمة.",
                  },
                  {
                    no: "03",
                    title: "رد فعل السعر",
                    text: "راقب الاختراق والرفض وإعادة الاختبار.",
                  },
                  {
                    no: "04",
                    title: "نماذج الشموع",
                    text: "استخدمها للتأكيد داخل السياق.",
                  },
                  {
                    no: "05",
                    title: "إدارة المخاطر",
                    text: "حدد الوقف والحجم والهدف قبل التنفيذ.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[14px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-6 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "هيكل السوق", "قمم وقيعان واتجاه."],
                  ["02", "الدعم والمقاومة", "حدد المناطق المهمة."],
                  ["03", "رد فعل السعر", "اختراق ورفض وإعادة اختبار."],
                  ["04", "نماذج الشموع", "استخدمها للتأكيد."],
                  ["05", "إدارة المخاطر", "وقف وحجم وهدف."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 4 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </div>

                    <div>
                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {text}
                      </p>
                    </div>

                  </div>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:flex md:items-center md:justify-between md:gap-6">

                <div>

                  <h3 className="text-[15px] font-black text-slate-950">
                    ابدأ على حساب تجريبي
                  </h3>

                  <p className="mt-1.5 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    استخدم الرسوم السابقة لتدريب عينك على قراءة الاتجاه
                    والمستويات وردود الفعل قبل المخاطرة بأموال حقيقية.
                  </p>

                </div>


                <Link
                  href="/best-brokers"
                  className="mt-3 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700 md:mt-0 md:shrink-0"
                >
                  مقارنة شركات التداول
                  <span className="mr-2">←</span>
                </Link>

              </div>

            </div>

          </section>


          {/* =================================================
              FAQ
          ================================================= */}

          <section
            id="faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                الأسئلة الشائعة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أسئلة شائعة عن استراتيجية البرايس أكشن
              </h2>

              <p className="mt-3 max-w-5xl text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                إجابات مختصرة عن التداول بدون مؤشرات، الأطر الزمنية،
                الشموع وإدارة المخاطر.
              </p>

            </div>


            <div className="divide-y divide-slate-200">

              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group bg-white"
                >

                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 md:px-6 md:py-4">

                    <h3 className="text-[13px] font-black leading-6 text-slate-950 md:text-[14px]">
                      {item.q}
                    </h3>

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[15px] font-black text-brand-600 transition-transform group-open:rotate-45">
                      +
                    </div>

                  </summary>


                  <div className="px-4 pb-4 md:px-6 md:pb-5">

                    <p className="max-w-5xl text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      {item.a}
                    </p>

                  </div>

                </details>
              ))}

            </div>

          </section>


          {/* =================================================
              RELATED GUIDES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 md:px-6 md:py-5">

              <h2 className="text-[20px] font-black leading-7 text-slate-950 md:text-[26px]">
                مواضيع تساعدك على فهم البرايس أكشن بشكل أفضل
              </h2>

              <p className="mt-1.5 text-[12px] leading-6 text-slate-500 md:text-[13px]">
                أدلة مرتبطة بحركة السعر والمخاطر وإدارة الصفقة.
              </p>

            </div>


            {/* DESKTOP */}
            <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">

              {[
                {
                  label: "مفهوم أساسي",
                  title: "السيولة في التداول",
                  text: "افهم أين قد تتجمع أوامر السوق حول القمم والقيعان.",
                  href: "/learn-trading/liquidity",
                },
                {
                  label: "إدارة المخاطر",
                  title: "وقف الخسارة",
                  text: "تعرف على أهمية وضع مستوى يلغي السيناريو.",
                  href: "/learn-trading/stop-loss",
                },
                {
                  label: "إدارة الصفقة",
                  title: "جني الأرباح",
                  text: "تعرف على طرق تحديد أهداف منطقية للصفقة.",
                  href: "/learn-trading/take-profit",
                },
                {
                  label: "إدارة رأس المال",
                  title: "حجم الصفقة",
                  text: "افهم العلاقة بين حجم الصفقة والمخاطرة والوقف.",
                  href: "/learn-trading/lot",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[17px] border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >

                  <div className="text-[9px] font-black text-brand-600">
                    {item.label}
                  </div>

                  <h3 className="mt-1.5 text-[15px] font-black text-slate-950 group-hover:text-brand-600">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    {item.text}
                  </p>

                  <div className="mt-3 text-[11px] font-black text-brand-600">
                    اقرأ الدليل ←
                  </div>

                </Link>
              ))}

            </div>


            {/* MOBILE */}
            <div className="divide-y divide-slate-100 md:hidden">

              {[
                ["مفهوم أساسي", "السيولة في التداول", "/learn-trading/liquidity"],
                ["إدارة المخاطر", "وقف الخسارة", "/learn-trading/stop-loss"],
                ["إدارة الصفقة", "جني الأرباح", "/learn-trading/take-profit"],
                ["إدارة رأس المال", "حجم الصفقة", "/learn-trading/lot"],
              ].map(([label, title, href]) => (
                <Link
                  key={title}
                  href={href}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >

                  <div>

                    <div className="text-[9px] font-black text-brand-600">
                      {label}
                    </div>

                    <div className="mt-0.5 text-[13px] font-black text-slate-950">
                      {title}
                    </div>

                  </div>

                  <span className="text-[16px] font-black text-brand-600">
                    ←
                  </span>

                </Link>
              ))}

            </div>

          </section>


          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-brand-100 bg-[linear-gradient(135deg,#f3f7fd_0%,#ffffff_60%,#f7faff_100%)] shadow-sm">

            <div className="px-4 py-4 md:flex md:items-center md:justify-between md:gap-8 md:px-7 md:py-5">

              <div className="min-w-0 flex-1">

                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-600 md:text-[10px]">
                  الخطوة التالية
                </span>

                <h2 className="mt-2.5 text-[20px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[27px]">
                  تعلم قراءة السعر أولًا، ثم اختبر طريقتك عمليًا
                </h2>

                <p className="mt-2 max-w-4xl text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                  تدرب على تحديد الاتجاه والمستويات والاختراقات وإعادة
                  الاختبار على حساب تجريبي، ثم استخدم أدوات إدارة المخاطر
                  قبل التفكير في التداول بأموال حقيقية.
                </p>

              </div>


              <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-0 md:flex md:shrink-0">

                <Link
                  href="/tools"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 text-center text-[11px] font-black text-brand-600 transition hover:bg-brand-50 md:min-w-[145px]"
                >
                  أدوات التداول
                </Link>

                <Link
                  href="/best-brokers"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-3 text-center text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700 md:min-w-[175px]"
                >
                  أفضل شركات التداول
                  <span className="mr-2">←</span>
                </Link>

              </div>

            </div>


            <div className="border-t border-brand-100/70 bg-white/50 px-4 py-2.5 md:px-7">

              <p className="text-center text-[10px] leading-5 text-slate-500 md:text-right md:text-[11px]">
                المحتوى تعليمي ولا يمثل توصية تداول. التداول بالرافعة المالية
                ينطوي على مخاطر وقد يؤدي إلى خسارة رأس المال.
              </p>

            </div>

          </section>

        </article>

      </div>


      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      {/* ARTICLE SCHEMA */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema),
  }}
/>


      {/* BREADCRUMB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />


      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

    </main>
  );
}