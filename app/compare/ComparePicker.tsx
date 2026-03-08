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

export default function ComparePicker({ brokers }: Props) {
  const router = useRouter();

  const [first, setFirst] = useState(brokers[0]?.slug || "");
  const [second, setSecond] = useState(brokers[1]?.slug || "");

  const secondOptions = useMemo(() => {
    return brokers.filter((b) => b.slug !== first);
  }, [brokers, first]);

  function handleCompare() {
    if (!first || !second || first === second) return;
    const slug = normalizeSlugOrder(first, second);
    router.push(`/compare/${slug}`);
  }

  return (
    <div className="rounded-[30px] border border-slate-200 bg-[#f8fbff] p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <div className="text-sm font-bold text-[#1d4ed8]">ابدأ المقارنة</div>
        <h2 className="mt-2 text-3xl font-black">اختر شركتين للمقارنة</h2>
        <p className="mt-3 text-base leading-8 text-slate-600">
          اختر الشركة الأولى والثانية، ثم افتح صفحة المقارنة التفصيلية بينهما.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            الشركة الأولى
          </label>
          <select
            value={first}
            onChange={(e) => {
              const value = e.target.value;
              setFirst(value);
              if (value === second) {
                const fallback = brokers.find((b) => b.slug !== value);
                setSecond(fallback?.slug || "");
              }
            }}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#2563eb]"
          >
            {brokers.map((broker) => (
              <option key={broker.slug} value={broker.slug}>
                {broker.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            الشركة الثانية
          </label>
          <select
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#2563eb]"
          >
            {secondOptions.map((broker) => (
              <option key={broker.slug} value={broker.slug}>
                {broker.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleCompare}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-sm font-extrabold !text-white transition hover:bg-[#1d4ed8] lg:w-auto"
          >
            ابدأ المقارنة
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        بهذه الطريقة لن تحتاج إلى تصفح مئات المقارنات لاحقًا عندما يزيد عدد
        الشركات، بل ستصل مباشرة إلى صفحة المقارنة التي تريدها.
      </div>
    </div>
  );
}