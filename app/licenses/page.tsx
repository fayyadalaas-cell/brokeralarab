import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

const PAGE_URL = "https://brokeralarab.com/licenses";
const PAGE_TITLE = "دليل تراخيص شركات التداول والوسطاء الماليين";
const PAGE_DESCRIPTION =
  "تحقق من تراخيص شركات التداول حسب اسم الشركة، الجهة الرقابية، الدولة أو رقم الترخيص، مع روابط التحقق الرسمية وشرح شامل لكيفية قراءة تراخيص الوسطاء.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Broker Al Arab",
    locale: "ar_AR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

type PageSearchParams = {
  q?: string;
  regulator?: string;
  country?: string;
  all?: string;
};

type License = {
  id: number;
  broker_id: number;
  regulator_code: string;
  regulator_name_ar: string;
  regulator_name_en?: string | null;
  country_ar: string;
  country_en?: string | null;
  country_code: string;
  license_number: string | null;
  entity_name_ar?: string | null;
  entity_name_en?: string | null;
  status_code: string;
  verification_url_ar?: string | null;
  verification_url_en?: string | null;
  trust_level?: string | null;
  regulator_description_ar?: string | null;
  last_verified?: string | null;
  is_active: boolean;
};

type Broker = {
  id: number;
  name: string;
  name_en?: string | null;
  slug: string | null;
  logo: string | null;
  rating?: number | null;
  regulation?: string | null;
  regulation_short?: string | null;
};

async function getData() {
  const supabase = await createClient();

  const { data: licensesData } = await supabase
    .from("broker_licenses")
    .select("*")
    .eq("is_active", true)
    .order("regulator_code", { ascending: true });

  const { data: brokersData } = await supabase
    .from("brokers")
    .select("id,name,name_en,slug,logo,rating,regulation,regulation_short");

  return {
    licenses: (licensesData || []) as License[],
    brokers: (brokersData || []) as Broker[],
  };
}

function BrokerLogo({ broker }: { broker?: Broker }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-brand-100 bg-white shadow-[0_4px_14px_rgba(59,130,246,0.08)]">
      {broker?.logo ? (
        <Image
          src={broker.logo}
          alt={broker.name}
          width={44}
          height={44}
          className="h-9 w-9 object-contain"
        />
      ) : (
        <span className="text-xs font-black text-slate-500">
          {broker?.name?.slice(0, 2) || "BA"}
        </span>
      )}
    </div>
  );
}

function cleanText(value?: string | null) {
  return (value || "").trim().toLowerCase();
}

function statusText(status?: string) {
  if (status === "active") return "نشط";
  if (status === "inactive") return "غير نشط";
  return "غير محدد";
}

