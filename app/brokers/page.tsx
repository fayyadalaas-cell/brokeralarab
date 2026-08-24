import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  best_for: string | null;
  regulation: string | null;
  platforms: string | null;
  islamic_account: string | null;
  max_leverage: string | null;
  arabic_support: string | null;
  logo: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
};

type BrokerSearchParams = {
  q?: string | string[];
  deposit?: string | string[];
  rating?: string | string[];
  islamic?: string | string[];
  regulator?: string | string[];
};

const BASE_URL = "https://brokeralarab.com";
const BROKERS_PAGE_URL = `${BASE_URL}/brokers`;

const brokersFaqs = [
  {
    question: "كيف أختار أفضل شركة فوركس؟",
    answer:
      "ابدأ بفحص تراخيص شركة الفوركس، ثم قارن الحد الأدنى للإيداع والرسوم والسبريد ومنصات التداول والرافعة المالية والدعم العربي. اختر الوسيط الذي يناسب خبرتك ورأس مالك، وليس الشركة صاحبة أعلى تقييم فقط.",
  },
  {
    question: "ما المقصود بتقييم شركات الفوركس؟",
    answer:
      "تقييم شركات الفوركس هو مراجعة منظمة لمستوى الأمان والتراخيص وتكاليف التداول والمنصات وخيارات الإيداع والسحب والحساب الإسلامي وخدمة العملاء، بهدف مساعدة المتداول على مقارنة الوسطاء.",
  },
  {
    question: "هل شركات الفوركس الموجودة في الصفحة موثوقة؟",
    answer:
      "تتضمن الصفحة شركات فوركس تمت مراجعة معلوماتها وتراخيصها وخصائص حساباتها من فريق بروكر العرب. مع ذلك، يجب على المتداول التحقق من الكيان القانوني والترخيص الذي سيسجل حسابه تحته قبل إيداع الأموال.",
  },
  {
    question: "هل أعلى شركة في التقييم هي الأفضل لجميع المتداولين؟",
    answer:
      "لا. قد تكون شركة فوركس مناسبة للمبتدئين بسبب سهولة الاستخدام وانخفاض الإيداع، بينما تناسب شركة أخرى المتداول المحترف بسبب المنصات المتقدمة أو السبريد أو سرعة التنفيذ.",
  },
  {
    question: "كيف يتم ترتيب شركات الفوركس في هذه الصفحة؟",
    answer:
      "يتم ترتيب الشركات بحسب التقييم التحريري لفريق بروكر العرب، مع مراعاة التراخيص والأمان والتكاليف والمنصات والحساب الإسلامي والدعم العربي والخصائص المتاحة للمتداول.",
  },
  {
    question: "هل توفر شركات الفوركس حسابات إسلامية؟",
    answer:
      "توفر بعض شركات الفوركس حسابات إسلامية خالية من رسوم التبييت وفق شروط محددة. يجب مراجعة شروط الحساب الإسلامي لدى كل شركة، لأن الإعفاءات والرسوم البديلة قد تختلف بين وسيط وآخر.",
  },
];

