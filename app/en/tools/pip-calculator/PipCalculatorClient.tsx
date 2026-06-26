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
    pipSize: number;
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
    pipSize: 0.0001,
    defaultPrice: "1.0800",
    priceLabel: "Current EUR/USD price",
    pricePlaceholder: "Example: 1.0800",
    calculationType: "quote-usd",
    note: "For EUR/USD, the quote currency is USD, so 1 standard lot usually equals about $10 per pip.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.2700",
    priceLabel: "Current GBP/USD price",
    pricePlaceholder: "Example: 1.2700",
    calculationType: "quote-usd",
    note: "For GBP/USD, 1 standard lot equals 100,000 units, and the pip value is usually about $10 per pip.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.6600",
    priceLabel: "Current AUD/USD price",
    pricePlaceholder: "Example: 0.6600",
    calculationType: "quote-usd",
    note: "For AUD/USD, pip value is direct in USD because the US dollar is the quote currency.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.6100",
    priceLabel: "Current NZD/USD price",
    pricePlaceholder: "Example: 0.6100",
    calculationType: "quote-usd",
    note: "For NZD/USD, 1 standard lot usually has an estimated pip value of about $10.",
  },
  USDCAD: {
    label: "USD/CAD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.3700",
    priceLabel: "Current USD/CAD price",
    pricePlaceholder: "Example: 1.3700",
    calculationType: "base-usd",
    note: "For USD/CAD, pip value is first calculated in CAD and then converted to USD using the current exchange rate.",
  },
  USDCHF: {
    label: "USD/CHF",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.9000",
    priceLabel: "Current USD/CHF price",
    pricePlaceholder: "Example: 0.9000",
    calculationType: "base-usd",
    note: "For USD/CHF, the pip value in USD changes as the pair price changes.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    pipSize: 0.01,
    defaultPrice: "150.00",
    priceLabel: "Current USD/JPY price",
    pricePlaceholder: "Example: 150.00",
    calculationType: "base-usd",
    note: "JPY pairs usually use 0.01 as one pip, so pip value is calculated differently than most 4-decimal forex pairs.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    pipSize: 0.01,
    defaultPrice: "2350",
    priceLabel: "Current gold price",
    pricePlaceholder: "Example: 2350",
    calculationType: "gold",
    note: "For gold, this calculator assumes 1 lot equals 100 ounces and 0.01 is the price movement used for pip-value estimation. Broker specifications may vary.",
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
    maximumFractionDigits: 4,
  }).format(value);
}

export default function PipCalculatorClient() {
  const [instrument, setInstrument] = useState<InstrumentKey>("EURUSD");
  const [lotSize, setLotSize] = useState("1");
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
    const lots = Number(lotSize);
    const marketPrice = Number(price);

    if (!Number.isFinite(lots) || !Number.isFinite(marketPrice)) return null;
    if (lots <= 0 || marketPrice <= 0) return null;

    let pipValue = 0;

    if (current.calculationType === "quote-usd") {
      pipValue = lots * current.contractSize * current.pipSize;
    }

    if (current.calculationType === "base-usd") {
      pipValue = (lots * current.contractSize * current.pipSize) / marketPrice;
    }

    if (current.calculationType === "gold") {
      pipValue = lots * current.contractSize * current.pipSize;
    }

    return {
      pipValue,
      tenPips: pipValue * 10,
      fiftyPips: pipValue * 50,
      hundredPips: pipValue * 100,
      contractValue: lots * current.contractSize,
      pipSize: current.pipSize,
    };
  }, [lotSize, price, current]);

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
                Forex Pip Value Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate pip value in USD for forex pairs and gold based on
                lot size, instrument, contract size, and current market price.
                Use it to estimate how much each pip movement is worth before
                entering a trade.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  Calculate pip value
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Read the pip value guide
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="rounded-[1.5rem] border border-brand-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">
                <p className="text-sm font-bold text-brand-600">
                  Quick example
                </p>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Instrument
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      EUR/USD
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Position size
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1 lot
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Pip value
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      About $10
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  The example assumes a standard lot of 100,000 units and a pip
                  size of 0.0001 on EUR/USD.
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
                  Pip Value Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Calculate the value of one pip in USD using lot size, forex
                  pair, current exchange rate, and contract size. This helps
                  estimate potential profit or loss before opening a position.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate pip value by pair and lot size.
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
                    Position size in lots
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
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-left text-base font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 sm:py-4"
                    placeholder={current.pricePlaceholder}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-950 sm:text-base"
              >
                Calculate pip value now
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
  Results are estimates and may vary by broker, contract size,
  pricing format, and account currency.
