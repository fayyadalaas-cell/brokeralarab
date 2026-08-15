import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   ICT STRATEGY PAGE
   Broker Alarab
   Path: /strategies/ict
========================================================= */

const PAGE_URL = "https://brokeralarab.com/strategies/ict";

const PAGE_TITLE =
  "استراتيجية ICT في التداول: شرح شامل للمبتدئين بالصور";

const PAGE_DESCRIPTION =
  "شرح استراتيجية ICT في التداول خطوة بخطوة، من هيكل السوق والسيولة إلى FVG وOrder Block وBOS وCHoCH وKill Zones، مع أمثلة وإدارة المخاطر.";

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    locale: "ar_SA",
    siteName: "بروكر العرب",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },

  keywords: [
    "استراتيجية ICT",
    "استراتيجية ICT في التداول",
    "شرح استراتيجية ICT",
    "ICT للمبتدئين",
    "ICT في الفوركس",
    "شرح ICT",
    "مفاهيم ICT",
    "هيكل السوق ICT",
    "السيولة في ICT",
    "FVG",
    "Fair Value Gap",
    "Order Block",
    "BOS",
    "CHoCH",
    "ICT Kill Zones",
    "استراتيجيات التداول",
    "استراتيجيات الفوركس",
  ],
};

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
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-sm font-black text-white">
          !
        </div>

        <div>
          <h3 className="text-[16px] font-black text-slate-950 md:text-[17px]">
            {title}
          </h3>

          <div className="mt-2 text-[14px] leading-7 text-slate-700 md:text-[15px] md:leading-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SVG 1
   ICT OVERVIEW / HOW ICT READS PRICE
========================================================= */

function ICTOverviewChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* =================================================
          CHART HEADER
      ================================================= */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">
        <div className="flex items-center justify-between gap-3">

          <div>
            <div className="text-[14px] font-black text-slate-950">
              مثال مبسط لكيفية قراءة نموذج ICT
            </div>

            <div className="mt-1 text-[11px] text-slate-500">
              السيولة ← السحب ← تغير الهيكل ← منطقة الاهتمام ← التنفيذ
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
            ICT Concept
          </span>

        </div>
      </div>

      {/* =================================================
          DESKTOP CHART
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 1200 590"
          className="block w-full"
          role="img"
          aria-label="مثال توضيحي لكيفية عمل استراتيجية ICT من تحديد السيولة إلى الدخول"
        >
          <defs>
            <linearGradient id="ictDesktopBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>

            <marker
              id="desktopArrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill="#2563eb" />
            </marker>
          </defs>

          <rect
            width="1200"
            height="590"
            fill="url(#ictDesktopBg)"
          />

          {/* Grid */}
          {[100, 180, 260, 340, 420, 500].map((y) => (
            <line
              key={`desktop-h-${y}`}
              x1="70"
              y1={y}
              x2="1130"
              y2={y}
              stroke="#e8edf4"
              strokeWidth="1"
            />
          ))}

          {[150, 300, 450, 600, 750, 900, 1050].map((x) => (
            <line
              key={`desktop-v-${x}`}
              x1={x}
              y1="55"
              x2={x}
              y2="515"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}

          {/* Price */}
          <polyline
            points="
              90,425
              180,335
              260,385
              350,275
              430,350
              520,165
              590,120
              650,260
              730,335
              805,275
              875,355
              960,285
              1050,205
              1120,245
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* LIQUIDITY */}
          <line
            x1="130"
            y1="165"
            x2="550"
            y2="165"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="10 7"
          />

          {/* Buy-side Liquidity label */}
<text
  x="165"
  y="140"
  fontSize="18"
  fontWeight="900"
  fill="#b45309"
  textAnchor="start"
  direction="ltr"
>
  Buy-side Liquidity
</text>

{/* Arabic explanation */}
<text
  x="390"
  y="192"
  fontSize="13"
  fill="#64748b"
  textAnchor="end"
  direction="rtl"
>
  قمم واضحة قد تتجمع فوقها السيولة
</text>

          {/* SWEEP */}
          <circle
            cx="590"
            cy="120"
            r="12"
            fill="#fff7ed"
            stroke="#f97316"
            strokeWidth="4"
          />

          <text
            x="610"
            y="92"
            fontSize="17"
            fontWeight="900"
            fill="#ea580c"
          >
            Liquidity Sweep
          </text>

          {/* CHOCH */}
          <line
            x1="430"
            y1="350"
            x2="760"
            y2="350"
            stroke="#e11d48"
            strokeWidth="2.5"
            strokeDasharray="9 7"
          />

          <text
            x="610"
            y="382"
            fontSize="17"
            fontWeight="900"
            fill="#be123c"
          >
            CHoCH
          </text>

          <text
            x="610"
            y="405"
            fontSize="13"
            fill="#64748b"
          >
            تغير أولي في سلوك هيكل السعر
          </text>

          {/* ORDER BLOCK */}
          <rect
            x="735"
            y="310"
            width="180"
            height="92"
            rx="14"
            fill="#dcfce7"
            fillOpacity="0.8"
            stroke="#22c55e"
            strokeWidth="2"
          />

          <text
            x="760"
            y="345"
            fontSize="17"
            fontWeight="900"
            fill="#15803d"
          >
            Order Block
          </text>

          <text
            x="760"
            y="370"
            fontSize="13"
            fill="#166534"
          >
            منطقة اهتمام محتملة
          </text>

          {/* FVG */}
          <rect
            x="930"
            y="250"
            width="120"
            height="82"
            rx="12"
            fill="#dbeafe"
            fillOpacity="0.8"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="7 5"
          />

          <text
            x="990"
            y="286"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill="#1d4ed8"
          >
            FVG
          </text>

          <text
            x="990"
            y="310"
            textAnchor="middle"
            fontSize="12"
            fill="#475569"
          >
            Imbalance
          </text>

          {/* Entry */}
          <line
            x1="880"
            y1="470"
            x2="880"
            y2="395"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <text
            x="895"
            y="460"
            fontSize="16"
            fontWeight="900"
            fill="#15803d"
          >
            Entry Zone
          </text>

          {/* Direction */}
          <path
            d="M 930 395 Q 1035 340 1110 255"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeDasharray="10 7"
            markerEnd="url(#desktopArrow)"
          />

          <text
            x="1015"
            y="410"
            fontSize="14"
            fontWeight="800"
            fill="#2563eb"
          >
            Possible continuation
          </text>

          {/* Bottom Flow */}
          <rect
            x="125"
            y="530"
            width="950"
            height="38"
            rx="19"
            fill="#ffffff"
            stroke="#e2e8f0"
          />

          <text
            x="600"
            y="555"
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill="#475569"
          >
            Market Structure → Liquidity → Sweep → CHoCH → POI → FVG → Execution
          </text>

        </svg>

      </div>

      {/* =================================================
    MOBILE CHART — CLICK TO EXPAND
================================================= */}
<div className="md:hidden">

  {/* Preview */}
  <a
    href="#ict-chart-fullscreen"
    className="group relative block cursor-zoom-in"
    aria-label="فتح رسم استراتيجية ICT بالحجم الكامل"
  >

    <svg
      viewBox="0 0 360 440"
      className="block w-full"
      role="img"
      aria-label="رسم مبسط لاستراتيجية ICT للموبايل"
    >
      <rect width="360" height="440" fill="#ffffff" />

      {/* Grid */}
      {[80, 145, 210, 275, 340].map((y) => (
        <line
          key={`mobile-h-${y}`}
          x1="25"
          y1={y}
          x2="335"
          y2={y}
          stroke="#eef2f7"
        />
      ))}

      {/* Liquidity */}
      <line
        x1="40"
        y1="115"
        x2="185"
        y2="115"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="7 5"
      />

      <text
        x="42"
        y="98"
        fontSize="11"
        fontWeight="900"
        fill="#b45309"
      >
        Liquidity
      </text>

      {/* Price */}
      <polyline
        points="
          28,325
          72,275
          108,300
          150,220
          185,255
          218,130
          245,90
          270,215
          295,255
          330,205
        "
        fill="none"
        stroke="#0f172a"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sweep */}
      <circle
        cx="245"
        cy="90"
        r="8"
        fill="#fff7ed"
        stroke="#f97316"
        strokeWidth="3"
      />

      <text
        x="260"
        y="74"
        fontSize="11"
        fontWeight="900"
        fill="#ea580c"
      >
        Sweep
      </text>

      {/* CHoCH */}
      <line
        x1="175"
        y1="255"
        x2="288"
        y2="255"
        stroke="#e11d48"
        strokeWidth="2"
        strokeDasharray="6 5"
      />

      <text
        x="200"
        y="277"
        fontSize="11"
        fontWeight="900"
        fill="#be123c"
      >
        CHoCH
      </text>

      {/* Order Block */}
      <rect
        x="235"
        y="215"
        width="75"
        height="62"
        rx="9"
        fill="#dcfce7"
        stroke="#22c55e"
        strokeWidth="1.5"
      />

      <text
        x="272"
        y="240"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#15803d"
      >
        Order Block
      </text>

      <text
        x="272"
        y="257"
        textAnchor="middle"
        fontSize="9"
        fill="#166534"
      >
        POI
      </text>

      {/* FVG */}
      <rect
        x="285"
        y="175"
        width="52"
        height="46"
        rx="7"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />

      <text
        x="311"
        y="203"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#1d4ed8"
      >
        FVG
      </text>

      {/* Bottom flow */}
      <rect
        x="25"
        y="360"
        width="310"
        height="55"
        rx="12"
        fill="#f8fafc"
        stroke="#e2e8f0"
      />

      <text
        x="180"
        y="384"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#334155"
      >
        Liquidity → Sweep → CHoCH
      </text>

      <text
        x="180"
        y="402"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#334155"
      >
        Order Block / FVG → Entry
      </text>
    </svg>

   {/* Expand action */}
<div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">
  <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600 transition group-active:bg-brand-100">
    <span>تكبير الرسم</span>
    <span className="text-[14px]">↗</span>
  </div>
</div>

  </a>


  {/* =================================================
      FULLSCREEN LIGHTBOX
      opens via :target — no JavaScript needed
  ================================================= */}
  <div
    id="ict-chart-fullscreen"
    className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
  >

    {/* Close by clicking background */}
    <a
      href="#how-it-works"
      className="absolute inset-0"
      aria-label="إغلاق الرسم"
    />

    <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

      {/* Lightbox header */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

        <div>
          <div className="text-[14px] font-black text-slate-950">
            كيف تعمل استراتيجية ICT؟
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            اضغط واسحب أفقيًا إذا احتجت مشاهدة تفاصيل الرسم
          </div>
        </div>

        <a
          href="#how-it-works"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
          aria-label="إغلاق"
        >
          ×
        </a>

      </div>

      {/* Full-size chart */}
<div className="bg-white">

  {/* Mobile swipe hint */}
  <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">
    <span className="text-[16px]">↔</span>
    <span>
      حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل
    </span>
  </div>

  <div className="overflow-auto p-2">

        <svg
          viewBox="0 0 1200 590"
          className="block min-w-[900px] w-full"
          role="img"
          aria-label="الرسم الكامل لاستراتيجية ICT"
        >

          <defs>
            <marker
              id="mobileFullArrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path
                d="M0 0 L10 5 L0 10 Z"
                fill="#2563eb"
              />
            </marker>
          </defs>

          <rect
            width="1200"
            height="590"
            fill="#ffffff"
          />

          {/* Grid */}
          {[100, 180, 260, 340, 420, 500].map((y) => (
            <line
              key={`full-h-${y}`}
              x1="70"
              y1={y}
              x2="1130"
              y2={y}
              stroke="#e8edf4"
            />
          ))}

          {[150, 300, 450, 600, 750, 900, 1050].map((x) => (
            <line
              key={`full-v-${x}`}
              x1={x}
              y1="55"
              x2={x}
              y2="515"
              stroke="#f1f5f9"
            />
          ))}

          {/* Price */}
          <polyline
            points="
              90,425
              180,335
              260,385
              350,275
              430,350
              520,165
              590,120
              650,260
              730,335
              805,275
              875,355
              960,285
              1050,205
              1120,245
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Liquidity */}
          <line
            x1="165"
            y1="165"
            x2="550"
            y2="165"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="10 7"
          />

          <text
            x="165"
            y="140"
            fontSize="18"
            fontWeight="900"
            fill="#b45309"
            textAnchor="start"
            direction="ltr"
          >
            Buy-side Liquidity
          </text>

          <text
            x="390"
            y="192"
            fontSize="13"
            fill="#64748b"
            textAnchor="end"
            direction="rtl"
          >
            قمم واضحة قد تتجمع فوقها السيولة
          </text>

          {/* Sweep */}
          <circle
            cx="590"
            cy="120"
            r="12"
            fill="#fff7ed"
            stroke="#f97316"
            strokeWidth="4"
          />

          <text
            x="610"
            y="92"
            fontSize="17"
            fontWeight="900"
            fill="#ea580c"
          >
            Liquidity Sweep
          </text>

          {/* CHoCH */}
          <line
            x1="430"
            y1="350"
            x2="760"
            y2="350"
            stroke="#e11d48"
            strokeWidth="2.5"
            strokeDasharray="9 7"
          />

          <text
            x="610"
            y="382"
            fontSize="17"
            fontWeight="900"
            fill="#be123c"
          >
            CHoCH
          </text>

          {/* Order Block */}
          <rect
            x="735"
            y="310"
            width="180"
            height="92"
            rx="14"
            fill="#dcfce7"
            fillOpacity="0.8"
            stroke="#22c55e"
            strokeWidth="2"
          />

          <text
            x="760"
            y="345"
            fontSize="17"
            fontWeight="900"
            fill="#15803d"
          >
            Order Block
          </text>

          <text
            x="760"
            y="370"
            fontSize="13"
            fill="#166534"
          >
            منطقة اهتمام محتملة
          </text>

          {/* FVG */}
          <rect
            x="930"
            y="250"
            width="120"
            height="82"
            rx="12"
            fill="#dbeafe"
            fillOpacity="0.8"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="7 5"
          />

          <text
            x="990"
            y="286"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill="#1d4ed8"
          >
            FVG
          </text>

          <text
            x="990"
            y="310"
            textAnchor="middle"
            fontSize="12"
            fill="#475569"
          >
            Imbalance
          </text>

          {/* Entry */}
          <line
            x1="880"
            y1="470"
            x2="880"
            y2="395"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <text
            x="895"
            y="460"
            fontSize="16"
            fontWeight="900"
            fill="#15803d"
          >
            Entry Zone
          </text>

          {/* Continuation */}
          <path
            d="M 930 395 Q 1035 340 1110 255"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeDasharray="10 7"
            markerEnd="url(#mobileFullArrow)"
          />

          <text
            x="1015"
            y="410"
            fontSize="14"
            fontWeight="800"
            fill="#2563eb"
          >
            Possible continuation
          </text>

          {/* Flow */}
          <rect
            x="125"
            y="530"
            width="950"
            height="38"
            rx="19"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="600"
            y="555"
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill="#475569"
          >
            Market Structure → Liquidity → Sweep → CHoCH → POI → FVG → Execution
          </text>

       </svg>

  </div>
</div>

    </div>

  </div>

</div>

      {/* =================================================
          BEGINNER EXPLANATION
      ================================================= */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            كيف تقرأ الرسم؟
          </strong>{" "}
          يبدأ المتداول بتحديد منطقة السيولة، ثم ينتظر ما إذا كان السعر
          سيقوم بسحبها. بعد ذلك يراقب تغير هيكل السوق، ثم يبحث عن منطقة
          اهتمام مثل FVG أو Order Block قبل التفكير في الدخول. هذا التسلسل
          مثال تعليمي وليس إشارة تداول جاهزة.
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   SVG 2
   MARKET STRUCTURE
========================================================= */

function MarketStructureChart() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">
        <h3 className="text-[15px] font-black text-slate-950">
          كيف نقرأ هيكل السوق؟
        </h3>

        <p className="mt-1 text-[12px] text-slate-500">
          مقارنة مبسطة بين الهيكل الصاعد والهابط
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Bullish */}
        <div className="border-b border-slate-200 p-3 md:border-b-0 md:border-l md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-black text-green-700">هيكل صاعد</span>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-black text-green-700">
              Bullish
            </span>
          </div>

          <svg viewBox="0 0 520 320" className="w-full">
            <rect width="520" height="320" rx="20" fill="#f8fafc" />

            <polyline
              points="45,255 120,180 185,225 270,125 335,175 430,65"
              fill="none"
              stroke="#16a34a"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="120" cy="180" r="7" fill="#16a34a" />
            <circle cx="185" cy="225" r="7" fill="#16a34a" />
            <circle cx="270" cy="125" r="7" fill="#16a34a" />
            <circle cx="335" cy="175" r="7" fill="#16a34a" />
            <circle cx="430" cy="65" r="7" fill="#16a34a" />

            <text x="95" y="155" fontSize="17" fontWeight="900" fill="#15803d">
              HH
            </text>

            <text x="165" y="258" fontSize="17" fontWeight="900" fill="#15803d">
              HL
            </text>

            <text x="250" y="101" fontSize="17" fontWeight="900" fill="#15803d">
              HH
            </text>

            <text x="320" y="207" fontSize="17" fontWeight="900" fill="#15803d">
              HL
            </text>

            <text x="420" y="45" fontSize="17" fontWeight="900" fill="#15803d">
              HH
            </text>
          </svg>

          <div className="mt-3 rounded-xl bg-green-50 px-3 py-2 text-[12px] font-bold leading-6 text-green-800">
            قمم أعلى + قيعان أعلى = هيكل صاعد في صورته المبسطة.
          </div>
        </div>

        {/* Bearish */}
        <div className="p-3 md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-black text-rose-700">هيكل هابط</span>
            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-black text-rose-700">
              Bearish
            </span>
          </div>

          <svg viewBox="0 0 520 320" className="w-full">
            <rect width="520" height="320" rx="20" fill="#f8fafc" />

            <polyline
              points="45,65 125,135 190,90 280,205 350,155 440,270"
              fill="none"
              stroke="#e11d48"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="125" cy="135" r="7" fill="#e11d48" />
            <circle cx="190" cy="90" r="7" fill="#e11d48" />
            <circle cx="280" cy="205" r="7" fill="#e11d48" />
            <circle cx="350" cy="155" r="7" fill="#e11d48" />
            <circle cx="440" cy="270" r="7" fill="#e11d48" />

            <text x="105" y="166" fontSize="17" fontWeight="900" fill="#be123c">
              LL
            </text>

            <text x="177" y="67" fontSize="17" fontWeight="900" fill="#be123c">
              LH
            </text>

            <text x="260" y="238" fontSize="17" fontWeight="900" fill="#be123c">
              LL
            </text>

            <text x="337" y="132" fontSize="17" fontWeight="900" fill="#be123c">
              LH
            </text>

            <text x="425" y="300" fontSize="17" fontWeight="900" fill="#be123c">
              LL
            </text>
          </svg>

          <div className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-[12px] font-bold leading-6 text-rose-800">
            قمم أدنى + قيعان أدنى = هيكل هابط في صورته المبسطة.
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SVG 3
   LIQUIDITY
