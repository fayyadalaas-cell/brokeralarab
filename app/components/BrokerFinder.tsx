"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  best_for: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
};

type Props = {
  brokers: Broker[];
};

type Experience = "beginner" | "intermediate" | "pro";
type DepositRange = "under50" | "50to200" | "200to1000" | "over1000";
type PlatformPref = "any" | "mt4" | "mt5";

function normalize(text: string | null | undefined) {
  return (text || "").toLowerCase();
}

function depositValue(range: DepositRange) {
  switch (range) {
    case "under50":
      return 50;
    case "50to200":
      return 200;
    case "200to1000":
      return 1000;
    case "over1000":
      return 100000;
  }
}

export default function BrokerFinder({ brokers }: Props) {
  const [country, setCountry] = useState("sa");
  const [deposit, setDeposit] = useState<DepositRange>("under50");
  const [experience, setExperience] = useState<Experience>("beginner");
  const [islamic, setIslamic] = useState("yes");
  const [platform, setPlatform] = useState<PlatformPref>("any");

  const results = useMemo(() => {
    const maxDeposit = depositValue(deposit);

    const scored = brokers.map((broker) => {
      let score = 0;
      const reg = normalize(broker.regulation);
      const bestFor = normalize(broker.best_for);
      const platforms = normalize(broker.platforms);
      const hasIslamic =
        normalize(broker.islamic_account).includes("yes") ||
        normalize(broker.islamic_account).includes("متوفر");

      if (broker.min_deposit !== null && broker.min_deposit <= maxDeposit) {
        score += 4;
      }

      if (platform === "mt4" && platforms.includes("mt4")) score += 2;
      if (platform === "mt5" && platforms.includes("mt5")) score += 2;
      if (platform === "any") score += 1;

      if (islamic === "yes" && hasIslamic) score += 3;
      if (islamic === "no") score += 1;

      if (experience === "beginner") {
        if (
          bestFor.includes("مبتدئ") ||
          bestFor.includes("المبتدئين") ||
          (broker.min_deposit ?? 999999) <= 50
        ) {
          score += 3;
        }
      }

      if (experience === "intermediate") {
        if (
          bestFor.includes("النشط") ||
          bestFor.includes("متداول") ||
          bestFor.includes("اليومي")
        ) {
          score += 2;
        }
      }

      if (experience === "pro") {
        if (
          bestFor.includes("المحترفين") ||
          bestFor.includes("احترافي") ||
          bestFor.includes("سكالب")
        ) {
          score += 3;
        }
      }

      if (country === "sa" || country === "ae" || country === "kw" || country === "eg") {
        if (
          reg.includes("cysec") ||
          reg.includes("fca") ||
          reg.includes("asic") ||
          reg.includes("fsa") ||
          reg.includes("fsc")
        ) {
          score += 2;
        }
      }

      score += Math.round((broker.rating || 0) / 2);

      return { ...broker, score };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
  }, [brokers, country, deposit, experience, islamic, platform]);

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-[#1d4ed8]">Smart Broker Finder</div>
          <h2 className="mt-1 text-2xl font-black text-[#0f172a]">
            اعثر على أفضل 3 شركات لك
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            أدخل بعض الخيارات البسيطة وسنرتب لك أفضل الشركات الأقرب لاحتياجاتك.
          </p>
        </div>

        <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
          فلتر ذكي
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">بلدك</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#2563eb]"
          >
            <option value="sa">السعودية</option>
            <option value="ae">الإمارات</option>
            <option value="kw">الكويت</option>
            <option value="eg">مصر</option>
            <option value="jo">الأردن</option>
            <option value="other">دول أخرى</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">قيمة الإيداع</label>
          <select
            value={deposit}
            onChange={(e) => setDeposit(e.target.value as DepositRange)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#2563eb]"
          >
            <option value="under50">أقل من 50$</option>
            <option value="50to200">من 50$ إلى 200$</option>
            <option value="200to1000">من 200$ إلى 1000$</option>
            <option value="over1000">أكثر من 1000$</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">مستوى الخبرة</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as Experience)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#2563eb]"
          >
            <option value="beginner">مبتدئ</option>
            <option value="intermediate">متوسط</option>
            <option value="pro">محترف</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">الحساب الإسلامي</label>
          <select
            value={islamic}
            onChange={(e) => setIslamic(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#2563eb]"
          >
            <option value="yes">مهم جدًا</option>
            <option value="no">لا يهم</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">المنصة</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "any", label: "أي منصة" },
              { value: "mt4", label: "MT4" },
              { value: "mt5", label: "MT5" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setPlatform(item.value as PlatformPref)}
                className={`rounded-2xl px-3 py-3 text-sm font-extrabold transition ${
                  platform === item.value
                    ? "bg-[#2563eb] text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)]"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-black text-[#0f172a]">أفضل 3 نتائج لك</div>
          <div className="text-xs font-bold text-slate-500">بناءً على اختياراتك الحالية</div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {results.map((broker, index) => (
            <div
              key={broker.id}
              className="rounded-[22px] border border-slate-200 bg-white p-4"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#2563eb] px-2 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-black text-[#0f172a]">{broker.name}</h3>
                  </div>

                  <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                    {broker.best_for || "مناسب لفئات متعددة"}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-center">
                  <div className="text-lg font-black text-[#1d4ed8]">
                    {broker.rating?.toFixed(1) ?? "—"}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500">من 10</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
                  <span className="text-slate-500">الإيداع</span>
                  <span className="font-black text-[#0f172a]">
                    {broker.min_deposit !== null ? `$${broker.min_deposit}` : "غير محدد"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
                  <span className="text-slate-500">المنصات</span>
                  <span className="font-black text-[#0f172a]">
                    {broker.platforms || "غير محدد"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
                  <span className="text-slate-500">التراخيص</span>
                  <span className="font-black text-[#0f172a]">
                    {broker.regulation || "غير محدد"}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href={`/brokers/${broker.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
                >
                  اقرأ التقييم
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                >
                  قارن الآن
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}