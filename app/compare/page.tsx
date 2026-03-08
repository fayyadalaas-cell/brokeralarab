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
};

export const metadata: Metadata = {
  title: "مقارنات شركات التداول | بروكر العرب",
  description:
    "قارن بين أشهر شركات التداول من حيث التراخيص، الحسابات، الرسوم، المنصات، والحد الأدنى للإيداع لمعرفة أي وسيط يناسبك.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "مقارنات شركات التداول | بروكر العرب",
    description:
      "صفحة مقارنة احترافية بين شركات التداول لمساعدة المتداول العربي على اتخاذ قرار أوضح.",
    url: "/compare",
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
  return value.replace("JustMarkets Mobile App", "Mobile").trim();
}

function yesNoArabic(value: string | null) {
  const v = (value || "").toLowerCase();
  if (v.includes("yes") || v.includes("متوفر")) return "متوفر";
  if (v.includes("no") || v.includes("غير")) return "غير واضح";
  return value || "غير محدد";
}

export default async function ComparePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("id,name,slug,rating,min_deposit,best_for,regulation,platforms,islamic_account")
    .order("rating", { ascending: false });

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.name && b.slug);

  const comparisons: { a: Broker; b: Broker }[] = [];
  for (let i = 0; i < brokers.length; i++) {
    for (let j = i + 1; j < brokers.length; j++) {
      comparisons.push({ a: brokers[i], b: brokers[j] });
    }
  }

  const featuredComparisons = comparisons.slice(0, 8);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف أقارن بين شركتين تداول؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اختر شركتين من أداة المقارنة في أعلى الصفحة، ثم انتقل مباشرة إلى صفحة المقارنة التي تعرض الفروقات في التراخيص، الحسابات، الرسوم، المنصات، والحد الأدنى للإيداع.",
        },
      },
      {
        "@type": "Question",
        name: "هل صفحات المقارنات مفيدة قبل فتح الحساب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، لأن صفحة المقارنة تختصر الوقت وتوضح الفروقات الحقيقية بين الشركات بدل قراءة كل تقييم بشكل منفصل.",
        },
      },
      {
        "@type": "Question",
        name: "ما أهم العناصر التي يجب مقارنتها بين الوسطاء؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "أهم العناصر تشمل التراخيص، الحد الأدنى للإيداع، أنواع الحسابات، الرسوم، السبريد، المنصات، الحساب الإسلامي، والدعم المناسب للمتداول العربي.",
        },
      },
    ],
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-4 py-1.5 text-xs font-extrabold text-[#1d4ed8]">
              Comparison Hub
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              مقارنات شركات التداول
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              قارن بين أشهر شركات التداول من حيث التراخيص، الحسابات، الرسوم،
              المنصات، والحد الأدنى للإيداع لمعرفة أي وسيط يناسبك قبل فتح الحساب.
            </p>
          </div>

          <div className="mt-10">
            <ComparePicker
              brokers={brokers.map((b) => ({
                name: b.name || "",
                slug: b.slug || "",
              }))}
            />
          </div>
        </div>
      </section>

      {/* QUICK WHY */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-[#1d4ed8]">قرار أسرع</div>
            <h2 className="mt-2 text-2xl font-black">قارن بدل التشتت</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              بدل قراءة صفحتين منفصلتين، تعرض لك صفحة المقارنة الفروقات الحقيقية
              بين الشركتين في مكان واحد.
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-[#1d4ed8]">مفيد للسيو وللزائر</div>
            <h2 className="mt-2 text-2xl font-black">نية بحث واضحة</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              صفحات مثل Exness vs XM أو XS vs Vantage تستهدف زائرًا جاهزًا
              للمقارنة واتخاذ القرار، وهي من أقوى صفحات البحث.
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-[#1d4ed8]">مقارنة عملية</div>
            <h2 className="mt-2 text-2xl font-black">قبل فتح الحساب</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              نركز على العناصر التي تؤثر فعلًا على الاختيار: الإيداع، الحساب
              الإسلامي، التراخيص، المنصات، والخلاصة النهائية.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED COMPARISONS */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-bold text-[#1d4ed8]">أشهر المقارنات</div>
              <h2 className="mt-2 text-3xl font-black">
                المقارنات الأكثر أهمية الآن
              </h2>
            </div>
            <div className="text-sm text-slate-500">
              يتم توليد المقارنات تلقائيًا بناءً على الشركات الموجودة في قاعدة البيانات.
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredComparisons.map((item) => {
              const slug = `${item.a.slug}-vs-${item.b.slug}`;

              return (
                <Link
                  key={slug}
                  href={`/compare/${slug}`}
                  className="group rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:bg-white hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
  <div>
    <div className="text-xs font-bold text-slate-500">
      مقارنة الحسابات والرسوم
    </div>

    <div className="mt-2 flex items-center gap-2">
      <h3 className="text-xl font-black text-[#0f172a]">
        {item.a.name} vs {item.b.name}
      </h3>

    </div>
  </div>
</div>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    مقارنة بين {item.a.name} و {item.b.name} من حيث التراخيص،
                    الحسابات، الرسوم، المنصات، والحد الأدنى للإيداع.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3">
                      <div className="text-slate-500">التقييم</div>
                      <div className="font-black text-[#0f172a]">
                        {item.a.rating?.toFixed(1) ?? "—"}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <div className="text-slate-500">التقييم</div>
                      <div className="font-black text-[#0f172a]">
                        {item.b.rating?.toFixed(1) ?? "—"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-500">الحد الأدنى للإيداع</span>
                    <span className="font-black text-[#0f172a]">
                      {money(item.a.min_deposit)} / {money(item.b.min_deposit)}
                    </span>
                  </div>

                  <div className="mt-5 text-sm font-extrabold text-[#1d4ed8]">
                    افتح المقارنة
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL BROKERS QUICK CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-sm font-bold text-[#1d4ed8]">قبل المقارنة</div>
          <h2 className="mt-2 text-3xl font-black">
            لمحة سريعة عن الشركات الموجودة
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            هذه البطاقات تعطيك نظرة مختصرة على الشركات المتاحة قبل اختيار شركتين
            للمقارنة التفصيلية.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {brokers.map((broker) => (
            <article
              key={broker.id}
              className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-black text-[#0f172a]">
                    {broker.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                    {broker.best_for || "مناسب لفئات متعددة"}
                  </p>
                </div>

                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]">
                  <span className="text-xl font-black">
                    {broker.rating?.toFixed(1) ?? "—"}
                  </span>
                  <span className="text-[10px] font-bold">من 10</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">الحد الأدنى للإيداع</span>
                  <span className="text-sm font-black text-[#0f172a]">
                    {money(broker.min_deposit)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">المنصات</span>
                  <span className="text-sm font-black text-[#0f172a]">
                    {shortPlatforms(broker.platforms)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">التراخيص</span>
                  <span className="text-sm font-black text-[#0f172a]">
                    {shortReg(broker.regulation)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">الحساب الإسلامي</span>
                  <span className="text-sm font-black text-[#0f172a]">
                    {yesNoArabic(broker.islamic_account)}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href={`/brokers/${broker.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                >
                  اقرأ التقييم
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold !text-white transition hover:bg-[#1d4ed8]"
                >
                  قارن الآن
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LONG SEO CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-bold text-[#1d4ed8]">دليل المقارنات</div>
          <h2 className="mt-2 text-3xl font-black">
            لماذا تعتبر صفحات المقارنات مهمة قبل فتح الحساب؟
          </h2>

          <div className="mt-6 space-y-6 text-base leading-9 text-slate-600">
            <p>
              كثير من المتداولين يزورون صفحات التقييم ثم يحتارون بين شركتين أو
              أكثر، وهنا تأتي أهمية صفحات المقارنات. بدل الانتقال بين أكثر من
              صفحة وجمع المعلومات يدويًا، تعرض لك صفحة المقارنة الفروقات في
              مكان واحد بشكل مباشر وسهل.
            </p>

            <p>
              أقوى مقارنات شركات التداول لا تكتفي بعرض الاسم أو التقييم فقط، بل
              توضح الحد الأدنى للإيداع، الحساب الإسلامي، المنصات، التراخيص،
              أنواع الحسابات، الرسوم، والسبريد. هذه العناصر هي التي تؤثر فعلًا
              على قرار المتداول العربي، خصوصًا إذا كان في بداية الطريق أو يبحث
              عن شركة أنسب لطريقة تداوله.
            </p>

            <p>
              صفحة المقارنة الجيدة تساعدك على الوصول إلى قرار أسرع: هل تختار
              شركة بإيداع أقل؟ أم شركة بتراخيص أقوى؟ أم وسيطًا يقدم حسابات
              احترافية أفضل؟ لهذا تم تصميم صفحة المقارنات في بروكر العرب لتكون
              قابلة للتوسع مع زيادة عدد الشركات، بحيث تستطيع لاحقًا مقارنة أي
              شركتين بسهولة حتى لو أصبح عدد الشركات كبيرًا جدًا.
            </p>

            <p>
              ومع استمرار إضافة شركات جديدة إلى الموقع، ستتولد صفحات المقارنات
              تلقائيًا طالما أن الشركة موجودة في قاعدة البيانات ولها اسم وslug
              صحيح. وهذا يجعل قسم المقارنات من أقوى أقسام الموقع للسيو ولرفع
              معدل التفاعل وتحويل الزائر إلى قارئ جاد ثم إلى متخذ قرار.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <div className="text-sm font-bold text-[#1d4ed8]">الأسئلة الشائعة</div>
            <h2 className="mt-2 text-3xl font-black">
              أسئلة حول مقارنات شركات التداول
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "هل صفحة المقارنة تتحدث تلقائيًا عند إضافة شركة جديدة؟",
                a: "نعم، طالما أن الشركة الجديدة موجودة في جدول brokers ولها اسم وslug صحيح، فستظهر في أداة المقارنة ويمكن إنشاء صفحات مقارنة معها تلقائيًا.",
              },
              {
                q: "هل الأفضل عرض كل المقارنات في صفحة واحدة؟",
                a: "عندما يكون عدد الشركات قليلًا يمكن عرض أشهر المقارنات، لكن مع زيادة العدد يصبح الأفضل استخدام أداة اختيار شركتين للمقارنة بدل إغراق الصفحة بمئات الروابط.",
              },
              {
                q: "ما أهم شيء يجب النظر إليه عند المقارنة؟",
                a: "ابدأ بالتراخيص، ثم الحد الأدنى للإيداع، الحساب الإسلامي، المنصات، الرسوم، وملاءمة كل شركة لأسلوب تداولك.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 open:bg-white"
              >
                <summary className="cursor-pointer list-none text-lg font-black text-[#0f172a]">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-8 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}