function getAbsoluteUrl(value: string | null | undefined) {
  if (!value?.trim()) return undefined;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export const metadata: Metadata = {
  title: "تقييم شركات الفوركس 2026: أفضل الوسطاء الموثوقين",
  description:
    "تصفح تقييم شركات الفوركس وقارن أفضل الوسطاء من حيث التراخيص والسبريد والمنصات والحد الأدنى للإيداع والحساب الإسلامي والدعم العربي.",

  keywords: [
    "تقييم شركات الفوركس",
    "تقييم شركات الفوركس 2026",
    "تقييم شركات التداول",
    "أفضل شركات الفوركس",
    "أفضل شركات الفوركس 2026",
    "شركات فوركس موثوقة",
    "شركات تداول موثوقة",
    "مراجعات شركات الفوركس",
    "مقارنة شركات الفوركس",
    "وسطاء الفوركس",
    "أفضل وسيط فوركس",
    "بروكر فوركس",
    "فتح حساب فوركس",
    "حساب فوركس إسلامي",
    "منصات تداول الفوركس",
    "تراخيص شركات الفوركس",
    "بروكر العرب",
  ],

  applicationName: "بروكر العرب",
  category: "المال والأعمال",
  creator: "بروكر العرب",
  publisher: "بروكر العرب",

  alternates: {
    canonical: BROKERS_PAGE_URL,
    languages: {
      ar: BROKERS_PAGE_URL,
      en: `${BASE_URL}/en/brokers`,
      "x-default": `${BASE_URL}/en/brokers`,
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
    title: "تقييم شركات الفوركس 2026 | أفضل الوسطاء الموثوقين",
    description:
      "قارن تقييمات شركات الفوركس والتراخيص والرسوم والمنصات والإيداع والحساب الإسلامي قبل اختيار وسيط الفوركس المناسب.",
    url: BROKERS_PAGE_URL,
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
    images: [
      {
        url: `${BASE_URL}/og-image.webp`,
        width: 1560,
        height: 377,
        alt: "تقييم شركات الفوركس والوسطاء في بروكر العرب",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "تقييم شركات الفوركس 2026 | بروكر العرب",
    description:
      "قارن شركات الفوركس حسب التقييم والتراخيص والإيداع والمنصات والحساب الإسلامي.",
    images: [`${BASE_URL}/og-image.webp`],
  },
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function formatRating(rating: number | null) {
  if (rating === null || rating === undefined) return "—";
  return Number(rating).toFixed(2);
}

function formatDeposit(value: number | null) {
  if (value === null || value === undefined) return "غير محدد";
  return `$${Number(value).toLocaleString("en-US")}`;
}

function normalizeText(value: string | null | undefined, fallback = "غير محدد") {
  if (!value || !value.trim()) return fallback;
  return value;
}

function islamicAccountLabel(value: string | null | undefined) {
  if (!value || !value.trim()) return "غير محدد";

  const v = value.trim().toLowerCase();

  if (
    v.includes("yes") ||
    v.includes("available") ||
    v.includes("true") ||
    v.includes("islamic") ||
    v.includes("نعم")
  ) {
    return "متوفر";
  }

  if (
    v.includes("not available") ||
    v.includes("غير متوفر") ||
    v.includes("no") ||
    v.includes("false")
  ) {
    return "غير متوفر";
  }

  return value;
}

function arabicSupportLabel(value: string | null | undefined) {
  if (!value || !value.trim()) return "غير محدد";

  const v = value.trim().toLowerCase();

  if (
    v.includes("yes") ||
    v.includes("available") ||
    v.includes("true") ||
    v.includes("arabic") ||
    v.includes("متوفر") ||
    v.includes("نعم")
  ) {
    return "متوفر";
  }

  if (
    v.includes("no") ||
    v.includes("false") ||
    v.includes("not available") ||
    v.includes("غير متوفر")
  ) {
    return "غير متوفر";
  }

  return value;
}

function hasRealAccountLink(url: string | null | undefined) {
  return Boolean(url && url.trim().length > 0);
}

function getInitials(name: string | null | undefined) {
  if (!name?.trim()) return "BR";
  return name.trim().slice(0, 2).toUpperCase();
}

function getBrokerLogoClass(name: string | null | undefined) {
  const brokerName = (name ?? "").trim().toLowerCase();

  if (brokerName.includes("exness")) {
    return "scale-[1.32]";
  }

  if (brokerName === "xm" || brokerName.includes("xm group")) {
    return "scale-[1.32]";
  }

  if (brokerName.includes("multibank")) {
    return "scale-[1.40]";
  }

  if (brokerName.includes("equiti")) {
    return "scale-[1.40]";
  }

  if (brokerName.includes("pepperstone")) {
    return "scale-[1.32]";
  }

  if (brokerName.includes("ic markets")) {
    return "scale-[1.25]";
  }

  if (brokerName.includes("tickmill")) {
    return "scale-[1.25]";
  }

  if (brokerName.includes("activtrades")) {
    return "scale-[1.25]";
  }

  if (brokerName.includes("fxpro")) {
    return "scale-[1.30]";
  }

  if (brokerName.includes("vantage")) {
    return "scale-[1.25]";
  }

  if (brokerName.includes("fbs")) {
    return "scale-[1.25]";
  }

  if (brokerName.includes("hfm")) {
    return "scale-[1.25]";
  }

  return "scale-[1.20]";
}

function splitToBadges(value: string | null | undefined, limit = 3) {
  if (!value?.trim()) return [];

  return value
    .split(/,|\/|\||\n|;/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function ratingLabel(rating: number | null) {
  if (rating === null || rating === undefined) return "غير مقيم";
  if (rating >= 4.6) return "فئة ممتازة";
  if (rating >= 4.4) return "تقييم متقدم";
  if (rating >= 4.2) return "أداء قوي";
  if (rating >= 4) return "أداء جيد";
  return "تقييم متوسط";
}

function renderStars(
  rating: number | null,
  sizeClass = "text-[14px]"
) {
  const safeRating = Math.max(0, Math.min(5, Number(rating ?? 0)));
  const percentage = (safeRating / 5) * 100;

  return (
    <div
      className={`relative inline-flex leading-none ${sizeClass}`}
      aria-label={`تقييم ${formatRating(rating)} من 5`}
      dir="ltr"
    >
      <div className="flex gap-0.5 text-slate-300" aria-hidden="true">
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

function BrokerCard({
  broker,
  index,
}: {
  broker: Broker;
  index: number;
}) {
  const realLink = hasRealAccountLink(broker.real_account_url);
  const platforms = splitToBadges(broker.platforms, 4);
  const regulators = splitToBadges(broker.regulation, 4);
  const islamicLabel = islamicAccountLabel(broker.islamic_account);
  const arabicSupport = arabicSupportLabel(broker.arabic_support);

  return (
    <article
  className={`group relative overflow-hidden rounded-[20px] bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.085)] ${
    index < 3
  ? "border border-brand-100 shadow-[0_7px_24px_rgba(30,91,184,0.07)]"
  : "border border-slate-200 shadow-[0_4px_18px_rgba(15,23,42,0.045)] hover:border-brand-200"
  }`}
>
  {index < 3 && (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-l from-brand-500 via-brand-400 to-brand-200"
    />
  )}

 {/* MOBILE CARD — FINAL */}
<div className="lg:hidden">
  {/* MOBILE TOP */}
  <div className="border-b border-slate-100 bg-gradient-to-l from-white to-brand-50/20 px-3 pb-3 pt-2.5">
    {/* BADGES */}
    <div className="mb-2 flex items-center justify-between gap-2">
      {index < 5 ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-700">
          <span aria-hidden="true" className="text-[8px]">
            ✓
          </span>
          موصى بها
        </span>
      ) : (
        <span />
      )}

      <span
        className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[10px] font-black ${
          index < 3
            ? "border border-brand-200 bg-brand-50 text-brand-700"
            : "border border-slate-200 bg-white text-slate-600"
        }`}
      >
        {index + 1}
      </span>
    </div>

    {/* LOGO + RATING */}
    <div
      dir="rtl"
      className="grid grid-cols-[102px_minmax(0,1fr)] items-center gap-3"
    >
      {/* LOGO */}
      <Link
        href={`/brokers/${broker.slug}`}
        aria-label={`اقرأ تقييم ${broker.name ?? "شركة التداول"}`}
        className="relative flex h-[70px] w-[102px] shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-slate-200 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
      >
        {broker.logo ? (
          <Image
            src={broker.logo}
            alt={broker.name ?? "Broker logo"}
            fill
            className={`object-contain ${getBrokerLogoClass(broker.name)}`}
            sizes="102px"
          />
        ) : (
          <span className="text-lg font-black text-slate-600">
            {getInitials(broker.name)}
          </span>
        )}
      </Link>

      {/* RATING */}
      <div
        dir="ltr"
        className="flex min-w-0 flex-col items-start justify-center text-left"
      >
        <span
          dir="rtl"
          className="text-[9px] font-bold leading-none text-slate-500"
        >
          التقييم العام
        </span>

        <div className="mt-1.5 flex items-end gap-1">
          <span className="text-[25px] font-black leading-none tracking-[-0.04em] text-slate-950">
            {formatRating(broker.rating)}
          </span>

          <span className="pb-0.5 text-[9px] font-bold text-slate-500">
            /5
          </span>
        </div>

        <div className="mt-1.5 flex items-center justify-start">
          {renderStars(broker.rating, "text-[13px]")}
        </div>
      </div>
    </div>
  </div>

  {/* MOBILE INFORMATION PANEL */}
  <div className="mx-3 overflow-hidden rounded-[14px] border border-slate-200 bg-slate-50/40">
    {/* QUICK FACTS */}
    <div className="grid grid-cols-2">
      {/* MINIMUM DEPOSIT */}
      <div className="border-b border-l border-slate-200/80 px-3 py-2">
        <span className="block text-[9px] font-bold text-slate-500">
          الحد الأدنى للإيداع
        </span>

        <span
          dir="ltr"
          className="mt-0.5 block text-right text-[14px] font-black text-slate-950"
        >
          {formatDeposit(broker.min_deposit)}
        </span>
      </div>

      {/* MAX LEVERAGE */}
      <div className="border-b border-slate-200/80 px-3 py-2">
        <span className="block text-[9px] font-bold text-slate-500">
          الرافعة المالية
        </span>

        <span
          dir="ltr"
          className="mt-0.5 block text-right text-[13px] font-black text-slate-950"
        >
          {normalizeText(broker.max_leverage)}
        </span>
      </div>

      {/* ISLAMIC ACCOUNT */}
      <div className="border-l border-slate-200/80 px-3 py-2">
        <span className="block text-[9px] font-bold text-slate-500">
          الحساب الإسلامي
        </span>

        <span
          className={`mt-0.5 inline-flex items-center gap-1 text-[12px] font-black ${
            islamicLabel === "متوفر"
              ? "text-emerald-700"
              : islamicLabel === "غير متوفر"
              ? "text-rose-700"
              : "text-slate-800"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${
              islamicLabel === "متوفر"
                ? "bg-emerald-500"
                : islamicLabel === "غير متوفر"
                ? "bg-rose-500"
                : "bg-slate-400"
            }`}
          />

          {islamicLabel}
        </span>
      </div>

      {/* ARABIC SUPPORT */}
      <div className="px-3 py-2">
        <span className="block text-[9px] font-bold text-slate-500">
          الدعم العربي
        </span>

        <span
          className={`mt-0.5 inline-flex items-center gap-1 text-[12px] font-black ${
            arabicSupport === "متوفر"
              ? "text-emerald-700"
              : arabicSupport === "غير متوفر"
              ? "text-rose-700"
              : "text-slate-800"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${
              arabicSupport === "متوفر"
                ? "bg-emerald-500"
                : arabicSupport === "غير متوفر"
                ? "bg-rose-500"
                : "bg-slate-400"
            }`}
          />

          {arabicSupport}
        </span>
      </div>
    </div>

    {/* PLATFORMS */}
    <div className="flex min-h-[35px] items-center justify-between gap-3 border-t border-slate-200/80 bg-white px-3 py-1.5">
      <span className="shrink-0 text-[9px] font-bold text-slate-500">
        المنصات
      </span>

      <span
        dir="ltr"
        title={platforms.join(", ")}
        className="line-clamp-1 min-w-0 text-left text-[11px] font-black text-slate-950"
      >
        {platforms.join(", ") || "غير محدد"}
      </span>
    </div>

    {/* REGULATORS */}
    <div className="flex min-h-[35px] items-center justify-between gap-2 border-t border-slate-200/80 bg-white px-3 py-1.5">
      <span className="shrink-0 text-[9px] font-bold text-slate-500">
        التراخيص
      </span>

      <div className="flex min-w-0 flex-wrap items-center justify-end gap-1">
        {regulators.length > 0 ? (
          regulators.map((regulator) => (
            <span
              key={regulator}
              dir="ltr"
              className="inline-flex min-h-[19px] items-center justify-center rounded-md border border-brand-100 bg-brand-50 px-1.5 py-0.5 text-[8px] font-black text-brand-700"
            >
              {regulator}
            </span>
          ))
        ) : (
          <span className="text-[10px] font-bold text-slate-600">
            غير محدد
          </span>
        )}
      </div>
    </div>
  </div>

  {/* MOBILE ACTIONS */}
  <div className="grid grid-cols-[1.15fr_0.85fr] gap-2 px-3 pb-3 pt-2.5">
    <Link
      href={`/brokers/${broker.slug}`}
      className="inline-flex min-h-[38px] items-center justify-center rounded-xl bg-brand-500 px-3 py-2 text-[11px] font-black text-white shadow-[0_5px_12px_rgba(30,91,184,0.12)] transition hover:bg-brand-600"
    >
      اقرأ التقييم
    </Link>

    {realLink ? (
      <a
        href={`/go/${broker.slug}?type=real`}
        className="inline-flex min-h-[38px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-[11px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
      >
        فتح حساب
      </a>
    ) : (
      <span className="inline-flex min-h-[38px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-black text-slate-400">
        قريبًا
      </span>
    )}
  </div>
</div>

      <div className="hidden lg:grid lg:min-h-[180px] lg:grid-cols-[220px_minmax(0,1fr)_150px]">
        {/* BROKER IDENTITY */}
        <div className="border-b border-slate-100 bg-gradient-to-bl from-white via-white to-brand-50/30 p-4 sm:p-5 lg:border-b-0 lg:border-l">
          <div className="flex h-full items-center gap-4 lg:flex-col lg:justify-center lg:gap-3 lg:text-center">
            {/* LOGO */}
            <Link
              href={`/brokers/${broker.slug}`}
              aria-label={`اقرأ تقييم ${broker.name ?? "شركة التداول"}`}
              className="relative flex h-[82px] w-[136px] shrink-0 items-center justify-center overflow-hidden rounded-[17px] border border-slate-200 bg-white shadow-[0_7px_20px_rgba(15,23,42,0.07)] transition duration-300 hover:border-brand-200 sm:h-[90px] sm:w-[156px] lg:h-[98px] lg:w-[178px]"
            >
              {broker.logo ? (
                <Image
                  src={broker.logo}
                  alt={broker.name ?? "Broker logo"}
                  fill
                  className={`object-contain transition duration-300 ${getBrokerLogoClass(
                    broker.name
                  )}`}
                  sizes="178px"
                />
              ) : (
                <span className="text-xl font-black text-slate-600">
                  {getInitials(broker.name)}
                </span>
              )}
            </Link>

            {/* ACCESSIBLE BROKER NAME */}
            <h2 className="sr-only">
              {broker.name ?? "وسيط تداول"}
            </h2>

            {/* BADGES + RATING */}
            <div className="min-w-0 flex-1 lg:flex-none">
              <div className="flex flex-wrap items-center gap-2 lg:justify-center">
                <span
  className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[10px] font-black shadow-sm ${
    index < 3
      ? "border border-brand-200 bg-brand-50 text-brand-700"
      : "border border-slate-200 bg-white text-slate-600"
  }`}
>
  {index + 1}
</span>

                {index < 5 && (
  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
    <span aria-hidden="true" className="text-[9px]">
      ✓
    </span>
    موصى بها
  </span>
)}
              </div>

              <div
                dir="ltr"
                className="mt-2.5 flex flex-wrap items-center gap-2 lg:justify-center"
              >
                {renderStars(broker.rating)}

                <span className="text-sm font-black text-slate-950">
                  {formatRating(broker.rating)}
                  <span className="ml-1 text-[10px] font-bold text-slate-500">
                    /5
                  </span>
                </span>
              </div>

              
            </div>
          </div>
        </div>

        {/* BROKER DETAILS */}
<div className="min-w-0 p-4 sm:p-5 lg:flex lg:h-full lg:flex-col lg:px-4 lg:py-4">
  {/* QUICK FACTS */}
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
    {/* MINIMUM DEPOSIT */}
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/65 px-3 py-2.5 transition group-hover:bg-white">
      <span className="block text-[10px] font-bold text-slate-500 sm:text-[11px]">
        الحد الأدنى للإيداع
      </span>

      <span
        dir="ltr"
        className="mt-1 block text-right text-[15px] font-black text-slate-950"
      >
        {formatDeposit(broker.min_deposit)}
      </span>
    </div>

    {/* MAX LEVERAGE */}
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/65 px-3 py-2.5 transition group-hover:bg-white">
      <span className="block text-[10px] font-bold text-slate-500 sm:text-[11px]">
        الرافعة المالية
      </span>

      <span
        dir="ltr"
        className="mt-1 block text-right text-[14px] font-black text-slate-950"
      >
        {normalizeText(broker.max_leverage)}
      </span>
    </div>

    {/* ISLAMIC ACCOUNT */}
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/65 px-3 py-2.5 transition group-hover:bg-white">
      <span className="block text-[10px] font-bold text-slate-500 sm:text-[11px]">
        الحساب الإسلامي
      </span>

      <span
  className={`mt-1 inline-flex items-center gap-1.5 text-[14px] font-black ${
    islamicLabel === "متوفر"
      ? "text-emerald-700"
      : islamicLabel === "غير متوفر"
      ? "text-rose-700"
      : "text-slate-800"
  }`}
>
  <span
    aria-hidden="true"
    className={`h-1.5 w-1.5 rounded-full ${
      islamicLabel === "متوفر"
        ? "bg-emerald-500"
        : islamicLabel === "غير متوفر"
        ? "bg-rose-500"
        : "bg-slate-400"
    }`}
  />

  {islamicLabel}
</span>
    </div>

    {/* ARABIC SUPPORT */}
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/65 px-3 py-2.5 transition group-hover:bg-white">
      <span className="block text-[10px] font-bold text-slate-500 sm:text-[11px]">
        الدعم العربي
      </span>

      <span
  className={`mt-1 inline-flex items-center gap-1.5 text-[14px] font-black ${
    arabicSupport === "متوفر"
      ? "text-emerald-700"
      : arabicSupport === "غير متوفر"
      ? "text-rose-700"
      : "text-slate-800"
  }`}
>
  <span
    aria-hidden="true"
    className={`h-1.5 w-1.5 rounded-full ${
      arabicSupport === "متوفر"
        ? "bg-emerald-500"
        : arabicSupport === "غير متوفر"
        ? "bg-rose-500"
        : "bg-slate-400"
    }`}
  />

  {arabicSupport}
</span>
    </div>
  </div>

  {/* PLATFORMS + REGULATORS */}
  <div className="mt-3 grid gap-3 sm:grid-cols-[1.25fr_1fr]">
    {/* PLATFORMS */}
    <div className="min-w-0 rounded-xl border border-slate-200/70 bg-white px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="shrink-0 text-[11px] font-bold text-slate-500">
          المنصات
        </span>

        <span
  dir="ltr"
  title={platforms.join(", ")}
  className="min-w-0 flex-1 text-left text-[13px] font-black leading-5 text-slate-950 sm:line-clamp-2"
>
  {platforms.join(", ") || "غير محدد"}
</span>
      </div>
    </div>

    {/* REGULATORS */}
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="shrink-0 text-[11px] font-bold text-slate-500">
          أبرز التراخيص
        </span>

        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {regulators.length > 0 ? (
            regulators.map((regulator) => (
              <span
                key={regulator}
                dir="ltr"
                className="inline-flex min-h-[23px] items-center justify-center rounded-lg border border-brand-100 bg-brand-50 px-2 py-0.5 text-[9px] font-black text-brand-700"
              >
                {regulator}
              </span>
            ))
          ) : (
            <span className="text-xs font-bold text-slate-700">
              غير محدد
            </span>
          )}
        </div>
      </div>
    </div>
  </div>

{/* DESKTOP ACTIONS */}
<div className="mt-auto hidden items-center justify-start gap-2 border-t border-slate-200/70 pt-3 lg:flex">
  <Link
    href={`/brokers/${broker.slug}`}
    className="inline-flex min-h-[38px] min-w-[138px] items-center justify-center rounded-xl bg-brand-500 px-4 py-2 text-xs font-black text-white shadow-[0_5px_12px_rgba(30,91,184,0.12)] transition hover:-translate-y-0.5 hover:bg-brand-600"
  >
    اقرأ التقييم
  </Link>

  {realLink ? (
    <a
      href={`/go/${broker.slug}?type=real`}
      className="inline-flex min-h-[38px] min-w-[108px] items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
    >
      فتح حساب
    </a>
  ) : (
    <span className="inline-flex min-h-[38px] min-w-[105px] cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-400">
      قريبًا
    </span>
  )}
</div>

         {/* MOBILE ACTIONS */}
<div className="mt-3 grid grid-cols-[1.15fr_0.85fr] gap-2 border-t border-slate-100 pt-3 lg:hidden">
  <Link
    href={`/brokers/${broker.slug}`}
    className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-500 px-3 py-2 text-xs font-black text-white transition hover:bg-brand-600"
  >
    اقرأ التقييم
  </Link>

  {realLink ? (
    <a
      href={`/go/${broker.slug}?type=real`}
      className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-black text-brand-700 transition hover:bg-brand-100"
    >
      فتح حساب
    </a>
  ) : (
    <span className="inline-flex min-h-[42px] cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-400">
      قريبًا
    </span>
  )}
</div>
</div>

        {/* RATING — DESKTOP */}
<div className="hidden border-r border-slate-100 bg-gradient-to-b from-[#fbfdff] to-[#f4f8fe] px-4 py-4 lg:flex lg:flex-col lg:items-center lg:justify-center">
  <span className="text-[11px] font-bold text-slate-500">
    التقييم العام
  </span>

  <div
    dir="ltr"
    className="mt-1 text-[37px] font-black leading-none tracking-[-0.04em] text-slate-950"
  >
    {formatRating(broker.rating)}
  </div>

  <span className="mt-2 inline-flex rounded-full border border-brand-100 bg-brand-50/70 px-3 py-1 text-[10px] font-black text-brand-700">
  {ratingLabel(broker.rating)}
</span>

  <div className="mt-3">
  {renderStars(broker.rating, "text-[15px]")}
</div>

  <span className="mt-2 text-[10px] font-bold text-slate-500">
  من 5
</span>
</div>
      </div>
    </article>
  );
}

function FilterFields({
  query,
  deposit,
  rating,
  islamic,
  regulator,
  idPrefix,
  compact = false,
}: {
  query: string;
  deposit: string;
  rating: string;
  islamic: string;
  regulator: string;
  idPrefix: string;
  compact?: boolean;
}) {
  const searchId = `${idPrefix}-broker-search`;
  const depositId = `${idPrefix}-deposit-filter`;
  const ratingId = `${idPrefix}-rating-filter`;
  const regulatorId = `${idPrefix}-regulator-filter`;
  const islamicId = `${idPrefix}-islamic-filter`;

  const selectClass = compact
    ? "h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pl-8 text-[11px] font-extrabold text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-50"
    : "h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pl-9 text-[13px] font-extrabold text-slate-800 outline-none transition hover:border-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-50";

  const fieldLabelClass = compact
    ? "mb-1.5 block text-[11px] font-black text-slate-900"
    : "mb-2 block text-[13px] font-black text-slate-900";

  return (
    <>
      {/* SEARCH */}
      <div className={compact ? "col-span-2" : ""}>
        <label htmlFor={searchId} className={fieldLabelClass}>
          ابحث عن شركة
        </label>

        <div className="relative">
          <input
            id={searchId}
            name="q"
            type="search"
            defaultValue={query}
            placeholder="مثال: Exness أو XM"
            className={
              compact
                ? "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 pl-9 text-[12px] font-bold text-slate-900 outline-none transition placeholder:text-[11px] placeholder:font-semibold placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-50"
                : "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pl-10 text-sm font-bold text-slate-900 outline-none transition placeholder:font-semibold placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-50"
            }
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
          >
            ⌕
          </span>
        </div>
      </div>

      {/* DEPOSIT */}
      <div>
        <label htmlFor={depositId} className={fieldLabelClass}>
          الحد الأعلى للإيداع
        </label>

        <div className="relative">
          <select
            id={depositId}
            name="deposit"
            defaultValue={deposit}
            className={selectClass}
          >
            <option value="">جميع الشركات</option>
            <option value="10">حتى $10</option>
            <option value="50">حتى $50</option>
            <option value="100">حتى $100</option>
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500"
          >
            ▾
          </span>
        </div>
      </div>

      {/* RATING */}
      <div>
        <label htmlFor={ratingId} className={fieldLabelClass}>
          الحد الأدنى للتقييم
        </label>

        <div className="relative">
          <select
            id={ratingId}
            name="rating"
            defaultValue={rating}
            className={selectClass}
          >
            <option value="">كل التقييمات</option>
            <option value="4.5">4.50 فأعلى</option>
            <option value="4.3">4.30 فأعلى</option>
            <option value="4">4.00 فأعلى</option>
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500"
          >
            ▾
          </span>
        </div>
      </div>

      {/* REGULATOR */}
      <div className={compact ? "col-span-2" : ""}>
        <div
          className={`flex items-center justify-between gap-3 ${
            compact ? "mb-1.5" : "mb-2"
          }`}
        >
          <label
            htmlFor={regulatorId}
            className={
              compact
                ? "block text-[11px] font-black text-slate-900"
                : "block text-[13px] font-black text-slate-900"
            }
          >
            الجهة الرقابية
          </label>

          <span
            className={`rounded-full border border-brand-100 bg-brand-50 font-black text-brand-700 ${
              compact
                ? "px-1.5 py-0.5 text-[8px]"
                : "px-2 py-0.5 text-[10px]"
            }`}
          >
            8 تراخيص
          </span>
        </div>

        <div className="relative">
          <select
            id={regulatorId}
            name="regulator"
            defaultValue={regulator}
            className={selectClass}
          >
            <option value="">جميع التراخيص</option>
            <option value="CySEC">CySEC — قبرص</option>
            <option value="FCA">FCA — بريطانيا</option>
            <option value="ASIC">ASIC — أستراليا</option>
            <option value="FSCA">FSCA — جنوب أفريقيا</option>
            <option value="FSA">FSA — سيشل</option>
            <option value="FSC">FSC — موريشيوس</option>
            <option value="SCB">SCB — البهاما</option>
            <option value="DFSA">DFSA — دبي</option>
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500"
          >
            ▾
          </span>
        </div>
      </div>

      {/* ISLAMIC ACCOUNT */}
      <label
        htmlFor={islamicId}
        className={`cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/80 transition hover:border-brand-200 hover:bg-brand-50/40 ${
          compact
            ? "col-span-2 flex px-3 py-2.5"
            : "flex px-3 py-3"
        }`}
      >
        <span
          className={
            compact
              ? "text-[11px] font-extrabold text-slate-800"
              : "text-[13px] font-extrabold text-slate-800"
          }
        >
          حساب إسلامي متوفر
        </span>

        <input
          id={islamicId}
          type="checkbox"
          name="islamic"
          value="available"
          defaultChecked={islamic === "available"}
          className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
      </label>

      {/* ACTIONS */}
      <div
        className={`grid grid-cols-2 gap-2 pt-1 ${
          compact ? "col-span-2" : ""
        }`}
      >
        <button
          type="submit"
          className={`inline-flex items-center justify-center rounded-xl bg-brand-500 px-3 py-2 font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.14)] transition hover:bg-brand-600 ${
            compact
              ? "min-h-[40px] text-[12px]"
              : "min-h-[43px] px-4 text-sm hover:-translate-y-0.5"
          }`}
        >
          تطبيق الفلتر
        </button>

        <Link
          href="/brokers#brokers-list"
          className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 ${
            compact
              ? "min-h-[40px] text-[12px]"
              : "min-h-[43px] px-4 text-sm"
          }`}
        >
          مسح الكل
        </Link>
      </div>
    </>
  );
}

export default async function BrokersPage({
  searchParams,
}: {
  searchParams?: BrokerSearchParams | Promise<BrokerSearchParams>;
}) {
  const params = await Promise.resolve(searchParams ?? {});
  const query = getParam(params.q).trim();
  const deposit = getParam(params.deposit);
  const rating = getParam(params.rating);
  const islamic = getParam(params.islamic);
  const regulator = getParam(params.regulator);

  const supabase = await createClient();

  const { data, error } = await supabase
  .from("brokers")
  .select(
    "id,name,slug,rating,min_deposit,best_for,regulation,platforms,islamic_account,max_leverage,arabic_support,logo,real_account_url,demo_account_url"
  )
  .eq("publication_status", "published")
  .order("rating", { ascending: false });

  const brokers = (data as Broker[] | null) ?? [];

  const filteredBrokers = brokers.filter((broker) => {
    const matchesQuery =
      !query ||
      (broker.name ?? "").toLowerCase().includes(query.toLowerCase()) ||
      (broker.best_for ?? "").toLowerCase().includes(query.toLowerCase());

    const maxDeposit = Number(deposit);
    const matchesDeposit =
      !deposit ||
      (broker.min_deposit !== null &&
        broker.min_deposit !== undefined &&
        Number(broker.min_deposit) <= maxDeposit);

    const minRating = Number(rating);
    const matchesRating =
      !rating ||
      (broker.rating !== null &&
        broker.rating !== undefined &&
        Number(broker.rating) >= minRating);

    const matchesIslamic =
      islamic !== "available" || islamicAccountLabel(broker.islamic_account) === "متوفر";

    const brokerRegulators = splitToBadges(
  broker.regulation,
  20
).map((item) => item.toUpperCase());

const matchesRegulator =
  !regulator ||
  brokerRegulators.some(
    (item) => item === regulator.toUpperCase()
  );

    return (
      matchesQuery &&
      matchesDeposit &&
      matchesRating &&
      matchesIslamic &&
      matchesRegulator
    );
  });

  const sortedBrokersForSchema = [...brokers].sort(
  (a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0)
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "بروكر العرب",
      alternateName: "Broker Alarab",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${BASE_URL}/#logo`,
        url: `${BASE_URL}/og-image.webp`,
        contentUrl: `${BASE_URL}/og-image.webp`,
        width: 1560,
        height: 377,
        caption: "بروكر العرب",
      },
      description:
        "منصة عربية متخصصة في تقييم شركات الفوركس والوسطاء ومقارنة التراخيص والحسابات والمنصات وتكاليف التداول.",
      knowsAbout: [
        "تقييم شركات الفوركس",
        "وسطاء الفوركس",
        "تراخيص شركات الفوركس",
        "منصات التداول",
        "الحسابات الإسلامية",
        "مقارنة شركات الفوركس",
      ],
    },

    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "بروكر العرب",
      alternateName: "Broker Alarab",
      description:
        "موقع عربي وإنجليزي متخصص في تقييم ومقارنة شركات الفوركس والوسطاء.",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
      inLanguage: ["ar", "en"],
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${BROKERS_PAGE_URL}#breadcrumb`,
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
          name: "تقييم شركات الفوركس",
          item: BROKERS_PAGE_URL,
        },
      ],
    },

    {
      "@type": ["WebPage", "CollectionPage"],
      "@id": `${BROKERS_PAGE_URL}#webpage`,
      url: BROKERS_PAGE_URL,
      name: "تقييم شركات الفوركس 2026: أفضل الوسطاء الموثوقين",
      headline: "تقييمات شركات الفوركس لمساعدتك في اختيار الوسيط",
      description:
        "قائمة ومقارنة لتقييم شركات الفوركس حسب التراخيص والتكاليف والمنصات والحد الأدنى للإيداع والحساب الإسلامي والدعم العربي.",
      isPartOf: {
        "@id": `${BASE_URL}/#website`,
      },
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
      breadcrumb: {
        "@id": `${BROKERS_PAGE_URL}#breadcrumb`,
      },
      mainEntity: [
        {
          "@id": `${BROKERS_PAGE_URL}#broker-list`,
        },
        {
          "@id": `${BROKERS_PAGE_URL}#faq`,
        },
      ],
      about: [
        {
          "@type": "Thing",
          name: "تقييم شركات الفوركس",
        },
        {
          "@type": "Thing",
          name: "أفضل شركات الفوركس",
        },
        {
          "@type": "Thing",
          name: "مقارنة وسطاء الفوركس",
        },
        {
          "@type": "Thing",
          name: "تراخيص شركات الفوركس",
        },
      ],
      inLanguage: "ar",
    },

    {
      "@type": "ItemList",
      "@id": `${BROKERS_PAGE_URL}#broker-list`,
      name: "قائمة تقييم شركات الفوركس",
      description:
        "قائمة مرتبة لشركات الفوركس التي راجعها فريق بروكر العرب، مع تقييم كل وسيط ومعلومات الإيداع والمنصات والتراخيص.",
      url: `${BROKERS_PAGE_URL}#brokers-list`,
      numberOfItems: sortedBrokersForSchema.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: sortedBrokersForSchema.map((broker, index) => {
        const brokerUrl = `${BASE_URL}/brokers/${broker.slug ?? ""}`;
        const brokerId = `${brokerUrl}#organization`;
        const logoUrl = getAbsoluteUrl(broker.logo);

        return {
          "@type": "ListItem",
          position: index + 1,
          name: `تقييم ${broker.name ?? "شركة الفوركس"}`,
          url: brokerUrl,
          item: {
            "@type": "Organization",
            "@id": brokerId,
            name: broker.name ?? "شركة فوركس",
            url: brokerUrl,

            ...(logoUrl
              ? {
                  logo: {
                    "@type": "ImageObject",
                    url: logoUrl,
                  },
                  image: logoUrl,
                }
              : {}),

            ...(broker.best_for
              ? {
                  description: `${broker.name ?? "شركة الفوركس"} مناسبة لـ ${
                    broker.best_for
                  }.`,
                }
              : {}),

            ...(broker.rating !== null &&
            broker.rating !== undefined
              ? {
                  review: {
                    "@type": "Review",
                    "@id": `${brokerUrl}#broker-alarab-review`,
                    name: `تقييم ${broker.name ?? "شركة الفوركس"} من بروكر العرب`,
                    author: {
                      "@id": `${BASE_URL}/#organization`,
                    },
                    publisher: {
                      "@id": `${BASE_URL}/#organization`,
                    },
                    itemReviewed: {
                      "@id": brokerId,
                    },
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: Number(broker.rating),
                      bestRating: 5,
                      worstRating: 1,
                    },
                  },
                }
              : {}),
          },
        };
      }),
    },

    {
      "@type": "FAQPage",
      "@id": `${BROKERS_PAGE_URL}#faq`,
      url: `${BROKERS_PAGE_URL}#frequently-asked-questions`,
      name: "أسئلة شائعة عن تقييم شركات الفوركس",
      isPartOf: {
        "@id": `${BROKERS_PAGE_URL}#webpage`,
      },
      mainEntity: brokersFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
      inLanguage: "ar",
    },
  ],
};

  if (error) {
    return (
      <main dir="rtl" className="mx-auto max-w-[1520px] px-4 py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          حدث خطأ أثناء تحميل صفحة التقييمات.
        </div>
      </main>
    );
  }

  return (
    <>
      <Script
  id="brokers-structured-data"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
  }}
/>

      <main dir="rtl" className="bg-slate-50">
<section className="relative overflow-hidden border-b border-brand-100 bg-[#eaf3ff]">
  {/* BACKGROUND */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-bl from-[#f5f9ff] via-[#e8f2ff] to-[#cfe3ff]" />

    <div className="absolute right-[-120px] top-[-130px] h-[360px] w-[360px] rounded-full bg-white/70 blur-3xl" />

    <div className="absolute bottom-[-160px] left-[-100px] h-[420px] w-[420px] rounded-full bg-blue-300/25 blur-3xl" />

    <div className="absolute left-1/2 top-[120px] h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-[100px]" />

    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,91,184,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,91,184,0.025)_1px,transparent_1px)] bg-[size:46px_46px]" />
  </div>

  {/* MOBILE HERO */}
<div className="relative px-4 pb-5 pt-4 sm:hidden">
  <div className="mx-auto max-w-[350px] text-center">
    {/* LABEL */}
    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/90 px-3 py-1.5 text-[9px] font-extrabold text-brand-700 shadow-sm backdrop-blur">
      <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-brand-50 text-[8px] text-brand-600">
        ✓
      </span>

      تقييمات مستقلة لشركات التداول
    </div>

    {/* MOBILE TITLE */}
    <h1 className="mx-auto mt-3 max-w-[320px] text-[27px] font-black leading-[1.08] tracking-[-0.025em] text-slate-950">
      تقييمات شركات التداول

      <span className="mt-1 block text-[#1E5BB8]">
        اختر الوسيط الأنسب لك
      </span>
    </h1>

    {/* SHORT MOBILE DESCRIPTION */}
    <p className="mx-auto mt-3 max-w-[315px] text-[12px] font-medium leading-[1.8] text-slate-600">
      قارن التراخيص، الحد الأدنى للإيداع، المنصات والحساب الإسلامي قبل
      اختيار شركة التداول.
    </p>

    {/* MOBILE ACTIONS */}
    <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-2">
      <a
        href="#brokers-list"
        className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-brand-500 px-3 py-2 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.2)] transition hover:bg-brand-600"
      >
        تصفح الوسطاء
        <span aria-hidden="true">↓</span>
      </a>

      <Link
        href="/compare"
        className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl border border-white bg-white/90 px-3 py-2 text-[11px] font-black text-slate-800 shadow-sm backdrop-blur"
      >
        المقارنات
        <span aria-hidden="true">←</span>
      </Link>
    </div>
  </div>
