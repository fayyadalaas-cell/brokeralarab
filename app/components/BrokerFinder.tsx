"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Broker = {
  id: number;
  is_full_review: boolean;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  account_types?: string | null;
  regulation: string | null;
  regulation_short?: string | null;
  best_for: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  logo?: string | null;
  real_account_url?: string | null;

  priority_jordan?: number | null;
  priority_saudi?: number | null;
  priority_kuwait?: number | null;
  priority_uae?: number | null;
  priority_qatar?: number | null;
  priority_bahrain?: number | null;
  priority_oman?: number | null;
  priority_egypt?: number | null;

  score_safety?: number | null;
  score_fees?: number | null;
  score_platforms?: number | null;

  key_strength_ar?: string | null;
  key_weakness_ar?: string | null;
  who_should_use_ar?: string | null;
  expert_insight_ar?: string | null;
  broker_positioning_ar?: string | null;
  withdrawal_speed_ar?: string | null;
};

type CountryRanking = {
  country_slug: string;
  broker_id: number;
  rank_position: number;
  country_rating: number | null;
  best_for: string | null;
  local_note: string | null;
};

type Props = {
  brokers: Broker[];
  countryRankings?: CountryRanking[];
};

type Experience = "beginner" | "intermediate" | "pro";
type DepositRange = "under50" | "50to200" | "200to1000" | "over1000";
type PlatformPref = "any" | "mt4" | "mt5";

function normalize(text: string | null | undefined) {
  return (text || "").toLowerCase();
}

function cleanText(value: string | null | undefined, fallback = "غير محدد") {
  return (value || fallback).trim();
}

