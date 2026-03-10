"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

export default function MobileNavMenu({
  navLinks,
}: {
  navLinks: NavItem[];
}) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-50"
        aria-label="فتح القائمة"
        aria-expanded={open}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7h16M4 12h16M4 17h16"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-14 z-50 w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="mb-2 px-2 text-xs font-bold text-slate-500">
            تصفح الموقع
          </div>

          <div className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block rounded-xl px-3 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3">
            <Link
              href="/compare"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
            >
              تصفح المقارنات
            </Link>

            <Link
              href="/brokers"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
            >
              أفضل الوسطاء
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}