function formatVerifiedDate(value?: string | null) {
  if (!value) return "غير محدد";

  try {
    return new Intl.DateTimeFormat("ar", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default async function LicensesPage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  const params = (await searchParams) || {};
  const { licenses, brokers } = await getData();

  const qRaw = params.q?.trim() || "";
  const q = qRaw.toLowerCase();
  const selectedRegulator = params.regulator?.trim() || "";
  const selectedCountry = params.country?.trim() || "";
  const showAll = params.all === "1";

  const brokerMap = new Map<number, Broker>();
  brokers.forEach((broker) => brokerMap.set(broker.id, broker));

const regulators = Array.from(
  new Map(
    licenses.map((item) => [
      item.regulator_code,
      {
        code: item.regulator_code,
        name: item.regulator_name_ar,
        description: item.regulator_description_ar,
        count: new Set(
          licenses
            .filter((x) => x.regulator_code === item.regulator_code)
            .map((x) => x.broker_id)
        ).size,
      },
    ])
  ).values()
).sort((a, b) => b.count - a.count);

  const countries = Array.from(
    new Map(
      licenses.map((item) => [
        item.country_code,
        {
          code: item.country_code,
          name: item.country_ar,
          count: licenses.filter((x) => x.country_code === item.country_code).length,
        },
      ])
    ).values()
  ).sort((a, b) => b.count - a.count);

  const qMatchedBrokerIds = new Set<number>();

  if (q) {
    brokers.forEach((broker) => {
      const brokerText = [
        broker.name,
        broker.name_en,
        broker.slug,
        broker.regulation,
        broker.regulation_short,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (brokerText.includes(q)) {
        qMatchedBrokerIds.add(broker.id);
      }
    });

    licenses.forEach((license) => {
      const licenseText = [
        license.license_number,
        license.entity_name_ar,
        license.entity_name_en,
        license.regulator_code,
        license.regulator_name_ar,
        license.regulator_name_en,
        license.country_ar,
        license.country_en,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (licenseText.includes(q)) {
        qMatchedBrokerIds.add(license.broker_id);
      }
    });
  }

  const filteredLicenses = licenses.filter((item) => {
    if (selectedRegulator && cleanText(item.regulator_code) !== cleanText(selectedRegulator)) {
      return false;
    }

    if (selectedCountry && cleanText(item.country_code) !== cleanText(selectedCountry)) {
      return false;
    }

    if (q && !qMatchedBrokerIds.has(item.broker_id)) {
      return false;
    }

    return true;
  });

  const groupedByBroker = Array.from(
  new Map(
    filteredLicenses.map((license) => [
      license.broker_id,
      {
        broker: brokerMap.get(license.broker_id),
        licenses: filteredLicenses.filter((x) => x.broker_id === license.broker_id),
      },
    ])
  ).values()
).sort((a, b) => {
  const ratingA = a.broker?.rating ?? 0;
  const ratingB = b.broker?.rating ?? 0;

  if (ratingB !== ratingA) {
    return ratingB - ratingA;
  }

  return b.licenses.length - a.licenses.length;
});

  const visibleGroups = showAll ? groupedByBroker : groupedByBroker.slice(0, 12);
  const uniqueBrokersCount = new Set(licenses.map((x) => x.broker_id)).size;

  const showAllUrl =
    "/licenses?" +
    new URLSearchParams({
      ...(qRaw ? { q: qRaw } : {}),
      ...(selectedRegulator ? { regulator: selectedRegulator } : {}),
      ...(selectedCountry ? { country: selectedCountry } : {}),
      all: "1",
    }).toString();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://brokeralarab.com" },
      { "@type": "ListItem", position: 2, name: "دليل التراخيص", item: PAGE_URL },
    ],
  };

  const faqItems = [
    {
      q: "كيف أتحقق من ترخيص شركة تداول؟",
      a: "ابحث باسم الشركة أو رقم الترخيص، ثم راجع اسم الكيان القانوني والجهة الرقابية، واضغط على رابط التحقق الرسمي للتأكد من البيانات من موقع الجهة الرقابية.",
    },
    {
      q: "هل وجود ترخيص يعني أن الوسيط مناسب للجميع؟",
      a: "لا. الترخيص عامل مهم للثقة، لكنه لا يكفي وحده. يجب أيضًا مقارنة الرسوم، السبريد، السحب والإيداع، المنصات، والدعم.",
    },
    {
      q: "لماذا يختلف اسم الشركة عن اسم الكيان القانوني؟",
      a: "لأن بعض الوسطاء يستخدمون اسمًا تجاريًا واحدًا، بينما تكون التراخيص مسجلة باسم كيانات قانونية مختلفة حسب الدولة أو المنطقة.",
    },
    {
      q: "هل كل التراخيص بنفس القوة؟",
      a: "لا. تختلف قوة الجهات الرقابية حسب متطلبات رأس المال، حماية أموال العملاء، نظام الشكاوى، ومستوى الرقابة القانونية.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

 const licensesDatasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": `${PAGE_URL}#license-dataset`,
  name: "قاعدة بيانات تراخيص شركات التداول في بروكر العرب",
  description:
    "قاعدة بيانات تضم تراخيص شركات التداول والوسطاء الماليين، مع الجهات الرقابية، الدول، أرقام التراخيص، أسماء الكيانات القانونية وروابط التحقق الرسمية عند توفرها.",

  url: PAGE_URL,
  inLanguage: "ar",

  creator: {
    "@id": "https://brokeralarab.com/#organization",
  },

  publisher: {
    "@id": "https://brokeralarab.com/#organization",
  },

  keywords: [
    "تراخيص شركات التداول",
    "تراخيص الفوركس",
    "التحقق من ترخيص وسيط",
    "الجهات الرقابية المالية",
    "حماية المستثمر",
  ],

  isAccessibleForFree: true,
  dateModified: new Date().toISOString(),
};

const licensesCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#collection`,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  inLanguage: "ar",
  isPartOf: {
    "@id": "https://brokeralarab.com/#website",
  },
  publisher: {
    "@id": "https://brokeralarab.com/#organization",
  },
  about: [
    { "@type": "Thing", name: "تراخيص شركات التداول" },
    { "@type": "Thing", name: "الجهات الرقابية المالية" },
    { "@type": "Thing", name: "التحقق من تراخيص الوسطاء" },
    { "@type": "Thing", name: "حماية المستثمر" },
  ],
  mainEntity: {
    "@id": `${PAGE_URL}#license-dataset`,
  },
};

const licensesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${PAGE_URL}#broker-license-list`,
  name: "قائمة الوسطاء حسب التراخيص",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: groupedByBroker.length,
  itemListElement: groupedByBroker.slice(0, 20).map((group, index) => {
    const broker = group.broker;

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialService",
        "@id": broker?.slug
          ? `https://brokeralarab.com/brokers/${broker.slug}#broker`
          : `${PAGE_URL}#broker-${group.licenses[0]?.broker_id}`,
        name: broker?.name || "شركة تداول",
        alternateName: broker?.name_en || undefined,
        url: broker?.slug
          ? `https://brokeralarab.com/brokers/${broker.slug}`
          : PAGE_URL,
        image: broker?.logo || undefined,
      },
    };
  }),
};

  return (
    <main className="bg-slate-50" dir="rtl">
      <Script
        id="licenses-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="licenses-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

<Script
  id="licenses-collection-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(licensesCollectionSchema),
  }}
