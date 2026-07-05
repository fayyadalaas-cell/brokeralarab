import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ComparePickerEN from "./ComparePickerEN";

type Broker = {
  id: number;
  name: string | null;
  name_en?: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  best_for: string | null;
  best_for_en?: string | null;
  regulation: string | null;
  platforms: string | null;
  islamic_account: string | null;
  logo: string | null;
};

export const metadata: Metadata = {
  title: "Compare Trading Brokers",
  description:
    "Compare the most popular trading brokers by regulation, platforms, minimum deposit, and Islamic account availability to find the broker that suits you best.",
  keywords: [
    "compare trading brokers",
    "compare forex brokers",
    "best trading brokers",
    "best forex broker",
    "broker comparison",
    "Exness vs XM",
    "XS vs Vantage",
    "Broker Alarab",
  ],
 alternates: {
  canonical: "https://brokeralarab.com/en/compare",
  languages: {
    en: "https://brokeralarab.com/en/compare",
    ar: "https://brokeralarab.com/compare",
  },
},
  openGraph: {
    title: "Compare Trading Brokers | Broker Alarab",
    description:
      "A professional broker comparison page that helps traders understand the key differences between brokers.",
    url: "https://brokeralarab.com/en/compare",
    siteName: "Broker Alarab",
    type: "website",
    locale: "en_US",
  },
};

function money(value: number | null) {
  if (value === null || Number.isNaN(value)) return "Not specified";
  return `$${value}`;
}

function shortReg(value: string | null) {
  if (!value) return "Not specified";
  return value
    .split("||")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(" / ");
}

function shortPlatforms(value: string | null) {
  if (!value) return "Not specified";
  return value
    .replace("JustMarkets Mobile App", "Mobile")
    .replace(/\s+/g, " ")
    .trim();
}

function yesNoEnglish(value: string | null) {
  const v = (value || "").toLowerCase();
  if (v.includes("yes") || v.includes("متوفر")) return "Available";
  if (v.includes("no") || v.includes("غير")) return "Not clear";
  return value || "Not specified";
}

function avgRating(a: number | null, b: number | null) {
  const values = [a, b].filter((v): v is number => typeof v === "number");
  if (!values.length) return null;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function minDeposit(a: number | null, b: number | null) {
  const values = [a, b].filter((v): v is number => typeof v === "number");
  if (!values.length) return null;
  return Math.min(...values);
}

function renderStars(
  rating: number | null,
  size: "sm" | "md" = "sm",
  label = "Broker rating"
) {
  const stars = Math.round(rating ?? 0);
  const starClass = size === "md" ? "text-[13px]" : "text-[11px]";
  const ratingText = rating !== null ? rating.toFixed(1) : "not available";

  return (
    <div
      aria-label={`${label} ${ratingText} out of 5`}
      className={`flex items-center gap-0.5 text-amber-400 ${starClass}`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < stars ? "opacity-100" : "opacity-30"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default async function ComparePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select(
      "id,name,name_en,slug,rating,min_deposit,best_for,best_for_en,regulation,platforms,islamic_account,logo"
    )
    .order("rating", { ascending: false });

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.name && b.slug);

  const comparisons: { a: Broker; b: Broker; score: number }[] = [];
  for (let i = 0; i < brokers.length; i++) {
    for (let j = i + 1; j < brokers.length; j++) {
      comparisons.push({
        a: brokers[i],
        b: brokers[j],
        score: avgRating(brokers[i].rating, brokers[j].rating) ?? 0,
      });
    }
  }

  const sortedComparisons = comparisons.sort(
    (x, y) => (y.score ?? 0) - (x.score ?? 0)
  );

  const featuredComparisonsDesktop = sortedComparisons.slice(0, 15);
  const featuredComparisonsMobile = sortedComparisons.slice(0, 5);
  const topBrokers = brokers.slice(0, 6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I compare two brokers?",
        acceptedAnswer: {
          "@type": "Answer",
text: "Choose two brokers from the comparison tool at the top of the page, then open a dedicated comparison page that highlights the key differences in regulation, platforms, minimum deposit, and Islamic account availability."        },
      },
      {
        "@type": "Question",
        name: "What are the most important things to compare between brokers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most important elements include regulation, minimum deposit, platforms, Islamic account availability, overall rating, and how suitable the broker is for your trading style.",
        },
      },
      {
        "@type": "Question",
        name: "Is the comparison page useful before opening an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It saves time and shows the key differences between two brokers clearly in one place before you open an account.",
        },
      },
    ],
  };

  return (
    <main dir="ltr" className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              Compare Trading Brokers
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Compare the most popular trading brokers by regulation, platforms,
              minimum deposit, and Islamic account availability, then open a
              clear comparison page that helps you choose the right broker
              before opening an account.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#compare-tool"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
              >
                Start Comparing Now
              </a>

              <a
                href="#featured-comparisons"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-100"
              >
                Browse Popular Comparisons
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE TOOL */}
<section
  id="compare-tool"
  className="mx-auto max-w-7xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 md:pt-4 md:pb-10"
