"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type MobileBroker = {
  id: number;
  name: string;
  slug: string | null;
  logo: string | null;
  rating: string;
  deposit: string;
  licenseCount: number;
  description: string;
  realAccountAvailable: boolean;
};

type UseCaseItem = {
  title: string;
  shortTitle: string;
  broker: MobileBroker;
};

type CountryItem = {
  id: number;
  slug: string;
  code: string;
  name: string;
  flag: string;
  regulator: string | null;
};

type RegulatorItem = {
  code: string;
  name: string;
  brokerCount: number;
};

type ComparisonItem = {
  id: number;
  slug: string;
  broker1: {
    name: string;
    logo: string | null;
  };
  broker2: {
    name: string;
    logo: string | null;
  };
};

type Props = {
  useCases: UseCaseItem[];
  countries: CountryItem[];
  regulators: RegulatorItem[];
  comparisons: ComparisonItem[];
};

function Logo({
  name,
  logo,
}: {
  name: string;
  logo: string | null;
}) {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
      {logo ? (
        <div className="relative h-10 w-10">
          <Image
            src={logo}
            alt={`شعار ${name}`}
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-[8px] font-black text-slate-400">
          LOGO
        </span>
      )}
    </div>
  );
}

export default function BestBrokersMobileTabs({
  useCases,
  countries,
  regulators,
  comparisons,
}: Props) {
  const [useCaseIndex, setUseCaseIndex] = useState(0);
  const [countryGroup, setCountryGroup] = useState(0);
  const [regulatorGroup, setRegulatorGroup] = useState(0);
  const [comparisonIndex, setComparisonIndex] = useState(0);

  const selectedUseCase = useCases[useCaseIndex];

  const countryGroups: CountryItem[][] = [];
  for (let index = 0; index < countries.length; index += 4) {
    countryGroups.push(countries.slice(index, index + 4));
  }

  const regulatorGroups: RegulatorItem[][] = [];
  for (let index = 0; index < regulators.length; index += 4) {
    regulatorGroups.push(regulators.slice(index, index + 4));
  }

  const selectedCountries = countryGroups[countryGroup] || [];
  const selectedRegulators = regulatorGroups[regulatorGroup] || [];
  const selectedComparison = comparisons[comparisonIndex];

  return (
    <div className="min-w-0 space-y-8 overflow-hidden">
      {/* USE CASES */}
      {selectedUseCase ? (
        <section className="min-w-0">
          <div className="grid grid-cols-2 gap-2">
            {useCases.slice(0, 4).map((item, index) => (
              <button
                key={`${item.title}-${item.broker.id}`}
                type="button"
                onClick={() => setUseCaseIndex(index)}
                className={`min-h-10 min-w-0 rounded-xl border px-2 py-2 text-[10px] font-black leading-4 transition ${
                  useCaseIndex === index
                    ? "border-brand-500 bg-brand-500 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <span className="block truncate">
                  {item.shortTitle}
                </span>
              </button>
            ))}
          </div>

          {useCases.length > 4 ? (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {useCases.slice(4).map((item, relativeIndex) => {
                const index = relativeIndex + 4;

                return (
                  <button
                    key={`${item.title}-${item.broker.id}`}
                    type="button"
                    onClick={() => setUseCaseIndex(index)}
                    className={`min-h-10 min-w-0 rounded-xl border px-2 py-2 text-[10px] font-black leading-4 transition ${
                      useCaseIndex === index
                        ? "border-brand-500 bg-brand-500 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <span className="block truncate">
                      {item.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}

          <article className="mt-4 overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                {selectedUseCase.title}
              </span>

              <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-700">
                ★ {selectedUseCase.broker.rating} / 5
              </span>
            </div>

            <div className="mt-4 grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3">
              <Logo
                name={selectedUseCase.broker.name}
                logo={selectedUseCase.broker.logo}
              />

              <div className="min-w-0">
                <h3 className="text-[19px] font-black leading-7 text-slate-950">
                  {selectedUseCase.broker.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-[12px] font-medium leading-6 text-slate-600">
                  {selectedUseCase.broker.description}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <div className="border-l border-slate-200 px-2 py-3 text-center">
                <div className="text-[9px] font-bold text-slate-600">
                  الحد الأدنى للإيداع
                </div>

                <div className="mt-1 text-sm font-black text-slate-950">
                  {selectedUseCase.broker.deposit}
                </div>
              </div>

              <div className="px-2 py-3 text-center">
                <div className="text-[9px] font-bold text-slate-600">
                  التراخيص
                </div>

                <div className="mt-1 text-sm font-black text-slate-950">
                  {selectedUseCase.broker.licenseCount}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={
                  selectedUseCase.broker.slug
                    ? `/brokers/${selectedUseCase.broker.slug}`
                    : "/brokers"
                }
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-xs font-black text-slate-800"
              >
                التقييم
              </Link>

              {selectedUseCase.broker.realAccountAvailable &&
              selectedUseCase.broker.slug ? (
                <a
                  href={`/go/${selectedUseCase.broker.slug}?type=real`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-500 px-3 text-xs font-black text-white"
                >
                  فتح حساب
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-100 px-3 text-xs font-black text-slate-500">
                  غير متاح
                </span>
              )}
            </div>
          </article>
        </section>
      ) : null}

      {/* COUNTRIES */}
      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-xs font-black text-slate-800">
            اختر مجموعة الدول
          </div>

          <div className="flex gap-1.5">
            {countryGroups.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`مجموعة الدول ${index + 1}`}
                onClick={() => setCountryGroup(index)}
                className={`h-2 rounded-full transition ${
                  countryGroup === index
                    ? "w-7 bg-brand-500"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {selectedCountries.map((country) => (
            <Link
              key={country.id}
              href={`/best-brokers/${country.slug}`}
              className="group relative min-h-[132px] overflow-hidden rounded-[18px] border border-slate-200 bg-white p-3.5 shadow-[0_5px_16px_rgba(15,23,42,0.035)]"
            >
              <div className="absolute -left-5 -top-5 h-16 w-16 rounded-full bg-brand-50" />

              <div className="relative flex items-start justify-between gap-2">
                <span className="text-xl">
                  {country.flag}
                </span>

                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-slate-100 px-1.5 text-[9px] font-black text-slate-700">
                  {country.code}
                </span>
              </div>

              <h3 className="relative mt-3 text-[12px] font-black leading-5 text-slate-950">
                أفضل شركات التداول في {country.name}
              </h3>

              <div className="relative mt-2 flex items-center justify-between gap-2">
                <span className="line-clamp-1 min-w-0 text-[8px] text-slate-600">
                  {country.regulator || "دليل مخصص للدولة"}
                </span>

                <span className="shrink-0 text-xs font-black text-brand-500">
                  ←
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* REGULATORS */}
      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-xs font-black text-slate-800">
            الجهات الرقابية
          </div>

          <div className="flex gap-1.5">
            {regulatorGroups.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`مجموعة التراخيص ${index + 1}`}
                onClick={() => setRegulatorGroup(index)}
                className={`h-2 rounded-full transition ${
                  regulatorGroup === index
                    ? "w-7 bg-brand-500"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {selectedRegulators.map((regulator) => (
            <Link
              key={regulator.code}
              href={`/licenses/${regulator.code.toLowerCase()}`}
              className="rounded-[18px] border border-slate-200 bg-white p-3.5 shadow-[0_5px_16px_rgba(15,23,42,0.035)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-brand-50 px-2 text-[10px] font-black text-brand-600">
                  {regulator.code}
                </span>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-black text-emerald-700">
                  {regulator.brokerCount} شركات
                </span>
              </div>

              <h3 className="mt-3 line-clamp-2 min-h-[40px] text-[11px] font-black leading-5 text-slate-950">
                {regulator.name}
              </h3>

              <div className="mt-3 border-t border-slate-200 pt-2 text-[9px] font-black text-brand-600">
                عرض الشركات ←
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMPARISONS */}
      {selectedComparison ? (
        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-xs font-black text-slate-800">
              المقارنات المباشرة
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="المقارنة السابقة"
                onClick={() =>
                  setComparisonIndex((current) =>
                    current === 0
                      ? comparisons.length - 1
                      : current - 1
                  )
                }
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-700"
              >
                →
              </button>

              <span className="text-[10px] font-black text-slate-600">
                {comparisonIndex + 1} / {comparisons.length}
              </span>

              <button
                type="button"
                aria-label="المقارنة التالية"
                onClick={() =>
                  setComparisonIndex((current) =>
                    current === comparisons.length - 1
                      ? 0
                      : current + 1
                  )
                }
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-700"
              >
                ←
              </button>
            </div>
          </div>

          <Link
            href={`/compare/${selectedComparison.slug}`}
            className="block rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_7px_22px_rgba(15,23,42,0.045)]"
          >
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="flex min-w-0 flex-col items-center text-center">
                <Logo
                  name={selectedComparison.broker1.name}
                  logo={selectedComparison.broker1.logo}
                />

                <span className="mt-2 max-w-full truncate text-xs font-black text-slate-950">
                  {selectedComparison.broker1.name}
                </span>
              </div>

              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-[9px] font-black text-white">
                VS
              </span>

              <div className="flex min-w-0 flex-col items-center text-center">
                <Logo
                  name={selectedComparison.broker2.name}
                  logo={selectedComparison.broker2.logo}
                />

                <span className="mt-2 max-w-full truncate text-xs font-black text-slate-950">
                  {selectedComparison.broker2.name}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-200 pt-3 text-center text-[10px] font-black text-brand-600">
              عرض المقارنة الكاملة
            </div>
          </Link>

          <Link
            href="/compare"
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-black text-slate-800"
          >
            جميع المقارنات
          </Link>
        </section>
      ) : null}
    </div>
  );
}