</div>

{/* TABLET + DESKTOP HERO */}
<div className="relative mx-auto hidden w-full max-w-[1520px] px-6 py-7 sm:block lg:px-8">
  <div className="mx-auto max-w-[1160px] text-center">
    {/* LABEL */}
    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/90 px-3.5 py-1.5 text-[11px] font-extrabold text-brand-700 shadow-sm backdrop-blur">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-50 text-[9px] text-brand-600">
        ✓
      </span>

      تقييمات مستقلة لشركات التداول
    </div>

    {/* TITLE */}
    <h1 className="mx-auto mt-3 text-[40px] font-black leading-[1.1] tracking-[-0.025em] text-slate-950 lg:text-[47px]">
      تقييمات شركات التداول

      <span className="mt-1 block text-[#1E5BB8]">
        لمساعدتك في اختيار الوسيط
      </span>
    </h1>

    {/* DESCRIPTION */}
    <p className="mx-auto mt-3 max-w-[790px] text-[15px] font-medium leading-8 text-slate-600">
      تصفح تقييمات شركات التداول، وراجع التراخيص والرسوم والمنصات والحد
      الأدنى للإيداع والحساب الإسلامي قبل اختيار الوسيط وفتح حساب حقيقي.
    </p>

    {/* TRUST POINTS */}
    <div className="mx-auto mt-[18px] grid max-w-[800px] grid-cols-3 gap-2.5">
      <div className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white bg-white/90 px-3 py-2 text-[12px] font-extrabold text-slate-700 shadow-[0_6px_18px_rgba(30,91,184,0.07)] backdrop-blur">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[13px] text-emerald-700">
          ✓
        </span>

        مراجعة التراخيص
      </div>

      <div className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white bg-white/90 px-3 py-2 text-[12px] font-extrabold text-slate-700 shadow-[0_6px_18px_rgba(30,91,184,0.07)] backdrop-blur">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[13px] font-black text-brand-600">
          $
        </span>

        مراجعة الرسوم والتكاليف
      </div>

      <div className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white bg-white/90 px-3 py-2 text-[12px] font-extrabold text-slate-700 shadow-[0_6px_18px_rgba(30,91,184,0.07)] backdrop-blur">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-[14px] font-black text-violet-600">
          ☪
        </span>

        التحقق من الحساب الإسلامي
      </div>
    </div>

    {/* BUTTONS */}
    <div className="mt-[18px] flex items-center justify-center gap-2.5">
      <a
        href="#brokers-list"
        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#1E5BB8] px-6 py-2.5 text-[13px] font-extrabold text-white shadow-[0_8px_18px_rgba(30,91,184,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a98]"
      >
        تصفح تقييمات الوسطاء
        <span aria-hidden="true">↓</span>
      </a>

      <Link
        href="/compare"
        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-white bg-white/90 px-6 py-2.5 text-[13px] font-extrabold text-slate-800 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-white hover:text-brand-700"
      >
        الانتقال إلى المقارنات
        <span aria-hidden="true">←</span>
      </Link>
    </div>

    <p className="mx-auto mt-2.5 max-w-[700px] text-[10px] font-medium leading-4 text-slate-500">
      راجع شروط الشركة وترخيصها ورسومها وتحذيرات المخاطر قبل فتح الحساب
      أو إيداع الأموال.
    </p>
  </div>
