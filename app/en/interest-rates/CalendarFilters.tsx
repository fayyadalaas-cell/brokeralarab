
"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { FormEvent } from "react";

type Option = {
  value: string;
  label: string;
};

type CalendarFiltersProps = {
  selectedBank: string;
  selectedYear: string;
  bankOptions: Option[];
  yearOptions: Option[];
};

export default function CalendarFilters({
  selectedBank,
  selectedYear,
  bankOptions,
  yearOptions,
}: CalendarFiltersProps) {
  const router = useRouter();

  const [bank, setBank] = useState(selectedBank);
  const [year, setYear] = useState(selectedYear);

  const [pending, startTransition] = useTransition();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams({
      bank,
      year,
    });

    startTransition(() => {
      router.push(
        `/en/interest-rates?${params.toString()}#calendar`,
        { scroll: false }
      );
    });
  }

  return (
    <form
      dir="ltr"
      lang="en"
      onSubmit={submit}
      className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
    >
      {/* CENTRAL BANK FILTER */}

      <label className="block min-w-0 flex-1">
        <span className="mb-1.5 block text-[11px] font-black text-slate-600">
          Central Bank
        </span>

        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {bankOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {/* YEAR FILTER */}

      <label className="block min-w-0 flex-1">
        <span className="mb-1.5 block text-[11px] font-black text-slate-600">
          Year
        </span>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {yearOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {/* APPLY FILTERS BUTTON */}

      <button
        type="submit"
        disabled={pending}
        className="h-11 rounded-xl bg-[#2471df] px-6 text-xs font-black text-white transition hover:bg-[#1e5bb8] disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Updating..." : "Show Results"}
      </button>
    </form>
  );
}