========================================================= */

function LiquidityChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* =================================================
          HEADER
      ================================================= */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">
        <div className="flex items-center justify-between gap-3">

          <div>
            <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
              مثال على Buy-side Liquidity
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
              قمم متقاربة ثم تحرك السعر فوقها وسحب السيولة
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-black text-amber-700">
            Liquidity
          </span>

        </div>
      </div>

      {/* =================================================
          DESKTOP CHART
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 1000 470"
          className="block w-full"
          role="img"
          aria-label="مثال على سيولة الشراء Buy-side Liquidity وسحب السيولة في استراتيجية ICT"
        >
          <rect width="1000" height="470" fill="#ffffff" />

          {/* Grid */}
          {[100, 180, 260, 340, 420].map((y) => (
            <line
              key={`liq-desktop-${y}`}
              x1="70"
              y1={y}
              x2="930"
              y2={y}
              stroke="#f1f5f9"
            />
          ))}

          {/* Liquidity zone */}
          <rect
            x="130"
            y="110"
            width="555"
            height="52"
            rx="10"
            fill="#fff7ed"
            fillOpacity="0.65"
          />

          <line
            x1="145"
            y1="160"
            x2="685"
            y2="160"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="9 7"
          />

          <text
            x="145"
            y="135"
            fontSize="17"
            fontWeight="900"
            fill="#b45309"
            direction="ltr"
          >
            Buy-side Liquidity
          </text>

          {/* Price */}
          <polyline
            points="
              90,390
              175,300
              250,345
              330,190
              410,325
              495,185
              580,315
              665,175
              745,92
              820,245
              920,320
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Equal highs */}
<circle cx="330" cy="190" r="8" fill="#f59e0b" />
<circle cx="495" cy="185" r="8" fill="#f59e0b" />
<circle cx="665" cy="175" r="8" fill="#f59e0b" />


{/* Sweep point */}
<circle
  cx="745"
  cy="92"
  r="11"
  fill="#fff7ed"
  stroke="#f97316"
  strokeWidth="4"
/>


{/* Vertical marker */}
<line
  x1="745"
  y1="76"
  x2="745"
  y2="58"
  stroke="#f97316"
  strokeWidth="2.5"
/>


{/* Sweep title */}
<text
  x="745"
  y="32"
  textAnchor="middle"
  fontSize="17"
  fontWeight="900"
  fill="#ea580c"
>
  Liquidity Sweep
</text>


{/* Sweep description */}
<text
  x="745"
  y="52"
  textAnchor="middle"
  fontSize="11"
  fontWeight="500"
  fill="#64748b"
>
  سحب السيولة فوق القمم
