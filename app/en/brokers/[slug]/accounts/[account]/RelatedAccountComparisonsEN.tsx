
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Comparison = {
  key: string;
  brokerName: string;
  accountName: string;
  href: string;
  matchPriority: number;
};

type Props = {
  currentBrokerName: string;
  currentAccountName: string;
  comparisons: Comparison[];
};

function chooseComparisons(items: Comparison[], randomize: boolean) {
  const shuffle = (list: Comparison[]) => {
    const result = [...list];

    if (randomize) {
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
    }

    return result;
  };

  const matching = shuffle(
    items.filter((item) => item.matchPriority === 0)
  );

  const fallback = shuffle(
    items.filter((item) => item.matchPriority !== 0)
  );

  const selected: Comparison[] = [];
  const usedBrokers = new Set<string>();

  for (const item of [...matching, ...fallback]) {
    const broker = item.brokerName.toLowerCase().trim();

    if (usedBrokers.has(broker)) continue;

    selected.push(item);
    usedBrokers.add(broker);

    if (selected.length === 3) break;
  }

  return selected;
}

export default function RelatedAccountComparisonsEN({
  currentBrokerName,
  currentAccountName,
  comparisons,
}: Props) {
  const [selected, setSelected] = useState<Comparison[]>(() =>
    chooseComparisons(comparisons, false)
  );

  useEffect(() => {
    setSelected(chooseComparisons(comparisons, true));
  }, [comparisons]);

  if (comparisons.length === 0) return null;

  return (
    <section
      dir="ltr"
      className="mx-auto max-w-[1520px] px-4 pb-10 pt-5"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-7">
        <div className="mb-5">
          <span className="text-[11px] font-black text-brand-600">
            Trading Account Comparisons
          </span>

          <h2 className="mt-2 text-[21px] font-black leading-8 text-slate-950 md:text-[26px]">
            Compare {currentAccountName} with Other Brokers
          </h2>

          <p className="mt-2 text-[12px] leading-7 text-slate-500 md:text-sm">
            Discover how the {currentAccountName} account at{" "}
            {currentBrokerName} compares with trading accounts
            offered by other brokers.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {selected.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group flex min-h-[112px] flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] items-center gap-2 text-center">
                <div className="min-w-0">
                  <div className="text-[12px] font-black text-slate-900">
                    {currentBrokerName}
                  </div>

                  <div className="mt-1 break-words text-[11px] text-slate-500">
                    {currentAccountName}
                  </div>
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white text-[10px] font-black text-brand-600">
                  VS
                </span>

                <div className="min-w-0">
                  <div className="text-[12px] font-black text-slate-900">
                    {item.brokerName}
                  </div>

                  <div className="mt-1 break-words text-[11px] text-slate-500">
                    {item.accountName}
                  </div>
                </div>
              </div>

              <div className="mt-3 border-t border-slate-200 pt-2 text-center text-[11px] font-black text-brand-600">
                View Account Comparison →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
