import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   FOREX SCALPING STRATEGY PAGE — ENGLISH
   Broker Alarab
   Path: /en/strategies/scalping
========================================================= */

export const dynamic = "force-dynamic";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/scalping`;

const PAGE_TITLE =
  "Forex Scalping Strategy: 1-Minute & 5-Minute Guide";

const PAGE_DESCRIPTION =
  "Learn forex scalping with practical 1-minute and 5-minute setups, entry and exit rules, EMA and price action examples, risk management, and broker tips.";

const DATE_PUBLISHED = "2026-08-15";
const DATE_MODIFIED = "2026-08-15";

const PAGE_KEYWORDS = [
  "forex scalping strategy",
  "scalping strategy",
  "forex scalping",
  "scalping trading strategy",
  "scalping strategy for beginners",
  "1 minute scalping strategy",
  "5 minute scalping strategy",
  "best scalping strategy",
  "forex scalping for beginners",
  "EMA scalping strategy",
  "price action scalping strategy",
  "scalping indicators",
  "best indicators for scalping",
  "best forex pairs for scalping",
  "EUR USD scalping strategy",
  "gold scalping strategy",
  "XAUUSD scalping strategy",
  "scalping risk management",
  "best time to scalp forex",
  "low spread forex brokers for scalping",
];

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: PAGE_KEYWORDS,

  applicationName: "Broker Alarab",
  category: "Finance",
  creator: "Broker Alarab Editorial Team",
  publisher: "Broker Alarab",

  authors: [
    {
      name: "Broker Alarab Editorial Team",
    },
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en": PAGE_URL,
      "ar": `${BASE_URL}/strategies/scalping`,
      "x-default": PAGE_URL,
    },
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
    siteName: "Broker Alarab",
    type: "article",
    locale: "en_US",
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ["Broker Alarab Editorial Team"],
    section: "Trading Strategies",

    tags: [
      "Forex Scalping Strategy",
      "Forex Scalping",
      "1 Minute Scalping",
      "5 Minute Scalping",
      "Price Action Scalping",
      "EMA Scalping",
      "Forex Trading Strategies",
      "Risk Management",
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
    "article:section": "Trading Strategies",
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
  commission_en: string | null;
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
   TOP 3 SCALPING BROKERS — EDITORIAL DATA
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
    badge: "Best Overall",
    reason:
      "Its Raw Spread account and active-trading environment, combined with cTrader and MetaTrader support, make it a strong option for short-term forex strategies.",
  },

  pepperstone: {
    rank: 2,
    badge: "Best Platform Choice",
    reason:
      "The Razor account and support for MT4, MT5, cTrader and TradingView provide excellent platform flexibility for scalpers.",
  },

  tickmill: {
    rank: 3,
    badge: "Competitive Trading Costs",
    reason:
      "Its Raw account and relatively competitive commission structure can suit traders who place frequent short-duration trades.",
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
    return `From ${Number(account.spread_min)} pips`;
  }

  return "Varies by account";
}


function accountCommission(account: BrokerAccount) {
  if (account.commission_en?.trim()) {
    return account.commission_en.trim();
  }

  if (
    account.commission_value !== null &&
    account.commission_value !== undefined
  ) {
    if (Number(account.commission_value) === 0) {
      return "$0";
    }

    return `$${Number(account.commission_value)} per lot`;
  }

  return "Varies by account";
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
      aria-label={`Rated ${formatRating(rating)} out of 5`}
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


/* =========================================================
   BROKER LOGO
========================================================= */

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
      alt={`${broker.name} logo`}
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
      href={`/en/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read our ${broker.name} review`}
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
      aria-label="Forex scalping strategy example showing an EMA, entry, stop loss and short-term profit target"
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
        Entry
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
        Quick Target
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
        Tight Stop
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
        Short Move • Fast Entry • Small Target • Controlled Risk
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
              Simple Forex Scalping Trade Example
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
              Short-term trend → pullback → confirmation → entry → quick target
            </p>

          </div>

          <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
            Educational Example
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
          aria-label="Example of a short-term forex scalping trade setup"
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
            Pullback
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
            Entry
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
            Stop Loss
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
            Profit Target
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
            Trend → Pullback → Confirmation → Entry → Tight Stop → Target
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
          aria-label="Open the full-size forex scalping chart"
        >

          <svg
            viewBox="0 0 360 340"
            className="block w-full"
            role="img"
            aria-label="Forex scalping trade setup preview"
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
              Pullback
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
              Entry
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
              Trend → Pullback → Entry → Quick Target
            </text>

          </svg>


          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              <span>Enlarge Chart</span>
              <span className="text-[14px]">
                ↗
              </span>
            </div>

          </div>

        </a>

      </div>


      {/* EXPLANATION */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

        <p className="text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            How to read this chart:
          </strong>{" "}
          The example shows a short-term uptrend followed by a pullback toward
          the moving-average area. Instead of entering during the pullback, the
          trader waits for bullish momentum to return before considering an
          entry with a predefined stop loss and profit target. This chart is
          for educational purposes only and is not a trading signal.
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
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                Forex Scalping Trade Example
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Trend → Pullback → Confirmation → Entry → Target
              </div>

            </div>


            <a
              href="#how-scalping-works"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="Close"
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
              Swipe horizontally to view the full chart
            </span>

          </div>


          {/* FULL CHART */}
          <div className="overflow-auto bg-white p-2">

            <svg
              viewBox="0 0 1100 500"
              className="block min-w-[820px] w-full"
              role="img"
              aria-label="Full forex scalping trade setup chart"
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
                Pullback
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
                Entry
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
                Stop Loss
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
                Target
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
              1-Minute Scalping Example
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-500">
              5m trend → 1m pullback → confirmation → entry → stop → target
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
          aria-label="One-minute forex scalping strategy example"
        >
          <rect
            width="1100"
            height="460"
            fill="#ffffff"
          />

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


          {/* TREND */}
          <rect
            x="75"
            y="42"
            width="150"
            height="36"
            rx="18"
            fill="#eef5fd"
          />

          <text
            x="150"
            y="65"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#1e5bb8"
          >
            Bullish 5m Trend
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
            1. Pullback
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
            2. Confirmation
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
            3. Entry
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
            Stop Loss
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
            4. Quick Target
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
            Do not buy the pullback → wait for confirmation → then consider entry
          </text>

        </svg>

      </div>


      {/* MOBILE */}
      <div className="md:hidden">

        <a
          href="#one-minute-chart-full"
          className="block cursor-zoom-in"
          aria-label="Enlarge the one-minute scalping example"
        >

          <svg
            viewBox="0 0 360 310"
            className="block w-full"
            role="img"
            aria-label="One-minute forex scalping chart preview"
          >
            <rect
              width="360"
              height="310"
              fill="#ffffff"
            />

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
              Pullback
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
              Confirm
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
              Pullback → Confirm → Entry → Target
            </text>

          </svg>


          <div className="flex justify-center border-t border-slate-100 py-2.5">

            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              Enlarge Chart
              <span>↗</span>
            </span>

          </div>

        </a>

      </div>


      {/* EXPLANATION */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3">

        <p className="text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            What is happening here?
          </strong>{" "}
          The higher-timeframe bias is bullish, but the trader does not enter
          immediately. Price first pulls back on the one-minute chart. The
          setup only becomes more interesting after the pullback loses momentum
          and buyers begin to regain control.
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
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white">

          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                1-Minute Scalping Example
              </div>

              <div className="text-[10px] text-slate-500">
                Trend → Pullback → Confirmation → Entry
              </div>

            </div>

            <a
              href="#one-minute"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold"
              aria-label="Close"
            >
              ×
            </a>

          </div>


          <div className="border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">
            ↔ Swipe horizontally to view the full chart
          </div>


          <div className="overflow-auto">

            <svg
              viewBox="0 0 1100 460"
              className="block min-w-[820px] w-full"
              role="img"
              aria-label="Full one-minute scalping example"
            >
              <rect
                width="1100"
                height="460"
                fill="#ffffff"
              />

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
                Pullback
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
                Confirmation
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
                Stop Loss
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
                Target
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
              5-Minute Scalping Example
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Trend → pullback → rejection → continuation
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
        aria-label="Five-minute forex scalping strategy example"
      >
        <rect
          width="1000"
          height="400"
          fill="#ffffff"
        />

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


        {/* PULLBACK ZONE */}
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
          Potential Pullback Zone
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
          Rejection
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
          Entry
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
          Target
        </text>

      </svg>


      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3">

        <p className="text-[12px] leading-6 text-slate-600 md:text-[13px]">
          <strong className="font-black text-slate-900">
            The idea:
          </strong>{" "}
          Price is already trending higher before it pulls back into a nearby
          area of interest. If sellers fail to extend the move lower and buyers
          regain momentum, the continuation setup is easier to define than
          chasing price after an extended move.
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
              EMA Scalping With Price Action
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Trend first → pullback → momentum confirmation
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
          aria-label="EMA and price action scalping strategy example"
        >
          <rect
            width="1100"
            height="470"
            fill="#ffffff"
          />

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
            Pullback to EMA
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
            Momentum Returns
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
            Price above EMA ≠ automatic buy | wait for pullback + confirmation
          </text>

        </svg>

      </div>


      {/* MOBILE */}
      <div className="md:hidden">

        <a
          href="#ema-scalping-full"
          className="block cursor-zoom-in"
          aria-label="Enlarge EMA scalping chart"
        >

          <svg
            viewBox="0 0 360 315"
            className="block w-full"
          >
            <rect
              width="360"
              height="315"
              fill="#ffffff"
            />

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
              Pullback
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
              Confirm
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
              EMA → Pullback → Confirm → Entry
            </text>

          </svg>


          <div className="flex justify-center border-t border-slate-100 py-2.5">

            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              Enlarge Chart ↗
            </span>

          </div>

        </a>

      </div>


      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3">

        <p className="text-[12px] leading-6 text-slate-600 md:text-[13px]">
          <strong className="font-black text-slate-900">
            Key beginner takeaway:
          </strong>{" "}
          Price trading above an EMA is not a buy signal by itself. In this
          example, the EMA helps define the short-term trend. The trader then
          waits for a pullback and evidence that bullish momentum is returning.
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
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white">

          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                EMA + Price Action Scalping
              </div>

              <div className="text-[10px] text-slate-500">
                Trend → Pullback → Momentum Confirmation
              </div>
            </div>

            <a
              href="#ema-price-action"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold"
              aria-label="Close"
            >
              ×
            </a>

          </div>


          <div className="border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">
            ↔ Swipe horizontally to view the full chart
          </div>


          <div className="overflow-auto">

            <svg
              viewBox="0 0 1100 470"
              className="block min-w-[820px] w-full"
            >
              <rect
                width="1100"
                height="470"
                fill="#ffffff"
              />

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
                Pullback to EMA
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
                Momentum Returns
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
  commission_en,
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
      EXACT TOP 3 USED IN SCALPING BROKER RANKING
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
      dir="ltr"
      className="bg-white text-slate-900"
    >

      {/* =====================================================
          BREADCRUMBS
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-4 pt-3 md:px-6">

        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500"
        >

          <Link
            href="/en"
            className="transition hover:text-brand-600"
          >
            Home
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <Link
            href="/en/strategies"
            className="transition hover:text-brand-600"
          >
            Trading Strategies
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <span className="text-slate-700">
            Forex Scalping Strategy
          </span>

        </nav>

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mx-auto max-w-[1520px] px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">


        {/* DESKTOP HERO */}
        <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm md:block">

          <div className="grid min-h-[390px] lg:grid-cols-[1.18fr_0.82fr]">


            {/* TEXT */}
            <div className="flex flex-col justify-center px-8 py-7 lg:px-10 xl:px-12">


              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                  Trading Strategies
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
                  2026 Beginner Guide
                </span>

              </div>


              <h1 className="mt-4 max-w-[900px] text-[34px] font-black leading-[1.24] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                Forex Scalping Strategy: 1-Minute, 5-Minute & EMA Setups
              </h1>


              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                Learn how{" "}
                <strong className="font-black text-slate-900">
                  forex scalping
                </strong>{" "}
                works, how to use 1-minute and 5-minute charts, how spreads
                and execution affect short-term trades, and how to build a
                repeatable entry, stop-loss and exit process.
              </p>


              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-black text-slate-700">
                  1m & 5m Charts
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  Low Spreads
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  Fast Execution
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-black text-green-700">
                  Quick Targets
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  Risk Management
                </span>

              </div>


              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                <span>
                  📅 August 15, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  Updated: August 15, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  15–20 min read
                </span>

              </div>

            </div>


            {/* VISUAL */}
            <div className="flex items-center justify-center border-l border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:p-8">

              <div className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">


                <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

                  <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                  </div>

                  <span className="text-[10px] font-black text-slate-700">
                    Forex Scalping Trade Model
                  </span>

                </div>


                <div className="p-4">
                  <ScalpingHeroChart />
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* MOBILE HERO */}
        <div className="md:hidden">

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">


            <div className="px-4 pb-2.5 pt-3.5">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
                  Trading Strategies
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600">
                  2026 Guide
                </span>

              </div>


              <h1 className="mt-3 text-[24px] font-black leading-[1.28] tracking-[-0.02em] text-slate-950">
                Forex Scalping Strategy: 1-Minute, 5-Minute & EMA Setups
              </h1>


              <p className="mt-3 text-[14px] leading-[1.9] text-slate-600">
                A practical beginner guide to{" "}
                <strong className="font-black text-slate-900">
                  fast entries, low spreads, short-term charts and controlled risk
                </strong>
                .
              </p>


              <div className="mt-2.5 flex items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 Aug 15, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 15–20 min
                </span>

              </div>

            </div>


            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-3">

  <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

    {/* MOBILE CHART HEADER */}
    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

      <span className="text-[11px] font-black text-slate-800">
        Scalping Setup
      </span>

      <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
        5m → 1m
      </span>

    </div>


    {/* MOBILE-ONLY SIMPLIFIED CHART */}
    <svg
      viewBox="0 0 360 260"
      className="block w-full"
      role="img"
      aria-label="Simple mobile forex scalping strategy chart showing pullback, entry, stop and target"
    >
      <rect
        width="360"
        height="260"
        fill="#ffffff"
      />


      {/* GRID */}
      {[55, 105, 155, 205].map((y) => (
        <line
          key={y}
          x1="22"
          y1={y}
          x2="338"
          y2={y}
          stroke="#eef2f7"
          strokeWidth="1"
        />
      ))}


      {/* EMA */}
      <path
        d="
          M 25 205
          Q 85 190 135 170
          T 235 135
          T 335 105
        "
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeDasharray="6 5"
      />


      <text
        x="35"
        y="225"
        fontSize="9"
        fontWeight="900"
        fill="#b45309"
      >
        EMA
      </text>


      {/* PRICE */}
      <polyline
        points="
          25,220
          65,185
          100,200
          140,155
          180,175
          220,125
          255,155
          290,110
          335,75
        "
        fill="none"
        stroke="#0f172a"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />


      {/* PULLBACK */}
      <circle
        cx="255"
        cy="155"
        r="7"
        fill="#fff7ed"
        stroke="#f59e0b"
        strokeWidth="2.5"
      />

      <text
        x="255"
        y="179"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#b45309"
      >
        Pullback
      </text>


      {/* ENTRY */}
      <circle
        cx="290"
        cy="110"
        r="7"
        fill="#dcfce7"
        stroke="#16a34a"
        strokeWidth="2.5"
      />

      <text
        x="290"
        y="94"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#15803d"
      >
        Entry
      </text>


      {/* TARGET */}
      <line
        x1="275"
        y1="68"
        x2="335"
        y2="68"
        stroke="#16a34a"
        strokeWidth="2"
        strokeDasharray="5 4"
      />

      <text
        x="305"
        y="55"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="900"
        fill="#15803d"
      >
        Target
      </text>


      {/* STOP */}
      <line
        x1="230"
        y1="185"
        x2="300"
        y2="185"
        stroke="#ef4444"
        strokeWidth="2"
      />

      <text
        x="265"
        y="202"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="900"
        fill="#dc2626"
      >
        Stop
      </text>


      {/* MINI EXPLANATION */}
      <rect
        x="50"
        y="18"
        width="160"
        height="30"
        rx="15"
        fill="#0f172a"
      />

      <text
        x="130"
        y="37"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        Trend → Pullback → Entry
      </text>

    </svg>


    {/* BOTTOM LABEL */}
    <div className="border-t border-slate-100 bg-slate-50/60 px-3 py-2.5 text-center">

      <span className="text-[10px] font-bold text-slate-600">
        Short-term trend → pullback → confirmation → quick exit
      </span>

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
                Forex Scalping Strategy Guide
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Jump directly to the section you want to learn
              </div>

            </div>


            {/* MOBILE */}
            <div className="grid grid-cols-2 gap-px bg-slate-100 md:hidden">

              {[
                ["01", "What Is Scalping?", "#what-is-scalping"],
                ["02", "How It Works", "#how-scalping-works"],
                ["03", "Best Timeframes", "#timeframes"],
                ["04", "Spread & Execution", "#cost-execution"],
                ["05", "1-Minute Strategy", "#one-minute"],
                ["06", "5-Minute Strategy", "#five-minute"],
                ["07", "EMA + Price Action", "#ema-price-action"],
                ["08", "Top 3 Brokers", "#scalping-brokers"],
                ["09", "Pairs & Sessions", "#best-markets"],
                ["10", "Risk Management", "#risk-management"],
                ["11", "Pros, Cons & Mistakes", "#pros-cons"],
                ["12", "Scalping FAQ", "#faq"],
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
                ["01", "What Is Scalping?", "#what-is-scalping"],
                ["02", "How Scalping Works", "#how-scalping-works"],
                ["03", "Best Timeframes", "#timeframes"],
                ["04", "Costs & Execution", "#cost-execution"],
                ["05", "1-Minute Scalping", "#one-minute"],
                ["06", "5-Minute Scalping", "#five-minute"],
                ["07", "EMA Scalping", "#ema-price-action"],
                ["08", "Best Brokers", "#scalping-brokers"],
                ["09", "Pairs & Sessions", "#best-markets"],
                ["10", "Risk Management", "#risk-management"],
                ["11", "Pros & Cons", "#pros-cons"],
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — The Basics
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                What Is Forex Scalping and How Does It Work?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Forex scalping is a short-term trading style built around
                capturing relatively small price moves. Instead of holding a
                position for hours or days, a scalper may enter and exit within
                minutes — and sometimes faster — while using predefined risk
                and exit rules.
              </p>

            </div>


            {/* QUICK FACTS */}
            <div className="grid grid-cols-2 gap-px border-b border-slate-200 bg-slate-200 md:grid-cols-4">

              {[
                {
                  label: "Typical Holding Time",
                  value: "Seconds → Minutes",
                },
                {
                  label: "Popular Charts",
                  value: "1m / 5m",
                },
                {
                  label: "Critical Factor",
                  value: "Trading Costs",
                },
                {
                  label: "Trading Activity",
                  value: "High",
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


                <div>

                  <div className="border-l-[3px] border-brand-500 pl-3">

                    <h3 className="text-[16px] font-black text-slate-950">
                      Scalping in simple terms
                    </h3>

                    <p className="mt-1.5 text-[14px] leading-7 text-slate-700">
                      A scalper is usually not trying to capture an entire market
                      swing. The goal is to take a smaller portion of a move and
                      exit according to a predefined plan. That makes{" "}
                      <strong className="font-black text-slate-900">
                        spreads, commissions, slippage and execution speed
                      </strong>{" "}
                      especially important.
                    </p>

                  </div>


                  <div className="mt-4 space-y-3 text-[14px] leading-7 text-slate-700 md:text-[15px] md:leading-8">

                    <p>
                      A trader may see several possible setups during one active
                      session, but successful scalping is not simply about taking
                      more trades. A structured approach requires repeating the
                      same setup only when its conditions appear.
                    </p>

                    <p>
                      Scalpers can trade pure price action or combine price
                      structure with tools such as moving averages, support and
                      resistance, momentum indicators or VWAP. The smaller the
                      intended target, however, the more important transaction
                      costs become.
                    </p>

                  </div>


                  <div className="mt-4">

                    <ImportantBox title="Scalping is not simply fast trading">
                      Speed is part of the style, but random fast entries are not
                      a strategy. A scalper still needs clear entry conditions,
                      an invalidation level, a stop loss, position sizing and a
                      limit on how much risk can be taken.
                    </ImportantBox>

                  </div>

                </div>


                <aside className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="text-[10px] font-black text-brand-600">
                    Before You Start
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    Is scalping right for you?
                  </h3>


                  <div className="mt-3 space-y-2">

                    {[
                      "You can stay focused while actively monitoring price.",
                      "You are comfortable making decisions quickly.",
                      "You can follow a predefined stop-loss rule.",
                      "You can avoid chasing price after missing an entry.",
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
                      Traders who prefer slower decision-making and less screen
                      time may find swing trading or other higher-timeframe
                      approaches more suitable.
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — How It Works
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                How to Build a Forex Scalping Setup Step by Step
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                There is no single scalping strategy, but well-defined setups
                usually follow a similar process: establish the short-term
                context, wait for price to reach an area of interest, look for
                confirmation, define risk and then execute the trade.
              </p>

            </div>


            <div className="p-4 md:p-7">


              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "Define Context",
                    text: "Is price trending higher, lower or moving sideways?",
                  },
                  {
                    no: "02",
                    title: "Wait for Location",
                    text: "Avoid chasing price after an extended move.",
                  },
                  {
                    no: "03",
                    title: "Look for Confirmation",
                    text: "Watch for rejection or momentum to return.",
                  },
                  {
                    no: "04",
                    title: "Define Risk",
                    text: "Know the stop loss and position size before entry.",
                  },
                  {
                    no: "05",
                    title: "Exit by Plan",
                    text: "Do not turn a scalp into an unplanned long-term trade.",
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


              {/* MOBILE */}
              <div className="md:hidden">

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

                  {[
                    {
                      no: "01",
                      title: "Define Context",
                      text: "Identify the short-term direction first.",
                    },
                    {
                      no: "02",
                      title: "Wait for Location",
                      text: "Do not chase an extended price move.",
                    },
                    {
                      no: "03",
                      title: "Wait for Confirmation",
                      text: "Watch price reaction and momentum.",
                    },
                    {
                      no: "04",
                      title: "Define Risk",
                      text: "Set your stop and trade size first.",
                    },
                    {
                      no: "05",
                      title: "Execute the Exit",
                      text: "Follow the target defined in your plan.",
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — Timeframes
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                What Is the Best Timeframe for Forex Scalping?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The 1-minute and 5-minute charts are among the most commonly
                associated with forex scalping, but a smaller timeframe is not
                automatically better. Lower timeframes contain more short-term
                noise and require faster decisions.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">


                <div className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <span className="text-[9px] font-black text-rose-700">
                        Very Fast
                      </span>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        1-Minute Chart
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-rose-100 text-[11px] font-black text-rose-700">
                      1m
                    </div>

                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-slate-600">
                    More price changes and potential signals, but also more
                    noise and greater sensitivity to spread and slippage.
                  </p>

                </div>


                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <span className="text-[9px] font-black text-brand-600">
                        More Beginner-Friendly
                      </span>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        5-Minute Chart
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brand-600 text-[11px] font-black text-white">
                      5m
                    </div>

                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-slate-600">
                    Slower than the one-minute chart and often easier to read
                    while still remaining suitable for short-term setups.
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <span className="text-[9px] font-black text-slate-500">
                        Context
                      </span>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        15-Minute Chart
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-slate-200 text-[11px] font-black text-slate-700">
                      15m
                    </div>

                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-slate-600">
                    Useful for understanding the broader intraday trend before
                    moving to a smaller chart for execution.
                  </p>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  A simple multi-timeframe scalping workflow
                </h3>

                <div className="mt-3 grid gap-2 md:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "15-Minute",
                      text: "Define trend and context",
                    },
                    {
                      no: "02",
                      title: "5-Minute",
                      text: "Locate the potential setup",
                    },
                    {
                      no: "03",
                      title: "1-Minute",
                      text: "Refine execution if needed",
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

                <ImportantBox title="A lower timeframe should not force you to trade more">
                  If there is no clean setup on the five-minute chart, switching
                  to the one-minute chart does not mean you need to manufacture
                  an opportunity. Use the lower timeframe to refine execution,
                  not to justify a trade that was not there.
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — Costs & Execution
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                Why Spreads and Execution Matter So Much for Scalping
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Scalping targets are often relatively small, which means
                transaction costs can consume a meaningful portion of a trade.
                A good entry model is not enough by itself — scalpers also need
                to understand spreads, commissions, slippage and order execution.
              </p>

            </div>


            <div className="p-4 md:p-7">


              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">

                {[
                  {
                    title: "Spread",
                    value: "Lower can help",
                    text: "Especially when targets are small.",
                  },
                  {
                    title: "Commission",
                    value: "Count total cost",
                    text: "Important on Raw-style accounts.",
                  },
                  {
                    title: "Slippage",
                    value: "Changes execution",
                    text: "Can increase during fast markets.",
                  },
                  {
                    title: "Execution Speed",
                    value: "Important",
                    text: "Delay matters more on short trades.",
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


              <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_320px]">

                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <h3 className="text-[16px] font-black text-slate-950">
                    Why total trading cost matters
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-700 md:text-[14px]">
                    When a profit target is relatively small, even a modest
                    difference in spread or commission can materially affect
                    the net result. This is why experienced scalpers often
                    compare{" "}
                    <strong className="font-black text-slate-900">
                      all-in trading costs
                    </strong>{" "}
                    instead of focusing only on claims such as “spreads from
                    0.0 pips.”
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-white p-4">

                  <div className="text-[10px] font-black text-brand-600">
                    Related Guide
                  </div>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    How does the forex spread work?
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
                    Learn how the difference between the bid and ask price
                    becomes part of the cost of every forex trade.
                  </p>

                  <Link
                    href="/en/learn-trading/spread"
                    className="mt-3 inline-flex items-center gap-2 text-[12px] font-black text-brand-600 hover:underline"
                  >
                    Learn about forex spreads
                    <span aria-hidden="true">
                      →
                    </span>
                  </Link>

                </div>

              </div>


              {/* COMMERCIAL BRIDGE */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_100%)] p-4">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="text-[10px] font-black text-brand-600">
                      Broker choice can affect your scalping costs
                    </div>

                    <h3 className="mt-1 text-[16px] font-black text-slate-950">
                      Compare forex brokers for scalping
                    </h3>

                    <p className="mt-1.5 max-w-3xl text-[12px] leading-6 text-slate-600">
                      Compare brokers by Raw-style accounts, spreads,
                      commissions, platforms and other factors relevant to
                      active short-term traders.
                    </p>

                  </div>


                  <Link
                    href="/en/best-brokers/scalping"
                    className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700"
                  >
                    Best Forex Brokers for Scalping
                    <span className="ml-2">
                      →
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
                05 — 1-Minute Scalping
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                1-Minute Scalping Strategy: How to Trade Without Chasing Price
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The one-minute chart produces constant price movement, but that
                does not mean every move is a trading opportunity. A more
                structured approach is to use the 1-minute chart for execution
                after the broader intraday direction has already been defined
                on a higher timeframe such as 5 or 15 minutes.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* TOP GRID */}
              <div className="grid gap-3 md:grid-cols-3">

                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <span className="text-[9px] font-black text-brand-600">
                    STEP 01
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    Define the trend first
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    Use the 5-minute or 15-minute chart to establish context
                    instead of treating every one-minute candle independently.
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <span className="text-[9px] font-black text-slate-500">
                    STEP 02
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    Wait for a pullback
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    Avoid buying after a sharp upward burst. Let price retrace
                    into a more logical area before looking for continuation.
                  </p>

                </div>


                <div className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                  <span className="text-[9px] font-black text-rose-700">
                    STEP 03
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    Plan the exit first
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    Know the invalidation point, stop loss and expected exit
                    area before placing a fast scalp.
                  </p>

                </div>

              </div>


              {/* PRACTICAL MODEL */}
              <div className="mt-4 overflow-hidden rounded-[18px] border border-slate-200 bg-white">

                <div className="flex flex-col lg:grid lg:grid-cols-[1.55fr_0.45fr]">

                  {/* STEPS */}
                  <div className="p-4 md:p-5 lg:border-r lg:border-slate-200">

                    <div className="flex items-center justify-between gap-3">

                      <div>

                        <div className="text-[9px] font-black text-brand-600">
                          Educational Setup
                        </div>

                        <h3 className="mt-1 text-[17px] font-black text-slate-950">
                          Simple 1-Minute Scalping Setup
                        </h3>

                      </div>

                      <span className="hidden rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 lg:inline-flex">
                        5m → 1m
                      </span>

                    </div>


                    {/* DESKTOP */}
                    <div className="mt-4 hidden gap-x-5 gap-y-3 lg:grid lg:grid-cols-2">

                      {[
                        "The 5-minute structure is bullish.",
                        "Price pulls back on the one-minute chart.",
                        "Selling pressure begins to weaken.",
                        "Entry is considered only after confirmation.",
                        "The stop is placed beyond the setup invalidation area.",
                        "The target is defined before the order is placed.",
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


                    {/* MOBILE / TABLET */}
                    <div className="mt-3 space-y-2.5 lg:hidden">

                      {[
                        "The 5-minute structure is bullish.",
                        "Price pulls back on the one-minute chart.",
                        "Selling pressure begins to weaken.",
                        "Entry is considered only after confirmation.",
                        "The stop sits beyond the invalidation area.",
                        "The target is planned before execution.",
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
                      Important
                    </div>

                    <h3 className="mt-2 text-[16px] font-black leading-6 text-slate-950">
                      The 1-minute chart is not for everyone
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      Price moves quickly, decision time is limited, and
                      spreads and slippage can have a larger impact on very
                      short trades.
                    </p>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      If the 5-minute chart helps you make clearer and more
                      disciplined decisions, there is no reason to move lower
                      simply to create more trades.
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
                    ["01", "Define 5m Trend"],
                    ["02", "Move to 1m"],
                    ["03", "Wait for Pullback"],
                    ["04", "Confirm Momentum"],
                    ["05", "Execute & Exit"],
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

                <ImportantBox title="Overtrading is one of the biggest 1-minute scalping mistakes">
                  A new candle every minute does not mean a new trade exists.
                  Define the exact conditions that must be present before you
                  participate, and skip everything else.
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — 5-Minute Scalping
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                5-Minute Scalping Strategy: A Cleaner Setup for Beginners
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The 5-minute chart can offer a useful balance between speed and
                readability. It is still short-term enough for scalping, but it
                generally gives traders more time to identify structure,
                pullbacks and invalidation levels than the one-minute chart.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 lg:grid-cols-[1fr_300px]">

                <div>

                  <h3 className="text-[17px] font-black text-slate-950">
                    Simple trend-and-pullback setup
                  </h3>

                  <p className="mt-2 text-[14px] leading-7 text-slate-600">
                    One straightforward approach is to identify a clear
                    short-term trend and wait for a pullback rather than
                    entering after price has already extended. If momentum
                    resumes in the original direction, the trader can evaluate
                    a continuation entry with a predefined stop and target.
                  </p>


                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {[
                      {
                        title: "1. Clear Trend",
                        text: "Price structure supports the short-term direction.",
                      },
                      {
                        title: "2. Controlled Pullback",
                        text: "Wait for retracement instead of chasing momentum.",
                      },
                      {
                        title: "3. Confirmation",
                        text: "Look for momentum to return or a local level to break.",
                      },
                      {
                        title: "4. Planned Exit",
                        text: "Define the stop and target before execution.",
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


                <aside className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="text-[10px] font-black text-brand-600">
                    Why 5 minutes?
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    A balance between speed and clarity
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    The chart remains fast enough for short-term trading while
                    filtering some of the noise found on the one-minute chart.
                  </p>

                  <div className="mt-3 border-t border-brand-100 pt-3">

                    <div className="text-[11px] font-black text-slate-700">
                      Useful for learning:
                    </div>

                    <div className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">

                      <div>• Trend structure</div>
                      <div>• Pullback zones</div>
                      <div>• Repeatable entry rules</div>

                    </div>

                  </div>

                </aside>

              </div>


              <div className="mt-4">
                <FiveMinuteScalpingChart />
              </div>


              {/* COMPARISON */}
              <div className="mt-4 overflow-hidden rounded-[18px] border border-slate-200">

                <div className="grid grid-cols-[1fr_1fr_1fr] bg-slate-50 text-[10px] font-black text-slate-500">

                  <div className="px-3 py-2.5">
                    Factor
                  </div>

                  <div className="px-3 py-2.5 text-center">
                    1-Minute
                  </div>

                  <div className="px-3 py-2.5 text-center">
                    5-Minute
                  </div>

                </div>


                {[
                  ["Decision Speed", "Very Fast", "Fast"],
                  ["Potential Signals", "More", "Fewer"],
                  ["Market Noise", "Higher", "Lower"],
                  ["Beginner Readability", "Harder", "Better"],
                ].map(([name, one, five]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[1fr_1fr_1fr] border-t border-slate-100 text-[11px]"
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — Practical Setup
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                EMA Scalping Strategy With Price Action
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                An exponential moving average can help organize short-term trend
                analysis, but it should not be treated as an automatic entry
                signal. A stronger approach is to use the EMA as context and
                then wait for price action to confirm that momentum is returning.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    label: "Chart",
                    value: "5 Minutes",
                    text: "Use 1m only when finer execution is needed.",
                  },
                  {
                    label: "Trend Tool",
                    value: "EMA",
                    text: "Context tool, not a standalone signal.",
                  },
                  {
                    label: "Entry",
                    value: "After Pullback",
                    text: "Avoid chasing extended price.",
                  },
                  {
                    label: "Exit",
                    value: "Predefined",
                    text: "Plan the target and stop first.",
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


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* LONG */}
                <div className="rounded-[18px] border border-green-100 bg-green-50/40 p-4">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-100 text-[13px] font-black text-green-700">
                      ↑
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      Bullish Example
                    </h3>

                  </div>

                  <div className="mt-3 space-y-2">

                    {[
                      "Price is trading above the EMA with bullish short-term structure.",
                      "Price pulls back toward the EMA or nearby support.",
                      "Selling momentum fades and bullish momentum returns.",
                      "Entry is considered after confirmation with the stop below the setup.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-[12px] leading-6 text-slate-600"
                      >

                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />

                        <span>{item}</span>

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
                      Bearish Example
                    </h3>

                  </div>

                  <div className="mt-3 space-y-2">

                    {[
                      "Price is trading below the EMA with bearish short-term structure.",
                      "Price retraces toward the EMA or nearby resistance.",
                      "Buying momentum weakens and selling pressure returns.",
                      "Entry is considered after confirmation with the stop above the setup.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-[12px] leading-6 text-slate-600"
                      >

                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />

                        <span>{item}</span>

                      </div>
                    ))}

                  </div>

                </div>

              </div>


              <div className="mt-4">
                <EmaPriceActionScalpingChart />
              </div>


              <div className="mt-4">

                <ImportantBox title="An EMA crossover is not enough by itself">
                  Moving-average crosses can produce repeated false signals in
                  choppy markets. Use the EMA to organize trend context and then
                  combine it with price structure and confirmation rather than
                  treating it as an automatic buy or sell trigger.
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                <div>

                  <SectionLabel>
                    08 — Broker Selection
                  </SectionLabel>

                  <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                    3 Forex Brokers to Compare for Scalping
                  </h2>

                  <p className="mt-3 max-w-4xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                    Scalpers often pay closer attention to account structure,
                    spreads, commissions, platform choice and execution
                    conditions because frequent short-duration trades can make
                    trading costs more significant.
                  </p>

                </div>


                <Link
                  href="/en/best-brokers/scalping"
                  className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-[11px] border border-brand-200 bg-white px-4 text-[11px] font-black text-brand-600 transition hover:bg-brand-50"
                >
                  View Full Comparison
                  <span className="ml-2">→</span>
                </Link>

              </div>

            </div>


            <div className="p-4 md:p-6">

              {topThreeScalpingBrokers.length === 0 ? (

                <div className="rounded-[18px] border border-amber-200 bg-amber-50 p-5 text-center">

                  <h3 className="text-[16px] font-black text-amber-950">
                    Broker data is temporarily unavailable
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-6 text-amber-800">
                    Scalping broker data could not be loaded from the database.
                  </p>

                </div>

              ) : (

                <div className="grid gap-3 lg:grid-cols-3">

                  {topThreeScalpingBrokers.map((item) => {
                    const editorial =
                      SCALPING_BROKER_EDITORIAL[item.broker.slug];

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

                        {editorial.rank === 1 && (
                          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-600 via-brand-400 to-brand-200" />
                        )}


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
                            Rating {formatRating(item.broker.rating)}
                          </span>

                        </div>


                        <div className="mt-4 flex items-center gap-3">

                          <BrokerLogo
                            broker={item.broker}
                          />

                          <div className="min-w-0">

                            <Link
                              href={`/en/brokers/${item.broker.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[17px] font-black text-slate-950 transition hover:text-brand-600"
                            >
                              {item.broker.name}
                            </Link>

                            <div className="mt-1">
                              {renderStars(item.broker.rating)}
                            </div>

                            {item.account_name && (
                              <div className="mt-1 text-[10px] font-black text-brand-600">
                                {item.account_name}
                              </div>
                            )}

                          </div>

                        </div>


                        <p className="mt-4 min-h-[72px] text-[12px] leading-6 text-slate-600">
                          {editorial.reason}
                        </p>


                        <div className="mt-4 grid grid-cols-2 gap-2">

                          <div className="rounded-[12px] bg-slate-50 px-3 py-2.5">

                            <div className="text-[9px] font-black text-slate-500">
                              Spread
                            </div>

                            <div className="mt-1 text-[11px] font-black text-slate-950">
                              {accountSpread(item)}
                            </div>

                          </div>


                          <div className="rounded-[12px] bg-slate-50 px-3 py-2.5">

                            <div className="text-[9px] font-black text-slate-500">
                              Commission
                            </div>

                            <div className="mt-1 text-[11px] font-black text-slate-950">
                              {accountCommission(item)}
                            </div>

                          </div>

                        </div>


                        <div className="mt-4 grid grid-cols-2 gap-2">

                          <Link
                            href={`/en/brokers/${item.broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 text-[11px] font-black text-brand-600 transition hover:bg-brand-50"
                          >
                            Read Review
                          </Link>


                          {item.broker.real_account_url ? (

                            <a
                              href={`/go/${item.broker.slug}?type=real&source=en-scalping-strategy`}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-3 text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700"
                            >
                              Open Account
                            </a>

                          ) : (

                            <span className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-slate-100 px-3 text-[11px] font-black text-slate-400">
                              Unavailable
                            </span>

                          )}

                        </div>

                      </article>
                    );
                  })}

                </div>

              )}


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="text-[15px] font-black text-slate-950">
                      Do not choose a scalping broker by spread alone
                    </h3>

                    <p className="mt-1.5 max-w-4xl text-[12px] leading-6 text-slate-600">
                      Review regulation, account type, commissions, platform
                      access, execution policy and possible slippage before
                      opening an account. Broker conditions can change over time.
                    </p>

                  </div>


                  <Link
                    href="/en/best-brokers/scalping"
                    className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-[11px] bg-brand-600 px-5 text-[11px] font-black text-white transition hover:bg-brand-700"
                  >
                    Compare Scalping Brokers
                    <span className="ml-2">→</span>
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — Markets & Timing
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                Best Forex Pairs and Trading Sessions for Scalping
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                There is no single best market for every scalper. Short-term
                traders usually look for sufficient liquidity, competitive
                spreads and enough movement to justify the trading cost while
                avoiding unstable execution conditions.
              </p>

            </div>


            <div className="p-4 md:p-7">


              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    market: "EUR/USD",
                    badge: "High Liquidity",
                    text: "A heavily traded major pair that often attracts scalpers because of its liquidity and relatively competitive trading costs.",
                  },
                  {
                    market: "GBP/USD",
                    badge: "More Volatility",
                    text: "Can produce larger intraday moves but may also move faster and require wider risk tolerance.",
                  },
                  {
                    market: "USD/JPY",
                    badge: "Major FX Pair",
                    text: "A liquid major pair that can remain active across several trading sessions.",
                  },
                  {
                    market: "XAU/USD",
                    badge: "High Volatility",
                    text: "Gold is popular with active traders, but its speed and volatility can materially increase risk.",
                  },
                ].map((item) => (
                  <div
                    key={item.market}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div className="text-[17px] font-black text-slate-950">
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


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="text-[10px] font-black text-slate-500">
                    London Session
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    Strong activity in major forex pairs
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    The European open and the London–New York overlap can
                    produce stronger liquidity and intraday movement in several
                    major currency pairs.
                  </p>

                </div>


                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="text-[10px] font-black text-brand-600">
                    New York Session
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    Important for USD pairs, gold and indices
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    Market activity can increase around the U.S. open and major
                    economic releases, although fast news conditions can also
                    increase spreads and slippage.
                  </p>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[13px] font-black text-white">
                    !
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-[15px] font-black text-slate-950">
                      High-impact news is not automatically a good scalping opportunity
                    </h3>

                    <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      Higher volatility may look attractive, but spreads can
                      widen and orders may fill at different prices than
                      expected. Beginners should understand these execution
                      risks before trading around major releases.
                    </p>

                  </div>

                </div>

              </div>


              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <Link
                  href="/en/best-brokers/gold"
                  className="group rounded-[16px] border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >

                  <div className="text-[9px] font-black text-brand-600">
                    Trading XAU/USD?
                  </div>

                  <h3 className="mt-1 text-[15px] font-black text-slate-950 group-hover:text-brand-600">
                    Best Gold Trading Brokers
                  </h3>

                  <div className="mt-2 text-[11px] font-black text-brand-600">
                    View Comparison →
                  </div>

                </Link>


                <Link
                  href="/en/best-brokers/scalping"
                  className="group rounded-[16px] border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >

                  <div className="text-[9px] font-black text-brand-600">
                    Compare execution environments
                  </div>

                  <h3 className="mt-1 text-[15px] font-black text-slate-950 group-hover:text-brand-600">
                    Best Forex Brokers for Scalping
                  </h3>

                  <div className="mt-2 text-[11px] font-black text-brand-600">
                    View Brokers →
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black text-orange-700">
                10 — Risk Management
              </span>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                Scalping Risk Management: Stop Loss, Position Size & Daily Limits
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Frequent entries can magnify poor risk management. One oversized
                loss can erase the result of several successful scalps, so risk
                should be defined before the order is placed rather than after
                price begins moving against the position.
              </p>

            </div>


            <div className="p-4 md:p-7">


              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">

                {[
                  {
                    label: "Risk Per Trade",
                    value: "Keep It Controlled",
                    text: "Define the amount before entry.",
                  },
                  {
                    label: "Stop Loss",
                    value: "Set Before Entry",
                    text: "Know exactly what invalidates the setup.",
                  },
                  {
                    label: "Trade Frequency",
                    value: "Not the Goal",
                    text: "Quality matters more than activity.",
                  },
                  {
                    label: "Daily Loss",
                    value: "Use a Limit",
                    text: "Stop when your limit is reached.",
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


              {/* EXAMPLE + CALCULATOR */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <span className="text-[9px] font-black text-brand-600">
                    Educational Example
                  </span>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
                    Calculate risk before choosing trade size
                  </h3>

                  <p className="mt-2.5 text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
                    If an account balance is{" "}
                    <strong className="font-black text-slate-950">
                      $2,000
                    </strong>{" "}
                    and the planned risk is{" "}
                    <strong className="font-black text-slate-950">
                      0.5%
                    </strong>
                    , the maximum planned loss for that trade would be{" "}
                    <strong className="font-black text-slate-950">
                      $10
                    </strong>
                    .
                  </p>


                  <div className="mt-3 rounded-[14px] border border-brand-100 bg-white px-3 py-3">

                    <div className="text-center text-[16px] font-black text-slate-950">
                      $2,000 × 0.5% = $10
                    </div>

                    <div className="mt-1 text-center text-[10px] leading-5 text-slate-500">
                      Position size is calculated after the stop-loss distance is known
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
                        Calculate risk before the trade
                      </h3>

                      <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                        Use our risk calculator to estimate planned risk instead
                        of changing position size randomly from one trade to the next.
                      </p>

                    </div>

                  </div>


                  <Link
                    href="/en/tools/risk-calculator"
                    className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700"
                  >
                    Open Risk Calculator
                    <span className="ml-2">→</span>
                  </Link>

                </div>

              </div>


              {/* REALISTIC TRADE EXAMPLE */}
              <div className="mt-3 overflow-hidden rounded-[14px] border border-slate-200 bg-white">

                <div className="border-b border-slate-100 bg-slate-50 px-3 py-2">

                  <div className="flex items-center justify-between">

                    <span className="text-[10px] font-black text-slate-700">
                      EUR/USD Scalping Example
                    </span>

                    <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
                      Educational Only
                    </span>

                  </div>

                </div>


                <div className="grid grid-cols-3 gap-px bg-slate-100">

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
                      Stop Distance
                    </div>

                    <div className="mt-0.5 text-[12px] font-black text-slate-900">
                      5 pips
                    </div>

                  </div>


                  <div className="bg-green-50/50 px-3 py-2.5 text-center">

                    <div className="text-[9px] text-slate-500">
                      Target Distance
                    </div>

                    <div className="mt-0.5 text-[12px] font-black text-green-700">
                      10 pips
                    </div>

                  </div>

                </div>


                <div className="border-t border-slate-100 px-3 py-2.5 text-center">

                  <span className="text-[10px] text-slate-500">
                    Risk-to-reward ratio:
                  </span>{" "}

                  <strong className="text-[12px] font-black text-brand-600">
                    1 : 2
                  </strong>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-rose-600 text-[13px] font-black text-white">
                    !
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-[15px] font-black text-slate-950">
                      Set a daily loss limit
                    </h3>

                    <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      One of the most dangerous scalping behaviors is trying to
                      recover a loss immediately by taking more trades. A daily
                      loss limit can help prevent a chain of emotional decisions.
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                11 — Evaluation
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                Forex Scalping Pros, Cons and Common Mistakes
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Scalping can appeal to traders who prefer active markets and
                short holding periods, but it also demands concentration,
                discipline and consistent execution. Understanding both sides
                can help determine whether the style fits your personality and
                trading routine.
              </p>

            </div>


            <div className="grid md:grid-cols-2">

              {/* PROS */}
              <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-50 text-[14px] font-black text-green-700">
                    ✓
                  </div>

                  <div>

                    <div className="text-[9px] font-black text-green-700">
                      Potential Advantages
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      Pros of Forex Scalping
                    </h3>

                  </div>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-green-100">

                  {[
                    "Positions are generally held for relatively short periods.",
                    "Active sessions may provide several potential setups.",
                    "The style encourages precise entry and exit rules when properly structured.",
                    "Scalping concepts can be applied across different liquid markets.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3
                          ? "border-b border-green-100/70"
                          : ""
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
                      Key Challenges
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      Cons of Forex Scalping
                    </h3>

                  </div>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-rose-100">

                  {[
                    "Spreads, commissions and slippage matter more when targets are small and trades are frequent.",
                    "Scalping requires sustained concentration and quick decision-making.",
                    "High activity can encourage overtrading and revenge trading.",
                    "Lower timeframes contain more noise and potential false signals.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3
                          ? "border-b border-rose-100/70"
                          : ""
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
                5 Common Scalping Mistakes to Avoid
              </h3>

              <div className="mt-3 grid gap-2 md:grid-cols-5">

                {[
                  ["01", "Chasing Price"],
                  ["02", "Ignoring Spread"],
                  ["03", "Oversizing Trades"],
                  ["04", "Revenge Trading"],
                  ["05", "Trading Without a Stop"],
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
                Beginner Roadmap
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                How to Learn Forex Scalping as a Beginner
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Do not begin by trying to take dozens of trades per day. Start
                by learning price behavior, choose one setup and one market,
                and test the process on a demo account before increasing speed
                or trade frequency.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "Learn Price Basics",
                    text: "Understand trend, support, resistance and price action.",
                  },
                  {
                    no: "02",
                    title: "Choose One Market",
                    text: "Focus on one pair instead of watching everything.",
                  },
                  {
                    no: "03",
                    title: "Choose One Setup",
                    text: "Create clear and repeatable entry and exit rules.",
                  },
                  {
                    no: "04",
                    title: "Use a Demo Account",
                    text: "Record results before risking real capital.",
                  },
                  {
                    no: "05",
                    title: "Review Performance",
                    text: "Analyze execution, costs and mistakes before adjusting.",
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


              {/* MOBILE */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "Learn the Basics", "Trend and price action."],
                  ["02", "Choose One Market", "Focus instead of scanning everything."],
                  ["03", "Choose One Setup", "Define clear entry and exit rules."],
                  ["04", "Practice on Demo", "Record results first."],
                  ["05", "Review Results", "Improve execution and discipline."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 4
                        ? "border-b border-slate-100"
                        : ""
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


              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:flex md:items-center md:justify-between md:gap-6">

                <div>

                  <h3 className="text-[15px] font-black text-slate-950">
                    Test the strategy before risking real money
                  </h3>

                  <p className="mt-1.5 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    A demo account lets you test entry rules, platform speed,
                    spreads and order execution before using real capital.
                  </p>

                </div>


                <Link
                  href="/en/best-brokers/scalping"
                  className="mt-3 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700 md:mt-0 md:shrink-0"
                >
                  Compare Scalping Brokers
                  <span className="ml-2">→</span>
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                12 — Frequently Asked Questions
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                Forex Scalping Strategy FAQ
              </h2>

              <p className="mt-3 max-w-5xl text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                Quick answers to common questions about scalping timeframes,
                indicators, pairs, gold, capital requirements and broker selection.
              </p>

            </div>


            <div className="divide-y divide-slate-200">

              {[
                {
                  q: "What is a forex scalping strategy?",
                  a: "Forex scalping is a short-term trading approach that aims to capture relatively small price movements through quick entries and exits. It requires clear rules, disciplined risk management and close attention to trading costs.",
                },
                {
                  q: "Is forex scalping good for beginners?",
                  a: "Beginners can learn scalping, but the speed of lower timeframes can make it more demanding than slower trading styles. Starting on a demo account and using a simple 5-minute setup can make the learning process more manageable.",
                },
                {
                  q: "What is the best timeframe for scalping?",
                  a: "There is no single best timeframe. The 1-minute chart offers faster signals, while the 5-minute chart is often easier to read. Some traders also use a 15-minute chart to define the broader intraday context.",
                },
                {
                  q: "What is the best indicator for forex scalping?",
                  a: "No indicator guarantees successful scalping. Traders may use tools such as EMAs, RSI or VWAP, but these are generally more useful when combined with price action, market structure and risk management.",
                },
                {
                  q: "What are the best forex pairs for scalping?",
                  a: "Major currency pairs such as EUR/USD, GBP/USD and USD/JPY are commonly watched by scalpers because of their liquidity, although spreads and volatility vary by broker and trading session.",
                },
                {
                  q: "Can you scalp gold?",
                  a: "Yes. Some traders scalp XAU/USD because gold can produce strong intraday movement, but it can also experience sharp volatility, wider spreads and increased slippage during active news periods.",
                },
                {
                  q: "How much money do you need for forex scalping?",
                  a: "There is no universal minimum account size. The important factor is whether the account allows you to use appropriate position sizing and risk management without excessive leverage.",
                },
                {
                  q: "How do I choose a forex broker for scalping?",
                  a: "Compare regulation, spreads, commissions, account structure, platform availability, execution conditions and whether the broker permits your intended short-term trading style.",
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

                    <p className="max-w-5xl text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
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
                Guides That Can Improve Your Scalping Knowledge
              </h2>

              <p className="mt-1.5 text-[12px] leading-6 text-slate-500 md:text-[13px]">
                Learn more about trading costs, exits, risk and position sizing.
              </p>

            </div>


            {/* DESKTOP */}
            <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">

              {[
                {
                  label: "Trading Costs",
                  title: "Forex Spread",
                  text: "Understand how the bid-ask spread directly affects short-term trades.",
                  href: "/en/learn-trading/spread",
                },
                {
                  label: "Risk Management",
                  title: "Stop Loss",
                  text: "Learn why defining an invalidation level before entry matters.",
                  href: "/en/learn-trading/stop-loss",
                },
                {
                  label: "Trade Management",
                  title: "Take Profit",
                  text: "Understand how traders plan logical exit targets.",
                  href: "/en/learn-trading/take-profit",
                },
                {
                  label: "Position Sizing",
                  title: "Lot Size",
                  text: "Understand the relationship between trade size, risk and stop distance.",
                  href: "/en/learn-trading/lot",
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
                    Read Guide →
                  </div>

                </Link>
              ))}

            </div>


            {/* MOBILE */}
            <div className="divide-y divide-slate-100 md:hidden">

              {[
                ["Trading Costs", "Forex Spread", "/en/learn-trading/spread"],
                ["Risk Management", "Stop Loss", "/en/learn-trading/stop-loss"],
                ["Trade Management", "Take Profit", "/en/learn-trading/take-profit"],
                ["Position Sizing", "Lot Size", "/en/learn-trading/lot"],
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
                    →
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
                  Next Step
                </span>

                <h2 className="mt-2.5 text-[20px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[27px]">
                  Learn the Setup First, Then Compare Your Trading Environment
                </h2>

                <p className="mt-2 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                  Test your scalping rules on a demo account and monitor how
                  spreads, commissions and execution affect your results. When
                  you are ready to compare providers, review brokers that offer
                  accounts and platforms relevant to active short-term traders.
                </p>

              </div>


              <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-0 md:flex md:shrink-0">

                <Link
                  href="/en/tools"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 text-center text-[11px] font-black text-brand-600 transition hover:bg-brand-50 md:min-w-[145px]"
                >
                  Trading Tools
                </Link>

                <Link
                  href="/en/best-brokers/scalping"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-3 text-center text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700 md:min-w-[190px]"
                >
                  Best Scalping Brokers
                  <span className="ml-2">→</span>
                </Link>

              </div>

            </div>


            <div className="border-t border-brand-100/70 bg-white/50 px-4 py-2.5 md:px-7">

              <p className="text-center text-[10px] leading-5 text-slate-500 md:text-left md:text-[11px]">
                This content is educational and does not constitute trading
                advice. Leveraged trading involves risk and can result in the
                loss of capital.
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

            url: PAGE_URL,
            inLanguage: "en",

            datePublished: DATE_PUBLISHED,
            dateModified: DATE_MODIFIED,

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
            },

            about: [
              {
                "@type": "Thing",
                name: "Forex Scalping Strategy",
              },
              {
                "@type": "Thing",
                name: "Forex Scalping",
              },
              {
                "@type": "Thing",
                name: "1 Minute Scalping Strategy",
              },
              {
                "@type": "Thing",
                name: "5 Minute Scalping Strategy",
              },
              {
                "@type": "Thing",
                name: "EMA Scalping Strategy",
              },
              {
                "@type": "Thing",
                name: "Price Action Scalping",
              },
              {
                "@type": "Thing",
                name: "Forex Scalping Risk Management",
              },
            ],

            keywords: PAGE_KEYWORDS,
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
                name: "Home",
                item: `${BASE_URL}/en`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Trading Strategies",
                item: `${BASE_URL}/en/strategies`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Forex Scalping Strategy",
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
                name: "What is a forex scalping strategy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Forex scalping is a short-term trading approach that aims to capture relatively small price movements through quick entries and exits. It requires clear rules, disciplined risk management and close attention to trading costs.",
                },
              },
              {
                "@type": "Question",
                name: "Is forex scalping good for beginners?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Beginners can learn scalping, but lower timeframes require fast decisions and can contain significant market noise. A demo account and a simple five-minute setup can provide a more manageable starting point.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best timeframe for scalping?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "There is no single best timeframe. The one-minute chart provides faster signals, while the five-minute chart is generally easier to read. Some traders use a 15-minute chart to define the broader intraday context.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best indicator for forex scalping?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No indicator guarantees successful scalping. Traders may use EMAs, RSI or VWAP alongside price action, market structure and risk management.",
                },
              },
              {
                "@type": "Question",
                name: "What are the best forex pairs for scalping?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Major currency pairs such as EUR/USD, GBP/USD and USD/JPY are commonly followed by scalpers because of their liquidity, although spreads, volatility and execution conditions vary.",
                },
              },
              {
                "@type": "Question",
                name: "Can you scalp gold?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Some traders scalp XAU/USD because gold can produce strong intraday movement, but volatility, spreads and slippage can also increase substantially.",
                },
              },
              {
                "@type": "Question",
                name: "How much money do you need for forex scalping?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "There is no universal minimum account size. The account should allow appropriate position sizing and risk management without requiring excessive leverage.",
                },
              },
              {
                "@type": "Question",
                name: "How do I choose a forex broker for scalping?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Compare regulation, spreads, commissions, account structure, platform availability, execution conditions and whether the broker permits your intended short-term trading approach.",
                },
              },
            ],
          }),
        }}
      />

    </main>
  );
}