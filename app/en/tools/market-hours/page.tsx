import type { Metadata } from "next";
import Link from "next/link";
import MarketHoursToolEN from "../../../../app/components/MarketHoursToolEN";

export const metadata: Metadata = {
  title: "Global Market Hours: NYSE, Nasdaq, London, Tokyo & Sydney",
  description:
    "Check global market hours in your local time. See whether NYSE, Nasdaq, London, Tokyo and Sydney are open now, plus opening times, closing times and forex trading sessions.",
  keywords: [
    "global market hours",
    "stock market hours",
    "market open now",
    "trading hours",
    "NYSE hours",
    "Nasdaq hours",
    "US stock market hours",
    "what time does the stock market open",
    "what time does NYSE open",
    "what time does Nasdaq open",
    "London Stock Exchange hours",
    "Tokyo Stock Exchange hours",
    "Sydney market hours",
    "forex trading sessions",
    "forex market hours",
    "London session",
    "New York session",
    "Tokyo session",
    "Sydney session",
    "trading sessions in my timezone",
    "market hours in local time",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/en/tools/market-hours",
    languages: {
      ar: "https://brokeralarab.com/tools/market-hours",
      en: "https://brokeralarab.com/en/tools/market-hours",
      "x-default": "https://brokeralarab.com/en/tools/market-hours",
    },
  },
  openGraph: {
    title: "Global Market Hours — Live Trading Sessions in Your Time Zone",
    description:
      "See which major markets are open now and convert NYSE, Nasdaq, London, Tokyo and Sydney trading hours automatically to your local time.",
    url: "https://brokeralarab.com/en/tools/market-hours",
    siteName: "Broker Alarab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Market Hours — Live Trading Sessions",
    description:
      "Check major market opening and closing times in your local time zone, including NYSE, Nasdaq, London, Tokyo and Sydney.",
  },
};

const faqItems = [
  {
    question: "What time does the US stock market open?",
    answer:
      "Regular trading on the New York Stock Exchange (NYSE) and Nasdaq runs from 9:30 AM to 4:00 PM New York time on normal trading days. The live tool above converts those hours automatically to your local time zone.",
  },
  {
    question: "Is the US stock market open right now?",
    answer:
      "The live market-hours tool shows whether the US stock market is currently open or closed and displays the time remaining until the next opening or closing event.",
  },
  {
    question: "Do stock market hours change with daylight saving time?",
    answer:
      "The official local exchange hours generally stay the same, but the time shown in your country can shift when regions enter or leave daylight saving time on different dates. This tool uses real IANA time zones to handle those changes automatically.",
  },
  {
    question: "What is the difference between NYSE hours and the New York forex session?",
    answer:
      "NYSE and Nasdaq have defined exchange trading hours. The New York forex session is a broader period of activity in the decentralized foreign-exchange market, so the two should not be treated as identical schedules.",
  },
  {
    question: "Is the forex market open 24 hours a day?",
    answer:
      "Forex trades nearly 24 hours a day from Monday through Friday as activity moves across Sydney, Tokyo, London and New York. The market is generally closed over the weekend.",
  },
  {
    question: "When are forex markets most active?",
    answer:
      "Liquidity and volatility often increase when major trading sessions overlap, especially during the London–New York overlap. Higher activity can also mean faster price moves and greater trading risk.",
  },
  {
    question: "What are the main forex trading sessions?",
    answer:
      "The four commonly referenced sessions are Sydney, Tokyo, London and New York. Together they describe the major regional periods of forex activity across the 24-hour trading day.",
  },
];

const quickMarkets = [
  {
    flag: "🇺🇸",
    title: "US Stock Market",
    subtitle: "NYSE / Nasdaq",
    time: "9:30 AM – 4:00 PM",
    zone: "New York time",
  },
  {
    flag: "🇬🇧",
    title: "London Market",
    subtitle: "London Stock Exchange",
    time: "8:00 AM – 4:30 PM",
    zone: "London time",
  },
  {
    flag: "🇯🇵",
    title: "Tokyo Market",
    subtitle: "Tokyo Stock Exchange",
    time: "9:00 AM – 3:30 PM",
    zone: "Tokyo time",
  },
  {
    flag: "🇦🇺",
    title: "Sydney Market",
    subtitle: "Australian Securities Exchange",
    time: "10:00 AM – 4:00 PM",
    zone: "Sydney time",
  },
];

