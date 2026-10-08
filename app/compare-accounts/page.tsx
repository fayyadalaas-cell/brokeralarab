
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AccountComparePicker from "./AccountComparePicker";
import MobileFeaturedBrokers from "./MobileFeaturedBrokers";

export const metadata: Metadata = {
  title: "مقارنة حسابات التداول 2026 | السبريد والعمولات",

  description:
    "قارن حسابات التداول والفوركس لعام 2026 من حيث السبريد والعمولات والحد الأدنى للإيداع. اكتشف الفروقات بين حسابات Standard وRaw Spread وECN واختر الحساب الأنسب لاحتياجاتك.",

  keywords: [
    "مقارنة حسابات التداول",
    "مقارنة حسابات الفوركس",
    "مقارنة حسابات التداول 2026",
    "أنواع حسابات التداول",
    "حسابات Standard",
    "حسابات Raw Spread",
    "حسابات ECN",
    "مقارنة السبريد والعمولات",
    "أفضل حساب تداول",
    "الحد الأدنى للإيداع",
    "الحساب الإسلامي",
  ],

  alternates: {
    canonical: "https://brokeralarab.com/compare-accounts",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "مقارنة حسابات التداول 2026 | السبريد والعمولات",
    description:
      "استخدم أداة بروكر العرب لمقارنة حسابين من الشركة نفسها أو شركتين مختلفتين، واكتشف الفروقات في السبريد والعمولات وشروط التداول.",
    url: "https://brokeralarab.com/compare-accounts",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
  },

  twitter: {
    card: "summary_large_image",
    title: "مقارنة حسابات التداول 2026 | السبريد والعمولات",
    description:
      "قارن حسابات الفوركس من حيث السبريد والعمولات والإيداع وشروط التداول باستخدام أداة بروكر العرب.",
  },
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  account_name_ar: string | null;
  sort_order: number | null;
  account_type: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
};

