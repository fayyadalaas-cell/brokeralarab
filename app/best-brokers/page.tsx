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

// آخر مراجعة تحريرية فعلية للترتيب ومعلومات الوسطاء.
// غيّر التاريخ فقط عند إجراء مراجعة حقيقية.
const BEST_BROKERS_LAST_REVIEWED = "2026-10-16";

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
).sort((a, b) => b.brokerCount - a.brokerCount);


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
      dateModified: BEST_BROKERS_LAST_REVIEWED,

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

      
{/* Desktop description — concise and focused */}
<p className="mt-4 hidden max-w-[950px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[17px]">
  اكتشف أفضل شركات تداول الفوركس في 2026، وقارن الوسطاء
  حسب التراخيص والأمان وتكاليف التداول وأنواع الحسابات.
  تصفّح التقييمات المستقلة واختر الشركة المناسبة لاحتياجاتك
  وبلد إقامتك.
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

      
{/* Stats + Buttons — DESKTOP REFINED */}
<div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-start lg:gap-6">

  {/* Dynamic stats */}
  <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[460px] lg:shrink-0">

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
  <div className="grid w-full grid-cols-2 gap-2.5 sm:w-auto sm:gap-3 lg:shrink-0">

    <a
      href="#comparison-table"
      className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
    >
      <span className="sm:hidden">قارن الشركات</span>
      <span className="hidden sm:inline">مقارنة شركات الفوركس</span>
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

    

{/* SECTION INTRO — DESKTOP OPTIMIZED */}
<div className="max-w-[1100px] text-right">

  <h2
    id="top-brokers-title"
    className="text-[27px] font-black leading-[1.3] tracking-tight text-[#081a33] sm:text-[36px] lg:text-[43px]"
  >
    ما هي أفضل
    <span className="text-[#2b6fd0]">
      {" "}شركات تداول الفوركس{" "}
    </span>
    في 2026؟
  </h2>

  {/* Mobile description — unchanged */}
  <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600 sm:hidden">
    إذا كنت تبحث عن أفضل شركة تداول فوركس، فإن المقارنة
    لا تعتمد على شهرة الشركة وحدها. يراجع بروكر العرب
    التقييم العام والتراخيص وتكاليف التداول والمنصات
    وأنواع الحسابات لمساعدتك على اختيار وسيط مناسب.
    وفيما يلي الشركات الثلاث الأعلى ترتيبًا في دليلنا.
  </p>

  {/* Desktop description */}
  <p className="mt-3 hidden max-w-[1050px] text-[15px] font-medium leading-8 text-slate-600 sm:block">
    تعرّف على الشركات الثلاث الأعلى تقييمًا في دليل بروكر العرب،
    واكتشف أبرز مزايا كل وسيط، والتراخيص المسجلة لديه،
    والحد الأدنى للإيداع قبل اتخاذ قرارك.
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
    BROKER CARDS — REFINED DESKTOP DESIGN
===================================================== */}

