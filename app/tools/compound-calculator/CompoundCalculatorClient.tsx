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

const exampleRows = [
  { capital: "$1,000", monthly: "3%", year1: "$1,425", year2: "$2,032" },
  { capital: "$1,000", monthly: "5%", year1: "$1,796", year2: "$3,225" },
  { capital: "$1,000", monthly: "10%", year1: "$3,138", year2: "$9,850" },
];

export default function CompoundCalculatorClient() {
  const [initialBalance, setInitialBalance] = useState("1000");
  const [monthlyReturn, setMonthlyReturn] = useState("5");
  const [months, setMonths] = useState("24");
  const [monthlyDeposit, setMonthlyDeposit] = useState("0");
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const result = useMemo(() => {
    const principal = Number(initialBalance);
    const monthlyRate = Number(monthlyReturn) / 100;
    const totalMonths = Number(months);
    const deposit = Number(monthlyDeposit);

    if (
      !Number.isFinite(principal) ||
      !Number.isFinite(monthlyRate) ||
      !Number.isFinite(totalMonths) ||
      !Number.isFinite(deposit)
    ) {
      return null;
    }

    if (principal <= 0 || monthlyRate < 0 || totalMonths <= 0 || deposit < 0) {
      return null;
    }

    let balance = principal;

    const rows: {
      month: number;
      startingBalance: number;
      deposit: number;
      profit: number;
      endingBalance: number;
    }[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      const startingBalance = balance;
      const profit = (startingBalance + deposit) * monthlyRate;
      const endingBalance = startingBalance + deposit + profit;

      rows.push({
        month,
        startingBalance,
        deposit,
        profit,
        endingBalance,
      });

      balance = endingBalance;
    }

    const finalBalance = balance;
    const totalDeposits = deposit * totalMonths;
    const totalInvested = principal + totalDeposits;
    const totalProfit = finalBalance - totalInvested;
    const growthPercent = ((finalBalance - principal) / principal) * 100;

    let growthStatus = "نمو محافظ";
    let growthText =
      "معدل النمو المدخل يبدو محافظاً نسبياً، لكن النتائج تبقى افتراضية ولا تعني أن العائد مضمون.";

    if (Number(monthlyReturn) >= 5 && Number(monthlyReturn) < 10) {
      growthStatus = "نمو مرتفع";
      growthText =
        "معدل العائد الشهري مرتفع ويجب التعامل معه كافتراض نظري، لأن الأسواق لا تحقق عوائد ثابتة كل شهر.";
    }

    if (Number(monthlyReturn) >= 10) {
      growthStatus = "افتراض عالي المخاطرة";
      growthText =
        "معدل العائد الشهري مرتفع جداً. استخدمه فقط لمحاكاة سيناريوهات نظرية وليس كتوقع مضمون.";
    }

    return {
      rows,
      finalBalance,
      totalDeposits,
      totalInvested,
      totalProfit,
      growthPercent,
      growthStatus,
      growthText,
    };
  }, [initialBalance, monthlyReturn, months, monthlyDeposit]);

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
                أدوات الاستثمار والتداول
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                حاسبة الفائدة المركبة ونمو رأس المال
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                احسب نمو رأس المال مع مرور الوقت عند إعادة استثمار الأرباح
                بشكل شهري. تساعدك حاسبة الفائدة المركبة على تقدير الرصيد
                النهائي بناءً على رأس المال الأولي، العائد الشهري، مدة
                الاستثمار، والإيداعات الشهرية.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  احسب النمو المركب الآن
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  اقرأ شرح الفائدة المركبة
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-r lg:border-t-0 lg:p-10">
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-blue-700">مثال سريع</p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      رأس المال الأولي
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $1,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      عائد شهري افتراضي
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-700">
                      5%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      بعد 24 شهر تقريباً
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      $3,225
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  المثال يفترض عدم وجود إيداعات شهرية وإعادة استثمار الأرباح
                  شهرياً.
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
                  حاسبة الفائدة المركبة
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  أدخل رأس المال الأولي، العائد الشهري المتوقع، مدة الاستثمار،
                  والإيداع الشهري لمعرفة الرصيد النهائي وإجمالي الأرباح وجدول
                  النمو الشهري.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  احسب نمو رأس المال مع إعادة استثمار الأرباح.
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
                    رأس المال الأولي
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 1000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    العائد الشهري المتوقع %
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={monthlyReturn}
                    onChange={(e) => setMonthlyReturn(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 5"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    مدة الاستثمار بالأشهر
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 24"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    إيداع شهري اختياري
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="مثال: 100"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                احسب النمو المركب الآن
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                النتائج افتراضية وتعتمد على ثبات العائد الشهري، وهو أمر لا يحدث
                عادة في الأسواق المالية بشكل مضمون.
              </p>

              <div className="mt-6 hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-sm lg:block">
                <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-blue-700">
                  أدوات مرتبطة
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <a href="/tools/drawdown-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                    حاسبة السحب
                  </a>
                  <a href="/tools/risk-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                    حاسبة إدارة المخاطر
                  </a>
                  <a href="/tools/profit-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                    حاسبة الأرباح والخسائر
                  </a>
                  <a href="/tools/lot-size-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                    حاسبة حجم اللوت
                  </a>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3">
                <p className="text-xs font-bold text-blue-700">نتيجة الحساب</p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                  ملخص النمو المركب
                </h3>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      الرصيد النهائي المتوقع
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {money(result.finalBalance)}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      القيمة التقديرية للحساب بعد تطبيق النمو المركب.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">إجمالي الأرباح</p>
                      <p className="mt-2 text-xl font-extrabold text-green-600">
                        {money(result.totalProfit)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        إجمالي رأس المال المستثمر
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.totalInvested)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">نسبة النمو</p>
                      <p className="mt-2 text-xl font-extrabold text-blue-700">
                        {percent(result.growthPercent)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        إجمالي الإيداعات الشهرية
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.totalDeposits)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      {result.growthStatus}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.growthText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    أدخل البيانات المطلوبة ثم اضغط على زر الحساب لمعرفة الرصيد
                    النهائي المتوقع وإجمالي الأرباح.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  تأكد من إدخال قيم صحيحة لجميع الحقول.
                </div>
              )}
            </div>
          </div>
                    {/* MONTHLY TABLE */}
          {showResult && result && (
            <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-8 lg:p-10">
              <h3 className="text-center text-xl font-extrabold text-slate-950 sm:text-2xl">
                جدول النمو الشهري
              </h3>

              <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-600">
                يوضح الجدول كيف ينمو رأس المال شهراً بعد شهر مع إعادة استثمار
                الأرباح والإيداعات الشهرية.
              </p>

              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block">
                <table className="w-full text-right text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4 font-extrabold">الشهر</th>
                      <th className="p-4 font-extrabold">الرصيد بالبداية</th>
                      <th className="p-4 font-extrabold">الإيداع</th>
                      <th className="p-4 font-extrabold">الربح</th>
                      <th className="p-4 font-extrabold">الرصيد بالنهاية</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {result.rows.slice(0, 24).map((row) => (
                      <tr key={row.month} className="transition hover:bg-blue-50">
                        <td className="p-4 font-bold text-slate-700">
                          {row.month}
                        </td>
                        <td className="p-4 font-bold text-slate-700">
                          {money(row.startingBalance)}
                        </td>
                        <td className="p-4 font-bold text-slate-700">
                          {money(row.deposit)}
                        </td>
                        <td className="p-4 font-extrabold text-green-600">
                          {money(row.profit)}
                        </td>
                        <td className="p-4 font-extrabold text-blue-700">
                          {money(row.endingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4 lg:hidden">
                {result.rows.slice(0, 6).map((row) => (
                  <div
                    key={row.month}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">الشهر</span>
                        <div className="mt-1 font-extrabold text-slate-900">
                          {row.month}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500">الرصيد النهائي</span>
                        <div className="mt-1 font-extrabold text-blue-700">
                          {money(row.endingBalance)}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500">الإيداع</span>
                        <div className="mt-1 font-extrabold text-slate-900">
                          {money(row.deposit)}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500">الربح</span>
                        <div className="mt-1 font-extrabold text-green-600">
                          {money(row.profit)}
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
            <p className="text-sm font-bold text-blue-700">
              آخر تحديث: يونيو 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              دليل الفائدة المركبة ونمو رأس المال
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              الفائدة المركبة هي واحدة من أهم مفاهيم الاستثمار وبناء الثروة، لأن
              الأرباح لا تبقى منفصلة عن رأس المال، بل تتم إضافتها إليه لتبدأ
              بدورها في توليد أرباح جديدة. لذلك كلما زادت مدة الاستثمار وإعادة
              استثمار الأرباح، زادت قوة النمو التراكمي.
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
                  كيف يتم حساب الفائدة المركبة؟
                </h3>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                  الرصيد النهائي = رأس المال × (1 + معدل العائد) ^ عدد الفترات
                  <br />
                  ومع وجود إيداعات شهرية، يتم إضافة الإيداع قبل احتساب العائد
                  الشهري في هذه الحاسبة.
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  في هذه الحاسبة يتم احتساب النمو شهرياً. يتم أخذ الرصيد في
                  بداية الشهر، إضافة الإيداع الشهري إن وجد، ثم احتساب العائد
                  الشهري على المبلغ الجديد. بعد ذلك يصبح الرصيد النهائي للشهر هو
                  رصيد بداية الشهر التالي.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    المفهوم
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    ما هي الفائدة المركبة؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    الفائدة المركبة تعني أن الأرباح السابقة يتم إعادة استثمارها
                    مع رأس المال، بحيث تبدأ الأرباح نفسها في توليد أرباح جديدة
                    مع مرور الوقت.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    الاستثمار
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    لماذا الوقت مهم؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    كلما زادت مدة الاستثمار، زاد تأثير الفائدة المركبة. السنوات
                    الأولى قد تبدو بطيئة، لكن النمو يصبح أسرع مع تراكم الأرباح
                    وزيادة حجم رأس المال.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                    التنبيه
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    هل العائد ثابت؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                    لا. الأسواق المالية لا تقدم عائداً ثابتاً كل شهر. لذلك يجب
                    استخدام الحاسبة كأداة تخطيط ومحاكاة، وليس كضمان لنتيجة
                    مستقبلية.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أمثلة على نمو رأس المال بالفائدة المركبة
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  يوضح الجدول التالي كيف يمكن لرأس مال بقيمة 1,000 دولار أن
                  ينمو عند إعادة استثمار الأرباح شهرياً دون إيداعات إضافية.
                </p>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">رأس المال</th>
                        <th className="p-4 font-extrabold">العائد الشهري</th>
                        <th className="p-4 font-extrabold">بعد 12 شهر</th>
                        <th className="p-4 font-extrabold">بعد 24 شهر</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {exampleRows.map((row) => (
                        <tr key={row.monthly} className="transition hover:bg-blue-50">
                          <td className="p-4 font-bold text-slate-700">
                            {row.capital}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.monthly}
                          </td>
                          <td className="p-4 font-extrabold text-blue-700">
                            {row.year1}
                          </td>
                          <td className="p-4 font-extrabold text-blue-700">
                            {row.year2}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 space-y-4 md:hidden">
                  {exampleRows.map((row) => (
                    <div
                      key={row.monthly}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">رأس المال</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.capital}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">العائد</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.monthly}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">12 شهر</span>
                          <div className="mt-1 font-extrabold text-blue-700">
                            {row.year1}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">24 شهر</span>
                          <div className="mt-1 font-extrabold text-blue-700">
                            {row.year2}
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
                    الفرق بين الفائدة البسيطة والفائدة المركبة
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    الفائدة البسيطة تحتسب العائد على رأس المال الأصلي فقط. أما
                    الفائدة المركبة فتحتسب العائد على رأس المال الأصلي بالإضافة
                    إلى الأرباح السابقة، وهذا ما يجعل النمو أسرع مع مرور الوقت.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    في الاستثمار طويل الأجل، الفرق بين الطريقتين قد يصبح كبيراً
                    جداً، خصوصاً عند وجود إيداعات شهرية منتظمة وإعادة استثمار
                    الأرباح بدلاً من سحبها.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    هل تصلح الحاسبة للتداول؟
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    يمكن استخدامها لمحاكاة نمو حساب تداول، لكن يجب الانتباه إلى
                    أن نتائج التداول غير ثابتة. العائد الشهري في الحاسبة هو
                    افتراض رياضي وليس توقعاً مضموناً.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  أخطاء شائعة عند حساب النمو المركب
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "افتراض أن العائد الشهري ثابت ولا يتغير.",
                    "المبالغة في توقع العوائد المستقبلية.",
                    "تجاهل الرسوم والعمولات والضرائب.",
                    "سحب الأرباح باستمرار بدلاً من إعادة استثمارها.",
                    "استخدام الحاسبة كضمان للربح وليس كأداة تخطيط.",
                    "تجاهل فترات الخسارة أو التراجع في الأسواق.",
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
                  نصائح للاستفادة من الفائدة المركبة
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "ابدأ مبكراً حتى تستفيد من عامل الوقت.",
                    "أعد استثمار الأرباح بدلاً من سحبها باستمرار.",
                    "أضف إيداعات شهرية منتظمة إذا كان ذلك ممكناً.",
                    "استخدم عوائد واقعية عند التخطيط.",
                    "لا تخلط بين المحاكاة الرياضية والنتائج المضمونة.",
                    "راجع نمو الحساب مع إدارة المخاطر وليس النمو فقط.",
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
                  أدوات تداول واستثمار مرتبطة
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["حاسبة السحب", "/tools/drawdown-calculator"],
                    ["حاسبة إدارة المخاطر", "/tools/risk-calculator"],
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
            أسئلة شائعة حول حاسبة الفائدة المركبة
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "ما هي حاسبة الفائدة المركبة؟",
                a: "هي أداة تساعدك على تقدير نمو رأس المال عند إعادة استثمار الأرباح بشكل دوري مع إمكانية إضافة إيداعات شهرية.",
              },
              {
                q: "كيف يتم حساب الفائدة المركبة؟",
                a: "يتم احتساب العائد على رأس المال الحالي، ثم تضاف الأرباح إلى الرصيد لتدخل في حساب عائد الفترة التالية.",
              },
              {
                q: "هل الحاسبة مناسبة للتداول؟",
                a: "نعم، يمكن استخدامها لمحاكاة نمو حساب تداول، لكن العوائد في الأسواق ليست ثابتة أو مضمونة.",
              },
              {
                q: "ما الفرق بين الفائدة البسيطة والمركبة؟",
                a: "الفائدة البسيطة تحسب العائد على رأس المال الأصلي فقط، أما الفائدة المركبة فتحسب العائد على رأس المال والأرباح السابقة معاً.",
              },
              {
                q: "هل الإيداعات الشهرية تؤثر على النتيجة؟",
                a: "نعم، الإيداعات الشهرية المنتظمة يمكن أن تزيد الرصيد النهائي بشكل كبير مع مرور الوقت.",
              },
              {
                q: "هل النتائج مضمونة؟",
                a: "لا، النتائج تقديرية فقط وتعتمد على افتراض ثبات العائد، بينما الأسواق المالية قد ترتفع أو تنخفض.",
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