</div>
</section>

  <section
  id="brokers-list"
  className="mx-auto w-full max-w-[1520px] px-3 pb-5 pt-3 sm:px-6 sm:pb-8 sm:pt-6 lg:px-8 lg:pb-12 lg:pt-7"
>
  {/* MOBILE LIST HEADER */}
<div className="mb-2.5 lg:hidden">
  <div className="flex min-h-[48px] items-center justify-between gap-3">
    {/* TITLE + COUNT */}
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-[20px] font-black leading-[1.15] text-slate-950">
          قائمة شركات التداول
        </h2>

        <span className="inline-flex min-h-[22px] shrink-0 items-center rounded-full border border-brand-100 bg-brand-50 px-2 py-0.5 text-[9px] font-black text-brand-700">
          {filteredBrokers.length} شركة
        </span>
      </div>
    </div>

    {/* COMPARE */}
    <Link
      href="/compare"
      className="inline-flex min-h-[34px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-black text-slate-700 shadow-[0_3px_8px_rgba(15,23,42,0.05)] transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
    >
      مقارنة
      <span aria-hidden="true">←</span>
    </Link>
  </div>
</div>

{/* MOBILE FILTER */}
<details className="group mb-2.5 overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.045)] lg:hidden">
  <summary className="flex min-h-[46px] cursor-pointer list-none items-center justify-between px-3 text-[12px] font-black text-slate-900">
    <span className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-[12px] text-brand-600">
        ☷
      </span>

      البحث والفلترة
    </span>

    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-100 bg-white text-[12px] text-brand-600 transition group-open:rotate-45">
      ＋
    </span>
  </summary>

  <form
    action="/brokers#brokers-list"
    method="get"
    className="grid grid-cols-2 gap-2.5 border-t border-slate-100 p-3"
  >
    <FilterFields
      query={query}
      deposit={deposit}
      rating={rating}
      islamic={islamic}
      regulator={regulator}
      idPrefix="mobile"
      compact
    />
  </form>
