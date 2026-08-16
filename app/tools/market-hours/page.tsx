import type { Metadata } from "next";
import Link from "next/link";
import MarketHoursTool from "../../components/MarketHoursTool";

export const metadata: Metadata = {
  title: "ساعات تداول الأسواق العالمية حسب توقيتك",
  description:
    "تابع ساعات تداول الأسواق العالمية حسب توقيتك المحلي. تعرف على حالة السوق الأمريكي ولندن وطوكيو وسيدني الآن، ومواعيد الافتتاح والإغلاق وجلسات التداول العالمية.",
  keywords: [
    "ساعات تداول الأسواق العالمية",
    "مواعيد فتح الأسواق العالمية",
    "متى يفتح السوق الأمريكي",
    "متى يغلق السوق الأمريكي",
    "ساعات تداول السوق الأمريكي",
    "مواعيد بورصة نيويورك",
    "مواعيد سوق لندن",
    "مواعيد سوق طوكيو",
    "مواعيد سوق سيدني",
    "مواعيد جلسات التداول",
    "جلسات الفوركس",
    "جلسة لندن",
    "جلسة نيويورك",
    "ساعات تداول الفوركس",
    "متى تفتح بورصة نيويورك",
    "market hours",
    "forex sessions",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/tools/market-hours",
    languages: {
      ar: "https://brokeralarab.com/tools/market-hours",
      en: "https://brokeralarab.com/en/tools/market-hours",
      "x-default": "https://brokeralarab.com/en/tools/market-hours",
    },
  },
  openGraph: {
    title: "ساعات تداول الأسواق العالمية حسب توقيتك",
    description:
      "اعرف الأسواق المفتوحة الآن ومواعيد الافتتاح والإغلاق حسب توقيتك المحلي.",
    url: "https://brokeralarab.com/tools/market-hours",
    siteName: "بروكر العرب",
    locale: "ar_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ساعات تداول الأسواق العالمية حسب توقيتك",
    description:
      "حالة الأسواق العالمية ومواعيد الافتتاح والإغلاق مباشرة حسب توقيتك.",
  },
};

const faqItems = [
  {
    question: "متى يفتح السوق الأمريكي؟",
    answer:
      "تبدأ جلسة التداول العادية في بورصتي NYSE وNasdaq الساعة 9:30 صباحًا بتوقيت نيويورك وتنتهي الساعة 4:00 مساءً. الأداة في أعلى الصفحة تحول الموعد تلقائيًا إلى توقيتك المحلي.",
  },
  {
    question: "هل مواعيد الأسواق تتغير مع التوقيت الصيفي؟",
    answer:
      "نعم. الولايات المتحدة وبريطانيا وأستراليا تستخدم التوقيت الصيفي في فترات مختلفة من السنة. تعتمد الأداة على المناطق الزمنية الفعلية، لذلك يتم احتساب هذه التغييرات تلقائيًا.",
  },
  {
    question: "هل السوق الأمريكي مفتوح الآن؟",
    answer:
      "تظهر حالة السوق الأمريكي مباشرة في الأداة أعلى الصفحة. ستشاهد مفتوح الآن أو مغلق، بالإضافة إلى الوقت المتبقي حتى الافتتاح أو الإغلاق.",
  },
  {
    question: "ما الفرق بين السوق الأمريكي وجلسة نيويورك للفوركس؟",
    answer:
      "السوق الأمريكي للأسهم يشير إلى بورصات مثل NYSE وNasdaq، بينما جلسة نيويورك في الفوركس تصف فترة نشاط في سوق العملات. ساعات الاثنين ليست متطابقة بالضرورة.",
  },
  {
    question: "هل سوق الفوركس مفتوح 24 ساعة؟",
    answer:
      "يعمل سوق الفوركس على مدار 24 ساعة تقريبًا خلال أيام العمل بسبب انتقال النشاط بين سيدني وطوكيو ولندن ونيويورك، لكنه يغلق في عطلة نهاية الأسبوع.",
  },
  {
    question: "ما أكثر أوقات التداول نشاطًا؟",
    answer:
      "قد يرتفع النشاط عندما تكون أكثر من جلسة رئيسية مفتوحة في الوقت نفسه، وخصوصًا أثناء تداخل جلسة لندن ونيويورك. لكن ارتفاع النشاط قد يعني أيضًا ارتفاع التذبذب والمخاطر.",
  },
];

