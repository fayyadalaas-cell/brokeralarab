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
  if (rating >= 4.5) return "ممتاز";
  if (rating >= 4) return "قوي جدًا";
  if (rating >= 3.5) return "جيد";
  return "مقبول";
}

function getLogoWrapClass(name: string | null | undefined) {
  const n = (name || "").toLowerCase().trim();

  if (n.includes("exness")) return "w-[160px]";
  if (n === "xm") return "w-[150px]";
  if (n.includes("vantage")) return "w-[150px]";
  if (n.includes("justmarkets")) return "w-[145px]";
  if (n === "xs") return "w-[145px]";
  if (n.includes("equiti")) return "w-[150px]";
  if (n.includes("avatrade")) return "w-[150px]";

  return "w-[145px]";
}

function getLogoImgClass(name: string | null | undefined) {
  const n = (name || "").toLowerCase().trim();

  if (n.includes("exness")) return "scale-[1.75]";
  if (n === "xm") return "scale-[1.7]";
  if (n.includes("vantage")) return "scale-[1.6]";
  if (n.includes("justmarkets")) return "scale-[1.45]";
  if (n === "xs") return "scale-[1.7]";
  if (n.includes("equiti")) return "scale-[1.65]";
  if (n.includes("avatrade")) return "scale-[1.65]";

  return "scale-100";
}

function formatRatingOutOfFive(rating: number | null) {
  if (rating === null || rating === undefined) return "—";
  return Number(rating).toFixed(1);
}

function getRoundedStarValue(rating: number | null) {
  if (rating === null || rating === undefined) return 0;
  return Math.round(Number(rating) * 2) / 2;
}

function renderStars(rating: number | null) {
  const rounded = getRoundedStarValue(rating);
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className="flex items-center justify-center gap-0.5"
      aria-label={`تقييم ${formatRatingOutOfFive(rating)} من 5`}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="text-[11px] leading-none text-amber-400">
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span className="text-[11px] leading-none text-amber-400">⯨</span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="text-[11px] leading-none text-slate-300">
          ★
        </span>
      ))}
    </div>
  );
}

