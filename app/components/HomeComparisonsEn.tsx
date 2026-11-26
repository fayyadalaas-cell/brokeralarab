"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* =========================================================
   BROKER ALARAB — HOME BROKER COMPARISONS (ENGLISH)
========================================================= */

type ComparisonBroker = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  rating: number | null;
};

type ComparisonItem = {
  slug: string;
  broker1: ComparisonBroker;
  broker2: ComparisonBroker;
};

type Props = {
  comparisons: ComparisonItem[];
};

/* =========================================================
   RANDOM SELECTION — UNIQUE BROKERS
========================================================= */

function selectRandomComparisons(
  comparisons: ComparisonItem[],
  count: number = 4
): ComparisonItem[] {

  const shuffled = [...comparisons];

  /* RANDOM SHUFFLE */

  for (let i = shuffled.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];

  }

  /* SELECT COMPARISONS WITHOUT REPEATING BROKERS */

  const selected: ComparisonItem[] = [];

  const usedBrokerIds = new Set<number>();

  for (const comparison of shuffled) {

    const broker1Id = comparison.broker1.id;
    const broker2Id = comparison.broker2.id;

    if (
      broker1Id === broker2Id ||
      usedBrokerIds.has(broker1Id) ||
      usedBrokerIds.has(broker2Id)
    ) {
      continue;
    }

    selected.push(comparison);

    usedBrokerIds.add(broker1Id);
    usedBrokerIds.add(broker2Id);

    if (selected.length >= count) {
      break;
    }

  }

  return selected;
}

/* =========================================================
   BROKER LOGO AND RATING
========================================================= */

/* =========================================================
   BROKER LOGO NORMALIZATION
========================================================= */

const LOGO_SCALES: Record<string, number> = {
  "capital-com": 1.50,
  "ultima-markets": 1.20,
  "moneta-markets": 1.55,
  "justmarkets": 1.20,
  "plus500": 1.80,
  "multibank": 1.75,
  "markets-com": 1.55,
  "xm": 1.65,
  "avatrade": 1.65,
  "hfm": 1.65,
  "xs": 1.60,
  "fxpro": 1.60,
  "admirals": 1.30,
};

/* =========================================================
   BROKER IDENTITY
========================================================= */