</details>

  {/* DESKTOP GRID */}
  <div className="grid items-start gap-5 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
    {/* DESKTOP FILTER */}
    <aside className="sticky top-24 hidden overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.07)] lg:block">
      {/* FILTER HEADER */}
<div className="flex min-h-[88px] items-center border-b border-slate-200 bg-gradient-to-bl from-brand-50/60 to-white px-5">
  <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg text-brand-600 shadow-sm">
      ☷
    </span>

    <div>
      <h3 className="text-lg font-black leading-tight text-slate-950">
        فلترة النتائج
      </h3>

      <p className="mt-1 text-xs font-bold leading-5 text-slate-500">
        اختر الشركة الأنسب لاحتياجاتك.
      </p>
    </div>
  </div>
</div>

      <form
        action="/brokers#brokers-list"
        method="get"
        className="space-y-4 p-5"
      >
        <FilterFields
          query={query}
          deposit={deposit}
          rating={rating}
          islamic={islamic}
          regulator={regulator}
          idPrefix="desktop"
        />
      </form>
    </aside>

    {/* RESULTS COLUMN */}
    <div className="min-w-0">
      {/* DESKTOP RESULTS HEADER */}
<div className="mb-3 hidden min-h-[88px] items-center justify-between gap-4 border-b border-slate-200 lg:flex">
  {/* TITLE + META */}
  <div className="min-w-0">
    <div className="flex flex-wrap items-center gap-2.5">
      <h2 className="text-[25px] font-black leading-tight text-slate-950">
        قائمة شركات التداول
      </h2>

      <span className="inline-flex min-h-[24px] items-center rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-700">
        {filteredBrokers.length} شركة
      </span>
    </div>

    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-slate-500">
      <span>
        عرض {filteredBrokers.length} من أصل {brokers.length} شركة
      </span>

      <span className="text-slate-300">•</span>

      <span className="inline-flex items-center gap-1 text-brand-700">
        <span aria-hidden="true">✓</span>
        مرتبة حسب تقييم فريق بروكر العرب
      </span>

      <span className="text-slate-300">•</span>

      <span>استخدم الفلتر لتضييق النتائج</span>
    </div>
  </div>

  {/* COMPARE ACTION */}
  <Link
    href="/compare"
    className="inline-flex min-h-[39px] shrink-0 items-center justify-center gap-2 rounded-xl border border-brand-100 bg-white px-4 text-[12px] font-black text-brand-700 shadow-sm transition hover:border-brand-200 hover:bg-brand-50"
  >
    مقارنة الوسطاء
    <span aria-hidden="true">←</span>
  </Link>
