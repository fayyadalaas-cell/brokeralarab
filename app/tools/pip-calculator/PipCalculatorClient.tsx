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
    priceLabel: "سعر EUR/USD الحالي",
    pricePlaceholder: "مثال: 1.0800",
    calculationType: "quote-usd",
    note: "عندما تكون عملة التسعير USD مثل EUR/USD، تكون قيمة النقطة للوت القياسي غالباً 10 دولارات.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.2700",
    priceLabel: "سعر GBP/USD الحالي",
    pricePlaceholder: "مثال: 1.2700",
    calculationType: "quote-usd",
    note: "في GBP/USD، اللوت القياسي يساوي 100,000 وحدة، وقيمة النقطة للوت واحد تقريباً 10 دولارات.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.6600",
    priceLabel: "سعر AUD/USD الحالي",
    pricePlaceholder: "مثال: 0.6600",
    calculationType: "quote-usd",
    note: "في AUD/USD، قيمة النقطة بالدولار تكون مباشرة لأن الدولار هو عملة التسعير.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.6100",
    priceLabel: "سعر NZD/USD الحالي",
    pricePlaceholder: "مثال: 0.6100",
    calculationType: "quote-usd",
    note: "في NZD/USD، قيمة النقطة للوت القياسي تساوي تقريباً 10 دولارات.",
  },
  USDCAD: {
    label: "USD/CAD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.3700",
    priceLabel: "سعر USD/CAD الحالي",
    pricePlaceholder: "مثال: 1.3700",
    calculationType: "base-usd",
    note: "في USD/CAD، يتم حساب قيمة النقطة بعملة CAD أولاً ثم تحويلها إلى الدولار بقسمة الناتج على السعر الحالي.",
  },
  USDCHF: {
    label: "USD/CHF",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.9000",
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
    priceLabel: "سعر USD/JPY الحالي",
    pricePlaceholder: "مثال: 150.00",
    calculationType: "base-usd",
    note: "أزواج الين تستخدم عادة 0.01 كنقطة واحدة، لذلك تختلف طريقة الحساب عن الأزواج ذات 4 خانات عشرية.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    pipSize: 0.01,
    defaultPrice: "2350",
    priceLabel: "سعر الذهب الحالي",
    pricePlaceholder: "مثال: 2350",
    calculationType: "gold",
    note: "في الذهب، نفترض أن 1 لوت يساوي 100 أونصة وأن حركة 0.01 في السعر تمثل وحدة القياس المستخدمة في الحاسبة. قد يختلف تعريف النقطة حسب الوسيط.",
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

export default function PipCalculatorClient() {
  const [instrument, setInstrument] = useState<InstrumentKey>("EURUSD");
  const [lotSize, setLotSize] = useState("1");
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
    const lots = Number(lotSize);
    const marketPrice = Number(price);

    if (!Number.isFinite(lots) || !Number.isFinite(marketPrice)) return null;
    if (lots <= 0 || marketPrice <= 0) return null;

    let pipValue = 0;

    if (current.calculationType === "quote-usd") {
      pipValue = lots * current.contractSize * current.pipSize;
    }

    if (current.calculationType === "base-usd") {
      pipValue = (lots * current.contractSize * current.pipSize) / marketPrice;
    }

    if (current.calculationType === "gold") {
      pipValue = lots * current.contractSize * current.pipSize;
    }

    const tenPips = pipValue * 10;
    const fiftyPips = pipValue * 50;
    const hundredPips = pipValue * 100;

    return {
      pipValue,
      tenPips,
      fiftyPips,
      hundredPips,
      contractValue: lots * current.contractSize,
      pipSize: current.pipSize,
    };
  }, [lotSize, price, current]);

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
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 sm:px-4 sm:py-1.5 sm:text-sm">
                أدوات التداول
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                حاسبة قيمة النقطة في الفوركس والذهب
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب قيمة النقطة لكل صفقة بناءً على الزوج أو الأصل المالي، حجم
                اللوت، والسعر الحالي. تساعدك الحاسبة على معرفة قيمة حركة السوق
                بالدولار قبل فتح الصفقة.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  احسب قيمة النقطة الآن
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح قيمة النقطة
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-t-0 lg:border-r lg:p-10">
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-blue-700">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      الأصل المالي
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      EUR/USD
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      حجم الصفقة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1 لوت
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      قيمة النقطة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      حوالي $10
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  المثال يفترض لوت قياسي 100,000 وحدة ونقطة واحدة تساوي 0.0001
                  في زوج EUR/USD.
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
                  حاسبة قيمة النقطة
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  احسب قيمة النقطة بالدولار بناءً على حجم اللوت، نوع الزوج، سعر
                  السوق الحالي، وحجم العقد. هذه الأداة مفيدة لتقدير الربح أو
                  الخسارة المحتملة لكل حركة في السوق.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب قيمة النقطة حسب الزوج وحجم اللوت.
                </p>
              </div>
            </div>
          </div>

          <div className="grid items-start gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
            {/* FORM */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 sm:rounded-[2rem] sm:p-6 lg:self-start">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    الأصل المالي
                  </label>
                  <select
                    value={instrument}
                    onChange={(e) =>
                      handleInstrumentChange(e.target.value as InstrumentKey)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
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
                    حجم الصفقة باللوت
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
                    placeholder="مثال: 1"
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
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
                    placeholder={current.pricePlaceholder}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-950 sm:text-base"
              >
                احسب قيمة النقطة الآن
              </button>

             <div className="hidden lg:block mt-6 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
  <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-blue-700">
    أدوات مرتبطة
  </h3>

  <div className="grid gap-2 sm:grid-cols-2">
    <a
      href="/tools/risk-calculator"
      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      حاسبة إدارة المخاطر
    </a>

    <a
      href="/tools/margin-calculator"
      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      حاسبة الهامش
    </a>

    <a
      href="/tools/lot-size-calculator"
      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      حاسبة حجم اللوت
    </a>

    <a
      href="/tools/profit-calculator"
      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      حاسبة الأرباح والخسائر
    </a>
  </div>

  <p className="mt-3 text-center text-xs text-slate-500">
    استخدم الأدوات المرتبطة لحساب المخاطر والهامش والأرباح قبل فتح أي صفقة.
  </p>
</div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-blue-700">
                    نتيجة الحساب
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    ملخص قيمة النقطة
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
                      قيمة النقطة الواحدة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.pipValue)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      لكل حركة مقدارها {numberFormat(result.pipSize)}.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-slate-500 sm:text-sm">
                      قيمة 10 نقاط
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.tenPips)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      تقدير سريع لحركة صغيرة في السوق.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-blue-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-blue-700 sm:text-sm">
                      قيمة 50 نقطة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.fiftyPips)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-2 sm:leading-6">
                      مفيدة لتقدير وقف الخسارة أو الهدف.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 sm:col-span-3 lg:col-span-1">
                    <div className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          قيمة 100 نقطة
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {money(result.hundredPips)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          حجم العقد المستخدم
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {numberFormat(result.contractValue)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          الأصل المختار
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {current.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل بيانات الصفقة واضغط على زر الحساب حتى تظهر قيمة النقطة
                    هنا.
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
            <p className="text-sm font-bold text-blue-700">
              آخر تحديث: يونيو 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              دليل قيمة النقطة في الفوركس والذهب
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              معرفة قيمة النقطة تساعد المتداول على فهم قيمة الربح أو الخسارة
              الناتجة عن كل حركة في السوق. قبل فتح أي صفقة، من المهم معرفة كم
              تساوي النقطة الواحدة بالدولار حسب حجم اللوت ونوع الزوج أو الأصل
              المالي.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10 [&_p]:text-justify">
            <div
              className={`space-y-6 overflow-hidden transition-all duration-300 lg:max-h-none ${
                showGuideMore ? "max-h-[14000px]" : "max-h-[980px]"
              }`}
            >
              <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  كيف يتم حساب قيمة النقطة؟
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "الأصل المالي",
                    "حجم اللوت",
                    "حجم العقد",
                    "حجم النقطة",
                    "قيمة النقطة",
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
                  تبدأ الحاسبة بتحديد حجم النقطة حسب الأصل المالي. أغلب أزواج
                  الفوركس تستخدم 0.0001 كنقطة واحدة، بينما أزواج الين تستخدم
                  0.01. بعد ذلك يتم ضرب حجم العقد في حجم اللوت وحجم النقطة، ثم
                  يتم التحويل إلى الدولار عند الحاجة.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    المفهوم
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي النقطة في الفوركس؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    النقطة أو Pip هي وحدة قياس حركة السعر في الفوركس. في معظم
                    الأزواج مثل EUR/USD و GBP/USD تكون النقطة 0.0001، أما في
                    أزواج الين مثل USD/JPY فتكون النقطة غالباً 0.01.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    اللوت
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    لماذا يؤثر حجم اللوت؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    كلما زاد حجم اللوت زادت قيمة النقطة. لذلك حركة 10 نقاط على
                    صفقة بحجم 1 لوت تختلف تماماً عن نفس الحركة على صفقة بحجم
                    0.10 لوت أو 0.01 لوت.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                    المعادلة
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    طريقة الحساب
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    قيمة النقطة = حجم اللوت × حجم العقد × حجم النقطة
                    <br />
                    وفي أزواج مثل USD/JPY يتم قسمة الناتج على السعر الحالي
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أمثلة على قيمة النقطة حسب حجم اللوت
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-right text-sm">
  <thead className="bg-slate-100 text-slate-700">
    <tr>
      <th className="p-4 font-extrabold">الأصل</th>
      <th className="p-4 font-extrabold">حجم اللوت</th>
      <th className="p-4 font-extrabold">حجم النقطة</th>
      <th className="p-4 font-extrabold">قيمة النقطة</th>
    </tr>
  </thead>

  <tbody className="divide-y divide-slate-100">
    {[
      ["EUR/USD", "1.00", "0.0001", "$10"],
      ["EUR/USD", "0.10", "0.0001", "$1"],
      ["EUR/USD", "0.01", "0.0001", "$0.10"],
      ["USD/JPY", "1.00", "0.01", "$6.67"],
      ["Gold", "1.00", "0.01", "$1 تقريباً"],
    ].map((row) => (
      <tr key={row.join("-")} className="transition hover:bg-blue-50">
        {row.map((cell, index) => (
          <td
            key={cell}
            className={`p-4 font-bold ${
              index === 3 ? "text-blue-700" : "text-slate-700"
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
    instrument: "EUR/USD",
    lot: "1.00",
    pip: "0.0001",
    value: "$10",
    note: "لوت قياسي",
  },
  {
    instrument: "EUR/USD",
    lot: "0.10",
    pip: "0.0001",
    value: "$1",
    note: "ميني لوت",
  },
  {
    instrument: "EUR/USD",
    lot: "0.01",
    pip: "0.0001",
    value: "$0.10",
    note: "مايكرو لوت",
  },
  {
    instrument: "USD/JPY",
    lot: "1.00",
    pip: "0.01",
    value: "$6.67",
    note: "عند سعر 150",
  },
  {
    instrument: "Gold",
    lot: "1.00",
    pip: "0.01",
    value: "$1 تقريباً",
    note: "حسب العقد",
  },
].map((row) => (
  <div
    key={`${row.instrument}-${row.lot}`}
    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
  >
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div>
        <span className="text-slate-500">الأصل</span>
        <div className="mt-1 font-extrabold text-slate-900">
          {row.instrument}
        </div>
      </div>

      <div>
        <span className="text-slate-500">اللوت</span>
        <div className="mt-1 font-extrabold text-slate-900">
          {row.lot}
        </div>
      </div>

      <div>
        <span className="text-slate-500">حجم النقطة</span>
        <div className="mt-1 font-extrabold text-slate-900">
          {row.pip}
        </div>
      </div>

      <div>
        <span className="text-slate-500">القيمة</span>
        <div className="mt-1 font-extrabold leading-6 text-blue-700">
          {row.value}
        </div>
        <div className="mt-1 text-xs font-bold text-slate-400">
          {row.note}
        </div>
      </div>
    </div>
  </div>
))}
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  هذه الأمثلة تقريبية وتهدف إلى توضيح طريقة الحساب. قد تختلف
                  قيمة النقطة حسب عملة الحساب، حجم العقد، وطريقة عرض الأسعار لدى
                  الوسيط.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    لماذا قيمة النقطة مهمة؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    قيمة النقطة تساعدك على معرفة قيمة الربح أو الخسارة الناتجة
                    عن حركة السعر. إذا كانت قيمة النقطة 10 دولارات، فإن حركة 20
                    نقطة تعني ربحاً أو خسارة تقريبية قدرها 200 دولار.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    لذلك لا يكفي أن تعرف اتجاه الصفقة فقط. يجب أيضاً أن تعرف
                    قيمة كل نقطة حتى تستطيع تحديد حجم اللوت المناسب ووقف الخسارة
                    بطريقة واقعية.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    علاقة قيمة النقطة بإدارة المخاطر
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    عند معرفة قيمة النقطة، يمكنك حساب الخسارة المحتملة بسهولة.
                    إذا كان وقف الخسارة 50 نقطة وقيمة النقطة 2 دولار، فإن
                    الخسارة التقريبية عند ضرب الوقف تكون 100 دولار.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  قيمة النقطة في الذهب XAUUSD
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  الذهب يختلف عن أزواج الفوركس لأن حجم العقد وطريقة عرض النقطة
                  قد تختلف بين الوسطاء. في هذه الحاسبة نفترض أن 1 لوت ذهب يساوي
                  100 أونصة، وأن حركة 0.01 في السعر تمثل وحدة قياس النقطة
                  المستخدمة في الحساب.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  لذلك إذا كنت تتداول الذهب، يجب دائماً مراجعة مواصفات العقد في
                  منصة التداول لدى الوسيط، خصوصاً إذا كانت الشركة تعرض الذهب
                  بطريقة مختلفة أو تستخدم حجم عقد غير قياسي.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة عند حساب قيمة النقطة
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "الاعتماد على قيمة نقطة ثابتة لكل الأزواج بدون النظر إلى السعر.",
                    "اعتبار أزواج الين مثل باقي الأزواج ذات 4 خانات عشرية.",
                    "عدم الانتباه إلى اختلاف حجم العقد في الذهب والمؤشرات.",
                    "حساب قيمة النقطة دون معرفة حجم اللوت الحقيقي.",
                    "الخلط بين النقطة Pip والبوينت Point في منصة التداول.",
                    "تجاهل عملة الحساب عند تحويل قيمة النقطة.",
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
                  نصائح لاستخدام حاسبة قيمة النقطة
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "استخدم السعر الحالي للزوج عند حساب أزواج مثل USD/JPY و USD/CAD.",
                    "راجع حجم العقد لدى الوسيط قبل الاعتماد على النتيجة النهائية.",
                    "اربط قيمة النقطة بوقف الخسارة قبل فتح الصفقة.",
                    "استخدم الحاسبة مع حاسبة إدارة المخاطر لتحديد حجم اللوت المناسب.",
                    "انتبه إلى الفرق بين اللوت القياسي والميني لوت والمايكرو لوت.",
                    "لا تعتمد على قيمة النقطة وحدها بدون خطة لإدارة رأس المال.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg sm:rounded-3xl sm:p-6"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-right">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-extrabold text-blue-700">
                          ✓
                        </div>

                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أدوات تداول أخرى
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["حاسبة إدارة المخاطر", "/tools/risk-calculator"],
                    ["حاسبة الهامش", "/tools/margin-calculator"],
                    ["حاسبة حجم اللوت", "/tools/lot-size-calculator"],
                    ["حاسبة الأرباح والخسائر", "/tools/profit-calculator"],
                  ].map(([title, href]) => (
                    <a
                      key={title}
                      href={href}
                      className="rounded-2xl border border-blue-200 bg-white px-4 py-4 text-center text-sm font-extrabold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700 hover:shadow-md"
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
            أسئلة شائعة حول حاسبة قيمة النقطة
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هي حاسبة قيمة النقطة؟",
                a: "هي أداة تساعدك على حساب قيمة حركة نقطة واحدة في الفوركس أو الذهب بناءً على حجم اللوت ونوع الأصل المالي والسعر الحالي.",
              },
              {
                q: "كم تساوي النقطة في EUR/USD؟",
                a: "في العادة، قيمة النقطة للوت قياسي واحد على EUR/USD تساوي تقريباً 10 دولارات، بينما تساوي 1 دولار تقريباً عند حجم 0.10 لوت.",
              },
              {
                q: "لماذا تختلف قيمة النقطة في USD/JPY؟",
                a: "لأن أزواج الين تستخدم غالباً 0.01 كنقطة واحدة، كما أن قيمة النقطة تحتاج إلى تحويل حسب السعر الحالي للزوج.",
              },
              {
                q: "هل تصلح الحاسبة للذهب؟",
                a: "نعم، يمكن استخدامها لتقدير قيمة النقطة في XAUUSD، لكن يجب مراجعة حجم العقد وتعريف النقطة لدى وسيطك.",
              },
              {
                q: "هل قيمة النقطة نفسها لكل الأزواج؟",
                a: "لا، قيمة النقطة تختلف حسب الزوج، حجم اللوت، السعر الحالي، عملة الحساب، وحجم العقد.",
              },
              {
                q: "كيف أستخدم قيمة النقطة في إدارة المخاطر؟",
                a: "اضرب قيمة النقطة في عدد نقاط وقف الخسارة لمعرفة الخسارة المحتملة تقريباً قبل فتح الصفقة.",
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