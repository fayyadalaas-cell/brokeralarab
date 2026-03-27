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
};

type Props = {
  brokers: Broker[];
};

type Experience = "beginner" | "intermediate" | "pro";
type DepositRange = "under50" | "50to200" | "200to1000" | "over1000";
type PlatformPref = "any" | "mt4" | "mt5";

function normalize(text: string | null | undefined) {
  return (text || "").toLowerCase();
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

function shortText(value: string | null | undefined, max = 26) {
  const text = (value || "غير محدد").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max)}...`;
}

function getBrokerInitials(name: string | null | undefined) {
  const text = (name || "Broker").trim();
  return text.slice(0, 2).toUpperCase();
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

export default function BrokerFinder({ brokers }: Props) {
  const [country, setCountry] = useState("");
  const [deposit, setDeposit] = useState<DepositRange | "">("");
  const [experience, setExperience] = useState<Experience | "">("");
  const [platform, setPlatform] = useState<PlatformPref | "">("");
  const [islamic, setIslamic] = useState("yes");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedMobileId, setExpandedMobileId] = useState<number | null>(null);

  const canSearch =
    country !== "" &&
    deposit !== "" &&
    experience !== "" &&
    platform !== "";

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

        if (broker.min_deposit !== null && broker.min_deposit <= maxDeposit) {
          score += 4;
        }

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
          country === "sa" ||
          country === "ae" ||
          country === "kw" ||
          country === "qa" ||
          country === "bh" ||
          country === "om" ||
          country === "eg" ||
          country === "jo"
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
      };
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
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:rounded-[34px]">
      <div className="border-b border-slate-200 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-5 sm:px-6 sm:py-7">
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

          <div className="hidden shrink-0 rounded-[22px] border border-[#dbeafe] bg-white/80 px-4 py-3 text-right shadow-sm lg:block">
            <div className="text-xs font-bold text-slate-500">نتائج مخصصة</div>
            <div className="mt-1 text-sm font-black text-[#0f172a]">
              {hasSearched ? "بناءً على اختياراتك" : "أفضل الخيارات الحالية"}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-0 sm:p-6">
        <div className="relative -mt-px rounded-b-[24px] rounded-t-none border border-t-0 border-slate-200 bg-[#f8fbff] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:mt-0 sm:rounded-[24px] sm:border sm:p-5">
          <div className="hidden items-center justify-between gap-3 sm:mb-5 sm:flex">
            <div>
              <div className="text-sm font-black text-[#0f172a]">حدد تفضيلاتك</div>
              <div className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                اختر الدولة وقيمة الإيداع والخبرة والمنصة للحصول على ترشيحات أدق
              </div>
            </div>

            <div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-600 shadow-sm ring-1 ring-slate-200">
                فلتر سريع
              </span>
            </div>
          </div>

          <div className="mb-3 sm:hidden">
            <button
              type="button"
              onClick={() => setShowMobileFilters((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl border border-[#bfdbfe] bg-white px-4 py-3 text-right shadow-sm transition hover:bg-[#eff6ff]"
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
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">الدولة</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
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
                <select
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value as DepositRange | "")}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
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
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as Experience | "")}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">اختر مستوى الخبرة</option>
                  <option value="beginner">مبتدئ</option>
                  <option value="intermediate">متوسط</option>
                  <option value="pro">محترف</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">المنصة</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as PlatformPref | "")}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">اختر المنصة</option>
                  <option value="any">أي منصة</option>
                  <option value="mt4">MT4</option>
                  <option value="mt5">MT5</option>
                </select>
              </div>

              <div className="col-span-2 xl:col-span-1">
                <label className="mb-2 block text-sm font-bold text-slate-700">حساب إسلامي</label>
                <select
                  value={islamic}
                  onChange={(e) => setIslamic(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="yes">نعم</option>
                  <option value="no">لا يهم</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="hidden text-xs font-semibold text-slate-500 sm:block sm:text-sm">
                يتم الترتيب حسب التقييم العام للشركة أولًا، ثم أولوية الدولة، ثم بقية المعايير.
              </p>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className={`inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition sm:w-auto sm:min-w-[240px] ${
                  canSearch
                    ? "bg-[#2563eb] text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] hover:bg-[#1d4ed8]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                اعرض أفضل 3 شركات الآن
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-base font-black text-[#0f172a] sm:text-lg">
                أفضل 3 نتائج لك
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                {hasSearched ? "تم ترتيب النتائج بحسب اختياراتك" : "هذه أفضل الخيارات الحالية"}
              </div>
            </div>

            <div className="hidden rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-extrabold text-[#1d4ed8] sm:inline-flex">
              ترتيب ذكي
            </div>
          </div>

          <div className="space-y-3 sm:hidden">
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

              return (
                <div
                  key={broker.id}
                  className={`overflow-hidden rounded-[22px] border bg-white transition ${
                    index === 0
                      ? "border-[#93c5fd] shadow-[0_16px_40px_rgba(37,99,235,0.14)]"
                      : "border-slate-200 shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleMobileRow(broker.id)}
                    className="w-full px-3 py-3 text-right"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="relative shrink-0">
                          <Link
  href={`/brokers/${broker.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center overflow-hidden rounded-[18px] border border-slate-200 bg-white p-1.5 shadow-sm"
>
  {getLogoNode(broker)}
</Link>

                          <span className="absolute -right-1 -top-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2563eb] px-1.5 text-[10px] font-black text-white shadow-md">
                            {index + 1}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link
  href={`/brokers/${broker.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="truncate text-[18px] font-black leading-6 text-[#0f172a] hover:text-[#2563eb]"
>
  {broker.name}
</Link>

                              <div className="mt-1 inline-flex rounded-full bg-[#eff6ff] px-2.5 py-1 text-[10px] font-extrabold text-[#1d4ed8]">
                                {recommendation}
                              </div>
                            </div>
                          </div>

                          <div className="mt-2 text-[12px] font-bold text-slate-500">
                            {shortText(broker.best_for || "مناسب لفئات متعددة", 34)}
                          </div>
                        </div>
                      </div>

                     <div className="flex shrink-0 items-start">
  <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fbff] px-3 py-2 text-center">
    <div className="text-base font-black leading-none text-[#1d4ed8]">
      {broker.rating?.toFixed(1) ?? "—"}
    </div>
    <div className="mt-1 text-[9px] font-bold text-slate-500">من 5</div>
  </div>
</div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-3 pb-3 pt-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-2xl bg-slate-50 px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">
                            الحد الأدنى للإيداع
                          </div>
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
                        <Link
                          href={`/brokers/${broker.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#2563eb] px-4 py-3 text-[14px] font-extrabold text-white shadow-sm transition hover:bg-[#1d4ed8]"
                        >
                          اقرأ التقييم
                        </Link>

                        <Link
                          href={openAccountHref}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#2563eb] px-4 py-3 text-[14px] font-extrabold text-white shadow-sm transition hover:bg-[#1d4ed8]"
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

          <div className="hidden gap-4 lg:grid lg:grid-cols-3">
            {results.map((broker, index) => {
              const recommendation = getRecommendationLabel(
                broker,
                index,
                experience,
                deposit,
                hasSearched
              );
              const openAccountHref = broker.real_account_url || `/brokers/${broker.slug}`;

              return (
                <article
                  key={broker.id}
                  className={`group relative overflow-hidden rounded-[28px] border bg-white p-5 transition duration-300 ${
                    index === 0
                      ? "border-[#93c5fd] shadow-[0_22px_55px_rgba(37,99,235,0.16)]"
                      : "border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]"
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#60a5fa] via-[#2563eb] to-[#1d4ed8]" />
                  )}

                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="relative shrink-0">
                        <Link
  href={`/brokers/${broker.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-sm transition hover:scale-[1.03]"
>
  {getLogoNode(broker)}
</Link>

                        <span className="absolute -right-2 -top-2 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#2563eb] px-2 text-xs font-black text-white shadow-lg">
                          {index + 1}
                        </span>
                      </div>

                      <div className="min-w-0 pt-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
  href={`/brokers/${broker.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="truncate text-xl font-black text-[#0f172a] transition hover:text-[#2563eb]"
>
  {broker.name}
</Link>

                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${
                              index === 0
                                ? "bg-[#dbeafe] text-[#1d4ed8]"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {recommendation}
                          </span>
                        </div>

                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                          {shortText(broker.best_for || "مناسب لفئات متعددة", 48)}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`shrink-0 rounded-[22px] border px-4 py-3 text-center ${
                        index === 0
                          ? "border-[#bfdbfe] bg-[#eff6ff]"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="text-xl font-black text-[#1d4ed8]">
                        {broker.rating?.toFixed(1) ?? "—"}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500">من 5</div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="text-xs font-bold text-slate-500">الحد الأدنى للإيداع</div>
                      <div className="mt-1 text-base font-black text-[#0f172a]">
                        {broker.min_deposit !== null ? `$${broker.min_deposit}` : "غير محدد"}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="text-xs font-bold text-slate-500">المنصات المتاحة</div>
                      <div className="mt-1 text-base font-black text-[#0f172a]">
                        {shortText(broker.platforms || "غير محدد", 34)}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="text-xs font-bold text-slate-500">أبرز التراخيص</div>
                      <div className="mt-1 text-base font-black text-[#0f172a]">
                        {shortText(broker.regulation || "غير محدد", 34)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      href={`/brokers/${broker.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#2563eb] px-4 py-3 text-[14px] font-extrabold text-white shadow-sm transition hover:bg-[#1d4ed8]"
                    >
                      اقرأ التقييم
                    </Link>

                    <Link
                      href={openAccountHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(37,99,235,0.20)] transition hover:bg-[#1d4ed8]"
                    >
                      فتح حساب حقيقي
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}