export default function MarketHoursPage() {
  const pageUrl = "https://brokeralarab.com/en/tools/market-hours";
  const siteUrl = "https://brokeralarab.com";

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      /* =====================================================
         WEBSITE
      ====================================================== */
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Broker Alarab",
        alternateName: "Broker Alarab",
        inLanguage: ["ar", "en"],
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },

      /* =====================================================
         ORGANIZATION
      ====================================================== */
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Broker Alarab",
        alternateName: "Broker Alarab",
        url: siteUrl,
      },

      /* =====================================================
         WEB PAGE
      ====================================================== */
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Global Market Hours in Your Local Time",
        headline: "Global Market Hours in Your Local Time",
        description:
          "Check global market hours in your local time and see whether the US, London, Tokyo and Sydney markets are open or closed, including their opening and closing times.",
        inLanguage: "en",

        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },

        publisher: {
          "@id": `${siteUrl}/#organization`,
        },

        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${pageUrl}#market-hours-tool`,
        },

        hasPart: [
          {
            "@id": `${pageUrl}#faq`,
          },
        ],

        about: [
          {
            "@type": "Thing",
            name: "Global Market Hours",
          },
          {
            "@type": "Thing",
            name: "US Stock Market",
          },
          {
            "@type": "Thing",
            name: "NYSE",
          },
          {
            "@type": "Thing",
            name: "Nasdaq",
          },
          {
            "@type": "Thing",
            name: "London Stock Exchange",
          },
          {
            "@type": "Thing",
            name: "Tokyo Stock Exchange",
          },
          {
            "@type": "Thing",
            name: "Australian Securities Exchange",
          },
          {
            "@type": "Thing",
            name: "Forex Trading Sessions",
          },
        ],
      },

      /* =====================================================
         MARKET HOURS TOOL
      ====================================================== */
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#market-hours-tool`,
        name: "Global Market Hours Tool",
        alternateName: "Global Market Hours Tool",
        url: pageUrl,

        description:
          "A free interactive market-hours tool that shows whether major global markets are open or closed, their next opening or closing time, and the remaining time automatically in the visitor's local time zone.",

        applicationCategory: "FinanceApplication",
        applicationSubCategory: "Market Hours Tool",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        inLanguage: "en",

        provider: {
          "@id": `${siteUrl}/#organization`,
        },

        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },

        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },

        audience: {
          "@type": "Audience",
          audienceType:
            "Forex traders, stock traders, investors and financial market participants",
        },

        featureList: [
          "Live open/closed status for major global markets",
          "Automatic conversion of market hours to the visitor's local time zone",
          "NYSE and Nasdaq opening and closing times",
          "London Stock Exchange trading hours",
          "Tokyo Stock Exchange trading hours",
          "Australian Securities Exchange trading hours",
          "Countdown to the next market open or close",
          "Automatic daylight-saving-time adjustments",
          "24-hour global market timeline",
        ],
      },

      /* =====================================================
         BREADCRUMB
      ====================================================== */
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Broker Alarab",
            item: `${siteUrl}/en`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Trading Tools",
            item: `${siteUrl}/en/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Global Market Hours",
            item: pageUrl,
          },
        ],
      },

      /* =====================================================
         FAQ
      ====================================================== */
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: `${pageUrl}#faq`,
        name: "Frequently Asked Questions About Global Market Hours",
        inLanguage: "en",

        isPartOf: {
          "@id": `${pageUrl}#webpage`,
        },

        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,

          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f4f7fb] text-[#0f172a]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* =====================================================
    HERO
====================================================== */}
<section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#eef5ff_0%,#f8fbff_48%,#e4efff_100%)]">

  {/* =====================================================
      BACKGROUND
  ====================================================== */}
  <div className="pointer-events-none absolute inset-0">

    <div className="absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-brand-400/10 blur-[120px]" />

    <div className="absolute -left-32 bottom-[-180px] h-[440px] w-[440px] rounded-full bg-blue-300/10 blur-[110px]" />

    <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(30,91,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,91,184,0.055)_1px,transparent_1px)] [background-size:52px_52px]" />

  </div>

  <div className="relative mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:px-10">

    {/* =====================================================
        BREADCRUMB
    ====================================================== */}
    <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500">

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
        href="/en/tools"
        className="transition hover:text-brand-600"
      >
        Trading Tools
      </Link>

      <span className="text-slate-300">
        /
      </span>

      <span className="text-slate-700">
        Market Hours
      </span>

    </div>

    {/* =====================================================
        DESKTOP HERO
    ====================================================== */}
    <div className="hidden items-center gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_470px] xl:grid-cols-[minmax(0,1fr)_510px] xl:gap-12">

      {/* =====================================================
          TEXT
      ====================================================== */}
      <div className="min-w-0">

        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-[10px] font-black text-brand-600 shadow-sm">

          <span className="relative flex h-2 w-2">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />

          </span>

          Live global market status

        </span>

        <h1 className="mt-3 max-w-[930px] text-[48px] font-black leading-[1.08] tracking-[-0.04em] text-[#07111f] xl:text-[58px]">

          Global Market Hours

          <span className="mt-1 block text-brand-600">
            In Your Local Time
          </span>

        </h1>

        <p className="mt-4 max-w-[920px] text-[15px] font-semibold leading-8 text-slate-600 xl:text-[16px]">

          See which major markets are open now and when the US, London, Tokyo and Sydney markets open and close without calculating time-zone differences manually. The tool converts every schedule to your local time and automatically accounts for daylight-saving changes.

        </p>

        {/* FEATURES */}
        <div className="mt-5 flex flex-wrap gap-2.5">

          {[
            "Automatic local time",
            "Live market status",
            "DST-aware times",
            "Open / close countdown",
          ].map((item) => (

            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-3.5 py-2 text-[10px] font-black text-slate-600 shadow-[0_5px_18px_rgba(15,23,42,0.05)]"
            >

              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-[9px] text-emerald-600">
                ✓
              </span>

              {item}

            </span>

          ))}

        </div>

      </div>

      {/* =====================================================
          GLOBAL MARKET CLOCK VISUAL
      ====================================================== */}
      <div className="flex -translate-y-3 items-center justify-center">

        <div className="relative h-[355px] w-[465px] xl:h-[375px] xl:w-[500px]">

          {/* BACK GLOW */}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/20 blur-[58px]" />

          {/* DECORATIVE DOTS */}
          <span className="absolute left-[25px] top-[42px] h-2 w-2 rounded-full bg-brand-300/45" />

          <span className="absolute right-[18px] top-[142px] h-1.5 w-1.5 rounded-full bg-sky-400/50" />

          <span className="absolute bottom-[52px] right-[50px] h-2.5 w-2.5 rounded-full bg-brand-400/25" />

          {/* =================================================
              MAIN CLOCK
          ================================================== */}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-200/90 bg-white/70 shadow-[0_28px_70px_rgba(30,91,184,0.13)] backdrop-blur-md xl:h-[320px] xl:w-[320px]">

            {/* RING 1 */}
            <div className="absolute inset-[13px] rounded-full border border-brand-100/90" />

            {/* RING 2 */}
            <div className="absolute inset-[47px] rounded-full border border-dashed border-brand-200/90" />

            {/* SOFT CENTER AREA */}
            <div className="absolute inset-[90px] rounded-full bg-brand-50/50" />

            {/* VERTICAL GUIDE */}
            <div className="absolute bottom-[24px] left-1/2 top-[24px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-100 to-transparent" />

            {/* HORIZONTAL GUIDE */}
            <div className="absolute left-[24px] right-[24px] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-100 to-transparent" />

            {/* =================================================
                TIME LABELS
            ================================================== */}
            <span className="absolute left-1/2 top-[24px] -translate-x-1/2 text-[9px] font-black text-slate-400">
              00
            </span>

            <span className="absolute right-[27px] top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400">
              06
            </span>

            <span className="absolute bottom-[24px] left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-400">
              12
            </span>

            <span className="absolute left-[27px] top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400">
              18
            </span>

            {/* =================================================
                SESSION ARCS / INDICATORS
            ================================================== */}

            {/* TOP RIGHT ARC */}
            <div className="absolute right-[51px] top-[51px] h-[47px] w-[47px] rounded-tr-full border-r-[4px] border-t-[4px] border-brand-500" />

            {/* BOTTOM LEFT ARC */}
            <div className="absolute bottom-[52px] left-[51px] h-[48px] w-[48px] rounded-bl-full border-b-[4px] border-l-[4px] border-sky-400" />

            {/* CURRENT TIME MARKER */}
            <div className="absolute right-[40px] top-[103px] z-10">

              <span className="relative flex h-3 w-3">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-40" />

                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-rose-500 shadow-sm" />

              </span>

            </div>

            {/* =================================================
                CLEAN CENTER
            ================================================== */}
            <div className="absolute left-1/2 top-1/2 z-30 flex h-[116px] w-[116px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-brand-100 bg-white shadow-[0_15px_36px_rgba(15,23,42,0.11)]">

              <span className="text-[7px] font-black uppercase tracking-[0.16em] text-brand-500">
                GLOBAL
              </span>

              <div
                dir="ltr"
                className="mt-1 text-[28px] font-black leading-none tracking-[-0.045em] text-[#07111f]"
              >
                24H
              </div>

              <span className="mt-1 text-[7.5px] font-bold text-slate-400">
                Market Clock
              </span>

              <div className="mt-2 flex items-center gap-1">

                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />

                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              </div>

            </div>

          </div>

          {/* =================================================
              NEW YORK CARD
          ================================================== */}
          <div className="absolute right-0 top-[35px] z-40 flex min-w-[160px] items-center gap-2.5 rounded-[15px] border border-slate-200 bg-white/95 px-3 py-2.5 shadow-[0_10px_26px_rgba(15,23,42,0.09)] backdrop-blur">

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-50 text-[17px]">
              🇺🇸
            </span>

            <div className="min-w-0">

              <div className="flex items-center gap-1.5">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />

                </span>

                <span className="text-[11px] font-black text-slate-800">
                  New York
                </span>

              </div>

              <div className="mt-0.5 text-[8.5px] font-bold text-slate-500">
                NYSE / Nasdaq
              </div>

            </div>

          </div>

          {/* =================================================
              LONDON CARD
          ================================================== */}
          <div className="absolute left-0 top-[67px] z-40 flex min-w-[153px] items-center gap-2.5 rounded-[15px] border border-slate-200 bg-white/95 px-3 py-2.5 shadow-[0_10px_26px_rgba(15,23,42,0.09)] backdrop-blur">

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-50 text-[17px]">
              🇬🇧
            </span>

            <div>

              <div className="text-[11px] font-black text-slate-800">
                London
              </div>

              <div className="mt-0.5 text-[8.5px] font-bold text-slate-500">
                London Market
              </div>

            </div>

          </div>

          {/* =================================================
              TOKYO CARD
          ================================================== */}
          <div className="absolute bottom-[39px] right-[3px] z-40 flex min-w-[151px] items-center gap-2.5 rounded-[15px] border border-slate-200 bg-white/95 px-3 py-2.5 shadow-[0_10px_26px_rgba(15,23,42,0.09)] backdrop-blur">

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-50 text-[17px]">
              🇯🇵
            </span>

            <div>

              <div className="text-[11px] font-black text-slate-800">
                Tokyo
              </div>

              <div className="mt-0.5 text-[8.5px] font-bold text-slate-500">
                Tokyo Market
              </div>

            </div>

          </div>

          {/* =================================================
              SYDNEY CARD
          ================================================== */}
          <div className="absolute bottom-[25px] left-[5px] z-40 flex min-w-[153px] items-center gap-2.5 rounded-[15px] border border-slate-200 bg-white/95 px-3 py-2.5 shadow-[0_10px_26px_rgba(15,23,42,0.09)] backdrop-blur">

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-50 text-[17px]">
              🇦🇺
            </span>

            <div>

              <div className="text-[11px] font-black text-slate-800">
                Sydney
              </div>

              <div className="mt-0.5 text-[8.5px] font-bold text-slate-500">
                Sydney Market
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* =====================================================
        MOBILE HERO
    ====================================================== */}
    <div className="lg:hidden">

      <div className="text-center">

        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[9px] font-black text-brand-600 shadow-sm">

          <span className="relative flex h-2 w-2">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />

          </span>

          Live global market status

        </span>

        <h1 className="mx-auto mt-3 max-w-[400px] text-[32px] font-black leading-[1.12] tracking-[-0.035em] text-[#07111f] sm:text-[40px]">

          Global Market Hours

          <span className="mt-1 block text-brand-600">
            In Your Local Time
          </span>

        </h1>

        <p className="mx-auto mt-3 max-w-[540px] text-[12px] font-semibold leading-6 text-slate-600 sm:text-[14px] sm:leading-7">

          See which major markets are open now and view opening and closing times automatically in your device's local time zone.

        </p>

      </div>

      {/* =====================================================
          MOBILE MARKET CLOCK
      ====================================================== */}
      <div className="relative mx-auto mt-5 max-w-[410px] overflow-hidden rounded-[22px] border border-brand-100 bg-white/85 p-4 shadow-[0_12px_32px_rgba(30,91,184,0.09)] backdrop-blur">

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3">

            {/* MOBILE 24H ICON */}
            <div className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50">

              <div className="absolute inset-[6px] rounded-full border border-dashed border-brand-200" />

              <span
                dir="ltr"
                className="relative z-10 text-[15px] font-black text-brand-600"
              >
                24H
              </span>

              <span className="absolute right-[4px] top-[9px] h-2 w-2 rounded-full border border-white bg-emerald-500" />

            </div>

            <div className="text-left">

              <div className="text-[13px] font-black text-slate-900">
                Global Market Clock
              </div>

              <div className="mt-1 text-[9px] font-semibold text-slate-500">
                Track major markets across time zones
              </div>

            </div>

          </div>

          <span className="text-[19px]">
            🌐
          </span>

        </div>

        {/* MOBILE MARKETS */}
        <div className="mt-4 grid grid-cols-4 gap-2">

          {[
            ["🇺🇸", "NY", "New York"],
            ["🇬🇧", "LDN", "London"],
            ["🇯🇵", "TYO", "Tokyo"],
            ["🇦🇺", "SYD", "Sydney"],
          ].map(([flag, code, city]) => (

            <div
              key={code}
              className="rounded-[12px] border border-slate-200 bg-white px-1.5 py-2.5 text-center shadow-sm"
            >

              <div className="text-[17px]">
                {flag}
              </div>

              <div className="mt-1 text-[8px] font-black text-slate-700">
                {city}
              </div>

              <div className="mt-0.5 text-[6.5px] font-bold text-slate-400">
                {code}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =====================================================
          MOBILE FEATURES
      ====================================================== */}
      <div className="mx-auto mt-3 grid max-w-[410px] grid-cols-2 gap-2">

        {[
          "Your local time",
          "Live status",
          "DST aware",
          "Open countdown",
        ].map((item) => (

          <span
            key={item}
            className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-[11px] border border-white bg-white/90 px-2 text-center text-[9px] font-black text-slate-600 shadow-sm"
          >

            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-[8px] text-emerald-600">
              ✓
            </span>

            {item}

          </span>

        ))}

      </div>

    </div>

  </div>

</section>

      {/* TOOL */}
      <section className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:px-10">
        <MarketHoursToolEN />
      </section>

      {/* =====================================================
    QUICK MARKET TIMES
====================================================== */}
<section className="mx-auto w-full max-w-[1520px] px-4 pb-5 sm:px-6 sm:pb-7 lg:px-8 xl:px-10">

  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.05)]">

    {/* =====================================================
    MOBILE VERSION
====================================================== */}
<div className="md:hidden">

  {/* MOBILE HEADER */}
  <div className="border-b border-slate-100 bg-gradient-to-r from-[#f7fbff] via-white to-[#edf5ff] px-4 py-4">

    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-600 shadow-sm">
      Regular Trading Hours
    </span>

    <h2 className="mt-2.5 text-[23px] font-black leading-[1.2] text-[#07111f]">
      When Do Global Markets Open?
    </h2>

    <p className="mt-2 text-[11px] font-semibold leading-6 text-slate-600">
      Regular exchange hours shown in each market's local time, with live conversion available above.
    </p>

  </div>

  {/* MARKET ROWS */}
  <div className="divide-y divide-slate-100">

    {quickMarkets.map((item) => {

      const code =
        item.title === "US Stock Market"
          ? "US"
          : item.title === "London Market"
          ? "GB"
          : item.title === "Tokyo Market"
          ? "JP"
          : "AU";

      return (
        <article
          key={item.title}
          className="flex items-center justify-between gap-3 px-4 py-3.5"
        >

          {/* MARKET INFO */}
          <div className="flex min-w-0 items-center gap-3">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-slate-200 bg-slate-50 text-[10px] font-black text-slate-700">
              {code}
            </span>

            <div className="min-w-0">

              <h3 className="truncate text-[13px] font-black text-slate-900">
                {item.title}
              </h3>

              <p
                dir="ltr"
                className="mt-0.5 truncate text-left text-[8px] font-bold text-slate-400"
              >
                {item.subtitle}
              </p>

            </div>

          </div>

          {/* TIME */}
          <div className="shrink-0 text-left">

            <div
              dir="ltr"
              className="whitespace-nowrap text-[14px] font-black tracking-[-0.02em] text-brand-600"
            >
              {item.time}
            </div>

            <div className="mt-1 text-[9px] font-bold text-slate-500">
              {item.zone}
            </div>

          </div>

        </article>
      );
    })}

  </div>

  {/* MOBILE NOTE */}
  <div className="border-t border-amber-100 bg-amber-50/70 px-4 py-2.5 text-[9px] font-semibold leading-5 text-amber-900">
    Trading hours may differ on exchange holidays and scheduled early-close days.
  </div>