>
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
    <div className="grid lg:grid-cols-[1.02fr_.98fr]">
      {/* LEFT / INTRO */}
      <div className="relative hidden overflow-hidden border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 sm:p-6 lg:block lg:border-t-0 lg:border-r lg:p-6">
        <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-brand-50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-slate-100 blur-3xl" />

        <div className="relative">
          <h2 className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 sm:text-[40px]">
            Choose Two Brokers and Start the{" "}
            <span className="text-brand-600">Comparison</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600">
            Instead of reading two full reviews and trying to figure out the
            differences by yourself, use this tool to go directly to a clear
            comparison page that highlights the most important points traders
            need before opening an account.
          </p>

          <div className="mt-7 space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-extrabold text-brand-600">
                1
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Compare Only the Key Criteria
                </h3>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  Regulation, minimum deposit, platforms, and Islamic account
                  availability without noise or distraction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-extrabold text-brand-600">
                2
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Faster Decision Before Signup
                </h3>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  Instead of switching between many pages and collecting
                  information manually, you will see the differences clearly on
                  one page.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-extrabold text-brand-600">
                3
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Better for Practical Decision-Making
                </h3>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  This tool helps you choose the broker that fits you better
                  before opening a real account, especially if you care about
                  regulation or Islamic account options.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[20px] border border-brand-100 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_100%)] p-4">
            <div className="text-xs font-extrabold text-brand-600">
              What will you see on the comparison page?
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                Regulation
              </span>
              <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                Deposit
              </span>
              <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                Platforms
              </span>
              <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                Islamic Account
              </span>
              <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                Key Differences
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT / TOOL */}
      <div className="bg-[linear-gradient(180deg,#0f172a_0%,#172554_100%)] p-5 sm:p-6 lg:p-7">
        <div className="mx-auto max-w-xl">
          <div className="mb-4 text-center">
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold text-blue-100">
              Start Now
            </div>

            <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
              Choose Two Brokers to Compare
            </h3>

            <p className="mt-2 text-sm leading-7 text-blue-100/90">
              Select the first and second broker, then go directly to the full
              comparison page between them.
            </p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white p-4 shadow-[0_16px_35px_rgba(0,0,0,0.16)] sm:p-5">
            <ComparePickerEN
  brokers={brokers.map((b) => ({
    name: b.name_en || b.name || "",
    slug: b.slug || "",
  }))}