</div>

      {/* BROKER CARDS */}
      <div className="space-y-3 lg:space-y-3.5">
        {filteredBrokers.length > 0 ? (
          filteredBrokers.map((broker, index) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
              index={index}
            />
          ))
        ) : (
          <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
            <div className="text-3xl">⌕</div>

            <h3 className="mt-3 text-lg font-black text-slate-950">
              لا توجد شركات مطابقة
            </h3>

            <p className="mt-2 text-sm font-bold text-slate-500">
              جرّب تغيير خيارات الفلترة أو مسحها لإظهار جميع الشركات.
            </p>

            <Link
              href="/brokers#brokers-list"
              className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-black text-white transition hover:bg-brand-600"
            >
              عرض جميع الشركات
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
</section>

<section
  id="frequently-asked-questions"
  className="mx-auto w-full max-w-[1520px] scroll-mt-24 px-3 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20"
>
  <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.045)]">
    {/* FAQ HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-bl from-brand-50/60 via-white to-white px-4 py-4 sm:px-6 sm:py-6">
      <span className="text-[9px] font-black text-brand-700 sm:text-[11px]">
        دليل اختيار وسيط الفوركس
      </span>

      <h2 className="mt-1.5 text-[21px] font-black leading-[1.35] text-slate-950 sm:text-[28px] sm:leading-tight">
        أسئلة شائعة عن تقييم شركات الفوركس
      </h2>

      <p className="mt-2 max-w-[720px] text-[11px] font-medium leading-5 text-slate-600 sm:text-[13px] sm:leading-7">
        إجابات مختصرة تساعدك على مقارنة الوسطاء واختيار شركة الفوركس
        المناسبة.
      </p>
    </div>

    {/* FAQ ITEMS */}
    <div className="grid gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-5">
      {brokersFaqs.map((item) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-[14px] border border-slate-200 bg-white transition open:border-brand-200 open:bg-brand-50/20"
        >
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-2.5 text-[12px] font-black leading-5 text-slate-950 sm:min-h-[58px] sm:px-4 sm:py-3 sm:text-[13px] sm:leading-6">
            <span className="min-w-0">
              {item.question}
            </span>

            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[13px] font-black text-brand-600 transition duration-200 group-open:rotate-45 group-open:bg-brand-100"
            >
              +
            </span>
          </summary>

          <div className="border-t border-slate-100 px-3.5 pb-3 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3">
            <p className="text-[11px] font-medium leading-6 text-slate-600 sm:text-[12px] sm:leading-7">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>

      </main>
    </>
  );
}