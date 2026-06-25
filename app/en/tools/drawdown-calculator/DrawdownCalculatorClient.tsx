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

    const lossAmount = accountBalance * (drawdownPercent / 100);
    const remainingBalance = accountBalance - lossAmount;
    const recoveryPercent = (lossAmount / remainingBalance) * 100;
    const remainingPercent = 100 - drawdownPercent;

    let riskLevel = "Low drawdown";
    let riskText =
      "The drawdown is relatively low, and recovery is usually manageable if risk remains controlled.";

    if (drawdownPercent >= 20 && drawdownPercent < 40) {
      riskLevel = "Moderate drawdown";
      riskText =
        "Recovery becomes harder because gains must be made on a smaller remaining balance.";
    }

    if (drawdownPercent >= 40 && drawdownPercent < 60) {
      riskLevel = "High drawdown";
      riskText =
        "This drawdown is significant. Recovering from it requires a much larger return than the original loss percentage.";
    }

    if (drawdownPercent >= 60) {
      riskLevel = "Critical drawdown";
      riskText =
        "This is a severe drawdown. Capital preservation should become the priority before trying to recover quickly.";
    }

    return {
      accountBalance,
      lossAmount,
      remainingBalance,
      recoveryPercent,
      remainingPercent,
      riskLevel,
      riskText,
    };
  }, [balance, drawdown]);

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
                Risk Management Tools
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                Forex Drawdown Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate trading drawdown, remaining balance, and the exact
                recovery percentage required to return to break-even. Use this
                drawdown calculator to understand how losses affect trading
                capital and long-term risk management.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  Calculate drawdown
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Read the drawdown guide
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
                      Starting balance
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $10,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Drawdown
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-red-600">
                      50%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Recovery required
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      100%
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  A 50% loss requires a 100% gain on the remaining balance to
                  return to the original account value.
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
                  Drawdown Recovery Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Enter your starting account balance and drawdown percentage to
                  calculate the lost amount, remaining balance, and recovery
                  return required to break even.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate drawdown and recovery percentage.
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
                    Starting account balance
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 10000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Drawdown percentage %
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="99.99"
                    step="any"
                    value={drawdown}
                    onChange={(e) => setDrawdown(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 20"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                Calculate drawdown recovery
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                A 20% loss does not require only 20% to recover. The recovery
                percentage is calculated on the smaller remaining balance.
              </p>

              <div className="mt-6 hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-sm lg:block">
                <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-brand-600">
                  Related tools
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/en/tools/risk-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Risk Calculator
                  </a>

                  <a
                    href="/en/tools/lot-size-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Lot Size Calculator
                  </a>

                  <a
                    href="/en/tools/profit-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Profit Calculator
                  </a>

                  <a
                    href="/en/tools/margin-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Margin Calculator
                  </a>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-600">
                    Calculation result
                  </p>

                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    Drawdown and recovery summary
                  </h3>
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Recovery required to break even
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {percent(result.recoveryPercent)}
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      Required gain on the remaining balance after the loss.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Loss amount
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-red-600">
                        {money(result.lossAmount)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Remaining balance
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.remainingBalance)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Remaining account %
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {percent(result.remainingPercent)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Break-even balance
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.accountBalance)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      {result.riskLevel}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.riskText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    Enter the starting balance and drawdown percentage, then
                    click calculate to see the recovery required.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  Please enter a valid balance and a drawdown percentage greater
                  than 0% and less than 100%.
                </div>
              )}
            </div>
          </div>

          {/* QUICK TABLE */}
          <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-8 lg:p-10">
            <h3 className="text-center text-xl font-extrabold text-slate-950 sm:text-2xl">
              Drawdown Recovery Table
            </h3>

            <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-600">
              The deeper the drawdown, the higher the percentage return required
              to recover. Recovery is not linear.
            </p>

            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-4 font-extrabold">Drawdown</th>
                    <th className="p-4 font-extrabold">Remaining Balance</th>
                    <th className="p-4 font-extrabold">Recovery Required</th>
                    <th className="p-4 font-extrabold">Risk Level</th>
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
                          ? "Low"
                          : row.drawdown < 40
                            ? "Moderate"
                            : row.drawdown < 60
                              ? "High"
                              : "Critical"}
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
                      <span className="text-slate-500">Drawdown</span>
                      <div className="mt-1 font-extrabold text-red-600">
                        {row.drawdown}%
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">Remaining</span>
                      <div className="mt-1 font-extrabold text-slate-900">
                        {100 - row.drawdown}%
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">Recovery</span>
                      <div className="mt-1 font-extrabold text-brand-600">
                        {percent(row.recovery)}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">Risk</span>
                      <div className="mt-1 font-extrabold text-slate-900">
                        {row.drawdown < 20
                          ? "Low"
                          : row.drawdown < 40
                            ? "Moderate"
                            : row.drawdown < 60
                              ? "High"
                              : "Critical"}
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
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <p className="text-sm font-bold text-brand-600">
              Updated June 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              Trading Drawdown and Recovery Guide
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Drawdown measures how much a trading account has declined from a
              previous peak. It is one of the most important risk-management
              metrics because recovering from losses requires a higher
              percentage gain than the original loss percentage.
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
                  How drawdown recovery is calculated
                </h3>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                  Remaining balance = Starting balance × (1 - Drawdown %)
                  <br />
                  Recovery required = Loss amount ÷ Remaining balance × 100
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  If an account loses 20%, it does not need 20% to recover. It
                  needs 25% because the gain is calculated on the smaller
                  remaining balance. A 50% drawdown requires a 100% gain to
                  return to break-even.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Definition
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is drawdown in trading?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Drawdown is the decline in account value from a previous
                    high. Traders use it to measure how much capital was lost
                    during a losing period and how much recovery is needed.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Recovery
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why recovery gets harder
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    After a loss, the account balance is smaller. This means the
                    return required to recover must be earned on less capital,
                    making recovery harder as drawdown becomes deeper.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    Risk
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    How to reduce drawdown
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                    Drawdown can be reduced by using smaller position sizes,
                    limiting risk per trade, avoiding revenge trading, and
                    monitoring total exposure across open positions.
                  </p>
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Drawdown vs maximum drawdown
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Drawdown can describe any decline in account value, while
                    maximum drawdown is the largest peak-to-trough decline over a
                    specific period. Maximum drawdown is commonly used to judge
                    the risk of a trading strategy.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    A strategy may look profitable overall but still be hard to
                    follow if it suffers from large drawdowns. This is why many
                    professional traders review drawdown together with returns.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why drawdown matters
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    Drawdown shows whether account risk is under control. If a
                    system regularly creates deep drawdowns, the trader may need
                    to reduce lot size, lower risk per trade, or improve the
                    trading plan.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common drawdown mistakes
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Increasing lot size to recover losses faster.",
                    "Removing the stop loss after a losing streak.",
                    "Focusing on recovery instead of protecting remaining capital.",
                    "Assuming a 50% loss only needs 50% to recover.",
                    "Opening too many correlated trades after a drawdown.",
                    "Ignoring maximum drawdown when evaluating a strategy.",
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
                  Tips to control trading drawdown
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Keep risk per trade small and consistent.",
                    "Use a lot size calculator before entering trades.",
                    "Avoid increasing position size after losses.",
                    "Review maximum drawdown before trusting a strategy.",
                    "Set daily or weekly loss limits.",
                    "Focus on capital preservation before aggressive recovery.",
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
                  Related Trading Calculators
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Risk Calculator", "/en/tools/risk-calculator"],
                    ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
                    ["Profit & Loss Calculator", "/en/tools/profit-calculator"],
                    ["Leverage Calculator", "/en/tools/leverage-calculator"],
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
                  Show full drawdown guide
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
            Drawdown Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a Drawdown Calculator?",
                a: "A Drawdown Calculator estimates the remaining account balance after a loss and the percentage gain required to recover back to break-even.",
              },
              {
                q: "How is drawdown recovery calculated?",
                a: "Recovery is calculated by dividing the loss amount by the remaining balance after the drawdown, then multiplying by 100.",
              },
              {
                q: "Why does a 50% loss require a 100% gain to recover?",
                a: "Because after a 50% loss, the account is worth half its original value. The remaining balance must double to return to the starting balance.",
              },
              {
                q: "What is maximum drawdown?",
                a: "Maximum drawdown is the largest decline from a previous account peak to a later low over a specific period.",
              },
              {
                q: "How can traders reduce drawdown?",
                a: "Traders can reduce drawdown by lowering risk per trade, using stop losses, avoiding oversized positions, and limiting total open exposure.",
              },
              {
                q: "Does drawdown mean a strategy is bad?",
                a: "Not always. Some drawdown is normal, but deep or frequent drawdowns may indicate excessive risk or poor position sizing.",
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