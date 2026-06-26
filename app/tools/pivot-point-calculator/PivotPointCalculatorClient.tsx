"use client";

import { useMemo, useState } from "react";

function price(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 5,
  }).format(value);
}

const exampleRows = [
  {
    high: "1.2750",
    low: "1.2650",
    close: "1.2700",
    pivot: "1.2700",
    r1: "1.2750",
    s1: "1.2650",
  },
  {
    high: "2,040",
    low: "2,020",
    close: "2,030",
    pivot: "2,030",
    r1: "2,040",
    s1: "2,020",
  },
  {
    high: "185.50",
    low: "181.00",
    close: "183.25",
    pivot: "183.25",
    r1: "185.50",
    s1: "181.00",
  },
];

export default function PivotPointCalculatorClient() {
  const [highPrice, setHighPrice] = useState("1.2750");
  const [lowPrice, setLowPrice] = useState("1.2650");
  const [closePrice, setClosePrice] = useState("1.2700");
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const result = useMemo(() => {
    const high = Number(highPrice);
    const low = Number(lowPrice);
    const close = Number(closePrice);

    if (!Number.isFinite(high) || !Number.isFinite(low) || !Number.isFinite(close)) {
      return null;
    }

    if (high <= 0 || low <= 0 || close <= 0 || high <= low) {
      return null;
    }

    if (close > high || close < low) {
      return null;
    }

    const pivot = (high + low + close) / 3;

    const r1 = 2 * pivot - low;
    const s1 = 2 * pivot - high;

    const r2 = pivot + (high - low);
    const s2 = pivot - (high - low);

    const r3 = high + 2 * (pivot - low);
    const s3 = low - 2 * (high - pivot);

    const range = high - low;

    let bias = "منطقة توازن سعري";
    let biasText =
      "السعر الختامي قريب من منتصف النطاق، لذلك قد يكون مستوى Pivot Point منطقة توازن مهمة بين المشترين والبائعين.";

    if (close > pivot) {
      bias = "ميل إيجابي نسبي";
      biasText =
        "الإغلاق أعلى من نقطة الارتكاز قد يشير إلى ميل إيجابي نسبي، لكن يجب انتظار تأكيد من حركة السعر وحجم التداول.";
    }

    if (close < pivot) {
      bias = "ميل سلبي نسبي";
      biasText =
        "الإغلاق أسفل نقطة الارتكاز قد يشير إلى ميل سلبي نسبي، لكن لا يجب الاعتماد عليه وحده لاتخاذ قرار تداول.";
    }

    return {
      high,
      low,
      close,
      range,
      pivot,
      levels: [
        { name: "R3", label: "المقاومة الثالثة", value: r3 },
        { name: "R2", label: "المقاومة الثانية", value: r2 },
        { name: "R1", label: "المقاومة الأولى", value: r1 },
        { name: "PP", label: "نقطة الارتكاز", value: pivot },
        { name: "S1", label: "الدعم الأول", value: s1 },
        { name: "S2", label: "الدعم الثاني", value: s2 },
        { name: "S3", label: "الدعم الثالث", value: s3 },
      ],
      bias,
      biasText,
    };
  }, [highPrice, lowPrice, closePrice]);

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
                أدوات التحليل الفني والتداول
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                حاسبة نقاط الارتكاز Pivot Point
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب مستويات Pivot Point اليومية ومناطق الدعم والمقاومة بناءً
                على أعلى سعر وأدنى سعر وسعر الإغلاق. تساعدك حاسبة نقاط الارتكاز
                على تحديد مستويات PP وR1 وR2 وR3 وS1 وS2 وS3 التي يستخدمها
                المتداولون في الفوركس والذهب والأسهم والمؤشرات.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  احسب نقاط الارتكاز الآن
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح Pivot Point
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-r lg:border-t-0 lg:p-10">
              <div className="rounded-[1.5rem] border border-brand-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">أعلى سعر</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1.2750
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">أدنى سعر</p>
                    <p className="mt-1 text-2xl font-extrabold text-brand-600">
                      1.2650
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      نقطة الارتكاز PP
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      1.2700
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  المثال يعتمد على معادلة نقاط الارتكاز الكلاسيكية باستخدام
                  السعر الأعلى والأدنى والإغلاق.
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
                  حاسبة Pivot Point للدعم والمقاومة
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  أدخل أعلى سعر وأدنى سعر وسعر الإغلاق للفترة السابقة للحصول
                  على نقطة الارتكاز ومستويات الدعم والمقاومة التي يستخدمها
                  المتداولون في التحليل الفني اليومي.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب Pivot Point ومستويات الدعم والمقاومة بسهولة.
                </p>
              </div>
            </div>
          </div>

          <div className="grid items-start gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
            {/* FORM */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 sm:rounded-[2rem] sm:p-6 lg:self-start">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    أعلى سعر High
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={highPrice}
                    onChange={(e) => setHighPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1.2750"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    أدنى سعر Low
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={lowPrice}
                    onChange={(e) => setLowPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1.2650"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    سعر الإغلاق Close
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={closePrice}
                    onChange={(e) => setClosePrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1.2700"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                احسب نقاط الارتكاز الآن
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                مستويات Pivot Point مناطق فنية محتملة وليست إشارات تداول
                مضمونة.
              </p>

              <div className="mt-6 hidden rounded-2xl border border-brand-100 bg-white p-4 shadow-sm lg:block">
                <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-brand-600">
                  أدوات مرتبطة
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <a href="/tools/fibonacci-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600">
                    حاسبة فيبوناتشي
                  </a>
                  <a href="/tools/pip-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600">
                    حاسبة النقاط
                  </a>
                  <a href="/tools/profit-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600">
                    حاسبة الأرباح والخسائر
                  </a>
                  <a href="/tools/risk-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600">
                    حاسبة إدارة المخاطر
                  </a>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3">
                <p className="text-xs font-bold text-brand-600">نتيجة الحساب</p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                  ملخص نقاط الارتكاز
                </h3>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      نقطة الارتكاز الرئيسية PP
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {price(result.pivot)}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      المستوى المركزي الذي تقاس منه مستويات الدعم والمقاومة.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        نطاق السعر
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {price(result.range)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        سعر الإغلاق
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {price(result.close)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      قراءة مبدئية
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-brand-600">
                      {result.bias}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.biasText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل أعلى سعر وأدنى سعر وسعر الإغلاق ثم اضغط على زر الحساب
                    لعرض نقطة الارتكاز ومستويات الدعم والمقاومة.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  تأكد من إدخال قيم صحيحة. يجب أن يكون أعلى سعر أكبر من أدنى سعر،
                  وأن يكون سعر الإغلاق داخل النطاق.
                </div>
              )}
            </div>
          </div>

          {/* LEVELS TABLE */}
          {showResult && result && (
            <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-8 lg:p-10">
              <h3 className="text-center text-xl font-extrabold text-slate-950 sm:text-2xl">
                جدول مستويات Pivot Point
              </h3>

              <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-600">
                يوضح الجدول مستويات المقاومة والدعم ونقطة الارتكاز المحسوبة
                باستخدام الطريقة الكلاسيكية.
              </p>

              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
                <table className="w-full text-right text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4 font-extrabold">الرمز</th>
                      <th className="p-4 font-extrabold">المستوى</th>
                      <th className="p-4 font-extrabold">السعر</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {result.levels.map((row) => (
                      <tr key={row.name} className="transition hover:bg-brand-50">
                        <td className="p-4 font-extrabold text-brand-600">
                          {row.name}
                        </td>
                        <td className="p-4 font-bold text-slate-700">
                          {row.label}
                        </td>
                        <td className="p-4 font-extrabold text-slate-950">
                          {price(row.value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4 md:hidden">
                {result.levels.map((row) => (
                  <div
                    key={row.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">الرمز</span>
                        <div className="mt-1 font-extrabold text-brand-600">
                          {row.name}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500">السعر</span>
                        <div className="mt-1 font-extrabold text-slate-950">
                          {price(row.value)}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <span className="text-slate-500">المستوى</span>
                        <div className="mt-1 font-bold text-slate-700">
                          {row.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
              دليل نقاط الارتكاز Pivot Point في التداول
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              نقاط الارتكاز من أشهر أدوات التحليل الفني التي يستخدمها المتداولون
              لتحديد مستويات الدعم والمقاومة اليومية. تعتمد الطريقة الكلاسيكية
              على أعلى سعر وأدنى سعر وسعر الإغلاق للفترة السابقة، ثم يتم حساب
              نقطة مركزية تسمى Pivot Point أو PP، ومنها يتم اشتقاق مستويات
              المقاومة R1 وR2 وR3 ومستويات الدعم S1 وS2 وS3.
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
                  كيف يتم حساب Pivot Point؟
                </h3>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                  PP = (High + Low + Close) ÷ 3
                  <br />
                  R1 = (2 × PP) - Low
                  <br />
                  S1 = (2 × PP) - High
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  تبدأ الحاسبة بحساب نقطة الارتكاز الرئيسية من متوسط أعلى سعر
                  وأدنى سعر وسعر الإغلاق. بعد ذلك يتم استخدام هذه النقطة لحساب
                  مستويات الدعم والمقاومة. عندما يكون السعر فوق Pivot Point قد
                  يعتبره بعض المتداولين ميلاً إيجابياً، وعندما يكون السعر أسفله
                  قد يعتبرونه ميلاً سلبياً، لكن لا يجب الاعتماد على ذلك وحده.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    PP
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي نقطة الارتكاز؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    نقطة الارتكاز هي المستوى المركزي الذي يستخدمه المتداولون
                    كمرجع لمعرفة ما إذا كان السعر يتحرك أعلى أو أسفل منطقة
                    التوازن اليومية.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    R1 / R2 / R3
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي مستويات المقاومة؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    مستويات المقاومة هي مناطق أعلى من نقطة الارتكاز قد يواجه
                    السعر عندها ضغط بيع أو تباطؤاً في الصعود، خصوصاً في التداول
                    اليومي.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    S1 / S2 / S3
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي مستويات الدعم؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                    مستويات الدعم هي مناطق أسفل نقطة الارتكاز قد يظهر عندها
                    اهتمام شرائي أو تباطؤ في الهبوط، لكنها ليست مستويات مضمونة
                    للارتداد.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أمثلة على حساب Pivot Point
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  يوضح الجدول التالي أمثلة مبسطة على حساب نقطة الارتكاز
                  والمستوى الأول من الدعم والمقاومة باستخدام الطريقة الكلاسيكية.
                </p>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">أعلى سعر</th>
                        <th className="p-4 font-extrabold">أدنى سعر</th>
                        <th className="p-4 font-extrabold">الإغلاق</th>
                        <th className="p-4 font-extrabold">PP</th>
                        <th className="p-4 font-extrabold">R1</th>
                        <th className="p-4 font-extrabold">S1</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {exampleRows.map((row) => (
                        <tr
                          key={`${row.high}-${row.low}-${row.close}`}
                          className="transition hover:bg-brand-50"
                        >
                          <td className="p-4 font-bold text-slate-700">
                            {row.high}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.low}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.close}
                          </td>
                          <td className="p-4 font-extrabold text-brand-600">
                            {row.pivot}
                          </td>
                          <td className="p-4 font-extrabold text-brand-600">
                            {row.r1}
                          </td>
                          <td className="p-4 font-extrabold text-brand-600">
                            {row.s1}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 space-y-4 md:hidden">
                  {exampleRows.map((row) => (
                    <div
                      key={`${row.high}-${row.low}-${row.close}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">أعلى سعر</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.high}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">أدنى سعر</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.low}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">PP</span>
                          <div className="mt-1 font-extrabold text-brand-600">
                            {row.pivot}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">R1 / S1</span>
                          <div className="mt-1 font-extrabold text-brand-600">
                            {row.r1} / {row.s1}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    كيف يستخدم المتداولون نقاط الارتكاز؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    يستخدم المتداولون Pivot Point كخريطة يومية للسعر. إذا كان
                    السعر يتداول أعلى من PP، فقد يراقبون مستويات R1 وR2 وR3
                    كمناطق مقاومة أو أهداف محتملة. أما إذا كان السعر أسفل PP،
                    فقد يراقبون مستويات S1 وS2 وS3 كمناطق دعم أو أهداف هبوطية.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    في تداول الفوركس والذهب والمؤشرات، يفضل كثير من المتداولين
                    استخدام مستويات Pivot Point مع افتتاح الجلسات، الأخبار
                    الاقتصادية، الاتجاه العام، وحركة السعر عند كل مستوى.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    هل Pivot Point مناسب للتداول اليومي؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    نعم، نقاط الارتكاز شائعة جداً في التداول اليومي لأنها تعتمد
                    على بيانات الفترة السابقة وتقدم مستويات واضحة لليوم الحالي.
                    لكنها تكون أقوى عندما تتوافق مع مناطق دعم ومقاومة حقيقية أو
                    سلوك سعري واضح.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة عند استخدام Pivot Point
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "استخدام مستويات Pivot Point وحدها دون تأكيد من حركة السعر.",
                    "الاعتماد على بيانات High وLow وClose غير صحيحة.",
                    "الدخول في صفقة فقط لأن السعر وصل إلى R1 أو S1.",
                    "تجاهل الأخبار الاقتصادية القوية وقت التداول.",
                    "عدم التمييز بين السوق المتذبذب والسوق الاتجاهي.",
                    "التداول بدون وقف خسارة واضح أو خطة لإدارة المخاطر.",
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
                  نصائح لاستخدام حاسبة نقاط الارتكاز
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "استخدم بيانات الفترة السابقة بدقة: أعلى سعر، أدنى سعر، وسعر الإغلاق.",
                    "راقب تفاعل السعر مع PP قبل الاعتماد على مستويات R وS.",
                    "ادمج Pivot Point مع الدعم والمقاومة والاتجاه العام.",
                    "لا تعتبر كل مستوى إشارة دخول مباشرة.",
                    "استخدم إدارة مخاطر واضحة مع كل صفقة.",
                    "راجع المستويات مع بداية كل جلسة تداول أو كل يوم جديد.",
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
                  أدوات تداول مرتبطة
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["حاسبة فيبوناتشي", "/tools/fibonacci-calculator"],
                    ["حاسبة النقاط", "/tools/pip-calculator"],
                    ["حاسبة الأرباح والخسائر", "/tools/profit-calculator"],
                    ["حاسبة إدارة المخاطر", "/tools/risk-calculator"],
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
            أسئلة شائعة حول حاسبة Pivot Point
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هي حاسبة Pivot Point؟",
                a: "هي أداة تحسب نقطة الارتكاز ومستويات الدعم والمقاومة بناءً على أعلى سعر وأدنى سعر وسعر الإغلاق للفترة السابقة.",
              },
              {
                q: "ما معادلة Pivot Point الكلاسيكية؟",
                a: "المعادلة الكلاسيكية هي: PP = (أعلى سعر + أدنى سعر + سعر الإغلاق) ÷ 3.",
              },
              {
                q: "ما معنى R1 وR2 وR3؟",
                a: "هذه مستويات مقاومة محتملة أعلى من نقطة الارتكاز، وقد يستخدمها المتداولون كمناطق مراقبة أو أهداف سعرية.",
              },
              {
                q: "ما معنى S1 وS2 وS3؟",
                a: "هذه مستويات دعم محتملة أسفل نقطة الارتكاز، وقد يراقبها المتداولون عند هبوط السعر أو البحث عن مناطق ارتداد محتملة.",
              },
              {
                q: "هل تصلح نقاط الارتكاز للفوركس؟",
                a: "نعم، Pivot Point شائعة في الفوركس والذهب والمؤشرات والأسهم، خصوصاً بين المتداولين اليوميين.",
              },
              {
                q: "هل مستويات Pivot Point مضمونة؟",
                a: "لا، هي مستويات تحليل فني تقديرية وليست ضماناً للارتداد أو الاختراق. يجب استخدامها مع إدارة المخاطر وتأكيد حركة السعر.",
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