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

    let growthStatus = "Moderate growth";
    let growthText =
      "This growth assumption is relatively conservative, but the result is still only a projection and does not guarantee future returns.";

    if (Number(monthlyReturn) >= 5 && Number(monthlyReturn) < 10) {
      growthStatus = "Aggressive growth";
      growthText =
        "This monthly return assumption is high and should be treated as a theoretical scenario, not a realistic guaranteed market return.";
    }

    if (Number(monthlyReturn) >= 10) {
      growthStatus = "High-risk projection";
      growthText =
        "This monthly return assumption is very high. Use it only for scenario modelling, not as a reliable long-term expectation.";
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
    <main dir="ltr" className="min-h-screen bg-[#f3f7fb] text-slate-900">
      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
        {/* HERO */}
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 text-center sm:p-10 lg:p-12 lg:text-left">
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 sm:px-4 sm:py-1.5 sm:text-sm">
                Investment Tools
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                Compound Interest Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate how your capital may grow over time when returns are
                reinvested monthly. Use this compound interest calculator to
                estimate future value based on starting capital, monthly return,
                investment period, and optional monthly contributions.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  Calculate compound growth
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Read the compound interest guide
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">
                  Quick example
                </p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Starting capital
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $1,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Hypothetical monthly return
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-brand-600">
                      5%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Estimated value after 24 months
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      $3,225
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  This example assumes no monthly contributions and monthly
                  reinvestment of returns.
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
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
                  Compound Growth Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Enter your starting capital, expected monthly return,
                  investment period, and monthly contribution to estimate future
                  value, total profit, and month-by-month portfolio growth.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Estimate future value with monthly compounding.
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
                    Starting capital
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Expected monthly return %
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={monthlyReturn}
                    onChange={(e) => setMonthlyReturn(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 5"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Investment period in months
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 24"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Optional monthly contribution
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 100"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                Calculate compound growth
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Results are hypothetical and assume a constant monthly return.
                Real markets do not produce fixed returns every month.
              </p>

              <div className="mt-6 hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-sm lg:block">
                <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-brand-600">
                  Related tools
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/en/tools/drawdown-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Drawdown Calculator
                  </a>
                  <a
                    href="/en/tools/risk-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Risk Calculator
                  </a>
                  <a
                    href="/en/tools/profit-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Profit & Loss Calculator
                  </a>
                  <a
                    href="/en/tools/lot-size-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Lot Size Calculator
                  </a>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3">
                <p className="text-xs font-bold text-brand-600">
                  Calculation result
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                  Compound growth summary
                </h3>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Estimated final balance
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {money(result.finalBalance)}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      Estimated account value after applying monthly compound
                      growth.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Total profit
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-green-600">
                        {money(result.totalProfit)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Total invested
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.totalInvested)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Growth rate
                      </p>
                      <p className="mt-2 text-xl font-extrabold text-brand-600">
                        {percent(result.growthPercent)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Total monthly contributions
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
                    Enter your investment assumptions and click calculate to see
                    the estimated future value and total profit.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  Please enter valid values for all fields.
                </div>
              )}
            </div>
          </div>

          {/* MONTHLY TABLE */}
          {showResult && result && (
            <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-8 lg:p-10">
              <h3 className="text-center text-xl font-extrabold text-slate-950 sm:text-2xl">
                Monthly Growth Table
              </h3>

              <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-600">
                This table shows how capital grows month by month when returns
                and monthly contributions are reinvested.
              </p>

              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4 font-extrabold">Month</th>
                      <th className="p-4 font-extrabold">Starting Balance</th>
                      <th className="p-4 font-extrabold">Contribution</th>
                      <th className="p-4 font-extrabold">Profit</th>
                      <th className="p-4 font-extrabold">Ending Balance</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {result.rows.slice(0, 24).map((row) => (
                      <tr key={row.month} className="transition hover:bg-brand-50">
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
                        <td className="p-4 font-extrabold text-brand-600">
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
                        <span className="text-slate-500">Month</span>
                        <div className="mt-1 font-extrabold text-slate-900">
                          {row.month}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500">Ending Balance</span>
                        <div className="mt-1 font-extrabold text-brand-600">
                          {money(row.endingBalance)}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500">Contribution</span>
                        <div className="mt-1 font-extrabold text-slate-900">
                          {money(row.deposit)}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500">Profit</span>
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
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <p className="text-sm font-bold text-brand-600">
              Updated June 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              Compound Interest and Investment Growth Guide
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Compound interest is one of the most important concepts in
              long-term investing because returns are reinvested instead of
              being separated from the original capital. Over time, previous
              gains can start generating additional gains, which may accelerate
              portfolio growth.
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
                  How compound interest is calculated
                </h3>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                  Future Value = Principal × (1 + Return Rate) ^ Number of
                  Periods
                  <br />
                  With monthly contributions, this calculator adds the
                  contribution before applying the monthly return.
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  This calculator compounds growth monthly. It starts with the
                  opening balance, adds any monthly contribution, applies the
                  monthly return, and then uses the ending balance as the next
                  month’s starting value.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Definition
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is compound interest?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Compound interest means that previous gains are reinvested
                    with the original capital, allowing both the initial
                    investment and accumulated returns to generate future
                    returns.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Investing
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why time matters
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    The longer money stays invested, the more time compounding
                    has to work. Growth may feel slow at first, but it can become
                    more powerful as profits accumulate and the base capital
                    becomes larger.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    Important
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Are returns fixed?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                    No. Financial markets do not produce fixed monthly returns.
                    Use this calculator as a planning and scenario-modelling
                    tool, not as a guarantee of future investment performance.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Compound growth examples
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  The table below shows how $1,000 could grow when hypothetical
                  monthly returns are reinvested without additional
                  contributions.
                </p>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">
                          Starting Capital
                        </th>
                        <th className="p-4 font-extrabold">Monthly Return</th>
                        <th className="p-4 font-extrabold">After 12 Months</th>
                        <th className="p-4 font-extrabold">After 24 Months</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {exampleRows.map((row) => (
                        <tr
                          key={row.monthly}
                          className="transition hover:bg-brand-50"
                        >
                          <td className="p-4 font-bold text-slate-700">
                            {row.capital}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.monthly}
                          </td>
                          <td className="p-4 font-extrabold text-brand-600">
                            {row.year1}
                          </td>
                          <td className="p-4 font-extrabold text-brand-600">
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
                          <span className="text-slate-500">
                            Starting capital
                          </span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.capital}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Return</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.monthly}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">12 months</span>
                          <div className="mt-1 font-extrabold text-brand-600">
                            {row.year1}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">24 months</span>
                          <div className="mt-1 font-extrabold text-brand-600">
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
                    Simple interest vs compound interest
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Simple interest calculates returns only on the original
                    capital. Compound interest calculates returns on both the
                    original capital and the previous accumulated returns, which
                    can create faster growth over time.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    For long-term investing, the difference can become
                    significant, especially when monthly contributions are added
                    consistently and returns are reinvested instead of withdrawn.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Can traders use this calculator?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    Yes. It can be used to model trading account growth, but
                    trading returns are not stable or guaranteed. The monthly
                    return field is a mathematical assumption, not a reliable
                    forecast.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common compound growth mistakes
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Assuming the same monthly return will repeat every month.",
                    "Using unrealistic return expectations when planning.",
                    "Ignoring fees, commissions, taxes, and withdrawals.",
                    "Withdrawing profits instead of reinvesting them.",
                    "Treating calculator projections as guaranteed outcomes.",
                    "Ignoring losing periods or market drawdowns.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:text-red-700 hover:shadow-lg sm:rounded-3xl sm:p-6"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-left">
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
                  Tips for using compound interest wisely
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Start early to give compounding more time to work.",
                    "Reinvest returns instead of withdrawing them frequently.",
                    "Add regular monthly contributions when possible.",
                    "Use realistic return assumptions for planning.",
                    "Separate mathematical projections from guaranteed results.",
                    "Review growth together with risk, volatility, and drawdown.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600 hover:shadow-lg sm:rounded-3xl sm:p-6"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-left">
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
                  Related Trading and Investment Calculators
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Drawdown Calculator", "/en/tools/drawdown-calculator"],
                    ["Risk Calculator", "/en/tools/risk-calculator"],
                    ["Profit & Loss Calculator", "/en/tools/profit-calculator"],
                    ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
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
                  Show full guide
                </button>
              </div>
            )}

            {showGuideMore && (
              <button
                type="button"
                onClick={() => setShowGuideMore(false)}
                className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 lg:hidden"
              >
                Show less
              </button>
            )}
          </div>
        </article>

        {/* FAQ */}
        <section className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:rounded-[2rem] sm:p-8 lg:p-10">
          <h2 className="text-center text-2xl font-extrabold leading-snug text-slate-950 sm:text-left lg:text-3xl">
            Compound Interest Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a compound interest calculator?",
                a: "A compound interest calculator estimates how capital may grow when returns are reinvested over time, with or without monthly contributions.",
              },
              {
                q: "How is compound interest calculated?",
                a: "Compound interest is calculated by applying returns to the current balance, then adding those returns back into the balance for the next period.",
              },
              {
                q: "Can this calculator be used for trading accounts?",
                a: "Yes. It can model trading account growth, but trading returns are not fixed or guaranteed.",
              },
              {
                q: "What is the difference between simple and compound interest?",
                a: "Simple interest calculates returns only on the original capital, while compound interest calculates returns on both the capital and previous gains.",
              },
              {
                q: "Do monthly contributions affect the final result?",
                a: "Yes. Regular monthly contributions can significantly increase the final balance over time when combined with compounding.",
              },
              {
                q: "Are the results guaranteed?",
                a: "No. The results are estimates based on fixed-return assumptions. Real investments can rise, fall, or produce uneven returns.",
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