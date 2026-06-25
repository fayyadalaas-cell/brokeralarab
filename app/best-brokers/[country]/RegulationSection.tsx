"use client";

import { useMemo, useState } from "react";

type Props = {
  regulationTitle: string | null;
  regulationText: string | null;
  sidebarTitle: string | null;
  sidebarText: string | null;
  sidebarPoints: string | null;
};

function splitDoublePipe(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function RegulationSection({
  regulationTitle,
  regulationText,
  sidebarTitle,
  sidebarText,
  sidebarPoints,
}: Props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [expandedMobileText, setExpandedMobileText] = useState(false);

  const regulationParts = splitDoublePipe(
    regulationText
      ?.split("\n")
      .find((line) => line.includes("||")) ?? ""
  );

  const sidebarParts = splitDoublePipe(sidebarPoints ?? "");

  const textLines = useMemo(
    () =>
      (regulationText ?? "")
        .split("\n")
        .filter((line) => line.trim() && !line.includes("||")),
    [regulationText]
  );

  const hasSidebar =
    Boolean(sidebarTitle) || Boolean(sidebarText) || sidebarParts.length > 0;

  const mobileText = textLines.join("\n\n");

  if (!regulationTitle || !regulationText) return null;

  return (
    <section className="mt-6 overflow-hidden rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:mt-8 sm:rounded-[32px] sm:p-7">
      <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600 sm:text-xs">
        الوضع التنظيمي
      </div>

      {/* ================= Mobile ================= */}
      <div className="mt-4 lg:hidden">
        <h2 className="text-[18px] leading-[1.5] font-black tracking-tight text-slate-950 sm:text-[20px]">
          {regulationTitle}
        </h2>

        <div
          className={
            expandedMobileText
              ? "mt-5 whitespace-pre-line text-[15px] leading-8 text-slate-700"
              : "mt-5 overflow-hidden whitespace-pre-line text-[15px] leading-8 text-slate-700 [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]"
          }
        >
          {mobileText}
        </div>

        {mobileText.length > 220 ? (
          <button
            type="button"
            onClick={() => setExpandedMobileText((v) => !v)}
            className="mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
          >
            {expandedMobileText ? "إظهار أقل" : "اقرأ المزيد"}
          </button>
        ) : null}

        {regulationParts.length > 0 ? (
          <div className="mt-5 grid gap-3">
            {regulationParts.map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_8px_18px_rgba(15,23,42,0.04)]"
              >
                <div className="absolute right-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_100%)] opacity-90" />
                <div className="pt-1 text-sm font-bold leading-7 text-slate-800">
                  {item}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {hasSidebar ? (
          <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] shadow-[0_12px_26px_rgba(15,23,42,0.06)]">
            <button
              type="button"
              onClick={() => setOpenSidebar((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-4 text-right"
            >
              <div>
                <div className="text-[11px] font-black text-slate-500">
                  معلومات إضافية
                </div>
                <div className="mt-1 text-[20px] font-black text-slate-950">
                  {sidebarTitle || "معلومات تنظيمية مهمة"}
                </div>
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-black text-slate-500 shadow-sm">
                {openSidebar ? "−" : "+"}
              </span>
            </button>

            {openSidebar ? (
              <div className="border-t border-slate-200 bg-white/70 px-4 pb-4 pt-3">
                {sidebarText ? (
                  <p className="text-[14px] leading-7 text-slate-700">
                    {sidebarText}
                  </p>
                ) : null}

                {sidebarParts.length > 0 ? (
                  <div className="mt-4 space-y-2.5">
                    {sidebarParts.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[13px] font-bold leading-6 text-slate-800 shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Mobile CTA buttons - تحت الجهة التنظيمية */}
        <div className="mt-5 space-y-3">
          <a
            href="/best-brokers"
            className="block w-full rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-black text-white shadow hover:bg-brand-600 transition"
          >
            شاهد أفضل الشركات
          </a>

          <a
            href="/brokers"
            className="block w-full rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-black text-white shadow hover:bg-brand-600 transition"
          >
            استعرض جميع التقييمات
          </a>
        </div>
      </div>

      {/* ================= Desktop ================= */}
      <div className="mt-5 hidden lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
        <div className={hasSidebar ? "lg:col-span-8" : "lg:col-span-12"}>
          <h2 className="text-[30px] leading-[1.12] font-black tracking-tight text-slate-950 xl:text-[38px]">
            {regulationTitle}
          </h2>

          <div className="mt-5 space-y-4 text-[16px] leading-8 text-slate-700">
            {textLines.map((line, i) => {
              const trimmed = line.trim();

              if (trimmed.endsWith("إلى:")) {
                return (
                  <div
                    key={i}
                    className="pt-1 text-[22px] font-black text-slate-950"
                  >
                    {trimmed}
                  </div>
                );
              }

              return <p key={i}>{trimmed}</p>;
            })}
          </div>

          {regulationParts.length > 0 ? (
            <div className="mt-6 grid gap-3 xl:grid-cols-2">
              {regulationParts.map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold leading-7 text-slate-800 shadow-[0_8px_18px_rgba(15,23,42,0.04)]"
                >
                  <div className="absolute right-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_100%)] opacity-90" />
                  <div className="pt-1">{item}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {hasSidebar ? (
          <aside className="lg:col-span-4">
            <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
              <div className="text-[11px] font-black tracking-wide text-slate-500">
                معلومات إضافية
              </div>

              {sidebarTitle ? (
                <h3 className="mt-2 text-[24px] leading-8 font-black text-slate-950">
                  {sidebarTitle}
                </h3>
              ) : null}

              {sidebarText ? (
                <p className="mt-3 text-[14px] leading-7 text-slate-700">
                  {sidebarText}
                </p>
              ) : null}

              {sidebarParts.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {sidebarParts.map((item, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-bold leading-6 text-slate-800 shadow-[0_6px_16px_rgba(15,23,42,0.05)]"
                    >
                      <div className="absolute right-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#bfdbfe_0%,#60a5fa_100%)]" />
                      <div className="pt-1">{item}</div>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Desktop CTA buttons */}
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                <a
                  href="/best-brokers"
                  className="block w-full rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-black text-white shadow hover:bg-brand-600 transition"
                >
                  شاهد أفضل الشركات
                </a>

                <a
                  href="/brokers"
                  className="block w-full rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-black text-white shadow hover:bg-brand-600 transition"
                >
                  استعرض جميع التقييمات
                </a>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}