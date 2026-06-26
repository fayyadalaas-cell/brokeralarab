import Link from "next/link";

export const metadata = {
  title: "Broker Review Methodology | How We Rate Trading Brokers",
  description:
    "Learn how Broker AlArab reviews and rates trading brokers using 150+ criteria covering regulation, fees, spreads, platforms, withdrawals, account types, and support quality.",
};

const criteria = [
  {
    title: "Regulation & Fund Protection",
    weight: "25%",
    text: "We review the broker’s regulatory status, licensing quality, client fund protection, negative balance protection, and operational history.",
    points: [
      "Regulatory strength",
      "Client fund segregation",
      "Negative balance protection",
      "Transparency",
    ],
  },
  {
    title: "Fees, Spreads & Trading Costs",
    weight: "20%",
    text: "We compare spreads, commissions, withdrawal fees, inactivity fees, swap costs, and the real cost of trading across different account types.",
    points: ["Spreads", "Commissions", "Withdrawal fees", "Swap costs"],
  },
  {
    title: "Account Types",
    weight: "15%",
    text: "We analyze available account types, minimum deposit requirements, demo accounts, swap-free options, and how suitable each account is for different trader profiles.",
    points: [
      "Standard accounts",
      "Swap-free accounts",
      "Demo accounts",
      "Minimum deposit",
    ],
  },
  {
    title: "Trading Platforms",
    weight: "15%",
    text: "We review platform availability such as MT4, MT5, mobile apps, and web platforms, with a focus on usability, execution, tools, and stability.",
    points: ["MT4", "MT5", "Mobile app", "Execution quality"],
  },
  {
    title: "Deposits & Withdrawals",
    weight: "15%",
    text: "We compare payment methods, withdrawal speed, processing times, possible fees, and how easy it is for traders to manage funds.",
    points: [
      "Payment methods",
      "Withdrawal speed",
      "Processing times",
      "Fee transparency",
    ],
  },
  {
    title: "Support & User Experience",
    weight: "10%",
    text: "We evaluate customer support, response quality, account opening experience, website clarity, and how easily traders can find important information.",
    points: [
      "Customer support",
      "Response time",
      "Account opening",
      "Information clarity",
    ],
  },
];

const sources = [
  "Official broker websites",
  "Regulatory and licensing pages",
  "Account, fee, and platform terms",
  "Broker product and service pages",
  "Public updates from brokers when available",
  "User experience and information clarity",
];

export default function HowWeReviewBrokersPage() {
  return (
    <main dir="ltr" className="mx-auto max-w-7xl px-4 pt-8 pb-2 text-left sm:px-5 md:pt-10 md:pb-3">
      {/* Hero */}
      <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-brand-50 shadow-sm">
        <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:p-10">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-black text-brand-600">
              Broker Review Methodology
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
              How Broker AlArab Reviews and Rates Trading Brokers
            </h1>

            <p className="mt-5 max-w-5xl text-base leading-8 text-slate-700 md:text-lg">
              Broker AlArab uses a structured review process to compare forex and CFD brokers
              across the areas that matter most to traders. Our broker ratings are based on
              150+ review criteria covering regulation, fees, spreads, trading platforms,
              account types, deposits, withdrawals, and support quality.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xl font-black text-slate-950">
              Practical broker reviews for smarter decisions
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              We organize key broker information so traders can compare options clearly
              before opening a real or demo account.
            </p>

            <Link
              href="/en/brokers"
              className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-brand-500 px-5 text-sm font-black text-white hover:bg-brand-600"
            >
              Browse Broker Reviews
            </Link>
          </div>
        </div>

        <div className="grid gap-3 border-t border-slate-200 bg-white/70 p-5 md:grid-cols-4">
          {[
            ["150+", "Review Criteria"],
            ["50+", "Brokers Reviewed"],
            ["6", "Core Rating Areas"],
            ["Monthly", "Data Updates"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-black text-brand-600">{value}</div>
              <div className="mt-2 text-sm font-bold text-slate-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro SEO content */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-3xl font-black text-slate-950">
          Why a Clear Broker Rating Methodology Matters
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-8 text-slate-700 md:text-base">
          <p>
            The online trading industry is full of marketing claims, bonuses, and promotional
            messages that can make broker selection confusing. Our methodology helps turn
            scattered broker information into a clear review structure that highlights the
            strengths and weaknesses of each broker.
          </p>

          <p>
            Our goal is not to push traders toward one company. Instead, we provide a practical
            framework for comparing brokers based on safety, trading costs, platforms, account
            conditions, withdrawal experience, and customer support.
          </p>
        </div>
      </section>

      {/* Criteria */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-950">
              Broker Rating Criteria
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              We divide our broker reviews into core areas to help traders understand the full picture.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {criteria.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-black text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-black text-brand-600">
                  Weight: {item.weight}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.text}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sources */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-3xl font-black text-slate-950">
          How We Collect Broker Information
        </h2>

        <p className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
          Our review process is based on collecting broker information from multiple sources,
          then organizing it into a format that is easier for traders to understand and compare.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sources.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-700">
                ✓
              </span>
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Score table */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-3xl font-black text-slate-950">
          How We Calculate the Final Broker Rating
        </h2>

        <p className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
          The final broker rating is not based on one factor alone. It is calculated from
          several weighted review areas. These weights are approximate and may vary slightly
          depending on the broker category, market availability, and the quality of information
          available.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 font-black">Criteria</th>
                <th className="p-4 font-black">Approx. Weight</th>
                <th className="p-4 font-black">What We Review</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {criteria.map((item) => (
                <tr key={item.title} className="bg-white">
                  <td className="p-4 font-black text-slate-950">{item.title}</td>
                  <td className="p-4 font-black text-brand-600">{item.weight}</td>
                  <td className="p-4 leading-7 text-slate-600">{item.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Independence + affiliate */}
      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            Editorial Independence
          </h2>

          <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
            Broker AlArab applies the same core review structure to the brokers listed on
            the website. A broker appearing on our pages or receiving a certain rating does
            not mean it is suitable for every trader, every country, or every trading strategy.
          </p>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            Affiliate Links and Advertising
          </h2>

          <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
            Some pages may include affiliate or advertising links to trading brokers. In some
            cases, Broker AlArab may receive a marketing commission when users register through
            certain links, usually at no extra cost to the user. However, brokers are still
            reviewed using the same core rating criteria.
          </p>
        </div>
      </section>

      {/* Updates */}
      <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-3xl font-black text-slate-950">
          How Often We Update Broker Reviews
        </h2>

        <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
          We aim to update broker review pages regularly when important changes appear in
          trading conditions, fees, account types, regulation, payment methods, withdrawal
          processes, or user experience. Broker information may still differ by country,
          entity, or account type, so traders should always verify details directly on the
          broker’s official website before opening an account.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="mt-8 rounded-[30px] border border-brand-100 bg-brand-50 p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-black text-slate-950">
          Important Disclaimer
        </h2>

        <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
          The content published on Broker AlArab is for educational and informational purposes
          only. It does not represent investment advice, financial advice, or a recommendation
          to buy, sell, or trade any financial product. Every user should conduct independent
          research and make sure any broker or trading service is suitable for their needs,
          experience level, legal situation, and financial position.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/en/brokers"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-black text-white hover:bg-brand-600"
          >
            Browse Broker Reviews
          </Link>

          <Link
            href="/en/about"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-brand-100 bg-white px-6 text-sm font-black text-brand-600 hover:bg-brand-50"
          >
            About Broker AlArab
          </Link>
        </div>
      </section>
    </main>
  );
}