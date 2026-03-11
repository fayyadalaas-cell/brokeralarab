import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ComparePicker from "./ComparePicker";

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
};

export const metadata: Metadata = {
  title: "مقارنة شركات التداول | بروكر العرب",
  description:
    "قارن بين أشهر شركات التداول العالمية من حيث التراخيص والمنصات والحد الأدنى للإيداع والحساب الإسلامي لمعرفة أي وسيط يناسبك.",
  keywords: [
    "مقارنة شركات التداول",
    "مقارنة شركات الفوركس",
    "أفضل شركات التداول",
    "أفضل وسيط تداول",
    "مقارنة الوسطاء",
    "Exness vs XM",
    "XS vs Vantage",
    "بروكر العرب",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/compare",
  },
  openGraph: {
    title: "مقارنة شركات التداول | بروكر العرب",
    description:
      "صفحة مقارنة احترافية بين شركات التداول تساعد المتداول العربي على فهم الفروقات بين الوسطاء.",
    url: "https://brokeralarab.com/compare",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
  },
};

function money(value: number | null) {
  if (value === null || Number.isNaN(value)) return "غير محدد";
  return `$${value}`;
}

function shortReg(value: string | null) {
  if (!value) return "غير محدد";
  return value
    .split("||")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(" / ");
}

function shortPlatforms(value: string | null) {
  if (!value) return "غير محدد";
  return value
    .replace("JustMarkets Mobile App", "Mobile")
    .replace(/\s+/g, " ")
    .trim();
}

function yesNoArabic(value: string | null) {
  const v = (value || "").toLowerCase();
  if (v.includes("yes") || v.includes("متوفر")) return "متوفر";
  if (v.includes("no") || v.includes("غير")) return "غير واضح";
  return value || "غير محدد";
}