</text>

          {/* Note */}
          <rect
            x="675"
            y="350"
            width="245"
            height="70"
            rx="14"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="797"
            y="380"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#0f172a"
          >
            الاختراق وحده لا يعني دخول صفقة
          </text>

          <text
            x="797"
            y="404"
            textAnchor="middle"
            fontSize="12"
            fill="#64748b"
          >
            ننتظر السياق ورد فعل السعر
          </text>
        </svg>

      </div>

      {/* =================================================
          MOBILE PREVIEW — CLICK TO EXPAND
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#liquidity-chart-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="فتح رسم السيولة بالحجم الكامل"
        >

          <svg
            viewBox="0 0 360 390"
            className="block w-full"
            role="img"
            aria-label="مثال مبسط على Buy-side Liquidity للموبايل"
          >
            <rect width="360" height="390" fill="#ffffff" />

            {[80, 145, 210, 275, 340].map((y) => (
              <line
                key={`liq-mobile-${y}`}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}

            {/* Liquidity */}
            <line
              x1="40"
              y1="120"
              x2="220"
              y2="120"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="7 5"
            />

            <text
              x="42"
              y="103"
              fontSize="11"
              fontWeight="900"
              fill="#b45309"
            >
              Buy-side Liquidity
            </text>

            {/* Price */}
            <polyline
              points="
                30,315
                78,260
                118,295
                165,205
                205,255
                245,175
                275,85
                305,225
                335,270
              "
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="165" cy="205" r="6" fill="#f59e0b" />
            <circle cx="245" cy="175" r="6" fill="#f59e0b" />

            <circle
              cx="275"
              cy="85"
              r="8"
              fill="#fff7ed"
              stroke="#f97316"
              strokeWidth="3"
            />

            <text
              x="290"
              y="68"
              fontSize="11"
              fontWeight="900"
              fill="#ea580c"
            >
              Sweep
            </text>

            <rect
              x="110"
              y="325"
              width="180"
              height="42"
              rx="11"
              fill="#f8fafc"
              stroke="#e2e8f0"
            />

            <text
              x="200"
              y="350"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#334155"
            >
              Liquidity → Sweep → Reaction
            </text>
          </svg>

          {/* Expand action */}
          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              <span>تكبير الرسم</span>
              <span className="text-[14px]">↗</span>
            </div>
          </div>

        </a>

      </div>

      {/* =================================================
          EXPLANATION
      ================================================= */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            كيف تقرأ الرسم؟
          </strong>{" "}
          تتجمع السيولة في هذا المثال فوق مجموعة من القمم الواضحة. عندما
          يتحرك السعر فوقها نقول إن المنطقة تعرضت لسحب للسيولة، لكن ذلك
          لا يعني انعكاسًا تلقائيًا؛ يجب انتظار رد فعل السعر والتأكيدات
          الأخرى قبل التفكير في الدخول.
        </p>

      </div>

      {/* =================================================
          FULLSCREEN LIGHTBOX
      ================================================= */}
      <div
        id="liquidity-chart-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#liquidity"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />

        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                مثال على Buy-side Liquidity
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                سحب السيولة فوق القمم المتقاربة
              </div>
            </div>

            <a
              href="#liquidity"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>

          {/* Swipe hint */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-[11px] font-bold text-brand-700 md:hidden">
            <span className="text-[16px]">↔</span>
            <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل</span>
          </div>

          {/* Full chart */}
          <div className="overflow-auto bg-white p-2">

            <svg
              viewBox="0 0 1000 470"
              className="block min-w-[820px] w-full"
              role="img"
              aria-label="الرسم الكامل لسيولة الشراء Buy-side Liquidity"
            >
              <rect width="1000" height="470" fill="#ffffff" />

              {[100, 180, 260, 340, 420].map((y) => (
                <line
                  key={`liq-full-${y}`}
                  x1="70"
                  y1={y}
                  x2="930"
                  y2={y}
                  stroke="#f1f5f9"
                />
              ))}

              <rect
                x="130"
                y="110"
                width="555"
                height="52"
                rx="10"
                fill="#fff7ed"
                fillOpacity="0.65"
              />

              <line
                x1="145"
                y1="160"
                x2="685"
                y2="160"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="9 7"
              />

              <text
                x="145"
                y="135"
                fontSize="17"
                fontWeight="900"
                fill="#b45309"
                direction="ltr"
              >
                Buy-side Liquidity
              </text>

              <polyline
                points="
                  90,390
                  175,300
                  250,345
                  330,190
                  410,325
                  495,185
                  580,315
                  665,175
                  745,92
                  820,245
                  920,320
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle cx="330" cy="190" r="8" fill="#f59e0b" />
              <circle cx="495" cy="185" r="8" fill="#f59e0b" />
              <circle cx="665" cy="175" r="8" fill="#f59e0b" />

              <circle
                cx="745"
                cy="92"
                r="11"
                fill="#fff7ed"
                stroke="#f97316"
                strokeWidth="4"
              />

              <text
                x="770"
                y="62"
                fontSize="17"
                fontWeight="900"
                fill="#ea580c"
              >
                Sweep
              </text>

              <rect
                x="675"
                y="350"
                width="245"
                height="70"
                rx="14"
                fill="#f8fafc"
                stroke="#e2e8f0"
              />

              <text
                x="797"
                y="380"
                textAnchor="middle"
                fontSize="14"
                fontWeight="900"
                fill="#0f172a"
              >
                الاختراق وحده لا يعني دخول صفقة
              </text>

              <text
                x="797"
                y="404"
                textAnchor="middle"
                fontSize="12"
                fill="#64748b"
              >
                ننتظر السياق ورد فعل السعر
              </text>
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

function FVGChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">
        <div className="flex items-center justify-between gap-3">

          <div>
            <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
              مثال مبسط على Fair Value Gap
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
              ثلاث شموع وحركة قوية تترك منطقة عدم توازن
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[9px] font-black text-blue-700">
            FVG
          </span>

        </div>
      </div>

      {/* =================================================
          DESKTOP CHART
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 900 470"
          className="block w-full"
          role="img"
          aria-label="رسم توضيحي لفجوة القيمة العادلة Fair Value Gap في استراتيجية ICT"
        >
          <rect width="900" height="470" fill="#ffffff" />

          {[90, 160, 230, 300, 370].map((y) => (
            <line
              key={`fvg-desktop-${y}`}
              x1="65"
              y1={y}
              x2="835"
              y2={y}
              stroke="#f1f5f9"
            />
          ))}

          {/* Candle 1 */}
          <line
            x1="220"
            y1="280"
            x2="220"
            y2="390"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <rect
            x="194"
            y="305"
            width="52"
            height="62"
            rx="5"
            fill="#22c55e"
          />

          {/* Candle 2 */}
          <line
            x1="440"
            y1="115"
            x2="440"
            y2="350"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <rect
            x="408"
            y="155"
            width="64"
            height="150"
            rx="5"
            fill="#16a34a"
          />

          {/* Candle 3 */}
          <line
            x1="655"
            y1="90"
            x2="655"
            y2="245"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <rect
            x="629"
            y="125"
            width="52"
            height="80"
            rx="5"
            fill="#22c55e"
          />

          {/* FVG */}
          <rect
            x="247"
            y="205"
            width="382"
            height="100"
            rx="14"
            fill="#dbeafe"
            fillOpacity="0.82"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          <text
            x="438"
            y="250"
            textAnchor="middle"
            fontSize="28"
            fontWeight="900"
            fill="#1d4ed8"
          >
            FVG
          </text>

          <text
            x="438"
            y="278"
            textAnchor="middle"
            fontSize="14"
            fill="#475569"
          >
            Fair Value Gap
          </text>

          {/* Labels */}
          <text
            x="220"
            y="425"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#64748b"
          >
            Candle 1
          </text>

          <text
            x="440"
            y="425"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#64748b"
          >
            Displacement
          </text>

          <text
            x="655"
            y="425"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#64748b"
          >
            Candle 3
          </text>
        </svg>

      </div>

      {/* =================================================
          MOBILE PREVIEW
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#fvg-chart-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="فتح رسم فجوة القيمة العادلة بالحجم الكامل"
        >

          <svg
            viewBox="0 0 360 350"
            className="block w-full"
            role="img"
            aria-label="رسم مبسط لفجوة القيمة العادلة FVG للموبايل"
          >
            <rect width="360" height="350" fill="#ffffff" />

            {[70, 130, 190, 250, 310].map((y) => (
              <line
                key={`fvg-mobile-${y}`}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}

            {/* Candle 1 */}
            <line
              x1="78"
              y1="215"
              x2="78"
              y2="300"
              stroke="#16a34a"
              strokeWidth="3"
            />

            <rect
              x="61"
              y="235"
              width="34"
              height="48"
              rx="4"
              fill="#22c55e"
            />

            {/* Candle 2 */}
            <line
              x1="180"
              y1="88"
              x2="180"
              y2="260"
              stroke="#16a34a"
              strokeWidth="3"
            />

            <rect
              x="160"
              y="115"
              width="40"
              height="120"
              rx="4"
              fill="#16a34a"
            />

            {/* Candle 3 */}
            <line
              x1="285"
              y1="65"
              x2="285"
              y2="185"
              stroke="#16a34a"
              strokeWidth="3"
            />

            <rect
              x="268"
              y="92"
              width="34"
              height="58"
              rx="4"
              fill="#22c55e"
            />

            {/* FVG zone */}
            <rect
              x="96"
              y="150"
              width="172"
              height="85"
              rx="10"
              fill="#dbeafe"
              fillOpacity="0.85"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text
              x="182"
              y="190"
              textAnchor="middle"
              fontSize="21"
              fontWeight="900"
              fill="#1d4ed8"
            >
              FVG
            </text>

            <text
              x="182"
              y="213"
              textAnchor="middle"
              fontSize="10"
              fill="#475569"
            >
              Fair Value Gap
            </text>

            <text
              x="78"
              y="325"
              textAnchor="middle"
              fontSize="9"
              fontWeight="800"
              fill="#64748b"
            >
              Candle 1
            </text>

            <text
              x="180"
              y="325"
              textAnchor="middle"
              fontSize="9"
              fontWeight="800"
              fill="#64748b"
            >
              Displacement
            </text>

            <text
              x="285"
              y="325"
              textAnchor="middle"
              fontSize="9"
              fontWeight="800"
              fill="#64748b"
            >
              Candle 3
            </text>
          </svg>

          {/* EXPAND */}
          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              <span>تكبير الرسم</span>
              <span className="text-[14px]">↗</span>
            </div>
          </div>

        </a>

      </div>

      {/* EXPLANATION */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            كيف تقرأ الرسم؟
          </strong>{" "}
          نراقب ثلاث شموع. إذا كانت الشمعة الوسطى قوية وحدثت حركة سريعة
          بحيث بقيت منطقة سعرية بين نطاق الشمعة الأولى والثالثة بدون تداخل
          كامل، تسمى هذه المنطقة Fair Value Gap.
        </p>

      </div>

      {/* =================================================
          FULLSCREEN
      ================================================= */}
      <div
        id="fvg-chart-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#fvg"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />

        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                كيف تتكوّن Fair Value Gap؟
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                نموذج ثلاث شموع يوضح منطقة عدم التوازن
              </div>
            </div>

            <a
              href="#fvg"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>

          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-[11px] font-bold text-brand-700 md:hidden">
            <span className="text-[16px]">↔</span>
            <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل</span>
          </div>

          <div className="overflow-auto bg-white p-2">

            <svg
              viewBox="0 0 900 470"
              className="block min-w-[760px] w-full"
              role="img"
              aria-label="الرسم الكامل لفجوة القيمة العادلة FVG"
            >
              <rect width="900" height="470" fill="#ffffff" />

              {[90, 160, 230, 300, 370].map((y) => (
                <line
                  key={`fvg-full-${y}`}
                  x1="65"
                  y1={y}
                  x2="835"
                  y2={y}
                  stroke="#f1f5f9"
                />
              ))}

              <line x1="220" y1="280" x2="220" y2="390" stroke="#16a34a" strokeWidth="4" />
              <rect x="194" y="305" width="52" height="62" rx="5" fill="#22c55e" />

              <line x1="440" y1="115" x2="440" y2="350" stroke="#16a34a" strokeWidth="4" />
              <rect x="408" y="155" width="64" height="150" rx="5" fill="#16a34a" />

              <line x1="655" y1="90" x2="655" y2="245" stroke="#16a34a" strokeWidth="4" />
              <rect x="629" y="125" width="52" height="80" rx="5" fill="#22c55e" />

              <rect
                x="247"
                y="205"
                width="382"
                height="100"
                rx="14"
                fill="#dbeafe"
                fillOpacity="0.82"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />

              <text
                x="438"
                y="250"
                textAnchor="middle"
                fontSize="28"
                fontWeight="900"
                fill="#1d4ed8"
              >
                FVG
              </text>

              <text
                x="438"
                y="278"
                textAnchor="middle"
                fontSize="14"
                fill="#475569"
              >
                Fair Value Gap
              </text>

              <text x="220" y="425" textAnchor="middle" fontSize="13" fontWeight="800" fill="#64748b">
                Candle 1
              </text>

              <text x="440" y="425" textAnchor="middle" fontSize="13" fontWeight="800" fill="#64748b">
                Displacement
              </text>

              <text x="655" y="425" textAnchor="middle" fontSize="13" fontWeight="800" fill="#64748b">
                Candle 3
              </text>
            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}

function OrderBlockChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* =================================================
          HEADER
      ================================================= */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">
        <div className="flex items-center justify-between gap-3">

          <div>
            <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
              مثال مبسط على Bullish Order Block
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
              منطقة اهتمام تسبق اندفاعًا قويًا ثم قد يعود السعر لاختبارها
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[9px] font-black text-green-700">
            Order Block
          </span>

        </div>
      </div>

      {/* =================================================
          DESKTOP
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 1000 500"
          className="block w-full"
          role="img"
          aria-label="مثال توضيحي على Bullish Order Block في استراتيجية ICT"
        >
          <rect width="1000" height="500" fill="#ffffff" />

          {/* GRID */}
          {[95, 170, 245, 320, 395].map((y) => (
            <line
              key={`ob-desktop-${y}`}
              x1="70"
              y1={y}
              x2="930"
              y2={y}
              stroke="#f1f5f9"
            />
          ))}

          {/* ORDER BLOCK ZONE */}
          <rect
            x="205"
            y="325"
            width="340"
            height="88"
            rx="14"
            fill="#f8fafc"
            stroke="#22c55e"
            strokeWidth="2.5"
          />

          {/* PRICE */}
          <polyline
            points="
              100,180
              165,250
              230,215
              300,345
              375,370
              450,320
              520,195
              590,140
              665,200
              740,120
              825,82
              900,115
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ORDER BLOCK LABEL */}
          <text
            x="375"
            y="382"
            textAnchor="middle"
            fontSize="16"
            fontWeight="900"
            fill="#0f172a"
          >
            Bullish Order Block
          </text>

          <text
            x="375"
            y="400"
            textAnchor="middle"
            fontSize="10"
            fill="#64748b"
          >
            منطقة اهتمام محتملة
          </text>

          <circle
            cx="225"
            cy="346"
            r="5"
            fill="#22c55e"
          />

          {/* DISPLACEMENT */}
          <line
            x1="525"
            y1="255"
            x2="575"
            y2="205"
            stroke="#16a34a"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <text
            x="625"
            y="185"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#15803d"
          >
            Displacement
          </text>

          {/* POSSIBLE REVISIT */}
          <path
            d="M 825 85 Q 745 165 548 325"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeDasharray="9 7"
          />

          <text
            x="710"
            y="270"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#2563eb"
          >
            Possible revisit
          </text>

        </svg>

      </div>

      {/* =================================================
          MOBILE PREVIEW
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#order-block-chart-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="فتح رسم Order Block بالحجم الكامل"
        >

          <svg
            viewBox="0 0 360 345"
            className="block w-full"
            role="img"
            aria-label="رسم مبسط على Bullish Order Block للموبايل"
          >
            <rect width="360" height="345" fill="#ffffff" />

            {/* GRID */}
            {[70, 130, 190, 250, 310].map((y) => (
              <line
                key={`ob-mobile-${y}`}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}

            {/* ORDER BLOCK ZONE */}
            <rect
              x="38"
              y="240"
              width="158"
              height="62"
              rx="10"
              fill="#f8fafc"
              stroke="#22c55e"
              strokeWidth="2"
            />

            {/* PRICE */}
            <polyline
              points="
                18,108
                62,158
                102,136
                142,252
                178,268
                212,232
                248,145
                280,108
                314,136
                340,96
              "
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* ORDER BLOCK LABEL */}
            <text
              x="117"
              y="278"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#0f172a"
            >
              Bullish Order Block
            </text>

            <text
              x="117"
              y="292"
              textAnchor="middle"
              fontSize="7"
              fill="#64748b"
            >
              منطقة اهتمام
            </text>

            <circle
              cx="52"
              cy="255"
              r="4"
              fill="#22c55e"
            />

            {/* DISPLACEMENT */}
            <line
              x1="210"
              y1="215"
              x2="248"
              y2="170"
              stroke="#16a34a"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <text
              x="285"
              y="155"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="900"
              fill="#15803d"
            >
              Displacement
            </text>

            {/* POSSIBLE REVISIT */}
            <path
              d="M 337 98 Q 287 150 205 242"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeDasharray="7 5"
            />

            <text
              x="282"
              y="205"
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
              fill="#2563eb"
            >
              Possible revisit
            </text>

          </svg>

          {/* EXPAND */}
          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              <span>تكبير الرسم</span>
              <span className="text-[14px]">↗</span>
            </div>

          </div>

        </a>

      </div>

      {/* =================================================
          EXPLANATION
      ================================================= */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">

          <strong className="font-black text-slate-900">
            كيف تقرأ الرسم؟
          </strong>{" "}

          تمثل المنطقة ذات الإطار الأخضر Order Block محتملًا. بعد مغادرة
          السعر لها تظهر حركة صاعدة قوية أو Displacement. بعد ذلك قد يعود
          السعر إلى المنطقة مرة أخرى، لكن مجرد العودة إليها لا يكفي لاتخاذ
          قرار دخول دون قراءة السياق والسيولة وهيكل السوق.

        </p>

      </div>

      {/* =================================================
          FULLSCREEN
      ================================================= */}
      <div
        id="order-block-chart-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        {/* CLOSE BACKDROP */}
        <a
          href="#order-block"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />

        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* LIGHTBOX HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                مثال Bullish Order Block
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Order Block → Displacement → Possible Revisit
              </div>
            </div>

            <a
              href="#order-block"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>

          {/* SWIPE HINT */}
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
              viewBox="0 0 1000 500"
              className="block min-w-[820px] w-full"
              role="img"
              aria-label="الرسم الكامل لـ Bullish Order Block"
            >
              <rect width="1000" height="500" fill="#ffffff" />

              {/* GRID */}
              {[95, 170, 245, 320, 395].map((y) => (
                <line
                  key={`ob-full-${y}`}
                  x1="70"
                  y1={y}
                  x2="930"
                  y2={y}
                  stroke="#f1f5f9"
                />
              ))}

              {/* ORDER BLOCK ZONE */}
              <rect
                x="205"
                y="325"
                width="340"
                height="88"
                rx="14"
                fill="#f8fafc"
                stroke="#22c55e"
                strokeWidth="2.5"
              />

              {/* PRICE */}
              <polyline
                points="
                  100,180
                  165,250
                  230,215
                  300,345
                  375,370
                  450,320
                  520,195
                  590,140
                  665,200
                  740,120
                  825,82
                  900,115
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* ORDER BLOCK LABEL */}
              <text
                x="375"
                y="382"
                textAnchor="middle"
                fontSize="16"
                fontWeight="900"
                fill="#0f172a"
              >
                Bullish Order Block
              </text>

              <text
                x="375"
                y="400"
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                منطقة اهتمام محتملة
              </text>

              <circle
                cx="225"
                cy="346"
                r="5"
                fill="#22c55e"
              />

              {/* DISPLACEMENT */}
              <line
                x1="525"
                y1="255"
                x2="575"
                y2="205"
                stroke="#16a34a"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <text
                x="625"
                y="185"
                textAnchor="middle"
                fontSize="15"
                fontWeight="900"
                fill="#15803d"
              >
                Displacement
              </text>

              {/* POSSIBLE REVISIT */}
              <path
                d="M 825 85 Q 745 165 548 325"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeDasharray="9 7"
              />

              <text
                x="710"
                y="270"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#2563eb"
              >
                Possible revisit
              </text>

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}

function BOSCHoCHChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">
        <div className="flex items-center justify-between gap-3">

          <div>
            <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
              مثال بصري: CHoCH ثم BOS
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
              تغير أولي في السلوك ثم كسر هيكلي لاحق
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[9px] font-black text-rose-700">
            Structure
          </span>

        </div>
      </div>

      {/* =================================================
          DESKTOP
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 1100 500"
          className="block w-full"
          role="img"
          aria-label="رسم توضيحي للفرق بين CHoCH وBOS في استراتيجية ICT"
        >
          <rect width="1100" height="500" fill="#ffffff" />

          {[95, 170, 245, 320, 395].map((y) => (
            <line
              key={`bos-desktop-${y}`}
              x1="65"
              y1={y}
              x2="1035"
              y2={y}
              stroke="#f1f5f9"
            />
          ))}

          {/* PRICE */}
          <polyline
            points="
              90,120
              170,180
              250,145
              330,245
              410,195
              500,310
              590,245
              670,160
              750,220
              840,125
              930,180
              1010,82
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* CHoCH */}
          <line
            x1="365"
            y1="195"
            x2="670"
            y2="195"
            stroke="#e11d48"
            strokeWidth="2.5"
            strokeDasharray="9 7"
          />

          <text
            x="555"
            y="175"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill="#be123c"
          >
            CHoCH
          </text>

          <circle
            cx="670"
            cy="160"
            r="10"
            fill="#fff1f2"
            stroke="#e11d48"
            strokeWidth="3"
          />

          {/* BOS */}
          <line
            x1="650"
            y1="160"
            x2="880"
            y2="160"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeDasharray="9 7"
          />

          <text
            x="790"
            y="140"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill="#1d4ed8"
          >
            BOS
          </text>

          <circle
            cx="840"
            cy="125"
            r="10"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="3"
          />

          {/* Guide */}
          <rect
            x="300"
            y="405"
            width="500"
            height="42"
            rx="18"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="550"
            y="431"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#475569"
          >
            CHoCH → Early shift &nbsp;&nbsp; • &nbsp;&nbsp; BOS → Structural break
          </text>

        </svg>

      </div>

      {/* =================================================
          MOBILE PREVIEW
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#bos-choch-chart-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="فتح رسم BOS وCHoCH بالحجم الكامل"
        >

          <svg
            viewBox="0 0 360 330"
            className="block w-full"
            role="img"
            aria-label="رسم مبسط للفرق بين BOS وCHoCH للموبايل"
          >
            <rect width="360" height="330" fill="#ffffff" />

            {[65, 125, 185, 245, 305].map((y) => (
              <line
                key={`bos-mobile-${y}`}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}

            <polyline
              points="
                25,90
                65,130
                105,105
                145,190
                185,155
                225,100
                265,145
                305,80
                335,110
              "
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* CHoCH */}
            <line
              x1="120"
              y1="155"
              x2="225"
              y2="155"
              stroke="#e11d48"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text
              x="170"
              y="142"
              textAnchor="middle"
              fontSize="11"
              fontWeight="900"
              fill="#be123c"
            >
              CHoCH
            </text>

            <circle
              cx="225"
              cy="100"
              r="7"
              fill="#fff1f2"
              stroke="#e11d48"
              strokeWidth="2.5"
            />

            {/* BOS */}
            <line
              x1="215"
              y1="100"
              x2="305"
              y2="100"
              stroke="#2563eb"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text
              x="265"
              y="87"
              textAnchor="middle"
              fontSize="11"
              fontWeight="900"
              fill="#1d4ed8"
            >
              BOS
            </text>

            <circle
              cx="305"
              cy="80"
              r="7"
              fill="#eff6ff"
              stroke="#2563eb"
              strokeWidth="2.5"
            />

            <rect
              x="45"
              y="255"
              width="270"
              height="48"
              rx="12"
              fill="#f8fafc"
              stroke="#e2e8f0"
            />

            <text
              x="180"
              y="276"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#334155"
            >
              CHoCH = تغير أولي
            </text>

            <text
              x="180"
              y="293"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#334155"
            >
              BOS = كسر هيكلي
            </text>

          </svg>

          {/* EXPAND */}
          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              <span>تكبير الرسم</span>
              <span className="text-[14px]">↗</span>
            </div>
          </div>

        </a>

      </div>

      {/* EXPLANATION */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            كيف تقرأ المثال؟
          </strong>{" "}
          في هذا النموذج يظهر CHoCH أولًا كتغير مبكر في سلوك هيكل السعر.
          بعد استمرار الحركة وكسر مستوى هيكلي آخر يظهر BOS كتأكيد أقوى على
          تغير أو استمرار البنية. المصطلحات قد تختلف قليلًا بين مدارس التحليل،
          لذلك الأهم هو فهم وظيفة كل كسر داخل السياق.
        </p>

      </div>

      {/* =================================================
          FULLSCREEN
      ================================================= */}
      <div
        id="bos-choch-chart-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#bos-choch"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />

        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                الفرق بين CHoCH وBOS
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                تغير أولي في الهيكل ثم كسر هيكلي لاحق
              </div>
            </div>

            <a
              href="#bos-choch"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>

          {/* Swipe hint */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-[11px] font-bold text-brand-700 md:hidden">
            <span className="text-[16px]">↔</span>
            <span>حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل</span>
          </div>

          <div className="overflow-auto bg-white p-2">

            <svg
              viewBox="0 0 1100 500"
              className="block min-w-[820px] w-full"
              role="img"
              aria-label="الرسم الكامل للفرق بين CHoCH وBOS"
            >
              <rect width="1100" height="500" fill="#ffffff" />

              {[95, 170, 245, 320, 395].map((y) => (
                <line
                  key={`bos-full-${y}`}
                  x1="65"
                  y1={y}
                  x2="1035"
                  y2={y}
                  stroke="#f1f5f9"
                />
              ))}

              <polyline
                points="90,120 170,180 250,145 330,245 410,195 500,310 590,245 670,160 750,220 840,125 930,180 1010,82"
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <line
                x1="365"
                y1="195"
                x2="670"
                y2="195"
                stroke="#e11d48"
                strokeWidth="2.5"
                strokeDasharray="9 7"
              />

              <text
                x="555"
                y="175"
                textAnchor="middle"
                fontSize="18"
                fontWeight="900"
                fill="#be123c"
              >
                CHoCH
              </text>

              <circle
                cx="670"
                cy="160"
                r="10"
                fill="#fff1f2"
                stroke="#e11d48"
                strokeWidth="3"
              />

              <line
                x1="650"
                y1="160"
                x2="880"
                y2="160"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeDasharray="9 7"
              />

              <text
                x="790"
                y="140"
                textAnchor="middle"
                fontSize="18"
                fontWeight="900"
                fill="#1d4ed8"
              >
                BOS
              </text>

              <circle
                cx="840"
                cy="125"
                r="10"
                fill="#eff6ff"
                stroke="#2563eb"
                strokeWidth="3"
              />

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}

function ICTTradeExampleChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* =================================================
          HEADER
      ================================================= */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">
        <div className="flex items-center justify-between gap-3">

          <div>
            <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
              نموذج تطبيقي افتراضي لاستراتيجية ICT
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
              السيولة ← السحب ← تغير الهيكل ← منطقة الاهتمام ← الدخول ← الهدف
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
            مثال تعليمي
          </span>

        </div>
      </div>


      {/* =================================================
          DESKTOP CHART
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 1200 600"
          className="block w-full"
          role="img"
          aria-label="مثال عملي على استراتيجية ICT يوضح السيولة وسحب السيولة وتغير الهيكل وفجوة القيمة العادلة والدخول والهدف"
        >
          <defs>
            <marker
              id="tradeEntryArrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill="#16a34a" />
            </marker>
          </defs>

          <rect width="1200" height="600" fill="#ffffff" />

          {/* GRID */}
          {[95, 170, 245, 320, 395, 470, 545].map((y) => (
            <line
              key={`trade-desktop-h-${y}`}
              x1="70"
              y1={y}
              x2="1130"
              y2={y}
              stroke="#eef2f7"
            />
          ))}

          {[160, 320, 480, 640, 800, 960, 1120].map((x) => (
            <line
              key={`trade-desktop-v-${x}`}
              x1={x}
              y1="60"
              x2={x}
              y2="530"
              stroke="#f8fafc"
            />
          ))}

          {/* =================================================
              PRICE
          ================================================= */}
          <polyline
            points="
              90,190
              165,145
              235,220
              315,175
              395,290
              475,360
              545,425
              610,285
              690,230
              775,285
              850,205
              925,250
              1000,155
              1075,105
              1130,130
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* =================================================
              SELL-SIDE LIQUIDITY
          ================================================= */}
          <line
            x1="135"
            y1="395"
            x2="505"
            y2="395"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="9 7"
          />

          <text
            x="145"
            y="372"
            fontSize="15"
            fontWeight="900"
            fill="#b45309"
          >
            سيولة البيع
          </text>


          {/* LIQUIDITY SWEEP */}
          <circle
            cx="545"
            cy="425"
            r="10"
            fill="#fff7ed"
            stroke="#f97316"
            strokeWidth="3"
          />

          <text
            x="545"
            y="458"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#ea580c"
          >
            سحب السيولة
          </text>


          {/* =================================================
              CHOCH
          ================================================= */}
          <line
            x1="395"
            y1="290"
            x2="635"
            y2="290"
            stroke="#e11d48"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          <text
            x="585"
            y="270"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#be123c"
          >
            CHoCH
          </text>


          {/* =================================================
              ORDER BLOCK
          ================================================= */}
          <rect
            x="610"
            y="290"
            width="170"
            height="70"
            rx="12"
            fill="#f8fafc"
            stroke="#22c55e"
            strokeWidth="2"
          />

          <text
            x="695"
            y="320"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#0f172a"
          >
            Order Block
          </text>

          <text
            x="695"
            y="342"
            textAnchor="middle"
            fontSize="10"
            fill="#64748b"
          >
            منطقة اهتمام
          </text>


          {/* =================================================
              FVG
          ================================================= */}
          <rect
            x="755"
            y="235"
            width="105"
            height="65"
            rx="10"
            fill="#dbeafe"
            fillOpacity="0.78"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="7 5"
          />

          <text
            x="807"
            y="274"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#1d4ed8"
          >
            FVG
          </text>


          {/* =================================================
              ENTRY
          ================================================= */}
          <line
            x1="780"
            y1="395"
            x2="780"
            y2="350"
            stroke="#16a34a"
            strokeWidth="4"
            markerEnd="url(#tradeEntryArrow)"
          />

          <text
            x="780"
            y="420"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#15803d"
          >
            الدخول
          </text>


          {/* =================================================
              STOP LOSS
          ================================================= */}
          <line
            x1="610"
            y1="470"
            x2="850"
            y2="470"
            stroke="#ef4444"
            strokeWidth="2.5"
          />

          <text
            x="850"
            y="490"
            textAnchor="end"
            fontSize="12"
            fontWeight="900"
            fill="#dc2626"
          >
            وقف الخسارة
          </text>


          {/* =================================================
              TARGET
          ================================================= */}
          <line
            x1="860"
            y1="135"
            x2="1120"
            y2="135"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          <text
            x="865"
            y="115"
            fontSize="14"
            fontWeight="900"
            fill="#15803d"
          >
            الهدف / سيولة الشراء
          </text>


          {/* =================================================
              FLOW
          ================================================= */}
          <rect
            x="155"
            y="535"
            width="890"
            height="38"
            rx="19"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="600"
            y="560"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#475569"
          >
            الاتجاه العام → السيولة → السحب → CHoCH → منطقة اهتمام → الدخول → وقف الخسارة → الهدف
          </text>

        </svg>

      </div>


      {/* =================================================
          MOBILE PREVIEW
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#trade-example-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="فتح المثال العملي لاستراتيجية ICT بالحجم الكامل"
        >

          <svg
            viewBox="0 0 360 360"
            className="block w-full"
            role="img"
            aria-label="معاينة مبسطة لمثال عملي على استراتيجية ICT"
          >
            <rect width="360" height="360" fill="#ffffff" />

            {[65, 125, 185, 245, 305].map((y) => (
              <line
                key={`trade-mobile-${y}`}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}


            {/* PRICE */}
            <polyline
              points="
                25,120
                70,95
                110,150
                150,125
                190,215
                225,260
                260,170
                300,135
                337,165
              "
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />


            {/* SELL LIQUIDITY */}
            <line
              x1="45"
              y1="235"
              x2="215"
              y2="235"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text
              x="48"
              y="221"
              fontSize="9"
              fontWeight="900"
              fill="#b45309"
            >
              السيولة
            </text>


            {/* SWEEP */}
            <circle
              cx="225"
              cy="260"
              r="7"
              fill="#fff7ed"
              stroke="#f97316"
              strokeWidth="2.5"
            />


            {/* CHOCH */}
            <line
              x1="150"
              y1="215"
              x2="270"
              y2="215"
              stroke="#e11d48"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text
              x="190"
              y="203"
              fontSize="9"
              fontWeight="900"
              fill="#be123c"
            >
              CHoCH
            </text>


            {/* OB */}
            <rect
              x="235"
              y="215"
              width="75"
              height="48"
              rx="8"
              fill="#f8fafc"
              stroke="#22c55e"
              strokeWidth="1.7"
            />

            <text
              x="272"
              y="244"
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
              fill="#0f172a"
            >
              Order Block
            </text>


            {/* FVG */}
            <rect
              x="285"
              y="170"
              width="48"
              height="40"
              rx="7"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />

            <text
              x="309"
              y="195"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#1d4ed8"
            >
              FVG
            </text>


            {/* Target */}
            <line
              x1="250"
              y1="95"
              x2="335"
              y2="95"
              stroke="#16a34a"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text
              x="290"
              y="82"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#15803d"
            >
              الهدف
            </text>


            {/* FLOW */}
            <rect
              x="40"
              y="295"
              width="280"
              height="42"
              rx="11"
              fill="#f8fafc"
              stroke="#e2e8f0"
            />

            <text
              x="180"
              y="313"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#334155"
            >
              سيولة → سحب → CHoCH
            </text>

            <text
              x="180"
              y="328"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#334155"
            >
              منطقة اهتمام → دخول → هدف
            </text>

          </svg>


          {/* EXPAND */}
          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              <span>تكبير الرسم</span>
              <span className="text-[14px]">↗</span>
            </div>

          </div>

        </a>

      </div>


      {/* =================================================
          EXPLANATION
      ================================================= */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            كيف تقرأ المثال؟
          </strong>{" "}
          يبدأ السيناريو بسياق صاعد، ثم يهبط السعر أسفل قاع واضح ويسحب
          السيولة. بعد ذلك يظهر تغير في الهيكل وحركة صاعدة قوية مع منطقة
          FVG وOrder Block. عند عودة السعر إلى منطقة الاهتمام يمكن دراسة
          الدخول مع وقف خسارة واضح وهدف محدد مسبقًا. المثال تعليمي فقط
          وليس توصية تداول.
        </p>

      </div>


      {/* =================================================
          FULLSCREEN
      ================================================= */}
      <div
        id="trade-example-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#example"
          className="absolute inset-0"
          aria-label="إغلاق المثال"
        />

        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">


          {/* FULLSCREEN HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                المثال العملي الكامل لاستراتيجية ICT
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                من السيولة إلى التخطيط للدخول والهدف
              </div>
            </div>

            <a
              href="#example"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="إغلاق"
            >
              ×
            </a>

          </div>


          {/* SWIPE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">

            <span className="text-[16px]">↔</span>

            <span>
              حرّك الرسم يمينًا ويسارًا لمشاهدة جميع التفاصيل
            </span>

          </div>


          {/* FULL CHART */}
          <div className="overflow-auto bg-white p-2">

            <svg
              viewBox="0 0 1200 600"
              className="block min-w-[900px] w-full"
              role="img"
              aria-label="الرسم الكامل للمثال التطبيقي على استراتيجية ICT"
            >
              <defs>
                <marker
                  id="tradeEntryArrowFull"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M0 0 L10 5 L0 10 Z" fill="#16a34a" />
                </marker>
              </defs>

              <rect width="1200" height="600" fill="#ffffff" />

              {[95, 170, 245, 320, 395, 470, 545].map((y) => (
                <line
                  key={`trade-full-h-${y}`}
                  x1="70"
                  y1={y}
                  x2="1130"
                  y2={y}
                  stroke="#eef2f7"
                />
              ))}

              {[160, 320, 480, 640, 800, 960, 1120].map((x) => (
                <line
                  key={`trade-full-v-${x}`}
                  x1={x}
                  y1="60"
                  x2={x}
                  y2="530"
                  stroke="#f8fafc"
                />
              ))}

              <polyline
                points="
                  90,190
                  165,145
                  235,220
                  315,175
                  395,290
                  475,360
                  545,425
                  610,285
                  690,230
                  775,285
                  850,205
                  925,250
                  1000,155
                  1075,105
                  1130,130
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* SELL LIQUIDITY */}
              <line
                x1="135"
                y1="395"
                x2="505"
                y2="395"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="9 7"
              />

              <text x="145" y="372" fontSize="15" fontWeight="900" fill="#b45309">
                سيولة البيع
              </text>

              {/* SWEEP */}
              <circle
                cx="545"
                cy="425"
                r="10"
                fill="#fff7ed"
                stroke="#f97316"
                strokeWidth="3"
              />

              <text
                x="545"
                y="458"
                textAnchor="middle"
                fontSize="14"
                fontWeight="900"
                fill="#ea580c"
              >
                سحب السيولة
              </text>

              {/* CHOCH */}
              <line
                x1="395"
                y1="290"
                x2="635"
                y2="290"
                stroke="#e11d48"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />

              <text
                x="585"
                y="270"
                textAnchor="middle"
                fontSize="14"
                fontWeight="900"
                fill="#be123c"
              >
                CHoCH
              </text>

              {/* ORDER BLOCK */}
              <rect
                x="610"
                y="290"
                width="170"
                height="70"
                rx="12"
                fill="#f8fafc"
                stroke="#22c55e"
                strokeWidth="2"
              />

              <text
                x="695"
                y="320"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#0f172a"
              >
                Order Block
              </text>

              <text
                x="695"
                y="342"
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                منطقة اهتمام
              </text>

              {/* FVG */}
              <rect
                x="755"
                y="235"
                width="105"
                height="65"
                rx="10"
                fill="#dbeafe"
                fillOpacity="0.78"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="7 5"
              />

              <text
                x="807"
                y="274"
                textAnchor="middle"
                fontSize="15"
                fontWeight="900"
                fill="#1d4ed8"
              >
                FVG
              </text>

              {/* ENTRY */}
              <line
                x1="780"
                y1="395"
                x2="780"
                y2="350"
                stroke="#16a34a"
                strokeWidth="4"
                markerEnd="url(#tradeEntryArrowFull)"
              />

              <text
                x="780"
                y="420"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#15803d"
              >
                الدخول
              </text>

              {/* STOP */}
              <line
                x1="610"
                y1="470"
                x2="850"
                y2="470"
                stroke="#ef4444"
                strokeWidth="2.5"
              />

              <text
                x="850"
                y="490"
                textAnchor="end"
                fontSize="12"
                fontWeight="900"
                fill="#dc2626"
              >
                وقف الخسارة
              </text>

              {/* TARGET */}
              <line
                x1="860"
                y1="135"
                x2="1120"
                y2="135"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />

              <text
                x="865"
                y="115"
                fontSize="14"
                fontWeight="900"
                fill="#15803d"
              >
                الهدف / سيولة الشراء
              </text>

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function ICTStrategyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${PAGE_URL}#article`,
        headline: "استراتيجية ICT في التداول: شرح شامل للمبتدئين 2026",
        description:
          "دليل تعليمي شامل لشرح استراتيجية ICT ومفاهيم السيولة وهيكل السوق وFVG وOrder Block وBOS وCHoCH.",
        inLanguage: "ar",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": PAGE_URL,
        },
        author: {
          "@type": "Organization",
          name: "Broker Alarab",
          url: "https://brokeralarab.com",
        },
        publisher: {
          "@type": "Organization",
          name: "Broker Alarab",
          url: "https://brokeralarab.com",
          logo: {
            "@type": "ImageObject",
            url: "https://brokeralarab.com/logo.png",
          },
        },
        datePublished: "2026-08-15",
        dateModified: "2026-08-15",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: "https://brokeralarab.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "تعلم التداول",
            item: "https://brokeralarab.com/learn-trading",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "استراتيجية ICT",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  const toc = [
    { id: "what-is-ict", label: "ما هي استراتيجية ICT؟", number: "01" },
    { id: "how-it-works", label: "كيف تعمل استراتيجية ICT؟", number: "02" },
    { id: "market-structure", label: "هيكل السوق Market Structure", number: "03" },
    { id: "liquidity", label: "السيولة Liquidity", number: "04" },
    { id: "fvg", label: "فجوة القيمة العادلة FVG", number: "05" },
    { id: "order-block", label: "Order Block", number: "06" },
    { id: "bos-choch", label: "BOS و CHoCH", number: "07" },
    { id: "kill-zones", label: "ICT Kill Zones", number: "08" },
    { id: "example", label: "مثال عملي كامل", number: "09" },
    { id: "risk", label: "إدارة المخاطر", number: "10" },
    { id: "pros-cons", label: "المميزات والعيوب", number: "11" },
    { id: "faq", label: "الأسئلة الشائعة", number: "12" },
  ];

  return (
    <main dir="rtl" className="bg-[#f5f7fb]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =====================================================
          BREADCRUMBS
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-4 pt-5 md:px-6 md:pt-7">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[12px] font-bold text-slate-500 md:text-[13px]"
        >
          <Link href="/" className="transition hover:text-brand-600">
            الرئيسية
          </Link>

          <span className="text-slate-300">/</span>

          <Link
            href="/learn-trading"
            className="transition hover:text-brand-600"
          >
            تعلم التداول
          </Link>

          <span className="text-slate-300">/</span>

          <span className="text-slate-800">استراتيجية ICT</span>
        </nav>
      </div>

      {/* =====================================================
    HERO — COMPACT RESPONSIVE VERSION
===================================================== */}

<section className="mx-auto max-w-[1520px] px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">

  {/* ===================================================
      DESKTOP HERO
  =================================================== */}
  <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm md:block">
    <div className="grid min-h-[390px] lg:grid-cols-[1.18fr_0.82fr]">

      {/* =========================
          TEXT
      ========================= */}
      <div className="flex flex-col justify-center px-8 py-7 lg:px-10 xl:px-12">

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
            استراتيجيات التداول
          </span>

          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
            دليل تعليمي 2026
          </span>
        </div>

        {/* H1 */}
        <h1 className="mt-4 max-w-[860px] text-[34px] font-black leading-[1.28] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
          استراتيجية ICT في التداول: شرح شامل للمبتدئين خطوة بخطوة
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
          تعرّف على منهجية ICT من الصفر، وكيفية قراءة{" "}
          <strong className="font-black text-slate-900">
            هيكل السوق والسيولة وFair Value Gap وOrder Block
          </strong>{" "}
          وربط هذه المفاهيم لبناء سيناريو تداول منظم.
        </p>

        {/* Concepts */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-black text-slate-700">
            Market Structure
          </span>

          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
            Liquidity
          </span>

          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
            FVG
          </span>

          <span className="rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-black text-green-700">
            Order Block
          </span>

          <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
            BOS / CHoCH
          </span>
        </div>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">
          <span>📅 15 أغسطس 2026</span>
          <span className="text-slate-300">•</span>
          <span>آخر تحديث: 15 أغسطس 2026</span>
          <span className="text-slate-300">•</span>
          <span>وقت القراءة: 15–20 دقيقة</span>
        </div>

      </div>

      {/* =========================
          VISUAL
      ========================= */}
      <div className="flex items-center justify-center border-r border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:p-8">

        <div className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">

          {/* Fake Chart Header */}
          <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            </div>

            <span className="text-[10px] font-black text-slate-700">
              ICT Market Model
            </span>
          </div>

          {/* SVG */}
          <div className="p-4">
            <svg
              viewBox="0 0 760 420"
              className="block w-full"
              role="img"
              aria-label="رسم توضيحي لاستراتيجية ICT"
            >
              <defs>
                <linearGradient
                  id="heroCompactBlue"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1e5bb8" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              <rect width="760" height="420" fill="#ffffff" />

              {/* Grid */}
              {[70, 140, 210, 280, 350].map((y) => (
                <line
                  key={y}
                  x1="45"
                  y1={y}
                  x2="715"
                  y2={y}
                  stroke="#eef2f7"
                  strokeWidth="1"
                />
              ))}

              {/* Liquidity */}
              <line
                x1="90"
                y1="130"
                x2="405"
                y2="130"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />

              <text
                x="95"
                y="108"
                fontSize="14"
                fontWeight="900"
                fill="#b45309"
              >
                LIQUIDITY
              </text>

              {/* ICT Badge */}
              <rect
                x="92"
                y="145"
                width="70"
                height="32"
                rx="16"
                fill="#0f172a"
              />

              <text
                x="127"
                y="166"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#ffffff"
              >
                ICT
              </text>

              {/* Price */}
              <polyline
                points="
                  75,330
                  150,250
                  215,290
                  290,190
                  350,265
                  420,135
                  465,95
                  515,230
                  565,285
                  625,225
                  690,160
                "
                fill="none"
                stroke="url(#heroCompactBlue)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Sweep */}
              <circle cx="420" cy="135" r="7" fill="#f59e0b" />

              <circle
                cx="465"
                cy="95"
                r="10"
                fill="#f97316"
              />

              {/* FVG */}
              <rect
                x="555"
                y="220"
                width="80"
                height="72"
                rx="10"
                fill="#dbeafe"
                fillOpacity="0.85"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="6 5"
              />

              <text
                x="595"
                y="262"
                textAnchor="middle"
                fontSize="16"
                fontWeight="900"
                fill="#1d4ed8"
              >
                FVG
              </text>

              {/* Order Block */}
              <rect
                x="465"
                y="275"
                width="105"
                height="62"
                rx="10"
                fill="#dcfce7"
                stroke="#22c55e"
                strokeWidth="2"
              />

              <text
                x="518"
                y="301"
                textAnchor="middle"
                fontSize="11"
                fontWeight="900"
                fill="#15803d"
              >
                ORDER
              </text>

              <text
                x="518"
                y="318"
                textAnchor="middle"
                fontSize="11"
                fontWeight="900"
                fill="#15803d"
              >
                BLOCK
              </text>

              <text
                x="380"
                y="392"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#64748b"
              >
                Structure • Liquidity • Imbalance • Execution
              </text>
            </svg>
          </div>

        </div>
      </div>

    </div>
  </div>

  {/* ===================================================
    MOBILE HERO — FINAL COMPACT
=================================================== */}
<div className="md:hidden">

  <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

    {/* =========================
        TEXT
    ========================= */}
    <div className="px-4 pb-2.5 pt-3.5">

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">

        <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
          استراتيجيات التداول
        </span>

        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600">
          دليل 2026
        </span>

      </div>

      {/* Title */}
      <h1 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950">
        استراتيجية ICT في التداول: شرح شامل للمبتدئين
      </h1>

      {/* Description */}
      <p className="mt-3 text-[14px] leading-[1.9] text-slate-600">
        دليل مبسط لفهم{" "}
        <strong className="font-black text-slate-900">
          السيولة وهيكل السوق وFVG وOrder Block
        </strong>{" "}
        وكيفية ربط هذه المفاهيم ضمن نموذج ICT.
      </p>

      {/* Meta — Compact */}
      <div className="mt-2.5 flex items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

        <span>📅 15 أغسطس 2026</span>

        <span className="text-slate-300">
          •
        </span>

        <span>
          ⏱ 15–20 دقيقة
        </span>

      </div>

    </div>

    {/* =========================
        MOBILE CHART
    ========================= */}
    <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_100%)] px-2.5 py-2.5">

      <div className="mx-auto max-w-[330px] overflow-hidden rounded-[15px] border border-slate-200 bg-white shadow-sm">

        {/* Chart Header */}
        <div className="flex h-7 items-center justify-between border-b border-slate-100 bg-slate-50 px-3">

          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>

          <span className="text-[7px] font-black text-slate-600">
            ICT MARKET MODEL
          </span>

        </div>

        {/* SVG */}
        <svg
          viewBox="0 0 760 320"
          className="block w-full"
          role="img"
          aria-label="رسم مبسط لاستراتيجية ICT"
        >

          <rect
            width="760"
            height="320"
            fill="#ffffff"
          />

          {/* Grid */}
          {[70, 135, 200, 265].map((y) => (
            <line
              key={y}
              x1="45"
              y1={y}
              x2="715"
              y2={y}
              stroke="#eef2f7"
            />
          ))}

          {/* Liquidity */}
          <line
            x1="95"
            y1="100"
            x2="400"
            y2="100"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="10 7"
          />

          <text
            x="100"
            y="82"
            fontSize="13"
            fontWeight="900"
            fill="#b45309"
          >
            LIQUIDITY
          </text>

          {/* Price */}
          <polyline
            points="
              80,275
              155,210
              225,245
              300,155
              360,220
              430,105
              475,70
              525,185
              580,235
              635,180
              690,125
            "
            fill="none"
            stroke="#2563eb"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sweep */}
          <circle
            cx="430"
            cy="105"
            r="8"
            fill="#f59e0b"
          />

          <circle
            cx="475"
            cy="70"
            r="11"
            fill="#f97316"
          />

          {/* FVG */}
          <rect
            x="545"
            y="185"
            width="85"
            height="60"
            rx="10"
            fill="#dbeafe"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="6 5"
          />

          <text
            x="588"
            y="220"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#1d4ed8"
          >
            FVG
          </text>

          {/* Order Block */}
          <rect
            x="450"
            y="235"
            width="105"
            height="50"
            rx="10"
            fill="#dcfce7"
            stroke="#22c55e"
            strokeWidth="2"
          />

          <text
            x="503"
            y="258"
            textAnchor="middle"
            fontSize="10"
            fontWeight="900"
            fill="#15803d"
          >
            ORDER
          </text>

          <text
            x="503"
            y="273"
            textAnchor="middle"
            fontSize="10"
            fontWeight="900"
            fill="#15803d"
          >
            BLOCK
          </text>

        </svg>

      </div>

    </div>

  </div>

