import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  best_for: string | null;
  best_for_en: string | null;
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
const BROKERS_PAGE_URL = `${BASE_URL}/en/brokers`;

const brokersFaqs = [
  {
    question: "How do I choose the best forex broker?",
    answer:
      "Start by checking the broker’s regulatory entities, then compare its minimum deposit, trading costs, spreads, platforms, leverage, account conditions, and customer support. The right broker should match your experience, capital, and trading needs rather than simply having the highest score.",
  },
  {
    question: "What do forex broker ratings measure?",
    answer:
      "Forex broker ratings provide a structured review of regulation, safety, trading costs, platforms, deposits and withdrawals, Islamic account availability, customer support, and the overall trading experience.",
  },
  {
    question: "Are the forex brokers listed on this page trusted?",
    answer:
      "The brokers shown on this page have been reviewed by the Broker Alarab team based on their available regulatory and account information. Traders should still verify the legal entity and licence that will govern their account before depositing funds.",
  },
  {
    question: "Is the highest-rated forex broker best for every trader?",
    answer:
      "No. One broker may be more suitable for beginners because of a low minimum deposit and simple platforms, while another may be better for experienced traders seeking advanced tools, tighter pricing, or faster execution.",
  },
  {
    question: "How are forex brokers ranked on this page?",
    answer:
      "Brokers are ordered by Broker Alarab’s editorial rating, which considers regulation, safety, costs, platforms, account conditions, Islamic account availability, Arabic support, and other relevant trading features.",
  },
  {
    question: "Do forex brokers offer Islamic accounts?",
    answer:
      "Some forex brokers provide swap-free Islamic accounts under specific conditions. Traders should review each broker’s Islamic account policy because eligibility, exemptions, holding periods, and alternative fees may differ.",
  },
];

