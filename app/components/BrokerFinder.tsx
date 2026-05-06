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

type Props = { brokers: Broker[] };

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

function getCountryPriority(broker: Broker, country: string) {
  switch (country) {
    case "sa":
      return broker.priority_saudi ?? 3;
    case "jo":
      return broker.priority_jordan ?? 3;
    case "kw":
      return broker.priority_kuwait ?? 3;
    case "ae":
      return broker.priority_uae ?? 3;
    case "qa":
      return broker.priority_qatar ?? 3;
    case "bh":
      return broker.priority_bahrain ?? 3;
    case "om":
      return broker.priority_oman ?? 3;
    case "eg":
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
  broker: Broker,
  index: number,
  experience: Experience | "",
  deposit: DepositRange | "",
  hasSearched: boolean
) {
  const bestFor = normalize(broker.best_for);

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

function getLogoNode(broker: Broker) {
  if (broker.logo) {
    return (
      <img
        src={broker.logo}
        alt={broker.name || "Broker logo"}
        className="block h-14 w-14 rounded-2xl object-contain sm:h-16 sm:w-16"
      />
    );
  }

  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] text-base font-black text-[#1d4ed8] sm:h-16 sm:w-16 sm:text-lg">
      {getBrokerInitials(broker.name)}
    </div>
  );
}

function scoreText(value: number | null | undefined) {
  const v = Number(value || 0);
  if (v >= 4.5) return "ممتاز";
  if (v >= 4.1) return "جيد جدًا";
  if (v >= 3.7) return "جيد";
  return "متوسط";
}

function decisionPoint(broker: Broker, index: number) {
  if (index === 0) return "الأفضل كخيار عام";
  if ((broker.min_deposit ?? 999999) <= 20) return "مناسب للإيداع المنخفض";
  if (normalize(broker.best_for).includes("سبريد")) return "قوي في تكاليف التداول";
  return broker.key_strength_ar || broker.best_for || "خيار موثوق";
}

export default function BrokerFinder({ brokers }: Props) {
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

      const countryPriority = getCountryPriority(broker, country);

      score += (broker.rating || 0) * 5;
      score += priorityScore(countryPriority);

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

        if (["sa", "ae", "kw", "qa", "bh", "om", "eg", "jo"].includes(country)) {
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

      return { ...broker, score, countryPriority };
    });

    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if ((a.countryPriority ?? 3) !== (b.countryPriority ?? 3)) {
          return (a.countryPriority ?? 3) - (b.countryPriority ?? 3);
        }
        return (b.rating || 0) - (a.rating || 0);
      })
      .slice(0, 3);
  }, [brokers, country, deposit, experience, islamic, platform, hasSearched, canSearch]);

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
        <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-7 py-6">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute right-10 top-0 h-28 w-28 rounded-full bg-blue-100/70 blur-3xl" />
    <div className="absolute left-12 bottom-0 h-24 w-24 rounded-full bg-sky-100/70 blur-3xl" />
  </div>

  <div className="relative flex items-center justify-between gap-10">
    <div>
      <div className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
        أداة اختيار ذكية
      </div>

      <h2 className="mt-3 text-[2.2rem] font-black leading-tight tracking-[-0.02em] text-[#07111f]">
        اعثر على أفضل 3 شركات تداول تناسبك
      </h2>

      <p className="mt-2 max-w-3xl text-[14px] leading-7 text-slate-600">
        نتائج مختصرة وواضحة حسب التقييم، الأمان، الرسوم، الإيداع، وسرعة السحب.
      </p>
      <div className="mt-5 flex items-center gap-3 text-[13px] font-bold text-slate-600">
  <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
    <span className="h-2 w-2 rounded-full bg-emerald-500" />
    شركات مرخصة
  </div>

  <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
    <span className="h-2 w-2 rounded-full bg-blue-500" />
    تقييمات حقيقية
  </div>

  <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
    <span className="h-2 w-2 rounded-full bg-amber-500" />
    مقارنة الرسوم
  </div>
