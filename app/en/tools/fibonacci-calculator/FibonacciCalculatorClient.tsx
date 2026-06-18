"use client";

import { useMemo, useState } from "react";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 5,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

const retracementLevels = [23.6, 38.2, 50, 61.8, 78.6];
const extensionLevels = [127.2, 161.8, 200, 261.8];

const exampleRows = [
  {
    trend: "Bullish Trend",
    high: "1.1200",
    low: "1.1000",
    level: "61.8%",
    value: "1.10764",
  },
  {
    trend: "Bearish Trend",
    high: "1.1200",
    low: "1.1000",
    level: "38.2%",
    value: "1.10764",
  },
  {
    trend: "Bullish Extension",
    high: "1.1200",
    low: "1.1000",
    level: "161.8%",
    value: "1.13236",
  },
];

export default function FibonacciCalculatorClient() {
  const [highPrice, setHighPrice] = useState("1.1200");
  const [lowPrice, setLowPrice] = useState("1.1000");
  const [trend, setTrend] = useState<"uptrend" | "downtrend">("uptrend");
  const [showResult, setShowResult] = useState(false);
  const [showGuideMore, setShowGuideMore] = useState(false);

  const result = useMemo(() => {
    const high = Number(highPrice);
    const low = Number(lowPrice);

    if (!Number.isFinite(high) || !Number.isFinite(low)) {
      return null;
    }

    if (high <= 0 || low <= 0 || high <= low) {
      return null;
    }

    const range = high - low;

    const retracements = retracementLevels.map((level) => {
      const value =
        trend === "uptrend"
          ? high - range * (level / 100)
          : low + range * (level / 100);

      return {
        level,
        value,
      };
    });

    const extensions = extensionLevels.map((level) => {
      const value =
        trend === "uptrend"
          ? low + range * (level / 100)
          : high - range * (level / 100);

      return {
        level,
        value,
      };
    });

    const goldenZone =
      trend === "uptrend"
        ? {
            from: high - range * 0.618,
            to: high - range * 0.5,
          }
        : {
            from: low + range * 0.5,
            to: low + range * 0.618,
          };

    return {
      high,
      low,
      range,
      retracements,
      extensions,
      goldenZone,
      trendText:
        trend === "uptrend"
          ? "The selected trend is bullish, so retracement levels are calculated below the swing high while extension levels project potential upside targets."
          : "The selected trend is bearish, so retracement levels are calculated above the swing low while extension levels project potential downside targets.",
    };
  }, [highPrice, lowPrice, trend]);

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
                Fibonacci Retracement Calculator
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:max-w-3xl sm:text-lg sm:leading-8 lg:mx-0">
                Calculate Fibonacci retracement and extension levels for Forex,
                stocks, indices, commodities, and cryptocurrencies. Identify
                potential support and resistance zones, pullback areas, and
                profit targets based on Fibonacci trading levels.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:justify-start">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  Calculate Fibonacci Levels
                </a>

                <a
                  href="#guide"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  Learn How Fibonacci Works
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
                      Swing High
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      1.1200
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      Swing Low
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-700">
                      1.1000
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      61.8% Retracement
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-800">
                      1.10764
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Example based on a bullish move from 1.1000 to 1.1200.
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
                  Fibonacci Trading Levels Calculator
                </h2>
              </div>

              <div>
                <p className="hidden max-w-2xl text-sm leading-8 text-slate-600 sm:block sm:text-base">
                  Enter the swing high, swing low, and market direction to
                  calculate Fibonacci retracement levels, Fibonacci extension
                  levels, and the golden zone used by traders to identify
                  potential support, resistance, and price targets.
                </p>

                <p className="text-center text-sm leading-7 text-slate-600 sm:hidden">
                  Calculate Fibonacci retracement and extension levels.
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
                    Swing High
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={highPrice}
                    onChange={(e) => setHighPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1.1200"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Swing Low
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={lowPrice}
                    onChange={(e) => setLowPrice(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Example: 1.1000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-extrabold text-slate-700">
                    Market Direction
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setTrend("uptrend")}
                      className={`rounded-2xl border px-4 py-3 text-sm font-extrabold transition ${
                        trend === "uptrend"
                          ? "border-blue-600 bg-blue-700 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      Bullish Trend
                    </button>

                    <button
                      type="button"
                      onClick={() => setTrend("downtrend")}
                      className={`rounded-2xl border px-4 py-3 text-sm font-extrabold transition ${
                        trend === "downtrend"
                          ? "border-blue-600 bg-blue-700 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      Bearish Trend
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-5 w-full rounded-2xl bg-blue-700 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-950"
              >
                Calculate Fibonacci Levels
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                Fibonacci levels are technical analysis zones, not guaranteed
                buy or sell signals.
              </p>

              <div className="mt-6 hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-sm lg:block">
                <h3 className="mb-3 text-center text-xs font-extrabold uppercase tracking-wide text-blue-700">
                  Related Tools
                </h3>

                <div className="grid grid-cols-2 gap-2">
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
                  <a
                    href="/en/tools/lot-size-calculator"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Lot Size Calculator
                  </a>
                </div>
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-5">
              <div className="mb-3">
                <p className="text-xs font-bold text-blue-700">Calculation Result</p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                  Fibonacci Levels Summary
                </h3>
              </div>

              {showResult && result ? (
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-700">
                      Price Range
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-blue-800">
                      {formatPrice(result.range)}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-600">
                      The difference between the swing high and swing low.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">Swing High</p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {formatPrice(result.high)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-500">Swing Low</p>
                      <p className="mt-2 text-xl font-extrabold text-slate-950">
                        {formatPrice(result.low)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      Fibonacci Golden Zone
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-blue-700">
                      {formatPrice(
                        Math.min(result.goldenZone.from, result.goldenZone.to)
                      )}{" "}
                      -{" "}
                      {formatPrice(
                        Math.max(result.goldenZone.from, result.goldenZone.to)
                      )}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      The area between 50% and 61.8% is one of the most watched
                      Fibonacci pullback zones among technical traders.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-950">
                      Direction Note
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {result.trendText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-7 text-slate-600">
                    Enter the swing high and swing low, choose the market
                    direction, and click calculate to display Fibonacci trading
                    levels.
                  </p>
                </div>
              )}

              {showResult && !result && (
                <div className="mt-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  Please enter valid values. The swing high must be greater than
                  the swing low.
                </div>
              )}
            </div>
          </div>

          {/* LEVELS TABLES */}
          {showResult && result && (
            <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-8 lg:p-10">
              <h3 className="text-center text-xl font-extrabold text-slate-950 sm:text-2xl">
                Fibonacci Levels Table
              </h3>

              <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-600">
                The table below shows Fibonacci retracement and extension levels
                based on the price swing you entered.
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 bg-white p-4">
                    <h4 className="text-center text-base font-extrabold text-slate-950">
                      Retracement Levels
                    </h4>
                  </div>

                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">Level</th>
                        <th className="p-4 font-extrabold">Price</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {result.retracements.map((row) => (
                        <tr key={row.level} className="transition hover:bg-blue-50">
                          <td className="p-4 font-bold text-slate-700">
                            {formatPercent(row.level)}
                          </td>
                          <td className="p-4 font-extrabold text-blue-700">
                            {formatPrice(row.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 bg-white p-4">
                    <h4 className="text-center text-base font-extrabold text-slate-950">
                      Extension Levels
                    </h4>
                  </div>

                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">Level</th>
                        <th className="p-4 font-extrabold">Price</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {result.extensions.map((row) => (
                        <tr key={row.level} className="transition hover:bg-blue-50">
                          <td className="p-4 font-bold text-slate-700">
                            {formatPercent(row.level)}
                          </td>
                          <td className="p-4 font-extrabold text-blue-700">
                            {formatPrice(row.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              Fibonacci Retracement and Extension Levels Explained
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Fibonacci levels are widely used in technical analysis to identify
              possible pullback zones, support and resistance areas, and price
              targets after a clear market move. Traders use Fibonacci
              retracements to study where a correction may pause, and Fibonacci
              extensions to estimate where price may move if the trend continues.
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
                  How does the Fibonacci calculator work?
                </h3>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold leading-8 text-slate-700">
                  Price range = Swing high - Swing low
                  <br />
                  Fibonacci level = Swing point ± Fibonacci percentage of the
                  price range
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  The calculator takes the swing high and swing low you enter,
                  measures the total price range, and applies common Fibonacci
                  ratios such as 23.6%, 38.2%, 50%, 61.8%, and 78.6% for
                  retracements. It also calculates extension levels such as
                  127.2%, 161.8%, 200%, and 261.8%.
                </p>
              </section>

              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    Retracement
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What are Fibonacci retracement levels?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Fibonacci retracement levels are potential pullback zones
                    where price may pause, react, or continue the previous trend
                    after a strong move.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    Extension
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What are Fibonacci extension levels?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Fibonacci extension levels help traders estimate possible
                    price targets beyond the original swing high or swing low
                    when a trend continues.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                    Risk Note
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-950 sm:text-2xl">
                    Are Fibonacci levels always accurate?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                    No. Fibonacci levels are not guaranteed signals. They should
                    be used with price action, trend structure, support and
                    resistance, and proper risk management.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Fibonacci trading examples
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  The table below shows simple examples of how Fibonacci levels
                  can appear when using a swing high and swing low from a clear
                  price move.
                </p>

                <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-4 font-extrabold">Market Move</th>
                        <th className="p-4 font-extrabold">Swing High</th>
                        <th className="p-4 font-extrabold">Swing Low</th>
                        <th className="p-4 font-extrabold">Level</th>
                        <th className="p-4 font-extrabold">Price</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {exampleRows.map((row) => (
                        <tr
                          key={`${row.trend}-${row.level}`}
                          className="transition hover:bg-blue-50"
                        >
                          <td className="p-4 font-bold text-slate-700">
                            {row.trend}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.high}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.low}
                          </td>
                          <td className="p-4 font-bold text-slate-700">
                            {row.level}
                          </td>
                          <td className="p-4 font-extrabold text-blue-700">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 space-y-4 md:hidden">
                  {exampleRows.map((row) => (
                    <div
                      key={`${row.trend}-${row.level}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">Move</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.trend}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Level</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.level}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Swing High</span>
                          <div className="mt-1 font-extrabold text-slate-900">
                            {row.high}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500">Price</span>
                          <div className="mt-1 font-extrabold text-blue-700">
                            {row.value}
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
                    Best way to use Fibonacci in trading
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Fibonacci works best when it is applied to a clear price
                    swing. In an uptrend, traders usually measure from the swing
                    low to the swing high and watch retracement levels below the
                    high. In a downtrend, traders measure from the swing high to
                    the swing low and watch retracement levels above the low.
                  </p>

                  <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                    Fibonacci levels are less reliable in choppy markets with no
                    clear direction. The cleaner the swing, the easier it is to
                    interpret potential Fibonacci support, resistance, and
                    continuation areas.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                    What is the Fibonacci golden zone?
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-700">
                    The area between the 50% and 61.8% retracement levels is
                    often called the golden zone. Many traders watch this area
                    because it can act as a key pullback zone during trending
                    markets.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                  Common mistakes when using Fibonacci levels
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Drawing Fibonacci levels on a weak or unclear price swing.",
                    "Using Fibonacci as a standalone buy or sell signal.",
                    "Entering a trade only because price reached the 61.8% level.",
                    "Ignoring the broader market trend and price structure.",
                    "Trading without a clear stop-loss and risk plan.",
                    "Confusing retracement levels with extension levels.",
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
                  Tips for using this Fibonacci calculator
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Choose the swing high and swing low from a clear market move.",
                    "Combine Fibonacci with support and resistance zones.",
                    "Watch how price reacts around the golden zone.",
                    "Do not rely on a single Fibonacci level before making a trading decision.",
                    "Use proper position sizing and risk management.",
                    "Compare Fibonacci levels with trendlines, moving averages, and previous highs or lows.",
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
                    ["Pip Calculator", "/en/tools/pip-calculator"],
                    ["Profit Calculator", "/en/tools/profit-calculator"],
                    ["Risk Calculator", "/en/tools/risk-calculator"],
                    ["Lot Size Calculator", "/en/tools/lot-size-calculator"],
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
            Fibonacci Calculator FAQ
          </h2>

          <div className="mt-5 grid gap-3">
            {[
              {
                q: "What is a Fibonacci retracement calculator?",
                a: "A Fibonacci retracement calculator is a tool that calculates common Fibonacci pullback levels based on a swing high and swing low.",
              },
              {
                q: "What are the most important Fibonacci levels?",
                a: "The most common Fibonacci retracement levels are 23.6%, 38.2%, 50%, 61.8%, and 78.6%. Extension levels often include 127.2%, 161.8%, 200%, and 261.8%.",
              },
              {
                q: "Is the 61.8% Fibonacci level the strongest?",
                a: "The 61.8% level is widely watched, but it is not always the strongest. Traders usually look for confirmation from price action, trend direction, and support or resistance.",
              },
              {
                q: "Can I use Fibonacci for Forex trading?",
                a: "Yes. Fibonacci levels are commonly used in Forex trading, but they can also be applied to stocks, indices, commodities, gold, and cryptocurrencies.",
              },
              {
                q: "What is the difference between retracement and extension levels?",
                a: "Retracement levels help identify potential pullback zones within a previous move. Extension levels help estimate possible targets beyond the original swing.",
              },
              {
                q: "Are Fibonacci levels guaranteed?",
                a: "No. Fibonacci levels are technical analysis reference zones only. They do not guarantee that price will reverse or continue from a specific level.",
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