function getAbsoluteUrl(value: string | null | undefined) {
  if (!value?.trim()) return undefined;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: BrokerSearchParams | Promise<BrokerSearchParams>;
}): Promise<Metadata> {
  const params = await Promise.resolve(searchParams ?? {});
  const filtered = hasActiveFilters(params);

  return {
    metadataBase: new URL(BASE_URL),
    title: "Forex Broker Reviews 2026 | Compare Brokers",
    description:
      "Compare forex broker reviews, regulation, trading costs, platforms, minimum deposits, leverage, and account conditions before choosing a broker.",
    applicationName: "Broker Alarab",
    category: "Finance",
    creator: "Broker Alarab",
    publisher: "Broker Alarab",
    alternates: {
      canonical: BROKERS_PAGE_URL,
      languages: {
        ar: `${BASE_URL}/brokers`,
        en: BROKERS_PAGE_URL,
        "x-default": BROKERS_PAGE_URL,
      },
    },
    robots: filtered
      ? {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        }
      : {
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
      title: "Forex Broker Reviews 2026 | Compare Brokers",
      description:
        "Compare forex brokers by regulation, trading costs, platforms, minimum deposit, leverage, and account conditions.",
      url: BROKERS_PAGE_URL,
      siteName: "Broker Alarab",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${BASE_URL}/og-image.webp`,
          width: 1560,
          height: 377,
          alt: "Forex broker reviews and comparisons by Broker Alarab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Forex Broker Reviews 2026 | Broker Alarab",
      description:
        "Compare forex brokers by rating, regulation, deposits, platforms, leverage, and account conditions.",
      images: [`${BASE_URL}/og-image.webp`],
    },
  };
}

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function hasActiveFilters(params: BrokerSearchParams) {
  return Boolean(
    getParam(params.q).trim() ||
      getParam(params.deposit) ||
      getParam(params.rating) ||
      getParam(params.islamic) ||
      getParam(params.regulator)
  );
}

function getBrokerName(broker: Broker) {
  return broker.name_en?.trim() || broker.name?.trim() || "Forex Broker";
}

function getBrokerBestFor(broker: Broker) {
  const englishValue = broker.best_for_en?.trim();
  if (englishValue) return englishValue;

  const fallbackValue = broker.best_for?.trim();
  if (fallbackValue && !/[\u0600-\u06FF]/.test(fallbackValue)) {
    return fallbackValue;
  }

  return "General forex trading";
}

function formatRating(rating: number | null) {
  if (rating === null || rating === undefined) return "—";
  return Number(rating).toFixed(2);
}

function formatDeposit(value: number | null) {
  if (value === null || value === undefined) return "Not specified";

  return `$${Number(value).toLocaleString("en-US")}`;
}

function normalizeText(
  value: string | null | undefined,
  fallback = "Not specified"
) {
  if (!value?.trim()) return fallback;
  return value;
}

function islamicAccountLabel(value: string | null | undefined) {
  if (!value?.trim()) return "Not specified";

  const normalizedValue = value.trim().toLowerCase();

  if (
    normalizedValue.includes("not available") ||
    normalizedValue.includes("unavailable") ||
    normalizedValue.includes("غير متوفر") ||
    normalizedValue.includes("غير متاح") ||
    normalizedValue === "no" ||
    normalizedValue.startsWith("no ") ||
    normalizedValue === "false"
  ) {
    return "Not available";
  }

  if (
    normalizedValue.includes("yes") ||
    normalizedValue.includes("available") ||
    normalizedValue.includes("true") ||
    normalizedValue.includes("islamic") ||
    normalizedValue.includes("متوفر") ||
    normalizedValue.includes("نعم")
  ) {
    return "Available";
  }

  return value;
}

function arabicSupportLabel(value: string | null | undefined) {
  if (!value?.trim()) return "Not specified";

  const normalizedValue = value.trim().toLowerCase();

  if (
    normalizedValue.includes("not available") ||
    normalizedValue.includes("unavailable") ||
    normalizedValue.includes("غير متوفر") ||
    normalizedValue.includes("غير متاح") ||
    normalizedValue === "no" ||
    normalizedValue.startsWith("no ") ||
    normalizedValue === "false"
  ) {
    return "Not available";
  }

  if (
    normalizedValue.includes("yes") ||
    normalizedValue.includes("available") ||
    normalizedValue.includes("true") ||
    normalizedValue.includes("arabic") ||
    normalizedValue.includes("متوفر") ||
    normalizedValue.includes("نعم")
  ) {
    return "Available";
  }

  return value;
}

function hasRealAccountLink(url: string | null | undefined) {
  return Boolean(url?.trim());
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
  if (rating === null || rating === undefined) return "Not rated";
  if (rating >= 4.6) return "Excellent tier";
  if (rating >= 4.4) return "Advanced rating";
  if (rating >= 4.2) return "Strong performance";
  if (rating >= 4) return "Good performance";
  return "Average rating";
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
      aria-label={`Rating ${formatRating(rating)} out of 5`}
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


function BrokerEditorialNoteEn({
  bestFor,
}: {
  bestFor: string | null;
}) {
  if (!bestFor?.trim()) return null;

  return (
    <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50/40 px-3 py-2.5">
      <p className="text-[11px] font-bold leading-5 text-slate-700">
        <span className="font-black text-brand-700">
          Suitable for:
        </span>{" "}
        {bestFor.trim()}
      </p>
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
  const brokerName = getBrokerName(broker);
  const bestFor = getBrokerBestFor(broker);
  const realLink = hasRealAccountLink(broker.real_account_url);
  const platforms = splitToBadges(broker.platforms, 4);
  const regulators = splitToBadges(broker.regulation, 4);
  const allRegulators = splitToBadges(broker.regulation, 20);

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
          className="absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r from-brand-500 via-brand-400 to-brand-200"
        />
      )}

      {/* =========================================================
          MOBILE CARD
      ========================================================= */}
      <div className="lg:hidden">
        {/* MOBILE TOP */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-white to-brand-50/25 px-3 pb-3 pt-2.5">
          {/* RANK + RECOMMENDED */}
          <div className="mb-2 flex items-center justify-between gap-2">
            <span
              className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[10px] font-black ${
                index < 3
                  ? "border border-brand-200 bg-brand-50 text-brand-700"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {index + 1}
            </span>

            {index < 5 ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-700">
                <span aria-hidden="true" className="text-[8px]">
                  ✓
                </span>
                Recommended
              </span>
            ) : (
              <span />
            )}
          </div>

          {/* LOGO + RATING */}
<div className="flex items-center justify-between gap-3">
  {/* LOGO — LEFT */}
  <Link
    href={`/en/brokers/${broker.slug}`}
    aria-label={`Read the ${brokerName} review`}
    className="relative flex h-[74px] w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.055)]"
  >
    {broker.logo ? (
      <Image
        src={broker.logo}
        alt={`${brokerName} logo`}
        fill
        
className={
  brokerName.toLowerCase().includes("capital")
    ? "!scale-[0.95] object-contain"
    : `object-contain ${getBrokerLogoClass(brokerName)}`
}

        sizes="108px"
      />
    ) : (
      <span className="text-lg font-black text-slate-600">
        {getInitials(brokerName)}
      </span>
    )}
  </Link>

  {/* RATING — RIGHT */}
  <div className="ml-auto flex min-h-[74px] w-[148px] shrink-0 flex-col items-end justify-center rounded-[14px] border border-slate-100 bg-white/70 px-3 py-2 text-right">
    <span className="text-[9px] font-bold text-slate-500">
      Overall rating
    </span>

    <div
      dir="ltr"
      className="mt-1 flex w-full items-end justify-end gap-1"
    >
      <span className="text-[25px] font-black leading-none tracking-[-0.04em] text-slate-950">
        {formatRating(broker.rating)}
      </span>

      <span className="pb-0.5 text-[9px] font-bold text-slate-500">
        /5
      </span>
    </div>

    <div
      dir="ltr"
      className="mt-1.5 flex w-full items-center justify-end"
    >
      {renderStars(broker.rating, "text-[13px]")}
    </div>

    <span className="mt-1.5 inline-flex w-fit rounded-full border border-brand-100 bg-brand-50 px-2 py-0.5 text-[8px] font-black text-brand-700">
      {ratingLabel(broker.rating)}
    </span>
  </div>
</div>

{/* VISIBLE BROKER NAME — MOBILE */}
<h2 className="mt-2 text-center text-[14px] font-black leading-5 text-slate-950">
  <Link
    href={`/en/brokers/${broker.slug}`}
    className="transition-colors hover:text-brand-600"
  >
    {brokerName}
  </Link>
</h2>

          </div>
       

        {/* MOBILE INFORMATION PANEL */}
        <div className="mx-3 overflow-hidden rounded-[14px] border border-slate-200 bg-slate-50/35">
          {/* QUICK FACTS */}
          <div className="grid grid-cols-2">
            {/* MINIMUM DEPOSIT */}
            <div className="border-b border-r border-slate-200/80 px-3 py-2.5">
              <span className="block text-[9px] font-bold text-slate-500">
                Minimum deposit
              </span>

              <span
                dir="ltr"
                className="mt-0.5 block text-left text-[14px] font-black text-slate-950"
              >
                {formatDeposit(broker.min_deposit)}
              </span>
            </div>

            {/* MAXIMUM LEVERAGE */}
            <div className="border-b border-slate-200/80 px-3 py-2.5">
              <span className="block text-[9px] font-bold text-slate-500">
                Maximum leverage
              </span>

              <span
                dir="ltr"
                className="mt-0.5 block text-left text-[13px] font-black text-slate-950"
              >
                {normalizeText(broker.max_leverage)}
              </span>
            </div>

            {/* BEST FOR */}
            <div className="border-r border-slate-200/80 px-3 py-2.5">
              <span className="block text-[9px] font-bold text-slate-500">
                Best for
              </span>

              <span
                title={bestFor}
                className="mt-0.5 line-clamp-2 block min-h-[32px] text-[11px] font-black leading-4 text-slate-950"
              >
                {bestFor}
              </span>
            </div>

            {/* REGULATORY COVERAGE */}
            <div className="px-3 py-2.5">
              <span className="block text-[9px] font-bold text-slate-500">
                Regulatory coverage
              </span>

              <span className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-black text-emerald-700">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                />

                {allRegulators.length > 0
                  ? `${allRegulators.length} licences`
                  : "Not specified"}
              </span>
            </div>
          </div>

          {/* PLATFORMS */}
          <div className="flex min-h-[38px] items-center justify-between gap-3 border-t border-slate-200/80 bg-white px-3 py-1.5">
            <span className="shrink-0 text-[9px] font-bold text-slate-500">
              Platforms
            </span>

            <span
              dir="ltr"
              title={platforms.join(", ")}
              className="line-clamp-1 min-w-0 text-right text-[11px] font-black text-slate-950"
            >
              {platforms.join(", ") || "Not specified"}
            </span>
          </div>

          {/* LICENCES */}
          <div className="flex min-h-[38px] items-center justify-between gap-2 border-t border-slate-200/80 bg-white px-3 py-1.5">
            <span className="shrink-0 text-[9px] font-bold text-slate-500">
              Key licences
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
                  Not specified
                </span>
              )}
            </div>
          </div>
        </div>


{/* BROKER EDITORIAL NOTE — MOBILE */}
<div className="px-3">
  <BrokerEditorialNoteEn bestFor={bestFor} />
</div>


        {/* MOBILE ACTIONS */}
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-2 px-3 pb-3 pt-2.5">
          <Link
            href={`/en/brokers/${broker.slug}`}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-brand-500 px-3 py-2 text-[11px] font-black text-white shadow-[0_5px_12px_rgba(30,91,184,0.12)] transition hover:bg-brand-600"
          >
            Read Review
          </Link>

          {realLink ? (
            <a
              href={`/go/${broker.slug}?type=real`}
              rel="sponsored nofollow"
              className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-[11px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
              Open Account
            </a>
          ) : (
            <span className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-black text-slate-400">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* =========================================================
          DESKTOP CARD
      ========================================================= */}
      <div className="hidden lg:grid lg:min-h-[180px] lg:grid-cols-[220px_minmax(0,1fr)_150px]">
        {/* BROKER IDENTITY */}
        <div className="border-r border-slate-100 bg-gradient-to-br from-white via-white to-brand-50/30 p-4">
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            {/* LOGO */}
            <Link
              href={`/en/brokers/${broker.slug}`}
              aria-label={`Read the ${brokerName} review`}
              className="relative flex h-[98px] w-[178px] shrink-0 items-center justify-center overflow-hidden rounded-[17px] border border-slate-200 bg-white shadow-[0_7px_20px_rgba(15,23,42,0.07)] transition duration-300 hover:border-brand-200"
            >
              {broker.logo ? (
                <Image
  src={broker.logo}
  alt={`${brokerName} logo`}
  fill
  className={
    brokerName.toLowerCase().includes("capital")
      ? "object-contain !scale-[0.90]"
      : `object-contain transition duration-300 ${getBrokerLogoClass(brokerName)}`
  }
  sizes="178px"
/>
              ) : (
                <span className="text-xl font-black text-slate-600">
                  {getInitials(brokerName)}
                </span>
              )}
            </Link>

            
{/* VISIBLE BROKER NAME — DESKTOP */}
<h2 className="mt-3 text-center text-[17px] font-black leading-6 text-slate-950">
  <Link
    href={`/en/brokers/${broker.slug}`}
    className="transition-colors hover:text-brand-600"
  >
    {brokerName}
  </Link>
</h2>


            {/* RANK + RECOMMENDED */}
            <div className="flex flex-wrap items-center justify-center gap-2">
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
                  Recommended
                </span>
              )}
            </div>

            {/* COMPACT RATING */}
            <div
              dir="ltr"
              className="flex flex-wrap items-center justify-center gap-2"
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

        {/* BROKER DETAILS */}
        <div className="flex min-w-0 flex-col px-4 py-4">
          {/* QUICK FACTS */}
          <div className="grid grid-cols-4 gap-3">
            {/* MINIMUM DEPOSIT */}
            <div className="rounded-xl border border-slate-200/70 bg-slate-50/65 px-3 py-2.5 transition group-hover:bg-white">
              <span className="block text-[11px] font-bold text-slate-500">
                Minimum deposit
              </span>

              <span
                dir="ltr"
                className="mt-1 block text-left text-[15px] font-black text-slate-950"
              >
                {formatDeposit(broker.min_deposit)}
              </span>
            </div>

            {/* MAXIMUM LEVERAGE */}
            <div className="rounded-xl border border-slate-200/70 bg-slate-50/65 px-3 py-2.5 transition group-hover:bg-white">
              <span className="block text-[11px] font-bold text-slate-500">
                Maximum leverage
              </span>

              <span
                dir="ltr"
                className="mt-1 block text-left text-[14px] font-black text-slate-950"
              >
                {normalizeText(broker.max_leverage)}
              </span>
            </div>

            {/* BEST FOR */}
            <div className="min-w-0 rounded-xl border border-slate-200/70 bg-slate-50/65 px-3 py-2.5 transition group-hover:bg-white">
              <span className="block text-[11px] font-bold text-slate-500">
                Best for
              </span>

              <span
                title={bestFor}
                className="mt-1 line-clamp-1 block text-[13px] font-black text-slate-950"
              >
                {bestFor}
              </span>
            </div>

            {/* REGULATORY COVERAGE */}
            <div className="rounded-xl border border-slate-200/70 bg-slate-50/65 px-3 py-2.5 transition group-hover:bg-white">
              <span className="block text-[11px] font-bold text-slate-500">
                Regulatory coverage
              </span>

              <span className="mt-1 inline-flex items-center gap-1.5 text-[14px] font-black text-emerald-700">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                />

                {allRegulators.length > 0
                  ? `${allRegulators.length} licences`
                  : "Not specified"}
              </span>
            </div>
          </div>

          {/* PLATFORMS + LICENCES */}
          <div className="mt-3 grid grid-cols-[1.25fr_1fr] gap-3">
            {/* PLATFORMS */}
            <div className="min-w-0 rounded-xl border border-slate-200/70 bg-white px-3 py-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="shrink-0 text-[11px] font-bold text-slate-500">
                  Platforms
                </span>

                <span
                  dir="ltr"
                  title={platforms.join(", ")}
                  className="line-clamp-1 min-w-0 text-right text-[13px] font-black text-slate-950"
                >
                  {platforms.join(", ") || "Not specified"}
                </span>
              </div>
            </div>

            {/* LICENCES */}
            <div className="min-w-0 rounded-xl border border-slate-200/70 bg-white px-3 py-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="shrink-0 text-[11px] font-bold text-slate-500">
                  Key licences
                </span>

                <div className="flex min-w-0 flex-wrap items-center justify-end gap-1.5">
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
                      Not specified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>


{/* BROKER EDITORIAL NOTE — DESKTOP */}
<BrokerEditorialNoteEn bestFor={bestFor} />


          {/* FULL-WIDTH DESKTOP ACTIONS */}
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-200/70 pt-3">
            <Link
              href={`/en/brokers/${broker.slug}`}
              className="inline-flex min-h-[40px] w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-2 text-xs font-black text-white shadow-[0_5px_12px_rgba(30,91,184,0.12)] transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Read Full Review
            </Link>

            {realLink ? (
              <a
                href={`/go/${broker.slug}?type=real`}
                rel="sponsored nofollow"
                className="inline-flex min-h-[40px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                Open Account
              </a>
            ) : (
              <span className="inline-flex min-h-[40px] w-full cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-400">
                Account Opening Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* DESKTOP RATING */}
        <div className="flex flex-col items-center justify-center border-l border-slate-100 bg-gradient-to-b from-[#fbfdff] to-[#f4f8fe] px-4 py-4">
          <span className="text-[11px] font-bold text-slate-500">
            Overall rating
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
            out of 5
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
  regulator,
  idPrefix,
  compact = false,
}: {
  query: string;
  deposit: string;
  rating: string;
  regulator: string;
  idPrefix: string;
  compact?: boolean;
}) {
  const searchId = `${idPrefix}-broker-search`;
  const depositId = `${idPrefix}-deposit-filter`;
  const ratingId = `${idPrefix}-rating-filter`;
  const regulatorId = `${idPrefix}-regulator-filter`;

  const selectClass = compact
    ? "h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-8 text-[11px] font-extrabold text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-50"
    : "h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-[13px] font-extrabold text-slate-800 outline-none transition hover:border-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-50";

  const fieldLabelClass = compact
    ? "mb-1.5 block text-[11px] font-black text-slate-900"
    : "mb-2 block text-[13px] font-black text-slate-900";

  return (
    <>
      {/* SEARCH */}
      <div className={compact ? "col-span-2" : ""}>
        <label htmlFor={searchId} className={fieldLabelClass}>
          Search brokers
        </label>

        <div className="relative">
          <input
            id={searchId}
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Example: Exness or XM"
            className={
              compact
                ? "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 pr-9 text-[12px] font-bold text-slate-900 outline-none transition placeholder:text-[11px] placeholder:font-semibold placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-50"
                : "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm font-bold text-slate-900 outline-none transition placeholder:font-semibold placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-50"
            }
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
          >
            ⌕
          </span>
        </div>
      </div>

      {/* DEPOSIT */}
      <div>
        <label htmlFor={depositId} className={fieldLabelClass}>
          Maximum deposit
        </label>

        <div className="relative">
          <select
            id={depositId}
            name="deposit"
            defaultValue={deposit}
            className={selectClass}
          >
            <option value="">All brokers</option>
            <option value="10">Up to $10</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500"
          >
            ▾
          </span>
        </div>
      </div>

      {/* RATING */}
      <div>
        <label htmlFor={ratingId} className={fieldLabelClass}>
          Minimum rating
        </label>

        <div className="relative">
          <select
            id={ratingId}
            name="rating"
            defaultValue={rating}
            className={selectClass}
          >
            <option value="">All ratings</option>
            <option value="4.5">4.50 and above</option>
            <option value="4.3">4.30 and above</option>
            <option value="4">4.00 and above</option>
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500"
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
            Regulatory authority
          </label>

          <span
            className={`rounded-full border border-brand-100 bg-brand-50 font-black text-brand-700 ${
              compact
                ? "px-1.5 py-0.5 text-[8px]"
                : "px-2 py-0.5 text-[10px]"
            }`}
          >
            8 licences
          </span>
        </div>

        <div className="relative">
          <select
            id={regulatorId}
            name="regulator"
            defaultValue={regulator}
            className={selectClass}
          >
            <option value="">All licences</option>
            <option value="FCA">FCA — United Kingdom</option>
            <option value="ASIC">ASIC — Australia</option>
            <option value="CySEC">CySEC — Cyprus</option>
            <option value="DFSA">DFSA — Dubai</option>
            <option value="FSCA">FSCA — South Africa</option>
            <option value="FSA">FSA — Seychelles</option>
            <option value="FSC">FSC — Mauritius</option>
            <option value="SCB">SCB — The Bahamas</option>
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500"
          >
            ▾
          </span>
        </div>
      </div>

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
          Apply Filters
        </button>

        <Link
          href="/en/brokers#brokers-list"
          className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 ${
            compact
              ? "min-h-[40px] text-[12px]"
              : "min-h-[43px] px-4 text-sm"
          }`}
        >
          Clear All
        </Link>
      </div>
    </>
  );
}