</div>
    </div>

    <div className="rounded-[22px] border border-blue-100 bg-white/90 px-5 py-3 text-right shadow-[0_14px_35px_rgba(37,99,235,0.08)] backdrop-blur">
      <div className="text-xs font-bold text-slate-500">نتائج مخصصة</div>
      <div className="mt-1 text-[14px] font-black text-[#07111f]">
        {hasSearched ? "بناءً على اختياراتك" : "أفضل الخيارات الحالية"}
      </div>
    </div>
  </div>
</div>

        <div className="p-6">
          <div className="rounded-[26px] border border-slate-200 bg-[#f8fbff] p-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-black text-[#07111f]">حدد تفضيلاتك</div>
                <div className="mt-1 text-sm font-semibold text-slate-500">
                  اختر الدولة، الإيداع، الخبرة والمنصة لتحصل على ترشيحات أدق.
                </div>
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
                  <option value="sa">السعودية</option>
                  <option value="ae">الإمارات</option>
                  <option value="kw">الكويت</option>
                  <option value="qa">قطر</option>
                  <option value="bh">البحرين</option>
                  <option value="om">عُمان</option>
                  <option value="eg">مصر</option>
                  <option value="jo">الأردن</option>
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
                يتم ترتيب النتائج حسب التقييم العام، أولوية الدولة، ثم مطابقة التفضيلات.
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
  <div className="flex min-w-0 flex-1 items-start gap-4">
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

    <div className="min-w-0 flex-1 pt-1">
      <div className="flex items-center gap-2">
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
      {broker.rating?.toFixed(1) ?? "—"}
    </div>
    <div className="text-[10px] font-bold text-slate-500">من 5</div>
  </div>
