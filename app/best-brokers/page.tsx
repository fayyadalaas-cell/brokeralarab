import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "أفضل شركات التداول 2026 | دليل اختيار أفضل وسيط تداول",
  description:
    "اكتشف أفضل شركات التداول الموثوقة لعام 2026 مع مراجعات عربية ومقارنة التراخيص والمنصات والحسابات والإيداع. دليل شامل لاختيار أفضل وسيط تداول.",
  keywords: [
    "أفضل شركات التداول",
    "أفضل شركات الفوركس",
    "أفضل وسيط تداول",
    "أفضل شركات التداول 2026",
    "شركات تداول موثوقة",
    "مقارنة شركات التداول",
    "أفضل شركات التداول في السعودية",
    "أفضل شركات التداول في الإمارات",
    "بروكر العرب",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/best-brokers",
  },
  openGraph: {
    title: "أفضل شركات التداول 2026 | بروكر العرب",
    description:
      "دليل شامل لاختيار أفضل شركات التداول الموثوقة مع صفحات مخصصة للدول العربية ومقارنات بين الوسطاء.",
    url: "https://brokeralarab.com/best-brokers",
    siteName: "بروكر العرب",
    type: "website",
  },
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  logo: string | null;
  real_account_url: string | null;
};

const countries = [
  {
    name: "السعودية",
    href: "/best-brokers/saudi-arabia",
    desc: "أفضل شركات التداول المناسبة للمتداولين في السعودية مع التركيز على الحساب الإسلامي وسهولة الإيداع.",
  },
  {
    name: "الإمارات",
    href: "/best-brokers/uae",
    desc: "مقارنة بين أفضل شركات التداول في الإمارات من حيث المنصات والرسوم وسهولة فتح الحساب.",
  },
  {
    name: "الكويت",
    href: "/best-brokers/kuwait",
    desc: "اختيار أفضل شركات التداول في الكويت بناءً على سهولة البدء، المنصات، وتقييمات الوسطاء.",
  },
  {
    name: "قطر",
    href: "/best-brokers/qatar",
    desc: "دليل مخصص يساعد المستخدم في قطر على اختيار أفضل شركة تداول بطريقة أوضح وأكثر أمانًا.",
  },
  {
    name: "مصر",
    href: "/best-brokers/egypt",
    desc: "صفحة مخصصة لأفضل شركات التداول في مصر مع التركيز على الإيداع المنخفض وسهولة الاستخدام.",
  },
  {
    name: "البحرين",
    href: "/best-brokers/bahrain",
    desc: "أفضل الوسطاء المناسبين للمتداولين في البحرين مع عرض الصفحات التقييمية وروابط المقارنة.",
  },
  {
    name: "الأردن",
    href: "/best-brokers/jordan",
    desc: "مقارنة مخصصة لأفضل شركات التداول في الأردن مع أبرز الوسطاء الأكثر شهرة بين المستخدمين.",
  },
  {
    name: "عمان",
    href: "/best-brokers/oman",
    desc: "أفضل شركات التداول في عمان مع شرح المعايير الأساسية التي تساعدك على اختيار الوسيط المناسب.",
  },
];

function formatRating(rating: number | null) {
  if (rating === null || rating === undefined) return "—";
  return Number(rating).toFixed(1);
}

function formatDeposit(value: number | null) {
  if (value === null || value === undefined) return "غير محدد";
  return `$${Number(value).toLocaleString()}`;
}

function hasRealAccountLink(url: string | null | undefined) {
  return !!url && url.trim().length > 0;
}

