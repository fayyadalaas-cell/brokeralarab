"use client";

import { useState } from "react";

export default function CountryBrokerRedirect() {
  const [country, setCountry] = useState("all");

  function handleGo() {
    const routes: Record<string, string> = {
      all: "/best-brokers#top-brokers",
      sa: "/best-brokers/saudi-arabia",
      ae: "/best-brokers/uae",
      kw: "/best-brokers/kuwait",
      qa: "/best-brokers/qatar",
      bh: "/best-brokers/bahrain",
      jo: "/best-brokers/jordan",
      eg: "/best-brokers/egypt",
      ma: "/best-brokers/morocco",
      om: "/best-brokers/oman",
    };

    window.open(routes[country] || "/best-brokers#top-brokers", "_blank");
  }

  return (
    <>
      <div className="sm:col-span-2 xl:col-span-1">
        <label className="mb-2 block text-xs font-extrabold text-slate-700">
          الدولة
        </label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="all">كل الدول</option>
          <option value="sa">السعودية</option>
          <option value="ae">الإمارات</option>
          <option value="kw">الكويت</option>
          <option value="qa">قطر</option>
          <option value="bh">البحرين</option>
          <option value="jo">الأردن</option>
          <option value="eg">مصر</option>
          <option value="om">عمان</option>
        </select>
      </div>

      <div className="sm:col-span-2 xl:col-span-4 pt-1">
        <button
          type="button"
          onClick={handleGo}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(37,99,235,0.28)] transition hover:bg-blue-700"
        >
          اعرض أفضل الوسطاء
        </button>
      </div>
    </>
  );
}