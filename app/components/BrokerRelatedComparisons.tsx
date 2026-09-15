"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";


type BrokerItem = {
  id: string | number;
  slug: string;
  name?: string | null;
  name_en?: string | null;
  logo?: string | null;
  rating?: string | number | null;
};

type Props = {
  broker: BrokerItem;
  relatedBrokers: BrokerItem[];
  locale?: "ar" | "en";
};

export default function BrokerRelatedComparisons({
  broker,
  relatedBrokers,
  locale = "ar",
}: Props) {
  const [offset, setOffset] = useState(0);
  const visitedKey = useRef<string | null>(null);

  const isEnglish = locale === "en";

  // Remove the current broker and duplicate companies.
  const candidates = relatedBrokers.filter(
    (item, index, items) =>
      item.slug &&
      item.slug !== broker.slug &&
      items.findIndex((other) => other.slug === item.slug) === index
  );

  const count = candidates.length;

  useEffect(() => {
    const currentVisitKey = `${locale}:${broker.slug}`;

    if (!count || visitedKey.current === currentVisitKey) return;

    visitedKey.current = currentVisitKey;

    const storageKey = `broker-comparisons:${locale}:${broker.slug}`;

    try {
      const saved = Number(localStorage.getItem(storageKey) || "0");

      const start =
        Number.isSafeInteger(saved) && saved >= 0
          ? saved % count
          : 0;

      setOffset(start);

      localStorage.setItem(
        storageKey,
        String((start + Math.min(3, count)) % count)
      );
    } catch {
      setOffset(0);
    }
  }, [broker.slug, count, locale]);

  const visibleBrokers = Array.from(
    { length: Math.min(3, count) },
    (_, index) => candidates[(offset + index) % count]
  );

  const currentBrokerName = isEnglish
    ? broker.name_en || broker.name || broker.slug
    : broker.name || broker.name_en || broker.slug;

  if (!visibleBrokers.length) {
    return (
      <p
        dir={isEnglish ? "ltr" : "rtl"}
        className={isEnglish ? "text-left text-sm text-slate-500" : "text-right text-sm text-slate-500"}
      >
        {isEnglish
          ? "No broker comparisons are currently available."
          : "لا توجد مقارنات متاحة حاليًا."}
      </p>
    );
  }

  return (
    <div
      dir={isEnglish ? "ltr" : "rtl"}
      className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
    >
      {visibleBrokers.map((item) => {
        const relatedBrokerName = isEnglish
          ? item.name_en || item.name || item.slug
          : item.name || item.name_en || item.slug;

        const href = isEnglish
          ? `/en/compare/${broker.slug}-vs-${item.slug}`
          : `/compare/${broker.slug}-vs-${item.slug}`;

        return (
          <Link
            key={item.id}
            href={href}
            aria-label={
              isEnglish
                ? `Compare ${currentBrokerName} with ${relatedBrokerName}`
                : `مقارنة ${currentBrokerName} مع ${relatedBrokerName}`
            }
            className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
          >
            {/* Logos */}
            <div className="flex items-center gap-3">
              {/* Current broker */}
              <div className="min-w-0 flex-1">
                <div className="flex h-16 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  {broker.logo ? (
                    <img
                      src={broker.logo}
                      alt={`${currentBrokerName} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-full scale-[1.55] object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400">
                      {isEnglish ? "No logo" : "لا يوجد شعار"}
                    </span>
                  )}
                </div>

                <div className="mt-2 truncate text-center text-xs font-semibold text-slate-900">
                  <bdi>{currentBrokerName}</bdi>
                </div>
              </div>

              {/* VS */}
              <span className="shrink-0 text-[10px] font-semibold uppercase text-slate-400">
                VS
              </span>

              {/* Related broker */}
              <div className="min-w-0 flex-1">
                <div className="flex h-16 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={`${relatedBrokerName} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-full scale-[1.55] object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400">
                      {isEnglish ? "No logo" : "لا يوجد شعار"}
                    </span>
                  )}
                </div>

                <div className="mt-2 truncate text-center text-xs font-semibold text-slate-900">
                  <bdi>{relatedBrokerName}</bdi>
                </div>
              </div>
            </div>

            {/* Comparison title */}
            <h3 className="mt-4 text-center text-sm font-extrabold leading-6 text-slate-950">
              {isEnglish ? (
                <>
                  Compare <bdi>{currentBrokerName}</bdi> with{" "}
                  <bdi>{relatedBrokerName}</bdi>
                </>
              ) : (
                <>
                  مقارنة <bdi>{currentBrokerName}</bdi> مع{" "}
                  <bdi>{relatedBrokerName}</bdi>
                </>
              )}
            </h3>

            {/* Description */}
            <p className="mt-1 text-center text-xs leading-6 text-slate-500">
              {isEnglish
                ? "Compare regulation, fees, accounts and trading platforms."
                : "التراخيص، الرسوم، الحسابات ومنصات التداول."}
            </p>

            {/* Rating */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <span className="min-w-0 truncate text-xs text-slate-500">
                {isEnglish ? (
                  <>
                    <bdi>{relatedBrokerName}</bdi> rating
                  </>
                ) : (
                  <>
                    تقييم <bdi>{relatedBrokerName}</bdi>
                  </>
                )}
              </span>

              <span className="shrink-0 text-xs font-extrabold text-slate-950">
                {item.rating ?? "—"} / 5
              </span>
            </div>

            {/* CTA */}
            <div className="mt-3 flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 text-xs font-bold text-brand-600 transition group-hover:bg-blue-100">
              <span>
                {isEnglish ? "View comparison" : "عرض المقارنة"}
              </span>

              <span aria-hidden="true">
                {isEnglish ? "→" : "←"}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}