/>

<Script
  id="licenses-dataset-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(licensesDatasetSchema),
  }}
/>

<Script
  id="licenses-itemlist-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(licensesItemListSchema),
  }}
/>

      <section className="mx-auto max-w-7xl px-3 pb-5 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[30px] border border-brand-100 bg-gradient-to-l from-brand-50 via-white to-slate-50 shadow-sm">
          <div className="px-5 py-8 text-center md:px-12 md:py-8">
            <div className="mx-auto mb-4 inline-flex rounded-full border border-brand-100 bg-white px-4 py-2 text-[12px] font-black text-brand-600 shadow-sm">
              تحقق من ترخيص الوسيط قبل فتح الحساب
            </div>

            <h1 className="mx-auto max-w-4xl text-[34px] font-black leading-[1.25] tracking-tight text-slate-950 md:text-5xl">
              دليل تراخيص شركات التداول والوسطاء الماليين
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-8 text-slate-700 md:text-[17px] md:leading-9">
              ابحث باسم الشركة، الاسم الإنجليزي، رقم الترخيص، الدولة أو الجهة
              الرقابية لعرض تراخيص الوسيط والكيانات القانونية المرتبطة به من مكان واحد.
            </p>

           <div className="mx-auto mt-6 max-w-2xl">
  <div className="grid grid-cols-3 gap-3">
    <div className="rounded-[18px] border border-brand-100 bg-white px-3 py-4 shadow-sm">
      <div className="text-2xl font-black text-brand-600">
        {licenses.length}
      </div>
      <div className="mt-1 text-[11px] font-black text-slate-500">
        ترخيص
      </div>
    </div>

    <div className="rounded-[18px] border border-brand-100 bg-white px-3 py-4 shadow-sm">
      <div className="text-2xl font-black text-brand-600">
        {uniqueBrokersCount}
      </div>
      <div className="mt-1 text-[11px] font-black text-slate-500">
        شركة
      </div>
    </div>

    <div className="rounded-[18px] border border-brand-100 bg-white px-3 py-4 shadow-sm">
      <div className="text-2xl font-black text-brand-600">
        {regulators.length}
      </div>
      <div className="mt-1 text-[11px] font-black text-slate-500">
        جهة رقابية
      </div>
    </div>
  </div>

 <a
  href="#license-search"
  className="mx-auto mt-6 inline-flex h-11 min-w-[240px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-black text-white transition hover:bg-brand-600"
>
  تحقق من ترخيص شركة الآن
</a>
</div>
          </div>
        </div>
      </section>

      <section
  id="license-search"
  className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8"
>
        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 text-right md:px-8">
          <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
  محرك البحث في تراخيص شركات التداول
</h2>
<p className="mt-2 text-sm leading-7 text-slate-500 md:text-base">
  ابحث باسم الشركة أو رقم الترخيص، ثم استخدم فلتر الجهة الرقابية أو الدولة لعرض التراخيص الرسمية المرتبطة بها.
