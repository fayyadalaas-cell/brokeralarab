"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type BrokerOption = {
  name: string;
  slug: string;
};

type Props = {
  brokers: BrokerOption[];
};

function normalizeSlugOrder(a: string, b: string) {
  return [a, b].sort((x, y) => x.localeCompare(y)).join("-vs-");
}

export default function ComparePickerEN({ brokers }: Props) {
  const router = useRouter();

  const [first, setFirst] = useState(brokers[0]?.slug || "");
  const [second, setSecond] = useState(brokers[1]?.slug || "");

  const secondOptions = useMemo(() => {
    return brokers.filter((b) => b.slug !== first);
  }, [brokers, first]);

  function handleCompare() {
    if (!first || !second || first === second) return;
    const slug = normalizeSlugOrder(first, second);

    // 🔥 مهم جداً: /en
    router.push(`/en/compare/${slug}`);
  }

  return (
    <div className="rounded-[30px] border border-slate-200 bg-[#f8fbff] p-5 shadow-sm sm:p-6">
      
      {/* HEADER */}
      <div className="mb-6">
        <div className="text-sm font-bold text-brand-600">
          Start Comparison
        </div>

        <h2 className="mt-2 text-3xl font-black">
          Choose Two Brokers
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          Select the first and second broker, then open the detailed comparison page between them.
        </p>
      </div>

      {/* SELECTS */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
        
        {/* FIRST */}
        <div>
         <label id="compare-first-broker-en-label" className="mb-2 block text-sm font-bold text-slate-700">
  First Broker
</label>

<select
  aria-labelledby="compare-first-broker-en-label"
            value={first}
            onChange={(e) => {
              const value = e.target.value;
              setFirst(value);

              if (value === second) {
                const fallback = brokers.find((b) => b.slug !== value);
                setSecond(fallback?.slug || "");
              }
            }}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-brand-500"
          >
            {brokers.map((broker) => (
              <option key={broker.slug} value={broker.slug}>
                {broker.name}
              </option>
            ))}
          </select>
        </div>

        {/* SECOND */}
        <div>
         <label id="compare-second-broker-en-label" className="mb-2 block text-sm font-bold text-slate-700">
  Second Broker
</label>

<select
  aria-labelledby="compare-second-broker-en-label"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-brand-500"
          >
            {secondOptions.map((broker) => (
              <option key={broker.slug} value={broker.slug}>
                {broker.name}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTON */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleCompare}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-extrabold !text-white transition hover:bg-brand-600 lg:w-auto"
          >
            Compare Now
          </button>
        </div>
      </div>

      {/* NOTE */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        This tool saves you time by taking you directly to the comparison page instead of browsing many different comparisons.
      </div>
    </div>
  );
}