</div>

</section>

      {/* =====================================================
          DISCLAIMER
      ===================================================== */}

      <section className="mx-auto max-w-[1520px] px-4 pb-5 md:px-6 md:pb-7">
        <div className="rounded-[20px] border border-amber-200 bg-amber-50/70 px-4 py-3 md:px-5 md:py-4">
          <p className="text-[12px] font-bold leading-6 text-amber-900 md:text-[13px] md:leading-7">
            <strong className="font-black">تنبيه:</strong> هذا الدليل تعليمي
            فقط. لا توجد استراتيجية تضمن الربح، وقد تؤدي منتجات التداول ذات
            الرافعة المالية إلى خسائر كبيرة. اختبر أي منهج تداول جيدًا وافهم
            المخاطر قبل استخدام أموال حقيقية.
          </p>
        </div>
      </section>

      {/* =====================================================
    TABLE OF CONTENTS
===================================================== */}

<section className="mx-auto max-w-[1520px] px-4 pb-6 md:px-6 md:pb-8">
  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">

    {/* =========================
        HEADER
    ========================= */}
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7ff_100%)] px-4 py-3.5 md:px-7 md:py-6">

      <SectionLabel>محتويات الدليل</SectionLabel>

      <h2 className="mt-2.5 text-[21px] font-black leading-[1.4] text-slate-950 md:mt-3 md:text-[30px]">
        ماذا ستتعلم في شرح استراتيجية ICT؟
      </h2>

      <p className="mt-1.5 max-w-4xl text-[13px] leading-6 text-slate-600 md:mt-2 md:text-[15px] md:leading-8">
        يمكنك قراءة الدليل بالترتيب من البداية، أو الانتقال مباشرة إلى المفهوم الذي تريد فهمه.
      </p>

    </div>

    {/* =========================
        DESKTOP / TABLET
    ========================= */}
    <div className="hidden p-4 sm:block md:p-6">

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {toc.map((item) => (
          <a
  key={item.id}
  href={`#${item.id}`}
  className="group flex min-h-[60px] items-center gap-3 rounded-[16px] border border-slate-200 bg-white px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-sm"
>
  {/* Number — RIGHT SIDE */}
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-600 text-[11px] font-black text-white shadow-sm transition group-hover:bg-brand-500">
    {item.number}
  </div>

  {/* Label */}
  <span className="min-w-0 flex-1 text-right text-[13px] font-black leading-6 text-slate-900 transition group-hover:text-brand-600">
    {item.label}
  </span>
</a>
        ))}
      </div>

    </div>

    {/* =========================
    MOBILE — COMPACT ROWS
========================= */}
<div className="p-3 sm:hidden">

  <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

    {toc.map((item, index) => (
      <a
        key={item.id}
        href={`#${item.id}`}
        className={`group flex min-h-[50px] items-center gap-3 px-3.5 py-2 transition active:bg-brand-50 ${
          index !== toc.length - 1
            ? "border-b border-slate-100"
            : ""
        }`}
      >

        {/* Number — RIGHT SIDE */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white shadow-sm">
          {item.number}
        </div>

        {/* Label */}
        <span className="min-w-0 flex-1 text-[13px] font-black leading-5 text-slate-900">
          {item.label}
        </span>

        {/* Arrow */}
        <span className="shrink-0 text-[15px] font-bold text-slate-400 transition group-active:text-brand-600">
          ←
        </span>

      </a>
    ))}

  </div>

</div>


  </div>
</section>

      {/* =====================================================
          ARTICLE CONTAINER
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-4 pb-12 md:px-6 md:pb-16">
        <article className="space-y-6 md:space-y-8">
          {/* =================================================
    01 - WHAT IS ICT — PRO RESPONSIVE VERSION
================================================= */}

<section
  id="what-is-ict"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* =================================================
      HEADER — SAME FOR ALL DEVICES
  ================================================= */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <SectionLabel>01 — الأساس</SectionLabel>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      ما هي استراتيجية ICT في التداول؟
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
  <strong className="font-black text-slate-900">
    استراتيجية ICT
  </strong>{" "}
  هي منهج لتحليل حركة السعر يرتبط بمفهوم Inner Circle Trader، ويركز على فهم
  هيكل السوق والسيولة ومناطق عدم التوازن بدل الاعتماد على مؤشر فني واحد
  لإعطاء إشارات شراء وبيع.
</p>

  </div>

  {/* =================================================
      MOBILE VERSION
  ================================================= */}
  <div className="lg:hidden">

    {/* QUICK FACTS — MOBILE 2x2 */}
<div className="border-b border-slate-200 bg-white px-3 py-3">

  <div className="grid grid-cols-2 gap-2">

    {[
      {
        label: "نوع التحليل",
        value: "Price Action",
      },
      {
        label: "أهم عنصر",
        value: "Liquidity",
      },
      {
        label: "الصعوبة",
        value: "متوسط → متقدم",
      },
      {
        label: "الأسواق",
        value: "Forex وغيرها",
      },
    ].map((item) => (
      <div
        key={item.label}
        className="rounded-[13px] border border-slate-200 bg-slate-50/70 px-3 py-2"
      >
        <div className="text-[9px] font-black text-slate-500">
          {item.label}
        </div>

        <div className="mt-1 text-[12px] font-black leading-5 text-slate-950">
          {item.value}
        </div>
      </div>
    ))}

  </div>

</div>

    {/* MOBILE CONTENT */}
    <div className="px-4 py-4">

      {/* DIRECT ANSWER */}
      <div className="border-r-[3px] border-brand-500 pr-3">

        <h3 className="text-[16px] font-black leading-6 text-slate-950">
          تعريف ICT باختصار
        </h3>

        <p className="mt-1.5 text-justify text-[14px] leading-7 text-slate-700">
  يعتمد تحليل ICT على معرفة أين توجد السيولة وكيف يتحرك هيكل السعر، ثم ربط
  هذه المعلومات لبناء سيناريو تداول منظم.
</p>

      </div>

      {/* MAIN EXPLANATION */}
<p className="mt-4 text-justify text-[14px] leading-7 text-slate-700">
  عند دراسة ICT ستجد مفاهيم مثل السيولة (Liquidity)، وفجوة القيمة العادلة
  (FVG)، وكتلة الأوامر (Order Block)، إضافة إلى BOS وCHoCH. الهدف ليس
  استخدام كل مفهوم كإشارة منفصلة، بل ربط هذه المفاهيم معًا لفهم سياق حركة السعر.
</p>

      {/* MOBILE EXPANDER */}
      <details className="group mt-3">

        <summary className="flex cursor-pointer list-none items-center justify-between rounded-[13px] border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[12px] font-black text-brand-600">

          <span>
            اقرأ المزيد عن طريقة عمل ICT
          </span>

          <span className="text-[17px] leading-none transition group-open:rotate-45">
            +
          </span>

        </summary>

        <div className="px-1 pt-3">

          <p className="text-[14px] leading-7 text-slate-700">
            يبدأ التحليل عادةً بفهم الاتجاه وهيكل السوق، ثم تحديد القمم والقيعان
            التي قد تتجمع حولها السيولة. بعد ذلك يراقب المتداول رد فعل السعر،
            وهل ظهر تغير في الهيكل أو حركة قوية تركت منطقة مثل{" "}
            <strong className="font-black text-slate-950">
              FVG
            </strong>{" "}
            أو{" "}
            <strong className="font-black text-slate-950">
              Order Block
            </strong>
            .
          </p>

        </div>

      </details>

      {/* CORE IDEA */}
      <div className="mt-4 rounded-[16px] border border-brand-100 bg-brand-50/60 p-3.5">

        <div className="flex items-center gap-2.5">

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[13px] font-black text-white">
            !
          </div>

          <h3 className="text-[15px] font-black text-slate-950">
            ابدأ بهذه الثلاثة أولًا
          </h3>

        </div>

        <div className="mt-3 grid gap-2">

          <div className="flex items-start gap-2 text-[13px] leading-6 text-slate-700">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            <span>
              ما اتجاه وهيكل السوق؟
            </span>
          </div>

          <div className="flex items-start gap-2 text-[13px] leading-6 text-slate-700">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            <span>
              أين توجد السيولة؟
            </span>
          </div>

          <div className="flex items-start gap-2 text-[13px] leading-6 text-slate-700">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            <span>
              كيف تفاعل السعر بعد الوصول إليها؟
            </span>
          </div>

        </div>

      </div>

      {/* ICT INDICATOR */}
      <div className="mt-4 border-t border-slate-100 pt-3">

        <h3 className="text-[15px] font-black text-slate-950">
          هل ICT مؤشر فني؟
        </h3>

        <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
          لا. ICT ليس مؤشرًا يضاف إلى منصة التداول؛ بل يعتمد على{" "}
          <strong className="font-black text-slate-900">
            حركة السعر Price Action
          </strong>
          ، وهيكل السوق والسيولة والمناطق السعرية.
        </p>

      </div>

    </div>

  </div>

  {/* =================================================
      DESKTOP VERSION
  ================================================= */}
  <div className="hidden lg:block">

    <div className="p-7">

      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">

        {/* =========================
            MAIN TEXT
        ========================= */}
        <div className="min-w-0">

          {/* Direct Definition */}
          <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                ICT
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-[16px] font-black leading-6 text-slate-950">
                  تعريف ICT باختصار
                </h3>

                <p className="mt-2 text-[14px] leading-7 text-slate-700">
                  يعتمد تحليل ICT على قراءة{" "}
                  <strong className="font-black text-slate-900">
                    أين توجد السيولة، وكيف يتحرك هيكل السعر، وأين تظهر مناطق عدم التوازن
                  </strong>
                  ، ثم ربط هذه العناصر لبناء سيناريو تداول واضح.
                </p>

              </div>

            </div>

          </div>

          {/* Main Explanation */}
          <div className="mt-4 space-y-3 text-[15px] leading-8 text-slate-700">

            <p>
              عند دراسة ICT ستجد مصطلحات مثل{" "}
              <strong className="font-black text-slate-950">
                Liquidity
              </strong>
              ،{" "}
              <strong className="font-black text-slate-950">
                Fair Value Gap (FVG)
              </strong>
              ،{" "}
              <strong className="font-black text-slate-950">
                Order Block
              </strong>
              ،{" "}
              <strong className="font-black text-slate-950">
                Break of Structure (BOS)
              </strong>{" "}
              و{" "}
              <strong className="font-black text-slate-950">
                Change of Character (CHoCH)
              </strong>
              . هذه المفاهيم لا تستخدم عادةً بشكل منفصل، بل تربط معًا لفهم
              السياق الذي يتحرك داخله السعر.
            </p>

            <p>
              يبدأ التحليل عادة بفهم الاتجاه وهيكل السوق، ثم تحديد القمم
              والقيعان التي قد تتجمع حولها السيولة. بعد ذلك يراقب المتداول
              تفاعل السعر مع هذه المناطق، وهل ظهر تغير في الهيكل أو حركة قوية
              تركت منطقة مثل{" "}
              <strong className="font-black text-slate-950">
                FVG
              </strong>{" "}
              أو{" "}
              <strong className="font-black text-slate-950">
                Order Block
              </strong>
              .
            </p>

          </div>

          {/* Core Idea */}
          <div className="mt-4 rounded-[18px] border border-blue-200 bg-blue-50/60 p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[14px] font-black text-white">
                !
              </div>

              <div>

                <h3 className="text-[16px] font-black leading-6 text-slate-950">
                  الفكرة التي يجب أن تفهمها أولًا
                </h3>

                <p className="mt-2 text-[14px] leading-7 text-slate-700">
                  لا تبدأ بحفظ عشرات نماذج ICT. ركز أولًا على ثلاثة أسئلة:
                  <strong className="font-black text-slate-950">
                    {" "}
                    ما اتجاه وهيكل السوق؟ أين توجد السيولة؟ وكيف كان رد فعل السعر بعد الوصول إليها؟
                  </strong>
                </p>

              </div>

            </div>

          </div>

          {/* SEO Question */}
          <div className="mt-4 border-r-[3px] border-brand-500 pr-3">

            <h3 className="text-[15px] font-black text-slate-950">
              هل ICT مؤشر فني؟
            </h3>

            <p className="mt-1.5 text-[14px] leading-7 text-slate-600">
              لا. ICT ليس مؤشرًا يتم إضافته إلى منصة التداول، بل يعتمد بصورة
              أساسية على{" "}
              <strong className="font-black text-slate-900">
                حركة السعر Price Action
              </strong>
              ، وهيكل السوق والسيولة والتوقيت والمناطق السعرية التي يحددها
              المتداول على الرسم البياني.
            </p>

          </div>

        </div>

        {/* =========================
            DESKTOP SIDE FACTS
        ========================= */}
        <aside>

          <div className="space-y-2.5">

            {[
              {
                label: "نوع التحليل",
                value: "Price Action",
                text: "قراءة حركة السعر والسياق",
              },
              {
                label: "أهم عنصر",
                value: "Liquidity",
                text: "تحديد أماكن تجمع السيولة",
              },
              {
                label: "مستوى الصعوبة",
                value: "متوسط → متقدم",
                text: "يحتاج تدريبًا ومراجعة للشارتات",
              },
              {
                label: "الأسواق",
                value: "Forex وغيرها",
                text: "يمكن تطبيق المفاهيم على أسواق متعددة",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3"
              >

                <div className="text-[10px] font-black text-slate-500">
                  {item.label}
                </div>

                <div className="mt-1 text-[15px] font-black text-slate-950">
                  {item.value}
                </div>

                <div className="mt-1 text-[11px] leading-5 text-slate-500">
                  {item.text}
                </div>

              </div>
            ))}

          </div>

        </aside>

      </div>

    </div>

  </div>

</section>

         {/* =================================================
    02 - HOW ICT WORKS
================================================= */}

<section
  id="how-it-works"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* =================================================
      HEADER
  ================================================= */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <SectionLabel>02 — الصورة الكاملة</SectionLabel>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      كيف تعمل استراتيجية ICT خطوة بخطوة؟
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      لفهم طريقة عمل استراتيجية ICT، لا تبدأ بالبحث مباشرة عن FVG أو
      Order Block. ابدأ بالصورة الأكبر: حدد اتجاه وهيكل السوق، ثم مواقع
      السيولة، وانتظر رد فعل السعر، وبعدها ابحث عن تغير في الهيكل ومنطقة
      مناسبة لتنفيذ الصفقة.
    </p>

  </div>

  <div className="p-4 md:p-7">

    {/* =================================================
        DESKTOP STEPS
    ================================================= */}
    <div className="hidden md:grid md:grid-cols-5 md:gap-3">

      {[
        {
          no: "01",
          title: "حدد السياق",
          text: "ابدأ بتحديد اتجاه وهيكل السوق على إطار زمني مناسب، ولا تبدأ من إشارة دخول صغيرة ومعزولة.",
        },
        {
          no: "02",
          title: "حدد السيولة",
          text: "راقب القمم والقيعان الواضحة والمناطق التي قد تتجمع حولها أوامر السوق.",
        },
        {
          no: "03",
          title: "راقب سحب السيولة",
          text: "انتظر وصول السعر إلى منطقة السيولة وراقب هل يسحبها ثم يغيّر سلوكه.",
        },
        {
          no: "04",
          title: "ابحث عن التأكيد",
          text: "راقب تغير هيكل السوق وظهور منطقة اهتمام مثل FVG أو Order Block.",
        },
        {
          no: "05",
          title: "خطط للتنفيذ",
          text: "حدد نقطة الدخول ووقف الخسارة والهدف وحجم المخاطرة قبل تنفيذ الصفقة.",
        },
      ].map((step) => (
        <article
          key={step.no}
          className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="absolute right-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#1e5bb8_0%,#60a5fa_100%)]" />

          {/* NUMBER + TITLE SAME ROW */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-600 text-[11px] font-black text-white">
              {step.no}
            </div>

            <h3 className="text-[16px] font-black leading-6 text-slate-950">
              {step.title}
            </h3>

          </div>

          <p className="mt-3 text-justify text-[13px] leading-6 text-slate-600">
            {step.text}
          </p>

        </article>
      ))}

    </div>

    {/* =================================================
        MOBILE STEPS — COMPACT TIMELINE
    ================================================= */}
    <div className="md:hidden">

      <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

        {[
          {
            no: "01",
            title: "حدد السياق",
            text: "ابدأ باتجاه وهيكل السوق، وليس بإشارة دخول صغيرة.",
          },
          {
            no: "02",
            title: "حدد السيولة",
            text: "راقب القمم والقيعان التي قد تتجمع حولها أوامر السوق.",
          },
          {
            no: "03",
            title: "راقب سحب السيولة",
            text: "انتظر تفاعل السعر مع المنطقة بدل توقع الانعكاس مسبقًا.",
          },
          {
            no: "04",
            title: "ابحث عن التأكيد",
            text: "راقب تغير الهيكل وظهور FVG أو Order Block مناسب.",
          },
          {
            no: "05",
            title: "خطط للتنفيذ",
            text: "حدد الدخول ووقف الخسارة والهدف والمخاطرة قبل الصفقة.",
          },
        ].map((step, index) => (
          <div
            key={step.no}
            className={`px-3.5 py-3 ${
              index !== 4 ? "border-b border-slate-100" : ""
            }`}
          >

            {/* NUMBER + TITLE */}
            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                {step.no}
              </div>

              <h3 className="text-[15px] font-black leading-6 text-slate-950">
                {step.title}
              </h3>

            </div>

            <p className="mt-1.5 pr-11 text-justify text-[12px] leading-6 text-slate-600">
              {step.text}
            </p>

          </div>
        ))}

      </div>

    </div>

    {/* =================================================
        BEGINNER NOTE
    ================================================= */}
    <div className="mt-4 rounded-[17px] border border-brand-100 bg-brand-50/50 p-4">

      <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
        كيف يفكر متداول ICT عمليًا؟
      </h3>

      <p className="mt-2 text-justify text-[13px] leading-7 text-slate-700 md:text-[14px]">
        لنفترض أن السوق صاعد، لكن السعر يقترب من قاع واضح توجد تحته سيولة.
        بدل الشراء فورًا، ينتظر المتداول وصول السعر إلى هذا القاع وسحب
        السيولة، ثم يراقب هل حدث تغير في هيكل السوق. إذا ظهرت بعد ذلك منطقة
        مثل FVG أو Order Block تتوافق مع السيناريو، يبدأ التفكير في نقطة
        الدخول وإدارة المخاطر.
      </p>

    </div>

    {/* =================================================
        CHART
    ================================================= */}
    <div className="mt-5">
      <ICTOverviewChart />
    </div>

  </div>

</section>

          {/* =================================================
    03 - MARKET STRUCTURE
================================================= */}

<section
  id="market-structure"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* HEADER */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">
    <SectionLabel>03 — Market Structure</SectionLabel>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      هيكل السوق في استراتيجية ICT
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      قبل البحث عن السيولة أو FVG أو Order Block، يجب أولًا فهم اتجاه وهيكل
      السوق. قراءة القمم والقيعان تساعدك على معرفة ما إذا كانت حركة السعر
      صاعدة أو هابطة أو غير واضحة، وهي نقطة البداية قبل الانتقال إلى بقية
      مفاهيم ICT.
    </p>
  </div>

  <div className="p-4 md:p-7">

    {/* =============================================
        DESKTOP QUICK COMPARISON
    ============================================= */}
    <div className="hidden md:grid md:grid-cols-2 md:gap-4">

      {/* Bullish */}
      <div className="rounded-[20px] border border-green-100 bg-green-50/50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wide text-green-700">
              Bullish Structure
            </span>

            <h3 className="mt-1.5 text-[20px] font-black text-slate-950">
              الهيكل الصاعد
            </h3>
          </div>

          <div className="flex gap-2">
            <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-green-700">
              HH
            </span>
            <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-green-700">
              HL
            </span>
          </div>
        </div>

        <p className="mt-3 text-justify text-[14px] leading-7 text-slate-700">
          يظهر الهيكل الصاعد عندما ينجح السعر في تكوين
          <strong className="font-black text-slate-900"> قمم أعلى </strong>
          وقيعان أعلى بصورة متتابعة. في الصورة المبسطة، يعني ذلك أن المشترين
          ما زالوا قادرين على دفع السعر إلى مستويات أعلى.
        </p>

        <div className="mt-3 text-[11px] text-green-800">
          HH = Higher High &nbsp; • &nbsp; HL = Higher Low
        </div>
      </div>

      {/* Bearish */}
      <div className="rounded-[20px] border border-rose-100 bg-rose-50/50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wide text-rose-700">
              Bearish Structure
            </span>

            <h3 className="mt-1.5 text-[20px] font-black text-slate-950">
              الهيكل الهابط
            </h3>
          </div>

          <div className="flex gap-2">
            <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-rose-700">
              LH
            </span>
            <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-rose-700">
              LL
            </span>
          </div>
        </div>

        <p className="mt-3 text-justify text-[14px] leading-7 text-slate-700">
          يظهر الهيكل الهابط عندما تتحول حركة السعر إلى
          <strong className="font-black text-slate-900"> قمم أدنى </strong>
          وقيعان أدنى بصورة متتابعة. وهذا يشير في الصورة المبسطة إلى استمرار
          سيطرة البائعين على حركة السعر.
        </p>

        <div className="mt-3 text-[11px] text-rose-800">
          LH = Lower High &nbsp; • &nbsp; LL = Lower Low
        </div>
      </div>

    </div>

    {/* =============================================
        MOBILE QUICK COMPARISON
    ============================================= */}
    <div className="md:hidden">

      <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

        {/* Bullish row */}
        <div className="border-b border-slate-100 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[9px] font-black uppercase text-green-700">
                Bullish Structure
              </span>

              <h3 className="mt-1 text-[16px] font-black text-slate-950">
                الهيكل الصاعد
              </h3>
            </div>

            <div className="flex gap-1.5">
              <span className="rounded-lg bg-green-50 px-2 py-1 text-[9px] font-black text-green-700">
                HH
              </span>
              <span className="rounded-lg bg-green-50 px-2 py-1 text-[9px] font-black text-green-700">
                HL
              </span>
            </div>
          </div>

          <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
            قمم أعلى وقيعان أعلى بصورة متتابعة تعني هيكلًا صاعدًا في صورته
            المبسطة.
          </p>
        </div>

        {/* Bearish row */}
        <div className="p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[9px] font-black uppercase text-rose-700">
                Bearish Structure
              </span>

              <h3 className="mt-1 text-[16px] font-black text-slate-950">
                الهيكل الهابط
              </h3>
            </div>

            <div className="flex gap-1.5">
              <span className="rounded-lg bg-rose-50 px-2 py-1 text-[9px] font-black text-rose-700">
                LH
              </span>
              <span className="rounded-lg bg-rose-50 px-2 py-1 text-[9px] font-black text-rose-700">
                LL
              </span>
            </div>
          </div>

          <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
            قمم أدنى وقيعان أدنى بصورة متتابعة تعني هيكلًا هابطًا في صورته
            المبسطة.
          </p>
        </div>

      </div>

    </div>

    {/* =============================================
        IMPORTANT NOTE
    ============================================= */}
    <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
          !
        </div>

        <div className="min-w-0">
          <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
            لا تعتبر كل حركة صغيرة هيكلًا جديدًا
          </h3>

          <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
            من أكثر الأخطاء شيوعًا عند المبتدئين تغيير قراءة السوق مع كل شمعة.
            اختر أولًا الإطار الزمني الذي ستستخدمه لتحليل السياق، ثم استخدم
            إطارًا أصغر فقط إذا كنت تحتاجه لتحسين نقطة التنفيذ.
          </p>
        </div>
      </div>
    </div>

    {/* =============================================
        CHART — FULL WIDTH
    ============================================= */}
    <div className="mt-5">
      <MarketStructureChart />
    </div>

  </div>
</section>

          {/* =================================================
    04 - LIQUIDITY
================================================= */}

<section
  id="liquidity"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* =================================================
      HEADER
  ================================================= */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black text-amber-700">
      04 — Liquidity
    </span>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      ما هي السيولة Liquidity في استراتيجية ICT؟
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      السيولة من أهم مفاهيم استراتيجية ICT. بصورة مبسطة، يبحث المتداول عن
      المناطق التي قد تتجمع حولها أوامر كثيرة، مثل القمم والقيعان الواضحة،
      لأن تفاعل السعر مع هذه المناطق يساعد على فهم ما قد يحدث بعد ذلك.
    </p>

  </div>

  <div className="p-4 md:p-7">

    {/* =================================================
        BUY / SELL LIQUIDITY
    ================================================= */}
    <div className="grid gap-3 md:grid-cols-2">

      {/* Buy-side */}
      <div className="rounded-[18px] border border-amber-200 bg-amber-50/50 p-4">

        <div className="flex items-center justify-between gap-3">

          <div>
            <span className="text-[9px] font-black uppercase text-amber-700">
              Buy-side
            </span>

            <h3 className="mt-1 text-[17px] font-black text-slate-950">
              سيولة الشراء Buy-side Liquidity
            </h3>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-amber-500 text-[11px] font-black text-white">
            BSL
          </div>

        </div>

        <p className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
          توجد عادةً فوق قمم سابقة أو قمم متقاربة. قد تحتوي هذه المنطقة على
          أوامر وقف خسارة للبائعين وأوامر شراء مرتبطة باختراق القمم.
        </p>

      </div>

      {/* Sell-side */}
      <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

        <div className="flex items-center justify-between gap-3">

          <div>
            <span className="text-[9px] font-black uppercase text-brand-600">
              Sell-side
            </span>

            <h3 className="mt-1 text-[17px] font-black text-slate-950">
              سيولة البيع Sell-side Liquidity
            </h3>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-600 text-[11px] font-black text-white">
            SSL
          </div>

        </div>

        <p className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
          توجد عادةً أسفل قيعان سابقة أو قيعان متقاربة، حيث يمكن أن تتجمع
          أوامر وقف خسارة المشترين وأوامر البيع المرتبطة بكسر القيعان.
        </p>

      </div>

    </div>

    {/* =================================================
        WHERE LIQUIDITY FORMS
    ================================================= */}
    <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

      <h3 className="text-[16px] font-black text-slate-950">
        أين يبحث متداول ICT عن السيولة؟
      </h3>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">

        {[
          "فوق القمم السابقة",
          "أسفل القيعان السابقة",
          "Equal Highs / Equal Lows",
          "قمم وقيعان الجلسات",
          "مستويات سعرية واضحة",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />

            <span className="text-[12px] font-bold leading-5 text-slate-700">
              {item}
            </span>
          </div>
        ))}

      </div>

    </div>

    {/* =================================================
        CHART
    ================================================= */}
    <div className="mt-5">
      <LiquidityChart />
    </div>

    {/* =================================================
        BOTTOM NOTES
    ================================================= */}
    <div className="mt-4 grid gap-3 md:grid-cols-2">

      {/* Important */}
      <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

        <div className="flex items-start gap-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
            !
          </div>

          <div>
            <h3 className="text-[15px] font-black leading-6 text-slate-950">
              Liquidity Sweep لا يعني انعكاسًا مضمونًا
            </h3>

            <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600">
              تجاوز السعر لقمة أو قاع لا يكفي للدخول عكس الحركة. يمكن للسعر
              سحب السيولة ثم مواصلة الاتجاه نفسه، لذلك يجب قراءة السحب مع
              هيكل السوق ورد فعل السعر والتأكيدات الأخرى.
            </p>
          </div>

        </div>

      </div>

      {/* Internal link */}
      <div className="rounded-[18px] border border-slate-200 bg-white p-4">

        <h3 className="text-[15px] font-black text-slate-950">
          تريد فهم السيولة بصورة أعمق؟
        </h3>

        <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600">
          لدينا دليل مستقل يشرح مفهوم السيولة في التداول، أماكن ظهورها،
          وكيفية قراءتها قبل الانتقال إلى تطبيقات ICT المتقدمة.
        </p>

        <Link
          href="/learn-trading/liquidity"
          className="mt-3 inline-flex items-center gap-2 text-[12px] font-black text-brand-600 hover:underline"
        >
          اقرأ شرح السيولة في التداول
          <span aria-hidden="true">←</span>
        </Link>

      </div>

    </div>

  </div>
</section>

          {/* =================================================
    05 - FAIR VALUE GAP
================================================= */}

<section
  id="fvg"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* HEADER */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
      05 — Fair Value Gap
    </span>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      ما هي فجوة القيمة العادلة FVG في استراتيجية ICT؟
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      فجوة القيمة العادلة أو Fair Value Gap هي منطقة عدم توازن سعري تظهر
      عندما يتحرك السعر بسرعة ويترك منطقة لم يحدث فيها تداخل كامل بين نطاق
      ثلاث شموع متتابعة. يراقب متداولو ICT هذه المناطق لأنها قد تصبح مناطق
      اهتمام عند عودة السعر إليها لاحقًا.
    </p>

  </div>

  <div className="p-4 md:p-7">

    {/* =================================================
        THREE KEY IDEAS
    ================================================= */}
    <div className="grid gap-3 md:grid-cols-3">

      <div className="rounded-[18px] border border-blue-100 bg-blue-50/50 p-4">

        <span className="text-[9px] font-black uppercase text-blue-700">
          01 — Formation
        </span>

        <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
          كيف تتكوّن FVG؟
        </h3>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
          نراقب ثلاث شموع. عندما تكون الحركة الوسطى قوية وتترك منطقة بين
          الشمعة الأولى والثالثة بدون تداخل كامل، تظهر فجوة القيمة العادلة.
        </p>

      </div>

      <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

        <span className="text-[9px] font-black uppercase text-slate-500">
          02 — Purpose
        </span>

        <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
          لماذا يراقبها المتداول؟
        </h3>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
          لأنها قد تمثل منطقة يعود إليها السعر لإعادة اختبار جزء من عدم
          التوازن قبل مواصلة الحركة أو تغيير سلوكه.
        </p>

      </div>

      <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

        <span className="text-[9px] font-black uppercase text-brand-600">
          03 — Context
        </span>

        <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
          متى تصبح أكثر أهمية؟
        </h3>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
          عندما تتوافق FVG مع اتجاه السوق والسيولة وهيكل السعر ومنطقة اهتمام
          واضحة ضمن سيناريو التداول.
        </p>

      </div>

    </div>

    {/* =================================================
        BEGINNER NOTE
    ================================================= */}
    <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4">

      <h3 className="text-[15px] font-black text-slate-950">
        ماذا يعني “عدم التوازن” للمبتدئ؟
      </h3>

      <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
        عندما يتحرك السعر بسرعة شديدة في اتجاه واحد، قد يمر عبر بعض المستويات
        بدون تداول متوازن بينها. في نموذج FVG نحاول تحديد هذه المنطقة بصريًا
        من خلال العلاقة بين الشموع الثلاث، وليس باعتبارها “فراغًا” حقيقيًا في
        السعر مثل فجوات افتتاح الأسواق.
      </p>

    </div>

    {/* =================================================
        CHART
    ================================================= */}
    <div className="mt-5">
      <FVGChart />
    </div>

    {/* =================================================
        WARNING
    ================================================= */}
    <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
          !
        </div>

        <div>
          <h3 className="text-[15px] font-black leading-6 text-slate-950">
            لا تعتبر كل FVG فرصة دخول
          </h3>

          <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
            وجود فجوة قيمة عادلة لا يعني أن السعر سيعود إليها أو يحترمها
            حتمًا. بعض المناطق يتم تجاوزها بالكامل، لذلك يجب ربط FVG بالاتجاه
            وهيكل السوق والسيولة وبقية شروط نموذج التداول.
          </p>
        </div>

      </div>

    </div>

  </div>
</section>

          {/* =================================================
    06 - ORDER BLOCK
================================================= */}

<section
  id="order-block"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* HEADER */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fff9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-black text-green-700">
      06 — Order Block
    </span>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      ما هو Order Block في استراتيجية ICT؟
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      يستخدم مصطلح Order Block لوصف منطقة سعرية مرتبطة بحركة قوية حدثت
      بعدها. في التطبيق العملي لا يكفي اختيار آخر شمعة صاعدة أو هابطة؛
      الأفضل أن تكون المنطقة منطقية داخل السياق وأن ترتبط بحركة واضحة
      في السعر أو الهيكل.
    </p>
  </div>

  <div className="p-4 md:p-7">

    {/* TYPES */}
    <div className="grid gap-3 md:grid-cols-2">

      <div className="rounded-[18px] border border-green-100 bg-green-50/50 p-4">
        <span className="text-[9px] font-black uppercase text-green-700">
          Bullish
        </span>

        <h3 className="mt-1 text-[17px] font-black text-slate-950">
          Bullish Order Block
        </h3>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
          في التفسير المبسط، قد تكون منطقة هبوط سبقت اندفاعًا صاعدًا قويًا
          أحدث تغيرًا أو كسرًا مهمًا في هيكل السوق.
        </p>
      </div>

      <div className="rounded-[18px] border border-rose-100 bg-rose-50/50 p-4">
        <span className="text-[9px] font-black uppercase text-rose-700">
          Bearish
        </span>

        <h3 className="mt-1 text-[17px] font-black text-slate-950">
          Bearish Order Block
        </h3>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
          في التفسير المبسط، قد تكون منطقة صعود سبقت هبوطًا قويًا غيّر
          بنية السوق أو كسر مستوى مهمًا.
        </p>
      </div>

    </div>

    {/* BEGINNER RULE */}
    <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">
      <div className="flex items-start gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
          !
        </div>

        <div>
          <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
            السياق أهم من شكل الشمعة
          </h3>

          <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
            لا تضع Order Block على كل شمعة سبقت حركة قوية. اسأل أولًا:
            هل ظهرت سيولة مهمة؟ هل حدث Displacement واضح؟ وهل تغير أو
            انكسر هيكل السوق؟ كلما توافقت هذه العناصر أصبح للمنطقة معنى أكبر.
          </p>
        </div>

      </div>
    </div>

    {/* WHAT TO LOOK FOR */}
    <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

      <h3 className="text-[15px] font-black text-slate-950">
        كيف يقيّم المبتدئ Order Block؟
      </h3>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

        {[
          "وجود سياق واضح",
          "حركة Displacement قوية",
          "تغير أو كسر في الهيكل",
          "توافق مع السيولة",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />

            <span className="text-[12px] font-bold leading-5 text-slate-700">
              {item}
            </span>
          </div>
        ))}

      </div>

    </div>

    {/* CHART */}
    <div className="mt-5">
      <OrderBlockChart />
    </div>

  </div>
