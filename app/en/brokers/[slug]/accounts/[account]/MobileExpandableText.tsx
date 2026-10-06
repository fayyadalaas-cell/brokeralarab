"use client";

import { useState } from "react";

type MobileExpandableTextProps = {
  children: React.ReactNode;
  className?: string;
  lines?: number;
};

export default function MobileExpandableText({
  children,
  className = "",
  lines = 3,
}: MobileExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className={`${className} ${
          expanded ? "" : "overflow-hidden"
        }`}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: lines,
                WebkitBoxOrient: "vertical",
              }
        }
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mt-2 inline-flex items-center gap-1 text-xs font-black text-brand-600"
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Show more"}

        <span
          aria-hidden="true"
          className={`text-[10px] transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
    </div>
  );
}