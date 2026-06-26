"use client";

import { useMemo, useState } from "react";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

function numberFormat(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

const recoveryRows = [
  { drawdown: 5, recovery: 5.26 },
  { drawdown: 10, recovery: 11.11 },
  { drawdown: 20, recovery: 25 },
  { drawdown: 30, recovery: 42.86 },
  { drawdown: 40, recovery: 66.67 },
  { drawdown: 50, recovery: 100 },
  { drawdown: 60, recovery: 150 },
  { drawdown: 70, recovery: 233.33 },
  { drawdown: 80, recovery: 400 },
  { drawdown: 90, recovery: 900 },
];

export default function DrawdownCalculatorClient() {
  const [balance, setBalance] = useState("10000");
  const [drawdown, setDrawdown] = useState("20");
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const result = useMemo(() => {
    const accountBalance = Number(balance);
    const drawdownPercent = Number(drawdown);

    if (
      !Number.isFinite(accountBalance) ||
      !Number.isFinite(drawdownPercent)
    ) {
      return null;
    }

    if (
      accountBalance <= 0 ||
      drawdownPercent <= 0 ||
      drawdownPercent >= 100
    ) {
      return null;
    }

    const lostAmount = accountBalance * (drawdownPercent / 100);
    const remainingBalance = accountBalance - lostAmount;

    const recoveryPercent =
      (lostAmount / remainingBalance) * 100;

    const breakEvenBalance = accountBalance;
    const remainingPercent = 100 - drawdownPercent;

    let drawdownStatus = "سحب منخفض";
    let drawdownText =
      "نسبة السحب الحالية منخفضة نسبياً، ويمكن تعويضها بعائد معقول إذا بقيت إدارة المخاطر منضبطة.";

    if (drawdownPercent >= 20 && drawdownPercent < 40) {
      drawdownStatus = "سحب متوسط";
      drawdownText =
        "نسبة السحب متوسطة وتحتاج إلى عائد أعلى من نسبة الخسارة نفسها للعودة إلى نقطة التعادل.";
    }

    if (drawdownPercent >= 40 && drawdownPercent < 60) {
      drawdownStatus = "سحب مرتفع";
      drawdownText =
        "نسبة السحب مرتفعة، والتعافي منها يحتاج إلى ربح كبير مقارنة بالرصيد المتبقي.";
    }

    if (drawdownPercent >= 60) {
      drawdownStatus = "سحب خطير جداً";
      drawdownText =
        "السحب كبير جداً، وقد يحتاج الحساب إلى عائد ضخم للتعافي. في هذه المرحلة تصبح حماية رأس المال أهم من محاولة التعويض السريع.";
    }

    return {
      accountBalance,
      lostAmount,
      remainingBalance,
      drawdownPercent,
      recoveryPercent,
      breakEvenBalance,
      remainingPercent,
      drawdownStatus,
      drawdownText,
    };
  }, [balance, drawdown]);

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
                أدوات إدارة المخاطر
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                حاسبة السحب في التداول Drawdown Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب مقدار السحب من حساب التداول، الرصيد المتبقي بعد الخسارة،
                ونسبة الربح المطلوبة للعودة إلى نقطة التعادل. تساعدك هذه
                الحاسبة على فهم تأثير الخسائر المتراكمة على رأس المال وإدارة
                المخاطر بشكل أفضل.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  احسب السحب الآن
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح السحب والتعافي
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-r lg:border-t-0 lg:p-10">
              <div className="rounded-[1.5rem] border border-brand-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      الرصيد الأصلي
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $10,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      نسبة السحب
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-red-600">
                      50%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      الربح المطلوب للتعافي
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      100%
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  عند خسارة 50% من الحساب، تحتاج إلى تحقيق ربح 100% على الرصيد
                  المتبقي للعودة إلى نقطة البداية.
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
                  حاسبة السحب والتعافي
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  أدخل رصيد الحساب ونسبة السحب لمعرفة المبلغ المفقود، الرصيد
                  المتبقي، ونسبة الربح المطلوبة للعودة إلى نقطة التعادل.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب الخسارة والربح المطلوب للتعافي.
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
                    رصيد الحساب قبل الخسارة
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 10000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    نسبة السحب أو الخسارة %
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="99.99"
                    step="any"
                    value={drawdown}
                    onChange={(e) => setDrawdown(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 20"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                احسب السحب والتعافي الآن
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                إذا كانت الخسارة 20% فهذا لا يعني أنك تحتاج إلى 20% فقط
                للتعافي؛ لأن الربح يحسب على الرصيد المتبقي بعد الخسارة.
              </p>

              <div className="mt-6 hidden rounded-2xl border border-brand-100 bg-white p-4 shadow-sm lg:block">
                <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-brand-600">
                  أدوات مرتبطة
                </h3>

                <div className="grid grid-cols-2 gap-2">
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

                  <a
                    href="/tools/profit-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    حاسبة الأرباح والخسائر
                  </a>

                  <a
                    href="/tools/margin-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    حاسبة الهامش
                  </a>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-600">
                    نتيجة الحساب
                  </p>

                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    ملخص السحب والتعافي
                  </h3>
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      الربح المطلوب للعودة إلى نقطة التعادل
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {percent(result.recoveryPercent)}
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      هذه النسبة مطلوبة على الرصيد المتبقي بعد الخسارة.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        المبلغ المفقود
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-red-600">
                        {money(result.lostAmount)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        الرصيد المتبقي
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.remainingBalance)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        نسبة الرصيد المتبقي
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {percent(result.remainingPercent)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        الرصيد المطلوب للتعادل
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.breakEvenBalance)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      {result.drawdownStatus}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.drawdownText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل رصيد الحساب ونسبة السحب ثم اضغط على زر الحساب لعرض
                    الرصيد المتبقي ونسبة التعافي المطلوبة.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  تأكد من إدخال رصيد صحيح ونسبة سحب أكبر من 0% وأقل من 100%.
                </div>
              )}
            </div>
          </div>

          {/* QUICK TABLE */}
          <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-8 lg:p-10">
            <h3 className="text-center text-xl font-extrabold text-slate-950 sm:text-2xl">
              جدول سريع: الخسارة ونسبة التعافي المطلوبة
            </h3>

            <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-600">
              كلما زادت نسبة السحب، زادت نسبة الربح المطلوبة للعودة إلى نقطة
              البداية بشكل غير خطي.
            </p>

            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-4 font-extrabold">نسبة الخسارة</th>
                    <th className="p-4 font-extrabold">الرصيد المتبقي</th>
                    <th className="p-4 font-extrabold">
                      الربح المطلوب للتعافي
                    </th>
                    <th className="p-4 font-extrabold">التقييم</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {recoveryRows.map((row) => (
                    <tr key={row.drawdown} className="transition hover:bg-brand-50">
                      <td className="p-4 font-bold text-red-600">
                        {row.drawdown}%
                      </td>
                      <td className="p-4 font-bold text-slate-700">
                        {100 - row.drawdown}%
                      </td>
                      <td className="p-4 font-extrabold text-brand-600">
                        {percent(row.recovery)}
                      </td>
                      <td className="p-4 font-bold text-slate-700">
                        {row.drawdown < 20
                          ? "منخفض"
                          : row.drawdown < 40
                            ? "متوسط"
                            : row.drawdown < 60
                              ? "مرتفع"
                              : "خطير"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4 md:hidden">
              {recoveryRows.map((row) => (
                <div
                  key={row.drawdown}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-slate-500">الخسارة</span>
                      <div className="mt-1 font-extrabold text-red-600">
                        {row.drawdown}%
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">المتبقي</span>
                      <div className="mt-1 font-extrabold text-slate-900">
                        {100 - row.drawdown}%
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">التعافي</span>
                      <div className="mt-1 font-extrabold text-brand-600">
                        {percent(row.recovery)}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">التقييم</span>
                      <div className="mt-1 font-extrabold text-slate-900">
                        {row.drawdown < 20
                          ? "منخفض"
                          : row.drawdown < 40
                            ? "متوسط"
                            : row.drawdown < 60
                              ? "مرتفع"
                              : "خطير"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              دليل السحب والتعافي في التداول
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              السحب أو Drawdown هو انخفاض رصيد الحساب من أعلى قيمة وصل إليها.
              فهم السحب مهم جداً لأن تعويض الخسارة يحتاج إلى نسبة ربح أكبر من
              نسبة الخسارة نفسها، خصوصاً عندما تصبح الخسارة كبيرة.
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
                  كيف يتم حساب التعافي من السحب؟
                </h3>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                  الرصيد المتبقي = الرصيد الأصلي × (1 - نسبة السحب)
                  <br />
                  الربح المطلوب للتعافي = الخسارة ÷ الرصيد المتبقي × 100
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  إذا خسر الحساب 20%، فالربح المطلوب للعودة إلى نقطة البداية ليس
                  20%، بل 25%. وإذا خسر الحساب 50%، فإنه يحتاج إلى ربح 100% على
                  الرصيد المتبقي حتى يعود إلى نفس الرصيد الأصلي.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    المفهوم
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هو السحب في التداول؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    السحب هو مقدار الانخفاض في رأس المال بعد سلسلة خسائر أو
                    صفقة خاسرة كبيرة. يستخدم المتداولون هذا المقياس لمعرفة مدى
                    تراجع الحساب عن أعلى رصيد وصل إليه.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    التعافي
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    لماذا التعافي أصعب من الخسارة؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    عندما ينخفض الحساب، يصبح الربح محسوباً على رصيد أصغر. لذلك
                    كلما زادت الخسارة، احتجت إلى نسبة ربح أعلى بكثير للعودة إلى
                    الرصيد الأصلي.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    الإدارة
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    كيف تقلل السحب؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                    تقليل السحب يبدأ من تقليل المخاطرة في الصفقة الواحدة، استخدام
                    وقف الخسارة، تجنب مضاعفة العقود بعد الخسارة، ومراقبة إجمالي
                    المخاطرة المفتوحة.
                  </p>
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    الفرق بين الخسارة العادية والسحب الأقصى
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    الخسارة العادية قد تكون نتيجة صفقة واحدة، أما السحب الأقصى
                    فهو أكبر انخفاض تعرض له الحساب من قمة إلى قاع خلال فترة
                    معينة. لذلك يستخدم السحب الأقصى لتقييم مدى خطورة استراتيجية
                    التداول.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    استراتيجية تحقق أرباحاً جيدة ولكنها تتعرض لسحب كبير جداً قد
                    تكون نفسياً ومالياً صعبة على المتداول، حتى لو كانت مربحة على
                    المدى الطويل.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    لماذا السحب مهم لإدارة المخاطر؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    السحب يوضح مدى قدرة الحساب على تحمل الخسائر. إذا كان النظام
                    يتعرض لسحب كبير، فقد يحتاج المتداول إلى تقليل حجم اللوت أو
                    تخفيض نسبة المخاطرة أو تحسين قواعد الدخول والخروج.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة بعد حدوث السحب
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "زيادة حجم اللوت لمحاولة تعويض الخسارة بسرعة.",
                    "إزالة وقف الخسارة بعد سلسلة صفقات خاسرة.",
                    "التركيز على التعويض بدلاً من حماية الرصيد المتبقي.",
                    "اعتبار خسارة 50% بسيطة لأنها تحتاج فقط 50% للتعافي.",
                    "فتح صفقات كثيرة في نفس الاتجاه بعد الخسارة.",
                    "تجاهل تقييم الاستراتيجية بعد ارتفاع السحب.",
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
                  نصائح لتقليل السحب في حساب التداول
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "خاطر بنسبة صغيرة من الحساب في كل صفقة.",
                    "استخدم حاسبة حجم اللوت قبل فتح الصفقة.",
                    "لا تضاعف العقود بعد الخسائر المتتالية.",
                    "راجع أقصى سحب في أي استراتيجية قبل استخدامها.",
                    "حدد حد خسارة يومي أو أسبوعي للتوقف عن التداول.",
                    "ركز على حماية رأس المال قبل التفكير في التعويض.",
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
                    ["حاسبة إدارة المخاطر", "/tools/risk-calculator"],
                    ["حاسبة حجم اللوت", "/tools/lot-size-calculator"],
                    ["حاسبة الأرباح والخسائر", "/tools/profit-calculator"],
                    ["حاسبة الرافعة المالية", "/tools/leverage-calculator"],
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
            أسئلة شائعة حول حاسبة السحب
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هي حاسبة السحب؟",
                a: "هي أداة تساعدك على حساب الرصيد المتبقي بعد الخسارة ونسبة الربح المطلوبة للعودة إلى نقطة التعادل.",
              },
              {
                q: "كيف يتم حساب نسبة التعافي؟",
                a: "يتم حسابها من خلال قسمة المبلغ المفقود على الرصيد المتبقي بعد الخسارة ثم ضرب الناتج في 100.",
              },
              {
                q: "لماذا خسارة 50% تحتاج إلى ربح 100% للتعافي؟",
                a: "لأن الحساب يصبح نصف قيمته، ولكي يعود إلى قيمته الأصلية يجب أن يتضاعف الرصيد المتبقي.",
              },
              {
                q: "ما هو السحب الأقصى؟",
                a: "السحب الأقصى هو أكبر انخفاض في الحساب من أعلى رصيد إلى أدنى رصيد خلال فترة معينة.",
              },
              {
                q: "كيف أقلل السحب في التداول؟",
                a: "من خلال تقليل نسبة المخاطرة، استخدام وقف الخسارة، تجنب مضاعفة العقود، ومراقبة إجمالي المخاطر المفتوحة.",
              },
              {
                q: "هل السحب يعني أن الاستراتيجية فاشلة؟",
                a: "ليس دائماً، لكن السحب الكبير قد يدل على أن المخاطرة مرتفعة أو أن الاستراتيجية تحتاج إلى مراجعة.",
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