</p>

{/* Desktop only */}
<div className="mt-5 hidden rounded-2xl border border-slate-200 bg-white p-4 lg:block">
  <p className="mb-3 text-center text-sm font-extrabold text-slate-900">
    Related Trading Calculators
  </p>

  <div className="grid grid-cols-2 gap-2">
    <a
      href="/en/tools/risk-calculator"
      className="rounded-xl border border-slate-200 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:bg-brand-50 hover:text-brand-600"
    >
      Risk Calculator
    </a>

    <a
      href="/en/tools/margin-calculator"
      className="rounded-xl border border-slate-200 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:bg-brand-50 hover:text-brand-600"
    >
      Margin Calculator
    </a>

    <a
      href="/en/tools/lot-size-calculator"
      className="rounded-xl border border-slate-200 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:bg-brand-50 hover:text-brand-600"
    >
      Lot Size Calculator
    </a>

    <a
      href="/en/tools/profit-calculator"
      className="rounded-xl border border-slate-200 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:bg-brand-50 hover:text-brand-600"
    >
      Profit & Loss Calculator
    </a>
  </div>

  <p className="mt-3 text-center text-xs text-slate-500">
    Use these calculators together for better trade planning.
  </p>
</div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-brand-600">
                    Calculation result
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                    Pip value summary
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
                      Value of 1 pip
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.pipValue)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      For a price move of {numberFormat(result.pipSize)}.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-slate-500 sm:text-sm">
                      Value of 10 pips
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.tenPips)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-2 sm:leading-6">
                      Useful for estimating small market moves.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-brand-50 p-3 sm:p-4">
                    <p className="text-xs font-bold text-brand-600 sm:text-sm">
                      Value of 50 pips
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 sm:mt-2 sm:text-3xl">
                      {money(result.fiftyPips)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-2 sm:leading-6">
                      Useful for stop-loss and take-profit planning.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:col-span-3 sm:p-4 lg:col-span-1">
                    <div className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          Value of 100 pips
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {money(result.hundredPips)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          Contract size used
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {numberFormat(result.contractValue)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          Selected instrument
                        </p>
                        <p className="mt-1 font-extrabold text-slate-950">
                          {current.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    Enter your trade details and click calculate to see pip
                    value here.
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
              Updated June 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              Forex Pip Value Guide for Traders
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Pip value is one of the most important numbers a trader should
              know before opening a position. It tells you how much money one
              pip of market movement is worth based on the forex pair, lot size,
              contract size, and current exchange rate.
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
                  How is pip value calculated?
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-5 sm:items-center">
                  {[
                    "Instrument",
                    "Lot size",
                    "Contract size",
                    "Pip size",
                    "Pip value",
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
                  For most major forex pairs, one pip is 0.0001. For JPY pairs,
                  one pip is usually 0.01. The calculator uses the selected
                  instrument, lot size, contract size, and current price to
                  estimate the pip value in USD.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Pip
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is a pip in forex?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    A pip is a standard unit used to measure price movement in
                    forex trading. In pairs such as EUR/USD and GBP/USD, one pip
                    is usually 0.0001. In JPY pairs such as USD/JPY, one pip is
                    usually 0.01.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Lot Size
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why does lot size matter?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Lot size directly affects pip value. A 10-pip move on a
                    1-lot trade is much larger than the same 10-pip move on a
                    0.10-lot or 0.01-lot position.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    Formula
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Pip value formula
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    Pip value = Lot size × Contract size × Pip size
                    <br />
                    For USD/JPY and similar pairs, divide by the current price
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Pip value examples by lot size
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">Instrument</th>
                        <th className="p-4 font-extrabold">Lot size</th>
                        <th className="p-4 font-extrabold">Pip size</th>
                        <th className="p-4 font-extrabold">Pip value</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["EUR/USD", "1.00", "0.0001", "$10"],
                        ["EUR/USD", "0.10", "0.0001", "$1"],
                        ["EUR/USD", "0.01", "0.0001", "$0.10"],
                        ["USD/JPY", "1.00", "0.01", "$6.67"],
                        ["Gold", "1.00", "0.01", "About $1"],
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
                      instrument: "EUR/USD",
                      lot: "1.00",
                      pip: "0.0001",
                      value: "$10",
                      note: "Standard lot",
                    },
                    {
                      instrument: "EUR/USD",
                      lot: "0.10",
                      pip: "0.0001",
                      value: "$1",
                      note: "Mini lot",
                    },
                    {
                      instrument: "EUR/USD",
                      lot: "0.01",
                      pip: "0.0001",
                      value: "$0.10",
                      note: "Micro lot",
                    },
                    {
                      instrument: "USD/JPY",
                      lot: "1.00",
                      pip: "0.01",
                      value: "$6.67",
                      note: "At price 150",
                    },
                    {
                      instrument: "Gold",
                      lot: "1.00",
                      pip: "0.01",
                      value: "About $1",
                      note: "Depends on contract size",
                    },
                  ].map((row) => (
                    <div
                      key={`${row.instrument}-${row.lot}`}
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
                          <span className="text-slate-500">Lot</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.lot}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Pip size</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.pip}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Value</span>
                          <div className="mt-1 font-extrabold leading-6 text-brand-600">
                            {row.value}
                          </div>
                          <div className="mt-1 text-xs font-bold text-slate-400">
                            {row.note}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  These examples are approximate and are designed to explain the
                  calculation. Actual pip value may vary depending on account
                  currency, broker contract size, and price format.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why is pip value important?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Pip value helps traders estimate potential profit or loss
                    before entering a trade. If one pip is worth $10, a 20-pip
                    move equals approximately $200 in profit or loss.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    This is why pip value should be checked before choosing lot
                    size, setting a stop loss, or calculating a trade’s risk.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Pip value and risk management
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    Once you know the pip value, you can estimate potential loss
                    by multiplying it by the stop-loss distance. For example, if
                    pip value is $2 and your stop loss is 50 pips, the estimated
                    loss is about $100.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Gold pip value calculator for XAU/USD
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  Gold is different from standard forex pairs because contract
                  size and price increments can vary by broker. This calculator
                  assumes 1 lot of gold equals 100 ounces and uses 0.01 as the
                  price movement for pip-value estimation.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  Always check your broker’s XAU/USD contract specifications
                  inside the trading platform before using pip value for final
                  position sizing.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common pip value mistakes
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Using the same pip value for every currency pair.",
                    "Treating JPY pairs the same as 4-decimal forex pairs.",
                    "Ignoring gold contract size and broker specifications.",
                    "Calculating pip value without checking real lot size.",
                    "Confusing pip and point in the trading platform.",
                    "Ignoring account currency when converting pip value.",
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
                  Tips for using a pip value calculator
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Use the current market price for pairs such as USD/JPY and USD/CAD.",
                    "Check broker contract size before relying on the final result.",
                    "Connect pip value with your stop-loss distance before trading.",
                    "Use this calculator together with a risk calculator.",
                    "Understand the difference between standard, mini, and micro lots.",
                    "Do not use pip value without a clear risk management plan.",
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

              <section className="rounded-3xl border border-brand-100 bg-brand-50 p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Related Trading Calculators
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Forex Risk Calculator", "/en/tools/risk-calculator"],
                    ["Margin Calculator", "/en/tools/margin-calculator"],
                    ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
                    ["Profit & Loss Calculator", "/en/tools/profit-calculator"],
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
                  Show full pip value guide
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
            Pip Value Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a Pip Value Calculator?",
                a: "A Pip Value Calculator estimates how much one pip is worth based on the forex pair, lot size, contract size, and current market price.",
              },
              {
                q: "How much is one pip worth on EUR/USD?",
                a: "For 1 standard lot of EUR/USD, one pip is usually worth about $10. For 0.10 lot, it is about $1.",
              },
              {
                q: "Why is pip value different on USD/JPY?",
                a: "JPY pairs usually use 0.01 as one pip, and pip value must be converted using the current USD/JPY exchange rate.",
              },
              {
                q: "Can I use this calculator for gold?",
                a: "Yes. You can estimate XAU/USD pip value, but you should always verify gold contract size and price increments with your broker.",
              },
              {
                q: "Is pip value the same for every pair?",
                a: "No. Pip value changes based on the pair, lot size, market price, contract size, and account currency.",
              },
              {
                q: "How do I use pip value in risk management?",
                a: "Multiply pip value by your stop-loss distance to estimate the potential loss before opening a trade.",
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