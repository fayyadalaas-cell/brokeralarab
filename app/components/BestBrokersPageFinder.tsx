
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | string | null;
  min_deposit: number | null;
  platforms: string | null;
  islamic_account: string | null;
  best_for: string | null;
  key_strength_ar: string | null;
  real_account_url: string | null;
};

type Country = {
  id: number;
  slug: string;
  name: string;
  flag: string | null;
};

type CountryRanking = {
  country_id: number;
  broker_id: number;
  rank_position: number;
  country_rating: number | null;
  best_for: string | null;
  local_note: string | null;
};

type Props = {
  brokers: Broker[];
  countries: Country[];
  countryRankings: CountryRanking[];
  rankingsError: boolean;
};

const fieldClass =
  "h-12 w-full rounded-xl border border-[#d6e5f8] bg-white px-3 text-[13px] font-bold text-[#102442] outline-none focus:border-[#2B6FD0] focus:ring-2 focus:ring-[#d6e5f8]";

function ratingNumber(value: Broker["rating"]) {
  if (value === null || value === "") return 0;
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function isIslamic(value: string | null) {
  return [
    "yes",
    "true",
    "available",
    "supported",
    "نعم",
    "متاح",
    "متوفر",
    "مدعوم",
  ].includes((value || "").trim().toLowerCase());
}

export default function BestBrokersPageFinder({
  brokers,
  countries,
  countryRankings,
  rankingsError,
}: Props) {
  const [country, setCountry] = useState("");
  const [deposit, setDeposit] = useState("");
  const [experience, setExperience] = useState("");
  const [platform, setPlatform] = useState("");
  const [islamic, setIslamic] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [applied, setApplied] = useState({
    country: "",
    deposit: "",
    experience: "",
    platform: "",
    islamic: false,
  });

  const selectedCount =
    Number(Boolean(deposit)) +
   
    Number(Boolean(platform)) +
    Number(islamic);

  const canSearch = Boolean(country && selectedCount > 0);

  const selectedCountry = countries.find(
    (item) => item.slug === applied.country
  );

  const results = useMemo(() => {
  if (!submitted || rankingsError) return [];

  const selectedCountry = countries.find(
    (item) => item.slug === applied.country
  );

  if (!selectedCountry) return [];

  const maxDeposit =
    applied.deposit === "50"
      ? 50
      : applied.deposit === "200"
        ? 200
        : applied.deposit === "1000"
          ? 1000
          : null;

  const brokerMap = new Map(
    brokers.map((broker) => [broker.id, broker])
  );

  return countryRankings
    // أولًا: وسطاء الدولة المختارة فقط
    .filter(
      (row) => row.country_id === selectedCountry.id
    )

    // ثانيًا: نفس الترتيب الموجود في صفحة الدولة
    .sort(
      (a, b) => a.rank_position - b.rank_position
    )

    // ثالثًا: ربط التصنيف ببيانات الوسيط
    .flatMap((row) => {
      const broker = brokerMap.get(row.broker_id);

      if (!broker) return [];

      // فلتر الإيداع
      if (
        maxDeposit !== null &&
        (
          broker.min_deposit === null ||
          broker.min_deposit > maxDeposit
        )
      ) {
        return [];
      }

      // فلتر المنصة
      if (
        applied.platform &&
        !(broker.platforms || "")
          .toLowerCase()
          .includes(applied.platform.toLowerCase())
      ) {
        return [];
      }

      // فلتر الحساب الإسلامي
      if (
        applied.islamic &&
        !isIslamic(broker.islamic_account)
      ) {
        return [];
      }

      return [
        {
          ...broker,
          rank_position: row.rank_position,
          country_rating: row.country_rating,
          country_best_for: row.best_for,
          local_note: row.local_note,
        },
      ];
    })

    // عرض أول 3 مطابقين من ترتيب الدولة
    .slice(0, 3);
}, [
  brokers,
  countries,
  countryRankings,
  applied,
  submitted,
  rankingsError,
]);
 

  function search() {
    if (!canSearch) return;
    setApplied({ country, deposit, experience, platform, islamic });
    setSubmitted(true);
  }

  function reset() {
    setCountry("");
    setDeposit("");
    setExperience("");
    setPlatform("");
    setIslamic(false);
    setSubmitted(false);
  }

  
  
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-[20px] border border-[#b8d1f2] bg-white shadow-[0_12px_35px_rgba(24,74,151,0.10)] sm:rounded-[24px]"
    >
      {/* HEADER */}
      <div className="relative overflow-hidden bg-[#123B72] px-4 py-5 text-white sm:px-8 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-12 -top-20 h-52 w-52 rounded-full bg-[#2B6FD0]/30 blur-3xl"
        />

        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[18px] font-black leading-7 text-white sm:text-[25px]">
              اكتشف الوسيط المناسب لك
            </h3>

            <p className="mt-1 text-[11px] leading-5 text-[#D6E5F8] sm:text-[14px] sm:leading-6">
              اختر دولتك وتفضيلاتك، وقارن أفضل الوسطاء حسب التصنيف المحلي.
            </p>
          </div>

          <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold text-white">
            مقارنة تفاعلية
          </span>
        </div>
      </div>

      {/* FILTERS */}
      <div className="p-3.5 sm:p-7 lg:p-8">
        <div className="grid gap-3 sm:gap-5 lg:grid-cols-[1.1fr_2fr]">

          {/* COUNTRY */}
          <div className="rounded-2xl border border-[#b5d2fa] bg-[#eaf3ff] p-3.5 sm:border-2 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E5BB8] text-[11px] font-black text-white sm:h-8 sm:w-8">
                01
              </span>

              <label
                htmlFor="bbf-country"
                className="text-[13px] font-black text-[#123B72] sm:text-[14px]"
              >
                اختر دولة إقامتك
              </label>
            </div>

            <select
              id="bbf-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`${fieldClass} h-11 border-[#a9c8f1] text-[12px] shadow-sm sm:h-12`}
            >
              <option value="">اختر الدولة أولًا</option>

              {countries.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-[10px] leading-5 text-[#58779d] sm:mt-3 sm:text-[11px]">
              النتائج تعتمد على ترتيب الوسطاء في دولتك.
            </p>
          </div>

          {/* PREFERENCES */}
          <div className="rounded-2xl border border-[#d1def0] bg-[#f7f9fd] p-3.5 sm:p-5">
            <div className="mb-3 flex items-center gap-2 sm:mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E5BB8] text-[11px] font-black text-white sm:h-8 sm:w-8">
                02
              </span>

              <h4 className="text-[13px] font-black text-[#123B72] sm:text-[14px]">
                حدّد تفضيلات التداول
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {/* DEPOSIT */}
              <div>
                <label
                  htmlFor="bbf-deposit"
                  className="mb-1.5 block text-[11px] font-bold text-[#334b6e] sm:text-xs"
                >
                  مبلغ الإيداع
                </label>

                <select
                  id="bbf-deposit"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className={`${fieldClass} h-11 px-2 text-[11px] sm:h-12 sm:px-3 sm:text-[13px]`}
                >
                  <option value="">أي مبلغ</option>
                  <option value="50">حتى $50</option>
                  <option value="200">حتى $200</option>
                  <option value="1000">حتى $1,000</option>
                </select>
              </div>

              {/* PLATFORM */}
              <div>
                <label
                  htmlFor="bbf-platform"
                  className="mb-1.5 block text-[11px] font-bold text-[#334b6e] sm:text-xs"
                >
                  منصة التداول
                </label>

                <select
                  id="bbf-platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className={`${fieldClass} h-11 px-2 text-[11px] sm:h-12 sm:px-3 sm:text-[13px]`}
                >
                  <option value="">أي منصة</option>
                  <option value="MT4">MetaTrader 4</option>
                  <option value="MT5">MetaTrader 5</option>
                  <option value="cTrader">cTrader</option>
                </select>
              </div>

              {/* EXPERIENCE — DISABLED UNTIL DATA IS AVAILABLE */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="bbf-experience"
                  className="mb-1.5 block text-[11px] font-bold text-[#334b6e] sm:text-xs"
                >
                  مستوى الخبرة
                </label>

                <select
                  id="bbf-experience"
                  value=""
                  disabled
                  className={`${fieldClass} h-11 cursor-not-allowed bg-[#edf1f7] px-2 text-[11px] opacity-65 sm:h-12 sm:px-3 sm:text-[13px]`}
                >
                  <option value="">قريبًا</option>
                </select>
              </div>
            </div>

            {/* ISLAMIC ACCOUNT */}
            <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-xl border border-[#dce7f5] bg-white px-3 py-3 text-[11px] font-bold text-[#123B72] sm:mt-5 sm:text-[12px]">
              <input
                type="checkbox"
                checked={islamic}
                onChange={(e) => setIslamic(e.target.checked)}
                className="h-4 w-4 accent-[#2B6FD0]"
              />
              أحتاج حساب تداول إسلاميًا
            </label>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 border-t border-[#dce7f5] pt-4 sm:mt-6 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:pt-5">
          <p className="mb-3 text-[11px] leading-5 text-[#58779d] sm:mb-0 sm:text-[12px]">
            {canSearch
              ? "اختياراتك جاهزة. اعرض نتائج المقارنة الآن."
              : "اختر الدولة ومعيارًا إضافيًا لتفعيل المقارنة."}
          </p>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={search}
              disabled={!canSearch || rankingsError}
              className="min-h-11 flex-1 rounded-xl bg-[#1E5BB8] px-5 py-3 text-[12px] font-black text-white shadow-[0_5px_15px_rgba(30,91,184,0.22)] transition hover:bg-[#184A97] disabled:cursor-not-allowed disabled:bg-[#c8d4e4] disabled:shadow-none sm:order-2 sm:flex-none sm:px-8 sm:text-[13px]"
            >
              عرض نتائج المقارنة ←
            </button>

            <button
              type="button"
              onClick={reset}
              className="min-h-11 rounded-xl border border-[#cbdcf2] bg-white px-4 py-3 text-[11px] font-bold text-[#184A97] transition hover:bg-[#eef5fd] sm:order-1 sm:px-5 sm:text-[12px]"
            >
              إعادة ضبط
            </button>
          </div>
        </div>
      </div>

      {/* ERROR */}
      {rankingsError && (
        <p
          role="alert"
          className="mx-4 mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700"
        >
          تعذر تحميل تصنيفات الدول حاليًا. يرجى إعادة المحاولة لاحقًا.
        </p>
      )}

      {/* RESULTS */}
      {submitted && !rankingsError && (
        <div
          aria-live="polite"
          className="border-t border-[#c7daf3] bg-[#f1f6ff] p-3.5 sm:p-7"
        >
          {/* RESULTS HEADER */}
          <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[18px] font-black text-[#081a33] sm:text-xl">
                نتائج المقارنة
              </h3>

              <p className="mt-1 text-[11px] leading-5 text-[#58779d] sm:text-xs sm:leading-6">
                الوسطاء المطابقون لتفضيلاتك، حسب ترتيب الدولة.
              </p>
            </div>

            {selectedCountry && (
              <Link
                href={`/best-brokers/${selectedCountry.slug}`}
                className="w-fit text-[11px] font-black text-[#1E5BB8] hover:underline sm:text-xs"
              >
                تصنيف الوسطاء في {selectedCountry.name} ←
              </Link>
            )}
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-[#d6e5f8] bg-white p-5 text-center text-sm text-slate-600">
              {countryRankings.some(
                (row) => row.country_id === selectedCountry?.id
              )
                ? "لا توجد شركات تطابق الفلاتر المختارة ضمن تصنيف هذه الدولة. جرّب تعديل اختياراتك."
                : "لا توجد تصنيفات وسطاء متاحة لهذه الدولة حاليًا."}
            </div>
          ) : (
            <>
              {/* MOBILE BROKER CARDS */}
              <div className="grid gap-3 lg:hidden">
                {results.map((broker, index) => (
                  <article
                    key={broker.id}
                    className={`overflow-hidden rounded-2xl border bg-white shadow-[0_4px_16px_rgba(24,74,151,0.06)] ${
                      index === 0
                        ? "border-[#a9c8f1]"
                        : "border-[#d6e5f8]"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${
                        index === 0
                          ? "border-[#c7daf3] bg-[#eaf3ff]"
                          : "border-[#edf2f9] bg-[#fafcff]"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1E5BB8] text-[12px] font-black text-white">
                          {broker.rank_position}
                        </span>

                        <Link
                          href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`فتح تقييم ${broker.name || "الوسيط"} في تبويب جديد`}
                          className="flex h-12 min-w-0 items-center rounded-lg px-1 transition hover:bg-white"
                        >
                          {broker.logo ? (
                            <img
                              src={broker.logo}
                              alt={`شعار ${broker.name || "الوسيط"}`}
                              loading="lazy"
                              className="max-h-11 max-w-[145px] object-contain"
                            />
                          ) : (
                            <strong className="text-[13px] text-[#081a33]">
                              {broker.name || "وسيط تداول"}
                            </strong>
                          )}
                        </Link>
                      </div>

                      {index === 0 && (
                        <span className="shrink-0 rounded-full bg-[#1E5BB8] px-2.5 py-1 text-[10px] font-black text-white">
                          الأول في النتائج
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      {/* KEY METRICS */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl border border-[#e0eaf8] bg-[#f8fbff] p-3 text-center">
                          <span className="block text-[10px] font-bold text-[#6b82a2]">
                            التقييم
                          </span>
                          <strong className="mt-1 block text-[16px] font-black text-[#184A97]">
                            ★{" "}
                            {ratingNumber(
                              broker.country_rating ?? broker.rating
                            ) > 0
                              ? ratingNumber(
                                  broker.country_rating ?? broker.rating
                                ).toFixed(2)
                              : "—"}
                            <span className="mr-1 text-[10px] font-bold text-[#6b82a2]">
                              / 5
                            </span>
                          </strong>
                        </div>

                        <div className="rounded-xl border border-[#e0eaf8] bg-[#f8fbff] p-3 text-center">
                          <span className="block text-[10px] font-bold text-[#6b82a2]">
                            الحد الأدنى للإيداع
                          </span>
                          <strong className="mt-1 block text-[16px] font-black text-[#081a33]">
                            {broker.min_deposit === null
                              ? "غير محدد"
                              : `$${broker.min_deposit.toLocaleString("en-US")}`}
                          </strong>
                        </div>
                      </div>

                      {/* BROKER DESCRIPTION */}
                      <p className="mt-3 rounded-xl bg-[#f7f9fd] px-3 py-3 text-[11px] leading-6 text-[#526784]">
                        {broker.local_note ||
                          broker.country_best_for ||
                          broker.key_strength_ar ||
                          broker.best_for ||
                          "اطلع على تقييم الوسيط لمعرفة التفاصيل."}
                      </p>

                      {/* MOBILE ACTION BUTTONS */}
<div className="mt-3 grid grid-cols-2 gap-2.5">
  <Link
    href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
    target="_blank"
    rel="noopener noreferrer"
    className="flex min-h-11 items-center justify-center rounded-xl border border-[#bfd3ee] bg-[#f4f8ff] px-2 py-3 text-center text-[11px] font-black text-[#1E5BB8] transition hover:bg-[#e5efff]"
  >
    قراءة التقييم ←
  </Link>

  {broker.real_account_url ? (
    <a
      href={broker.real_account_url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex min-h-11 items-center justify-center rounded-xl bg-[#1E5BB8] px-2 py-3 text-center text-[11px] font-black text-white shadow-[0_4px_12px_rgba(30,91,184,0.14)] transition hover:bg-[#184A97]"
    >
      فتح حساب ↗
    </a>
  ) : (
    <span className="flex min-h-11 items-center justify-center rounded-xl bg-slate-200 px-2 py-3 text-center text-[11px] font-bold text-slate-500">
      فتح حساب غير متاح
    </span>
  )}
</div>
                    </div>
                  </article>
                ))}
              </div>

              {/* DESKTOP TABLE — UNCHANGED STRUCTURE */}
              <div className="hidden overflow-hidden rounded-2xl border border-[#cbdcf2] bg-white shadow-[0_5px_20px_rgba(24,74,151,0.05)] lg:block">
                <div className="grid grid-cols-[1.3fr_0.6fr_0.7fr_1.6fr_0.9fr] gap-3 bg-[#dfeaf9] px-5 py-4 text-[11px] font-black text-[#123B72]">
                  <span>شركة التداول</span>
                  <span>التقييم</span>
                  <span>الإيداع</span>
                  <span>معلومات الوسيط</span>
                  <span>التفاصيل</span>
                </div>

                {results.map((broker) => (
                  <div
                    key={broker.id}
                    className="grid grid-cols-[1.3fr_0.6fr_0.7fr_1.6fr_0.9fr] items-center gap-3 border-t border-[#e5edf8] px-5 py-4 first:border-t-0"
                  >
                    {/* BROKER */}
                    <div className="flex min-h-[76px] items-center justify-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d6e5f8] bg-[#e8f1ff] text-[12px] font-black text-[#1E5BB8]">
                        {broker.rank_position}
                      </span>

                      <Link
                        href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`فتح تقييم ${broker.name || "الوسيط"} في تبويب جديد`}
                        title={`قراءة تقييم ${broker.name || "الوسيط"}`}
                        className="group/logo flex h-[72px] w-[155px] shrink-0 cursor-pointer items-center justify-start rounded-lg transition-all duration-200 hover:bg-[#eef5fd]"
                      >
                        {broker.logo ? (
                          <img
                            src={broker.logo}
                            alt={`شعار ${broker.name || "الوسيط"}`}
                            loading="lazy"
                            className="block max-h-[65px] max-w-[155px] object-contain object-right transition-transform duration-200 group-hover/logo:scale-105"
                          />
                        ) : (
                          <span className="text-[14px] font-black text-[#081a33]">
                            {broker.name || "وسيط تداول"}
                          </span>
                        )}
                      </Link>
                    </div>

                    {/* RATING */}
                    <div className="text-[13px] font-black text-[#184A97]">
                      ★{" "}
                      {ratingNumber(
                        broker.country_rating ?? broker.rating
                      ) > 0
                        ? ratingNumber(
                            broker.country_rating ?? broker.rating
                          ).toFixed(2)
                        : "—"}{" "}
                      / 5
                    </div>

                    {/* DEPOSIT */}
                    <div className="text-[12px] font-bold text-slate-700">
                      {broker.min_deposit === null
                        ? "غير محدد"
                        : `$${broker.min_deposit.toLocaleString("en-US")}`}
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-[12px] leading-6 text-slate-600">
                      {broker.local_note ||
                        broker.country_best_for ||
                        broker.key_strength_ar ||
                        broker.best_for ||
                        "اطلع على تقييم الوسيط لمعرفة التفاصيل."}
                    </p>

                    {/* DESKTOP ACTION BUTTONS */}
<div className="flex items-center gap-2">
  <Link
    href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
    target="_blank"
    rel="noopener noreferrer"
    className="flex min-h-10 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-[#bfd3ee] bg-[#f4f8ff] px-2 text-[11px] font-black text-[#1E5BB8] transition hover:border-[#2B6FD0] hover:bg-[#e5efff]"
  >
    قراءة التقييم
  </Link>

  {broker.real_account_url ? (
    <a
      href={broker.real_account_url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex min-h-10 flex-1 items-center justify-center whitespace-nowrap rounded-xl bg-[#1E5BB8] px-2 text-[11px] font-black text-white transition hover:bg-[#184A97]"
    >
      فتح حساب ↗
    </a>
  ) : (
    <span className="flex min-h-10 flex-1 items-center justify-center rounded-xl bg-slate-200 px-2 text-center text-[10px] font-bold text-slate-500">
      غير متاح
    </span>
  )}
</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* DISCLAIMER */}
          <p className="mt-4 text-[10px] leading-5 text-[#58779d] sm:mt-5 sm:text-[11px] sm:leading-6">
            تعتمد النتائج على ترتيب الوسطاء المعتمد لكل دولة في بروكر العرب،
            مع تطبيق معايير الإيداع ومنصة التداول والحساب الإسلامي عند اختيارها.
            يُرجى التحقق من أهلية فتح الحساب والتراخيص وشروط التداول قبل التسجيل.
          </p>
        </div>
      )}
    </div>
  );
}