</section>

          {/* =================================================
    07 - BOS / CHOCH
================================================= */}

<section
  id="bos-choch"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* HEADER */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fff8fa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-black text-rose-700">
      07 — BOS & CHoCH
    </span>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      ما الفرق بين BOS وCHoCH في استراتيجية ICT؟
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      يستخدم متداولو ICT وSmart Money Concepts مصطلحي Break of Structure
      وChange of Character لوصف تغيرات مهمة في هيكل السوق. بصورة مبسطة،
      CHoCH قد يشير إلى تغير مبكر في سلوك السعر، بينما يستخدم BOS غالبًا
      لوصف كسر هيكلي أكثر وضوحًا.
    </p>

  </div>

  <div className="p-4 md:p-7">

    {/* =================================================
        COMPARISON
    ================================================= */}
    <div className="grid gap-3 md:grid-cols-2">

      {/* BOS */}
      <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

        <div className="flex items-center justify-between gap-3">

          <div>
            <span className="text-[9px] font-black uppercase text-brand-600">
              Break of Structure
            </span>

            <h3 className="mt-1 text-[17px] font-black text-slate-950">
              BOS — كسر الهيكل
            </h3>
          </div>

          <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[10px] font-black text-white">
            BOS
          </span>

        </div>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
          يستخدم غالبًا لوصف كسر مستوى هيكلي مهم، وقد يدعم فكرة استمرار
          الاتجاه عندما يحدث في نفس اتجاه السياق العام.
        </p>

      </div>

      {/* CHOCH */}
      <div className="rounded-[18px] border border-rose-100 bg-rose-50/50 p-4">

        <div className="flex items-center justify-between gap-3">

          <div>
            <span className="text-[9px] font-black uppercase text-rose-600">
              Change of Character
            </span>

            <h3 className="mt-1 text-[17px] font-black text-slate-950">
              CHoCH — تغير السلوك
            </h3>
          </div>

          <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-black text-white">
            CHoCH
          </span>

        </div>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
          يشير عادةً إلى تغير مبكر في سلوك وهيكل السعر، وقد ينبه إلى أن
          الاتجاه السابق بدأ يفقد قوته.
        </p>

      </div>

    </div>

    {/* =================================================
        QUICK DIFFERENCE
    ================================================= */}
    <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

      <h3 className="text-[15px] font-black text-slate-950">
        الفرق المبسط للمبتدئ
      </h3>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">

        <div className="rounded-[12px] border border-rose-100 bg-white px-3 py-2.5">
          <span className="text-[12px] leading-5 text-slate-700">
            <strong className="font-black text-rose-700">CHoCH:</strong>{" "}
            تنبيه مبكر إلى تغير في سلوك الهيكل.
          </span>
        </div>

        <div className="rounded-[12px] border border-brand-100 bg-white px-3 py-2.5">
          <span className="text-[12px] leading-5 text-slate-700">
            <strong className="font-black text-brand-700">BOS:</strong>{" "}
            كسر هيكلي أكثر وضوحًا داخل الحركة.
          </span>
        </div>

      </div>

    </div>

    {/* CHART */}
    <div className="mt-5">
      <BOSCHoCHChart />
    </div>

  </div>
