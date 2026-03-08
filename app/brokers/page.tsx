import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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

export const metadata: Metadata = {
  title: "تقييم شركات التداول الموثوقة | بروكر العرب",
  description:
    "تصفح تقييم شركات التداول الموثوقة، وقارن بين التراخيص والحد الأدنى للإيداع والمنصات والحساب الإسلامي، ثم اختر الوسيط المناسب قبل فتح حساب حقيقي.",
  keywords: [
    "تقييم شركات التداول",
    "شركات تداول موثوقة",
    "أفضل شركات التداول",
    "مقارنة شركات التداول",
    "فتح حساب تداول حقيقي",
    "شركات الفوركس",
    "الحساب الإسلامي",
    "بروكر العرب",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/brokers",
  },
  openGraph: {
    title: "تقييم شركات التداول الموثوقة | بروكر العرب",
    description:
      "صفحة عربية احترافية لعرض تقييم شركات التداول ومقارنة أهم التفاصيل قبل فتح حساب حقيقي.",
    url: "https://brokeralarab.com/brokers",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
  },
};

function formatRating(rating: number | null) {
  if (rating === null || rating === undefined) return "—";
  return Number(rating).toFixed(1);
}

function formatDeposit(value: number | null) {
  if (value === null || value === undefined) return "غير محدد";
  return `$${Number(value).toLocaleString()}`;
}

function normalizeText(value: string | null | undefined, fallback = "غير محدد") {
  if (!value || !value.trim()) return fallback;
  return value;
}

function islamicAccountLabel(value: string | null | undefined) {
  if (!value || !value.trim()) return "غير محدد";

  const v = value.trim().toLowerCase();

  if (
    v.includes("yes") ||
    v.includes("available") ||
    v.includes("true") ||
    v.includes("islamic") ||
    v.includes("نعم")
  ) {
    return "متوفر";
  }

  if (
    v.includes("no") ||
    v.includes("false") ||
    v.includes("not available") ||
    v.includes("غير متوفر")
  ) {
    return "غير متوفر";
  }

  return value;
}

function hasRealAccountLink(url: string | null | undefined) {
  return !!url && url.trim().length > 0;
}

function getInitials(name: string | null | undefined) {
  if (!name) return "BR";
  const cleaned = name.trim();
  if (!cleaned) return "BR";
  return cleaned.slice(0, 2).toUpperCase();
}

