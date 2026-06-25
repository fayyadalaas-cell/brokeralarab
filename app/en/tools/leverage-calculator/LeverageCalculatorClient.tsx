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

const instruments: Record<
  InstrumentKey,
  {
    label: string;
    contractSize: number;
    defaultPrice: string;
    priceLabel: string;
    pricePlaceholder: string;
    calculationType: "quote-usd" | "base-usd" | "gold";
    note: string;
  }
> = {
  EURUSD: {
    label: "EUR/USD",
    contractSize: 100000,
    defaultPrice: "1.0800",
    priceLabel: "Current EUR/USD price",
    pricePlaceholder: "Example: 1.0800",
    calculationType: "quote-usd",
    note: "For EUR/USD, position value is calculated using lot size, contract size, and current market price.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    defaultPrice: "1.2700",
    priceLabel: "Current GBP/USD price",
    pricePlaceholder: "Example: 1.2700",
    calculationType: "quote-usd",
    note: "For GBP/USD, notional position value changes with the current market price.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    defaultPrice: "0.6600",
    priceLabel: "Current AUD/USD price",
    pricePlaceholder: "Example: 0.6600",
    calculationType: "quote-usd",
    note: "For AUD/USD, USD is the quote currency, so position value is estimated directly in dollars.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    defaultPrice: "0.6100",
    priceLabel: "Current NZD/USD price",
    pricePlaceholder: "Example: 0.6100",
    calculationType: "quote-usd",
    note: "For NZD/USD, notional exposure depends on lot size and the current exchange rate.",
  },
  USDCAD: {
    label: "USD/CAD",
    contractSize: 100000,
    defaultPrice: "1.3700",
    priceLabel: "Current USD/CAD price",
    pricePlaceholder: "Example: 1.3700",
    calculationType: "base-usd",
    note: "For USD/CAD, USD is the base currency, so 1 standard lot is usually close to $100,000 in notional value.",
  },
  USDCHF: {
    label: "USD/CHF",
    contractSize: 100000,
    defaultPrice: "0.9000",
    priceLabel: "Current USD/CHF price",
    pricePlaceholder: "Example: 0.9000",
    calculationType: "base-usd",
    note: "For USD/CHF, USD is the base currency, so notional exposure is based mainly on lot size.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    defaultPrice: "150.00",
    priceLabel: "Current USD/JPY price",
    pricePlaceholder: "Example: 150.00",
    calculationType: "base-usd",
    note: "For USD/JPY, USD is the base currency, so position value is usually straightforward to estimate.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    defaultPrice: "2350",
    priceLabel: "Current gold price",
    pricePlaceholder: "Example: 2350",
    calculationType: "gold",
    note: "For gold, this calculator assumes 1 lot equals 100 ounces. Broker contract specifications may vary.",
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

export default function LeverageCalculatorClient() {
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
    const selectedLeverage = Number(leverage);
    const marketPrice = Number(price);

    if (
      !Number.isFinite(accountBalance) ||
      !Number.isFinite(lots) ||
      !Number.isFinite(selectedLeverage) ||
      !Number.isFinite(marketPrice)
    ) {
      return null;
    }

    if (
      accountBalance <= 0 ||
      lots <= 0 ||
      selectedLeverage <= 0 ||
      marketPrice <= 0
    ) {
      return null;
    }

    let positionValue = 0;

    if (current.calculationType === "quote-usd") {
      positionValue = lots * current.contractSize * marketPrice;
    }

    if (current.calculationType === "base-usd") {
      positionValue = lots * current.contractSize;
    }

    if (current.calculationType === "gold") {
      positionValue = lots * current.contractSize * marketPrice;
    }

    const effectiveLeverage = positionValue / accountBalance;
    const requiredMargin = positionValue / selectedLeverage;
    const marginUsagePercent = (requiredMargin / accountBalance) * 100;
    const freeMarginAfterTrade = accountBalance - requiredMargin;

    let leverageStatus = "Low effective leverage";
    let leverageText =
      "Your position size is relatively small compared with your account balance, which helps reduce margin pressure.";

    if (effectiveLeverage > 10 && effectiveLeverage <= 50) {
      leverageStatus = "Moderate effective leverage";
      leverageText =
        "Your leverage exposure is moderate. Monitor total margin usage before adding more open trades.";
    }

    if (effectiveLeverage > 50) {
      leverageStatus = "High effective leverage";
      leverageText =
        "Your position creates high exposure compared with account size. Market volatility may increase margin pressure quickly.";
    }

    return {
      positionValue,
      effectiveLeverage,
      requiredMargin,
      marginUsagePercent,
      freeMarginAfterTrade,
      leverageStatus,
      leverageText,
      selectedLeverage,
    };
  }, [balance, lotSize, leverage, price, current]);

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
                Forex Leverage Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate effective leverage, required margin, position value,
                and margin usage before opening a forex or gold trade. Use this
                tool to understand your real market exposure compared with your
                account balance.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  Calculate leverage
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Read the leverage guide
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
                      Position value
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $108,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Account balance
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $1,000
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Effective leverage
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      1:108
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Example assumes 1 lot of EUR/USD at 1.0800 with a $1,000
                  trading account.
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
                  Leverage Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Calculate notional position value, effective leverage,
                  required margin, margin usage, and estimated free margin after
                  opening a trade.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate effective leverage and required margin.
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
                    Account balance
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1000"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Position size in lots
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
                    Account leverage
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 100"
                  />
                </div>

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

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    {current.priceLabel}
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder={current.pricePlaceholder}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                Calculate leverage and margin
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Results are estimates and may vary by broker, account type,
                contract size, and margin rules.
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
                    Leverage and margin summary
                  </h3>
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Effective leverage
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      1:{numberFormat(result.effectiveLeverage)}
                    </p>

                    <p className="mt-2 text-xs text-slate-600">
                      Based on position value divided by account balance.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Position value
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.positionValue)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Required margin
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.requiredMargin)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Margin usage
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {numberFormat(result.marginUsagePercent)}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Free margin after trade
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.freeMarginAfterTrade)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      {result.leverageStatus}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.leverageText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    Enter your account and trade details, then click calculate
                    to see effective leverage and required margin.
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
              Forex Leverage Calculator Guide
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              A Forex Leverage Calculator helps traders understand their true
              market exposure before opening a position. Instead of focusing
              only on the broker's advertised leverage, experienced traders
              calculate effective leverage, required margin, and position value
              to better manage risk and avoid excessive account exposure.
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
                  How leverage is calculated
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "Balance",
                    "Lot Size",
                    "Position Value",
                    "Margin",
                    "Leverage",
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
                  Effective leverage is calculated by dividing total position
                  value by account balance. Required margin is calculated by
                  dividing position value by the leverage available in your
                  trading account.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Basics
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is leverage?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Leverage allows traders to control a larger position with a
                    smaller amount of capital. For example, 1:100 leverage means
                    that every $1 of margin can control approximately $100 of
                    market exposure.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Margin
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    How margin works
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Margin is the amount of money required to open a trade.
                    Higher leverage reduces margin requirements but does not
                    reduce market risk or potential losses.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    Formula
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Leverage formulas
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    Effective Leverage = Position Value ÷ Account Balance
                    <br />
                    Required Margin = Position Value ÷ Account Leverage
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Leverage examples
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">Position Value</th>
                        <th className="p-4 font-extrabold">Balance</th>
                        <th className="p-4 font-extrabold">
                          Effective Leverage
                        </th>
                        <th className="p-4 font-extrabold">
                          Margin at 1:100
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["$10,000", "$1,000", "1:10", "$100"],
                        ["$50,000", "$1,000", "1:50", "$500"],
                        ["$100,000", "$1,000", "1:100", "$1,000"],
                        ["$235,000", "$5,000", "1:47", "$2,350"],
                      ].map((row) => (
                        <tr key={row.join("-")} className="hover:bg-brand-50">
                          {row.map((cell, index) => (
                            <td
                              key={`${cell}-${index}`}
                              className={`p-4 font-bold ${
                                index === 2
                                  ? "text-brand-600"
                                  : "text-slate-700"
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

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  These examples are educational only. Actual margin
                  requirements may differ depending on broker policies,
                  instrument specifications, and account type.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Effective leverage vs broker leverage
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Many traders focus on the maximum leverage offered by a
                    broker, such as 1:500 or 1:1000. However, effective
                    leverage is often more important because it reflects the
                    actual exposure of open positions relative to account
                    equity.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Two traders may use the same broker leverage but have
                    completely different levels of market exposure depending on
                    their position size.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Is high leverage dangerous?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    High leverage itself does not cause losses. The real danger
                    comes from using excessive position sizes that create large
                    exposure relative to account balance and available margin.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Gold leverage calculator (XAU/USD)
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  Gold positions often create larger notional exposure than
                  traders expect. Assuming a gold price of $2,350 and a
                  standard contract size of 100 ounces, one lot represents
                  approximately $235,000 in market exposure.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  This is why effective leverage can increase quickly when
                  trading gold, even when lot size appears relatively small.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common leverage mistakes
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Confusing broker leverage with actual leverage exposure.",
                    "Ignoring margin usage before opening new trades.",
                    "Using large lot sizes because margin requirements seem low.",
                    "Opening multiple correlated positions without measuring total exposure.",
                    "Using maximum leverage available without a risk plan.",
                    "Assuming lower margin means lower risk.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 font-extrabold text-red-600">
                          ⚠
                        </div>

                        <span className="text-sm font-bold leading-6 text-slate-700">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Best practices for leverage management
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Calculate effective leverage before every trade.",
                    "Monitor free margin after opening positions.",
                    "Use leverage together with position sizing rules.",
                    "Reduce lot size if effective leverage becomes excessive.",
                    "Combine leverage analysis with risk management tools.",
                    "Review contract specifications for gold and CFDs.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-extrabold text-brand-600">
                          ✓
                        </div>

                        <span className="text-sm font-bold leading-6 text-slate-700">
                          {item}
                        </span>
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
                    ["Margin Calculator", "/en/tools/margin-calculator"],
                    ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
                    ["Profit & Loss Calculator", "/en/tools/profit-calculator"],
                  ].map(([title, href]) => (
                    <a
                      key={title}
                      href={href}
                      className="rounded-2xl border border-brand-100 bg-white px-4 py-4 text-center text-sm font-extrabold text-slate-800 transition hover:bg-blue-100"
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
                  Show full leverage guide
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
            Forex Leverage Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a Forex Leverage Calculator?",
                a: "A Forex Leverage Calculator estimates effective leverage, required margin, position value, and margin usage based on account balance, lot size, instrument, price, and account leverage.",
              },
              {
                q: "How is effective leverage calculated?",
                a: "Effective leverage is calculated by dividing total position value by account balance.",
              },
              {
                q: "What is the difference between leverage and margin?",
                a: "Leverage shows how much market exposure you control, while margin is the amount of capital required to open the position.",
              },
              {
                q: "Is high leverage always dangerous?",
                a: "High leverage is not automatically dangerous, but using high leverage with oversized positions can increase risk and margin pressure quickly.",
              },
              {
                q: "Can I use this calculator for gold?",
                a: "Yes. The calculator supports XAU/USD using the common assumption that 1 lot of gold equals 100 ounces, but broker specifications may vary.",
              },
              {
                q: "Are the results final?",
                a: "No. Results are estimates because margin requirements, contract size, and leverage rules can vary by broker and account type.",
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