function accountSlug(value: string | null) {
  if (!value) return "";

  return value
    .toLowerCase()
    .trim()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

const faq = [
  {
    q: "كيف أقارن بين حسابين للتداول؟",
    a: "اختر شركة التداول الأولى ثم نوع الحساب المتوفر لديها، وكرر الخطوات للحساب الثاني. تساعدك المقارنة على مراجعة الفروقات في السبريد والعمولات والإيداع وشروط الحساب.",
  },
  {
    q: "ما الفرق بين حساب Standard وحساب Raw Spread؟",
    a: "حساب Standard غالباً ما يدمج جزءاً أكبر من تكلفة التداول داخل السبريد، بينما يقدم Raw Spread عادة سبريداً أقل مع عمولة منفصلة. تختلف الشروط الفعلية بحسب الشركة والأداة المالية.",
  },
  {
    q: "هل الحساب صاحب السبريد الأقل هو الأفضل؟",
    a: "ليس بالضرورة. يجب حساب العمولة مع السبريد ومراجعة التنفيذ والمنصات وشروط التداول. فقد يكون الحساب الأقل سبريداً أعلى تكلفة في بعض الحالات.",
  },
  {
    q: "هل يمكن مقارنة حسابين من الشركة نفسها؟",
    a: "نعم. يمكنك اختيار الشركة نفسها في الجانبين ثم اختيار نوعين مختلفين من حساباتها لمعرفة الفروقات بينهما.",
  },
  {
    q: "هل الحسابات الإسلامية متاحة لدى جميع الوسطاء؟",
    a: "لا. تختلف إتاحة الحساب الإسلامي وشروطه حسب الشركة ونوع الحساب والبلد والجهة التنظيمية. يجب التحقق من الشروط الرسمية قبل التسجيل.",
  },
  {
    q: "ما الفرق بين مقارنة الشركات ومقارنة الحسابات؟",
    a: "مقارنة الشركات تركز على الوسيط ككل، مثل التراخيص والمنصات والتقييم. أما مقارنة الحسابات فتركز على شروط حسابين محددين مثل السبريد والعمولات والإيداع.",
  },
];

const guides = [
  {
    number: "01",
    title: "ابدأ بالسبريد والعمولة معاً",
    description:
      "السبريد المنخفض لا يعني تلقائياً أن الحساب أقل تكلفة. قارن السبريد مع العمولة المطبقة على حجم تداولك والأداة التي تتداولها.",
  },
  {
    number: "02",
    title: "راجع الحد الأدنى للإيداع",
    description:
      "تأكد أن متطلبات فتح الحساب تناسب ميزانيتك، ولا تخلط بين الحد الأدنى للإيداع والمبلغ المناسب لإدارة المخاطر.",
  },
  {
    number: "03",
    title: "اختر الحساب المناسب لأسلوبك",
    description:
      "قد تختلف احتياجات المتداول المبتدئ عن متداول السكالبينج أو المتداول الذي يحتفظ بالصفقات لفترات أطول.",
  },
  {
    number: "04",
    title: "تحقق من شروط الحساب الإسلامي",
    description:
      "بعض الحسابات تتطلب طلباً منفصلاً أو تخضع لشروط إضافية. تحقق من التفاصيل لدى الشركة قبل فتح الحساب.",
  },
];

export default async function CompareAccountsPage() {
  const supabase = await createClient();

  const { data: brokerData, error: brokerError } = await supabase
    .from("brokers")
    .select("id,name,slug,logo,rating")
    .eq("publication_status", "published")
    .order("rating", { ascending: false });

  const { data: accountData, error: accountError } = await supabase
    .from("broker_accounts")
    .select(
      "id,broker_id,account_name,account_name_ar,sort_order,account_type,spread,commission,min_deposit"
    )
    .order("sort_order", { ascending: true });

  if (brokerError) {
    console.error("Compare accounts brokers error:", brokerError.message);
  }

  if (accountError) {
    console.error("Compare accounts data error:", accountError.message);
  }

  const brokers = ((brokerData ?? []) as Broker[]).filter(
    (broker) =>
      Boolean(broker.name && broker.slug) &&
      broker.slug?.toLowerCase() !== "naga"
  );

  const allowedIds = new Set(brokers.map((broker) => broker.id));

  const accounts = ((accountData ?? []) as BrokerAccount[]).filter(
    (account) =>
      allowedIds.has(account.broker_id) &&
      Boolean(account.account_name?.trim())
  );

  const activeBrokerIds = new Set(
    accounts.map((account) => account.broker_id)
  );

  const availableBrokers = brokers.filter((broker) =>
    activeBrokerIds.has(broker.id)
  );

  const featured = availableBrokers.slice(0, 9);

  const comparisonAccounts = availableBrokers.flatMap((broker) =>
  accounts
    .filter((account) => account.broker_id === broker.id)
    .map((account) => ({
      broker,
      account,
      key: `${broker.slug}-${accountSlug(account.account_name)}`,
    }))
    .filter((item) => accountSlug(item.account.account_name))
);

const comparisonKeyCounts = new Map<string, number>();

comparisonAccounts.forEach((item) => {
  comparisonKeyCounts.set(
    item.key,
    (comparisonKeyCounts.get(item.key) ?? 0) + 1
  );
});

const uniqueComparisonAccounts = comparisonAccounts.filter(
  (item) =>
    comparisonKeyCounts.get(item.key) === 1 &&
    !item.key.includes("-vs-")
);

const popularComparisons: {
  first: (typeof uniqueComparisonAccounts)[number];
  second: (typeof uniqueComparisonAccounts)[number];
  slug: string;
}[] = [];

const usedPairs = new Set<string>();

for (let offset = 1; offset < availableBrokers.length; offset++) {
  for (let i = 0; i < availableBrokers.length; i++) {
    const firstBroker = availableBrokers[i];
    const secondBroker =
      availableBrokers[(i + offset) % availableBrokers.length];

    if (firstBroker.id === secondBroker.id) continue;

    const first = uniqueComparisonAccounts.find(
      (item) => item.broker.id === firstBroker.id
    );

    const second = uniqueComparisonAccounts.find(
      (item) => item.broker.id === secondBroker.id
    );

    if (!first || !second) continue;

    const sorted = [first, second].sort((a, b) =>
      a.key.localeCompare(b.key, "en")
    );

    const slug = `${sorted[0].key}-vs-${sorted[1].key}`;

    if (usedPairs.has(slug)) continue;

    usedPairs.add(slug);

    popularComparisons.push({
      first: sorted[0],
      second: sorted[1],
      slug,
    });

    if (popularComparisons.length >= 12) break;
  }

  if (popularComparisons.length >= 12) break;
}

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://brokeralarab.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "مقارنة حسابات التداول",
        item: "https://brokeralarab.com/compare-accounts",
      },
    ],
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f3f6fb] text-[#0f172a]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, breadcrumbSchema]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      
{/* HERO */}
<section className="relative overflow-hidden border-b border-brand-100 bg-[#eaf3ff]">
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-bl from-[#f5f9ff] via-[#e8f2ff] to-[#cfe3ff]" />
    <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/70 blur-3xl" />
    <div className="absolute -bottom-36 -left-20 h-96 w-96 rounded-full bg-blue-300/25 blur-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,91,184,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,91,184,0.025)_1px,transparent_1px)] bg-[size:46px_46px]" />
  </div>

  {/* MOBILE HERO */}
  <div className="relative mx-auto max-w-[1520px] px-4 pb-6 pt-4 sm:hidden">
    <nav
      aria-label="مسار التنقل"
      className="flex items-center gap-2 text-[10px] font-semibold text-slate-500"
    >
      <Link href="/" className="hover:text-[#1E5BB8]">
        الرئيسية
      </Link>
      <span>/</span>
      <span className="text-[#1E5BB8]">مقارنة حسابات التداول</span>
    </nav>

    <div className="mt-5 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold text-[#1E5BB8] shadow-sm">
        <span className="text-emerald-600">✓</span>
        أداة مقارنة حسابات الفوركس
      </div>

      <h1 className="mx-auto mt-4 max-w-[350px] text-[27px] font-black leading-[1.35] tracking-tight text-slate-950">
        مقارنة حسابات التداول
        <span className="mt-1 block text-[#1E5BB8]">
          اختر حسابك بثقة
        </span>
      </h1>

      <p className="mx-auto mt-3 max-w-[340px] text-[12px] font-medium leading-[1.9] text-slate-600">
        قارن حسابين من نفس الشركة أو من شركتين مختلفتين،
        واكتشف الفروقات في السبريد والعمولات والإيداع.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-700">
        <span className="inline-flex items-center gap-1">
          <span className="text-emerald-600">✓</span>
          السبريد والعمولات
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="text-emerald-600">✓</span>
          أنواع الحسابات
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="text-emerald-600">✓</span>
          شروط الإيداع
        </span>
      </div>

      <a
        href="#compare-tool"
        className="mt-5 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#1E5BB8] px-5 py-3 text-[13px] font-black text-white shadow-[0_8px_20px_rgba(30,91,184,0.18)] transition hover:bg-[#174a98]"
      >
        ابدأ مقارنة الحسابات
        <span aria-hidden="true">↓</span>
      </a>

      <a
        href="#account-guide"
        className="mt-3 inline-flex items-center justify-center text-[11px] font-bold text-[#1E5BB8] underline-offset-4 hover:underline"
      >
        دليل اختيار حساب التداول ←
      </a>

      <p className="mx-auto mt-4 max-w-[340px] text-[9px] leading-5 text-slate-500">
        تختلف شروط الحسابات حسب البلد والكيان القانوني.
        تحقق من الموقع الرسمي للشركة قبل اتخاذ القرار.
      </p>
    </div>
  </div>

  {/* DESKTOP AND TABLET HERO - ORIGINAL DESIGN */}
  <div className="relative mx-auto hidden max-w-[1520px] px-4 py-8 sm:block sm:px-6 sm:py-12 lg:px-8">
    <nav
      aria-label="مسار التنقل"
      className="mb-7 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"
    >
      <Link href="/" className="hover:text-brand-600">
        الرئيسية
      </Link>
      <span>/</span>
      <span className="text-brand-700">مقارنة حسابات التداول</span>
    </nav>

    <div className="mx-auto max-w-[1100px] text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2 text-[11px] font-extrabold text-brand-700 shadow-sm sm:text-xs">
        <span className="text-emerald-600">✓</span>
        أداة مقارنة حسابات الفوركس
      </div>

      <h1 className="mt-5 text-[32px] font-black leading-[1.25] tracking-tight text-slate-950 sm:text-[46px] lg:text-[58px]">
        مقارنة حسابات التداول
        <span className="mt-1 block text-[#1E5BB8]">
          اكتشف الفروقات قبل فتح حسابك
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-[900px] text-[14px] font-medium leading-8 text-slate-600 sm:text-[17px] sm:leading-9">
        هل تختار حساب Standard أم Raw Spread؟ وهل حساب التداول
        لدى شركة معينة أفضل لاحتياجاتك من حساب لدى شركة أخرى؟
        استخدم أداة بروكر العرب لمقارنة أنواع حسابات التداول
        من حيث السبريد والعمولات والحد الأدنى للإيداع
        وشروط الحسابات.
      </p>

      <div className="mx-auto mt-6 grid max-w-[950px] grid-cols-1 gap-2.5 sm:grid-cols-3">
        {[
          "مقارنة السبريد والعمولات",
          "حسابات شركات متعددة",
          "اختيار حسب احتياجاتك",
        ].map((item) => (
          <div
            key={item}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white bg-white/90 px-3 py-2.5 text-[12px] font-extrabold text-slate-700 shadow-sm sm:text-[13px]"
          >
            <span className="text-emerald-600">✓</span>
            {item}
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="#compare-tool"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#1E5BB8] px-7 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#174a98]"
        >
          ابدأ مقارنة الحسابات ↓
        </a>
        <a
          href="#account-guide"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white bg-white px-7 py-3 text-sm font-extrabold text-slate-800 transition hover:text-brand-600"
        >
          دليل اختيار حساب التداول
        </a>
      </div>

      <p className="mx-auto mt-4 max-w-3xl text-[11px] leading-6 text-slate-500">
        تختلف شروط الحسابات حسب الكيان القانوني وبلد الإقامة
        والأداة المالية. راجع الموقع الرسمي للشركة قبل اتخاذ القرار.
      </p>
    </div>
  </div>
</section>


      
      {/* COMPARISON PICKER */}
      <section
        id="compare-tool"
        className="mx-auto max-w-[1520px] scroll-mt-24 px-3 pb-10 pt-6 sm:px-6 lg:px-8"
      >
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:rounded-[30px]">

          {/* Header */}
          <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#ffffff_0%,#f1f7ff_100%)] px-5 py-7 text-center sm:px-8 sm:py-9">
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-[11px] font-extrabold text-[#1E5BB8] shadow-sm">
              محرك مقارنة حسابات التداول
            </span>

            <h2 className="mt-4 text-[25px] font-black leading-tight text-slate-950 sm:text-[36px]">
              اختر حسابين واكتشف الفروقات
            </h2>

            <p className="mx-auto mt-3 max-w-[760px] text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
              اختر شركة التداول أولاً، ثم حدد نوع الحساب المتاح لديها.
              قارن حسابين من الشركة نفسها أو من شركتين مختلفتين
              لمعرفة الفروقات في شروط التداول والتكاليف.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {[
                "السبريد",
                "العمولات",
                "الحد الأدنى للإيداع",
                "نوع الحساب",
                "الحساب الإسلامي",
                "شروط التداول",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Main comparison area */}
          <div className="bg-[linear-gradient(135deg,#0f172a_0%,#172554_100%)] px-3 py-7 sm:px-6 sm:py-10 lg:px-10">

            <div className="mx-auto max-w-[1050px]">
              <div className="mb-6 text-center">
                <h3 className="text-[21px] font-black text-white sm:text-[27px]">
                  قارن حسابات التداول الآن
                </h3>

                <p className="mt-2 text-[12px] leading-7 text-blue-100/90 sm:text-sm">
                  حدد الشركة والحساب في كل جانب، ثم اضغط على زر المقارنة.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white p-3 shadow-[0_18px_45px_rgba(0,0,0,0.15)] sm:p-5">
                <AccountComparePicker
                  brokers={availableBrokers}
                  accounts={accounts}
                />
              </div>

              <p className="mt-5 text-center text-[11px] leading-6 text-blue-100/80 sm:text-xs">
                يمكنك مقارنة حسابين مختلفين من الشركة نفسها أو من شركتين مختلفتين.
                تختلف شروط الحسابات حسب بلد الإقامة والكيان القانوني للوسيط.
              </p>
            </div>
          </div>

          {/* Bottom informational strip */}
          <div className="hidden bg-white sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              {
                number: "01",
                title: "اختر الشركة",
                description: "استعرض حسابات الوسيط المتاحة.",
              },
              {
                number: "02",
                title: "حدد نوع الحساب",
                description: "اختر الحساب المناسب للمقارنة.",
              },
              {
                number: "03",
                title: "اكتشف الفروقات",
                description: "راجع تفاصيل الحسابين جنباً إلى جنب.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="flex items-center justify-center gap-3 px-5 py-5 sm:py-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-sm font-black text-[#1E5BB8]">
                  {step.number}
                </span>

                <div>
                  <h4 className="text-[13px] font-black text-slate-900">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* AVAILABLE BROKERS */}
      <section className="mx-auto max-w-[1520px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="text-xs font-extrabold text-brand-600">
            حسابات التداول المتاحة
          </div>
          <h2 className="mt-2 text-[24px] font-black text-slate-900 sm:text-[34px]">
            استكشف حسابات شركات التداول
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-8 text-slate-600">
            تختلف أنواع حسابات الفوركس من وسيط إلى آخر. استعرض
            الحسابات المتاحة لكل شركة، واقرأ تفاصيل الحساب الفردي
            قبل اختيار الحسابين اللذين تريد مقارنتهما.
          </p>

          {/* MOBILE ONLY */}
<div className="mt-6 sm:hidden">
  <MobileFeaturedBrokers
    brokers={availableBrokers}
    accounts={accounts}
  />
</div>

{/* DESKTOP AND TABLET - ORIGINAL DESIGN */}
<div className="mt-7 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((broker) => {
              const brokerAccounts = accounts.filter(
                (account) => account.broker_id === broker.id
              );

              
                
return (
  <article
    key={broker.id}
    className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[0_8px_25px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_35px_rgba(30,91,184,0.10)] sm:p-6"
  >
    {/* Broker identity */}
    <div className="flex items-center gap-4">
      <div className="flex h-[90px] w-[110px] shrink-0 items-center justify-center rounded-[20px] border border-slate-100 bg-white p-3 shadow-sm sm:h-[105px] sm:w-[130px]">
        {broker.logo ? (
          <img
            src={broker.logo}
            alt={`شعار ${broker.name}`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-lg font-black text-brand-600">
            {broker.name}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[19px] font-black text-slate-900 sm:text-[21px]">
          {broker.name}
        </h3>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-brand-700">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          {brokerAccounts.length} حسابات تداول
        </div>

        <Link
          href={`/brokers/${broker.slug}`}
          className="mt-3 block text-xs font-bold text-slate-500 transition hover:text-brand-600"
        >
          عرض تقييم الشركة ←
        </Link>
      </div>
    </div>

    <div className="my-5 h-px bg-slate-100" />

    {/* Account names */}
    <div className="flex-1">
      <h4 className="mb-3 text-sm font-black text-slate-800">
        حسابات التداول المتوفرة
      </h4>

      
<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
  {brokerAccounts.map((account) => {
    const slug = accountSlug(account.account_name);

    if (!slug || !broker.slug) return null;

    return (
      <Link
        key={account.id}
        href={`/brokers/${broker.slug}/accounts/${slug}`}
        title={`تفاصيل حساب ${account.account_name_ar || account.account_name} من ${broker.name}`}
        className="flex min-h-[45px] items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-[12px] font-bold leading-5 text-slate-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E5BB8] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        {account.account_name_ar || account.account_name}
      </Link>
    );
  })}
</div>

    </div>

    {/* Action */}
    <a
      href="#compare-tool"
      className="mt-6 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#1E5BB8] px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(30,91,184,0.16)] transition hover:bg-[#174a98]"
    >
      اختر حساباً للمقارنة
      <span aria-hidden="true">←</span>
    </a>
  </article>
);

            })}
          </div>
        </div>
      </section>


{/* POPULAR ACCOUNT COMPARISONS */}
<section className="mx-auto max-w-[1520px] px-4 pb-10 sm:px-6 lg:px-8">
  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
    <div className="text-xs font-extrabold text-brand-600">
      مقارنات حسابات التداول
    </div>

    <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-[24px] font-black text-slate-900 sm:text-[34px]">
        استكشف مقارنات حسابات التداول
      </h2>

      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-extrabold text-brand-600">
  <span className="sm:hidden">6 مقارنات مختارة</span>
  <span className="hidden sm:inline">12 مقارنة مختارة</span>
</span>
    </div>

    <p className="mt-3 max-w-4xl text-sm leading-8 text-slate-600">
      استعرض مقارنات مباشرة بين حسابات شركات التداول المختلفة،
      واكتشف الفروقات في السبريد والعمولات والحد الأدنى للإيداع
      وشروط الحسابات قبل اتخاذ قرارك.
    </p>

    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {popularComparisons.map(({ first, second, slug }, index) => (
  <Link
    key={slug}
          href={`/compare-accounts/${slug}`}
          className={`${index >= 6 ? "hidden sm:flex" : "flex"} group min-h-[90px] flex-col justify-center rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm`}
        >
          <div className="flex items-center justify-center gap-2 text-center">
            <span className="min-w-0 flex-1 text-[12px] font-black leading-6 text-slate-800 group-hover:text-brand-600">
              {first.broker.name}
              <span className="mt-1 block text-[11px] font-semibold text-slate-500">
                {first.account.account_name_ar ||
                  first.account.account_name}
              </span>
            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-[10px] font-black text-brand-600">
              VS
            </span>

            <span className="min-w-0 flex-1 text-[12px] font-black leading-6 text-slate-800 group-hover:text-brand-600">
              {second.broker.name}
              <span className="mt-1 block text-[11px] font-semibold text-slate-500">
                {second.account.account_name_ar ||
                  second.account.account_name}
              </span>
            </span>
          </div>

          <div className="mt-3 border-t border-slate-200 pt-2 text-center text-[11px] font-extrabold text-brand-600">
            عرض مقارنة الحسابين ←
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>


      {/* SEO GUIDE */}
      <section
        id="account-guide"
        className="mx-auto max-w-[1520px] scroll-mt-24 px-4 pb-10 sm:px-6 lg:px-8"
      >
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="text-xs font-extrabold text-brand-600">
            دليل بروكر العرب
          </div>

          <h2 className="mt-2 text-[25px] font-black leading-tight text-slate-900 sm:text-[36px]">
            كيف تختار أفضل حساب تداول لاحتياجاتك؟
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
            عند مقارنة حسابات التداول، من المهم النظر إلى التكلفة
            الكاملة للصفقة وليس إلى السبريد وحده. تختلف الحسابات
            في العمولة، ومتطلبات الإيداع، وطريقة تنفيذ الأوامر،
            والمنصات المتاحة، وشروط الحساب الإسلامي. وقد يكون
            الحساب المناسب لمتداول نشط مختلفاً عن الحساب المناسب
            لشخص يبدأ التداول للمرة الأولى.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {guides.map((guide) => (
              
<article
  key={guide.number}
  className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5"
>
  <div className="flex items-center gap-3">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f1ff] text-[13px] font-black text-[#1E5BB8]">
      {guide.number}
    </span>

    <h3 className="text-[16px] font-black leading-7 text-slate-900 sm:text-[18px]">
      {guide.title}
    </h3>
  </div>

  <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8">
    {guide.description}
  </p>
</article>

            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[22px] border border-brand-100 bg-[#eff6ff] p-5 sm:p-6">
              <h3 className="text-xl font-black text-slate-900">
                حساب Standard مقابل Raw Spread
              </h3>
              <p className="mt-3 text-sm leading-8 text-slate-700">
                الحساب القياسي Standard قد يكون أبسط من حيث
                هيكل الرسوم، حيث تكون تكلفة الوسيط مدمجة في
                السبريد في كثير من الحالات. أما حساب Raw Spread
                فيعرض عادة سبريداً أقل، لكنه قد يفرض عمولة منفصلة
                على التداول. للمقارنة الدقيقة، تحقق من تكلفة
                الصفقة الكاملة وشروط كل أداة مالية.
              </p>
            </article>

            <article className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <h3 className="text-xl font-black text-slate-900">
                حساب ECN مقابل حساب التداول القياسي
              </h3>
              <p className="mt-3 text-sm leading-8 text-slate-700">
                تستخدم بعض شركات التداول مصطلح ECN لوصف
                حسابات ذات فروقات سعرية متغيرة وعمولات منفصلة.
                لكن التسمية وحدها لا تثبت نموذج التنفيذ الفعلي.
                لذلك يجب مراجعة سياسة التنفيذ والرسوم وشروط
                الحساب بدلاً من الاعتماد على الاسم التجاري فقط.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="mx-auto max-w-[1520px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/compare",
              title: "مقارنة شركات التداول",
              description:
                "قارن شركتين من حيث التراخيص والتقييم والمنصات والخدمات.",
            },
            {
              href: "/brokers",
              title: "تقييم شركات التداول",
              description:
                "اقرأ المراجعات الكاملة للشركات قبل اختيار حساب التداول.",
            },
            {
              href: "/lowest-spread-brokers",
              title: "شركات التداول الأقل سبريداً",
              description:
                "تعرف على أهمية فروقات الأسعار عند اختيار وسيط التداول.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <h3 className="text-[17px] font-black text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
              <div className="mt-4 text-sm font-extrabold text-brand-600">
                تصفح الصفحة ←
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1520px] px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="text-xs font-extrabold text-brand-600">
            الأسئلة الشائعة
          </div>
          <h2 className="mt-2 text-[25px] font-black text-slate-900 sm:text-[34px]">
            أسئلة حول مقارنة حسابات التداول
          </h2>

          <div className="mt-6 space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 open:bg-white sm:p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-black leading-7 text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-xl text-brand-600 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-8 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-6 text-xs leading-7 text-slate-500">
            المعلومات للمقارنة والتعليم وليست توصية استثمارية.
            قد تختلف شروط الحسابات وتتغير دون إشعار، ويجب
            مراجعة المستندات الرسمية للوسيط.
          </p>
        </div>
      </section>
    </main>
  );
}