export default async function BestBrokersPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("id,name,slug,rating,min_deposit,logo,real_account_url")
    .order("rating", { ascending: false })
    .limit(3);

  const topBrokers = ((data ?? []) as Broker[]).filter(
    (broker) => broker.slug && broker.name
  );

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-700">
              دليل شامل لاختيار أفضل الوسطاء
            </span>

            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              أفضل شركات التداول في العالم 2026
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              هذه الصفحة الرئيسية تجمع لك أهم صفحات أفضل شركات التداول، سواء على
              مستوى المقارنة العامة بين الوسطاء أو على مستوى الدول العربية مثل
              السعودية، الإمارات، الكويت، قطر، مصر، البحرين، الأردن، وعمان.
              الهدف منها هو تسهيل الوصول إلى الصفحة الأنسب لك حسب بلدك واحتياجك
              وطريقة اختيارك للوسيط.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/brokers"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                عرض جدول الوسطاء
              </Link>

              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
              >
                تصفح المقارنات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TOP 3 BROKERS */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-8 text-center">
          <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-700">
            اختيارات مميزة
          </div>

          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 md:text-3xl">
            أفضل 3 شركات تداول موصى بها حاليًا
          </h2>

          <p className="mt-3 text-base leading-8 text-slate-600">
            مجموعة مختارة من أعلى الشركات تقييمًا حاليًا مع روابط مباشرة لعرض
            التقييم أو فتح حساب حقيقي عند توفر الرابط.
          </p>
        </div>

        {topBrokers.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {topBrokers.map((broker, index) => {
              const realLink = hasRealAccountLink(broker.real_account_url);

              return (
                <article
                  key={broker.id}
                  className={`relative overflow-hidden rounded-[30px] border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    index === 0
                      ? "border-blue-300 ring-1 ring-blue-100"
                      : "border-slate-200"
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-extrabold text-white">
                      الأفضل حاليًا
                    </div>
                  )}

                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="pt-8">
                      <div className="text-xs font-bold text-slate-500">
                        الترتيب #{index + 1}
                      </div>
                      <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                        {broker.name}
                      </h3>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      {broker.logo ? (
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                          <img
                            src={broker.logo}
                            alt={broker.name ?? "Broker"}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                      ) : null}

                      <div className="rounded-2xl bg-blue-600 px-4 py-3 text-center text-white shadow-sm">
                        <div className="text-xs font-bold text-blue-100">
                          التقييم
                        </div>
                        <div className="text-xl font-extrabold">
                          {formatRating(broker.rating)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="text-xs font-bold text-slate-500">
                        الحد الأدنى للإيداع
                      </div>
                      <div className="mt-1 text-lg font-extrabold text-slate-900">
                        {formatDeposit(broker.min_deposit)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
                        className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                      >
                        فتح حساب حقيقي
                      </a>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-500">
                        فتح حساب قريبًا
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">
              سيتم عرض أفضل الشركات هنا قريبًا
            </h3>
            <p className="mt-3 leading-8 text-slate-600">
              عند إضافة الشركات والتقييمات وروابط فتح الحساب من قاعدة البيانات،
              سيظهر هذا القسم تلقائيًا.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            أفضل شركات التداول حسب الدولة
          </h2>
          <p className="mt-3 text-base leading-8 text-slate-600">
            اختر الصفحة المناسبة لك حسب الدولة للوصول إلى مقارنة أكثر تخصيصًا.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {countries.map((country) => (
            <article
              key={country.href}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-2xl font-extrabold leading-10 text-slate-900">
                أفضل شركات التداول في {country.name}
              </h3>

              <p className="mt-4 text-sm leading-8 text-slate-600">
                {country.desc}
              </p>

              <div className="mt-6">
                <Link
                  href={country.href}
                  className="inline-flex items-center justify-center rounded-2xl text-sm font-bold text-blue-700 transition hover:text-blue-800"
                >
                  افتح الصفحة
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
  <div className="relative overflow-hidden rounded-[32px] border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-lg">

    <div className="max-w-3xl">
      <h2 className="text-2xl font-extrabold md:text-3xl">
        قارن بين أفضل شركات التداول بسهولة
      </h2>

      <p className="mt-4 text-sm leading-8 text-blue-100 md:text-base">
        استخدم جدول الوسطاء الكامل لمقارنة التراخيص، المنصات، الحد الأدنى
        للإيداع، والتقييمات بين أشهر شركات التداول قبل اتخاذ قرار فتح الحساب.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/brokers"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-slate-100"
        >
          عرض جدول الوسطاء
        </Link>

        <Link
          href="/compare"
          className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          تصفح المقارنات
        </Link>
      </div>
    </div>

  </div>
</section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
  <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">

    <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
      كيف تختار أفضل شركة فوركس؟
    </h2>

    <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
      اختيار شركة فوركس موثوقة يعتبر من أهم الخطوات قبل البدء في التداول.
      هناك عدة عوامل يجب التأكد منها مثل الترخيص، المنصات، الرسوم، وسهولة
      السحب والإيداع. في بروكر العرب نقوم بمراجعة شركات الفوركس ومقارنتها
      لمساعدتك على اختيار الوسيط الأنسب لك قبل فتح حساب حقيقي.
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-4">

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="text-sm font-bold text-slate-500">
          الترخيص والتنظيم
        </div>
        <div className="mt-2 text-lg font-extrabold text-slate-900">
          تأكد من وجود ترخيص قوي
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          مثل FCA أو CySEC أو ASIC، لأن الشركات المرخصة توفر مستوى أعلى
          من الأمان وحماية أموال المتداولين.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="text-sm font-bold text-slate-500">
          منصات التداول
        </div>
        <div className="mt-2 text-lg font-extrabold text-slate-900">
          MT4 أو MT5
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          يفضل اختيار وسيط يوفر منصات تداول احترافية مثل MetaTrader 4 أو
          MetaTrader 5 لأنها الأكثر استخدامًا بين المتداولين.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="text-sm font-bold text-slate-500">
          الرسوم والسبريد
        </div>
        <div className="mt-2 text-lg font-extrabold text-slate-900">
          سبريد منخفض
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          الشركات ذات السبريد المنخفض تساعد على تقليل تكلفة التداول
          خصوصًا للمتداولين النشطين.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="text-sm font-bold text-slate-500">
          الإيداع والسحب
        </div>
        <div className="mt-2 text-lg font-extrabold text-slate-900">
          طرق دفع سهلة
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          اختر وسيطًا يوفر طرق إيداع وسحب سريعة مثل البطاقات البنكية
          أو المحافظ الإلكترونية.
        </p>
      </div>

    </div>

    <div className="mt-10 flex flex-wrap gap-3">

      <Link
        href="/brokers"
        className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        عرض أفضل شركات الفوركس
      </Link>

      <Link
        href="/compare"
        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
      >
        قارن بين شركات الفوركس
      </Link>

    </div>

  </div>
</section>
    </main>
  );
}