</p>
          </div>

          <form action="/licenses#license-search" method="GET" className="border-b border-slate-200 p-4 md:p-5">
            <div className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-5">
                <label className="mb-2 block text-[12px] font-black text-slate-600">
                  بحث
                </label>
                <input
                  name="q"
                  defaultValue={qRaw}
                  placeholder="Exness أو اكسنس أو 730729"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-brand-100 focus:bg-white"
                />
              </div>

              <div className="md:col-span-3">
                <label className="mb-2 block text-[12px] font-black text-slate-600">
                  الجهة الرقابية
                </label>
                <select
                  name="regulator"
                  defaultValue={selectedRegulator}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-brand-100 focus:bg-white"
                >
                  <option value="">كل الجهات</option>
                  {regulators.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} - {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-[12px] font-black text-slate-600">
                  الدولة
                </label>
                <select
                  name="country"
                  defaultValue={selectedCountry}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-brand-100 focus:bg-white"
                >
                  <option value="">كل الدول</option>
                  {countries.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

             <div className="flex items-end md:col-span-2">
  <button className="h-12 w-full rounded-2xl bg-brand-500 px-4 text-sm font-black text-white transition hover:bg-brand-600">
    بحث
  </button>
</div>
            </div>
          </form>

        <div className="hidden flex-wrap items-center justify-between gap-3 px-5 py-3 md:flex md:px-8 md:py-4">
  <div>
    <h3 className="text-xl font-black text-slate-950">
      الشركات المطابقة لبحثك
    </h3>
    <p className="mt-1 text-sm font-bold text-slate-500">
      مرتبة حسب تقييم بروكر العرب · عرض {groupedByBroker.length} شركة بإجمالي {filteredLicenses.length} ترخيص
    </p>
  </div>

  {!showAll && groupedByBroker.length > 12 && (
    <Link
      href={showAllUrl}
      className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-brand-600"
    >
      عرض كل النتائج
    </Link>
  )}
</div>

          {visibleGroups.length === 0 ? (
  <div className="px-5 pb-6 md:px-8">
    <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
      <h3 className="text-xl font-black text-slate-950">
        لا توجد تراخيص مطابقة
      </h3>

      <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">
        {qRaw
          ? `لم نجد شركة أو ترخيصًا مطابقًا لعبارة البحث "${qRaw}" ضمن قاعدة بيانات بروكر العرب حاليًا. قد تكون الشركة غير مضافة بعد، أو أن الاسم/رقم الترخيص مكتوب بطريقة مختلفة.`
          : "لا توجد نتائج مطابقة للفلاتر المحددة. جرّب تغيير الجهة الرقابية أو الدولة."}
      </p>

      <Link
        href="/contact"
        className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-sm font-black text-white transition hover:bg-brand-600"
      >
        اقترح إضافة شركة
      </Link>
    </div>
  </div>
) : (
            <>
              <div className="hidden bg-slate-50/60 px-5 py-5 md:block md:px-8">
  <div className="space-y-4">
                  {visibleGroups.map((group) => {
                    const broker = group.broker;

                    return (
                     <details
  key={broker?.id || group.licenses[0]?.broker_id}
  className="group overflow-hidden rounded-[24px] border border-brand-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
  open={visibleGroups.length <= 3}
>
                        <summary className="list-none cursor-pointer border-b border-slate-200 bg-white px-5 py-4">
  <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <BrokerLogo broker={broker} />
                            <div>
                              {broker?.slug ? (
  <Link
    href={`/brokers/${broker.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[20px] font-black text-slate-950 transition hover:text-brand-600 hover:underline"
  >
    {broker?.name || "شركة تداول"}
  </Link>
) : (
  <div className="text-[20px] font-black text-slate-950">
    {broker?.name || "شركة تداول"}
  </div>
)}
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
  <span>{broker?.name_en || broker?.slug || "Broker"}</span>

 {broker?.rating ? (
  <span className="rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700">
    ⭐ {broker.rating}
  </span>
) : null}
</div>
                              <div className="mt-2 flex flex-wrap gap-1">
  {group.licenses.slice(0, 5).map((license) => (
    <span
      key={license.id}
      className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600"
    >
      {license.regulator_code}
    </span>
  ))}
</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-sm font-black text-brand-600 transition group-open:rotate-180">
    ▼
  </span>

  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-black text-emerald-700">
  <span aria-hidden="true">🛡️</span>
  {group.licenses.length} تراخيص نشطة
</span>

                            {broker?.slug && (
                             <Link
  href={`/brokers/${broker.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-10 items-center justify-center rounded-2xl border border-brand-100 bg-white px-4 text-sm font-black text-brand-600 transition hover:bg-brand-50"
>
  عرض تقييم الشركة ←
</Link>
                            )}
                          </div>
                        </div>
</summary>
                        <table className="min-w-full text-right">
                         <thead className="bg-brand-50/40">
  <tr className="text-[12px] font-black text-slate-500">
    <th className="px-5 py-3">الجهة الرقابية</th>
<th className="px-5 py-3">الدولة</th>
<th className="px-5 py-3">الكيان القانوني</th>
<th className="px-5 py-3 text-center">الحالة</th>
<th className="px-8 py-3 text-center">التحقق الرسمي</th>
  </tr>
</thead>

                          <tbody className="divide-y divide-slate-100">
                            {group.licenses.map((item) => (
                            <tr key={item.id} className="transition hover:bg-slate-50">
  <td className="px-5 py-3">
  <div className="text-sm font-black text-slate-950">
    {item.regulator_code}
  </div>

  <div className="mt-1 text-[12px] font-bold leading-5 text-slate-500">
    {item.regulator_name_ar}
  </div>

  <div className="mt-1 inline-flex rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-black text-slate-600">
    رقم الترخيص: {item.license_number || "غير متوفر"}
  </div>
</td>

<td className="px-5 py-3 text-sm font-black text-slate-950">
  {item.country_ar}
</td>

  <td className="max-w-[320px] px-5 py-4 text-sm font-bold leading-6 text-slate-700">
    {item.entity_name_ar || item.entity_name_en || "-"}
  </td>

 <td className="px-5 py-3 text-center">
 <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
  <span className="h-2 w-2 rounded-full bg-emerald-500" />
  {statusText(item.status_code)}
</span>
</td>

<td className="px-8 py-3 text-center">
  {item.verification_url_ar || item.verification_url_en ? (
    <a
      href={item.verification_url_ar || item.verification_url_en || "#"}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-500 px-5 text-xs font-black text-white transition hover:bg-brand-600"
    >
      تحقق رسميًا
    </a>
  ) : (
    <span className="text-xs font-bold text-slate-400">
      غير متوفر
    </span>
  )}
</td>
</tr>
                            ))}
                          </tbody>
                      </table>

<div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-[12px] font-bold text-slate-500">
  آخر تحقق من بيانات التراخيص:{" "}
  <span className="font-black text-slate-700">
    {formatVerifiedDate(
      group.licenses
        .map((license) => license.last_verified)
        .filter(Boolean)
        .sort()
        .reverse()[0]
    )}
  </span>
</div>
</details>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 p-4 md:hidden">
  <div className="rounded-[22px] border border-brand-100 bg-brand-50 px-4 py-4 text-center">
    <div className="text-lg font-black text-slate-950">
      {groupedByBroker.length} شركة مطابقة
    </div>

    <div className="mt-1 text-sm font-bold leading-6 text-slate-600">
      {filteredLicenses.length} ترخيص متاح للتحقق
    </div>

    {!showAll && groupedByBroker.length > 12 && (
      <Link
        href={showAllUrl}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white"
      >
        عرض كل النتائج
      </Link>
    )}
  </div>
           {visibleGroups.map((group) => {
  const broker = group.broker;

  return (
    <details
      key={broker?.id || group.licenses[0]?.broker_id}
      className="group overflow-hidden rounded-[24px] border border-brand-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
    >
      <summary className="list-none cursor-pointer border-b border-slate-200 bg-slate-50 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <BrokerLogo broker={broker} />

            <div className="min-w-0 flex-1">
              {broker?.slug ? (
                <Link
                  href={`/brokers/${broker.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[19px] font-black leading-6 text-slate-950 transition hover:text-brand-600"
                >
                  {broker?.name || "شركة تداول"}
                </Link>
              ) : (
                <div className="text-[19px] font-black leading-6 text-slate-950">
                  {broker?.name || "شركة تداول"}
                </div>
              )}

              <div className="mt-1 text-xs font-bold text-slate-500">
                {broker?.name_en || broker?.slug || "Broker"}
              </div>
            </div>
          </div>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-brand-600 transition group-open:rotate-180">
            ▼
          </span>
        </div>
      </summary>

      <div className="space-y-3 p-4">
        {group.licenses.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="grid grid-cols-2 bg-slate-50">
              <div className="border-l border-slate-200 px-3 py-3 text-right">
                <div className="text-[10px] font-bold text-slate-500">الجهة</div>
                <div className="mt-1 text-[13px] font-black text-slate-950">
                  {item.regulator_code}
                </div>
              </div>

              <div className="px-3 py-3 text-right">
                <div className="text-[10px] font-bold text-slate-500">الدولة</div>
                <div className="mt-1 text-[13px] font-black text-slate-950">
                  {item.country_ar}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-slate-200">
              <div className="border-l border-slate-200 px-3 py-3 text-right">
                <div className="text-[10px] font-bold text-slate-500">رقم الترخيص</div>
                <div className="mt-1 text-[13px] font-black text-slate-950">
                  {item.license_number || "-"}
                </div>
              </div>

              <div className="px-3 py-3 text-right">
                <div className="text-[10px] font-bold text-slate-500">الحالة</div>
                <div className="mt-1 text-[13px] font-black text-emerald-700">
                  {statusText(item.status_code)}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-3 py-3 text-right">
              <div className="text-[10px] font-bold text-slate-500">الكيان القانوني</div>
              <div className="mt-1 text-[13px] font-bold leading-6 text-slate-800">
                {item.entity_name_ar || item.entity_name_en || "-"}
              </div>
            </div>

            {(item.verification_url_ar || item.verification_url_en) && (
              <div className="border-t border-slate-200 p-3">
                <a
                  href={item.verification_url_ar || item.verification_url_en || "#"}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex h-10 w-full items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white"
                >
                  تحقق رسميًا
                </a>
              </div>
            )}
          </div>
        ))}

        {broker?.slug && (
          <Link
            href={`/brokers/${broker.slug}`}
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-sm font-black text-brand-600"
          >
            عرض تقييم الشركة
          </Link>
        )}
      </div>
    </details>
  );
})}
                {!showAll && groupedByBroker.length > 12 && (
                  <Link
                    href={showAllUrl}
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white"
                  >
                    عرض كل النتائج
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-l from-white via-brand-50/40 to-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-6 text-right md:px-8">
  <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500"></div>

  <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
    تصفح شركات التداول حسب الجهة الرقابية
  </h2>

  <p className="mt-3 max-w-4xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
    اختر الجهة الرقابية لعرض الشركات التي تحمل ترخيصًا منها، مثل FCA البريطانية أو CySEC القبرصية أو ASIC الأسترالية.
  </p>
</div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4 md:p-5">
            {regulators.slice(0, 8).map((item) => (
              <Link
  key={item.code}
  href={`/licenses?regulator=${item.code}#license-search`}
  className="group rounded-[20px] border border-brand-100 bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-[2px] hover:border-brand-200 hover:shadow-[0_10px_24px_rgba(59,130,246,0.12)] md:rounded-[22px] md:p-4"
>
                <div className="flex items-center justify-between gap-3">
                 <span className="inline-flex h-9 min-w-12 items-center justify-center rounded-[13px] bg-brand-50 px-3 text-[13px] font-black text-brand-600 md:h-10 md:min-w-14 md:rounded-[14px] md:text-sm">
  {item.code}
</span>

<span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700 md:px-3 md:text-[11px]">
  {item.count} وسيط مرخص
</span>
                </div>

               <h3 className="mt-3 text-[17px] font-black leading-7 text-slate-950 md:mt-4 md:text-[18px]">
  {item.name}
</h3>

               <p className="mt-1.5 line-clamp-2 text-[12px] leading-6 text-slate-600 md:mt-2 md:text-[13px] md:leading-7">
  {item.description || "جهة رقابية مالية مدرجة ضمن قاعدة بيانات بروكر العرب."}
</p>
<div className="mt-3 text-[12px] font-black text-brand-600">
  عرض الشركات المرخصة ←
</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 text-right md:px-8">
      <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500"></div>

      <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
        كيف تقرأ تراخيص شركات التداول بطريقة صحيحة؟
      </h2>

      <p className="mt-3 max-w-5xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
        وجود الترخيص خطوة مهمة، لكنه ليس نهاية عملية التحقق. الأهم هو أن تعرف ماذا يعني الترخيص، ومن هو الكيان القانوني، وما هي الجهة التي تراقب الشركة، وهل الترخيص مرتبط فعلًا بالحساب الذي ستفتحه.
      </p>
    </div>

    <div className="hidden p-5 text-right md:block">
      <div className="grid auto-rows-fr gap-4 lg:grid-cols-3">
        {[
          {
            number: "1",
            title: "ابدأ باسم الكيان القانوني وليس اسم العلامة التجارية",
            text: "كثير من الوسطاء يستخدمون اسمًا تجاريًا واحدًا أمام الجمهور، لكنهم يعملون عبر عدة كيانات قانونية في دول مختلفة. لذلك عند التحقق من ترخيص شركة تداول، لا يكفي أن ترى اسم العلامة التجارية، بل يجب أن تطابق اسم الكيان القانوني الموجود في السجل الرقابي مع الكيان الذي ستفتح حسابك من خلاله. هذه النقطة مهمة جدًا لأن مستوى الحماية يختلف حسب الكيان، حتى لو كان اسم الشركة التجاري واحدًا.",
            mobileText: "طابق اسم الكيان القانوني في السجل الرقابي مع الكيان الذي ستفتح حسابك من خلاله.",
          },
          {
            number: "2",
            title: "لا تتعامل مع كل التراخيص بنفس القوة",
            text: "الجهات الرقابية تختلف بشكل كبير من حيث متطلبات رأس المال، فصل أموال العملاء، آليات الشكاوى، التعويضات، والرقابة المستمرة. ترخيص من جهة قوية لا يشبه ترخيصًا خارجيًا محدود المتطلبات. لذلك يجب النظر إلى اسم الجهة الرقابية والدولة، وليس فقط عبارة مرخصة أو منظمة. هذا الدليل يساعدك على رؤية الجهة والدولة ورقم الترخيص في مكان واحد حتى تصبح المقارنة أوضح.",
            mobileText: "قوة الترخيص تختلف حسب الجهة الرقابية والدولة ومتطلبات حماية أموال العملاء.",
          },
          {
            number: "3",
            title: "تحقق من رقم الترخيص من المصدر الرسمي",
            text: "أفضل طريقة للتأكد من ترخيص شركة تداول هي استخدام رابط التحقق الرسمي أو الدخول إلى موقع الجهة الرقابية والبحث باسم الكيان أو رقم الترخيص. وجود رقم ترخيص داخل موقع الوسيط لا يكفي إذا لم يكن قابلًا للتحقق من السجل الرسمي. لذلك نعرض روابط التحقق عندما تكون متاحة حتى لا يعتمد المستخدم على الشعارات أو الادعاءات التسويقية فقط.",
            mobileText: "لا تعتمد على رقم الترخيص داخل موقع الوسيط فقط، بل تحقق منه من موقع الجهة الرقابية.",
          },
          {
            number: "4",
            title: "افهم العلاقة بين الترخيص والحساب الحقيقي",
            text: "بعض الشركات تعرض عدة تراخيص قوية، لكن العميل في دولة معينة قد يتم تسجيله تحت كيان آخر. لذلك يجب أن تعرف من هو الكيان الذي سيظهر في اتفاقية العميل عند فتح الحساب الحقيقي. إذا كان الكيان مختلفًا عن الترخيص الذي تعتمد عليه في قرارك، فقد يكون مستوى الحماية مختلفًا. هذه نقطة لا ينتبه لها كثير من المتداولين.",
            mobileText: "تأكد من الكيان الذي سيتم فتح حسابك تحته، لأنه قد يختلف عن الترخيص المعلن.",
          },
          {
            number: "5",
            title: "الترخيص لا يغني عن مقارنة الشروط",
            text: "حتى لو كانت الشركة مرخصة، يجب أن تقارن السبريد، العمولة، سرعة السحب، وسائل الدفع، المنصات، الحساب الإسلامي، الدعم العربي، والحد الأدنى للإيداع. الترخيص يعطيك طبقة ثقة أساسية، لكنه لا يضمن أن شروط التداول هي الأفضل لك. لذلك الأفضل استخدام صفحة التقييم الكاملة بعد مراجعة الترخيص.",
            mobileText: "بعد التحقق من الترخيص، قارن السبريد والعمولات والسحب والمنصات قبل الاختيار.",
          },
          {
            number: "6",
            title: "لماذا بنينا هذا الدليل؟",
            text: "لأن أغلب مواقع تقييم شركات التداول تكتفي بذكر أسماء الجهات الرقابية دون تنظيم البيانات في قاعدة واضحة. في بروكر العرب نريد أن يرى المستخدم رقم الترخيص، الجهة، الدولة، اسم الكيان القانوني، ورابط التحقق في مكان واحد. ومع إضافة أي شركة جديدة مستقبلًا، ستظهر تراخيصها تلقائيًا داخل هذا الدليل، وداخل صفحات الجهات الرقابية والدول لاحقًا.",
            mobileText: "الدليل يجمع رقم الترخيص والجهة والدولة والكيان القانوني وروابط التحقق في مكان واحد.",
          },
        ].map((item) => (
          <div
  key={item.number}
  className="flex h-full flex-col rounded-[22px] border border-slate-200 bg-[#fbfdff] p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:bg-white hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
>
  <div className="flex items-start gap-4">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-[12px] font-black text-brand-600 ring-1 ring-[#bfdbfe]">
      {item.number}
    </span>

    <div className="min-w-0 flex-1 text-right">
      <h3 className="text-[18px] font-black leading-7 text-[#07111f]">
        {item.title}
      </h3>

      <p className="mt-2 line-clamp-5 text-[13px] font-semibold leading-7 text-slate-600">
  {item.text}
</p>
    </div>
  </div>
</div>
        ))}
      </div>

      <div className="mt-5 rounded-[24px] border border-brand-100 bg-gradient-to-l from-brand-50 to-white p-5 shadow-sm">
        <h3 className="text-[22px] font-black text-slate-950">
          خلاصة مهمة قبل اختيار وسيط التداول
        </h3>

        <p className="mt-3 text-[15px] leading-8 text-slate-700">
          التحقق من الترخيص يجب أن يكون أول خطوة في اختيار شركة التداول، لكنه لا يجب أن يكون الخطوة الوحيدة. ابحث عن الشركة، راجع تراخيصها، تحقق من رقم الترخيص، ثم اقرأ التقييم الكامل لمقارنة الرسوم والمنصات والسحب والدعم. بهذه الطريقة تتجنب الاعتماد على الإعلانات فقط، وتبني قرارك على بيانات واضحة وقابلة للتحقق.
        </p>
      </div>
    </div>

    <div className="space-y-2 bg-white p-3.5 md:hidden">
      {[
        {
          number: "1",
          title: "ابدأ باسم الكيان القانوني",
          mobileText: "طابق اسم الكيان القانوني في السجل الرقابي مع الكيان الذي ستفتح حسابك من خلاله.",
        },
        {
          number: "2",
          title: "لا تتعامل مع كل التراخيص بنفس القوة",
          mobileText: "قوة الترخيص تختلف حسب الجهة الرقابية والدولة ومتطلبات حماية أموال العملاء.",
        },
        {
          number: "3",
          title: "تحقق من رقم الترخيص من المصدر الرسمي",
          mobileText: "لا تعتمد على رقم الترخيص داخل موقع الوسيط فقط، بل تحقق منه من موقع الجهة الرقابية.",
        },
        {
          number: "4",
          title: "افهم علاقة الترخيص بالحساب الحقيقي",
          mobileText: "تأكد من الكيان الذي سيتم فتح حسابك تحته، لأنه قد يختلف عن الترخيص المعلن.",
        },
        {
          number: "5",
          title: "الترخيص لا يغني عن مقارنة الشروط",
          mobileText: "بعد التحقق من الترخيص، قارن السبريد والعمولات والسحب والمنصات قبل الاختيار.",
        },
        {
          number: "6",
          title: "لماذا بنينا هذا الدليل؟",
          mobileText: "الدليل يجمع رقم الترخيص والجهة والدولة والكيان القانوني وروابط التحقق في مكان واحد.",
        },
      ].map((item) => (
       <div
  key={item.number}
  className="rounded-[18px] border border-slate-200 bg-[#fbfdff] px-3.5 py-3.5 shadow-[0_5px_16px_rgba(15,23,42,0.04)]"
>
  <div className="flex items-start gap-3">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-600 ring-1 ring-[#bfdbfe]">
      {item.number}
    </span>

    <div className="min-w-0 flex-1 text-right">
      <h3 className="text-[14px] font-black leading-5 text-[#07111f]">
        {item.title}
      </h3>

      <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-600">
        {item.mobileText}
      </p>
    </div>
  </div>
</div>
      ))}

      <div className="rounded-[18px] border border-brand-100 bg-brand-50 px-3.5 py-3">
        <h3 className="text-[14px] font-black text-slate-950">
          خلاصة سريعة
        </h3>

        <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-600">
          ابدأ بالترخيص، ثم راجع الكيان القانوني، وبعدها قارن الشروط والرسوم قبل فتح الحساب.
        </p>
      </div>
    </div>
  </div>
</section>

     <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 text-right md:px-8">
      <div className="mb-4 h-1.5 w-16 rounded-full bg-brand-500"></div>

      <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
        ماذا تفعل بعد التحقق من الترخيص؟
      </h2>

      <p className="mt-3 max-w-4xl text-[15px] leading-8 text-slate-600">
        الترخيص خطوة أولى، لكن القرار الأفضل يحتاج مراجعة شروط التداول كاملة قبل فتح الحساب.
      </p>
    </div>

    <div className="grid gap-3 bg-white p-3.5 md:grid-cols-2 md:p-5">
      {[
        { number: "1", text: "راجع الكيان القانوني الذي ستفتح الحساب من خلاله" },
        { number: "2", text: "قارن السبريد والعمولات وشروط الحساب" },
        { number: "3", text: "تأكد من طرق السحب والإيداع المتاحة في بلدك" },
        { number: "4", text: "اقرأ تقييم الشركة الكامل قبل فتح الحساب" },
      ].map((item) => (
        <div
          key={item.number}
          className="rounded-[18px] border border-brand-100 bg-white px-3.5 py-3.5 shadow-[0_5px_16px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.08)] md:rounded-[20px] md:p-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-600 ring-1 ring-[#bfdbfe] md:h-9 md:w-9">
              {item.number}
            </span>

            <div className="min-w-0 flex-1 text-right">
              <p className="text-[14px] font-black leading-6 text-[#07111f] md:text-[15px]">
                {item.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] shadow-sm">
   <div className="border-b border-slate-200 px-5 py-5 text-right md:px-8 md:py-6">
      <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500"></div>

      <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
        صفحات تساعدك بعد التحقق من الترخيص
      </h2>

      <p className="mt-2 max-w-4xl text-[13px] leading-7 text-slate-600 md:mt-3 md:text-[15px] md:leading-8">
        بعد مراجعة الترخيص، يمكنك الانتقال إلى تقييمات الوسطاء أو المقارنات أو قوائم أفضل شركات التداول لاختيار الوسيط الأنسب.
      </p>
    </div>

    <div className="grid gap-3 p-3.5 md:grid-cols-3 md:p-5">
      {[
        {
          title: "أفضل وسطاء التداول",
          desc: "قوائم مرتبة لأفضل شركات التداول حسب الدولة ونوع الحساب.",
          href: "/best-brokers",
          number: "1",
        },
        {
          title: "تقييم الوسطاء",
          desc: "مراجعات تفصيلية لكل شركة من حيث التراخيص والرسوم والمنصات.",
          href: "/brokers",
          number: "2",
        },
        {
          title: "قارن الوسطاء",
          desc: "قارن بين شركتين مباشرة لمعرفة الفروقات قبل فتح الحساب.",
          href: "/compare",
          number: "3",
        },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)] md:rounded-[20px] md:p-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[11px] font-black text-brand-600 ring-1 ring-[#bfdbfe]">
              {item.number}
            </span>

            <div className="min-w-0 flex-1 text-right">
              <h3 className="text-[15px] font-black leading-6 text-[#07111f] transition group-hover:text-brand-600 md:text-[17px] md:leading-7">
                {item.title}
              </h3>

              <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-600 md:mt-1.5 md:text-[13px] md:leading-6">
                {item.desc}
              </p>

              <div className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-black text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white md:text-[13px]">
  انتقل الآن ←
</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

    <section className="mx-auto max-w-7xl px-3 pb-3 md:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 text-right md:px-8">
      <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500"></div>

      <h2 className="text-[22px] font-black leading-tight text-slate-950 md:text-3xl">
        أسئلة شائعة حول تراخيص شركات التداول
      </h2>
    </div>

    <div className="grid gap-3 bg-white p-3.5 md:p-5">
      {faqItems.map((item, index) => (
        <details
          key={item.q}
          className="group overflow-hidden rounded-[18px] border border-slate-200 bg-[#fbfdff] shadow-[0_5px_16px_rgba(15,23,42,0.04)] transition hover:border-brand-100 hover:bg-white"
        >
          <summary className="list-none cursor-pointer px-3.5 py-3.5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-600 ring-1 ring-[#bfdbfe]">
                {index + 1}
              </span>

              <h3 className="min-w-0 flex-1 text-right text-[15px] font-black leading-6 text-[#07111f] md:text-[16px]">
                {item.q}
              </h3>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-sm font-black text-brand-600 transition group-open:rotate-45">
                +
              </span>
            </div>
          </summary>

          <div className="border-t border-slate-200 bg-white px-4 py-4 text-right">
            <p className="text-[13px] font-semibold leading-7 text-slate-600 md:text-[14px] md:leading-8">
              {item.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
    </main>
  );
}