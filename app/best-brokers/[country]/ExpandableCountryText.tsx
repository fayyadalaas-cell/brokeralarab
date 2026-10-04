"use client";

import { useState } from "react";

type ExpandableCountryTextProps = {
  paragraphs: string[];
};

export default function ExpandableCountryText({
  paragraphs,
}: ExpandableCountryTextProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-3 flex-1 sm:mt-4">
      {/* MOBILE ONLY */}
      <div className="md:hidden">
        <div
          className={
            expanded
              ? "space-y-3"
              : "relative max-h-[72px] overflow-hidden"
          }
        >
          <div className="space-y-3">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-right text-[12px] font-medium leading-[1.95] text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {!expanded ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-3 inline-flex min-h-[34px] items-center gap-1.5 rounded-lg bg-brand-50 px-3 text-[10px] font-black text-brand-700 ring-1 ring-brand-100 transition active:scale-[0.98]"
        >
          {expanded ? "عرض أقل" : "عرض المزيد"}

          <span
            className={`text-[11px] transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </button>
      </div>

      {/* TABLET + DESKTOP */}
      <div className="hidden space-y-3 md:block">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-right text-[13px] font-medium leading-[2] text-slate-600"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}