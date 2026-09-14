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
};

export default function BrokerRelatedComparisons({
  broker,
  relatedBrokers,
}: Props) {
  const [offset, setOffset] = useState(0);
  const visitedSlug = useRef<string | null>(null);

  // إزالة الشركة الحالية وأي شركات مكررة.
  const candidates = relatedBrokers.filter(
    (item, index, items) =>
      item.slug !== broker.slug &&
      items.findIndex((other) => other.slug === item.slug) === index
  );

  const count = candidates.length;
  console.log("عدد شركات المقارنة المتاحة:", count);

  useEffect(() => {
    if (!count || visitedSlug.current === broker.slug) return;

    visitedSlug.current = broker.slug;

    const key = `broker-comparisons:${broker.slug}`;

    try {
      const saved = Number(localStorage.getItem(key) || "0");

      const start =
        Number.isSafeInteger(saved) && saved >= 0
          ? saved % count
          : 0;

      setOffset(start);

      localStorage.setItem(
        key,
        String((start + Math.min(3, count)) % count)
      );
    } catch {
      // عرض أول مجموعة إذا تعذر استخدام التخزين.
      setOffset(0);
    }
  }, [broker.slug, count]);

  const selected = Array.from(
    { length: Math.min(3, count) },
    (_, index) => candidates[(offset + index) % count]
  );

  const currentName = broker.name || broker.name_en || broker.slug;

  const renderLogo = (item: BrokerItem) => (
    <div className="flex h-14 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-3 md:h-16">
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.name || item.name_en || item.slug}
          loading="lazy"
          width={120}
          height={48}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-xs font-semibold text-slate-500">
          {item.name || item.name_en || item.slug}
        </span>
      )}
    </div>
  );

  return (
    <div
      dir="rtl"
      className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
    >
      {selected.length ? (
        selected.map((item) => {
          const otherName = item.name || item.name_en || item.slug;

          return (
            <Link
              key={item.id}
              href={`/compare/${broker.slug}-vs-${item.slug}`}
              className="group flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-brand-200 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:p-4"
            >
              {/* الشركة الحالية أولًا دائمًا */}
              <div className="grid grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] items-start gap-2">
                <div className="min-w-0 text-center">
                  {renderLogo(broker)}
                  <div className="mt-1.5 break-words text-xs font-semibold leading-5 text-slate-800">
                    <bdi>{currentName}</bdi>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="pt-5 text-center text-[10px] font-semibold text-slate-400"
                >
                  VS
                </span>

                <div className="min-w-0 text-center">
                  {renderLogo(item)}
                  <div className="mt-1.5 break-words text-xs font-semibold leading-5 text-slate-800">
                    <bdi>{otherName}</bdi>
                  </div>
                </div>
              </div>

              <h3 className="mt-3 text-center text-[13px] font-bold leading-6 text-slate-950 md:text-sm">
                مقارنة <bdi>{currentName}</bdi> مع{" "}
                <bdi>{otherName}</bdi>
              </h3>

              <p className="mt-1 text-center text-xs leading-6 text-slate-500">
                التراخيص، الرسوم، الحسابات ومنصات التداول.
              </p>

              <div className="mt-auto pt-3">
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <span className="min-w-0 text-xs leading-5 text-slate-500">
                    تقييم <bdi>{otherName}</bdi>
                  </span>

                  <span className="shrink-0 text-xs font-bold text-slate-950">
                    <bdi dir="ltr">{item.rating ?? "—"} / 5</bdi>
                  </span>
                </div>

                <div className="mt-3 flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-50 text-xs font-semibold text-brand-600 transition group-hover:bg-brand-100">
                  عرض المقارنة
                  <span aria-hidden="true">←</span>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="text-xs leading-6 text-slate-500">
          لا توجد مقارنات متاحة حاليًا.
        </p>
      )}
    </div>
  );
}