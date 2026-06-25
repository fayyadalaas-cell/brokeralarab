"use client";

import { useMemo, useState } from "react";

type InstrumentKey =
  | "EURUSD"
  | "GBPUSD"
  | "AUDUSD"
  | "NZDUSD"
  | "USDCAD"
  | "USDCHF"
  | "USDJPY"
  | "XAUUSD";

const instruments: Record<
  InstrumentKey,
  {
    label: string;
    contractSize: number;
    pipSize: number;
    defaultPrice: string;
    defaultStopLoss: string;
    stopLabel: string;
    stopPlaceholder: string;
    priceLabel: string;
    pricePlaceholder: string;
    calculationType: "quote-usd" | "base-usd" | "gold";
    note: string;
  }
> = {
  EURUSD: {
    label: "EUR/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.0800",
    defaultStopLoss: "50",
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    priceLabel: "سعر EUR/USD الحالي",
    pricePlaceholder: "مثال: 1.0800",
    calculationType: "quote-usd",
    note: "في EUR/USD، قيمة النقطة للوت القياسي غالباً 10 دولارات تقريباً.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.2700",
    defaultStopLoss: "50",
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    priceLabel: "سعر GBP/USD الحالي",
    pricePlaceholder: "مثال: 1.2700",
    calculationType: "quote-usd",
    note: "في GBP/USD، قيمة النقطة للوت القياسي غالباً 10 دولارات تقريباً.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.6600",
    defaultStopLoss: "50",
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    priceLabel: "سعر AUD/USD الحالي",
    pricePlaceholder: "مثال: 0.6600",
    calculationType: "quote-usd",
    note: "في AUD/USD، الدولار هو عملة التسعير، لذلك تكون قيمة النقطة مباشرة بالدولار.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.6100",
    defaultStopLoss: "50",
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    priceLabel: "سعر NZD/USD الحالي",
    pricePlaceholder: "مثال: 0.6100",
    calculationType: "quote-usd",
    note: "في NZD/USD، قيمة النقطة للوت القياسي غالباً 10 دولارات تقريباً.",
  },
  USDCAD: {
    label: "USD/CAD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.3700",
    defaultStopLoss: "50",
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    priceLabel: "سعر USD/CAD الحالي",
    pricePlaceholder: "مثال: 1.3700",
    calculationType: "base-usd",
    note: "في USD/CAD، يتم حساب قيمة النقطة بعملة CAD ثم تحويلها إلى الدولار حسب السعر الحالي.",
  },
  USDCHF: {
    label: "USD/CHF",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.9000",
    defaultStopLoss: "50",
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    priceLabel: "سعر USD/CHF الحالي",
    pricePlaceholder: "مثال: 0.9000",
    calculationType: "base-usd",
    note: "في USD/CHF، قيمة النقطة بالدولار تتغير حسب السعر الحالي للزوج.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    pipSize: 0.01,
    defaultPrice: "150.00",
    defaultStopLoss: "50",
    stopLabel: "وقف الخسارة بالنقاط",
    stopPlaceholder: "مثال: 50",
    priceLabel: "سعر USD/JPY الحالي",
    pricePlaceholder: "مثال: 150.00",
    calculationType: "base-usd",
    note: "أزواج الين تستخدم غالباً 0.01 كنقطة واحدة، لذلك يتم تحويل قيمة النقطة حسب السعر الحالي.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    pipSize: 0.01,
    defaultPrice: "2350",
    defaultStopLoss: "5",
    stopLabel: "مسافة وقف الخسارة في سعر الذهب",
    stopPlaceholder: "مثال: 5",
    priceLabel: "سعر الذهب الحالي",
    pricePlaceholder: "مثال: 2350",
    calculationType: "gold",
    note: "في الذهب، نفترض أن 1 لوت يساوي 100 أونصة وأن حركة 0.01 هي وحدة حساب النقطة. قد يختلف ذلك حسب الوسيط.",
  },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function numberFormat(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(value);
}

function lotFormat(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0.00";
  return value.toFixed(2);
}

export default function LotSizeCalculatorClient() {
  const [balance, setBalance] = useState("1000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [instrument, setInstrument] = useState<InstrumentKey>("EURUSD");
  const [price, setPrice] = useState(instruments.EURUSD.defaultPrice);
  const [stopLoss, setStopLoss] = useState(instruments.EURUSD.defaultStopLoss);
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const current = instruments[instrument];

  function handleInstrumentChange(value: InstrumentKey) {
    setInstrument(value);
    setPrice(instruments[value].defaultPrice);
    setStopLoss(instruments[value].defaultStopLoss);
    setShowResult(false);
  }

  const result = useMemo(() => {
    const accountBalance = Number(balance);
    const risk = Number(riskPercent);
    const marketPrice = Number(price);
    const stop = Number(stopLoss);

    if (
      !Number.isFinite(accountBalance) ||
      !Number.isFinite(risk) ||
      !Number.isFinite(marketPrice) ||
      !Number.isFinite(stop)
    ) {
      return null;
    }

    if (accountBalance <= 0 || risk <= 0 || marketPrice <= 0 || stop <= 0) {
      return null;
    }

    const riskAmount = accountBalance * (risk / 100);

    let pipValuePerOneLot = 0;

    if (current.calculationType === "quote-usd") {
      pipValuePerOneLot = current.contractSize * current.pipSize;
    }

    if (current.calculationType === "base-usd") {
      pipValuePerOneLot =
        (current.contractSize * current.pipSize) / marketPrice;
    }

    if (current.calculationType === "gold") {
      pipValuePerOneLot = current.contractSize * current.pipSize;
    }

    const lotSize = riskAmount / (stop * pipValuePerOneLot);
    const pipValueForSuggestedLot = pipValuePerOneLot * lotSize;
    const estimatedLoss = stop * pipValueForSuggestedLot;

    if (!Number.isFinite(lotSize) || lotSize <= 0) return null;

    let lotStatus = "حجم صفقة محافظ";
    let lotText =
      "حجم اللوت المقترح مناسب نسبياً إذا كانت نسبة المخاطرة منخفضة ووقف الخسارة واضحاً.";

    if (risk > 2 && risk <= 5) {
      lotStatus = "حجم صفقة يحتاج حذر";
      lotText =
        "نسبة المخاطرة أعلى من المستوى المحافظ. تأكد من أن حجم اللوت مناسب لرصيد الحساب.";
    }

    if (risk > 5) {
      lotStatus = "مخاطرة مرتفعة";
      lotText =
        "نسبة المخاطرة مرتفعة وقد تؤدي إلى خسائر كبيرة في حال ضرب وقف الخسارة.";
    }

    return {
      riskAmount,
      pipValuePerOneLot,
      lotSize,
      pipValueForSuggestedLot,
      estimatedLoss,
      lotStatus,
      lotText,
      stop,
      risk,
    };
  }, [balance, riskPercent, price, stopLoss, current]);

  function handleCalculate() {
    setShowResult(true);
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f7fb] text-slate-900">
      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
        {/* HERO */}
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 text-center sm:p-10 lg:p-12 lg:text-right">
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 sm:px-4 sm:py-1.5 sm:text-sm">
                أدوات التداول
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                حاسبة حجم اللوت في الفوركس والذهب
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب حجم اللوت المناسب قبل فتح الصفقة بناءً على رصيد الحساب،
                نسبة المخاطرة، وقف الخسارة، ونوع الأصل المالي. تساعدك الحاسبة
                على اختيار حجم صفقة متوافق مع إدارة رأس المال.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  احسب حجم اللوت الآن
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح حساب اللوت
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-t-0 lg:border-r lg:p-10">
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      رصيد الحساب
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $1,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      المخاطرة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1% = $10
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      حجم اللوت التقريبي
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      0.02 لوت
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  المثال يفترض وقف خسارة 50 نقطة على EUR/USD وقيمة نقطة 10
                  دولارات لكل 1 لوت.
                </p>
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
                <h2 className="text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
                  حاسبة حجم اللوت
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  احسب حجم الصفقة المناسب بناءً على مقدار المال الذي تريد
                  المخاطرة به، ومسافة وقف الخسارة، وقيمة النقطة للأصل المالي
                  المختار.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب اللوت المناسب حسب المخاطرة ووقف الخسارة.
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
                    رصيد الحساب
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
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
                    step="0.1"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    الأصل المالي
                  </label>

                  <select
                    value={instrument}
                    onChange={(e) =>
                      handleInstrumentChange(e.target.value as InstrumentKey)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
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
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder={current.stopPlaceholder}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    {current.priceLabel}
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder={current.pricePlaceholder}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                احسب حجم اللوت الآن
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                تعتمد النتائج على معادلات إدارة رأس المال الشائعة في الفوركس
                وقد تختلف قليلاً حسب مواصفات العقد لدى الوسيط.
              </p>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-600">
                    نتيجة الحساب
                  </p>

                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    حجم اللوت المقترح
                  </h3>
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      حجم اللوت المناسب
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {lotFormat(result.lotSize)}
                    </p>

                    <p className="mt-2 text-xs text-slate-600">
                      حجم الصفقة المقترح بناءً على نسبة المخاطرة المحددة.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        مبلغ المخاطرة
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.riskAmount)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        قيمة النقطة
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.pipValueForSuggestedLot)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          وقف الخسارة
                        </p>

                        <p className="mt-1 font-extrabold text-slate-950">
                          {numberFormat(result.stop)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          الخسارة المقدرة
                        </p>

                        <p className="mt-1 font-extrabold text-slate-950">
                          {money(result.estimatedLoss)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      {result.lotStatus}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.lotText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل بيانات الحساب ثم اضغط على زر الحساب لعرض حجم اللوت
                    المناسب.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  تأكد من إدخال أرقام صحيحة أكبر من صفر.
                </div>
              )}
            </div>
          </div>
        </div>

                {/* SEO CONTENT */}
        <article
          id="guide"
          className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:mt-8 sm:rounded-[2rem]"
        >
          <div className="border-b border-slate-100 bg-gradient-to-l from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <p className="text-sm font-bold text-brand-600">
              آخر تحديث: يونيو 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              دليل حساب حجم اللوت في الفوركس والذهب
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              حجم اللوت هو أحد أهم العوامل التي تحدد مقدار المخاطرة في الصفقة.
              تساعدك حاسبة حجم اللوت على اختيار حجم الصفقة المناسب بناءً على
              رصيد الحساب، نسبة المخاطرة، وقف الخسارة، وقيمة النقطة، بدلاً من
              الدخول بحجم عشوائي قد يعرّض الحساب لخسائر كبيرة.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10 [&_p]:text-justify">
            <div
              className={`space-y-6 overflow-hidden transition-all duration-300 lg:max-h-none ${
                showGuideMore ? "max-h-[14000px]" : "max-h-[980px]"
              }`}
            >
              <section className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  كيف يتم حساب حجم اللوت؟
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "رصيد الحساب",
                    "نسبة المخاطرة",
                    "مبلغ المخاطرة",
                    "وقف الخسارة",
                    "حجم اللوت",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 sm:block">
                      <div className="flex-1 rounded-2xl bg-white p-4 text-center text-sm font-extrabold text-slate-800 shadow-sm">
                        {item}
                      </div>

                      {index < 4 && (
                        <span className="text-xl font-extrabold text-brand-500 sm:mt-3 sm:block sm:text-center">
                          ↓
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  تبدأ طريقة الحساب بتحديد مبلغ المخاطرة أولاً، ثم يتم تقسيم هذا
                  المبلغ على حاصل ضرب وقف الخسارة في قيمة النقطة. الهدف هو أن
                  تكون الخسارة المحتملة عند ضرب وقف الخسارة قريبة من نسبة
                  المخاطرة التي اخترتها.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    المفهوم
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هو حجم اللوت؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    اللوت هو وحدة قياس حجم الصفقة في الفوركس. اللوت القياسي
                    يساوي عادة 100,000 وحدة، والميني لوت يساوي 10,000 وحدة،
                    والمايكرو لوت يساوي 1,000 وحدة. كلما زاد حجم اللوت زادت
                    قيمة النقطة وزادت المخاطرة.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    المخاطرة
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    لماذا لا تختار اللوت عشوائياً؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    اختيار اللوت عشوائياً يجعل الخسارة المحتملة غير واضحة. قد
                    تبدو الصفقة صغيرة، لكن إذا كانت قيمة النقطة مرتفعة ووقف
                    الخسارة واسعاً، فقد تكون الخسارة أكبر بكثير من المتوقع.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    المعادلة
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    معادلة حساب اللوت
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    مبلغ المخاطرة = رصيد الحساب × نسبة المخاطرة
                    <br />
                    حجم اللوت = مبلغ المخاطرة ÷ وقف الخسارة ÷ قيمة النقطة
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أمثلة على حساب حجم اللوت
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">رصيد الحساب</th>
                        <th className="p-4 font-extrabold">المخاطرة</th>
                        <th className="p-4 font-extrabold">وقف الخسارة</th>
                        <th className="p-4 font-extrabold">اللوت المقترح</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["$1,000", "1% = $10", "50 نقطة", "0.02"],
                        ["$2,000", "1% = $20", "50 نقطة", "0.04"],
                        ["$5,000", "2% = $100", "50 نقطة", "0.20"],
                        ["$10,000", "1% = $100", "100 نقطة", "0.10"],
                      ].map((row) => (
                        <tr key={row.join("-")} className="transition hover:bg-brand-50">
                          {row.map((cell, index) => (
                            <td
                              key={cell}
                              className={`p-4 font-bold ${
                                index === 3 ? "text-brand-600" : "text-slate-700"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 space-y-4 md:hidden">
                  {[
                    {
                      balance: "$1,000",
                      risk: "1% = $10",
                      stop: "50 نقطة",
                      lot: "0.02",
                    },
                    {
                      balance: "$2,000",
                      risk: "1% = $20",
                      stop: "50 نقطة",
                      lot: "0.04",
                    },
                    {
                      balance: "$5,000",
                      risk: "2% = $100",
                      stop: "50 نقطة",
                      lot: "0.20",
                    },
                    {
                      balance: "$10,000",
                      risk: "1% = $100",
                      stop: "100 نقطة",
                      lot: "0.10",
                    },
                  ].map((row) => (
                    <div
                      key={`${row.balance}-${row.risk}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">الرصيد</span>
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
                          <span className="text-slate-500">اللوت</span>
                          <div className="mt-1 font-extrabold text-brand-600">
                            {row.lot}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  هذه الأمثلة تقريبية وتفترض أن قيمة النقطة للوت القياسي على
                  EUR/USD تساوي حوالي 10 دولارات. قد تختلف النتائج حسب الزوج،
                  السعر الحالي، وحجم العقد لدى الوسيط.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما الفرق بين اللوت القياسي والميني والمايكرو؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    اللوت القياسي عادة يساوي 100,000 وحدة من العملة الأساسية.
                    الميني لوت يساوي 0.10 من اللوت القياسي، والمايكرو لوت يساوي
                    0.01. لذلك قيمة النقطة تتغير بشكل مباشر حسب حجم اللوت.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    المتداول المبتدئ غالباً يحتاج إلى أحجام صغيرة حتى يستطيع
                    التحكم بالمخاطرة. استخدام لوت كبير على حساب صغير قد يجعل
                    حركة بسيطة في السوق تؤدي إلى خسارة كبيرة.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    العلاقة بين اللوت ووقف الخسارة
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    كلما كان وقف الخسارة أوسع، يجب أن يكون حجم اللوت أصغر حتى
                    تبقى المخاطرة ضمن النسبة المحددة. لذلك لا يمكن تحديد اللوت
                    بدون معرفة وقف الخسارة.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  حساب حجم اللوت في الذهب XAUUSD
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  الذهب يختلف عن أزواج الفوركس لأن حجم العقد قد يختلف بين
                  الوسطاء. في هذه الحاسبة نفترض أن 1 لوت ذهب يساوي 100 أونصة،
                  وأن حركة 0.01 في السعر هي وحدة القياس المستخدمة في حساب قيمة
                  النقطة.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  عند تداول الذهب، يجب التأكد من مواصفات العقد داخل منصة التداول
                  قبل الاعتماد على النتيجة النهائية، خصوصاً لأن قيمة الحركة في
                  الذهب قد تكون كبيرة مقارنة بأزواج العملات.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة عند تحديد حجم اللوت
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "اختيار حجم اللوت بناءً على الشعور وليس على الحساب.",
                    "زيادة حجم الصفقة بعد خسارة سابقة لمحاولة التعويض.",
                    "استخدام نفس حجم اللوت لكل الصفقات مهما تغير وقف الخسارة.",
                    "تجاهل قيمة النقطة في الأزواج التي لا تنتهي بالدولار.",
                    "فتح عدة صفقات بنفس الاتجاه دون حساب إجمالي المخاطرة.",
                    "الاعتماد على الرافعة المالية بدلاً من إدارة رأس المال.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:text-red-700 hover:shadow-lg sm:rounded-3xl sm:p-6"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-right">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 font-extrabold text-red-600">
                          ⚠
                        </div>

                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  نصائح لاستخدام حاسبة حجم اللوت
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "ابدأ بتحديد نسبة المخاطرة قبل التفكير في حجم اللوت.",
                    "لا تفتح الصفقة قبل معرفة وقف الخسارة بشكل واضح.",
                    "استخدم حاسبة قيمة النقطة مع حاسبة حجم اللوت للحصول على نتيجة أدق.",
                    "قلل حجم اللوت إذا كان وقف الخسارة واسعاً.",
                    "لا تخاطر بأكثر من 1% إلى 2% إذا كنت مبتدئاً.",
                    "راجع مواصفات العقد لدى الوسيط خصوصاً في الذهب والمؤشرات.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600 hover:shadow-lg sm:rounded-3xl sm:p-6"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-right">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-extrabold text-brand-600">
                          ✓
                        </div>

                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-blue-100 bg-brand-50 p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أدوات تداول أخرى
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["حاسبة إدارة المخاطر", "/tools/risk-calculator"],
                    ["حاسبة الهامش", "/tools/margin-calculator"],
                    ["حاسبة قيمة النقطة", "/tools/pip-calculator"],
                    ["حاسبة الأرباح والخسائر", "/tools/profit-calculator"],
                  ].map(([title, href]) => (
                    <a
                      key={title}
                      href={href}
                      className="rounded-2xl border border-brand-100 bg-white px-4 py-4 text-center text-sm font-extrabold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-100 hover:text-brand-600 hover:shadow-md"
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
            أسئلة شائعة حول حاسبة حجم اللوت
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هي حاسبة حجم اللوت؟",
                a: "هي أداة تساعدك على حساب حجم الصفقة المناسب بناءً على رصيد الحساب ونسبة المخاطرة ووقف الخسارة وقيمة النقطة.",
              },
              {
                q: "كيف يتم حساب حجم اللوت؟",
                a: "يتم حسابه من خلال قسمة مبلغ المخاطرة على حاصل ضرب وقف الخسارة في قيمة النقطة.",
              },
              {
                q: "ما هو أفضل حجم لوت للمبتدئين؟",
                a: "لا يوجد رقم ثابت، لكن الأفضل أن يكون حجم اللوت مبنياً على مخاطرة منخفضة لا تتجاوز عادة 1% إلى 2% من الحساب.",
              },
              {
                q: "هل يمكن استخدام الحاسبة للذهب؟",
                a: "نعم، يمكن استخدامها للذهب XAUUSD، لكن يجب مراجعة حجم العقد وتعريف النقطة لدى الوسيط.",
              },
              {
                q: "هل حجم اللوت نفسه مناسب لكل الصفقات؟",
                a: "لا، حجم اللوت يجب أن يتغير حسب وقف الخسارة وقيمة النقطة ونسبة المخاطرة.",
              },
              {
                q: "ما علاقة حجم اللوت بإدارة المخاطر؟",
                a: "حجم اللوت هو العامل الذي يحدد قيمة الخسارة أو الربح لكل نقطة، لذلك يعتبر جزءاً أساسياً من إدارة رأس المال.",
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