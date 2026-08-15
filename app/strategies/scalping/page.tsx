import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   SCALPING STRATEGY PAGE
   Broker Alarab
   Path: /strategies/scalping
========================================================= */

export const dynamic = "force-dynamic";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/scalping`;

const PAGE_TITLE =
  "استراتيجية السكالبينج في الفوركس: شرح عملي بالصور";

const PAGE_DESCRIPTION =
  "شرح استراتيجية السكالبينج في الفوركس للمبتدئين، من اختيار الإطار الزمني والسبريد إلى طرق الدخول وإدارة المخاطر، مع أمثلة ورسومات وأفضل الوسطاء.";

const DATE_PUBLISHED = "2026-08-15";
const DATE_MODIFIED = "2026-08-15";

const PAGE_KEYWORDS = [
  "استراتيجية السكالبينج",
  "استراتيجية السكالبينج في الفوركس",
  "سكالبينج الفوركس",
  "شرح السكالبينج",
  "السكالبينج للمبتدئين",
  "استراتيجية المضاربة السريعة",
  "استراتيجية سكالبينج دقيقة",
  "استراتيجية سكالبينج 5 دقائق",
  "أفضل استراتيجية سكالبينج",
  "سكالبينج الذهب",
  "سكالبينج EURUSD",
  "مؤشرات السكالبينج",
  "EMA Scalping",
  "Price Action Scalping",
  "أفضل وقت للسكالبينج",
  "أفضل أزواج للسكالبينج",
  "سبريد السكالبينج",
  "إدارة مخاطر السكالبينج",
];

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: PAGE_KEYWORDS,

  applicationName: "بروكر العرب",
  category: "المال والأعمال",
  creator: "فريق بروكر العرب",
  publisher: "بروكر العرب",

  authors: [
    {
      name: "فريق بروكر العرب",
    },
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "بروكر العرب",
    type: "article",
    locale: "ar_AR",
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ["فريق بروكر العرب"],
    section: "استراتيجيات التداول",

    tags: [
      "استراتيجية السكالبينج",
      "سكالبينج الفوركس",
      "المضاربة السريعة",
      "استراتيجيات الفوركس",
      "إدارة المخاطر",
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },

  other: {
    "article:published_time": DATE_PUBLISHED,
    "article:modified_time": DATE_MODIFIED,
    "article:section": "استراتيجيات التداول",
  },
};


/* =========================================================
   SUPABASE TYPES
========================================================= */

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  sort_order: number | null;
  spread_avg: number | null;
  spread_min: number | null;
  account_type: string | null;
  is_islamic_available: boolean | null;
  commission_value: number | null;
  is_best_for_scalping: boolean | null;
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  regulation: string | null;
  regulation_short: string | null;
  platforms: string | null;
  arabic_support: string | null;
  islamic_account: string | null;
  min_deposit: number | null;
  max_leverage: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
};

type RawScalpingBroker = BrokerAccount & {
  broker: Broker | Broker[] | null;
};

type ValidScalpingBroker = BrokerAccount & {
  broker: Broker & {
    slug: string;
    name: string;
  };
};


/* =========================================================
   TOP 3 BROKER EDITORIAL DATA
========================================================= */

type ScalpingBrokerEditorial = {
  rank: number;
  badge: string;
  reason: string;
};

const SCALPING_BROKER_EDITORIAL: Record<
  string,
  ScalpingBrokerEditorial
> = {
  icmarkets: {
    rank: 1,
    badge: "الأفضل إجمالًا",
    reason:
      "حساب Raw Spread وبيئة تداول مناسبة للمتداول النشط مع دعم cTrader وMetaTrader.",
  },

  pepperstone: {
    rank: 2,
    badge: "أفضل تنوع منصات",
    reason:
      "حساب Razor مع MT4 وMT5 وcTrader وTradingView يوفر مرونة قوية لاستراتيجيات السكالبينج.",
  },

  tickmill: {
    rank: 3,
    badge: "تكلفة تنافسية",
    reason:
      "حساب Raw وهيكل عمولة منخفض نسبيًا يجعلانها خيارًا قويًا للصفقات القصيرة المتكررة.",
  },
};


/* =========================================================
   HELPERS
========================================================= */

function normalizeBrokerSlug(
  slug: string | null | undefined
) {
  return slug?.trim().toLowerCase() ?? "";
}


function formatRating(
  value: number | null | undefined
) {
  if (value === null || value === undefined) {
    return "—";
  }

  return Number(value).toFixed(2);
}


function accountSpread(account: BrokerAccount) {
  if (account.spread?.trim()) {
    return account.spread.trim();
  }

  if (
    account.spread_min !== null &&
    account.spread_min !== undefined
  ) {
    return `من ${Number(account.spread_min)} نقطة`;
  }

  return "حسب الحساب";
}


function accountCommission(account: BrokerAccount) {
  if (account.commission?.trim()) {
    return account.commission.trim();
  }

  return "حسب الأداة";
}


function getInitials(
  value: string | null | undefined
) {
  if (!value?.trim()) {
    return "BA";
  }

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}


function renderStars(
  rating: number | null | undefined
) {
  const safeRating = Math.max(
    0,
    Math.min(5, Number(rating ?? 0))
  );

  const percentage = (safeRating / 5) * 100;

  return (
    <div
      className="relative inline-flex text-[13px] leading-none"
      dir="ltr"
      aria-label={`تقييم ${formatRating(rating)} من 5`}
    >
      <div
        className="flex gap-0.5 text-slate-300"
        aria-hidden="true"
      >
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
        aria-hidden="true"
      >
        <div className="flex w-max gap-0.5 text-amber-400">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="rounded-[18px] border border-brand-100 bg-brand-50/60 p-4 md:p-5">

      <div className="flex items-start gap-3">

        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-sm font-black text-white">
          !
        </div>

        <div className="min-w-0">

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


function BrokerLogo({
  broker,
}: {
  broker: Broker & {
    slug: string;
    name: string;
  };
}) {
  const content = broker.logo ? (
    <Image
      src={broker.logo}
      alt={`شعار ${broker.name}`}
      fill
      className="object-contain p-2"
      sizes="110px"
    />
  ) : (
    <span className="text-[15px] font-black text-slate-600">
      {getInitials(broker.name)}
    </span>
  );

  return (
    <Link
      href={`/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`اقرأ تقييم ${broker.name}`}
      className="relative flex h-[66px] w-[105px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm transition hover:border-brand-200"
    >
      {content}
    </Link>
  );
}


/* =========================================================
   HERO SCALPING CHART
========================================================= */

function ScalpingHeroChart() {
  return (
    <svg
      viewBox="0 0 760 420"
      className="block w-full"
      role="img"
      aria-label="رسم توضيحي لاستراتيجية السكالبينج في الفوركس"
    >
      <defs>
        <linearGradient
          id="scalpingHeroBlue"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#1e5bb8"
          />

          <stop
            offset="100%"
            stopColor="#3b82f6"
          />
        </linearGradient>
      </defs>


      <rect
        width="760"
        height="420"
        fill="#ffffff"
      />


      {/* GRID */}
      {[70, 140, 210, 280, 350].map((y) => (
        <line
          key={`hero-y-${y}`}
          x1="45"
          y1={y}
          x2="715"
          y2={y}
          stroke="#eef2f7"
          strokeWidth="1"
        />
      ))}


      {[110, 220, 330, 440, 550, 660].map((x) => (
        <line
          key={`hero-x-${x}`}
          x1={x}
          y1="45"
          x2={x}
          y2="370"
          stroke="#f8fafc"
          strokeWidth="1"
        />
      ))}


      {/* PRICE */}
      <polyline
        points="
          60,290
          110,250
          160,270
          210,210
          260,240
          310,178
          355,205
          400,145
          448,182
          495,128
          545,165
          595,112
          645,148
          705,92
        "
        fill="none"
        stroke="url(#scalpingHeroBlue)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />


      {/* EMA */}
      <path
        d="
          M 60 275
          Q 120 255 175 245
          T 285 220
          T 390 185
          T 500 160
          T 610 135
          T 705 112
        "
        fill="none"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeDasharray="8 6"
      />


      <text
        x="90"
        y="330"
        fontSize="13"
        fontWeight="900"
        fill="#b45309"
      >
        EMA
      </text>


      {/* ENTRY */}
      <circle
        cx="495"
        cy="128"
        r="10"
        fill="#dcfce7"
        stroke="#16a34a"
        strokeWidth="4"
      />

      <text
        x="515"
        y="107"
        fontSize="13"
        fontWeight="900"
        fill="#15803d"
      >
        دخول
      </text>


      {/* TARGET */}
      <line
        x1="545"
        y1="88"
        x2="690"
        y2="88"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeDasharray="7 5"
      />

      <text
        x="550"
        y="68"
        fontSize="12"
        fontWeight="900"
        fill="#15803d"
      >
        هدف قصير
      </text>


      {/* STOP */}
      <line
        x1="455"
        y1="205"
        x2="555"
        y2="205"
        stroke="#ef4444"
        strokeWidth="2.5"
      />

      <text
        x="465"
        y="227"
        fontSize="11"
        fontWeight="900"
        fill="#dc2626"
      >
        وقف خسارة قريب
      </text>


      {/* BADGE */}
      <rect
        x="78"
        y="92"
        width="138"
        height="34"
        rx="17"
        fill="#0f172a"
      />

      <text
        x="147"
        y="114"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#ffffff"
      >
        SCALPING
      </text>


      {/* BOTTOM */}
      <rect
        x="110"
        y="355"
        width="540"
        height="38"
        rx="19"
        fill="#f8fafc"
        stroke="#e2e8f0"
      />

      <text
        x="380"
        y="379"
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="#64748b"
      >
        حركة قصيرة • دخول سريع • هدف محدود • مخاطرة منضبطة
      </text>

    </svg>
  );
}


/* =========================================================
   BASIC SCALPING FLOW CHART
========================================================= */

function ScalpingFlowChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">

        <div className="flex items-center justify-between gap-3">

          <div>

            <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
              نموذج مبسط لصفقة سكالبينج
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
              اتجاه قصير ← ارتداد ← تأكيد ← دخول ← هدف سريع
            </p>

          </div>

          <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
            مثال تعليمي
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
          aria-label="مثال مبسط على تنفيذ صفقة سكالبينج قصيرة المدى"
        >
          <rect
            width="1100"
            height="500"
            fill="#ffffff"
          />


          {[90, 165, 240, 315, 390].map((y) => (
            <line
              key={`flow-y-${y}`}
              x1="65"
              y1={y}
              x2="1035"
              y2={y}
              stroke="#eef2f7"
            />
          ))}


          {/* EMA */}
          <path
            d="
              M 70 330
              Q 180 310 270 275
              T 450 230
              T 640 190
              T 835 150
              T 1020 115
            "
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="9 7"
          />


          {/* PRICE */}
          <polyline
            points="
              80,350
              150,300
              220,325
              295,255
              360,285
              430,215
              500,245
              570,185
              635,215
              705,155
              775,185
              850,120
              930,150
              1015,92
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* PULLBACK */}
          <circle
            cx="635"
            cy="215"
            r="10"
            fill="#fff7ed"
            stroke="#f59e0b"
            strokeWidth="3"
          />

          <text
            x="635"
            y="250"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#b45309"
          >
            ارتداد
          </text>


          {/* ENTRY */}
          <circle
            cx="705"
            cy="155"
            r="10"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="3"
          />

          <text
            x="705"
            y="132"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#15803d"
          >
            دخول
          </text>


          {/* STOP */}
          <line
            x1="630"
            y1="275"
            x2="770"
            y2="275"
            stroke="#ef4444"
            strokeWidth="2.5"
          />

          <text
            x="700"
            y="300"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#dc2626"
          >
            وقف الخسارة
          </text>


          {/* TARGET */}
          <line
            x1="790"
            y1="100"
            x2="1010"
            y2="100"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          <text
            x="900"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#15803d"
          >
            هدف قصير
          </text>


          {/* FLOW */}
          <rect
            x="165"
            y="425"
            width="770"
            height="42"
            rx="18"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="550"
            y="451"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#475569"
          >
            اتجاه واضح → ارتداد → تأكيد → دخول → وقف قريب → هدف محدد
          </text>

        </svg>

      </div>


      {/* =================================================
          MOBILE PREVIEW
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#scalping-flow-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="فتح رسم السكالبينج بالحجم الكامل"
        >

          <svg
            viewBox="0 0 360 340"
            className="block w-full"
            role="img"
            aria-label="معاينة مبسطة لصفقة سكالبينج"
          >
            <rect
              width="360"
              height="340"
              fill="#ffffff"
            />


            {[65, 125, 185, 245, 305].map((y) => (
              <line
                key={`flow-mobile-${y}`}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}


            <path
              d="
                M 25 250
                Q 85 235 135 215
                T 230 180
                T 335 145
              "
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />


            <polyline
              points="
                25,270
                65,230
                100,250
                140,200
                180,220
                220,175
                255,195
                292,145
                335,110
              "
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />


            <circle
              cx="255"
              cy="195"
              r="7"
              fill="#fff7ed"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />

            <text
              x="255"
              y="217"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#b45309"
            >
              ارتداد
            </text>


            <circle
              cx="292"
              cy="145"
              r="7"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="2.5"
            />

            <text
              x="292"
              y="128"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#15803d"
            >
              دخول
            </text>


            <line
              x1="245"
              y1="235"
              x2="320"
              y2="235"
              stroke="#ef4444"
              strokeWidth="2"
            />


            <rect
              x="40"
              y="282"
              width="280"
              height="38"
              rx="11"
              fill="#f8fafc"
              stroke="#e2e8f0"
            />

            <text
              x="180"
              y="305"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#334155"
            >
              اتجاه → ارتداد → دخول → هدف سريع
            </text>

          </svg>


          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              <span>تكبير الرسم</span>
              <span className="text-[14px]">
                ↗
              </span>
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
          المثال يوضح اتجاهًا قصير المدى ثم ارتدادًا نحو منطقة قريبة من
          المتوسط، وبعد عودة الزخم يتم التفكير في دخول محدود المخاطرة مع
          وقف خسارة وهدف محددين مسبقًا. الرسم تعليمي ولا يمثل إشارة تداول.
        </p>

      </div>


      {/* =================================================
          FULLSCREEN
      ================================================= */}
      <div
        id="scalping-flow-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#how-scalping-works"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                نموذج صفقة سكالبينج
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                اتجاه → ارتداد → تأكيد → دخول → هدف
              </div>

            </div>


            <a
              href="#how-scalping-works"
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
              viewBox="0 0 1100 500"
              className="block min-w-[820px] w-full"
              role="img"
              aria-label="الرسم الكامل لنموذج صفقة سكالبينج"
            >
              <rect
                width="1100"
                height="500"
                fill="#ffffff"
              />


              {[90, 165, 240, 315, 390].map((y) => (
                <line
                  key={`full-flow-y-${y}`}
                  x1="65"
                  y1={y}
                  x2="1035"
                  y2={y}
                  stroke="#eef2f7"
                />
              ))}


              <path
                d="
                  M 70 330
                  Q 180 310 270 275
                  T 450 230
                  T 640 190
                  T 835 150
                  T 1020 115
                "
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="9 7"
              />


              <polyline
                points="
                  80,350
                  150,300
                  220,325
                  295,255
                  360,285
                  430,215
                  500,245
                  570,185
                  635,215
                  705,155
                  775,185
                  850,120
                  930,150
                  1015,92
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="635"
                cy="215"
                r="10"
                fill="#fff7ed"
                stroke="#f59e0b"
                strokeWidth="3"
              />

              <text
                x="635"
                y="250"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#b45309"
              >
                ارتداد
              </text>


              <circle
                cx="705"
                cy="155"
                r="10"
                fill="#dcfce7"
                stroke="#16a34a"
                strokeWidth="3"
              />

              <text
                x="705"
                y="132"
                textAnchor="middle"
                fontSize="14"
                fontWeight="900"
                fill="#15803d"
              >
                دخول
              </text>


              <line
                x1="630"
                y1="275"
                x2="770"
                y2="275"
                stroke="#ef4444"
                strokeWidth="2.5"
              />

              <text
                x="700"
                y="300"
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill="#dc2626"
              >
                وقف الخسارة
              </text>


              <line
                x1="790"
                y1="100"
                x2="1010"
                y2="100"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />

              <text
                x="900"
                y="78"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#15803d"
              >
                الهدف
              </text>

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   BEGINNER VISUAL 1
   ONE-MINUTE SCALPING
========================================================= */

function OneMinuteScalpingChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">

        <div className="flex items-center justify-between gap-3">

          <div>
            <h3 className="text-[14px] font-black text-slate-950">
              مثال بصري: سكالبينج الدقيقة
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-500">
              اتجاه 5m ← ارتداد 1m ← تأكيد ← دخول ← وقف ← هدف
            </p>
          </div>

          <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
            1m
          </span>

        </div>

      </div>


      {/* DESKTOP */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 1100 460"
          className="block w-full"
          role="img"
          aria-label="مثال تعليمي على استراتيجية سكالبينج الدقيقة"
        >
          <rect width="1100" height="460" fill="#ffffff" />

          {[80, 150, 220, 290, 360].map((y) => (
            <line
              key={y}
              x1="60"
              y1={y}
              x2="1040"
              y2={y}
              stroke="#eef2f7"
            />
          ))}


          {/* 5M TREND */}
          <rect
            x="75"
            y="42"
            width="145"
            height="36"
            rx="18"
            fill="#eef5fd"
          />

          <text
            x="147"
            y="65"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#1e5bb8"
          >
            اتجاه 5 دقائق صاعد
          </text>


          {/* EMA */}
          <path
            d="
              M 80 325
              Q 185 300 260 270
              T 430 225
              T 600 190
              T 770 155
              T 1010 115
            "
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="9 7"
          />


          {/* PRICE */}
          <polyline
            points="
              80,340
              160,285
              235,310
              310,235
              390,260
              470,180
              545,215
              620,165
              690,225
              755,180
              830,120
              910,145
              1010,92
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* PULLBACK */}
          <circle
            cx="690"
            cy="225"
            r="10"
            fill="#fff7ed"
            stroke="#f59e0b"
            strokeWidth="3"
          />

          <text
            x="690"
            y="258"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#b45309"
          >
            1. ارتداد
          </text>


          {/* CONFIRMATION */}
          <circle
            cx="755"
            cy="180"
            r="9"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="3"
          />

          <text
            x="755"
            y="154"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#1d4ed8"
          >
            2. تأكيد
          </text>


          {/* ENTRY */}
          <line
            x1="790"
            y1="265"
            x2="790"
            y2="185"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <polygon
            points="790,172 782,190 798,190"
            fill="#16a34a"
          />

          <text
            x="812"
            y="210"
            fontSize="14"
            fontWeight="900"
            fill="#15803d"
          >
            3. دخول
          </text>


          {/* STOP */}
          <line
            x1="675"
            y1="280"
            x2="840"
            y2="280"
            stroke="#ef4444"
            strokeWidth="2.5"
          />

          <text
            x="840"
            y="303"
            textAnchor="end"
            fontSize="12"
            fontWeight="900"
            fill="#dc2626"
          >
            وقف الخسارة
          </text>


          {/* TARGET */}
          <line
            x1="820"
            y1="105"
            x2="1015"
            y2="105"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          <text
            x="920"
            y="83"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#15803d"
          >
            4. هدف قصير
          </text>


          {/* FLOW */}
          <rect
            x="160"
            y="390"
            width="780"
            height="38"
            rx="19"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="550"
            y="414"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#475569"
          >
            لا تدخل أثناء الارتداد → انتظر توقف الهبوط → تأكيد → دخول
          </text>

        </svg>

      </div>


      {/* MOBILE */}
      <div className="md:hidden">

        <a
          href="#one-minute-chart-full"
          className="block cursor-zoom-in"
          aria-label="تكبير مثال سكالبينج الدقيقة"
        >
          <svg
            viewBox="0 0 360 310"
            className="block w-full"
          >
            <rect width="360" height="310" fill="#ffffff" />

            {[60, 115, 170, 225].map((y) => (
              <line
                key={y}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}

            <path
              d="M25 235 Q90 220 145 195 T250 155 T335 120"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <polyline
              points="
                25,250
                70,210
                110,225
                155,175
                195,195
                235,150
                270,185
                305,135
                335,105
              "
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="270"
              cy="185"
              r="7"
              fill="#fff7ed"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />

            <text
              x="270"
              y="208"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#b45309"
            >
              ارتداد
            </text>

            <circle
              cx="305"
              cy="135"
              r="7"
              fill="#dbeafe"
              stroke="#2563eb"
              strokeWidth="2.5"
            />

            <text
              x="305"
              y="120"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#1d4ed8"
            >
              تأكيد
            </text>

            <line
              x1="280"
              y1="225"
              x2="330"
              y2="225"
              stroke="#ef4444"
              strokeWidth="2"
            />

            <rect
              x="55"
              y="260"
              width="250"
              height="34"
              rx="12"
              fill="#f8fafc"
              stroke="#e2e8f0"
            />

            <text
              x="180"
              y="281"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#334155"
            >
              ارتداد → تأكيد → دخول → هدف
            </text>
          </svg>


          <div className="flex justify-center border-t border-slate-100 py-2.5">

            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              تكبير الرسم
              <span>↗</span>
            </span>

          </div>

        </a>

      </div>


      {/* EXPLANATION */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            ماذا يحدث هنا؟
          </strong>{" "}
          الاتجاه الأساسي صاعد، لكن المتداول لا يشتري مباشرة. ينتظر تراجع
          السعر على إطار الدقيقة، ثم ظهور دليل على توقف الهبوط وعودة الزخم
          قبل الدخول. بهذه الطريقة يكون الدخول جزءًا من سيناريو واضح وليس
          مجرد مطاردة لحركة سريعة.
        </p>

      </div>


      {/* FULLSCREEN */}
      <div
        id="one-minute-chart-full"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >
        <a
          href="#one-minute"
          className="absolute inset-0"
          aria-label="إغلاق الرسم"
        />

        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white">

          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                مثال سكالبينج الدقيقة
              </div>

              <div className="text-[10px] text-slate-500">
                اتجاه → ارتداد → تأكيد → دخول
              </div>
            </div>

            <a
              href="#one-minute"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold"
            >
              ×
            </a>

          </div>

          <div className="border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">
            ↔ حرّك الرسم يمينًا ويسارًا لمشاهدة التفاصيل
          </div>

          <div className="overflow-auto">

            <svg
              viewBox="0 0 1100 460"
              className="block min-w-[820px] w-full"
            >
              <rect width="1100" height="460" fill="#ffffff" />

              {[80, 150, 220, 290, 360].map((y) => (
                <line
                  key={y}
                  x1="60"
                  y1={y}
                  x2="1040"
                  y2={y}
                  stroke="#eef2f7"
                />
              ))}

              <path
                d="M80 325 Q185 300 260 270 T430 225 T600 190 T770 155 T1010 115"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="9 7"
              />

              <polyline
                points="80,340 160,285 235,310 310,235 390,260 470,180 545,215 620,165 690,225 755,180 830,120 910,145 1010,92"
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="690"
                cy="225"
                r="10"
                fill="#fff7ed"
                stroke="#f59e0b"
                strokeWidth="3"
              />

              <text
                x="690"
                y="258"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#b45309"
              >
                ارتداد
              </text>

              <circle
                cx="755"
                cy="180"
                r="9"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="3"
              />

              <text
                x="755"
                y="154"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#1d4ed8"
              >
                تأكيد
              </text>

              <line
                x1="675"
                y1="280"
                x2="840"
                y2="280"
                stroke="#ef4444"
                strokeWidth="2.5"
              />

              <text
                x="840"
                y="303"
                textAnchor="end"
                fontSize="12"
                fontWeight="900"
                fill="#dc2626"
              >
                وقف الخسارة
              </text>

              <line
                x1="820"
                y1="105"
                x2="1015"
                y2="105"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />

              <text
                x="920"
                y="83"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#15803d"
              >
                الهدف
              </text>

            </svg>

          </div>

        </div>
      </div>

    </div>
  );
}


/* =========================================================
   BEGINNER VISUAL 2
   FIVE-MINUTE SCALPING
========================================================= */

function FiveMinuteScalpingChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">

        <div className="flex items-center justify-between gap-3">

          <div>
            <h3 className="text-[14px] font-black text-slate-950">
              مثال بصري: سكالبينج 5 دقائق
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-500">
              اتجاه واضح ← ارتداد ← رفض سعري ← استئناف الحركة
            </p>
          </div>

          <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
            5m
          </span>

        </div>

      </div>


      <svg
        viewBox="0 0 1000 400"
        className="block w-full"
        role="img"
        aria-label="مثال بصري على استراتيجية سكالبينج خمس دقائق"
      >
        <rect width="1000" height="400" fill="#ffffff" />

        {[80, 145, 210, 275, 340].map((y) => (
          <line
            key={y}
            x1="55"
            y1={y}
            x2="945"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* SUPPORT */}
        <rect
          x="430"
          y="250"
          width="265"
          height="58"
          rx="12"
          fill="#eef5fd"
          stroke="#93c5fd"
        />

        <text
          x="562"
          y="284"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#1e5bb8"
        >
          منطقة ارتداد محتملة
        </text>


        {/* PRICE */}
        <polyline
          points="
            65,315
            145,260
            220,280
            305,205
            380,225
            470,150
            545,190
            610,265
            680,230
            755,165
            835,120
            925,78
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* REJECTION */}
        <circle
          cx="610"
          cy="265"
          r="11"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <text
          x="610"
          y="335"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#1d4ed8"
        >
          رفض المنطقة
        </text>


        {/* ENTRY */}
        <circle
          cx="680"
          cy="230"
          r="9"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="700"
          y="210"
          fontSize="13"
          fontWeight="900"
          fill="#15803d"
        >
          دخول
        </text>


        {/* TARGET */}
        <line
          x1="750"
          y1="110"
          x2="930"
          y2="110"
          stroke="#16a34a"
          strokeWidth="2.5"
          strokeDasharray="8 6"
        />

        <text
          x="840"
          y="88"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          الهدف
        </text>

      </svg>


      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
          <strong className="font-black text-slate-900">
            الفكرة:
          </strong>{" "}
          السعر في اتجاه صاعد ثم يعود إلى منطقة قريبة بدل أن يستمر مباشرة.
          إذا فشل البائعون في دفع السعر لأسفل وظهر استئناف للصعود، يصبح لدينا
          سيناريو أوضح من الدخول بعد حركة ممتدة.
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   BEGINNER VISUAL 3
   EMA + PRICE ACTION
========================================================= */

function EmaPriceActionScalpingChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">

        <div className="flex items-center justify-between gap-3">

          <div>
            <h3 className="text-[14px] font-black text-slate-950">
              كيف تستخدم EMA في السكالبينج؟
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-500">
              الاتجاه أولًا، ثم الارتداد، ثم التأكيد
            </p>
          </div>

          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-black text-amber-700">
            EMA
          </span>

        </div>

      </div>


      {/* DESKTOP */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 1100 470"
          className="block w-full"
          role="img"
          aria-label="مثال على استراتيجية EMA مع حركة السعر للسكالبينج"
        >
          <rect width="1100" height="470" fill="#ffffff" />

          {[85, 155, 225, 295, 365].map((y) => (
            <line
              key={y}
              x1="60"
              y1={y}
              x2="1040"
              y2={y}
              stroke="#eef2f7"
            />
          ))}


          {/* EMA */}
          <path
            d="
              M 70 320
              Q 170 300 260 275
              T 440 225
              T 620 190
              T 800 145
              T 1020 110
            "
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
          />

          <text
            x="120"
            y="292"
            fontSize="14"
            fontWeight="900"
            fill="#b45309"
          >
            EMA
          </text>


          {/* PRICE */}
          <polyline
            points="
              75,345
              160,280
              240,305
              325,225
              405,245
              495,170
              570,205
              645,260
              715,210
              785,135
              865,165
              950,100
              1020,125
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* PULLBACK */}
          <circle
            cx="645"
            cy="260"
            r="11"
            fill="#fff7ed"
            stroke="#f59e0b"
            strokeWidth="4"
          />

          <text
            x="645"
            y="297"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#b45309"
          >
            ارتداد نحو EMA
          </text>


          {/* CONFIRMATION */}
          <circle
            cx="715"
            cy="210"
            r="9"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="3"
          />

          <text
            x="735"
            y="190"
            fontSize="13"
            fontWeight="900"
            fill="#1d4ed8"
          >
            عودة الزخم
          </text>


          {/* ENTRY */}
          <line
            x1="760"
            y1="285"
            x2="760"
            y2="205"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <polygon
            points="760,192 752,210 768,210"
            fill="#16a34a"
          />

          <text
            x="782"
            y="243"
            fontSize="14"
            fontWeight="900"
            fill="#15803d"
          >
            Entry
          </text>


          {/* STOP */}
          <line
            x1="620"
            y1="315"
            x2="810"
            y2="315"
            stroke="#ef4444"
            strokeWidth="2.5"
          />

          <text
            x="810"
            y="338"
            textAnchor="end"
            fontSize="12"
            fontWeight="900"
            fill="#dc2626"
          >
            Stop Loss
          </text>


          {/* TARGET */}
          <line
            x1="810"
            y1="100"
            x2="1015"
            y2="100"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          <text
            x="910"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#15803d"
          >
            Take Profit
          </text>


          {/* RULE */}
          <rect
            x="170"
            y="395"
            width="760"
            height="40"
            rx="20"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x="550"
            y="420"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#475569"
          >
            السعر فوق EMA ≠ شراء فوري | انتظر الارتداد + عودة الزخم
          </text>

        </svg>

      </div>


      {/* MOBILE */}
      <div className="md:hidden">

        <a
          href="#ema-scalping-full"
          className="block cursor-zoom-in"
        >
          <svg
            viewBox="0 0 360 315"
            className="block w-full"
          >
            <rect width="360" height="315" fill="#ffffff" />

            {[60, 115, 170, 225].map((y) => (
              <line
                key={y}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}

            <path
              d="M25 235 Q90 220 150 195 T260 155 T335 125"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
            />

            <polyline
              points="
                25,255
                65,215
                105,230
                150,180
                190,200
                225,155
                260,195
                295,145
                335,105
              "
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="260"
              cy="195"
              r="7"
              fill="#fff7ed"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />

            <text
              x="260"
              y="218"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#b45309"
            >
              ارتداد
            </text>

            <circle
              cx="295"
              cy="145"
              r="7"
              fill="#dbeafe"
              stroke="#2563eb"
              strokeWidth="2.5"
            />

            <text
              x="295"
              y="130"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#1d4ed8"
            >
              تأكيد
            </text>

            <rect
              x="52"
              y="262"
              width="256"
              height="34"
              rx="12"
              fill="#f8fafc"
              stroke="#e2e8f0"
            />

            <text
              x="180"
              y="283"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="900"
              fill="#334155"
            >
              EMA → ارتداد → تأكيد → دخول
            </text>

          </svg>


          <div className="flex justify-center border-t border-slate-100 py-2.5">

            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              تكبير الرسم ↗
            </span>

          </div>

        </a>

      </div>


      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3">

        <p className="text-justify text-[12px] leading-6 text-slate-600 md:text-[13px]">
          <strong className="font-black text-slate-900">
            أهم شيء للمبتدئ:
          </strong>{" "}
          وجود السعر فوق EMA لا يعني الشراء مباشرة. في هذا المثال يتم استخدام
          المتوسط لتأكيد الاتجاه، ثم انتظار رجوع السعر نحوه، وبعد ظهور عودة
          في الزخم يتم دراسة الدخول.
        </p>

      </div>


      {/* FULLSCREEN */}
      <div
        id="ema-scalping-full"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#ema-price-action"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white">

          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                EMA + حركة السعر
              </div>

              <div className="text-[10px] text-slate-500">
                الاتجاه → الارتداد → عودة الزخم
              </div>
            </div>

            <a
              href="#ema-price-action"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold"
            >
              ×
            </a>

          </div>


          <div className="border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">
            ↔ حرّك الرسم يمينًا ويسارًا لمشاهدة التفاصيل
          </div>


          <div className="overflow-auto">

            <svg
              viewBox="0 0 1100 470"
              className="block min-w-[820px] w-full"
            >
              <rect width="1100" height="470" fill="#ffffff" />

              {[85, 155, 225, 295, 365].map((y) => (
                <line
                  key={y}
                  x1="60"
                  y1={y}
                  x2="1040"
                  y2={y}
                  stroke="#eef2f7"
                />
              ))}

              <path
                d="M70 320 Q170 300 260 275 T440 225 T620 190 T800 145 T1020 110"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="5"
              />

              <polyline
                points="75,345 160,280 240,305 325,225 405,245 495,170 570,205 645,260 715,210 785,135 865,165 950,100 1020,125"
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="645"
                cy="260"
                r="11"
                fill="#fff7ed"
                stroke="#f59e0b"
                strokeWidth="4"
              />

              <text
                x="645"
                y="297"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#b45309"
              >
                ارتداد نحو EMA
              </text>

              <circle
                cx="715"
                cy="210"
                r="9"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="3"
              />

              <text
                x="735"
                y="190"
                fontSize="13"
                fontWeight="900"
                fill="#1d4ed8"
              >
                عودة الزخم
              </text>

              <line
                x1="620"
                y1="315"
                x2="810"
                y2="315"
                stroke="#ef4444"
                strokeWidth="2.5"
              />

              <line
                x1="810"
                y1="100"
                x2="1015"
                y2="100"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeDasharray="8 6"
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

export default async function ScalpingStrategyPage() {
  const supabase = await createClient();


  /* =====================================================
      GET SCALPING BROKERS
  ====================================================== */

  const { data: accountRows, error } = await supabase
    .from("broker_accounts")
    .select(`
      id,
      broker_id,
      account_name,
      spread,
      commission,
      min_deposit,
      execution_type,
      best_for,
      sort_order,
      spread_avg,
      spread_min,
      account_type,
      is_islamic_available,
      commission_value,
      is_best_for_scalping,
      broker:brokers!broker_accounts_broker_id_fkey (
        id,
        name,
        slug,
        logo,
        rating,
        regulation,
        regulation_short,
        platforms,
        arabic_support,
        islamic_account,
        min_deposit,
        max_leverage,
        real_account_url,
        demo_account_url
      )
    `)
    .eq("is_best_for_scalping", true);


  if (error) {
    console.error(
      "Scalping strategy brokers query error:",
      error
    );
  }


  const rawAccounts =
    (accountRows ?? []) as unknown as RawScalpingBroker[];


  const availableScalpingBrokers: ValidScalpingBroker[] =
    rawAccounts.reduce<ValidScalpingBroker[]>(
      (result, row) => {
        const brokerValue = Array.isArray(row.broker)
          ? row.broker[0] ?? null
          : row.broker;

        if (!brokerValue) {
          return result;
        }

        const slug = normalizeBrokerSlug(
          brokerValue.slug
        );

        const name =
          brokerValue.name?.trim() ?? "";

        if (!slug || !name) {
          return result;
        }

        result.push({
          ...row,

          broker: {
            ...brokerValue,
            slug,
            name,
          },
        });

        return result;
      },
      []
    );


  /* =====================================================
      EXACT TOP 3 USED IN THE SCALPING BROKERS PAGE
  ====================================================== */

  const topThreeScalpingBrokers =
    availableScalpingBrokers
      .filter((item) =>
        Boolean(
          SCALPING_BROKER_EDITORIAL[
            item.broker.slug
          ]
        )
      )
      .sort((a, b) => {
        const rankA =
          SCALPING_BROKER_EDITORIAL[
            a.broker.slug
          ]?.rank ?? 999;

        const rankB =
          SCALPING_BROKER_EDITORIAL[
            b.broker.slug
          ]?.rank ?? 999;

        return rankA - rankB;
      })
      .slice(0, 3);


  return (
    <main
      dir="rtl"
      className="bg-white text-slate-900"
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
            استراتيجية السكالبينج
          </span>

        </nav>

      </div>


      {/* =====================================================
          HERO — SAME ICT DESIGN
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


              {/* BADGES */}
              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                  استراتيجيات التداول
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
                  دليل تعليمي 2026
                </span>

              </div>


              {/* H1 */}
              <h1 className="mt-4 max-w-[880px] text-[34px] font-black leading-[1.28] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                استراتيجية السكالبينج في الفوركس: شرح عملي للمبتدئين
              </h1>


              {/* DESCRIPTION */}
              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                تعلّم كيف تعمل{" "}
                <strong className="font-black text-slate-900">
                  استراتيجية السكالبينج
                </strong>{" "}
                وكيف تختار الإطار الزمني والدخول ووقف الخسارة، ولماذا يؤثر
                السبريد وسرعة التنفيذ بشكل مباشر على نتائج الصفقات القصيرة.
              </p>


              {/* CONCEPTS */}
              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-black text-slate-700">
                  1–5 دقائق
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  سبريد منخفض
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  تنفيذ سريع
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-black text-green-700">
                  أهداف قصيرة
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  إدارة مخاطر
                </span>

              </div>


              {/* META */}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                <span>
                  📅 15 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  آخر تحديث: 15 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  وقت القراءة: 15–20 دقيقة
                </span>

              </div>

            </div>


            {/* =========================
                VISUAL
            ========================= */}

            <div className="flex items-center justify-center border-r border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:p-8">

              <div className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">


                {/* FAKE CHART HEADER */}
                <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

                  <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                  </div>

                  <span className="text-[10px] font-black text-slate-700">
                    Scalping Trade Model
                  </span>

                </div>


                {/* CHART */}
                <div className="p-4">
                  <ScalpingHeroChart />
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


              {/* BADGES */}
              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
                  استراتيجيات التداول
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600">
                  دليل 2026
                </span>

              </div>


              {/* TITLE */}
              <h1 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950">
                استراتيجية السكالبينج في الفوركس: شرح عملي للمبتدئين
              </h1>


              {/* DESCRIPTION */}
              <p className="mt-3 text-[14px] leading-[1.9] text-slate-600">
                دليل عملي لفهم{" "}
                <strong className="font-black text-slate-900">
                  الدخول السريع والسبريد والإطار الزمني وإدارة المخاطر
                </strong>{" "}
                في صفقات السكالبينج.
              </p>


              {/* META */}
              <div className="mt-2.5 flex items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 15 أغسطس 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 15–20 دقيقة
                </span>

              </div>

            </div>


            {/* MOBILE CHART */}
            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

                <div className="px-2 py-1.5">
                  <ScalpingHeroChart />
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ARTICLE
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1520px] px-3 pb-6 sm:px-5 md:pb-8 lg:px-6">

        <article className="space-y-6 md:space-y-8">


          {/* =================================================
              CONTENT MENU
          ================================================= */}

          <section className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-3">

              <div className="text-[13px] font-black text-slate-950">
                محتويات دليل استراتيجية السكالبينج
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                انتقل مباشرة إلى القسم الذي تريد تعلمه
              </div>

            </div>


            {/* MOBILE */}
            <div className="grid grid-cols-2 gap-px bg-slate-100 md:hidden">

              {[
                ["01", "ما هو السكالبينج؟", "#what-is-scalping"],
                ["02", "كيف يعمل؟", "#how-scalping-works"],
                ["03", "الإطار الزمني", "#timeframes"],
                ["04", "السبريد والتنفيذ", "#cost-execution"],
                ["05", "استراتيجية 1 دقيقة", "#one-minute"],
                ["06", "استراتيجية 5 دقائق", "#five-minute"],
                ["07", "EMA + حركة السعر", "#ema-price-action"],
                ["08", "أفضل 3 وسطاء", "#scalping-brokers"],
                ["09", "أفضل الأسواق", "#best-markets"],
                ["10", "إدارة المخاطر", "#risk-management"],
                ["11", "الأخطاء والمميزات", "#pros-cons"],
                ["12", "الأسئلة الشائعة", "#faq"],
              ].map(([no, title, href]) => (
                <a
                  key={no}
                  href={href}
                  className="flex items-center gap-2 bg-white px-3 py-2.5"
                >

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                    {no}
                  </span>

                  <span className="text-[10px] font-black leading-4 text-slate-700">
                    {title}
                  </span>

                </a>
              ))}

            </div>


            {/* DESKTOP */}
            <div className="hidden grid-cols-6 gap-px bg-slate-100 md:grid">

              {[
                ["01", "ما هو السكالبينج؟", "#what-is-scalping"],
                ["02", "كيف يعمل؟", "#how-scalping-works"],
                ["03", "الإطار الزمني", "#timeframes"],
                ["04", "السبريد والتنفيذ", "#cost-execution"],
                ["05", "سكالبينج دقيقة", "#one-minute"],
                ["06", "سكالبينج 5 دقائق", "#five-minute"],
                ["07", "EMA وحركة السعر", "#ema-price-action"],
                ["08", "أفضل الوسطاء", "#scalping-brokers"],
                ["09", "أفضل الأسواق", "#best-markets"],
                ["10", "إدارة المخاطر", "#risk-management"],
                ["11", "المميزات والعيوب", "#pros-cons"],
                ["12", "FAQ", "#faq"],
              ].map(([no, title, href]) => (
                <a
                  key={no}
                  href={href}
                  className="group flex items-center gap-2 bg-white px-3 py-3 transition hover:bg-brand-50/50"
                >

                  <span className="text-[10px] font-black text-brand-600">
                    {no}
                  </span>

                  <span className="text-[11px] font-black text-slate-700 transition group-hover:text-brand-600">
                    {title}
                  </span>

                </a>
              ))}

            </div>

          </section>


          {/* =================================================
              01 - WHAT IS SCALPING
          ================================================= */}

          <section
            id="what-is-scalping"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — الأساس
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما هي استراتيجية السكالبينج في الفوركس؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                استراتيجية السكالبينج هي أسلوب تداول قصير المدى يهدف إلى
                الاستفادة من تحركات سعرية صغيرة من خلال فتح وإغلاق الصفقات
                بسرعة نسبيًا. بدل انتظار حركة كبيرة خلال عدة ساعات أو أيام،
                يبحث متداول السكالبينج عن فرص متكررة بأهداف محدودة وإدارة
                دقيقة للتكلفة والمخاطر.
              </p>

            </div>


            {/* QUICK FACTS */}
            <div className="grid grid-cols-2 gap-px border-b border-slate-200 bg-slate-200 md:grid-cols-4">

              {[
                {
                  label: "مدة الصفقة",
                  value: "ثوانٍ → دقائق",
                },
                {
                  label: "الأطر الشائعة",
                  value: "1m / 5m",
                },
                {
                  label: "عامل حاسم",
                  value: "تكلفة التداول",
                },
                {
                  label: "مستوى النشاط",
                  value: "مرتفع",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white px-3 py-3 md:px-4 md:py-4"
                >

                  <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
                    {item.label}
                  </div>

                  <div className="mt-1 text-[13px] font-black text-slate-950 md:text-[15px]">
                    {item.value}
                  </div>

                </div>
              ))}

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-5 lg:grid-cols-[1fr_300px]">


                {/* MAIN */}
                <div>

                  <div className="border-r-[3px] border-brand-500 pr-3">

                    <h3 className="text-[16px] font-black text-slate-950">
                      السكالبينج باختصار
                    </h3>

                    <p className="mt-1.5 text-justify text-[14px] leading-7 text-slate-700">
                      المتداول لا يحاول توقع حركة كبيرة، بل يبحث عن جزء صغير
                      من الحركة ثم يخرج. لهذا تصبح{" "}
                      <strong className="font-black text-slate-900">
                        سرعة التنفيذ والسبريد والانزلاق ووقف الخسارة
                      </strong>{" "}
                      أكثر أهمية من كثير من استراتيجيات التداول الأطول.
                    </p>

                  </div>


                  <div className="mt-4 space-y-3 text-justify text-[14px] leading-7 text-slate-700 md:text-[15px] md:leading-8">

                    <p>
                      قد يفتح متداول السكالبينج عدة صفقات خلال جلسة واحدة،
                      لكن كثرة الصفقات ليست الهدف بحد ذاتها. الهدف هو تنفيذ
                      نموذج واضح بصورة متكررة عندما تتوافر شروطه، مع إبقاء
                      الخسارة المحتملة محدودة إذا لم يتحرك السعر كما هو متوقع.
                    </p>

                    <p>
                      ويمكن تطبيق السكالبينج باستخدام حركة السعر فقط، أو
                      دمجه مع أدوات مثل المتوسطات المتحركة ومناطق الدعم
                      والمقاومة والزخم. لكن كلما كان الهدف السعري أصغر، أصبحت
                      تكلفة الدخول والخروج أكثر تأثيرًا على النتيجة النهائية.
                    </p>

                  </div>


                  <div className="mt-4">

                    <ImportantBox title="السكالبينج ليس مجرد فتح صفقات بسرعة">
                      السرعة جزء من الأسلوب، لكنها لا تعني التداول العشوائي.
                      المتداول يحتاج إلى شروط دخول واضحة، ووقف خسارة محدد،
                      وحد أقصى للمخاطرة وعدد صفقات يستطيع متابعتها بانضباط.
                    </ImportantBox>

                  </div>

                </div>


                {/* SIDE */}
                <aside className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="text-[10px] font-black text-brand-600">
                    قبل أن تبدأ
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    هل يناسبك السكالبينج؟
                  </h3>


                  <div className="mt-3 space-y-2">

                    {[
                      "تستطيع متابعة السوق بتركيز.",
                      "تتقبل اتخاذ قرارات سريعة.",
                      "تلتزم بوقف خسارة واضح.",
                      "لا تطارد السعر بعد فوات الفرصة.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-[12px] leading-6 text-slate-600"
                      >

                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />

                        <span>
                          {item}
                        </span>

                      </div>
                    ))}

                  </div>


                  <div className="mt-4 border-t border-slate-200 pt-3">

                    <p className="text-[11px] leading-5 text-slate-500">
                      إذا كنت تفضل قرارات أبطأ ومتابعة أقل للشاشة، فقد تكون
                      استراتيجيات مثل Swing Trading أكثر ملاءمة لك.
                    </p>

                  </div>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              02 - HOW SCALPING WORKS
          ================================================= */}

          <section
            id="how-scalping-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — طريقة العمل
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                كيف تعمل استراتيجية السكالبينج خطوة بخطوة؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا توجد طريقة واحدة للسكالبينج، لكن أغلب النماذج المنظمة
                تشترك في تسلسل واضح: تحديد اتجاه أو سياق قصير المدى، انتظار
                منطقة دخول، الحصول على تأكيد، ثم تنفيذ الصفقة بهدف ووقف
                خسارة محددين مسبقًا.
              </p>

            </div>


            <div className="p-4 md:p-7">


              {/* DESKTOP STEPS */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "حدد السياق",
                    text: "هل الحركة القصيرة صاعدة، هابطة أم عرضية؟",
                  },
                  {
                    no: "02",
                    title: "انتظر المنطقة",
                    text: "لا تدخل في منتصف الحركة بعد امتداد السعر.",
                  },
                  {
                    no: "03",
                    title: "ابحث عن تأكيد",
                    text: "راقب عودة الزخم أو رفض السعر للمنطقة.",
                  },
                  {
                    no: "04",
                    title: "حدد المخاطرة",
                    text: "ضع الوقف وحجم الصفقة قبل التنفيذ.",
                  },
                  {
                    no: "05",
                    title: "اخرج وفق الخطة",
                    text: "الهدف قصير ولا تحوّل الصفقة إلى استثمار.",
                  },
                ].map((step) => (
                  <article
                    key={step.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                        {step.no}
                      </div>

                      <h3 className="text-[14px] font-black leading-6 text-slate-950">
                        {step.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      {step.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE STEPS */}
              <div className="md:hidden">

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

                  {[
                    {
                      no: "01",
                      title: "حدد السياق",
                      text: "اعرف اتجاه الحركة القصيرة أولًا.",
                    },
                    {
                      no: "02",
                      title: "انتظر المنطقة",
                      text: "تجنب مطاردة السعر بعد حركة قوية.",
                    },
                    {
                      no: "03",
                      title: "انتظر التأكيد",
                      text: "راقب رد فعل السعر وعودة الزخم.",
                    },
                    {
                      no: "04",
                      title: "حدد المخاطرة",
                      text: "الوقف وحجم الصفقة قبل الدخول.",
                    },
                    {
                      no: "05",
                      title: "نفذ الخروج",
                      text: "التزم بالهدف القصير المخطط.",
                    },
                  ].map((step, index) => (
                    <div
                      key={step.no}
                      className={`px-3.5 py-3 ${
                        index !== 4
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                          {step.no}
                        </div>

                        <div className="min-w-0">

                          <h3 className="text-[14px] font-black text-slate-950">
                            {step.title}
                          </h3>

                          <p className="mt-0.5 text-[11px] leading-5 text-slate-600">
                            {step.text}
                          </p>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              {/* CHART */}
              <div className="mt-5">
                <ScalpingFlowChart />
              </div>

            </div>

          </section>


          {/* =================================================
              03 - TIMEFRAMES
          ================================================= */}

          <section
            id="timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — الإطار الزمني
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما أفضل إطار زمني للسكالبينج؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                أشهر الأطر المستخدمة في السكالبينج هي الدقيقة الواحدة و5
                دقائق، لكن الإطار الأصغر ليس أفضل تلقائيًا. كلما صغر الإطار
                زادت الضوضاء السعرية وسرعة اتخاذ القرار، لذلك يجب اختيار
                الإطار الذي يناسب خبرتك وطريقة تنفيذك.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">


                {/* 1M */}
                <div className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <span className="text-[9px] font-black text-rose-700">
                        سريع جدًا
                      </span>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        إطار الدقيقة 1m
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-rose-100 text-[11px] font-black text-rose-700">
                      1m
                    </div>

                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-slate-600">
                    يعطي عددًا أكبر من الإشارات لكنه أكثر حساسية للضوضاء
                    والانزلاق والتغير السريع في السبريد.
                  </p>

                </div>


                {/* 5M */}
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <span className="text-[9px] font-black text-brand-600">
                        متوازن للمبتدئ
                      </span>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        إطار 5 دقائق
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brand-600 text-[11px] font-black text-white">
                      5m
                    </div>

                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-slate-600">
                    أبطأ من الدقيقة ويمنح وقتًا أكبر لقراءة الحركة، لذلك
                    يعتبر نقطة بداية عملية لكثير من المتداولين الجدد.
                  </p>

                </div>


                {/* 15M */}
                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <span className="text-[9px] font-black text-slate-500">
                        للسياق
                      </span>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        إطار 15 دقيقة
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-slate-200 text-[11px] font-black text-slate-700">
                      15m
                    </div>

                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-slate-600">
                    يمكن استخدامه لفهم الاتجاه والسياق قبل الانتقال إلى
                    إطار أصغر للبحث عن تنفيذ أدق.
                  </p>

                </div>

              </div>


              {/* PRACTICAL WORKFLOW */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  طريقة بسيطة لاستخدام أكثر من إطار
                </h3>

                <div className="mt-3 grid gap-2 md:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "15 دقيقة",
                      text: "فهم الاتجاه والسياق",
                    },
                    {
                      no: "02",
                      title: "5 دقائق",
                      text: "تحديد منطقة الفرصة",
                    },
                    {
                      no: "03",
                      title: "1 دقيقة",
                      text: "تحسين الدخول عند الحاجة",
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

                <ImportantBox title="لا تجعل الإطار الأصغر يجبرك على التداول أكثر">
                  إذا لم توجد فرصة واضحة على إطار 5 دقائق، الانتقال إلى دقيقة
                  واحدة لا يعني أن عليك إيجاد صفقة. الإطار الأصغر يجب أن
                  يساعد على تحسين التنفيذ، لا على صناعة فرصة غير موجودة.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              04 - SPREAD / EXECUTION
          ================================================= */}

          <section
            id="cost-execution"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — التكلفة والتنفيذ
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                لماذا السبريد وسرعة التنفيذ مهمان جدًا للسكالبينج؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لأن هدف صفقة السكالبينج يكون صغيرًا نسبيًا، فإن تكلفة التداول
                قد تستهلك جزءًا كبيرًا من الحركة المستهدفة. لذلك لا يكفي أن
                تكون استراتيجية الدخول جيدة؛ يجب أيضًا فهم السبريد والعمولة
                والانزلاق وطريقة تنفيذ الأوامر.
              </p>

            </div>


            <div className="p-4 md:p-7">


              {/* FOUR FACTORS */}
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">

                {[
                  {
                    title: "السبريد",
                    value: "كلما انخفض كان أفضل",
                    text: "مهم لأن الهدف السعري صغير.",
                  },
                  {
                    title: "العمولة",
                    value: "احسبها مع السبريد",
                    text: "خصوصًا في حسابات Raw.",
                  },
                  {
                    title: "الانزلاق",
                    value: "قد يغير سعر التنفيذ",
                    text: "يزداد أثناء الحركة السريعة.",
                  },
                  {
                    title: "سرعة التنفيذ",
                    value: "عامل أساسي",
                    text: "التأخير مؤثر في الصفقات القصيرة.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4"
                  >

                    <div className="text-[9px] font-black text-brand-600 md:text-[10px]">
                      {item.title}
                    </div>

                    <div className="mt-1.5 text-[13px] font-black leading-6 text-slate-950 md:text-[15px]">
                      {item.value}
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500 md:text-[11px]">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              {/* EXAMPLE */}
              <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_320px]">

                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <h3 className="text-[16px] font-black text-slate-950">
                    مثال بسيط على تأثير التكلفة
                  </h3>

                  <p className="mt-2 text-justify text-[13px] leading-7 text-slate-700 md:text-[14px]">
                    إذا كان هدف الصفقة صغيرًا، فإن فرقًا بسيطًا في السبريد
                    أو العمولة يمكن أن يؤثر بصورة ملحوظة على صافي النتيجة.
                    ولهذا السبب يقارن متداول السكالبينج{" "}
                    <strong className="font-black text-slate-900">
                      التكلفة الإجمالية
                    </strong>{" "}
                    بدل التركيز فقط على عبارة “سبريد يبدأ من 0.0”.
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-white p-4">

                  <div className="text-[10px] font-black text-brand-600">
                    دليل مرتبط
                  </div>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    كيف يعمل السبريد؟
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
                    افهم الفرق بين سعر الشراء والبيع وكيف تدخل تكلفة السبريد
                    في كل صفقة.
                  </p>

                  <Link
                    href="/learn-trading/spread"
                    className="mt-3 inline-flex items-center gap-2 text-[12px] font-black text-brand-600 hover:underline"
                  >
                    شرح السبريد بالتفصيل
                    <span aria-hidden="true">
                      ←
                    </span>
                  </Link>

                </div>

              </div>


              {/* COMMERCIAL BRIDGE */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_100%)] p-4">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="text-[10px] font-black text-brand-600">
                      اختيار الوسيط يؤثر على التنفيذ
                    </div>

                    <h3 className="mt-1 text-[16px] font-black text-slate-950">
                      قارن شركات الفوركس المناسبة للسكالبينج
                    </h3>

                    <p className="mt-1.5 max-w-3xl text-[12px] leading-6 text-slate-600">
                      لدينا مقارنة مستقلة للوسطاء حسب حسابات Raw وECN
                      والسبريد والعمولة والمنصات المناسبة للمتداول النشط.
                    </p>

                  </div>


                  <Link
                    href="/best-brokers/scalping"
                    className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700"
                  >
                    أفضل شركات الفوركس للسكالبينج
                    <span className="mr-2">
                      ←
                    </span>
                  </Link>

                </div>

              </div>

            </div>

          </section>
                    {/* =================================================
              05 - ONE MINUTE SCALPING
          ================================================= */}

          <section
            id="one-minute"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fff8fa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — سكالبينج الدقيقة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                استراتيجية سكالبينج الدقيقة 1m: كيف تستخدمها بدون مطاردة السعر؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                إطار الدقيقة الواحدة يعطي عددًا كبيرًا من الحركات والإشارات،
                لكنه في المقابل أكثر حساسية للضوضاء السعرية واتساع السبريد
                والانزلاق. لذلك الأفضل استخدامه كإطار تنفيذ دقيق بعد تحديد
                الاتجاه والسياق على إطار أكبر، وليس كأداة لاتخاذ جميع القرارات
                منفردًا.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* TOP GRID */}
              <div className="grid gap-3 md:grid-cols-3">

                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <span className="text-[9px] font-black text-brand-600">
                    الخطوة 01
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    حدد الاتجاه أولًا
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    استخدم إطار 5 أو 15 دقيقة لفهم الاتجاه العام بدل قراءة
                    كل شمعة دقيقة بصورة منفصلة.
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <span className="text-[9px] font-black text-slate-500">
                    الخطوة 02
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    انتظر ارتدادًا قصيرًا
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    بدل الشراء بعد حركة صعود سريعة، انتظر عودة السعر إلى منطقة
                    منطقية ثم راقب استئناف الاتجاه.
                  </p>

                </div>


                <div className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                  <span className="text-[9px] font-black text-rose-700">
                    الخطوة 03
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    حدد خروجك قبل الدخول
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    في السكالبينج السريع يجب أن تعرف نقطة إلغاء السيناريو
                    والهدف قبل تنفيذ الأمر.
                  </p>

                </div>

              </div>


              {/* PRACTICAL MODEL */}
<div className="mt-4 overflow-hidden rounded-[18px] border border-slate-200 bg-white">

  <div className="flex flex-col lg:grid lg:grid-cols-[1.55fr_0.45fr]">

    {/* STEPS */}
    <div className="p-4 md:p-5 lg:border-l lg:border-slate-200">

      <div className="flex items-center justify-between gap-3">

        <div>
          <div className="text-[9px] font-black text-brand-600">
            سيناريو تعليمي
          </div>

          <h3 className="mt-1 text-[17px] font-black text-slate-950">
            نموذج بسيط لسكالبينج الدقيقة
          </h3>
        </div>

        <span className="hidden rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 lg:inline-flex">
          5m → 1m
        </span>

      </div>


      {/* DESKTOP — 2 COLUMNS TO REMOVE EMPTY SPACE */}
      <div className="mt-4 hidden gap-x-5 gap-y-3 lg:grid lg:grid-cols-2">

        {[
          "الاتجاه على 5 دقائق صاعد.",
          "السعر يتراجع على إطار الدقيقة بدل الاستمرار عموديًا.",
          "يظهر رفض سعري أو عودة في الزخم بعد الارتداد.",
          "الدخول يتم بعد التأكيد، وليس أثناء الهبوط نفسه.",
          "وقف الخسارة أسفل المنطقة التي تلغي الفكرة.",
          "الهدف قصير ويُحدد مسبقًا حسب بنية الحركة والتكلفة.",
        ].map((item, index) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-[12px] bg-slate-50/70 px-3 py-2.5"
          >

            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[9px] font-black text-white">
              {index + 1}
            </span>

            <p className="text-[12px] leading-6 text-slate-600">
              {item}
            </p>

          </div>
        ))}

      </div>


      {/* MOBILE / TABLET — KEEP CURRENT STACK */}
      <div className="mt-3 space-y-2.5 lg:hidden">

        {[
          "الاتجاه على 5 دقائق صاعد.",
          "السعر يتراجع على إطار الدقيقة بدل الاستمرار عموديًا.",
          "يظهر رفض سعري أو عودة في الزخم بعد الارتداد.",
          "الدخول يتم بعد التأكيد، وليس أثناء الهبوط نفسه.",
          "وقف الخسارة أسفل المنطقة التي تلغي الفكرة.",
          "الهدف قصير ويُحدد مسبقًا حسب بنية الحركة والتكلفة.",
        ].map((item, index) => (
          <div
            key={item}
            className="flex items-start gap-3"
          >

            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[9px] font-black text-brand-600">
              {index + 1}
            </span>

            <p className="text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
              {item}
            </p>

          </div>
        ))}

      </div>

    </div>


    {/* WARNING */}
    <aside className="border-t border-amber-100 bg-amber-50/55 p-4 md:p-5 lg:flex lg:flex-col lg:justify-center lg:border-t-0">

      <div className="inline-flex w-fit rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-black text-amber-700">
        انتبه
      </div>

      <h3 className="mt-2 text-[16px] font-black leading-6 text-slate-950">
        الدقيقة ليست مناسبة لكل متداول
      </h3>

      <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
        حركة السعر أسرع، والوقت المتاح لاتخاذ القرار أقل، كما أن تأثير
        السبريد والانزلاق يصبح أكثر وضوحًا.
      </p>

      <p className="mt-2 text-justify text-[12px] leading-6 text-slate-600">
        إذا كان إطار 5 دقائق يمنحك قراءة أوضح وقرارات أكثر انضباطًا، فلا
        يوجد سبب للانتقال إلى الدقيقة فقط للحصول على صفقات أكثر.
      </p>

    </aside>

  </div>

</div>

{/* BEGINNER VISUAL */}
<div className="mt-4">
  <OneMinuteScalpingChart />
</div>

              {/* MINI FLOW */}
              <div className="mt-4 overflow-hidden rounded-[18px] border border-slate-200">

                <div className="grid grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">

                  {[
                    ["01", "اتجاه 5m"],
                    ["02", "انتقال إلى 1m"],
                    ["03", "انتظار الارتداد"],
                    ["04", "ظهور التأكيد"],
                    ["05", "تنفيذ وخروج"],
                  ].map(([no, text]) => (
                    <div
                      key={no}
                      className="bg-white px-3 py-3 text-center"
                    >

                      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {no}
                      </div>

                      <div className="mt-1.5 text-[11px] font-black leading-5 text-slate-700">
                        {text}
                      </div>

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="المشكلة الأكبر في سكالبينج الدقيقة هي الإفراط في التداول">
                  ظهور حركة جديدة كل دقيقة لا يعني وجود فرصة جديدة. يجب أن
                  تكون لديك شروط محددة تمنعك من فتح صفقة لمجرد أن السعر بدأ
                  يتحرك بسرعة.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              06 - FIVE MINUTE SCALPING
          ================================================= */}

          <section
            id="five-minute"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — سكالبينج 5 دقائق
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                استراتيجية سكالبينج 5 دقائق: نموذج أبسط للمبتدئ
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                إطار 5 دقائق يمنح المتداول وقتًا أكبر لرؤية الاتجاه والمناطق
                السعرية مقارنة بإطار الدقيقة، ولهذا يمكن أن يكون بداية أكثر
                عملية لمن يريد تعلم السكالبينج بدون اتخاذ قرار جديد كل عدة
                ثوانٍ.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* MAIN MODEL */}
              <div className="grid gap-4 lg:grid-cols-[1fr_300px]">

                <div>

                  <h3 className="text-[17px] font-black text-slate-950">
                    نموذج اتجاه + ارتداد على 5 دقائق
                  </h3>

                  <p className="mt-2 text-justify text-[14px] leading-7 text-slate-600">
                    من الطرق البسيطة دراسة اتجاه قصير واضح ثم انتظار تصحيح
                    بدل الدخول بعد امتداد الحركة. إذا استعاد السعر الزخم بعد
                    الارتداد، يمكن دراسة فرصة في اتجاه الحركة الأصلية مع وقف
                    خسارة أسفل آخر منطقة تلغي السيناريو.
                  </p>


                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {[
                      {
                        title: "1. اتجاه واضح",
                        text: "قمم وقيعان تدعم اتجاه الحركة القصيرة.",
                      },
                      {
                        title: "2. ارتداد منظم",
                        text: "عودة سعرية بدل مطاردة الحركة عند أعلى نقطة.",
                      },
                      {
                        title: "3. تأكيد",
                        text: "عودة الزخم أو اختراق قمة محلية صغيرة.",
                      },
                      {
                        title: "4. خروج مخطط",
                        text: "وقف وهدف محددان قبل التنفيذ.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[14px] border border-slate-200 bg-slate-50/50 px-3 py-3"
                      >

                        <div className="text-[12px] font-black text-slate-950">
                          {item.title}
                        </div>

                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                          {item.text}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>


                {/* SIDE */}
                <aside className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="text-[10px] font-black text-brand-600">
                    لماذا 5 دقائق؟
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    توازن بين السرعة والوضوح
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    الإطار ما زال سريعًا بما يكفي للسكالبينج، لكنه يقلل جزءًا
                    من الضوضاء الموجودة على الدقيقة ويمنح وقتًا أطول لتقييم
                    السيناريو.
                  </p>

                  <div className="mt-3 border-t border-brand-100 pt-3">

                    <div className="text-[11px] font-black text-slate-700">
                      مناسب للتعلم:
                    </div>

                    <div className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">

                      <div>
                        • قراءة الاتجاه
                      </div>

                      <div>
                        • تحديد مناطق الارتداد
                      </div>

                      <div>
                        • بناء قواعد دخول ثابتة
                      </div>

                    </div>

                  </div>

                </aside>

              </div>

{/* BEGINNER VISUAL */}
<div className="mt-4">
  <FiveMinuteScalpingChart />
</div>

              {/* COMPARISON */}
              <div className="mt-4 overflow-hidden rounded-[18px] border border-slate-200">

                <div className="grid grid-cols-[1fr_1fr_1fr] bg-slate-50 text-[10px] font-black text-slate-500">

                  <div className="px-3 py-2.5">
                    العامل
                  </div>

                  <div className="px-3 py-2.5 text-center">
                    1 دقيقة
                  </div>

                  <div className="px-3 py-2.5 text-center">
                    5 دقائق
                  </div>

                </div>


                {[
                  ["سرعة القرار", "عالية جدًا", "عالية"],
                  ["عدد الإشارات", "أكثر", "أقل نسبيًا"],
                  ["الضوضاء السعرية", "مرتفعة", "أقل"],
                  ["سهولة التعلم", "أصعب", "أسهل نسبيًا"],
                ].map(([name, one, five], index) => (
                  <div
                    key={name}
                    className={`grid grid-cols-[1fr_1fr_1fr] text-[11px] ${
                      index !== 3
                        ? "border-t border-slate-100"
                        : "border-t border-slate-100"
                    }`}
                  >

                    <div className="px-3 py-2.5 font-black text-slate-700">
                      {name}
                    </div>

                    <div className="px-3 py-2.5 text-center text-slate-500">
                      {one}
                    </div>

                    <div className="px-3 py-2.5 text-center font-black text-brand-600">
                      {five}
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              07 - EMA + PRICE ACTION
          ================================================= */}

          <section
            id="ema-price-action"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — نموذج تطبيقي
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                استراتيجية سكالبينج EMA مع حركة السعر
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                يمكن استخدام المتوسط المتحرك كأداة تساعد على قراءة الاتجاه
                والزخم، لكن الأفضل عدم التعامل معه كإشارة دخول منفردة. في هذا
                النموذج نستخدم EMA لتحديد اتجاه قصير ثم ننتظر تفاعل السعر حوله
                قبل التفكير في الصفقة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* SETTINGS */}
              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    label: "الإطار",
                    value: "5 دقائق",
                    text: "مع إمكانية استخدام 1m للتنفيذ.",
                  },
                  {
                    label: "المتوسط",
                    value: "EMA",
                    text: "أداة اتجاه وليست إشارة مستقلة.",
                  },
                  {
                    label: "الدخول",
                    value: "بعد ارتداد",
                    text: "لا تدخل بعد امتداد السعر.",
                  },
                  {
                    label: "الخروج",
                    value: "هدف قصير",
                    text: "وفق الخطة والتكلفة.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3.5"
                  >

                    <div className="text-[9px] font-black text-slate-500">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[15px] font-black text-slate-950">
                      {item.value}
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              {/* RULES */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* LONG */}
                <div className="rounded-[18px] border border-green-100 bg-green-50/40 p-4">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-100 text-[13px] font-black text-green-700">
                      ↑
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      مثال شراء
                    </h3>

                  </div>

                  <div className="mt-3 space-y-2">

                    {[
                      "السعر يتحرك فوق EMA ويظهر اتجاه قصير صاعد.",
                      "يحدث ارتداد نحو المتوسط أو منطقة دعم قريبة.",
                      "يتوقف الهبوط وتظهر عودة في الزخم الصاعد.",
                      "الدخول بعد التأكيد مع وقف أسفل المنطقة.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-[12px] leading-6 text-slate-600"
                      >

                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />

                        <span>
                          {item}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>


                {/* SHORT */}
                <div className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-rose-100 text-[13px] font-black text-rose-700">
                      ↓
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      مثال بيع
                    </h3>

                  </div>

                  <div className="mt-3 space-y-2">

                    {[
                      "السعر يتحرك أسفل EMA ويظهر اتجاه قصير هابط.",
                      "يحدث ارتداد صاعد نحو المتوسط أو مقاومة قريبة.",
                      "يتوقف الصعود وتظهر عودة في الزخم الهابط.",
                      "الدخول بعد التأكيد مع وقف أعلى المنطقة.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-[12px] leading-6 text-slate-600"
                      >

                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />

                        <span>
                          {item}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

              </div>

{/* EMA BEGINNER VISUAL */}
<div className="mt-4">
  <EmaPriceActionScalpingChart />
</div>

              {/* IMPORTANT */}
              <div className="mt-4">

                <ImportantBox title="تقاطع المتوسطات وحده لا يكفي">
                  إذا كنت تدخل كل مرة يعبر فيها السعر المتوسط أو يحدث تقاطع،
                  فقد تحصل على عدد كبير من الإشارات الخاطئة في السوق العرضي.
                  استخدم المتوسط كجزء من قراءة الاتجاه والسياق، وليس كزر شراء
                  أو بيع تلقائي.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              08 - TOP 3 SCALPING BROKERS
          ================================================= */}

          <section
            id="scalping-brokers"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                <div>

                  <SectionLabel>
                    08 — اختيار الوسيط
                  </SectionLabel>

                  <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                    أفضل 3 شركات فوركس للسكالبينج
                  </h2>

                  <p className="mt-3 max-w-4xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                    لأن السكالبينج يعتمد على صفقات قصيرة ومتكررة، يصبح اختيار
                    الوسيط جزءًا مهمًا من التطبيق العملي. فيما يلي أول ثلاثة
                    وسطاء في ترتيب بروكر العرب للسكالبينج بناءً على الحساب
                    المختار والتكلفة والمنصات وبيئة التداول.
                  </p>

                </div>


                <Link
                  href="/best-brokers/scalping"
                  className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-[11px] border border-brand-200 bg-white px-4 text-[11px] font-black text-brand-600 transition hover:bg-brand-50"
                >
                  عرض المقارنة الكاملة
                  <span className="mr-2">
                    ←
                  </span>
                </Link>

              </div>

            </div>


            <div className="p-4 md:p-6">


              {topThreeScalpingBrokers.length === 0 ? (

                <div className="rounded-[18px] border border-amber-200 bg-amber-50 p-5 text-center">

                  <h3 className="text-[16px] font-black text-amber-950">
                    لا توجد بيانات متاحة حاليًا
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-6 text-amber-800">
                    تحقق من الحسابات المفعّل لها is_best_for_scalping في قاعدة البيانات.
                  </p>

                </div>

              ) : (

                <div className="grid gap-3 lg:grid-cols-3">

                  {topThreeScalpingBrokers.map((item) => {
                    const editorial =
                      SCALPING_BROKER_EDITORIAL[
                        item.broker.slug
                      ];

                    if (!editorial) {
                      return null;
                    }

                    return (
                      <article
                        key={item.id}
                        className={`relative overflow-hidden rounded-[20px] border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                          editorial.rank === 1
                            ? "border-brand-200"
                            : "border-slate-200"
                        }`}
                      >

                        {/* TOP ACCENT */}
                        {editorial.rank === 1 && (
                          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-brand-600 via-brand-400 to-brand-200" />
                        )}


                        {/* RANK */}
                        <div className="flex items-center justify-between gap-3">

                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                              editorial.rank === 1
                                ? "bg-brand-50 text-brand-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            #{editorial.rank} {editorial.badge}
                          </span>

                          <span className="text-[10px] font-black text-slate-500">
                            تقييم {formatRating(item.broker.rating)}
                          </span>

                        </div>


                        {/* IDENTITY */}
                        <div className="mt-4 flex items-center gap-3">

                          <BrokerLogo
                            broker={item.broker}
                          />

                          <div className="min-w-0">

                            <Link
                              href={`/brokers/${item.broker.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[17px] font-black text-slate-950 transition hover:text-brand-600"
                            >
                              {item.broker.name}
                            </Link>

                            <div className="mt-1">
                              {renderStars(
                                item.broker.rating
                              )}
                            </div>

                            {item.account_name && (
                              <div className="mt-1 text-[10px] font-black text-brand-600">
                                {item.account_name}
                              </div>
                            )}

                          </div>

                        </div>


                        {/* REASON */}
                        <p className="mt-4 min-h-[72px] text-justify text-[12px] leading-6 text-slate-600">
                          {editorial.reason}
                        </p>


                        {/* ACCOUNT DATA */}
                        <div className="mt-4 grid grid-cols-2 gap-2">

                          <div className="rounded-[12px] bg-slate-50 px-3 py-2.5">

                            <div className="text-[9px] font-black text-slate-500">
                              السبريد
                            </div>

                            <div className="mt-1 text-[11px] font-black text-slate-950">
                              {accountSpread(item)}
                            </div>

                          </div>


                          <div className="rounded-[12px] bg-slate-50 px-3 py-2.5">

                            <div className="text-[9px] font-black text-slate-500">
                              العمولة
                            </div>

                            <div className="mt-1 text-[11px] font-black text-slate-950">
                              {accountCommission(item)}
                            </div>

                          </div>

                        </div>


                        {/* ACTIONS */}
                        <div className="mt-4 grid grid-cols-2 gap-2">

                          <Link
                            href={`/brokers/${item.broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 text-[11px] font-black text-brand-600 transition hover:bg-brand-50"
                          >
                            اقرأ التقييم
                          </Link>


                          {item.broker.real_account_url ? (

                            <a
                              href={`/go/${item.broker.slug}?type=real&source=scalping-strategy`}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-3 text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700"
                            >
                              فتح حساب
                            </a>

                          ) : (

                            <span className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-slate-100 px-3 text-[11px] font-black text-slate-400">
                              قريبًا
                            </span>

                          )}

                        </div>

                      </article>
                    );
                  })}

                </div>

              )}


              {/* DISCLAIMER + BIG CTA */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="text-[15px] font-black text-slate-950">
                      لا تختَر شركة السكالبينج من السبريد وحده
                    </h3>

                    <p className="mt-1.5 max-w-4xl text-[12px] leading-6 text-slate-600">
                      راجع التنظيم والحساب المختار والعمولة والمنصة وسياسة
                      التنفيذ والانزلاق قبل فتح الحساب. ترتيب الشركات قد يتغير
                      مع تغير الشروط أو البيانات.
                    </p>

                  </div>


                  <Link
                    href="/best-brokers/scalping"
                    className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-[11px] bg-brand-600 px-5 text-[11px] font-black text-white transition hover:bg-brand-700"
                  >
                    قارن جميع شركات السكالبينج
                    <span className="mr-2">
                      ←
                    </span>
                  </Link>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              09 - BEST MARKETS & SESSIONS
          ================================================= */}

          <section
            id="best-markets"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — الأسواق والتوقيت
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                ما أفضل أزواج الفوركس والأسواق للسكالبينج؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا يوجد أصل واحد هو الأفضل دائمًا للسكالبينج. المتداول يحتاج
                إلى سيولة جيدة، سبريد مناسب وحركة كافية لتغطية التكلفة، مع
                تجنب الظروف التي يصبح فيها التنفيذ غير مستقر أو تتسع فيها
                الفروقات السعرية بصورة كبيرة.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* MARKETS */}
              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    market: "EUR/USD",
                    badge: "سيولة مرتفعة",
                    text: "من أكثر الأزواج نشاطًا وغالبًا يتميز بتكلفة تداول تنافسية.",
                  },
                  {
                    market: "GBP/USD",
                    badge: "حركة أكبر",
                    text: "قد يقدم فرصًا أكثر لكنه يمكن أن يكون أسرع وأكثر تذبذبًا.",
                  },
                  {
                    market: "USD/JPY",
                    badge: "نشاط جيد",
                    text: "من الأزواج الرئيسية ذات السيولة المرتفعة في أوقات متعددة.",
                  },
                  {
                    market: "الذهب XAU/USD",
                    badge: "تذبذب قوي",
                    text: "شائع بين المتداولين النشطين لكن حركته ومخاطره أعلى.",
                  },
                ].map((item) => (
                  <div
                    key={item.market}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div
                      dir="ltr"
                      className="text-right text-[17px] font-black text-slate-950"
                    >
                      {item.market}
                    </div>

                    <div className="mt-1 text-[9px] font-black text-brand-600">
                      {item.badge}
                    </div>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              {/* SESSIONS */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="text-[10px] font-black text-slate-500">
                    جلسة لندن
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    نشاط قوي في أزواج العملات الرئيسية
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    بداية الجلسة الأوروبية وفترة تداخل لندن مع نيويورك قد
                    تشهدان سيولة وحركة أعلى، لذلك يتابعها كثير من متداولي
                    الفوركس النشطين.
                  </p>

                </div>


                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="text-[10px] font-black text-brand-600">
                    جلسة نيويورك
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    مهمة للدولار والذهب والمؤشرات
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    قد ترتفع الحركة خصوصًا عند افتتاح السوق الأمريكي أو صدور
                    بيانات اقتصادية مهمة، لكن الأخبار القوية ترفع أيضًا
                    احتمالية الانزلاق واتساع السبريد.
                  </p>

                </div>

              </div>


              {/* AVOID */}
              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[13px] font-black text-white">
                    !
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-[15px] font-black text-slate-950">
                      الأخبار القوية ليست فرصة سهلة للسكالبينج
                    </h3>

                    <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      زيادة التذبذب قد تبدو جذابة، لكن السبريد والانزلاق وسرعة
                      تغير السعر يمكن أن تجعل تنفيذ الوقف أو الدخول مختلفًا
                      عن المستوى الذي تراه على الرسم البياني.
                    </p>

                  </div>

                </div>

              </div>


              {/* INTERNAL LINKS */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <Link
                  href="/best-brokers/gold"
                  className="group rounded-[16px] border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >

                  <div className="text-[9px] font-black text-brand-600">
                    إذا كنت تتداول الذهب
                  </div>

                  <h3 className="mt-1 text-[15px] font-black text-slate-950 group-hover:text-brand-600">
                    أفضل شركات تداول الذهب
                  </h3>

                  <div className="mt-2 text-[11px] font-black text-brand-600">
                    عرض المقارنة ←
                  </div>

                </Link>


                <Link
                  href="/best-brokers/scalping"
                  className="group rounded-[16px] border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >

                  <div className="text-[9px] font-black text-brand-600">
                    لاختيار بيئة التنفيذ
                  </div>

                  <h3 className="mt-1 text-[15px] font-black text-slate-950 group-hover:text-brand-600">
                    أفضل شركات الفوركس للسكالبينج
                  </h3>

                  <div className="mt-2 text-[11px] font-black text-brand-600">
                    عرض الشركات ←
                  </div>

                </Link>

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
            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">
              <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black text-orange-700">
                10 — إدارة المخاطر
              </span>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                إدارة المخاطر في السكالبينج: كيف تحمي حسابك؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                كثرة الصفقات وسرعة التنفيذ تجعل إدارة المخاطر جزءًا أساسيًا
                من استراتيجية السكالبينج. صفقة واحدة بحجم مبالغ فيه قد تمحو
                نتيجة عدة صفقات ناجحة، لذلك يجب تحديد المخاطرة ووقف الخسارة
                قبل الضغط على زر الشراء أو البيع.
              </p>
            </div>

            <div className="p-4 md:p-7">
              {/* QUICK RULES */}
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
                {[
                  {
                    label: "المخاطرة",
                    value: "محدودة",
                    text: "حدد مبلغ الخسارة مسبقًا.",
                  },
                  {
                    label: "وقف الخسارة",
                    value: "قبل الدخول",
                    text: "ضع نقطة واضحة لإلغاء الفكرة.",
                  },
                  {
                    label: "عدد الصفقات",
                    value: "ليس الهدف",
                    text: "الجودة أهم من كثرة التنفيذ.",
                  },
                  {
                    label: "الخسارة اليومية",
                    value: "لها حد",
                    text: "توقف عند الوصول إلى حدك.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4"
                  >
                    <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[15px] font-black leading-6 text-slate-950 md:text-[17px]">
                      {item.value}
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500 md:text-[11px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* EXAMPLE + CALCULATOR */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">
                  <span className="text-[9px] font-black text-brand-600">
                    مثال تعليمي
                  </span>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
                    لا تجعل حجم الصفقة عشوائيًا
                  </h3>

                  <p className="mt-2.5 text-justify text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
                    إذا كان رصيد الحساب{" "}
                    <strong className="font-black text-slate-950">
                      2,000 دولار
                    </strong>{" "}
                    وحددت مخاطرة قدرها{" "}
                    <strong className="font-black text-slate-950">
                      0.5%
                    </strong>
                    ، فإن مبلغ المخاطرة المخطط له يساوي{" "}
                    <strong className="font-black text-slate-950">
                      10 دولارات
                    </strong>
                    .
                  </p>

                  <div className="mt-3 rounded-[14px] border border-brand-100 bg-white px-3 py-3">
                    <div
                      dir="ltr"
                      className="text-center text-[16px] font-black text-slate-950"
                    >
                      $2,000 × 0.5% = $10
                    </div>

                    <div className="mt-1 text-center text-[10px] leading-5 text-slate-500">
                      حجم الصفقة يتحدد بعد معرفة مكان وقف الخسارة
                    </div>
                  </div>
                </div>

                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[16px] font-black text-brand-600">
                      ∑
                    </div>

                    <div>
                      <h3 className="text-[17px] font-black text-slate-950 md:text-[19px]">
                        احسب المخاطرة قبل الصفقة
                      </h3>

                      <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                        استخدم حاسبة المخاطر لتقدير مبلغ المخاطرة قبل الدخول
                        بدل تغيير حجم الصفقة عشوائيًا.
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

{/* REALISTIC TRADE EXAMPLE */}
<div className="mt-3 overflow-hidden rounded-[14px] border border-slate-200 bg-white">

  <div className="border-b border-slate-100 bg-slate-50 px-3 py-2">

    <div className="flex items-center justify-between">

      <span className="text-[10px] font-black text-slate-700">
        مثال صفقة EUR/USD
      </span>

      <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
        تعليمي فقط
      </span>

    </div>

  </div>


  <div
    dir="ltr"
    className="grid grid-cols-3 gap-px bg-slate-100"
  >

    <div className="bg-white px-2 py-3 text-center">

      <div className="text-[9px] font-black text-slate-500">
        ENTRY
      </div>

      <div className="mt-1 text-[13px] font-black text-slate-950">
        1.0850
      </div>

    </div>


    <div className="bg-white px-2 py-3 text-center">

      <div className="text-[9px] font-black text-rose-600">
        STOP
      </div>

      <div className="mt-1 text-[13px] font-black text-slate-950">
        1.0845
      </div>

    </div>


    <div className="bg-white px-2 py-3 text-center">

      <div className="text-[9px] font-black text-green-600">
        TARGET
      </div>

      <div className="mt-1 text-[13px] font-black text-slate-950">
        1.0860
      </div>

    </div>

  </div>


  <div className="grid grid-cols-2 gap-px border-t border-slate-100 bg-slate-100">

    <div className="bg-brand-50/40 px-3 py-2.5 text-center">

      <div className="text-[9px] text-slate-500">
        وقف الخسارة
      </div>

      <div className="mt-0.5 text-[12px] font-black text-slate-900">
        5 نقاط
      </div>

    </div>


    <div className="bg-green-50/50 px-3 py-2.5 text-center">

      <div className="text-[9px] text-slate-500">
        الهدف
      </div>

      <div className="mt-0.5 text-[12px] font-black text-green-700">
        10 نقاط
      </div>

    </div>

  </div>


  <div className="border-t border-slate-100 px-3 py-2.5 text-center">

    <span className="text-[10px] text-slate-500">
      نسبة العائد إلى المخاطرة:
    </span>{" "}

    <strong
      dir="ltr"
      className="text-[12px] font-black text-brand-600"
    >
      1 : 2
    </strong>

  </div>

</div>

              {/* DAILY LOSS */}
              <div className="mt-4 rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-rose-600 text-[13px] font-black text-white">
                    !
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[15px] font-black text-slate-950">
                      ضع حدًا للخسارة اليومية
                    </h3>

                    <p className="mt-1.5 text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      من أخطر سلوكيات السكالبينج محاولة تعويض الخسارة بفتح
                      صفقات إضافية بسرعة. وجود حد يومي واضح يساعد على منع
                      سلسلة قرارات عاطفية بعد عدة صفقات خاسرة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* =================================================
              11 - PROS, CONS & MISTAKES
          ================================================= */}

          <section
            id="pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">
              <SectionLabel>
                11 — التقييم
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                مميزات وعيوب استراتيجية السكالبينج
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                السكالبينج يناسب بعض المتداولين بسبب سرعة الصفقات وكثرة
                الفرص المحتملة، لكنه يحتاج إلى تركيز وانضباط وتنفيذ جيد.
                معرفة المميزات والعيوب تساعدك على تحديد ما إذا كان هذا
                الأسلوب مناسبًا لك.
              </p>
            </div>

            {/* PROS / CONS */}
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
                      مميزات السكالبينج
                    </h3>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-[16px] border border-green-100">
                  {[
                    "الصفقات عادة قصيرة ولا تحتاج إلى إبقاء المركز مفتوحًا لفترات طويلة.",
                    "قد تتوفر عدة فرص خلال الجلسة عندما تكون السيولة والحركة مناسبة.",
                    "يساعد على بناء قواعد دخول وخروج دقيقة عند تطبيق خطة واضحة.",
                    "يمكن تطبيقه على أزواج وأسواق مختلفة حسب ظروف التداول.",
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
                      عيوب وتحديات السكالبينج
                    </h3>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-[16px] border border-rose-100">
                  {[
                    "السبريد والعمولة والانزلاق تؤثر بصورة أكبر بسبب قصر الأهداف وكثرة الصفقات.",
                    "يحتاج إلى تركيز وسرعة في اتخاذ القرار والتنفيذ.",
                    "قد يدفع المتداول إلى الإفراط في التداول ومحاولة تعويض الخسائر.",
                    "الحركة السريعة على الأطر الصغيرة قد تحتوي على ضوضاء وإشارات خاطئة كثيرة.",
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
                5 أخطاء شائعة يجب تجنبها في السكالبينج
              </h3>

              <div className="mt-3 grid gap-2 md:grid-cols-5">
                {[
                  ["01", "مطاردة السعر"],
                  ["02", "تجاهل السبريد"],
                  ["03", "تكبير حجم الصفقة"],
                  ["04", "التداول الانتقامي"],
                  ["05", "الدخول بلا وقف"],
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
                كيف تتعلم السكالبينج كمبتدئ خطوة بخطوة؟
              </h2>

              <p className="mt-3 max-w-6xl text-justify text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                لا تبدأ بمحاولة تنفيذ عشرات الصفقات يوميًا. تعلم أولًا كيف
                تتحرك الأسعار، ثم اختر نموذجًا واحدًا واختبره على حساب تجريبي
                قبل التفكير في زيادة سرعة التداول.
              </p>
            </div>

            <div className="p-4 md:p-7">
              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">
                {[
                  {
                    no: "01",
                    title: "تعلم الأساس",
                    text: "افهم الاتجاه والدعم والمقاومة وحركة السعر.",
                  },
                  {
                    no: "02",
                    title: "اختر سوقًا",
                    text: "ركز على زوج أو سوق واحد بدل متابعة كل شيء.",
                  },
                  {
                    no: "03",
                    title: "اختر نموذجًا",
                    text: "حدد شروط دخول وخروج واضحة وقابلة للتكرار.",
                  },
                  {
                    no: "04",
                    title: "اختبر تجريبيًا",
                    text: "سجل النتائج بدون المخاطرة بأموال حقيقية.",
                  },
                  {
                    no: "05",
                    title: "راجع النتائج",
                    text: "حلل التنفيذ والتكلفة والأخطاء قبل التطوير.",
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

                      <h3 className="text-[14px] font-black leading-6 text-slate-950">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>

              {/* MOBILE COMPACT */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">
                {[
                  ["01", "تعلم الأساس", "الاتجاه وحركة السعر."],
                  ["02", "اختر سوقًا", "ركز على سوق واحد."],
                  ["03", "اختر نموذجًا", "ضع شروط دخول وخروج."],
                  ["04", "اختبر تجريبيًا", "سجل نتائجك أولًا."],
                  ["05", "راجع النتائج", "حسن أخطاء التنفيذ."],
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

                    <div className="min-w-0">
                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DEMO CTA */}
              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:flex md:items-center md:justify-between md:gap-6">
                <div>
                  <h3 className="text-[15px] font-black text-slate-950">
                    لا تنتقل مباشرة إلى حساب حقيقي
                  </h3>

                  <p className="mt-1.5 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    اختبر قواعد الاستراتيجية وتعرف على سرعة المنصة والسبريد
                    وطريقة تنفيذ الأوامر باستخدام حساب تجريبي أولًا.
                  </p>
                </div>

                <Link
                  href="/best-brokers/scalping"
                  className="mt-3 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700 md:mt-0 md:shrink-0"
                >
                  أفضل شركات السكالبينج
                  <span className="mr-2">←</span>
                </Link>
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
              <SectionLabel>
                12 — الأسئلة الشائعة
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                أسئلة شائعة عن استراتيجية السكالبينج
              </h2>

              <p className="mt-3 max-w-5xl text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                إجابات سريعة عن السكالبينج، الأطر الزمنية، رأس المال،
                المؤشرات واختيار شركة التداول.
              </p>
            </div>

            <div className="divide-y divide-slate-200">
              {[
                {
                  q: "ما هي استراتيجية السكالبينج؟",
                  a: "السكالبينج هو أسلوب تداول قصير الأجل يعتمد على فتح وإغلاق الصفقات خلال فترات قصيرة بهدف الاستفادة من تحركات سعرية صغيرة نسبيًا. يحتاج إلى خطة واضحة وإدارة مخاطر وانتباه لتكاليف التداول.",
                },
                {
                  q: "هل السكالبينج مناسب للمبتدئين؟",
                  a: "يمكن للمبتدئ تعلم السكالبينج، لكن سرعة اتخاذ القرار وكثرة الحركة على الأطر الصغيرة تجعله أكثر صعوبة من بعض أساليب التداول الأبطأ. من الأفضل البدء بحساب تجريبي ونموذج بسيط.",
                },
                {
                  q: "ما أفضل إطار زمني للسكالبينج؟",
                  a: "لا يوجد إطار واحد مناسب للجميع. يستخدم بعض المتداولين إطار الدقيقة للتنفيذ السريع، بينما يمنح إطار 5 دقائق وقتًا أكبر لقراءة الحركة وقد يكون أوضح للمبتدئ.",
                },
                {
                  q: "ما أفضل مؤشر للسكالبينج؟",
                  a: "لا يوجد مؤشر يضمن نجاح السكالبينج. يمكن استخدام أدوات مثل المتوسطات المتحركة أو RSI أو VWAP كجزء من التحليل، لكن الأفضل دمجها مع حركة السعر والسياق وإدارة المخاطر.",
                },
                {
                  q: "ما أفضل أزواج العملات للسكالبينج؟",
                  a: "يفضل كثير من المتداولين الأزواج الرئيسية ذات السيولة المرتفعة مثل EUR/USD وGBP/USD وUSD/JPY، لكن السبريد والتذبذب وظروف التنفيذ تختلف حسب الوقت والوسيط.",
                },
                {
                  q: "هل يمكن استخدام السكالبينج على الذهب؟",
                  a: "نعم، يستخدم بعض المتداولين السكالبينج على الذهب XAU/USD بسبب حركته، لكن الذهب قد يشهد تذبذبًا قويًا وانزلاقًا واتساعًا في السبريد، خصوصًا أثناء الأخبار.",
                },
                {
                  q: "كم رأس المال المطلوب للسكالبينج؟",
                  a: "لا يوجد مبلغ ثابت يناسب الجميع. الأهم هو أن يسمح حجم الحساب بتطبيق إدارة مخاطر مناسبة دون استخدام حجم صفقة مبالغ فيه أو رافعة مالية غير مناسبة.",
                },
                {
                  q: "كيف أختار أفضل شركة فوركس للسكالبينج؟",
                  a: "راجع الترخيص والسبريد والعمولة وسرعة التنفيذ والمنصة وسياسة الوسيط تجاه السكالبينج، ولا تعتمد على عامل واحد فقط عند اختيار الشركة.",
                },
              ].map((item) => (
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
                مواضيع تساعدك على تطوير استراتيجية السكالبينج
              </h2>

              <p className="mt-1.5 text-[12px] leading-6 text-slate-500 md:text-[13px]">
                أدلة مرتبطة بتكلفة التداول وإدارة الصفقة والمخاطر.
              </p>
            </div>

            {/* DESKTOP */}
            <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">
              {[
                {
                  label: "تكلفة التداول",
                  title: "السبريد في الفوركس",
                  text: "افهم كيف يؤثر فرق السعر مباشرة على الصفقات القصيرة.",
                  href: "/learn-trading/spread",
                },
                {
                  label: "إدارة المخاطر",
                  title: "وقف الخسارة",
                  text: "تعرف على أهمية تحديد نقطة خروج واضحة قبل الدخول.",
                  href: "/learn-trading/stop-loss",
                },
                {
                  label: "إدارة الصفقة",
                  title: "جني الأرباح",
                  text: "تعرف على طرق التفكير في تحديد أهداف الصفقة.",
                  href: "/learn-trading/take-profit",
                },
                {
                  label: "إدارة رأس المال",
                  title: "حجم الصفقة",
                  text: "افهم العلاقة بين حجم المركز ووقف الخسارة والمخاطرة.",
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
                ["تكلفة التداول", "السبريد في الفوركس", "/learn-trading/spread"],
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
                  تعلم السكالبينج أولًا، ثم اختر بيئة التداول المناسبة
                </h2>

                <p className="mt-2 max-w-4xl text-justify text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                  اختبر الاستراتيجية على حساب تجريبي، وراقب تأثير السبريد
                  والعمولة والتنفيذ على نتائجك. وعندما تكون مستعدًا، يمكنك
                  مقارنة الشركات التي توفر حسابات وبيئة تداول مناسبة
                  للسكالبينج.
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
                  href="/best-brokers/scalping"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-3 text-center text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700 md:min-w-[190px]"
                >
                  أفضل شركات السكالبينج
                  <span className="mr-2">←</span>
                </Link>
              </div>
            </div>

            <div className="border-t border-brand-100/70 bg-white/50 px-4 py-2.5 md:px-7">
              <p className="text-center text-[10px] leading-5 text-slate-500 md:text-right md:text-[11px]">
                المحتوى تعليمي ولا يمثل توصية تداول. التداول بالرافعة المالية
                ينطوي على مخاطر، وقد تتعرض لخسارة رأس المال.
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            inLanguage: "ar",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": PAGE_URL,
            },
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
            about: [
              "استراتيجية السكالبينج",
              "سكالبينج الفوركس",
              "Scalping Strategy",
              "Forex Scalping",
              "سكالبينج الدقيقة",
              "سكالبينج 5 دقائق",
              "إدارة مخاطر السكالبينج",
            ],
          }),
        }}
      />


      {/* BREADCRUMB SCHEMA */}
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
                name: "استراتيجية السكالبينج",
                item: PAGE_URL,
              },
            ],
          }),
        }}
      />


      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "ما هي استراتيجية السكالبينج؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "السكالبينج هو أسلوب تداول قصير الأجل يعتمد على فتح وإغلاق الصفقات خلال فترات قصيرة بهدف الاستفادة من تحركات سعرية صغيرة نسبيًا، مع أهمية إدارة المخاطر وتكاليف التداول.",
                },
              },
              {
                "@type": "Question",
                name: "هل السكالبينج مناسب للمبتدئين؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "يمكن للمبتدئ تعلم السكالبينج، لكن سرعة اتخاذ القرار وكثرة الحركة على الأطر الصغيرة قد تجعله أكثر صعوبة، لذلك يفضل البدء بحساب تجريبي ونموذج تداول بسيط.",
                },
              },
              {
                "@type": "Question",
                name: "ما أفضل إطار زمني للسكالبينج؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "لا يوجد إطار زمني واحد مناسب للجميع. يستخدم بعض المتداولين إطار الدقيقة للتنفيذ السريع، بينما يمنح إطار 5 دقائق وقتًا أكبر لقراءة حركة السعر.",
                },
              },
              {
                "@type": "Question",
                name: "ما أفضل مؤشر للسكالبينج؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "لا يوجد مؤشر يضمن نجاح السكالبينج. يمكن استخدام المتوسطات المتحركة أو RSI أو VWAP كجزء من التحليل إلى جانب حركة السعر وإدارة المخاطر.",
                },
              },
              {
                "@type": "Question",
                name: "ما أفضل أزواج العملات للسكالبينج؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "يفضل كثير من المتداولين الأزواج الرئيسية ذات السيولة المرتفعة مثل EUR/USD وGBP/USD وUSD/JPY، مع مراعاة السبريد والتذبذب وظروف التنفيذ.",
                },
              },
              {
                "@type": "Question",
                name: "هل يمكن استخدام السكالبينج على الذهب؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "نعم، يستخدم بعض المتداولين السكالبينج على الذهب XAU/USD، لكن الذهب قد يشهد تذبذبًا قويًا وانزلاقًا واتساعًا في السبريد خصوصًا أثناء الأخبار.",
                },
              },
              {
                "@type": "Question",
                name: "كم رأس المال المطلوب للسكالبينج؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "لا يوجد مبلغ ثابت يناسب جميع المتداولين. الأهم هو تطبيق إدارة مخاطر مناسبة وعدم استخدام حجم صفقة أو رافعة مالية غير مناسبة لحجم الحساب.",
                },
              },
              {
                "@type": "Question",
                name: "كيف أختار أفضل شركة فوركس للسكالبينج؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "يجب مراجعة الترخيص والسبريد والعمولة وسرعة التنفيذ والمنصة وسياسة الوسيط تجاه السكالبينج، وعدم الاعتماد على عامل واحد فقط.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}