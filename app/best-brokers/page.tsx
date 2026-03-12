import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import CountryBrokerRedirect from "@/app/components/CountryBrokerRedirect";

export const metadata: Metadata = {
  title: "أفضل شركات التداول في 2026 | بروكر العرب",
  description:
    "اكتشف أفضل شركات التداول في 2026 عبر مراجعات عربية احترافية، مقارنة التراخيص والرسوم والمنصات والحساب الإسلامي، مع أداة ذكية تساعدك على اختيار الوسيط المناسب.",
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  best_for: string | null;
  regulation: string | null;
  platforms: string | null;
  islamic_account: string | null;
  logo: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
};

function normalizeText(value: string | null | undefined) {
  return value?.trim() || "غير متوفر";
}

function isIslamicAvailable(value: string | null | undefined) {
  if (!value) return false;
  const v = value.toLowerCase();
  return (
    v.includes("yes") ||
    v.includes("available") ||
    v.includes("true") ||
    v.includes("نعم") ||
    v.includes("متوفر")
  );
}

function formatDeposit(value: number | null) {
  if (value === null || value === undefined) return "غير محدد";
  return `$${value}`;
}

function ratingLabel(rating: number | null) {
  if (!rating) return "—";
  return rating.toFixed(1);
}

function getTopPicks(brokers: Broker[]) {
  const sorted = [...brokers].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const overall = sorted[0];

  const islamic =
    sorted.find((b) => isIslamicAvailable(b.islamic_account)) || sorted[1] || sorted[0];

  const beginners =
    sorted.find((b) => {
      const bestFor = (b.best_for || "").toLowerCase();
      return (
        bestFor.includes("beginner") ||
        bestFor.includes("مبتدئ") ||
        (b.min_deposit !== null && b.min_deposit <= 50)
      );
    }) || sorted[2] || sorted[0];

  return {
    overall,
    islamic,
    beginners,
  };
}

