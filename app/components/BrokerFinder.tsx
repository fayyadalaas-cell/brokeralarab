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

        if (country === "sa" || country === "ae" || country === "kw" || country === "eg") {
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

      score += Math.round((broker.rating || 0) / 2);

      return { ...broker, score };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
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
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:rounded-[30px] sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6 sm:flex-wrap sm:items-center">
        <div>
          <div className="text-xs font-bold text-[#1d4ed8] sm:text-sm">
            Smart Broker Finder
          </div>
          <h2 className="mt-1 text-xl font-black leading-tight text-[#0f172a] sm:text-2xl">
            اعثر على أفضل 3 شركات تداول تناسبك
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">
            اختر الدولة وبعض التفضيلات الأساسية، ثم سنرتب لك أفضل 3 شركات بشكل
            سريع وواضح.
          </p>
        </div>

        <div className="hidden sm:block">
          <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
            فلتر ذكي
          </span>
        </div>
      </div>

      <div className="mb-4 sm:hidden">
        <button
          type="button"
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-sm font-extrabold text-[#1d4ed8] transition hover:bg-[#dbeafe]"
        >
          {showMobileFilters ? "إخفاء خيارات البحث" : "اختيار الدولة والتفضيلات"}
        </button>
      </div>

      <div className={`${showMobileFilters ? "block" : "hidden"} sm:block`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">الدولة</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb]"
            >
              <option value="">اختر الدولة</option>
              <option value="sa">السعودية</option>
              <option value="ae">الإمارات</option>
              <option value="kw">الكويت</option>
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
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb]"
            >
              <option value="">اختر قيمة الإيداع</option>
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
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb]"
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
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2563eb]"
            >
              <option value="">اختر المنصة</option>
              <option value="any">أي منصة</option>
              <option value="mt4">MT4</option>
              <option value="mt5">MT5</option>
            </select>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <button
            type="button"
            onClick={handleSearch}
            disabled={!canSearch}
            className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold transition sm:w-auto sm:min-w-[220px] ${
              canSearch
                ? "bg-[#2563eb] text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)] hover:bg-[#1d4ed8]"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            اعرض أفضل 3 شركات
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[20px] border border-slate-200 bg-[#f8fbff] p-3 sm:mt-6 sm:rounded-[24px] sm:p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm font-black text-[#0f172a]">أفضل 3 نتائج لك</div>
          <div className="text-[11px] font-bold text-slate-500 sm:text-xs">
            {hasSearched ? "بناءً على اختياراتك" : "أفضل الخيارات الحالية"}
          </div>
        </div>

        {/* MOBILE LIST */}
        <div className="space-y-2 sm:hidden">
          {results.map((broker, index) => {
            const isOpen = expandedMobileId === broker.id;

            return (
              <div
                key={broker.id}
                className="overflow-hidden rounded-[18px] border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleMobileRow(broker.id)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-3 text-right"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#2563eb] px-2 text-xs font-black text-white">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <div className="truncate text-base font-black text-[#0f172a]">
                        {broker.name}
                      </div>
                      <div className="mt-0.5 text-[11px] font-bold text-[#1d4ed8]">
                        {shortText(broker.best_for || "مناسب لفئات متعددة", 22)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-base font-black text-[#1d4ed8]">
                        {broker.rating?.toFixed(1) ?? "—"}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500">من 10</div>
                    </div>

                    <span className="text-slate-400">{isOpen ? "⌃" : "⌄"}</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-3 pb-3 pt-2">
                    <div className="space-y-2">
                      <div className="grid grid-cols-[90px_1fr] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                        <span className="text-slate-500">الإيداع</span>
                        <span className="truncate font-black text-[#0f172a]">
                          {broker.min_deposit !== null ? `$${broker.min_deposit}` : "غير محدد"}
                        </span>
                      </div>

                      <div className="grid grid-cols-[90px_1fr] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                        <span className="text-slate-500">المنصات</span>
                        <span className="truncate font-black text-[#0f172a]">
                          {shortText(broker.platforms || "غير محدد", 18)}
                        </span>
                      </div>

                      <div className="grid grid-cols-[90px_1fr] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                        <span className="text-slate-500">التراخيص</span>
                        <span className="truncate font-black text-[#0f172a]">
                          {shortText(broker.regulation || "غير محدد", 20)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Link
                        href={`/brokers/${broker.slug}`}
                        className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-3 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
                      >
                        اقرأ التقييم
                      </Link>

                      <Link
                        href="/compare"
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                      >
                        قارن الآن
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP CARDS - unchanged style */}
        <div className="hidden gap-3 sm:grid lg:grid-cols-3 lg:gap-4">
          {results.map((broker, index) => (
            <div
              key={broker.id}
              className="rounded-[20px] border border-slate-200 bg-white p-3 sm:rounded-[22px] sm:p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2563eb] px-2 text-[11px] font-black text-white sm:h-7 sm:min-w-7 sm:text-xs">
                      {index + 1}
                    </span>
                    <h3 className="truncate text-lg font-black text-[#0f172a] sm:text-xl">
                      {broker.name}
                    </h3>
                  </div>

                  <p className="mt-1 text-[11px] font-bold text-[#1d4ed8] sm:text-xs">
                    {shortText(broker.best_for || "مناسب لفئات متعددة", 24)}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-center">
                  <div className="text-base font-black text-[#1d4ed8] sm:text-lg">
                    {broker.rating?.toFixed(1) ?? "—"}
                  </div>
                  <div className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
                    من 10
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                  <span className="shrink-0 text-slate-500">الإيداع</span>
                  <span className="truncate font-black text-[#0f172a]">
                    {broker.min_deposit !== null ? `$${broker.min_deposit}` : "غير محدد"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                  <span className="shrink-0 text-slate-500">المنصات</span>
                  <span className="truncate font-black text-[#0f172a]">
                    {shortText(broker.platforms || "غير محدد", 18)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                  <span className="shrink-0 text-slate-500">التراخيص</span>
                  <span className="truncate font-black text-[#0f172a]">
                    {shortText(broker.regulation || "غير محدد", 20)}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                <Link
                  href={`/brokers/${broker.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-3 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8] sm:px-4"
                >
                  اقرأ التقييم
                </Link>

                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50 sm:px-4"
                >
                  قارن الآن
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}