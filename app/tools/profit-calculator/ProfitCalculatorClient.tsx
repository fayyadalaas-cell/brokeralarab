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

type TradeType = "buy" | "sell";

const instruments: Record<
  InstrumentKey,
  {
    label: string;
    contractSize: number;
    pipSize: number;
    defaultEntry: string;
    defaultExit: string;
    entryLabel: string;
    exitLabel: string;
    calculationType: "quote-usd" | "base-usd" | "gold";
    note: string;
  }
> = {
  EURUSD: {
    label: "EUR/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "1.0800",
    defaultExit: "1.0850",
    entryLabel: "سعر الدخول EUR/USD",
    exitLabel: "سعر الخروج EUR/USD",
    calculationType: "quote-usd",
    note: "في EUR/USD، يتم حساب الربح والخسارة بالدولار مباشرة لأن USD هي عملة التسعير.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "1.2700",
    defaultExit: "1.2750",
    entryLabel: "سعر الدخول GBP/USD",
    exitLabel: "سعر الخروج GBP/USD",
    calculationType: "quote-usd",
    note: "في GBP/USD، الربح والخسارة يكونان بالدولار مباشرة لأن الدولار هو عملة التسعير.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "0.6600",
    defaultExit: "0.6650",
    entryLabel: "سعر الدخول AUD/USD",
    exitLabel: "سعر الخروج AUD/USD",
    calculationType: "quote-usd",
    note: "في AUD/USD، كل حركة سعرية يتم تحويلها مباشرة إلى الدولار حسب حجم اللوت.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "0.6100",
    defaultExit: "0.6150",
    entryLabel: "سعر الدخول NZD/USD",
    exitLabel: "سعر الخروج NZD/USD",
    calculationType: "quote-usd",
    note: "في NZD/USD، الربح والخسارة يحسبان بالدولار لأن USD هي عملة التسعير.",
  },
  USDCAD: {
    label: "USD/CAD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "1.3700",
    defaultExit: "1.3750",
    entryLabel: "سعر الدخول USD/CAD",
    exitLabel: "سعر الخروج USD/CAD",
    calculationType: "base-usd",
    note: "في USD/CAD، يتم حساب الربح أو الخسارة أولاً بعملة CAD ثم تحويله إلى الدولار باستخدام سعر الخروج.",
  },
  USDCHF: {
    label: "USD/CHF",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "0.9000",
    defaultExit: "0.9050",
    entryLabel: "سعر الدخول USD/CHF",
    exitLabel: "سعر الخروج USD/CHF",
    calculationType: "base-usd",
    note: "في USD/CHF، الربح أو الخسارة يحسب أولاً بعملة CHF ثم يحول إلى الدولار حسب السعر.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    pipSize: 0.01,
    defaultEntry: "150.00",
    defaultExit: "150.50",
    entryLabel: "سعر الدخول USD/JPY",
    exitLabel: "سعر الخروج USD/JPY",
    calculationType: "base-usd",
    note: "أزواج الين تستخدم 0.01 كنقطة واحدة، ويتم تحويل الربح أو الخسارة من الين إلى الدولار باستخدام سعر الخروج.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    pipSize: 0.01,
    defaultEntry: "2350",
    defaultExit: "2360",
    entryLabel: "سعر دخول الذهب",
    exitLabel: "سعر خروج الذهب",
    calculationType: "gold",
    note: "في الذهب، نفترض أن 1 لوت يساوي 100 أونصة. الربح والخسارة يحسبان بالدولار مباشرة لأن الذهب مسعر مقابل USD.",
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

export default function ProfitCalculatorClient() {
  const [instrument, setInstrument] = useState<InstrumentKey>("EURUSD");
  const [tradeType, setTradeType] = useState<TradeType>("buy");
  const [lotSize, setLotSize] = useState("1");
  const [entryPrice, setEntryPrice] = useState(instruments.EURUSD.defaultEntry);
  const [exitPrice, setExitPrice] = useState(instruments.EURUSD.defaultExit);
  const [accountBalance, setAccountBalance] = useState("1000");
  const [commission, setCommission] = useState("0");
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const current = instruments[instrument];

  function handleInstrumentChange(value: InstrumentKey) {
    setInstrument(value);
    setEntryPrice(instruments[value].defaultEntry);
    setExitPrice(instruments[value].defaultExit);
    setShowResult(false);
  }

  const result = useMemo(() => {
    const lots = Number(lotSize);
    const entry = Number(entryPrice);
    const exit = Number(exitPrice);
    const balance = Number(accountBalance);
    const fees = Number(commission);

    if (
      !Number.isFinite(lots) ||
      !Number.isFinite(entry) ||
      !Number.isFinite(exit) ||
      !Number.isFinite(balance) ||
      !Number.isFinite(fees)
    ) {
      return null;
    }

    if (lots <= 0 || entry <= 0 || exit <= 0 || balance <= 0 || fees < 0) {
      return null;
    }

    const signedPriceMove =
      tradeType === "buy" ? exit - entry : entry - exit;

    const absolutePriceMove = Math.abs(exit - entry);
    const pips = absolutePriceMove / current.pipSize;

    let grossProfit = 0;

    if (current.calculationType === "quote-usd") {
      grossProfit = signedPriceMove * current.contractSize * lots;
    }

    if (current.calculationType === "base-usd") {
      const profitInQuoteCurrency =
        signedPriceMove * current.contractSize * lots;

      grossProfit = profitInQuoteCurrency / exit;
    }

    if (current.calculationType === "gold") {
      grossProfit = signedPriceMove * current.contractSize * lots;
    }

    const netProfit = grossProfit - fees;
    const accountImpactPercent = (netProfit / balance) * 100;
    const pipValue = pips > 0 ? Math.abs(grossProfit) / pips : 0;

    const isProfit = netProfit > 0;
    const isLoss = netProfit < 0;

    let status = "نقطة تعادل تقريباً";
    let statusText =
      "الصفقة قريبة من نقطة التعادل بعد احتساب البيانات المدخلة.";

    if (isProfit) {
      status = "صفقة رابحة";
      statusText =
        "النتيجة موجبة بناءً على سعر الدخول والخروج وحجم اللوت. راجع دائماً العمولة والسبريد قبل الاعتماد على النتيجة النهائية.";
    }

    if (isLoss) {
      status = "صفقة خاسرة";
      statusText =
        "النتيجة سالبة بناءً على سعر الدخول والخروج وحجم اللوت. استخدم النتيجة لتقييم المخاطرة قبل تكرار نفس حجم الصفقة.";
    }

    return {
      grossProfit,
      netProfit,
      pips,
      pipValue,
      accountImpactPercent,
      isProfit,
      isLoss,
      status,
      statusText,
      tradeDirection: tradeType === "buy" ? "شراء" : "بيع",
    };
  }, [
    lotSize,
    entryPrice,
    exitPrice,
    accountBalance,
    commission,
    tradeType,
    current,
  ]);

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
                حاسبة الأرباح والخسائر في الفوركس والذهب
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب الربح أو الخسارة المتوقعة قبل أو بعد الصفقة بناءً على نوع
                الصفقة، سعر الدخول، سعر الخروج، حجم اللوت، والأصل المالي. تساعدك
                الحاسبة على معرفة عدد النقاط والنتيجة بالدولار وتأثيرها على
                رصيد الحساب.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  احسب الربح والخسارة الآن
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح الحاسبة
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-t-0 lg:border-r lg:p-10">
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      الصفقة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      شراء EUR/USD
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      الحركة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      50 نقطة
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      الربح التقريبي
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      $500
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  المثال يفترض شراء 1 لوت على EUR/USD من 1.0800 إلى 1.0850.
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
                  حاسبة الأرباح والخسائر
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  احسب نتيجة الصفقة بالدولار وعدد النقاط بناءً على سعر الدخول
                  والخروج وحجم اللوت. تدعم الحاسبة صفقات الشراء والبيع في
                  الفوركس والذهب.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب الربح أو الخسارة حسب الدخول والخروج واللوت.
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
                    نوع الصفقة
                  </label>

                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value as TradeType)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="buy">شراء Buy</option>
                    <option value="sell">بيع Sell</option>
                  </select>
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
                    رصيد الحساب
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    {current.entryLabel}
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    {current.exitLabel}
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={exitPrice}
                    onChange={(e) => setExitPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    العمولة أو الرسوم بالدولار
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="اختياري، مثال: 7"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                احسب الربح أو الخسارة الآن
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                النتائج تقديرية وقد تختلف حسب السبريد، العمولة، سعر التنفيذ،
                وحجم العقد لدى الوسيط.
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
                    ملخص الصفقة
                  </h3>
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div
                    className={`rounded-2xl border p-4 ${
                      result.isProfit
                        ? "border-emerald-100 bg-emerald-50"
                        : result.isLoss
                          ? "border-red-100 bg-red-50"
                          : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <p
                      className={`text-xs font-bold ${
                        result.isProfit
                          ? "text-emerald-700"
                          : result.isLoss
                            ? "text-red-700"
                            : "text-slate-600"
                      }`}
                    >
                      صافي النتيجة
                    </p>

                    <p
                      className={`mt-2 text-3xl font-extrabold ${
                        result.isProfit
                          ? "text-emerald-700"
                          : result.isLoss
                            ? "text-red-700"
                            : "text-slate-950"
                      }`}
                    >
                      {money(result.netProfit)}
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      بعد خصم العمولة أو الرسوم المدخلة.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        عدد النقاط
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {numberFormat(result.pips)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        قيمة النقطة
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.pipValue)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        الربح/الخسارة قبل الرسوم
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.grossProfit)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        التأثير على الحساب
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {numberFormat(result.accountImpactPercent)}%
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      {result.status}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.statusText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل بيانات الصفقة ثم اضغط على زر الحساب لعرض الربح أو
                    الخسارة المتوقعة.
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
              دليل حساب الأرباح والخسائر في الفوركس والذهب
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              تساعدك حاسبة الأرباح والخسائر على معرفة نتيجة الصفقة قبل الدخول
              أو بعد الإغلاق. بدلاً من تقدير النتيجة بشكل عشوائي، يمكنك إدخال
              سعر الدخول والخروج وحجم اللوت ونوع الصفقة لمعرفة عدد النقاط
              والربح أو الخسارة بالدولار.
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
                  كيف يتم حساب الربح والخسارة؟
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "نوع الصفقة",
                    "سعر الدخول",
                    "سعر الخروج",
                    "حجم اللوت",
                    "النتيجة",
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
                  في صفقة الشراء، يكون الربح عند ارتفاع سعر الخروج عن سعر
                  الدخول. أما في صفقة البيع، يكون الربح عند انخفاض سعر الخروج عن
                  سعر الدخول. بعد ذلك يتم ضرب فرق السعر في حجم العقد وحجم اللوت،
                  ثم يتم تحويل النتيجة إلى الدولار عند الحاجة.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    المفهوم
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي حاسبة الأرباح والخسائر؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    هي أداة تساعد المتداول على حساب الربح أو الخسارة المحتملة
                    بناءً على بيانات الصفقة. يمكن استخدامها قبل تنفيذ الصفقة
                    للتخطيط، أو بعد الإغلاق لمراجعة النتيجة.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    النقاط
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    لماذا عدد النقاط مهم؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    عدد النقاط يوضح مقدار حركة السعر بين الدخول والخروج. لكن
                    قيمة هذه النقاط تعتمد على حجم اللوت والأصل المالي، لذلك حركة
                    50 نقطة قد تعني 5 دولارات أو 500 دولار حسب حجم الصفقة.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    المعادلة
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    معادلة حساب النتيجة
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    الربح أو الخسارة = فرق السعر × حجم العقد × حجم اللوت
                    <br />
                    وفي بعض الأزواج يتم تحويل الناتج إلى الدولار حسب السعر.
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أمثلة على حساب الأرباح والخسائر
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">الصفقة</th>
                        <th className="p-4 font-extrabold">الدخول</th>
                        <th className="p-4 font-extrabold">الخروج</th>
                        <th className="p-4 font-extrabold">النتيجة</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["شراء EUR/USD", "1.0800", "1.0850", "+$500"],
                        ["بيع EUR/USD", "1.0800", "1.0750", "+$500"],
                        ["شراء EUR/USD", "1.0800", "1.0750", "-$500"],
                        ["شراء Gold", "2350", "2360", "+$1,000"],
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
                      trade: "شراء EUR/USD",
                      entry: "1.0800",
                      exit: "1.0850",
                      result: "+$500",
                    },
                    {
                      trade: "بيع EUR/USD",
                      entry: "1.0800",
                      exit: "1.0750",
                      result: "+$500",
                    },
                    {
                      trade: "شراء EUR/USD",
                      entry: "1.0800",
                      exit: "1.0750",
                      result: "-$500",
                    },
                    {
                      trade: "شراء Gold",
                      entry: "2350",
                      exit: "2360",
                      result: "+$1,000",
                    },
                  ].map((row) => (
                    <div
                      key={`${row.trade}-${row.entry}-${row.exit}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">الصفقة</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.trade}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">الدخول</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.entry}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">الخروج</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.exit}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">النتيجة</span>
                          <div className="mt-1 font-extrabold text-brand-600">
                            {row.result}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  هذه الأمثلة تقريبية وتفترض حجم صفقة 1 لوت دون احتساب السبريد
                  أو العمولة. قد تختلف النتيجة الفعلية حسب سعر التنفيذ وشروط
                  الوسيط.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    الفرق بين الربح بالنقاط والربح بالدولار
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    الربح بالنقاط يوضح مقدار حركة السعر فقط، أما الربح بالدولار
                    فيعتمد على حجم اللوت وقيمة النقطة. لذلك لا يكفي أن تقول إن
                    الصفقة ربحت 50 نقطة، بل يجب معرفة حجم الصفقة أيضاً.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    على سبيل المثال، 50 نقطة على 0.01 لوت تختلف تماماً عن 50
                    نقطة على 1 لوت. الأولى قد تكون صغيرة جداً، بينما الثانية قد
                    تمثل ربحاً أو خسارة كبيرة.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    لماذا يجب حساب الخسارة قبل الصفقة؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    حساب الخسارة المحتملة قبل فتح الصفقة يساعدك على معرفة أسوأ
                    سيناريو. إذا كانت الخسارة المتوقعة كبيرة مقارنة برصيد
                    الحساب، فقد تحتاج إلى تقليل حجم اللوت أو تعديل وقف الخسارة.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  حساب الربح والخسارة في الذهب XAUUSD
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  الذهب يختلف عن أزواج الفوركس لأن حجم العقد وطريقة حساب الحركة
                  قد تختلف بين الوسطاء. في هذه الحاسبة نفترض أن 1 لوت ذهب يساوي
                  100 أونصة، وأن الربح أو الخسارة يحسبان بالدولار لأن الذهب
                  مسعر مقابل USD.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  إذا اشتريت 1 لوت ذهب من 2350 إلى 2360، فإن الحركة تساوي 10
                  دولارات في السعر، ومع عقد 100 أونصة تكون النتيجة التقريبية
                  1000 دولار قبل احتساب السبريد أو العمولة.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة عند حساب الربح والخسارة
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "حساب الربح بالنقاط فقط دون معرفة قيمة النقطة بالدولار.",
                    "تجاهل السبريد والعمولة عند حساب النتيجة النهائية.",
                    "استخدام نفس قيمة النقطة لكل الأزواج بدون مراعاة السعر.",
                    "نسيان أن صفقة البيع تربح عند انخفاض السعر.",
                    "تجاهل حجم اللوت عند مقارنة نتائج صفقات مختلفة.",
                    "الاعتماد على الربح المتوقع دون حساب الخسارة المحتملة.",
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
                  نصائح لاستخدام حاسبة الأرباح والخسائر
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "أدخل سعر الدخول والخروج بدقة كما يظهران في منصة التداول.",
                    "استخدم حجم اللوت الحقيقي وليس حجم العقد فقط.",
                    "أضف العمولة إذا كانت معروفة للحصول على نتيجة أقرب للواقع.",
                    "قارن النتيجة مع رصيد الحساب لمعرفة التأثير النسبي.",
                    "استخدم الحاسبة قبل الصفقة وبعدها لمراجعة الأداء.",
                    "اربط النتيجة دائماً بخطة إدارة المخاطر وليس بالربح فقط.",
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
                    ["حاسبة حجم اللوت", "/tools/lot-size-calculator"],
                    ["حاسبة قيمة النقطة", "/tools/pip-calculator"],
                    ["حاسبة الهامش", "/tools/margin-calculator"],
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
            أسئلة شائعة حول حاسبة الأرباح والخسائر
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هي حاسبة الأرباح والخسائر؟",
                a: "هي أداة تساعدك على حساب الربح أو الخسارة المتوقعة بناءً على سعر الدخول والخروج وحجم اللوت ونوع الصفقة.",
              },
              {
                q: "كيف يتم حساب الربح في الفوركس؟",
                a: "يتم حساب الربح من خلال فرق السعر بين الدخول والخروج مضروباً في حجم العقد وحجم اللوت، مع تحويل الناتج إلى الدولار عند الحاجة.",
              },
              {
                q: "هل الحاسبة تدعم صفقات البيع؟",
                a: "نعم، في صفقة البيع يكون الربح عند انخفاض السعر ويكون الخسارة عند ارتفاعه.",
              },
              {
                q: "هل يمكن استخدامها للذهب؟",
                a: "نعم، تدعم الحاسبة الذهب XAUUSD مع افتراض أن 1 لوت يساوي 100 أونصة، وقد تختلف المواصفات حسب الوسيط.",
              },
              {
                q: "هل النتيجة نهائية؟",
                a: "النتيجة تقديرية، لأن النتيجة الفعلية قد تتأثر بالسبريد والعمولة والانزلاق السعري وسعر التنفيذ.",
              },
              {
                q: "لماذا تختلف النتيجة بين وسيط وآخر؟",
                a: "لأن حجم العقد، طريقة تسعير الأصول، السبريد، العمولة، وسعر التنفيذ قد تختلف من وسيط إلى آخر.",
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