function DesktopRows({
  brokers,
  startIndex = 0,
}: {
  brokers: Broker[];
  startIndex?: number;
}) {
  return (
    <tbody>
      {brokers.map((broker, index) => {
        const realLink = hasRealAccountLink(broker.real_account_url);
        const platformBadges = splitToBadges(broker.platforms).slice(0, 3);

        return (
          <tr
            key={broker.id}
            className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
          >
            {/* RANK */}
            <td className="px-3 py-5 text-center align-middle">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-extrabold text-slate-700">
                {startIndex + index + 1}
              </span>
            </td>

            {/* COMPANY */}
            <td className="px-3 py-5 align-middle">
              <div className="flex flex-col items-center justify-center text-center">
                <div
                  className={`flex h-[62px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-3 shadow-sm ${getLogoWrapClass(
                    broker.name
                  )}`}
                >
                  {broker.logo ? (
                    <Image
                      src={broker.logo}
                      alt={broker.name ?? "Broker logo"}
                      width={220}
                      height={70}
                      className={`h-auto max-h-[44px] w-full object-contain ${getLogoImgClass(
                        broker.name
                      )}`}
                    />
                  ) : (
                    <span className="text-sm font-extrabold text-slate-600">
                      {getInitials(broker.name)}
                    </span>
                  )}
                </div>

                <Link
                  href={`/brokers/${broker.slug}`}
                  className="mt-2 text-sm font-extrabold text-slate-900 transition hover:text-blue-700"
                >
                  {broker.name ?? "شركة تداول"}
                </Link>
              </div>
            </td>

            {/* RATING */}
            <td className="px-3 py-5 text-center align-middle">
              <div className="inline-flex min-w-[92px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <div className="text-lg font-extrabold leading-none text-slate-900">
                  {formatRating(broker.rating)}
                  <span className="mr-1 text-[11px] font-bold text-slate-500">/5</span>
                </div>
                <div className="mt-1">{renderStars(broker.rating)}</div>
                <div className="mt-1 text-[11px] font-bold text-slate-500">
                  {ratingLabel(broker.rating)}
                </div>
              </div>
            </td>

            {/* DEPOSIT */}
            <td className="px-3 py-5 text-center align-middle">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-700">
                {formatDeposit(broker.min_deposit)}
              </span>
            </td>

            {/* PLATFORMS */}
            <td className="px-3 py-5 text-center align-middle">
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
            </td>

            {/* ACTIONS */}
            <td className="px-3 py-5 align-middle">
              <div className="mx-auto flex max-w-[190px] flex-col gap-2">
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
            </td>
          </tr>
        );
      })}
    </tbody>
  );
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

        {/* SUPPORTING CONTENT */}
        <section className="mx-auto hidden max-w-7xl px-4 pb-8 md:block">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[28px] border border-blue-200 bg-blue-50 p-6 shadow-sm lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                لماذا تبدأ من صفحة التقييمات قبل فتح حساب حقيقي؟
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                لأن اختيار الوسيط لا يجب أن يكون عشوائيًا. هذه الصفحة تعطيك نظرة
                سريعة وواضحة على الشركات المتاحة، ثم تساعدك على الانتقال إلى
                التقييم الكامل لكل وسيط قبل اتخاذ قرار فتح حساب حقيقي.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold text-slate-500">مهم للمتداول العربي</div>
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
                    جدول جديد أوضح وأسهل للقراءة، مع محاذاة ثابتة بين العناوين
                    والصفوف.
                  </p>
                </div>

                <div className="inline-flex items-center self-start rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  ترتيب تلقائي حسب التقييم
                </div>
              </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden xl:block">
              <div className="p-5">
                <div className="overflow-hidden rounded-[24px] border border-slate-200">
                  <table className="min-w-full table-fixed text-right">
                    <colgroup>
                      <col className="w-[72px]" />
                      <col className="w-[240px]" />
                      <col className="w-[140px]" />
                      <col className="w-[120px]" />
                      <col className="w-[160px]" />
                      <col className="w-[220px]" />
                    </colgroup>

                    <thead className="bg-slate-50">
                      <tr className="text-sm font-extrabold text-slate-700">
                        <th className="border-b border-slate-200 px-3 py-4 text-center">#</th>
                        <th className="border-b border-slate-200 px-3 py-4 text-center">الشركة</th>
                        <th className="border-b border-slate-200 px-3 py-4 text-center">التقييم</th>
                        <th className="border-b border-slate-200 px-3 py-4 text-center">الإيداع</th>
                        <th className="border-b border-slate-200 px-3 py-4 text-center">المنصات</th>
                        <th className="border-b border-slate-200 px-3 py-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>

                    <DesktopRows brokers={desktopTopBrokers} />
                  </table>
                </div>

                {desktopRemainingBrokers.length > 0 && (
                  <div className="mt-4">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100">
                        <span>عرض كل الشركات ({brokers.length})</span>
                        <span className="text-lg transition group-open:rotate-180">⌄</span>
                      </summary>

                      <div className="mt-4 overflow-hidden rounded-[24px] border border-slate-200">
                        <table className="min-w-full table-fixed text-right">
                          <colgroup>
                            <col className="w-[72px]" />
                            <col className="w-[240px]" />
                            <col className="w-[140px]" />
                            <col className="w-[120px]" />
                            <col className="w-[160px]" />
                            <col className="w-[220px]" />
                          </colgroup>

                          <thead className="bg-slate-50">
                            <tr className="text-sm font-extrabold text-slate-700">
                              <th className="border-b border-slate-200 px-3 py-4 text-center">#</th>
                              <th className="border-b border-slate-200 px-3 py-4 text-center">الشركة</th>
                              <th className="border-b border-slate-200 px-3 py-4 text-center">التقييم</th>
                              <th className="border-b border-slate-200 px-3 py-4 text-center">الإيداع</th>
                              <th className="border-b border-slate-200 px-3 py-4 text-center">المنصات</th>
                              <th className="border-b border-slate-200 px-3 py-4 text-center">الإجراءات</th>
                            </tr>
                          </thead>

                          <DesktopRows
                            brokers={desktopRemainingBrokers}
                            startIndex={desktopTopBrokers.length}
                          />
                        </table>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </div>

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

<div className="mt-1 flex items-center justify-center gap-0.5">
  {Array.from({ length: Math.floor(getRoundedStarValue(broker.rating)) }).map((_, i) => (
    <span key={i} className="text-[11px] leading-none text-yellow-300">
      ★
    </span>
  ))}
</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="text-xs font-bold text-slate-500">الإيداع</div>
                          <div className="mt-1 text-sm font-extrabold text-slate-900">
                            {formatDeposit(broker.min_deposit)}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="text-xs font-bold text-slate-500">الحساب الإسلامي</div>
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
                        <div className="mb-2 text-xs font-bold text-slate-500">التراخيص</div>
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
                        <div className="mb-2 text-xs font-bold text-slate-500">المنصات</div>
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
                        <div className="text-xs font-bold text-slate-500">مناسبة لـ</div>
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
      </main>
    </>
  );
}
        