function shortText(value: string | null | undefined, max = 34) {
  const text = cleanText(value);
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function depositValue(range: DepositRange) {
  switch (range) {
    case "under50":
      return 50;
    case "50to200":
      return 200;
    case "200to1000":
      return 1000;
    case "over1000":
      return 100000;
  }
}

function getBrokerInitials(name: string | null | undefined) {
  return cleanText(name, "Broker").slice(0, 2).toUpperCase();
}

/* =========================================================
   REGULATION BADGES
========================================================= */

function RegulationBadges({ value }: { value: string }) {
  const regulations = Array.from(
    new Set(
      value
        .split(/\s*(?:\|+|[,،;\/\n])\s*/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  return (
    <div className="flex flex-col gap-1.5">

      {/* REGULATION TITLE */}

      <div className="flex items-center gap-1.5">

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-brand-600"
        >
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
        </svg>

        <span className="text-[11px] font-bold text-slate-500">
          التراخيص والرقابة
        </span>

      </div>

      {/* REGULATION BADGES */}

      <div
        dir="ltr"
        className="flex flex-wrap items-center gap-1.5"
      >

        {regulations.map((regulation) => (

          <span
            key={regulation}
            title={regulation}
            className="inline-flex min-h-[25px] max-w-full items-center justify-center rounded-md border border-[#d5e3f5] bg-[#f0f5fc] px-2 py-0.5 text-center text-[11px] font-bold leading-4 text-brand-600"
          >
            {regulation}
          </span>

        ))}

      </div>

    </div>
  );
}

function getOldCountryPriority(broker: Broker, country: string) {
  switch (country) {
    case "sa":
    case "saudi-arabia":
      return broker.priority_saudi ?? 3;
    case "jo":
    case "jordan":
      return broker.priority_jordan ?? 3;
    case "kw":
    case "kuwait":
      return broker.priority_kuwait ?? 3;
    case "ae":
    case "uae":
      return broker.priority_uae ?? 3;
    case "qa":
    case "qatar":
      return broker.priority_qatar ?? 3;
    case "bh":
    case "bahrain":
      return broker.priority_bahrain ?? 3;
    case "om":
    case "oman":
      return broker.priority_oman ?? 3;
    case "eg":
    case "egypt":
      return broker.priority_egypt ?? 3;
    default:
      return 3;
  }
}

function priorityScore(priority: number | null | undefined) {
  switch (priority) {
    case 1:
      return 8;
    case 2:
      return 4;
    case 3:
      return 1;
    default:
      return 0;
  }
}

function getRecommendationLabel(
  broker: Broker & {
    countryBestFor?: string | null;
  },
  index: number,
  experience: Experience | "",
  deposit: DepositRange | "",
  hasSearched: boolean
) {
  const bestFor = normalize(broker.countryBestFor || broker.best_for);

  if (index === 0) return "أفضل اختيار";
  if (bestFor.includes("مبتدئ") || bestFor.includes("المبتدئين")) return "مناسب للمبتدئين";
  if ((broker.min_deposit ?? 999999) <= 10) return "إيداع منخفض";
  if ((broker.min_deposit ?? 999999) <= 50) return "بداية سهلة";
  if (bestFor.includes("سكالب") || bestFor.includes("المحترفين")) return "للمتداول المحترف";
  if (bestFor.includes("اليومي") || bestFor.includes("النشط")) return "للتداول النشط";

  if (hasSearched) {
    if (experience === "beginner") return "يناسب خبرتك";
    if (experience === "intermediate") return "خيار متوازن";
    if (experience === "pro") return "مناسب للمحترفين";
    if (deposit === "under50") return "ميزانية منخفضة";
  }

  return "خيار موصى به";
}

function getBrokerHighlights(broker: Broker) {
  const strength =
    broker.key_strength_ar?.trim() ||
    broker.best_for?.trim() ||
    "اطلع على تفاصيل الوسيط";

  const accounts = (broker.account_types || "")
    .split(/\s*\|\|\s*|\s*\|\s*/)
    .map((item) => item.trim())
    .filter(Boolean);

  const platforms = (broker.platforms || "")
    .split(/\s*\|\s*|\s*,\s*/)
    .map((item) => item.trim())
    .filter(Boolean);

  const accountSummary =
    accounts.length > 0
      ? accounts.slice(0, 3).join(" · ") +
        (accounts.length > 3 ? ` +${accounts.length - 3}` : "")
      : "راجع أنواع الحسابات";

  const platformSummary =
    platforms.length > 0
      ? platforms.slice(0, 3).join(" · ") +
        (platforms.length > 3 ? ` +${platforms.length - 3}` : "")
      : "راجع منصات التداول";

  return {
    strength,
    accountSummary,
    platformSummary,
  };
}

function scoreText(value: number | null | undefined) {
  const v = Number(value || 0);
  if (v >= 4.5) return "ممتاز";
  if (v >= 4.1) return "جيد جدًا";
  if (v >= 3.7) return "جيد";
  return "متوسط";
}

function decisionPoint(
  broker: Broker & {
    countryBestFor?: string | null;
    countryLocalNote?: string | null;
  },
  index: number
) {
  const bestFor = normalize(broker.countryBestFor || broker.best_for);

  if (bestFor.includes("ecn")) return "حسابات ECN احترافية";
  if (bestFor.includes("مبتد")) return "مناسب للمبتدئين";
  if (bestFor.includes("عرب")) return "دعم عربي قوي";
  if (bestFor.includes("سبريد")) return "سبريد منخفض";
  if (bestFor.includes("سكالب")) return "مناسب للسكالبينج";
  if (bestFor.includes("ذهب")) return "قوي في تداول الذهب";
  if (bestFor.includes("نشط")) return "مناسب للتداول النشط";

  if ((broker.min_deposit ?? 999999) <= 10) return "إيداع منخفض";
  if ((broker.min_deposit ?? 999999) <= 50) return "بداية سهلة";

  return "خيار موصى به";
}

export default function BrokerFinder({ brokers, countryRankings = [] }: Props) {
  const [country, setCountry] = useState("");
  const [deposit, setDeposit] = useState<DepositRange | "">("");
  const [experience, setExperience] = useState<Experience | "">("");
  const [platform, setPlatform] = useState<PlatformPref | "">("");
  const [islamic, setIslamic] = useState("yes");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
  country: "",
  deposit: "" as DepositRange | "",
  experience: "" as Experience | "",
  platform: "" as PlatformPref | "",
  islamic: "yes",
});
  const [expandedMobileId, setExpandedMobileId] = useState<number | null>(null);

  
const canSearch =
  country !== "" &&
  (deposit !== "" || experience !== "" || platform !== "" || islamic !== "yes");


 const results = useMemo(() => {
  const {
    country,
    deposit,
    experience,
    platform,
    islamic,
  } = appliedFilters;

  const hasActiveFilters = hasSearched;

  const rankedBrokerIds = new Set(
    countryRankings
      .filter((row) => row.country_slug === country)
      .map((row) => row.broker_id)
  );

  const scored = brokers
  .filter((broker) => broker.is_full_review === true)
  .map((broker) => {
    let score = 0;

    const bestFor = normalize(broker.best_for);
    const platforms = normalize(broker.platforms);

    const hasIslamicAccount =
      normalize(broker.islamic_account).includes("yes") ||
      normalize(broker.islamic_account).includes("متوفر");

    const countryRanking = hasActiveFilters
      ? countryRankings.find(
          (row) =>
            row.country_slug === country &&
            row.broker_id === broker.id
        )
      : undefined;

    // =====================================================
    // COUNTRY RANKING
    // نفس ترتيب صفحات الدول
    // =====================================================

    const hasCountryRanking = Boolean(countryRanking);

    const countryPriority = countryRanking?.rank_position ?? 999;

    // =====================================================
    // GENERAL SCORE
    // يستخدم فقط للمفاضلة الثانوية
    // =====================================================

    score += (broker.rating || 0) * 5;

    // =====================================================
    // USER FILTERS
    // =====================================================

    if (hasActiveFilters) {
      const maxDeposit = depositValue(deposit as DepositRange);

      if (
        broker.min_deposit !== null &&
        broker.min_deposit <= maxDeposit
      ) {
        score += 5;
      }

      if (platform === "mt4" && platforms.includes("mt4")) {
        score += 3;
      }

      if (platform === "mt5" && platforms.includes("mt5")) {
        score += 3;
      }

      if (platform === "any") {
        score += 1;
      }

      if (islamic === "yes" && hasIslamicAccount) {
        score += 4;
      }

      if (islamic === "no") {
        score += 1;
      }

      const rankingBestFor = normalize(
        countryRanking?.best_for || broker.best_for
      );

      if (experience === "beginner") {
        if (
          rankingBestFor.includes("مبتدئ") ||
          rankingBestFor.includes("المبتدئين") ||
          rankingBestFor.includes("beginner") ||
          (broker.min_deposit ?? 999999) <= 50
        ) {
          score += 4;
        }
      }

      if (experience === "intermediate") {
        if (
          rankingBestFor.includes("النشط") ||
          rankingBestFor.includes("متداول") ||
          rankingBestFor.includes("اليومي") ||
          rankingBestFor.includes("active") ||
          rankingBestFor.includes("general")
        ) {
          score += 3;
        }
      }

      if (experience === "pro") {
        if (
          rankingBestFor.includes("المحترفين") ||
          rankingBestFor.includes("احترافي") ||
          rankingBestFor.includes("سكالب") ||
          rankingBestFor.includes("professional") ||
          rankingBestFor.includes("scalping")
        ) {
          score += 4;
        }
      }
    }

    return {
      ...broker,

      score,

      hasCountryRanking,

      countryPriority,

      countryRating:
        countryRanking?.country_rating ??
        broker.rating,

      countryBestFor:
        countryRanking?.best_for ??
        broker.best_for,

      countryLocalNote:
        countryRanking?.local_note ??
        null,
    };
  });

  return scored
    .sort((a, b) => {
      // ===================================================
      // 1. قبل البحث:
      // اعرض الأعلى تقييمًا بشكل طبيعي
      // ===================================================

      if (!hasActiveFilters) {
        return (b.rating || 0) - (a.rating || 0);
      }

      // ===================================================
      // 2. بعد اختيار الدولة:
      // الشركات الموجودة في country_broker_rankings أولًا
      // ===================================================

      if (a.hasCountryRanking !== b.hasCountryRanking) {
        return a.hasCountryRanking ? -1 : 1;
      }

      // ===================================================
      // 3. ترتيب الدولة هو العامل الأساسي
      // rank 1 ثم rank 2 ثم rank 3...
      // ===================================================

      if (
        a.hasCountryRanking &&
        b.hasCountryRanking &&
        a.countryPriority !== b.countryPriority
      ) {
        return a.countryPriority - b.countryPriority;
      }

      // ===================================================
      // 4. الفلاتر للمفاضلة الثانوية فقط
      // ===================================================

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // ===================================================
      // 5. التقييم العام آخر عامل
      // ===================================================

      return (b.rating || 0) - (a.rating || 0);
    })
    .slice(0, 3);
}, [
  brokers,
  countryRankings,
  appliedFilters,
  hasSearched,
]);

 function handleSearch() {
  if (!canSearch) return;

  setAppliedFilters({
    country,
    deposit,
    experience,
    platform,
    islamic,
  });

  setHasSearched(true);
  setShowMobileFilters(false);
  setExpandedMobileId(null);
}

  function toggleMobileRow(id: number) {
    setExpandedMobileId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      {/* DESKTOP - FINAL PREMIUM CLEAN VERSION */}
      <section
        dir="rtl"
        className="hidden overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:block"
      >
        <div className="p-4">
  <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-3.5">
    <div className="mb-3 flex items-center justify-between">
              <div>
              <h2 className="text-[24px] font-black tracking-[-0.02em] text-[#07111f]">
  اعثر على الوسيط المناسب لك
</h2>

<p className="mt-1 text-[15px] font-semibold text-slate-500">
  حدد احتياجاتك وسنرشح لك أفضل الوسطاء المناسبين لطريقة تداولك.
</p>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-600 shadow-sm ring-1 ring-slate-200">
                فلتر سريع
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">الدولة</label>
                <select
  aria-label="اختر الدولة"
  value={country}
  onChange={(e) => {
  setCountry(e.target.value);
  
}} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100">
                  
<option value="">اختر الدولة</option>
<option value="saudi-arabia">السعودية</option>
<option value="uae">الإمارات</option>
<option value="kuwait">الكويت</option>
<option value="qatar">قطر</option>
<option value="bahrain">البحرين</option>
<option value="oman">عُمان</option>
<option value="egypt">مصر</option>
<option value="jordan">الأردن</option>
<option value="iraq">العراق</option>
<option value="lebanon">لبنان</option>
<option value="palestine">فلسطين</option>
<option value="algeria">الجزائر</option>
<option value="libya">ليبيا</option>
<option value="syria">سوريا</option>
<option value="yemen">اليمن</option>
<option value="other">دول أخرى</option>

                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">قيمة الإيداع</label>
                <select
  aria-label="اختر مبلغ الإيداع"
  value={deposit} onChange={(e) => {
  setDeposit(e.target.value as DepositRange | "");
  
}} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100">
                  <option value="">مبلغ الإيداع</option>
                  <option value="under50">أقل من 50$</option>
                  <option value="50to200">من 50$ إلى 200$</option>
                  <option value="200to1000">من 200$ إلى 1000$</option>
                  <option value="over1000">أكثر من 1000$</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">مستوى الخبرة</label>
                <select
  aria-label="اختر مستوى الخبرة"
  value={experience}
  onChange={(e) => {
  setExperience(e.target.value as Experience | "");
  
}} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100">
                  <option value="">اختر مستوى الخبرة</option>
                  <option value="beginner">مبتدئ</option>
                  <option value="intermediate">متوسط</option>
                  <option value="pro">محترف</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">المنصة</label>
                <select
  aria-label="اختر منصة التداول"
  value={platform}
  onChange={(e) => {
  setPlatform(e.target.value as PlatformPref | "");
  
}} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100">
                  <option value="">اختر المنصة</option>
                  <option value="any">أي منصة</option>
                  <option value="mt4">MT4</option>
                  <option value="mt5">MT5</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">حساب إسلامي</label>
                <select
  aria-label="اختر تفضيل الحساب الإسلامي"
  value={islamic}
  onChange={(e) => {
  setIslamic(e.target.value);
  
}}
className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100">
                  <option value="yes">نعم</option>
                  <option value="no">لا يهم</option>
                </select>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-500">
                يتم ترتيب النتائج حسب بيانات صفحات الدول، ثم التقييم العام ومطابقة التفضيلات.
              </p>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className={`inline-flex min-w-[250px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition ${
                  canSearch
                    ? "bg-brand-500 text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] hover:bg-brand-600"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
               اعرض أفضل الوسطاء لي
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-xl font-black text-[#07111f]">
  {hasSearched
    ? "أفضل النتائج المناسبة لك"
    : "الأكثر اختياراً من المتداولين"}
</div>

<div className="mt-1 text-sm font-semibold text-slate-500">
  {hasSearched
    ? "تم ترتيب النتائج بحسب اختياراتك"
    : "خيارات شائعة بناءً على التقييم والبيانات الحالية"}
</div>
            </div>

            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600">
              ترتيب مبني على البيانات
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-4">
            {results.map((broker, index) => {
              const recommendation = getRecommendationLabel(
  broker,
  index,
  appliedFilters.experience,
  appliedFilters.deposit,
  hasSearched
);
              const openAccountHref = broker.real_account_url || `/brokers/${broker.slug}`;
              const strength = decisionPoint(broker, index);
              
              const reg = broker.regulation_short || broker.regulation || "غير محدد";
              const rating = broker.countryRating ?? broker.rating;

              return (
                <article
  key={broker.id}
  className={`group relative flex flex-col overflow-hidden rounded-[24px] border bg-white/95 p-4 backdrop-blur-sm transition duration-300 ${
    index === 0
      ? "border-brand-400 shadow-[0_18px_45px_rgba(37,99,235,0.13)]"
      : "border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:-translate-y-[3px] hover:shadow-[0_15px_35px_rgba(15,23,42,0.10)]"
  }`}
>
                  {index === 0 && (
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />
                  )}

                  <div className="flex items-start justify-between gap-4 md:max-xl:relative md:max-xl:gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-4 md:max-xl:w-full md:max-xl:flex-none md:max-xl:flex-col md:max-xl:gap-0">
                      <Link
                        href={`/brokers/${broker.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-[78px] w-[78px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition hover:scale-[1.03] md:max-xl:h-[60px] md:max-xl:w-[60px] md:max-xl:self-start"
                      >
                       {broker.logo ? (
  <img
    src={broker.logo}
    alt={broker.name || "Broker logo"}
    className="max-h-full max-w-full object-contain mix-blend-multiply"
    style={{
      transform: broker.name?.toLowerCase().includes("capital")
        ? "scale(0.85)"
        : "scale(1)",
    }}
  />
) : (
                          <span className="text-lg font-black text-brand-500">
                            {getBrokerInitials(broker.name)}
                          </span>
                        )}
                      </Link>

                      <div className="flex min-h-[78px] min-w-0 flex-1 flex-col justify-center md:max-xl:min-h-0 md:max-xl:w-full md:max-xl:flex-none md:max-xl:items-center md:max-xl:text-center md:max-xl:-mt-1">
                        <div className="flex items-start gap-2">
                          <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 px-2 text-xs font-black text-white">
                            {index + 1}
                          </span>

                          <Link
                            href={`/brokers/${broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block max-w-[170px] leading-[1.15] text-[20px] font-black text-[#07111f] transition hover:text-brand-500 md:max-xl:min-w-0 md:max-xl:flex-1 md:max-xl:break-words"
                            title={broker.name || ""}
                          >
                            {broker.name}
                          </Link>
                        </div>

                        <div className="mt-2">
                          <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[11px] font-extrabold text-brand-600">
                            {recommendation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-[24px] border border-brand-100 bg-brand-50 px-4 py-3 text-center md:max-xl:absolute md:max-xl:left-0 md:max-xl:top-0 md:max-xl:rounded-xl md:max-xl:px-1.5 md:max-xl:py-1">
                      <div className="text-2xl font-black text-brand-600 md:max-xl:text-lg md:max-xl:leading-5">
                        {rating?.toFixed(2) ?? "—"}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500">من 5</div>
                    </div>
                  </div>

                  {/* QUICK SUMMARY */}

<div className="mt-3 rounded-[16px] border border-slate-100 bg-slate-50/80 px-3 py-2.5">

  <div className="text-xs font-black text-slate-500">
    الخلاصة السريعة
  </div>

  <div className="mt-1.5 grid gap-1 text-sm font-bold leading-5 text-slate-700">

    <div>
      ✓ {strength}
    </div>

    <div>
      ✓ مناسب حسب التقييم والأمان والرسوم
    </div>

  </div>

</div>

{/* BROKER KEY METRICS */}

<div className="mt-3 grid grid-cols-3 gap-2">

  {/* MINIMUM DEPOSIT */}

  <div className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-center">

    <div className="text-[11px] font-bold text-slate-500">
      الإيداع
    </div>

    <div className="mt-0.5 text-sm font-black text-[#07111f]">
      {broker.min_deposit !== null
        ? `$${broker.min_deposit}`
        : "غير محدد"}
    </div>

  </div>

  {/* SAFETY */}

  <div className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-center">

    <div className="text-[11px] font-bold text-slate-500">
      الأمان
    </div>

    <div className="mt-0.5 text-sm font-black text-[#07111f]">
      {scoreText(broker.score_safety ?? rating)}
    </div>

  </div>

  {/* TRADING FEES */}

  <div className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-center">

    <div className="text-[11px] font-bold text-slate-500">
      الرسوم
    </div>

    <div className="mt-0.5 text-sm font-black text-[#07111f]">
      {scoreText(broker.score_fees ?? rating)}
    </div>

  </div>

</div>

                  {/* REGULATION BADGES */}

<div className="my-2.5">
  <RegulationBadges value={reg} />
</div>

                 

                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                    <Link href={`/brokers/${broker.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-[#07111f] transition hover:bg-slate-50">
                      اقرأ التقييم
                    </Link>

                    <Link href={openAccountHref} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center justify-center rounded-[16px] bg-gradient-to-l from-brand-500 to-brand-600 px-4 py-3 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34)] md:max-xl:whitespace-nowrap md:max-xl:px-2">
                     <span>فتح حساب<span className="md:max-xl:hidden"> الآن</span></span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
            {/* =========================================================
    MOBILE — BROKER FINDER PREMIUM COMPACT V2
========================================================= */}

<section
  dir="rtl"
  className="w-full min-w-0 lg:hidden"
>

  {/* =====================================================
      MOBILE FILTER TOGGLE
  ====================================================== */}

  <button
    type="button"
    aria-expanded={showMobileFilters}
    aria-controls="mobile-broker-filters"
    onClick={() => setShowMobileFilters((prev) => !prev)}
    className="flex w-full min-w-0 items-center gap-3 rounded-[15px] border border-[#d5e3f5] bg-[#edf3fc] px-3 py-3 text-right transition active:bg-blue-100"
  >

    {/* FILTER ICON */}

    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-white text-[#194b92]">

      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >

        <path d="M4 7h16M4 12h16M4 17h16" />

        <circle cx="8" cy="7" r="2" fill="white" />

        <circle cx="15" cy="12" r="2" fill="white" />

        <circle cx="10" cy="17" r="2" fill="white" />

      </svg>

    </div>

    {/* FILTER TITLE */}

    <div className="min-w-0 flex-1">

      <div className="text-[14px] font-black leading-6 text-[#10233f]">

        اعثر على الوسيط المناسب لك

      </div>

      <div className="mt-0.5 text-[11px] font-medium leading-5 text-slate-600">

        حدد تفضيلاتك للحصول على ترشيحات أدق

      </div>

    </div>

    {/* EXPAND BUTTON */}

    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#194b92] text-white">

      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`transition-transform duration-200 ${
          showMobileFilters ? "rotate-180" : ""
        }`}
      >

        <path d="m6 9 6 6 6-6" />

      </svg>

    </span>

  </button>

  {/* =====================================================
      MOBILE FILTER FORM
  ====================================================== */}

  {showMobileFilters && (

    <div
      id="mobile-broker-filters"
      className="mt-2 rounded-[15px] border border-slate-200 bg-white p-3"
    >

      <div className="mb-3">

        <h3 className="text-[14px] font-black text-[#10233f]">

          حدد تفضيلاتك

        </h3>

        <p className="mt-1 text-[11px] font-medium leading-5 text-slate-500">

          اختر الدولة والإيداع والخبرة والمنصة المناسبة لك.

        </p>

      </div>

      <div className="grid min-w-0 grid-cols-2 gap-2.5">

        {/* COUNTRY */}

        <div className="col-span-2 min-w-0">

          <label
            htmlFor="mobile-finder-country"
            className="mb-1.5 block text-[11px] font-bold text-slate-600"
          >

            الدولة

          </label>

          <select
            id="mobile-finder-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-3 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
          >

            <option value="">اختر الدولة</option>
            <option value="saudi-arabia">السعودية</option>
            <option value="uae">الإمارات</option>
            <option value="kuwait">الكويت</option>
            <option value="qatar">قطر</option>
            <option value="bahrain">البحرين</option>
            <option value="oman">عُمان</option>
            <option value="egypt">مصر</option>
            <option value="jordan">الأردن</option>
            <option value="iraq">العراق</option>
            <option value="lebanon">لبنان</option>
            <option value="palestine">فلسطين</option>
            <option value="algeria">الجزائر</option>
            <option value="libya">ليبيا</option>
            <option value="syria">سوريا</option>
            <option value="yemen">اليمن</option>
            <option value="other">دول أخرى</option>

          </select>

        </div>

        {/* DEPOSIT */}

        <div className="min-w-0">

          <label
            htmlFor="mobile-finder-deposit"
            className="mb-1.5 block text-[11px] font-bold text-slate-600"
          >

            قيمة الإيداع

          </label>

          <select
            id="mobile-finder-deposit"
            value={deposit}
            onChange={(e) =>
              setDeposit(e.target.value as DepositRange | "")
            }
            className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
          >

            <option value="">اختر الإيداع</option>
            <option value="under50">أقل من 50$</option>
            <option value="50to200">50$ - 200$</option>
            <option value="200to1000">200$ - 1000$</option>
            <option value="over1000">أكثر من 1000$</option>

          </select>

        </div>

        {/* EXPERIENCE */}

        <div className="min-w-0">

          <label
            htmlFor="mobile-finder-experience"
            className="mb-1.5 block text-[11px] font-bold text-slate-600"
          >

            مستوى الخبرة

          </label>

          <select
            id="mobile-finder-experience"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value as Experience | "")
            }
            className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
          >

            <option value="">اختر الخبرة</option>
            <option value="beginner">مبتدئ</option>
            <option value="intermediate">متوسط</option>
            <option value="pro">محترف</option>

          </select>

        </div>

        {/* PLATFORM */}

        <div className="min-w-0">

          <label
            htmlFor="mobile-finder-platform"
            className="mb-1.5 block text-[11px] font-bold text-slate-600"
          >

            منصة التداول

          </label>

          <select
            id="mobile-finder-platform"
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value as PlatformPref | "")
            }
            className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
          >

            <option value="">اختر المنصة</option>
            <option value="any">أي منصة</option>
            <option value="mt4">MT4</option>
            <option value="mt5">MT5</option>

          </select>

        </div>

        {/* ISLAMIC ACCOUNT */}

        <div className="min-w-0">

          <label
            htmlFor="mobile-finder-islamic"
            className="mb-1.5 block text-[11px] font-bold text-slate-600"
          >

            حساب إسلامي

          </label>

          <select
            id="mobile-finder-islamic"
            value={islamic}
            onChange={(e) => setIslamic(e.target.value)}
            className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
          >

            <option value="yes">نعم</option>
            <option value="no">لا يهم</option>

          </select>

        </div>

      </div>

      {/* SEARCH BUTTON */}

      <button
        type="button"
        onClick={handleSearch}
        disabled={!canSearch}
        className={`mt-3 flex min-h-[46px] w-full items-center justify-center rounded-[11px] px-3 text-[13px] font-black transition ${
          canSearch
            ? "bg-[#194b92] text-white active:bg-[#102e55]"
            : "cursor-not-allowed bg-slate-200 text-slate-400"
        }`}
      >

        اعرض أفضل الوسطاء لي

      </button>

    </div>

  )}

  {/* =====================================================
      MOBILE RESULTS HEADER
  ====================================================== */}

  <div className="mb-3 mt-5 flex min-w-0 items-center justify-between gap-2">

    <div className="min-w-0 flex-1">

      <h2 className="text-[17px] font-black leading-7 text-[#10233f]">

        {hasSearched
          ? "أفضل النتائج المناسبة لك"
          : "الأعلى تقييماً من الوسطاء"}

      </h2>

      <p className="mt-0.5 text-[11px] font-medium leading-5 text-slate-500">

        {hasSearched
          ? "تم ترتيب النتائج حسب اختياراتك"
          : "اختيارات مبنية على التقييم والبيانات"}

      </p>

    </div>

    <span className="shrink-0 rounded-md bg-[#e7effa] px-2 py-1 text-[10px] font-bold text-[#194b92]">

      ترتيب ذكي

    </span>

  </div>

  {/* =====================================================
      MOBILE BROKER RESULTS
  ====================================================== */}

  <div className="space-y-2">

    {results.map((broker, index) => {

      const isOpen = expandedMobileId === broker.id;

      const recommendation = getRecommendationLabel(
        broker,
        index,
        appliedFilters.experience,
        appliedFilters.deposit,
        hasSearched
      );

      const openAccountHref =
        broker.real_account_url || `/brokers/${broker.slug}`;

      const strength = decisionPoint(broker, index);

      const reg =
        broker.regulation_short ||
        broker.regulation ||
        "غير محدد";

      const rating = broker.countryRating ?? broker.rating;

      return (

        <article
          key={broker.id}
          className={`min-w-0 overflow-hidden rounded-[15px] border bg-white transition-colors duration-200 ${
            index === 0
              ? "border-brand-400"
              : "border-slate-200"
          }`}
        >

          {/* =============================================
              BROKER ROW
          ============================================== */}

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={`mobile-broker-details-${broker.id}`}
            onClick={() => toggleMobileRow(broker.id)}
            className={`w-full min-w-0 px-2.5 py-3 text-right transition ${
              isOpen
                ? "bg-[#f5f8fd]"
                : "bg-white active:bg-slate-50"
            }`}
          >

            <div className="grid min-w-0 grid-cols-[14px_clamp(72px,24vw,100px)_minmax(0,1fr)_44px_16px] items-center gap-2.5">

  {/* BROKER RANK */}

  <span className="flex h-[22px] w-[14px] items-center justify-center text-[12px] font-black text-slate-400">

    {index + 1}

  </span>

  {/* BROKER LOGO */}

  <div className="flex h-[56px] w-full min-w-0 items-center justify-center overflow-hidden px-1">

    {broker.logo ? (

      <img
        src={broker.logo}
        alt={`شعار ${broker.name}`}
        loading="lazy"
        className="block h-[52px] w-full max-w-full object-contain object-center mix-blend-multiply"
        style={{
          transform: "scale(1.08)",
        }}
      />

    ) : (

      <span className="text-[13px] font-black text-[#194b92]">

        {getBrokerInitials(broker.name)}

      </span>

    )}

  </div>

              {/* BROKER NAME + LABEL */}

              <div className="min-w-0">

                <div
                  className="break-words text-[15px] font-black leading-5 text-[#10233f]"
                  title={broker.name || ""}
                >

                  {broker.name}

                </div>

                <span className="mt-1 inline-block max-w-full text-[10px] font-bold leading-4 text-[#194b92]">

                  {recommendation}

                </span>

              </div>

              {/* BROKER RATING */}

              <div className="flex shrink-0 flex-col items-center justify-center text-center">

                <span className="text-[17px] font-black leading-5 text-[#194b92]">

                  {rating?.toFixed(2) ?? "—"}

                </span>

                <span className="mt-0.5 text-[9px] font-medium text-slate-400">

                  من 5

                </span>

              </div>

              {/* EXPAND CHEVRON */}

              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`shrink-0 text-[#194b92] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >

                <path d="m6 9 6 6 6-6" />

              </svg>

            </div>

          </button>

          {/* =============================================
              EXPANDED BROKER DETAILS
          ============================================== */}

          {isOpen && (

            <div
              id={`mobile-broker-details-${broker.id}`}
              className="border-t border-slate-200 px-3 pb-3 pt-3"
            >

              {/* QUICK SUMMARY */}

              <div className="rounded-[10px] bg-[#f5f8fc] p-3">

                <div className="text-[11px] font-black text-slate-500">

                  الخلاصة السريعة

                </div>

                <div className="mt-1.5 space-y-1 text-[12px] font-bold leading-6 text-[#10233f]">

                  <div className="flex items-start gap-2">

                    <span className="text-emerald-600">✓</span>

                    <span>{strength}</span>

                  </div>

                </div>

              </div>

              {/* BROKER METRICS */}

              <div className="mt-3 grid grid-cols-3 gap-2">

                {/* DEPOSIT */}

                <div className="min-w-0 rounded-[10px] border border-slate-200 bg-white px-1 py-2.5 text-center">

                  <div className="text-[10px] font-medium text-slate-500">

                    الإيداع

                  </div>

                  <div className="mt-1 break-words text-[13px] font-black text-[#10233f]">

                    {broker.min_deposit !== null
                      ? `$${broker.min_deposit}`
                      : "غير محدد"}

                  </div>

                </div>

                {/* SAFETY */}

                <div className="min-w-0 rounded-[10px] border border-slate-200 bg-white px-1 py-2.5 text-center">

                  <div className="text-[10px] font-medium text-slate-500">

                    الأمان

                  </div>

                  <div className="mt-1 text-[13px] font-black text-[#10233f]">

                    {broker.score_safety != null
                      ? scoreText(broker.score_safety)
                      : "غير محدد"}

                  </div>

                </div>

                {/* FEES */}

                <div className="min-w-0 rounded-[10px] border border-slate-200 bg-white px-1 py-2.5 text-center">

                  <div className="text-[10px] font-medium text-slate-500">

                    الرسوم

                  </div>

                  <div className="mt-1 text-[13px] font-black text-[#10233f]">

                    {broker.score_fees != null
                      ? scoreText(broker.score_fees)
                      : "غير محدد"}

                  </div>

                </div>

              </div>

              {/* REGULATION BADGES */}

              <div className="mt-3">

                <RegulationBadges value={reg} />

              </div>

              {/* ACTION BUTTONS */}

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">

                <Link
                  href={`/brokers/${broker.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-center rounded-[10px] border border-slate-200 bg-white px-2 text-[12px] font-black text-[#10233f]"
                >

                  اقرأ التقييم

                </Link>

                <Link
                  href={openAccountHref}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex min-h-[44px] items-center justify-center rounded-[10px] bg-[#194b92] px-2 text-[12px] font-black text-white"
                >

                  فتح حساب

                </Link>

              </div>

            </div>

          )}

        </article>

      );

    })}

  </div>

</section>
    </>
  );
}