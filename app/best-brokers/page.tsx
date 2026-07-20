import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import BestBrokersMobileTabs from "@/app/components/BestBrokersMobileTabs";
import { createClient } from "@/lib/supabase/server";
import CountryBrokerRedirect from "@/app/components/CountryBrokerRedirect";

export const metadata: Metadata = {
  title: "أفضل شركات التداول في 2026 | مقارنة أفضل الوسطاء",
  description:
    "قارن أفضل شركات التداول في 2026 حسب التراخيص والتقييم والتكاليف والمنصات والحد الأدنى للإيداع والحساب الإسلامي، واختر الوسيط الأنسب لبلدك.",
  alternates: {
    canonical: "https://brokeralarab.com/best-brokers",
    languages: {
      ar: "https://brokeralarab.com/best-brokers",
      en: "https://brokeralarab.com/en/best-brokers",
      "x-default": "https://brokeralarab.com/en/best-brokers",
    },
  },
  openGraph: {
    title: "أفضل شركات التداول في 2026 | بروكر العرب",
    description:
      "مقارنة شاملة لأفضل الوسطاء حسب التراخيص والتقييم والإيداع والمنصات والحساب الإسلامي.",
    url: "https://brokeralarab.com/best-brokers",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 820,
        alt: "أفضل شركات التداول في 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أفضل شركات التداول في 2026",
    description:
      "قارن أفضل الوسطاء حسب الترخيص والتقييم والتكاليف والمنصات.",
    images: ["https://brokeralarab.com/og-image.png"],
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
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | string | null;
  min_deposit: number | null;
  best_for: string | null;
  regulation: string | null;
  regulation_short: string | null;
  platforms: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  logo: string | null;
  real_account_url: string | null;
  score_safety: number | null;
  key_strength_ar: string | null;
};

type BrokerLicense = {
  id: number;
  broker_id: number;
  regulator_code: string | null;
  regulator_name_ar: string | null;
  is_active: boolean | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  min_deposit: string | null;
  is_islamic_available: boolean | null;
};

type CountryPage = {
  id: number;
  slug: string;
  country_code: string | null;
  country_name_ar: string;
  flag_emoji: string | null;
  regulator_name: string | null;
};

type ComparisonRow = {
  id: number;
  slug: string;
  title: string | null;
  broker_1_id: number;
  broker_2_id: number;
  views_count: number | null;
};

type PreparedBroker = Broker & {
  licenses: BrokerLicense[];
  accounts: BrokerAccount[];
  active_license_count: number;
  has_islamic_account: boolean;
  lowest_account_deposit: number | null;
};

type RegulatorSummary = {
  code: string;
  name: string;
  brokerCount: number;
};

type UseCasePick = {
  title: string;
  shortTitle: string;
  description: string;
  broker: PreparedBroker;
};

const SITE_URL = "https://brokeralarab.com";

function cleanText(
  value: string | null | undefined,
  fallback = "غير متوفر"
) {
  return value?.trim() || fallback;
}

function numberValue(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function ratingValue(value: number | string | null | undefined) {
  return numberValue(value);
}

function ratingLabel(value: number | string | null | undefined) {
  const rating = ratingValue(value);
  return rating > 0 ? rating.toFixed(1) : "—";
}

function formatDeposit(value: number | null | undefined) {
  if (value === null || value === undefined) return "غير محدد";
  return `$${value.toLocaleString("en-US")}`;
}

function parseDeposit(value: string | null | undefined) {
  if (!value) return null;

  const parsed = Number(value.replace(/[^\d.]/g, ""));

  return Number.isFinite(parsed) ? parsed : null;
}

function isPositiveText(value: string | null | undefined) {
  if (!value) return false;

  const normalized = value.toLowerCase();

  return [
    "yes",
    "true",
    "available",
    "supported",
    "نعم",
    "متوفر",
    "متاح",
    "مدعوم",
  ].some((word) => normalized.includes(word));
}

function getLowestAccountDeposit(accounts: BrokerAccount[]) {
  const deposits = accounts
    .map((account) => parseDeposit(account.min_deposit))
    .filter((value): value is number => value !== null);

  return deposits.length ? Math.min(...deposits) : null;
}

function getDisplayDeposit(broker: PreparedBroker) {
  const deposits = [
    broker.min_deposit,
    broker.lowest_account_deposit,
  ].filter(
    (value): value is number =>
      value !== null && value !== undefined
  );

  return deposits.length ? Math.min(...deposits) : null;
}

function splitItems(value: string | null | undefined, limit = 3) {
  if (!value) return [];

  return value
    .split(/[,|،/]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function buildUniqueUseCases(
  brokers: PreparedBroker[]
): UseCasePick[] {
  const used = new Set<number>();

  const byRating = [...brokers].sort(
    (a, b) => ratingValue(b.rating) - ratingValue(a.rating)
  );

  const bySafety = [...brokers].sort(
    (a, b) =>
      numberValue(b.score_safety, ratingValue(b.rating)) -
      numberValue(a.score_safety, ratingValue(a.rating))
  );

  const byDeposit = [...brokers].sort((a, b) => {
    const depositA = getDisplayDeposit(a) ?? 999999;
    const depositB = getDisplayDeposit(b) ?? 999999;

    if (depositA !== depositB) {
      return depositA - depositB;
    }

    return ratingValue(b.rating) - ratingValue(a.rating);
  });

  const beginnerCandidates = byRating.filter((broker) => {
    const bestFor = (broker.best_for || "").toLowerCase();
    const deposit = getDisplayDeposit(broker);

    return (
      bestFor.includes("beginner") ||
      bestFor.includes("مبتدئ") ||
      (deposit !== null && deposit <= 50)
    );
  });

  const islamicCandidates = byRating.filter(
    (broker) => broker.has_islamic_account
  );

  const arabicCandidates = byRating.filter((broker) =>
    isPositiveText(broker.arabic_support)
  );

  function pick(
    candidates: PreparedBroker[],
    fallback = byRating
  ) {
    const broker =
      candidates.find((item) => !used.has(item.id)) ||
      fallback.find((item) => !used.has(item.id));

    if (broker) {
      used.add(broker.id);
    }

    return broker;
  }

  const rawPicks = [
    {
      title: "الأفضل إجمالًا",
      shortTitle: "أفضل اختيار",
      description:
        "الخيار الأكثر توازنًا بين التقييم والتراخيص والمنصات والتكاليف.",
      broker: pick(byRating),
    },
    {
      title: "الأفضل للمبتدئين",
      shortTitle: "للمبتدئين",
      description:
        "مناسب لمن يبحث عن بداية واضحة وإيداع معقول وتجربة سهلة.",
      broker: pick(beginnerCandidates),
    },
    {
      title: "أفضل حساب إسلامي",
      shortTitle: "حساب إسلامي",
      description:
        "خيار بارز للباحثين عن حساب إسلامي وفق شروط الوسيط.",
      broker: pick(islamicCandidates),
    },
    {
      title: "الأفضل للدعم العربي",
      shortTitle: "دعم عربي",
      description:
        "مناسب لمن يفضل خدمة الحساب والتواصل باللغة العربية.",
      broker: pick(arabicCandidates),
    },
    {
      title: "الأقل في الإيداع",
      shortTitle: "إيداع منخفض",
      description:
        "من أبرز الخيارات للبدء بمبلغ أقل مع مراجعة بقية الشروط.",
      broker: pick(byDeposit),
    },
    {
      title: "الأعلى في الأمان",
      shortTitle: "الأمان",
      description:
        "خيار قوي من حيث التراخيص وتقييم الأمان والرقابة.",
      broker: pick(bySafety),
    },
  ];

  return rawPicks.filter(
    (
      item
    ): item is {
      title: string;
      shortTitle: string;
      description: string;
      broker: PreparedBroker;
    } => Boolean(item.broker)
  );
}

function BrokerLogo({
  broker,
  size = "normal",
}: {
  broker: Pick<Broker, "name" | "logo">;
  size?: "small" | "normal" | "large";
}) {
  const wrapperClasses = {
    small: "h-10 w-10 rounded-xl",
    normal: "h-14 w-14 rounded-2xl",
    large: "h-[72px] w-[72px] rounded-[20px]",
  };

  const imageClasses = {
    small: "h-7 w-7",
    normal: "h-10 w-10",
    large: "h-[52px] w-[52px]",
  };

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white shadow-sm ${wrapperClasses[size]}`}
    >
      {broker.logo ? (
        <div className={`relative ${imageClasses[size]}`}>
          <Image
            src={broker.logo}
            alt={`شعار ${cleanText(
              broker.name,
              "شركة التداول"
            )}`}
            fill
            sizes={
              size === "large"
                ? "52px"
                : size === "normal"
                  ? "40px"
                  : "28px"
            }
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-[8px] font-black text-slate-400">
          LOGO
        </span>
      )}
    </div>
  );
}

function RatingBadge({
  rating,
}: {
  rating: number | string | null;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-700">
      <span>★</span>
      <span>{ratingLabel(rating)}</span>
      <span className="opacity-60">/ 5</span>
    </span>
  );
}

function BrokerButtons({
  broker,
  compact = false,
}: {
  broker: PreparedBroker;
  compact?: boolean;
}) {
  const buttonClasses = compact
    ? "min-h-10 px-3 py-2 text-[11px]"
    : "min-h-11 px-4 py-2.5 text-xs";

  return (
    <div className="flex w-full items-stretch gap-2">
      <Link
        href={
          broker.slug
            ? `/brokers/${broker.slug}`
            : "/brokers"
        }
        className={`inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white font-black text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 ${buttonClasses}`}
      >
        التقييم
      </Link>

      {broker.real_account_url && broker.slug ? (
        <a
          href={`/go/${broker.slug}?type=real`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`inline-flex flex-1 items-center justify-center rounded-xl bg-brand-500 font-black text-white shadow-sm transition hover:bg-brand-600 ${buttonClasses}`}
        >
          فتح حساب
        </a>
      ) : null}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[1040px]">
      <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
        {eyebrow}
      </span>

      <h2 className="mt-3 max-w-[760px] text-[25px] font-black leading-[1.3] tracking-tight text-slate-950 min-[380px]:text-[27px] sm:text-[38px] lg:text-[42px]">
        {title}
      </h2>

      <p className="mt-2.5 max-w-[900px] text-[13px] font-medium leading-7 text-slate-700 min-[380px]:text-[14px] sm:mt-3 sm:text-[17px] sm:leading-9">
        {description}
      </p>
    </div>
  );
}

export default async function BestBrokersPage() {
  const supabase = await createClient();

  const [
    brokersResult,
    licensesResult,
    accountsResult,
    countriesResult,
    comparisonsResult,
  ] = await Promise.all([
    supabase
      .from("brokers")
      .select(`
        id,
        name,
        slug,
        rating,
        min_deposit,
        best_for,
        regulation,
        regulation_short,
        platforms,
        islamic_account,
        arabic_support,
        logo,
        real_account_url,
        score_safety,
        key_strength_ar
      `)
      .order("rating", { ascending: false }),

    supabase
      .from("broker_licenses")
      .select(`
        id,
        broker_id,
        regulator_code,
        regulator_name_ar,
        is_active
      `)
      .eq("is_active", true),

    supabase
      .from("broker_accounts")
      .select(`
        id,
        broker_id,
        account_name,
        min_deposit,
        is_islamic_available
      `),

    supabase
      .from("country_pages")
      .select(`
        id,
        slug,
        country_code,
        country_name_ar,
        flag_emoji,
        regulator_name
      `)
      .order("id", { ascending: true }),

    supabase
      .from("comparisons")
      .select(`
        id,
        slug,
        title,
        broker_1_id,
        broker_2_id,
        views_count
      `)
      .order("views_count", { ascending: false })
      .limit(6),
  ]);

  if (brokersResult.error) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-50 px-4 py-16"
      >
        <div className="mx-auto max-w-[1520px] rounded-3xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-2xl font-black text-slate-950">
            تعذر تحميل بيانات شركات التداول
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {brokersResult.error.message}
          </p>
        </div>
      </main>
    );
  }

  const brokersData = (brokersResult.data || []) as Broker[];
  const licenses = (licensesResult.data || []) as BrokerLicense[];
  const accounts = (accountsResult.data || []) as BrokerAccount[];
  const countries = (countriesResult.data || []) as CountryPage[];
  const comparisons = (comparisonsResult.data || []) as ComparisonRow[];

  const licensesByBroker = new Map<number, BrokerLicense[]>();
  const accountsByBroker = new Map<number, BrokerAccount[]>();

  licenses.forEach((license) => {
    const current = licensesByBroker.get(license.broker_id) || [];

    current.push(license);
    licensesByBroker.set(license.broker_id, current);
  });

  accounts.forEach((account) => {
    const current = accountsByBroker.get(account.broker_id) || [];

    current.push(account);
    accountsByBroker.set(account.broker_id, current);
  });

  const brokers: PreparedBroker[] = brokersData.map((broker) => {
    const brokerLicenses = licensesByBroker.get(broker.id) || [];
    const brokerAccounts = accountsByBroker.get(broker.id) || [];

    return {
      ...broker,
      licenses: brokerLicenses,
      accounts: brokerAccounts,
      active_license_count: brokerLicenses.length,
      has_islamic_account:
        isPositiveText(broker.islamic_account) ||
        brokerAccounts.some(
          (account) => account.is_islamic_available === true
        ),
      lowest_account_deposit:
        getLowestAccountDeposit(brokerAccounts),
    };
  });

  const sortedBrokers = [...brokers].sort(
    (a, b) => ratingValue(b.rating) - ratingValue(a.rating)
  );

  const topTen = sortedBrokers.slice(0, 10);
  const topThree = topTen.slice(0, 3);
  const topBroker = topTen[0];
  const useCasePicks = buildUniqueUseCases(sortedBrokers);

  const regulatorMap = new Map<string, RegulatorSummary>();

  licenses.forEach((license) => {
    const code = cleanText(
      license.regulator_code,
      ""
    ).toUpperCase();

    if (!code) return;

    const current = regulatorMap.get(code);

    if (current) {
      current.brokerCount += 1;
      return;
    }

    regulatorMap.set(code, {
      code,
      name: cleanText(license.regulator_name_ar, code),
      brokerCount: 1,
    });
  });

 const uniqueRegulatorCount = regulatorMap.size;

const regulatorSummaries = Array.from(
  regulatorMap.values()
)
  .sort((a, b) => b.brokerCount - a.brokerCount)
  .slice(0, 8);

  const brokerById = new Map(
    brokers.map((broker) => [broker.id, broker])
  );

  const preparedComparisons = comparisons
    .map((comparison) => ({
      ...comparison,
      broker1: brokerById.get(comparison.broker_1_id),
      broker2: brokerById.get(comparison.broker_2_id),
    }))
    .filter(
      (
        comparison
      ): comparison is ComparisonRow & {
        broker1: PreparedBroker;
        broker2: PreparedBroker;
      } =>
        Boolean(comparison.broker1 && comparison.broker2)
    );

    const mobileUseCases = useCasePicks.map((item) => ({
  title: item.title,
  shortTitle: item.shortTitle,
  broker: {
    id: item.broker.id,
    name: cleanText(item.broker.name),
    slug: item.broker.slug,
    logo: item.broker.logo,
    rating: ratingLabel(item.broker.rating),
    deposit: formatDeposit(getDisplayDeposit(item.broker)),
    licenseCount: item.broker.active_license_count,
    description: item.description,
    realAccountAvailable: Boolean(item.broker.real_account_url),
  },
}));

const mobileCountries = countries.slice(0, 12).map((country) => ({
  id: country.id,
  slug: country.slug,
  code: cleanText(country.country_code, "AR"),
  name: country.country_name_ar,
  flag: country.flag_emoji || "🌍",
  regulator: country.regulator_name,
}));

const mobileRegulators = regulatorSummaries.map((regulator) => ({
  code: regulator.code,
  name: regulator.name,
  brokerCount: regulator.brokerCount,
}));

const mobileComparisons = preparedComparisons.map((comparison) => ({
  id: comparison.id,
  slug: comparison.slug,
  broker1: {
    name: cleanText(comparison.broker1.name),
    logo: comparison.broker1.logo,
  },
  broker2: {
    name: cleanText(comparison.broker2.name),
    logo: comparison.broker2.logo,
  },
}));


  const activeLicenseCount = licenses.length;

  const islamicBrokerCount = brokers.filter(
    (broker) => broker.has_islamic_account
  ).length;

  const arabicSupportCount = brokers.filter((broker) =>
    isPositiveText(broker.arabic_support)
  ).length;

  const faqItems = [
    {
      question: "ما هي أفضل شركة تداول في 2026؟",
      answer:
        "لا توجد شركة واحدة مناسبة لجميع المتداولين. يعتمد الاختيار على قوة الترخيص والتكاليف والمنصات ونوع الحساب وبلد الإقامة.",
    },
    {
      question: "كيف أتأكد أن شركة التداول مرخصة؟",
      answer:
        "تحقق من اسم الكيان القانوني ورقم الترخيص في السجل الرسمي للجهة الرقابية، ولا تعتمد فقط على الشعار الموجود في موقع الوسيط.",
    },
    {
      question: "هل تختلف أفضل شركة تداول حسب الدولة؟",
      answer:
        "نعم، لأن الكيان القانوني وطرق الدفع والحسابات والتراخيص المتاحة قد تختلف حسب بلد الإقامة.",
    },
    {
      question: "هل الحساب الإسلامي متوفر لدى جميع الوسطاء؟",
      answer:
        "لا. بعض الوسطاء يوفرونه مباشرة، بينما يطبق آخرون شروطًا أو رسومًا إدارية على بعض الأدوات أو بعد مدة معينة.",
    },
    {
      question: "ما أهم معيار عند اختيار الوسيط؟",
      answer:
        "ابدأ بقوة التنظيم وسلامة الأموال، ثم قارن الرسوم والتنفيذ والسحب والمنصات والدعم.",
    },
  ];

  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "أفضل شركات التداول في 2026",
      url: `${SITE_URL}/best-brokers`,
      description:
  "مقارنة أفضل شركات التداول في 2026 حسب التقييم والتراخيص والتكاليف والمنصات والحساب الإسلامي.",
inLanguage: "ar",
datePublished: "2026-03-01",
dateModified: "2026-07-20",
author: {
  "@type": "Organization",
  name: "فريق تحرير بروكر العرب",
  url: `${SITE_URL}/about`,
},
isPartOf: {
        "@type": "WebSite",
        name: "بروكر العرب",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "أفضل شركات التداول",
          item: `${SITE_URL}/best-brokers`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "أفضل شركات التداول في 2026",
      numberOfItems: topTen.length,
      itemListElement: topTen.map((broker, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cleanText(broker.name),
        url: broker.slug
          ? `${SITE_URL}/brokers/${broker.slug}`
          : `${SITE_URL}/best-brokers`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-900"
    >
      <Script
        id="best-brokers-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,91,184,0.10),transparent_32%),radial-gradient(circle_at_top_left,rgba(14,165,233,0.05),transparent_26%)]" />

        <div className="relative mx-auto max-w-[1520px] px-4 pb-7 pt-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.3fr)_390px] lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[9px] font-black text-brand-600 sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                مراجعة مستقلة — آخر تحديث: يوليو 2026
              </span>

              <h1 className="mt-4 max-w-[850px] text-[31px] font-black leading-[1.14] tracking-tight text-slate-950 min-[380px]:text-[34px] sm:text-5xl lg:text-[58px]">
                أفضل شركات التداول
                <span className="block text-brand-500">
                  في 2026
                </span>
              </h1>

              <p className="mt-4 max-w-[860px] text-[13px] font-medium leading-7 text-slate-700 min-[380px]:text-sm sm:text-base sm:leading-8">
                قارن{" "}
                <strong className="font-black text-slate-950">
                  {brokers.length} شركة تداول
                </strong>{" "}
                حسب التراخيص والتقييم والتكاليف والمنصات والحساب
                الإسلامي، ثم انتقل إلى ترتيب يناسب بلدك واحتياجاتك.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">
                <span>إعداد فريق تحرير بروكر العرب</span>

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <Link
                  href="/how-we-review"
                  className="font-black text-brand-600 transition hover:underline"
                >
                  راجع منهجية التقييم
                </Link>
              </div>

              <div className="mt-5 grid max-w-[690px] grid-cols-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {[
                  {
                    value: brokers.length,
                    label: "شركة",
                  },
                  {
                    value: activeLicenseCount,
                    label: "ترخيص",
                  },
                  {
                    value: accounts.length,
                    label: "حساب",
                  },
                  {
                    value: countries.length,
                    label: "دولة",
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`px-1 py-3 text-center sm:px-2 ${
                      index !== 3
                        ? "border-l border-slate-200"
                        : ""
                    }`}
                  >
                    <div className="text-[18px] font-black text-slate-950 sm:text-2xl">
                      {item.value}
                    </div>

                    <div className="mt-0.5 text-[8px] font-bold text-slate-600 sm:text-xs">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-2.5 sm:flex">
                <a
                  href="#comparison-table"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-sm transition hover:bg-brand-600 sm:text-sm"
                >
                  قارن أفضل الشركات
                </a>

                <a
                  href="#broker-finder"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 sm:text-sm"
                >
                  اعثر على وسيط مناسب
                </a>
              </div>
            </div>

            {topBroker ? (
              <article className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.08)] lg:block">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
                  <div>
                    <h2 className="text-sm font-black text-slate-950">
                      أفضل اختيار إجمالًا
                    </h2>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      حسب التقييم العام وتوازن المعايير
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-black text-amber-800">
                    المركز الأول
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <BrokerLogo
                      broker={topBroker}
                      size="large"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-black text-slate-950">
                        {cleanText(topBroker.name)}
                      </h3>

                      <div className="mt-2">
                        <RatingBadge
                          rating={topBroker.rating}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="border-l border-slate-200 px-2 py-2.5 text-center">
                      <div className="text-[8px] text-slate-500">
                        الإيداع
                      </div>

                      <div className="mt-1 text-xs font-black">
                        {formatDeposit(
                          getDisplayDeposit(topBroker)
                        )}
                      </div>
                    </div>

                    <div className="border-l border-slate-200 px-2 py-2.5 text-center">
                      <div className="text-[8px] text-slate-500">
                        التراخيص
                      </div>

                      <div className="mt-1 text-xs font-black">
                        {topBroker.active_license_count}
                      </div>
                    </div>

                    <div className="px-2 py-2.5 text-center">
                      <div className="text-[8px] text-slate-500">
                        إسلامي
                      </div>

                      <div
                        className={`mt-1 text-xs font-black ${
                          topBroker.has_islamic_account
                            ? "text-emerald-700"
                            : "text-slate-600"
                        }`}
                      >
                        {topBroker.has_islamic_account
                          ? "متوفر"
                          : "راجع الشروط"}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-xs font-bold leading-6 text-slate-600">
                    {cleanText(
                      topBroker.key_strength_ar,
                      topBroker.best_for ||
                        "وسيط متوازن لمختلف احتياجات التداول"
                    )}
                  </p>

                  <div className="mt-4">
                    <BrokerButtons broker={topBroker} />
                  </div>
                </div>
              </article>
            ) : null}
          </div>

          {topBroker ? (
            <div className="mt-5 rounded-[18px] border border-slate-200 bg-slate-50 p-3 lg:hidden">
              <div className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3">
                <BrokerLogo
                  broker={topBroker}
                  size="small"
                />

                <div className="min-w-0">
                  <div className="text-[9px] font-black text-brand-600">
                    الأفضل إجمالًا
                  </div>

                  <div className="mt-0.5 truncate text-sm font-black text-slate-950">
                    {cleanText(topBroker.name)}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <RatingBadge
                      rating={topBroker.rating}
                    />

                    <span className="text-[9px] font-bold text-slate-500">
                      {formatDeposit(
                        getDisplayDeposit(topBroker)
                      )}
                    </span>
                  </div>
                </div>

                <Link
                  href={
                    topBroker.slug
                      ? `/brokers/${topBroker.slug}`
                      : "/brokers"
                  }
                  className="rounded-xl bg-brand-500 px-3 py-2 text-[9px] font-black text-white"
                >
                  التقييم
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* INTERNAL NAVIGATION — DESKTOP ONLY */}
      <nav className="hidden border-b border-slate-200 bg-white md:block">
        <div className="mx-auto flex max-w-[1520px] flex-wrap gap-2 px-6 py-3 lg:px-8">
          {[
            ["#top-brokers", "أفضل الاختيارات"],
            ["#comparison-table", "المقارنة"],
            ["#broker-finder", "اختيار الوسيط"],
            ["#countries", "حسب الدولة"],
            ["#licenses", "حسب الترخيص"],
            ["#methodology", "منهجية التقييم"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[10px] font-black text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* COMPACT STATISTICS */}
      <section className="border-b border-slate-200 bg-[#f5f7fb]">
        <div className="mx-auto max-w-[1520px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {[
              {
                value: activeLicenseCount,
                title: "ترخيصًا راجعناه",
                text: "من جهات رقابية مختلفة",
              },
              {
                value: uniqueRegulatorCount,
title: "جهات رقابية",
                text: "ضمن قاعدة بياناتنا",
              },
              {
                value: islamicBrokerCount,
                title: "وسطاء بحساب إسلامي",
                text: "مع اختلاف الشروط",
              },
              {
                value: arabicSupportCount,
                title: "وسطاء بدعم عربي",
                text: "وفق بيانات الشركات",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[17px] border border-slate-200 bg-white px-4 py-3.5"
              >
                <div className="text-xl font-black text-slate-950">
                  {item.value}
                </div>

                <h2 className="mt-0.5 text-[10px] font-black text-slate-800 sm:text-xs">
                  {item.title}
                </h2>

                <p className="mt-1 hidden text-[9px] text-slate-500 sm:block">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

            {/* TOP THREE */}
      <section
        id="top-brokers"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-7 sm:py-10"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="الاختيارات الأعلى تقييمًا"
            title="أفضل 3 شركات تداول في 2026"
            description="أعلى الشركات في الترتيب العام وفق التقييم والتراخيص والتكاليف والمنصات."
          />

                   {/* MOBILE */}
          <div className="mt-5 space-y-3 lg:hidden">
            {topThree.map((broker, index) => {
              const licenseCodes = broker.licenses
                .map((license) =>
                  license.regulator_code?.trim()
                )
                .filter(
                  (code): code is string =>
                    Boolean(code)
                )
                .slice(0, 3);

              return (
                <article
                  key={broker.id}
                  className={`overflow-hidden rounded-[20px] border bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)] ${
                    index === 0
                      ? "border-amber-300"
                      : "border-slate-200"
                  }`}
                >
                  <div
                    className={`h-1 ${
                      index === 0
                        ? "bg-amber-400"
                        : "bg-brand-500"
                    }`}
                  />

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                          index === 0
                            ? "bg-amber-100 text-amber-800"
                            : "bg-brand-50 text-brand-600"
                        }`}
                      >
                        {index === 0
                          ? "الأفضل إجمالًا"
                          : `المركز ${index + 1}`}
                      </span>

                      <RatingBadge
                        rating={broker.rating}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-[58px_minmax(0,1fr)] items-center gap-3">
                      <BrokerLogo
                        broker={broker}
                        size="normal"
                      />

                      <div className="min-w-0">
                        <h3 className="text-[19px] font-black leading-7 text-slate-950">
                          {cleanText(broker.name)}
                        </h3>

                        <p className="mt-0.5 line-clamp-2 text-[11px] font-bold leading-5 text-slate-600">
                          {cleanText(
                            broker.best_for,
                            "وسيط متعدد الاستخدامات"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <div className="border-l border-slate-200 px-1 py-2.5 text-center">
                        <div className="text-[8px] font-bold text-slate-500">
                          الإيداع
                        </div>

                        <div className="mt-1 text-[11px] font-black text-slate-950">
                          {formatDeposit(
                            getDisplayDeposit(broker)
                          )}
                        </div>
                      </div>

                      <div className="border-l border-slate-200 px-1 py-2.5 text-center">
                        <div className="text-[8px] font-bold text-slate-500">
                          التراخيص
                        </div>

                        <div className="mt-1 text-[11px] font-black text-slate-950">
                          {broker.active_license_count}
                        </div>
                      </div>

                      <div className="px-1 py-2.5 text-center">
                        <div className="text-[8px] font-bold text-slate-500">
                          إسلامي
                        </div>

                        <div
                          className={`mt-1 text-[10px] font-black ${
                            broker.has_islamic_account
                              ? "text-emerald-700"
                              : "text-slate-600"
                          }`}
                        >
                          {broker.has_islamic_account
                            ? "متوفر"
                            : "راجع"}
                        </div>
                      </div>
                    </div>

                    {licenseCodes.length ? (
                      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                        {licenseCodes.map((code) => (
                          <span
                            key={`${broker.id}-${code}`}
                            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[8px] font-black text-slate-600"
                          >
                            {code.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-3">
                      <BrokerButtons
                        broker={broker}
                        compact
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* DESKTOP */}
          <div className="mt-7 hidden gap-5 lg:grid lg:grid-cols-3">
            {topThree.map((broker, index) => {
              const licenseCodes = broker.licenses
                .map((license) =>
                  license.regulator_code?.trim()
                )
                .filter(
                  (code): code is string =>
                    Boolean(code)
                )
                .slice(0, 4);

              return (
                <article
                  key={broker.id}
                  className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_42px_rgba(15,23,42,0.09)]"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${
                      index === 0
                        ? "bg-amber-400"
                        : "bg-brand-500"
                    }`}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[11px] font-black ${
                        index === 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      {index === 0
                        ? "الأفضل إجمالًا"
                        : `المركز ${index + 1}`}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                      ★ {ratingLabel(broker.rating)} / 5
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <BrokerLogo
                      broker={broker}
                      size="large"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[24px] font-black text-slate-950">
                        {cleanText(broker.name)}
                      </h3>

                      <p className="mt-1.5 line-clamp-1 text-sm font-bold text-slate-500">
                        {cleanText(
                          broker.best_for,
                          "وسيط متعدد الاستخدامات"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <div className="border-l border-slate-200 px-3 py-4 text-center">
                      <div className="text-[10px] font-bold text-slate-500">
                        الحد الأدنى
                      </div>

                      <div className="mt-1 text-sm font-black text-slate-950">
                        {formatDeposit(
                          getDisplayDeposit(broker)
                        )}
                      </div>
                    </div>

                    <div className="border-l border-slate-200 px-3 py-4 text-center">
                      <div className="text-[10px] font-bold text-slate-500">
                        التراخيص
                      </div>

                      <div className="mt-1 text-sm font-black text-slate-950">
                        {broker.active_license_count}
                      </div>
                    </div>

                    <div className="px-3 py-4 text-center">
                      <div className="text-[10px] font-bold text-slate-500">
                        حساب إسلامي
                      </div>

                      <div
                        className={`mt-1 text-sm font-black ${
                          broker.has_islamic_account
                            ? "text-emerald-700"
                            : "text-slate-600"
                        }`}
                      >
                        {broker.has_islamic_account
                          ? "متوفر"
                          : "راجع الشروط"}
                      </div>
                    </div>
                  </div>

                  {licenseCodes.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {licenseCodes.map((code) => (
                        <span
                          key={`${broker.id}-${code}`}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black text-slate-600"
                        >
                          {code.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-auto pt-5">
                    <BrokerButtons broker={broker} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

            {/* TOP TEN COMPARISON */}
      <section
        id="comparison-table"
        className="scroll-mt-24 border-b border-slate-200 bg-[#f5f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="المقارنة الرئيسية"
            title="مقارنة أفضل 10 شركات تداول في 2026"
            description="قارن التقييم والحد الأدنى للإيداع والتراخيص والمنصات، ثم افتح المراجعة الكاملة للتأكد من الحسابات والشروط المتاحة في بلدك."
          />

                    {/* DESKTOP TABLE */}
          <div className="mt-7 hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.06)] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1240px] table-fixed text-right">
                <thead className="bg-[#071126] text-white">
                  <tr className="text-[13px] font-black tracking-wide">
                    <th className="w-[5%] px-4 py-4 text-center">
                      #
                    </th>

                    <th className="w-[26%] px-4 py-4">
                      الشركة
                    </th>

                    <th className="w-[10%] px-4 py-4 text-center">
                      التقييم
                    </th>

                    <th className="w-[9%] px-4 py-4 text-center">
                      الإيداع
                    </th>

                    <th className="w-[22%] px-4 py-4 text-center">
                      التراخيص
                    </th>

                    <th className="w-[17%] px-4 py-4 text-center">
                      المنصات
                    </th>

                    <th className="w-[11%] px-4 py-4 text-center">
                      الإجراءات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {topTen.map((broker, index) => {
                    const licenseCodes = broker.licenses
                      .map((license) =>
                        license.regulator_code?.trim()
                      )
                      .filter(
                        (code): code is string =>
                          Boolean(code)
                      )
                      .slice(0, 5);

                    const platforms = splitItems(
                      broker.platforms,
                      3
                    );

                    return (
                      <tr
                        key={broker.id}
                        className={`border-t border-slate-200 transition hover:bg-brand-50/40 ${
                          index === 0
                            ? "bg-[linear-gradient(90deg,#fff9e8_0%,#ffffff_46%,#eff6ff_100%)]"
                            : "bg-white"
                        }`}
                      >
                        {/* RANK */}
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black ${
                              index === 0
                                ? "bg-amber-400 text-slate-950"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>

                        {/* BROKER */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3.5">
                            <BrokerLogo
                              broker={broker}
                              size="small"
                            />

                            <div className="min-w-0">
                              <Link
                                href={
                                  broker.slug
                                    ? `/brokers/${broker.slug}`
                                    : "/brokers"
                                }
                                className="block truncate text-[15px] font-black text-slate-950 transition hover:text-brand-600"
                              >
                                {cleanText(broker.name)}
                              </Link>

                              <div className="mt-1 line-clamp-1 text-[11px] font-medium text-slate-500">
                                {cleanText(
                                  broker.best_for,
                                  "وسيط متعدد الاستخدامات"
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* RATING */}
                        <td className="px-4 py-4 text-center">
                          <RatingBadge
                            rating={broker.rating}
                          />
                        </td>

                        {/* DEPOSIT */}
                        <td className="px-4 py-4 text-center">
                          <span className="text-[13px] font-black text-slate-950">
                            {formatDeposit(
                              getDisplayDeposit(broker)
                            )}
                          </span>
                        </td>

                        {/* LICENSES */}
                        <td className="px-4 py-4">
                          {licenseCodes.length ? (
                            <div className="flex flex-wrap items-center justify-center gap-2">
                              {licenseCodes.map((code) => (
                                <span
                                  key={`${broker.id}-${code}`}
                                  className="inline-flex min-h-7 min-w-[48px] items-center justify-center rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[10px] font-black tracking-wide text-slate-700 shadow-sm"
                                >
                                  {code.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center">
                              <span className="text-[11px] font-bold text-slate-500">
                                {cleanText(
                                  broker.regulation_short,
                                  broker.regulation ||
                                    "غير محدد"
                                )}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* PLATFORMS */}
                        <td className="px-4 py-4">
                          {platforms.length ? (
                            <div className="flex flex-wrap items-center justify-center gap-2">
                              {platforms.map((platform) => (
                                <span
                                  key={`${broker.id}-${platform}`}
                                  className="inline-flex min-h-7 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black text-slate-700"
                                >
                                  {platform}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center">
                              <span className="text-[11px] font-bold text-slate-500">
                                غير محدد
                              </span>
                            </div>
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td className="px-3 py-4">
                          <BrokerButtons
                            broker={broker}
                            compact
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE COMPACT LIST */}
          <div className="mt-5 space-y-2.5 lg:hidden">
            {topTen.slice(0, 5).map((broker, index) => (
              <details
                key={broker.id}
                className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.035)]"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[30px_42px_minmax(0,1fr)_auto] items-center gap-2.5 p-3.5">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black ${
                      index === 0
                        ? "bg-amber-400 text-slate-950"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <BrokerLogo
                    broker={broker}
                    size="small"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black text-slate-950">
                      {cleanText(broker.name)}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      <RatingBadge
                        rating={broker.rating}
                      />

                      <span className="truncate text-[9px] font-bold text-slate-500">
                        إيداع{" "}
                        {formatDeposit(
                          getDisplayDeposit(broker)
                        )}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="border-t border-slate-200 bg-slate-50 p-3.5">
                  <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="border-l border-slate-200 px-1.5 py-3 text-center">
                      <div className="text-[8px] font-bold text-slate-500">
                        التراخيص
                      </div>

                      <div className="mt-1 text-[11px] font-black text-slate-950">
                        {broker.active_license_count}
                      </div>
                    </div>

                    <div className="border-l border-slate-200 px-1.5 py-3 text-center">
                      <div className="text-[8px] font-bold text-slate-500">
                        إسلامي
                      </div>

                      <div
                        className={`mt-1 text-[10px] font-black ${
                          broker.has_islamic_account
                            ? "text-emerald-700"
                            : "text-slate-600"
                        }`}
                      >
                        {broker.has_islamic_account
                          ? "متوفر"
                          : "راجع"}
                      </div>
                    </div>

                    <div className="px-1.5 py-3 text-center">
                      <div className="text-[8px] font-bold text-slate-500">
                        دعم عربي
                      </div>

                      <div className="mt-1 text-[10px] font-black text-slate-950">
                        {isPositiveText(
                          broker.arabic_support
                        )
                          ? "متوفر"
                          : "غير محدد"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <BrokerButtons broker={broker} />
                  </div>
                </div>
              </details>
            ))}

            {topTen.length > 5 ? (
              <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white">
                <summary className="cursor-pointer list-none px-4 py-3.5 text-center text-xs font-black text-brand-600">
                  عرض الشركات من 6 إلى 10
                </summary>

                <div className="space-y-2 border-t border-slate-200 bg-slate-50 p-3">
                  {topTen.slice(5).map((broker, index) => (
                    <article
                      key={broker.id}
                      className="rounded-[15px] border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[9px] font-black text-slate-600">
                          {index + 6}
                        </span>

                        <BrokerLogo
                          broker={broker}
                          size="small"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-black text-slate-950">
                            {cleanText(broker.name)}
                          </div>

                          <div className="mt-1 flex items-center gap-2">
                            <RatingBadge
                              rating={broker.rating}
                            />

                            <span className="text-[9px] text-slate-500">
                              {formatDeposit(
                                getDisplayDeposit(broker)
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <BrokerButtons
                          broker={broker}
                          compact
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        </div>
      </section>

          {/* BROKER FINDER */}
      <section
        id="broker-finder"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-7 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
            <div className="grid lg:grid-cols-[380px_minmax(0,1fr)]">
              <div className="bg-slate-950 px-5 py-6 text-white sm:p-6 lg:p-7">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-black text-blue-200">
                  أداة اختيار ذكية
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] sm:text-3xl">
                  اعثر على شركة التداول الأنسب لك
                </h2>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-300 sm:text-sm">
                  اختر تفضيلاتك الأساسية للوصول إلى نتائج أكثر ملاءمة.
                </p>

                <div className="mt-5 hidden grid-cols-2 gap-2 lg:grid">
                  {[
                    "اختيار حسب الدولة",
                    "مراعاة قيمة الإيداع",
                    "تحديد مستوى الخبرة",
                    "اختيار منصة التداول",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[9px] font-bold text-slate-200"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-7">
                <div className="hidden lg:block">
                  <h3 className="text-lg font-black text-slate-950">
                    فلتر اختيار الوسيط
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-600">
                    اختر تفضيلاتك الأساسية ثم انتقل إلى النتائج المناسبة.
                  </p>
                </div>

                <form className="grid gap-3 sm:grid-cols-2 xl:mt-5 xl:grid-cols-4">
                  <div>
                    <label
                      htmlFor="deposit-filter"
                      className="mb-1.5 block text-[11px] font-black text-slate-800"
                    >
                      قيمة الإيداع
                    </label>

                    <select
                      id="deposit-filter"
                      defaultValue="under-100"
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-[13px] font-bold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="under-100">
                        أقل من 100$
                      </option>
                      <option value="100-500">
                        100$ - 500$
                      </option>
                      <option value="500-1000">
                        500$ - 1000$
                      </option>
                      <option value="over-1000">
                        أكثر من 1000$
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="experience-filter"
                      className="mb-1.5 block text-[11px] font-black text-slate-800"
                    >
                      مستوى الخبرة
                    </label>

                    <select
                      id="experience-filter"
                      defaultValue="beginner"
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-[13px] font-bold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="beginner">
                        مبتدئ
                      </option>
                      <option value="intermediate">
                        متوسط
                      </option>
                      <option value="advanced">
                        محترف
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="platform-filter"
                      className="mb-1.5 block text-[11px] font-black text-slate-800"
                    >
                      منصة التداول
                    </label>

                    <select
                      id="platform-filter"
                      defaultValue="any"
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-[13px] font-bold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="any">
                        أي منصة
                      </option>
                      <option value="mt4">MT4</option>
                      <option value="mt5">MT5</option>
                      <option value="ctrader">
                        cTrader
                      </option>
                    </select>
                  </div>

                  <CountryBrokerRedirect />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* BEST BY USE CASE + ALL MOBILE TABS */}
      <section className="border-b border-slate-200 bg-[#f5f7fb] py-7 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden">
            <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700">
              خيارات حسب احتياجك
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.3] tracking-tight text-slate-950">
              أفضل شركات التداول حسب الاستخدام
            </h2>

            <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700">
              اخترنا شركة مختلفة لكل استخدام حتى لا تتكرر الشركة نفسها
              في جميع التصنيفات.
            </p>
          </div>

          <div className="hidden sm:block">
            <SectionHeading
              eyebrow="خيارات حسب احتياجك"
              title="أفضل شركات التداول حسب الاستخدام"
              description="اخترنا شركة مختلفة لكل استخدام حتى لا تتكرر الشركة نفسها في جميع التصنيفات."
            />
          </div>

          <div className="mt-4 min-w-0 overflow-hidden sm:hidden">
            <BestBrokersMobileTabs
              useCases={mobileUseCases}
              countries={mobileCountries}
              regulators={mobileRegulators}
              comparisons={mobileComparisons}
            />
          </div>

          <div className="mt-7 hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3">
            {useCasePicks.map((item) => (
              <article
                key={`${item.title}-${item.broker.id}`}
                className="flex min-h-[250px] flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_14px_32px_rgba(15,23,42,0.07)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600">
                    {item.shortTitle}
                  </span>

                  <RatingBadge
                    rating={item.broker.rating}
                  />
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <BrokerLogo
                    broker={item.broker}
                    size="normal"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-black text-slate-950">
                      {cleanText(item.broker.name)}
                    </h3>

                    <p className="mt-1 text-[11px] font-bold text-slate-500">
                      {item.title}
                    </p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-xs leading-6 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <div className="border-l border-slate-200 px-2 py-3 text-center">
                    <div className="text-[9px] font-bold text-slate-500">
                      الحد الأدنى للإيداع
                    </div>

                    <div className="mt-1 text-xs font-black text-slate-950">
                      {formatDeposit(
                        getDisplayDeposit(item.broker)
                      )}
                    </div>
                  </div>

                  <div className="px-2 py-3 text-center">
                    <div className="text-[9px] font-bold text-slate-500">
                      التراخيص
                    </div>

                    <div className="mt-1 text-xs font-black text-slate-950">
                      {item.broker.active_license_count}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <BrokerButtons
                    broker={item.broker}
                    compact
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTRIES — TABLET & DESKTOP ONLY */}
      <section
        id="countries"
        className="hidden scroll-mt-24 border-b border-slate-200 bg-white py-9 sm:block lg:py-11"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="ترتيب مخصص لكل دولة"
            title="اختر أفضل شركة تداول حسب بلدك"
            description="تختلف الشركات والكيانات القانونية وطرق الدفع والتراخيص المتاحة حسب بلد الإقامة."
          />

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {countries.slice(0, 12).map((country) => (
              <Link
                key={country.id}
                href={`/best-brokers/${country.slug}`}
                className="group relative min-h-[132px] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_26px_rgba(15,23,42,0.06)]"
              >
                <div className="absolute -left-9 -top-9 h-24 w-24 rounded-full bg-brand-50 transition group-hover:scale-110" />

                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">
                      {country.flag_emoji || "🌍"}
                    </span>

                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 text-[10px] font-black text-slate-600">
                      {cleanText(
                        country.country_code,
                        "AR"
                      )}
                    </span>
                  </div>

                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-xs font-black text-brand-600 transition group-hover:-translate-x-0.5">
                    ←
                  </span>
                </div>

                <h3 className="relative mt-3 text-sm font-black leading-6 text-slate-950">
                  أفضل شركات التداول في{" "}
                  {country.country_name_ar}
                </h3>

                <p className="relative mt-1.5 line-clamp-1 text-[9px] text-slate-500">
                 {country.regulator_name
  ? `الرقابة المحلية: ${country.regulator_name}`
  : "الشركات والتراخيص وطرق الدفع المتاحة"}
                </p>

                <div className="relative mt-2.5 border-t border-slate-200 pt-2 text-[9px] font-black text-brand-600">
                  عرض دليل الدولة
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-[17px] border border-slate-200 bg-slate-50 px-5 py-3.5">
            <p className="text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7">
              تشمل أدلتنا أفضل شركات التداول في السعودية والإمارات
              والكويت وقطر والبحرين والأردن ومصر وعُمان والمغرب
              وغيرها، مع معلومات مخصصة لكل سوق.
            </p>
          </div>
        </div>
      </section>

      {/* LICENSES — TABLET & DESKTOP ONLY */}
      <section
        id="licenses"
        className="hidden scroll-mt-24 border-b border-slate-200 bg-[#f5f7fb] py-9 sm:block lg:py-11"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="تحقق من الجهة الرقابية"
            title="أفضل شركات التداول حسب الترخيص"
            description="تحقق دائمًا من رقم الترخيص واسم الكيان القانوني الذي سيفتح حسابك لديه."
          />

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {regulatorSummaries.map((regulator) => (
              <Link
                key={regulator.code}
                href={`/licenses/${regulator.code.toLowerCase()}`}
                className="group rounded-[19px] border border-slate-200 bg-white p-4 shadow-[0_5px_16px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-brand-50 px-2 text-[11px] font-black text-brand-600">
                    {regulator.code}
                  </span>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-700">
                    {regulator.brokerCount} شركات
                  </span>
                </div>

                <h3 className="mt-4 line-clamp-2 min-h-[42px] text-sm font-black leading-6 text-slate-950">
                  {regulator.name}
                </h3>

                <div className="mt-3 border-t border-slate-200 pt-3 text-[10px] font-black text-brand-600">
                  عرض الشركات ←
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {[
              {
                title: "تحقق من رقم الترخيص",
                text: "ابحث عنه في سجل الجهة الرقابية الرسمي.",
              },
              {
                title: "طابق اسم الكيان",
                text: "يجب أن يطابق الكيان الموجود في اتفاقية حسابك.",
              },
              {
                title: "اعرف كيان بلدك",
                text: "قد يختلف الكيان المتاح حسب بلد الإقامة.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="flex items-start gap-3 rounded-[17px] border border-slate-200 bg-white p-4"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-[10px] font-black text-white">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-sm font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR COMPARISONS — TABLET & DESKTOP ONLY */}
      {preparedComparisons.length ? (
        <section className="hidden border-b border-slate-200 bg-white py-9 sm:block lg:py-11">
          <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="مقارنات مباشرة"
                title="قارن أشهر شركات التداول"
                description="راجع الفروق الرئيسية بين شركتين قبل اتخاذ قرار فتح الحساب."
              />

              <Link
                href="/compare"
                className="inline-flex w-fit items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                جميع المقارنات
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {preparedComparisons.map((comparison) => (
                <Link
                  key={comparison.id}
                  href={`/compare/${comparison.slug}`}
                  className="rounded-[20px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                >
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div className="flex min-w-0 flex-col items-center text-center">
                      <BrokerLogo
                        broker={comparison.broker1}
                        size="normal"
                      />

                      <span className="mt-2 max-w-full truncate text-xs font-black text-slate-950">
                        {cleanText(
                          comparison.broker1.name
                        )}
                      </span>
                    </div>

                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-[9px] font-black text-white">
                      VS
                    </span>

                    <div className="flex min-w-0 flex-col items-center text-center">
                      <BrokerLogo
                        broker={comparison.broker2}
                        size="normal"
                      />

                      <span className="mt-2 max-w-full truncate text-xs font-black text-slate-950">
                        {cleanText(
                          comparison.broker2.name
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-200 pt-3 text-center text-[10px] font-black text-brand-600">
                    عرض المقارنة
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

            {/* CHOOSING GUIDE */}
      <section className="border-b border-slate-200 bg-[#f5f7fb] py-7 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="grid lg:grid-cols-[350px_minmax(0,1fr)]">
              <div className="border-b border-slate-200 bg-brand-50 px-5 py-5 sm:p-6 lg:border-b-0 lg:border-l">
                <span className="text-[10px] font-black text-brand-600">
                  دليل اختيار الوسيط
                </span>

                <h2 className="mt-2 text-[24px] font-black leading-[1.3] text-slate-950 sm:text-3xl">
                  كيف تختار أفضل شركة تداول؟
                </h2>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  ابدأ بالأمان، ثم قارن التكلفة والمنصة والحساب والخدمات
                  التي تحتاجها.
                </p>

                <Link
                  href="/how-we-review"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-sm transition hover:bg-brand-600"
                >
                  اقرأ منهجية التقييم
                </Link>
              </div>

              {/* MOBILE */}
              <div className="space-y-2.5 p-4 lg:hidden">
                {[
                  {
                    number: "01",
                    title: "التراخيص وحماية الأموال",
                    text: "تحقق من الجهة الرقابية واسم الكيان القانوني المسؤول عن حسابك.",
                  },
                  {
                    number: "02",
                    title: "الرسوم والتكلفة",
                    text: "قارن السبريد والعمولات ورسوم السحب والتبييت.",
                  },
                  {
                    number: "03",
                    title: "نوع الحساب المناسب",
                    text: "اختر الحساب الذي يناسب خبرتك ورأس مالك.",
                  },
                  {
                    number: "04",
                    title: "المنصة والدعم والسحب",
                    text: "اختبر المنصة والدعم وعملية السحب قبل إيداع مبلغ كبير.",
                  },
                ].map((item, index) => (
                  <details
                    key={item.number}
                    open={index === 0}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-[10px] font-black text-white">
                          {item.number}
                        </span>

                        <h3 className="text-[14px] font-black leading-6 text-slate-950">
                          {item.title}
                        </h3>
                      </div>

                      <span className="shrink-0 text-xs text-slate-400 transition group-open:rotate-180">
                        ▼
                      </span>
                    </summary>

                    <p className="border-t border-slate-200 bg-white px-4 py-3 text-[13px] font-medium leading-7 text-slate-700">
                      {item.text}
                    </p>
                  </details>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="hidden grid-cols-2 gap-4 p-6 lg:grid">
                {[
                  {
                    number: "01",
                    title: "التراخيص وحماية الأموال",
                    text: "تحقق من الجهة الرقابية واسم الكيان القانوني المسؤول عن حسابك.",
                  },
                  {
                    number: "02",
                    title: "الرسوم والتكلفة",
                    text: "قارن السبريد والعمولات ورسوم السحب والتبييت.",
                  },
                  {
                    number: "03",
                    title: "نوع الحساب المناسب",
                    text: "اختر الحساب الذي يناسب خبرتك ورأس مالك.",
                  },
                  {
                    number: "04",
                    title: "المنصة والدعم والسحب",
                    text: "اختبر المنصة والدعم وعملية السحب قبل إيداع مبلغ كبير.",
                  },
                ].map((item) => (
                  <article
                    key={item.number}
                    className="rounded-[18px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="text-[10px] font-black text-brand-600">
                      {item.number}
                    </span>

                    <h3 className="mt-2 text-base font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* METHODOLOGY */}
      <section
        id="methodology"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-7 sm:py-12 lg:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden">
            <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700">
              منهجية بروكر العرب
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.3] text-slate-950">
              كيف نقيم شركات التداول؟
            </h2>

            <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700">
              نعتمد على معايير مترابطة بدل الحكم على الوسيط من عامل واحد.
            </p>
          </div>

          <div className="hidden sm:block">
            <SectionHeading
              eyebrow="منهجية بروكر العرب"
              title="كيف نقيم شركات التداول؟"
              description="نعتمد على معايير مترابطة بدل الحكم على الوسيط من عامل واحد."
            />
          </div>

          {/* MOBILE */}
          <div className="mt-5 space-y-2.5 sm:hidden">
            {[
              {
                title: "التراخيص والأمان",
                text: "نراجع الجهات الرقابية والكيانات القانونية وحماية أموال العملاء.",
              },
              {
                title: "الرسوم والسبريد",
                text: "نقارن السبريد والعمولات والتكاليف الإضافية.",
              },
              {
                title: "المنصات والأدوات",
                text: "نراجع المنصة والأدوات والتطبيقات المتاحة.",
              },
              {
                title: "الإيداع والسحب",
                text: "نقارن طرق الدفع وسرعة معالجة السحب.",
              },
              {
                title: "الدعم والخدمة",
                text: "نراجع جودة التواصل والدعم العربي.",
              },
              {
                title: "ملاءمة الوسيط",
                text: "نحدد مدى ملاءمته للمبتدئ والمحترف وبلد الإقامة.",
              },
            ].map((item, index) => (
              <details
                key={item.title}
                open={index === 0}
                className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-[10px] font-black text-white">
                      0{index + 1}
                    </span>

                    <h3 className="text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>
                  </div>

                  <span className="shrink-0 text-xs text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <p className="border-t border-slate-200 bg-white px-4 py-3 text-[13px] font-medium leading-7 text-slate-700">
                  {item.text}
                </p>
              </details>
            ))}

            <Link
              href="/how-we-review"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-sm transition hover:bg-brand-600"
            >
              اقرأ المنهجية كاملة
            </Link>
          </div>

          {/* DESKTOP */}
          <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "التراخيص والأمان",
                text: "نراجع الجهات الرقابية والكيانات القانونية ومستوى حماية أموال العملاء.",
              },
              {
                title: "الرسوم والسبريد",
                text: "نقارن السبريد والعمولات ورسوم السحب والتكاليف الإضافية.",
              },
              {
                title: "المنصات والأدوات",
                text: "نراجع سهولة استخدام المنصة والأدوات والتطبيقات المتاحة.",
              },
              {
                title: "الإيداع والسحب",
                text: "نقارن الحد الأدنى للإيداع وطرق الدفع وسرعة السحب.",
              },
              {
                title: "الدعم والخدمة",
                text: "نراجع جودة التواصل والدعم العربي وتجربة التسجيل.",
              },
              {
                title: "ملاءمة الوسيط",
                text: "نحدد مدى ملاءمته للمبتدئ والمحترف وبلد الإقامة.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="flex min-h-[124px] items-start gap-4 rounded-[20px] border border-slate-300 bg-slate-50/70 p-5"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-[12px] font-black text-white">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-[16px] font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[14px] font-medium leading-7 text-slate-700">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

             {/* WARNING */}
      <section className="border-b border-slate-200 bg-[#f5f7fb] py-7 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[22px] border border-red-300 bg-white shadow-[0_8px_24px_rgba(127,29,29,0.05)]">
            <div className="grid lg:grid-cols-[360px_minmax(0,1fr)]">
              <div className="border-b border-red-200 bg-red-50 px-5 py-6 sm:p-7 lg:border-b-0 lg:border-l">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-base font-black text-red-700">
                    !
                  </span>

                  <div>
                    <h2 className="text-[24px] font-black leading-[1.35] text-slate-950 sm:text-[30px]">
                      كيف تتجنب شركات التداول الوهمية؟
                    </h2>

                    <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-[14px]">
                      لا تحول أموالك قبل التحقق من اسم الكيان ورقم
                      الترخيص وطريقة السحب.
                    </p>
                  </div>
                </div>

                <Link
                  href="/licenses"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-red-300 bg-white px-5 text-[13px] font-black text-red-700 transition hover:bg-red-100"
                >
                  تحقق من التراخيص
                </Link>
              </div>

              {/* MOBILE */}
              <div className="space-y-2.5 p-4 sm:hidden">
                {[
                  {
                    title: "وعود بأرباح مضمونة",
                    text: "لا توجد أرباح ثابتة أو مضمونة في التداول.",
                  },
                  {
                    title: "غياب رقم الترخيص",
                    text: "احذر من شركة لا تعرض اسم كيانها ورقم ترخيصها.",
                  },
                  {
                    title: "ضغط لزيادة الإيداع",
                    text: "لا تستجب لمن يضغط عليك لتحويل مبلغ أكبر.",
                  },
                  {
                    title: "عرقلة السحب",
                    text: "اختبر السحب بمبلغ صغير قبل زيادة رأس المال.",
                  },
                ].map((item, index) => (
                  <details
                    key={item.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[15px] border border-red-200 bg-red-50/50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
                      <h3 className="text-[14px] font-black text-red-950">
                        {item.title}
                      </h3>

                      <span className="shrink-0 text-xs text-red-400 transition group-open:rotate-180">
                        ▼
                      </span>
                    </summary>

                    <p className="border-t border-red-200 bg-white px-4 py-3 text-[13px] font-medium leading-7 text-slate-700">
                      {item.text}
                    </p>
                  </details>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="hidden grid-cols-2 gap-4 p-7 sm:grid">
                {[
                  {
                    title: "وعود بأرباح مضمونة",
                    text: "لا توجد أرباح ثابتة أو مضمونة في التداول، وأي وعد بذلك يعد إشارة خطر.",
                  },
                  {
                    title: "غياب رقم الترخيص",
                    text: "احذر من شركة لا تعرض اسم كيانها القانوني ورقم ترخيصها بوضوح.",
                  },
                  {
                    title: "ضغط لزيادة الإيداع",
                    text: "لا تستجب لمن يضغط عليك لتحويل مبلغ أكبر أو الاقتراض.",
                  },
                  {
                    title: "عرقلة السحب",
                    text: "اختبر عملية السحب بمبلغ صغير قبل زيادة رأس المال.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="min-h-[118px] rounded-[18px] border border-red-200 bg-red-50/60 p-5"
                  >
                    <h3 className="text-[16px] font-black text-red-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-slate-700">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

           {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-24 bg-white py-7 sm:py-10"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden">
            <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700">
              الأسئلة الشائعة
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.3] tracking-tight text-slate-950">
              أسئلة حول أفضل شركات التداول
            </h2>

            <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700">
              إجابات مختصرة على أهم الأسئلة قبل اختيار الوسيط.
            </p>
          </div>

          <div className="hidden sm:block">
            <SectionHeading
              eyebrow="الأسئلة الشائعة"
              title="أسئلة حول أفضل شركات التداول"
              description="إجابات مختصرة على أهم الأسئلة قبل اختيار الوسيط."
            />
          </div>

          <div className="mt-5 space-y-2.5 sm:mt-6">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50 open:bg-white"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3 px-3.5 py-3.5 sm:px-4">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-[8px] font-black text-brand-600">
                    0{index + 1}
                  </span>

                  <h3 className="text-[12px] font-black leading-5 text-slate-950 sm:text-sm">
                    {item.question}
                  </h3>

                  <span className="text-[10px] text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="border-t border-slate-200 bg-white px-4 py-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-5 rounded-[18px] border border-brand-200 bg-brand-50 p-4 sm:mt-6 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-5">
            <div>
              <h2 className="text-[16px] font-black text-slate-950">
                لم تجد الوسيط المناسب؟
              </h2>

              <p className="mt-1 text-[12px] font-medium leading-6 text-slate-700">
                استخدم أداة الاختيار أو قارن شركتين مباشرة.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-0 sm:flex">
              <a
                href="#broker-finder"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-500 px-5 text-[12px] font-black text-white shadow-sm transition hover:bg-brand-600 sm:min-w-[145px] sm:text-sm"
              >
                اختيار الوسيط
              </a>

              <Link
                href="/compare"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-[12px] font-black text-slate-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 sm:min-w-[145px] sm:text-sm"
              >
                المقارنات
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}