</div>

    {/* =====================================================
        DESKTOP / TABLET VERSION
        Keep the current desktop/tablet layout
    ====================================================== */}
    <div className="hidden md:block">

      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f7fbff] via-white to-[#edf5ff] px-5 py-5 sm:px-7">

        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
          Regular Trading Hours
        </span>

        <h2 className="mt-3 text-[26px] font-black leading-tight text-[#07111f] sm:text-[34px]">
          When Do Global Markets Open?
        </h2>

        <p className="mt-2 max-w-[900px] text-[13px] font-semibold leading-7 text-slate-600 sm:text-[14px]">
          These are the regular trading hours in each exchange's local time. The live tool above converts them automatically to your current time zone.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4">

        {quickMarkets.map((item, index) => (

          <article
            key={item.title}
            className={`p-5 sm:p-6 ${
              index !== quickMarkets.length - 1
                ? "border-b border-slate-100 xl:border-b-0 xl:border-r"
                : ""
            }`}
          >

            <div className="flex items-center gap-3">

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-slate-200 bg-slate-50 text-[22px]">
                {item.flag}
              </span>

              <div>

                <h3 className="text-[15px] font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-0.5 text-[10px] font-bold text-slate-500">
                  {item.subtitle}
                </p>

              </div>

            </div>

            <div
              dir="ltr"
              className="mt-5 text-left text-[20px] font-black tracking-[-0.02em] text-brand-600"
            >
              {item.time}
            </div>

            <div className="mt-1 text-[11px] font-bold text-slate-500">
              {item.zone}
            </div>

          </article>

        ))}

      </div>

      <div className="border-t border-amber-100 bg-amber-50/70 px-5 py-3.5 text-[11px] font-semibold leading-6 text-amber-900 sm:px-7">
        Trading hours can change on exchange holidays and early-close sessions, so always confirm the official schedule on exceptional trading days.
      </div>

    </div>

  </div>

</section>

      {/* MAIN EXPLANATION */}
      <section className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.045)] sm:p-7 lg:p-8">
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Trading Sessions
            </span>

            <h2 className="mt-3 text-[27px] font-black leading-[1.2] text-[#07111f] sm:text-[36px]">
              What Are the Major Global Trading Sessions?
            </h2>

            <p className="mt-4 text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
              Financial-market activity moves across time zones throughout the day, from Asia to Europe and then North America. In forex, traders commonly refer to the Sydney, Tokyo, London and New York sessions as the major regional trading periods.
            </p>

            <p className="mt-3 text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
              Knowing which session is active helps put price action into context. Some periods are quieter, while liquidity and volatility can increase when major sessions overlap or when important economic data is released.
            </p>

            <div className="mt-6 rounded-[20px] border border-amber-100 bg-amber-50/60 p-4 sm:p-5">
              <div className="text-[13px] font-black text-amber-900">
                Important distinction
              </div>

              <p className="mt-1.5 text-[12px] font-semibold leading-6 text-amber-900/80 sm:text-[13px]">
                The New York forex session is not the same thing as the official trading hours of NYSE and Nasdaq. Exchange hours and forex-session activity should be treated as separate concepts.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["01", "Sydney", "Pacific trading session"],
                ["02", "Tokyo", "Asian trading session"],
                ["03", "London", "European trading session"],
                ["04", "New York", "North American session"],
              ].map(([num, title, desc]) => (
                <div
                  key={title}
                  className="rounded-[18px] border border-slate-200 bg-[#fbfdff] p-4"
                >
                  <span className="text-[10px] font-black text-brand-500">
                    {num}
                  </span>

                  <h3 className="mt-1.5 text-[14px] font-black text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <aside className="overflow-hidden rounded-[28px] border border-brand-100 bg-[linear-gradient(145deg,#edf5ff_0%,#f9fbff_100%)] shadow-[0_14px_36px_rgba(30,91,184,0.05)]">
            <div className="border-b border-brand-100 px-5 py-5 sm:px-6">
              <span className="text-[24px]">⚡</span>

              <h2 className="mt-2 text-[23px] font-black text-[#07111f]">
                Why Do Market Hours Matter?
              </h2>

              <p className="mt-1 text-[11px] font-semibold leading-6 text-slate-500">
                Trading conditions can change significantly throughout the day.
              </p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {[
                {
                  title: "Liquidity",
                  text: "Market depth and trading activity can rise when major financial centres are open.",
                },
                {
                  title: "Volatility",
                  text: "Price moves can accelerate during session overlaps and major economic releases.",
                },
                {
                  title: "Spreads",
                  text: "Bid-ask spreads can vary with liquidity, volatility and overall market conditions.",
                },
                {
                  title: "Strategy timing",
                  text: "Some trading approaches are better suited to active sessions than quieter periods.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[11px] font-black text-white shadow-sm">
                    ✓
                  </span>

                  <div>
                    <h3 className="text-[14px] font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
    US MARKET INTENT
====================================================== */}
<section className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">

  {/* MOBILE — KEEP COMPACT */}
  <article className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] sm:p-7 lg:hidden">

    <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />

    <div className="relative">

      <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
        US Stock Market
      </span>

      <h2 className="mt-3 text-[27px] font-black leading-[1.2] text-[#07111f]">
        What Time Does the US Stock Market Open in My Time Zone?
      </h2>

      <p className="mt-4 text-[14px] font-medium leading-8 text-slate-600">
        Regular trading on the New York Stock Exchange
        <strong className="font-black text-slate-800"> NYSE </strong>
        and
        <strong className="font-black text-slate-800"> Nasdaq </strong>
        runs from 9:30 AM to 4:00 PM New York time on normal trading days.
      </p>

      <p className="mt-3 text-[14px] font-medium leading-8 text-slate-600">
        The live tool above converts those hours to your local time automatically, so you do not need to calculate the difference from New York manually.
      </p>

      <div className="mt-5 grid gap-3">

        {[
          {
            country: "United Kingdom",
            text: "See NYSE and Nasdaq hours converted automatically to London time, including seasonal clock changes.",
          },
          {
            country: "Europe",
            text: "Convert US market hours to your local European time zone without relying on a fixed UTC offset.",
          },
          {
            country: "Canada",
            text: "Toronto, Vancouver and other Canadian time zones are handled using the time zone reported by your browser.",
          },
        ].map((item) => (

          <div
            key={item.country}
            className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4"
          >
            <div className="text-[12px] font-black text-brand-700">
              {item.country}
            </div>

            <p className="mt-1 text-[11px] font-semibold leading-6 text-slate-600">
              {item.text}
            </p>
          </div>

        ))}

      </div>

    </div>

  </article>

  {/* DESKTOP — STRONG VERSION */}
  <article className="relative hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] lg:block">

    {/* DECORATION */}
    <div className="pointer-events-none absolute -left-32 -top-36 h-[420px] w-[420px] rounded-full bg-brand-100/60 blur-[90px]" />

    <div className="pointer-events-none absolute -right-24 bottom-[-140px] h-[320px] w-[320px] rounded-full bg-sky-100/60 blur-[90px]" />

    <div className="relative grid grid-cols-[1.25fr_0.75fr]">

      {/* CONTENT */}
      <div className="p-8 xl:p-10">

        <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-[10px] font-black text-brand-600">
          US Stock Market
        </span>

        <h2 className="mt-4 max-w-[900px] text-[36px] font-black leading-[1.18] tracking-[-0.02em] text-[#07111f] xl:text-[40px]">
          What Time Does the US Stock Market Open in My Time Zone?
        </h2>

        <p className="mt-5 max-w-[950px] text-[15px] font-medium leading-8 text-slate-600">
          Regular trading on
          <strong className="font-black text-slate-900"> NYSE </strong>
          and
          <strong className="font-black text-slate-900"> Nasdaq </strong>
          runs from 9:30 AM to 4:00 PM New York time on normal trading days. These are the standard core-session hours for US-listed stocks on the two major exchanges.
        </p>

        <p className="mt-3 max-w-[950px] text-[15px] font-medium leading-8 text-slate-600">
          For traders outside New York, the local opening time can shift during the year because regions change their clocks on different dates. The tool uses your browser's time zone instead of a fixed offset, which keeps the conversion accurate through daylight-saving transitions.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">

          {[
            {
              country: "🇬🇧 United Kingdom",
              title: "Converted to London time",
              text: "The tool calculates the New York–London difference automatically, including DST transition weeks.",
            },
            {
              country: "🇪🇺 Europe",
              title: "Your European time zone",
              text: "The displayed US open and close times adjust automatically as time-zone rules change during the year.",
            },
            {
              country: "🇨🇦 Canada",
              title: "Based on your city",
              text: "Toronto, Vancouver and other cities are calculated using their actual IANA time zones rather than one Canada-wide offset.",
            },
          ].map((item) => (

            <div
              key={item.country}
              className="rounded-[20px] border border-brand-100 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5ff_100%)] p-5"
            >
              <div className="text-[12px] font-black text-brand-700">
                {item.country}
              </div>

              <h3 className="mt-2 text-[15px] font-black text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                {item.text}
              </p>
            </div>

          ))}

        </div>

      </div>

      {/* SIDE INFO */}
      <aside className="border-l border-slate-100 bg-[linear-gradient(160deg,#f9fbff_0%,#eef5ff_100%)] p-8 xl:p-10">

        <div className="flex h-full flex-col justify-center">

          <span className="text-[28px]">
            🇺🇸
          </span>

          <div className="mt-4 text-[11px] font-black text-brand-600">
            Regular trading hours
          </div>

          <div
            dir="ltr"
            className="mt-2 text-left text-[30px] font-black tracking-[-0.03em] text-[#07111f]"
          >
            9:30 AM
          </div>

          <div className="mt-1 text-[11px] font-bold text-slate-500">
            Market open
          </div>

          <div className="my-5 h-px bg-brand-100" />

          <div
            dir="ltr"
            className="text-left text-[30px] font-black tracking-[-0.03em] text-[#07111f]"
          >
            4:00 PM
          </div>

          <div className="mt-1 text-[11px] font-bold text-slate-500">
            Market close
          </div>

          <div className="mt-6 rounded-[16px] border border-amber-100 bg-amber-50/70 p-4">

            <div className="text-[11px] font-black text-amber-900">
              Daylight-saving time matters
            </div>

            <p className="mt-1 text-[10px] font-semibold leading-5 text-amber-900/80">
              Your local opening time can change during the year even though the official New York trading session remains 9:30 AM–4:00 PM.
            </p>

          </div>

        </div>

      </aside>

    </div>

  </article>

</section>


{/* =====================================================
    HOW TO USE
====================================================== */}
<section className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">

  {/* MOBILE — KEEP CURRENT COMPACT DESIGN */}
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.045)] lg:hidden">

    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-5">

      <h2 className="text-[26px] font-black text-[#07111f]">
        How Does the Market Hours Tool Work?
      </h2>

      <p className="mt-2 text-[13px] font-semibold leading-7 text-slate-600">
        No country selector or manual time-zone calculation is required.
      </p>

    </div>

    <div>

      {[
        {
          n: "01",
          title: "Detect your time zone",
          text: "The tool reads the IANA time zone reported by your browser, such as Europe/London or America/Toronto.",
        },
        {
          n: "02",
          title: "Convert each market",
          text: "Each exchange is calculated using its real time zone instead of a fixed hour difference.",
        },
        {
          n: "03",
          title: "Show live market status",
          text: "You can immediately see whether a market is open or closed and which market is next to open.",
        },
        {
          n: "04",
          title: "Calculate the countdown",
          text: "The tool displays the next opening or closing event and the remaining time until it occurs.",
        },
      ].map((item, index) => (

        <article
          key={item.n}
          className={`p-4 ${
            index !== 3
              ? "border-b border-slate-100"
              : ""
          }`}
        >

          <div className="flex items-center gap-3">

            <span className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 px-2 text-[10px] font-black text-brand-600 ring-1 ring-brand-100">
              {item.n}
            </span>

            <h3 className="text-[15px] font-black text-slate-900">
              {item.title}
            </h3>

          </div>

          <p className="mt-2.5 pr-12 text-[11px] font-medium leading-6 text-slate-600">
            {item.text}
          </p>

        </article>

      ))}

    </div>

  </div>

  {/* DESKTOP — STRONG VERSION */}
  <div className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_46px_rgba(15,23,42,0.045)] lg:block">

    <div className="grid grid-cols-[0.72fr_1.28fr]">

      {/* INTRO */}
      <div className="border-r border-slate-100 bg-[linear-gradient(145deg,#eef5ff_0%,#f9fbff_100%)] p-8 xl:p-10">

        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
          How it works
        </span>

        <h2 className="mt-4 text-[34px] font-black leading-[1.2] text-[#07111f] xl:text-[38px]">
          How Does the Market Hours Tool Work?
        </h2>

        <p className="mt-4 text-[14px] font-medium leading-8 text-slate-600">
          The tool is designed to work automatically: no country selection, UTC conversion or manual time-zone arithmetic is required.
        </p>

        <div className="mt-6 rounded-[18px] border border-brand-100 bg-white p-4">

          <div className="text-[11px] font-black text-brand-700">
            What you get
          </div>

          <p className="mt-1 text-[11px] font-semibold leading-6 text-slate-600">
            Within seconds you can see which market is open, the next market event and the remaining time in your own time zone.
          </p>

        </div>

      </div>

      {/* STEPS */}
      <div className="grid grid-cols-2">

        {[
          {
            n: "01",
            title: "Detect the browser time zone",
            text: "The browser-reported IANA time zone is used without requiring precise GPS location access.",
          },
          {
            n: "02",
            title: "Apply each exchange time zone",
            text: "Each market is calculated in its own real time zone, which avoids errors caused by daylight-saving changes.",
          },
          {
            n: "03",
            title: "Show live market status",
            text: "The current open or closed state is calculated together with the next scheduled opening or closing time.",
          },
          {
            n: "04",
            title: "Calculate the countdown",
            text: "A live countdown shows how long remains until the next open or close without manual calculation.",
          },
        ].map((item, index) => (

          <article
            key={item.n}
            className={`relative p-7 xl:p-8 ${
              index === 0 || index === 1
                ? "border-b border-slate-100"
                : ""
            } ${
              index === 0 || index === 2
                ? "border-r border-slate-100"
                : ""
            }`}
          >

            <div className="flex items-center gap-3">

              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-brand-50 text-[11px] font-black text-brand-600 ring-1 ring-brand-100">
                {item.n}
              </span>

              <h3 className="text-[17px] font-black text-slate-900">
                {item.title}
              </h3>

            </div>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600">
              {item.text}
            </p>

          </article>

        ))}

      </div>

    </div>

  </div>

</section>


{/* =====================================================
    INTERNAL LINKS
====================================================== */}
<section className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">

  {/* MOBILE — KEEP CURRENT DESIGN */}
  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.035)] lg:hidden">

    <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
      Keep Learning
    </span>

    <h2 className="mt-3 text-[26px] font-black text-[#07111f]">
      Tools and Guides to Use Next
    </h2>

    <div className="mt-5 grid gap-3">

      <Link
        href="/en/strategies/price-action"
        className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-5 transition duration-300 hover:border-brand-200 hover:bg-brand-50/30"
      >
        <div className="text-[15px] font-black text-slate-900">
          Price Action Trading Strategy
        </div>

        <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
          Learn how to read price structure, trends, support and resistance before making a trading decision.
        </p>

        <div className="mt-3 text-[10px] font-black text-brand-600">
          Read the guide →
        </div>
      </Link>

      <Link
        href="/en/tools/risk-calculator"
        className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-5 transition duration-300 hover:border-brand-200 hover:bg-brand-50/30"
      >
        <div className="text-[15px] font-black text-slate-900">
          Risk Calculator
        </div>

        <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
          Calculate your planned trade risk before deciding position size.
        </p>

        <div className="mt-3 text-[10px] font-black text-brand-600">
          Open calculator →
        </div>
      </Link>

      <Link
        href="/en/learn-trading"
        className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-5 transition duration-300 hover:border-brand-200 hover:bg-brand-50/30"
      >
        <div className="text-[15px] font-black text-slate-900">
          Learn Trading
        </div>

        <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
          Build from trading fundamentals into risk management, market mechanics and strategy.
        </p>

        <div className="mt-3 text-[10px] font-black text-brand-600">
          Start learning →
        </div>
      </Link>

    </div>

  </div>

  {/* DESKTOP — STRONG VERSION */}
  <div className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_44px_rgba(15,23,42,0.04)] lg:block">

    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f7fbff] via-white to-[#edf5ff] px-8 py-6">

      <div className="flex items-end justify-between gap-8">

        <div>

          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
            Keep Learning
          </span>

          <h2 className="mt-3 text-[34px] font-black text-[#07111f]">
            Useful Trading Tools and Guides
          </h2>

          <p className="mt-2 max-w-[850px] text-[13px] font-semibold leading-7 text-slate-600">
            Market hours tell you when activity is likely to occur. Price analysis, position sizing and risk management help you decide how — or whether — to trade it.
          </p>

        </div>

        <span className="hidden text-[36px] xl:block">
          📚
        </span>

      </div>

    </div>

    <div className="grid grid-cols-3 gap-4 p-6 xl:p-7">

      <Link
        href="/en/strategies/price-action"
        className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-[#fbfdff] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_14px_32px_rgba(30,91,184,0.08)]"
      >

        <div className="absolute left-0 top-0 h-full w-[4px] bg-brand-500 opacity-0 transition group-hover:opacity-100" />

        <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-brand-50 text-[20px]">
          📈
        </span>

        <h3 className="mt-4 text-[18px] font-black text-slate-900 group-hover:text-brand-600">
          Price Action Trading Strategy
        </h3>

        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
          Understand price action, trend structure, support and resistance instead of relying on session timing alone.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black text-brand-600">
          Read the guide
          <span>→</span>
        </div>

      </Link>

      <Link
        href="/en/tools/risk-calculator"
        className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-[#fbfdff] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_14px_32px_rgba(30,91,184,0.08)]"
      >

        <div className="absolute left-0 top-0 h-full w-[4px] bg-brand-500 opacity-0 transition group-hover:opacity-100" />

        <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-brand-50 text-[20px]">
          🛡️
        </span>

        <h3 className="mt-4 text-[18px] font-black text-slate-900 group-hover:text-brand-600">
          Risk Calculator
        </h3>

        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
          Set trade risk and position size before entry so fast market conditions do not create unintended exposure.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black text-brand-600">
          Open calculator
          <span>→</span>
        </div>

      </Link>

      <Link
        href="/en/learn-trading"
        className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-[#fbfdff] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_14px_32px_rgba(30,91,184,0.08)]"
      >

        <div className="absolute left-0 top-0 h-full w-[4px] bg-brand-500 opacity-0 transition group-hover:opacity-100" />

        <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-brand-50 text-[20px]">
          🎓
        </span>

        <h3 className="mt-4 text-[18px] font-black text-slate-900 group-hover:text-brand-600">
          Learn Trading
        </h3>

        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
          Move from understanding market hours into trading basics, margin, leverage and risk management in a structured path.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black text-brand-600">
          Start learning
          <span>→</span>
        </div>

      </Link>

    </div>

  </div>

</section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-7 lg:px-8 xl:px-10">
        <div className="w-full">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Frequently Asked Questions
            </span>

            <h2 className="mt-3 text-[28px] font-black leading-tight text-[#07111f] sm:text-[38px]">
              Global Market Hours FAQ
            </h2>

            <p className="mx-auto mt-2 max-w-[720px] text-[12px] font-semibold leading-6 text-slate-500 sm:text-[13px]">
              Clear answers about stock-market opening times, daylight-saving changes and forex trading sessions.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.035)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4.5 text-[13px] font-black text-slate-900 sm:px-6 sm:py-5 sm:text-[15px]">
                  <span>{item.question}</span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[15px] font-black text-brand-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-100 px-4 py-4 text-[12px] font-medium leading-7 text-slate-600 sm:px-6 sm:py-5 sm:text-[13px]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}