</div>

                  <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
                    <div className="text-xs font-black text-slate-500">الخلاصة السريعة</div>
                    <div className="mt-2 grid gap-2 text-sm font-bold text-slate-700">
                      <div>✓ {shortText(strength, 48)}</div>
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
                        {scoreText(broker.score_safety ?? broker.rating)}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
                      <div className="text-[11px] font-bold text-slate-500">الرسوم</div>
                      <div className="mt-1 text-sm font-black text-[#07111f]">
                        {scoreText(broker.score_fees ?? broker.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="rounded-full bg-slate-50 px-3 py-2 text-[12px] font-bold text-slate-700 ring-1 ring-slate-200">
                      التراخيص: {shortText(reg, 42)}
                    </div>
                    <div className="flex min-h-[54px] items-center rounded-[18px] bg-slate-50 px-4 py-3 text-center text-[12px] leading-[1.7] font-bold text-slate-700 ring-1 ring-slate-200">
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

      {/* MOBILE - ORIGINAL */}
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:rounded-[34px] lg:hidden">
        <div className="border-b border-slate-200/80 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-5 sm:px-6 sm:py-7">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="mt-3 text-2xl font-black leading-tight text-[#0f172a] sm:text-[2rem]">
                اعثر على أفضل 3 شركات تداول تناسبك
              </h2>

              <p className="mt-2 max-w-2xl text-[13px] leading-7 text-slate-600 sm:text-sm">
                اختر الدولة وبعض التفضيلات الأساسية، وسنعرض لك أفضل الشركات المناسبة
                بناءً على التقييم العام وأولوية كل شركة داخل الدولة المختارة.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-0 sm:p-6">
          <div className="relative -mt-px rounded-b-[24px] rounded-t-none border border-t-0 border-slate-200 bg-[#f8fbff] p-4 sm:mt-0 sm:rounded-[24px] sm:border sm:p-5">
            <div className="mb-3 sm:hidden">
              <button
                type="button"
                onClick={() => setShowMobileFilters((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-2xl border border-[#bfdbfe] bg-white px-4 py-3 text-right shadow-sm"
              >
                <div>
                  <div className="text-sm font-black text-[#0f172a]">
                    {showMobileFilters ? "إخفاء خيارات البحث" : "اختيار الدولة والتفضيلات"}
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold text-slate-500">
                    دولة، إيداع، خبرة، منصة
                  </div>
                </div>
                <span className="text-lg font-black text-[#2563eb]">
                  {showMobileFilters ? "−" : "+"}
                </span>
              </button>
            </div>

            <div className={`${showMobileFilters ? "block" : "hidden"} sm:block`}>
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold">
                  <option value="">اختر الدولة</option>
                  <option value="sa">السعودية</option>
                  <option value="ae">الإمارات</option>
                  <option value="kw">الكويت</option>
                  <option value="qa">قطر</option>
                  <option value="bh">البحرين</option>
                  <option value="om">عُمان</option>
                  <option value="eg">مصر</option>
                  <option value="jo">الأردن</option>
                  <option value="other">دول أخرى</option>
                </select>

                <select value={deposit} onChange={(e) => setDeposit(e.target.value as DepositRange | "")} className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold">
                  <option value="">مبلغ الإيداع</option>
                  <option value="under50">أقل من 50$</option>
                  <option value="50to200">من 50$ إلى 200$</option>
                  <option value="200to1000">من 200$ إلى 1000$</option>
                  <option value="over1000">أكثر من 1000$</option>
                </select>

                <select value={experience} onChange={(e) => setExperience(e.target.value as Experience | "")} className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold">
                  <option value="">اختر مستوى الخبرة</option>
                  <option value="beginner">مبتدئ</option>
                  <option value="intermediate">متوسط</option>
                  <option value="pro">محترف</option>
                </select>

                <select value={platform} onChange={(e) => setPlatform(e.target.value as PlatformPref | "")} className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold">
                  <option value="">اختر المنصة</option>
                  <option value="any">أي منصة</option>
                  <option value="mt4">MT4</option>
                  <option value="mt5">MT5</option>
                </select>

                <select value={islamic} onChange={(e) => setIslamic(e.target.value)} className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold">
                  <option value="yes">نعم</option>
                  <option value="no">لا يهم</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className={`mt-4 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold ${
                  canSearch ? "bg-[#2563eb] text-white" : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                اعرض أفضل 3 شركات الآن
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {results.map((broker, index) => {
              const isOpen = expandedMobileId === broker.id;
              const recommendation = getRecommendationLabel(broker, index, experience, deposit, hasSearched);
              const openAccountHref = broker.real_account_url || `/brokers/${broker.slug}`;

              return (
                <div key={broker.id} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
                  <button type="button" onClick={() => toggleMobileRow(broker.id)} className="w-full px-3 py-3 text-right">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="relative shrink-0">
                          <Link href={`/brokers/${broker.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center overflow-hidden rounded-[18px] border border-slate-200 bg-white p-1.5 shadow-sm">
                            {getLogoNode(broker)}
                          </Link>
                          <span className="absolute -right-1 -top-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2563eb] px-1.5 text-[10px] font-black text-white">
                            {index + 1}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <Link href={`/brokers/${broker.slug}`} target="_blank" rel="noopener noreferrer" className="truncate text-[18px] font-black leading-6 text-[#0f172a]">
                            {broker.name}
                          </Link>
                          <div className="mt-1 inline-flex rounded-full bg-[#eff6ff] px-2.5 py-1 text-[10px] font-extrabold text-[#1d4ed8]">
                            {recommendation}
                          </div>
                          <div className="mt-2 text-[12px] font-bold text-slate-500">
                            {shortText(broker.best_for || "مناسب لفئات متعددة", 34)}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fbff] px-3 py-2 text-center">
                        <div className="text-base font-black leading-none text-[#1d4ed8]">
                          {broker.rating?.toFixed(1) ?? "—"}
                        </div>
                        <div className="mt-1 text-[9px] font-bold text-slate-500">من 5</div>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-3 pb-3 pt-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-2xl bg-slate-50 px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">الحد الأدنى للإيداع</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {broker.min_deposit !== null ? `$${broker.min_deposit}` : "غير محدد"}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">المنصات</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {shortText(broker.platforms || "غير محدد", 24)}
                          </div>
                        </div>

                        <div className="col-span-2 rounded-2xl bg-slate-50 px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">التراخيص</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {shortText(broker.regulation || "غير محدد", 46)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Link href={`/brokers/${broker.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#2563eb] px-4 py-3 text-[14px] font-extrabold text-white">
                          اقرأ التقييم
                        </Link>

                        <Link href={openAccountHref} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#2563eb] px-4 py-3 text-[14px] font-extrabold text-white">
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