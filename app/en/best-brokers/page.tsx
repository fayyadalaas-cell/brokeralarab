import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import CountryBrokerRedirect from "@/app/components/CountryBrokerRedirect";

export const metadata: Metadata = {
  title: "Best Forex Brokers in 2026 | Compare Top Trading Brokers",
  description:
    "Compare the best forex brokers in 2026 by regulation, spreads, platforms, minimum deposit, and Islamic account availability. Explore expert broker reviews and find the right trading broker for your needs.",
};

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
  real_account_url: string | null;
  demo_account_url: string | null;
};

function normalizeText(value: string | null | undefined, fallback = "Not available") {
  return value?.trim() || fallback;
}

function brokerDisplayName(broker: Broker) {
  return normalizeText(broker.name_en || broker.name || "Broker", "Broker");
}

function brokerBestFor(broker: Broker) {
  return normalizeText(
    broker.best_for_en || broker.best_for || "General trading needs",
    "General trading needs"
  );
}

function isIslamicAvailable(value: string | null | undefined) {
  if (!value) return false;
  const v = value.toLowerCase();
  return (
    v.includes("yes") ||
    v.includes("available") ||
    v.includes("true") ||
    v.includes("نعم") ||
    v.includes("متوفر")
  );
}

function formatDeposit(value: number | null) {
  if (value === null || value === undefined) return "Not specified";
  return `$${value}`;
}

function ratingLabel(rating: number | null) {
  if (!rating) return "—";
  return rating.toFixed(1);
}

function getTopPicks(brokers: Broker[]) {
  const sorted = [...brokers].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const overall = sorted[0];

  const islamic =
    sorted.find((b) => isIslamicAvailable(b.islamic_account)) || sorted[1] || sorted[0];

  const beginners =
    sorted.find((b) => {
      const bestFor = `${b.best_for || ""} ${b.best_for_en || ""}`.toLowerCase();
      return bestFor.includes("beginner") || (b.min_deposit !== null && b.min_deposit <= 50);
    }) || sorted[2] || sorted[0];

  return {
    overall,
    islamic,
    beginners,
  };
}

