import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

const PAGE_URL = "https://brokeralarab.com/en/licenses";
const PAGE_TITLE = "Forex Broker License Checker & Regulation Database";
const PAGE_DESCRIPTION =
  "Check forex broker licenses by broker name, license number, regulator or country. Browse FCA, CySEC, ASIC, FSCA and other regulated brokers with official verification links.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Broker Alarab",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

type ParamValue = string | string[] | undefined;

type PageSearchParams = {
  q?: ParamValue;
  regulator?: ParamValue;
  country?: ParamValue;
  all?: ParamValue;
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
  regulator_description_en?: string | null;
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
  const brokerName = broker?.name_en || broker?.name || "Broker";

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-brand-100 bg-white shadow-[0_4px_14px_rgba(59,130,246,0.08)]">
      {broker?.logo ? (
        <Image
          src={broker.logo}
          alt={brokerName}
          width={44}
          height={44}
          className="h-9 w-9 object-contain"
        />
      ) : (
        <span className="text-xs font-black text-slate-500">
          {brokerName.slice(0, 2)}
        </span>
      )}
    </div>
  );
}

function cleanText(value?: string | null) {
  return (value || "").trim().toLowerCase();
}

function getSearchParam(value: ParamValue) {
  if (Array.isArray(value)) {
    return value.find((item) => item && item.trim() !== "") || "";
  }

  return value?.trim() || "";
}

function statusText(status?: string) {
  if (status === "active") return "Active";
  if (status === "inactive") return "Inactive";
  return "Unknown";
}

function plural(count: number, singular: string, pluralWord: string) {
  return count === 1 ? singular : pluralWord;
}

function regulatorMobileLabelEn(code: string, fallback: string) {
  const shortNames: Record<string, string> = {
    CySEC: "CySEC Cyprus",
    ASIC: "ASIC Australia",
    FCA: "FCA UK",
    FSC: "FSC BVI",
    FSCA: "FSCA South Africa",
    FSA: "FSA Seychelles",
    SCB: "SCB Bahamas",
    DFSA: "DFSA Dubai",
    JSC: "JSC Jordan",
    SCA: "SCA UAE",
    VFSC: "VFSC Vanuatu",
    "ADGM FSRA": "ADGM Abu Dhabi",
    BACEN: "BACEN Brazil",
    BaFin: "BaFin Germany",
    CBI: "CBI Ireland",
    CIMA: "CIMA Cayman",
    CMVM: "CMVM Portugal",
    CVM: "CVM Brazil",
    FMA: "FMA New Zealand",
    "FSC BVI": "FSC BVI",
    LFSA: "LFSA Labuan",
    MAS: "MAS Singapore",
    MISA: "MISA Comoros",
  };

  return shortNames[code] || code || fallback;
}