export default async function BestBrokersPage() {
  const supabase = await createClient();

  const { data: brokersData } = await supabase
    .from("brokers")
    .select(
      "id, name, slug, rating, min_deposit, best_for, regulation, platforms, islamic_account, logo, real_account_url, demo_account_url"
    )
    .order("rating", { ascending: false });

  const brokers: Broker[] = brokersData || [];
  const topPicks = getTopPicks(brokers);
  const featuredBrokers = brokers.slice(0, 6);

  return (
    <main className="bg-slate-50 text-slate-900">
     {/* 1) HERO */}
<section className="relative overflow-hidden border-b border-slate-200 bg-white">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_26%)]" />

  <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
    <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      {/* RIGHT CONTENT */}
      <div className="text-center lg:text-right">
        

        <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px] xl:text-[64px]">
          أفضل شركات التداول في 2026
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
          نوفر لك مراجعات عربية احترافية لأفضل الوسطاء العالميين مع مقارنة دقيقة
          للتراخيص، الرسوم، المنصات، الحد الأدنى للإيداع، والحسابات الإسلامية حتى
          تختار الوسيط المناسب بثقة.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <a
            href="#comparison-table"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
          >
            قارن أفضل الوسطاء
          </a>

          <a
            href="#broker-finder"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
          >
            اعثر على الوسيط المناسب
          </a>
        </div>

        <div className="mt-6 hidden flex-wrap items-center justify-center gap-3 text-sm text-slate-500 sm:flex lg:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-semibold">
            <span className="text-emerald-600">●</span>
            مراجعات عربية واضحة
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-semibold">
            <span className="text-emerald-600">●</span>
            مقارنة التراخيص والمنصات
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-semibold">
            <span className="text-emerald-600">●</span>
            مناسب للمتداول العربي
          </span>
        </div>
      </div>

      {/* LEFT CARD - DESKTOP ONLY */}
      <div className="hidden lg:flex lg:items-center">
        <div className="w-full rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="text-lg font-extrabold text-slate-950">أفضل اختيار هذا العام</div>
              <div className="mt-1 text-sm text-slate-500">
                بناءً على التقييم العام والموثوقية
              </div>
            </div>

            <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-700">
              الأفضل إجمالاً
            </div>
          </div>

          {topPicks.overall ? (
            <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
                  {topPicks.overall.logo ? (
                    <div className="relative h-16 w-16">
                      <Image
                        src={topPicks.overall.logo}
                        alt={topPicks.overall.name || "Broker logo"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-slate-500">Logo</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-extrabold text-slate-950">
                    {normalizeText(topPicks.overall.name)}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 font-bold text-white">
                      <span>⭐</span>
                      <span>{ratingLabel(topPicks.overall.rating)}</span>
                      <span className="text-white/70">/ 5</span>
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700">
                      إيداع يبدأ من {formatDeposit(topPicks.overall.min_deposit)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-500">الأفضل لـ</div>
                  <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                    {normalizeText(topPicks.overall.best_for)}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-500">التراخيص</div>
                  <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                    {normalizeText(topPicks.overall.regulation)}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <Link
                  href={`/brokers/${topPicks.overall.slug}`}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  قراءة المراجعة
                </Link>

                {topPicks.overall.real_account_url ? (
                  <a
                    href={topPicks.overall.real_account_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    فتح حساب
                  </a>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              لا توجد بيانات وسطاء حالياً.
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</section>

{/* 2) QUICK TOP BROKERS */}
<section id="top-brokers" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
  <div className="mb-8 flex flex-col gap-2">
    <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
      أفضل 3 وسطاء هذا العام
    </h2>
    <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
      اخترنا لك أعلى 3 وسطاء داخل الصفحة بناءً على التقييم العام، مع عرض سريع
      لأهم المعلومات التي تهم المتداول قبل الانتقال إلى المراجعة الكاملة.
    </p>
  </div>

  <div className="grid gap-6 lg:grid-cols-3">
    {brokers.slice(0, 3).map((broker, index) => {
      const rankLabel =
        index === 0 ? "المركز الأول" : index === 1 ? "المركز الثاني" : "المركز الثالث";

      const rankClasses =
        index === 0
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : index === 1
          ? "border-slate-300 bg-slate-100 text-slate-700"
          : "border-blue-200 bg-blue-50 text-blue-700";

      return (
        <article
          key={broker.id}
          className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_55px_rgba(15,23,42,0.10)]"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-blue-600 via-blue-500 to-sky-400" />

          <div className="flex items-center justify-between gap-3">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${rankClasses}`}
            >
              {rankLabel}
            </span>

            <div className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
              <span>⭐</span>
              <span>{ratingLabel(broker.rating)}</span>
              <span className="text-white/70">/ 5</span>
            </div>
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                {normalizeText(broker.name)}
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                مناسب لـ{" "}
                <span className="font-bold text-slate-900">
                  {normalizeText(broker.best_for)}
                </span>
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
  {broker.logo ? (
    <div className="relative h-20 w-20">
      <Image
        src={broker.logo}
        alt={broker.name || "Broker logo"}
        fill
        className="object-contain"
      />
    </div>
              ) : (
                <span className="text-xs text-slate-400">Logo</span>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-semibold text-slate-500">الحد الأدنى للإيداع</div>
              <div className="mt-2 text-xl font-extrabold text-slate-950">
                {formatDeposit(broker.min_deposit)}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-semibold text-slate-500">الحساب الإسلامي</div>
              <div className="mt-2 text-xl font-extrabold text-slate-950">
                {isIslamicAvailable(broker.islamic_account) ? "متوفر" : "غير واضح"}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold text-slate-500">التراخيص</div>
            <div className="mt-2 text-sm font-bold leading-7 text-slate-900">
              {normalizeText(broker.regulation)}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              تقييم قوي
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              مراجعة عربية
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              مناسب للعرب
            </span>
          </div>

          <div className="mt-6 flex gap-3">
            <a
  href={`/brokers/${broker.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-blue-700"
>
  قراءة المراجعة
</a>

            {broker.real_account_url ? (
              <a
                href={broker.real_account_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
              >
                فتح حساب
              </a>
            ) : null}
          </div>
        </article>
      );
    })}
  </div>
</section>

      {/* 3) FULL COMPARISON TABLE */}
<section id="comparison-table" className="border-y border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div className="mb-8 flex flex-col gap-2">
      <div className="text-sm font-bold text-blue-700">المقارنة الرئيسية</div>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
        أفضل 10 شركات تداول هذا العام
      </h2>
      <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
        قارن بين أفضل 10 وسطاء مباشرة بناءً على أعلى تقييم عام، مع عرض واضح للإيداع،
        التراخيص، المنصات، الحساب الإسلامي، وروابط المراجعة وفتح الحساب.
      </p>
    </div>

    {/* DESKTOP TABLE */}
    <div className="hidden lg:block">
      <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.07)]">
        <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white">
          <div className="grid grid-cols-[2.3fr_0.9fr_0.9fr_1.5fr_1fr_0.9fr_1.25fr] items-center gap-4 text-sm font-extrabold">
            <div>الوسيط</div>
            <div>التقييم</div>
            <div>الإيداع</div>
            <div>التراخيص</div>
            <div>المنصات</div>
            <div>إسلامي</div>
            <div>الإجراءات</div>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {brokers.slice(0, 10).map((broker, index) => {
            const isTop = index === 0;

            return (
              <div
                key={broker.id}
                className={`grid grid-cols-[2.3fr_0.9fr_0.9fr_1.5fr_1fr_0.9fr_1.25fr] items-center gap-4 px-6 py-5 transition ${
                  isTop
                    ? "bg-gradient-to-l from-blue-50 via-white to-amber-50"
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                {/* Broker */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                      isTop
                        ? "bg-amber-400 text-slate-950"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${
                      isTop
                        ? "border-blue-200 bg-white"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    {broker.logo ? (
                      <div className="relative h-12 w-12">
                        <Image
                          src={broker.logo}
                          alt={broker.name || "Broker logo"}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-extrabold text-slate-950">
                        {normalizeText(broker.name)}
                      </div>

                      {isTop ? (
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-700">
                          الأفضل
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      مناسب لـ {normalizeText(broker.best_for)}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-extrabold ${
                      isTop
                        ? "bg-amber-100 text-amber-800"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span>{ratingLabel(broker.rating)}</span>
                    <span>⭐</span>
                  </span>
                </div>

                {/* Deposit */}
                <div className="text-sm font-extrabold text-slate-950">
                  {formatDeposit(broker.min_deposit)}
                </div>

                {/* Regulation */}
                <div className="text-sm leading-7 text-slate-600">
                  {normalizeText(broker.regulation)}
                </div>

                {/* Platforms */}
                <div className="text-sm font-bold text-slate-700">
                  {normalizeText(broker.platforms)}
                </div>

                {/* Islamic */}
                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${
                      isIslamicAvailable(broker.islamic_account)
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isIslamicAvailable(broker.islamic_account) ? "متوفر" : "غير واضح"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/brokers/${broker.slug}`}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-blue-700"
                  >
                    قراءة المراجعة
                  </Link>

                  {broker.real_account_url ? (
                    <a
                      href={broker.real_account_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-800 transition hover:bg-slate-50"
                    >
                      فتح حساب
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-400">
                      غير متاح
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* MOBILE ACCORDION */}
    <div className="space-y-3 lg:hidden">
      {brokers.slice(0, 10).map((broker, index) => {
        const isTop = index === 0;

        return (
          <details
            key={broker.id}
            className={`group overflow-hidden rounded-[24px] border bg-white shadow-sm ${
              isTop ? "border-blue-200" : "border-slate-200"
            }`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                    isTop
                      ? "bg-amber-400 text-slate-950"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {broker.logo ? (
                    <div className="relative h-10 w-10">
                      <Image
                        src={broker.logo}
                        alt={broker.name || "Broker logo"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-lg font-extrabold text-slate-950">
                      {normalizeText(broker.name)}
                    </h3>

                    {isTop ? (
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                        الأفضل
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-extrabold text-amber-700">
                      <span>{ratingLabel(broker.rating)}</span>
                      <span>⭐</span>
                    </span>
                    <span>إيداع {formatDeposit(broker.min_deposit)}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-slate-400 transition group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </summary>

            <div className="border-t border-slate-200 px-4 pb-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-slate-500">الحد الأدنى للإيداع</div>
                  <div className="mt-2 text-lg font-extrabold text-slate-950">
                    {formatDeposit(broker.min_deposit)}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-slate-500">الحساب الإسلامي</div>
                  <div className="mt-2 text-lg font-extrabold text-slate-950">
                    {isIslamicAvailable(broker.islamic_account) ? "متوفر" : "غير واضح"}
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500">الأفضل لـ</div>
                <div className="mt-2 text-sm font-bold leading-7 text-slate-900">
                  {normalizeText(broker.best_for)}
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500">التراخيص</div>
                <div className="mt-2 text-sm font-bold leading-7 text-slate-900">
                  {normalizeText(broker.regulation)}
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500">المنصات</div>
                <div className="mt-2 text-sm font-bold leading-7 text-slate-900">
                  {normalizeText(broker.platforms)}
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Link
                  href={`/brokers/${broker.slug}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  قراءة المراجعة
                </Link>

                {broker.real_account_url ? (
                  <a
                    href={broker.real_account_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                  >
                    فتح حساب
                  </a>
                ) : (
                  <span className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-400">
                    غير متاح
                  </span>
                )}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  </div>
</section>

{/* 4) SMART BROKER FINDER */}
<section className="border-t border-slate-200 bg-white">
  <div
    id="broker-finder"
    className="scroll-mt-40 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
  >
    {/* DESKTOP */}
    <div className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.16)] lg:block">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        {/* TEXT SIDE */}
        <div className="border-b border-white/10 p-6 text-white lg:border-b-0 lg:border-l lg:p-8">
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            اعثر على أفضل وسيط
            <br className="hidden sm:block" />
            يناسب احتياجاتك
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">
            استخدم الفلاتر بشكل سريع لاختيار أفضل الوسطاء حسب الدولة أو بشكل عام،
            مع مراعاة قيمة الإيداع، مستوى الخبرة، ونوع المنصة.
          </p>
        </div>

        {/* FORM SIDE */}
        <div className="bg-gradient-to-b from-white to-slate-50 p-4 text-slate-900 sm:p-5 lg:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-slate-950">
                فلتر اختيار الوسيط
              </div>
              <div className="mt-1 text-sm text-slate-500">
                اختر ما يناسبك أو اترك الدولة على "كل الدول"
              </div>
            </div>

            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">
              فلتر ذكي
            </div>
          </div>

          <form className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-xs font-extrabold text-slate-700">
                قيمة الإيداع
              </label>
              <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>أقل من 100$</option>
                <option>100$ - 500$</option>
                <option>500$ - 1000$</option>
                <option>أكثر من 1000$</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-extrabold text-slate-700">
                مستوى الخبرة
              </label>
              <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>مبتدئ</option>
                <option>متوسط</option>
                <option>محترف</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-extrabold text-slate-700">
                المنصة
              </label>
              <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>أي منصة</option>
                <option>MT4</option>
                <option>MT5</option>
                <option>cTrader</option>
                <option>منصات متعددة</option>
              </select>
            </div>

            <CountryBrokerRedirect />
          </form>
        </div>
      </div>
    </div>

    {/* MOBILE */}
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] lg:hidden">
      <div className="bg-slate-950 px-4 py-5 text-white">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-extrabold text-blue-200">
          فلتر ذكي
        </div>

        <h2 className="mt-3 text-2xl font-extrabold leading-tight">
          اعثر على أفضل وسيط يناسبك
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-300">
          اختر الدولة والتفضيلات الأساسية للوصول بسرعة إلى الصفحة الأنسب لك.
        </p>
      </div>

      <div className="bg-white p-4">
        <form className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-xs font-extrabold text-slate-700">
                قيمة الإيداع
              </label>
              <select className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>أقل من 100$</option>
                <option>100$ - 500$</option>
                <option>500$ - 1000$</option>
                <option>أكثر من 1000$</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-extrabold text-slate-700">
                مستوى الخبرة
              </label>
              <select className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>مبتدئ</option>
                <option>متوسط</option>
                <option>محترف</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-extrabold text-slate-700">
              المنصة
            </label>
            <select className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option>أي منصة</option>
              <option>MT4</option>
              <option>MT5</option>
              <option>cTrader</option>
              <option>منصات متعددة</option>
            </select>
          </div>

          <CountryBrokerRedirect />
        </form>
      </div>
    </div>
  </div>
</section>

{/* 5) BEST BROKERS BY CATEGORY */}
<section
  id="broker-finder"
  className="scroll-mt-28 border-t border-slate-200 bg-white"
>
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    {(() => {
      const used = new Set<number>();

function pickBroker(list: Broker[]) {
  const broker = list.find((b) => !used.has(b.id));
  if (broker) used.add(broker.id);
  return broker;
}

const sortedByRating = [...brokers].sort(
  (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
);

const sortedByDeposit = [...brokers].sort(
  (a, b) => (a.min_deposit ?? 999999) - (b.min_deposit ?? 999999)
);

const islamicList = brokers.filter((b) =>
  isIslamicAvailable(b.islamic_account)
);

const beginnerList = brokers.filter((b) => {
  const bestFor = (b.best_for || "").toLowerCase();
  return bestFor.includes("beginner") || bestFor.includes("مبتدئ");
});

const topRatedBroker = pickBroker(sortedByRating);
const beginnerBroker = pickBroker(beginnerList.length ? beginnerList : sortedByRating);
const islamicBroker = pickBroker(islamicList.length ? islamicList : sortedByRating);
const lowestDepositBroker = pickBroker(sortedByDeposit);

      const categoryCards = [
        {
          title: "الأفضل إجمالًا",
          color: "text-blue-700",
          broker: topRatedBroker,
          description:
            "اخترناه كأفضل وسيط إجمالًا داخل الصفحة بناءً على التقييم العام والموثوقية وتوازن المزايا للمتداول العربي.",
        },
        {
          title: "الأفضل للمبتدئين",
          color: "text-emerald-700",
          broker: beginnerBroker,
          description:
            "هذا الخيار مناسب أكثر للمتداولين الجدد الباحثين عن بداية سهلة، وإيداع مناسب، وتجربة تداول واضحة.",
        },
        {
          title: "أفضل حساب إسلامي",
          color: "text-purple-700",
          broker: islamicBroker,
          description:
            "اخترناه ضمن أفضل الخيارات للباحثين عن حساب تداول إسلامي مع شروط مناسبة وتجربة أكثر مرونة.",
        },
        {
          title: "أقل إيداع",
          color: "text-amber-700",
          broker: lowestDepositBroker,
          description:
            "هذا الوسيط يبرز داخل الصفحة من حيث الحد الأدنى المنخفض للإيداع، وهو مناسب لمن يريد البدء برأس مال أقل.",
        },
      ];

      return (
        <>
          <div className="mb-10 text-center lg:text-right">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              أفضل شركات التداول حسب الاستخدام
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              ليس كل وسيط مناسبًا لجميع المتداولين، لذلك اخترنا أفضل الوسطاء حسب نوع
              الاستخدام واحتياجات الزائر مثل المبتدئين أو الباحثين عن حساب إسلامي أو أقل
              إيداع.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((item, index) => {
              const broker = item.broker;
              if (!broker) return null;

              return (
                <article
                  key={`${broker.id}-${index}`}
                  className="flex min-h-[320px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className={`text-sm font-bold ${item.color}`}>{item.title}</div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-extrabold text-slate-950">
                        {normalizeText(broker.name)}
                      </h3>

                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-700">
                        <span>⭐</span>
                        <span>{ratingLabel(broker.rating)}</span>
                        <span>/ 5</span>
                      </div>
                    </div>

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
  {broker.logo ? (
    <div className="relative h-16 w-16">
      <Image
        src={broker.logo}
        alt={broker.name || "Broker logo"}
        fill
        className="object-contain"
      />
    </div>
  ) : null}
</div>
                  </div>

                  <p className="mt-4 min-h-[84px] text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-slate-500">الحد الأدنى للإيداع</span>
                      <span className="font-extrabold text-slate-950">
                        {formatDeposit(broker.min_deposit)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                      <span className="text-slate-500">الحساب الإسلامي</span>
                      <span className="font-extrabold text-slate-950">
                        {isIslamicAvailable(broker.islamic_account) ? "متوفر" : "غير واضح"}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/brokers/${broker.slug}`}
                    className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-blue-700"
                  >
                    قراءة المراجعة
                  </Link>
                </article>
              );
            })}
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* 6) HOW WE RATE BROKERS */}
<section className="border-t border-slate-200 bg-slate-50">
  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

    <div className="mb-8 text-center lg:text-right">
      <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
        كيف نقيم شركات التداول
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
        نعتمد في بروكر العرب على مجموعة معايير مهمة قبل ترتيب شركات التداول
        حتى يحصل المتداول على تقييم واضح وواقعي.
      </p>
    </div>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

      {/* ITEM */}
      <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700">
          1
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            التراخيص والرقابة
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            نراجع الجهة الرقابية وقوة الترخيص قبل إدراج الوسيط.
          </p>
        </div>
      </div>


      <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-extrabold text-emerald-700">
          2
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            الرسوم والسبريد
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            نقارن فروقات الأسعار والعمولات وتأثيرها على التداول.
          </p>
        </div>
      </div>


      <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-sm font-extrabold text-purple-700">
          3
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            منصات التداول
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            نركز على توفر منصات مثل MT4 وMT5 وسهولة استخدامها.
          </p>
        </div>
      </div>


      <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-sm font-extrabold text-amber-700">
          4
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            الحد الأدنى للإيداع
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            نوضح أقل مبلغ لفتح الحساب ومناسبته للمبتدئين.
          </p>
        </div>
      </div>


      <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-sm font-extrabold text-rose-700">
          5
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            الحساب الإسلامي
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            نوضح توفر الحساب الإسلامي وشروطه لدى الوسيط.
          </p>
        </div>
      </div>


      <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-extrabold text-slate-700">
          6
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            تجربة المستخدم
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            نقيم سهولة التسجيل والدعم وتجربة المتداول.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>

{/* 7) FAQ */}
<section className="border-t border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div className="mb-8 text-center lg:text-right">
      <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
        الأسئلة الشائعة حول شركات التداول
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
        هذه أبرز الأسئلة التي يطرحها الزوار قبل اختيار شركة التداول المناسبة.
      </p>
    </div>

    <div className="space-y-3">
      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-right sm:px-5">
          <span className="text-sm font-extrabold text-slate-900 sm:text-base">
            ما هي أفضل شركة تداول للمبتدئين؟
          </span>
          <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
          أفضل شركة للمبتدئين تختلف حسب البلد والميزانية، لكن غالبًا ما نفضّل الوسطاء
          الذين يقدمون إيداعًا منخفضًا، منصة سهلة، ودعمًا واضحًا للمتداول الجديد.
        </div>
      </details>

      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-right sm:px-5">
          <span className="text-sm font-extrabold text-slate-900 sm:text-base">
            ما أقل مبلغ يمكن البدء به في التداول؟
          </span>
          <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
          يختلف الحد الأدنى للإيداع من وسيط إلى آخر. بعض الشركات تسمح بالبدء بمبالغ
          منخفضة جدًا، بينما تتطلب شركات أخرى حدًا أعلى بحسب نوع الحساب والمنصة.
        </div>
      </details>

      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-right sm:px-5">
          <span className="text-sm font-extrabold text-slate-900 sm:text-base">
            هل شركات التداول الموجودة في الصفحة آمنة؟
          </span>
          <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
          نحن نركز على الشركات التي تملك حضورًا معروفًا وتراخيص واضحة قدر الإمكان،
          لكن يبقى من المهم أن يراجع الزائر تفاصيل الترخيص وشروط الحساب قبل فتح أي حساب فعلي.
        </div>
      </details>

      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-right sm:px-5">
          <span className="text-sm font-extrabold text-slate-900 sm:text-base">
            هل الحساب الإسلامي متوفر لدى جميع الوسطاء؟
          </span>
          <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
          لا، ليس كل الوسطاء يوفرون حسابًا إسلاميًا. بعض الشركات توفره بشكل مباشر،
          وبعضها يقدمه بشروط خاصة، لذلك نوضح هذه النقطة داخل المقارنات والمراجعات.
        </div>
      </details>

      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition open:bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-right sm:px-5">
          <span className="text-sm font-extrabold text-slate-900 sm:text-base">
            كيف أختار شركة التداول المناسبة لي؟
          </span>
          <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-7 text-slate-600 sm:px-5">
          يعتمد الاختيار على عدة عوامل مثل قوة الترخيص، الحد الأدنى للإيداع، المنصات
          المتوفرة، وجود حساب إسلامي، ومدى مناسبة الوسيط لخبرتك وبلد إقامتك.
        </div>
      </details>
    </div>
  </div>
</section>
    </main>
  );
}