const quickMarkets = [
  {
    flag: "🇺🇸",
    title: "السوق الأمريكي",
    subtitle: "NYSE / Nasdaq",
    time: "9:30 AM – 4:00 PM",
    zone: "بتوقيت نيويورك",
  },
  {
    flag: "🇬🇧",
    title: "سوق لندن",
    subtitle: "London Stock Exchange",
    time: "8:00 AM – 4:30 PM",
    zone: "بتوقيت لندن",
  },
  {
    flag: "🇯🇵",
    title: "سوق طوكيو",
    subtitle: "Tokyo Stock Exchange",
    time: "9:00 AM – 3:30 PM",
    zone: "بتوقيت طوكيو",
  },
  {
    flag: "🇦🇺",
    title: "سوق سيدني",
    subtitle: "Australian Securities Exchange",
    time: "10:00 AM – 4:00 PM",
    zone: "بتوقيت سيدني",
  },
];

export default function MarketHoursPage() {
  const pageUrl = "https://brokeralarab.com/tools/market-hours";
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
        name: "بروكر العرب",
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
        name: "بروكر العرب",
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
        name: "ساعات تداول الأسواق العالمية حسب توقيتك",
        headline: "ساعات تداول الأسواق العالمية حسب توقيتك",
        description:
          "تابع ساعات تداول الأسواق العالمية حسب توقيتك المحلي، واعرف حالة السوق الأمريكي ولندن وطوكيو وسيدني ومواعيد الافتتاح والإغلاق.",
        inLanguage: "ar",

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
            name: "ساعات تداول الأسواق العالمية",
          },
          {
            "@type": "Thing",
            name: "السوق الأمريكي",
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
            name: "جلسات تداول الفوركس",
          },
        ],
      },

      /* =====================================================
         MARKET HOURS TOOL
      ====================================================== */
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#market-hours-tool`,
        name: "أداة ساعات تداول الأسواق العالمية",
        alternateName: "Global Market Hours Tool",
        url: pageUrl,

        description:
          "أداة مجانية وتفاعلية تعرض حالة الأسواق العالمية ومواعيد الافتتاح والإغلاق والوقت المتبقي تلقائيًا حسب المنطقة الزمنية المحلية للمستخدم.",

        applicationCategory: "FinanceApplication",
        applicationSubCategory: "Market Hours Tool",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        inLanguage: "ar",

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
          "عرض حالة الأسواق العالمية مباشرة",
          "تحويل ساعات التداول تلقائيًا إلى توقيت المستخدم المحلي",
          "معرفة موعد افتتاح وإغلاق السوق الأمريكي",
          "معرفة ساعات سوق لندن",
          "معرفة ساعات سوق طوكيو",
          "معرفة ساعات سوق سيدني",
          "حساب الوقت المتبقي حتى افتتاح أو إغلاق السوق",
          "التعامل تلقائيًا مع تغيرات التوقيت الصيفي",
          "عرض خريطة ساعات الأسواق خلال 24 ساعة",
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
            name: "بروكر العرب",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "أدوات التداول",
            item: `${siteUrl}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "ساعات تداول الأسواق العالمية",
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
        name: "أسئلة شائعة حول ساعات تداول الأسواق العالمية",
        inLanguage: "ar",

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
      dir="rtl"
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
        href="/"
        className="transition hover:text-brand-600"
      >
        الرئيسية
      </Link>

      <span className="text-slate-300">
        /
      </span>

      <Link
        href="/tools"
        className="transition hover:text-brand-600"
      >
        أدوات التداول
      </Link>

      <span className="text-slate-300">
        /
      </span>

      <span className="text-slate-700">
        ساعات الأسواق
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

          متابعة مباشرة لحالة الأسواق

        </span>

        <h1 className="mt-3 max-w-[930px] text-[48px] font-black leading-[1.08] tracking-[-0.04em] text-[#07111f] xl:text-[58px]">

          ساعات تداول الأسواق العالمية

          <span className="mt-1 block text-brand-600">
            حسب توقيتك
          </span>

        </h1>

        <p className="mt-4 max-w-[920px] text-[15px] font-semibold leading-8 text-slate-600 xl:text-[16px]">

          اعرف الأسواق المفتوحة الآن ومتى يفتح ويغلق السوق الأمريكي
          ولندن وطوكيو وسيدني دون حساب فروقات التوقيت يدويًا. تعرض
          الأداة المواعيد تلقائيًا حسب المنطقة الزمنية المستخدمة في جهازك
          وتتعامل مع تغيرات التوقيت الصيفي.

        </p>

        {/* FEATURES */}
        <div className="mt-5 flex flex-wrap gap-2.5">

          {[
            "توقيتك المحلي تلقائيًا",
            "حالة السوق مباشرة",
            "دعم التوقيت الصيفي",
            "عداد حتى الافتتاح والإغلاق",
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
                  نيويورك
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
                لندن
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
                طوكيو
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
                سيدني
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

          متابعة مباشرة لحالة الأسواق

        </span>

        <h1 className="mx-auto mt-3 max-w-[400px] text-[32px] font-black leading-[1.12] tracking-[-0.035em] text-[#07111f] sm:text-[40px]">

          ساعات تداول الأسواق العالمية

          <span className="mt-1 block text-brand-600">
            حسب توقيتك
          </span>

        </h1>

        <p className="mx-auto mt-3 max-w-[540px] text-[12px] font-semibold leading-6 text-slate-600 sm:text-[14px] sm:leading-7">

          اعرف الأسواق المفتوحة الآن ومواعيد الافتتاح والإغلاق تلقائيًا
          حسب توقيت جهازك دون حساب فرق الساعات يدويًا.

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

            <div className="text-right">

              <div className="text-[13px] font-black text-slate-900">
                ساعة الأسواق العالمية
              </div>

              <div className="mt-1 text-[9px] font-semibold text-slate-500">
                تتبع الأسواق عبر المناطق الزمنية
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
            ["🇺🇸", "NY", "نيويورك"],
            ["🇬🇧", "LDN", "لندن"],
            ["🇯🇵", "TYO", "طوكيو"],
            ["🇦🇺", "SYD", "سيدني"],
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
          "توقيتك المحلي",
          "حالة مباشرة",
          "التوقيت الصيفي",
          "عداد الافتتاح",
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
        <MarketHoursTool />
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
  <div className="border-b border-slate-100 bg-gradient-to-l from-[#f7fbff] via-white to-[#edf5ff] px-4 py-4">

    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-600 shadow-sm">
      مواعيد التداول الأساسية
    </span>

    <h2 className="mt-2.5 text-[23px] font-black leading-[1.2] text-[#07111f]">
      متى تفتح الأسواق العالمية؟
    </h2>

    <p className="mt-2 text-[11px] font-semibold leading-6 text-slate-600">
      المواعيد المعتادة لكل سوق، ويتم تحويلها تلقائيًا إلى توقيتك المحلي.
    </p>

  </div>

  {/* MARKET ROWS */}
  <div className="divide-y divide-slate-100">

    {quickMarkets.map((item) => {

      const code =
        item.title === "السوق الأمريكي"
          ? "US"
          : item.title === "سوق لندن"
          ? "GB"
          : item.title === "سوق طوكيو"
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
                className="mt-0.5 truncate text-right text-[8px] font-bold text-slate-400"
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
    قد تختلف ساعات التداول في العطلات الرسمية أو أيام الإغلاق المبكر.
  </div>

</div>

    {/* =====================================================
        DESKTOP / TABLET VERSION
        يبقى التصميم الحالي تقريبًا كما هو
    ====================================================== */}
    <div className="hidden md:block">

      <div className="border-b border-slate-100 bg-gradient-to-l from-[#f7fbff] via-white to-[#edf5ff] px-5 py-5 sm:px-7">

        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
          مواعيد التداول الأساسية
        </span>

        <h2 className="mt-3 text-[26px] font-black leading-tight text-[#07111f] sm:text-[34px]">
          متى تفتح الأسواق العالمية؟
        </h2>

        <p className="mt-2 max-w-[900px] text-[13px] font-semibold leading-7 text-slate-600 sm:text-[14px]">
          هذه المواعيد هي ساعات التداول المعتادة بالتوقيت المحلي لكل سوق.
          الأداة أعلى الصفحة تحولها تلقائيًا إلى توقيتك الحالي.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4">

        {quickMarkets.map((item, index) => (

          <article
            key={item.title}
            className={`p-5 sm:p-6 ${
              index !== quickMarkets.length - 1
                ? "border-b border-slate-100 xl:border-b-0 xl:border-l"
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
              className="mt-5 text-right text-[20px] font-black tracking-[-0.02em] text-brand-600"
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
        قد تختلف ساعات التداول في بعض العطلات الرسمية وأيام الإغلاق
        المبكر. لذلك يجب عدم الاعتماد على ساعات العمل المعتادة وحدها في
        تلك الأيام.
      </div>

    </div>

  </div>

</section>

      {/* MAIN EXPLANATION */}
      <section className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.045)] sm:p-7 lg:p-8">
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              جلسات التداول
            </span>

            <h2 className="mt-3 text-[27px] font-black leading-[1.2] text-[#07111f] sm:text-[36px]">
              ما هي جلسات التداول العالمية؟
            </h2>

            <p className="mt-4 text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
              تعمل الأسواق المالية في مناطق زمنية مختلفة، ولذلك ينتقل النشاط
              خلال اليوم من آسيا إلى أوروبا ثم أمريكا. في سوق الفوركس يستخدم
              المتداولون عادة أسماء جلسات سيدني وطوكيو ولندن ونيويورك لوصف
              الفترات الرئيسية لنشاط السوق.
            </p>

            <p className="mt-3 text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
              معرفة الجلسة المفتوحة تساعدك على فهم البيئة التي يتحرك فيها
              السعر. فبعض الفترات تكون أكثر هدوءًا، بينما ترتفع السيولة
              والتذبذب عادةً عندما تتداخل جلسات رئيسية أو عندما تصدر بيانات
              اقتصادية مهمة.
            </p>

            <div className="mt-6 rounded-[20px] border border-amber-100 bg-amber-50/60 p-4 sm:p-5">
              <div className="text-[13px] font-black text-amber-900">
                نقطة مهمة
              </div>

              <p className="mt-1.5 text-[12px] font-semibold leading-6 text-amber-900/80 sm:text-[13px]">
                جلسة نيويورك في الفوركس ليست هي نفسها ساعات تداول بورصتي
                NYSE وNasdaq. لذلك نفصل في هذه الصفحة بين ساعات البورصات
                وبين مفهوم جلسات الفوركس.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["01", "سيدني", "بداية الدورة اليومية"],
                ["02", "طوكيو", "الجلسة الآسيوية"],
                ["03", "لندن", "الجلسة الأوروبية"],
                ["04", "نيويورك", "الجلسة الأمريكية"],
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
                لماذا يهم توقيت السوق؟
              </h2>

              <p className="mt-1 text-[11px] font-semibold leading-6 text-slate-500">
                لأن ظروف التداول لا تبقى متشابهة طوال اليوم.
              </p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {[
                {
                  title: "السيولة",
                  text: "يزداد حجم النشاط في بعض الفترات عندما تكون الأسواق الرئيسية مفتوحة.",
                },
                {
                  title: "التذبذب",
                  text: "قد تتحرك الأسعار بشكل أسرع عند تداخل الجلسات أو صدور الأخبار.",
                },
                {
                  title: "السبريد",
                  text: "قد تختلف فروقات الأسعار حسب السيولة وظروف السوق.",
                },
                {
                  title: "اختيار الاستراتيجية",
                  text: "بعض استراتيجيات التداول تناسب الفترات النشطة أكثر من الفترات الهادئة.",
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
        السوق الأمريكي
      </span>

      <h2 className="mt-3 text-[27px] font-black leading-[1.2] text-[#07111f]">
        متى يفتح السوق الأمريكي حسب توقيت بلدي؟
      </h2>

      <p className="mt-4 text-[14px] font-medium leading-8 text-slate-600">
        تبدأ ساعات التداول العادية في بورصتي نيويورك
        <strong className="font-black text-slate-800"> NYSE </strong>
        و
        <strong className="font-black text-slate-800"> Nasdaq </strong>
        عند الساعة 9:30 صباحًا وتنتهي عند 4:00 مساءً بتوقيت نيويورك
        خلال أيام العمل المعتادة.
      </p>

      <p className="mt-3 text-[14px] font-medium leading-8 text-slate-600">
        الأداة في أعلى الصفحة تحول هذه المواعيد تلقائيًا إلى توقيتك المحلي،
        لذلك لا تحتاج إلى حساب فرق الساعات يدويًا.
      </p>

      <div className="mt-5 grid gap-3">

        {[
          {
            country: "السعودية",
            text: "تعرض الأداة موعد افتتاح وإغلاق نيويورك تلقائيًا حسب توقيت الرياض.",
          },
          {
            country: "الإمارات",
            text: "يتم تحويل ساعات السوق الأمريكي تلقائيًا إلى توقيت دبي.",
          },
          {
            country: "كندا",
            text: "يتم الاعتماد على المنطقة الزمنية المحلية مثل Toronto أو Vancouver.",
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
          السوق الأمريكي
        </span>

        <h2 className="mt-4 max-w-[900px] text-[36px] font-black leading-[1.18] tracking-[-0.02em] text-[#07111f] xl:text-[40px]">
          متى يفتح السوق الأمريكي حسب توقيت بلدي؟
        </h2>

        <p className="mt-5 max-w-[950px] text-[15px] font-medium leading-8 text-slate-600">
          تبدأ جلسة التداول العادية في بورصتي
          <strong className="font-black text-slate-900"> NYSE </strong>
          و
          <strong className="font-black text-slate-900"> Nasdaq </strong>
          عند الساعة 9:30 صباحًا وتنتهي عند 4:00 مساءً بتوقيت نيويورك.
          هذا هو نطاق التداول الرسمي المعتاد للأسهم الأمريكية خلال أيام العمل.
        </p>

        <p className="mt-3 max-w-[950px] text-[15px] font-medium leading-8 text-slate-600">
          المشكلة أن توقيت الافتتاح لا يكون ثابتًا بالنسبة للمتداول خارج
          الولايات المتحدة بسبب اختلاف المناطق الزمنية والتوقيت الصيفي.
          لذلك تستخدم الأداة المنطقة الزمنية الموجودة على جهازك وتحول الموعد
          مباشرة إلى توقيتك المحلي.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">

          {[
            {
              country: "🇸🇦 السعودية",
              title: "حسب توقيت الرياض",
              text: "لا تحتاج إلى معرفة فرق التوقيت مع نيويورك؛ الأداة تقوم بالتحويل تلقائيًا.",
            },
            {
              country: "🇦🇪 الإمارات",
              title: "حسب توقيت دبي",
              text: "موعد الافتتاح والإغلاق يتغير تلقائيًا عند تغير التوقيت الصيفي الأمريكي.",
            },
            {
              country: "🇨🇦 كندا",
              title: "حسب مدينتك",
              text: "Toronto وVancouver وغيرهما تُحسب كل منها وفق منطقتها الزمنية الفعلية.",
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
      <aside className="border-r border-slate-100 bg-[linear-gradient(160deg,#f9fbff_0%,#eef5ff_100%)] p-8 xl:p-10">

        <div className="flex h-full flex-col justify-center">

          <span className="text-[28px]">
            🇺🇸
          </span>

          <div className="mt-4 text-[11px] font-black text-brand-600">
            ساعات التداول العادية
          </div>

          <div
            dir="ltr"
            className="mt-2 text-right text-[30px] font-black tracking-[-0.03em] text-[#07111f]"
          >
            9:30 AM
          </div>

          <div className="mt-1 text-[11px] font-bold text-slate-500">
            افتتاح السوق
          </div>

          <div className="my-5 h-px bg-brand-100" />

          <div
            dir="ltr"
            className="text-right text-[30px] font-black tracking-[-0.03em] text-[#07111f]"
          >
            4:00 PM
          </div>

          <div className="mt-1 text-[11px] font-bold text-slate-500">
            إغلاق السوق
          </div>

          <div className="mt-6 rounded-[16px] border border-amber-100 bg-amber-50/70 p-4">

            <div className="text-[11px] font-black text-amber-900">
              انتبه للتوقيت الصيفي
            </div>

            <p className="mt-1 text-[10px] font-semibold leading-5 text-amber-900/80">
              موعد الافتتاح بالنسبة لبلدك قد يتغير خلال السنة حتى عندما تبقى
              ساعات نيويورك الرسمية نفسها.
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

    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-5">

      <h2 className="text-[26px] font-black text-[#07111f]">
        كيف تستخدم أداة ساعات الأسواق؟
      </h2>

      <p className="mt-2 text-[13px] font-semibold leading-7 text-slate-600">
        لا تحتاج إلى اختيار بلدك أو حساب فروقات التوقيت يدويًا.
      </p>

    </div>

    <div>

      {[
        {
          n: "01",
          title: "نحدد توقيت جهازك",
          text: "تقرأ الأداة المنطقة الزمنية المستخدمة في المتصفح مثل Asia/Riyadh أو America/Toronto.",
        },
        {
          n: "02",
          title: "نحسب وقت كل سوق",
          text: "يتم استخدام المنطقة الزمنية الفعلية لكل بورصة بدل الاعتماد على فرق ساعات ثابت.",
        },
        {
          n: "03",
          title: "نعرض الحالة مباشرة",
          text: "ستعرف فورًا إن كان السوق مفتوحًا أو مغلقًا وما السوق الأقرب للافتتاح.",
        },
        {
          n: "04",
          title: "نحسب الوقت المتبقي",
          text: "تعرض الأداة موعد التغيير القادم والوقت المتبقي حتى الافتتاح أو الإغلاق.",
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
      <div className="border-l border-slate-100 bg-[linear-gradient(145deg,#eef5ff_0%,#f9fbff_100%)] p-8 xl:p-10">

        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
          طريقة الاستخدام
        </span>

        <h2 className="mt-4 text-[34px] font-black leading-[1.2] text-[#07111f] xl:text-[38px]">
          كيف تستخدم أداة ساعات الأسواق؟
        </h2>

        <p className="mt-4 text-[14px] font-medium leading-8 text-slate-600">
          صممنا الأداة بحيث تعمل تلقائيًا دون الحاجة إلى اختيار الدولة أو
          حساب فرق التوقيت بينك وبين كل سوق.
        </p>

        <div className="mt-6 rounded-[18px] border border-brand-100 bg-white p-4">

          <div className="text-[11px] font-black text-brand-700">
            النتيجة
          </div>

          <p className="mt-1 text-[11px] font-semibold leading-6 text-slate-600">
            خلال ثوانٍ تعرف السوق المفتوح الآن، وموعد التغيير القادم،
            والوقت المتبقي حسب توقيتك المحلي.
          </p>

        </div>

      </div>

      {/* STEPS */}
      <div className="grid grid-cols-2">

        {[
          {
            n: "01",
            title: "نحدد المنطقة الزمنية",
            text: "تقرأ الأداة المنطقة الزمنية الموجودة في متصفحك، مثل Asia/Riyadh أو America/Toronto، بدون طلب موقعك الجغرافي.",
          },
          {
            n: "02",
            title: "نحسب ساعات كل سوق",
            text: "نستخدم المنطقة الزمنية الفعلية للسوق بدل الاعتماد على فرق ثابت بالساعات، وهذا مهم عند تغير التوقيت الصيفي.",
          },
          {
            n: "03",
            title: "نعرض الحالة مباشرة",
            text: "يتم تحديد ما إذا كان السوق مفتوحًا أو مغلقًا حاليًا، مع إظهار موعد الافتتاح أو الإغلاق التالي.",
          },
          {
            n: "04",
            title: "نحسب الوقت المتبقي",
            text: "تظهر المدة المتبقية بشكل مباشر حتى تعرف كم بقي على فتح السوق أو إغلاقه دون أي حساب يدوي.",
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
                ? "border-l border-slate-100"
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
      استمر بالتعلم
    </span>

    <h2 className="mt-3 text-[26px] font-black text-[#07111f]">
      أدوات ومصادر قد تساعدك
    </h2>

    <div className="mt-5 grid gap-3">

      <Link
        href="/strategies/price-action"
        className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-5 transition duration-300 hover:border-brand-200 hover:bg-brand-50/30"
      >
        <div className="text-[15px] font-black text-slate-900">
          استراتيجية البرايس أكشن
        </div>

        <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
          تعلم قراءة حركة السعر وهيكل السوق والمستويات قبل اتخاذ قرار التداول.
        </p>

        <div className="mt-3 text-[10px] font-black text-brand-600">
          اقرأ الدليل ←
        </div>
      </Link>

      <Link
        href="/tools/risk-calculator"
        className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-5 transition duration-300 hover:border-brand-200 hover:bg-brand-50/30"
      >
        <div className="text-[15px] font-black text-slate-900">
          حاسبة إدارة المخاطر
        </div>

        <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
          احسب قيمة المخاطرة المناسبة للصفقة قبل تحديد حجم المركز.
        </p>

        <div className="mt-3 text-[10px] font-black text-brand-600">
          افتح الحاسبة ←
        </div>
      </Link>

      <Link
        href="/learn-trading"
        className="group rounded-[20px] border border-slate-200 bg-[#fbfdff] p-5 transition duration-300 hover:border-brand-200 hover:bg-brand-50/30"
      >
        <div className="text-[15px] font-black text-slate-900">
          تعلم التداول
        </div>

        <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
          ابدأ من المفاهيم الأساسية وانتقل تدريجيًا إلى إدارة المخاطر والاستراتيجيات.
        </p>

        <div className="mt-3 text-[10px] font-black text-brand-600">
          ابدأ التعلم ←
        </div>
      </Link>

    </div>

  </div>

  {/* DESKTOP — STRONG VERSION */}
  <div className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_44px_rgba(15,23,42,0.04)] lg:block">

    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f7fbff] via-white to-[#edf5ff] px-8 py-6">

      <div className="flex items-end justify-between gap-8">

        <div>

          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
            استمر بالتعلم
          </span>

          <h2 className="mt-3 text-[34px] font-black text-[#07111f]">
            أدوات ومصادر مفيدة
          </h2>

          <p className="mt-2 max-w-[850px] text-[13px] font-semibold leading-7 text-slate-600">
            معرفة توقيت السوق تخبرك متى يحدث النشاط، لكن إدارة الصفقة وقراءة
            حركة السعر وإدارة المخاطر هي التي تساعدك على اتخاذ قرار أكثر انضباطًا.
          </p>

        </div>

        <span className="hidden text-[36px] xl:block">
          📚
        </span>

      </div>

    </div>

    <div className="grid grid-cols-3 gap-4 p-6 xl:p-7">

      <Link
        href="/strategies/price-action"
        className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-[#fbfdff] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_14px_32px_rgba(30,91,184,0.08)]"
      >

        <div className="absolute left-0 top-0 h-full w-[4px] bg-brand-500 opacity-0 transition group-hover:opacity-100" />

        <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-brand-50 text-[20px]">
          📈
        </span>

        <h3 className="mt-4 text-[18px] font-black text-slate-900 group-hover:text-brand-600">
          استراتيجية البرايس أكشن
        </h3>

        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
          افهم حركة السعر، الاتجاه، الدعم والمقاومة وبنية السوق بدل الاعتماد
          على التوقيت وحده.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black text-brand-600">
          اقرأ الدليل
          <span>←</span>
        </div>

      </Link>

      <Link
        href="/tools/risk-calculator"
        className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-[#fbfdff] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_14px_32px_rgba(30,91,184,0.08)]"
      >

        <div className="absolute left-0 top-0 h-full w-[4px] bg-brand-500 opacity-0 transition group-hover:opacity-100" />

        <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-brand-50 text-[20px]">
          🛡️
        </span>

        <h3 className="mt-4 text-[18px] font-black text-slate-900 group-hover:text-brand-600">
          حاسبة إدارة المخاطر
        </h3>

        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
          حدد قيمة المخاطرة وحجم الصفقة قبل الدخول حتى لا تتحول حركة السوق
          السريعة إلى مخاطرة غير محسوبة.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black text-brand-600">
          افتح الحاسبة
          <span>←</span>
        </div>

      </Link>

      <Link
        href="/learn-trading"
        className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-[#fbfdff] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_14px_32px_rgba(30,91,184,0.08)]"
      >

        <div className="absolute left-0 top-0 h-full w-[4px] bg-brand-500 opacity-0 transition group-hover:opacity-100" />

        <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-brand-50 text-[20px]">
          🎓
        </span>

        <h3 className="mt-4 text-[18px] font-black text-slate-900 group-hover:text-brand-600">
          تعلم التداول
        </h3>

        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
          انتقل من فهم ساعات الأسواق إلى أساسيات التداول والهامش والرافعة
          المالية وإدارة المخاطر بطريقة منظمة.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black text-brand-600">
          ابدأ التعلم
          <span>←</span>
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
              الأسئلة الشائعة
            </span>

            <h2 className="mt-3 text-[28px] font-black leading-tight text-[#07111f] sm:text-[38px]">
              أسئلة حول ساعات الأسواق العالمية
            </h2>

            <p className="mx-auto mt-2 max-w-[720px] text-[12px] font-semibold leading-6 text-slate-500 sm:text-[13px]">
              إجابات مباشرة عن أوقات الافتتاح والتوقيت الصيفي وجلسات الفوركس.
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