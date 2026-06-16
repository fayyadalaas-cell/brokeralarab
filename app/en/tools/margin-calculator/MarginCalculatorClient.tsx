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
    priceLabel: "Current EUR/USD price",
    pricePlaceholder: "Example: 1.0800",
    note: "For EUR/USD, 1 standard lot equals 100,000 euros. The position value is converted to USD using the current market price.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    defaultPrice: "1.2700",
    priceLabel: "Current GBP/USD price",
    pricePlaceholder: "Example: 1.2700",
    note: "For GBP/USD, 1 standard lot equals 100,000 pounds. Required margin depends on price, lot size, and leverage.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    defaultPrice: "0.6600",
    priceLabel: "Current AUD/USD price",
    pricePlaceholder: "Example: 0.6600",
    note: "For AUD/USD, the notional trade value is calculated using the contract size and the current pair price.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    defaultPrice: "0.6100",
    priceLabel: "Current NZD/USD price",
    pricePlaceholder: "Example: 0.6100",
    note: "For NZD/USD, required margin changes based on lot size, market price, and leverage.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    defaultPrice: "100000",
    priceLabel: "Notional value per 1 lot in USD",
    pricePlaceholder: "Example: 100000",
    note: "Because USD is the base currency in USD/JPY, 1 standard lot is approximately $100,000 in notional value.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    defaultPrice: "2350",
    priceLabel: "Current gold price",
    pricePlaceholder: "Example: 2350",
    note: "For gold, 1 lot often represents 100 ounces. Contract size may vary by broker, so use the result as an estimate.",
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
  const absolute = Math.abs(value);
  const formatted = money(absolute);
  return value < 0 ? `-${formatted}` : formatted;
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

    let marginStatus = "Comfortable margin";
    let marginText =
      "The required margin is relatively low compared with your account balance, but position size and leverage should still be managed carefully.";

    if (marginUsedPercent > 30 && marginUsedPercent <= 70) {
      marginStatus = "Moderate margin";
      marginText =
        "A noticeable part of your account balance will be locked as margin. Make sure you still have enough free margin to handle market movement.";
    }

    if (marginUsedPercent > 70) {
      marginStatus = "High margin usage";
      marginText =
        "The required margin uses a large part of your account balance. The lot size or leverage may not be suitable for your capital.";
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
    <main dir="ltr" className="min-h-screen bg-[#f3f7fb] text-slate-900">
      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
        {/* HERO */}
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 text-center sm:p-10 lg:p-12 lg:text-left">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 sm:px-4 sm:py-1.5 sm:text-sm">
                Trading Tools
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                Forex and Gold Margin Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate the required margin to open a forex or gold trade
                based on lot size, leverage, market price, and trading
                instrument. Use the tool to estimate how much capital will be
                locked before entering the market.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  Calculate margin now
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Read the margin guide
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-blue-700">
                  Quick example
                </p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Position size
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1 lot EUR/USD
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Leverage
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1:100
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      Estimated margin
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      About $1,080
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  This example assumes EUR/USD at 1.0800 and a standard
                  contract size of 100,000 units. Results vary by price and
                  broker.
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
                  Margin Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Calculate required margin and notional trade value before
                  opening a forex or gold trade based on lot size, current
                  market price, and leverage.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate required margin before opening a trade.
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
                    Trade size in lots
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
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
                      handleInstrumentChange(e.target.value as InstrumentKey)
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
                    {current.priceLabel}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-left text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
                    placeholder={current.pricePlaceholder}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Leverage
                  </label>
                  <select
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-left text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
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
                Calculate margin now
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Results are estimates and may vary by broker, account type,
                contract size, live price, and margin requirements.
              </p>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-blue-700">
                    Calculation result
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    Margin summary
                  </h3>
                </div>

                <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  Live
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-slate-500 sm:text-sm">
                      Required margin
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.requiredMargin)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      Estimated amount locked to open the trade.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-slate-500 sm:text-sm">
                      Notional value
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.notionalValue)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      Trade value before applying leverage.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-blue-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-blue-700 sm:text-sm">
                      Margin status
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-slate-950 sm:mt-2 sm:text-2xl">
                      {result.marginStatus}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-2 sm:leading-6">
                      {result.marginText}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:col-span-3 sm:p-4 lg:col-span-1">
                    <div className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          Estimated free margin
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {moneySigned(result.freeMargin)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          Margin used
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {numberFormat(result.marginUsedPercent)}%
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          Estimated margin level
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
                    Enter your trade details and click calculate to see the
                    margin result here.
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
                {/* GUIDE */}
        <article
          id="guide"
          className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:mt-8 sm:rounded-[2rem]"
        >
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <p className="text-sm font-bold text-blue-700">
              Updated June 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              Forex Margin and Leverage Guide for Traders
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Margin is one of the most important concepts in forex and CFD
              trading. A margin calculator helps traders estimate how much money
              is required to open a position, how leverage affects buying power,
              and how much free margin may remain in the account after entering
              a trade.
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
                  How does the margin calculator work?
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "Lot size",
                    "Market price",
                    "Position value",
                    "Leverage",
                    "Required margin",
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
                  The calculator first estimates the notional position value,
                  then divides that value by the leverage ratio. The result is
                  the approximate margin required to open the trade.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    Margin
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is margin in forex?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Margin is the amount of capital your broker sets aside to
                    open and maintain a leveraged position. It is not a fee or
                    commission. It is collateral that allows you to control a
                    larger position than your cash balance alone.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    Leverage
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    How does leverage affect margin?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Higher leverage usually reduces the margin required to open
                    the same position size. For example, 1:100 leverage requires
                    less margin than 1:30 leverage, but it can also increase the
                    risk of overexposure.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                    Formula
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Required margin formula
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    Position value = Contract size × Lot size × Market price
                    <br />
                    Required margin = Position value ÷ Leverage
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Forex margin calculation examples
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="p-3 font-extrabold">Instrument</th>
                        <th className="p-3 font-extrabold">Trade size</th>
                        <th className="p-3 font-extrabold">Leverage</th>
                        <th className="p-3 font-extrabold">Required margin</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["EUR/USD", "1 lot", "1:100", "$1,080"],
                        ["EUR/USD", "0.10 lot", "1:100", "$108"],
                        ["Gold / XAUUSD", "1 lot", "1:100", "$2,350"],
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

                <div className="mt-5 space-y-4 md:hidden">
                  {[
                    {
                      instrument: "EUR/USD",
                      size: "1 lot",
                      leverage: "1:100",
                      margin: "$1,080",
                    },
                    {
                      instrument: "EUR/USD",
                      size: "0.10 lot",
                      leverage: "1:100",
                      margin: "$108",
                    },
                    {
                      instrument: "Gold / XAUUSD",
                      size: "1 lot",
                      leverage: "1:100",
                      margin: "$2,350",
                    },
                  ].map((row) => (
                    <div
                      key={`${row.instrument}-${row.size}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">Instrument</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.instrument}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Trade size</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.size}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Leverage</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.leverage}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Margin</span>
                          <div className="mt-1 font-extrabold text-blue-700">
                            {row.margin}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  These examples are estimates. Actual margin requirements may
                  vary depending on the broker, contract size, account currency,
                  leverage limits, and live market price.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is free margin?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Free margin is the amount of account equity that is not
                    currently locked as margin. Traders use free margin to open
                    additional positions or absorb floating losses while trades
                    remain open.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    If your required margin becomes too large compared with your
                    account balance, your free margin may shrink quickly. This
                    can limit your ability to manage trades during volatile
                    market conditions.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is margin level?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    Margin level is usually shown as a percentage and helps
                    indicate account health. A higher margin level generally
                    means the account has more room to handle market movement,
                    while a low margin level may lead to a margin call or forced
                    position closure.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Gold margin calculator for XAU/USD
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  Gold trading often uses a different contract structure from
                  major forex pairs. Many brokers treat 1 standard lot of gold
                  as 100 ounces. Because gold prices are high, the notional
                  value of a gold position can become large quickly, even when
                  the lot size looks small.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  Before opening a gold trade, always check the broker’s
                  contract specifications, leverage limits, and margin
                  requirements for XAU/USD. The calculator gives an estimate,
                  but the platform’s margin display should be treated as the
                  final reference before execution.
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Margin call risk: what traders should watch
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  A margin call may happen when the account no longer has enough
                  usable margin to support open positions. This usually occurs
                  when losses reduce equity and the margin level falls below the
                  broker’s required threshold.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  Traders can reduce margin call risk by using smaller position
                  sizes, avoiding excessive leverage, monitoring free margin, and
                  not opening too many correlated trades at the same time.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common margin trading mistakes
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Opening oversized positions relative to account balance.",
                    "Using maximum leverage without a risk management plan.",
                    "Ignoring free margin and margin level while trades are open.",
                    "Opening several correlated trades at the same time.",
                    "Trading gold with excessive leverage and oversized lots.",
                    "Assuming lower margin means lower risk.",
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
                  Practical margin management tips
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Keep enough free margin available after opening a trade.",
                    "Use leverage based on your trading plan, not only because it is available.",
                    "Check margin level before adding new positions.",
                    "Reduce lot size if the required margin is too high.",
                    "Understand your broker’s margin call and stop-out rules.",
                    "Use a risk calculator together with a margin calculator.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg sm:rounded-3xl sm:p-6"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3 text-left">
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
                  Related Trading Calculators
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Forex Risk Calculator", "/en/tools/risk-calculator"],
                    ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
                    ["Pip Value Calculator", "/en/tools/pip-calculator"],
                    ["Profit & Loss Calculator", "/en/tools/profit-calculator"],
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
                  Show full margin guide
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
            Forex Margin Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a Forex Margin Calculator?",
                a: "A Forex Margin Calculator estimates how much margin is required to open a forex or gold position based on trade size, leverage, and market price.",
              },
              {
                q: "How is required margin calculated?",
                a: "Required margin is usually calculated by dividing the notional position value by the leverage ratio.",
              },
              {
                q: "Does higher leverage reduce margin requirements?",
                a: "Yes. Higher leverage usually reduces the margin required for the same position size, but it can also increase the risk of overexposure.",
              },
              {
                q: "How much margin is needed for 1 lot EUR/USD?",
                a: "It depends on the current EUR/USD price and leverage. For example, at 1.0800 with 1:100 leverage, the estimated required margin is about $1,080.",
              },
              {
                q: "Is margin the same as risk?",
                a: "No. Margin is the amount locked by the broker to open a trade. Risk is the amount you may lose if the market moves against you.",
              },
              {
                q: "What happens if margin level drops too low?",
                a: "The broker may issue a margin call or close positions automatically if the margin level falls below the broker’s required threshold.",
              },
              {
                q: "Can I use this calculator for gold?",
                a: "Yes. You can estimate XAU/USD margin using the gold option, but always verify the final margin requirement inside your trading platform.",
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