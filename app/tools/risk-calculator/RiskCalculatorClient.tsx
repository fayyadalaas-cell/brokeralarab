"use client";

import { useMemo, useState } from "react";

type InstrumentKey =
  | "EURUSD"
  | "GBPUSD"
  | "AUDUSD"
  | "NZDUSD"
  | "USDJPY"
  | "XAUUSD";

const instruments: Record<
  InstrumentKey,
  {
    label: string;
    pipValuePerLot: number;
    stopLabel: string;
    stopPlaceholder: string;
    note: string;
  }
> = {
  EURUSD: {
    label: "EUR/USD",
    pipValuePerLot: 10,
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    note: "قيمة النقطة التقريبية للوت القياسي على EUR/USD هي 10 دولار.",
  },
  GBPUSD: {
    label: "GBP/USD",
    pipValuePerLot: 10,
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    note: "قيمة النقطة التقريبية للوت القياسي على GBP/USD هي 10 دولار.",
  },
  AUDUSD: {
    label: "AUD/USD",
    pipValuePerLot: 10,
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    note: "قيمة النقطة التقريبية للوت القياسي على AUD/USD هي 10 دولار.",
  },
  NZDUSD: {
    label: "NZD/USD",
    pipValuePerLot: 10,
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    note: "قيمة النقطة التقريبية للوت القياسي على NZD/USD هي 10 دولار.",
  },
  USDJPY: {
    label: "USD/JPY",
    pipValuePerLot: 9.1,
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    note: "قيمة النقطة على USD/JPY تقريبية وتتغير حسب السعر الحالي للزوج.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    pipValuePerLot: 100,
    stopLabel: "مسافة وقف الخسارة في سعر الذهب",
    stopPlaceholder: "مثال: 5 أو 10",
    note: "مثال: إذا كان الدخول من 2350 ووقف الخسارة عند 2345، اكتب 5 وليس مبلغ الخسارة بالدولار.",
  },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatLot(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0.00";
  return value.toFixed(2);
}

export default function RiskCalculatorClient() {
  const [balance, setBalance] = useState("1000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [instrument, setInstrument] = useState<InstrumentKey>("EURUSD");
  const [stopLoss, setStopLoss] = useState("50");
  const [showResult, setShowResult] = useState(false);
const [showGuideMore, setShowGuideMore] = useState(false);

const current = instruments[instrument];

  const result = useMemo(() => {
    const b = Number(balance);
    const r = Number(riskPercent);
    const sl = Number(stopLoss);

    if (!Number.isFinite(b) || !Number.isFinite(r) || !Number.isFinite(sl)) {
      return null;
    }

    if (b <= 0 || r <= 0 || sl <= 0) return null;

    const riskAmount = b * (r / 100);
    const lotSize = riskAmount / (sl * current.pipValuePerLot);

    if (!Number.isFinite(lotSize) || lotSize <= 0) return null;

    let riskStatus = "مخاطرة منخفضة";
    let riskText =
      "هذه نسبة محافظة نسبياً وتناسب أغلب المتداولين الذين يريدون حماية رأس المال.";

    if (r > 2 && r <= 5) {
      riskStatus = "مخاطرة متوسطة";
      riskText =
        "هذه النسبة تحتاج حذر أكبر، خصوصاً إذا كنت تفتح أكثر من صفقة في نفس الوقت.";
    }

    if (r > 5) {
      riskStatus = "مخاطرة مرتفعة جداً";
      riskText = `أنت تخاطر بـ ${money(
        riskAmount
      )} في صفقة واحدة. راجع حجم اللوت قبل الدخول.`;
    }

    return {
      riskAmount,
      lotSize,
      riskStatus,
      riskText,
      riskPercent: r,
      stopLoss: sl,
    };
  }, [balance, riskPercent, stopLoss, current.pipValuePerLot]);

  function handleCalculate() {
    setShowResult(true);
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f7fb] text-slate-900">
      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
        {/* HERO */}
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-10 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="text-center lg:text-right">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 sm:px-4 sm:py-1.5 sm:text-sm">
                أدوات التداول
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                حاسبة إدارة المخاطر في الفوركس والذهب
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب حجم الصفقة المناسب قبل الدخول إلى السوق بناءً على رصيد
                الحساب، نسبة المخاطرة، نوع الأصل المالي، ووقف الخسارة.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  ابدأ الحساب الآن
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح إدارة المخاطر
                </a>
              </div>
            </div>

            <div className="rounded-[1.25rem] bg-slate-950 p-4 text-white shadow-sm sm:rounded-[1.75rem] sm:p-6">
              <p className="text-sm font-bold text-blue-300">مثال سريع</p>

              <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4">
                <div className="rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-5">
                  <p className="text-xs text-slate-300 sm:text-sm">
                    رصيد الحساب
                  </p>
                  <p className="mt-1 text-xl font-extrabold sm:mt-2 sm:text-3xl">
                    $1,000
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-5">
                  <p className="text-xs text-slate-300 sm:text-sm">المخاطرة</p>
                  <p className="mt-1 text-xl font-extrabold sm:mt-2 sm:text-3xl">
                    $10 = 1%
                  </p>
                </div>

                <div className="rounded-xl bg-blue-600/20 p-3 sm:rounded-2xl sm:p-5">
                  <p className="text-xs text-blue-100 sm:text-sm">الهدف</p>
                  <p className="mt-1 text-base font-extrabold leading-7 sm:mt-2 sm:text-2xl sm:leading-snug">
  لا تجعل صفقة واحدة تهدد الحساب
</p>
                </div>
              </div>
            </div>
          </div>
        </div>

     {/* CALCULATOR */}
<div
  id="calculator"
  className="mt-4 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:mt-8 sm:rounded-[2rem]"
>
  <div className="border-b border-slate-100 bg-gradient-to-l from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
  <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
    <div className="text-center lg:text-right">
    

      <h2 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
        حاسبة إدارة المخاطر في التداول
      </h2>
    </div>

    <div>
      <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
  احسب حجم اللوت المناسب وقيمة المخاطرة المحتملة قبل فتح أي صفقة في الفوركس أو الذهب، بناءً على رصيد الحساب ونسبة المخاطرة ووقف الخسارة.
</p>

      <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
        احسب المخاطرة وحجم اللوت قبل فتح الصفقة.
      </p>
    </div>
  </div>
</div>

  <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
    {/* FORM */}
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 sm:rounded-[2rem] sm:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            رصيد الحساب بالدولار
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4 py-2.5 py-2.5 py-2.5"
            placeholder="مثال: 1000"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            نسبة المخاطرة %
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4 py-2.5"
            placeholder="مثال: 1"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            الأصل المالي
          </label>
          <select
            value={instrument}
            onChange={(e) => setInstrument(e.target.value as InstrumentKey)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4 py-2.5"
          >
            {Object.entries(instruments).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            {current.note}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            {current.stopLabel}
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4 py-2.5"
            placeholder={current.stopPlaceholder}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-950 sm:text-base"
      >
         احسب المخاطرة الآن
      </button>

      <p className="mt-4 text-center text-xs leading-6 text-slate-500">
        النتائج تقريبية وقد تختلف حسب الوسيط، نوع الحساب، العمولة، السبريد، وحجم العقد.
      </p>
    </div>

   {/* RESULT */}
<div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
  <div className="mb-3 flex items-center justify-between gap-3">
    <div>
      <p className="text-xs font-bold text-blue-700">نتيجة الحساب</p>
      <h3 className="mt-1 text-xl font-extrabold text-slate-950">
        ملخص الصفقة
      </h3>
    </div>
    <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
      مباشر
    </div>
  </div>

  {showResult && result ? (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
        <p className="text-xs font-bold text-slate-500 sm:text-sm">
          قيمة المخاطرة
        </p>
        <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
          {money(result.riskAmount)}
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
          تعادل {result.riskPercent}% من رأس المال.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
        <p className="text-xs font-bold text-slate-500 sm:text-sm">
          حجم اللوت
        </p>
        <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
          {formatLot(result.lotSize)} لوت
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
          بناءً على وقف {result.stopLoss}.
        </p>
      </div>

      <div className="rounded-2xl bg-blue-50 p-3 sm:p-4">
        <p className="text-xs font-bold text-blue-700 sm:text-sm">
          مستوى المخاطرة
        </p>
        <p className="mt-1 text-xl font-extrabold text-slate-950 sm:mt-2 sm:text-2xl">
          {result.riskStatus}
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-2 sm:leading-6">
          {result.riskPercent > 5
            ? "راجع حجم اللوت قبل الدخول."
            : result.riskText}
        </p>
      </div>
    </div>
  ) : (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm leading-7 text-slate-600">
        أدخل بيانات الصفقة واضغط على زر الحساب حتى تظهر النتيجة هنا.
      </p>
    </div>
  )}

  {showResult && !result && (
    <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
      تأكد من إدخال أرقام صحيحة أكبر من صفر.
    </p>
  )}
</div>
</div>
</div>

     {/* CONTENT */}
<article
  id="guide"
  className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:mt-8 sm:rounded-[2rem]"
>
  <div className="border-b border-slate-100 bg-gradient-to-l from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
    <p className="text-sm font-bold text-blue-700">آخر تحديث: يونيو 2026</p>

    <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
      دليل إدارة المخاطر في التداول قبل فتح الصفقة
    </h2>

    <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
      إدارة المخاطر ليست مجرد خطوة إضافية في التداول، بل هي الأساس الذي يحدد هل
      يمكن للحساب أن يستمر بعد سلسلة خسائر أم لا. لذلك صممنا هذه الحاسبة
      لمساعدة المتداول على ربط حجم الصفقة برصيد الحساب، نسبة المخاطرة، ومسافة
      وقف الخسارة بدلاً من اختيار حجم اللوت بشكل عشوائي.
    </p>
  </div>

  <div className="p-5 sm:p-8 lg:p-10 [&_p]:text-justify">
    <div
      className={`space-y-6 overflow-hidden transition-all duration-300 lg:max-h-none ${
        showGuideMore ? "max-h-[8000px]" : "max-h-[980px]"
      }`}
    >
      <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          كيف يتم حساب حجم اللوت؟
        </h3>

        <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
          {[
            "رصيد الحساب",
            "نسبة المخاطرة",
            "قيمة المخاطرة",
            "وقف الخسارة",
            "حجم اللوت",
          ].map((item, index) => (
            <div key={item} className="flex items-center gap-3 sm:block">
              <div className="flex-1 rounded-2xl bg-white p-4 text-center text-sm font-extrabold text-slate-800 shadow-sm">
                {item}
              </div>
              {index < 4 && (
                <span className="text-xl font-extrabold text-blue-600 sm:mt-3 sm:block sm:text-center">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
          الفكرة بسيطة: لا تبدأ من حجم اللوت، بل ابدأ من مقدار الخسارة التي
          تقبلها إذا ضرب السعر وقف الخسارة. بعد ذلك يتم تحديد حجم الصفقة المناسب
          بناءً على مسافة وقف الخسارة.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            المفهوم
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
            ما هي حاسبة إدارة المخاطر؟
          </h3>
          <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
            هي أداة تساعد المتداول على معرفة حجم الصفقة المناسب قبل فتح الصفقة.
            بدلاً من اختيار حجم اللوت بشكل عشوائي، تقوم الحاسبة بربط حجم الصفقة
            برصيد الحساب، نسبة المخاطرة، ووقف الخسارة.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            الهدف
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
            لماذا تحتاجها؟
          </h3>
          <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
            لأن الحساب المسبق للمخاطرة يعطيك صورة واضحة عن أسوأ سيناريو إذا وصلت
            الصفقة إلى وقف الخسارة، ويمنعك من الدخول بحجم لوت لا يناسب رأس
            المال.
          </p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
            المعادلة
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
            كيف يتم الحساب؟
          </h3>
          <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700 sm:p-5">
            قيمة المخاطرة = رصيد الحساب × نسبة المخاطرة
            <br />
            حجم اللوت = قيمة المخاطرة ÷ مسافة وقف الخسارة ÷ قيمة النقطة
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          أمثلة على حساب حجم اللوت
        </h3>

        {/* Desktop Table */}
        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="p-3 font-extrabold">رصيد الحساب</th>
                <th className="p-3 font-extrabold">المخاطرة</th>
                <th className="p-3 font-extrabold">وقف الخسارة</th>
                <th className="p-3 font-extrabold">حجم اللوت</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {[
                ["$1,000", "1%", "50 نقطة", "0.02"],
                ["$5,000", "1%", "50 نقطة", "0.10"],
                ["$10,000", "2%", "50 نقطة", "0.40"],
              ].map((row) => (
                <tr key={row.join("-")} className="bg-white">
                  {row.map((cell) => (
                    <td key={cell} className="p-4 font-bold text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="mt-5 space-y-4 md:hidden">
          {[
            {
              balance: "$1,000",
              risk: "1%",
              stop: "50 نقطة",
              lot: "0.02",
            },
            {
              balance: "$5,000",
              risk: "1%",
              stop: "50 نقطة",
              lot: "0.10",
            },
            {
              balance: "$10,000",
              risk: "2%",
              stop: "50 نقطة",
              lot: "0.40",
            },
          ].map((row) => (
            <div
              key={row.balance}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-500">رصيد الحساب</span>
                  <div className="mt-1 font-extrabold text-slate-900">
                    {row.balance}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500">المخاطرة</span>
                  <div className="mt-1 font-extrabold text-slate-900">
                    {row.risk}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500">وقف الخسارة</span>
                  <div className="mt-1 font-extrabold text-slate-900">
                    {row.stop}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500">حجم اللوت</span>
                  <div className="mt-1 font-extrabold text-blue-700">
                    {row.lot}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm leading-8 text-slate-600">
          هذه الأمثلة تقريبية وتفترض أن قيمة النقطة للوت القياسي على زوج مثل
          EUR/USD تساوي حوالي 10 دولارات.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
          <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
            ما هي نسبة المخاطرة المناسبة؟
          </h3>
          <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
            لا توجد نسبة واحدة مناسبة لجميع المتداولين، لكن كثيراً من المتداولين
            المحافظين يستخدمون نسبة بين 1% و2% من رأس المال في الصفقة الواحدة.
            هذه النسبة تساعد على تقليل تأثير الخسائر المتتالية وتمنح الحساب
            فرصة أكبر للاستمرار.
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
            المخاطرة بنسبة 5% أو أكثر في صفقة واحدة تعتبر مرتفعة، خصوصاً إذا
            كان المتداول يفتح أكثر من صفقة في نفس الوقت. المشكلة ليست في صفقة
            واحدة فقط، بل في تراكم الصفقات والخسائر.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm sm:p-7">
          <h3 className="text-xl font-extrabold sm:text-2xl">مثال عملي سريع</h3>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-xs text-slate-300">رصيد الحساب</div>
              <div className="mt-1 text-2xl font-extrabold">$1,000</div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-xs text-slate-300">المخاطرة</div>
              <div className="mt-1 text-2xl font-extrabold">$10</div>
            </div>

            <div className="rounded-2xl bg-blue-600/20 p-4">
              <div className="text-xs text-blue-200">حجم اللوت</div>
              <div className="mt-1 text-2xl font-extrabold">0.02</div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          خطأ شائع: حجم اللوت الكبير قد يضخم الخسارة بسرعة
        </h3>
        <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
          إذا كان حسابك 1000 دولار وفتحت صفقة بحجم 1 لوت على EUR/USD، فإن حركة
          10 نقاط فقط ضدك قد تعني خسارة تقارب 100 دولار، أي حوالي 10% من رأس
          المال. لذلك لا يكفي أن تكون الصفقة “صحيحة” من ناحية التحليل؛ يجب أن
          يكون حجم الصفقة مناسباً للحساب.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          المتداول المحترف مقابل المتداول العشوائي
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <h4 className="font-extrabold text-green-800">المتداول المحترف</h4>
            <ul className="mt-4 space-y-3 text-sm font-bold leading-7 text-green-900">
              <li>✓ يحسب المخاطرة قبل الدخول</li>
              <li>✓ يحدد وقف الخسارة مسبقاً</li>
              <li>✓ يختار حجم اللوت بناءً على الحساب</li>
              <li>✓ لا يرفع المخاطرة بعد الخسارة</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <h4 className="font-extrabold text-red-800">المتداول العشوائي</h4>
            <ul className="mt-4 space-y-3 text-sm font-bold leading-7 text-red-900">
              <li>✕ يدخل الصفقة مباشرة بدون حساب</li>
              <li>✕ يستخدم حجم لوت ثابت دائماً</li>
              <li>✕ يحرك وقف الخسارة عند الخسارة</li>
              <li>✕ يخاطر بنسبة عالية لتعويض خسارة سابقة</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          إدارة المخاطر في تداول الذهب
        </h3>
        <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
          عند استخدام الحاسبة مع XAUUSD، لا تكتب مبلغ الخسارة بالدولار في خانة
          وقف الخسارة. اكتب فرق سعر الذهب بين نقطة الدخول ووقف الخسارة. إذا كان
          الدخول من 2350 ووقف الخسارة عند 2345، فإن المسافة هي 5 دولارات.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          قواعد مهمة لإدارة رأس المال
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {[
            "لا تخاطر بأكثر من 1% إلى 2% إذا كنت مبتدئاً.",
            "لا ترفع المخاطرة بعد خسارة صفقة.",
            "لا تدخل أكثر من صفقة بنفس الاتجاه بدون حساب المخاطرة.",
            "لا تحرك وقف الخسارة بعيداً عندما تتحرك الصفقة ضدك.",
          ].map((item) => (
            <div
              key={item}
              className="
rounded-2xl
border
border-slate-200
bg-white
px-4
py-3
text-sm
font-bold
leading-6
text-slate-700
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:border-blue-200
hover:bg-blue-50
hover:text-blue-700
hover:shadow-lg
sm:rounded-3xl
sm:p-6
sm:leading-7
"
            >
              <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-right">
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-extrabold">
    ✓
  </div>

  <span className="block">{item}</span>
</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          أخطاء شائعة في إدارة المخاطر
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {[
            "استخدام حجم لوت ثابت في كل الصفقات بدون النظر إلى وقف الخسارة.",
            "رفع نسبة المخاطرة بعد خسارة صفقة لتعويض الخسارة بسرعة.",
            "فتح عدة صفقات في نفس الاتجاه بدون حساب المخاطرة الإجمالية.",
            "تحريك وقف الخسارة بعيداً عندما تتحرك الصفقة عكس التوقع.",
            "الاعتماد على الرافعة المالية بدون فهم تأثيرها على الهامش والخسارة.",
            "الدخول بحجم صفقة كبير على الذهب بسبب الطمع في الربح السريع.",
          ].map((item) => (
            <div
              key={item}
              className="
rounded-2xl
border
border-slate-200
bg-white
px-4
py-3
text-sm
font-bold
leading-6
text-slate-700
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:border-red-200
hover:bg-red-50
hover:text-red-700
hover:shadow-lg
sm:rounded-3xl
sm:p-6
sm:leading-7
"
            >
           <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-right">
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 font-extrabold">
    ⚠
  </div>

  <span className="block">{item}</span>
</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          هل الحاسبة تعطي نتيجة دقيقة 100%؟
        </h3>
        <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
          الحاسبة تعطي نتيجة تقريبية مبنية على قيم قياسية شائعة في الفوركس
          والذهب. لكنها لا يمكن أن تكون مطابقة لكل وسيط في كل الحالات، لأن
          الوسطاء قد يختلفون في حجم العقد، طريقة حساب النقطة، عملة الحساب،
          العمولة، السبريد، وشروط تنفيذ الصفقة.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
          أدوات تداول أخرى
        </h3>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {[
            ["حاسبة حجم اللوت", "/tools/lot-size-calculator"],
            ["حاسبة قيمة النقطة", "/tools/pip-calculator"],
            ["حاسبة الهامش", "/tools/margin-calculator"],
            ["حاسبة الأرباح والخسائر", "/tools/profit-calculator"],
          ].map(([title, href]) => (
            <a
              key={title}
              href={href}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-extrabold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
            >
              {title}
            </a>
          ))}
        </div>
      </section>
    </div>

    {!showGuideMore && (
      <div className="relative -mt-24 bg-gradient-to-t from-white via-white to-transparent pt-28 lg:hidden">
        <button
          type="button"
          onClick={() => setShowGuideMore(true)}
          className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white"
        >
          عرض المزيد من الشرح
        </button>
      </div>
    )}

    {showGuideMore && (
      <button
        type="button"
        onClick={() => setShowGuideMore(false)}
        className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 lg:hidden"
      >
        عرض أقل
      </button>
    )}
  </div>
</article>

        {/* FAQ */}
        <section className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:rounded-[2rem] sm:p-8 lg:p-10">
          <h2 className="text-center text-2xl font-extrabold leading-snug text-slate-950 sm:text-right lg:text-3xl">
            أسئلة شائعة حول حاسبة إدارة المخاطر
          </h2>

          <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4">
            {[
              {
                q: "ما فائدة حاسبة إدارة المخاطر؟",
                a: "تساعدك على معرفة قيمة الخسارة المحتملة وحجم اللوت المناسب قبل فتح الصفقة.",
              },
              {
                q: "هل تصلح الحاسبة للفوركس والذهب؟",
                a: "نعم، يمكن استخدامها للأزواج الرئيسية والذهب، مع اعتبار النتائج تقديرية.",
              },
              {
                q: "ما أفضل نسبة مخاطرة للمتداول المبتدئ؟",
                a: "غالباً تكون 1% أو أقل مناسبة كبداية، خصوصاً للمتداولين الجدد.",
              },
              {
                q: "هل حجم اللوت الناتج نهائي؟",
                a: "لا، هو حجم تقريبي. يجب مراجعة منصة التداول وشروط الوسيط قبل تنفيذ الصفقة.",
              },
              {
                q: "ماذا أكتب في خانة وقف الخسارة للذهب؟",
                a: "اكتب فرق سعر الذهب بين الدخول ووقف الخسارة. إذا كان الدخول 2350 والوقف 2345، اكتب 5.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
              >
                <summary className="cursor-pointer text-base font-extrabold leading-7 text-slate-950 sm:text-lg">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}