/* ============================================================
   BROKERS EDITORIAL GUIDE — ENGLISH
   Complete component — Broker Alarab
   ============================================================ */

function BrokersEditorialGuideEn({
  brokers,
}: {
  brokers: Broker[];
}) {
  const comparisonBrokers = brokers
    .filter((broker) => broker.slug && getBrokerName(broker))
    .slice(0, 8);

  const sectionClass =
    "rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.04)] sm:p-7";

  const headingClass =
    "text-[20px] font-black leading-[1.5] text-slate-950 sm:text-[26px]";

  const paragraphClass =
    "text-[13px] leading-[2] text-slate-700 sm:text-[15px]";

  const subheadingClass =
    "text-[15px] font-black leading-7 text-slate-900 sm:text-[17px]";

  const criteria = [
    {
      title: "Regulation and Legal Entities",
      description:
        "We examine disclosed regulatory authorities, the legal entities providing brokerage services and the scope of their licences. A group holding multiple licences does not mean every client receives the same regulatory protections.",
    },
    {
      title: "Actual Trading Costs",
      description:
        "We consider spreads, commissions, overnight financing charges and other account-related costs. A spread advertised from zero does not necessarily mean a trading account has the lowest overall cost.",
    },
    {
      title: "Account Types and Conditions",
      description:
        "We compare minimum deposits, maximum leverage, contract sizes, margin requirements and account features. Trading conditions may differ according to the account type, jurisdiction and legal entity.",
    },
    {
      title: "Trading Platforms and Tools",
      description:
        "We review advertised platforms, including MT4, MT5 and other trading systems, and their suitability for manual or automated trading. Platform availability alone does not establish execution quality.",
    },
    {
      title: "Deposits, Withdrawals and Support",
      description:
        "We examine published payment methods, applicable restrictions, disclosed fees and support availability. Withdrawal speed and service quality should not be treated as guaranteed without supporting evidence.",
    },
    {
      title: "Suitability for Different Traders",
      description:
        "A broker suitable for an experienced trader may not be ideal for a beginner. We consider how trading conditions, available platforms, costs and account restrictions fit different trading needs.",
    },
  ];

  const licenseSteps = [
    "Identify the legal company that will hold your trading account, rather than relying on the broker's brand name alone.",
    "Visit the regulator's official register and search for the legal entity or licence number.",
    "Verify the registered name, licence status, authorised activities and other relevant registration details.",
    "Confirm whether the licence applies to the entity you will actually contract with, rather than another company within the group.",
    "Review regulatory warnings, country-specific restrictions and the client agreement before depositing funds.",
  ];

  const tradingProfiles = [
    {
      title: "Beginner Forex Traders",
      description:
        "Prioritise an understandable trading platform, transparent account conditions, clear costs and access to a demo account where available. A low minimum deposit alone does not make a broker suitable for beginners.",
    },
    {
      title: "Scalpers and Active Traders",
      description:
        "Pay particular attention to total transaction costs, spreads during active trading hours, commission structures, execution policies, slippage and any restrictions on short-term trading strategies.",
    },
    {
      title: "Automated Trading",
      description:
        "Check support for your preferred platform, Expert Advisors, automated strategies and VPS services. Review execution conditions and any restrictions affecting algorithmic trading.",
    },
    {
      title: "Traders Seeking Islamic Accounts",
      description:
        "Review the instruments covered by swap-free arrangements, eligibility rules, holding-period restrictions and any alternative administrative charges. Conditions may vary by account type.",
    },
  ];

  const costItems: {
    title: string;
    text: string;
    href: string | null;
    linkText: string | null;
  }[] = [
    {
      title: "Forex Spreads",
      text: "The difference between the bid and ask price. Spreads may be fixed or variable and can widen during major news releases or periods of reduced liquidity.",
      href: "/en/learn-trading/spread",
      linkText: "Learn How Forex Spreads Work",
    },
    {
      title: "Trading Commissions",
      text: "Separate charges that a broker may apply per lot or per side of a trade. Commissions must be considered alongside spreads to calculate total transaction costs.",
      href: null,
      linkText: null,
    },
    {
      title: "Overnight Financing and Swaps",
      text: "Financing costs or credits may apply when positions are held overnight. Charges depend on the instrument, trade direction and account conditions. Some swap-free accounts may have alternative fees.",
      href: null,
      linkText: null,
    },
    {
      title: "Slippage and Execution Quality",
      text: "An order may be filled at a different price from the one requested, particularly during volatility or limited liquidity. Advertised spreads alone cannot establish execution quality.",
      href: "/en/learn-trading/liquidity",
      linkText: "Understand Liquidity and Execution",
    },
  ];

  return (
    <section
      id="brokers-editorial-guide"
      aria-labelledby="brokers-guide-title"
      className="mx-auto w-full max-w-[1520px] px-3 pb-8 pt-3 sm:px-6 sm:pb-12 sm:pt-4 lg:px-8"
    >
      <div className="space-y-5 sm:space-y-7">

        {/* =====================================================
            INTRODUCTION
        ===================================================== */}
        <header className="rounded-[24px] border border-brand-100 bg-gradient-to-br from-[#edf5ff] via-white to-white px-5 py-7 sm:px-8 sm:py-9">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[10px] font-black text-brand-700 sm:text-xs">
            Independent Forex Broker Reviews and Comparisons
          </span>

          <h2
            id="brokers-guide-title"
            className="mt-4 text-[23px] font-black leading-[1.4] text-slate-950 sm:text-[32px]"
          >
            How to Read Forex Broker Reviews and Make an Informed Decision
          </h2>

          <p className={`mt-4 w-full ${paragraphClass}`}>
            Broker Alarab helps traders evaluate forex broker reviews,
            compare forex brokers and understand the factors behind
            different broker ratings. Important considerations include
            regulatory licences, legal entities, trading costs,
            account types, available platforms, deposits and
            withdrawal conditions. The objective is to identify
            meaningful differences between brokerage providers
            before opening a trading account.
          </p>

          <p className={`mt-3 w-full ${paragraphClass}`}>
            When examining forex broker ratings or broker rankings,
            it is important to understand what each score represents
            and whether the broker's conditions suit your trading
            approach and country of residence. This guide combines
            a broker directory, an account comparison table,
            regulatory verification steps and a practical explanation
            of trading costs. A rating supports research and
            comparison; it does not guarantee the safety of funds
            or eliminate trading risks.
          </p>

          {/* QUICK NAVIGATION */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              {
                label: "Rating Methodology",
                href: "#broker-rating-methodology",
              },
              {
                label: "Comparison Table",
                href: "#brokers-comparison-table",
              },
              {
                label: "Verify Regulation",
                href: "#verify-forex-license",
              },
              {
                label: "Trading Costs",
                href: "#forex-trading-costs",
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-[38px] items-center justify-center rounded-xl border border-[#cfe0fa] bg-[#f5f9ff] px-4 py-2.5 text-[12px] font-black text-[#2458a5] shadow-[0_2px_5px_rgba(30,91,184,0.035)] transition-all duration-200 hover:border-[#9cbdf2] hover:bg-[#eaf3ff] hover:shadow-[0_4px_12px_rgba(30,91,184,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="ml-1.5 text-[13px] text-brand-500"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </header>

        {/* =====================================================
            METHODOLOGY
        ===================================================== */}
        <section
          id="broker-rating-methodology"
          className={`${sectionClass} scroll-mt-24`}
        >
          <div className="w-full">
            <span className="text-[11px] font-black text-brand-700">
              Broker Review Methodology
            </span>

            <h2 className={`mt-2 ${headingClass}`}>
              How Does Broker Alarab Evaluate Forex Brokers?
            </h2>

            <p className={`mt-4 ${paragraphClass}`}>
              Forex broker evaluations involve reviewing regulatory,
              operational and commercial characteristics. An overall
              rating helps organise broker comparison results, but
              it should never replace an examination of each
              broker's individual conditions.
            </p>

            <p className={`mt-3 ${paragraphClass}`}>
              When reading a forex broker review, distinguish between
              information that can be directly verified, such as
              published account fees or licence registrations,
              and factors that require additional evidence,
              such as real-world execution quality and the
              processing of withdrawal requests.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {criteria.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-[12px] font-black text-brand-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className={subheadingClass}>
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-[16px] border border-amber-200 bg-amber-50/60 p-4 sm:p-5">
            <h3 className="text-[14px] font-black text-slate-900">
              What Does a High Forex Broker Rating Actually Mean?
            </h3>

            <p className="mt-2 text-[12px] leading-7 text-slate-700 sm:text-[13px]">
              A high rating indicates that a broker has performed
              well against the applicable evaluation criteria.
              It does not mean the broker is suitable for everyone
              or that trading with the company is risk-free.
              Account fees, regulatory arrangements and trading
              conditions may change. Always confirm the terms
              applicable to your account before registering
              or depositing money.
            </p>
          </div>

          <div className="mt-5">
            <Link
              href="/en/how-we-review-brokers"
              className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-500 px-5 py-2.5 text-[12px] font-black text-white transition hover:bg-brand-600"
            >
              Read Our Full Broker Review Methodology →
            </Link>
          </div>
        </section>

        {/* =====================================================
            COMPARISON TABLE
        ===================================================== */}
        <section
          id="brokers-comparison-table"
          className={`${sectionClass} scroll-mt-24`}
        >
          <span className="text-[11px] font-black text-brand-700">
            Compare Brokers
          </span>

          <h2 className={`mt-2 ${headingClass}`}>
            Forex Broker Comparison Table: Ratings and Account Conditions
          </h2>

          <p className={`mt-3 w-full ${paragraphClass}`}>
            This forex broker comparison table presents a selection
            of brokers from our directory, ordered by their
            published ratings. Compare minimum deposits,
            advertised maximum leverage and Islamic account
            availability before visiting each broker's full
            review. Conditions may vary by legal entity,
            jurisdiction and account type.
          </p>

          <div className="mt-5 overflow-x-auto rounded-[16px] border border-slate-200">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead className="bg-slate-50">
                <tr className="text-[12px] font-black text-slate-700">
                  <th scope="col" className="px-4 py-4">
                    Broker
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Rating
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Minimum Deposit
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Max. Leverage
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Islamic Account
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Review
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {comparisonBrokers.map((broker) => (
                  <tr
                    key={broker.id}
                    className="text-[12px] text-slate-700 transition hover:bg-brand-50/30"
                  >
                    <td className="px-4 py-4 font-black text-slate-950">
                      <Link
                        href={`/en/brokers/${broker.slug}`}
                        className="hover:text-brand-600"
                      >
                        {getBrokerName(broker)}
                      </Link>
                    </td>

                    <td className="px-4 py-4 font-black">
                      {formatRating(broker.rating)} / 5
                    </td>

                    <td className="px-4 py-4 font-bold">
                      {formatDeposit(broker.min_deposit)}
                    </td>

                    <td className="px-4 py-4 font-bold">
                      {normalizeText(broker.max_leverage)}
                    </td>

                    <td className="px-4 py-4 font-bold">
                      {islamicAccountLabel(broker.islamic_account)}
                    </td>

                    <td className="px-4 py-4">
                      <Link
                        href={`/en/brokers/${broker.slug}`}
                        className="font-black text-brand-700 underline-offset-4 hover:underline"
                      >
                        Read Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[11px] leading-6 text-slate-500">
            The table displays the first eight brokers from the
            rating-ordered directory. Higher ratings do not
            guarantee profits, execution quality or suitability
            for every trader.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/en/compare"
              className="inline-flex min-h-[42px] items-center rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-[12px] font-black text-brand-700 transition hover:bg-brand-100"
            >
              Compare Two Forex Brokers →
            </Link>

            <Link
              href="/en/compare-accounts"
              className="inline-flex min-h-[42px] items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[12px] font-black text-slate-800 transition hover:bg-slate-50"
            >
              Compare Trading Account Types →
            </Link>
          </div>
        </section>

        {/* =====================================================
            LICENSE VERIFICATION
        ===================================================== */}
        <section
          id="verify-forex-license"
          className={`${sectionClass} scroll-mt-24`}
        >
          <span className="text-[11px] font-black text-brand-700">
            Regulatory Verification
          </span>

          <h2 className={`mt-2 ${headingClass}`}>
            How to Verify a Forex Broker's Regulatory Licence
          </h2>

          <p className={`mt-4 ${paragraphClass}`}>
            One common mistake is relying exclusively on the
            regulatory logos displayed on a broker's website.
            A brokerage group may operate several legal entities
            across different jurisdictions, each subject to
            different regulatory obligations and client protections.
            The entity holding your account matters more than
            the number of regulatory logos advertised.
          </p>

          <ol className="mt-5 space-y-3">
            {licenseSteps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-[14px] border border-slate-200 bg-slate-50/60 p-3.5 sm:p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[12px] font-black text-brand-700">
                  {index + 1}
                </span>

                <p className="pt-0.5 text-[12px] leading-7 text-slate-700 sm:text-[13px]">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-5 rounded-[16px] border border-brand-100 bg-brand-50/50 p-4 sm:p-5">
            <h3 className={subheadingClass}>
              Practical Example: A Broker with Multiple Licences
            </h3>

            <p className="mt-2 text-[12px] leading-7 text-slate-700 sm:text-[13px]">
              Suppose a forex broker advertises licences from
              several regulatory authorities. That does not
              automatically mean your trading account will
              be protected under the rules of the most
              stringent regulator. Check your client agreement,
              identify the contracting entity and compare
              its details with the official regulatory register.
              Available protections depend on the legal entity
              and the regulations applicable to your account.
            </p>
          </div>

          <Link
            href="/en/licenses"
            className="mt-5 inline-flex min-h-[42px] items-center rounded-xl bg-brand-500 px-5 py-2.5 text-[12px] font-black text-white transition hover:bg-brand-600"
          >
            Explore Forex Broker Regulations and Licences →
          </Link>
        </section>

        {/* =====================================================
            TRADING COSTS
        ===================================================== */}
        <section
          id="forex-trading-costs"
          className={`${sectionClass} scroll-mt-24`}
        >
          <span className="text-[11px] font-black text-brand-700">
            Understanding Trading Costs
          </span>

          <h2 className={`mt-2 ${headingClass}`}>
            How to Compare Forex Spreads and Trading Commissions
          </h2>

          <p className={`mt-4 ${paragraphClass}`}>
            The lowest advertised spread does not necessarily
            identify the cheapest forex trading account.
            Compare the full cost of opening and closing a trade,
            considering the instrument, position size, execution
            conditions and how long you intend to hold the position.
          </p>

          {/* EDUCATIONAL COST CARDS */}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {costItems.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-[16px] border border-slate-200 bg-slate-50/60 p-4 transition hover:border-brand-200 hover:bg-brand-50/20"
              >
                <h3 className={subheadingClass}>
                  {item.title}
                </h3>

                <p className="mt-2 flex-1 text-[12px] leading-7 text-slate-600 sm:text-[13px]">
                  {item.text}
                </p>

                {item.href && (
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1.5 self-start text-[12px] font-black text-brand-700 underline-offset-4 transition hover:underline"
                  >
                    {item.linkText}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
          </div>

          {/* STANDARD VS RAW ACCOUNT EXAMPLE */}
          <div className="mt-5 overflow-hidden rounded-[16px] border border-brand-100">
            <div className="bg-brand-50 px-4 py-3 sm:px-5">
              <h3 className="text-[14px] font-black text-slate-900 sm:text-[16px]">
                Practical Example: Is a Raw Spread Account Always Cheaper?
              </h3>
            </div>

            <div className="space-y-3 bg-white px-4 py-4 sm:px-5">
              <p className="text-[12px] leading-7 text-slate-700 sm:text-[13px]">
                Consider two EUR/USD trading accounts with a position
                size of one standard lot (100,000 euros).
                For this example, assume a pip value of $10
                in a USD-denominated trading account:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* STANDARD ACCOUNT */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="text-[13px] font-black text-slate-950">
                    Account One — Standard
                  </h4>

                  <p className="mt-2 text-[12px] leading-7 text-slate-700">
                    1.2-pip spread with no additional commission.
                  </p>

                  <p className="mt-2 text-[12px] font-bold text-slate-600">
                    1.2 × $10 = $12
                  </p>

                  <p className="mt-2 text-[14px] font-black text-brand-700">
                    Estimated Trading Cost: $12
                  </p>
                </div>

                {/* RAW ACCOUNT */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="text-[13px] font-black text-slate-950">
                    Account Two — Raw
                  </h4>

                  <p className="mt-2 text-[12px] leading-7 text-slate-700">
                    0.2-pip spread plus a total $7 commission
                    for opening and closing the position.
                  </p>

                  <p className="mt-2 text-[12px] font-bold text-slate-600">
                    (0.2 × $10) + $7 = $9
                  </p>

                  <p className="mt-2 text-[14px] font-black text-brand-700">
                    Estimated Trading Cost: $9
                  </p>
                </div>
              </div>

              {/* EXPLANATION */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <h4 className="text-[13px] font-black text-slate-900">
                  What Can We Learn from This Comparison?
                </h4>

                <p className="mt-2 text-[12px] leading-7 text-slate-700 sm:text-[13px]">
                  In this hypothetical example, the Raw account
                  costs $3 less per standard-lot round trip.
                  However, Raw accounts are not automatically
                  cheaper in every situation. Actual costs depend
                  on prevailing spreads, commissions, position
                  sizes, instruments and individual broker conditions.
                </p>
              </div>

              <p className="text-[11px] leading-6 text-slate-500">
                This illustration does not represent the pricing
                of any particular broker. It assumes a complete
                opening-and-closing transaction and excludes
                overnight financing, slippage, spread changes
                and currency conversion charges.
              </p>

              {/* INTERNAL EDUCATIONAL LINKS */}
              <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                <Link
                  href="/en/learn-trading/spread"
                  className="inline-flex min-h-[40px] items-center rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-[12px] font-black text-brand-700 transition hover:bg-brand-100"
                >
                  How to Calculate Forex Spreads →
                </Link>

                <Link
                  href="/en/lowest-spread-brokers"
                  className="inline-flex min-h-[40px] items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[12px] font-black text-slate-800 transition hover:bg-slate-50"
                >
                  Compare Low-Spread Forex Brokers →
                </Link>

                <Link
                  href="/en/compare-accounts"
                  className="inline-flex min-h-[40px] items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[12px] font-black text-slate-800 transition hover:bg-slate-50"
                >
                  Compare Forex Trading Accounts →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CHOOSING A FOREX BROKER
        ===================================================== */}
        <section
          id="choose-forex-broker"
          className={`${sectionClass} scroll-mt-24`}
        >
          <span className="text-[11px] font-black text-brand-700">
            Choosing a Broker for Your Trading Style
          </span>

          <h2 className={`mt-2 ${headingClass}`}>
            How to Choose the Right Forex Broker for Your Trading Strategy
          </h2>

          <p className={`mt-4 ${paragraphClass}`}>
            There is no single forex broker that necessarily
            offers the best conditions for every trader.
            Before comparing broker rankings, identify
            the instruments you intend to trade, your
            typical position size, holding period,
            preferred platform and tolerance for risk.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {tradingProfiles.map((profile) => (
              <article
                key={profile.title}
                className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
              >
                <h3 className={subheadingClass}>
                  {profile.title}
                </h3>

                <p className="mt-2 text-[12px] leading-7 text-slate-600 sm:text-[13px]">
                  {profile.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-[16px] border border-slate-200 bg-white p-4 sm:p-5">
            <h3 className={subheadingClass}>
              Before Opening a Live Forex Trading Account
            </h3>

            <p className="mt-2 text-[12px] leading-7 text-slate-700 sm:text-[13px]">
              Read the client agreement and verify the contracting
              legal entity, account fees, margin requirements,
              stop-out policies, withdrawal procedures and any
              restrictions affecting your strategy. Where available,
              test the platform with a demo account before
              committing funds. A broker's rating should not
              replace these checks.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#brokers-list"
              className="inline-flex min-h-[42px] items-center rounded-xl bg-brand-500 px-5 py-2.5 text-[12px] font-black text-white transition hover:bg-brand-600"
            >
              Back to Forex Broker Reviews ↑
            </a>

            <Link
              href="/en/best-brokers"
              className="inline-flex min-h-[42px] items-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[12px] font-black text-slate-800 transition hover:bg-slate-50"
            >
              Explore Best Forex Broker Lists →
            </Link>
          </div>
        </section>

        {/* =====================================================
            EDITORIAL DISCLOSURE
        ===================================================== */}
        <div className="rounded-[16px] border border-slate-200 bg-slate-100/60 px-4 py-4 sm:px-6">
          <h2 className="text-[13px] font-black text-slate-900">
            Editorial Information and Trading Risk Disclosure
          </h2>

          <p className="mt-2 text-[11px] leading-7 text-slate-600 sm:text-[12px]">
            Broker Alarab provides broker research and comparison
            information for educational and informational purposes.
            Ratings and comparisons do not constitute personalised
            investment advice or guarantee the safety of funds
            or potential profits. Forex and CFD trading involve
            substantial risks, and losses may be significant.
            Traders should independently verify regulatory
            status, contractual terms and account conditions
            before making financial decisions.
          </p>
        </div>

      </div>
    </section>
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
  const regulator = getParam(params.regulator);

  const supabase = await createClient();

  const { data, error } = await supabase
  .from("brokers")
  .select(
    "id,name,name_en,slug,rating,min_deposit,best_for,best_for_en,regulation,platforms,islamic_account,max_leverage,arabic_support,logo,real_account_url,demo_account_url"
  )
  .eq("publication_status", "published")
  .order("rating", { ascending: false });

  if (error) {
    throw new Error(`Failed to load published brokers: ${error.message}`);
  }

  const brokers = (data as Broker[] | null) ?? [];

  const filteredBrokers = brokers.filter((broker) => {
    const normalizedQuery = query.toLowerCase();

    const matchesQuery =
      !query ||
      (broker.name ?? "").toLowerCase().includes(normalizedQuery) ||
      (broker.name_en ?? "").toLowerCase().includes(normalizedQuery) ||
      (broker.best_for ?? "").toLowerCase().includes(normalizedQuery) ||
      (broker.best_for_en ?? "").toLowerCase().includes(normalizedQuery);

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

    const brokerRegulators = splitToBadges(broker.regulation, 20).map(
      (item) => item.toUpperCase()
    );

    const matchesRegulator =
      !regulator ||
      brokerRegulators.some(
        (item) => item === regulator.toUpperCase()
      );

    return (
      matchesQuery &&
      matchesDeposit &&
      matchesRating &&
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
        name: "Broker Alarab",
        alternateName: "بروكر العرب",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/og-image.webp`,
          contentUrl: `${BASE_URL}/og-image.webp`,
          width: 1560,
          height: 377,
          caption: "Broker Alarab",
        },
        description:
          "A bilingual financial research platform specialising in forex broker reviews, comparisons, regulation, trading platforms, and account conditions.",
        knowsAbout: [
          "Forex broker reviews",
          "Forex broker comparison",
          "Regulated forex brokers",
          "Forex trading platforms",
          "Broker regulation",
          "Online trading brokers",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Broker Alarab",
        alternateName: "بروكر العرب",
        description:
          "English and Arabic forex broker reviews, comparisons, trading tools, and regulatory research.",
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
        inLanguage: ["en", "ar"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BROKERS_PAGE_URL}#breadcrumb`,
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
            name: "Forex Broker Reviews",
            item: BROKERS_PAGE_URL,
          },
        ],
      },
      {
        "@type": ["WebPage", "CollectionPage"],
        "@id": `${BROKERS_PAGE_URL}#webpage`,
        url: BROKERS_PAGE_URL,
        name: "Forex Broker Reviews 2026: Compare Trusted Brokers",
        headline:
          "Forex broker reviews to help you choose the right broker",
        description:
          "Compare forex brokers by regulation, rating, minimum deposit, maximum leverage, trading platforms, and suitability for different traders.",
        isAccessibleForFree: true,
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
            name: "Forex broker reviews",
          },
          {
            "@type": "Thing",
            name: "Best forex brokers",
          },
          {
            "@type": "Thing",
            name: "Forex broker comparison",
          },
          {
            "@type": "Thing",
            name: "Regulated forex brokers",
          },
        ],
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        "@id": `${BROKERS_PAGE_URL}#broker-list`,
        name: "Forex broker review rankings",
        description:
          "A ranked list of forex brokers reviewed by Broker Alarab, including ratings, minimum deposits, platforms, leverage, and regulatory information.",
        url: `${BROKERS_PAGE_URL}#brokers-list`,
        numberOfItems: sortedBrokersForSchema.length,
        itemListOrder:
          "https://schema.org/ItemListOrderDescending",
        inLanguage: "en",
        itemListElement: sortedBrokersForSchema.map(
          (broker, index) => {
            const brokerName = getBrokerName(broker);
            const brokerUrl = `${BASE_URL}/en/brokers/${
              broker.slug ?? ""
            }`;
            const brokerId = `${brokerUrl}#organization`;
            const logoUrl = getAbsoluteUrl(broker.logo);

            return {
              "@type": "ListItem",
              position: index + 1,
              name: `${brokerName} review`,
              url: brokerUrl,
              item: {
                "@type": "Organization",
                "@id": brokerId,
                name: brokerName,
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

                description: `${brokerName} forex broker review covering regulation, minimum deposit, leverage, platforms, and account conditions.`,

                ...(broker.rating !== null &&
                broker.rating !== undefined
                  ? {
                      review: {
                        "@type": "Review",
                        "@id": `${brokerUrl}#broker-alarab-review`,
                        name: `${brokerName} forex broker review by Broker Alarab`,
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
          }
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${BROKERS_PAGE_URL}#faq`,
        url: `${BROKERS_PAGE_URL}#frequently-asked-questions`,
        name: "Frequently asked questions about forex broker reviews",
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
        inLanguage: "en",
      },
    ],
  };

  return (
    <>
      {!hasActiveFilters(params) && (
        <Script
          id="brokers-structured-data-en"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}

      <main dir="ltr" className="bg-slate-50">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-brand-100 bg-[#eaf3ff]">
          {/* BACKGROUND */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5f9ff] via-[#e8f2ff] to-[#cfe3ff]" />

            <div className="absolute left-[-120px] top-[-130px] h-[360px] w-[360px] rounded-full bg-white/70 blur-3xl" />

            <div className="absolute bottom-[-160px] right-[-100px] h-[420px] w-[420px] rounded-full bg-blue-300/25 blur-3xl" />

            <div className="absolute left-1/2 top-[120px] h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-[100px]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,91,184,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,91,184,0.025)_1px,transparent_1px)] bg-[size:46px_46px]" />
          </div>

          {/* MOBILE HERO */}
          <div className="relative px-4 pb-5 pt-4 sm:hidden">
            <div className="mx-auto max-w-[350px] text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/90 px-3 py-1.5 text-[9px] font-extrabold text-brand-700 shadow-sm backdrop-blur">
                <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-brand-50 text-[8px] text-brand-600">
                  ✓
                </span>

                Independent forex broker research
              </div>

              <h1 className="mx-auto mt-3 max-w-[325px] text-[27px] font-black leading-[1.08] tracking-[-0.025em] text-slate-950">
                Forex Broker Reviews

                <span className="mt-1 block text-[#1E5BB8]">
                  Find the Right Broker for You
                </span>
              </h1>

              <p className="mx-auto mt-3 max-w-[320px] text-[12px] font-medium leading-[1.8] text-slate-600">
                Compare regulation, minimum deposits, leverage, and
                trading platforms before choosing a forex broker.
              </p>

              <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-2">
                <a
                  href="#brokers-list"
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-brand-500 px-3 py-2 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.2)] transition hover:bg-brand-600"
                >
                  Browse Reviews
                  <span aria-hidden="true">↓</span>
                </a>

                <Link
                  href="/en/compare"
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl border border-white bg-white/90 px-3 py-2 text-[11px] font-black text-slate-800 shadow-sm backdrop-blur"
                >
                  Compare
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* TABLET + DESKTOP HERO */}
          <div className="relative mx-auto hidden w-full max-w-[1520px] px-6 py-7 sm:block lg:px-8">
            <div className="mx-auto max-w-[1160px] text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/90 px-3.5 py-1.5 text-[11px] font-extrabold text-brand-700 shadow-sm backdrop-blur">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-50 text-[9px] text-brand-600">
                  ✓
                </span>

                Independent forex broker research
              </div>

              <div className="mx-auto mt-3 text-[40px] font-black leading-[1.1] tracking-[-0.025em] text-slate-950 lg:text-[47px]">
                Forex Broker Reviews

                <span className="mt-1 block text-[#1E5BB8]">
                  Find and Compare Trusted Brokers
                </span>
              </div>

              <p className="mx-auto mt-3 max-w-[790px] text-[15px] font-medium leading-8 text-slate-600">
                Compare forex brokers by regulation, trading
                platforms, minimum deposit, leverage, and account
                conditions before choosing the right broker.
              </p>

              <div className="mx-auto mt-[18px] grid max-w-[800px] grid-cols-3 gap-2.5">
                <div className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white bg-white/90 px-3 py-2 text-[12px] font-extrabold text-slate-700 shadow-[0_6px_18px_rgba(30,91,184,0.07)] backdrop-blur">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[13px] text-emerald-700">
                    ✓
                  </span>

                  Regulation Reviewed
                </div>

                <div className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white bg-white/90 px-3 py-2 text-[12px] font-extrabold text-slate-700 shadow-[0_6px_18px_rgba(30,91,184,0.07)] backdrop-blur">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[13px] font-black text-brand-600">
                    $
                  </span>

                  Trading Conditions Compared
                </div>

                <div className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white bg-white/90 px-3 py-2 text-[12px] font-extrabold text-slate-700 shadow-[0_6px_18px_rgba(30,91,184,0.07)] backdrop-blur">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-[13px] font-black text-violet-600">
                    ▣
                  </span>

                  Platforms Evaluated
                </div>
              </div>

              <div className="mt-[18px] flex items-center justify-center gap-2.5">
                <a
                  href="#brokers-list"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#1E5BB8] px-6 py-2.5 text-[13px] font-extrabold text-white shadow-[0_8px_18px_rgba(30,91,184,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a98]"
                >
                  Browse Broker Reviews
                  <span aria-hidden="true">↓</span>
                </a>

                <Link
                  href="/en/compare"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-white bg-white/90 px-6 py-2.5 text-[13px] font-extrabold text-slate-800 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-white hover:text-brand-700"
                >
                  Compare Brokers
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <p className="mx-auto mt-2.5 max-w-[700px] text-[10px] font-medium leading-4 text-slate-500">
                Review each broker’s official regulatory entity,
                terms, fees, and risk disclosures before opening or
                funding an account.
              </p>
            </div>
          </div>
        </section>

        {/* BROKER LIST */}
        <section
          id="brokers-list"
          
className="mx-auto w-full max-w-[1520px] px-3 pb-2 pt-3 sm:px-6 sm:pb-2 sm:pt-6 lg:px-8 lg:pb-2 lg:pt-7"

        >
          {/* MOBILE LIST HEADER */}
          <div className="mb-2.5 lg:hidden">
            <div className="flex min-h-[48px] items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[20px] font-black leading-[1.15] text-slate-950">
                    Forex Broker Reviews
                  </h2>

                  <span className="inline-flex min-h-[22px] shrink-0 items-center rounded-full border border-brand-100 bg-brand-50 px-2 py-0.5 text-[9px] font-black text-brand-700">
                    {filteredBrokers.length} brokers
                  </span>
                </div>
              </div>

              <Link
                href="/en/compare"
                className="inline-flex min-h-[34px] shrink-0 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-[10px] font-black text-slate-700 shadow-sm"
              >
                Compare
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* DESKTOP LIST HEADER */}
          <div className="mb-3 hidden items-end justify-between gap-5 border-b border-slate-200 pb-2.5 lg:flex">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[25px] font-black leading-tight text-slate-950">
                  Forex Broker Reviews
                </h2>

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-700">
                  {filteredBrokers.length} brokers
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] font-bold text-slate-500">
                <span>
                  Showing {filteredBrokers.length} of {brokers.length}
                </span>

                <span className="text-slate-300">•</span>

                <span className="inline-flex items-center gap-1 text-brand-700">
                  <span aria-hidden="true">✓</span>
                  Ranked by the Broker Alarab editorial team
                </span>

                <span className="text-slate-300">•</span>

                <span>Use the filters to narrow the results</span>
              </div>
            </div>

            <Link
              href="/en/compare"
              className="inline-flex min-h-[38px] shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-[12px] font-black text-slate-700 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
              Compare Brokers
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* MOBILE FILTER */}
          <details className="group mb-2.5 overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.045)] lg:hidden">
            <summary className="flex min-h-[46px] cursor-pointer list-none items-center justify-between px-3 text-[12px] font-black text-slate-900">
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-[12px] text-brand-600">
                  ☷
                </span>

                Search and Filter
              </span>

              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-100 bg-white text-[12px] text-brand-600 transition group-open:rotate-45">
                ＋
              </span>
            </summary>

            <form
              action="/en/brokers#brokers-list"
              method="get"
              className="grid grid-cols-2 gap-2.5 border-t border-slate-100 p-3"
            >
              <FilterFields
                query={query}
                deposit={deposit}
                rating={rating}
                regulator={regulator}
                idPrefix="mobile"
                compact
              />
            </form>
          </details>

          {/* RESULTS + SIDEBAR */}
          <div className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
            {/* DESKTOP FILTER */}
            <aside className="sticky top-24 hidden overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.07)] lg:block">
              <div className="border-b border-slate-100 bg-gradient-to-br from-brand-50/70 to-white px-5 py-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg text-brand-600 shadow-sm">
                    ☷
                  </span>

                  <div>
                    <h3 className="text-lg font-black text-slate-950">
                      Filter Results
                    </h3>

                    <p className="mt-0.5 text-xs font-bold leading-5 text-slate-500">
                      Find brokers matching your requirements.
                    </p>
                  </div>
                </div>
              </div>

              <form
                action="/en/brokers#brokers-list"
                method="get"
                className="space-y-4 p-5"
              >
                <FilterFields
                  query={query}
                  deposit={deposit}
                  rating={rating}
                  regulator={regulator}
                  idPrefix="desktop"
                />
              </form>
            </aside>

            {/* BROKER CARDS */}
            <div className="min-w-0 space-y-3.5">
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
                    No Matching Brokers
                  </h3>

                  <p className="mt-2 text-sm font-bold text-slate-500">
                    Change or clear the filters to display more forex
                    brokers.
                  </p>

                  <Link
                    href="/en/brokers#brokers-list"
                    className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-black text-white transition hover:bg-brand-600"
                  >
                    View All Brokers
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        
{/* EDITORIAL GUIDE — ENGLISH */}
<BrokersEditorialGuideEn brokers={brokers} />


        {/* FAQ */}
        <section
          id="frequently-asked-questions"
          className="mx-auto w-full max-w-[1520px] scroll-mt-24 px-3 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20"
        >
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.045)]">
            <div className="border-b border-slate-100 bg-gradient-to-br from-brand-50/60 via-white to-white px-4 py-4 sm:px-6 sm:py-6">
              <span className="text-[9px] font-black text-brand-700 sm:text-[11px]">
                Forex broker selection guide
              </span>

              <h2 className="mt-1.5 text-[21px] font-black leading-[1.35] text-slate-950 sm:text-[28px] sm:leading-tight">
                Frequently Asked Questions About Forex Broker Reviews
              </h2>

              <p className="mt-2 max-w-[720px] text-[11px] font-medium leading-5 text-slate-600 sm:text-[13px] sm:leading-7">
                Concise answers to help you compare brokers and choose
                a forex broker matching your trading requirements.
              </p>
            </div>

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
