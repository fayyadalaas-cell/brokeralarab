"use client";

import { useMemo, useState } from "react";

function price(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 5,
  }).format(value);
}

function percent(value: number) {
  return `${value.toFixed(1)}%`;
}

const retracementLevels = [23.6, 38.2, 50, 61.8, 78.6];
const extensionLevels = [127.2, 161.8, 200, 261.8];

const exampleRows = [
  {
    trend: "اتجاه صاعد",
    high: "1.1200",
    low: "1.1000",
    level: "61.8%",
    value: "1.1076",
  },
  {
    trend: "اتجاه هابط",
    high: "1.1200",
    low: "1.1000",
    level: "38.2%",
    value: "1.1076",
  },
  {
    trend: "امتداد صاعد",
    high: "1.1200",
    low: "1.1000",
    level: "161.8%",
    value: "1.1324",
  },
];

export default function FibonacciCalculatorClient() {
  const [highPrice, setHighPrice] = useState("1.1200");
  const [lowPrice, setLowPrice] = useState("1.1000");
  const [trend, setTrend] = useState<"uptrend" | "downtrend">("uptrend");
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const result = useMemo(() => {
    const high = Number(highPrice);
    const low = Number(lowPrice);

    if (!Number.isFinite(high) || !Number.isFinite(low)) {
      return null;
    }

    if (high <= 0 || low <= 0 || high <= low) {
      return null;
    }

    const range = high - low;

    const retracements = retracementLevels.map((level) => {
      const value =
        trend === "uptrend"
          ? high - range * (level / 100)
          : low + range * (level / 100);

      return {
        level,
        value,
      };
    });

    const extensions = extensionLevels.map((level) => {
      const value =
        trend === "uptrend"
          ? low + range * (level / 100)
          : high - range * (level / 100);

      return {
        level,
        value,
      };
    });

    const goldenZone =
      trend === "uptrend"
        ? {
            from: high - range * 0.618,
            to: high - range * 0.5,
          }
        : {
            from: low + range * 0.5,
            to: low + range * 0.618,
          };

    const trendText =
      trend === "uptrend"
        ? "الاتجاه المحدد صاعد، لذلك يتم حساب مستويات التصحيح أسفل القمة المحتملة، بينما تظهر الامتدادات فوق القمة."
        : "الاتجاه المحدد هابط، لذلك يتم حساب مستويات التصحيح أعلى القاع المحتمل، بينما تظهر الامتدادات أسفل القاع.";

    return {
      high,
      low,
      range,
      retracements,
      extensions,
      goldenZone,
      trendText,
    };
  }, [highPrice, lowPrice, trend]);

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
                حاسبة فيبوناتشي للتداول
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب مستويات فيبوناتشي للتصحيح والامتداد بناءً على أعلى سعر
                وأدنى سعر في الحركة السعرية. تساعدك حاسبة فيبوناتشي على تحديد
                مناطق الدعم والمقاومة المحتملة، ومراقبة مناطق التصحيح المهمة
                مثل 38.2% و50% و61.8%.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  احسب مستويات فيبوناتشي الآن
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح فيبوناتشي
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-r lg:border-t-0 lg:p-10">
              <div className="rounded-[1.5rem] border border-brand-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      أعلى سعر
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1.1200
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      أدنى سعر
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-brand-600">
                      1.1000
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      مستوى 61.8% في اتجاه صاعد
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      1.1076
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  المثال يوضح تصحيح فيبوناتشي لحركة صاعدة من 1.1000 إلى 1.1200.
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
                  حاسبة مستويات فيبوناتشي
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  أدخل أعلى سعر وأدنى سعر وحدد اتجاه الحركة السعرية للحصول على
                  مستويات التصحيح والامتداد التي يستخدمها المتداولون في التحليل
                  الفني.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب مستويات التصحيح والامتداد بسهولة.
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
                    أعلى سعر
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={highPrice}
                    onChange={(e) => setHighPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1.1200"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    أدنى سعر
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={lowPrice}
                    onChange={(e) => setLowPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1.1000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    اتجاه الحركة السعرية
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setTrend("uptrend")}
                      className={`rounded-2xl border px-4 py-3 text-sm font-extrabold transition ${
                        trend === "uptrend"
                          ? "border-blue-600 bg-blue-700 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-brand-50"
                      }`}
                    >
                      اتجاه صاعد
                    </button>

                    <button
                      type="button"
                      onClick={() => setTrend("downtrend")}
                      className={`rounded-2xl border px-4 py-3 text-sm font-extrabold transition ${
                        trend === "downtrend"
                          ? "border-blue-600 bg-blue-700 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-brand-50"
                      }`}
                    >
                      اتجاه هابط
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                احسب مستويات فيبوناتشي الآن
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                مستويات فيبوناتشي مناطق تحليل فني محتملة وليست إشارات بيع أو
                شراء مضمونة.
              </p>

              <div className="mt-6 hidden rounded-2xl border border-brand-100 bg-white p-4 shadow-sm lg:block">
                <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-brand-600">
                  أدوات مرتبطة
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/tools/pip-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    حاسبة النقاط
                  </a>
                  <a
                    href="/tools/profit-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    حاسبة الأرباح والخسائر
                  </a>
                  <a
                    href="/tools/risk-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    حاسبة إدارة المخاطر
                  </a>
                  <a
                    href="/tools/lot-size-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    حاسبة حجم اللوت
                  </a>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3">
                <p className="text-xs font-bold text-brand-600">نتيجة الحساب</p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                  ملخص مستويات فيبوناتشي
                </h3>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      نطاق الحركة السعرية
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {price(result.range)}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      الفرق بين أعلى سعر وأدنى سعر في الحركة المحددة.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        أعلى سعر
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {price(result.high)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        أدنى سعر
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {price(result.low)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      منطقة فيبوناتشي الذهبية
                    </p>
                   <p className="mt-2 text-xl font-extrabold text-brand-600">
  {price(Math.min(result.goldenZone.from, result.goldenZone.to))} -{" "}
  {price(Math.max(result.goldenZone.from, result.goldenZone.to))}
</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      المنطقة بين 50% و61.8% من أكثر مناطق التصحيح التي يراقبها
                      المتداولون.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      ملاحظة حسب الاتجاه
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.trendText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل أعلى سعر وأدنى سعر ثم اختر اتجاه الحركة واضغط على زر
                    الحساب لعرض مستويات فيبوناتشي.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  تأكد من إدخال قيم صحيحة، ويجب أن يكون أعلى سعر أكبر من أدنى سعر.
                </div>
              )}
            </div>
          </div>

          {/* LEVELS TABLES */}
          {showResult && result && (
            <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-8 lg:p-10">
              <h3 className="text-center text-xl font-extrabold text-slate-950 sm:text-2xl">
                جدول مستويات فيبوناتشي
              </h3>

              <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-600">
                يوضح الجدول مستويات التصحيح والامتداد بناءً على الحركة السعرية
                التي أدخلتها.
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 bg-white p-4">
                    <h4 className="text-center text-base font-extrabold text-slate-950">
                      مستويات التصحيح
                    </h4>
                  </div>

                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">المستوى</th>
                        <th className="p-4 font-extrabold">السعر</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {result.retracements.map((row) => (
                        <tr key={row.level} className="transition hover:bg-brand-50">
                          <td className="p-4 font-bold text-slate-700">
                            {percent(row.level)}
                          </td>
                          <td className="p-4 font-extrabold text-brand-600">
                            {price(row.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 bg-white p-4">
                    <h4 className="text-center text-base font-extrabold text-slate-950">
                      مستويات الامتداد
                    </h4>
                  </div>

                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">المستوى</th>
                        <th className="p-4 font-extrabold">السعر</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {result.extensions.map((row) => (
                        <tr key={row.level} className="transition hover:bg-brand-50">
                          <td className="p-4 font-bold text-slate-700">
                            {percent(row.level)}
                          </td>
                          <td className="p-4 font-extrabold text-brand-600">
                            {price(row.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              دليل مستويات فيبوناتشي في التداول
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              فيبوناتشي من أشهر أدوات التحليل الفني التي يستخدمها المتداولون
              لتحديد مناطق التصحيح والامتداد المحتملة بعد حركة سعرية واضحة.
              لا تعطي هذه المستويات قراراً مباشراً بالشراء أو البيع، لكنها تساعد
              في قراءة أماكن الدعم والمقاومة المحتملة.
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
                  كيف تعمل حاسبة فيبوناتشي؟
                </h3>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                  نطاق الحركة = أعلى سعر - أدنى سعر
                  <br />
                  مستوى التصحيح = القمة أو القاع ± نسبة فيبوناتشي من نطاق الحركة
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  تعتمد الحاسبة على تحديد أعلى سعر وأدنى سعر في الحركة السعرية،
                  ثم تطبيق نسب فيبوناتشي المعروفة مثل 23.6% و38.2% و50% و61.8%
                  و78.6% لاستخراج مستويات التصحيح، بالإضافة إلى مستويات الامتداد
                  مثل 127.2% و161.8% و200%.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    التصحيح
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي مستويات التصحيح؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    مستويات التصحيح هي مناطق قد يعود إليها السعر بعد حركة قوية
                    قبل أن يقرر السوق الاستمرار في نفس الاتجاه أو كسره.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    الامتداد
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي مستويات الامتداد؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    مستويات الامتداد تستخدم لتقدير أهداف سعرية محتملة بعد اختراق
                    القمة أو كسر القاع، خصوصاً في الاتجاهات القوية.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    التنبيه
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    هل فيبوناتشي دقيق دائماً؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                    لا. مستويات فيبوناتشي لا تعمل وحدها بشكل مضمون، ويجب دمجها
                    مع الاتجاه العام، مناطق الدعم والمقاومة، إدارة المخاطر،
                    وسلوك السعر.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أمثلة على مستويات فيبوناتشي
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  يوضح الجدول التالي أمثلة مبسطة على كيفية ظهور مستويات
                  فيبوناتشي عند استخدام أعلى سعر وأدنى سعر في حركة سعرية معينة.
                </p>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">نوع الحركة</th>
                        <th className="p-4 font-extrabold">أعلى سعر</th>
                        <th className="p-4 font-extrabold">أدنى سعر</th>
                        <th className="p-4 font-extrabold">المستوى</th>
                        <th className="p-4 font-extrabold">السعر</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {exampleRows.map((row) => (
                        <tr key={`${row.trend}-${row.level}`} className="transition hover:bg-brand-50">
                          <td className="p-4 font-bold text-slate-700">{row.trend}</td>
                          <td className="p-4 font-bold text-slate-700">{row.high}</td>
                          <td className="p-4 font-bold text-slate-700">{row.low}</td>
                          <td className="p-4 font-bold text-slate-700">{row.level}</td>
                          <td className="p-4 font-extrabold text-brand-600">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 space-y-4 md:hidden">
                  {exampleRows.map((row) => (
                    <div
                      key={`${row.trend}-${row.level}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">الحركة</span>
                          <div className="mt-1 font-extrabold text-slate-900">{row.trend}</div>
                        </div>

                        <div>
                          <span className="text-slate-500">المستوى</span>
                          <div className="mt-1 font-extrabold text-slate-900">{row.level}</div>
                        </div>

                        <div>
                          <span className="text-slate-500">أعلى سعر</span>
                          <div className="mt-1 font-extrabold text-slate-900">{row.high}</div>
                        </div>

                        <div>
                          <span className="text-slate-500">السعر</span>
                          <div className="mt-1 font-extrabold text-brand-600">{row.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    أفضل طريقة لاستخدام فيبوناتشي
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    أفضل استخدام لفيبوناتشي يكون بعد حركة سعرية واضحة، سواء صاعدة
                    أو هابطة. في الحركة الصاعدة، يراقب المتداول مناطق التصحيح
                    أسفل القمة. وفي الحركة الهابطة، يراقب مناطق التصحيح أعلى
                    القاع.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    لا يفضل استخدام فيبوناتشي داخل سوق متذبذب بلا اتجاه واضح،
                    لأن المستويات قد تصبح كثيرة وغير دقيقة. كلما كانت الحركة
                    السعرية أوضح، أصبحت المستويات أكثر فائدة في التحليل.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي المنطقة الذهبية؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    المنطقة بين 50% و61.8% تسمى غالباً المنطقة الذهبية، لأنها من
                    أكثر مناطق التصحيح التي يراقبها المتداولون عند البحث عن
                    استمرار الاتجاه بعد تصحيح سعري.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة عند استخدام فيبوناتشي
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "اختيار قمة وقاع غير واضحين في حركة سعرية ضعيفة.",
                    "استخدام فيبوناتشي وحده دون تأكيد من السعر.",
                    "الدخول في الصفقة لمجرد وصول السعر إلى مستوى 61.8%.",
                    "تجاهل الاتجاه العام للسوق.",
                    "عدم استخدام وقف خسارة واضح.",
                    "الخلط بين مستويات التصحيح ومستويات الامتداد.",
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
                  نصائح لاستخدام حاسبة فيبوناتشي بشكل أفضل
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "حدد القمة والقاع من حركة سعرية واضحة.",
                    "استخدم فيبوناتشي مع الدعم والمقاومة.",
                    "راقب سلوك السعر عند المنطقة الذهبية.",
                    "لا تعتمد على مستوى واحد فقط قبل اتخاذ القرار.",
                    "استخدم إدارة مخاطر واضحة قبل الدخول.",
                    "قارن مستويات فيبوناتشي مع أدوات أخرى مثل المتوسطات والقمم والقيعان السابقة.",
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
                    ["حاسبة النقاط", "/tools/pip-calculator"],
                    ["حاسبة الأرباح والخسائر", "/tools/profit-calculator"],
                    ["حاسبة إدارة المخاطر", "/tools/risk-calculator"],
                    ["حاسبة حجم اللوت", "/tools/lot-size-calculator"],
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
            أسئلة شائعة حول حاسبة فيبوناتشي
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هي حاسبة فيبوناتشي؟",
                a: "هي أداة تساعدك على حساب مستويات التصحيح والامتداد بناءً على أعلى سعر وأدنى سعر في الحركة السعرية.",
              },
              {
                q: "ما أهم مستويات فيبوناتشي؟",
                a: "أشهر المستويات هي 23.6% و38.2% و50% و61.8% و78.6% للتصحيح، و127.2% و161.8% و200% للامتداد.",
              },
              {
                q: "هل مستوى 61.8% هو الأقوى دائماً؟",
                a: "ليس دائماً، لكنه من أكثر المستويات التي يراقبها المتداولون، ويجب تأكيده مع حركة السعر ومناطق الدعم والمقاومة.",
              },
              {
                q: "هل تصلح فيبوناتشي للفوركس فقط؟",
                a: "لا، يمكن استخدامها في الفوركس والأسهم والذهب والمؤشرات والعملات الرقمية، طالما توجد حركة سعرية واضحة.",
              },
              {
                q: "ما الفرق بين التصحيح والامتداد؟",
                a: "التصحيح يستخدم لتحديد مناطق عودة السعر داخل الحركة السابقة، أما الامتداد فيستخدم لتقدير أهداف محتملة بعد استمرار الاتجاه.",
              },
              {
                q: "هل نتائج فيبوناتشي مضمونة؟",
                a: "لا، مستويات فيبوناتشي تقديرية ولا تضمن اتجاه السعر، ويجب استخدامها مع إدارة مخاطر واضحة.",
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