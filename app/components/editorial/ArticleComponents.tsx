import type { ReactNode } from "react";

/* =========================================================
   BROKER ALARAB
   SHARED ARTICLE COMPONENTS
   Arabic & English
========================================================= */

/* =========================================================
   ARTICLE SECTION
========================================================= */

export function ArticleSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-slate-100 py-5 last:border-0 sm:py-7"
    >
      {eyebrow && (
        <span className="mb-2 block text-[11px] font-extrabold text-[#176ac8] sm:text-xs">
          {eyebrow}
        </span>
      )}

      <h2 className="border-s-[4px] border-[#2587e7] ps-3 text-[22px] font-black leading-[1.5] tracking-tight text-[#101d35] sm:ps-4 sm:text-[29px]">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-[14px] leading-[2.05] text-slate-700 sm:text-[16px] sm:leading-[2]">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   SUBHEADING
========================================================= */

export function SubHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h3 className="!mt-8 text-[17px] font-black leading-[1.7] text-[#102a4a] sm:text-[20px]">
      {children}
    </h3>
  );
}

/* =========================================================
   PARAGRAPH
========================================================= */

export function Paragraph({
  children,
}: {
  children: ReactNode;
}) {
  return <p>{children}</p>;
}

/* =========================================================
   STRONG TEXT
========================================================= */

export function Strong({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <strong className="font-black text-[#11294b]">
      {children}
    </strong>
  );
}

/* =========================================================
   ARTICLE LIST
========================================================= */

export function ArticleList({
  items,
}: {
  items: ReactNode[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3"
        >
          <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#2587e7]" />

          <span className="min-w-0 flex-1">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* =========================================================
   ARTICLE NOTE
========================================================= */

export function Note({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "amber";
}) {
  const amber = tone === "amber";

  return (
    <aside
      className={`!my-5 rounded-[15px] border p-4 sm:p-5 ${
        amber
          ? "border-amber-200 bg-[#fffbef]"
          : "border-blue-100 bg-[#f1f7fe]"
      }`}
    >
      <div
        className={`text-[13px] font-black sm:text-[15px] ${
          amber
            ? "text-amber-900"
            : "text-[#10549f]"
        }`}
      >
        {title}
      </div>

      <div className="mt-2 text-[13px] leading-[2] text-slate-700 sm:text-[14px]">
        {children}
      </div>
    </aside>
  );
}

/* =========================================================
   FAQ ITEM
========================================================= */

export function FAQItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 py-5 first:pt-0 last:border-0 last:pb-0">

      <h3 className="text-[15px] font-black leading-7 text-[#102747] sm:text-[17px]">
        {question}
      </h3>

      <div className="mt-2 text-[13px] leading-[2] text-slate-600 sm:text-[15px]">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   ARTICLE INTRODUCTION
========================================================= */

export function ArticleIntroduction({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="space-y-5 text-[14px] leading-[2.15] text-slate-700 sm:text-[16px] sm:leading-[2.1]">
      {children}
    </div>
  );
}

/* ================= END ARTICLE COMPONENTS ================= */