export default async function BestBrokersPage() {
  const supabase = await createClient();

  const { data: brokersData } = await supabase
    .from("brokers")
    .select(
      "id, name, name_en, slug, rating, min_deposit, best_for, best_for_en, regulation, platforms, islamic_account, logo, real_account_url, demo_account_url"
    )
    .order("rating", { ascending: false });

  const brokers: Broker[] = brokersData || [];
  const topPicks = getTopPicks(brokers);

  return (
    <main className="bg-slate-50 text-slate-900" dir="ltr">
      {/* 1) HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#07111f]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_24%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.10),transparent_30%)]" />
          <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-brand-500/15 blur-3xl" />
          <div className="absolute left-[-80px] bottom-[-100px] h-[260px] w-[260px] rounded-full bg-[#0ea5e9]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <div className="relative mx-auto max-w-[1520px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-200 backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Independently Reviewed • Updated for 2026
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-[58px] xl:text-[68px]">
                Best Forex Brokers
                <span className="mt-2 block bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                  Reviews & Comparisons
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
                Compare top-rated forex brokers by regulation, spreads, trading
                platforms, minimum deposit, and account features. Explore expert
                broker reviews built to help international traders choose with confidence.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href="#comparison-table"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_40px_rgba(37,99,235,0.30)] transition hover:scale-[1.02]"
                >
                  Compare Top Brokers
                </a>

                <a
                  href="#broker-finder"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Find Your Best Match
                </a>
              </div>

              <div className="mt-6 hidden flex-wrap items-center justify-center gap-3 text-sm text-slate-300 sm:flex lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 font-semibold backdrop-blur">
                  <span className="text-emerald-400">●</span>
                  Regulation & trust focus
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 font-semibold backdrop-blur">
                  <span className="text-emerald-400">●</span>
                  Spreads, fees & platforms
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 font-semibold backdrop-blur">
                  <span className="text-emerald-400">●</span>
                  Built for global traders
                </span>
              </div>
            </div>

            {/* RIGHT CARD - DESKTOP ONLY */}
            <div className="hidden lg:flex lg:items-center">
              <div className="w-full rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-extrabold text-white">Top Broker Pick</div>
                    <div className="mt-1 text-sm text-slate-300">
                      Selected for strong overall rating and broker quality
                    </div>
                  </div>

                  <div className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-extrabold text-amber-300">
                    Best Overall
                  </div>
                </div>

                {topPicks.overall ? (
                  <div className="rounded-[26px] border border-white/10 bg-[#0d1a2c] p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white shadow-sm">
                        {topPicks.overall.logo ? (
                          <div className="relative h-16 w-16">
                            <Image
                              src={topPicks.overall.logo}
                              alt={brokerDisplayName(topPicks.overall)}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-slate-500">Logo</span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-2xl font-extrabold text-white">
                          {brokerDisplayName(topPicks.overall)}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 font-bold text-white">
                            <span>⭐</span>
                            <span>{ratingLabel(topPicks.overall.rating)}</span>
                            <span className="text-white/70">/ 5</span>
                          </span>

                          <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-slate-200">
                            From {formatDeposit(topPicks.overall.min_deposit)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs font-semibold text-slate-400">Best For</div>
                        <div className="mt-2 text-sm font-extrabold leading-7 text-white">
                          {brokerBestFor(topPicks.overall)}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs font-semibold text-slate-400">Regulation</div>
                        <div className="mt-2 text-sm font-extrabold leading-7 text-white">
                          {normalizeText(topPicks.overall.regulation)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={`/en/brokers/${topPicks.overall.slug}`}
                        className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                      >
                        Read Review
                      </Link>

                      {topPicks.overall.real_account_url ? (
                        <a
                          href={`/go/${topPicks.overall.slug}?type=real`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
                        >
                          Open Account
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 p-6 text-sm text-slate-300">
                    No broker data available at the moment.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) QUICK TOP BROKERS */}
      <section id="top-brokers" className="mx-auto max-w-[1520px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Top 3 Forex Brokers This Year
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            These are the top three brokers on this page based on overall rating,
            core trading conditions, and general broker quality. Use this quick view
            before moving to the full comparison.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {brokers.slice(0, 3).map((broker, index) => {
            const rankLabel =
              index === 0 ? "1st Place" : index === 1 ? "2nd Place" : "3rd Place";

            const rankClasses =
              index === 0
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : index === 1
                ? "border-slate-300 bg-slate-100 text-slate-700"
                : "border-brand-100 bg-brand-50 text-brand-600";

            return (
              <article
                key={broker.id}
                className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_55px_rgba(15,23,42,0.10)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-500 to-sky-400" />

                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${rankClasses}`}
                  >
                    {rankLabel}
                  </span>

                  <div className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                    <span>⭐</span>
                    <span>{ratingLabel(broker.rating)}</span>
                    <span className="text-white/70">/ 5</span>
                  </div>
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                      {brokerDisplayName(broker)}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Best for{" "}
                      <span className="font-bold text-slate-900">{brokerBestFor(broker)}</span>
                    </p>
                  </div>

                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {broker.logo ? (
                      <div className="relative h-20 w-20">
                        <Image
                          src={broker.logo}
                          alt={brokerDisplayName(broker)}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Logo</span>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="text-xs font-semibold text-slate-500">Minimum Deposit</div>
                    <div className="mt-2 text-xl font-extrabold text-slate-950">
                      {formatDeposit(broker.min_deposit)}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="text-xs font-semibold text-slate-500">Islamic Account</div>
                    <div className="mt-2 text-xl font-extrabold text-slate-950">
                      {isIslamicAvailable(broker.islamic_account) ? "Available" : "Not clear"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-500">Regulation</div>
                  <div className="mt-2 text-sm font-bold leading-7 text-slate-900">
                    {normalizeText(broker.regulation)}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    Trusted review
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    Broker comparison
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    Global traders
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/en/brokers/${broker.slug}`}
                    className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-brand-600"
                  >
                    Read Review
                  </Link>

                  {broker.real_account_url ? (
                    <a
                      href={`/go/${broker.slug}?type=real`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                    >
                      Open Account
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3) FULL COMPARISON TABLE */}
      <section id="comparison-table" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 text-left">
            <div className="text-sm font-bold text-brand-600">Main Comparison</div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Best 10 Forex Brokers in 2026
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Compare the top ten brokers by overall rating, minimum deposit,
              regulation, platforms, Islamic account availability, and direct
              review and account links.
            </p>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.07)]">
              <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white">
                <div className="grid grid-cols-[2.3fr_0.9fr_0.9fr_1.5fr_1fr_0.9fr_1.25fr] items-center gap-4 text-sm font-extrabold">
                  <div>Broker</div>
                  <div>Rating</div>
                  <div>Deposit</div>
                  <div>Regulation</div>
                  <div>Platforms</div>
                  <div>Islamic</div>
                  <div>Actions</div>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {brokers.slice(0, 10).map((broker, index) => {
                  const isTop = index === 0;

                  return (
                    <div
                      key={broker.id}
                      className={`grid grid-cols-[2.3fr_0.9fr_0.9fr_1.5fr_1fr_0.9fr_1.25fr] items-center gap-4 px-6 py-5 transition ${
                        isTop
                          ? "bg-gradient-to-r from-blue-50 via-white to-amber-50"
                          : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                            isTop
                              ? "bg-amber-400 text-slate-950"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${
                            isTop ? "border-brand-100 bg-white" : "border-slate-200 bg-white"
                          }`}
                        >
                          {broker.logo ? (
                            <div className="relative h-12 w-12">
                              <Image
                                src={broker.logo}
                                alt={brokerDisplayName(broker)}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : null}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="text-xl font-extrabold text-slate-950">
                              {brokerDisplayName(broker)}
                            </div>

                            {isTop ? (
                              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-700">
                                Top Pick
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-1 text-xs text-slate-500">
                            Best for {brokerBestFor(broker)}
                          </div>
                        </div>
                      </div>

                      <div>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-extrabold ${
                            isTop
                              ? "bg-amber-100 text-amber-800"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          <span>{ratingLabel(broker.rating)}</span>
                          <span>⭐</span>
                        </span>
                      </div>

                      <div className="text-sm font-extrabold text-slate-950">
                        {formatDeposit(broker.min_deposit)}
                      </div>

                      <div className="text-sm leading-7 text-slate-600">
                        {normalizeText(broker.regulation)}
                      </div>

                      <div className="text-sm font-bold text-slate-700">
                        {normalizeText(broker.platforms)}
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${
                            isIslamicAvailable(broker.islamic_account)
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isIslamicAvailable(broker.islamic_account) ? "Available" : "Unclear"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/en/brokers/${broker.slug}`}
                          className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-600"
                        >
                          Read Review
                        </Link>

                        {broker.real_account_url ? (
                          <a
                            href={`/go/${broker.slug}?type=real`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-800 transition hover:bg-slate-50"
                          >
                            Open Account
                          </a>
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-400">
                            Not Available
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE ACCORDION */}
          <div className="space-y-3 lg:hidden">
            {brokers.slice(0, 10).map((broker, index) => {
              const isTop = index === 0;

              return (
                <details
                  key={broker.id}
                  className={`group overflow-hidden rounded-[24px] border bg-white shadow-sm ${
                    isTop ? "border-brand-100" : "border-slate-200"
                  }`}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                          isTop
                            ? "bg-amber-400 text-slate-950"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {broker.logo ? (
                          <div className="relative h-10 w-10">
                            <Image
                              src={broker.logo}
                              alt={brokerDisplayName(broker)}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-lg font-extrabold text-slate-950">
                            {brokerDisplayName(broker)}
                          </h3>

                          {isTop ? (
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                              Top Pick
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-extrabold text-amber-700">
                            <span>{ratingLabel(broker.rating)}</span>
                            <span>⭐</span>
                          </span>
                          <span>Deposit {formatDeposit(broker.min_deposit)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-400 transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </summary>

                  <div className="border-t border-slate-200 px-4 pb-4 pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-xs font-semibold text-slate-500">Minimum Deposit</div>
                        <div className="mt-2 text-lg font-extrabold text-slate-950">
                          {formatDeposit(broker.min_deposit)}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-xs font-semibold text-slate-500">Islamic Account</div>
                        <div className="mt-2 text-lg font-extrabold text-slate-950">
                          {isIslamicAvailable(broker.islamic_account) ? "Available" : "Not clear"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-slate-200 p-4">
                      <div className="text-xs font-semibold text-slate-500">Best For</div>
                      <div className="mt-2 text-sm font-bold leading-7 text-slate-900">
                        {brokerBestFor(broker)}
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-slate-200 p-4">
                      <div className="text-xs font-semibold text-slate-500">Regulation</div>
                      <div className="mt-2 text-sm font-bold leading-7 text-slate-900">
                        {normalizeText(broker.regulation)}
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-slate-200 p-4">
                      <div className="text-xs font-semibold text-slate-500">Platforms</div>
                      <div className="mt-2 text-sm font-bold leading-7 text-slate-900">
                        {normalizeText(broker.platforms)}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Link
                        href={`/en/brokers/${broker.slug}`}
                        className="inline-flex flex-1 items-center justify-center rounded-xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                      >
                        Read Review
                      </Link>

                      {broker.real_account_url ? (
                        <a
                          href={`/go/${broker.slug}?type=real`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                        >
                          Open Account
                        </a>
                      ) : (
                        <span className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-400">
                          Not Available
                        </span>
                      )}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4) SMART BROKER FINDER */}
      <section className="border-t border-slate-200 bg-white">
        <div
          id="broker-finder"
          className="scroll-mt-40 mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8"
        >
          {/* DESKTOP */}
          <div className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.16)] lg:block">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              {/* TEXT SIDE */}
              <div className="border-b border-white/10 p-6 text-white lg:border-b-0 lg:border-r lg:p-8">
                <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                  Find the Best Broker
                  <br className="hidden sm:block" />
                  for Your Trading Needs
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">
                  Use these quick filters to narrow down the best broker options
                  by country, deposit level, experience, and platform preference.
                </p>
              </div>

              {/* FORM SIDE */}
              <div className="bg-gradient-to-b from-white to-slate-50 p-4 text-slate-900 sm:p-5 lg:p-6">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-2xl font-extrabold tracking-tight text-slate-950">
                      Broker Finder
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      Select your preferences or leave country on the broad option
                    </div>
                  </div>

                  <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600">
                    Smart Filter
                  </div>
                </div>

                <form className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div>
                   <label id="desktop-deposit-filter-label" className="mb-2 block text-xs font-extrabold text-slate-700">
  Deposit Level
</label>
<select
  aria-labelledby="desktop-deposit-filter-label"
  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
>
                      <option>Under $100</option>
                      <option>$100 - $500</option>
                      <option>$500 - $1000</option>
                      <option>Over $1000</option>
                    </select>
                  </div>

                  <div>
                    <label id="desktop-experience-filter-label" className="mb-2 block text-xs font-extrabold text-slate-700">
  Experience Level
</label>
<select
  aria-labelledby="desktop-experience-filter-label"
  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label id="desktop-platform-filter-label" className="mb-2 block text-xs font-extrabold text-slate-700">
  Platform
</label>
<select
  aria-labelledby="desktop-platform-filter-label"
  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
>
                      <option>Any Platform</option>
                      <option>MT4</option>
                      <option>MT5</option>
                      <option>cTrader</option>
                      <option>Multiple Platforms</option>
                    </select>
                  </div>

                  <CountryBrokerRedirect />
                </form>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] lg:hidden">
            <div className="bg-slate-950 px-4 py-5 text-white">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-extrabold text-blue-200">
                Smart Filter
              </div>

              <h2 className="mt-3 text-2xl font-extrabold leading-tight">
                Find the Best Broker for You
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-300">
                Pick your country and core preferences to reach the most relevant
                broker page faster.
              </p>
            </div>

            <div className="bg-white p-4">
              <form className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label id="mobile-deposit-filter-label" className="mb-2 block text-xs font-extrabold text-slate-700">
  Deposit
</label>
<select
  aria-labelledby="mobile-deposit-filter-label"
  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
>
                      <option>Under $100</option>
                      <option>$100 - $500</option>
                      <option>$500 - $1000</option>
                      <option>Over $1000</option>
                    </select>
                  </div>

                  <div>
                    <label id="mobile-experience-filter-label" className="mb-2 block text-xs font-extrabold text-slate-700">
  Experience
</label>
<select
  aria-labelledby="mobile-experience-filter-label"
  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label id="mobile-platform-filter-label" className="mb-2 block text-xs font-extrabold text-slate-700">
  Platform
</label>
<select
  aria-labelledby="mobile-platform-filter-label"
  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
>
                    <option>Any Platform</option>
                    <option>MT4</option>
                    <option>MT5</option>
                    <option>cTrader</option>
                    <option>Multiple Platforms</option>
                  </select>
                </div>

                <CountryBrokerRedirect />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5) BEST BROKERS BY CATEGORY */}
      <section
        id="broker-finder-categories"
        className="scroll-mt-28 border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-[1520px] px-4 py-12 sm:px-6 lg:px-8">
          {(() => {
            const used = new Set<number>();

            function pickBroker(list: Broker[]) {
              const broker = list.find((b) => !used.has(b.id));
              if (broker) used.add(broker.id);
              return broker;
            }

            const sortedByRating = [...brokers].sort(
              (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
            );

            const sortedByDeposit = [...brokers].sort(
              (a, b) => (a.min_deposit ?? 999999) - (b.min_deposit ?? 999999)
            );

            const islamicList = brokers.filter((b) => isIslamicAvailable(b.islamic_account));

            const beginnerList = brokers.filter((b) => {
              const bestFor = `${b.best_for || ""} ${b.best_for_en || ""}`.toLowerCase();
              return bestFor.includes("beginner");
            });

            const topRatedBroker = pickBroker(sortedByRating);
            const beginnerBroker = pickBroker(beginnerList.length ? beginnerList : sortedByRating);
            const islamicBroker = pickBroker(islamicList.length ? islamicList : sortedByRating);
            const lowestDepositBroker = pickBroker(sortedByDeposit);

            const categoryCards = [
              {
                title: "Best Overall",
                color: "text-brand-600",
                broker: topRatedBroker,
                description:
                  "Chosen for its strong overall rating, balanced trading conditions, and broad appeal across different types of forex traders.",
              },
              {
                title: "Best for Beginners",
                color: "text-emerald-700",
                broker: beginnerBroker,
                description:
                  "A more suitable option for newer traders looking for a simpler start, reasonable deposit, and a clearer trading experience.",
              },
              {
                title: "Best Islamic Account",
                color: "text-purple-700",
                broker: islamicBroker,
                description:
                  "A leading choice for traders specifically looking for an Islamic trading account with suitable conditions and better flexibility.",
              },
              {
                title: "Lowest Deposit",
                color: "text-amber-700",
                broker: lowestDepositBroker,
                description:
                  "This broker stands out for traders who want to start with a smaller amount of capital and lower initial entry requirements.",
              },
            ];

            return (
              <>
                <div className="mb-10 text-left">
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                    Best Brokers by Trader Need
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    Not every broker suits every trader. These picks highlight brokers
                    for specific use cases such as beginners, Islamic accounts,
                    overall value, and lower deposit requirements.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {categoryCards.map((item, index) => {
                    const broker = item.broker;
                    if (!broker) return null;

                    return (
                      <article
                        key={`${broker.id}-${index}`}
                        className="flex min-h-[320px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                      >
                        <div className={`text-sm font-bold ${item.color}`}>{item.title}</div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl font-extrabold text-slate-950">
                              {brokerDisplayName(broker)}
                            </h3>

                            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-700">
                              <span>⭐</span>
                              <span>{ratingLabel(broker.rating)}</span>
                              <span>/ 5</span>
                            </div>
                          </div>

                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                            {broker.logo ? (
                              <div className="relative h-16 w-16">
                                <Image
                                  src={broker.logo}
                                  alt={brokerDisplayName(broker)}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <p className="mt-4 min-h-[84px] text-sm leading-7 text-slate-600">
                          {item.description}
                        </p>

                        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-slate-500">Minimum Deposit</span>
                            <span className="font-extrabold text-slate-950">
                              {formatDeposit(broker.min_deposit)}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                            <span className="text-slate-500">Islamic Account</span>
                            <span className="font-extrabold text-slate-950">
                              {isIslamicAvailable(broker.islamic_account)
                                ? "Available"
                                : "Not clear"}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/en/brokers/${broker.slug}`}
                          className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-brand-600"
                        >
                          Read Review
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* 6) HOW WE RATE BROKERS */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-[1520px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
              How We Rate Forex Brokers
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Our broker rankings are based on a practical review framework designed
              to help traders compare brokers more clearly and realistically.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-extrabold text-brand-600">
                1
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Regulation & oversight</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We examine the regulatory framework and licensing strength before ranking a broker.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-extrabold text-emerald-700">
                2
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Fees & spreads</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We compare spreads, commissions, and the likely cost impact on trading activity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-sm font-extrabold text-purple-700">
                3
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Trading platforms</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We look at platform availability, usability, and support for tools such as MT4 and MT5.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-sm font-extrabold text-amber-700">
                4
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Minimum deposit</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We highlight how much capital is required to open an account and start trading.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-sm font-extrabold text-rose-700">
                5
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Islamic account availability</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We indicate whether the broker offers an Islamic account and how clearly it is presented.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-extrabold text-slate-700">
                6
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Overall user experience</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We consider sign-up flow, platform clarity, support access, and the general trader experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7) FAQ */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
              Forex Broker FAQ
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              These are some of the most common questions traders ask before choosing a forex broker.
            </p>
          </div>

          <div className="space-y-3">
            <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5">
                <span className="text-sm font-extrabold text-slate-900 sm:text-base">
                  Which forex broker is best for beginners?
                </span>
                <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
                The best broker for beginners usually offers a lower minimum deposit,
                a straightforward platform experience, and easier account onboarding.
                Broker suitability can still vary by country and trading goals.
              </div>
            </details>

            <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5">
                <span className="text-sm font-extrabold text-slate-900 sm:text-base">
                  What is the minimum amount needed to start trading?
                </span>
                <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
                The minimum deposit varies from broker to broker. Some allow you to
                start with a small amount, while others require a higher initial deposit
                depending on account type and trading conditions.
              </div>
            </details>

            <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5">
                <span className="text-sm font-extrabold text-slate-900 sm:text-base">
                  Are the forex brokers on this page safe?
                </span>
                <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
                We focus on brokers with recognizable market presence and clearer
                regulatory standing where possible. Still, traders should always review
                account terms, regulation details, and broker suitability before opening
                a live account.
              </div>
            </details>

            <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5">
                <span className="text-sm font-extrabold text-slate-900 sm:text-base">
                  Do all brokers offer Islamic accounts?
                </span>
                <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
                No. Some brokers provide Islamic accounts directly, while others may
                offer them only on selected account types or under specific conditions.
                That is why this page highlights the feature separately.
              </div>
            </details>

            <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5">
                <span className="text-sm font-extrabold text-slate-900 sm:text-base">
                  How do I choose the right forex broker?
                </span>
                <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
                The right choice depends on regulation, trading costs, platforms,
                minimum deposit, available account features, and whether the broker
                matches your trading experience and country of residence.
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}