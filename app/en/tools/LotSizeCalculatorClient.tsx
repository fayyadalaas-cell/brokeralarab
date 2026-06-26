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
    defaultStopLoss: string;
    stopLabel: string;
    stopPlaceholder: string;
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
    defaultStopLoss: "50",
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    priceLabel: "Current EUR/USD price",
    pricePlaceholder: "Example: 1.0800",
    calculationType: "quote-usd",
    note: "For EUR/USD, 1 standard lot usually has a pip value of about $10.",
  },
  GBPUSD: {
    label: "GBP/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.2700",
    defaultStopLoss: "50",
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    priceLabel: "Current GBP/USD price",
    pricePlaceholder: "Example: 1.2700",
    calculationType: "quote-usd",
    note: "For GBP/USD, 1 standard lot usually equals about $10 per pip.",
  },
  AUDUSD: {
    label: "AUD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.6600",
    defaultStopLoss: "50",
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    priceLabel: "Current AUD/USD price",
    pricePlaceholder: "Example: 0.6600",
    calculationType: "quote-usd",
    note: "For AUD/USD, pip value is direct in USD because USD is the quote currency.",
  },
  NZDUSD: {
    label: "NZD/USD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.6100",
    defaultStopLoss: "50",
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    priceLabel: "Current NZD/USD price",
    pricePlaceholder: "Example: 0.6100",
    calculationType: "quote-usd",
    note: "For NZD/USD, 1 standard lot usually has a pip value of about $10.",
  },
  USDCAD: {
    label: "USD/CAD",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "1.3700",
    defaultStopLoss: "50",
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    priceLabel: "Current USD/CAD price",
    pricePlaceholder: "Example: 1.3700",
    calculationType: "base-usd",
    note: "For USD/CAD, pip value is converted to USD using the current exchange rate.",
  },
  USDCHF: {
    label: "USD/CHF",
    contractSize: 100000,
    pipSize: 0.0001,
    defaultPrice: "0.9000",
    defaultStopLoss: "50",
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    priceLabel: "Current USD/CHF price",
    pricePlaceholder: "Example: 0.9000",
    calculationType: "base-usd",
    note: "For USD/CHF, pip value in USD changes depending on the current pair price.",
  },
  USDJPY: {
    label: "USD/JPY",
    contractSize: 100000,
    pipSize: 0.01,
    defaultPrice: "150.00",
    defaultStopLoss: "50",
    stopLabel: "Stop loss in pips",
    stopPlaceholder: "Example: 50",
    priceLabel: "Current USD/JPY price",
    pricePlaceholder: "Example: 150.00",
    calculationType: "base-usd",
    note: "JPY pairs usually use 0.01 as one pip, so pip value is converted using the current USD/JPY price.",
  },
  XAUUSD: {
    label: "Gold / XAUUSD",
    contractSize: 100,
    pipSize: 0.01,
    defaultPrice: "2350",
    defaultStopLoss: "5",
    stopLabel: "Gold stop-loss distance",
    stopPlaceholder: "Example: 5",
    priceLabel: "Current gold price",
    pricePlaceholder: "Example: 2350",
    calculationType: "gold",
    note: "For gold, this calculator assumes 1 lot equals 100 ounces and uses 0.01 as the price movement for pip-value estimation.",
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

function lotFormat(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0.00";
  return value.toFixed(2);
}

export default function LotSizeCalculatorClient() {
  const [balance, setBalance] = useState("1000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [instrument, setInstrument] = useState<InstrumentKey>("EURUSD");
  const [price, setPrice] = useState(instruments.EURUSD.defaultPrice);
  const [stopLoss, setStopLoss] = useState(instruments.EURUSD.defaultStopLoss);
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const current = instruments[instrument];

  function handleInstrumentChange(value: InstrumentKey) {
    setInstrument(value);
    setPrice(instruments[value].defaultPrice);
    setStopLoss(instruments[value].defaultStopLoss);
    setShowResult(false);
  }

  const result = useMemo(() => {
    const accountBalance = Number(balance);
    const risk = Number(riskPercent);
    const marketPrice = Number(price);
    const stop = Number(stopLoss);

    if (
      !Number.isFinite(accountBalance) ||
      !Number.isFinite(risk) ||
      !Number.isFinite(marketPrice) ||
      !Number.isFinite(stop)
    ) {
      return null;
    }

    if (accountBalance <= 0 || risk <= 0 || marketPrice <= 0 || stop <= 0) {
      return null;
    }

    const riskAmount = accountBalance * (risk / 100);

    let pipValuePerOneLot = 0;

    if (current.calculationType === "quote-usd") {
      pipValuePerOneLot = current.contractSize * current.pipSize;
    }

    if (current.calculationType === "base-usd") {
      pipValuePerOneLot =
        (current.contractSize * current.pipSize) / marketPrice;
    }

    if (current.calculationType === "gold") {
      pipValuePerOneLot = current.contractSize * current.pipSize;
    }

    const lotSize = riskAmount / (stop * pipValuePerOneLot);
    const pipValueForSuggestedLot = pipValuePerOneLot * lotSize;
    const estimatedLoss = stop * pipValueForSuggestedLot;

    if (!Number.isFinite(lotSize) || lotSize <= 0) return null;

    let lotStatus = "Conservative position size";
    let lotText =
      "The suggested lot size is conservative if your risk percentage is low and your stop loss is clearly defined.";

    if (risk > 2 && risk <= 5) {
      lotStatus = "Moderate risk position";
      lotText =
        "This position size requires more caution. Make sure the risk fits your account size and trading plan.";
    }

    if (risk > 5) {
      lotStatus = "High risk position";
      lotText =
        "The selected risk percentage is high and may lead to large losses if the stop loss is reached.";
    }

    return {
      riskAmount,
      pipValuePerOneLot,
      lotSize,
      pipValueForSuggestedLot,
      estimatedLoss,
      lotStatus,
      lotText,
      stop,
      risk,
    };
  }, [balance, riskPercent, price, stopLoss, current]);

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
                Forex Lot Size Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate the right lot size for forex and gold trades based on
                account balance, risk percentage, stop-loss distance, and pip
                value. Use it to plan position size before entering the market.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                >
                  Calculate lot size
                </a>
                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Read the position sizing guide
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
                      Account balance
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      $1,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">Risk</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1% = $10
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Suggested lot size
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      0.02 lots
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  This example assumes a 50-pip stop loss on EUR/USD and a $10
                  pip value for 1 standard lot.
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
                  Lot Size Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Calculate position size using risk amount, stop-loss distance,
                  and pip value. This helps estimate how many lots to trade
                  without exceeding your planned risk.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate lot size from risk and stop loss.
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
                    Risk percentage %
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
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
                    {current.stopLabel}
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder={current.stopPlaceholder}
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
                Calculate lot size now
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Results are estimates and may vary by broker, contract size,
                pricing format, and account currency.
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
                    Suggested lot size
                  </h3>
                </div>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
                    <p className="text-xs font-bold text-brand-600">
                      Recommended position size
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {lotFormat(result.lotSize)}
                    </p>

                    <p className="mt-2 text-xs text-slate-600">
                      Suggested lot size based on your selected risk.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Risk amount
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.riskAmount)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Pip value
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {money(result.pipValueForSuggestedLot)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          Stop-loss distance
                        </p>

                        <p className="mt-1 font-extrabold text-slate-950">
                          {numberFormat(result.stop)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500">
                          Estimated loss
                        </p>

                        <p className="mt-1 font-extrabold text-slate-950">
                          {money(result.estimatedLoss)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      {result.lotStatus}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.lotText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    Enter your account details and click calculate to see the
                    suggested lot size.
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
              Forex Position Size and Lot Size Guide
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Position sizing is one of the most important parts of forex risk
              management. A lot size calculator helps traders calculate how many
              lots to trade based on account balance, risk percentage, stop-loss
              distance, and pip value instead of choosing a random trade size.
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
                  How does the lot size calculator work?
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
                  The calculator first determines the dollar amount you are
                  willing to risk. Then it divides that risk amount by the
                  stop-loss distance and pip value to estimate the appropriate
                  lot size for the trade.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Position Size
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is lot size in forex?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Lot size is the trade volume used in forex trading. A
                    standard lot is usually 100,000 units, a mini lot is 10,000
                    units, and a micro lot is 1,000 units. The larger the lot
                    size, the higher the pip value and risk exposure.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-brand-600">
                    Risk Control
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Why position sizing matters
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    A good trade idea can still become risky if the lot size is
                    too large. Position sizing connects your trade size to your
                    account balance, stop loss, and risk percentage.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600">
                    Formula
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Lot size formula
                  </h3>

                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                    Risk amount = Account balance × Risk %
                    <br />
                    Lot size = Risk amount ÷ Stop loss ÷ Pip value
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Lot size calculation examples
                </h3>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">Account balance</th>
                        <th className="p-4 font-extrabold">Risk</th>
                        <th className="p-4 font-extrabold">Stop loss</th>
                        <th className="p-4 font-extrabold">Suggested lot</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["$1,000", "1% = $10", "50 pips", "0.02"],
                        ["$2,000", "1% = $20", "50 pips", "0.04"],
                        ["$5,000", "2% = $100", "50 pips", "0.20"],
                        ["$10,000", "1% = $100", "100 pips", "0.10"],
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

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  These examples assume that the pip value for 1 standard lot on
                  EUR/USD is about $10. Actual results can change depending on
                  the pair, market price, account currency, and broker contract
                  size.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Standard lot, mini lot, and micro lot
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    A standard lot usually represents 100,000 units of the base
                    currency. A mini lot is 0.10 lots, and a micro lot is 0.01
                    lots. Smaller lots help traders control risk more easily,
                    especially on small accounts.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Beginners often use smaller lot sizes because even a small
                    price movement can create a large loss when the position
                    size is too big for the account.
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Stop loss and lot size
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    A wider stop loss usually requires a smaller lot size. This
                    is why lot size should not be calculated without knowing
                    where the stop loss will be placed.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Gold lot size calculator for XAU/USD
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  Gold trading uses different contract specifications from
                  standard forex pairs. This calculator assumes that 1 lot of
                  gold equals 100 ounces and uses 0.01 as the price movement for
                  pip-value estimation.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                  Always check your broker’s XAU/USD contract specifications in
                  the trading platform before using the result as your final
                  position size.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common lot size mistakes
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Choosing lot size based on emotion instead of risk.",
                    "Increasing position size after a losing trade.",
                    "Using the same lot size for every trade.",
                    "Ignoring pip value on non-USD quote pairs.",
                    "Opening multiple correlated trades without total risk calculation.",
                    "Relying on leverage instead of proper position sizing.",
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
                  Tips for using a lot size calculator
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Define risk percentage before choosing lot size.",
                    "Do not open a trade before setting a clear stop loss.",
                    "Use a pip value calculator for better accuracy.",
                    "Reduce lot size when stop-loss distance is wide.",
                    "Keep risk small if you are still learning.",
                    "Check broker contract specifications for gold and indices.",
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
                    ["Pip Value Calculator", "/en/tools/pip-calculator"],
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
                  Show full lot size guide
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
            Forex Lot Size Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a Forex Lot Size Calculator?",
                a: "A Forex Lot Size Calculator estimates the appropriate trade size based on account balance, risk percentage, stop-loss distance, and pip value.",
              },
              {
                q: "How is lot size calculated?",
                a: "Lot size is calculated by dividing the risk amount by the stop-loss distance and pip value.",
              },
              {
                q: "What lot size should beginners use?",
                a: "There is no fixed lot size for beginners. Many traders start with small risk, often 1% or less per trade, and calculate lot size from there.",
              },
              {
                q: "Can I use this calculator for gold?",
                a: "Yes. You can estimate gold position size, but you should always check your broker’s XAU/USD contract specifications.",
              },
              {
                q: "Should I use the same lot size for every trade?",
                a: "No. Lot size should change based on stop-loss distance, pip value, account size, and risk percentage.",
              },
              {
                q: "Why is position sizing important?",
                a: "Position sizing controls how much money is at risk on each trade and is a key part of risk management.",
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