function BrokerIdentity({
  broker,
}: {
  broker: ComparisonBroker;
}) {

  const logoScale =
    LOGO_SCALES[broker.slug.toLowerCase()] ?? 1.55;

  return (

    <div className="flex w-full min-w-0 flex-col items-center text-center">

      {/* BROKER LOGO */}

      <Link
        href={`/en/brokers/${broker.slug}`}
        aria-label={`${broker.name} Review`}
        title={`${broker.name} Review`}
        className="group/logo flex h-[66px] w-full min-w-0 items-center justify-center overflow-hidden sm:h-[78px] lg:h-[88px] xl:h-[100px]"
      >

        {broker.logo ? (

          <div className="flex h-full w-full min-w-0 max-w-[130px] items-center justify-center sm:max-w-[140px] lg:max-w-[160px] xl:max-w-[190px]">

            <img
              src={broker.logo}
              alt={`${broker.name} logo`}
              loading="lazy"
              className="block h-[54px] w-full max-w-full object-contain object-center mix-blend-multiply transition-opacity duration-300 group-hover/logo:opacity-80 sm:h-[64px] lg:h-[72px] xl:h-[82px]"
              style={{
                transform: `scale(${logoScale})`,
                transformOrigin: "center center",
              }}
            />

          </div>

        ) : (

          <span className="break-words text-[13px] font-black leading-5 text-[#10233f] sm:text-[14px] xl:text-[18px]">

            {broker.name}

          </span>

        )}

      </Link>

      {/* FIXED BROKER RATING */}

      <div
        dir="ltr"
        aria-label={
          broker.rating != null
            ? `${broker.name} rating: ${broker.rating.toFixed(2)} out of 5`
            : `${broker.name} rating unavailable`
        }
        className="mt-1.5 flex h-[24px] shrink-0 items-center justify-center gap-1 sm:mt-2 xl:gap-1.5"
      >

        <span
          aria-hidden="true"
          className="text-[14px] leading-none text-amber-500 xl:text-[18px]"
        >

          ★

        </span>

        <span className="text-[13px] font-black tabular-nums text-[#10233f] xl:text-[15px]">

          {broker.rating?.toFixed(2) ?? "—"}

        </span>

        <span className="text-[10px] font-medium text-slate-400 xl:text-[11px]">

          / 5

        </span>

      </div>

    </div>

  );

}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function HomeComparisonsEn({
  comparisons,
}: Props) {

  const [visibleComparisons, setVisibleComparisons] =
    useState<ComparisonItem[]>(() => {

      const selected: ComparisonItem[] = [];

      const usedBrokerIds = new Set<number>();

      for (const comparison of comparisons) {

        const broker1Id = comparison.broker1.id;
        const broker2Id = comparison.broker2.id;

        if (
          broker1Id === broker2Id ||
          usedBrokerIds.has(broker1Id) ||
          usedBrokerIds.has(broker2Id)
        ) {
          continue;
        }

        selected.push(comparison);

        usedBrokerIds.add(broker1Id);
        usedBrokerIds.add(broker2Id);

        if (selected.length >= 4) {
          break;
        }

      }

      return selected;

    });

  useEffect(() => {
    setVisibleComparisons(
      selectRandomComparisons(comparisons, 4)
    );
  }, [comparisons]);

  if (visibleComparisons.length === 0) {
    return null;
  }

  return (

    <section
      id="home-comparisons"
      dir="ltr"
      lang="en"
      aria-labelledby="home-comparisons-title"
      className="mx-auto flex w-full flex-col pb-3 pt-3 sm:pb-4 sm:pt-4 xl:flex-1"
    >

      {/* =================================================
          EXTERNAL SECTION HEADER
      ================================================== */}

      <div className="mb-4 flex min-h-[44px] shrink-0 items-center">

        <h2
          id="home-comparisons-title"
          className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
        >

          <Link
            href="/en/compare"
            className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
          >

            Broker Comparisons

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover/title:translate-x-1"
            >

              <path d="m9 18 6-6-6-6" />

            </svg>

          </Link>

        </h2>

      </div>

      {/* =================================================
    COMPARISON CARDS
================================================== */}

<div className="grid grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-2 md:gap-4 xl:flex-1 xl:auto-rows-fr">

  {visibleComparisons.map((comparison) => (

    <article
      key={comparison.slug}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[13px] border border-slate-200 bg-white transition duration-300 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:rounded-[18px]"
    >

      {/* TOP ACCENT */}

      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-60" />

      {/* CARD CONTENT */}

      <div className="flex flex-1 flex-col px-3 pt-2 sm:px-5 sm:pt-4">

        {/* =============================================
            BROKER IDENTITIES
        ============================================== */}

        <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] items-center gap-2 py-1 sm:grid-cols-[minmax(0,1fr)_34px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_38px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] sm:py-2">

          {/* FIRST BROKER */}

          <BrokerIdentity
            broker={comparison.broker1}
          />

          {/* =============================================
              VS SYMBOL — CENTERED WITH BROKER LOGOS
          ============================================== */}

          <div className="flex min-w-0 flex-col items-center">

            <div className="flex h-[66px] items-center justify-center sm:h-[78px] lg:h-[88px] xl:h-[100px]">

              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border border-[#d5e3f5] bg-[#edf3fc] text-[11px] font-black text-brand-600 sm:h-[34px] sm:w-[34px] lg:h-[38px] lg:w-[38px] xl:h-[44px] xl:w-[44px] xl:text-[14px]">

                VS

              </div>

            </div>

            {/* RATING ALIGNMENT SPACER */}

            <div
              aria-hidden="true"
              className="mt-1.5 h-[24px] sm:mt-2"
            />

          </div>

          {/* SECOND BROKER */}

          <BrokerIdentity
            broker={comparison.broker2}
          />

        </div>

        {/* =============================================
            CARD FOOTER
            SEO FRIENDLY COMPARISON LINK
        ============================================== */}

        <div className="mt-auto pt-1 sm:pt-2">

          <div className="flex min-w-0 items-center justify-between gap-3 border-t border-slate-200 py-2 sm:py-3.5">

            <Link
              href={`/en/compare/${comparison.slug}`}
              aria-label={`Compare ${comparison.broker1.name} vs ${comparison.broker2.name}`}
              className="group/read flex min-h-[32px] min-w-0 flex-1 items-center justify-between gap-2 text-[12px] font-black leading-5 text-[#194b92] transition hover:text-brand-600 sm:min-h-0 sm:gap-3 sm:text-[16px] sm:leading-6"
            >

              <span className="min-w-0 break-words">

                <bdi>{comparison.broker1.name}</bdi>

                {" "}vs{" "}

                <bdi>{comparison.broker2.name}</bdi>

                {" "}Comparison

              </span>

              <span
                aria-hidden="true"
                className="shrink-0 text-[16px] transition-transform duration-200 group-hover/read:translate-x-1 sm:text-[18px]"
              >

                →

              </span>

            </Link>

          </div>

        </div>

      </div>

    </article>

  ))}

</div>

    </section>

  );

}