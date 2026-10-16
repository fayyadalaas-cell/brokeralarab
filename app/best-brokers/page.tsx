import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import BestBrokersPageFinder from "../components/BestBrokersPageFinder";
import BestBrokersMobileTabs from "@/app/components/BestBrokersMobileTabs";
import { createClient } from "@/lib/supabase/server";
import CountryBrokerRedirect from "@/app/components/CountryBrokerRedirect";


export const metadata: Metadata = {
  title: "أفضل شركات تداول الفوركس 2026 | مقارنة الوسطاء المرخصين",

  description:
    "ما أفضل شركة تداول فوركس في 2026؟ قارن شركات الفوركس المرخصة والموثوقة حسب التراخيص والأمان والسبريد والمنصات والحسابات الإسلامية، واختر الوسيط المناسب لبلدك.",

  alternates: {
    canonical: "https://brokeralarab.com/best-brokers",
    languages: {
      ar: "https://brokeralarab.com/best-brokers",
      en: "https://brokeralarab.com/en/best-brokers",
      "x-default": "https://brokeralarab.com/en/best-brokers",
    },
  },

  openGraph: {
    title: "أفضل شركات تداول الفوركس في 2026 | بروكر العرب",
    description:
      "دليل مقارنة شركات تداول الفوركس المرخصة، مع تقييم الأمان والتراخيص والحسابات وتكاليف التداول واختيار الوسيط المناسب في الدول العربية.",
    url: "https://brokeralarab.com/best-brokers",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 820,
        alt: "أفضل شركات تداول الفوركس في 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "أفضل شركات تداول الفوركس في 2026",
    description:
      "قارن أفضل شركات الفوركس المرخصة حسب الأمان والتقييم والسبريد والمنصات والحسابات المتاحة.",
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
  return rating > 0 ? rating.toFixed(2) : "—";
}

function formatDeposit(value: number | null | undefined) {
  if (value === null || value === undefined) return "غير محدد";
  return `$${value.toLocaleString("en-US")}`;
}

function parseDeposit(value: string | null | undefined) {
  if (!value) return null;

  const normalized = value.trim();

  // لا نفترض أن أي عملة غير محددة هي الدولار.
  // نقبل هنا رقمًا منفردًا أو مبلغًا بالدولار فقط.
  const match = normalized.match(
    /^(?:USD\s*|\$\s*)?(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:USD)?$/i
  );

  if (!match) return null;

  const amount = Number(match[1].replace(/,/g, ""));

  return Number.isFinite(amount) && amount >= 0
    ? amount
    : null;
}

function isPositiveText(value: string | null | undefined) {
  if (!value) return false;

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  return [
    "yes",
    "true",
    "available",
    "supported",
    "نعم",
    "متوفر",
    "متاح",
    "مدعوم",
  ].includes(normalized);
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
  fallback: PreparedBroker[] = []
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
      <h2 className="max-w-[760px] text-[25px] font-black leading-[1.3] tracking-tight text-slate-950 min-[380px]:text-[27px] sm:text-[38px] lg:text-[42px]">
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
  .eq("publication_status", "published")
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

const { data: countryRankingsData, error: countryRankingsError } =
  await supabase
    .from("country_broker_rankings")
    .select(`
      country_id,
      broker_id,
      rank_position,
      country_rating,
      best_for,
      local_note
    `)
    .order("rank_position", { ascending: true });

if (countryRankingsError) {
  console.error(
    "Failed to load country broker rankings:",
    countryRankingsError
  );
}

const publishedBrokerIds = new Set(
  brokersData.map((broker) => broker.id)
);

const licenses = ((licensesResult.data || []) as BrokerLicense[]).filter(
  (license) => publishedBrokerIds.has(license.broker_id)
);

const accounts = ((accountsResult.data || []) as BrokerAccount[]).filter(
  (account) => publishedBrokerIds.has(account.broker_id)
);

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

    /* =========================================================
     STRUCTURED DATA — BEST FOREX BROKERS 2026
  ========================================================= */

  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "أفضل شركات تداول الفوركس في 2026",
      url: `${SITE_URL}/best-brokers`,
      description:
        "دليل شامل لمقارنة أفضل شركات تداول الفوركس في 2026، مع تقييم شركات الفوركس المرخصة والموثوقة حسب قوة التراخيص والأمان والسبريد والمنصات وأنواع الحسابات، ومساعدة المتداولين في الدول العربية على اختيار الوسيط المناسب.",
      inLanguage: "ar",

      datePublished: "2026-03-01",

      author: {
        "@type": "Organization",
        name: "فريق تحرير بروكر العرب",
        url: `${SITE_URL}/about`,
      },

      publisher: {
        "@type": "Organization",
        name: "بروكر العرب",
        url: SITE_URL,
      },

      isPartOf: {
        "@type": "WebSite",
        name: "بروكر العرب",
        url: SITE_URL,
      },

      mainEntity: {
        "@type": "ItemList",
        name: "أفضل شركات تداول الفوركس في 2026",
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
    },

    /* =========================================================
       BREADCRUMB SCHEMA
    ========================================================= */

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
          name: "أفضل شركات تداول الفوركس",
          item: `${SITE_URL}/best-brokers`,
        },
      ],
    },

    /* =========================================================
       ITEM LIST — TOP 10 FOREX BROKERS
    ========================================================= */

    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "أفضل شركات تداول الفوركس في 2026",
      description:
        "ترتيب ومقارنة شركات تداول الفوركس بناءً على تقييم بروكر العرب ومعايير التراخيص والأمان والتكاليف والمنصات والحسابات المتاحة.",
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

    /* =========================================================
       FAQ SCHEMA
    ========================================================= */

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
          __html: JSON.stringify(schemaData).replace(/</g, "\\u003c"),
        }}
      />

      
{/* ===================================================
    HERO — BEST FOREX BROKERS
=================================================== */}