function avgRating(a: number | null, b: number | null) {
  const values = [a, b].filter((v): v is number => typeof v === "number");
  if (!values.length) return null;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function minDeposit(a: number | null, b: number | null) {
  const values = [a, b].filter((v): v is number => typeof v === "number");
  if (!values.length) return null;
  return Math.min(...values);
}

function renderStars(rating: number | null, size: "sm" | "md" = "sm") {
  const stars = Math.round(rating ?? 0);
  const starClass = size === "md" ? "text-[13px]" : "text-[11px]";

  return (
    <div className={`flex items-center gap-0.5 text-amber-400 ${starClass}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < stars ? "opacity-100" : "opacity-30"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default async function ComparePage() {
  const supabase = await createClient();

const { data } = await supabase
  .from("brokers")
  .select(
    "id,name,slug,rating,min_deposit,best_for,regulation,platforms,islamic_account,logo"
  )
  .order("rating", { ascending: false });

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.name && b.slug);

  const comparisons: { a: Broker; b: Broker; score: number }[] = [];
  for (let i = 0; i < brokers.length; i++) {
    for (let j = i + 1; j < brokers.length; j++) {
      comparisons.push({
        a: brokers[i],
        b: brokers[j],
        score: avgRating(brokers[i].rating, brokers[j].rating) ?? 0,
      });
    }
  }

const sortedComparisons = comparisons.sort(
  (x, y) => (y.score ?? 0) - (x.score ?? 0)
);

const featuredComparisonsDesktop = sortedComparisons.slice(0, 15);
const featuredComparisonsMobile = sortedComparisons.slice(0, 5);
  const topBrokers = brokers.slice(0, 6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف أقارن بين شركتين تداول؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اختر شركتين من أداة المقارنة في أعلى الصفحة، ثم انتقل مباشرة إلى صفحة المقارنة التي تعرض الفروقات في التراخيص والمنصات والحد الأدنى للإيداع والحساب الإسلامي.",
        },
      },
      {
        "@type": "Question",
        name: "ما أهم العناصر التي يجب مقارنتها بين الوسطاء؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "أهم العناصر تشمل التراخيص، الحد الأدنى للإيداع، المنصات، الحساب الإسلامي، والتقييم العام ومدى ملاءمة الوسيط لأسلوب التداول.",
        },
      },
      {
        "@type": "Question",
        name: "هل صفحة المقارنة مفيدة قبل فتح الحساب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، لأنها تختصر الوقت وتعرض أهم الفروقات الأساسية بين وسيطين في مكان واحد بشكل واضح ومباشر.",
        },
      },
    ],
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
<section className="relative overflow-hidden border-b border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
        مقارنة شركات التداول
      </h1>

      <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
        قارن بين أشهر شركات التداول من حيث التراخيص، المنصات، الحد الأدنى
        للإيداع، والحساب الإسلامي، ثم افتح صفحة مقارنة واضحة تساعدك على اختيار
        الوسيط الأنسب قبل فتح الحساب.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#compare-tool"
          className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
        >
          ابدأ المقارنة الآن
        </a>

        <a
          href="#featured-comparisons"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-100"
        >
          تصفح أشهر المقارنات
        </a>
      </div>
    </div>
  </div>
</section>

{/* COMPARE TOOL */}
<section
  id="compare-tool"
  className="mx-auto max-w-7xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 md:pt-4 md:pb-10"
>
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
    <div className="grid lg:grid-cols-[1.02fr_.98fr]">
      {/* LEFT / TOOL */}
      <div className="bg-[linear-gradient(180deg,#0f172a_0%,#172554_100%)] p-5 sm:p-6 lg:p-7">
        <div className="mx-auto max-w-xl">
          <div className="mb-4 text-center">
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold text-blue-100">
              ابدأ الآن
            </div>

            <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
              اختر شركتين للمقارنة
            </h3>

            <p className="mt-2 text-sm leading-7 text-blue-100/90">
              حدد الشركة الأولى والثانية، ثم انتقل مباشرة إلى صفحة المقارنة
              التفصيلية بينهما.
            </p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white p-4 shadow-[0_16px_35px_rgba(0,0,0,0.16)] sm:p-5">
            <ComparePicker
              brokers={brokers.map((b) => ({
                name: b.name || "",
                slug: b.slug || "",
              }))}
            />
          </div>

          <div className="mt-3 rounded-2xl border border-blue-400/20 bg-white/5 px-4 py-3 text-center text-[11px] font-medium leading-6 text-blue-100/90">
            قارن بين شركتين متقاربتين في التقييم أو الترخيص حتى تظهر لك الفروقات
            بشكل أوضح وأسهل.
          </div>
        </div>
      </div>

      {/* RIGHT / INTRO */}
<div className="relative hidden overflow-hidden border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 sm:p-6 lg:block lg:border-t-0 lg:border-r lg:p-6">
  <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-blue-50 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-slate-100 blur-3xl" />

  <div className="relative">

    <h2 className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 sm:text-[40px]">
  اختر شركتين وافتح <span className="text-blue-700">المقارنة</span>
</h2>

    <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600">
      بدل قراءة مراجعتين كاملتين ومحاولة معرفة الفروقات بنفسك، استخدم هذه
      الأداة للوصول مباشرة إلى صفحة مقارنة واضحة تعرض أهم النقاط التي
      يحتاجها المتداول قبل فتح الحساب.
    </p>

    <div className="mt-7 space-y-4">
      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-extrabold text-blue-700">
          1
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            قارن بين أهم المعايير فقط
          </h3>
          <p className="mt-1 text-xs leading-6 text-slate-500">
            التراخيص، الحد الأدنى للإيداع، المنصات، والحساب الإسلامي بدون
            حشو أو تشتت.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-extrabold text-blue-700">
          2
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            قرار أسرع قبل التسجيل
          </h3>
          <p className="mt-1 text-xs leading-6 text-slate-500">
            بدل التنقل بين صفحات كثيرة وجمع المعلومات يدويًا، سترى الفروقات
            بشكل مباشر في صفحة واحدة.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-extrabold text-blue-700">
          3
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            مناسبة للمتداول العربي
          </h3>
          <p className="mt-1 text-xs leading-6 text-slate-500">
            الأداة تساعدك على اختيار الوسيط الأنسب لك قبل فتح الحساب الحقيقي،
            خصوصًا إذا كنت تهتم بالترخيص أو الحساب الإسلامي.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-6 rounded-[20px] border border-blue-100 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_100%)] p-4">
      <div className="text-xs font-extrabold text-blue-700">
        ماذا ستشاهد في صفحة المقارنة؟
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
          التراخيص
        </span>
        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
          الإيداع
        </span>
        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
          المنصات
        </span>
        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
          الحساب الإسلامي
        </span>
        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
          الفروقات الأساسية
        </span>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</section>

      {/* FEATURED COMPARISONS */}
<section className="mx-auto max-w-7xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="text-sm font-extrabold text-[#2563eb]">
          أشهر المقارنات
        </div>
        <h2 className="mt-2 text-3xl font-black text-[#0f172a] sm:text-4xl">
          صفحات المقارنة الأكثر زيارة
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
          اختر من بين أشهر المقارنات الجاهزة بين الوسطاء، أو استخدم أداة
          المقارنة في الأعلى لفتح أي مقارنة تريدها.
        </p>
      </div>
    </div>

    {/* MOBILE: 5 only */}
    <div className="grid gap-4 md:hidden">
      {featuredComparisonsMobile.map((item) => {
        const slug = `${item.a.slug}-vs-${item.b.slug}`;

        return (
          <Link
            key={slug}
            href={`/compare/${slug}`}
            className="group rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              {/* Broker A */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  {item.a.logo ? (
                    <img
                      src={item.a.logo}
                      alt={item.a.name || "Broker logo"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">No logo</span>
                  )}
                </div>

                <div className="mt-2 text-sm font-bold text-slate-900">
                  {item.a.name}
                </div>

                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="text-[11px] font-bold text-slate-600">
                    {item.a.rating?.toFixed(1) ?? "-"}
                  </span>
                  {renderStars(item.a.rating, "sm")}
                </div>
              </div>

              {/* VS */}
              <div className="text-sm font-black text-slate-400">VS</div>

              {/* Broker B */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  {item.b.logo ? (
                    <img
                      src={item.b.logo}
                      alt={item.b.name || "Broker logo"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">No logo</span>
                  )}
                </div>

                <div className="mt-2 text-sm font-bold text-slate-900">
                  {item.b.name}
                </div>

                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="text-[11px] font-bold text-slate-600">
                    {item.b.rating?.toFixed(1) ?? "-"}
                  </span>
                  {renderStars(item.b.rating, "sm")}
                </div>
              </div>
            </div>

            <div className="text-center text-base font-extrabold text-slate-900">
              مقارنة {item.a.name} مع {item.b.name}
            </div>

            <p className="mt-3 text-center text-sm leading-7 text-slate-600">
              تعرّف على الفروقات بين {item.a.name} و{item.b.name} من حيث
              التراخيص، الرسوم، الإيداع، والمنصات.
            </p>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
              <span className="text-xs text-slate-500">متوسط التقييم</span>
              <span className="text-sm font-extrabold text-slate-900">
                {avgRating(item.a.rating, item.b.rating)?.toFixed(2) ?? "-"} / 5
              </span>
            </div>

            <div className="mt-4 text-center text-sm font-extrabold text-emerald-700">
              اقرأ المقارنة ←
            </div>
          </Link>
        );
      })}
    </div>

    {/* DESKTOP: 15 */}
    <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
      {featuredComparisonsDesktop.map((item) => {
        const slug = `${item.a.slug}-vs-${item.b.slug}`;

        return (
          <Link
            key={slug}
            href={`/compare/${slug}`}
            className="group rounded-[24px] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              {/* Broker A */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  {item.a.logo ? (
                    <img
                      src={item.a.logo}
                      alt={item.a.name || "Broker logo"}
                      className="max-h-20 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">No logo</span>
                  )}
                </div>

                <div className="mt-2 text-sm font-bold text-slate-900">
                  {item.a.name}
                </div>

                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="text-xs font-bold text-slate-600">
                    {item.a.rating?.toFixed(1) ?? "-"}
                  </span>
                  {renderStars(item.a.rating, "md")}
                </div>
              </div>

              {/* VS */}
              <div className="text-base font-black text-slate-400">VS</div>

              {/* Broker B */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  {item.b.logo ? (
                    <img
                      src={item.b.logo}
                      alt={item.b.name || "Broker logo"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">No logo</span>
                  )}
                </div>

                <div className="mt-2 text-sm font-bold text-slate-900">
                  {item.b.name}
                </div>

                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="text-xs font-bold text-slate-600">
                    {item.b.rating?.toFixed(1) ?? "-"}
                  </span>
                  {renderStars(item.b.rating, "md")}
                </div>
              </div>
            </div>

            <div className="text-center text-lg font-extrabold text-slate-900">
              مقارنة {item.a.name} مع {item.b.name}
            </div>

            <p className="mt-3 text-center text-sm leading-7 text-slate-600">
              تعرّف على الفروقات بين {item.a.name} و{item.b.name} من حيث
              التراخيص، الرسوم، الحد الأدنى للإيداع، المنصات، ومدى ملاءمة كل
              شركة للمتداول العربي.
            </p>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
              <span className="text-sm text-slate-500">متوسط التقييم</span>
              <span className="text-sm font-extrabold text-slate-900">
                {avgRating(item.a.rating, item.b.rating)?.toFixed(2) ?? "-"} / 5
              </span>
            </div>

            <div className="mt-4 text-center text-sm font-extrabold text-emerald-700 transition group-hover:text-emerald-800">
              اقرأ المقارنة ←
            </div>
          </Link>
        );
      })}
    </div>
  </div>
</section>

      {/* USEFUL INTERNAL SEO SECTIONS */}
<section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
  <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
    {/* INTERNAL LINKS */}
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="text-sm font-extrabold text-[#2563eb]">
        صفحات مهمة داخل الموقع
      </div>

      <h2 className="mt-2 text-2xl font-black text-[#0f172a] sm:text-3xl">
        انتقل إلى الصفحات الأكثر فائدة
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
        إذا كنت ما زلت تقارن بين أكثر من وسيط، فهذه الصفحات الداخلية تساعدك
        على الوصول إلى التقييمات والتصنيفات والمراجعات المهمة بسرعة أكبر.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/brokers"
          className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
        >
          <div className="text-lg font-black text-[#0f172a]">
            تقييم شركات التداول
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            راجع تقييمات الوسطاء وتفاصيل التراخيص والمنصات والحساب الإسلامي.
          </p>
          <div className="mt-4 text-sm font-extrabold text-[#2563eb]">
            تصفح الصفحة ←
          </div>
        </Link>

        <Link
          href="/best-brokers"
          className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
        >
          <div className="text-lg font-black text-[#0f172a]">
            أفضل الوسطاء
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            صفحة مختصرة لعرض الوسطاء الأقوى حسب التقييم العام والانطباع العام.
          </p>
          <div className="mt-4 text-sm font-extrabold text-[#2563eb]">
            اذهب الآن ←
          </div>
        </Link>

        <Link
          href="/brokers/saudi-arabia"
          className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
        >
          <div className="text-lg font-black text-[#0f172a]">
            أفضل الوسطاء في السعودية
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            تصفح الوسطاء المناسبين للمتداولين في السعودية حسب المعايير المهمة.
          </p>
          <div className="mt-4 text-sm font-extrabold text-[#2563eb]">
            افتح الصفحة ←
          </div>
        </Link>

        <Link
          href="/compare"
          className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
        >
          <div className="text-lg font-black text-[#0f172a]">
            جميع صفحات المقارنات
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            ارجع إلى صفحة المقارنات الرئيسية واختر أي شركتين تريد المقارنة بينهما.
          </p>
          <div className="mt-4 text-sm font-extrabold text-[#2563eb]">
            صفحة المقارنات ←
          </div>
        </Link>
      </div>

      <div className="mt-6 rounded-[22px] border border-blue-100 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_100%)] p-4">
        <div className="text-sm font-extrabold text-[#2563eb]">
          نصيحة سريعة
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-700">
          إذا كنت مترددًا بين شركتين فقط، افتح صفحة المقارنة أولًا. وإذا كنت
          ما زلت في مرحلة البحث العام، ابدأ من صفحة تقييمات الوسطاء أو أفضل
          الوسطاء.
        </p>
      </div>
    </div>

    {/* QUICK GUIDE */}
    <div className="hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:block">
      <div className="text-sm font-extrabold text-[#2563eb]">
        دليل مختصر
      </div>

      <h2 className="mt-2 text-2xl font-black text-[#0f172a] sm:text-3xl">
        كيف تستفيد من صفحة المقارنة؟
      </h2>

      <div className="mt-6 space-y-4">
        <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
          <h3 className="text-base font-black text-[#0f172a]">
            1) اختر وسيطين متقاربين
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            أفضل نتيجة تظهر عندما تقارن بين شركتين فعلاً محتار بينهما، وليس بين
            وسيطين مختلفين جدًا من حيث الفئة أو نوع الخدمة.
          </p>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
          <h3 className="text-base font-black text-[#0f172a]">
            2) ركّز على المعايير المهمة لك
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            بعض الزوار يهتمون أكثر بالترخيص، وآخرون يهتمون بالحد الأدنى للإيداع
            أو الحساب الإسلامي أو المنصات.
          </p>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
          <h3 className="text-base font-black text-[#0f172a]">
            3) بعد المقارنة اقرأ التقييم الكامل
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            صفحة المقارنة تختصر الطريق، لكن صفحة التقييم تعطيك الصورة الكاملة عن
            مزايا وعيوب كل شركة بشكل أوسع.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
        <div className="text-sm font-extrabold text-slate-900">
          أهم ما ستجده في صفحات المقارنة
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
            التراخيص
          </span>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
            الحد الأدنى للإيداع
          </span>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
            المنصات
          </span>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
            الحساب الإسلامي
          </span>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">
            الصورة العامة
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}