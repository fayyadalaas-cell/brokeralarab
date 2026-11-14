"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Alternative = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string;
  rating: number | null;
  logo: string | null;
  real_account_url: string | null;
  account_opening_status: "active" | "suspended" | null;
};

type Props = {
  brokers: Alternative[];
};

export default function BrokerTopAlternatives({ brokers }: Props) {
  const [selected, setSelected] = useState<Alternative[]>(
    brokers.slice(0, 3)
  );

  useEffect(() => {
    const shuffled = [...brokers];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setSelected(shuffled.slice(0, 3));
  }, [brokers]);

  if (!selected.length) return null;

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {selected.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
        >
          <Link
            href={`/brokers/${item.slug}`}
            className="block"
          >
            <div className="relative mx-auto flex h-20 w-full max-w-[170px] items-center justify-center">
              {item.logo ? (
                <Image
  src={item.logo}
  alt={`شعار ${item.name || item.name_en}`}
  fill
  sizes="170px"
  className={`object-contain ${
  item.slug === "tickmill"
    ? "scale-[1.25] translate-y-[7px]"
    : "scale-[1.35]"
}`}
/>
              ) : (
                <span className="font-bold text-slate-700">
                  {item.name || item.name_en}
                </span>
              )}
            </div>

            <h3 className="mt-3 text-base font-black text-slate-950">
              {item.name || item.name_en}
            </h3>
          </Link>

          <div className="mt-3 text-sm font-bold text-slate-600">
            تقييم بروكر العرب
          </div>

          <div className="mt-1 text-xl font-black text-brand-600">
            {item.rating?.toFixed(2) ?? "—"} / 5
          </div>

          <div className="mt-4 grid w-full grid-cols-2 gap-2">
  <Link
    href={`/brokers/${item.slug}`}
    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 px-2 py-2 text-center text-[12px] font-bold text-brand-600 transition hover:bg-brand-100"
  >
    اقرأ التقييم
  </Link>

  {item.account_opening_status === "suspended" ||
  item.slug === "markets" ? (
    <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 px-2 py-2 text-center text-[11px] font-bold text-amber-800">
      الإحالات موقوفة
    </span>
  ) : item.real_account_url?.trim() ? (
    <a
      href={`/go/${item.slug}?type=real`}
      rel="sponsored nofollow"
      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-center text-[12px] font-bold text-white transition hover:bg-brand-600"
    >
      فتح حساب
    </a>
  ) : (
    <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-center text-[11px] font-bold text-slate-400">
      غير متاح
    </span>
  )}
</div>
        </article>
      ))}
    </div>
  );
}