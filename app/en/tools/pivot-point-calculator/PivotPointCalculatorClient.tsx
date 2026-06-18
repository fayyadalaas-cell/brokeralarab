"use client";

import { useMemo, useState } from "react";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 5,
  }).format(value);
}

const exampleRows = [
  {
    high: "1.2750",
    low: "1.2650",
    close: "1.2700",
    pivot: "1.2700",
    r1: "1.2750",
    s1: "1.2650",
  },
  {
    high: "2040",
    low: "2020",
    close: "2030",
    pivot: "2030",
    r1: "2040",
    s1: "2020",
  },
  {
    high: "185.50",
    low: "181.00",
    close: "183.25",
    pivot: "183.25",
    r1: "185.50",
    s1: "181.00",
  },
];

export default function PivotPointCalculatorClient() {
  const [highPrice, setHighPrice] = useState("1.2750");
  const [lowPrice, setLowPrice] = useState("1.2650");
  const [closePrice, setClosePrice] = useState("1.2700");
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const result = useMemo(() => {
    const high = Number(highPrice);
    const low = Number(lowPrice);
    const close = Number(closePrice);

    if (
      !Number.isFinite(high) ||
      !Number.isFinite(low) ||
      !Number.isFinite(close)
    ) {
      return null;
    }

    if (high <= 0 || low <= 0 || close <= 0 || high <= low) {
      return null;
    }

    if (close > high || close < low) {
      return null;
    }

    const pivot = (high + low + close) / 3;

    const r1 = 2 * pivot - low;
    const s1 = 2 * pivot - high;

    const r2 = pivot + (high - low);
    const s2 = pivot - (high - low);

    const r3 = high + 2 * (pivot - low);
    const s3 = low - 2 * (high - pivot);

    const range = high - low;

    let bias = "Neutral Market Structure";
    let biasText =
      "The closing price is relatively close to the central pivot point, suggesting a balanced market environment.";

    if (close > pivot) {
      bias = "Bullish Bias";
      biasText =
        "The closing price is above the pivot point, which may indicate bullish sentiment. Traders often monitor resistance levels as potential upside targets.";
    }

    if (close < pivot) {
      bias = "Bearish Bias";
      biasText =
        "The closing price is below the pivot point, which may indicate bearish sentiment. Traders often monitor support levels as potential downside targets.";
    }

    return {
      high,
      low,
      close,
      range,
      pivot,
      levels: [
        {
          name: "R3",
          label: "Third Resistance",
          value: r3,
        },
        {
          name: "R2",
          label: "Second Resistance",
          value: r2,
        },
        {
          name: "R1",
          label: "First Resistance",
          value: r1,
        },
        {
          name: "PP",
          label: "Pivot Point",
          value: pivot,
        },
        {
          name: "S1",
          label: "First Support",
          value: s1,
        },
        {
          name: "S2",
          label: "Second Support",
          value: s2,
        },
        {
          name: "S3",
          label: "Third Support",
          value: s3,
        },
      ],
      bias,
      biasText,
    };
  }, [highPrice, lowPrice, closePrice]);

  function handleCalculate() {
    setShowResult(true);
  }

  return (
    <main className="min-h-screen bg-[#f3f7fb] text-slate-900">
      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">

        {/* HERO */}

        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">

            <div className="p-5 text-center sm:p-10 lg:p-12 lg:text-left">

              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 sm:px-4 sm:py-1.5 sm:text-sm">
                Trading & Technical Analysis Tools
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-snug text-slate-950 sm:mt-5 sm:max-w-3xl sm:text-5xl sm:leading-tight">
                Pivot Point Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate daily Pivot Point levels, support levels, and
                resistance levels using the classic Pivot Point formula.
                Traders use Pivot Points to identify potential market direction,
                key price zones, breakout areas, and intraday trading
                opportunities in Forex, stocks, gold, indices, and
                cryptocurrencies.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  Calculate Pivot Points
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Learn Pivot Point Trading
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">

              <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6">

                <p className="text-sm font-bold text-blue-700">
                  Quick Example
                </p>

                <div className="mt-5 grid gap-3">

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Daily High
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1.2750
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Daily Low
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-blue-700">
                      1.2650
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      Pivot Point (PP)
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      1.2700
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Example based on the classic Pivot Point formula using the
                  previous session's high, low, and close prices.
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
                  Daily Pivot Point Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Enter the previous session's high, low, and closing price to
                  calculate Pivot Point (PP), support levels (S1, S2, S3), and
                  resistance levels (R1, R2, R3) using the classic Pivot Point
                  formula.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate Pivot Points, support, and resistance levels.
                </p>
              </div>
            </div>
          </div>

          <div className="grid items-start gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
            {/* FORM */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 sm:rounded-[2rem] sm:p-6 lg:self-start">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    High Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={highPrice}
                    onChange={(e) => setHighPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1.2750"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Low Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={lowPrice}
                    onChange={(e) => setLowPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1.2650"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Close Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={closePrice}
                    onChange={(e) => setClosePrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1.2700"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                Calculate Pivot Points
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Pivot Point levels are technical reference zones and should not
                be considered guaranteed trading signals.
              </p>

              <div className="mt-6 hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-sm lg:block">
                <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-blue-700">
                  Related Tools
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/en/tools/fibonacci-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Fibonacci Calculator
                  </a>

                  <a
                    href="/en/tools/pip-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Pip Calculator
                  </a>

                  <a
                    href="/en/tools/profit-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Profit Calculator
                  </a>

                  <a
                    href="/en/tools/risk-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Risk Calculator
                  </a>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3">
                <p className="text-xs font-bold text-blue-700">
                  Calculation Result
                </p>

                <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                  Pivot Point Summary
                </h3>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      Central Pivot Point (PP)
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {formatPrice(result.pivot)}
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      The main reference level used to calculate support and
                      resistance zones.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Price Range
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {formatPrice(result.range)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">
                        Closing Price
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {formatPrice(result.close)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      Market Bias
                    </p>

                    <p className="mt-2 text-xl font-extrabold text-blue-700">
                      {result.bias}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.biasText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    Enter the high, low, and close price to calculate Pivot
                    Point levels and identify potential support and resistance
                    zones.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  Please enter valid values. The high price must be greater than
                  the low price, and the closing price must be within the range.
                </div>
              )}
            </div>
          </div>

          {/* LEVELS TABLE */}
          {showResult && result && (
            <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-8 lg:p-10">
              <h3 className="text-center text-xl font-extrabold text-slate-950 sm:text-2xl">
                Pivot Point Levels Table
              </h3>

              <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-600">
                The table below displays support levels, resistance levels, and
                the central Pivot Point calculated using the classic Pivot Point
                methodology.
              </p>

              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4 font-extrabold">Level</th>
                      <th className="p-4 font-extrabold">Description</th>
                      <th className="p-4 font-extrabold">Price</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {result.levels.map((row) => (
                      <tr key={row.name} className="transition hover:bg-blue-50">
                        <td className="p-4 font-extrabold text-blue-700">
                          {row.name}
                        </td>

                        <td className="p-4 font-bold text-slate-700">
                          {row.label}
                        </td>

                        <td className="p-4 font-extrabold text-slate-950">
                          {formatPrice(row.value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4 md:hidden">
                {result.levels.map((row) => (
                  <div
                    key={row.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">Level</span>

                        <div className="mt-1 font-extrabold text-blue-700">
                          {row.name}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500">Price</span>

                        <div className="mt-1 font-extrabold text-slate-950">
                          {formatPrice(row.value)}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <span className="text-slate-500">Description</span>

                        <div className="mt-1 font-bold text-slate-700">
                          {row.label}
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
            <p className="text-sm font-bold text-blue-700">
              Last updated: June 2026
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-slate-950 sm:text-3xl">
              Pivot Points, Support and Resistance Levels Explained
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Pivot Points are widely used by day traders and technical analysts
              to map potential support and resistance levels before the trading
              session begins. The classic Pivot Point formula uses the previous
              session&apos;s high, low, and close to calculate a central Pivot
              Point, then builds resistance levels above it and support levels
              below it.
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
                  How are Pivot Points calculated?
                </h3>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                  PP = (High + Low + Close) ÷ 3
                  <br />
                  R1 = (2 × PP) - Low
                  <br />
                  S1 = (2 × PP) - High
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  The calculator first finds the central Pivot Point by averaging
                  the high, low, and closing price from the previous period.
                  From that central level, it calculates the first, second, and
                  third resistance levels above the market, as well as the first,
                  second, and third support levels below the market.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    PP
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is the Pivot Point?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    The Pivot Point is the central reference level traders use to
                    judge whether price is trading above or below the previous
                    session&apos;s balanced price area.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    R1 / R2 / R3
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What are resistance levels?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Resistance levels are price zones above the Pivot Point where
                    buyers may slow down, sellers may appear, or price may test
                    possible breakout areas.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                    S1 / S2 / S3
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What are support levels?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                    Support levels are price zones below the Pivot Point where
                    sellers may slow down, buyers may react, or price may test
                    possible downside targets.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Pivot Point calculation examples
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  The examples below show how the classic Pivot Point method can
                  be applied to Forex pairs, gold, and stocks using the previous
                  period&apos;s high, low, and close prices.
                </p>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">High</th>
                        <th className="p-4 font-extrabold">Low</th>
                        <th className="p-4 font-extrabold">Close</th>
                        <th className="p-4 font-extrabold">PP</th>
                        <th className="p-4 font-extrabold">R1</th>
                        <th className="p-4 font-extrabold">S1</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {exampleRows.map((row) => (
                        <tr
                          key={`${row.high}-${row.low}-${row.close}`}
                          className="transition hover:bg-blue-50"
                        >
                          <td className="p-4 font-bold text-slate-700">
                            {row.high}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.low}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.close}
                          </td>
                          <td className="p-4 font-extrabold text-blue-700">
                            {row.pivot}
                          </td>
                          <td className="p-4 font-extrabold text-blue-700">
                            {row.r1}
                          </td>
                          <td className="p-4 font-extrabold text-blue-700">
                            {row.s1}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 space-y-4 md:hidden">
                  {exampleRows.map((row) => (
                    <div
                      key={`${row.high}-${row.low}-${row.close}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">High</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.high}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Low</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.low}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">PP</span>
                          <div className="mt-1 font-extrabold text-blue-700">
                            {row.pivot}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">R1 / S1</span>
                          <div className="mt-1 font-extrabold text-blue-700">
                            {row.r1} / {row.s1}
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
                    How traders use Pivot Points
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Many traders use Pivot Points as a daily price map. When
                    price trades above the central Pivot Point, they may watch
                    R1, R2, and R3 as potential resistance levels or upside
                    targets. When price trades below the Pivot Point, they may
                    watch S1, S2, and S3 as potential support levels or downside
                    targets.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Pivot Points are especially popular among intraday traders
                    because they provide clear levels before the session starts.
                    However, the levels are more useful when combined with trend
                    direction, price action, market structure, volume, and major
                    economic news.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Are Pivot Points useful for day trading?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    Yes. Pivot Points are widely used in day trading because they
                    convert the previous session&apos;s data into clear support
                    and resistance levels for the current session. They are often
                    used in Forex, gold, stock index, and commodity trading.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common mistakes when using Pivot Points
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Using Pivot Points as standalone buy or sell signals.",
                    "Entering a trade only because price reached R1 or S1.",
                    "Using incorrect high, low, or closing price data.",
                    "Ignoring strong economic news and market volatility.",
                    "Applying intraday Pivot Points without checking the broader trend.",
                    "Trading without a clear stop-loss and risk management plan.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:text-red-700 hover:shadow-lg sm:rounded-3xl sm:p-6"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3">
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
                  Tips for using this Pivot Point calculator
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Use accurate high, low, and close data from the previous session.",
                    "Watch how price reacts around the central Pivot Point first.",
                    "Combine Pivot Points with support, resistance, and trend direction.",
                    "Do not treat every Pivot Point level as an automatic entry signal.",
                    "Use position sizing and risk management before opening any trade.",
                    "Update the levels at the start of each new session or trading day.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg sm:rounded-3xl sm:p-6"
                    >
                      <div className="grid grid-cols-[32px_1fr] items-center gap-3">
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
                  Related trading calculators
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Fibonacci Calculator", "/en/tools/fibonacci-calculator"],
                    ["Pip Calculator", "/en/tools/pip-calculator"],
                    ["Profit Calculator", "/en/tools/profit-calculator"],
                    ["Risk Calculator", "/en/tools/risk-calculator"],
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
                  Read More
                </button>
              </div>
            )}

            {showGuideMore && (
              <button
                type="button"
                onClick={() => setShowGuideMore(false)}
                className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 lg:hidden"
              >
                Show Less
              </button>
            )}
          </div>
        </article>

        {/* FAQ */}
        <section className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:rounded-[2rem] sm:p-8 lg:p-10">
          <h2 className="text-center text-2xl font-extrabold leading-snug text-slate-950 sm:text-left lg:text-3xl">
            Pivot Point Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a Pivot Point calculator?",
                a: "A Pivot Point calculator is a tool that calculates the central Pivot Point and support and resistance levels using the previous session's high, low, and close prices.",
              },
              {
                q: "What is the classic Pivot Point formula?",
                a: "The classic formula is PP = (High + Low + Close) ÷ 3. Support and resistance levels are then calculated from the central Pivot Point.",
              },
              {
                q: "What do R1, R2, and R3 mean?",
                a: "R1, R2, and R3 are resistance levels above the central Pivot Point. Traders may use them as potential upside targets or areas where price could slow down.",
              },
              {
                q: "What do S1, S2, and S3 mean?",
                a: "S1, S2, and S3 are support levels below the central Pivot Point. Traders may watch them as potential downside targets or areas where buyers could react.",
              },
              {
                q: "Can Pivot Points be used in Forex trading?",
                a: "Yes. Pivot Points are commonly used in Forex trading, but they can also be applied to gold, indices, stocks, commodities, and cryptocurrencies.",
              },
              {
                q: "Are Pivot Point levels guaranteed?",
                a: "No. Pivot Point levels are technical reference zones only. They do not guarantee that price will reverse, break out, or continue from a specific level.",
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
