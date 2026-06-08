"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
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
  const [expandedMobileId, setExpandedMobileId] = useState<number | null>(null);

  const canSearch = country !== "" && deposit !== "" && experience !== "" && platform !== "";

  const results = useMemo(() => {
    const hasActiveFilters = hasSearched && canSearch;

    const scored = brokers.map((broker) => {
      let score = 0;

      const reg = normalize(broker.regulation);
      const bestFor = normalize(broker.best_for);
      const platforms = normalize(broker.platforms);
      const hasIslamicAccount =
        normalize(broker.islamic_account).includes("yes") ||
        normalize(broker.islamic_account).includes("متوفر");

      const countryRanking = countryRankings.find(
        (row) => row.country_slug === country && row.broker_id === broker.id
      );

      const oldPriority = getOldCountryPriority(broker, country);
      const countryPriority = countryRanking?.rank_position ?? oldPriority;

      score += (broker.rating || 0) * 5;

      if (countryRanking) {
        score += 30;
        score += Math.max(0, 12 - countryRanking.rank_position);
        score += (countryRanking.country_rating || broker.rating || 0) * 4;
      } else {
        score += priorityScore(oldPriority);
      }

      if (hasActiveFilters) {
        const maxDeposit = depositValue(deposit as DepositRange);

        if (broker.min_deposit !== null && broker.min_deposit <= maxDeposit) score += 4;

        if (platform === "mt4" && platforms.includes("mt4")) score += 2;
        if (platform === "mt5" && platforms.includes("mt5")) score += 2;
        if (platform === "any") score += 1;

        if (islamic === "yes" && hasIslamicAccount) score += 3;
        if (islamic === "no") score += 1;

        if (experience === "beginner") {
          if (
            bestFor.includes("مبتدئ") ||
            bestFor.includes("المبتدئين") ||
            (broker.min_deposit ?? 999999) <= 50
          ) {
            score += 3;
          }
        }

        if (experience === "intermediate") {
          if (
            bestFor.includes("النشط") ||
            bestFor.includes("متداول") ||
            bestFor.includes("اليومي")
          ) {
            score += 2;
          }
        }

        if (experience === "pro") {
          if (
            bestFor.includes("المحترفين") ||
            bestFor.includes("احترافي") ||
            bestFor.includes("سكالب")
          ) {
            score += 3;
          }
        }

        if (
          [
            "sa",
            "saudi-arabia",
            "ae",
            "uae",
            "kw",
            "kuwait",
            "qa",
            "qatar",
            "bh",
            "bahrain",
            "om",
            "oman",
            "eg",
            "egypt",
            "jo",
            "jordan",
            "iraq",
            "libya",
            "syria",
          ].includes(country)
        ) {
          if (
            reg.includes("cysec") ||
            reg.includes("fca") ||
            reg.includes("asic") ||
            reg.includes("fsa") ||
            reg.includes("fsc")
          ) {
            score += 2;
          }
        }
      }

      return {
        ...broker,
        score,
        countryPriority,
        countryRating: countryRanking?.country_rating ?? broker.rating,
        countryBestFor: countryRanking?.best_for ?? broker.best_for,
        countryLocalNote: countryRanking?.local_note ?? null,
      };
    });

    return scored
      .sort((a, b) => {
        if ((a.countryPriority ?? 999) !== (b.countryPriority ?? 999)) {
          return (a.countryPriority ?? 999) - (b.countryPriority ?? 999);
        }

        if (b.score !== a.score) return b.score - a.score;

        return (b.rating || 0) - (a.rating || 0);
      })
      .slice(0, 3);
  }, [brokers, countryRankings, country, deposit, experience, islamic, platform, hasSearched, canSearch]);

  function handleSearch() {
    if (!canSearch) return;
    setHasSearched(true);
    setShowMobileFilters(false);
    setExpandedMobileId(results[0]?.id ?? null);
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
        <div className="p-6">
          <div className="rounded-[26px] border border-slate-200 bg-[#f8fbff] p-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] font-black tracking-[-0.02em] text-[#07111f]">
                  حدد تفضيلاتك
                </h2>

                <p className="mt-1 text-[15px] font-semibold text-slate-500">
                  اختر الدولة، الإيداع، الخبرة والمنصة لتحصل على ترشيحات أدق.
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-600 shadow-sm ring-1 ring-slate-200">
                فلتر سريع
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">الدولة</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
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
                  <option value="libya">ليبيا</option>
                  <option value="syria">سوريا</option>
                  <option value="other">دول أخرى</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">قيمة الإيداع</label>
                <select value={deposit} onChange={(e) => setDeposit(e.target.value as DepositRange | "")} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
                  <option value="">مبلغ الإيداع</option>
                  <option value="under50">أقل من 50$</option>
                  <option value="50to200">من 50$ إلى 200$</option>
                  <option value="200to1000">من 200$ إلى 1000$</option>
                  <option value="over1000">أكثر من 1000$</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">مستوى الخبرة</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value as Experience | "")} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
                  <option value="">اختر مستوى الخبرة</option>
                  <option value="beginner">مبتدئ</option>
                  <option value="intermediate">متوسط</option>
                  <option value="pro">محترف</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">المنصة</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value as PlatformPref | "")} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
                  <option value="">اختر المنصة</option>
                  <option value="any">أي منصة</option>
                  <option value="mt4">MT4</option>
                  <option value="mt5">MT5</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">حساب إسلامي</label>
                <select value={islamic} onChange={(e) => setIslamic(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
                  <option value="yes">نعم</option>
                  <option value="no">لا يهم</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-500">
                يتم ترتيب النتائج حسب بيانات صفحات الدول، ثم التقييم العام ومطابقة التفضيلات.
              </p>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className={`inline-flex min-w-[250px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition ${
                  canSearch
                    ? "bg-[#2563eb] text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] hover:bg-[#1d4ed8]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                اعرض أفضل 3 شركات الآن
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="text-xl font-black text-[#07111f]">أفضل 3 نتائج لك</div>
              <div className="mt-1 text-sm font-semibold text-slate-500">
                {hasSearched ? "تم ترتيب النتائج بحسب اختياراتك" : "هذه أفضل الخيارات الحالية"}
              </div>
            </div>

            <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-extrabold text-[#1d4ed8]">
              ترتيب مبني على البيانات
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-5">
            {results.map((broker, index) => {
              const recommendation = getRecommendationLabel(broker, index, experience, deposit, hasSearched);
              const openAccountHref = broker.real_account_url || `/brokers/${broker.slug}`;
              const strength = decisionPoint(broker, index);
              const weakness = broker.key_weakness_ar || "راجع شروط التداول";
              const withdrawal = broker.withdrawal_speed_ar || "حسب الطريقة";
              const reg = broker.regulation_short || broker.regulation || "غير محدد";
              const rating = broker.countryRating ?? broker.rating;

              return (
                <article
                  key={broker.id}
                  className={`group relative flex min-h-[500px] flex-col overflow-hidden rounded-[30px] border bg-white/95 p-5 backdrop-blur-sm transition duration-300 ${
                    index === 0
                      ? "border-[#60a5fa] shadow-[0_28px_70px_rgba(37,99,235,0.18)]"
                      : "border-slate-200 shadow-[0_12px_35px_rgba(15,23,42,0.07)] hover:-translate-y-[4px] hover:shadow-[0_20px_50px_rgba(15,23,42,0.11)]"
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#60a5fa] via-[#2563eb] to-[#1d4ed8]" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <Link
                        href={`/brokers/${broker.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-[78px] w-[78px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition hover:scale-[1.03]"
                      >
                        {broker.logo ? (
                          <img
                            src={broker.logo}
                            alt={broker.name || "Broker logo"}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-lg font-black text-[#2563eb]">
                            {getBrokerInitials(broker.name)}
                          </span>
                        )}
                      </Link>

                      <div className="flex min-h-[78px] min-w-0 flex-1 flex-col justify-center">
                        <div className="flex items-start gap-2">
                          <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#2563eb] px-2 text-xs font-black text-white">
                            {index + 1}
                          </span>

                          <Link
                            href={`/brokers/${broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block max-w-[170px] leading-[1.15] text-[20px] font-black text-[#07111f] transition hover:text-[#2563eb]"
                            title={broker.name || ""}
                          >
                            {broker.name}
                          </Link>
                        </div>

                        <div className="mt-2">
                          <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[11px] font-extrabold text-[#1d4ed8]">
                            {recommendation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-[24px] border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-center">
                      <div className="text-2xl font-black text-[#1d4ed8]">
                        {rating?.toFixed(1) ?? "—"}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500">من 5</div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-slate-100 bg-slate-50/80 p-4">
                    <div className="text-xs font-black text-slate-500">الخلاصة السريعة</div>
                    <div className="mt-2 grid gap-2 text-sm font-bold text-slate-700">
                      <div>✓ {strength}</div>
                      <div>✓ مناسب حسب التقييم والأمان والرسوم</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
                      <div className="text-[11px] font-bold text-slate-500">الإيداع</div>
                      <div className="mt-1 text-sm font-black text-[#07111f]">
                        {broker.min_deposit !== null ? `$${broker.min_deposit}` : "غير محدد"}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
                      <div className="text-[11px] font-bold text-slate-500">الأمان</div>
                      <div className="mt-1 text-sm font-black text-[#07111f]">
                        {scoreText(broker.score_safety ?? rating)}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
                      <div className="text-[11px] font-bold text-slate-500">الرسوم</div>
                      <div className="mt-1 text-sm font-black text-[#07111f]">
                        {scoreText(broker.score_fees ?? rating)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex h-[44px] items-center justify-center rounded-[18px] bg-slate-50 px-4 text-center text-[12px] leading-[1.5] font-bold text-slate-700 ring-1 ring-slate-200">
                      <span className="line-clamp-2 w-full">
                        التراخيص: {reg}
                      </span>
                    </div>

                    <div className="flex h-[54px] items-center justify-center rounded-[18px] bg-slate-50 px-4 text-center text-[12px] leading-[1.5] font-bold text-slate-700 ring-1 ring-slate-200">
                      <span className="line-clamp-2 w-full">
                        السحب: {withdrawal || "حسب الطريقة"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-xs font-bold text-orange-700 ring-1 ring-orange-100">
                    تنبيه: {shortText(weakness, 60)}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                    <Link href={`/brokers/${broker.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-[#07111f] transition hover:bg-slate-50">
                      اقرأ التقييم
                    </Link>

                    <Link href={openAccountHref} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center justify-center rounded-[16px] bg-gradient-to-l from-[#2563eb] to-[#1d4ed8] px-4 py-3 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34)]">
                      فتح حساب الآن
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
            {/* MOBILE - PREMIUM COMPACT */}
      <section
        dir="rtl"
        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] lg:hidden"
      >
        <div className="px-4 pb-4 pt-2">
          <button
            type="button"
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-[20px] border border-[#bfdbfe] bg-white px-4 py-3.5 text-right shadow-[0_12px_30px_rgba(37,99,235,0.10)]"
          >
            <div>
              <div className="text-[15px] font-black text-[#07111f]">
                اختيار الدولة والتفضيلات
              </div>
              <div className="mt-1 text-[12px] font-semibold text-slate-500">
                دولة، إيداع، خبرة، منصة
              </div>
            </div>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eff6ff] text-xl font-black text-[#2563eb]">
              {showMobileFilters ? "−" : "+"}
            </span>
          </button>

          {showMobileFilters && (
            <div className="mt-3 rounded-[24px] border border-[#bfdbfe] bg-gradient-to-b from-white to-[#f8fbff] p-4 shadow-[0_16px_38px_rgba(37,99,235,0.10)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-black text-[#07111f]">فلترة النتائج</div>
                  <div className="mt-1 text-[11px] font-semibold text-slate-500">
                    اختر تفضيلاتك للحصول على ترتيب أدق
                  </div>
                </div>

                <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-[10px] font-extrabold text-[#1d4ed8]">
                  سريع
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
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
                  <option value="libya">ليبيا</option>
                  <option value="syria">سوريا</option>
                  <option value="other">دول أخرى</option>
                </select>

                <select value={deposit} onChange={(e) => setDeposit(e.target.value as DepositRange | "")} className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
                  <option value="">مبلغ الإيداع</option>
                  <option value="under50">أقل من 50$</option>
                  <option value="50to200">من 50$ إلى 200$</option>
                  <option value="200to1000">من 200$ إلى 1000$</option>
                  <option value="over1000">أكثر من 1000$</option>
                </select>

                <select value={experience} onChange={(e) => setExperience(e.target.value as Experience | "")} className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
                  <option value="">اختر مستوى الخبرة</option>
                  <option value="beginner">مبتدئ</option>
                  <option value="intermediate">متوسط</option>
                  <option value="pro">محترف</option>
                </select>

                <select value={platform} onChange={(e) => setPlatform(e.target.value as PlatformPref | "")} className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
                  <option value="">اختر المنصة</option>
                  <option value="any">أي منصة</option>
                  <option value="mt4">MT4</option>
                  <option value="mt5">MT5</option>
                </select>

                <select value={islamic} onChange={(e) => setIslamic(e.target.value)} className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]">
                  <option value="yes">حساب إسلامي: نعم</option>
                  <option value="no">لا يهم</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className={`mt-4 inline-flex h-[48px] w-full items-center justify-center rounded-[18px] px-5 text-sm font-black transition ${
                  canSearch
                    ? "bg-gradient-to-l from-[#2563eb] to-[#1d4ed8] text-white shadow-[0_14px_28px_rgba(37,99,235,0.25)]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                اعرض أفضل 3 شركات الآن
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="text-[20px] font-black text-[#07111f]">
                أفضل 3 نتائج لك
              </div>
              <div className="mt-1 text-[12px] font-semibold text-slate-500">
                {hasSearched ? "تم الترتيب حسب اختياراتك" : "أفضل الخيارات الحالية"}
              </div>
            </div>

            <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-extrabold text-[#1d4ed8]">
              ترتيب ذكي
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {results.map((broker, index) => {
              const isOpen = expandedMobileId === broker.id;
              const recommendation = getRecommendationLabel(
                broker,
                index,
                experience,
                deposit,
                hasSearched
              );
              const openAccountHref = broker.real_account_url || `/brokers/${broker.slug}`;
              const strength = decisionPoint(broker, index);
              const weakness = broker.key_weakness_ar || "راجع شروط التداول";
              const withdrawal = broker.withdrawal_speed_ar || "حسب الطريقة";
              const reg = broker.regulation_short || broker.regulation || "غير محدد";
              const rating = broker.countryRating ?? broker.rating;

              return (
                <div
                  key={broker.id}
                  className={`overflow-hidden rounded-[22px] border bg-white transition-all duration-300 ${
                    index === 0
                      ? "border-[#60a5fa] shadow-[0_16px_38px_rgba(37,99,235,0.14)]"
                      : "border-slate-200 shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
                  }`}
                >
                  {index === 0 && (
                    <div className="h-1.5 bg-gradient-to-l from-[#2563eb] to-[#60a5fa]" />
                  )}

                  <button
                    type="button"
                    onClick={() => toggleMobileRow(broker.id)}
                    className="w-full px-3.5 py-3 text-right"
                  >
                    <div className="grid grid-cols-[54px_1fr_50px] items-center gap-2.5">
                      <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[17px] border border-slate-200 bg-white p-2 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                        {broker.logo ? (
                          <img
                            src={broker.logo}
                            alt={broker.name || "Broker logo"}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-sm font-black text-[#2563eb]">
                            {getBrokerInitials(broker.name)}
                          </span>
                        )}

                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-[10px] font-black text-white">
                          {index + 1}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-1 text-[18px] font-black leading-tight text-[#07111f]">
                          {broker.name}
                        </div>

                        <div className="mt-1 inline-flex rounded-full bg-[#dbeafe] px-2.5 py-1 text-[10px] font-extrabold text-[#1d4ed8]">
                          {recommendation}
                        </div>
                      </div>

                      <div className="shrink-0 rounded-[15px] border border-[#bfdbfe] bg-[#eff6ff] px-2 py-2 text-center">
                        <div className="text-[18px] font-black leading-none text-[#1d4ed8]">
                          {rating?.toFixed(1) ?? "—"}
                        </div>
                        <div className="mt-1 text-[9px] font-bold text-slate-500">من 5</div>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-4 pb-4 pt-4">
                      <div className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-3">
                        <div className="text-[11px] font-black text-slate-500">
                          الخلاصة السريعة
                        </div>
                        <div className="mt-2 space-y-1 text-[13px] font-bold leading-6 text-slate-700">
                          <div>✓ {strength}</div>
                          <div>✓ مناسب حسب التقييم والأمان والرسوم</div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="rounded-2xl bg-[#f8fafc] px-2 py-3 text-center ring-1 ring-slate-200">
                          <div className="text-[10px] font-bold text-slate-500">الإيداع</div>
                          <div className="mt-1 text-[13px] font-black text-[#07111f]">
                            {broker.min_deposit !== null ? `$${broker.min_deposit}` : "غير محدد"}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-[#f8fafc] px-2 py-3 text-center ring-1 ring-slate-200">
                          <div className="text-[10px] font-bold text-slate-500">الأمان</div>
                          <div className="mt-1 text-[13px] font-black text-[#07111f]">
                            {scoreText(broker.score_safety ?? rating)}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-[#f8fafc] px-2 py-3 text-center ring-1 ring-slate-200">
                          <div className="text-[10px] font-bold text-slate-500">الرسوم</div>
                          <div className="mt-1 text-[13px] font-black text-[#07111f]">
                            {scoreText(broker.score_fees ?? rating)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex min-h-[44px] items-center justify-center rounded-[18px] bg-slate-50 px-3 text-center text-[12px] font-bold leading-[1.5] text-slate-700 ring-1 ring-slate-200">
                          <span className="line-clamp-2">التراخيص: {reg}</span>
                        </div>

                        <div className="flex min-h-[50px] items-center justify-center rounded-[18px] bg-slate-50 px-3 text-center text-[12px] font-bold leading-[1.5] text-slate-700 ring-1 ring-slate-200">
                          <span className="line-clamp-2">
                            السحب: {withdrawal || "حسب الطريقة"}
                          </span>
                        </div>

                        <div className="rounded-[18px] bg-orange-50 px-3 py-3 text-center text-[12px] font-bold text-orange-700 ring-1 ring-orange-100">
                          تنبيه: {shortText(weakness, 52)}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link
                          href={`/brokers/${broker.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-[16px] border border-slate-200 bg-white px-3 py-3 text-[13px] font-black text-[#07111f]"
                        >
                          اقرأ التقييم
                        </Link>

                        <Link
                          href={openAccountHref}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center justify-center rounded-[16px] bg-gradient-to-l from-[#2563eb] to-[#1d4ed8] px-3 py-3 text-[13px] font-black text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)]"
                        >
                          فتح حساب
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}