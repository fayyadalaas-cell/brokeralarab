import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trading Tools",
  description:
    "Free trading tools and calculators for Forex, Gold, Stocks, Indices, and Crypto traders. Calculate risk, lot size, pip value, margin, leverage, profit and loss, Fibonacci levels, pivot points, and compound growth.",
  alternates: {
    canonical: "https://brokeralarab.com/en/tools",
    languages: {
      en: "https://brokeralarab.com/en/tools",
      ar: "https://brokeralarab.com/tools",
      "x-default": "https://brokeralarab.com/en/tools",
    },
  },
  openGraph: {
    title: "Trading Tools",
    description:
      "Professional trading calculators including Risk Calculator, Lot Size Calculator, Pip Calculator, Margin Calculator, Fibonacci Calculator, Pivot Point Calculator, and more.",
    url: "https://brokeralarab.com/en/tools",
    siteName: "Broker Alarab",
    type: "website",
  },
};

const tools = [
  {
    title: "Risk Calculator",
    href: "/en/tools/risk-calculator",
    tag: "Risk Management",
    desc: "Calculate your risk amount per trade based on account balance and risk percentage before entering the market.",
  },
  {
    title: "Lot Size Calculator",
    href: "/en/tools/lot-size-calculator",
    tag: "Position Sizing",
    desc: "Determine the correct lot size according to your account balance, stop loss distance, and risk tolerance.",
  },
  {
    title: "Pip Calculator",
    href: "/en/tools/pip-calculator",
    tag: "Pip Value",
    desc: "Calculate the value of a pip in Forex, Gold, and other instruments to better understand price movements.",
  },
  {
    title: "Profit & Loss Calculator",
    href: "/en/tools/profit-calculator",
    tag: "Profit Calculator",
    desc: "Estimate potential profits or losses based on entry price, exit price, trade size, and instrument.",
  },
  {
    title: "Margin Calculator",
    href: "/en/tools/margin-calculator",
    tag: "Margin",
    desc: "Find the required margin needed to open and maintain positions using your chosen leverage ratio.",
  },
  {
    title: "Leverage Calculator",
    href: "/en/tools/leverage-calculator",
    tag: "Leverage",
    desc: "Understand the relationship between leverage, trade size, and margin requirements.",
  },
  {
    title: "Drawdown Calculator",
    href: "/en/tools/drawdown-calculator",
    tag: "Drawdown",
    desc: "Measure account drawdowns and determine the percentage gain needed to recover losses.",
  },
  {
    title: "Compound Calculator",
    href: "/en/tools/compound-calculator",
    tag: "Compound Growth",
    desc: "Project long-term account growth using compound returns and recurring deposits.",
  },
  {
    title: "Fibonacci Calculator",
    href: "/en/tools/fibonacci-calculator",
    tag: "Fibonacci",
    desc: "Calculate Fibonacci retracement and extension levels to identify potential support and resistance zones.",
  },
  {
    title: "Pivot Point Calculator",
    href: "/en/tools/pivot-point-calculator",
    tag: "Pivot Points",
    desc: "Calculate pivot points along with support and resistance levels for technical analysis.",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#f3f7fb] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        {/* HERO */}

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm sm:rounded-[2.25rem]">
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-5 py-12 text-center sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold text-blue-100">
              Free Trading Calculators
            </span>

            <h1 className="mx-auto mt-5 max-w-5xl text-3xl font-black leading-snug text-white sm:text-5xl sm:leading-tight">
              Professional Trading Tools & Forex Calculators
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-blue-100 sm:text-lg sm:leading-9">
              Access professional trading calculators designed for Forex,
              Gold, Indices, Stocks, and Crypto traders. Calculate risk,
              lot size, pip value, leverage, margin, profit potential,
              Fibonacci levels, and pivot points before placing your trades.
            </p>
          </div>

          {/* TOOLS GRID */}

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-brand-50 hover:shadow-xl"
                >
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-brand-600">
                    {tool.tag}
                  </span>

                  <h2 className="mt-4 text-xl font-black text-slate-950">
                    {tool.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {tool.desc}
                  </p>

                  <div className="mt-5 inline-flex rounded-2xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white transition group-hover:bg-brand-600">
                    Open Tool →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* WHY USE TOOLS */}

        <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:mt-8 sm:rounded-[2rem]">
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-brand-600">
              Better Trade Planning
            </span>

            <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
              Why Use Trading Calculators?
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
              Trading calculators help remove guesswork from trading decisions.
              Before opening a position, traders should understand risk exposure,
              margin requirements, pip values, lot sizes, and potential profit or loss.
            </p>
          </div>

          <div className="grid gap-4 p-5 sm:p-8 md:grid-cols-3 lg:p-10">
            {[
              {
                title: "Manage Risk Efficiently",
                text: "Calculate risk exposure and determine appropriate position sizes before entering trades.",
              },
              {
                title: "Understand Trading Costs",
                text: "Estimate margin requirements, leverage impact, and pip values across instruments.",
              },
              {
                title: "Improve Technical Analysis",
                text: "Use Fibonacci levels and Pivot Points to identify key support and resistance zones.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}

        <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:mt-8 sm:rounded-[2rem]">
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
              Trading Tools FAQ
            </h2>
          </div>

          <div className="grid gap-3 p-5 sm:p-8 lg:p-10">
            {[
              {
                q: "Are these trading tools free?",
                a: "Yes. All trading calculators on this page are completely free to use.",
              },
              {
                q: "Are these calculators only for Forex traders?",
                a: "No. Many of the tools can also be used for Gold, Indices, Stocks, and Cryptocurrency markets.",
              },
              {
                q: "Are calculator results guaranteed?",
                a: "No. Results are estimates based on the information provided and should be used as decision-support tools.",
              },
              {
                q: "Which calculator is most important for beginners?",
                a: "The Risk Calculator and Lot Size Calculator are usually the most important.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <summary className="cursor-pointer text-lg font-extrabold">
                  {item.q}
                </summary>

                <p className="mt-3 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

      </section>
    </main>
  );
}