function formatVerifiedDate(value?: string | null) {
  if (!value) return "Not specified";

  try {
    return new Intl.DateTimeFormat("en", {
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

const qRaw = getSearchParam(params.q);
const q = qRaw.toLowerCase();
const selectedRegulator = getSearchParam(params.regulator);
const selectedCountry = getSearchParam(params.country);
const showAll = getSearchParam(params.all) === "1";

  const brokerMap = new Map<number, Broker>();
  brokers.forEach((broker) => brokerMap.set(broker.id, broker));

  const regulators = Array.from(
    new Map(
      licenses.map((item) => [
        item.regulator_code,
        {
          code: item.regulator_code,
          name: item.regulator_name_en || item.regulator_name_ar || item.regulator_code,
          description:
            item.regulator_description_en ||
            item.regulator_description_ar ||
            "A financial regulatory authority listed in the Broker Alarab license database.",
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
          name: item.country_en || item.country_ar,
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
    "/en/licenses?" +
    new URLSearchParams({
      ...(qRaw ? { q: qRaw } : {}),
      ...(selectedRegulator ? { regulator: selectedRegulator } : {}),
      ...(selectedCountry ? { country: selectedCountry } : {}),
      all: "1",
    }).toString() +
    "#license-search";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://brokeralarab.com/en" },
      { "@type": "ListItem", position: 2, name: "Broker License Checker", item: PAGE_URL },
    ],
  };

  const faqItems = [
    {
      q: "How can I check if a forex broker is regulated?",
      a: "Search for the broker name or license number, review the legal entity name, regulator and country, then use the official verification link when available to confirm the license directly with the regulator.",
    },
    {
      q: "Does a license mean a broker is suitable for every trader?",
      a: "No. Regulation is an important trust factor, but traders should still compare spreads, commissions, withdrawal methods, trading platforms, account types and customer support before opening an account.",
    },
    {
      q: "Why is the legal entity name different from the broker brand?",
      a: "Many brokers operate under one public brand while using several legal entities in different jurisdictions. The protection you receive may depend on the specific entity that opens your trading account.",
    },
    {
      q: "Are all forex broker licenses equally strong?",
      a: "No. Regulators differ in capital requirements, client money rules, complaint handling, investor compensation schemes and ongoing supervision.",
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
    name: "Broker Alarab Forex Broker License Database",
    description:
      "A structured database of forex broker licenses, regulators, countries, license numbers, legal entity names and official verification links when available.",
    url: PAGE_URL,
    inLanguage: "en",
    creator: {
      "@id": "https://brokeralarab.com/#organization",
    },
    publisher: {
      "@id": "https://brokeralarab.com/#organization",
    },
    keywords: [
      "forex broker license checker",
      "regulated forex brokers",
      "forex broker regulation",
      "FCA regulated brokers",
      "CySEC regulated brokers",
      "ASIC regulated brokers",
      "broker license verification",
    ],
  };

  const licensesCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#collection`,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    inLanguage: "en",
    isPartOf: {
      "@id": "https://brokeralarab.com/#website",
    },
    publisher: {
      "@id": "https://brokeralarab.com/#organization",
    },
    about: [
      { "@type": "Thing", name: "Forex broker licenses" },
      { "@type": "Thing", name: "Financial regulators" },
      { "@type": "Thing", name: "Broker license verification" },
      { "@type": "Thing", name: "Investor protection" },
    ],
    mainEntity: {
      "@id": `${PAGE_URL}#license-dataset`,
    },
  };

  const licensesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#broker-license-list`,
    name: "Regulated Forex Brokers by License",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: groupedByBroker.length,
    itemListElement: groupedByBroker.slice(0, 20).map((group, index) => {
      const broker = group.broker;
      const brokerName = broker?.name_en || broker?.name || "Forex Broker";

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "FinancialService",
          "@id": broker?.slug
            ? `https://brokeralarab.com/en/brokers/${broker.slug}#broker`
            : `${PAGE_URL}#broker-${group.licenses[0]?.broker_id}`,
          name: brokerName,
          alternateName: broker?.name || undefined,
          url: broker?.slug
            ? `https://brokeralarab.com/en/brokers/${broker.slug}`
            : PAGE_URL,
          image: broker?.logo || undefined,
        },
      };
    }),
  };

  return (
    <main className="bg-slate-50" dir="ltr">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(licensesCollectionSchema) }}
      />
      <Script
        id="licenses-dataset-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(licensesDatasetSchema) }}
      />
      <Script
        id="licenses-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(licensesItemListSchema) }}
      />

      <section className="mx-auto max-w-7xl px-3 pb-5 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[30px] border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-slate-50 shadow-sm">
          <div className="px-5 py-8 text-center md:px-12 md:py-8">
            <div className="mx-auto mb-4 inline-flex rounded-full border border-brand-100 bg-white px-4 py-2 text-[12px] font-black text-brand-600 shadow-sm">
              Verify a forex broker license before opening an account
            </div>

            <h1 className="mx-auto max-w-4xl text-[34px] font-black leading-[1.18] tracking-tight text-slate-950 md:text-5xl">
              Forex Broker License Checker & Regulation Database
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-8 text-slate-700 md:text-[17px] md:leading-9">
              Search by broker name, English brand name, license number, regulator
              or country to review the legal entities and regulatory licenses connected
              to each forex and CFD broker.
            </p>

            <div className="mx-auto mt-6 max-w-2xl">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-[18px] border border-brand-100 bg-white px-3 py-4 shadow-sm">
                  <div className="text-2xl font-black text-brand-600">
                    {licenses.length}
                  </div>
                  <div className="mt-1 text-[11px] font-black text-slate-500">
                    Licenses
                  </div>
                </div>

                <div className="rounded-[18px] border border-brand-100 bg-white px-3 py-4 shadow-sm">
                  <div className="text-2xl font-black text-brand-600">
                    {uniqueBrokersCount}
                  </div>
                  <div className="mt-1 text-[11px] font-black text-slate-500">
                    Brokers
                  </div>
                </div>

                <div className="rounded-[18px] border border-brand-100 bg-white px-3 py-4 shadow-sm">
                  <div className="text-2xl font-black text-brand-600">
                    {regulators.length}
                  </div>
                  <div className="mt-1 text-[11px] font-black text-slate-500">
                    Regulators
                  </div>
                </div>
              </div>

              <a
                href="#license-search"
                className="mx-auto mt-6 inline-flex h-11 min-w-[240px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-black text-white transition hover:bg-brand-600"
              >
                Check a Broker License
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
          <div className="border-b border-slate-200 px-5 py-5 text-left md:px-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Search the Broker License Database
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-500 md:text-base">
              Enter a broker name or license number, then filter by regulator or country
              to find matching official license records.
            </p>
          </div>

          <form
            action="/en/licenses#license-search"
            method="GET"
            className="border-b border-slate-200 p-4 md:p-5"
          >
            <div className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-5">
                <label className="mb-2 block text-[12px] font-black text-slate-600">
                  Verify License
                </label>
                <input
                  name="q"
                  defaultValue={qRaw}
                  placeholder="Exness, XM, Pepperstone or 730729"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-brand-100 focus:bg-white"
                />
              </div>

             <div className="md:col-span-3">
  <label className="mb-2 block text-[12px] font-black text-slate-600">
    Regulator
  </label>

  {/* Mobile: short labels */}
  <select
    name="regulator"
    defaultValue={selectedRegulator}
    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-brand-100 focus:bg-white md:hidden"
  >
    <option value="">All regulators</option>
    {regulators.map((item) => (
      <option key={item.code} value={item.code}>
        {regulatorMobileLabelEn(item.code, item.name)}
      </option>
    ))}
  </select>

  {/* Desktop: full labels - do not change */}
  <select
    name="regulator"
    defaultValue={selectedRegulator}
    className="hidden h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-brand-100 focus:bg-white md:block"
  >
    <option value="">All regulators</option>
    {regulators.map((item) => (
      <option key={item.code} value={item.code}>
        {item.code} - {item.name}
      </option>
    ))}
  </select>
</div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-[12px] font-black text-slate-600">
                  Country
                </label>
                <select
                  name="country"
                  defaultValue={selectedCountry}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-brand-100 focus:bg-white"
                >
                  <option value="">All countries</option>
                  {countries.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end md:col-span-2">
                <button className="h-12 w-full rounded-2xl bg-brand-500 px-4 text-sm font-black text-white transition hover:bg-brand-600">
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="hidden flex-wrap items-center justify-between gap-3 px-5 py-3 md:flex md:px-8 md:py-4">
            <div>
              <h3 className="text-xl font-black text-slate-950">
                Matching Regulated Brokers
              </h3>
              <p className="mt-1 text-sm font-bold text-slate-500">
                Ranked by Broker Alarab rating · Showing {groupedByBroker.length}{" "}
                {plural(groupedByBroker.length, "broker", "brokers")} with{" "}
                {filteredLicenses.length}{" "}
                {plural(filteredLicenses.length, "license", "licenses")}
              </p>
            </div>

            {!showAll && groupedByBroker.length > 12 && (
              <Link
                href={showAllUrl}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-brand-600"
              >
                View All Results
              </Link>
            )}
          </div>

          {visibleGroups.length === 0 ? (
            <div className="px-5 pb-6 md:px-8">
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                <h3 className="text-xl font-black text-slate-950">
                  No matching license records found
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                  {qRaw
                    ? `We could not find a broker or license record matching "${qRaw}" in the Broker Alarab database. The broker may not be listed yet, or the name/license number may be written differently.`
                    : "No records match the selected filters. Try changing the regulator or country filter."}
                </p>

                <Link
                  href="/en/contact"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-sm font-black text-white transition hover:bg-brand-600"
                >
                  Suggest a Broker
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="hidden bg-slate-50/60 px-5 py-5 md:block md:px-8">
                <div className="space-y-4">
                  {visibleGroups.map((group) => {
                    const broker = group.broker;
                    const brokerName = broker?.name_en || broker?.name || "Forex Broker";

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
                                    href={`/en/brokers/${broker.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[20px] font-black text-slate-950 transition hover:text-brand-600 hover:underline"
                                  >
                                    {brokerName}
                                  </Link>
                                ) : (
                                  <div className="text-[20px] font-black text-slate-950">
                                    {brokerName}
                                  </div>
                                )}

                                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                                  <span>{broker?.name || broker?.slug || "Broker"}</span>

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
  {group.licenses.length} active{" "}
  {plural(group.licenses.length, "license", "licenses")}
</span>

                              {broker?.slug && (
                                <Link
                                  href={`/en/brokers/${broker.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex h-10 items-center justify-center rounded-2xl border border-brand-100 bg-white px-4 text-sm font-black text-brand-600 transition hover:bg-brand-50"
                                >
                                  Full Review →
                                </Link>
                              )}
                            </div>
                          </div>
                        </summary>

                        <table className="min-w-full text-left">
                          <thead className="bg-brand-50/40">
                            <tr className="text-[12px] font-black text-slate-500">
                              <th className="px-5 py-3">Regulator</th>
<th className="px-5 py-3">Country</th>
<th className="px-5 py-3">Legal Entity</th>
<th className="px-5 py-3 text-center">Status</th>
<th className="px-8 py-3 text-center">Official Verification</th>
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
    {item.regulator_name_en || item.regulator_name_ar}
  </div>

  <div className="mt-1 inline-flex rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-black text-slate-600">
    License No: {item.license_number || "Not available"}
  </div>
</td>

                                <td className="px-5 py-3 text-sm font-black text-slate-950">
                                  {item.country_en || item.country_ar}
                                </td>

                                <td className="max-w-[320px] px-5 py-4 text-sm font-bold leading-6 text-slate-700">
                                  {item.entity_name_en || item.entity_name_ar || "-"}
                                </td>

                                <td className="px-5 py-3 text-center">
                                 <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
  <span className="h-2 w-2 rounded-full bg-emerald-500" />
  {statusText(item.status_code)}
</span>
                                </td>

                                <td className="px-8 py-3 text-center">
                                  {item.verification_url_en || item.verification_url_ar ? (
                                    <a
                                      href={item.verification_url_en || item.verification_url_ar || "#"}
                                      target="_blank"
                                      rel="nofollow noopener noreferrer"
                                      className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-500 px-5 text-xs font-black text-white transition hover:bg-brand-600"
                                    >
                                      Verify Officially
                                    </a>
                                  ) : (
                                    <span className="text-xs font-bold text-slate-400">
                                      Not available
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
</table>

<div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-[12px] font-bold text-slate-500">
  Last license data verification:{" "}
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
                    {groupedByBroker.length} Matching Brokers
                  </div>

                  <div className="mt-1 text-sm font-bold leading-6 text-slate-600">
                    {filteredLicenses.length}{" "}
                    {plural(filteredLicenses.length, "license", "licenses")} available for verification
                  </div>

                  {!showAll && groupedByBroker.length > 12 && (
                    <Link
                      href={showAllUrl}
                      className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white"
                    >
                      View All Results
                    </Link>
                  )}
                </div>

                {visibleGroups.map((group) => {
                  const broker = group.broker;
                  const brokerName = broker?.name_en || broker?.name || "Forex Broker";

                return (
  <details
    key={broker?.id || group.licenses[0]?.broker_id}
    className="group overflow-hidden rounded-[24px] border border-brand-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
  >
<summary className="list-none cursor-pointer border-b border-slate-200 bg-slate-50 px-4 py-4">
  <div className="flex items-center justify-between gap-3">
    <div className="flex min-w-0 items-center gap-3">
      <BrokerLogo broker={broker} />

      <div className="min-w-0 flex-1">
        {broker?.slug ? (
          <Link
            href={`/en/brokers/${broker.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[19px] font-black leading-6 text-slate-950 transition hover:text-brand-600"
          >
            {brokerName}
          </Link>
        ) : (
          <div className="text-[19px] font-black leading-6 text-slate-950">
            {brokerName}
          </div>
        )}
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
                              <div className="border-r border-slate-200 px-3 py-3 text-left">
                                <div className="text-[10px] font-bold text-slate-500">
                                  Regulator
                                </div>
                                <div className="mt-1 text-[13px] font-black text-slate-950">
                                  {item.regulator_code}
                                </div>
                              </div>

                              <div className="px-3 py-3 text-left">
                                <div className="text-[10px] font-bold text-slate-500">
                                  Country
                                </div>
                                <div className="mt-1 text-[13px] font-black text-slate-950">
                                  {item.country_en || item.country_ar}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 border-t border-slate-200">
                              <div className="border-r border-slate-200 px-3 py-3 text-left">
                                <div className="text-[10px] font-bold text-slate-500">
                                  License No.
                                </div>
                                <div className="mt-1 text-[13px] font-black text-slate-950">
                                  {item.license_number || "-"}
                                </div>
                              </div>

                              <div className="px-3 py-3 text-left">
                                <div className="text-[10px] font-bold text-slate-500">
                                  Status
                                </div>
                                <div className="mt-1 text-[13px] font-black text-emerald-700">
                                  {statusText(item.status_code)}
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-slate-200 px-3 py-3 text-left">
                              <div className="text-[10px] font-bold text-slate-500">
                                Legal Entity
                              </div>
                              <div className="mt-1 text-[13px] font-bold leading-6 text-slate-800">
                                {item.entity_name_en || item.entity_name_ar || "-"}
                              </div>
                            </div>

                            {(item.verification_url_en || item.verification_url_ar) && (
                              <div className="border-t border-slate-200 p-3">
                                <a
                                  href={item.verification_url_en || item.verification_url_ar || "#"}
                                  target="_blank"
                                  rel="nofollow noopener noreferrer"
                                  className="inline-flex h-10 w-full items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white"
                                >
                                  Verify Officially
                                </a>
                              </div>
                            )}
                          </div>
                        ))}

                        {broker?.slug && (
                          <Link
                            href={`/en/brokers/${broker.slug}`}
                            className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-sm font-black text-brand-600"
                          >
                            View Broker Review
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
                    View All Results
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-r from-white via-brand-50/40 to-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-6 text-left md:px-8">
            <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500"></div>

            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Browse Forex Brokers by Regulator
            </h2>

            <p className="mt-3 max-w-4xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
              Filter brokers by the financial authority that supervises their legal entity,
              including FCA, CySEC, ASIC, FSCA and other global regulators.
            </p>
          </div>

          <div className="grid auto-rows-fr gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4 md:p-5">
           {regulators.slice(0, 8).map((item) => {
  const regulatorSlug: Record<string, string> = {
    FCA: "fca",
    CySEC: "cysec",
    ASIC: "asic",
    DFSA: "dfsa",
    FSCA: "fsca",
    FSA: "fsa",
    SCB: "scb",
    FSC: "fsc",
  };

  return (
<Link
  key={item.code}
  href={`/en/licenses/${regulatorSlug[item.code] || item.code.toLowerCase()}`}
  target="_blank"
  rel="noopener noreferrer"
  className="group flex h-full min-h-[214px] flex-col rounded-[20px] border border-brand-100 bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-[2px] hover:border-brand-200 hover:shadow-[0_10px_24px_rgba(59,130,246,0.12)] md:rounded-[22px] md:p-4"
>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-9 min-w-12 items-center justify-center rounded-[13px] bg-brand-50 px-3 text-[13px] font-black text-brand-600 md:h-10 md:min-w-14 md:rounded-[14px] md:text-sm">
                    {item.code}
                  </span>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700 md:px-3 md:text-[11px]">
  {item.count} regulated {plural(item.count, "broker", "brokers")}
</span>
                </div>

                <h3 className="mt-3 text-[17px] font-black leading-7 text-slate-950 md:mt-4 md:text-[18px]">
                  {item.name}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-[12px] leading-6 text-slate-600 md:mt-2 md:text-[13px] md:leading-7">
  {item.description}
</p>

<div className="mt-auto pt-3 text-[12px] font-black text-brand-600">
  View regulated brokers →
</div>
</Link>
);
})}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 text-left md:px-8">
            <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500"></div>

            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              How to Read Forex Broker Licenses Correctly
            </h2>

            <p className="mt-3 max-w-5xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
              A license is important, but it is not the end of due diligence. Traders
              should understand the legal entity, the supervising regulator, the jurisdiction
              and whether the license is connected to the account they will actually open.
            </p>
          </div>

          <div className="hidden p-5 text-left md:block">
            <div className="grid auto-rows-fr gap-4 lg:grid-cols-3">
              {[
                {
                  number: "1",
                  title: "Start with the legal entity, not only the brand name",
                  text: "Many brokers use one public trading brand while operating through several legal entities in different jurisdictions. When checking a forex broker license, match the legal entity in the regulatory register with the entity that will open your trading account.",
                  mobileText: "Match the legal entity in the regulator register with the entity that opens your account.",
                },
                {
                  number: "2",
                  title: "Do not treat every license as equally strong",
                  text: "Regulators differ in capital requirements, client money segregation, complaints handling, compensation schemes and ongoing supervision. A top-tier license is not the same as a lighter offshore license.",
                  mobileText: "Regulators differ in client money rules, supervision and investor protection.",
                },
                {
                  number: "3",
                  title: "Verify the license number from the official source",
                  text: "The safest way to check a broker license is to use the official regulator register or the verification link when available. A license number shown on a broker website is not enough unless it can be confirmed from the regulator itself.",
                  mobileText: "Do not rely only on a broker website. Verify the number on the regulator website.",
                },
                {
                  number: "4",
                  title: "Check which entity will hold your real account",
                  text: "Some brokers display several strong licenses, but clients in a specific country may be onboarded under another entity. The account-opening entity can affect the level of protection you receive.",
                  mobileText: "Your protection depends on the entity that actually opens your account.",
                },
                {
                  number: "5",
                  title: "Regulation does not replace trading-condition comparison",
                  text: "Even when a broker is regulated, compare spreads, commissions, platforms, deposits, withdrawals, execution, account types and support. A license adds trust, but it does not guarantee the best trading conditions.",
                  mobileText: "After checking regulation, compare fees, platforms, withdrawals and account types.",
                },
                {
                  number: "6",
                  title: "Why we built this broker license database",
                  text: "Many broker review pages mention regulators without organizing license numbers, legal entities and verification links in one place. Broker Alarab connects broker reviews, comparisons and regulation data into a structured database.",
                  mobileText: "The database connects licenses, regulators, legal entities and official verification links.",
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

                    <div className="min-w-0 flex-1 text-left">
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

            <div className="mt-5 rounded-[24px] border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-5 shadow-sm">
              <h3 className="text-[22px] font-black text-slate-950">
                Key takeaway before choosing a forex broker
              </h3>

              <p className="mt-3 text-[15px] leading-8 text-slate-700">
                Regulation should be the first step in broker due diligence, not the only
                step. Search the broker, review the legal entity, confirm the license number,
                then read the full broker review to compare fees, platforms, withdrawals and support.
              </p>
            </div>
          </div>

          <div className="space-y-2 bg-white p-3.5 md:hidden">
            {[
              {
                number: "1",
                title: "Start with the legal entity",
                mobileText: "Match the legal entity in the regulator register with the entity that opens your account.",
              },
              {
                number: "2",
                title: "Not all licenses are equal",
                mobileText: "Regulators differ in client money rules, supervision and investor protection.",
              },
              {
                number: "3",
                title: "Verify from the official source",
                mobileText: "Do not rely only on a broker website. Verify the number on the regulator website.",
              },
              {
                number: "4",
                title: "Check your real account entity",
                mobileText: "Your protection depends on the entity that actually opens your account.",
              },
              {
                number: "5",
                title: "Compare trading conditions",
                mobileText: "After checking regulation, compare fees, platforms, withdrawals and account types.",
              },
              {
                number: "6",
                title: "Why we built this database",
                mobileText: "The database connects licenses, regulators, legal entities and official verification links.",
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

                  <div className="min-w-0 flex-1 text-left">
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
                Quick takeaway
              </h3>

              <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-600">
                Start with regulation, confirm the legal entity, then compare fees and trading conditions before opening an account.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 text-left md:px-8">
            <div className="mb-4 h-1.5 w-16 rounded-full bg-brand-500"></div>

            <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
              What to Do After Checking a Broker License
            </h2>

            <p className="mt-3 max-w-4xl text-[15px] leading-8 text-slate-600">
              Regulation is a starting point. The better decision comes from reviewing the
              full trading conditions before opening an account.
            </p>
          </div>

          <div className="grid gap-3 bg-white p-3.5 md:grid-cols-2 md:p-5">
            {[
              { number: "1", text: "Confirm the legal entity that will open your account" },
              { number: "2", text: "Compare spreads, commissions and account conditions" },
              { number: "3", text: "Check deposit and withdrawal methods in your country" },
              { number: "4", text: "Read the full broker review before opening an account" },
            ].map((item) => (
              <div
                key={item.number}
               className="rounded-[18px] border border-brand-100 bg-white px-3.5 py-3.5 shadow-[0_5px_16px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.08)] md:rounded-[20px] md:p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-600 ring-1 ring-[#bfdbfe] md:h-9 md:w-9">
                    {item.number}
                  </span>

                  <div className="min-w-0 flex-1 text-left">
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
        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 text-left md:px-8 md:py-6">
            <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500"></div>

            <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
              Helpful Pages After Checking Regulation
            </h2>

            <p className="mt-2 max-w-4xl text-[13px] leading-7 text-slate-600 md:mt-3 md:text-[15px] md:leading-8">
              After reviewing a broker license, continue with broker reviews, comparisons
              and best-broker lists to choose a suitable trading account.
            </p>
          </div>

          <div className="grid gap-3 p-3.5 md:grid-cols-3 md:p-5">
            {[
              {
                title: "Best Forex Brokers",
                desc: "Broker lists ranked by country, account type and trader needs.",
                href: "/en/best-brokers",
                number: "1",
              },
              {
                title: "Broker Reviews",
                desc: "Detailed reviews covering regulation, fees, platforms and withdrawals.",
                href: "/en/brokers",
                number: "2",
              },
              {
                title: "Compare Brokers",
                desc: "Compare two brokers side by side before opening an account.",
                href: "/en/compare",
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

                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="text-[15px] font-black leading-6 text-[#07111f] transition group-hover:text-brand-600 md:text-[17px] md:leading-7">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-600 md:mt-1.5 md:text-[13px] md:leading-6">
                      {item.desc}
                    </p>

                    <div className="mt-2 text-[11px] font-black text-brand-600 md:mt-3 md:text-[13px]">
                      Continue →
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
          <div className="border-b border-slate-200 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 text-left md:px-8">
            <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500"></div>

            <h2 className="text-[22px] font-black leading-tight text-slate-950 md:text-3xl">
              Forex Broker License FAQ
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

                    <h3 className="min-w-0 flex-1 text-left text-[15px] font-black leading-6 text-[#07111f] md:text-[16px]">
                      {item.q}
                    </h3>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-sm font-black text-brand-600 transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>

                <div className="border-t border-slate-200 bg-white px-4 py-4 text-left">
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