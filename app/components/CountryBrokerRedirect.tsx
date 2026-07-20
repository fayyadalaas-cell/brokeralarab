"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  locale?: "ar" | "en";
};

export default function CountryBrokerRedirect({
  locale = "ar",
}: Props) {
  const [country, setCountry] = useState("all");
  const router = useRouter();

  const isEnglish = locale === "en";

  function handleGo() {
    const arabicRoutes: Record<string, string> = {
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
      iq: "/best-brokers/iraq",
      ly: "/best-brokers/libya",
      sy: "/best-brokers/syria",
    };

    const englishRoutes: Record<string, string> = {
  all: "/en/best-brokers#top-brokers",
  uk: "/en/best-brokers#top-brokers",
  au: "/en/best-brokers#top-brokers",
  za: "/en/best-brokers#top-brokers",
  sg: "/en/best-brokers#top-brokers",
  my: "/en/best-brokers#top-brokers",
  ng: "/en/best-brokers#top-brokers",
  ph: "/en/best-brokers#top-brokers",
  id: "/en/best-brokers#top-brokers",
  th: "/en/best-brokers#top-brokers",
  vn: "/en/best-brokers#top-brokers",
};

    const routes = isEnglish
      ? englishRoutes
      : arabicRoutes;

    router.push(
      routes[country] ||
        (isEnglish
          ? "/en/best-brokers#top-brokers"
          : "/best-brokers#top-brokers")
    );
  }

  return (
    <>
      <div className="sm:col-span-2 xl:col-span-1">
        <label
          htmlFor={`country-select-${locale}`}
          className="mb-2 block text-xs font-extrabold text-slate-700"
        >
          {isEnglish ? "Country" : "الدولة"}
        </label>

        <select
          id={`country-select-${locale}`}
          value={country}
          onChange={(event) =>
            setCountry(event.target.value)
          }
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {isEnglish ? (
            <>
              <option value="all">
                All countries
              </option>
              <option value="uk">
                United Kingdom
              </option>
              <option value="au">
                Australia
              </option>
              <option value="za">
                South Africa
              </option>
              <option value="sg">
                Singapore
              </option>
              <option value="my">
                Malaysia
              </option>
              <option value="ng">
                Nigeria
              </option>
              <option value="ph">
                Philippines
              </option>
              <option value="id">
                Indonesia
              </option>
              <option value="th">
                Thailand
              </option>
              <option value="vn">
                Vietnam
              </option>
            </>
          ) : (
            <>
              <option value="all">
                كل الدول
              </option>
              <option value="sa">
                السعودية
              </option>
              <option value="ae">
                الإمارات
              </option>
              <option value="kw">
                الكويت
              </option>
              <option value="qa">
                قطر
              </option>
              <option value="bh">
                البحرين
              </option>
              <option value="jo">
                الأردن
              </option>
              <option value="eg">
                مصر
              </option>
              <option value="ma">
                المغرب
              </option>
              <option value="om">
                عمان
              </option>
              <option value="iq">
                العراق
              </option>
              <option value="ly">
                ليبيا
              </option>
              <option value="sy">
                سوريا
              </option>
            </>
          )}
        </select>
      </div>

      <div className="pt-1 sm:col-span-2 xl:col-span-4">
        <button
          type="button"
          onClick={handleGo}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(37,99,235,0.28)] transition hover:bg-brand-600"
        >
          {isEnglish
            ? "Show Best Brokers"
            : "اعرض أفضل الوسطاء"}
        </button>
      </div>
    </>
  );
}