</section>

          {/* =================================================
    08 - ICT KILL ZONES
================================================= */}

<section
  id="kill-zones"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* =================================================
      HEADER
  ================================================= */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <SectionLabel>08 — التوقيت</SectionLabel>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      ما هي مناطق ICT Kill Zones؟
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      مناطق ICT Kill Zones هي فترات زمنية يركز عليها بعض متداولي ICT بسبب
      ارتفاع نشاط السوق والسيولة خلال أوقات معينة من جلسات التداول.
      الفكرة ليست أن الصفقة يجب أن تحدث خلال هذه الفترات، بل أن التوقيت
      يمكن استخدامه كعامل إضافي ضمن نموذج التداول.
    </p>

  </div>


  <div className="p-4 md:p-7">

    {/* =================================================
        DESKTOP
    ================================================= */}
    <div className="hidden md:grid md:grid-cols-3 md:gap-3">

      {/* LONDON */}
      <div className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">

        <span className="text-[10px] font-black text-slate-500">
          جلسة تداول
        </span>

        <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
          جلسة لندن
        </h3>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
          بداية النشاط الأوروبي تحظى باهتمام متداولي الفوركس بسبب ارتفاع
          السيولة والنشاط مع افتتاح الأسواق الأوروبية.
        </p>

      </div>


      {/* NEW YORK */}
      <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

        <span className="text-[10px] font-black text-brand-600">
          جلسة تداول
        </span>

        <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
          جلسة نيويورك
        </h3>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
          الفترة الأمريكية مهمة خصوصًا عند تداخلها مع جلسة لندن أو عند صدور
          بيانات اقتصادية مؤثرة قد تزيد حركة السوق.
        </p>

      </div>


      {/* TIMEZONE */}
      <div className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

        <span className="text-[10px] font-black text-amber-700">
          ملاحظة مهمة
        </span>

        <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
          انتبه للمنطقة الزمنية
        </h3>

        <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
          أوقات الجلسات تتغير حسب المنطقة الزمنية والتوقيت الصيفي، لذلك
          لا تعتمد على ساعات ثابتة طوال العام قبل التأكد من توقيت السوق.
        </p>

      </div>

    </div>


    {/* =================================================
        MOBILE
    ================================================= */}
    <div className="md:hidden">

      <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

        {/* LONDON */}
        <div className="border-b border-slate-100 p-3.5">

          <div className="flex items-start justify-between gap-3">

            <div>
              <span className="text-[9px] font-black text-slate-500">
                جلسة تداول
              </span>

              <h3 className="mt-1 text-[16px] font-black text-slate-950">
                جلسة لندن
              </h3>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-slate-100 text-[11px] font-black text-slate-700">
              01
            </div>

          </div>

          <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
            يزداد النشاط والسيولة عادةً مع بداية التداول الأوروبي، لذلك
            يراقب بعض متداولي ICT هذه الفترة.
          </p>

        </div>


        {/* NEW YORK */}
        <div className="p-3.5">

          <div className="flex items-start justify-between gap-3">

            <div>
              <span className="text-[9px] font-black text-brand-600">
                جلسة تداول
              </span>

              <h3 className="mt-1 text-[16px] font-black text-slate-950">
                جلسة نيويورك
              </h3>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[11px] font-black text-white">
              02
            </div>

          </div>

          <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600">
            تحظى الفترة الأمريكية باهتمام أكبر عند تداخلها مع لندن أو عند
            صدور بيانات اقتصادية مهمة.
          </p>

        </div>

      </div>


      {/* TIMEZONE MOBILE */}
      <div className="mt-3 rounded-[16px] border border-amber-100 bg-amber-50/50 p-3.5">

        <div className="flex items-start gap-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[13px] font-black text-white">
            !
          </div>

          <div>
            <h3 className="text-[15px] font-black text-slate-950">
              انتبه للمنطقة الزمنية
            </h3>

            <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600">
              توقيت جلسات التداول يتغير مع التوقيت الصيفي والمنطقة الزمنية،
              لذلك تحقق دائمًا من الوقت المحلي قبل الاعتماد على ساعات محددة.
            </p>
          </div>

        </div>

      </div>

    </div>


    {/* =================================================
        IMPORTANT CONCEPT
    ================================================= */}
    <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
          !
        </div>

        <div className="min-w-0">

          <h3 className="text-[15px] font-black leading-6 text-slate-950 md:text-[16px]">
            التوقيت عامل مساعد وليس استراتيجية مستقلة
          </h3>

          <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
            وجود السعر داخل إحدى فترات Kill Zones لا يعني وجود فرصة تداول.
            إذا لم يكن هناك سياق واضح أو سيولة أو تأكيد في هيكل السوق،
            فإن مجرد دخول جلسة لندن أو نيويورك لا يكفي لاتخاذ قرار.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

          {/* =================================================
    09 - COMPLETE EXAMPLE
================================================= */}