<div className="mt-5 grid grid-cols-1 gap-3 lg:mt-8 lg:grid-cols-3 lg:gap-5">
  {topThree.map((broker, index) => {
    const licenseCodes = Array.from(
      new Set(
        broker.licenses
          .map((license) =>
            license.regulator_code?.trim().toUpperCase()
          )
          .filter((code): code is string => Boolean(code))
      )
    ).slice(0, 5);

    const brokerName = cleanText(broker.name);

    const bestFor = cleanText(
      broker.best_for,
      "راجع أنواع الحسابات والمنصات وشروط التداول لمعرفة مدى ملاءمة الوسيط."
    );

    const keyStrength = cleanText(
      broker.key_strength_ar,
      "اطلع على أبرز مزايا الوسيط وشروط التداول في التقييم الكامل."
    );

    const isFirst = index === 0;

    return (
      <article
        key={broker.id}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          isFirst
            ? "border-amber-400 shadow-[0_8px_28px_rgba(180,135,30,0.08)]"
            : "border-[#d6e5f8] shadow-sm"
        }`}
      >
        {/* Top accent */}
        <div
          className={`h-[3px] ${
            isFirst
              ? "bg-amber-400"
              : "bg-[#2b6fd0]"
          }`}
        />

        <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-5 xl:p-6">

          {/* Rank and rating */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-[10px] font-black lg:text-[12px] ${
                isFirst
                  ? "bg-amber-100 text-amber-900"
                  : "bg-[#eef5fd] text-[#1e5bb8]"
              }`}
            >
              {isFirst
                ? "★ الأفضل إجمالًا"
                : `المركز ${index + 1}`}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-800 lg:text-[13px]">
              <span>★</span>
              {ratingLabel(broker.rating)}
              <span className="text-amber-700/70">/ 5</span>
            </span>
          </div>

          {/* Broker identity */}
          <div className="mt-4 flex items-center gap-3 lg:mt-5 lg:gap-4">
            <Link
              href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
              aria-label={`قراءة تقييم ${brokerName}`}
              className="shrink-0 transition-transform hover:scale-105"
            >
              <BrokerLogo broker={broker} size="large" />
            </Link>

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-[20px] font-black leading-tight text-[#081a33] lg:text-[23px] xl:text-[25px]">
                <Link
                  href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
                  className="transition hover:text-[#2b6fd0]"
                >
                  {brokerName}
                </Link>
              </h3>

              <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-500 lg:text-[12px]">
                {keyStrength}
              </p>
            </div>
          </div>

          {/* Why choose this broker */}
          <div className="mt-4 rounded-xl border border-[#d6e5f8] bg-[#f3f8ff] p-3.5 lg:mt-5 lg:p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#dceafb] text-[12px] font-black text-[#1e5bb8]">
                ✓
              </span>

              <h4 className="text-[12px] font-black text-[#123b72] lg:text-[14px]">
                لمن يناسب هذا الوسيط؟
              </h4>
            </div>

            <p className="mt-2 text-[12px] font-medium leading-6 text-slate-700 lg:text-[13px] lg:leading-7">
              {bestFor}
            </p>
          </div>

          {/* Core facts */}
          <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-[#dce6f2] bg-[#f8fafc]">
            <div className="border-l border-[#dce6f2] px-1.5 py-3 text-center lg:py-4">
              <p className="text-[10px] font-semibold text-slate-500 lg:text-[11px]">
                الحد الأدنى للإيداع
              </p>

              <p className="mt-1.5 text-[14px] font-black text-[#102442] lg:text-[17px]">
                {formatDeposit(getDisplayDeposit(broker))}
              </p>
            </div>

            <div className="border-l border-[#dce6f2] px-1.5 py-3 text-center lg:py-4">
              <p className="text-[10px] font-semibold text-slate-500 lg:text-[11px]">
                تراخيص مسجلة
              </p>

              <p className="mt-1.5 text-[14px] font-black text-[#102442] lg:text-[17px]">
                {broker.active_license_count}
              </p>
            </div>

            <div className="px-1.5 py-3 text-center lg:py-4">
              <p className="text-[10px] font-semibold text-slate-500 lg:text-[11px]">
                حساب إسلامي
              </p>

              <p
                className={`mt-1.5 text-[12px] font-black lg:text-[14px] ${
                  broker.has_islamic_account
                    ? "text-emerald-700"
                    : "text-slate-600"
                }`}
              >
                {broker.has_islamic_account ? "متوفر" : "تحقق"}
              </p>
            </div>
          </div>

          {/* Regulations */}
          <div className="mt-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-[12px] font-black text-[#142844] lg:text-[14px]">
                الجهات الرقابية المسجلة
              </h4>

              <span className="text-[10px] font-medium text-slate-400">
                وفق بيانات بروكر العرب
              </span>
            </div>

            {licenseCodes.length > 0 ? (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {licenseCodes.map((code) => (
                  <span
                    key={`${broker.id}-${code}`}
                    className="inline-flex items-center rounded-lg border border-[#d6e5f8] bg-white px-2.5 py-1.5 text-[10px] font-black text-[#123b72] lg:text-[11px]"
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

          {/* Transparency note */}
          <p className="mt-3 text-[10px] font-medium leading-5 text-slate-500 lg:text-[11px] lg:leading-6">
            قد تختلف الجهة الرقابية وشروط الحساب حسب الكيان القانوني وبلد إقامة العميل.
          </p>

          {/* Buttons */}
          <div className="mt-auto pt-5">
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
                className="inline-flex min-h-[43px] items-center justify-center rounded-xl border border-[#b8cce8] bg-white px-3 text-[12px] font-black text-[#184a97] transition hover:bg-[#eef5fd] lg:min-h-[46px] lg:text-[13px]"
              >
                قراءة التقييم
              </Link>

              {broker.real_account_url && broker.slug ? (
                <a
                  href={`/go/${broker.slug}?type=real`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex min-h-[43px] items-center justify-center rounded-xl bg-[#1e5bb8] px-3 text-[12px] font-black text-white transition hover:bg-[#184a97] lg:min-h-[46px] lg:text-[13px]"
                >
                  فتح حساب
                </a>
              ) : (
                <Link
                  href={broker.slug ? `/brokers/${broker.slug}` : "/brokers"}
                  className="inline-flex min-h-[43px] items-center justify-center rounded-xl bg-[#1e5bb8] px-3 text-[12px] font-black text-white transition hover:bg-[#184a97] lg:min-h-[46px] lg:text-[13px]"
                >
                  تفاصيل الوسيط
                </Link>
              )}
            </div>
          </div>

        </div>
      </article>
    );
  })}
</div>


{/* SAFETY + COUNTRIES — REFINED */}
<div className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 lg:grid-cols-2 lg:gap-5">

  {/* SAFETY AND REGULATION */}
  <article className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-[#f8fafc] p-4 sm:rounded-[22px] sm:p-6 lg:p-7">

    <span className="w-fit rounded-full bg-[#e8f1fc] px-3 py-1.5 text-[10px] font-black text-[#1e5bb8]">
      التراخيص وحماية المتداول
    </span>

    <h3 className="mt-3 text-[17px] font-black leading-7 text-[#0b1c34] sm:text-[21px]">
      كيف تختار شركة تداول فوركس آمنة ومرخصة؟
    </h3>

    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
      ابدأ بالتحقق من اسم الكيان القانوني ورقم الترخيص
      في السجل الرسمي للجهة الرقابية، وليس من شعار
      الترخيص الموجود على موقع الشركة فقط.
    </p>

    {/* Mobile additional information */}
    <details className="group mt-2 sm:hidden">
      <summary className="cursor-pointer py-2 text-[11px] font-black text-[#1e5bb8]">
        اقرأ المزيد عن حماية أموالك
      </summary>
      <p className="border-t border-slate-200 pt-3 text-[12px] leading-7 text-slate-600">
        راجع فصل أموال العملاء، والحماية من الرصيد السلبي،
        وسياسة السحب. فقد تختلف هذه الحماية بحسب
        الكيان القانوني وبلد الإقامة، ولا يلغي الترخيص
        مخاطر خسارة رأس المال.
      </p>
    </details>

    {/* Desktop additional information */}
    <div className="mt-3 hidden rounded-xl border border-[#dce9f9] bg-white p-4 sm:block">
      <h4 className="text-[12px] font-black text-[#123b72]">
        ما الذي يجب التحقق منه قبل فتح الحساب؟
      </h4>

      <div className="mt-3 grid gap-2 text-[12px] font-medium text-slate-600 lg:grid-cols-2">
        <div className="flex items-start gap-2">
          <span className="font-black text-[#2b6fd0]">✓</span>
          <span>الكيان القانوني ورقم الترخيص</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-[#2b6fd0]">✓</span>
          <span>فصل أموال العملاء</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-[#2b6fd0]">✓</span>
          <span>شروط السحب والإيداع</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-[#2b6fd0]">✓</span>
          <span>الحماية من الرصيد السلبي إن توفرت</span>
        </div>
      </div>
    </div>

    <p className="mt-3 hidden text-[11px] leading-6 text-slate-500 sm:block">
      قد تختلف شروط الحماية حسب الكيان القانوني وبلد الإقامة.
      الترخيص لا يضمن عدم خسارة الأموال.
    </p>

    <div className="mt-auto flex flex-wrap gap-2 pt-5">
      <Link
        href="/licenses"
        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#1e5bb8] px-4 py-2 text-[11px] font-black text-white transition hover:bg-[#184a97]"
      >
        دليل تراخيص التداول ←
      </Link>

      <Link
        href="/how-we-review-brokers"
        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-2 text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-50"
      >
        كيف نقيّم الوسطاء؟
      </Link>
    </div>

  </article>

  {/* BROKERS BY COUNTRY */}
  <article className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-[#f8fafc] p-4 sm:rounded-[22px] sm:p-6 lg:p-7">

    <span className="w-fit rounded-full bg-[#e8f1fc] px-3 py-1.5 text-[10px] font-black text-[#1e5bb8]">
      اختيار الوسيط حسب بلد الإقامة
    </span>

    <h3 className="mt-3 text-[17px] font-black leading-7 text-[#0b1c34] sm:text-[21px]">
      هل تختلف أفضل شركات الفوركس بين الدول العربية؟
    </h3>

    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
      نعم، فقد تختلف أهلية فتح الحساب والكيانات القانونية
      وطرق الدفع والتراخيص المتاحة من دولة إلى أخرى.
      لذلك لا يوجد ترتيب واحد يناسب جميع المتداولين العرب.
    </p>

    {/* Mobile additional information */}
    <details className="group mt-2 sm:hidden">
      <summary className="cursor-pointer py-2 text-[11px] font-black text-[#1e5bb8]">
        لماذا يختلف الاختيار حسب الدولة؟
      </summary>
      <p className="border-t border-slate-200 pt-3 text-[12px] leading-7 text-slate-600">
        بعض الوسطاء يقدمون حسابات وخدمات مختلفة حسب
        بلد الإقامة. راجع تصنيف بلدك وتحقق من شروط
        التسجيل والجهة الرقابية قبل فتح الحساب.
      </p>
    </details>

    {/* Desktop additional information */}
    <div className="mt-3 hidden rounded-xl border border-[#dce9f9] bg-white p-4 sm:block">
      <h4 className="text-[12px] font-black text-[#123b72]">
        لماذا تختار وسيطًا حسب دولتك؟
      </h4>

      <div className="mt-3 grid gap-2 text-[12px] font-medium text-slate-600 lg:grid-cols-2">
        <div className="flex items-start gap-2">
          <span className="font-black text-[#2b6fd0]">✓</span>
          <span>التحقق من أهلية فتح الحساب</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-[#2b6fd0]">✓</span>
          <span>معرفة الكيان الرقابي المتاح</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-[#2b6fd0]">✓</span>
          <span>مقارنة طرق الإيداع والسحب</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-[#2b6fd0]">✓</span>
          <span>مراجعة الحسابات والخدمات المحلية</span>
        </div>
      </div>
    </div>

    {/* Country links — Supabase */}
    <div className="mt-auto pt-5">
      <p className="mb-2 text-[11px] font-black text-[#123b72]">
        استكشف أفضل الوسطاء في بلدك
      </p>

      <div className="flex flex-wrap gap-2">
        {countries
          .filter((country) =>
            [
              "saudi-arabia",
              "uae",
              "kuwait",
              "qatar",
              "egypt",
            ].includes(country.slug)
          )
          .map((country) => (
            <Link
              key={country.id}
              href={`/best-brokers/${country.slug}`}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3 py-2 text-[11px] font-bold text-[#184a97] transition hover:border-[#2b6fd0] hover:bg-blue-50"
            >
              <span>{country.flag_emoji || "🌍"}</span>
              <span>{country.country_name_ar}</span>
              <span aria-hidden="true">←</span>
            </Link>
          ))}
      </div>
    </div>

  </article>
</div>



    {/* METHODOLOGY NOTE */}
    <p className="mt-5 text-center text-[11px] font-medium leading-6 text-slate-500 sm:text-xs">
      الترتيب مبني على بيانات ومعايير التقييم المنشورة
      في بروكر العرب، ولا يمثل توصية استثمارية شخصية
      أو ضمانًا لأمان الأموال أو تحقيق الأرباح.
    </p>

  </div>
</section>



{/* FOREX TRADING PLATFORMS — REFINED */}
<section
  id="forex-platforms"
  aria-labelledby="forex-platforms-title"
  className="border-b border-[#dce6f2] bg-[#f5f8fd] py-7 sm:py-10"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    <div className="max-w-[1050px]">
      <h2
        id="forex-platforms-title"
        className="text-[24px] font-black leading-[1.35] text-[#081a33] sm:text-[36px] lg:text-[40px]"
      >
        ما أفضل منصة تداول فوركس للمبتدئين والمحترفين؟
      </h2>

      <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
        تختلف أفضل منصة تداول فوركس حسب خبرة المتداول واحتياجاته.
        تعرّف على أشهر ثلاث منصات وقارن أدوات التحليل وسهولة
        الاستخدام وإمكانات التداول الآلي.
      </p>

      <p className="mt-2 hidden text-[14px] leading-7 text-slate-600 sm:block">
        شركة الوساطة توفر حساب التداول، بينما المنصة هي البرنامج
        المستخدم لتحليل الأسعار وتنفيذ الأوامر. وتختلف المنصات
        المتاحة من وسيط إلى آخر.
      </p>
    </div>

    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      {[
        {
          name: "MetaTrader 4",
          short: "MT4",
          title: "منصة معروفة لتداول الفوركس",
          description:
            "توفر الرسوم البيانية والمؤشرات الفنية وأوامر التداول ودعم المستشارين الخبراء، وتناسب من يريد بيئة مألوفة لتداول العملات.",
          features: ["التحليل الفني", "التداول الآلي", "واجهة مألوفة"],
        },
        {
          name: "MetaTrader 5",
          short: "MT5",
          title: "أدوات تحليل وتداول أوسع",
          description:
            "توفر أدوات تحليل إضافية وأطرًا زمنية متعددة وإمكانات للتداول الآلي. تختلف الأدوات المالية المتاحة بحسب شركة الوساطة.",
          features: ["أطر زمنية متعددة", "مؤشرات إضافية", "تداول آلي"],
        },
        {
          name: "cTrader",
          short: "cTrader",
          title: "واجهة متقدمة للتداول",
          description:
            "تقدم أدوات للرسوم البيانية وإدارة الأوامر وتحليل السوق، وقد تناسب المتداولين الذين يهتمون بتفاصيل التنفيذ وتجربة المنصة.",
          features: ["إدارة الأوامر", "رسوم بيانية", "تحليل السوق"],
        },
      ].map((platform) => (
        <article
          key={platform.short}
          className="overflow-hidden rounded-[18px] border border-[#d6e5f8] bg-white shadow-sm transition hover:border-[#9fc2f0] hover:shadow-md"
        >
          <details className="group md:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
              <span className="inline-flex min-w-[54px] items-center justify-center rounded-lg bg-[#eef5fd] px-3 py-2 text-[12px] font-black text-[#1e5bb8]">
                {platform.short}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-black text-[#081a33]">
                  {platform.name}
                </h3>
                <p className="mt-1 text-[11px] text-slate-600">
                  {platform.title}
                </p>
              </div>

              <span className="text-lg font-bold text-[#1e5bb8] group-open:rotate-180">
                ⌄
              </span>
            </summary>

            <p className="border-t border-slate-100 px-4 py-3 text-[12px] leading-7 text-slate-600">
              {platform.description}
            </p>
          </details>

          <div className="hidden h-full flex-col p-5 md:flex lg:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-lg bg-[#eef5fd] px-3 py-2 text-[12px] font-black text-[#1e5bb8]">
                {platform.short}
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                منصة تداول
              </span>
            </div>

            <h3 className="mt-5 text-[21px] font-black text-[#081a33]">
              {platform.name}
            </h3>

            <p className="mt-1.5 text-[13px] font-bold text-[#1e5bb8]">
              {platform.title}
            </p>

            <p className="mt-3 flex-1 text-[13px] font-medium leading-7 text-slate-600">
              {platform.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              {platform.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-lg bg-[#f3f7fc] px-2.5 py-1.5 text-[11px] font-bold text-[#31577f]"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>

    <div className="mt-5 flex flex-col gap-4 rounded-[18px] border border-[#d6e5f8] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="max-w-[1050px]">
        <h3 className="text-[16px] font-black text-[#081a33] sm:text-[19px]">
          هل أفضل منصة فوركس تعني أفضل شركة تداول؟
        </h3>
        <p className="mt-2 text-[12px] leading-7 text-slate-600 sm:text-[13px]">
          لا. قد تقدم شركتان منصة MetaTrader 5 نفسها، لكن تختلفان
          في التراخيص والسبريد والعمولات وشروط التنفيذ.
          لذلك قارن الوسيط وشروط حسابه، وليس المنصة وحدها.
        </p>
      </div>

      <a
        href="#comparison-table"
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#1e5bb8] px-5 text-[12px] font-black text-white transition hover:bg-[#184a97]"
      >
        مقارنة شركات الفوركس ←
      </a>
    </div>
  </div>
</section>

          

{/* TOP TEN — PROFESSIONAL BROKER COMPARISON */}
<section
  id="comparison-table"
  aria-labelledby="broker-comparison-heading"
  className="scroll-mt-20 border-b border-slate-200 bg-white py-8 sm:py-11"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="broker-comparison-heading"
          className="text-[25px] font-black leading-[1.35] text-[#081a33] sm:text-[36px] lg:text-[40px]"
        >
          مقارنة أفضل 10 شركات تداول فوركس في 2026
        </h2>

        <span className="rounded-full bg-[#eef5fd] px-3 py-1.5 text-[11px] font-bold text-[#1e5bb8]">
          {topTen.length} شركات حسب التقييم العام
        </span>
      </div>

      
      <p className="mt-3 max-w-[1100px] text-[13px] font-medium leading-7 text-slate-600 sm:text-[15px]">
        قارن شركات الفوركس جنبًا إلى جنب حسب التقييم العام،
        الحد الأدنى للإيداع، التراخيص، منصات التداول والحساب الإسلامي.
      </p>
    </div>

    {/* EDITORIAL METHODOLOGY — TOP 10 */}
    <div className="mb-5 mt-5 rounded-[18px] border border-[#d6e5f8] bg-[#f3f8ff] p-4 sm:mb-6 sm:mt-6 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">

        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] font-black leading-7 text-[#081a33] sm:text-[19px]">
            كيف نحدد ترتيب أفضل شركات تداول الفوركس؟
          </h3>

          <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
            يرتب بروكر العرب الشركات وفق التقييم التحريري العام
            لكل وسيط، مع الاسترشاد بمعايير منهجية التقييم المنشورة،
            والتي تشمل التراخيص والرقابة المالية، وتكاليف التداول،
            والمنصات، وأنواع الحسابات، وجودة الخدمات.
            ويعكس ترتيب الجدول التقييم النهائي المسجل لكل شركة،
            وليس حسابًا آليًا مباشرًا لهذه المعايير.
          </p>

          <p className="mt-2 text-[12px] leading-6 text-slate-600 sm:text-[13px]">
            قد تختلف شروط التداول والجهة الرقابية بحسب بلد الإقامة
            والكيان القانوني الذي يفتح المتداول حسابه من خلاله.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-center">
          <Link
            href="/how-we-review-brokers"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1e5bb8] px-5 py-2.5 text-center text-[13px] font-black text-white transition hover:bg-[#184a97]"
          >
            اطلع على منهجية التقييم
          </Link>

          <div className="text-[11px] font-medium leading-6 text-slate-500 lg:text-center">
  <p>
    آخر مراجعة تحريرية:{" "}
    <time dateTime={BEST_BROKERS_LAST_REVIEWED}>
      {new Intl.DateTimeFormat("ar", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(
        new Date(`${BEST_BROKERS_LAST_REVIEWED}T12:00:00Z`)
      )}
    </time>
  </p>
  <p>يخضع الترتيب للمراجعة عند تحديث التقييمات.</p>
</div>
        </div>

      </div>
    </div>


    
{/* DESKTOP COMPARISON TABLE — PREMIUM READABLE DESIGN */}
<div className="hidden overflow-x-auto rounded-[20px] border border-[#d6e5f8] bg-white shadow-[0_8px_30px_rgba(15,40,75,0.05)] lg:block">
  <table className="w-full min-w-[1150px] table-fixed border-collapse text-right">
    <colgroup>
      <col style={{ width: "21%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "9%" }} />
      <col style={{ width: "16%" }} />
      <col style={{ width: "15%" }} />
      <col style={{ width: "9%" }} />
      <col style={{ width: "10%" }} />
    </colgroup>

    <thead>
      <tr className="bg-[#123b70] text-white">
        {[
          "الشركة والترتيب",
          "التقييم",
          "أقل إيداع",
          "التراخيص",
          "الجهات الرقابية",
          "منصات التداول",
          "حساب إسلامي",
          "الإجراءات",
        ].map((heading) => (
          <th
            key={heading}
            scope="col"
            className="border-l border-white/10 px-3 py-[19px] text-center text-[13px] font-black last:border-l-0"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
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
              .filter((code): code is string => Boolean(code))
          )
        ).slice(0, 4);

        const platforms = Array.from(
          new Set(splitItems(broker.platforms, 5))
        ).slice(0, 4);

        return (
          <tr
            key={broker.id}
            className={`h-[94px] border-b border-[#e3ebf5] transition-colors hover:bg-[#edf5ff] last:border-b-0 ${
              index === 0
                ? "bg-[#fffaf0]"
                : index % 2 === 0
                  ? "bg-[#f8fafd]"
                  : "bg-white"
            }`}
          >
            {/* BROKER */}
            <th scope="row" className="px-4 py-4 text-right">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[12px] font-black ${
                    index === 0
                      ? "bg-amber-100 text-amber-800"
                      : "bg-[#e8f1fc] text-[#1e5bb8]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <BrokerLogo broker={broker} size="small" />

                <div className="min-w-0">
                  <Link
                    href={reviewHref}
                    className="block text-[15px] font-black leading-6 text-[#081a33] transition hover:text-[#1e5bb8]"
                  >
                    {brokerName}
                  </Link>

                  {index === 0 && (
                    <span className="mt-1.5 inline-flex rounded-md bg-amber-100 px-2.5 py-1 text-[10px] font-black text-amber-800">
                      ★ الأعلى تقييمًا
                    </span>
                  )}
                </div>
              </div>
            </th>

            {/* RATING */}
            <td className="px-2 py-4 text-center">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2">
                <span className="text-[15px] text-amber-500">★</span>
                <span className="text-[15px] font-black tabular-nums text-amber-800">
                  {ratingLabel(broker.rating)}
                </span>
                <span className="text-[11px] font-bold text-amber-600">
                  / 5
                </span>
              </div>
            </td>

            {/* MINIMUM DEPOSIT */}
            <td className="px-2 py-4 text-center">
              <span className="text-[16px] font-black tabular-nums text-[#081a33]">
                {formatDeposit(getDisplayDeposit(broker))}
              </span>
            </td>

            {/* LICENSE COUNT */}
            <td className="px-2 py-4 text-center">
              <span className="block text-[17px] font-black text-[#123b72]">
                {broker.active_license_count}
              </span>
              <span className="mt-1 block text-[11px] font-medium text-slate-500">
                تراخيص مسجلة
              </span>
            </td>

            {/* REGULATORS */}
            <td className="px-2 py-4">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {licenseCodes.length > 0 ? (
                  licenseCodes.map((code) => (
                    <span
                      key={`${broker.id}-${code}`}
                      className="inline-flex min-h-[26px] items-center justify-center rounded-md border border-[#cbdcf2] bg-white px-2.5 text-[11px] font-black text-[#184a97]"
                    >
                      {code}
                    </span>
                  ))
                ) : (
                  <span className="text-[12px] text-slate-500">
                    غير محدد
                  </span>
                )}
              </div>
            </td>

            {/* PLATFORMS */}
            <td className="px-2 py-4">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {platforms.length > 0 ? (
                  platforms.map((platform) => (
                    <span
                      key={`${broker.id}-${platform}`}
                      className="inline-flex min-h-[26px] items-center justify-center rounded-md bg-[#eaf2fd] px-2.5 text-[11px] font-bold text-[#1e5bb8]"
                    >
                      {platform}
                    </span>
                  ))
                ) : (
                  <span className="text-[12px] text-slate-500">
                    غير محدد
                  </span>
                )}
              </div>
            </td>

            {/* ISLAMIC ACCOUNT */}
            <td className="px-2 py-4 text-center">
              <span
                className={`inline-flex min-h-[30px] items-center justify-center rounded-lg px-3 text-[12px] font-black ${
                  broker.has_islamic_account
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {broker.has_islamic_account ? "✓ متوفر" : "تحقق"}
              </span>
            </td>

            {/* ACTIONS */}
            <td className="px-3 py-3">
              <div className="mx-auto flex w-full max-w-[130px] flex-col gap-2">
                <Link
                  href={reviewHref}
                  className="inline-flex min-h-[38px] items-center justify-center rounded-lg border border-[#a9c5e9] bg-white px-2 text-center text-[12px] font-black text-[#184a97] transition hover:bg-[#eef5fd]"
                >
                  قراءة التقييم
                </Link>

                {broker.real_account_url && broker.slug ? (
                  <a
                    href={`/go/${broker.slug}?type=real`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-[#1e5bb8] px-2 text-center text-[12px] font-black text-white transition hover:bg-[#184a97]"
                  >
                    فتح حساب
                  </a>
                ) : (
                  <Link
                    href={reviewHref}
                    className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-[#1e5bb8] px-2 text-center text-[12px] font-black text-white transition hover:bg-[#184a97]"
                  >
                    تفاصيل الوسيط
                  </Link>
                )}
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


    {/* MOBILE AND TABLET — COMPACT BROKER CARDS */}
    <div className="space-y-3 lg:hidden">
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
              .filter((code): code is string => Boolean(code))
          )
        ).slice(0, 5);

        const platforms = Array.from(
          new Set(splitItems(broker.platforms, 5))
        ).slice(0, 4);

        return (
          <article
            key={broker.id}
            className={`overflow-hidden rounded-2xl border bg-white ${
              index === 0
                ? "border-amber-400"
                : "border-[#d6e5f8]"
            }`}
          >
            <details className="group">
              <summary className="cursor-pointer list-none p-3.5 [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-black ${
                      index === 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-[#eef5fd] text-[#1e5bb8]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <BrokerLogo broker={broker} size="small" />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[14px] font-black text-[#081a33]">
                      {brokerName}
                    </h3>
                    <p className="mt-1 truncate text-[10px] text-slate-500">
                      {cleanText(broker.best_for, "وسيط تداول فوركس")}
                    </p>
                  </div>

                  <span className="text-lg font-black text-[#1e5bb8] group-open:rotate-180">
                    ⌄
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-[#e2eaf4] bg-[#f7faff] text-center">
                  <div className="px-1 py-2">
                    <span className="block text-[10px] text-slate-500">
                      التقييم
                    </span>
                    <strong className="mt-1 block text-[12px] text-amber-700">
                      ★ {ratingLabel(broker.rating)}
                    </strong>
                  </div>

                  <div className="border-x border-[#e2eaf4] px-1 py-2">
                    <span className="block text-[10px] text-slate-500">
                      أقل إيداع
                    </span>
                    <strong className="mt-1 block text-[12px] text-[#081a33]">
                      {formatDeposit(getDisplayDeposit(broker))}
                    </strong>
                  </div>

                  <div className="px-1 py-2">
                    <span className="block text-[10px] text-slate-500">
                      التراخيص
                    </span>
                    <strong className="mt-1 block text-[12px] text-[#081a33]">
                      {broker.active_license_count}
                    </strong>
                  </div>
                </div>

                <p className="mt-2 text-center text-[11px] font-black text-[#1e5bb8]">
                  <span className="group-open:hidden">عرض التفاصيل ⌄</span>
                  <span className="hidden group-open:inline">إخفاء التفاصيل ⌃</span>
                </p>
              </summary>

              <div className="space-y-4 border-t border-[#e2eaf4] p-4">
                <div>
                  <h4 className="mb-2 text-[12px] font-black text-[#081a33]">
                    الجهات الرقابية المسجلة
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {licenseCodes.length ? (
                      licenseCodes.map((code) => (
                        <span
                          key={`${broker.id}-${code}`}
                          className="rounded-md border border-[#d6e5f8] px-2 py-1 text-[10px] font-bold text-[#184a97]"
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

                <div>
                  <h4 className="mb-2 text-[12px] font-black text-[#081a33]">
                    منصات التداول
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {platforms.length ? (
                      platforms.map((platform) => (
                        <span
                          key={`${broker.id}-${platform}`}
                          className="rounded-md bg-[#eef5fd] px-2 py-1 text-[10px] font-bold text-[#1e5bb8]"
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

                <div className="flex items-center justify-between rounded-xl bg-[#f5f8fd] px-3 py-2.5">
                  <span className="text-[12px] font-bold text-slate-700">
                    الحساب الإسلامي
                  </span>
                  <strong className="text-[12px] text-[#184a97]">
                    {broker.has_islamic_account ? "متوفر" : "تحقق من الشروط"}
                  </strong>
                </div>

                <BrokerButtons broker={broker} compact />

                <Link
                  href={reviewHref}
                  className="block text-center text-[11px] font-bold text-[#1e5bb8] hover:underline"
                >
                  اقرأ تقييم {brokerName} الكامل ←
                </Link>
              </div>
            </details>
          </article>
        );
      })}
    </div>

    <p className="mt-5 text-[11px] font-medium leading-6 text-slate-500">
      الترتيب وفق التقييم العام في بروكر العرب، وليس توصية استثمارية.
      تختلف شروط التداول والتراخيص والحسابات المتاحة حسب بلد الإقامة
      والكيان القانوني. تحقق من التفاصيل الرسمية قبل فتح الحساب.
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
  className="scroll-mt-24 border-b border-[#dce7f5] bg-white py-8 sm:py-12"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[900px] text-center">
      <h2
        id="trading-markets-title"
        className="text-[23px] font-black leading-tight text-[#081a33] sm:text-[34px]"
      >
        أفضل شركات التداول حسب السوق المالي
      </h2>
      <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[15px]">
        تختلف الأدوات والرسوم وطريقة تنفيذ الصفقات من سوق إلى آخر.
        اختر السوق الذي يهمك لتتعرف على معايير المقارنة والوسطاء المناسبين له.
      </p>
    </div>

    <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
      {[
        {
          number: "01",
          title: "شركات تداول الفوركس",
          shortTitle: "تداول الفوركس",
          description: "قارن وسطاء أزواج العملات من حيث السبريد وسرعة التنفيذ والمنصات.",
          criteria: ["السبريد", "التنفيذ", "أزواج العملات"],
          href: "/best-brokers",
        },
        {
          number: "02",
          title: "شركات تداول الأسهم",
          shortTitle: "تداول الأسهم",
          description: "تعرف على نوع الأسهم المتاحة والفرق بين امتلاك السهم وتداول عقود الفروقات.",
          criteria: ["نوع المنتج", "العمولات", "الأسواق"],
          href: "/best-brokers/stocks",
        },
        {
          number: "03",
          title: "شركات تداول المؤشرات",
          shortTitle: "تداول المؤشرات",
          description: "راجع المؤشرات العالمية المتاحة وتكاليف الاحتفاظ بالصفقات وأوقات التداول.",
          criteria: ["المؤشرات", "السبريد", "ساعات التداول"],
          href: "/best-brokers/indices",
        },
        {
          number: "04",
          title: "شركات تداول السلع والذهب",
          shortTitle: "تداول الذهب والسلع",
          description: "قارن شروط تداول الذهب والنفط والسلع من حيث فروقات الأسعار وأحجام العقود.",
          criteria: ["الذهب والنفط", "تكلفة التداول", "حجم العقد"],
          href: "/best-brokers/commodities",
        },
      ].map((item) => (
        <Link
          key={item.number}
          href={item.href}
          className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#d6e5f8] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#2b6fd0] hover:shadow-[0_12px_30px_rgba(24,74,151,0.10)]"
        >
          <div className="h-[3px] bg-[#d6e5f8] transition-colors group-hover:bg-[#2b6fd0]" />

          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-black text-[#2b6fd0]">
                {item.number}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                دليل متخصص
              </span>
            </div>

            <h3 className="mt-4 text-[13px] font-black leading-6 text-[#081a33] sm:text-[18px]">
              <span className="sm:hidden">{item.shortTitle}</span>
              <span className="hidden sm:inline">{item.title}</span>
            </h3>

            <p className="mt-2 hidden flex-1 text-[13px] leading-7 text-slate-600 sm:block">
              {item.description}
            </p>

            <div className="mt-4 hidden flex-wrap gap-1.5 sm:flex">
              {item.criteria.map((criterion) => (
                <span
                  key={criterion}
                  className="rounded-md bg-[#eef5fd] px-2.5 py-1.5 text-[11px] font-bold text-[#184a97]"
                >
                  {criterion}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-[#e5edf7] pt-3 sm:mt-5 sm:pt-4">
              <span className="text-[11px] font-black text-[#1e5bb8] sm:text-[13px]">
                استكشف الدليل
              </span>
              <span className="text-[16px] font-black text-[#2b6fd0]">
                ←
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>

    <p className="mt-5 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
      تنبيه: قد تختلف ملكية الأصل عن التداول عبر عقود الفروقات، كما تختلف الرسوم والمخاطر حسب المنتج والوسيط.
    </p>
  </div>
</section>



{/* 3 — TRADING CONDITIONS */}
<section
  id="trading-conditions"
  aria-labelledby="trading-conditions-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-8 sm:py-12"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
    {/* SECTION HEADING */}
    <div className="mx-auto max-w-[900px] text-center">
      <h2
        id="trading-conditions-title"
        className="text-[23px] font-black leading-tight text-[#081a33] sm:text-[34px]"
      >
        كيف تختار شركة تداول حسب شروط الحساب؟
      </h2>

      <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[15px]">
        قد يقدم الوسيط أكثر من نوع حساب، ولكل حساب شروط مختلفة.
        استخدم المعايير التالية لمقارنة التكاليف ومتطلبات الإيداع
        وشروط التداول قبل فتح حساب حقيقي.
      </p>
    </div>

    {/* COMPARISON TABLE */}
    <div className="mt-7 overflow-hidden rounded-[20px] border border-[#d6e5f8] bg-white shadow-sm">

      {/* DESKTOP TABLE HEADER */}
      <div className="hidden grid-cols-[1.1fr_1.6fr_1.4fr_150px] items-center bg-[#123b72] px-6 py-[18px] text-center text-[13px] font-black text-white lg:grid">
        <span className="text-center">
          معيار المقارنة
        </span>

        <span className="text-center">
          ما الذي يجب التحقق منه؟
        </span>

        <span className="text-center">
          لماذا يهم المتداول؟
        </span>

        <span className="text-center">
          الدليل
        </span>
      </div>

      {[
        {
          title: "أنواع حسابات التداول",
          check:
            "قارن حسابات Standard وRaw وغيرها حسب ما يقدمه كل وسيط.",
          reason:
            "قد يختلف السبريد والعمولة والإيداع بين حساب وآخر داخل الشركة نفسها.",
          href: "/compare-accounts",
          link: "قارن الحسابات",
        },
        {
          title: "الحد الأدنى للإيداع",
          check:
            "تحقق من الحد المطلوب لفتح الحساب والحد الأدنى لعملية الإيداع.",
          reason:
            "بعض الحسابات تتطلب مبالغ أعلى للحصول على شروط تداول مختلفة.",
          href: "/brokers",
link: "قارن حدود الإيداع",
        },
        {
          title: "السبريد والعمولات",
          check:
            "راجع متوسط السبريد والعمولة لكل لوت ورسوم التبييت.",
          reason:
            "التكلفة الإجمالية للصفقة أهم من مقارنة السبريد وحده.",
          href: "/learn-trading/spread",
          link: "دليل السبريد",
        },
        {
          title: "الحساب الإسلامي",
          check:
            "راجع الأدوات المشمولة والإعفاء من التبييت وأي رسوم إدارية.",
          reason:
            "تختلف شروط الحساب الإسلامي حسب الوسيط ونوع الحساب وبلد الإقامة.",
          href: "/compare-accounts",
          link: "شروط الحسابات",
        },
        {
          title: "مقارنة شركات التداول",
          check:
            "قارن شركتين مباشرة من حيث التقييم والتراخيص والحسابات وشروط التداول.",
          reason:
            "المقارنة المباشرة تساعدك على تحديد الفروقات قبل اختيار الوسيط.",
          href: "/compare",
          link: "قارن شركتين",
        },
        {
          title: "الرافعة المالية والهامش",
          check:
            "افحص الرافعة المتاحة ومتطلبات الهامش ومستوى إغلاق الصفقات.",
          reason:
            "الرافعة المرتفعة تضخم الأرباح والخسائر وتزيد خطر التصفية.",
          href: "/learn-trading/leverage",
          link: "دليل الرافعة المالية",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className={`grid gap-3 border-b border-[#e2eaf5] p-4 last:border-b-0 sm:p-5 lg:grid-cols-[1.1fr_1.6fr_1.4fr_150px] lg:items-center lg:gap-5 lg:px-6 lg:py-5 ${
            index % 2 === 0
              ? "bg-white"
              : "bg-[#f8faff]"
          }`}
        >
          {/* CRITERION */}
          <div className="flex w-full items-center justify-start gap-3 text-right">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f1ff] text-[12px] font-black text-[#1e5bb8]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="text-right text-[14px] font-black leading-6 text-[#081a33] sm:text-[15px]">
  {item.title}
</h3>
          </div>

          {/* WHAT TO CHECK */}
          <p className="text-[12px] leading-6 text-slate-700 sm:text-[13px] sm:leading-7 lg:text-center">
            {item.check}
          </p>

          {/* WHY IT MATTERS */}
          <p className="hidden text-[13px] leading-7 text-slate-600 sm:block lg:text-center">
            {item.reason}
          </p>

          {/* GUIDE LINK */}
          
<Link
  href={item.href}
  className="inline-flex min-h-[42px] w-fit items-center justify-center rounded-lg bg-[#1e5bb8] px-4 text-center text-[12px] font-black leading-5 text-white transition-all duration-200 hover:bg-[#184a97] hover:shadow-md lg:w-full"
>
  {item.link}
</Link>

        </div>
      ))}
    </div>

    {/* DISCLAIMER */}
    <p className="mt-4 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
      تختلف شروط الحساب الفعلية بحسب الكيان القانوني وبلد الإقامة ونوع الحساب.
      تحقق من أحدث الشروط لدى الوسيط قبل التسجيل.
    </p>
  </div>
</section>




{/* 5 — REGULATION AND SAFETY */}
<section
  id="licenses"
  aria-labelledby="licenses-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-9 sm:py-14"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">

    {/* SECTION HEADING */}
    <div className="mx-auto max-w-[900px] text-center">
      <h2
        id="licenses-title"
        className="text-[24px] font-black leading-[1.4] text-[#081a33] sm:text-[36px]"
      >
        كيف تتحقق من شركات التداول المرخصة والموثوقة؟
      </h2>

      <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
        وجود ترخيص لدى شركة تداول لا يعني بالضرورة أن جميع عملائها
        يخضعون لنفس الجهة الرقابية. تحقق من اسم الكيان القانوني
        ورقم الترخيص والجهة المسؤولة عن حسابك قبل إيداع الأموال.
      </p>
    </div>

    {/* PRACTICAL VERIFICATION STEPS */}
    <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">
      {[
        {
          number: "01",
          title: "تحقق من الكيان القانوني",
          description:
            "طابق اسم الشركة المسجلة في السجل الرقابي مع الكيان الذي سيقدم لك حساب التداول.",
        },
        {
          number: "02",
          title: "راجع رقم الترخيص",
          description:
            "ابحث عن رقم الترخيص في الموقع الرسمي للجهة الرقابية، ولا تعتمد على شعار الهيئة وحده.",
        },
        {
          number: "03",
          title: "تأكد من نطاق الحماية",
          description:
            "تحقق من حالة الترخيص والخدمات المسموح بها، وما إذا كانت الحماية الرقابية تشمل حسابك.",
        },
      ].map((step) => (
        <div
          key={step.number}
          className="flex items-start gap-3 rounded-xl border border-[#d6e5f8] bg-white p-4 sm:p-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f1ff] text-[12px] font-black text-[#1e5bb8]">
            {step.number}
          </span>

          <div>
            <h3 className="text-[14px] font-black text-[#081a33] sm:text-[15px]">
              {step.title}
            </h3>
            <p className="mt-1.5 text-[12px] leading-6 text-slate-600 sm:text-[13px]">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* REGULATOR DIRECTORY */}
    <div className="mt-9">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[18px] font-black text-[#081a33] sm:text-[22px]">
          دليل الهيئات الرقابية لشركات التداول
        </h3>

        <span className="rounded-full bg-[#e8f1ff] px-3 py-1.5 text-[11px] font-black text-[#1e5bb8]">
          {regulatorSummaries.length} جهات رقابية
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {regulatorSummaries.map((regulator, index) => {
          const regulatorFlags: Record<string, string> = {
            FCA: "🇬🇧",
            ASIC: "🇦🇺",
            CYSEC: "🇨🇾",
            FSCA: "🇿🇦",
            DFSA: "🇦🇪",
            SCB: "🇧🇸",
            FSA: "🇸🇨",
            "FSC BELIZE": "🇧🇿",
            "FSC BELIZE ": "🇧🇿",
            "FSC MAURITIUS": "🇲🇺",
            "ADGM FSRA": "🇦🇪",
            BAFIN: "🇩🇪",
            CIRO: "🇨🇦",
            NFA: "🇺🇸",
            JSC: "🇯🇴",
            SCA: "🇦🇪",
            VFSC: "🇻🇺",
            MISA: "🇰🇲",
            CIMA: "🇰🇾",
            CMWM: "🇳🇱",
            CVM: "🇧🇷",
            BACEN: "🇧🇷",
            "FSC BVI": "🇻🇬",
          };

          const code = regulator.code.trim().toUpperCase();
          const flag = regulatorFlags[code] || "🌐";

          return (
            <Link
              key={regulator.code}
              href={`/licenses/${regulator.code.toLowerCase()}`}
              className={`group flex min-w-0 flex-col overflow-hidden rounded-[17px] border border-[#d6e5f8] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#2b6fd0] hover:shadow-[0_10px_25px_rgba(30,91,184,0.10)] ${
                index >= 8 ? "license-extra-card" : ""
              }`}
            >
              <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#eef5fd] px-2.5 py-1.5 text-[11px] font-black text-[#1e5bb8]">
                    {regulator.code}
                  </span>

                  
<span
  aria-hidden="true"
  className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-[#eef5fd] shadow-[0_2px_8px_rgba(0,0,0,0.12)] ring-1 ring-[#d6e5f8]"
>
  {(() => {
    const countryCodes: Record<string, string> = {
      FCA: "gb",
      ASIC: "au",
      CYSEC: "cy",
      FSCA: "za",
      DFSA: "ae",
      SCB: "bs",
      FSA: "sc",
      "FSC BELIZE": "bz",
      "FSC MAURITIUS": "mu",
      "FSC BVI": "vg",
      "ADGM FSRA": "ae",
      BAFIN: "de",
      CIRO: "ca",
      NFA: "us",
      JSC: "jo",
      SCA: "ae",
      VFSC: "vu",
      MISA: "km",
      CIMA: "ky",
      CMWM: "nl",
      CVM: "br",
      BACEN: "br",
      LFSA: "lb",
      CBI: "ie",
      "MOCI KUWAIT": "kw",
    };

    const countryCode =
      countryCodes[regulator.code.trim().toUpperCase()];

    return countryCode ? (
      <img
        src={`https://flagcdn.com/w80/${countryCode}.png`}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    ) : (
      <span className="text-[18px]">🌐</span>
    );
  })()}
</span>

                </div>

                <h4 className="mt-4 flex-1 text-[12px] font-black leading-6 text-[#081a33] sm:text-[15px] sm:leading-7">
                  {regulator.name}
                </h4>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#e8eef7] pt-3">
                  <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
                    {regulator.brokerCount} وسطاء مرتبطون
                  </span>

                  <span className="text-[11px] font-black text-[#1e5bb8] group-hover:underline sm:text-[12px]">
                    دليل الترخيص ←
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* EXPAND / COLLAPSE CONTROL */}
      {regulatorSummaries.length > 8 && (
        <div className="mt-6 text-center">
          <style>{`
            #licenses .license-extra-card {
              display: none;
            }
            #licenses:has(#show-all-licenses:checked) .license-extra-card {
              display: flex;
            }
            #licenses:has(#show-all-licenses:checked) .show-more-text {
              display: none;
            }
            #licenses:not(:has(#show-all-licenses:checked)) .show-less-text {
              display: none;
            }
          `}</style>

          <input
            id="show-all-licenses"
            type="checkbox"
            className="peer sr-only"
          />

          <label
            htmlFor="show-all-licenses"
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl bg-[#1e5bb8] px-7 text-[13px] font-black text-white transition hover:bg-[#184a97]"
          >
            <span className="show-more-text">
              عرض جميع الجهات الرقابية ({regulatorSummaries.length})
            </span>
            <span className="show-less-text">
              عرض عدد أقل
            </span>
          </label>
        </div>
      )}
    </div>

    <p className="mt-7 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
      عدد الوسطاء المعروض يعكس البيانات المسجلة في بروكر العرب،
      ولا يعني أن جميع العملاء يتبعون الكيان القانوني الخاضع لذلك الترخيص.
    </p>
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
  className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-7 sm:py-14"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">

    {/* FAQ HEADING */}
    <div className="mx-auto max-w-[900px] text-center">
      <h2
        id="best-brokers-faq-title"
        className="text-[23px] font-black leading-[1.4] text-[#081a33] sm:text-[35px]"
      >
        الأسئلة الشائعة حول أفضل شركات التداول
      </h2>

      {/* MOBILE DESCRIPTION */}
      <p className="mt-2 text-[12px] leading-6 text-slate-600 sm:hidden">
        إجابات عن أفضل شركات الفوركس والتراخيص والحسابات
        وتكاليف التداول.
      </p>

      {/* DESKTOP DESCRIPTION */}
      <p className="mt-3 hidden text-[13px] leading-7 text-slate-600 sm:block sm:text-[15px]">
        تعرف على إجابات أهم الأسئلة حول أفضل شركات تداول الفوركس
        في 2026، وكيفية التحقق من التراخيص، ومقارنة الرسوم
        والحسابات واختيار وسيط التداول المناسب.
      </p>
    </div>

    {/* FAQ GRID — SAME DATA AS FAQ SCHEMA */}
    <div className="mt-6 grid items-start gap-3 sm:mt-9 sm:gap-4 lg:grid-cols-2">
      {faqItems.map((item, index) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-xl border border-[#d6e5f8] bg-white shadow-[0_4px_16px_rgba(24,74,151,0.035)] transition-all duration-200 open:border-[#a9c8f1] open:shadow-[0_8px_25px_rgba(24,74,151,0.08)] sm:rounded-[18px]"
        >
          <summary className="flex min-h-[54px] cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 transition hover:bg-[#f7faff] sm:min-h-[76px] sm:gap-4 sm:px-4 sm:py-4 lg:px-6 [&::-webkit-details-marker]:hidden">

            {/* QUESTION NUMBER */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#eef5fd] text-[10px] font-black text-[#1e5bb8] sm:h-9 sm:w-9 sm:rounded-xl sm:text-[12px]">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* QUESTION */}
            <h3 className="min-w-0 flex-1 text-right text-[12px] font-black leading-5 text-[#081a33] sm:text-[15px] sm:leading-7">
              {item.question}
            </h3>

            {/* EXPAND ICON */}
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d6e5f8] bg-[#f4f8ff] text-[17px] font-medium text-[#1e5bb8] transition-all duration-200 group-open:rotate-45 group-open:border-[#2b6fd0] group-open:bg-[#1e5bb8] group-open:text-white sm:h-9 sm:w-9 sm:text-[20px]"
            >
              +
            </span>
          </summary>

          {/* ANSWER */}
          <div className="border-t border-[#e5edf8] bg-[#fbfdff] px-3 py-3 sm:px-6 sm:py-5">
            <p className="text-right text-[12px] leading-7 text-[#526784] sm:text-[14px] sm:leading-8">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>

    {/* BOTTOM CTA */}
    <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-[#c7daf3] bg-white p-4 text-center sm:mt-8 sm:flex-row sm:gap-4 sm:rounded-[20px] sm:p-5 sm:text-right lg:p-6">

      <div>
        <h3 className="text-[14px] font-black text-[#081a33] sm:text-[16px]">
          ما زلت تقارن بين شركات التداول؟
        </h3>

        <p className="mt-1 hidden text-[12px] leading-6 text-slate-600 sm:block sm:text-[13px]">
          راجع تقييمات الوسطاء وقارن أنواع الحسابات
          وشروط التداول قبل اتخاذ قرارك.
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-3">

        <Link
          href="/brokers"
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#bfd3ee] bg-[#f4f8ff] px-2 py-2 text-[11px] font-black text-[#1e5bb8] transition hover:bg-[#e5efff] sm:min-h-11 sm:rounded-xl sm:px-5 sm:py-3 sm:text-[12px]"
        >
          تقييمات الوسطاء
        </Link>

        <Link
          href="/compare-accounts"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1e5bb8] px-2 py-2 text-[11px] font-black text-white transition hover:bg-[#184a97] sm:min-h-11 sm:rounded-xl sm:px-5 sm:py-3 sm:text-[12px]"
        >
          مقارنة الحسابات
        </Link>

      </div>
    </div>

  </div>
</section>

</div>
    </main>
  );
}