<section className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31]">

  {/* Background */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
  >
    <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

    <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

    <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

    <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
  </div>

  <div className="relative mx-auto max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">

    {/* Breadcrumb */}
    <nav
      aria-label="مسار الصفحة"
      className="hidden items-center justify-start gap-2 text-[10px] font-bold text-blue-200/75 sm:flex sm:text-xs"
    >
      <Link
        href="/"
        className="transition hover:text-white"
      >
        الرئيسية
      </Link>

      <span className="text-blue-300/40">/</span>

      <span className="text-white">
        أفضل شركات التداول
      </span>
    </nav>

    {/* Main content */}
    <div className="mt-0 text-right sm:mt-5">

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
        دليل أفضل وسطاء الفوركس 2026
      </div>

      {/* H1 */}
      <h1 className="mt-3 max-w-[1400px] text-[30px] font-black leading-[1.12] tracking-[-0.035em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
        <span className="block sm:inline">
          أفضل شركات
        </span>{" "}

        <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
          تداول الفوركس في 2026
        </span>
      </h1>

      {/* Mobile description */}
      <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
        قارن شركات تداول الفوركس المرخصة حسب الأمان
        والتراخيص والسبريد والحسابات المتاحة،
        واختر الوسيط المناسب لبلدك.
      </p>

      {/* Desktop description */}
      <p className="mt-3 hidden max-w-[1180px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
        تبحث عن أفضل شركة تداول فوركس آمنة ومرخصة؟
        قارن شركات تداول الفوركس في 2026 حسب قوة
        التراخيص وتقييم الأمان والسبريد ومنصات التداول
        وأنواع الحسابات. تعرّف على أفضل الخيارات
        للمتداولين في الدول العربية، واختر الوسيط
        الأنسب لاحتياجاتك وبلد إقامتك.
      </p>

      {/* Trust information */}
      <div className="mt-2.5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">

        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          دليل الفوركس 2026
        </span>

        <span className="hidden h-3 w-px bg-white/20 sm:block" />

        <span className="inline-flex items-center gap-1.5">
          <span className="text-cyan-300">✓</span>
          مقارنة مستقلة للوسطاء
        </span>

        <span className="hidden h-3 w-px bg-white/20 sm:block" />

        <span className="hidden items-center gap-1.5 sm:inline-flex">
          <span className="text-cyan-300">✓</span>
          بيانات من قاعدة بروكر العرب
        </span>
      </div>

      {/* Stats + Buttons */}
      <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-start lg:gap-6">

        {/* Dynamic stats */}
        <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[620px]">

          <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
            <div className="text-base font-black text-[#66c8ff] sm:text-xl">
              {brokers.length}
            </div>
            <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
              شركة ضمن الدليل
            </div>
          </div>

          <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
            <div className="text-base font-black text-[#66c8ff] sm:text-xl">
              {accounts.length}
            </div>
            <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
              حساب تداول
            </div>
          </div>

          <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
            <div className="text-base font-black text-[#66c8ff] sm:text-xl">
              {uniqueRegulatorCount}
            </div>
            <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
              جهة رقابية مسجلة
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid w-full grid-cols-2 gap-2.5 sm:w-auto sm:gap-3">

          <a
            href="#comparison-table"
            className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">
              قارن الشركات
            </span>

            <span className="hidden sm:inline">
              مقارنة شركات الفوركس
            </span>

            <span aria-hidden="true">←</span>
          </a>

          <a
            href="#top-brokers"
            className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
          >
            <span>أفضل 3 شركات</span>
            <span aria-hidden="true">←</span>
          </a>

        </div>
      </div>
    </div>
  </div>
</section>


           
{/* =========================================================
    TOP THREE — BEST FOREX BROKERS 2026
========================================================= */}

<section
  id="top-brokers"
  aria-labelledby="top-brokers-title"
  className="scroll-mt-24 border-b border-slate-200 bg-white py-6 sm:py-8 lg:py-10"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

    
{/* SECTION INTRO */}
<div className="max-w-[1100px] text-right">

  <h2
    id="top-brokers-title"
    className="text-[27px] font-black leading-[1.3] tracking-tight text-[#081a33] sm:text-[36px] lg:text-[43px]"
  >
    ما هي أفضل
    <span className="text-[#2b6fd0]"> شركات تداول الفوركس </span>
    في 2026؟
  </h2>

  <p className="mt-3 max-w-[1050px] text-[13px] font-medium leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
    إذا كنت تبحث عن أفضل شركة تداول فوركس، فإن المقارنة
    لا تعتمد على شهرة الشركة وحدها. يراجع بروكر العرب
    التقييم العام والتراخيص وتكاليف التداول والمنصات
    وأنواع الحسابات لمساعدتك على اختيار وسيط مناسب.
    وفيما يلي الشركات الثلاث الأعلى ترتيبًا في دليلنا.
  </p>

</div>


    {/* DIRECT ANSWER — SEO + USER EXPERIENCE */}
    {topThree.length > 0 && (
      <div className="mt-6 rounded-[20px] border border-blue-100 bg-gradient-to-l from-[#eef5fd] via-[#f5f9ff] to-white p-4 sm:p-6">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d6e5f8] text-lg font-black text-[#1e5bb8]">
            ✓
          </div>

          <div className="min-w-0 flex-1">

            <h3 className="text-[14px] font-black text-[#102442] sm:text-[17px]">
              الإجابة المختصرة: ما أفضل شركة فوركس؟
            </h3>

            <p className="mt-2 text-[12px] font-medium leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
              وفقًا للترتيب العام المنشور في بروكر العرب،
              تتصدر{" "}
              <strong className="font-black text-[#123b72]">
                {cleanText(topThree[0].name)}
              </strong>{" "}
              قائمة أفضل شركات تداول الفوركس بتقييم{" "}
              <strong className="font-black text-[#123b72]">
                {ratingLabel(topThree[0].rating)} من 5
              </strong>

              {topThree[1] && (
                <>
                  ، تليها{" "}
                  <strong className="font-black text-[#123b72]">
                    {cleanText(topThree[1].name)}
                  </strong>{" "}
                  بتقييم {ratingLabel(topThree[1].rating)}
                </>
              )}

              {topThree[2] && (
                <>
                  ، ثم{" "}
                  <strong className="font-black text-[#123b72]">
                    {cleanText(topThree[2].name)}
                  </strong>{" "}
                  بتقييم {ratingLabel(topThree[2].rating)}
                </>
              )}

              . لكن الشركة الأعلى تقييمًا ليست بالضرورة
              الأنسب لكل متداول؛ إذ يعتمد الاختيار على
              بلد الإقامة والكيان المرخص وتكاليف الحساب
              وطريقة التداول.
            </p>

          </div>
        </div>
      </div>
    )}

    {/* =====================================================
        BROKER CARDS
    ===================================================== */}

    <div className="mt-5 grid grid-cols-1 gap-3 lg:mt-9 lg:grid-cols-3 lg:gap-5">

      {topThree.map((broker, index) => {

        const licenseCodes = Array.from(
          new Set(
            broker.licenses
              .map((license) =>
                license.regulator_code?.trim().toUpperCase()
              )
              .filter(
                (code): code is string => Boolean(code)
              )
          )
        ).slice(0, 5);

        const brokerName = cleanText(broker.name);

        const bestFor = cleanText(
  broker.best_for,
  "راجع تفاصيل الحسابات والمنصات لمعرفة مدى ملاءمة الوسيط"
);

const keyStrength = cleanText(
  broker.key_strength_ar,
  "اطلع على تقييم الوسيط ومزاياه وشروط التداول"
);

        const isFirst = index === 0;

        return (
          <article
            key={broker.id}
            className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)] ${
              isFirst
                ? "border-[#e7c66a] shadow-[0_10px_35px_rgba(180,135,30,0.09)]"
                : "border-slate-200 shadow-[0_8px_28px_rgba(15,23,42,0.045)]"
            }`}
          >

            {/* TOP ACCENT */}
            <div
              className={`h-1 ${
                isFirst
                  ? "bg-gradient-to-l from-amber-400 to-amber-500"
                  : "bg-gradient-to-l from-[#2b6fd0] to-[#59c0ff]"
              }`}
            />

            <div className="flex flex-1 flex-col p-3.5 sm:p-5 lg:p-6">

              {/* RANK + RATING */}
              <div className="flex items-center justify-between gap-2">

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black sm:text-[11px] ${
                    isFirst
                      ? "bg-amber-100 text-amber-900"
                      : "bg-[#eef5fd] text-[#1e5bb8]"
                  }`}
                >
                  {isFirst
                    ? "★ الأفضل إجمالًا"
                    : `المركز ${index + 1}`}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-800">
                  <span>★</span>
                  {ratingLabel(broker.rating)}
                  <span className="text-amber-700/70">/ 5</span>
                </span>

              </div>

              {/* BROKER IDENTITY */}
<div className="mt-3 flex items-center gap-3 sm:gap-4 lg:mt-5">

  <Link
    href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`افتح تقييم ${brokerName} في تبويب جديد`}
    title={`قراءة تقييم ${brokerName}`}
    className="shrink-0 rounded-[20px] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b6fd0]"
  >
    <BrokerLogo
      broker={broker}
      size="large"
    />
  </Link>

  <div className="min-w-0 flex-1">

    <h3 className="break-words text-[21px] font-black leading-tight text-[#0c1c34] sm:text-[24px]">
      <Link
        href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
        target="_blank"
        rel="noopener noreferrer"
        title={`قراءة تقييم ${brokerName}`}
        className="transition-colors hover:text-[#2b6fd0] hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-[#2b6fd0]"
      >
        {brokerName}
      </Link>
    </h3>

    <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-500 sm:text-xs">
      {keyStrength}
    </p>

  </div>
</div>

              {/* WHY THIS BROKER */}
              <div className="mt-5 rounded-2xl border border-[#dce9f9] bg-[#f3f8ff] p-3.5">

                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#dceafb] text-[12px] font-black text-[#1e5bb8]">
                    ✓
                  </span>

                  <h4 className="text-[11px] font-black text-[#123b72] sm:text-xs">
                    لمن يناسب هذا الوسيط؟
                  </h4>
                </div>

                <p className="mt-2 text-[12px] font-medium leading-6 text-slate-700">
                  {bestFor}
                </p>

              </div>

              {/* CORE FACTS */}
              <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                <div className="border-l border-slate-200 px-1.5 py-3 text-center sm:px-2">

                  <p className="text-[9px] font-bold text-slate-500">
                    الحد الأدنى
                  </p>

                  <p className="mt-1.5 text-[12px] font-black text-[#102442] sm:text-sm">
                    {formatDeposit(
                      getDisplayDeposit(broker)
                    )}
                  </p>

                </div>

                <div className="border-l border-slate-200 px-1.5 py-3 text-center sm:px-2">

                  <p className="text-[9px] font-bold text-slate-500">
  تراخيص مسجلة
</p>

                  <p className="mt-1.5 text-[12px] font-black text-[#102442] sm:text-sm">
                    {broker.active_license_count}
                  </p>

                </div>

                <div className="px-1.5 py-3 text-center sm:px-2">

                  <p className="text-[9px] font-bold text-slate-500">
                    حساب إسلامي
                  </p>

                  <p
                    className={`mt-1.5 text-[11px] font-black sm:text-xs ${
                      broker.has_islamic_account
                        ? "text-emerald-700"
                        : "text-slate-600"
                    }`}
                  >
                    {broker.has_islamic_account
                      ? "متوفر"
                      : "تحقق"}
                  </p>

                </div>
              </div>

              {/* LICENSE INFORMATION */}
              <div className="mt-4">

                <div className="flex items-center justify-between gap-2">

                  <p className="text-[11px] font-black text-[#142844]">
                    الجهات الرقابية المسجلة
                  </p>

                  <span className="text-[9px] font-semibold text-slate-400">
                   وفق بيانات بروكر العرب
                  </span>

                </div>

                {licenseCodes.length > 0 ? (

                  <div className="mt-2.5 flex min-h-[28px] flex-wrap gap-1.5">

                    {licenseCodes.map((code) => (

                      <span
                        key={`${broker.id}-${code}`}
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-black text-slate-700"
                      >
                        {code}
                      </span>

                    ))}

                  </div>

                ) : (

                  <p className="mt-2 text-[11px] text-slate-500">
                    راجع تفاصيل التراخيص في تقييم الشركة.
                  </p>

                )}

              </div>

              {/* TRANSPARENCY NOTE */}
              <p className="mt-3 text-[10px] font-medium leading-5 text-slate-500">
                قد تختلف الجهة الرقابية وشروط الحساب
                بحسب الكيان القانوني وبلد إقامة العميل.
              </p>

              {/* BUTTONS */}
              <div className="mt-auto pt-5">
                <BrokerButtons broker={broker} />
              </div>

            </div>
          </article>
        );
      })}

    </div>

    
{/* SAFETY + COUNTRIES — MOBILE OPTIMIZED */}
<div className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 lg:grid-cols-2 lg:gap-5">

  {/* LICENSED BROKERS */}
  <div className="rounded-[20px] border border-slate-200 bg-[#f8fafc] p-4 sm:rounded-[22px] sm:p-6">

    <span className="inline-flex rounded-full bg-[#e8f1fc] px-3 py-1.5 text-[10px] font-black text-[#1e5bb8]">
      التراخيص وحماية المتداول
    </span>

    <h3 className="mt-3 text-[17px] font-black leading-7 text-[#0b1c34] sm:text-[21px]">
      كيف تختار شركة تداول فوركس آمنة ومرخصة؟
    </h3>

    <p className="mt-2 text-[12px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-[13px] sm:leading-7">
      قبل فتح حساب تداول، تحقق من اسم الكيان القانوني
      ورقم ترخيصه في السجل الرسمي للجهة الرقابية.
      فالترخيص وشروط الحماية قد تختلف حسب بلد الإقامة.
    </p>

    {/* MOBILE DETAILS */}
    <details className="group mt-2 sm:hidden">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 py-2 text-[11px] font-black text-[#1e5bb8] [&::-webkit-details-marker]:hidden">
        <span>اقرأ التفاصيل</span>
        <span className="transition-transform group-open:rotate-180">⌄</span>
      </summary>

      <div className="space-y-2 border-t border-slate-200 pt-3 text-[12px] font-medium leading-7 text-slate-600">
        <p>
          لا يكفي وجود شعار جهة رقابية على موقع الشركة؛
          فقد تعمل العلامة التجارية من خلال عدة كيانات
          تختلف في مستوى الحماية وشروط التداول.
        </p>
        <p>
          راجع سياسة سحب الأموال، وفصل أموال العملاء،
          والحماية من الرصيد السلبي إن كانت متاحة،
          وتكاليف التداول. الترخيص لا يلغي مخاطر الخسارة.
        </p>
      </div>
    </details>

    {/* DESKTOP DETAILS */}
    <div className="mt-2 hidden space-y-2 text-[13px] font-medium leading-7 text-slate-600 sm:block">
      <p>
        لا يكفي وجود شعار جهة رقابية على موقع الشركة؛
        فقد تعمل العلامة التجارية من خلال عدة كيانات
        تختلف في مستوى الحماية وشروط التداول.
      </p>
      <p>
        راجع أيضًا سياسة سحب الأموال، وفصل أموال
        العملاء، والحماية من الرصيد السلبي إن كانت
        متاحة، وتكاليف التداول قبل اتخاذ القرار.
        والترخيص لا يلغي مخاطر الخسارة في الفوركس.
      </p>
    </div>

    <div className="mt-3 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
      <Link
        href="/licenses"
        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#1e5bb8] px-3 py-2 text-[11px] font-black text-white transition hover:bg-[#184a97] sm:min-h-11 sm:px-5 sm:text-xs"
      >
        دليل تراخيص التداول ←
      </Link>

      <Link
        href="/how-we-review-brokers"
        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-blue-200 bg-white px-3 py-2 text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-50 sm:min-h-11 sm:px-5 sm:text-xs"
      >
        كيف نقيّم الوسطاء؟
      </Link>
    </div>
  </div>

  {/* ARAB COUNTRIES */}
  <div className="rounded-[20px] border border-slate-200 bg-[#f8fafc] p-4 sm:rounded-[22px] sm:p-6">

    <span className="inline-flex rounded-full bg-[#e8f1fc] px-3 py-1.5 text-[10px] font-black text-[#1e5bb8]">
      اختيار الوسيط حسب بلد الإقامة
    </span>

    <h3 className="mt-3 text-[17px] font-black leading-7 text-[#0b1c34] sm:text-[21px]">
      هل تختلف أفضل شركات الفوركس بين الدول العربية؟
    </h3>

    <p className="mt-2 text-[12px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-[13px] sm:leading-7">
      نعم. تختلف الشركات والكيانات المرخصة وطرق الإيداع
      والسحب حسب الدولة، لذلك اختر وسيطًا يناسب بلد
      إقامتك بدل الاعتماد على ترتيب عالمي فقط.
    </p>

    {/* MOBILE DETAILS */}
    <details className="group mt-2 sm:hidden">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 py-2 text-[11px] font-black text-[#1e5bb8] [&::-webkit-details-marker]:hidden">
        <span>لماذا يختلف الاختيار حسب الدولة؟</span>
        <span className="transition-transform group-open:rotate-180">⌄</span>
      </summary>

      <p className="border-t border-slate-200 pt-3 text-[12px] font-medium leading-7 text-slate-600">
        قد تختلف أهلية فتح الحساب، والدعم المحلي،
        والجهة الرقابية، وطرق الدفع بين السعودية
        والإمارات والكويت وقطر ومصر وغيرها.
        تحقق من شروط الوسيط قبل التسجيل.
      </p>
    </details>

    {/* DESKTOP DETAILS */}
    <div className="mt-2 hidden space-y-2 text-[13px] font-medium leading-7 text-slate-600 sm:block">
      <p>
        فقد تختلف الشركات المتاحة والكيانات القانونية
        وطرق الإيداع والسحب والدعم المحلي حسب بلد
        إقامة المتداول. لذلك لا توجد شركة واحدة يمكن
        اعتبارها الأفضل لجميع المتداولين في الدول العربية.
      </p>
      <p>
        استخدم تصنيفات بروكر العرب حسب الدولة لمقارنة
        الوسطاء المناسبين لسوقك، ثم تحقق من أهلية
        فتح الحساب والتراخيص وشروط الخدمة قبل التسجيل.
      </p>
    </div>

    {/* COUNTRY LINKS */}
    <div className="mt-3 flex flex-wrap gap-2 sm:mt-5 sm:gap-2.5">
      {countries
        .filter((country) =>
          ["saudi-arabia", "uae", "kuwait", "qatar", "egypt"].includes(
            country.slug
          )
        )
        .map((country) => (
          <Link
            key={country.id}
            href={`/best-brokers/${country.slug}`}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#184a97] transition hover:bg-blue-50 sm:min-h-10 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs"
          >
            <span>{country.flag_emoji || "🌍"}</span>
            <span>{country.country_name_ar}</span>
            <span aria-hidden="true">←</span>
          </Link>
        ))}
    </div>
  </div>
</div>


    {/* METHODOLOGY NOTE */}
    <p className="mt-5 text-center text-[11px] font-medium leading-6 text-slate-500 sm:text-xs">
      الترتيب مبني على بيانات ومعايير التقييم المنشورة
      في بروكر العرب، ولا يمثل توصية استثمارية شخصية
      أو ضمانًا لأمان الأموال أو تحقيق الأرباح.
    </p>

  </div>
</section>


{/* FOREX TRADING PLATFORMS — MOBILE OPTIMIZED */}
<section
  id="forex-platforms"
  aria-labelledby="forex-platforms-title"
 className="border-b border-slate-200 bg-[#f5f8fd] py-6 sm:py-9"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
    <div className="max-w-[1050px]">
      

     <h2
  id="forex-platforms-title"
  className="text-[23px] font-black leading-[1.35] text-[#081a33] sm:text-[38px]"
>
        ما أفضل منصة تداول فوركس للمبتدئين والمحترفين؟
      </h2>

      <p className="mt-3 text-[12px] font-medium leading-6 text-slate-700 sm:mt-4 sm:text-base sm:leading-8">
        تختلف أفضل منصة تداول فوركس حسب خبرة المتداول
        واحتياجاته. تعرّف على أشهر ثلاث منصات، وقارن
        أدوات التحليل وسهولة الاستخدام والتداول الآلي.
      </p>

      <p className="mt-3 hidden text-sm font-medium leading-8 text-slate-700 sm:block">
        من المهم التمييز بين شركة الوساطة التي توفر حساب
        التداول وبين البرنامج المستخدم لتحليل الأسعار
        وتنفيذ الأوامر. كما تختلف المنصات المتاحة من
        وسيط إلى آخر.
      </p>
    </div>

    <div className="mt-5 grid grid-cols-1 gap-2.5 md:mt-7 md:grid-cols-3 md:gap-4">
      {[
        {
          name: "MetaTrader 4",
          short: "MT4",
          title: "منصة معروفة لتداول الفوركس",
          description:
            "توفر الرسوم البيانية والمؤشرات الفنية وأوامر التداول ودعم المستشارين الخبراء، وتناسب من يريد بيئة مألوفة لتداول العملات.",
        },
        {
          name: "MetaTrader 5",
          short: "MT5",
          title: "أدوات تحليل وتداول أوسع",
          description:
            "توفر أدوات تحليل إضافية وأطرًا زمنية متعددة وإمكانات للتداول الآلي. تختلف الأدوات المالية المتاحة بحسب شركة الوساطة.",
        },
        {
          name: "cTrader",
          short: "cTrader",
          title: "واجهة متقدمة للتداول",
          description:
            "تقدم أدوات للرسوم البيانية وإدارة الأوامر وتحليل السوق، وقد تناسب المتداولين الذين يهتمون بتفاصيل التنفيذ وتجربة المنصة.",
        },
      ].map((platform) => (
        <article
          key={platform.short}
          className="rounded-[18px] border border-slate-200 bg-white p-3.5 shadow-sm sm:p-6 md:rounded-[22px]"
        >
          {/* MOBILE */}
          <details className="group md:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
              <span className="inline-flex min-w-[54px] shrink-0 items-center justify-center rounded-lg bg-blue-50 px-2 py-2 text-[11px] font-black text-[#1e5bb8]">
                {platform.short}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-black text-slate-950">
                  {platform.name}
                </span>
                <span className="mt-0.5 block text-[11px] font-medium text-slate-600">
                  {platform.title}
                </span>
              </span>

              <span className="shrink-0 text-lg font-black text-[#1e5bb8] transition-transform group-open:rotate-180">
                ⌄
              </span>
            </summary>

            <p className="mt-3 border-t border-slate-100 pt-3 text-[12px] font-medium leading-7 text-slate-600">
              {platform.description}
            </p>
          </details>

          {/* DESKTOP */}
          <div className="hidden md:block">
            <div className="inline-flex rounded-lg bg-blue-50 px-3 py-2 text-sm font-black text-[#1e5bb8]">
              {platform.short}
            </div>

            <h3 className="mt-4 text-xl font-black text-slate-950">
              {platform.name}
            </h3>

            <p className="mt-2 text-sm font-bold text-[#1e5bb8]">
              {platform.title}
            </p>

            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
              {platform.description}
            </p>
          </div>
        </article>
      ))}
    </div>

    <div className="mt-4 rounded-2xl border border-blue-100 bg-white p-4 sm:mt-6 sm:p-6">
      <h3 className="text-[15px] font-black leading-6 text-[#081a33] sm:text-lg">
        هل أفضل منصة فوركس تعني أفضل شركة تداول؟
      </h3>

      <p className="mt-2 text-[12px] font-medium leading-7 text-slate-700 sm:mt-3 sm:text-sm sm:leading-8">
        لا. قد تقدم شركتان منصة MetaTrader 5 نفسها،
        لكن تختلفان في التراخيص والسبريد والعمولات
        وسرعة التنفيذ. لذلك قارن الوسيط وشروط حسابه،
        وليس برنامج التداول وحده.
      </p>

      <a
        href="#comparison-table"
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-[#1e5bb8] px-4 py-2.5 text-[11px] font-black text-white transition hover:bg-[#184a97] sm:mt-4 sm:min-h-11 sm:w-auto sm:px-5 sm:text-xs"
      >
        قارن شركات الفوركس والمنصات المتاحة ←
      </a>
    </div>
  </div>
</section>


          
{/* TOP TEN — BROKER COMPARISON CARDS */}
<section
  id="comparison-table"
  aria-labelledby="broker-comparison-heading"
  className="scroll-mt-20 border-b border-slate-200 bg-white pt-5 pb-9 sm:pt-7 sm:pb-12 lg:pt-8 lg:pb-14"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">

    
{/* HEADING */}
<div className="mb-4 lg:mb-6">

  <div className="flex flex-wrap items-center justify-between gap-2">

    <h2
      id="broker-comparison-heading"
      className="text-[24px] font-black leading-[1.35] text-[#081a33] sm:text-[32px] lg:text-[38px]"
    >
      مقارنة أفضل 10 شركات تداول فوركس في 2026
    </h2>

    <span className="text-[11px] font-bold text-slate-500">
      {topTen.length} شركات حسب التقييم العام
    </span>

  </div>

  <p className="mt-2 max-w-[1050px] text-[12px] font-medium leading-7 text-slate-600 sm:text-[14px]">
    اكتشف الفروقات بين شركات الفوركس من حيث التقييم،
    التراخيص، الحد الأدنى للإيداع ومنصات التداول،
    واختر الوسيط الذي يناسب احتياجاتك.
  </p>

</div>


    {/* BROKER CARDS */}
    <div className="space-y-3 lg:space-y-4">
      {topTen.map((broker, index) => {
        const brokerName = cleanText(broker.name);

        const reviewHref = broker.slug
          ? `/brokers/${broker.slug}`
          : "/brokers";

        const licenseCodes = Array.from(
          new Set(
            broker.licenses
              .map((license) =>
                license.regulator_code?.trim().toUpperCase()
              )
              .filter(
                (code): code is string => Boolean(code)
              )
          )
        ).slice(0, 5);

        const platforms = Array.from(
          new Set(splitItems(broker.platforms, 5))
        ).slice(0, 4);

        return (
          <article
            key={broker.id}
            className={`relative overflow-hidden rounded-[20px] border bg-white transition-shadow hover:shadow-[0_12px_35px_rgba(15,23,42,0.07)] ${
              index === 0
                ? "border-[#e8c66a] shadow-[0_4px_20px_rgba(180,130,20,0.06)]"
                : "border-[#dfe7f1] shadow-[0_3px_14px_rgba(15,23,42,0.025)]"
            }`}
          >
            {/* LEFT/RIGHT ACCENT */}
            <div
              className={`absolute inset-y-0 right-0 w-[3px] ${
                index === 0
                  ? "bg-amber-400"
                  : "bg-[#2b6fd0]"
              }`}
            />

            
<div className="p-3 sm:p-4 lg:px-6 lg:py-5">

  {/* =====================================================
      MOBILE — COMPACT EXPANDABLE BROKER CARD
  ===================================================== */}
  <div className="lg:hidden">

    <details className="group">

      {/* COMPACT SUMMARY */}
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">

        {/* BROKER HEADER */}
        <div className="flex items-center gap-2.5">

          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-black ${
              index === 0
                ? "bg-amber-100 text-amber-800"
                : "bg-[#edf4fd] text-[#1e5bb8]"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="shrink-0">
            <BrokerLogo broker={broker} size="small" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[14px] font-black text-[#081a33]">
              {brokerName}
            </h3>

            <p className="mt-0.5 truncate text-[10px] font-medium text-slate-500">
              {cleanText(
                broker.best_for,
                "وسيط تداول فوركس"
              )}
            </p>
          </div>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[16px] font-bold text-[#1e5bb8] transition-transform group-open:rotate-180">
            ⌄
          </span>
        </div>

        {/* QUICK METRICS */}
        <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-[#e2eaf4] bg-[#f7faff]">

          <div className="px-1 py-2 text-center">
            <p className="text-[9px] font-bold text-slate-500">
              التقييم
            </p>

            <div className="mt-1 flex justify-center">
              <RatingBadge rating={broker.rating} />
            </div>
          </div>

          <div className="border-x border-[#e2eaf4] px-1 py-2 text-center">
            <p className="text-[9px] font-bold text-slate-500">
              أقل إيداع
            </p>

            <p className="mt-1 text-[12px] font-black text-[#081a33]">
              {formatDeposit(getDisplayDeposit(broker))}
            </p>
          </div>

          <div className="px-1 py-2 text-center">
            <p className="text-[9px] font-bold text-slate-500">
              تراخيص مسجلة
            </p>

            <p className="mt-1 text-[12px] font-black text-[#081a33]">
              {broker.active_license_count}
            </p>
          </div>

        </div>

        {/* EXPAND ACTION */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-2 text-[11px] font-black text-[#1e5bb8]">
          <span className="group-open:hidden">
            عرض تفاصيل الشركة
          </span>

          <span className="hidden group-open:inline">
            إخفاء التفاصيل
          </span>

          <span className="transition-transform group-open:rotate-180">
            ⌄
          </span>
        </div>

      </summary>

      {/* EXPANDED CONTENT */}
      <div className="mt-3 space-y-3 border-t border-[#e2eaf4] pt-3">

        {/* RANKING LABEL */}
        {index === 0 && (
          <div className="rounded-lg bg-amber-50 px-3 py-2 text-center text-[10px] font-black text-amber-800">
            ★ الأفضل حسب التقييم العام
          </div>
        )}

        {/* ISLAMIC ACCOUNT */}
        <div className="flex items-center justify-between rounded-xl bg-[#f3f8ff] px-3 py-2.5">
          <span className="text-[11px] font-bold text-slate-700">
            الحساب الإسلامي
          </span>

          <span
            className={`text-[11px] font-black ${
              broker.has_islamic_account
                ? "text-emerald-700"
                : "text-slate-600"
            }`}
          >
            {broker.has_islamic_account
              ? "متوفر"
              : "تحقق من الشروط"}
          </span>
        </div>

        {/* LICENSES */}
        <div>
          <p className="mb-2 text-[11px] font-black text-[#081a33]">
            الجهات الرقابية المسجلة
          </p>

          <div className="flex flex-wrap gap-1.5">
            {licenseCodes.length > 0 ? (
              licenseCodes.map((code) => (
                <span
                  key={`${broker.id}-mobile-license-${code}`}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-700"
                >
                  {code}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-500">
                غير محدد
              </span>
            )}
          </div>
        </div>

        {/* PLATFORMS */}
        <div>
          <p className="mb-2 text-[11px] font-black text-[#081a33]">
            منصات التداول
          </p>

          <div className="flex flex-wrap gap-1.5">
            {platforms.length > 0 ? (
              platforms.map((platform) => (
                <span
                  key={`${broker.id}-mobile-platform-${platform}`}
                  className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-[#1e5bb8]"
                >
                  {platform}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-500">
                غير محدد
              </span>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="pt-1">
          <BrokerButtons broker={broker} compact />
        </div>

        <Link
          href={reviewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-9 items-center justify-center text-[11px] font-black text-[#1e5bb8] hover:underline"
        >
          اقرأ تقييم {brokerName} الكامل ←
        </Link>

      </div>
    </details>
  </div>

  {/* =====================================================
      DESKTOP — KEEP EXISTING DESIGN
  ===================================================== */}
  <div className="hidden lg:block">

    <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,1.1fr)_170px] items-center gap-5">

      {/* BROKER IDENTITY */}
      <div className="min-w-0 w-full justify-self-center">
        <div className="flex items-center justify-center gap-3">

          <span
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-black ${
              index === 0
                ? "bg-amber-100 text-amber-800"
                : "bg-[#edf4fd] text-[#1e5bb8]"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <Link
            href={reviewHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`تقييم ${brokerName}`}
            className="shrink-0 transition-transform hover:scale-105"
          >
            <BrokerLogo broker={broker} size="small" />
          </Link>

          <div className="min-w-0 flex-1">
            <h3 className="text-[16px] font-black leading-6 text-[#081a33]">
              <Link
                href={reviewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1e5bb8] hover:underline"
              >
                {brokerName}
              </Link>
            </h3>

            <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-5 text-slate-500">
              {cleanText(
                broker.best_for,
                "وسيط تداول متعدد الاستخدامات"
              )}
            </p>
          </div>
        </div>

        {index === 0 && (
          <span className="mt-3 inline-flex rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-800">
            ★ الأفضل حسب التقييم العام
          </span>
        )}
      </div>

      {/* MAIN METRICS */}
      <div className="grid w-full max-w-[360px] grid-cols-3 items-center justify-self-center overflow-hidden rounded-[14px] border border-[#e2eaf4] bg-[#f7faff]">

        <div className="px-2 py-3 text-center">
          <p className="text-[10px] font-bold text-slate-500">
            التقييم
          </p>

          <div className="mt-1.5 flex justify-center">
            <RatingBadge rating={broker.rating} />
          </div>
        </div>

        <div className="border-x border-[#e2eaf4] px-2 py-3 text-center">
          <p className="text-[10px] font-bold text-slate-500">
            أقل إيداع
          </p>

          <p className="mt-1 text-[14px] font-black text-[#081a33]">
            {formatDeposit(getDisplayDeposit(broker))}
          </p>
        </div>

        <div className="px-2 py-3 text-center">
          <p className="text-[10px] font-bold text-slate-500">
            تراخيص مسجلة
          </p>

          <p className="mt-1 text-[14px] font-black text-[#081a33]">
            {broker.active_license_count ?? "—"}
          </p>
        </div>

      </div>

      {/* DESKTOP DETAILS */}
      <div className="min-w-0 w-full space-y-3 justify-self-center text-center">

        <div>
          <p className="mb-1.5 text-[10px] font-black text-slate-500">
            الجهات الرقابية
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {licenseCodes.length > 0 ? (
              licenseCodes.map((code) => (
                <span
                  key={`${broker.id}-license-${code}`}
                  className="rounded-md border border-[#dfe7f1] bg-white px-2 py-1 text-[9px] font-black text-[#334b68]"
                >
                  {code}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-slate-500">
                غير محدد
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[10px] font-black text-slate-500">
            منصات التداول
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {platforms.length > 0 ? (
              platforms.map((platform) => (
                <span
                  key={`${broker.id}-platform-${platform}`}
                  className="rounded-md bg-[#eef5fd] px-2 py-1 text-[9px] font-bold text-[#1e5bb8]"
                >
                  {platform}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-slate-500">
                غير محدد
              </span>
            )}
          </div>
        </div>

      </div>

      {/* DESKTOP ACTIONS */}
      <div className="w-[170px] justify-self-center text-center">
        <BrokerButtons broker={broker} compact />

        <Link
          href={reviewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-center text-[10px] font-bold text-[#1e5bb8] hover:underline"
        >
          التفاصيل الكاملة ←
        </Link>
      </div>

    </div>
  </div>

</div>

          </article>
        );
      })}
    </div>

    {/* DISCLAIMER */}
    <p className="mt-5 text-[11px] font-medium leading-6 text-slate-500">
      الترتيب وفق التقييم العام في بروكر العرب، وليس
      توصية استثمارية. تختلف شروط التداول والتراخيص
      والحسابات المتاحة حسب بلد الإقامة والكيان القانوني.
      تحقق من التفاصيل الرسمية قبل فتح حساب.
    </p>
  </div>
</section>


         

{/* BROKER FINDER — NEW DESIGN */}
<section
  id="broker-finder"
  aria-labelledby="broker-finder-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-white py-7 sm:py-11"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">

    {/* SECTION HEADER */}
    <div className="mx-auto mb-6 max-w-[920px] text-center sm:mb-8">
      <h2
        id="broker-finder-title"
        className="text-[25px] font-black leading-[1.35] text-[#081a33] sm:text-[37px]"
      >
        اعثر على{" "}
        <span className="text-[#2B6FD0]">
          شركة التداول المناسبة لك
        </span>
      </h2>

      <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600 sm:text-[16px]">
        اختر دولة إقامتك ومعيارًا إضافيًا واحدًا على الأقل،
        وسنساعدك في مقارنة أفضل 3 وسطاء حسب بيانات بروكر العرب.
      </p>
    </div>

    {/* BROKER FINDER */}
    <BestBrokersPageFinder
      brokers={brokersData}
      countries={countries
        .filter((country) =>
          [
            "saudi-arabia",
            "uae",
            "egypt",
            "jordan",
            "kuwait",
            "qatar",
            "bahrain",
            "oman",
            "algeria",
            "palestine",
            "lebanon",
            "iraq",
            "libya",
            "syria",
            "yemen",
          ].includes(country.slug)
        )
        .map((country) => ({
          id: country.id,
          slug: country.slug,
          name: country.country_name_ar,
          flag: country.flag_emoji,
        }))}
      countryRankings={(countryRankingsData || []).map((row) => ({
        country_id: row.country_id,
        broker_id: row.broker_id,
        rank_position: row.rank_position,
        country_rating: row.country_rating,
        best_for: row.best_for,
        local_note: row.local_note,
      }))}
      rankingsError={Boolean(countryRankingsError)}
    />

    

{/* ARABIC COUNTRY LINKS — 15 COUNTRIES ONLY */}
<nav
  aria-label="أفضل شركات التداول حسب الدولة"
  className="mx-auto mt-5 max-w-[1250px] border-t border-slate-200 pt-4 sm:mt-7 sm:pt-5"
>
  <h3 className="text-center text-[12px] font-black text-[#081a33] sm:text-sm">
    استكشف تصنيفات شركات التداول حسب الدولة
  </h3>

  <div className="mx-auto mt-3 grid max-w-[1050px] grid-cols-3 gap-1.5 sm:mt-5 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
    {countries
      .filter((country) =>
        [
          "saudi-arabia",
          "uae",
          "kuwait",
          "qatar",
          "bahrain",
          "oman",
          "jordan",
          "egypt",
          "iraq",
          "syria",
          "libya",
          "yemen",
          "lebanon",
          "algeria",
          "palestine",
        ].includes(country.slug)
      )
      .map((country) => {
        const flagCodes: Record<string, string> = {
          "saudi-arabia": "sa",
          uae: "ae",
          kuwait: "kw",
          qatar: "qa",
          bahrain: "bh",
          oman: "om",
          jordan: "jo",
          egypt: "eg",
          iraq: "iq",
          syria: "sy",
          libya: "ly",
          yemen: "ye",
          lebanon: "lb",
          algeria: "dz",
          palestine: "ps",
        };

        const flagCode = flagCodes[country.slug];

        return (
          <Link
            key={country.id}
            href={`/best-brokers/${country.slug}`}
            className="group flex min-h-[62px] min-w-0 flex-col items-center justify-center gap-1 rounded-lg border border-[#d6e5f8] bg-[#f8fbff] px-1 py-2 text-[#184A97] shadow-[0_2px_6px_rgba(30,91,184,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2B6FD0] hover:bg-[#EEF5FD] hover:shadow-md sm:grid sm:min-h-[50px] sm:grid-cols-[28px_minmax(0,1fr)_14px] sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2"
          >
            {/* FLAG */}
            <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d6e5f8] bg-white shadow-sm sm:h-7 sm:w-7">
              <img
                src={`https://flagcdn.com/w80/${flagCode}.png`}
                alt={`علم ${country.country_name_ar}`}
                width={28}
                height={28}
                loading="lazy"
                className="block h-full w-full rounded-full object-cover"
              />
            </span>

            {/* COUNTRY NAME */}
            <span className="min-w-0 text-center text-[10px] font-black leading-4 sm:text-[12px] sm:leading-5">
              {country.country_name_ar}
            </span>

            {/* ARROW — DESKTOP ONLY */}
            <span
              aria-hidden="true"
              className="hidden text-center text-[12px] text-[#8aa9d0] transition group-hover:text-[#1E5BB8] sm:block"
            >
              ←
            </span>
          </Link>
        );
      })}
  </div>
</nav>

  </div>
</section>


     
{/* SEO DISCOVERY HUB — BEST BROKERS */}
<div dir="rtl">

  {/* 1 — BEST BROKERS BY USE CASE */}
  <section
    id="use-cases"
    aria-labelledby="use-cases-title"
    className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-10 sm:py-14"
  >
    <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[850px] text-center">
        <span className="inline-flex rounded-full bg-[#e6f0ff] px-4 py-1.5 text-[11px] font-black text-[#1E5BB8]">
          اختر حسب احتياجاتك
        </span>

        <h2
          id="use-cases-title"
          className="mt-4 text-[25px] font-black text-[#081a33] sm:text-[34px]"
        >
          أفضل شركات التداول حسب الاستخدام
        </h2>

        <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[15px]">
          لا توجد شركة تداول واحدة تناسب جميع المتداولين.
          قارن الوسطاء وفق احتياجاتك، مثل شروط الحساب
          ومنصات التداول والحد الأدنى للإيداع والتراخيص.
        </p>
      </div>

      {/* MOBILE BROKER PICKS — OLD TABS REMOVED */}
<div className="mt-6 grid grid-cols-1 gap-3 sm:hidden">
  {useCasePicks.map((item) => (
    <article
      key={item.title}
      className="rounded-2xl border border-[#d6e5f8] bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-[13px] font-black text-[#123B72]">
          {item.title}
        </h3>
        <RatingBadge rating={item.broker.rating} />
      </div>

      <div className="flex items-center gap-3">
        <BrokerLogo broker={item.broker} size="normal" />

        <div className="min-w-0 flex-1">
          <Link
            href={
              item.broker.slug
                ? `/brokers/${item.broker.slug}`
                : "/brokers"
            }
            className="text-[15px] font-black text-[#081a33] hover:text-[#1E5BB8]"
          >
            {cleanText(item.broker.name)}
          </Link>

          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-[#f5f8fd] p-3 text-center">
        <div>
          <span className="block text-[10px] text-slate-500">
            الحد الأدنى للإيداع
          </span>
          <strong className="mt-1 block text-[12px] text-[#081a33]">
            {formatDeposit(getDisplayDeposit(item.broker))}
          </strong>
        </div>

        <div>
          <span className="block text-[10px] text-slate-500">
            التراخيص المسجلة
          </span>
          <strong className="mt-1 block text-[12px] text-[#081a33]">
            {item.broker.active_license_count}
          </strong>
        </div>
      </div>

      <div className="mt-3">
        <BrokerButtons broker={item.broker} compact />
      </div>
    </article>
  ))}
</div>

      {/* EXISTING BROKER PICKS */}
      <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3">
        {useCasePicks.map((item) => (
          <article
            key={`${item.title}-${item.broker.id}`}
            className="flex min-h-[250px] flex-col rounded-[22px] border border-[#dce7f5] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-[#a9c8f1] hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#eef5fd] px-3 py-1.5 text-[10px] font-black text-[#1E5BB8]">
                {item.shortTitle}
              </span>
              <RatingBadge rating={item.broker.rating} />
            </div>

            <div className="mt-5 flex items-center gap-4">
              <BrokerLogo broker={item.broker} size="normal" />

              <div className="min-w-0">
                <h3 className="truncate text-lg font-black text-[#081a33]">
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
                <div className="text-[10px] text-slate-500">
                  الحد الأدنى للإيداع
                </div>
                <div className="mt-1 text-xs font-black text-slate-950">
                  {formatDeposit(getDisplayDeposit(item.broker))}
                </div>
              </div>

              <div className="px-2 py-3 text-center">
                <div className="text-[10px] text-slate-500">
                  التراخيص
                </div>
                <div className="mt-1 text-xs font-black text-slate-950">
                  {item.broker.active_license_count}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <BrokerButtons broker={item.broker} compact />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  

{/* 2 — BROKERS BY FINANCIAL MARKET */}
<section
  id="trading-markets"
  aria-labelledby="trading-markets-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-white py-6 sm:py-14 [&_a]:text-center [&_article]:text-center [&_a>div]:text-center [&_article>div]:text-center [&_a>div:first-child]:mx-auto [&_article>div:first-child]:mx-auto [&_a>h3]:text-center [&_article>h3]:text-center [&_a>p]:text-center [&_article>p]:text-center"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[850px] text-center">
      <span className="text-[10px] font-black text-[#2B6FD0] sm:text-[11px]">
        تصنيفات حسب الأسواق المالية
      </span>

      <h2
        id="trading-markets-title"
        className="mt-2 text-[21px] font-black leading-[1.4] text-[#081a33] sm:mt-3 sm:text-[34px]"
      >
        أفضل شركات التداول حسب السوق المالي
      </h2>

      <p className="mt-2 text-[11px] leading-6 text-slate-600 sm:mt-3 sm:text-[15px] sm:leading-7">
        <span className="sm:hidden">
          اختر السوق الذي ترغب في تداوله واستكشف أفضل الوسطاء.
        </span>
        <span className="hidden sm:inline">
          تختلف تكلفة التداول والأدوات المتاحة من وسيط لآخر.
          استكشف أدلتنا المتخصصة لمقارنة شركات تداول الفوركس
          والأسهم والمؤشرات والسلع، واختيار الوسيط وفق السوق
          الذي ترغب في التداول فيه.
        </span>
      </p>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-4 lg:grid-cols-4">
      {[
        {
          title: "أفضل شركات تداول الفوركس",
          mobileTitle: "تداول الفوركس",
          description:
            "قارن وسطاء سوق العملات من حيث السبريد والتنفيذ والمنصات وشروط الحساب.",
          href: "/best-brokers",
          icon: "💱",
          keyword: "وسطاء الفوركس",
        },
        {
          title: "أفضل شركات تداول الأسهم",
          mobileTitle: "تداول الأسهم",
          description:
            "اكتشف وسطاء تداول الأسهم وقارن الأدوات المتاحة والرسوم وطبيعة المنتجات.",
          href: "/best-brokers/stocks",
          icon: "📈",
          keyword: "تداول الأسهم",
        },
        {
          title: "أفضل شركات تداول المؤشرات",
          mobileTitle: "تداول المؤشرات",
          description:
            "تعرف على وسطاء المؤشرات العالمية وشروط التداول والرافعة والرسوم.",
          href: "/best-brokers/indices",
          icon: "📊",
          keyword: "تداول المؤشرات",
        },
        {
          title: "أفضل شركات تداول السلع",
          mobileTitle: "تداول السلع والذهب",
          description:
            "قارن شركات تداول السلع مثل الذهب والنفط من حيث التكلفة والأدوات المتاحة.",
          href: "/best-brokers/commodities",
          icon: "🥇",
          keyword: "تداول السلع والذهب",
        },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex min-w-0 flex-col rounded-xl border border-[#d6e5f8] bg-[#f9fbff] p-3 transition hover:border-[#2B6FD0] hover:bg-[#eef5fd] sm:rounded-[22px] sm:p-5 sm:hover:-translate-y-1 sm:hover:shadow-lg"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[20px] shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl sm:text-[27px]">
            {item.icon}
          </div>

          <h3 className="mt-2.5 text-[12px] font-black leading-5 text-[#081a33] sm:mt-5 sm:text-[16px] sm:leading-7">
            <span className="sm:hidden">{item.mobileTitle}</span>
            <span className="hidden sm:inline">{item.title}</span>
          </h3>

          <p className="mt-2 hidden flex-1 text-[12px] leading-7 text-slate-600 sm:block">
            {item.description}
          </p>

          <div className="mt-auto pt-3 sm:mt-5 sm:flex sm:items-center sm:justify-between sm:border-t sm:border-[#dce7f5] sm:pt-4">
            <span className="hidden text-[10px] font-bold text-slate-500 sm:block">
              {item.keyword}
            </span>
            <span className="text-[10px] font-black text-[#1E5BB8] sm:text-[12px]">
              استكشف الدليل ←
            </span>
          </div>
        </Link>
      ))}
    </div>

    <p className="mt-4 text-center text-[10px] leading-5 text-slate-500 sm:mt-5 sm:text-[11px] sm:leading-6">
      تختلف ملكية الأصل المالي عن التداول على عقود الفروقات.
      راجع نوع المنتج والرسوم والمخاطر قبل فتح الحساب.
    </p>
  </div>
</section>


  
{/* 3 — TRADING CONDITIONS */}
<section
  id="trading-conditions"
  aria-labelledby="trading-conditions-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-6 sm:py-14 [&_a]:text-center [&_article]:text-center [&_a>div]:text-center [&_article>div]:text-center [&_a>div:first-child]:mx-auto [&_article>div:first-child]:mx-auto [&_a>h3]:text-center [&_article>h3]:text-center [&_a>p]:text-center [&_article>p]:text-center"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[850px] text-center">
      <span className="text-[10px] font-black text-[#2B6FD0] sm:text-[11px]">
        الحسابات وتكاليف التداول
      </span>

      <h2
        id="trading-conditions-title"
        className="mt-2 text-[21px] font-black leading-[1.4] text-[#081a33] sm:mt-3 sm:text-[34px]"
      >
        كيف تختار شركة تداول حسب شروط الحساب؟
      </h2>

      <p className="mt-2 text-[11px] leading-6 text-slate-600 sm:mt-3 sm:text-[15px] sm:leading-7">
        <span className="sm:hidden">
          قارن الحسابات والسبريد والإيداع والمنصات قبل التسجيل.
        </span>
        <span className="hidden sm:inline">
          لا تعتمد على التقييم العام وحده. افحص السبريد والعمولات
          والإيداع المطلوب ونوع الحساب قبل اختيار شركة التداول.
          وقد تختلف الشروط بين الحسابات داخل الشركة نفسها.
        </span>
      </p>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-4 lg:grid-cols-3">
      {[
        {
          number: "01",
          title: "مقارنة أنواع حسابات التداول",
          mobileTitle: "مقارنة الحسابات",
          text:
            "استعرض حسابات الوسطاء وقارن الفروقات بين شروط الإيداع والتداول.",
          href: "/compare-accounts",
          link: "مقارنة الحسابات",
        },
        {
          number: "02",
          title: "الحد الأدنى للإيداع",
          mobileTitle: "الحد الأدنى للإيداع",
          text:
            "تعرّف على متطلبات فتح الحساب، ثم تحقق من الإيداع الفعلي لكل نوع حساب.",
          href: "/brokers",
          link: "استكشف تقييمات الوسطاء",
        },
        {
          number: "03",
          title: "السبريد وعمولات التداول",
          mobileTitle: "السبريد والعمولات",
          text:
            "افهم الفرق بين فروقات الأسعار والعمولة قبل مقارنة تكلفة التداول.",
          href: "/learn-trading",
          link: "تعلم أساسيات التداول",
        },
        {
          number: "04",
          title: "حسابات التداول الإسلامية",
          mobileTitle: "الحسابات الإسلامية",
          text:
            "تحقق من شروط الحساب الخالي من فوائد التبييت وأي رسوم بديلة.",
          href: "/compare-accounts",
          link: "راجع شروط الحسابات",
        },
        {
          number: "05",
          title: "منصات التداول المتاحة",
          mobileTitle: "منصات التداول",
          text:
            "قارن دعم MetaTrader 4 وMetaTrader 5 والمنصات الأخرى بحسب الوسيط.",
          href: "/brokers",
          link: "راجع منصات الوسطاء",
        },
        {
          number: "06",
          title: "اختيار حساب مناسب للمبتدئين",
          mobileTitle: "حسابات المبتدئين",
          text:
            "ابدأ بفهم المخاطر وحجم الصفقة والهامش قبل الانتقال إلى حساب حقيقي.",
          href: "/learn-trading",
          link: "دليل تعلم التداول",
        },
      ].map((item) => (
        <article
          key={item.number}
          className="flex min-w-0 flex-col rounded-xl border border-[#dce7f5] bg-white p-3 shadow-[0_5px_18px_rgba(24,74,151,0.035)] sm:rounded-[20px] sm:p-5"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8f1ff] text-[10px] font-black text-[#1E5BB8] sm:h-10 sm:w-10 sm:rounded-xl sm:text-[13px]">
            {item.number}
          </div>

          <h3 className="mt-2.5 text-[12px] font-black leading-5 text-[#081a33] sm:mt-4 sm:text-[16px]">
            <span className="sm:hidden">{item.mobileTitle}</span>
            <span className="hidden sm:inline">{item.title}</span>
          </h3>

          <p className="mt-2 hidden flex-1 text-[12px] leading-7 text-slate-600 sm:block">
            {item.text}
          </p>

          <Link
            href={item.href}
            className="mt-auto pt-3 text-[10px] font-black leading-5 text-[#1E5BB8] hover:underline sm:mt-5 sm:border-t sm:border-[#edf2f9] sm:pt-4 sm:text-[12px]"
          >
            <span className="sm:hidden">استكشف ←</span>
            <span className="hidden sm:inline">{item.link} ←</span>
          </Link>
        </article>
      ))}
    </div>
  </div>
</section>


  
{/* 4 — BROKER COMPARISONS */}
<section
  id="broker-comparisons"
  aria-labelledby="broker-comparisons-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-white py-6 sm:py-14 [&_a]:text-center [&_a>div]:text-center [&_a>div>h3]:text-center [&_a>div>p]:text-center [&_a>span]:mx-auto"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[850px] text-center">
      <span className="text-[10px] font-black text-[#2B6FD0] sm:text-[11px]">
        قبل اختيار وسيط التداول
      </span>

      <h2
        id="broker-comparisons-title"
        className="mt-2 text-[21px] font-black leading-[1.4] text-[#081a33] sm:mt-3 sm:text-[34px]"
      >
        قارن شركات التداول قبل فتح حساب
      </h2>

      <p className="mt-2 text-[11px] leading-6 text-slate-600 sm:mt-3 sm:text-[15px] sm:leading-7">
        <span className="sm:hidden">
          اكتشف الفروقات بين الوسطاء وحساباتهم قبل اتخاذ القرار.
        </span>
        <span className="hidden sm:inline">
          قد تتشابه شركتان في التقييم العام، لكن تختلفان
          في أنواع الحسابات والتراخيص والمنصات وتكاليف التداول.
          استخدم أدلة بروكر العرب لمراجعة التفاصيل قبل اتخاذ القرار.
        </span>
      </p>
    </div>

    <div className="mt-5 grid grid-cols-1 gap-2 sm:mt-8 sm:gap-4 lg:grid-cols-2">
      <Link
        href="/compare-accounts"
        className="group flex items-center gap-3 rounded-xl border border-[#bfd3ee] bg-[#eef5fd] p-3 transition hover:border-[#2B6FD0] sm:block sm:rounded-[22px] sm:p-6 sm:hover:shadow-lg"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[18px] sm:hidden">
          ⇄
        </span>

        <div className="min-w-0 flex-1">
          <span className="hidden text-[11px] font-black text-[#1E5BB8] sm:block">
            مقارنة تفصيلية
          </span>

          <h3 className="text-[13px] font-black leading-5 text-[#081a33] sm:mt-3 sm:text-[19px]">
            مقارنة حسابات شركات التداول
          </h3>

          <p className="mt-3 hidden text-[13px] leading-7 text-slate-600 sm:block">
            انتقل إلى أداة مقارنة الحسابات لمراجعة الفروقات
            بين حسابات الوسطاء، بدل الاكتفاء بمقارنة أسماء الشركات.
          </p>

          <span className="mt-5 hidden rounded-xl bg-[#1E5BB8] px-5 py-3 text-[12px] font-black text-white sm:inline-flex">
            ابدأ مقارنة الحسابات ←
          </span>
        </div>

        <span className="shrink-0 text-[17px] font-black text-[#1E5BB8] sm:hidden">
          ←
        </span>
      </Link>

      <Link
        href="/brokers"
        className="group flex items-center gap-3 rounded-xl border border-[#dce7f5] bg-[#f8fbff] p-3 transition hover:border-[#2B6FD0] sm:block sm:rounded-[22px] sm:p-6 sm:hover:shadow-lg"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[18px] sm:hidden">
          ★
        </span>

        <div className="min-w-0 flex-1">
          <span className="hidden text-[11px] font-black text-[#1E5BB8] sm:block">
            تقييمات الوسطاء
          </span>

          <h3 className="text-[13px] font-black leading-5 text-[#081a33] sm:mt-3 sm:text-[19px]">
            مراجعات وتقييمات شركات التداول
          </h3>

          <p className="mt-3 hidden text-[13px] leading-7 text-slate-600 sm:block">
            اقرأ تقييمات الشركات وتعرّف على المميزات والعيوب
            والتراخيص وأنواع الحسابات المتاحة لكل وسيط.
          </p>

          <span className="mt-5 hidden rounded-xl border border-[#bfd3ee] bg-white px-5 py-3 text-[12px] font-black text-[#1E5BB8] sm:inline-flex">
            عرض جميع التقييمات ←
          </span>
        </div>

        <span className="shrink-0 text-[17px] font-black text-[#1E5BB8] sm:hidden">
          ←
        </span>
      </Link>
    </div>
  </div>
</section>


  
{/* 5 — REGULATION AND SAFETY */}
<section
  id="licenses"
  aria-labelledby="licenses-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-6 sm:py-14 [&_a]:text-center [&_article]:text-center [&_a>h3]:text-center [&_article_h3]:text-center [&_article_p]:text-center [&_a>div]:text-center [&_a>div:first-child]:justify-center [&_a>div:first-child]:flex-wrap [&_article>span]:mx-auto"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[850px] text-center">
      <span className="text-[10px] font-black text-[#2B6FD0] sm:text-[11px]">
        التراخيص والرقابة المالية
      </span>

      <h2
        id="licenses-title"
        className="mt-2 text-[21px] font-black leading-[1.4] text-[#081a33] sm:mt-3 sm:text-[34px]"
      >
        كيف تتحقق من شركات التداول المرخصة والموثوقة؟
      </h2>

      <p className="mt-2 text-[11px] leading-6 text-slate-600 sm:mt-3 sm:text-[15px] sm:leading-7">
        <span className="sm:hidden">
          تحقق من ترخيص الوسيط والكيان القانوني قبل فتح الحساب.
        </span>
        <span className="hidden sm:inline">
          وجود ترخيص لدى شركة تداول لا يعني بالضرورة أن جميع
          عملائها يخضعون لنفس الجهة الرقابية. تحقق من اسم
          الكيان القانوني ورقم الترخيص والجهة المسؤولة
          عن حسابك قبل إيداع الأموال.
        </span>
      </p>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3 lg:grid-cols-4">
      {regulatorSummaries.map((regulator) => (
        <Link
          key={regulator.code}
          href={`/licenses/${regulator.code.toLowerCase()}`}
          className="group flex min-w-0 flex-col rounded-xl border border-[#dce7f5] bg-white p-3 transition hover:border-[#2B6FD0] sm:rounded-[19px] sm:p-5 sm:hover:-translate-y-1 sm:hover:shadow-md"
        >
          <div className="flex items-center justify-between gap-1.5 sm:gap-3">
            <span className="rounded-lg bg-[#eef5fd] px-2 py-1.5 text-[11px] font-black text-[#1E5BB8] sm:rounded-xl sm:px-3 sm:py-2 sm:text-[13px]">
              {regulator.code}
            </span>

            <span className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
              {regulator.brokerCount} شركات
            </span>
          </div>

          <h3 className="mt-2 flex-1 text-[11px] font-black leading-5 text-[#081a33] sm:mt-4 sm:min-h-[48px] sm:text-[13px] sm:leading-6">
            {regulator.name}
          </h3>

          <div className="mt-2 border-t border-[#edf2f9] pt-2 text-[10px] font-black text-[#1E5BB8] sm:mt-3 sm:pt-3 sm:text-[11px]">
            دليل الترخيص ←
          </div>
        </Link>
      ))}
    </div>

    

  </div>
</section>


{/* 6 — EDUCATIONAL CONTENT */}
<section
  id="choose-broker-guide"
  aria-labelledby="choose-broker-guide-title"
  dir="rtl"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-white py-6 sm:py-14"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-[18px] border border-[#b8d1f2] bg-gradient-to-l from-[#e8f2ff] via-[#f3f8ff] to-white p-4 shadow-[0_12px_35px_rgba(24,74,151,0.06)] sm:rounded-[24px] sm:p-9 lg:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#b9d5ff]/30 blur-3xl"
      />

      <div className="relative grid gap-5 sm:gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-[#c7daf3] bg-white px-3 py-1 text-[10px] font-black text-[#1E5BB8] sm:px-4 sm:py-1.5 sm:text-[11px]">
            دليل اختيار وسيط التداول
          </span>

          <h2
            id="choose-broker-guide-title"
            className="mt-3 text-[21px] font-black leading-[1.4] text-[#081a33] sm:mt-4 sm:text-[32px] sm:leading-[1.5]"
          >
            كيف تختار أفضل شركة تداول مناسبة لك؟
          </h2>

          {/* MOBILE INTRO */}
          <p className="mt-2 text-[12px] leading-6 text-[#425674] sm:hidden">
            قارن التراخيص وتكاليف التداول وأنواع الحسابات
            قبل اختيار الوسيط المناسب لاحتياجاتك.
          </p>

          {/* DESKTOP INTRO — ORIGINAL */}
          <div className="hidden sm:block">
            <p className="mt-4 text-[13px] leading-8 text-[#425674] sm:text-[14px]">
              اختيار شركة التداول لا يعتمد على التقييم العام وحده.
              ابدأ بتحديد الأسواق التي ترغب في تداولها، ثم قارن
              الوسطاء من حيث الترخيص الفعلي وتكاليف التداول
              والمنصات والحد الأدنى للإيداع.
            </p>

            <p className="mt-3 text-[13px] leading-8 text-[#425674] sm:text-[14px]">
              راجع أيضًا أنواع الحسابات وشروط السحب ورسوم التبييت،
              ولا تجعل المكافآت أو الرافعة المالية المرتفعة
              العامل الوحيد في اتخاذ قرارك.
            </p>
          </div>

          {/* MOBILE EXPANDABLE INFORMATION */}
          <details className="group mt-2 sm:hidden">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 py-1 text-[11px] font-black text-[#1E5BB8] [&::-webkit-details-marker]:hidden">
              <span>تفاصيل إضافية لاختيار الوسيط</span>
              <span className="transition-transform group-open:rotate-180">
                ⌄
              </span>
            </summary>

            <div className="mt-2 border-t border-[#cbdcf1] pt-3 text-[12px] leading-7 text-[#425674]">
              <p>
                ابدأ بتحديد الأسواق التي ترغب في تداولها،
                ثم تحقق من الترخيص الفعلي والمنصات والحد
                الأدنى للإيداع.
              </p>
              <p className="mt-2">
                راجع شروط السحب ورسوم التبييت، ولا تعتمد
                على المكافآت أو الرافعة المالية وحدها.
              </p>
            </div>
          </details>

          {/* DESKTOP BUTTONS — ORIGINAL */}
          <div className="mt-6 hidden flex-wrap gap-3 sm:flex">
            <Link
              href="/learn-trading"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1E5BB8] px-5 py-3 text-[12px] font-black text-white transition hover:bg-[#184A97]"
            >
              تعلم أساسيات التداول ←
            </Link>

            <Link
              href="/learn-trading/economic-indicators"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#bfd3ee] bg-white px-5 py-3 text-[12px] font-black text-[#1E5BB8] transition hover:bg-[#eef5fd]"
            >
              المؤشرات الاقتصادية ←
            </Link>
          </div>
        </div>

        {/* STEPS */}
        <div className="grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            {
              number: "01",
              title: "تحقق من التراخيص",
              description:
                "طابق اسم الشركة ورقم الترخيص مع السجل الرسمي للجهة الرقابية.",
            },
            {
              number: "02",
              title: "قارن تكاليف التداول",
              description:
                "راجع السبريد والعمولات والإيداع ورسوم التبييت والسحب.",
            },
            {
              number: "03",
              title: "اختر الحساب المناسب",
              description:
                "قارن أنواع الحسابات والمنصات وشروط التداول بحسب احتياجاتك.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="flex items-center gap-3 rounded-xl border border-[#d6e5f8] bg-white/90 px-3 py-2.5 shadow-[0_4px_14px_rgba(24,74,151,0.04)] sm:items-start sm:gap-4 sm:rounded-2xl sm:p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f1ff] text-[11px] font-black text-[#1E5BB8] sm:h-10 sm:w-10 sm:rounded-xl sm:text-[13px]">
                {item.number}
              </span>

              <div className="min-w-0">
                <h3 className="text-[12px] font-black leading-5 text-[#081a33] sm:text-[13px]">
                  {item.title}
                </h3>
                <p className="mt-1 hidden text-[11px] leading-6 text-slate-600 sm:block">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE BUTTONS */}
        <div className="grid grid-cols-2 gap-2 sm:hidden">
          <Link
            href="/learn-trading"
            className="flex min-h-10 items-center justify-center rounded-lg bg-[#1E5BB8] px-2 text-center text-[10px] font-black text-white"
          >
            تعلم التداول ←
          </Link>

          <Link
            href="/learn-trading/economic-indicators"
            className="flex min-h-10 items-center justify-center rounded-lg border border-[#bfd3ee] bg-white px-2 text-center text-[10px] font-black text-[#1E5BB8]"
          >
            المؤشرات الاقتصادية ←
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>



{/* 7 — FAQ */}
<section
  id="best-brokers-faq"
  aria-labelledby="best-brokers-faq-title"
  dir="rtl"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-7 sm:py-16"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    {/* FAQ HEADING */}
    <div className="mx-auto max-w-[850px] text-center">
      <span className="inline-flex rounded-full bg-[#e6f0ff] px-3 py-1 text-[10px] font-black text-[#1E5BB8] sm:px-4 sm:py-1.5 sm:text-[11px]">
        إجابات تساعدك على الاختيار
      </span>

      <h2
        id="best-brokers-faq-title"
        className="mt-2.5 text-[21px] font-black leading-[1.4] text-[#081a33] sm:mt-4 sm:text-[35px]"
      >
        الأسئلة الشائعة حول أفضل شركات التداول
      </h2>

      {/* MOBILE DESCRIPTION */}
      <p className="mt-2 text-[12px] leading-6 text-slate-600 sm:hidden">
        أهم الإجابات عن التراخيص والحسابات وتكاليف التداول.
      </p>

      {/* DESKTOP DESCRIPTION */}
      <p className="mt-3 hidden text-[13px] leading-7 text-slate-600 sm:block sm:text-[15px]">
        إجابات واضحة عن التراخيص والرسوم وأنواع الحسابات
        وأهم المعايير التي تساعدك على اختيار وسيط التداول المناسب.
      </p>
    </div>

    {/* FAQ GRID */}
    <div className="mt-5 grid items-start gap-2 sm:mt-9 sm:gap-4 lg:grid-cols-2">
      {[
        {
          question: "ما أفضل شركة تداول في 2026؟",
          answer:
            "لا توجد شركة واحدة هي الأفضل لجميع المتداولين. يعتمد الاختيار على بلد الإقامة والترخيص المتاح ونوع الحساب وتكاليف التداول والمنصة والأدوات المالية المطلوبة.",
        },
        {
          question: "كيف أعرف أن شركة التداول مرخصة؟",
          answer:
            "تحقق من رقم الترخيص واسم الكيان القانوني في الموقع الرسمي للجهة الرقابية، وتأكد أن الكيان الذي ستتعاقد معه هو نفسه الكيان المرخص.",
        },
        {
          question: "هل يمكن فتح حساب تداول بمبلغ 100 دولار؟",
          answer:
            "تتيح بعض الشركات حسابات بإيداع منخفض، لكن الحد الأدنى يختلف بحسب الوسيط ونوع الحساب ووسيلة الدفع. كما أن إمكانية فتح الحساب لا تعني أن المبلغ كافٍ لإدارة المخاطر.",
        },
        {
          question: "ما الفرق بين السبريد والعمولة؟",
          answer:
            "السبريد هو الفرق بين سعر الشراء وسعر البيع، بينما العمولة رسم قد يفرضه الوسيط على تنفيذ الصفقات. وقد يجمع الحساب بين السبريد والعمولة معًا.",
        },
        {
          question: "هل الحساب الإسلامي خالٍ من جميع الرسوم؟",
          answer:
            "ليس بالضرورة. قد تلغي بعض الحسابات رسوم التبييت التقليدية مع تطبيق رسوم أو شروط بديلة. لذلك يجب مراجعة الشروط الخاصة بكل وسيط وحساب.",
        },
        {
          question: "هل أختار MT4 أم MT5؟",
          answer:
            "يعتمد الاختيار على الأدوات المتاحة واستراتيجيتك وتوافق المنصة مع الوسيط. راجع الأسواق والأوامر والمؤشرات التي تحتاجها قبل تحديد المنصة.",
        },
        {
          question: "هل يمكن مقارنة حسابات شركتين مختلفتين؟",
          answer:
            "نعم، يمكنك استخدام صفحات مقارنة الحسابات في بروكر العرب لمراجعة الفروقات بين أنواع الحسابات وشروط التداول المتاحة.",
        },
        {
          question: "هل الترخيص يضمن عدم خسارة الأموال؟",
          answer:
            "لا. الترخيص يتعلق بالإشراف التنظيمي ولا يضمن تحقيق الأرباح أو يمنع خسائر التداول. التداول بالرافعة المالية وعقود الفروقات ينطوي على مخاطر مرتفعة.",
        },
      ].map((item, index) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-xl border border-[#d6e5f8] bg-white shadow-[0_4px_16px_rgba(24,74,151,0.035)] transition-all duration-200 open:border-[#a9c8f1] open:shadow-[0_8px_25px_rgba(24,74,151,0.08)] sm:rounded-[18px]"
        >
          <summary className="flex min-h-[54px] cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 transition hover:bg-[#f7faff] sm:min-h-[76px] sm:gap-4 sm:px-4 sm:py-4 lg:px-6 [&::-webkit-details-marker]:hidden">
            {/* NUMBER */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#eef5fd] text-[10px] font-black text-[#1E5BB8] sm:h-9 sm:w-9 sm:rounded-xl sm:text-[12px]">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* QUESTION */}
            <h3 className="min-w-0 flex-1 text-[12px] font-black leading-5 text-[#081a33] sm:text-[15px] sm:leading-7">
              {item.question}
            </h3>

            {/* EXPAND ICON */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d6e5f8] bg-[#f4f8ff] text-[17px] font-medium text-[#1E5BB8] transition-transform duration-200 group-open:rotate-45 group-open:border-[#2B6FD0] group-open:bg-[#1E5BB8] group-open:text-white sm:h-9 sm:w-9 sm:text-[20px]">
              +
            </span>
          </summary>

          <div className="border-t border-[#e5edf8] bg-[#fbfdff] px-3 py-3 sm:px-6 sm:py-5">
            <p className="text-[12px] leading-6 text-[#526784] sm:leading-8 sm:text-[13px]">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>

    {/* BOTTOM CTA */}
    <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-xl border border-[#c7daf3] bg-white p-3 text-center sm:mt-8 sm:gap-4 sm:rounded-[20px] sm:p-5 sm:flex-row sm:text-right lg:p-6">
      <div>
        <h3 className="text-[13px] font-black text-[#081a33] sm:text-[15px]">
          ما زلت تقارن بين شركات التداول؟
        </h3>

        <p className="mt-1 hidden text-[12px] leading-6 text-slate-600 sm:block">
          راجع تقييمات الوسطاء وقارن أنواع الحسابات قبل اتخاذ قرارك.
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-3">
        <Link
          href="/brokers"
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#bfd3ee] bg-[#f4f8ff] px-2 py-2 text-[11px] font-black text-[#1E5BB8] transition hover:bg-[#e5efff] sm:min-h-11 sm:rounded-xl sm:px-5 sm:py-3 sm:text-[12px]"
        >
          تقييمات الوسطاء
        </Link>

        <Link
          href="/compare-accounts"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1E5BB8] px-2 py-2 text-[11px] font-black text-white transition hover:bg-[#184A97] sm:min-h-11 sm:rounded-xl sm:px-5 sm:py-3 sm:text-[12px]"
        >
          مقارنة الحسابات ←
        </Link>
      </div>
    </div>
  </div>
</section>


</div>


     
    </main>
  );
}