function splitToBadges(value: string | null | undefined, fallback = "غير محدد") {
  const text = normalizeText(value, fallback);

  return text
    .split(/,|\/|\||\n|;/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function ratingLabel(rating: number | null) {
  if (rating === null || rating === undefined) return "غير مقيم";
  if (rating >= 9) return "ممتاز";
  if (rating >= 8) return "قوي جدًا";
  if (rating >= 7) return "جيد";
  return "مقبول";
}

export default async function BrokersPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select(
      "id,name,slug,rating,min_deposit,best_for,regulation,platforms,islamic_account,logo,real_account_url,demo_account_url"
    )
    .order("rating", { ascending: false });

  const brokers = (data as Broker[] | null) ?? [];
  const desktopTopBrokers = brokers.slice(0, 10);
  const desktopRemainingBrokers = brokers.slice(10);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف أختار أفضل شركة تداول لفتح حساب حقيقي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اختيار شركة التداول المناسبة لفتح حساب حقيقي يعتمد على قوة الترخيص، تكاليف التداول، الحد الأدنى للإيداع، نوع المنصات، جودة التنفيذ، وتوفر الحساب الإسلامي إذا كان ذلك مهمًا بالنسبة لك.",
        },
      },
      {
        "@type": "Question",
        name: "هل كل شركة بتقييم مرتفع تناسب جميع المتداولين؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ليس بالضرورة. بعض الشركات تناسب المبتدئين أكثر، بينما شركات أخرى تكون أفضل لأصحاب الخبرة أو لمن يبحثون عن أدوات ومنصات أكثر تقدمًا.",
        },
      },
      {
        "@type": "Question",
        name: "هل يمكنني فتح حساب حقيقي مباشرة من هذه الصفحة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، عند توفر رابط فتح الحساب الحقيقي للشركة سيظهر زر مخصص لذلك داخل الجدول وبطاقات الموبايل، مما يسهل الانتقال مباشرة إلى صفحة التسجيل.",
        },
      },
      {
        "@type": "Question",
        name: "ما أهمية الترخيص عند تقييم شركات التداول؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الترخيص عنصر أساسي لأنه يساعد على قياس مستوى الموثوقية والرقابة على الشركة، ويمنح المتداول درجة أعلى من الطمأنينة والشفافية.",
        },
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: brokers.map((broker, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://brokeralarab.com/brokers/${broker.slug ?? ""}`,
      name: broker.name ?? "شركة تداول",
    })),
  };

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          حدث خطأ أثناء تحميل صفحة التقييمات.
        </div>
      </main>
    );
  }

  return (
    <>
      <Script
        id="brokers-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="brokers-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="bg-slate-50">
        {/* HERO */}
        <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
  <div className="mx-auto max-w-7xl px-4 py-8 md:py-10 lg:py-12">
    <div className="mx-auto max-w-5xl text-center">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
        تقييم شركات التداول
        <span className="mt-1 block text-blue-700 md:mt-0">
          واختيار الوسيط المناسب لفتح حساب حقيقي
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:mt-5 md:text-lg">
        في بروكر العرب نعرض لك تقييم شركات التداول بطريقة منظمة واحترافية
        تساعدك على فهم الفروقات بين الوسطاء من حيث الترخيص، الإيداع،
        المنصات، الحساب الإسلامي، والفئات المناسبة لكل شركة، ثم الانتقال
        بسهولة إلى صفحة التقييم الكامل أو إلى فتح حساب حقيقي عند توفر
        الرابط.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/compare"
          className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          ابدأ مقارنة الوسطاء
        </Link>

        <Link
          href="#brokers-table"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
        >
          تصفح جدول التقييمات
        </Link>
      </div>
    </div>
  </div>
</section>

        {/* STATS */}
        <section className="mx-auto max-w-7xl px-4 py-5 md:py-10">
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
              <div className="text-sm font-semibold text-slate-500">
                عدد الشركات الحالية
              </div>
              <div className="mt-2 text-3xl font-extrabold text-slate-900">
                {brokers.length}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
              <div className="text-sm font-semibold text-slate-500">
                أعلى تقييم حالي
              </div>
              <div className="mt-2 text-3xl font-extrabold text-slate-900">
                {brokers.length ? formatRating(brokers[0]?.rating ?? null) : "—"}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
              <div className="text-sm font-semibold text-slate-500">
                طريقة عرض التقييمات
              </div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">
                تقييم + فتح حساب
              </div>
            </div>
          </div>
        </section>

        {/* DESKTOP ONLY SUPPORTING CONTENT */}
        <section className="mx-auto hidden max-w-7xl px-4 pb-8 md:block">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[28px] border border-blue-200 bg-blue-50 p-6 shadow-sm lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                لماذا تبدأ من صفحة التقييمات قبل فتح حساب حقيقي؟
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                لأن اختيار الوسيط لا يجب أن يكون عشوائيًا. هذه الصفحة تعطيك
                نظرة سريعة وواضحة على الشركات المتاحة، ثم تساعدك على الانتقال إلى
                التقييم الكامل لكل وسيط قبل اتخاذ قرار فتح حساب حقيقي.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold text-slate-500">
                مهم للمتداول العربي
              </div>
              <div className="mt-3 text-lg font-extrabold leading-8 text-slate-900">
                الترخيص + الحساب الإسلامي + سهولة الإيداع + قوة المنصة
              </div>
            </div>
          </div>
        </section>

        {/* TABLE / MOBILE CARDS */}
        <section id="brokers-table" className="mx-auto max-w-7xl px-4 pb-8">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm md:rounded-[28px]">
            <div className="border-b border-slate-200 px-4 py-4 md:px-8 md:py-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                    جدول تقييم شركات التداول
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 md:text-base">
                    جدول احترافي يعرض الشركات بشكل واضح مع أهم المعلومات التي
                    يحتاجها المتداول قبل قراءة التقييم الكامل أو فتح حساب حقيقي.
                  </p>
                </div>

                <div className="inline-flex items-center self-start rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  ترتيب تلقائي حسب التقييم
                </div>
              </div>
            </div>

            {/* DESKTOP TABLE */}
<div className="hidden overflow-x-auto xl:block">
  <div className="px-5 pb-5 pt-2">
    <table className="min-w-full border-separate border-spacing-y-3 text-right">
      <thead>
        <tr className="text-sm font-bold text-slate-500">
          <th className="w-[70px] px-3 py-3">#</th>
          <th className="min-w-[360px] px-3 py-3">الشركة</th>
          <th className="w-[150px] px-3 py-3">التقييم</th>
          <th className="w-[120px] px-3 py-3">الإيداع</th>
          <th className="min-w-[170px] px-3 py-3">المنصات</th>
          <th className="min-w-[220px] px-3 py-3">الإجراءات</th>
        </tr>
      </thead>

      <tbody>
        {desktopTopBrokers.map((broker, index) => {
          const realLink = hasRealAccountLink(broker.real_account_url);
          const platformBadges = splitToBadges(broker.platforms).slice(0, 3);
          const islamicLabel = islamicAccountLabel(broker.islamic_account);

          return (
            <tr key={broker.id} className="align-middle">
              <td colSpan={7} className="p-0">
                <div className="grid grid-cols-[70px_minmax(420px,1.7fr)_150px_140px_180px_220px] items-center rounded-[24px] border border-slate-200 bg-white px-3 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:shadow-md">
                  {/* RANK */}
                  <div className="flex justify-center">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-extrabold text-slate-700">
                      {index + 1}
                    </span>
                  </div>

                  {/* BROKER */}
                  <div className="flex items-center gap-4 px-3">
                    <div className="flex h-[40px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
                      {broker.logo ? (
                        <Image
                          src={broker.logo}
                          alt={broker.name ?? "Broker"}
                          width={110}
                          height={40}
                          className="h-[40px] w-[110px] object-contain"
                        />
                      ) : (
                        <span className="text-sm font-extrabold text-slate-600">
                          {getInitials(broker.name)}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/brokers/${broker.slug}`}
                        className="text-lg font-extrabold text-slate-900 transition hover:text-blue-700"
                      >
                        {broker.name ?? "شركة تداول"}
                      </Link>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {normalizeText(
                          broker.best_for,
                          "مناسبة لمجموعة واسعة من المتداولين"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* RATING */}
                  <div className="flex justify-center">
                    <div className="inline-flex min-w-[92px] flex-col items-center justify-center rounded-2xl bg-blue-600 px-4 py-2 text-white shadow-sm">
                      <div className="text-lg font-extrabold leading-none">
                        {formatRating(broker.rating)}
                      </div>
                      <div className="mt-1 text-[11px] font-bold text-blue-100">
                        {ratingLabel(broker.rating)}
                      </div>
                    </div>
                  </div>

                  {/* DEPOSIT */}
                  <div className="flex justify-center">
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-700">
                      {formatDeposit(broker.min_deposit)}
                    </span>
                  </div>

                  {/* PLATFORMS */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {platformBadges.map((item, idx) => (
                      <span
                        key={`${broker.id}-platform-${idx}`}
                        className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-2 px-3">
                    <Link
                      href={`/brokers/${broker.slug}`}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100"
                    >
                      عرض التقييم
                    </Link>

                    {realLink ? (
                      <a
                        href={broker.real_account_url as string}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        فتح حساب حقيقي
                      </a>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500">
                        فتح حساب قريبًا
                      </span>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {desktopRemainingBrokers.length > 0 && (
      <div className="mt-4">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100">
            <span>عرض كل الشركات ({brokers.length})</span>
            <span className="text-lg transition group-open:rotate-180">⌄</span>
          </summary>

          <div className="mt-4 space-y-3">
            {desktopRemainingBrokers.map((broker, index) => {
              const realLink = hasRealAccountLink(broker.real_account_url);
              const platformBadges = splitToBadges(broker.platforms).slice(0, 3);
              const islamicLabel = islamicAccountLabel(broker.islamic_account);

              return (
                <div
                  key={broker.id}
                  className="grid grid-cols-[70px_minmax(360px,1.55fr)_150px_120px_170px_130px_220px] items-center rounded-[24px] border border-slate-200 bg-white px-3 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:shadow-md"
                >
                  <div className="flex justify-center">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-extrabold text-slate-700">
                      {index + 11}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 px-3">
                    <div className="flex h-[40px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
                      {broker.logo ? (
                        <Image
                          src={broker.logo}
                          alt={broker.name ?? "Broker"}
                          width={110}
                          height={40}
                          className="h-[40px] w-[110px] object-contain"
                        />
                      ) : (
                        <span className="text-sm font-extrabold text-slate-600">
                          {getInitials(broker.name)}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/brokers/${broker.slug}`}
                        className="text-lg font-extrabold text-slate-900 transition hover:text-blue-700"
                      >
                        {broker.name ?? "شركة تداول"}
                      </Link>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {normalizeText(
                          broker.best_for,
                          "مناسبة لمجموعة واسعة من المتداولين"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="inline-flex min-w-[92px] flex-col items-center justify-center rounded-2xl bg-blue-600 px-4 py-2 text-white shadow-sm">
                      <div className="text-lg font-extrabold leading-none">
                        {formatRating(broker.rating)}
                      </div>
                      <div className="mt-1 text-[11px] font-bold text-blue-100">
                        {ratingLabel(broker.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-700">
                      {formatDeposit(broker.min_deposit)}
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {platformBadges.map((item, idx) => (
                      <span
                        key={`${broker.id}-platform-more-${idx}`}
                        className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold ${
                        islamicLabel === "متوفر"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                          : islamicLabel === "غير متوفر"
                          ? "border border-rose-200 bg-rose-50 text-rose-700"
                          : "border border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {islamicLabel}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 px-3">
                    <Link
                      href={`/brokers/${broker.slug}`}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100"
                    >
                      عرض التقييم
                    </Link>

                    {realLink ? (
                      <a
                        href={broker.real_account_url as string}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        فتح حساب حقيقي
                      </a>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500">
                        فتح حساب قريبًا
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      </div>
    )}
  </div>
</div>

            {desktopRemainingBrokers.length > 0 && (
  <div className="hidden border-t border-slate-200 bg-white px-6 py-5 xl:block">
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100">
        <span>عرض كل الشركات ({brokers.length})</span>
        <span className="transition group-open:rotate-180">⌄</span>
      </summary>

      <div className="mt-5 overflow-x-auto rounded-[24px] border border-slate-200">
        <table className="min-w-full border-separate border-spacing-0 text-right">
          <thead>
            <tr className="bg-slate-50 text-sm font-extrabold text-slate-700">
              <th className="border-b border-slate-200 px-4 py-4">#</th>
              <th className="border-b border-slate-200 px-4 py-4">الشركة</th>
              <th className="border-b border-slate-200 px-4 py-4">التقييم</th>
              <th className="border-b border-slate-200 px-4 py-4">الإيداع</th>
              <th className="border-b border-slate-200 px-4 py-4">المنصات</th>
              <th className="border-b border-slate-200 px-4 py-4">الحساب الإسلامي</th>
              <th className="border-b border-slate-200 px-4 py-4">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {desktopRemainingBrokers.map((broker, index) => {
              const realLink = hasRealAccountLink(broker.real_account_url);
              const platformBadges = splitToBadges(broker.platforms);
              const islamicLabel = islamicAccountLabel(broker.islamic_account);

              return (
                <tr
                  key={broker.id}
                  className="group transition hover:bg-slate-50/80"
                >
                  <td className="border-b border-slate-100 px-4 py-5 align-top">
                    <div className="flex justify-center">
                      <span className="inline-flex h-9 min-w-[36px] items-center justify-center rounded-xl border border-slate-200 bg-white px-2 text-sm font-extrabold text-slate-800 shadow-sm">
                        {index + 11}
                      </span>
                    </div>
                  </td>

                  <td className="border-b border-slate-100 px-4 py-5 align-top">
                    <div className="flex min-w-[250px] items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {broker.logo ? (
                          <Image
                            src={broker.logo}
                            alt={broker.name ?? "Broker"}
                            width={56}
                            height={56}
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <span className="text-sm font-extrabold text-slate-600">
                            {getInitials(broker.name)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/brokers/${broker.slug}`}
                            className="text-base font-extrabold text-slate-900 transition hover:text-blue-700"
                          >
                            {broker.name ?? "شركة تداول"}
                          </Link>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {normalizeText(
                            broker.best_for,
                            "مناسبة لمجموعة واسعة من المتداولين"
                          )}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="border-b border-slate-100 px-4 py-5 align-top">
                    <div className="min-w-[110px]">
                      <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-3 py-2 text-white shadow-sm">
                        <span className="text-lg font-extrabold">
                          {formatRating(broker.rating)}
                        </span>
                        <span className="text-xs font-bold text-blue-100">
                          /10
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-500">
                        {ratingLabel(broker.rating)}
                      </div>
                    </div>
                  </td>

                  <td className="border-b border-slate-100 px-4 py-5 align-top">
                    <div className="inline-flex rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-700">
                      {formatDeposit(broker.min_deposit)}
                    </div>
                  </td>

                  <td className="border-b border-slate-100 px-4 py-5 align-top">
                    <div className="flex min-w-[160px] flex-wrap gap-2">
                      {platformBadges.map((item, idx) => (
                        <span
                          key={`${broker.id}-platform-more-${idx}`}
                          className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="border-b border-slate-100 px-4 py-5 align-top">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold ${
                        islamicLabel === "متوفر"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                          : islamicLabel === "غير متوفر"
                          ? "border border-rose-200 bg-rose-50 text-rose-700"
                          : "border border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {islamicLabel}
                    </span>
                  </td>

                  <td className="border-b border-slate-100 px-4 py-5 align-top">
                    <div className="flex min-w-[210px] flex-col gap-2">
                      <Link
                        href={`/brokers/${broker.slug}`}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100"
                      >
                        عرض التقييم
                      </Link>

                      {realLink ? (
                        <a
                          href={broker.real_account_url as string}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                          فتح حساب حقيقي
                        </a>
                      ) : (
                        <span className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500">
                          فتح حساب حقيقي قريبًا
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </details>
  </div>
)}

            {/* MOBILE / TABLET CARDS */}
            <div className="grid gap-4 p-4 md:p-5 xl:hidden">
              {brokers.map((broker, index) => {
                const realLink = hasRealAccountLink(broker.real_account_url);
                const regulationBadges = splitToBadges(broker.regulation).slice(0, 3);
                const platformBadges = splitToBadges(broker.platforms).slice(0, 3);
                const islamicLabel = islamicAccountLabel(broker.islamic_account);

                return (
                  <article
                    key={broker.id}
                    className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            {broker.logo ? (
                              <Image
                                src={broker.logo}
                                alt={broker.name ?? "Broker"}
                                width={48}
                                height={48}
                                className="h-full w-full object-contain p-2"
                              />
                            ) : (
                              <span className="text-xs font-extrabold text-slate-600">
                                {getInitials(broker.name)}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-[11px] font-bold text-slate-500">
                              الترتيب #{index + 1}
                            </div>
                            <h3 className="truncate text-lg font-extrabold text-slate-900">
                              {broker.name ?? "شركة تداول"}
                            </h3>
                            <div className="mt-1 text-xs font-bold text-slate-500">
                              {ratingLabel(broker.rating)}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 rounded-2xl bg-blue-600 px-3 py-2 text-center text-white shadow-sm">
                          <div className="text-[10px] font-bold text-blue-100">
                            التقييم
                          </div>
                          <div className="text-lg font-extrabold">
                            {formatRating(broker.rating)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="text-xs font-bold text-slate-500">
                            الإيداع
                          </div>
                          <div className="mt-1 text-sm font-extrabold text-slate-900">
                            {formatDeposit(broker.min_deposit)}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="text-xs font-bold text-slate-500">
                            الحساب الإسلامي
                          </div>
                          <div
                            className={`mt-1 text-sm font-extrabold ${
                              islamicLabel === "متوفر"
                                ? "text-emerald-700"
                                : islamicLabel === "غير متوفر"
                                ? "text-rose-700"
                                : "text-slate-700"
                            }`}
                          >
                            {islamicLabel}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 text-xs font-bold text-slate-500">
                          التراخيص
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {regulationBadges.map((item, idx) => (
                            <span
                              key={`${broker.id}-m-reg-${idx}`}
                              className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 text-xs font-bold text-slate-500">
                          المنصات
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {platformBadges.map((item, idx) => (
                            <span
                              key={`${broker.id}-m-platform-${idx}`}
                              className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="text-xs font-bold text-slate-500">
                          مناسبة لـ
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm leading-7 text-slate-700">
                          {normalizeText(
                            broker.best_for,
                            "مناسبة لمجموعة واسعة من المتداولين"
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-col gap-2 sm:grid sm:grid-cols-2">
                        <Link
                          href={`/brokers/${broker.slug}`}
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
                        >
                          عرض التقييم
                        </Link>

                        {realLink ? (
                          <a
                            href={broker.real_account_url as string}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                          >
                            فتح حساب حقيقي
                          </a>
                        ) : (
                          <span className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-500">
                            فتح حساب حقيقي قريبًا
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* DESKTOP ONLY LONG CONTENT */}
        <section className="mx-auto hidden max-w-7xl px-4 py-10 md:block md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                كيف تختار شركة مناسبة لفتح حساب حقيقي؟
              </h2>

              <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
                <p>
                  قبل فتح حساب حقيقي مع أي شركة تداول، من المهم أن تبدأ بمراجعة
                  الأساسيات التي تحدد جودة الوسيط. أول هذه العناصر هو الترخيص،
                  لأن الشركة الخاضعة لجهات رقابية معروفة تعطي مستوى أعلى من
                  الثقة والشفافية مقارنة بالوسطاء غير الواضحين من هذه الناحية.
                </p>

                <p>
                  بعد ذلك يأتي عامل الإيداع الأولي وتكاليف التداول. بعض
                  الشركات تناسب المبتدئين لأنها تسمح بالبدء بمبالغ صغيرة، بينما
                  شركات أخرى قد تكون أفضل للمتداولين ذوي الخبرة الذين يبحثون عن
                  مزايا تنفيذ أسرع أو أدوات أكثر تقدمًا.
                </p>

                <p>
                  كذلك يجب الانتباه إلى المنصة المتاحة للتداول، ومدى سهولة
                  الاستخدام، وتوفر الحساب الإسلامي إذا كان هذا مهمًا لك. لهذا
                  السبب قمنا ببناء هذه الصفحة بحيث تجمع لك هذه العناصر في مكان
                  واحد، ثم تمنحك خيارين واضحين: عرض التقييم الكامل، أو فتح حساب
                  حقيقي عندما يكون الرابط متوفرًا.
                </p>

                <p>
                  الهدف النهائي ليس فقط ترتيب الشركات، بل مساعدتك على اختيار
                  الوسيط الذي يناسب احتياجك الفعلي. لذلك كلما قرأت تقييم الشركة
                  بشكل أعمق قبل التسجيل، كانت فرصة اتخاذ قرار أفضل وأقل اندفاعًا
                  أكبر.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-extrabold text-slate-900">
                ما الذي نركز عليه؟
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-8 text-slate-700">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <strong className="text-slate-900">1.</strong> قوة الترخيص
                  والجهات الرقابية
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <strong className="text-slate-900">2.</strong> سهولة فتح حساب
                  حقيقي والبدء
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <strong className="text-slate-900">3.</strong> الحد الأدنى
                  للإيداع وتكلفة الدخول
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <strong className="text-slate-900">4.</strong> المنصات
                  والأدوات المناسبة
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <strong className="text-slate-900">5.</strong> ملاءمة الشركة
                  للمبتدئين أو المحترفين
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <strong className="text-slate-900">6.</strong> توفر الحساب
                  الإسلامي عند الحاجة
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-10">
          <div className="rounded-[24px] border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white shadow-sm md:rounded-[28px] md:p-8">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-2xl font-extrabold md:text-3xl">
                  هل أنت جاهز لاختيار الوسيط المناسب؟
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-8 text-blue-50 md:text-base">
                  ابدأ بقراءة تقييم الشركة التي تناسبك، ثم انتقل إلى فتح حساب
                  حقيقي عندما تكون جاهزًا. بهذه الطريقة تجمع بين الفهم الجيد
                  والقرار السريع دون عشوائية.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  قارن بين الوسطاء
                </Link>

                <a
                  href="#brokers-table"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  ارجع إلى الجدول
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ DESKTOP ONLY */}
        <section className="mx-auto hidden max-w-7xl px-4 pb-14 md:block">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              الأسئلة الشائعة حول تقييم شركات التداول
            </h2>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  كيف أعرف أن شركة التداول مناسبة لفتح حساب حقيقي؟
                </h3>
                <p className="mt-2 leading-8 text-slate-700">
                  ابدأ بمراجعة الترخيص، المنصات، الإيداع، والحساب الإسلامي، ثم
                  اقرأ صفحة التقييم الكاملة للشركة. بعد ذلك يمكنك الانتقال إلى
                  فتح حساب حقيقي عندما تتأكد أن الوسيط يناسب احتياجاتك.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  هل الشركة ذات التقييم الأعلى هي الأفضل دائمًا؟
                </h3>
                <p className="mt-2 leading-8 text-slate-700">
                  ليس دائمًا. التقييم العالي مهم، لكن الأفضل لك يعتمد أيضًا على
                  خبرتك، نوع التداول الذي تفضله، الحد الأدنى للإيداع، والمنصة
                  التي ترتاح في استخدامها.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  لماذا لا يظهر زر فتح حساب حقيقي عند بعض الشركات؟
                </h3>
                <p className="mt-2 leading-8 text-slate-700">
                  لأن الرابط قد لا يكون مضافًا بعد في قاعدة البيانات. بمجرد
                  إضافة رابط فتح الحساب الحقيقي للشركة سيظهر الزر تلقائيًا داخل
                  الصفحة دون الحاجة لتعديل يدوي.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  هل الصفحة مناسبة للموبايل؟
                </h3>
                <p className="mt-2 leading-8 text-slate-700">
                  نعم، تم تصميم الصفحة بحيث يظهر الجدول الكامل على الشاشات
                  الكبيرة، بينما تتحول البيانات إلى بطاقات منظمة وواضحة على
                  الموبايل لتسهيل القراءة والتصفح.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}