/>
          </div>

          <div className="mt-3 rounded-2xl border border-blue-400/20 bg-white/5 px-4 py-3 text-center text-[11px] font-medium leading-6 text-blue-100/90">
            Compare two brokers with similar rating or regulation to make the
            differences clearer and easier to evaluate.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FEATURED COMPARISONS */}
      <section className="mx-auto max-w-7xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-extrabold text-brand-500">
                Popular Comparisons
              </div>
              <h2 className="mt-2 text-3xl font-black text-[#0f172a] sm:text-4xl">
                Most Visited Comparison Pages
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                Choose from the most popular ready-made broker comparisons, or
                use the tool above to open any comparison you want.
              </p>
            </div>
          </div>

          {/* MOBILE: 5 only */}
          <div className="grid gap-4 md:hidden">
            {featuredComparisonsMobile.map((item) => {
              const slug = `${item.a.slug}-vs-${item.b.slug}`;

              return (
                <Link
                  key={slug}
                  href={`/en/compare/${slug}`}
                  className="group rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    {/* Broker A */}
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                        {item.a.logo ? (
                          <img
                            src={item.a.logo}
                            alt={(item.a.name_en || item.a.name) || "Broker logo"}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-slate-400">No logo</span>
                        )}
                      </div>

                      <div className="mt-2 text-sm font-bold text-slate-900">
                        {item.a.name_en || item.a.name}
                      </div>

                      <div className="mt-1 flex items-center justify-center gap-1">
                        <span className="text-[11px] font-bold text-slate-600">
                          {item.a.rating?.toFixed(1) ?? "-"}
                        </span>
                        {renderStars(
  item.a.rating,
  "sm",
  `${item.a.name_en || item.a.name || "Broker A"} rating`
)}
                      </div>
                    </div>

                    {/* VS */}
                    <div className="text-sm font-black text-slate-400">VS</div>

                    {/* Broker B */}
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                        {item.b.logo ? (
                          <img
                            src={item.b.logo}
                            alt={(item.b.name_en || item.b.name) || "Broker logo"}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-slate-400">No logo</span>
                        )}
                      </div>

                      <div className="mt-2 text-sm font-bold text-slate-900">
                        {item.b.name_en || item.b.name}
                      </div>

                      <div className="mt-1 flex items-center justify-center gap-1">
                        <span className="text-[11px] font-bold text-slate-600">
                          {item.b.rating?.toFixed(1) ?? "-"}
                        </span>
                       {renderStars(
  item.b.rating,
  "sm",
  `${item.b.name_en || item.b.name || "Broker B"} rating`
)}
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-base font-extrabold text-slate-900">
                    Compare {item.a.name_en || item.a.name} vs {item.b.name_en || item.b.name}
                  </div>

                  <p className="mt-3 text-center text-sm leading-7 text-slate-600">
                    Discover the differences between {item.a.name_en || item.a.name} and{" "}
                    {item.b.name_en || item.b.name} in terms of regulation, fees,
                    deposit, and trading platforms.
                  </p>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
                    <span className="text-xs text-slate-500">Average Rating</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {avgRating(item.a.rating, item.b.rating)?.toFixed(2) ?? "-"} / 5
                    </span>
                  </div>

                  <div className="mt-4 text-center text-sm font-extrabold text-emerald-700">
                    Read Comparison →
                  </div>
                </Link>
              );
            })}
          </div>

          {/* DESKTOP: 15 */}
          <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
            {featuredComparisonsDesktop.map((item) => {
              const slug = `${item.a.slug}-vs-${item.b.slug}`;

              return (
                <Link
                  key={slug}
                  href={`/en/compare/${slug}`}
                  className="group rounded-[24px] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    {/* Broker A */}
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                        {item.a.logo ? (
                          <img
                            src={item.a.logo}
                            alt={(item.a.name_en || item.a.name) || "Broker logo"}
                            className="max-h-20 w-auto object-contain"
                          />
                        ) : (
                          <span className="text-xs text-slate-400">No logo</span>
                        )}
                      </div>

                      <div className="mt-2 text-sm font-bold text-slate-900">
                        {item.a.name_en || item.a.name}
                      </div>

                      <div className="mt-1 flex items-center justify-center gap-1">
                        <span className="text-xs font-bold text-slate-600">
                          {item.a.rating?.toFixed(1) ?? "-"}
                        </span>
{renderStars(
  item.a.rating,
  "md",
  `${item.a.name_en || item.a.name || "Broker A"} rating`
)}
                      </div>
                    </div>

                    {/* VS */}
                    <div className="text-base font-black text-slate-400">VS</div>

                    {/* Broker B */}
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                        {item.b.logo ? (
                          <img
                            src={item.b.logo}
                            alt={(item.b.name_en || item.b.name) || "Broker logo"}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-slate-400">No logo</span>
                        )}
                      </div>

                      <div className="mt-2 text-sm font-bold text-slate-900">
                        {item.b.name_en || item.b.name}
                      </div>

                      <div className="mt-1 flex items-center justify-center gap-1">
                        <span className="text-xs font-bold text-slate-600">
                          {item.b.rating?.toFixed(1) ?? "-"}
                        </span>
                       {renderStars(
  item.b.rating,
  "md",
  `${item.b.name_en || item.b.name || "Broker B"} rating`
)}
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-lg font-extrabold text-slate-900">
                    Compare {item.a.name_en || item.a.name} vs {item.b.name_en || item.b.name}
                  </div>

                  <p className="mt-3 text-center text-sm leading-7 text-slate-600">
                    Discover the differences between {item.a.name_en || item.a.name} and{" "}
                    {item.b.name_en || item.b.name} in terms of regulation, fees,
                    minimum deposit, platforms, and how suitable each broker is
                    for your trading needs.
                  </p>

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
                    <span className="text-sm text-slate-500">Average Rating</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {avgRating(item.a.rating, item.b.rating)?.toFixed(2) ?? "-"} / 5
                    </span>
                  </div>

                  <div className="mt-4 text-center text-sm font-extrabold text-emerald-700 transition group-hover:text-emerald-800">
                    Read Comparison →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* USEFUL INTERNAL SEO SECTIONS */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          {/* INTERNAL LINKS */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="text-sm font-extrabold text-brand-500">
              Important Pages on the Site
            </div>

            <h2 className="mt-2 text-2xl font-black text-[#0f172a] sm:text-3xl">
              Go to the Most Useful Pages
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
              If you are still comparing more than one broker, these internal
              pages help you access reviews, rankings, and useful broker pages
              much faster.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/en/brokers"
                className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-brand-100 hover:bg-white hover:shadow-sm"
              >
                <div className="text-lg font-black text-[#0f172a]">
                  Broker Reviews
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Review brokers, regulation details, trading platforms, and
                  Islamic account availability.
                </p>
                <div className="mt-4 text-sm font-extrabold text-brand-500">
                  Browse the Page →
                </div>
              </Link>

              <Link
                href="/en/best-brokers"
                className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-brand-100 hover:bg-white hover:shadow-sm"
              >
                <div className="text-lg font-black text-[#0f172a]">
                  Best Brokers
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  A focused page showing the strongest brokers based on overall
                  rating and general performance.
                </p>
                <div className="mt-4 text-sm font-extrabold text-brand-500">
                  Go Now →
                </div>
              </Link>

              <Link
                href="/en/best-brokers/saudi-arabia"
                className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-brand-100 hover:bg-white hover:shadow-sm"
              >
                <div className="text-lg font-black text-[#0f172a]">
                  Best Brokers in Saudi Arabia
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Browse brokers that are more suitable for traders in Saudi
                  Arabia based on practical criteria.
                </p>
                <div className="mt-4 text-sm font-extrabold text-brand-500">
                  Open the Page →
                </div>
              </Link>

              <Link
                href="/en/compare"
                className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-brand-100 hover:bg-white hover:shadow-sm"
              >
                <div className="text-lg font-black text-[#0f172a]">
                  All Comparison Pages
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Go back to the main comparison page and choose any two brokers
                  you want to compare.
                </p>
                <div className="mt-4 text-sm font-extrabold text-brand-500">
                  Comparison Page →
                </div>
              </Link>
            </div>

            <div className="mt-6 rounded-[22px] border border-brand-100 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_100%)] p-4">
              <div className="text-sm font-extrabold text-brand-500">
                Quick Tip
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                If you are only undecided between two brokers, open the
                comparison page first. If you are still in the general research
                phase, start with the broker reviews or best brokers page.
              </p>
            </div>
          </div>

          {/* QUICK GUIDE */}
          <div className="hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:block">
            <div className="text-sm font-extrabold text-brand-500">
              Quick Guide
            </div>

            <h2 className="mt-2 text-2xl font-black text-[#0f172a] sm:text-3xl">
              How to Get the Most from the Comparison Page
            </h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
                <h3 className="text-base font-black text-[#0f172a]">
                  1) Choose Two Similar Brokers
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  The best result appears when you compare two brokers you are
                  actually deciding between, not two very different brokers with
                  very different service types.
                </p>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
                <h3 className="text-base font-black text-[#0f172a]">
                  2) Focus on What Matters Most to You
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Some traders care most about regulation, while others focus on
                  minimum deposit, Islamic account, or trading platforms.
                </p>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
                <h3 className="text-base font-black text-[#0f172a]">
                  3) Read the Full Review After the Comparison
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  The comparison page saves time, but the full review gives you
                  the broader picture of each broker’s strengths and weaknesses.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-extrabold text-slate-900">
                What You Will Find in Comparison Pages
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                  Regulation
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                  Minimum Deposit
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                  Platforms
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                  Islamic Account
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
                  Overall Picture
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}