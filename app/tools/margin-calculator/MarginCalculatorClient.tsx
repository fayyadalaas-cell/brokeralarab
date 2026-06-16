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
    contractSize: number;
    defaultPrice: string;
    priceLabel: string;
    pricePlaceholder: string;
    note: string;
  }
> = {
  EURUSD: {
    label: "EUR/USD",
    contractSize: 100000,
    defaultPrice: "1.0800",
    priceLabel: "سعر EUR/USD الحالي",
    pricePlaceholder: "مثال: 1.0800",
    note: "في زوج EUR/USD، اللوت القياسي يساوي 100,000 وحدة من اليورو، ويتم تحويل القيمة إلى الدولار حسب السعر الحالي.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    defaultPrice: "1.2700",
    priceLabel: "سعر GBP/USD الحالي",
    pricePlaceholder: "مثال: 1.2700",
    note: "في زوج GBP/USD، اللوت القياسي يساوي 100,000 وحدة من الجنيه الإسترليني، والهامش يعتمد على السعر الحالي والرافعة.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    defaultPrice: "0.6600",
    priceLabel: "سعر AUD/USD الحالي",
    pricePlaceholder: "مثال: 0.6600",
    note: "في زوج AUD/USD، يتم حساب القيمة الاسمية بالدولار بناءً على حجم العقد وسعر الزوج الحالي.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    defaultPrice: "0.6100",
    priceLabel: "سعر NZD/USD الحالي",
    pricePlaceholder: "مثال: 0.6100",
    note: "في زوج NZD/USD، الهامش المطلوب يتغير حسب حجم الصفقة والسعر الحالي والرافعة المالية.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    defaultPrice: "100000",
    priceLabel: "القيمة الاسمية لكل 1 لوت بالدولار",
    pricePlaceholder: "مثال: 100000",
    note: "لأن الدولار هو عملة الأساس في USD/JPY، يمكن استخدام 100,000 دولار كقيمة اسمية تقريبية لكل 1 لوت قياسي.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    defaultPrice: "2350",
    priceLabel: "سعر الذهب الحالي",
    pricePlaceholder: "مثال: 2350",
    note: "في الذهب، غالباً يمثل 1 لوت حوالي 100 أونصة. قد يختلف حجم العقد حسب الوسيط، لذلك استخدم النتيجة كقيمة تقديرية.",
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

export default function MarginCalculatorClient() {
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
    const lev = Number(leverage);
    const marketPrice = Number(price);

    if (
      !Number.isFinite(accountBalance) ||
      !Number.isFinite(lots) ||
      !Number.isFinite(lev) ||
      !Number.isFinite(marketPrice)
    ) {
      return null;
    }

    if (accountBalance <= 0 || lots <= 0 || lev <= 0 || marketPrice <= 0) {
      return null;
    }

    let notionalValue = 0;

    if (instrument === "USDJPY") {
      notionalValue = lots * current.contractSize;
    } else {
      notionalValue = lots * current.contractSize * marketPrice;
    }

    const requiredMargin = notionalValue / lev;
    const freeMargin = accountBalance - requiredMargin;
    const marginUsedPercent = (requiredMargin / accountBalance) * 100;
    const marginLevel = (accountBalance / requiredMargin) * 100;

    let marginStatus = "هامش مريح";
    let marginText =
      "الهامش المطلوب منخفض مقارنة برصيد الحساب، لكن يجب الانتباه دائماً إلى حجم الصفقة والرافعة المالية.";

    if (marginUsedPercent > 30 && marginUsedPercent <= 70) {
      marginStatus = "هامش متوسط";
      marginText =
        "جزء واضح من رصيد الحساب سيكون محجوزاً كهامش. تأكد من ترك مساحة كافية لتحمل حركة السعر.";
    }

    if (marginUsedPercent > 70) {
      marginStatus = "هامش مرتفع";
      marginText =
        "الهامش المطلوب يستهلك نسبة كبيرة من الحساب. قد يكون حجم الصفقة أو الرافعة غير مناسبين لرأس المال.";
    }

    return {
      notionalValue,
      requiredMargin,
      freeMargin,
      marginUsedPercent,
      marginLevel,
      marginStatus,
      marginText,
    };
  }, [balance, lotSize, leverage, price, instrument, current.contractSize]);

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
                حاسبة الهامش في الفوركس والذهب
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب الهامش المطلوب لفتح الصفقة بناءً على حجم اللوت، الرافعة
                المالية، نوع الأصل المالي، والسعر الحالي. تساعدك الحاسبة على
                معرفة مقدار رأس المال المحجوز قبل الدخول إلى السوق.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  احسب الهامش الآن
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح الهامش والرافعة
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-t-0 lg:border-r lg:p-10">
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-blue-700">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      حجم الصفقة
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1 لوت EUR/USD
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      الرافعة المالية
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1:100
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      الهامش التقريبي
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      حوالي $1,080
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  المثال يفترض سعر EUR/USD عند 1.0800 وحجم عقد قياسي 100,000
                  وحدة. النتيجة تختلف حسب السعر والوسيط.
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
                  حاسبة الهامش
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  احسب الهامش المطلوب وقيمة الصفقة الاسمية قبل فتح أي صفقة في
                  الفوركس أو الذهب بناءً على حجم اللوت والسعر الحالي والرافعة
                  المالية.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب الهامش المطلوب قبل فتح الصفقة.
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
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
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
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
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

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    الرافعة المالية
                  </label>
                  <select
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-right text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
                  >
                    {["10", "20", "30", "50", "100", "200", "400", "500"].map(
                      (item) => (
                        <option key={item} value={item}>
                          1:{item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-950 sm:text-base"
              >
                احسب الهامش الآن
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                النتائج تقديرية وقد تختلف حسب الوسيط، نوع الحساب، حجم العقد،
                السعر اللحظي، ومتطلبات الهامش.
              </p>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-blue-700">
                    نتيجة الحساب
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    ملخص الهامش
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
                      الهامش المطلوب
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.requiredMargin)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      المبلغ المحجوز تقريباً لفتح الصفقة.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-slate-500 sm:text-sm">
                      القيمة الاسمية
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.notionalValue)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      حجم الصفقة قبل تطبيق الرافعة.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-blue-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-blue-700 sm:text-sm">
                      حالة الهامش
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-slate-950 sm:mt-2 sm:text-2xl">
                      {result.marginStatus}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-2 sm:leading-6">
                      {result.marginText}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 sm:col-span-3 lg:col-span-1">
                    <div className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          الهامش الحر التقريبي
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {money(result.freeMargin)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          نسبة استخدام الهامش
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {numberFormat(result.marginUsedPercent)}%
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          مستوى الهامش التقريبي
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {numberFormat(result.marginLevel)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل بيانات الصفقة واضغط على زر الحساب حتى تظهر نتيجة
                    الهامش هنا.
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
              دليل الهامش والرافعة المالية في الفوركس والذهب
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              يعتبر الهامش من أهم المفاهيم التي يجب على أي متداول فهمها قبل
              استخدام الرافعة المالية. تساعدك حاسبة الهامش على معرفة المبلغ الذي
              سيتم حجزه من رصيد الحساب عند فتح الصفقة، مما يساعدك على إدارة رأس
              المال وتجنب نداء الهامش أو التصفية الإجبارية.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10 [&_p]:text-justify">
            <div
              className={`space-y-6 overflow-hidden transition-all duration-300 lg:max-h-none ${
                showGuideMore ? "max-h-[12000px]" : "max-h-[980px]"
              }`}
            >
              {/* HOW MARGIN WORKS */}
              <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  كيف يتم حساب الهامش؟
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "حجم اللوت",
                    "السعر الحالي",
                    "القيمة الاسمية",
                    "الرافعة",
                    "الهامش",
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
                  يتم أولاً حساب القيمة الاسمية للصفقة ثم تقسيمها على الرافعة
                  المالية. الناتج هو الهامش المطلوب الذي يتم حجزه من الحساب عند
                  فتح الصفقة.
                </p>
              </section>

              {/* CARDS */}
              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    المفهوم
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هو الهامش؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    الهامش هو جزء من رصيد الحساب يقوم الوسيط بحجزه كضمان لفتح
                    الصفقة. لا يعتبر تكلفة أو عمولة، بل مبلغاً يبقى محجوزاً طوال
                    فترة بقاء الصفقة مفتوحة.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    الرافعة
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي الرافعة المالية؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    الرافعة المالية تسمح لك بالتحكم في حجم صفقة أكبر من رأس المال
                    الفعلي الموجود في الحساب. كلما ارتفعت الرافعة، انخفض الهامش
                    المطلوب، لكن تزداد المخاطر أيضاً.
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
                    القيمة الاسمية = حجم العقد × السعر
                    <br />
                    الهامش = القيمة الاسمية ÷ الرافعة المالية
                  </div>
                </div>
              </section>

              {/* EXAMPLES */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أمثلة عملية على حساب الهامش
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="p-3 font-extrabold">الأصل</th>
                        <th className="p-3 font-extrabold">اللوت</th>
                        <th className="p-3 font-extrabold">الرافعة</th>
                        <th className="p-3 font-extrabold">الهامش</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["EUR/USD", "1", "1:100", "$1,080"],
                        ["EUR/USD", "0.10", "1:100", "$108"],
                        ["Gold", "1", "1:100", "$2,350"],
                      ].map((row) => (
                        <tr key={row.join("-")}>
                          {row.map((cell) => (
                            <td
                              key={cell}
                              className="p-4 font-bold text-slate-700"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  تختلف النتائج حسب السعر الحالي وحجم العقد وشروط الوسيط، لذلك
                  تعتبر الأمثلة تقريبية لأغراض تعليمية.
                </p>
              </section>

              {/* MARGIN LEVEL */}
              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هو مستوى الهامش؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    مستوى الهامش هو مؤشر يستخدمه الوسطاء لمعرفة مدى أمان الحساب.
                    كلما ارتفع مستوى الهامش كان الحساب أكثر قدرة على تحمل تقلبات
                    السوق.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    انخفاض مستوى الهامش بشكل كبير قد يؤدي إلى نداء الهامش
                    (Margin Call) أو إغلاق الصفقات تلقائياً في بعض الشركات.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    القاعدة الذهبية
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    لا تستخدم كامل الهامش المتاح في الحساب. ترك هامش حر مناسب
                    يساعد على تجنب التصفية الإجبارية عند تحرك السوق ضد الصفقة.
                  </p>
                </div>
              </section>

              {/* COMMON MISTAKES */}
              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة في استخدام الرافعة المالية
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "استخدام رافعة مالية مرتفعة جداً مقارنة بحجم الحساب.",
                    "فتح عدة صفقات كبيرة في نفس الوقت.",
                    "الاعتماد على الهامش المتبقي بالكامل للدخول في صفقات إضافية.",
                    "عدم فهم الفرق بين الهامش والهامش الحر ومستوى الهامش.",
                    "تجاهل مخاطر التصفية الإجبارية.",
                    "التركيز على الرافعة المالية دون إدارة المخاطر.",
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

              {/* RULES */}
              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  نصائح لإدارة الهامش بشكل احترافي
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "احرص على وجود هامش حر كافٍ دائماً.",
                    "لا تستخدم أعلى رافعة مالية متاحة لمجرد أنها متوفرة.",
                    "راقب مستوى الهامش باستمرار.",
                    "اربط حجم الصفقة بإدارة المخاطر وليس فقط بالرافعة.",
                    "قلل حجم اللوت إذا كان الهامش المطلوب مرتفعاً.",
                    "افهم شروط التصفية ونداء الهامش لدى وسيطك.",
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

       {/* TOOLS */}
<section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm sm:p-7">
  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
    أدوات تداول أخرى
  </h3>

  <div className="mt-5 grid gap-3 sm:grid-cols-2">
    {[
      ["حاسبة إدارة المخاطر", "/tools/risk-calculator"],
      ["حاسبة قيمة النقطة", "/tools/pip-calculator"],
      ["حاسبة الأرباح والخسائر", "/tools/profit-calculator"],
      ["حاسبة حجم اللوت", "/tools/lot-size-calculator"],
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
            أسئلة شائعة حول حاسبة الهامش
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هو الهامش في الفوركس؟",
                a: "هو مبلغ يتم حجزه من الحساب كضمان لفتح الصفقة باستخدام الرافعة المالية.",
              },
              {
                q: "هل الهامش يعتبر تكلفة؟",
                a: "لا، الهامش ليس عمولة أو رسماً، بل مبلغ محجوز طوال فترة الصفقة.",
              },
              {
                q: "ما الفرق بين الهامش والهامش الحر؟",
                a: "الهامش هو المبلغ المحجوز، أما الهامش الحر فهو الرصيد المتاح لفتح صفقات جديدة أو تحمل الخسائر.",
              },
              {
                q: "هل الرافعة المالية تقلل الهامش؟",
                a: "نعم، كلما ارتفعت الرافعة المالية انخفض الهامش المطلوب لنفس حجم الصفقة.",
              },
              {
                q: "هل نتائج الحاسبة دقيقة 100%؟",
                a: "النتائج تقديرية وقد تختلف حسب الوسيط وحجم العقد والسعر الحالي ومتطلبات الهامش الخاصة بالشركة.",
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