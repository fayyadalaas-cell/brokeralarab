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
    pipValuePerLot: number;
    stopLabel: string;
    stopPlaceholder: string;
    note: string;
  }
> = {
  EURUSD: {
    label: "EUR/USD",
    pipValuePerLot: 10,
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    note: "The approximate pip value for 1 standard lot on EUR/USD is $10.",
  },
  GBPUSD: {
    label: "GBP/USD",
    pipValuePerLot: 10,
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    note: "The approximate pip value for 1 standard lot on GBP/USD is $10.",
  },
  AUDUSD: {
    label: "AUD/USD",
    pipValuePerLot: 10,
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    note: "The approximate pip value for 1 standard lot on AUD/USD is $10.",
  },
  NZDUSD: {
    label: "NZD/USD",
    pipValuePerLot: 10,
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    note: "The approximate pip value for 1 standard lot on NZD/USD is $10.",
  },
  USDJPY: {
    label: "USD/JPY",
    pipValuePerLot: 9.1,
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    note: "The pip value on USD/JPY is approximate and may change based on the current exchange rate.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    pipValuePerLot: 100,
    stopLabel: "Gold stop-loss distance",
    stopPlaceholder: "Example: 5 or 10",
    note: "Example: if your entry is 2350 and your stop loss is 2345, enter 5 — not your dollar loss amount.",
  },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatLot(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0.00";
  return value.toFixed(2);
}

export default function RiskCalculatorClient() {
  const [balance, setBalance] = useState("1000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [instrument, setInstrument] = useState<InstrumentKey>("EURUSD");
  const [stopLoss, setStopLoss] = useState("50");
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const current = instruments[instrument];

  const result = useMemo(() => {
    const b = Number(balance);
    const r = Number(riskPercent);
    const sl = Number(stopLoss);

    if (!Number.isFinite(b) || !Number.isFinite(r) || !Number.isFinite(sl)) {
      return null;
    }

    if (b <= 0 || r <= 0 || sl <= 0) return null;

    const riskAmount = b * (r / 100);
    const lotSize = riskAmount / (sl * current.pipValuePerLot);

    if (!Number.isFinite(lotSize) || lotSize <= 0) return null;

    let riskStatus = "Low risk";
    let riskText =
      "This is a conservative risk level and is generally suitable for traders who want to protect their capital.";

    if (r > 2 && r <= 5) {
      riskStatus = "Medium risk";
      riskText =
        "This risk level requires more caution, especially if you open multiple trades at the same time.";
    }

    if (r > 5) {
      riskStatus = "Very high risk";
      riskText = `You are risking ${money(
        riskAmount
      )} on a single trade. Consider reducing your position size before entering the market.`;
    }

    return {
      riskAmount,
      lotSize,
      riskStatus,
      riskText,
      riskPercent: r,
      stopLoss: sl,
    };
  }, [balance, riskPercent, stopLoss, current.pipValuePerLot]);

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
                Trading Tools
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                Forex and Gold Risk Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate your ideal position size before entering the market
                based on account balance, risk percentage, trading instrument,
                and stop-loss distance.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  Start calculating
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Read the risk management guide
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="rounded-[1.5rem] border border-brand-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">
                  Quick Example
                </p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Account Balance
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $1,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Risk Amount
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-brand-600">
                      $10 = 1%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Suggested Lot Size
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      0.02 lots
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Example based on a $1,000 account, 1% risk, and a 50-pip stop
                  loss on EUR/USD.
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
                <h2 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
                  Trading Risk Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Calculate the right lot size and potential risk before opening
                  any forex or gold trade, based on your account balance, risk
                  percentage, and stop-loss distance.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate risk and lot size before entering a trade.
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
                    Account balance in USD
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-left text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
                    placeholder="Example: 1000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Risk percentage %
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-left text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
                    placeholder="Example: 1"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Trading instrument
                  </label>
                  <select
                    value={instrument}
                    onChange={(e) =>
                      setInstrument(e.target.value as InstrumentKey)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-left text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
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
                    {current.stopLabel}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-left text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
                    placeholder={current.stopPlaceholder}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-950 sm:text-base"
              >
                Calculate risk now
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Results are estimates and may vary depending on the broker,
                account type, commission, spread, and contract size.
              </p>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-brand-600">
                    Calculation result
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    Trade summary
                  </h3>
                </div>
                <div className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                  Live
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-slate-500 sm:text-sm">
                      Risk amount
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.riskAmount)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      Equal to {result.riskPercent}% of your account balance.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-slate-500 sm:text-sm">
                      Suggested lot size
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {formatLot(result.lotSize)} lots
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      Based on a stop-loss distance of {result.stopLoss}.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-brand-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-brand-600 sm:text-sm">
                      Risk level
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-slate-950 sm:mt-2 sm:text-2xl">
                      {result.riskStatus}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-2 sm:leading-6">
                      {result.riskPercent > 5
                        ? "Review your lot size before entering the trade."
                        : result.riskText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    Enter your trade details and click calculate to see the
                    result here.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  Please enter valid numbers greater than zero.
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
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <p className="text-sm font-bold text-brand-600">
              Last updated: June 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              Risk Management Guide Before Opening a Trade
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Risk management is not an optional step in trading. It is the
              foundation that helps traders protect their capital during losing
              streaks. This calculator helps you connect your position size to
              your account balance, risk percentage, and stop-loss distance
              instead of choosing a lot size randomly.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10 [&_p]:text-justify">
            <div
              className={`space-y-6 overflow-hidden transition-all duration-300 lg:max-h-none ${
                showGuideMore ? "max-h-[8000px]" : "max-h-[980px]"
              }`}
            >
              <section className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  How is lot size calculated?
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "Account balance",
                    "Risk percentage",
                    "Risk amount",
                    "Stop loss",
                    "Lot size",
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
                  The idea is simple: do not start with the lot size. Start with
                  the amount you are willing to lose if the market hits your
                  stop loss. Then calculate the position size that keeps your
                  risk within that limit.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Concept
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is a risk calculator?
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    A trading risk calculator helps you estimate the right
                    position size before opening a trade. Instead of choosing a
                    lot size randomly, it links the trade size to your account
                    balance, risk percentage, and stop-loss distance.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Purpose
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why use it?
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    It shows your potential loss before entering the trade. This
                    helps you avoid oversized positions and makes your trading
                    decisions more disciplined.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    Formula
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    How does it work?
                  </h3>
                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700 sm:p-5">
                    Risk amount = Account balance × Risk percentage
                    <br />
                    Lot size = Risk amount ÷ Stop-loss distance ÷ Pip value
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Lot Size Calculation Examples
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                      <tr>
                        <th className="p-3 font-extrabold">
                          Account balance
                        </th>
                        <th className="p-3 font-extrabold">Risk</th>
                        <th className="p-3 font-extrabold">Stop loss</th>
                        <th className="p-3 font-extrabold">Lot size</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["$1,000", "1%", "50 pips", "0.02"],
                        ["$5,000", "1%", "50 pips", "0.10"],
                        ["$10,000", "2%", "50 pips", "0.40"],
                      ].map((row) => (
                        <tr key={row.join("-")} className="bg-white">
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

                <div className="mt-5 space-y-4 md:hidden">
                  {[
                    {
                      balance: "$1,000",
                      risk: "1%",
                      stop: "50 pips",
                      lot: "0.02",
                    },
                    {
                      balance: "$5,000",
                      risk: "1%",
                      stop: "50 pips",
                      lot: "0.10",
                    },
                    {
                      balance: "$10,000",
                      risk: "2%",
                      stop: "50 pips",
                      lot: "0.40",
                    },
                  ].map((row) => (
                    <div
                      key={row.balance}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">
                            Account balance
                          </span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.balance}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Risk</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.risk}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Stop loss</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.stop}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Lot size</span>
                          <div className="mt-1 font-extrabold text-brand-600">
                            {row.lot}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  These examples are approximate and assume that the pip value
                  for one standard lot on a major pair such as EUR/USD is about
                  $10.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is a good risk percentage?
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    There is no single risk percentage that works for every
                    trader, but many conservative traders use 1% to 2% of their
                    account balance per trade. This helps reduce the impact of
                    losing streaks and gives the account more room to recover.
                  </p>
                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Risking 5% or more on one trade is considered aggressive,
                    especially if you open multiple trades at the same time. The
                    real problem is not one trade, but the total risk across all
                    open positions.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-white p-5 shadow-sm sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Quick practical example
                  </h3>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs text-slate-500">
                        Account balance
                      </div>
                      <div className="mt-1 text-2xl font-extrabold">
                        $1,000
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs text-slate-500">Risk</div>
                      <div className="mt-1 text-2xl font-extrabold">$10</div>
                    </div>

                    <div className="rounded-2xl bg-brand-500/20 p-4">
                      <div className="text-xs text-blue-200">Lot size</div>
                      <div className="mt-1 text-2xl font-extrabold">0.02</div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common mistake: a large lot size can increase losses quickly
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  If your account balance is $1,000 and you open a 1-lot trade
                  on EUR/USD, a move of only 10 pips against you may cost around
                  $100, or about 10% of your account. That is why a good trade
                  idea still needs the right position size.
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Professional Trader vs Random Trader
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                    <h4 className="font-extrabold text-green-800">
                      Professional trader
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm font-bold leading-7 text-green-900">
                      <li>✓ Calculates risk before entering</li>
                      <li>✓ Sets the stop loss before the trade</li>
                      <li>✓ Chooses lot size based on account size</li>
                      <li>✓ Does not increase risk after a loss</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                    <h4 className="font-extrabold text-red-800">
                      Random trader
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm font-bold leading-7 text-red-900">
                      <li>✕ Enters without calculating risk</li>
                      <li>✕ Uses the same lot size on every trade</li>
                      <li>✕ Moves the stop loss when losing</li>
                      <li>✕ Increases risk to recover previous losses</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Risk Management for Gold Trading
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  When using the calculator for XAU/USD, do not enter the dollar
                  loss amount in the stop-loss field. Enter the price distance
                  between your entry and stop loss. For example, if your entry
                  is 2350 and your stop loss is 2345, the distance is 5.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Important Money Management Rules
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  {[
                    "Do not risk more than 1% to 2% if you are a beginner.",
                    "Do not increase risk after a losing trade.",
                    "Do not open multiple trades in the same direction without calculating total risk.",
                    "Do not move your stop loss farther away when the trade goes against you.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600 hover:shadow-lg sm:rounded-3xl sm:p-6 sm:leading-7"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-left">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 font-extrabold text-brand-600">
                          ✓
                        </div>

                        <span className="block">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common Risk Management Mistakes
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  {[
                    "Using a fixed lot size on every trade without considering the stop loss.",
                    "Increasing risk after a losing trade to recover quickly.",
                    "Opening several trades in the same direction without calculating total exposure.",
                    "Moving the stop loss farther away when the trade goes against you.",
                    "Relying on leverage without understanding margin and loss impact.",
                    "Opening large gold trades because of the expectation of fast profit.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:text-red-700 hover:shadow-lg sm:rounded-3xl sm:p-6 sm:leading-7"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-left">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 font-extrabold text-red-600">
                          ⚠
                        </div>

                        <span className="block">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Is the calculator 100% accurate?
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  The calculator provides an estimate based on common forex and
                  gold contract values. It may not match every broker exactly,
                  because brokers may differ in contract size, pip value,
                  account currency, spread, commission, and execution terms.
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  More Trading Tools
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                  {[
                    ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
                    ["Pip Value Calculator", "/en/tools/pip-calculator"],
                    ["Margin Calculator", "/en/tools/margin-calculator"],
                    ["Profit and Loss Calculator", "/en/tools/profit-calculator"],
                  ].map(([title, href]) => (
                    <a
                      key={title}
                      href={href}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-extrabold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md"
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
            Forex Risk Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4">
            {[
              {
                q: "What does a trading risk calculator do?",
                a: "It helps you estimate the potential loss and suggested lot size before opening a trade.",
              },
              {
                q: "Can I use this calculator for forex and gold?",
                a: "Yes. You can use it for major forex pairs and XAU/USD, but the results should be treated as estimates.",
              },
              {
                q: "What is a good risk percentage for beginners?",
                a: "Many beginners start with 1% or less per trade to reduce the impact of losing streaks.",
              },
              {
                q: "Is the calculated lot size final?",
                a: "No. It is an estimate. Always check your trading platform and broker conditions before placing a trade.",
              },
              {
                q: "What should I enter as stop loss for gold?",
                a: "Enter the price distance between your entry and stop loss. If entry is 2350 and stop loss is 2345, enter 5.",
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