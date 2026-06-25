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
    entryLabel: "EUR/USD entry price",
    exitLabel: "EUR/USD exit price",
    calculationType: "quote-usd",
    note: "For EUR/USD, profit and loss are calculated directly in USD because USD is the quote currency.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "1.2700",
    defaultExit: "1.2750",
    entryLabel: "GBP/USD entry price",
    exitLabel: "GBP/USD exit price",
    calculationType: "quote-usd",
    note: "For GBP/USD, P&L is calculated directly in USD because the US dollar is the quote currency.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "0.6600",
    defaultExit: "0.6650",
    entryLabel: "AUD/USD entry price",
    exitLabel: "AUD/USD exit price",
    calculationType: "quote-usd",
    note: "For AUD/USD, price movement is converted directly into USD based on lot size.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "0.6100",
    defaultExit: "0.6150",
    entryLabel: "NZD/USD entry price",
    exitLabel: "NZD/USD exit price",
    calculationType: "quote-usd",
    note: "For NZD/USD, profit and loss are calculated directly in USD because USD is the quote currency.",
  },
  USDCAD: {
    label: "USD/CAD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "1.3700",
    defaultExit: "1.3750",
    entryLabel: "USD/CAD entry price",
    exitLabel: "USD/CAD exit price",
    calculationType: "base-usd",
    note: "For USD/CAD, profit or loss is calculated in CAD first and then converted to USD using the exit price.",
  },
  USDCHF: {
    label: "USD/CHF",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultEntry: "0.9000",
    defaultExit: "0.9050",
    entryLabel: "USD/CHF entry price",
    exitLabel: "USD/CHF exit price",
    calculationType: "base-usd",
    note: "For USD/CHF, profit or loss is calculated in CHF first and then converted to USD using the current price.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    pipSize: 0.01,
    defaultEntry: "150.00",
    defaultExit: "150.50",
    entryLabel: "USD/JPY entry price",
    exitLabel: "USD/JPY exit price",
    calculationType: "base-usd",
    note: "JPY pairs usually use 0.01 as one pip. Profit or loss is converted from JPY to USD using the exit price.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    pipSize: 0.01,
    defaultEntry: "2350",
    defaultExit: "2360",
    entryLabel: "Gold entry price",
    exitLabel: "Gold exit price",
    calculationType: "gold",
    note: "For gold, this calculator assumes 1 lot equals 100 ounces. P&L is calculated directly in USD because XAU/USD is priced against USD.",
  },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function moneySigned(value: number) {
  const formatted = money(Math.abs(value));
  return value < 0 ? `-${formatted}` : formatted;
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

    const signedPriceMove = tradeType === "buy" ? exit - entry : entry - exit;
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

    let status = "Near breakeven";
    let statusText =
      "The trade is close to breakeven based on the values entered.";

    if (isProfit) {
      status = "Profitable trade";
      statusText =
        "The result is positive based on entry price, exit price, and lot size. Always include spread, commission, and execution price before relying on the final number.";
    }

    if (isLoss) {
      status = "Losing trade";
      statusText =
        "The result is negative based on entry price, exit price, and lot size. Use this result to evaluate risk before repeating the same position size.";
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
      tradeDirection: tradeType === "buy" ? "Buy" : "Sell",
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
                Forex Profit and Loss Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate potential profit or loss for forex and gold trades
                using entry price, exit price, trade direction, lot size, and
                commission. Estimate pips, dollar P&L, and account impact before
                placing a trade.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  Calculate profit or loss
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Read the P&L guide
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
                    <p className="text-xs font-bold text-slate-500">Trade</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      Buy EUR/USD
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">Move</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      50 pips
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Estimated profit
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      $500
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  This example assumes buying 1 lot of EUR/USD from 1.0800 to
                  1.0850.
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
                  Profit and Loss Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Calculate trade result in dollars and pips based on entry
                  price, exit price, trade direction, and lot size. Supports
                  buy and sell trades for forex and gold.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate P&L from entry, exit, and lot size.
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
                    Trading instrument
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
                    Trade direction
                  </label>

                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value as TradeType)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Lot size
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Account balance
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1000"
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
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
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
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Commission or fees in USD
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Optional, example: 7"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                Calculate profit or loss now
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Results are estimates and may vary by spread, commission,
                execution price, and broker contract specifications.
              </p>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-600">
                    Calculation result
                  </p>

                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    Trade summary
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
                      Net result
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
                      {moneySigned(result.netProfit)}
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      After subtracting entered commission or fees.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Pips
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {numberFormat(result.pips)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Pip value
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.pipValue)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Gross P&L
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {moneySigned(result.grossProfit)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Account impact
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
                    Enter your trade details and click calculate to see the
                    estimated profit or loss.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  Please enter valid numbers greater than zero.
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
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <p className="text-sm font-bold text-brand-600">
              Updated June 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              Forex Profit and Loss Calculator Guide
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              A profit and loss calculator helps traders estimate the financial
              result of a trade before or after execution. By entering trade
              direction, entry price, exit price, lot size, and commission, you
              can calculate pips, gross P&L, net P&L, and account impact in USD.
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
                  How is forex profit and loss calculated?
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "Trade direction",
                    "Entry price",
                    "Exit price",
                    "Lot size",
                    "P&L",
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
                  For buy trades, profit happens when the exit price is higher
                  than the entry price. For sell trades, profit happens when the
                  exit price is lower than the entry price. The price difference
                  is multiplied by contract size and lot size, then converted to
                  USD when required.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    P&L
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What does a P&L calculator do?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    A P&L calculator estimates the profit or loss of a trade
                    using price movement, lot size, and trade direction. It can
                    be used before placing a trade or after closing one to
                    review performance.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Pips
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why are pips not enough?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Pips show the size of the price movement, but not the dollar
                    value of the trade. A 50-pip move can be small or large
                    depending on lot size and pip value.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    Formula
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    P&L formula
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    P&L = Price difference × Contract size × Lot size
                    <br />
                    Some pairs require converting the result back to USD.
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Forex profit and loss examples
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">Trade</th>
                        <th className="p-4 font-extrabold">Entry</th>
                        <th className="p-4 font-extrabold">Exit</th>
                        <th className="p-4 font-extrabold">Result</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Buy EUR/USD", "1.0800", "1.0850", "+$500"],
                        ["Sell EUR/USD", "1.0800", "1.0750", "+$500"],
                        ["Buy EUR/USD", "1.0800", "1.0750", "-$500"],
                        ["Buy Gold", "2350", "2360", "+$1,000"],
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
                      trade: "Buy EUR/USD",
                      entry: "1.0800",
                      exit: "1.0850",
                      result: "+$500",
                    },
                    {
                      trade: "Sell EUR/USD",
                      entry: "1.0800",
                      exit: "1.0750",
                      result: "+$500",
                    },
                    {
                      trade: "Buy EUR/USD",
                      entry: "1.0800",
                      exit: "1.0750",
                      result: "-$500",
                    },
                    {
                      trade: "Buy Gold",
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
                          <span className="text-slate-500">Trade</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.trade}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Entry</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.entry}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Exit</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.exit}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Result</span>
                          <div className="mt-1 font-extrabold text-brand-600">
                            {row.result}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  These examples assume a 1-lot position and do not include
                  spread, swap, slippage, or commission. Actual results may vary
                  depending on execution and broker pricing.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Pips vs dollar profit
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Pips measure movement, while dollar profit depends on
                    position size. A trade can gain 50 pips but still produce a
                    small or large dollar result depending on the lot size used.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    This is why traders should not evaluate trades by pips only.
                    Lot size, pip value, and account size must be considered
                    together.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why calculate loss before trading?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    Calculating possible loss before opening a trade helps you
                    understand the downside. If the expected loss is too large
                    relative to account balance, reduce lot size or adjust your
                    trade plan.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Gold profit calculator for XAU/USD
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  Gold trading uses different contract specifications from
                  standard forex pairs. This calculator assumes that 1 lot of
                  gold equals 100 ounces and that P&L is calculated in USD
                  because XAU/USD is priced against the US dollar.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  For example, buying 1 lot of gold from 2350 to 2360 represents
                  a $10 price move. With a 100-ounce contract, the estimated
                  gross result is about $1,000 before spread or commission.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common P&L calculation mistakes
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Counting pips without converting them to dollar value.",
                    "Ignoring spread, commission, and execution price.",
                    "Using the same pip value for every pair.",
                    "Forgetting that sell trades profit when price falls.",
                    "Comparing trade results without considering lot size.",
                    "Focusing on expected profit without calculating possible loss.",
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
                  Tips for using a profit and loss calculator
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Enter entry and exit prices exactly as shown on the platform.",
                    "Use real lot size rather than only contract value.",
                    "Add commission if known for a more realistic net result.",
                    "Compare P&L with account balance to measure impact.",
                    "Use the calculator before and after trades to review performance.",
                    "Connect P&L with risk management instead of focusing only on profit.",
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
                    ["Forex Risk Calculator", "/en/tools/risk-calculator"],
                    ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
                    ["Pip Value Calculator", "/en/tools/pip-calculator"],
                    ["Margin Calculator", "/en/tools/margin-calculator"],
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
                  Show full P&L guide
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
            Forex Profit and Loss Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a Forex Profit and Loss Calculator?",
                a: "A Forex Profit and Loss Calculator estimates trade result based on entry price, exit price, trade direction, lot size, and fees.",
              },
              {
                q: "How is forex profit calculated?",
                a: "Forex profit is calculated from the price difference between entry and exit, multiplied by contract size and lot size, then converted to USD when needed.",
              },
              {
                q: "Does the calculator support sell trades?",
                a: "Yes. For sell trades, profit occurs when the exit price is lower than the entry price.",
              },
              {
                q: "Can I use this calculator for gold?",
                a: "Yes. It supports XAU/USD using a standard assumption of 100 ounces per 1 lot, but broker specifications may vary.",
              },
              {
                q: "Is the result final?",
                a: "No. The result is an estimate because spread, commission, slippage, swap, and execution price can affect the final result.",
              },
              {
                q: "Why can results differ between brokers?",
                a: "Broker contract size, pricing format, spread, commission, and execution quality can all affect the final P&L.",
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