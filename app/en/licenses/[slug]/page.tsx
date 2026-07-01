import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://brokeralarab.com";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type FAQItem = { q: string; a: string };

type Regulator = {
  id: number;
  slug: string;
  code: string;
  short_name: string;
  name_ar: string;
  name_en: string;
  country_ar: string | null;
  country_en: string | null;
  country_code: string | null;
  website_url: string | null;
  register_url: string | null;
  founded_year: number | null;
  strength_score: number | null;
  strength_label_ar: string | null;
  strength_label_en: string | null;
  segregated_funds: boolean | null;
  negative_balance_protection: boolean | null;
  investor_compensation_ar: string | null;
  investor_compensation_en: string | null;
  h1_ar: string | null;
  h1_en: string | null;
  meta_title_ar: string | null;
  meta_title_en: string | null;
  meta_description_ar: string | null;
  meta_description_en: string | null;
  intro_ar: string | null;
  intro_en: string | null;
  about_ar: string | null;
  about_en: string | null;
  why_strong_ar: string | null;
  why_strong_en: string | null;
  verification_steps_ar: string | null;
  verification_steps_en: string | null;
  advantages_ar: string | null;
  advantages_en: string | null;
  disadvantages_ar: string | null;
  disadvantages_en: string | null;
  conclusion_ar: string | null;
  conclusion_en: string | null;
  faq_ar: FAQItem[] | null;
  faq_en: FAQItem[] | null;
};

type License = {
  id: number;
  broker_id: number;
  regulator_code: string;
  license_number: string | null;
  entity_name_ar?: string | null;
  entity_name_en?: string | null;
  status_code: string;
  verification_url_ar?: string | null;
  verification_url_en?: string | null;
  last_verified?: string | null;
};

type Broker = {
  id: number;
  name: string;
  name_en?: string | null;
  slug: string | null;
  logo: string | null;
  rating?: number | null;
  real_account_url?: string | null;
};

async function getRegulator(slug: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("regulators")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  return data as Regulator | null;
}