<section
  id="example"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* =================================================
      HEADER
  ================================================= */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <SectionLabel>09 — مثال تطبيقي</SectionLabel>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      مثال عملي على استراتيجية ICT خطوة بخطوة
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      الآن نجمع أهم مفاهيم استراتيجية ICT في سيناريو افتراضي واحد، بدءًا
      من قراءة هيكل السوق وتحديد السيولة، وصولًا إلى انتظار التأكيد ووضع
      خطة للدخول وإدارة المخاطر. المثال تعليمي فقط وليس إشارة تداول.
    </p>

  </div>


  <div className="p-4 md:p-7">

    {/* =================================================
        DESKTOP STEPS
    ================================================= */}
    <div className="hidden md:grid md:grid-cols-5 md:gap-3">

      {[
        {
          no: "01",
          title: "حدد الهيكل",
          text: "السوق يتحرك ضمن سياق صاعد على الإطار الزمني الأعلى.",
        },
        {
          no: "02",
          title: "حدد السيولة",
          text: "يوجد قاع واضح قد تتجمع أسفله سيولة البيع.",
        },
        {
          no: "03",
          title: "انتظر السحب",
          text: "يهبط السعر أسفل القاع ثم يعود سريعًا فوق المنطقة.",
        },
        {
          no: "04",
          title: "راقب التحول",
          text: "يظهر CHoCH صاعد مع حركة قوية وFVG.",
        },
        {
          no: "05",
          title: "خطط للصفقة",
          text: "راقب العودة إلى منطقة الاهتمام وحدد الدخول والوقف والهدف.",
        },
      ].map((item) => (
        <article
          key={item.no}
          className="rounded-[17px] border border-slate-200 bg-white p-3.5"
        >

          {/* NUMBER + TITLE SAME ROW */}
          <div className="flex items-center gap-2.5">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
              {item.no}
            </div>

            <h3 className="text-[15px] font-black leading-6 text-slate-950">
              {item.title}
            </h3>

          </div>

          <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
            {item.text}
          </p>

        </article>
      ))}

    </div>


    {/* =================================================
        MOBILE STEPS — COMPACT
    ================================================= */}
    <div className="md:hidden">

      <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

        {[
          {
            no: "01",
            title: "حدد الهيكل",
            text: "تأكد أولًا من السياق العام واتجاه هيكل السوق.",
          },
          {
            no: "02",
            title: "حدد السيولة",
            text: "ابحث عن قاع واضح قد توجد أسفله سيولة.",
          },
          {
            no: "03",
            title: "انتظر سحب السيولة",
            text: "راقب هبوط السعر أسفل القاع ثم عودته.",
          },
          {
            no: "04",
            title: "راقب التحول",
            text: "ابحث عن تغير في الهيكل وحركة صاعدة واضحة.",
          },
          {
            no: "05",
            title: "خطط للصفقة",
            text: "حدد منطقة الدخول ووقف الخسارة والهدف قبل التنفيذ.",
          },
        ].map((item, index) => (
          <div
            key={item.no}
            className={`px-3.5 py-3 ${
              index !== 4 ? "border-b border-slate-100" : ""
            }`}
          >

            {/* NUMBER + TITLE */}
            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                {item.no}
              </div>

              <h3 className="text-[15px] font-black leading-6 text-slate-950">
                {item.title}
              </h3>

            </div>

            <p className="mt-1.5 pr-11 text-justify text-[12px] leading-6 text-slate-600">
              {item.text}
            </p>

          </div>
        ))}

      </div>

    </div>


    {/* =================================================
        BEGINNER LOGIC
    ================================================= */}
    <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

      <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
        الفكرة ليست البحث عن إشارة واحدة
      </h3>

      <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
        المثال يجمع عدة عناصر في تسلسل واحد: سياق السوق، ثم السيولة، ثم
        سحبها، وبعد ذلك تغير الهيكل ومنطقة الاهتمام. كل عنصر يدعم السيناريو،
        بدل الاعتماد على FVG أو Order Block وحدهما لاتخاذ قرار.
      </p>

    </div>


    {/* =================================================
        CHART
    ================================================= */}
    <div className="mt-5">
      <ICTTradeExampleChart />
    </div>

  </div>

</section>

          {/* =================================================
    10 - RISK MANAGEMENT
================================================= */}

<section
  id="risk-management"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* =================================================
      HEADER
  ================================================= */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black text-orange-700">
      10 — إدارة المخاطر
    </span>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      إدارة المخاطر في استراتيجية ICT: وقف الخسارة وحجم الصفقة
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      حتى أفضل تحليل باستخدام استراتيجية ICT يمكن أن يفشل، لذلك يجب تحديد
      مقدار المخاطرة ووقف الخسارة وحجم الصفقة قبل الدخول. الهدف هو معرفة
      الحد الأقصى للخسارة المقبولة مسبقًا بدل اتخاذ قرارات عشوائية بعد فتح
      الصفقة.
    </p>

  </div>


  <div className="p-4 md:p-7">

    {/* =================================================
        QUICK RISK RULES
        MOBILE 2x2 / DESKTOP 4 COLUMNS
    ================================================= */}
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">

      {/* RISK */}
      <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4">

        <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
          نسبة المخاطرة
        </div>

        <div className="mt-1.5 text-[16px] font-black leading-6 text-slate-950 md:text-[18px]">
          0.5% – 1%
        </div>

        <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
          مثال تعليمي لمخاطرة محدودة في الصفقة.
        </p>

      </div>


      {/* STOP LOSS */}
      <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4">

        <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
          وقف الخسارة
        </div>

        <div className="mt-1.5 text-[16px] font-black leading-6 text-slate-950 md:text-[18px]">
          قبل الدخول
        </div>

        <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
          حدد مكان الوقف قبل تنفيذ الصفقة.
        </p>

      </div>


      {/* TARGET */}
      <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4">

        <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
          الهدف
        </div>

        <div className="mt-1.5 text-[16px] font-black leading-6 text-slate-950 md:text-[18px]">
          مستوى منطقي
        </div>

        <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
          مثل سيولة مقابلة أو مستوى ضمن السيناريو.
        </p>

      </div>


      {/* POSITION SIZE */}
      <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4">

        <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
          حجم الصفقة
        </div>

        <div className="mt-1.5 text-[16px] font-black leading-6 text-slate-950 md:text-[18px]">
          حسب المخاطرة
        </div>

        <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
          يتغير حسب المسافة إلى وقف الخسارة.
        </p>

      </div>

    </div>


    {/* =================================================
        EXAMPLE + CALCULATOR
    ================================================= */}
    <div className="mt-4 grid gap-3 md:grid-cols-2">

      {/* =================================================
          RISK EXAMPLE
      ================================================= */}
      <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

        <div className="flex items-start justify-between gap-3">

          <div>
            <span className="text-[9px] font-black text-brand-600 md:text-[10px]">
              مثال تعليمي
            </span>

            <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
              مثال على حساب المخاطرة
            </h3>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-600 text-[12px] font-black text-white">
            %
          </div>

        </div>


        <p className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
          إذا كان رصيد الحساب{" "}
          <strong className="font-black text-slate-950">
            1,000 دولار
          </strong>{" "}
          واخترت المخاطرة بنسبة{" "}
          <strong className="font-black text-slate-950">
            1%
          </strong>
          ، فإن الحد الأقصى للخسارة المخطط لها في الصفقة الواحدة هو{" "}
          <strong className="font-black text-slate-950">
            10 دولارات
          </strong>
          .
        </p>


        {/* FORMULA */}
        <div className="mt-3 rounded-[14px] border border-brand-100 bg-white px-3 py-3">

          <div className="text-[10px] font-black text-slate-500">
            معادلة بسيطة
          </div>

          <div
            dir="ltr"
            className="mt-1.5 text-center text-[15px] font-black text-slate-950 md:text-[16px]"
          >
            1,000 × 1% = 10$
          </div>

          <div className="mt-1 text-center text-[10px] leading-5 text-slate-500">
            مبلغ المخاطرة = رصيد الحساب × نسبة المخاطرة
          </div>

        </div>


        <p className="mt-3 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          بعد تحديد مكان وقف الخسارة، يتم حساب حجم الصفقة بحيث تبقى الخسارة
          المحتملة ضمن مبلغ المخاطرة المحدد.
        </p>

      </div>


      {/* =================================================
          RISK CALCULATOR CTA
      ================================================= */}
      <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

        <div className="flex items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[16px] font-black text-brand-600">
            ∑
          </div>

          <div className="min-w-0">

            <h3 className="text-[17px] font-black text-slate-950 md:text-[19px]">
              استخدم حاسبة المخاطر
            </h3>

            <p className="mt-2 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
              بدل الحساب اليدوي في كل صفقة، استخدم حاسبة المخاطر لتقدير
              مبلغ المخاطرة وحجم الصفقة قبل الدخول.
            </p>

          </div>

        </div>


        <Link
          href="/tools/risk-calculator"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-[12px] bg-brand-600 px-4 py-2.5 text-[12px] font-black text-white transition hover:bg-brand-700"
        >
          فتح حاسبة المخاطر
          <span aria-hidden="true">←</span>
        </Link>


        <div className="mt-4 border-t border-slate-100 pt-3">

          <p className="text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
            نسبة المخاطرة المناسبة تختلف حسب خطة التداول وحجم الحساب
            وتحمل المخاطر، لذلك لا تعتبر نسبة 0.5%–1% قاعدة إلزامية.
          </p>

        </div>

      </div>

    </div>


    {/* =================================================
        IMPORTANT NOTE
    ================================================= */}
    <div className="mt-4 rounded-[16px] border border-amber-100 bg-amber-50/50 p-3.5 md:p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[13px] font-black text-white">
          !
        </div>

        <div className="min-w-0">

          <h3 className="text-[14px] font-black leading-6 text-slate-950 md:text-[15px]">
            جودة التحليل لا تلغي إدارة المخاطر
          </h3>

          <p className="mt-1 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
            حتى عند توافق السيولة وهيكل السوق وFVG وOrder Block، تبقى
            الصفقة معرضة للخسارة. لذلك يجب تحديد الخطر قبل الدخول وعدم
            زيادة حجم الصفقة بسبب الثقة الزائدة في السيناريو.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

          {/* =================================================
    11 - PROS & CONS
================================================= */}

