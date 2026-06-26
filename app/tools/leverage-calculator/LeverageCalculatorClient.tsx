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
    defaultPrice: string;
    priceLabel: string;
    pricePlaceholder: string;
    calculationType: "quote-usd" | "base-usd" | "gold";
    note: string;
  }
> = {
  EURUSD: {
    label: "EUR/USD",
    contractSize: 100000,
    defaultPrice: "1.0800",
    priceLabel: "سعر EUR/USD الحالي",
    pricePlaceholder: "مثال: 1.0800",
    calculationType: "quote-usd",
    note: "في EUR/USD، يتم حساب قيمة الصفقة بالدولار من خلال حجم العقد واللوت والسعر الحالي.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    defaultPrice: "1.2700",
    priceLabel: "سعر GBP/USD الحالي",
    pricePlaceholder: "مثال: 1.2700",
    calculationType: "quote-usd",
    note: "في GBP/USD، قيمة الصفقة الاسمية تتحرك حسب السعر الحالي وحجم اللوت.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    defaultPrice: "0.6600",
    priceLabel: "سعر AUD/USD الحالي",
    pricePlaceholder: "مثال: 0.6600",
    calculationType: "quote-usd",
    note: "في AUD/USD، الدولار هو عملة التسعير، لذلك تكون قيمة الصفقة بالدولار مباشرة.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    defaultPrice: "0.6100",
    priceLabel: "سعر NZD/USD الحالي",
    pricePlaceholder: "مثال: 0.6100",
    calculationType: "quote-usd",
    note: "في NZD/USD، يتم تقدير قيمة الصفقة بالدولار حسب السعر الحالي وحجم اللوت.",
  },
  USDCAD: {
    label: "USD/CAD",
    contractSize: 100000,
    defaultPrice: "1.3700",
    priceLabel: "سعر USD/CAD الحالي",
    pricePlaceholder: "مثال: 1.3700",
    calculationType: "base-usd",
    note: "في USD/CAD، الدولار هو عملة الأساس، لذلك 1 لوت قياسي يساوي تقريباً 100,000 دولار من القيمة الاسمية.",
  },
  USDCHF: {
    label: "USD/CHF",
    contractSize: 100000,
    defaultPrice: "0.9000",
    priceLabel: "سعر USD/CHF الحالي",
    pricePlaceholder: "مثال: 0.9000",
    calculationType: "base-usd",
    note: "في USD/CHF، 1 لوت قياسي يساوي تقريباً 100,000 دولار من القيمة الاسمية لأن USD هي عملة الأساس.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    defaultPrice: "150.00",
    priceLabel: "سعر USD/JPY الحالي",
    pricePlaceholder: "مثال: 150.00",
    calculationType: "base-usd",
    note: "في USD/JPY، 1 لوت قياسي يساوي تقريباً 100,000 دولار من القيمة الاسمية لأن الدولار هو عملة الأساس.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    defaultPrice: "2350",
    priceLabel: "سعر الذهب الحالي",
    pricePlaceholder: "مثال: 2350",
    calculationType: "gold",
    note: "في الذهب، نفترض أن 1 لوت يساوي 100 أونصة، لذلك قيمة الصفقة = اللوت × 100 × سعر الذهب.",
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
    maximumFractionDigits: 2,
  }).format(value);
}