async function getPageData(slug: string) {
  const supabase = await createClient();
  const regulator = await getRegulator(slug);

  if (!regulator) return null;

  const { data: licensesData } = await supabase
    .from("broker_licenses")
    .select("*")
    .eq("is_active", true)
    .eq("regulator_code", regulator.code)
    .order("broker_id", { ascending: true });

  const licenses = (licensesData || []) as License[];

  const brokerIds = Array.from(new Set(licenses.map((item) => item.broker_id)));

  const { data: brokersData } = brokerIds.length
    ? await supabase
        .from("brokers")
        .select("id,name,name_en,slug,logo,rating,real_account_url")
        .in("id", brokerIds)
    : { data: [] };

  return {
    regulator,
    licenses,
    brokers: (brokersData || []) as Broker[],
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const regulator = await getRegulator(slug);

  if (!regulator) {
    return {
      title: "License Not Found",
      robots: { index: false, follow: false },
    };
  }

  const pageUrl = `${BASE_URL}/en/licenses/${regulator.slug}`;

  return {
    title:
      regulator.meta_title_en ||
      `${regulator.short_name} License | Regulated Forex and CFD Brokers`,
    description:
      regulator.meta_description_en ||
      `A complete guide to the ${regulator.short_name} license, how to verify regulated brokers, and key companies licensed by this regulator.`,
    alternates: { canonical: pageUrl },
    openGraph: {
      title:
        regulator.meta_title_en ||
        `${regulator.short_name} License | Regulated Forex and CFD Brokers`,
      description:
        regulator.meta_description_en ||
        `Learn about the ${regulator.short_name} license and how to verify brokers regulated by this authority.`,
      url: pageUrl,
      siteName: "Broker Al Arab",
      locale: "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

function paragraphs(text?: string | null) {
  return (text || "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function BrokerLogo({ broker }: { broker?: Broker }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-brand-100 bg-white shadow-[0_4px_14px_rgba(59,130,246,0.08)] md:h-12 md:w-12">
      {broker?.logo ? (
        <Image
          src={broker.logo}
          alt={broker.name_en || broker.name}
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      ) : (
        <span className="text-xs font-black text-slate-500">
          {(broker?.name_en || broker?.name)?.slice(0, 2) || "BA"}
        </span>
      )}
    </div>
  );
}

function statusText(status?: string) {
  if (status === "active") return "Active";
  if (status === "inactive") return "Inactive";
  return "Not specified";
}

function yesNo(value?: boolean | null) {
  return value ? "Yes" : "Not specified";
}

function formatDate(value?: string | null) {
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

function TextContent({ text }: { text?: string | null }) {
  const items = paragraphs(text);

  if (!items.length) return null;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <p
          key={item}
          className="text-[15px] font-semibold leading-8 text-slate-600 md:text-[16px] md:leading-9"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

function MobileExpandableText({ text }: { text?: string | null }) {
  const items = paragraphs(text);

  if (!items.length) return null;

  const fullText = items.join(" ");

  return (
    <details className="group md:hidden">
      <summary className="list-none cursor-pointer">
        <p className="overflow-hidden text-[14px] font-semibold leading-7 text-slate-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] group-open:block group-open:overflow-visible">
          {fullText}
        </p>

        <div className="mt-3 flex justify-center">
          <span className="inline-flex h-9 min-w-[150px] items-center justify-center rounded-2xl border border-brand-100 bg-white px-6 text-[13px] font-black text-brand-600 shadow-sm">
            <span className="group-open:hidden">Read more</span>
            <span className="hidden group-open:inline">Show less</span>
          </span>
        </div>
      </summary>
    </details>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-5 text-left md:px-8 md:py-6">
      <div className="mb-4 h-1.5 w-20 rounded-full bg-brand-500" />
      <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-5xl text-[14px] font-semibold leading-7 text-slate-600 md:text-[15px] md:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default async function LicenseSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) notFound();

  const { regulator, licenses, brokers } = data;

  const brokerMap = new Map<number, Broker>();
  brokers.forEach((broker) => brokerMap.set(broker.id, broker));

  const brokerGroups = Array.from(
    new Map(
      licenses.map((license) => [
        license.broker_id,
        {
          broker: brokerMap.get(license.broker_id),
          licenses: licenses.filter((item) => item.broker_id === license.broker_id),
        },
      ])
    ).values()
  ).sort((a, b) => {
    const ratingA = a.broker?.rating ?? 0;
    const ratingB = b.broker?.rating ?? 0;

    if (ratingB !== ratingA) return ratingB - ratingA;
    return b.licenses.length - a.licenses.length;
  });

  const pageUrl = `${BASE_URL}/en/licenses/${regulator.slug}`;
  const faqItems = Array.isArray(regulator.faq_en) ? regulator.faq_en : [];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/en` },
      {
        "@type": "ListItem",
        position: 2,
        name: "License Guide",
        item: `${BASE_URL}/en/licenses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: regulator.short_name,
        item: pageUrl,
      },
    ],
  };

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#regulated-brokers`,
    name: `Brokers Regulated by ${regulator.short_name}`,
    numberOfItems: brokerGroups.length,
    itemListElement: brokerGroups.slice(0, 20).map((group, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialService",
        name: group.broker?.name_en || group.broker?.name || "Broker",
        alternateName: group.broker?.name || undefined,
        url: group.broker?.slug
          ? `${BASE_URL}/en/brokers/${group.broker.slug}`
          : pageUrl,
        image: group.broker?.logo || undefined,
      },
    })),
  };

    const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name:
      regulator.meta_title_en ||
      `${regulator.short_name} License for Forex and CFD Brokers`,
    description:
      regulator.meta_description_en ||
      `Learn about the ${regulator.short_name} license, how to verify brokers, and what this regulator means for traders.`,
    inLanguage: "en",
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    about: {
      "@type": "GovernmentOrganization",
      name: regulator.name_en,
      alternateName: regulator.short_name,
      url: regulator.website_url || pageUrl,
    },
    mainEntity: {
      "@id": `${pageUrl}#regulated-brokers`,
    },
  };

    const regulatorSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "@id": `${pageUrl}#regulator`,
    name: regulator.name_en,
    alternateName: regulator.short_name,
    url: regulator.website_url || pageUrl,
    foundingDate: regulator.founded_year
      ? String(regulator.founded_year)
      : undefined,
    areaServed: regulator.country_en || undefined,
    sameAs: regulator.website_url ? [regulator.website_url] : undefined,
  };

    return (
    <main className="bg-slate-50" dir="ltr">
      <Script
        id="license-slug-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {faqSchema && (
        <Script
          id="license-slug-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

            <Script
        id="license-slug-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Script
        id="license-slug-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <Script
        id="license-slug-regulator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regulatorSchema) }}
      />

      <section className="mx-auto max-w-7xl px-2.5 pb-4 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[24px] border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-slate-50 shadow-sm md:rounded-[30px]">
          <div className="px-4 py-6 text-center md:px-12 md:py-8">
            <div className="mx-auto mb-4 inline-flex rounded-full border border-brand-100 bg-white px-4 py-2 text-[12px] font-black text-brand-600 shadow-sm">
              Financial Regulator Guide
            </div>

            <h1 className="mx-auto max-w-5xl text-[28px] font-black leading-[1.15] tracking-tight text-slate-950 md:text-[44px] md:leading-[1.25]">
              {regulator.h1_en ||
                `${regulator.short_name} License for Forex and CFD Brokers`}
            </h1>

            <p className="mx-auto mt-4 max-w-4xl text-[14px] font-semibold leading-7 text-slate-700 md:text-[17px] md:leading-9">
              {regulator.intro_en ||
                `Learn about the ${regulator.short_name} license, its regulatory strength, how to verify it, and the main brokers licensed by this authority.`}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                "Official register checked",
                "Last updated: June 2026",
                `${brokerGroups.length} regulated brokers`,
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[12px] font-black text-brand-600 shadow-sm"
                >
                  ✓ {item}
                </span>
              ))}
            </div>

            <div className="mx-auto mt-5 grid max-w-3xl grid-cols-2 gap-2.5 md:mt-6 md:grid-cols-4 md:gap-3">
              {[
                [
                  "License strength",
                  regulator.strength_score ? `${regulator.strength_score}/5` : "-",
                ],
                ["Licenses", licenses.length],
                ["Brokers", brokerGroups.length],
                ["Founded", regulator.founded_year || "-"],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="rounded-[16px] border border-brand-100 bg-white px-3 py-3 shadow-sm md:rounded-[18px] md:py-4"
                >
                  <div className="text-2xl font-black text-brand-600">
                    {value}
                  </div>

                  {label === "License strength" && (
                    <div className="mt-0.5 text-[10px] font-black text-amber-400">
                      ★★★★★
                    </div>
                  )}

                  <div className="mt-1 text-[11px] font-black text-slate-500">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="#regulated-brokers"
                className="inline-flex h-11 min-w-[230px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-black text-white transition hover:bg-brand-600"
              >
                View regulated brokers
              </a>

              {regulator.register_url && (
                <a
                  href={regulator.register_url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex h-11 min-w-[210px] items-center justify-center rounded-2xl border border-brand-100 bg-white px-6 text-sm font-black text-brand-600 transition hover:bg-brand-50"
                >
                  Official register link
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-3 pb-6 md:px-6 lg:grid-cols-12 lg:px-8">
        <article className="order-2 lg:order-1 lg:col-span-8">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <SectionTitle
              title={`What is the ${regulator.short_name} license?`}
              description="A simple explanation of the regulator, the strength of the license, and what to check before opening an account."
            />

            <div className="space-y-5 p-5 text-left md:p-8">
              <div className="hidden md:block">
                <TextContent text={regulator.about_en} />
              </div>

              <MobileExpandableText text={regulator.about_en} />

              {regulator.why_strong_en && (
                <div className="rounded-[24px] border border-brand-100 bg-brand-50 p-5">
                  <h3 className="text-xl font-black text-slate-950">
                    Why is the {regulator.short_name} license important?
                  </h3>

                  <div className="mt-3 hidden md:block">
                    <TextContent text={regulator.why_strong_en} />
                  </div>

                  <div className="mt-3">
                    <MobileExpandableText text={regulator.why_strong_en} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>

        <aside className="order-1 lg:order-2 lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-brand-50 px-5 py-5 text-left">
                <h2 className="text-xl font-black text-slate-950">
                  {regulator.short_name} Information Card
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                {[
                  [
                    "Full name",
                    regulator.name_en?.replace(
                      new RegExp(`\\s*${regulator.short_name}$`),
                      ""
                    ) || "-",
                    false,
                  ],
                  ["Short name", regulator.short_name, false],
                  ["Country", regulator.country_en || "-", false],
                  ["Founded", regulator.founded_year || "-", false],
                  [
                    "Strength",
                    regulator.strength_score
                      ? `${regulator.strength_label_en || "Strong"} - ${regulator.strength_score}/5`
                      : regulator.strength_label_en || "-",
                    false,
                  ],
                  ["Segregated funds", yesNo(regulator.segregated_funds), false],
                  [
                    "Negative balance protection",
                    yesNo(regulator.negative_balance_protection),
                    false,
                  ],
                  [
                    "Investor compensation",
                    regulator.investor_compensation_en || "-",
                    true,
                  ],
                ].map(([label, value, isNote]) => (
                  <div
                    key={String(label)}
                    className={
                      isNote
                        ? "px-4 py-3 text-left md:px-5 md:py-3.5"
                        : "grid grid-cols-[120px_1fr] items-start gap-3 px-4 py-3 text-left md:flex md:items-start md:justify-between md:px-5 md:py-3.5"
                    }
                  >
                    <div className="text-[12px] font-black leading-6 text-slate-500">
                      {label}
                    </div>

                    <div
                      className={
                        isNote
                          ? "mt-1 rounded-xl bg-slate-50 px-3 py-2 text-[12px] font-black leading-6 text-slate-950 md:text-[13px]"
                          : "text-left text-[12px] font-black leading-6 text-slate-950 md:max-w-[70%] md:text-[13px]"
                      }
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-2 border-t border-slate-200 p-4">
                {regulator.website_url && (
                  <a
                    href={regulator.website_url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-brand-100 bg-white text-sm font-black text-brand-600 transition hover:bg-brand-50"
                  >
                    Official website
                  </a>
                )}

                {regulator.register_url && (
                  <a
                    href={regulator.register_url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white transition hover:bg-brand-600"
                  >
                    Official register
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-5 text-left shadow-sm">
              <h3 className="text-lg font-black text-slate-950">
                Complete License Guide
              </h3>

              <p className="mt-2 text-[13px] font-semibold leading-7 text-slate-600">
                Compare global financial regulators, understand the strength of
                each license, and view brokers regulated by each authority.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] font-black">
                {[
                  { code: "FCA", href: "/en/licenses/fca" },
                  { code: "ASIC", href: "/en/licenses/asic" },
                  { code: "CySEC", href: "/en/licenses/cysec" },
                  { code: "DFSA", href: "/en/licenses/dfsa" },
                ].map((item) => (
                  <Link
                    key={item.code}
                    href={item.href}
                    className="rounded-xl border border-brand-100 bg-white px-3 py-2 text-center text-brand-600 transition hover:border-brand-300 hover:bg-brand-50"
                  >
                    {item.code}
                  </Link>
                ))}
              </div>

              <Link
                href="/en/licenses"
                className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white transition hover:bg-brand-600"
              >
                View license guide →
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section
        id="regulated-brokers"
        className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8"
      >
        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-sm">
          <SectionTitle
            title={`Brokers regulated by ${regulator.short_name}`}
            description="A list of brokers in the Broker Al Arab database with license numbers, legal entities, and official verification links where available."
          />

          {brokerGroups.length === 0 ? (
            <div className="p-5">
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                <h3 className="text-xl font-black text-slate-950">
                  No brokers added yet
                </h3>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 bg-slate-50/60 p-4 md:p-5">
              {brokerGroups.map((group) => {
                const broker = group.broker;

                return (
                  <details
                    key={broker?.id || group.licenses[0]?.broker_id}
                    className="group overflow-hidden rounded-[22px] border border-brand-100 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)] md:rounded-[24px] md:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                    open={brokerGroups.length <= 3}
                  >
                    <summary className="list-none cursor-pointer border-b border-slate-200 bg-white px-3 py-3 md:px-5 md:py-3.5">
                      {/* Mobile */}
                      <div className="grid grid-cols-[44px_1fr] items-center gap-3 md:hidden">
                        <BrokerLogo broker={broker} />

                        <div className="min-w-0 text-left">
                          {broker?.slug ? (
                            <Link
                              href={`/en/brokers/${broker.slug}`}
                              className="block truncate text-[18px] font-black leading-6 text-slate-950"
                            >
                              {broker.name_en || broker.name}
                            </Link>
                          ) : (
                            <div className="truncate text-[18px] font-black leading-6 text-slate-950">
                              {broker?.name_en || broker?.name || "Broker"}
                            </div>
                          )}

                          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-500">
                            <span className="max-w-[110px] truncate text-[11px] font-black text-slate-500">
                              {broker?.name_en || broker?.slug || "Broker"}
                            </span>

                            {broker?.rating ? (
                              <span className="rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-700">
                                ⭐ {broker.rating}
                              </span>
                            ) : null}

                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700">
                              {group.licenses.length} license
                              {group.licenses.length === 1 ? "" : "s"}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-2 grid grid-cols-[1fr_1fr_36px] gap-2">
                          {broker?.slug && (
                            <Link
                              href={`/en/brokers/${broker.slug}`}
                              className="flex h-9 items-center justify-center rounded-xl border border-brand-100 bg-white px-2 text-[12px] font-black text-brand-600"
                            >
                              Review
                            </Link>
                          )}

                          {broker?.real_account_url && (
                            <a
                              href={broker.real_account_url}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              className="flex h-9 items-center justify-center rounded-xl bg-brand-500 px-2 text-[12px] font-black text-white"
                            >
                              Open account
                            </a>
                          )}

                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-xs font-black text-brand-600 transition group-open:rotate-180">
                            ▼
                          </span>
                        </div>
                      </div>
                                            {/* Desktop */}
                      <div className="hidden md:flex md:items-center md:justify-between">
                        <div className="flex items-center gap-3 text-left">
                          <BrokerLogo broker={broker} />

                          <div className="min-w-0">
                            {broker?.slug ? (
                              <Link
                                href={`/en/brokers/${broker.slug}`}
                                className="block text-[20px] font-black leading-normal text-slate-950 transition hover:text-brand-600 hover:underline"
                              >
                                {broker.name_en || broker.name}
                              </Link>
                            ) : (
                              <div className="text-[20px] font-black leading-normal text-slate-950">
                                {broker?.name_en || broker?.name || "Broker"}
                              </div>
                            )}

                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                              <span className="text-[12px] font-black text-slate-500">
                                {broker?.name_en || broker?.slug || "Broker"}
                              </span>

                              {broker?.rating ? (
                                <span className="rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700">
                                  ⭐ {broker.rating}
                                </span>
                              ) : null}

                              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700">
                                {group.licenses.length} license
                                {group.licenses.length === 1 ? "" : "s"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {broker?.slug && (
                            <Link
                              href={`/en/brokers/${broker.slug}`}
                              className="inline-flex h-10 items-center justify-center rounded-2xl border border-brand-100 bg-white px-4 text-sm font-black text-brand-600 transition hover:bg-brand-50"
                            >
                              View review →
                            </Link>
                          )}

                          {broker?.real_account_url && (
                            <a
                              href={broker.real_account_url}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              className="inline-flex h-10 items-center justify-center rounded-2xl bg-brand-500 px-4 text-sm font-black text-white transition hover:bg-brand-600"
                            >
                              Open account →
                            </a>
                          )}

                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-sm font-black text-brand-600 transition group-open:rotate-180">
                            ▼
                          </span>
                        </div>
                      </div>
                    </summary>

                    <div className="hidden md:block">
                      <table className="min-w-full text-left">
                        <thead className="bg-brand-50/40">
                          <tr className="text-[12px] font-black text-slate-500">
                            <th className="px-5 py-3">License number</th>
                            <th className="px-5 py-3">Legal entity</th>
                            <th className="px-5 py-3 text-center">Status</th>
                            <th className="px-8 py-3 text-center">
                              Official verification
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {group.licenses.map((item) => (
                            <tr
                              key={item.id}
                              className="transition hover:bg-slate-50"
                            >
                              <td className="px-5 py-4">
                                <div className="inline-flex rounded-full bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">
                                  {item.license_number || "Not available"}
                                </div>
                              </td>

                              <td className="max-w-[360px] px-5 py-4 text-sm font-bold leading-6 text-slate-700">
                                {item.entity_name_en ||
                                  item.entity_name_ar ||
                                  "-"}
                              </td>

                              <td className="px-5 py-4 text-center">
                                <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                  {statusText(item.status_code)}
                                </span>
                              </td>

                              <td className="px-8 py-4 text-center">
                                {item.verification_url_en ||
                                item.verification_url_ar ? (
                                  <a
                                    href={
                                      item.verification_url_en ||
                                      item.verification_url_ar ||
                                      "#"
                                    }
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-500 px-5 text-xs font-black text-white transition hover:bg-brand-600"
                                  >
                                    Verify officially
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
                    </div>

                    <div className="space-y-2 p-3 md:hidden">
                      {group.licenses.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-brand-100 bg-white p-3 shadow-sm"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-xl bg-brand-50/60 px-3 py-2 text-center">
                              <div className="text-[10px] font-black text-slate-500">
                                License number
                              </div>
                              <div className="mt-0.5 truncate text-[12px] font-black text-slate-950">
                                {item.license_number || "-"}
                              </div>
                            </div>

                            <div className="rounded-xl bg-brand-50/60 px-3 py-2 text-center">
                              <div className="text-[10px] font-black text-slate-500">
                                Status
                              </div>
                              <div className="mt-0.5 text-[12px] font-black text-emerald-700">
                                {statusText(item.status_code)}
                              </div>
                            </div>
                          </div>

                          <div className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-left">
                            <div className="text-[10px] font-black text-slate-500">
                              Legal entity
                            </div>
                            <div className="mt-0.5 line-clamp-2 text-[12px] font-bold leading-5 text-slate-800">
                              {item.entity_name_en ||
                                item.entity_name_ar ||
                                "-"}
                            </div>
                          </div>

                          {(item.verification_url_en ||
                            item.verification_url_ar) && (
                            <a
                              href={
                                item.verification_url_en ||
                                item.verification_url_ar ||
                                "#"
                              }
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-xl bg-brand-500 text-[12px] font-black text-white"
                            >
                              Verify officially
                            </a>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-[12px] font-bold text-slate-500">
                      Last license data check:{" "}
                      <span className="font-black text-slate-700">
                        {formatDate(
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
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <SectionTitle title={`How to verify a ${regulator.short_name} license?`} />

          <div className="border-b border-slate-200 bg-brand-50/40 p-3.5 md:p-6">
            <h3 className="text-xl font-black leading-7 text-slate-950 md:text-2xl">
              Search steps in the {regulator.short_name} register
            </h3>

            <div className="mt-4 grid gap-2.5 md:grid-cols-3 md:gap-4">
              {[
                {
                  step: "1",
                  title: "Open the official register",
                  text: "Go to the regulator’s official website or register.",
                },
                {
                  step: "2",
                  title: "Search for the company",
                  text: "Use the company name or license number.",
                },
                {
                  step: "3",
                  title: "Match the details",
                  text: "Check the legal entity and license status.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-brand-100 bg-white p-3.5 text-left shadow-sm md:p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-xs font-black text-white md:h-9 md:w-9 md:text-sm">
                      {item.step}
                    </div>

                    <h4 className="text-[15px] font-black text-slate-950 md:text-[16px]">
                      {item.title}
                    </h4>
                  </div>

                  <p className="mt-2 text-[12px] font-semibold leading-6 text-slate-600 md:mt-3 md:text-[13px] md:leading-7">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 p-5 text-left md:grid-cols-3 md:p-8">
            <div className="md:col-span-2">
              <div className="hidden md:block">
                <TextContent text={regulator.verification_steps_en} />
              </div>

              <MobileExpandableText text={regulator.verification_steps_en} />
            </div>

            <div className="rounded-[22px] border border-brand-100 bg-brand-50/70 p-4 md:p-5">
              <h3 className="text-xl font-black text-slate-950">
                Do not rely on the logo only
              </h3>

              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                A regulator logo on a broker website is not enough. Always
                verify the license number and legal entity through the official
                register.
              </p>

              {regulator.register_url && (
                <a
                  href={regulator.register_url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white transition hover:bg-brand-600"
                >
                  Open {regulator.short_name} register
                </a>
              )}

              <Link
                href="/en/licenses"
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-brand-100 bg-white text-sm font-black text-brand-600 transition hover:bg-brand-50"
              >
                View all licenses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-3 pb-6 md:px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-sm">
          <SectionTitle title={`${regulator.short_name} license advantages`} />
          <div className="p-5 text-left md:p-7">
            <div className="hidden md:block">
              <TextContent text={regulator.advantages_en} />
            </div>

            <MobileExpandableText text={regulator.advantages_en} />
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <SectionTitle title="Important points to watch" />
          <div className="p-5 text-left md:p-7">
            <div className="hidden md:block">
              <TextContent text={regulator.disadvantages_en} />
            </div>

            <MobileExpandableText text={regulator.disadvantages_en} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-r from-brand-50 to-white shadow-sm">
          <div className="p-5 text-left md:p-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Final thoughts on the {regulator.short_name} license
            </h2>

            <div className="mt-4 hidden md:block">
              <TextContent text={regulator.conclusion_en} />
            </div>

            <div className="mt-4">
              <MobileExpandableText text={regulator.conclusion_en} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-sm">
          <SectionTitle
            title="Quick comparison between major licenses"
            description="A short comparison to help you understand the strength of each regulator before choosing a broker."
          />

          <div className="grid grid-cols-2 gap-2 bg-slate-50/60 p-3 md:grid-cols-4 md:gap-3 md:p-5">
            {[
              {
                name: "FCA",
                strength: "5/5",
                stars: "★★★★★",
                country: "United Kingdom",
                note: "Top-tier regulator",
                href: "/en/licenses/fca",
              },
              {
                name: "ASIC",
                strength: "4.5/5",
                stars: "★★★★☆",
                country: "Australia",
                note: "Globally strong",
                href: "/en/licenses/asic",
              },
              {
                name: "CySEC",
                strength: "4.5/5",
                stars: "★★★★☆",
                country: "Cyprus",
                note: "EU regulated",
                href: "/en/licenses/cysec",
              },
              {
                name: "DFSA",
                strength: "4/5",
                stars: "★★★★☆",
                country: "Dubai",
                note: "Important for GCC",
                href: "/en/licenses/dfsa",
              },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group rounded-[16px] border border-brand-100 bg-white p-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md md:rounded-[20px] md:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[17px] font-black text-slate-950 transition group-hover:text-brand-600 md:text-xl">
                      {item.name}
                    </div>
                    <div className="mt-1 text-[12px] font-bold text-slate-500">
                      {item.country}
                    </div>
                  </div>

                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                    {item.strength}
                  </span>
                </div>

                <div className="mt-2 text-[12px] font-black text-amber-500 md:mt-4 md:text-[13px]">
                  {item.stars}
                </div>

                <div className="mt-3 rounded-2xl bg-slate-50 px-3 py-2 text-center text-[12px] font-black text-slate-600">
                  {item.note}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {faqItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <SectionTitle
              title={`Frequently asked questions about the ${regulator.short_name} license`}
            />

            <div className="grid gap-3 bg-white p-3.5 md:p-5">
              {faqItems.map((item, index) => (
                <details
                  key={item.q}
                  className="group rounded-[18px] border border-brand-100 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md md:rounded-[24px] md:p-5"
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
      )}

      <section className="mx-auto max-w-7xl px-3 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] shadow-sm">
          <SectionTitle title="Other regulatory licenses" />

          <div className="grid gap-3 p-3.5 md:grid-cols-3 md:p-5 lg:grid-cols-5">
            {[
              {
                slug: "fca",
                title: "FCA License",
                desc: "Learn about the UK financial regulator.",
              },
              {
                slug: "asic",
                title: "ASIC License",
                desc: "Review the Australian regulatory license.",
              },
              {
                slug: "cysec",
                title: "CySEC License",
                desc: "Learn about the Cyprus EU license.",
              },
              {
                slug: "dfsa",
                title: "DFSA License",
                desc: "Learn about Dubai’s financial regulator.",
              },
              {
                slug: "fsc",
                title: "FSC License",
                desc: "Review the British Virgin Islands license.",
              },
              {
                slug: "fsa",
                title: "FSA License",
                desc: "Learn about the Seychelles regulator.",
              },
              {
                slug: "scb",
                title: "SCB License",
                desc: "Learn about the Bahamas regulator.",
              },
              {
                slug: "fsca",
                title: "FSCA License",
                desc: "Learn about South Africa’s regulator.",
              },
            ]
              .filter((item) => item.slug !== regulator.slug)
              .slice(0, 5)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/en/licenses/${item.slug}`}
                  className="group flex min-h-[104px] flex-col justify-between rounded-[16px] border border-slate-200 bg-white px-3 py-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)] md:min-h-[132px] md:rounded-[20px] md:p-4"
                >
                  <h3 className="text-[17px] font-black leading-7 text-[#07111f] transition group-hover:text-brand-600">
                    {item.title}
                  </h3>

                  <p className="mt-1 min-h-0 text-[12px] font-semibold leading-5 text-slate-600 md:mt-1.5 md:min-h-[48px] md:text-[13px] md:leading-6">
                    {item.desc}
                  </p>

                  <div className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-[12px] font-black text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                    View now →
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}