<section
  id="pros-cons"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* =================================================
      HEADER
  ================================================= */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <SectionLabel>11 — التقييم</SectionLabel>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      مميزات وعيوب استراتيجية ICT
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      استراتيجية ICT تقدم إطارًا منظمًا لقراءة حركة السعر، لكنها ليست طريقة
      بسيطة أو مناسبة لكل متداول. فهم نقاط القوة والقيود يساعدك على تحديد
      ما إذا كان هذا الأسلوب يناسب طريقة تداولك ومستوى خبرتك.
    </p>

  </div>


  {/* =================================================
      PROS / CONS
  ================================================= */}
  <div className="grid md:grid-cols-2">

    {/* =================================================
        PROS
    ================================================= */}
    <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-l md:p-6">

      {/* TITLE */}
      <div className="flex items-center gap-2">

        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-50 text-[14px] font-black text-green-700">
          ✓
        </div>

        <div>
          <div className="text-[10px] font-black text-green-700">
            نقاط القوة
          </div>

          <h3 className="mt-0.5 text-[18px] font-black text-slate-950">
            مميزات استراتيجية ICT
          </h3>
        </div>

      </div>


      {/* ITEMS */}
      <div className="mt-4 overflow-hidden rounded-[16px] border border-green-100 bg-white">

        {[
          "تساعد على قراءة حركة السعر بصورة منظمة بدل الاعتماد على إشارات عشوائية.",
          "تجمع بين هيكل السوق والسيولة والتوقيت ومناطق الاهتمام ضمن سياق واحد.",
          "يمكن تطبيق مفاهيمها على أسواق وأطر زمنية مختلفة حسب خطة المتداول.",
          "تشجع على التخطيط للدخول ووقف الخسارة والهدف قبل تنفيذ الصفقة.",
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

            <p className="text-justify text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
              {item}
            </p>

          </div>
        ))}

      </div>

    </div>


    {/* =================================================
        CONS
    ================================================= */}
    <div className="p-4 md:p-6">

      {/* TITLE */}
      <div className="flex items-center gap-2">

        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-rose-50 text-[14px] font-black text-rose-700">
          ×
        </div>

        <div>
          <div className="text-[10px] font-black text-rose-700">
            نقاط يجب الانتباه لها
          </div>

          <h3 className="mt-0.5 text-[18px] font-black text-slate-950">
            عيوب وتحديات استراتيجية ICT
          </h3>
        </div>

      </div>


      {/* ITEMS */}
      <div className="mt-4 overflow-hidden rounded-[16px] border border-rose-100 bg-white">

        {[
          "كثرة المصطلحات قد تجعل تعلمها مربكًا للمبتدئ في المراحل الأولى.",
          "بعض مناطق التحليل يمكن تفسيرها بصورة مختلفة من متداول إلى آخر.",
          "الإفراط في البحث عن FVG وOrder Block قد يؤدي إلى تحليل زائد للرسم البياني.",
          "لا توجد ضمانات لنجاح السيناريو، والخسائر والإشارات الخاطئة جزء طبيعي من التداول.",
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

            <p className="text-justify text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
              {item}
            </p>

          </div>
        ))}

      </div>

    </div>

  </div>


  {/* =================================================
      CONCLUSION
  ================================================= */}
  <div className="border-t border-slate-200 bg-slate-50/50 p-4 md:px-6 md:py-4">

    <div className="flex items-start gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
        ?
      </div>

      <div className="min-w-0">

        <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
          هل استراتيجية ICT مناسبة للمبتدئين؟
        </h3>

        <p className="mt-1.5 text-justify text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
          يمكن للمبتدئ تعلم ICT، لكن من الأفضل عدم محاولة حفظ جميع المفاهيم
          دفعة واحدة. ابدأ بهيكل السوق والسيولة، ثم انتقل تدريجيًا إلى
          BOS وCHoCH وFVG وOrder Block بعد فهم الصورة الأساسية.
        </p>

      </div>

    </div>

  </div>

</section>

        {/* =================================================
    BEGINNER ROADMAP
================================================= */}

<section
  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* HEADER */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <SectionLabel>خطة تعلم</SectionLabel>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      كيف تتعلم ICT كمبتدئ بدون تعقيد؟
    </h2>

    <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
      لا تحاول تعلم جميع مصطلحات ICT دفعة واحدة. الأفضل أن تبدأ بالمفاهيم
      الأساسية بالترتيب، ثم تضيف الأدوات المتقدمة تدريجيًا بعد فهم الصورة
      العامة لحركة السعر.
    </p>

  </div>


  <div className="p-4 md:p-7">

    {/* =================================================
        DESKTOP ROADMAP
    ================================================= */}
    <div className="hidden md:grid md:grid-cols-4 md:gap-3">

      {[
        {
          no: "01",
          title: "هيكل السوق",
          term: "Market Structure",
          text: "ابدأ بفهم القمم والقيعان والاتجاه قبل دراسة أي مفهوم آخر.",
        },
        {
          no: "02",
          title: "السيولة",
          term: "Liquidity",
          text: "تعلم أين تتجمع السيولة وكيف يحدث سحب السيولة حول القمم والقيعان.",
        },
        {
          no: "03",
          title: "تغير الهيكل",
          term: "BOS / CHoCH",
          text: "تعلم كيف تفرق بين استمرار الهيكل وظهور تغير مبكر في حركة السعر.",
        },
        {
          no: "04",
          title: "مناطق الاهتمام",
          term: "FVG / Order Block",
          text: "بعد فهم الأساس، أضف فجوات القيمة العادلة ومناطق Order Block.",
        },
      ].map((item) => (
        <article
          key={item.no}
          className="rounded-[18px] border border-slate-200 bg-white p-4"
        >

          <div className="flex items-center gap-2.5">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
              {item.no}
            </div>

            <h3 className="text-[16px] font-black text-slate-950">
              {item.title}
            </h3>

          </div>

          <div className="mt-2 text-[10px] font-black text-brand-600">
            {item.term}
          </div>

          <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
            {item.text}
          </p>

        </article>
      ))}

    </div>


    {/* =================================================
        MOBILE ROADMAP
    ================================================= */}
    <div className="md:hidden">

      <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

        {[
          {
            no: "01",
            title: "هيكل السوق",
            term: "Market Structure",
            text: "ابدأ بالقمم والقيعان والاتجاه.",
          },
          {
            no: "02",
            title: "السيولة",
            term: "Liquidity",
            text: "افهم أين تتجمع السيولة وكيف يتم سحبها.",
          },
          {
            no: "03",
            title: "تغير الهيكل",
            term: "BOS / CHoCH",
            text: "تعلم قراءة الاستمرار والتغير في حركة السعر.",
          },
          {
            no: "04",
            title: "مناطق الاهتمام",
            term: "FVG / Order Block",
            text: "أضف المناطق المتقدمة بعد فهم الأساس.",
          },
        ].map((item, index) => (
          <div
            key={item.no}
            className={`px-3.5 py-3 ${
              index !== 3 ? "border-b border-slate-100" : ""
            }`}
          >

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                {item.no}
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">

                  <h3 className="text-[14px] font-black text-slate-950">
                    {item.title}
                  </h3>

                  <span className="text-[9px] font-black text-brand-600">
                    {item.term}
                  </span>

                </div>

                <p className="mt-1 text-[11px] leading-5 text-slate-600">
                  {item.text}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>

  </div>
</section>



{/* =================================================
    12 - FAQ
================================================= */}

<section
  id="faq"
  className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* HEADER */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

    <SectionLabel>12 — الأسئلة الشائعة</SectionLabel>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
      أسئلة شائعة عن استراتيجية ICT
    </h2>

    <p className="mt-3 max-w-6xl text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
      إجابات مختصرة عن أكثر الأسئلة التي قد تدور في ذهن المتداول عند تعلم ICT.
    </p>

  </div>


  {/* FAQ ITEMS */}
  <div className="divide-y divide-slate-200">

    {[
      {
        q: "هل استراتيجية ICT مناسبة للمبتدئين؟",
        a: "يمكن للمبتدئ تعلم ICT، لكن الأفضل البدء بهيكل السوق والسيولة قبل الانتقال إلى FVG وOrder Block وبقية المفاهيم المتقدمة.",
      },
      {
        q: "هل استراتيجية ICT تضمن الربح؟",
        a: "لا. لا توجد استراتيجية تداول تضمن الربح. ICT أسلوب لتحليل حركة السعر، ويبقى نجاح الصفقة مرتبطًا بالتنفيذ وإدارة المخاطر وظروف السوق.",
      },
      {
        q: "ما أهم مفهوم في ICT؟",
        a: "لا يوجد مفهوم واحد يكفي وحده، لكن فهم هيكل السوق والسيولة يعتبر أساسًا مهمًا قبل دراسة بقية عناصر المنهج.",
      },
      {
        q: "ما الفرق بين ICT وSmart Money Concepts؟",
        a: "يوجد تداخل كبير في المصطلحات والمفاهيم المستخدمة. في الاستخدام الشائع، تشير ICT إلى منهج مرتبط بتعليم Inner Circle Trader، بينما يستخدم مصطلح Smart Money Concepts بصورة أوسع لوصف مجموعة من مفاهيم هيكل السوق والسيولة.",
      },
      {
        q: "هل يمكن استخدام ICT في الفوركس فقط؟",
        a: "لا. يمكن دراسة المفاهيم نفسها على أسواق مختلفة، لكن سلوك السيولة والتوقيت والتذبذب يختلف من سوق إلى آخر.",
      },
      {
        q: "ما هو أفضل إطار زمني لاستراتيجية ICT؟",
        a: "لا يوجد إطار واحد مناسب للجميع. غالبًا يستخدم المتداول إطارًا أكبر لفهم السياق العام ثم إطارًا أصغر لتحسين قراءة منطقة الدخول.",
      },
    ].map((item, index) => (
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

<section
  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
>
  {/* HEADER */}
  <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 md:px-6 md:py-5">

    <h2 className="text-[20px] font-black leading-7 text-slate-950 md:text-[26px]">
      مواضيع تساعدك على فهم ICT بشكل أفضل
    </h2>

    <p className="mt-1.5 text-[12px] leading-6 text-slate-500 md:text-[13px]">
      أدلة مرتبطة بمفاهيم السيولة وإدارة الصفقة والمخاطر.
    </p>

  </div>


  {/* =================================================
      DESKTOP RELATED
  ================================================= */}
  <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">

    {[
      {
        label: "مفهوم أساسي",
        title: "السيولة في التداول",
        text: "شرح تجمع السيولة حول القمم والقيعان ومناطق السعر المهمة.",
        href: "/learn-trading/liquidity",
      },
      {
        label: "إدارة المخاطر",
        title: "وقف الخسارة",
        text: "تعرف على أهمية تحديد مستوى وقف واضح قبل فتح الصفقة.",
        href: "/learn-trading/stop-loss",
      },
      {
        label: "إدارة الصفقة",
        title: "جني الأرباح",
        text: "كيفية التفكير في تحديد أهداف منطقية للصفقة.",
        href: "/learn-trading/take-profit",
      },
      {
        label: "إدارة رأس المال",
        title: "حجم الصفقة",
        text: "فهم العلاقة بين حجم الصفقة والمخاطرة ووقف الخسارة.",
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


  {/* =================================================
      MOBILE RELATED — COMPACT ROWS
  ================================================= */}
  <div className="md:hidden">

    <div className="divide-y divide-slate-100">

      {[
        {
          label: "مفهوم أساسي",
          title: "السيولة في التداول",
          href: "/learn-trading/liquidity",
        },
        {
          label: "إدارة المخاطر",
          title: "وقف الخسارة",
          href: "/learn-trading/stop-loss",
        },
        {
          label: "إدارة الصفقة",
          title: "جني الأرباح",
          href: "/learn-trading/take-profit",
        },
        {
          label: "إدارة رأس المال",
          title: "حجم الصفقة",
          href: "/learn-trading/lot",
        },
      ].map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex items-center justify-between gap-3 px-4 py-3"
        >

          <div>
            <div className="text-[9px] font-black text-brand-600">
              {item.label}
            </div>

            <div className="mt-0.5 text-[13px] font-black text-slate-950">
              {item.title}
            </div>
          </div>

          <span className="text-[16px] font-black text-brand-600">
            ←
          </span>

        </Link>
      ))}

    </div>

  </div>

</section>



{/* =================================================
    FINAL CTA — COMPACT PREMIUM
================================================= */}

<section
  className="overflow-hidden rounded-[24px] border border-brand-100 bg-[linear-gradient(135deg,#f3f7fd_0%,#ffffff_60%,#f7faff_100%)] shadow-sm"
>
  <div className="px-4 py-4 md:flex md:items-center md:justify-between md:gap-8 md:px-7 md:py-5">

    {/* =================================================
        CONTENT
    ================================================= */}
    <div className="min-w-0 flex-1">

      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-600 md:text-[10px]">
        الخطوة التالية
      </span>

      <h2 className="mt-2.5 text-[20px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[27px]">
        تعلم أولًا، ثم اختبر استراتيجيتك عمليًا
      </h2>

      <p className="mt-2 max-w-4xl text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
        استخدم ما تعلمته لفهم حركة السوق، ثم اختبر السيناريوهات على حساب
        تجريبي قبل المخاطرة بأموال حقيقية. يمكنك أيضًا استخدام أدوات التداول
        للمساعدة في حساب المخاطر والتخطيط للصفقة.
      </p>

    </div>


    {/* =================================================
        ACTIONS
    ================================================= */}
    <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-0 md:flex md:shrink-0 md:items-center">

      {/* SECONDARY */}
      <Link
        href="/learn-trading"
        className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 py-2.5 text-center text-[11px] font-black text-brand-600 transition hover:border-brand-300 hover:bg-brand-50 md:min-w-[155px] md:px-4 md:text-[12px]"
      >
        دروس التداول
      </Link>


      {/* PRIMARY */}
      <Link
        href="/tools"
        className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[11px] bg-brand-600 px-3 py-2.5 text-center text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700 md:min-w-[165px] md:px-4 md:text-[12px]"
      >
        <span>أدوات التداول</span>

        <span
          aria-hidden="true"
          className="text-[14px] leading-none"
        >
          ←
        </span>
      </Link>

    </div>

  </div>


  {/* =================================================
      SMALL TRUST / EDUCATIONAL NOTE
  ================================================= */}
  <div className="border-t border-brand-100/70 bg-white/50 px-4 py-2.5 md:px-7">

    <p className="text-center text-[10px] leading-5 text-slate-500 md:text-right md:text-[11px]">
      المحتوى تعليمي ولا يمثل توصية تداول. اختبر أي استراتيجية وافهم مخاطرها
      قبل استخدام أموال حقيقية.
    </p>

  </div>

</section>
        </article>
      </div>

{/* =====================================================
    ARTICLE SCHEMA
===================================================== */}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",

      headline:
        "استراتيجية ICT في التداول: شرح شامل للمبتدئين خطوة بخطوة",

      description:
        "شرح شامل لاستراتيجية ICT في التداول، من هيكل السوق والسيولة إلى FVG وOrder Block وBOS وCHoCH وKill Zones، مع أمثلة وإدارة المخاطر.",

      inLanguage: "ar",

      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": PAGE_URL,
      },

      url: PAGE_URL,

      author: {
        "@type": "Organization",
        name: "بروكر العرب",
        url: "https://brokeralarab.com",
      },

      publisher: {
        "@type": "Organization",
        name: "بروكر العرب",
        url: "https://brokeralarab.com",
      },

      datePublished: "2026-08-15",
      dateModified: "2026-08-15",

      about: [
        {
          "@type": "Thing",
          name: "استراتيجية ICT",
        },
        {
          "@type": "Thing",
          name: "Inner Circle Trader",
        },
        {
          "@type": "Thing",
          name: "هيكل السوق",
        },
        {
          "@type": "Thing",
          name: "السيولة في التداول",
        },
        {
          "@type": "Thing",
          name: "Fair Value Gap",
        },
        {
          "@type": "Thing",
          name: "Order Block",
        },
      ],
    }),
  }}
/>

{/* =====================================================
    BREADCRUMB SCHEMA
===================================================== */}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://brokeralarab.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "استراتيجيات التداول",
          item: "https://brokeralarab.com/strategies",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "استراتيجية ICT",
          item: PAGE_URL,
        },
      ],
    }),
  }}
/>

      {/* =====================================================
          FAQ SCHEMA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "هل استراتيجية ICT مناسبة للمبتدئين؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "يمكن للمبتدئ تعلم استراتيجية ICT، لكن يفضل البدء بهيكل السوق والسيولة قبل الانتقال إلى FVG وOrder Blocks والمفاهيم الأكثر تقدمًا.",
                },
              },
              {
                "@type": "Question",
                name: "هل استراتيجية ICT تضمن الربح؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "لا، لا توجد استراتيجية تداول تضمن الربح ويمكن أن تفشل أي إشارة أو نموذج تداول.",
                },
              },
              {
                "@type": "Question",
                name: "ما أهم مفهوم في استراتيجية ICT؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "فهم هيكل السوق والسيولة يعتبر من أهم الأساسيات قبل الانتقال إلى مفاهيم مثل FVG وOrder Block وBOS وCHoCH.",
                },
              },
              {
                "@type": "Question",
                name: "ما الفرق بين ICT وSmart Money Concepts؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "هناك تداخل كبير بين ICT وSmart Money Concepts في مفاهيم مثل السيولة وOrder Blocks وBOS وCHoCH، بينما يستخدم SMC كمصطلح أوسع في مجتمع التداول.",
                },
              },
              {
                "@type": "Question",
                name: "هل يمكن استخدام ICT في الفوركس فقط؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "تستخدم مفاهيم ICT بكثرة في الفوركس، كما يطبقها بعض المتداولين على أسواق أخرى مثل الذهب والمؤشرات.",
                },
              },
              {
                "@type": "Question",
                name: "ما أفضل إطار زمني لاستراتيجية ICT؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "لا يوجد إطار زمني واحد مناسب للجميع، ويستخدم كثير من المتداولين إطارًا أعلى لتحديد السياق وإطارًا أصغر لتحسين الدخول.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}