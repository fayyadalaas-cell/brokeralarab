import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export const revalidate = 0;

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  best_for: string | null;
  intro: string | null;
  logo: string | null;
  account_types: string | null;
  fees: string | null;
  spreads: string | null;
  deposit_withdrawal: string | null;
  real_account_url: string | null;
  platform_details: string | null;
  support: string | null;
  safety: string | null;
  final_verdict: string | null;
  founded_year: string | null;
  headquarters: string | null;
  max_leverage: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  trading_assets: string | null;
  key_strength_ar: string | null;
  key_weakness_ar: string | null;
  expert_insight_ar: string | null;
  who_should_use_ar: string | null;
    score_safety: number | null;
  score_fees: number | null;
  score_platforms: number | null;
  score_deposit: number | null;
  score_support: number | null;

  regulation_summary_ar: string | null;
  fund_protection_ar: string | null;
  safety_factors_ar: string | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  account_name_ar: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  sort_order: number | null;
};

type BrokerLicense = {
  id: number;
  broker_id: number;
  regulator_code: string | null;
  regulator_name_ar: string | null;
  country_ar: string | null;
  license_number: string | null;
  entity_name_ar: string | null;
  entity_name_en: string | null;
  status_code: string | null;
  trust_level: string | null;
  verification_url_ar: string | null;
  verification_url_en: string | null;
  last_verified: string | null;
  is_active: boolean | null;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function cleanText(value: string | null | undefined) {
  return (value || "").trim();
}

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
    .slice(0, 4)
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

function splitParagraphs(value: string | null | undefined) {
  return (value || "")
    .split("||")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function splitSafetyFactors(value: string | null | undefined) {
  return (value || "")
    .split("||")
    .map((factor) => factor.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function licenseTrustLabel(value: string | null) {
  if (value === "Tier 1") return "رقابة قوية";
  if (value === "Tier 2") return "رقابة متوسطة";
  if (value === "Tier 3") return "رقابة دولية";
  return "غير مصنف";
}

function licenseTrustClasses(value: string | null) {
  if (value === "Tier 1") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (value === "Tier 2") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function licenseStatusLabel(value: string | null) {
  return value === "active" ? "نشط" : "تحقق من الحالة";
}

function formatVerifiedDate(value: string | null) {
  if (!value) return "غير محدد";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function countLicenses(value: string | null) {
  if (!value) return 0;
  return value
    .split("||")
    .map((x) => x.trim())
    .filter(Boolean).length;
}

function hasArabicSupportScore(value: string | null) {
  const v = (value || "").toLowerCase();
  return v.includes("yes") || v.includes("متوفر") || v.includes("عربي") ? 1 : 0;
}

function hasIslamicScore(value: string | null) {
  const v = (value || "").toLowerCase();
  return v.includes("yes") || v.includes("متوفر") ? 1 : 0;
}

function numericLeverage(value: string | null) {
  if (!value) return 0;
  const match = value.match(/\d+/g);
  if (!match) return 0;
  return Number(match.join(""));
}

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

function getBetterValueLabel(left: Broker, right: Broker) {
  const leftDeposit = left.min_deposit ?? 999999;
  const rightDeposit = right.min_deposit ?? 999999;
  return leftDeposit < rightDeposit
    ? left.name
    : rightDeposit < leftDeposit
    ? right.name
    : "تعادل";
}

function getHigherRatingLabel(left: Broker, right: Broker) {
  const l = left.rating ?? 0;
  const r = right.rating ?? 0;
  return l > r ? left.name : r > l ? right.name : "تعادل";
}

function getBeginnerWinner(left: Broker, right: Broker) {
  const lDeposit = left.min_deposit ?? 999999;
  const rDeposit = right.min_deposit ?? 999999;

  const lScore =
    (lDeposit <= 50 ? 2 : 0) +
    (cleanText(left.best_for).includes("مبتد") ? 2 : 0) +
    hasIslamicScore(left.islamic_account) +
    hasArabicSupportScore(left.arabic_support);

  const rScore =
    (rDeposit <= 50 ? 2 : 0) +
    (cleanText(right.best_for).includes("مبتد") ? 2 : 0) +
    hasIslamicScore(right.islamic_account) +
    hasArabicSupportScore(right.arabic_support);

  return lScore > rScore ? left.name : rScore > lScore ? right.name : "تعادل";
}

function getScalpingWinner(left: Broker, right: Broker) {
  const lText = `${left.spreads || ""} ${left.fees || ""} ${left.best_for || ""}`;
  const rText = `${right.spreads || ""} ${right.fees || ""} ${right.best_for || ""}`;

  const lScore =
    (lText.includes("0.0") ? 2 : 0) +
    (lText.includes("سبريد") ? 1 : 0) +
    (lText.includes("سريع") ? 1 : 0) +
    (lText.includes("منخفض") ? 1 : 0);

  const rScore =
    (rText.includes("0.0") ? 2 : 0) +
    (rText.includes("سبريد") ? 1 : 0) +
    (rText.includes("سريع") ? 1 : 0) +
    (rText.includes("منخفض") ? 1 : 0);

  return lScore > rScore ? left.name : rScore > lScore ? right.name : "تعادل";
}

function getSafetyWinner(left: Broker, right: Broker) {
  const lScore = countLicenses(left.regulation) + ((left.rating ?? 0) >= 4 ? 1 : 0);
  const rScore = countLicenses(right.regulation) + ((right.rating ?? 0) >= 4 ? 1 : 0);
  return lScore > rScore ? left.name : rScore > lScore ? right.name : "تعادل";
}

function compareTitle(left: Broker, right: Broker) {
  return `${left.name} vs ${right.name}: أيهما أفضل للمتداول العربي؟`;
}

function getBrokerReasons(
  broker: Broker,
  other: Broker,
  type: "left" | "right"
): string[] {
  const reasons: string[] = [];

  if ((broker.rating ?? 0) > (other.rating ?? 0)) {
    reasons.push(`تقييم ${broker.name} أعلى إجمالًا من ${other.name}.`);
  }

  if ((broker.min_deposit ?? 999999) < (other.min_deposit ?? 999999)) {
    reasons.push(`${broker.name} يقدم حدًا أدنى للإيداع أقل.`);
  }

  if (hasIslamicScore(broker.islamic_account) > hasIslamicScore(other.islamic_account)) {
    reasons.push(`${broker.name} أوضح من ناحية توفر الحساب الإسلامي.`);
  }

  if (hasArabicSupportScore(broker.arabic_support) > hasArabicSupportScore(other.arabic_support)) {
    reasons.push(`${broker.name} يبدو أفضل للمتداول العربي من ناحية الدعم.`);
  }

  if (countLicenses(broker.regulation) > countLicenses(other.regulation)) {
    reasons.push(`${broker.name} يظهر تنوعًا أكبر في التراخيص.`);
  }

  if (numericLeverage(broker.max_leverage) > numericLeverage(other.max_leverage)) {
    reasons.push(`${broker.name} يقدم رافعة أعلى وفق البيانات الحالية.`);
  }

  if (cleanText(broker.best_for)) {
    reasons.push(`بحسب التصنيف الحالي، ${broker.name} مناسب لـ ${cleanText(broker.best_for)}.`);
  }

  if (reasons.length < 4) {
    if (type === "left") {
      reasons.push(`قد يكون ${broker.name} مناسبًا إذا كنت تفضل بيئة تداول مباشرة وواضحة.`);
      reasons.push(`راجع تفاصيل الرسوم والمنصات في تقييم ${broker.name} قبل اتخاذ القرار النهائي.`);
    } else {
      reasons.push(`قد يكون ${broker.name} مناسبًا إذا كنت تبحث عن بداية أسهل أو تجربة أكثر مرونة.`);
      reasons.push(`من الأفضل مراجعة الحسابات المتاحة لدى ${broker.name} قبل فتح الحساب.`);
    }
  }

  return reasons.slice(0, 4);
}

function buildFaqJsonLd(left: Broker, right: Broker) {
  const brokerFaqs = [left, right].flatMap((broker) => {
    const faqs = Array.isArray((broker as any).faq_ar)
      ? ((broker as any).faq_ar as {
          question?: string;
          answer?: string;
        }[])
      : [];

    return faqs
      .slice(0, 3)
      .filter(
        (faq) =>
          faq.question?.trim() &&
          faq.answer?.trim()
      )
      .map((faq) => ({
        "@type": "Question",
        name: faq.question!.trim(),
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer!.trim(),
        },
      }));
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brokerFaqs,
  };
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [leftSlug, rightSlug] = slug.split("-vs-");
  const siteUrl = "https://brokeralarab.com";

  if (!leftSlug || !rightSlug) {
  return {
    metadataBase: new URL(siteUrl),
    title: "مقارنة شركات التداول | بروكر العرب",
    description:
      "مقارنات تفصيلية بين شركات التداول من حيث الحسابات والرسوم والتراخيص والمنصات.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

  const supabase = await createClient();

  const { data } = await supabase
  .from("brokers")
  .select("name, slug")
  .eq("publication_status", "published")
  .in("slug", [leftSlug, rightSlug]);

  const brokers = (data ?? []) as { name: string | null; slug: string | null }[];

  const leftBroker = brokers.find((b) => b.slug === leftSlug);
  const rightBroker = brokers.find((b) => b.slug === rightSlug);

  const leftName = leftBroker?.name || leftSlug;
  const rightName = rightBroker?.name || rightSlug;

  const title = `مقارنة ${leftName} و ${rightName} | الرسوم والمنصات والتراخيص`;
  const description = `مقارنة شاملة بين ${leftName} و ${rightName} من حيث الحسابات والرسوم والتراخيص والمنصات والحد الأدنى للإيداع لمعرفة أيهما أنسب للمتداول العربي.`;
 

 return {
  metadataBase: new URL(siteUrl),
  title,
  description,
    keywords: [
      `مقارنة ${leftName} و ${rightName}`,
      `${leftName} vs ${rightName}`,
      `تقييم ${leftName}`,
      `تقييم ${rightName}`,
      "مقارنة شركات التداول",
      "مقارنة شركات الفوركس",
      "بروكر العرب",
    ],
    alternates: {
  canonical: `${siteUrl}/compare/${slug}`,
  languages: {
    ar: `${siteUrl}/compare/${slug}`,
    en: `${siteUrl}/en/compare/${slug}`,
    "x-default": `${siteUrl}/compare/${slug}`,
  },
},
   openGraph: {
  title,
  description,
  url: `${siteUrl}/compare/${slug}`,
  siteName: "Broker Alarab",
  locale: "ar_AR",
  type: "website",
  images: [
    {
      url: `${siteUrl}/og-image.webp`,
      width: 1560,
      height: 377,
      alt: "Broker Alarab",
    },
  ],
},

twitter: {
  card: "summary_large_image",
  title,
  description,
  images: [`${siteUrl}/og-image.webp`],
},
  };
}

function BrokerHeadToHeadCard({
  broker,
  other,
  isWinner,
}: {
  broker: Broker;
  other: Broker;
  isWinner: boolean;
}) {
  const name = broker.name || "الوسيط";
  const slug = broker.slug || "";
  const reason =
    cleanText(broker.best_for) ||
    `مناسب لفئات متعددة من المتداولين مقارنة بـ ${other.name || "الوسيط الآخر"}`;

  return (
    <div
      className={`rounded-[28px] border p-5 shadow-sm sm:p-6 ${
        isWinner
          ? "border-brand-100 bg-[#f8fbff]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black sm:text-3xl">{name}</h2>
            {isWinner ? (
              <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-600">
                الأفضل إجمالًا
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-600">{reason}</p>
        </div>

        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 sm:h-20 sm:w-20">
          <span className="text-xl font-black sm:text-2xl">
            {broker.rating?.toFixed(2) ?? "—"}
          </span>
          <span className="text-[10px] font-bold">من 5</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-[11px] font-bold text-slate-500">الحد الأدنى للإيداع</div>
          <div className="mt-1 text-sm font-black text-[#0f172a]">{money(broker.min_deposit)}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-[11px] font-bold text-slate-500">الحساب الإسلامي</div>
          <div className="mt-1 text-sm font-black text-[#0f172a]">
            {yesNoArabic(broker.islamic_account)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-[11px] font-bold text-slate-500">المنصات</div>
          <div className="mt-1 text-sm font-black text-[#0f172a]">
            {shortPlatforms(broker.platforms)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-[11px] font-bold text-slate-500">التراخيص</div>
          <div className="mt-1 text-sm font-black text-[#0f172a]">
            {shortReg(broker.regulation)}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={`/brokers/${slug}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
        >
          اقرأ تقييم {name}
        </Link>
        <a
          href={`/go/${slug}?type=real`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
        >
          افتح حساب حقيقي
        </a>
      </div>
    </div>
  );
}

function AccountCard({
  account,
}: {
  account: BrokerAccount;
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="text-lg font-black text-[#0f172a]">
          {account.account_name_ar || account.account_name || "حساب"}
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-brand-600">
          الحساب
        </span>
      </div>

      <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          السبريد:{" "}
          <span className="font-black text-[#0f172a]">{account.spread || "غير محدد"}</span>
        </div>
        <div>
          العمولة:{" "}
          <span className="font-black text-[#0f172a]">{account.commission || "غير محدد"}</span>
        </div>
        <div>
          الحد الأدنى للإيداع:{" "}
          <span className="font-black text-[#0f172a]">{account.min_deposit || "غير محدد"}</span>
        </div>
        <div>
          التنفيذ:{" "}
          <span className="font-black text-[#0f172a]">
            {account.execution_type || "غير محدد"}
          </span>
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        مناسب لـ:{" "}
        <span className="font-black text-[#0f172a]">{account.best_for || "فئات متعددة"}</span>
      </div>
    </div>
  );
}

function ExpandableText({
  text,
  fallback,
}: {
  text: string | null | undefined;
  fallback: string;
}) {
  const content = cleanText(text) || fallback;

  return (
    <details className="group/expand">
      <summary className="cursor-pointer list-none">
        <div className="relative max-h-[140px] overflow-hidden text-xs leading-6 text-slate-600 group-open/expand:hidden md:text-sm md:leading-7">
          <p className="text-justify">{content}</p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#f8fbff] to-transparent" />
        </div>

        <div className="mt-2 inline-flex rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[11px] font-black text-brand-500">
          <span className="group-open/expand:hidden">عرض المزيد</span>
          <span className="hidden group-open/expand:inline">عرض أقل</span>
        </div>
      </summary>

      <p className="mt-2 text-justify text-xs leading-6 text-slate-600 md:text-sm md:leading-7">
        {content}
      </p>
    </details>
  );
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const [leftSlug, rightSlug] = slug.split("-vs-");

  if (!leftSlug || !rightSlug) notFound();
  

  const supabase = await createClient();

  const { data: brokersData } = await supabase
  .from("brokers")
  .select("*")
  .eq("publication_status", "published")
  .in("slug", [leftSlug, rightSlug]);

  const brokers = (brokersData ?? []) as Broker[];

  const left = brokers.find((b) => b.slug === leftSlug);
  const right = brokers.find((b) => b.slug === rightSlug);

  if (!left || !right) notFound();

  const { data: accountsData } = await supabase
    .from("broker_accounts")
    .select("*")
    .in("broker_id", [left.id, right.id])
    .order("sort_order", { ascending: true });

  const accounts = (accountsData ?? []) as BrokerAccount[];
  const leftAccounts = accounts.filter((a) => a.broker_id === left.id);
  const rightAccounts = accounts.filter((a) => a.broker_id === right.id);

  const { data: licensesData } = await supabase
  .from("broker_licenses")
  .select(`
    id,
    broker_id,
    regulator_code,
    regulator_name_ar,
    country_ar,
    license_number,
    entity_name_ar,
    entity_name_en,
    status_code,
    trust_level,
    verification_url_ar,
    verification_url_en,
    last_verified,
    is_active
  `)
  .in("broker_id", [left.id, right.id]);

const licensePriority: Record<string, number> = {
  "Tier 1": 1,
  "Tier 2": 2,
  "Tier 3": 3,
};

const licenses = ((licensesData ?? []) as BrokerLicense[])
  .filter((license) => license.is_active !== false)
  .sort((a, b) => {
    const aPriority =
      licensePriority[a.trust_level || ""] ?? 4;

    const bPriority =
      licensePriority[b.trust_level || ""] ?? 4;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    return (a.regulator_code || "").localeCompare(
      b.regulator_code || ""
    );
  });

const leftLicenses = licenses.filter(
  (license) => license.broker_id === left.id
);

const rightLicenses = licenses.filter(
  (license) => license.broker_id === right.id
);

  const overallWinner = getHigherRatingLabel(left, right);
const beginnerWinner = getBeginnerWinner(left, right);
const scalpingWinner = getScalpingWinner(left, right);

const leftRating = left.rating ?? 0;
const rightRating = right.rating ?? 0;
const ratingDifference = Math.abs(leftRating - rightRating);
const ratingsAreClose = ratingDifference < 0.15;

const recommendedBroker =
  leftRating >= rightRating ? left : right;

const recommendationLabel = ratingsAreClose
  ? "الخياران متقاربان"
  : recommendedBroker.name || "غير محدد";

const recommendedInsight =
  splitParagraphs(recommendedBroker.expert_insight_ar)[0] ||
  `يتفوق ${recommendedBroker.name} بفارق محدود في التقييم العام، لكن الاختيار النهائي يعتمد على الحساب والتكاليف والكيان التنظيمي المناسب لك.`;

const leftFeeScore = left.score_fees ?? 0;
const rightFeeScore = right.score_fees ?? 0;
const feeDifference = Math.abs(leftFeeScore - rightFeeScore);

const feesDecision =
  feeDifference < 0.15
    ? "التكاليف متقاربة"
    : leftFeeScore > rightFeeScore
    ? left.name
    : right.name;

const beginnerDecision =
  beginnerWinner === "تعادل"
    ? "كلاهما مناسب"
    : beginnerWinner;

const decisionBrokers = [
  {
    broker: left,
    reasons: splitParagraphs(left.who_should_use_ar).slice(0, 3),
  },
  {
    broker: right,
    reasons: splitParagraphs(right.who_should_use_ar).slice(0, 3),
  },
];
  const depositWinner = getBetterValueLabel(left, right);
  const safetyWinner = getSafetyWinner(left, right);
  const siteUrl = "https://brokeralarab.com";
  const pageUrl = `${siteUrl}/compare/${slug}`;
  const shareTitle = `مقارنة ${left.name} و ${right.name} | بروكر العرب`;

  const faqJsonLd = buildFaqJsonLd(left, right);

  const comparisonSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/compare/${slug}#webpage`,
  url: `${siteUrl}/compare/${slug}`,
  name: `مقارنة ${left.name} و${right.name}`,
  headline: `مقارنة ${left.name} و${right.name}: أيهما أفضل؟`,
  description: `مقارنة ${left.name} و${right.name} من حيث التراخيص والحسابات والرسوم والمنصات والحد الأدنى للإيداع، مع توضيح الفروقات التي تهم المتداول العربي.`,
  inLanguage: "ar",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "بروكر العرب",
    url: siteUrl,
  },
  about: [
    {
      "@type": "Thing",
      name: left.name,
      url: `${siteUrl}/brokers/${left.slug}`,
    },
    {
      "@type": "Thing",
      name: right.name,
      url: `${siteUrl}/brokers/${right.slug}`,
    },
  ],
  mainEntity: {
    "@type": "ItemList",
    "@id": `${siteUrl}/compare/${slug}#brokers`,
    name: `الوسطاء المقارنون: ${left.name} و${right.name}`,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: 2,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: left.name,
        url: `${siteUrl}/brokers/${left.slug}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: right.name,
        url: `${siteUrl}/brokers/${right.slug}`,
      },
    ],
  },
  publisher: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "بروكر العرب",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo/Asset%204%406x.png`,
    },
  },
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
        name: "المقارنات",
        item: "https://brokeralarab.com/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${left.name} vs ${right.name}`,
        item: `https://brokeralarab.com/compare/${slug}`,
      },
    ],
  };

  const comparisonRows = [
    {
      label: "التقييم",
      leftValue: `${left.rating?.toFixed(2) ?? "—"} / 5`,
      rightValue: `${right.rating?.toFixed(2) ?? "—"} / 5`,
      winner:
        (left.rating ?? 0) > (right.rating ?? 0)
          ? left.name
          : (right.rating ?? 0) > (left.rating ?? 0)
          ? right.name
          : "تعادل",
    },
    {
      label: "الحد الأدنى للإيداع",
      leftValue: money(left.min_deposit),
      rightValue: money(right.min_deposit),
      winner: depositWinner,
    },
    {
      label: "المنصات",
      leftValue: shortPlatforms(left.platforms),
      rightValue: shortPlatforms(right.platforms),
      winner: "تعادل",
    },
    {
      label: "الحساب الإسلامي",
      leftValue: yesNoArabic(left.islamic_account),
      rightValue: yesNoArabic(right.islamic_account),
      winner:
        hasIslamicScore(left.islamic_account) > hasIslamicScore(right.islamic_account)
          ? left.name
          : hasIslamicScore(right.islamic_account) > hasIslamicScore(left.islamic_account)
          ? right.name
          : "تعادل",
    },
    {
      label: "الدعم العربي",
      leftValue: yesNoArabic(left.arabic_support),
      rightValue: yesNoArabic(right.arabic_support),
      winner:
        hasArabicSupportScore(left.arabic_support) > hasArabicSupportScore(right.arabic_support)
          ? left.name
          : hasArabicSupportScore(right.arabic_support) >
            hasArabicSupportScore(left.arabic_support)
          ? right.name
          : "تعادل",
    },
    {
      label: "التراخيص",
      leftValue: shortReg(left.regulation),
      rightValue: shortReg(right.regulation),
      winner: safetyWinner,
    },
    {
      label: "المقر",
      leftValue: left.headquarters || "غير محدد",
      rightValue: right.headquarters || "غير محدد",
      winner: "تعادل",
    },
    {
      label: "سنة التأسيس",
      leftValue: left.founded_year || "غير محدد",
      rightValue: right.founded_year || "غير محدد",
      winner: "تعادل",
    },
    {
      label: "الرافعة",
      leftValue: left.max_leverage || "غير محدد",
      rightValue: right.max_leverage || "غير محدد",
      winner:
        numericLeverage(left.max_leverage) > numericLeverage(right.max_leverage)
          ? left.name
          : numericLeverage(right.max_leverage) > numericLeverage(left.max_leverage)
          ? right.name
          : "تعادل",
    },
    {
      label: "الأصول",
      leftValue: left.trading_assets || "غير محدد",
      rightValue: right.trading_assets || "غير محدد",
      winner: "تعادل",
    },
  ];

  const accountSummaryRows = [
    {
      label: "عدد الحسابات المتاحة",
      leftValue: String(leftAccounts.length),
      rightValue: String(rightAccounts.length),
      winner:
        leftAccounts.length > rightAccounts.length
          ? left.name
          : rightAccounts.length > leftAccounts.length
          ? right.name
          : "تعادل",
    },
    {
      label: "أقل إيداع ظاهر في الحسابات",
      leftValue:
        leftAccounts
          .map((a) => a.min_deposit || "")
          .find((v) => v.trim()) || money(left.min_deposit),
      rightValue:
        rightAccounts
          .map((a) => a.min_deposit || "")
          .find((v) => v.trim()) || money(right.min_deposit),
      winner: depositWinner,
    },
    {
      label: "مناسب للمبتدئين",
      leftValue: cleanText(left.best_for) || "فئات متعددة",
      rightValue: cleanText(right.best_for) || "فئات متعددة",
      winner: beginnerWinner,
    },
  ];

  const leftReasons = getBrokerReasons(left, right, "left");
  const rightReasons = getBrokerReasons(right, left, "right");

  const visibleFaqs = [
    {
      q: `ما الفرق بين ${left.name} و ${right.name}؟`,
      a: `الفرق بين ${left.name} و ${right.name} يظهر غالبًا في التراخيص، أنواع الحسابات، الحد الأدنى للإيداع، الرسوم، المنصات، ودرجة ملاءمة كل وسيط لفئة معينة من المتداولين.`,
    },
    {
      q: `أيهما أفضل للمبتدئين: ${left.name} أم ${right.name}؟`,
      a: `بحسب المعايير المعروضة في هذه الصفحة مثل الحد الأدنى للإيداع وملاءمة الحسابات والبساطة العامة، فإن الترشيح السريع للمبتدئين هنا هو ${beginnerWinner}.`,
    },
    {
      q: `أيهما أفضل من حيث السبريد والنشاط؟`,
      a: `الترشيح السريع من حيث السبريد والنشاط هو ${scalpingWinner}. لكن القرار النهائي يبقى مرتبطًا بنوع الحساب الذي ستستخدمه وطبيعة تداولك.`,
    },
    {
      q: `هل يقدّم ${left.name} و ${right.name} حسابات إسلامية؟`,
      a: `توضح المقارنة الحالية حالة الحساب الإسلامي لدى ${left.name} و ${right.name} وفق البيانات المدرجة في الموقع، لذا يفضّل دائمًا مراجعة صفحة التقييم الفردية لكل وسيط قبل فتح الحساب.`,
    },
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
    <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[#60a5fa]/10 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-[1520px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
   {/* Top intro - Desktop only */}
<div className="mb-5 hidden md:block">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white px-8 py-8 shadow-[0_18px_55px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />
    <div className="pointer-events-none absolute left-0 top-0 h-full w-[38%] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_55%)]" />

    <div className="relative">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dbeafe] bg-[#f8fbff] px-4 py-2 text-xs font-extrabold text-brand-500">
  <span>المقارنات</span>
  <span className="text-slate-300">/</span>
  <span>
    {left.name} vs {right.name}
  </span>
</div>

{/* العنوان المرئي للديسكتوب — عنوان H1 الدلالي موجود في نسخة الموبايل */}
<div className="max-w-6xl text-[42px] font-black leading-[1.2] tracking-[-0.5px] text-[#0f172a] xl:text-[48px]">
  مقارنة بين {left.name} و {right.name}: أيهما أفضل؟
</div>

<p className="mt-4 max-w-6xl text-base leading-8 text-slate-600 xl:text-lg xl:leading-9">
  مقارنة شاملة بين <strong>{left.name}</strong> و{" "}
  <strong>{right.name}</strong> لمعرفة الفرق في السبريد، الرسوم،
  التراخيص، الحساب الإسلامي، منصات التداول، طرق الإيداع والسحب،
  وأنواع الحسابات، مع توضيح أيهما أفضل للمبتدئين والمتداولين العرب.
</p>

      <div className="mt-7 grid w-full grid-cols-3 gap-5">
  {/* الأفضل إجمالًا */}
  <div className="flex min-h-[118px] flex-col justify-center rounded-[24px] border border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-6 py-5 shadow-sm">
    <div className="text-xs font-black text-brand-500">
      الأفضل إجمالًا
    </div>

    <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
      {overallWinner === "تعادل" ? "متقاربان" : overallWinner}
    </div>

    <div className="mt-1 text-xs font-bold text-slate-500">
      بناءً على التقييم العام في المقارنة
    </div>
  </div>

  {/* الأنسب للمبتدئين */}
  <div className="flex min-h-[118px] flex-col justify-center rounded-[24px] border border-slate-200 bg-white px-6 py-5 shadow-sm">
    <div className="text-xs font-black text-slate-500">
      الأنسب للمبتدئين
    </div>

    <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
      {beginnerWinner === "تعادل"
        ? "كلاهما مناسب"
        : beginnerWinner}
    </div>

    <div className="mt-1 text-xs font-bold text-slate-500">
      حسب سهولة البداية وأنواع الحسابات
    </div>
  </div>

  {/* الأفضل للتكلفة والتنفيذ */}
  <div className="flex min-h-[118px] flex-col justify-center rounded-[24px] border border-slate-200 bg-white px-6 py-5 shadow-sm">
    <div className="text-xs font-black text-slate-500">
      الأفضل للتكلفة والتنفيذ
    </div>

    <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
      {scalpingWinner === "تعادل"
        ? "متقاربان"
        : scalpingWinner}
    </div>

    <div className="mt-1 text-xs font-bold text-slate-500">
      بناءً على السبريد والرسوم وسرعة التنفيذ
    </div>
  </div>
</div>
</div>
</div>
</div>
  {/* Desktop / Tablet */}
<div className="hidden md:block">
  <div className="rounded-[34px] border border-[#dbeafe] bg-white p-6 shadow-[0_24px_70px_rgba(37,99,235,0.10)] lg:p-8">
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_110px_1fr]">
      
      {/* RIGHT */}
      <div
        className={`relative overflow-hidden rounded-[30px] border p-6 transition ${
          overallWinner === right.name
            ? "scale-[1.015] border-[#3b82f6] bg-gradient-to-b from-[#e0edff] to-white shadow-[0_20px_50px_rgba(37,99,235,0.18)]"
            : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        {overallWinner === right.name && (
          <>
            <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-2 ring-[#3b82f6]/30" />
            <div className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-black text-white shadow-sm">
              الأفضل إجمالًا
            </div>
          </>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-3xl font-black text-[#0f172a]">
              {right.name}
            </h2>
            <p className="mt-2 text-sm font-bold text-brand-500">
              {cleanText(right.best_for) || "مناسب لفئات متعددة"}
            </p>
          </div>

          <div className="flex h-[76px] w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-500 shadow-sm">
            <span className="text-2xl font-black">
              {right.rating?.toFixed(2) ?? "—"}
            </span>
            <span className="text-[10px] font-bold">من 5</span>
          </div>
        </div>

        <div className="mt-6 flex h-[138px] items-center justify-center rounded-[26px] border border-slate-200 bg-[#fbfdff] p-3">
          {right.logo ? (
            <img
              src={right.logo}
              alt={right.name || "Broker logo"}
              className="h-[130px] w-full object-contain"
            />
          ) : (
            <div className="text-xl font-black text-slate-300">{right.name}</div>
          )}
        </div>

        <div className="mt-5 space-y-3">
          {right.key_strength_ar && (
            <div className="rounded-2xl bg-[#ecfdf5] px-4 py-3">
              <div className="text-xs font-black text-[#059669]">نقطة القوة</div>
              <div className="mt-1 text-sm font-black text-[#064e3b]">
                {right.key_strength_ar}
              </div>
            </div>
          )}

          {right.key_weakness_ar && (
            <div className="rounded-2xl bg-[#fff7ed] px-4 py-3">
              <div className="text-xs font-black text-[#ea580c]">ملاحظة مهمة</div>
              <div className="mt-1 text-sm font-black text-[#7c2d12]">
                {right.key_weakness_ar}
              </div>
            </div>
          )}

          {right.expert_insight_ar && (
  <div className="rounded-2xl bg-[#f8fafc] px-4 py-3">
    <div className="text-xs font-black text-slate-500">
      رأي بروكر العرب
    </div>

    <div className="mt-1 space-y-2 text-sm font-medium leading-6 text-[#0f172a]">
      {right.expert_insight_ar
        .split("||")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </div>
  </div>
)}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`/go/${right.slug ?? ""}?type=real`}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-black text-white transition hover:bg-brand-600"
          >
            ابدأ الآن
          </a>

          <Link
            href={`/brokers/${right.slug ?? ""}`}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            التقييم
          </Link>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-[#1e40af] text-2xl font-black text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
          VS
        </div>
      </div>

      {/* LEFT */}
      <div
        className={`relative overflow-hidden rounded-[30px] border p-6 transition ${
          overallWinner === left.name
            ? "scale-[1.015] border-[#3b82f6] bg-gradient-to-b from-[#e0edff] to-white shadow-[0_20px_50px_rgba(37,99,235,0.18)]"
            : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        {overallWinner === left.name && (
          <>
            <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-2 ring-[#3b82f6]/30" />
            <div className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-black text-white shadow-sm">
              الأفضل إجمالًا
            </div>
          </>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-3xl font-black text-[#0f172a]">
              {left.name}
            </h2>
            <p className="mt-2 text-sm font-bold text-brand-500">
              {cleanText(left.best_for) || "مناسب لفئات متعددة"}
            </p>
          </div>

          <div className="flex h-[76px] w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-500 shadow-sm">
            <span className="text-2xl font-black">
              {left.rating?.toFixed(2) ?? "—"}
            </span>
            <span className="text-[10px] font-bold">من 5</span>
          </div>
        </div>

        <div className="mt-6 flex h-[138px] items-center justify-center rounded-[26px] border border-slate-200 bg-[#fbfdff] p-3">
          {left.logo ? (
            <img
              src={left.logo}
              alt={left.name || "Broker logo"}
              className="h-[130px] w-full object-contain"
            />
          ) : (
            <div className="text-xl font-black text-slate-300">{left.name}</div>
          )}
        </div>

        <div className="mt-5 space-y-3">
          {left.key_strength_ar && (
            <div className="rounded-2xl bg-[#ecfdf5] px-4 py-3">
              <div className="text-xs font-black text-[#059669]">نقطة القوة</div>
              <div className="mt-1 text-sm font-black text-[#064e3b]">
                {left.key_strength_ar}
              </div>
            </div>
          )}

          {left.key_weakness_ar && (
            <div className="rounded-2xl bg-[#fff7ed] px-4 py-3">
              <div className="text-xs font-black text-[#ea580c]">ملاحظة مهمة</div>
              <div className="mt-1 text-sm font-black text-[#7c2d12]">
                {left.key_weakness_ar}
              </div>
            </div>
          )}

          {left.expert_insight_ar && (
  <div className="rounded-2xl bg-[#f8fafc] px-4 py-3">
    <div className="text-xs font-black text-slate-500">
      رأي بروكر العرب
    </div>

    <div className="mt-1 space-y-2 text-sm font-medium leading-6 text-[#0f172a]">
      {left.expert_insight_ar
        .split("||")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </div>
  </div>
)}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`/go/${left.slug ?? ""}?type=real`}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-black text-white transition hover:bg-brand-600"
          >
            ابدأ الآن
          </a>

          <Link
            href={`/brokers/${left.slug ?? ""}`}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            التقييم
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

  {/* ================= MOBILE VERSION ================= */}
<div className="md:hidden">
  {/* Standalone mobile hero */}
  <div className="relative overflow-hidden rounded-[28px] border border-[#dbeafe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-4 pb-4 pt-5 shadow-[0_16px_45px_rgba(37,99,235,0.09)]">
    <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />

    {/* Section label */}
    <div className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm">
      مقارنة شركات التداول
    </div>

    {/* Main heading */}
    <h1 className="mt-3 text-[26px] font-black leading-[1.25] tracking-[-0.3px] text-[#0f172a]">
      مقارنة {left.name} و {right.name}: أيهما أفضل؟
    </h1>

    {/* SEO description */}
    <p className="mt-2 text-[13px] leading-6 text-slate-600">
      مقارنة بين {left.name} و {right.name} من حيث الرسوم، السبريد،
      التراخيص، أنواع الحسابات، منصات التداول ومدى ملاءمة كل وسيط
      للمتداول العربي.
    </p>

    {/* Main result */}
    <div className="mt-4 flex items-center justify-between gap-4 rounded-[20px] border border-[#93c5fd] bg-white px-4 py-3 shadow-sm">
      <div>
        <div className="text-[10px] font-black text-brand-500">
          الأفضل إجمالًا
        </div>

        <div className="mt-0.5 text-lg font-black text-[#0f172a]">
          {overallWinner === "تعادل"
            ? "النتيجة متقاربة"
            : overallWinner}
        </div>
      </div>

      <div className="shrink-0 rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-500">
        التقييم العام
      </div>
    </div>

    {/* Secondary results */}
    <div className="mt-2 grid grid-cols-2 gap-2">
      <div className="min-w-0 rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-sm">
        <div className="text-[10px] font-bold text-slate-500">
          الأنسب للمبتدئين
        </div>

        <div className="mt-1 text-sm font-black leading-5 text-[#0f172a]">
          {beginnerWinner === "تعادل"
            ? "كلاهما مناسب"
            : beginnerWinner}
        </div>
      </div>

      <div className="min-w-0 rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-sm">
        <div className="text-[10px] font-bold text-slate-500">
          للتكلفة والتنفيذ
        </div>

        <div className="mt-1 text-sm font-black leading-5 text-[#0f172a]">
          {scalpingWinner === "تعادل"
            ? "النتيجة متقاربة"
            : scalpingWinner}
        </div>
      </div>
    </div>
  </div>

  {/* ================= MOBILE BROKER COMPARISON ================= */}
<div className="mt-3 overflow-hidden rounded-[28px] border border-[#dbeafe] bg-white shadow-[0_16px_45px_rgba(37,99,235,0.07)]">
  {/* Section heading */}
  <div className="border-b border-[#dbeafe] bg-[#f8fbff] px-4 py-3">
  <div className="text-[10px] font-black text-brand-500">
    مقارنة مباشرة
  </div>

  <h2 className="mt-1 text-lg font-black leading-7 text-[#0f172a]">
    {left.name} مقابل {right.name}
  </h2>
</div>

  {/* Broker comparison cards */}
<div className="relative grid grid-cols-2 gap-2 bg-[#f8fbff] p-3">
  {/* VS */}
  <div className="absolute left-1/2 top-[82px] z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#f8fbff] bg-brand-500 text-[11px] font-black text-white shadow-md">
    VS
  </div>

  {[left, right].map((broker) => (
    <div
      key={broker.slug}
      className="min-w-0 rounded-[22px] border border-[#dbeafe] bg-white px-2 pb-4 pt-2 shadow-sm"
    >
      {/* Logo */}
      <div className="flex h-[94px] items-center justify-center overflow-hidden rounded-[17px] bg-[#f8fafc]">
        {broker.logo ? (
          <img
            src={broker.logo}
            alt={`شعار ${broker.name || "شركة التداول"}`}
            className="h-[74px] w-full scale-[1.28] object-contain"
          />
        ) : (
          <span className="text-sm font-black text-slate-300">
            {broker.name}
          </span>
        )}
      </div>

      {/* Broker identity */}
      <div className="mt-3 text-center">
        <h3 className="flex min-h-[44px] items-center justify-center break-words text-center text-[16px] font-black leading-5 text-[#0f172a]">
  {broker.name}
</h3>

        <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 shadow-sm">
          <span className="text-[15px] font-black text-brand-500">
            {broker.rating?.toFixed(2) ?? "—"}
          </span>

          <span className="text-[9px] font-bold text-slate-400">
            من 5
          </span>
        </div>

        <div className="mt-3">
          <div className="text-[9px] font-bold text-slate-400">
            مناسب أكثر لـ
          </div>

          <p className="mt-1 min-h-[36px] text-[11px] font-black leading-[18px] text-brand-500">
            {cleanText(broker.best_for) || "فئات متعددة من المتداولين"}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>


  {/* Broker Alarab insights */}
  <div className="border-t border-[#dbeafe] bg-[#f8fbff] p-3">
    <div className="mb-2 text-[10px] font-black text-slate-500">
      رأي بروكر العرب
    </div>

    <div className="grid gap-2">
      {[left, right].map((broker) => (
        <details
          key={broker.slug}
          className="group rounded-[18px] border border-slate-200 bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3">
            <span className="text-xs font-black text-[#0f172a]">
              رأينا في {broker.name}
            </span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-black text-brand-500 transition group-open:rotate-180">
              ▼
            </span>
          </summary>

          {broker.expert_insight_ar && (
            <div className="space-y-2 border-t border-slate-100 px-3 pb-3 pt-2 text-xs leading-6 text-slate-600">
              {broker.expert_insight_ar
                .split("||")
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          )}
        </details>
      ))}
    </div>
  </div>

  {/* Actions */}
  <div className="grid grid-cols-2 gap-2 border-t border-[#dbeafe] bg-white p-3">
    {[left, right].map((broker) => (
      <div key={broker.slug} className="min-w-0">
        <a
          href={`/go/${broker.slug ?? ""}?type=real`}
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[16px] bg-brand-500 px-2 py-2.5 text-center text-xs font-black text-white shadow-sm transition active:scale-[0.98]"
        >
          ابدأ مع {broker.name}
        </a>

        <Link
          href={`/brokers/${broker.slug ?? ""}`}
          className="mt-2 inline-flex w-full items-center justify-center text-[11px] font-black text-slate-600 underline decoration-slate-300 underline-offset-4"
        >
          قراءة التقييم
        </Link>
      </div>
    ))}
  </div>
</div>

</div>
</div>
</section>



<section className="mx-auto mt-5 max-w-[1520px] px-4 pb-10 sm:mt-6 sm:px-6 lg:mt-8 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

    {/* ================= DESKTOP / TABLET ================= */}
<div className="hidden p-6 md:block lg:p-8">
  {/* Header */}
  <div className="flex items-end justify-between gap-8">
    <div className="max-w-5xl">
      <span className="text-sm font-black text-brand-500">
        تحليل النقاط
      </span>

      <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
        تحليل نقاط القوة بين {left.name} و {right.name}
      </h2>

      <p className="mt-3 text-base leading-8 text-slate-600">
        مقارنة مباشرة لدرجات الأمان، الرسوم، المنصات، الإيداع والسحب،
        وخدمة العملاء لدى كل وسيط.
      </p>
    </div>

    <div className="hidden shrink-0 rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 xl:block">
      <div className="text-xs font-bold text-slate-500">
        التقييم العام
      </div>

      <div className="mt-1 flex items-center gap-3">
        <span className="text-lg font-black text-[#0f172a]">
          {left.name}
        </span>

        <span className="text-2xl font-black text-brand-500">
          {left.rating?.toFixed(2) ?? "—"}
        </span>

        <span className="text-slate-300">/</span>

        <span className="text-lg font-black text-[#0f172a]">
          {right.name}
        </span>

        <span className="text-2xl font-black text-brand-500">
          {right.rating?.toFixed(2) ?? "—"}
        </span>
      </div>
    </div>
  </div>

  {/* Comparison cards */}
  <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
    {[
      {
        label: "الأمان والثقة",
        note: "التراخيص وحماية أموال العملاء.",
        leftScore: left.score_safety ?? 0,
        rightScore: right.score_safety ?? 0,
      },
      {
        label: "الرسوم والتكاليف",
        note: "السبريد والعمولات والتكلفة العامة.",
        leftScore: left.score_fees ?? 0,
        rightScore: right.score_fees ?? 0,
      },
      {
        label: "منصات التداول",
        note: "جودة المنصات وتنوع أدوات التداول.",
        leftScore: left.score_platforms ?? 0,
        rightScore: right.score_platforms ?? 0,
      },
      {
        label: "الإيداع والسحب",
        note: "سهولة التمويل وسرعة معالجة السحب.",
        leftScore: left.score_deposit ?? 0,
        rightScore: right.score_deposit ?? 0,
      },
      {
        label: "الدعم وخدمة العملاء",
        note: "جودة الدعم ووضوح تجربة العميل.",
        leftScore: left.score_support ?? 0,
        rightScore: right.score_support ?? 0,
      },
    ].map((item) => {
      const difference = Math.abs(
        item.leftScore - item.rightScore
      );

      const isClose = difference < 0.001;

      const strongerBroker =
        item.leftScore > item.rightScore
          ? left.name
          : item.rightScore > item.leftScore
          ? right.name
          : null;

      const leftHasAdvantage =
        !isClose && item.leftScore > item.rightScore;

      const rightHasAdvantage =
        !isClose && item.rightScore > item.leftScore;

      const comparisonLabel =
        isClose || !strongerBroker
          ? "متقاربان"
          : difference < 0.5
          ? `أفضلية طفيفة لـ ${strongerBroker}`
          : `أفضلية واضحة لـ ${strongerBroker}`;

      return (
        <article
          key={item.label}
          className="flex min-h-[292px] flex-col rounded-[26px] border border-slate-200 bg-[#f8fbff] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* Factor */}
          <div>
            <h3 className="text-lg font-black leading-7 text-[#0f172a]">
              {item.label}
            </h3>

            <p className="mt-1 min-h-[44px] text-xs leading-6 text-slate-500">
              {item.note}
            </p>
          </div>

          {/* Scores */}
          <div className="mt-4 grid gap-2">
            {/* Left broker */}
            <div
              className={`rounded-[18px] border px-3 py-3 ${
                leftHasAdvantage
                  ? "border-[#93c5fd] bg-white shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-black text-[#0f172a]">
                  {left.name}
                </span>

                <span
                  className={`text-lg font-black ${
                    leftHasAdvantage
                      ? "text-brand-500"
                      : "text-slate-700"
                  }`}
                >
                  {item.leftScore.toFixed(2)}
                  <span className="mr-1 text-[10px] text-slate-400">
                    / 5
                  </span>
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    leftHasAdvantage
                      ? "bg-brand-500"
                      : "bg-slate-300"
                  }`}
                  style={{
                    width: `${Math.min(
                      item.leftScore * 20,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Right broker */}
            <div
              className={`rounded-[18px] border px-3 py-3 ${
                rightHasAdvantage
                  ? "border-[#93c5fd] bg-white shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-black text-[#0f172a]">
                  {right.name}
                </span>

                <span
                  className={`text-lg font-black ${
                    rightHasAdvantage
                      ? "text-brand-500"
                      : "text-slate-700"
                  }`}
                >
                  {item.rightScore.toFixed(2)}
                  <span className="mr-1 text-[10px] text-slate-400">
                    / 5
                  </span>
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    rightHasAdvantage
                      ? "bg-brand-500"
                      : "bg-slate-300"
                  }`}
                  style={{
                    width: `${Math.min(
                      item.rightScore * 20,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Assessment */}
          <div
            className={`mt-auto pt-4 text-center text-xs font-black ${
              isClose
                ? "text-slate-500"
                : "text-brand-500"
            }`}
          >
            <span
              className={`inline-flex rounded-full border px-3 py-1.5 ${
                isClose
                  ? "border-slate-200 bg-white"
                  : "border-brand-100 bg-brand-50"
              }`}
            >
              {comparisonLabel}
            </span>
          </div>
        </article>
      );
    })}
  </div>

  {/* Note */}
  <div className="mt-5 rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4">
    <p className="text-sm leading-7 text-slate-600">
      تقارب الدرجات لا يعني تطابق الشركتين؛ الاختيار يعتمد على العامل
      الأكثر أهمية لك، سواء كان الأمان، تكلفة التداول، المنصات، سرعة
      السحب أو جودة الدعم.
    </p>
  </div>
</div>

   {/* ================= MOBILE ================= */}
<div className="block p-4 md:hidden">
  {/* Header */}
  <div className="text-right">
    <span className="text-xs font-black text-brand-500">
      تحليل النقاط
    </span>

    <h2 className="mt-1.5 text-[24px] font-black leading-tight text-[#0f172a]">
      مقارنة نقاط القوة
    </h2>

    <p className="mt-2 text-[12px] leading-5 text-slate-600">
      درجات {left.name} و{right.name} في أهم عوامل اختيار شركة التداول.
    </p>
  </div>

  {/* Compact comparison table */}
  <div className="mt-4 overflow-hidden rounded-[22px] border border-[#dbeafe] bg-white shadow-sm">
    {/* Table header */}
    <div className="grid grid-cols-[minmax(0,1fr)_66px_66px] items-center gap-2 border-b border-[#dbeafe] bg-[#f8fbff] px-3 py-2.5">
      <div className="text-[9px] font-black text-slate-400">
        عامل المقارنة
      </div>

      <div className="break-words text-center text-[9px] font-black leading-3 text-[#0f172a]">
        {left.name}
      </div>

      <div className="break-words text-center text-[9px] font-black leading-3 text-[#0f172a]">
        {right.name}
      </div>
    </div>

    {[
      {
        label: "الأمان والثقة",
        leftScore: left.score_safety ?? 0,
        rightScore: right.score_safety ?? 0,
      },
      {
        label: "الرسوم والتكاليف",
        leftScore: left.score_fees ?? 0,
        rightScore: right.score_fees ?? 0,
      },
      {
        label: "منصات التداول",
        leftScore: left.score_platforms ?? 0,
        rightScore: right.score_platforms ?? 0,
      },
      {
        label: "الإيداع والسحب",
        leftScore: left.score_deposit ?? 0,
        rightScore: right.score_deposit ?? 0,
      },
      {
        label: "خدمة العملاء",
        leftScore: left.score_support ?? 0,
        rightScore: right.score_support ?? 0,
      },
    ].map((item, index, items) => {
      const difference = Math.abs(
        item.leftScore - item.rightScore
      );

      const isClose = difference < 0.001;

      const leftHasAdvantage =
        !isClose && item.leftScore > item.rightScore;

      const rightHasAdvantage =
        !isClose && item.rightScore > item.leftScore;

      return (
        <div
          key={item.label}
          className={`grid grid-cols-[minmax(0,1fr)_66px_66px] items-center gap-2 px-3 py-2.5 ${
            index !== items.length - 1
              ? "border-b border-slate-100"
              : ""
          }`}
        >
          {/* Factor */}
          <h3 className="min-w-0 text-[12px] font-black leading-5 text-[#0f172a]">
            {item.label}
          </h3>

          {/* Left score */}
          <div
            className={`rounded-xl px-1 py-2 text-center text-[13px] font-black ${
              leftHasAdvantage
                ? "bg-brand-500 text-white shadow-sm"
                : isClose
                ? "bg-brand-50 text-brand-500"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {item.leftScore.toFixed(2)}
          </div>

          {/* Right score */}
          <div
            className={`rounded-xl px-1 py-2 text-center text-[13px] font-black ${
              rightHasAdvantage
                ? "bg-brand-500 text-white shadow-sm"
                : isClose
                ? "bg-brand-50 text-brand-500"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {item.rightScore.toFixed(2)}
          </div>
        </div>
      );
    })}
  </div>

  {/* Comparison note */}
<div className="mt-3 rounded-[16px] bg-[#f8fbff] px-3 py-2.5">
  <p className="text-[10px] font-medium leading-5 text-slate-500">
    الفروق محدودة بين الشركتين؛ لذلك يُفضّل اختيار الوسيط وفق العامل
    الأهم لك، مثل الرسوم أو المنصات أو سرعة السحب.
  </p>
</div>
</div>

</div>
</section>

<section className="mx-auto max-w-[1520px] px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

    {/* ================= DESKTOP VERSION ================= */}
<div className="hidden p-6 md:block lg:p-8">
  {/* Section heading */}
  <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-center">
    <div>
      <span className="text-sm font-black text-brand-500">
        الحسابات وتكلفة التداول
      </span>

      <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-[42px]">
        مقارنة الحسابات والرسوم بين {left.name} و{right.name}
      </h2>

      <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600">
        نقارن أنواع الحسابات المتاحة، الحد الأدنى للإيداع، السبريد،
        العمولات وطريقة تنفيذ الأوامر لمساعدتك على اختيار الحساب الأقرب
        إلى أسلوب تداولك.
      </p>
    </div>

    {/* Quick insight */}
    <div className="rounded-[26px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_14px_35px_rgba(37,99,235,0.10)]">
      <div className="text-xs font-black text-brand-500">
        قراءة سريعة للتكلفة
      </div>

      <div className="mt-2 text-2xl font-black text-[#0f172a]">
        {scalpingWinner === "تعادل"
          ? "التكاليف متقاربة"
          : scalpingWinner}
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {scalpingWinner === "تعادل"
          ? "لا يظهر فرق حاسم في التكلفة؛ نوع الحساب وشروطه هما العامل الأهم."
          : `${scalpingWinner} يقدم أفضلية في التكلفة أو السبريد وفق البيانات المتاحة.`}
      </p>
    </div>
  </div>

  {/* Key indicators */}
<div className="mt-7 grid grid-cols-3 overflow-hidden rounded-[24px] border border-[#dbeafe] bg-[#f8fbff]">
  {/* Available accounts */}
  <div className="border-l border-[#dbeafe] p-5">
    <div className="text-xs font-black text-slate-500">
      الحسابات المتاحة
    </div>

    <div className="mt-3 grid grid-cols-2 gap-3">
      <div className="rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3 text-center">
        <div className="truncate text-xs font-black text-brand-500">
          {left.name}
        </div>

        <div className="mt-1 text-3xl font-black leading-none text-[#0f172a]">
          {leftAccounts.length}
        </div>

        <div className="mt-1 text-[10px] font-bold text-slate-400">
          حسابات
        </div>
      </div>

      <div className="rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3 text-center">
        <div className="truncate text-xs font-black text-brand-500">
          {right.name}
        </div>

        <div className="mt-1 text-3xl font-black leading-none text-[#0f172a]">
          {rightAccounts.length}
        </div>

        <div className="mt-1 text-[10px] font-bold text-slate-400">
          حسابات
        </div>
      </div>
    </div>
  </div>

  {/* Beginners */}
  <div className="border-l border-[#dbeafe] p-5">
    <div className="text-xs font-black text-slate-500">
      الأنسب للمبتدئين
    </div>

    <div className="mt-4 text-2xl font-black text-[#0f172a]">
      {beginnerWinner === "تعادل"
        ? "كلاهما مناسب"
        : beginnerWinner}
    </div>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      وفق سهولة البداية، متطلبات الإيداع ووضوح خيارات الحساب.
    </p>
  </div>

  {/* Important factor */}
  <div className="p-5">
    <div className="text-xs font-black text-slate-500">
      الأهم قبل الاختيار
    </div>

    <div className="mt-4 text-xl font-black leading-8 text-[#0f172a]">
      شروط الحساب أهم من عدد الحسابات
    </div>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      قارن السبريد والعمولة والتنفيذ والحد الأدنى للإيداع.
    </p>
  </div>
</div>

  {/* Main factors comparison */}
  <div className="mt-7 overflow-hidden rounded-[26px] border border-slate-200 bg-white">
    <div className="grid grid-cols-[1fr_1fr_1fr] bg-[#f8fbff] text-sm font-black text-[#0f172a]">
      <div className="p-4">
        مقارنة العوامل الأساسية
      </div>

      <div className="border-x border-slate-200 p-4 text-center">
        {left.name}
      </div>

      <div className="p-4 text-center">
        {right.name}
      </div>
    </div>

    {[
      {
        label: "نوع الحساب الأساسي",
        leftValue:
          leftAccounts[0]?.account_name_ar ||
          leftAccounts[0]?.account_name ||
          "غير محدد",
        rightValue:
          rightAccounts[0]?.account_name_ar ||
          rightAccounts[0]?.account_name ||
          "غير محدد",
      },
      {
        label: "الحد الأدنى للإيداع",
        leftValue:
          leftAccounts.find((a) =>
            cleanText(a.min_deposit)
          )?.min_deposit ||
          money(left.min_deposit),
        rightValue:
          rightAccounts.find((a) =>
            cleanText(a.min_deposit)
          )?.min_deposit ||
          money(right.min_deposit),
      },
      {
        label: "متوسط السبريد",
        leftValue:
          leftAccounts.find((a) =>
            cleanText(a.spread)
          )?.spread ||
          cleanText(left.spreads) ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) =>
            cleanText(a.spread)
          )?.spread ||
          cleanText(right.spreads) ||
          "غير محدد",
      },
      {
        label: "العمولات على التداول",
        leftValue:
          leftAccounts.find((a) =>
            cleanText(a.commission)
          )?.commission ||
          cleanText(left.fees) ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) =>
            cleanText(a.commission)
          )?.commission ||
          cleanText(right.fees) ||
          "غير محدد",
      },
      {
        label: "طريقة تنفيذ الأوامر",
        leftValue:
          leftAccounts.find((a) =>
            cleanText(a.execution_type)
          )?.execution_type ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) =>
            cleanText(a.execution_type)
          )?.execution_type ||
          "غير محدد",
      },
    ].map((row, index) => (
      <div
        key={row.label}
        className={`grid grid-cols-[1fr_1fr_1fr] ${
          index !== 4
            ? "border-t border-slate-200"
            : "border-t border-slate-200"
        }`}
      >
        <div className="p-4 text-sm font-black text-slate-600">
          {row.label}
        </div>

        <div className="border-x border-slate-200 p-4 text-center text-sm font-black text-[#0f172a]">
          {row.leftValue}
        </div>

        <div className="p-4 text-center text-sm font-black text-[#0f172a]">
          {row.rightValue}
        </div>
      </div>
    ))}
  </div>

  {/* All broker accounts */}
  <div className="mt-8 space-y-6">
    {[left, right].map((broker, brokerIndex) => {
      const brokerAccounts =
        broker.id === left.id
          ? leftAccounts
          : rightAccounts;

      return (
        <section
          key={broker.slug}
          className="overflow-hidden rounded-[28px] border border-[#dbeafe] bg-[#f8fbff]"
        >
          {/* Broker accounts heading */}
          <div
            className="flex items-center justify-between gap-6 border-b border-[#dbeafe] bg-[linear-gradient(90deg,#eff6ff_0%,#ffffff_100%)] px-6 py-5"
          >
            <div>
              <div className="text-xs font-black text-brand-500">
                أنواع الحسابات المتاحة
              </div>

              <h3 className="mt-1 text-2xl font-black text-[#0f172a]">
                حسابات {broker.name}
              </h3>
            </div>

            <div className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-black text-brand-500 shadow-sm">
              {brokerAccounts.length}{" "}
              {brokerAccounts.length === 1
                ? "حساب"
                : "حسابات"}
            </div>
          </div>

          {/* Accounts display */}
<div className="p-5">
  {/* Scroll indication when accounts exceed four */}
  {brokerAccounts.length > 4 && (
    <div className="mb-3 flex items-center justify-between gap-4">
      <p className="text-xs font-bold text-slate-500">
        اسحب أفقيًا لمشاهدة بقية الحسابات
      </p>

      <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-500">
        {brokerAccounts.length} حسابات
      </span>
    </div>
  )}

  <div
    className={
      brokerAccounts.length > 4
        ? "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
        : "grid gap-4"
    }
    style={
      brokerAccounts.length <= 4
        ? {
            gridTemplateColumns: `repeat(${Math.max(
              brokerAccounts.length,
              1
            )}, minmax(0, 1fr))`,
          }
        : undefined
    }
  >
    {brokerAccounts.length > 0 ? (
      brokerAccounts.map((acc) => (
        <article
          key={acc.id}
          className={`flex min-h-[225px] flex-col rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#93c5fd] hover:shadow-[0_12px_28px_rgba(37,99,235,0.10)] ${
            brokerAccounts.length > 4
              ? "w-[calc((100%-48px)/4)] min-w-[270px] shrink-0 snap-start"
              : ""
          }`}
        >
          {/* Account name */}
          <div className="min-h-[62px] border-b border-slate-100 pb-3">
            <Link
              href={`/brokers/${broker.slug}/accounts/${accountSlug(
                acc.account_name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-black leading-6 text-[#0f172a] transition hover:text-brand-500"
            >
              {acc.account_name_ar ||
                acc.account_name ||
                "حساب"}
            </Link>

            <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-brand-500">
              {acc.best_for ||
                "مناسب لفئات متعددة من المتداولين"}
            </p>
          </div>

          {/* Account information */}
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <div className="text-[10px] font-bold text-slate-400">
                السبريد
              </div>

              <div className="mt-1 text-sm font-black text-[#0f172a]">
                {acc.spread || "غير محدد"}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400">
                العمولة
              </div>

              <div className="mt-1 text-sm font-black text-[#0f172a]">
                {acc.commission || "غير محدد"}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400">
                الحد الأدنى للإيداع
              </div>

              <div className="mt-1 text-sm font-black text-[#0f172a]">
                {acc.min_deposit || "غير محدد"}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400">
                التنفيذ
              </div>

              <div className="mt-1 break-words text-sm font-black leading-5 text-[#0f172a]">
                {acc.execution_type || "غير محدد"}
              </div>
            </div>
          </div>

          {/* Account details */}
          <div className="mt-auto pt-4">
            <Link
              href={`/brokers/${broker.slug}/accounts/${accountSlug(
                acc.account_name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-black text-brand-500 transition hover:underline"
            >
              تفاصيل الحساب
              <span className="mr-1">←</span>
            </Link>
          </div>
        </article>
      ))
    ) : (
      <div className="w-full rounded-[20px] border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
        لا توجد بيانات حسابات متاحة حاليًا لدى {broker.name}.
      </div>
    )}
  </div>
</div>
        </section>
      );
    })}
  </div>

  {/* CTA */}
  <div className="mt-7 rounded-[26px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-6 shadow-[0_12px_30px_rgba(37,99,235,0.08)]">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="text-2xl font-black text-[#0f172a]">
          اختر الحساب المناسب لأسلوب تداولك
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          راجع شروط كل حساب، ثم انتقل إلى الوسيط الذي يوفر السبريد
          والعمولة والحد الأدنى للإيداع المناسب لك.
        </p>
      </div>

      <div className="flex shrink-0 gap-3">
        <a
          href={`/go/${left.slug ?? ""}?type=real`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-[165px] items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-sm font-black text-white shadow-md transition hover:bg-brand-600"
        >
          ابدأ مع {left.name}
        </a>

        <a
          href={`/go/${right.slug ?? ""}?type=real`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-[165px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-800 transition hover:border-brand-200 hover:text-brand-500"
        >
          ابدأ مع {right.name}
        </a>
      </div>
    </div>
  </div>

  {/* SEO-supporting note */}
  <p className="mt-5 rounded-[20px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-sm leading-7 text-slate-600">
    تختلف تكلفة التداول الفعلية حسب نوع الحساب والأداة المالية وحالة
    السوق. لذلك لا يكفي عدد الحسابات وحده للمقارنة بين {left.name} و
    {right.name}؛ يجب مراجعة السبريد والعمولة ومتطلبات الإيداع وطريقة
    التنفيذ لكل حساب.
  </p>
</div>

    {/* ================= MOBILE VERSION ================= */}
<div className="block p-4 md:hidden">
  {/* Header */}
  <div>
    <span className="text-[12px] font-black text-brand-500">
      الحسابات وتكلفة التداول
    </span>

    <h2 className="mt-1.5 text-[26px] font-black leading-[1.25] text-[#0f172a]">
      مقارنة الحسابات والرسوم
    </h2>

    <p className="mt-2 text-[14px] leading-7 text-slate-600">
      مقارنة الحسابات والسبريد والعمولات بين {left.name} و
      {right.name} لاختيار الحساب الأنسب.
    </p>
  </div>

  {/* Quick cost result */}
  <div className="mt-4 rounded-[22px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] px-4 py-4 shadow-[0_10px_25px_rgba(37,99,235,0.08)]">
    <div className="text-[11px] font-black text-brand-500">
      قراءة سريعة للتكلفة
    </div>

    <div className="mt-1.5 break-words text-[22px] font-black leading-7 text-[#0f172a]">
      {scalpingWinner === "تعادل"
        ? "التكاليف متقاربة"
        : scalpingWinner}
    </div>

    <p className="mt-2 text-[12px] leading-6 text-slate-600">
      {scalpingWinner === "تعادل"
        ? "لا يظهر فرق حاسم في التكلفة؛ لذلك يعتمد الاختيار على شروط كل حساب."
        : `${scalpingWinner} يظهر أفضلية في التكلفة أو السبريد وفق البيانات المتاحة.`}
    </p>
  </div>

  {/* Accounts count */}
  <div className="mt-3 grid grid-cols-2 gap-2">
    <div className="flex min-w-0 flex-col items-center justify-center rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-2 py-3 text-center">
      <div className="flex min-h-[34px] items-center justify-center">
        <span className="break-words text-[11px] font-black leading-4 text-brand-500">
          {left.name}
        </span>
      </div>

      <div className="mt-1 text-[24px] font-black leading-none text-[#0f172a]">
        {leftAccounts.length}
      </div>

      <div className="mt-1 text-[10px] font-bold text-slate-400">
        {leftAccounts.length === 1 ? "حساب متاح" : "حسابات متاحة"}
      </div>
    </div>

    <div className="flex min-w-0 flex-col items-center justify-center rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-2 py-3 text-center">
      <div className="flex min-h-[34px] items-center justify-center">
        <span className="break-words text-[11px] font-black leading-4 text-brand-500">
          {right.name}
        </span>
      </div>

      <div className="mt-1 text-[24px] font-black leading-none text-[#0f172a]">
        {rightAccounts.length}
      </div>

      <div className="mt-1 text-[10px] font-bold text-slate-400">
        {rightAccounts.length === 1 ? "حساب متاح" : "حسابات متاحة"}
      </div>
    </div>
  </div>

  {/* Beginner result */}
  <div className="mt-2 flex items-center justify-between gap-3 rounded-[17px] border border-[#dbeafe] bg-white px-3.5 py-3">
    <div>
      <div className="text-[10px] font-bold text-slate-400">
        سهولة البداية
      </div>

      <div className="mt-0.5 text-[12px] font-black text-slate-600">
        الأنسب للمبتدئين
      </div>
    </div>

    <span className="max-w-[52%] break-words text-left text-[14px] font-black leading-5 text-[#0f172a]">
      {beginnerWinner === "تعادل"
        ? "كلاهما مناسب"
        : beginnerWinner}
    </span>
  </div>

  {/* Main comparison */}
  <div className="mt-4 overflow-hidden rounded-[21px] border border-[#dbeafe] bg-white">
    {/* Table heading */}
    <div className="grid grid-cols-[minmax(0,1fr)_80px_80px] items-center bg-[#f8fbff]">
      <div className="px-3 py-3 text-[10px] font-black text-slate-400">
        عامل المقارنة
      </div>

      <div className="flex min-h-[48px] items-center justify-center border-x border-[#dbeafe] px-1.5 py-2 text-center">
        <span className="break-words text-[10px] font-black leading-4 text-[#0f172a]">
          {left.name}
        </span>
      </div>

      <div className="flex min-h-[48px] items-center justify-center px-1.5 py-2 text-center">
        <span className="break-words text-[10px] font-black leading-4 text-[#0f172a]">
          {right.name}
        </span>
      </div>
    </div>

    {[
      {
        label: "الحساب الأساسي",
        leftValue:
          leftAccounts[0]?.account_name_ar ||
          leftAccounts[0]?.account_name ||
          "غير محدد",
        rightValue:
          rightAccounts[0]?.account_name_ar ||
          rightAccounts[0]?.account_name ||
          "غير محدد",
      },
      {
        label: "أقل إيداع",
        leftValue:
          leftAccounts.find((a) =>
            cleanText(a.min_deposit)
          )?.min_deposit ||
          money(left.min_deposit),
        rightValue:
          rightAccounts.find((a) =>
            cleanText(a.min_deposit)
          )?.min_deposit ||
          money(right.min_deposit),
      },
      {
        label: "السبريد",
        leftValue:
          leftAccounts.find((a) =>
            cleanText(a.spread)
          )?.spread ||
          cleanText(left.spreads) ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) =>
            cleanText(a.spread)
          )?.spread ||
          cleanText(right.spreads) ||
          "غير محدد",
      },
      {
        label: "العمولة",
        leftValue:
          leftAccounts.find((a) =>
            cleanText(a.commission)
          )?.commission ||
          cleanText(left.fees) ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) =>
            cleanText(a.commission)
          )?.commission ||
          cleanText(right.fees) ||
          "غير محدد",
      },
      {
        label: "تنفيذ الأوامر",
        leftValue:
          leftAccounts.find((a) =>
            cleanText(a.execution_type)
          )?.execution_type ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) =>
            cleanText(a.execution_type)
          )?.execution_type ||
          "غير محدد",
      },
    ].map((row) => (
      <div
        key={row.label}
        className="grid grid-cols-[minmax(0,1fr)_80px_80px] items-stretch border-t border-[#dbeafe]"
      >
        <div className="flex min-w-0 items-center bg-[#fbfdff] px-3 py-3 text-[11px] font-black leading-5 text-slate-600">
          {row.label}
        </div>

        <div className="flex min-w-0 items-center justify-center border-x border-[#dbeafe] px-1.5 py-3 text-center">
          <span className="break-words text-[11px] font-black leading-4 text-[#0f172a]">
            {row.leftValue}
          </span>
        </div>

        <div className="flex min-w-0 items-center justify-center px-1.5 py-3 text-center">
          <span className="break-words text-[11px] font-black leading-4 text-[#0f172a]">
            {row.rightValue}
          </span>
        </div>
      </div>
    ))}
  </div>

  {/* Account types */}
  <div className="mt-6">
    <div>
      <span className="text-[10px] font-black text-brand-500">
        تفاصيل الحسابات
      </span>

      <h3 className="mt-1 text-[21px] font-black leading-7 text-[#0f172a]">
        استعرض أنواع الحسابات
      </h3>

      <p className="mt-1 text-[12px] leading-6 text-slate-500">
        افتح الشركة لمراجعة السبريد والعمولة والإيداع لكل حساب.
      </p>
    </div>

    <div className="mt-3 space-y-3">
      {[left, right].map((broker) => {
        const brokerAccounts =
          broker.id === left.id
            ? leftAccounts
            : rightAccounts;

        return (
          <details
            key={broker.slug}
            className="group overflow-hidden rounded-[22px] border border-[#dbeafe] bg-white"
          >
            {/* Broker heading */}
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-[#f8fbff] px-4 py-4">
              <div className="min-w-0">
                <h4 className="break-words text-[17px] font-black leading-6 text-[#0f172a]">
                  حسابات {broker.name}
                </h4>

                <p className="mt-1 text-[11px] font-bold text-brand-500">
                  {brokerAccounts.length}{" "}
                  {brokerAccounts.length === 1
                    ? "حساب متاح"
                    : "حسابات متاحة"}
                </p>
              </div>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[11px] font-black text-brand-500 transition-transform duration-200 group-open:rotate-180">
                ▼
              </span>
            </summary>

            {/* Accounts */}
            <div className="border-t border-[#dbeafe]">
              {brokerAccounts.length > 0 ? (
                brokerAccounts.map((acc, index) => (
                  <article
                    key={acc.id}
                    className={`px-4 py-4 ${
                      index !== brokerAccounts.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    {/* Account heading */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/brokers/${broker.slug}/accounts/${accountSlug(
                            acc.account_name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-words text-[15px] font-black leading-6 text-[#0f172a] transition hover:text-brand-500"
                        >
                          {acc.account_name_ar ||
                            acc.account_name ||
                            "حساب"}
                        </Link>

                        <p className="mt-0.5 line-clamp-2 text-[11px] font-bold leading-5 text-brand-500">
                          {acc.best_for ||
                            "مناسب لفئات متعددة من المتداولين"}
                        </p>
                      </div>

                      <Link
                        href={`/brokers/${broker.slug}/accounts/${accountSlug(
                          acc.account_name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`تفاصيل حساب ${
                          acc.account_name_ar ||
                          acc.account_name ||
                          ""
                        }`}
                        className="shrink-0 rounded-full bg-[#eff6ff] px-3 py-1.5 text-[10px] font-black text-brand-500"
                      >
                        التفاصيل
                      </Link>
                    </div>

                    {/* Account data */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="min-w-0 rounded-[13px] bg-[#f8fafc] px-2 py-2.5">
                        <div className="text-[9px] font-bold text-slate-400">
                          السبريد
                        </div>

                        <div className="mt-1 break-words text-[11px] font-black leading-4 text-[#0f172a]">
                          {acc.spread || "غير محدد"}
                        </div>
                      </div>

                      <div className="min-w-0 rounded-[13px] bg-[#f8fafc] px-2 py-2.5">
                        <div className="text-[9px] font-bold text-slate-400">
                          العمولة
                        </div>

                        <div className="mt-1 break-words text-[11px] font-black leading-4 text-[#0f172a]">
                          {acc.commission || "غير محدد"}
                        </div>
                      </div>

                      <div className="min-w-0 rounded-[13px] bg-[#f8fafc] px-2 py-2.5">
                        <div className="text-[9px] font-bold text-slate-400">
                          الإيداع
                        </div>

                        <div className="mt-1 break-words text-[11px] font-black leading-4 text-[#0f172a]">
                          {acc.min_deposit || "غير محدد"}
                        </div>
                      </div>
                    </div>

                    {acc.execution_type && (
                      <div className="mt-2.5 rounded-xl bg-[#fbfdff] px-3 py-2 text-[10px] leading-5 text-slate-500">
                        <span className="font-bold">
                          طريقة التنفيذ:
                        </span>{" "}
                        <span className="font-black text-[#0f172a]">
                          {acc.execution_type}
                        </span>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <div className="px-4 py-5 text-center text-[12px] leading-6 text-slate-500">
                  لا توجد بيانات حسابات متاحة حاليًا لدى{" "}
                  {broker.name}.
                </div>
              )}
            </div>
          </details>
        );
      })}
    </div>
  </div>

  {/* Useful note */}
  <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-4 py-3">
    <p className="text-[11px] leading-6 text-slate-600">
      لا تعتمد على عدد الحسابات فقط؛ قارن السبريد والعمولة ومتطلبات
      الإيداع وطريقة التنفيذ قبل اختيار حساب التداول.
    </p>
  </div>

  {/* Single CTA */}
  <div className="mt-4 rounded-[22px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-4">
    <h3 className="text-[19px] font-black leading-7 text-[#0f172a]">
      اختر الوسيط المناسب لك
    </h3>

    <p className="mt-1 text-[12px] leading-6 text-slate-600">
      انتقل إلى الوسيط بعد مراجعة الحسابات والتكاليف.
    </p>

    <div className="mt-3 grid grid-cols-2 gap-2">
      {[left, right].map((broker, index) => (
        <div
          key={broker.slug}
          className="flex min-w-0 flex-col rounded-[16px] border border-[#dbeafe] bg-white p-2.5 text-center"
        >
          <div className="flex min-h-[42px] items-center justify-center">
            <span className="break-words text-[12px] font-black leading-5 text-[#0f172a]">
              {broker.name}
            </span>
          </div>

          <a
            href={`/go/${broker.slug ?? ""}?type=real`}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex min-h-[42px] items-center justify-center rounded-xl px-2 py-2 text-[12px] font-black transition ${
              index === 0
                ? "bg-brand-500 text-white shadow-sm hover:bg-brand-600"
                : "border border-slate-300 bg-white text-slate-800 hover:border-[#93c5fd] hover:text-brand-500"
            }`}
          >
            ابدأ الآن
          </a>
        </div>
      ))}
    </div>
  </div>
</div>
  </div>
</section>

<section className="mx-auto max-w-[1520px] px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

    {/* ================= DESKTOP VERSION ================= */}
<div className="hidden p-6 md:block lg:p-8">
  {/* Heading */}
  <div className="grid gap-6 lg:grid-cols-[1fr_350px] lg:items-center">
    <div>
      <span className="text-sm font-black text-brand-500">
        الأمان والتراخيص
      </span>

      <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-[42px]">
        مقارنة الأمان والتراخيص بين {left.name} و{right.name}
      </h2>

      <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600">
        مقارنة الجهات الرقابية وأرقام التراخيص والكيانات القانونية
        وحماية أموال العملاء، لمعرفة الجهة المسؤولة فعليًا عن كل حساب.
      </p>
    </div>

    {/* Safety summary */}
    <div className="rounded-[26px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_14px_35px_rgba(37,99,235,0.10)]">
      <div className="text-xs font-black text-brand-500">
        قراءة المقارنة التنظيمية
      </div>

      <div className="mt-2 text-2xl font-black text-[#0f172a]">
        {(left.score_safety ?? 0) >
        (right.score_safety ?? 0)
          ? left.name
          : (right.score_safety ?? 0) >
            (left.score_safety ?? 0)
          ? right.name
          : "التقييم متقارب"}
      </div>

      <p className="mt-2 text-sm leading-7 text-slate-600">
        {(left.score_safety ?? 0) ===
        (right.score_safety ?? 0)
          ? "لا يظهر فرق واضح في درجة الأمان، لذلك يجب مقارنة الكيان الفعلي لكل حساب."
          : "يحصل على تقييم أمان أعلى في هذه المقارنة، مع ضرورة التحقق من كيان التسجيل."}
      </p>
    </div>
  </div>

  {/* Quick indicators */}
<div className="mt-7 grid grid-cols-3 overflow-hidden rounded-[24px] border border-[#dbeafe] bg-[#f8fbff]">
  {/* Safety scores */}
  <div className="border-l border-[#dbeafe] p-5 text-center">
    <div className="text-xs font-black text-slate-500">
      تقييم الأمان
    </div>

    <div className="mt-3 grid grid-cols-2 gap-3">
      {[left, right].map((broker) => (
        <div
          key={broker.slug}
          className="flex min-h-[104px] flex-col items-center justify-center rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3 text-center"
        >
          <div className="max-w-full break-words text-xs font-black leading-5 text-brand-500">
            {broker.name}
          </div>

          <div className="mt-1 text-2xl font-black text-[#0f172a]">
            {(broker.score_safety ?? 0).toFixed(2)}
          </div>

          <div className="text-[9px] font-bold text-slate-400">
            من 5
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Licenses count */}
  <div className="border-l border-[#dbeafe] p-5 text-center">
    <div className="text-xs font-black text-slate-500">
      التراخيص المسجلة
    </div>

    <div className="mt-3 grid grid-cols-2 gap-3">
      {[
        {
          broker: left,
          count: leftLicenses.length,
        },
        {
          broker: right,
          count: rightLicenses.length,
        },
      ].map(({ broker, count }) => (
        <div
          key={broker.slug}
          className="flex min-h-[104px] flex-col items-center justify-center rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3 text-center"
        >
          <div className="max-w-full break-words text-xs font-black leading-5 text-brand-500">
            {broker.name}
          </div>

          <div className="mt-1 text-2xl font-black text-[#0f172a]">
            {count}
          </div>

          <div className="text-[9px] font-bold text-slate-400">
            {count === 1 ? "ترخيص فعال" : "تراخيص فعالة"}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Islamic accounts */}
  <div className="p-5 text-center">
    <div className="text-xs font-black text-slate-500">
      الحساب الإسلامي
    </div>

    <div className="mt-3 grid grid-cols-2 gap-3">
      {[left, right].map((broker) => {
        const islamicStatus = yesNoArabic(
          broker.islamic_account
        );

        return (
          <div
            key={broker.slug}
            className="flex min-h-[104px] flex-col items-center justify-center rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3 text-center"
          >
            <div className="max-w-full break-words text-xs font-black leading-5 text-brand-500">
              {broker.name}
            </div>

            <div className="mt-2">
              <span
                className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[10px] font-black ${
                  islamicStatus === "متوفر"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {islamicStatus}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>

  {/* Broker regulatory profiles */}
  <div className="mt-8 space-y-6">
    {[left, right].map((broker) => {
      const brokerLicenses =
        broker.id === left.id
          ? leftLicenses
          : rightLicenses;

      const regulationParagraphs =
        splitParagraphs(broker.regulation_summary_ar);

      const safetyFactors =
        splitSafetyFactors(broker.safety_factors_ar);

      return (
        <article
          key={broker.slug}
          className="overflow-hidden rounded-[30px] border border-[#dbeafe] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]"
        >
          {/* Broker heading */}
          <div className="flex items-center justify-between gap-6 border-b border-[#dbeafe] bg-[linear-gradient(90deg,#eff6ff_0%,#ffffff_100%)] px-6 py-5">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] border border-[#dbeafe] bg-white p-2 shadow-sm">
                {broker.logo ? (
                  <img
                    src={broker.logo}
                    alt={`شعار ${broker.name}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-xs font-black text-slate-400">
                    {broker.name}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="text-xs font-black text-brand-500">
                  الملف التنظيمي
                </div>

                <h3 className="mt-1 break-words text-2xl font-black text-[#0f172a]">
                  تراخيص {broker.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {brokerLicenses.length}{" "}
                  {brokerLicenses.length === 1
                    ? "ترخيص مسجل"
                    : "تراخيص مسجلة"}
                </p>
              </div>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3">
              <div className="rounded-[18px] border border-[#dbeafe] bg-white px-4 py-3 text-center">
  <div className="text-xs font-bold text-slate-400">
    المقر الرئيسي
  </div>

  <div className="mt-1 text-sm font-black text-[#0f172a]">
    {broker.headquarters || "غير محدد"}
  </div>
</div>

              <div className="rounded-[18px] border border-[#dbeafe] bg-white px-4 py-3 text-center">
  <div className="text-xs font-bold text-slate-400">
    تقييم الأمان
  </div>

  <div className="mt-1 text-sm font-black text-brand-500">
    {(broker.score_safety ?? 0).toFixed(2)} من 5
  </div>
</div>
            </div>
          </div>

          {/* Regulation summary */}
          <div className="px-6 py-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <h4 className="text-xl font-black text-[#0f172a]">
                  ملخص الوضع التنظيمي
                </h4>

                <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-700">
                  {regulationParagraphs.length > 0 ? (
                    regulationParagraphs.map(
                      (paragraph, index) => (
                        <p
                          key={index}
                          className="text-justify"
                        >
                          {paragraph}
                        </p>
                      )
                    )
                  ) : (
                    <p>
                      لا توجد تفاصيل تنظيمية متاحة حاليًا.
                    </p>
                  )}
                </div>
              </div>

              {/* Safety factors */}
              <aside className="rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-4">
                <div className="text-sm font-black text-[#0f172a]">
                  عوامل الأمان الرئيسية
                </div>

                <div className="mt-3 space-y-2">
                  {safetyFactors.length > 0 ? (
                    safetyFactors.map((factor, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-[13px] border border-[#dbeafe] bg-white px-3 py-2.5"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                        <span className="text-xs font-bold leading-5 text-slate-700">
                          {factor}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs leading-6 text-slate-500">
                      تختلف عوامل الحماية بحسب الكيان
                      التنظيمي.
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </div>

          {/* Licenses table */}
<div className="border-y border-[#dbeafe] bg-[#fbfdff] px-6 py-6">
  {/* Table heading */}
  <div className="mb-4 flex items-end justify-between gap-5">
    <div>
      <h4 className="text-xl font-black text-[#0f172a]">
        الجهات الرقابية وأرقام التراخيص
      </h4>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        تحقق من الجهة والكيان القانوني ورقم الترخيص قبل فتح
        الحساب.
      </p>
    </div>

    <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white px-4 py-2 text-xs font-black text-brand-500 shadow-sm">
      {brokerLicenses.length}{" "}
      {brokerLicenses.length === 1 ? "سجل" : "سجلات"}
    </span>
  </div>

  {brokerLicenses.length > 0 ? (
    <div className="overflow-x-auto rounded-[22px] border border-[#dbeafe] bg-white">
      <div className="min-w-[1080px]">
        {/* Table header */}
        <div className="grid grid-cols-[1.1fr_0.8fr_0.9fr_2.2fr_1fr_0.9fr] items-stretch border-b border-[#dbeafe] bg-[#f4f8fd] text-center">
          <div className="flex min-h-[54px] items-center justify-center px-3 py-3 text-xs font-black text-slate-600">
            الجهة الرقابية
          </div>

          <div className="flex min-h-[54px] items-center justify-center border-r border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
            الدولة
          </div>

          <div className="flex min-h-[54px] items-center justify-center border-r border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
            رقم الترخيص
          </div>

          <div className="flex min-h-[54px] items-center justify-center border-r border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
            الكيان القانوني
          </div>

          <div className="flex min-h-[54px] items-center justify-center border-r border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
            مستوى الرقابة
          </div>

          <div className="flex min-h-[54px] items-center justify-center border-r border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
            التحقق
          </div>
        </div>

        {/* Table rows */}
        {brokerLicenses.map((license, index) => {
          const verificationUrl =
            license.verification_url_ar ||
            license.verification_url_en;

          return (
            <div
              key={license.id}
              className={`grid grid-cols-[1.1fr_0.8fr_0.9fr_2.2fr_1fr_0.9fr] items-stretch text-center text-sm transition-colors hover:bg-[#f8fbff] ${
                index !== brokerLicenses.length - 1
                  ? "border-b border-[#dbeafe]"
                  : ""
              }`}
            >
              {/* Regulator */}
              <div className="flex min-h-[82px] flex-col items-center justify-center px-3 py-3">
                <div className="font-black text-[#0f172a]">
                  {license.regulator_code || "غير محدد"}
                </div>

                {license.regulator_name_ar && (
                  <div className="mt-1 max-w-[150px] text-[10px] leading-4 text-slate-400">
                    {license.regulator_name_ar}
                  </div>
                )}
              </div>

              {/* Country */}
              <div className="flex min-h-[82px] items-center justify-center border-r border-[#dbeafe] px-3 py-3">
                <span className="font-bold leading-5 text-slate-700">
                  {license.country_ar || "غير محدد"}
                </span>
              </div>

              {/* License number */}
              <div className="flex min-h-[82px] items-center justify-center border-r border-[#dbeafe] px-3 py-3">
                <span
                  dir="ltr"
                  className="font-black text-[#0f172a]"
                >
                  {license.license_number || "غير متاح علنًا"}
                </span>
              </div>

              {/* Legal entity */}
              <div className="flex min-h-[82px] items-center justify-center border-r border-[#dbeafe] px-4 py-3">
                <span
                  dir="auto"
                  className="max-w-[320px] break-words text-center font-bold leading-6 text-slate-700"
                >
                  {license.entity_name_ar ||
                    license.entity_name_en ||
                    "غير محدد"}
                </span>
              </div>

              {/* Trust level */}
              <div className="flex min-h-[82px] flex-col items-center justify-center border-r border-[#dbeafe] px-3 py-3">
                <span
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-black ${licenseTrustClasses(
                    license.trust_level
                  )}`}
                >
                  {licenseTrustLabel(license.trust_level)}
                </span>

                <span className="mt-1.5 text-[9px] font-bold text-slate-400">
                  {licenseStatusLabel(license.status_code)}
                </span>
              </div>

              {/* Verification */}
              <div className="flex min-h-[82px] items-center justify-center border-r border-[#dbeafe] px-3 py-3">
                {verificationUrl ? (
                  <a
                    href={verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={`التحقق من ترخيص ${
                      license.regulator_code || broker.name
                    }`}
                    className="inline-flex min-h-[34px] items-center justify-center whitespace-nowrap rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-[10px] font-black text-brand-500 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                  >
                    تحقق رسمي
                  </a>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400">
                    غير متاح
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4 text-center text-sm leading-7 text-amber-800">
      لا توجد سجلات تراخيص متاحة حاليًا لدى {broker.name}.
    </div>
  )}
</div>

          {/* Fund protection */}
          <div className="px-6 py-6">
            <div className="rounded-[22px] border border-emerald-200 bg-emerald-50/60 px-5 py-5">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-lg font-black text-[#0f172a]">
                  حماية أموال عملاء {broker.name}
                </h4>

                <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-black text-emerald-700">
                  تختلف حسب الكيان
                </span>
              </div>

              <p className="mt-3 text-justify text-[15px] leading-8 text-slate-700">
                {cleanText(broker.fund_protection_ar) ||
                  "راجع قواعد فصل أموال العملاء وحماية الرصيد السلبي وبرامج التعويض لدى الكيان الذي ستفتح الحساب من خلاله."}
              </p>
            </div>

            <div className="mt-3 text-[11px] text-slate-400">
              آخر تحقق من سجلات التراخيص:{" "}
              <span className="font-bold text-slate-600">
                {brokerLicenses.length > 0
                  ? formatVerifiedDate(
                      brokerLicenses
                        .map(
                          (license) =>
                            license.last_verified
                        )
                        .filter(Boolean)
                        .sort()
                        .reverse()[0] || null
                    )
                  : "غير محدد"}
              </span>
            </div>
          </div>
        </article>
      );
    })}
  </div>

  {/* Important comparison note */}
  <div className="mt-6 rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4">
    <p className="text-sm leading-7 text-slate-600">
      عدد التراخيص وحده لا يحدد مستوى الأمان. قد تعمل العلامة
      التجارية من خلال عدة شركات قانونية، بينما يخضع حسابك لكيان
      واحد فقط. تحقق من اسم الكيان ورقم الترخيص واتفاقية العميل
      قبل الإيداع.
    </p>
  </div>
</div>

    {/* ================= MOBILE VERSION ================= */}
<div className="block px-4 pb-5 pt-5 md:hidden">
  {/* Compact heading */}
  <div>
    <span className="text-[11px] font-black text-brand-500">
      الأمان والتراخيص
    </span>

    <h2 className="mt-1.5 text-[25px] font-black leading-[1.35] text-[#0f172a]">
  مقارنة الأمان والتراخيص
</h2>

<p className="mt-1 text-[12px] font-bold leading-6 text-slate-500">
  بين <bdi dir="ltr">{left.name}</bdi> و{" "}
  <bdi dir="ltr">{right.name}</bdi>
</p>

    <p className="mt-2 text-[12px] leading-6 text-slate-500">
      راجع تقييم الأمان والجهات الرقابية والكيان القانوني المسؤول
      عن حسابك.
    </p>
  </div>

  {/* Compact comparison */}
<div className="mt-4 overflow-hidden rounded-[22px] border border-[#bfdbfe] bg-white">
  {/* Scores */}
  <div className="grid grid-cols-2 divide-x divide-x-reverse divide-[#dbeafe] bg-[#f8fbff]">
    {[
      {
        broker: left,
        licenses: leftLicenses,
      },
      {
        broker: right,
        licenses: rightLicenses,
      },
    ].map(({ broker, licenses }) => (
      <div
        key={broker.slug}
        className="min-w-0 px-3 py-4 text-center"
      >
        <div className="flex min-h-[32px] items-center justify-center">
          <bdi
            dir="ltr"
            className="break-words text-[11px] font-black leading-4 text-[#0f172a]"
          >
            {broker.name}
          </bdi>
        </div>

        <div className="mt-1.5 text-[25px] font-black leading-none text-brand-500">
          {(broker.score_safety ?? 0).toFixed(2)}
        </div>

        <div className="mt-1.5 text-[9px] font-bold text-slate-400">
          تقييم الأمان من 5
        </div>
      </div>
    ))}
  </div>

  {/* Broker information */}
  <div className="border-t border-[#dbeafe] px-3 py-3">
    {[
      {
        broker: left,
        licenses: leftLicenses,
      },
      {
        broker: right,
        licenses: rightLicenses,
      },
    ].map(({ broker, licenses }, index) => (
      <div
        key={broker.slug}
        className={`flex items-center justify-between gap-3 py-2 ${
          index === 0
            ? "border-b border-[#eaf2fc]"
            : ""
        }`}
      >
        <bdi
          dir="ltr"
          className="min-w-0 text-[10px] font-black text-[#0f172a]"
        >
          {broker.name}
        </bdi>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-[#eff6ff] px-2.5 py-1.5 text-[9px] font-black text-brand-500">
            {licenses.length}{" "}
            {licenses.length === 1 ? "ترخيص" : "تراخيص"}
          </span>

          <span
  className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${
    yesNoArabic(broker.islamic_account) === "متوفر"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-100 text-slate-600"
  }`}
>
  {yesNoArabic(broker.islamic_account) === "متوفر"
    ? "يوفر حسابًا إسلاميًا"
    : "لا يوفر حسابًا إسلاميًا"}
</span>
        </div>
      </div>
    ))}
  </div>

  {/* Important hint */}
  <div className="border-t border-[#dbeafe] bg-[#f8fbff] px-4 py-3 text-center">
    <p className="text-[10px] font-bold leading-5 text-slate-500">
      عدد التراخيص وحده لا يكفي؛ تحقق من الكيان القانوني الذي
      سيستقبل حسابك.
    </p>
  </div>
</div>

  {/* Broker profiles */}
  <div className="mt-4 space-y-3">
    {[left, right].map((broker) => {
      const brokerLicenses =
        broker.id === left.id
          ? leftLicenses
          : rightLicenses;

      const regulationParagraphs =
        splitParagraphs(broker.regulation_summary_ar);

      return (
        <details
          key={broker.slug}
          className="group overflow-hidden rounded-[22px] border border-[#bfdbfe] bg-white"
        >
          {/* Broker summary */}
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] px-3 py-3 [&::-webkit-details-marker]:hidden">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#dbeafe] bg-white p-2 shadow-sm">
                {broker.logo ? (
                  <img
                    src={broker.logo}
                    alt={`شعار ${broker.name}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-[8px] font-black text-slate-400">
                    {broker.name}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="text-[9px] font-black text-brand-500">
                  الملف التنظيمي
                </div>

                <h3 className="mt-0.5 break-words text-[16px] font-black leading-5 text-[#0f172a]">
                  تراخيص {broker.name}
                </h3>

                <p className="mt-1 text-[9px] font-bold text-slate-500">
                  {brokerLicenses.length}{" "}
                  {brokerLicenses.length === 1
                    ? "ترخيص مسجل"
                    : "تراخيص مسجلة"}
                  {" • "}
                  {(broker.score_safety ?? 0).toFixed(2)} من 5
                </p>
              </div>
            </div>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[10px] font-black text-brand-500 transition-transform duration-200 group-open:rotate-180">
              ▼
            </span>
          </summary>

          <div className="border-t border-[#dbeafe] p-3">
            {/* Broker basic information */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[14px] bg-[#f8fbff] px-2 py-2.5 text-center">
                <div className="text-[8px] font-bold text-slate-400">
                  المقر الرئيسي
                </div>

                <div className="mt-1 break-words text-[10px] font-black leading-4 text-[#0f172a]">
                  {broker.headquarters || "غير محدد"}
                </div>
              </div>

              <div className="rounded-[14px] bg-[#f8fbff] px-2 py-2.5 text-center">
                <div className="text-[8px] font-bold text-slate-400">
                  الحساب الإسلامي
                </div>

                <div className="mt-1 text-[10px] font-black leading-4 text-[#0f172a]">
                  {yesNoArabic(broker.islamic_account)}
                </div>
              </div>
            </div>

            {/* Licenses heading */}
            <div className="mb-2 mt-3 flex items-center justify-between gap-3">
              <h4 className="text-[13px] font-black text-[#0f172a]">
                الجهات الرقابية
              </h4>

              <span className="rounded-full bg-[#eff6ff] px-2.5 py-1 text-[8px] font-black text-brand-500">
                {brokerLicenses.length} سجلات
              </span>
            </div>

            {/* Compact license list */}
            {brokerLicenses.length > 0 ? (
              <div className="space-y-2">
                {brokerLicenses.map((license) => {
                  const verificationUrl =
                    license.verification_url_ar ||
                    license.verification_url_en;

                  return (
                    <div
                      key={license.id}
                      className="overflow-hidden rounded-[16px] border border-[#dbeafe] bg-white"
                    >
                      {/* License main row */}
                      <div className="flex items-start justify-between gap-3 bg-[#f8fbff] px-3 py-2.5">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-black text-[#0f172a]">
                              {license.regulator_code ||
                                "غير محدد"}
                            </span>

                            <span
                              className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[8px] font-black ${licenseTrustClasses(
                                license.trust_level
                              )}`}
                            >
                              {licenseTrustLabel(
                                license.trust_level
                              )}
                            </span>
                          </div>

                          {license.regulator_name_ar && (
                            <div className="mt-0.5 text-[8px] leading-4 text-slate-400">
                              {license.regulator_name_ar}
                            </div>
                          )}
                        </div>

                        <div className="shrink-0 text-left">
                          <div className="text-[8px] font-bold text-slate-400">
                            رقم الترخيص
                          </div>

                          <div
                            dir="ltr"
                            className="mt-0.5 text-[10px] font-black text-[#0f172a]"
                          >
                            {license.license_number ||
                              "غير متاح"}
                          </div>
                        </div>
                      </div>

                      {/* Entity */}
                      <div className="border-t border-[#eaf2fc] px-3 py-2.5">
                        <div className="text-[8px] font-bold text-slate-400">
                          الكيان القانوني
                        </div>

                        <div
                          dir="auto"
                          className="mt-0.5 break-words text-[10px] font-black leading-5 text-[#0f172a]"
                        >
                          {license.entity_name_ar ||
                            license.entity_name_en ||
                            "غير محدد"}
                        </div>
                      </div>

                      {/* Country and verification */}
                      <div className="flex items-center justify-between gap-3 border-t border-[#eaf2fc] px-3 py-2">
                        <div className="text-[9px] font-bold text-slate-600">
                          {license.country_ar || "غير محدد"}
                        </div>

                        {verificationUrl ? (
                          <a
                            href={verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            aria-label={`التحقق من ترخيص ${
                              license.regulator_code ||
                              broker.name
                            }`}
                            className="inline-flex items-center justify-center rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-2.5 py-1.5 text-[9px] font-black text-brand-500"
                          >
                            تحقق رسمي
                          </a>
                        ) : (
                          <span className="text-[8px] font-bold text-slate-400">
                            لا يوجد رابط
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-[14px] border border-amber-200 bg-amber-50 px-3 py-3 text-center text-[10px] leading-5 text-amber-800">
                لا توجد سجلات تراخيص متاحة حاليًا.
              </div>
            )}

            {/* Optional detailed analysis */}
            <details className="group/analysis mt-3 overflow-hidden rounded-[16px] border border-[#dbeafe] bg-[#f8fbff]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 [&::-webkit-details-marker]:hidden">
                <div>
                  <div className="text-[11px] font-black text-brand-500">
                    التحليل التنظيمي وحماية الأموال
                  </div>

                  <div className="mt-0.5 text-[9px] text-slate-500">
                    اقرأ التفاصيل الكاملة
                  </div>
                </div>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[9px] font-black text-brand-500 transition-transform group-open/analysis:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="border-t border-[#dbeafe] bg-white px-3 py-3">
                <h4 className="text-[12px] font-black text-[#0f172a]">
                  ملخص الوضع التنظيمي
                </h4>

                <div className="mt-2 space-y-3 text-[11px] leading-6 text-slate-600">
                  {regulationParagraphs.length > 0 ? (
                    regulationParagraphs.map(
                      (paragraph, index) => (
                        <p key={index}>
                          {paragraph}
                        </p>
                      )
                    )
                  ) : (
                    <p>
                      لا توجد تفاصيل تنظيمية متاحة حاليًا.
                    </p>
                  )}
                </div>

                <div className="my-3 h-px bg-[#dbeafe]" />

                <h4 className="text-[12px] font-black text-[#0f172a]">
                  حماية أموال عملاء {broker.name}
                </h4>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {cleanText(broker.fund_protection_ar) ||
                    "راجع قواعد فصل أموال العملاء وحماية الرصيد السلبي وبرامج التعويض لدى الكيان الذي ستفتح الحساب من خلاله."}
                </p>
              </div>
            </details>
          </div>
        </details>
      );
    })}
  </div>

  {/* Final note */}
  <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-3 py-3">
    <p className="text-[10px] leading-5 text-slate-500">
      قبل الإيداع، طابق اسم الكيان ورقم الترخيص في اتفاقية العميل
      مع بيانات الجهة الرقابية الرسمية.
    </p>
  </div>
</div>
  </div>
</section>

<section className="mx-auto max-w-[1520px] px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

    {/* ================= DESKTOP ================= */}
    <div className="hidden p-6 md:block lg:p-8">
      {/* Header */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
        <div>
          <span className="text-sm font-black text-brand-500">
            خلاصة المقارنة
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-[42px]">
            أي وسيط يناسب احتياجاتك؟
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            القرار لا يعتمد على اسم الشركة أو التقييم العام وحده.
            قارن سبب اختيار كل وسيط، نقاط القوة، والتنازلات التي قد
            تؤثر في تجربة تداولك.
          </p>
        </div>

        {/* Main recommendation */}
        <div className="rounded-[26px] border border-[#2563eb] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_14px_35px_rgba(37,99,235,0.11)]">
          <div className="text-xs font-black text-brand-500">
            النتيجة العامة
          </div>

          <div className="mt-2 break-words text-3xl font-black leading-tight text-[#0f172a]">
            {recommendationLabel}
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            {ratingsAreClose
              ? "الفارق في التقييم العام محدود؛ الأفضل اختيار الشركة التي تتوافق شروطها وحساباتها مع أسلوب تداولك."
              : `${recommendedBroker.name} يحصل على تقييم عام أعلى في المقارنة، مع ضرورة مراجعة سبب الاختيار والتنازلات أدناه.`}
          </p>
        </div>
      </div>

      {/* Decision indicators */}
      <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-[22px] border border-[#dbeafe] bg-[#f8fbff]">
        <div className="border-l border-[#dbeafe] px-5 py-4 text-center">
          <div className="text-[11px] font-black text-slate-400">
            التقييم العام
          </div>

          <div className="mt-1 text-xl font-black text-[#0f172a]">
            {recommendationLabel}
          </div>

          <div className="mt-1 text-[10px] text-slate-500">
            {leftRating.toFixed(2)} مقابل{" "}
            {rightRating.toFixed(2)}
          </div>
        </div>

        <div className="border-l border-[#dbeafe] px-5 py-4 text-center">
          <div className="text-[11px] font-black text-slate-400">
            للبداية الأسهل
          </div>

          <div className="mt-1 text-xl font-black text-[#0f172a]">
            {beginnerDecision}
          </div>

          <div className="mt-1 text-[10px] text-slate-500">
            بحسب الإيداع والدعم وملاءمة الحساب
          </div>
        </div>

        <div className="px-5 py-4 text-center">
          <div className="text-[11px] font-black text-slate-400">
            الرسوم والتكاليف
          </div>

          <div className="mt-1 text-xl font-black text-[#0f172a]">
            {feesDecision}
          </div>

          <div className="mt-1 text-[10px] text-slate-500">
            بحسب تقييم الرسوم في المقارنة
          </div>
        </div>
      </div>

      {/* Broker decision cards */}
      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        {decisionBrokers.map(({ broker, reasons }) => {
          const isRecommended =
            !ratingsAreClose &&
            broker.id === recommendedBroker.id;

          return (
            <article
              key={broker.slug}
              className={`overflow-hidden rounded-[28px] border ${
                isRecommended
                  ? "border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_42%)] shadow-[0_12px_32px_rgba(37,99,235,0.10)]"
                  : "border-[#dbeafe] bg-white shadow-sm"
              }`}
            >
              {/* Broker card header */}
              <div className="flex items-center justify-between gap-4 border-b border-[#dbeafe] px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] border border-[#dbeafe] bg-white p-2 shadow-sm">
                    {broker.logo ? (
                      <img
                        src={broker.logo}
                        alt={`شعار ${broker.name}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[9px] font-black text-slate-400">
                        {broker.name}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[11px] font-black text-brand-500">
                      متى تختار هذا الوسيط؟
                    </div>

                    <h3 className="mt-0.5 break-words text-2xl font-black text-[#0f172a]">
                      {broker.name}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 text-center">
                  <div className="text-2xl font-black text-brand-500">
                    {(broker.rating ?? 0).toFixed(2)}
                  </div>

                  <div className="text-[9px] font-bold text-slate-400">
                    من 5
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* Strength */}
                <div className="rounded-[18px] border border-emerald-200 bg-emerald-50/60 px-4 py-3">
                  <div className="text-[11px] font-black text-emerald-700">
                    اختر {broker.name} إذا كنت تبحث عن
                  </div>

                  <p className="mt-1.5 text-sm font-bold leading-7 text-slate-700">
                    {cleanText(broker.key_strength_ar) ||
                      "بيئة تداول تتوافق مع احتياجاتك الأساسية."}
                  </p>
                </div>

                {/* Suitable users */}
                <div className="mt-4">
                  <div className="text-[11px] font-black text-slate-500">
                    يناسب بشكل أكبر
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {reasons.length > 0 ? (
                      reasons.map((reason, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1.5 text-[10px] font-black text-slate-600"
                        >
                          {reason}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">
                        المتداولون الذين تتوافق احتياجاتهم مع
                        حسابات الشركة ومنصاتها.
                      </span>
                    )}
                  </div>
                </div>

                {/* Weakness */}
                <div className="mt-4 rounded-[18px] border border-amber-200 bg-amber-50/60 px-4 py-3">
                  <div className="text-[11px] font-black text-amber-700">
                    انتبه قبل الاختيار
                  </div>

                  <p className="mt-1.5 text-sm leading-7 text-slate-700">
                    {cleanText(broker.key_weakness_ar) ||
                      "راجع شروط الحساب والرسوم والكيان التنظيمي قبل التسجيل."}
                  </p>
                </div>

                {/* Broker actions */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={`/go/${broker.slug ?? ""}?type=real`}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className={`inline-flex min-h-[46px] items-center justify-center rounded-xl px-4 py-2 text-sm font-black transition ${
                      isRecommended
                        ? "bg-brand-500 text-white hover:bg-brand-600"
                        : "border border-[#bfdbfe] bg-[#eff6ff] text-brand-500 hover:border-brand-500"
                    }`}
                  >
                    افتح حساب
                  </a>

                  <Link
                    href={`/brokers/${broker.slug ?? ""}`}
                    className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:border-[#93c5fd] hover:text-brand-500"
                  >
                    اقرأ التقييم
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Editorial decision */}
      <div className="mt-6 rounded-[24px] border border-[#bfdbfe] bg-[#f8fbff] px-5 py-5">
        <div className="grid gap-5 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-center">
          <div>
  <div className="text-xl font-black text-[#0f172a]">
    القرار النهائي
  </div>

  <div className="mt-1 text-xs font-black text-brand-500">
    رأي بروكر العرب
  </div>
</div>

          <p className="text-sm leading-8 text-slate-700">
            {recommendedInsight}
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] leading-6 text-slate-400">
        هذا الترشيح تحريري ويعتمد على البيانات المعروضة في
        المقارنة. تأكد من ملاءمة المنتجات والكيان التنظيمي لبلد
        إقامتك قبل فتح الحساب.
      </p>
    </div>

    {/* ================= MOBILE ================= */}
    <div className="p-4 pt-5 md:hidden">
      {/* Mobile heading */}
      <div>
        <span className="text-[11px] font-black text-brand-500">
          خلاصة المقارنة
        </span>

        <h2 className="mt-1.5 text-[25px] font-black leading-[1.35] text-[#0f172a]">
          أي وسيط يناسبك؟
        </h2>

        <p className="mt-1.5 text-[12px] leading-6 text-slate-500">
          اختر حسب أولويتك، وليس بناءً على التقييم العام وحده.
        </p>
      </div>

      {/* Main mobile recommendation */}
      <div className="mt-4 rounded-[20px] border border-[#2563eb] bg-[linear-gradient(145deg,#eff6ff_0%,#ffffff_100%)] px-4 py-4">
        <div className="text-[10px] font-black text-brand-500">
          النتيجة العامة
        </div>

        <div className="mt-1 break-words text-[22px] font-black leading-7 text-[#0f172a]">
          {recommendationLabel}
        </div>

        <p className="mt-1 text-[11px] leading-6 text-slate-500">
          {ratingsAreClose
            ? "الفارق محدود؛ احسم القرار بحسب الحساب والرسوم والمنصة التي تحتاجها."
            : `${recommendedBroker.name} يحصل على تقييم عام أعلى، لكن راجع سبب اختيار كل شركة أدناه.`}
        </p>
      </div>

      {/* Mobile indicators */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[16px] border border-[#dbeafe] bg-[#f8fbff] px-2 py-3 text-center">
          <div className="text-[9px] font-bold text-slate-400">
            للبداية الأسهل
          </div>

          <div className="mt-1 break-words text-[11px] font-black leading-5 text-[#0f172a]">
            {beginnerDecision}
          </div>
        </div>

        <div className="rounded-[16px] border border-[#dbeafe] bg-[#f8fbff] px-2 py-3 text-center">
          <div className="text-[9px] font-bold text-slate-400">
            الرسوم والتكاليف
          </div>

          <div className="mt-1 break-words text-[11px] font-black leading-5 text-[#0f172a]">
            {feesDecision}
          </div>
        </div>
      </div>

      {/* Mobile broker choices */}
      <div className="mt-4 space-y-3">
        {decisionBrokers.map(({ broker, reasons }) => {
          const isRecommended =
            !ratingsAreClose &&
            broker.id === recommendedBroker.id;

          return (
            <article
              key={broker.slug}
              className={`overflow-hidden rounded-[20px] border ${
                isRecommended
                  ? "border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_48%)]"
                  : "border-[#dbeafe] bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#dbeafe] bg-white p-2">
                    {broker.logo ? (
                      <img
                        src={broker.logo}
                        alt={`شعار ${broker.name}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[7px] font-black text-slate-400">
                        {broker.name}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[9px] font-black text-brand-500">
                      {isRecommended
                        ? "التقييم العام الأعلى"
                        : "خيار بديل حسب الأولوية"}
                    </div>

                    <h3 className="break-words text-[16px] font-black leading-5 text-[#0f172a]">
                      {broker.name}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 text-center">
                  <div className="text-lg font-black text-brand-500">
                    {(broker.rating ?? 0).toFixed(2)}
                  </div>

                  <div className="text-[8px] font-bold text-slate-400">
                    من 5
                  </div>
                </div>
              </div>

              <div className="border-t border-[#dbeafe] px-3 py-3">
                <div>
                  <div className="text-[9px] font-black text-emerald-700">
                    اختره إذا كنت تبحث عن
                  </div>

                  <p className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    {cleanText(broker.key_strength_ar) ||
                      "بيئة تداول تتوافق مع احتياجاتك الأساسية."}
                  </p>
                </div>

                {reasons.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {reasons.slice(0, 2).map((reason, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-[#eff6ff] px-2 py-1 text-[8px] font-black text-brand-500"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 rounded-[14px] bg-amber-50 px-3 py-2.5">
                  <div className="text-[9px] font-black text-amber-700">
                    انتبه
                  </div>

                  <p className="mt-0.5 text-[10px] leading-5 text-slate-600">
                    {cleanText(broker.key_weakness_ar) ||
                      "راجع شروط الحساب والرسوم قبل التسجيل."}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={`/go/${broker.slug ?? ""}?type=real`}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className={`inline-flex min-h-[42px] items-center justify-center rounded-xl px-2 py-2 text-[11px] font-black ${
                      isRecommended
                        ? "bg-brand-500 text-white"
                        : "border border-[#bfdbfe] bg-[#eff6ff] text-brand-500"
                    }`}
                  >
                    افتح حساب
                  </a>

                  <Link
                    href={`/brokers/${broker.slug ?? ""}`}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-300 bg-white px-2 py-2 text-[11px] font-black text-slate-700"
                  >
                    اقرأ التقييم
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Mobile editorial view */}
      <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-3 py-3">
        <div className="text-[17px] font-black text-[#0f172a]">
  القرار النهائي
</div>

<div className="mt-1 text-[10px] font-black text-brand-500">
  رأي بروكر العرب
</div>

<p className="mt-2 text-[11px] leading-6 text-slate-600">
  {recommendedInsight}
</p>
      </div>

      <p className="mt-3 text-center text-[9px] leading-5 text-slate-400">
        تحقق من شروط الحساب والرسوم والكيان التنظيمي المتاح في
        بلدك قبل التسجيل.
      </p>
    </div>
  </div>
</section>

<section className="mx-auto max-w-[1520px] px-4 pb-3 sm:px-6 sm:pb-4 lg:px-8">
  <div className="relative overflow-hidden rounded-[32px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

    {/* ================= DESKTOP ================= */}
    <div className="hidden p-6 md:block lg:p-8">
      {/* Header */}
      <div className="max-w-4xl">
        <span className="text-sm font-black text-brand-500">
          الأسئلة الشائعة
        </span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          أسئلة شائعة عن{" "}
          <bdi dir="ltr">{left.name}</bdi> و{" "}
          <bdi dir="ltr">{right.name}</bdi>
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          إجابات مختصرة عن أهم الأسئلة التي قد تؤثر في قرار فتح
          الحساب واختيار الوسيط الأنسب.
        </p>
      </div>

      {/* Desktop FAQ columns */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {[
          {
            broker: left,
            faqs: (
              ((left as any).faq_ar || []) as {
                question: string;
                answer: string;
              }[]
            ).slice(0, 3),
          },
          {
            broker: right,
            faqs: (
              ((right as any).faq_ar || []) as {
                question: string;
                answer: string;
              }[]
            ).slice(0, 3),
          },
        ].map(({ broker, faqs }) => (
          <div key={broker.slug} className="min-w-0">
            {/* Broker heading */}
            <div className="mb-4 flex items-center justify-between gap-3 rounded-[18px] border border-[#bfdbfe] bg-[#eff6ff] px-5 py-3">
              <h3 className="min-w-0 break-words text-lg font-black text-[#0f172a]">
                أسئلة عن{" "}
                <bdi dir="ltr">{broker.name}</bdi>
              </h3>

              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-black text-brand-500">
                {faqs.length} أسئلة
              </span>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <details
                    key={`${broker.slug}-faq-${index}`}
                    className="group overflow-hidden rounded-[20px] border border-[#dbeafe] bg-[#fbfdff] shadow-sm transition open:border-[#93c5fd] open:bg-white"
                  >
                    <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                      <h4 className="min-w-0 text-[15px] font-black leading-7 text-[#0f172a]">
                        {faq.question}
                      </h4>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#dbeafe] bg-white text-xs font-black text-brand-500 transition-transform duration-200 group-open:rotate-180">
                        ▼
                      </span>
                    </summary>

                    <div className="border-t border-[#eaf2fc] px-5 py-4">
                      <p className="text-sm leading-8 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))
              ) : (
                <div className="rounded-[20px] border border-slate-200 bg-[#fbfdff] px-5 py-6 text-center text-sm text-slate-500">
                  لا توجد أسئلة متاحة حاليًا.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop note */}
      <div className="mt-7 rounded-[20px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-center">
        <p className="text-sm leading-7 text-slate-500">
          تختلف الشروط والمنتجات والكيانات التنظيمية حسب بلد العميل،
          لذلك يُفضّل مراجعة صفحة الوسيط واتفاقية الحساب قبل التسجيل.
        </p>
      </div>
    </div>

    {/* ================= MOBILE ================= */}
    <div className="p-4 pt-5 md:hidden">
      {/* Header */}
      <div>
        <span className="text-[11px] font-black text-brand-500">
          الأسئلة الشائعة
        </span>

        <h2 className="mt-1.5 text-[24px] font-black leading-[1.35] text-[#0f172a]">
          أسئلة عن{" "}
          <bdi dir="ltr">{left.name}</bdi> و{" "}
          <bdi dir="ltr">{right.name}</bdi>
        </h2>

        <p className="mt-1.5 text-[12px] leading-6 text-slate-500">
          أهم الإجابات قبل فتح الحساب أو اختيار الوسيط.
        </p>
      </div>

      {/* Broker tabs */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[left, right].map((broker) => (
          <div
            key={broker.slug}
            className="flex min-h-[40px] items-center justify-center rounded-[13px] border border-[#bfdbfe] bg-[#eff6ff] px-2 py-2 text-center"
          >
            <bdi
              dir="ltr"
              className="break-words text-[10px] font-black leading-4 text-[#0f172a]"
            >
              {broker.name}
            </bdi>
          </div>
        ))}
      </div>

      {/* Mobile FAQs */}
      <div className="mt-4 space-y-4">
        {[
          {
            broker: left,
            faqs: (
              ((left as any).faq_ar || []) as {
                question: string;
                answer: string;
              }[]
            ).slice(0, 3),
          },
          {
            broker: right,
            faqs: (
              ((right as any).faq_ar || []) as {
                question: string;
                answer: string;
              }[]
            ).slice(0, 3),
          },
        ].map(({ broker, faqs }) => (
          <div key={broker.slug}>
            {/* Broker label */}
            <div className="mb-2 flex items-center justify-between gap-2 px-1">
              <h3 className="text-[12px] font-black text-[#0f172a]">
                أسئلة عن{" "}
                <bdi dir="ltr">{broker.name}</bdi>
              </h3>

              <span className="text-[9px] font-bold text-brand-500">
                {faqs.length} أسئلة
              </span>
            </div>

            <div className="space-y-2">
              {faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <details
                    key={`${broker.slug}-mobile-faq-${index}`}
                    className="group overflow-hidden rounded-[17px] border border-[#dbeafe] bg-white shadow-sm open:border-[#93c5fd]"
                  >
                    <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 [&::-webkit-details-marker]:hidden">
                      <h4 className="min-w-0 text-[12px] font-black leading-6 text-[#0f172a]">
                        {faq.question}
                      </h4>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#dbeafe] bg-[#f8fbff] text-[9px] font-black text-brand-500 transition-transform duration-200 group-open:rotate-180">
                        ▼
                      </span>
                    </summary>

                    <div className="border-t border-[#eaf2fc] px-3 py-3">
                      <p className="text-[11px] leading-6 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))
              ) : (
                <div className="rounded-[17px] border border-slate-200 bg-[#fbfdff] px-3 py-4 text-center text-[11px] text-slate-500">
                  لا توجد أسئلة متاحة حاليًا.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile note */}
      <div className="mt-4 rounded-[17px] border border-[#dbeafe] bg-[#f8fbff] px-3 py-3 text-center">
        <p className="text-[10px] leading-5 text-slate-500">
          قد تختلف الشروط حسب الدولة والكيان التنظيمي، لذلك راجع
          تفاصيل الحساب قبل التسجيل.
        </p>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}