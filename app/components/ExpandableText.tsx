"use client"

import { useState } from "react"

export default function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <p
        className={`text-base leading-8 text-slate-600 md:text-lg md:leading-9 ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {text}
      </p>

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
        >
          عرض المزيد
        </button>
      )}
    </div>
  )
}