export default function LeverageCalculatorClient() {
  const [balance, setBalance] = useState("1000");
  const [lotSize, setLotSize] = useState("1");
  const [leverage, setLeverage] = useState("100");
  const [instrument, setInstrument] = useState<InstrumentKey>("EURUSD");
  const [price, setPrice] = useState(instruments.EURUSD.defaultPrice);
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const current = instruments[instrument];

  function handleInstrumentChange(value: InstrumentKey) {
    setInstrument(value);
    setPrice(instruments[value].defaultPrice);
    setShowResult(false);
  }

  const result = useMemo(() => {
    const accountBalance = Number(balance);
    const lots = Number(lotSize);
    const selectedLeverage = Number(leverage);
    const marketPrice = Number(price);

    if (
      !Number.isFinite(accountBalance) ||
      !Number.isFinite(lots) ||
      !Number.isFinite(selectedLeverage) ||
      !Number.isFinite(marketPrice)
    ) {
      return null;
    }

    if (
      accountBalance <= 0 ||
      lots <= 0 ||
      selectedLeverage <= 0 ||
      marketPrice <= 0
    ) {
      return null;
    }

    let positionValue = 0;

    if (current.calculationType === "quote-usd") {
      positionValue = lots * current.contractSize * marketPrice;
    }

    if (current.calculationType === "base-usd") {
      positionValue = lots * current.contractSize;
    }

    if (current.calculationType === "gold") {
      positionValue = lots * current.contractSize * marketPrice;
    }

    const effectiveLeverage = positionValue / accountBalance;
    const requiredMargin = positionValue / selectedLeverage;
    const marginUsagePercent = (requiredMargin / accountBalance) * 100;
    const freeMarginAfterTrade = accountBalance - requiredMargin;

    let leverageStatus = "رافعة فعلية منخفضة";
    let leverageText =
      "الرافعة الفعلية منخفضة نسبياً مقارنة برصيد الحساب، وهذا يساعد على تقليل ضغط الهامش.";

    if (effectiveLeverage > 10 && effectiveLeverage <= 50) {
      leverageStatus = "رافعة فعلية متوسطة";
      leverageText =
        "الرافعة الفعلية متوسطة. راقب حجم الصفقة والهامش المتاح قبل إضافة صفقات أخرى.";
    }

    if (effectiveLeverage > 50) {
      leverageStatus = "رافعة فعلية مرتفعة";
      leverageText =
        "الرافعة الفعلية مرتفعة مقارنة برصيد الحساب. قد يؤدي ذلك إلى ضغط كبير على الهامش إذا تحرك السوق ضدك.";
    }

    return {
      positionValue,
      effectiveLeverage,
      requiredMargin,
      marginUsagePercent,
      freeMarginAfterTrade,
      leverageStatus,
      leverageText,
      selectedLeverage,
    };
  }, [balance, lotSize, leverage, price, current]);

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
                حاسبة الرافعة المالية في الفوركس والذهب
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب الرافعة الفعلية، قيمة الصفقة، والهامش المطلوب قبل فتح أي
                صفقة في الفوركس أو الذهب. تساعدك هذه الأداة على فهم حجم التعرض
                الحقيقي مقارنة برصيد حسابك.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  احسب الرافعة الآن
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح الرافعة المالية
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-t-0 lg:border-r lg:p-10">
              <div className="rounded-[1.5rem] border border-brand-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      قيمة الصفقة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $108,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      رصيد الحساب
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $1,000
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      الرافعة الفعلية
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      1:108
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  المثال يفترض 1 لوت EUR/USD عند سعر 1.0800 ورصيد حساب 1000
                  دولار.
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
                  حاسبة الرافعة المالية
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  احسب قيمة الصفقة الاسمية، الرافعة الفعلية، الهامش المطلوب،
                  ونسبة استخدام الهامش بناءً على رصيد الحساب وحجم اللوت والرافعة
                  المختارة.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب الرافعة الفعلية والهامش المطلوب.
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
                    حجم الصفقة باللوت
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    الرافعة المختارة
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 100"
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
                احسب الرافعة والهامش الآن
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                النتائج تقديرية وتعتمد على حجم العقد والسعر الحالي والرافعة
                المختارة. قد تختلف متطلبات الهامش حسب الوسيط ونوع الحساب.
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
                    ملخص الرافعة والهامش
                  </h3>
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      الرافعة الفعلية
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      1:{numberFormat(result.effectiveLeverage)}
                    </p>

                    <p className="mt-2 text-xs text-slate-600">
                      الرافعة الفعلية بناءً على قيمة الصفقة مقارنة برصيد الحساب.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        قيمة الصفقة
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.positionValue)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        الهامش المطلوب
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.requiredMargin)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        استخدام الهامش
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {numberFormat(result.marginUsagePercent)}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        الهامش المتبقي بعد الصفقة
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.freeMarginAfterTrade)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      {result.leverageStatus}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.leverageText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل بيانات الحساب والصفقة ثم اضغط على زر الحساب لعرض
                    الرافعة الفعلية والهامش المطلوب.
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
              دليل حساب الرافعة المالية والهامش في الفوركس
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              الرافعة المالية تسمح للمتداول بالتحكم في صفقة أكبر من رصيد الحساب،
              لكنها تزيد أيضاً من التعرض للسوق. لذلك تساعدك حاسبة الرافعة
              المالية على معرفة قيمة الصفقة، الرافعة الفعلية، والهامش المطلوب
              قبل فتح الصفقة.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10 [&_p]:text-justify">
            <div
              className={`space-y-6 overflow-hidden transition-all duration-300 lg:max-h-none ${
                showGuideMore ? "max-h-[14000px]" : "max-h-[980px]"
              }`}
            >
              <section className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  كيف يتم حساب الرافعة المالية؟
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "رصيد الحساب",
                    "حجم اللوت",
                    "قيمة الصفقة",
                    "الهامش المطلوب",
                    "الرافعة الفعلية",
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
                  يتم حساب الرافعة الفعلية من خلال قسمة قيمة الصفقة على رصيد
                  الحساب. أما الهامش المطلوب فيتم حسابه من خلال قسمة قيمة الصفقة
                  على الرافعة المختارة من الوسيط.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    المفهوم
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي الرافعة المالية؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    الرافعة المالية هي أداة تسمح لك بالتحكم في قيمة صفقة أكبر من
                    رأس مالك المتاح. على سبيل المثال، رافعة 1:100 تعني أن كل
                    دولار من الهامش يمكن أن يتحكم في حوالي 100 دولار من قيمة
                    الصفقة.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    الهامش
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما علاقة الرافعة بالهامش؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    كلما زادت الرافعة، قل الهامش المطلوب لفتح نفس الصفقة. لكن
                    انخفاض الهامش المطلوب لا يعني انخفاض المخاطر، لأن قيمة
                    الصفقة والتعرض للسوق قد يبقيان مرتفعين.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    المعادلة
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    معادلات الحساب
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    الرافعة الفعلية = قيمة الصفقة ÷ رصيد الحساب
                    <br />
                    الهامش المطلوب = قيمة الصفقة ÷ الرافعة المختارة
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أمثلة على حساب الرافعة المالية
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">قيمة الصفقة</th>
                        <th className="p-4 font-extrabold">رصيد الحساب</th>
                        <th className="p-4 font-extrabold">الرافعة الفعلية</th>
                        <th className="p-4 font-extrabold">هامش 1:100</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["$10,000", "$1,000", "1:10", "$100"],
                        ["$50,000", "$1,000", "1:50", "$500"],
                        ["$100,000", "$1,000", "1:100", "$1,000"],
                        ["$235,000", "$5,000", "1:47", "$2,350"],
                      ].map((row) => (
                        <tr key={row.join("-")} className="transition hover:bg-brand-50">
                          {row.map((cell, index) => (
                            <td
                              key={`${row.join("-")}-${index}`}
                              className={`p-4 font-bold ${
                                index === 2 ? "text-brand-600" : "text-slate-700"
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
                      value: "$10,000",
                      balance: "$1,000",
                      leverage: "1:10",
                      margin: "$100",
                    },
                    {
                      value: "$50,000",
                      balance: "$1,000",
                      leverage: "1:50",
                      margin: "$500",
                    },
                    {
                      value: "$100,000",
                      balance: "$1,000",
                      leverage: "1:100",
                      margin: "$1,000",
                    },
                    {
                      value: "$235,000",
                      balance: "$5,000",
                      leverage: "1:47",
                      margin: "$2,350",
                    },
                  ].map((row) => (
                    <div
                      key={`${row.value}-${row.balance}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">قيمة الصفقة</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.value}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">الرصيد</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.balance}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">الرافعة</span>
                          <div className="mt-1 font-extrabold text-brand-600">
                            {row.leverage}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">الهامش</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.margin}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  هذه الأمثلة توضيحية فقط. قد تختلف متطلبات الهامش حسب الوسيط،
                  نوع الحساب، الأصل المالي، وحجم العقد المستخدم.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    الفرق بين الرافعة المختارة والرافعة الفعلية
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    الرافعة المختارة هي الحد الأقصى الذي يقدمه الوسيط، مثل
                    1:100 أو 1:500. أما الرافعة الفعلية فهي التعرض الحقيقي
                    للصفقة مقارنة برصيد الحساب، وقد تكون أقل أو أعلى من المتوقع
                    حسب حجم الصفقة.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    لذلك من الخطأ النظر إلى الرافعة المعلنة فقط. الأهم هو معرفة
                    قيمة الصفقة مقارنة برصيد الحساب والهامش المتبقي بعد فتح
                    الصفقة.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    هل الرافعة العالية خطيرة؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    الرافعة العالية لا تسبب الخسارة وحدها، لكن استخدامها مع حجم
                    صفقة كبير قد يجعل الحساب حساساً جداً لأي حركة بسيطة في
                    السوق. لذلك يجب ربط الرافعة دائماً بحجم اللوت وإدارة
                    المخاطر.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  حساب الرافعة في الذهب XAUUSD
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  الذهب يحتاج اهتماماً خاصاً لأن قيمة الصفقة قد تكون كبيرة
                  بسرعة. إذا كان سعر الذهب 2350 دولار وفتحت 1 لوت، وبافتراض أن
                  1 لوت يساوي 100 أونصة، فإن قيمة الصفقة الاسمية تساوي حوالي
                  235,000 دولار.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  لذلك قد تظهر الرافعة الفعلية مرتفعة عند تداول الذهب حتى لو كان
                  حجم اللوت يبدو صغيراً. راجع دائماً مواصفات العقد والهامش داخل
                  منصة التداول.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة عند استخدام الرافعة المالية
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "الاعتماد على الرافعة العالية لفتح صفقات أكبر من اللازم.",
                    "الخلط بين الرافعة المتاحة والرافعة الفعلية.",
                    "تجاهل الهامش المتاح بعد فتح الصفقة.",
                    "استخدام نفس حجم اللوت في الذهب والفوركس دون حساب قيمة الصفقة.",
                    "فتح عدة صفقات مترابطة دون حساب التعرض الكلي.",
                    "اعتبار انخفاض الهامش المطلوب دليلاً على انخفاض المخاطرة.",
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
                  نصائح لاستخدام حاسبة الرافعة المالية
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "احسب الرافعة الفعلية قبل فتح الصفقة وليس بعد الدخول.",
                    "لا تعتمد على الرافعة القصوى التي يوفرها الوسيط.",
                    "راقب نسبة استخدام الهامش بعد كل صفقة.",
                    "قلل حجم اللوت إذا كانت الرافعة الفعلية مرتفعة.",
                    "استخدم حاسبة الهامش مع حاسبة الرافعة للحصول على صورة أوضح.",
                    "تأكد من مواصفات العقد خصوصاً في الذهب والمؤشرات.",
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

              <section className="rounded-3xl border border-brand-100 bg-brand-50 p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أدوات تداول أخرى
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["حاسبة الهامش", "/tools/margin-calculator"],
                    ["حاسبة إدارة المخاطر", "/tools/risk-calculator"],
                    ["حاسبة حجم اللوت", "/tools/lot-size-calculator"],
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
            أسئلة شائعة حول حاسبة الرافعة المالية
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هي حاسبة الرافعة المالية؟",
                a: "هي أداة تساعدك على حساب قيمة الصفقة، الرافعة الفعلية، والهامش المطلوب بناءً على رصيد الحساب وحجم اللوت والرافعة المختارة.",
              },
              {
                q: "كيف يتم حساب الرافعة الفعلية؟",
                a: "يتم حسابها من خلال قسمة قيمة الصفقة الاسمية على رصيد الحساب.",
              },
              {
                q: "ما الفرق بين الرافعة والهامش؟",
                a: "الرافعة تحدد حجم التعرض الممكن، بينما الهامش هو المبلغ المطلوب حجزه لفتح الصفقة.",
              },
              {
                q: "هل الرافعة العالية تعني ربحاً أكبر؟",
                a: "ليس بالضرورة. الرافعة العالية تزيد القدرة على فتح صفقات أكبر، لكنها قد تزيد الخسارة إذا لم تتم إدارة حجم اللوت والمخاطر.",
              },
              {
                q: "هل يمكن استخدام الحاسبة للذهب؟",
                a: "نعم، يمكن استخدامها للذهب XAUUSD مع افتراض أن 1 لوت يساوي 100 أونصة، وقد تختلف المواصفات حسب الوسيط.",
              },
              {
                q: "هل النتيجة نهائية؟",
                a: "النتيجة تقديرية، لأن متطلبات الهامش والرافعة قد تختلف حسب الوسيط ونوع الحساب والأصل المالي.",
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