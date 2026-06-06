import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
  };

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  sort_order: number | null;
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
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `ما الفرق بين ${left.name} و ${right.name}؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `الفرق بين ${left.name} و ${right.name} يظهر في التراخيص، أنواع الحسابات، الحد الأدنى للإيداع، الرسوم، والمنصات المتاحة. هذه الصفحة تعرض مقارنة مباشرة لمساعدة المتداول العربي على اتخاذ قرار أوضح.`,
        },
      },
      {
        "@type": "Question",
        name: `أيهما أفضل للمبتدئين: ${left.name} أم ${right.name}؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `يعتمد ذلك على سهولة الحسابات، الحد الأدنى للإيداع، وتوفر الحساب الإسلامي والدعم المناسب. في هذه المقارنة ستجد ترشيحًا سريعًا يوضح أي الشركتين أنسب للمبتدئين.`,
        },
      },
      {
        "@type": "Question",
        name: `هل ${left.name} و ${right.name} يقدمان حسابات إسلامية؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `توضح المقارنة ما إذا كانت الحسابات الإسلامية متوفرة لدى ${left.name} و ${right.name} وفق البيانات المعروضة في الموقع.`,
        },
      },
      {
        "@type": "Question",
        name: `أيهما أفضل من حيث الحد الأدنى للإيداع: ${left.name} أم ${right.name}؟`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `توضح الصفحة أي الوسيطين يقدم بداية أسهل من حيث الحد الأدنى للإيداع، مع عرض بقية العوامل المهمة مثل المنصات والتراخيص والحسابات.`,
        },
      },
    ],
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
        "مقارنات تفصيلية بين شركات التداول من حيث الحسابات والرسوم والتراخيص والمنصات لمساعدة المتداول العربي على اختيار الوسيط المناسب.",
     alternates: {
  canonical: `${siteUrl}/compare/${slug}`,
  languages: {
    ar: `${siteUrl}/compare/${slug}`,
    en: `${siteUrl}/en/compare/${slug}`,
    "x-default": `${siteUrl}/compare/${slug}`,
  },
},
     openGraph: {
  title: "مقارنة شركات التداول | بروكر العرب",
  description:
    "مقارنات تفصيلية بين شركات التداول من حيث الحسابات والرسوم والتراخيص والمنصات.",
  url: `${siteUrl}/compare`,
  siteName: "Broker Al Arab",
  locale: "ar_AR",
  type: "website",
},

twitter: {
  card: "summary",
  title: "مقارنة شركات التداول | بروكر العرب",
  description:
    "مقارنات تفصيلية بين شركات التداول من حيث الحسابات والرسوم والتراخيص والمنصات.",
},
    };
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("name, slug")
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
      siteName: "Broker Al Arab",
      locale: "ar_AR",
      type: "article",
     
    },
   twitter: {
  card: "summary",
  title,
  description,
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
          ? "border-[#bfdbfe] bg-[#f8fbff]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black sm:text-3xl">{name}</h2>
            {isWinner ? (
              <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-[11px] font-extrabold text-[#1d4ed8]">
                الأفضل إجمالًا
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-600">{reason}</p>
        </div>

        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8] sm:h-20 sm:w-20">
          <span className="text-xl font-black sm:text-2xl">
            {broker.rating?.toFixed(1) ?? "—"}
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
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
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
          {account.account_name || "حساب"}
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#1d4ed8]">
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

        <div className="mt-2 inline-flex rounded-full border border-[#bfdbfe] bg-white px-3 py-1.5 text-[11px] font-black text-[#2563eb]">
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

  const overallWinner = getHigherRatingLabel(left, right);
  const beginnerWinner = getBeginnerWinner(left, right);
  const scalpingWinner = getScalpingWinner(left, right);
  const depositWinner = getBetterValueLabel(left, right);
  const safetyWinner = getSafetyWinner(left, right);
  const siteUrl = "https://brokeralarab.com";
  const pageUrl = `${siteUrl}/compare/${slug}`;
  const shareTitle = `مقارنة ${left.name} و ${right.name} | بروكر العرب`;

  const faqJsonLd = buildFaqJsonLd(left, right);

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `مقارنة ${left.name} و ${right.name}`,
    url: `https://brokeralarab.com/compare/${slug}`,
    description: `مقارنة شاملة بين ${left.name} و ${right.name} من حيث الحسابات والرسوم والتراخيص والمنصات والحد الأدنى للإيداع لمعرفة أيهما أنسب للمتداول العربي.`,
    mainEntity: {
      "@type": "ItemList",
      name: `${left.name} vs ${right.name}`,
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: left.name,
          url: `https://brokeralarab.com/brokers/${left.slug}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: right.name,
          url: `https://brokeralarab.com/brokers/${right.slug}`,
        },
      ],
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
      leftValue: `${left.rating?.toFixed(1) ?? "—"} / 5`,
      rightValue: `${right.rating?.toFixed(1) ?? "—"} / 5`,
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
    <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#2563eb]/10 blur-3xl" />
    <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[#60a5fa]/10 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
   {/* Top intro - Desktop only */}
<div className="mb-5 hidden md:block">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white px-8 py-8 shadow-[0_18px_55px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />
    <div className="pointer-events-none absolute left-0 top-0 h-full w-[38%] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_55%)]" />

    <div className="relative">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dbeafe] bg-[#f8fbff] px-4 py-2 text-xs font-extrabold text-[#2563eb]">
        <span>المقارنات</span>
        <span className="text-slate-300">/</span>
        <span>{left.name} vs {right.name}</span>
      </div>

      <h1 className="max-w-6xl text-[42px] font-black leading-[1.2] tracking-[-0.5px] text-[#0f172a] xl:text-[48px]">
  مقارنة بين {left.name} و{right.name}: أيهما أفضل؟
</h1>

      <p className="mt-4 max-w-6xl text-base leading-8 text-slate-600 xl:text-lg xl:leading-9">
        مقارنة شاملة بين <strong>{left.name}</strong> و{" "}
        <strong>{right.name}</strong> لمعرفة الفرق في السبريد، الرسوم،
        التراخيص، الحساب الإسلامي، منصات التداول، طرق الإيداع والسحب،
        وأنواع الحسابات، مع توضيح أيهما أفضل للمبتدئين والمتداولين العرب.
      </p>

      <div className="mt-7 grid max-w-6xl grid-cols-3 gap-4">
        <div className="rounded-[22px] border border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-5 py-4 shadow-sm">
          <div className="text-xs font-black text-[#2563eb]">الفائز السريع</div>
          <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
            {overallWinner}
          </div>
          <div className="mt-1 text-xs font-bold text-slate-500">
            أفضل تقييم عام في المقارنة
          </div>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-xs font-black text-slate-500">الأفضل للمبتدئين</div>
          <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
            {beginnerWinner}
          </div>
          <div className="mt-1 text-xs font-bold text-slate-500">
            حسب سهولة البداية والحسابات
          </div>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-xs font-black text-slate-500">الأفضل للسبريد</div>
          <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
            {scalpingWinner}
          </div>
          <div className="mt-1 text-xs font-bold text-slate-500">
            مناسب أكثر للتكلفة والتنفيذ
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
            <div className="absolute left-4 top-4 rounded-full bg-[#2563eb] px-3 py-1 text-[11px] font-black text-white shadow-sm">
              الأفضل إجمالًا
            </div>
          </>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-3xl font-black text-[#0f172a]">
              {right.name}
            </h2>
            <p className="mt-2 text-sm font-bold text-[#2563eb]">
              {cleanText(right.best_for) || "مناسب لفئات متعددة"}
            </p>
          </div>

          <div className="flex h-[76px] w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#2563eb] shadow-sm">
            <span className="text-2xl font-black">
              {right.rating?.toFixed(1) ?? "—"}
            </span>
            <span className="text-[10px] font-bold">من 5</span>
          </div>
        </div>

        <div className="mt-6 flex h-[138px] items-center justify-center rounded-[26px] border border-slate-200 bg-[#fbfdff] p-6">
          {right.logo ? (
            <img
              src={right.logo}
              alt={right.name || "Broker logo"}
              className="h-[96px] w-full object-contain"
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
              <div className="text-xs font-black text-slate-500">رأي بروكر العرب</div>
              <div className="mt-1 text-sm font-medium leading-6 text-[#0f172a]">
                {right.expert_insight_ar}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`/go/${right.slug ?? ""}?type=real`}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-black text-white transition hover:bg-[#1d4ed8]"
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
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-2xl font-black text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
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
            <div className="absolute left-4 top-4 rounded-full bg-[#2563eb] px-3 py-1 text-[11px] font-black text-white shadow-sm">
              الأفضل إجمالًا
            </div>
          </>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-3xl font-black text-[#0f172a]">
              {left.name}
            </h2>
            <p className="mt-2 text-sm font-bold text-[#2563eb]">
              {cleanText(left.best_for) || "مناسب لفئات متعددة"}
            </p>
          </div>

          <div className="flex h-[76px] w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#2563eb] shadow-sm">
            <span className="text-2xl font-black">
              {left.rating?.toFixed(1) ?? "—"}
            </span>
            <span className="text-[10px] font-bold">من 5</span>
          </div>
        </div>

        <div className="mt-6 flex h-[138px] items-center justify-center rounded-[26px] border border-slate-200 bg-[#fbfdff] p-6">
          {left.logo ? (
            <img
              src={left.logo}
              alt={left.name || "Broker logo"}
              className="h-[96px] w-full object-contain"
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
              <div className="text-xs font-black text-slate-500">رأي بروكر العرب</div>
              <div className="mt-1 text-sm font-medium leading-6 text-[#0f172a]">
                {left.expert_insight_ar}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`/go/${left.slug ?? ""}?type=real`}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-black text-white transition hover:bg-[#1d4ed8]"
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

  {/* Mobile version */}
<div className="md:hidden">
  <div className="overflow-hidden rounded-[30px] border border-[#dbeafe] bg-white shadow-[0_20px_60px_rgba(37,99,235,0.08)]">
    {/* Mobile Hero */}
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-4 pb-4 pt-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-[#2563eb]" />

      <div className="inline-flex rounded-full border border-[#bfdbfe] bg-white px-3 py-1 text-[11px] font-black text-[#2563eb]">
        مقارنة شركات التداول
      </div>

      <h1 className="mt-3 text-[27px] font-black leading-[1.25] tracking-[-0.3px] text-[#0f172a]">
        مقارنة {left.name} و {right.name}: أيهما أفضل؟
      </h1>

      <p className="mt-2 text-sm leading-7 text-slate-600">
        مقارنة مختصرة بين {left.name} و {right.name} من حيث التقييم، الإيداع،
        الحساب الإسلامي، المنصات، والسبريد.
      </p>

      <div className="mt-4 rounded-[22px] border border-[#bfdbfe] bg-white p-4 shadow-sm">
        <div className="text-[11px] font-black text-[#2563eb]">
          الترشيح السريع
        </div>

        <div className="mt-1 text-2xl font-black text-[#0f172a]">
          {overallWinner}
        </div>

        <p className="mt-1 text-xs leading-6 text-slate-600">
          الأفضل إجمالًا بناءً على التقييم، سهولة الاستخدام، الرسوم وسهولة فتح الحساب.
        </p>
      </div>
    </div>

    {/* Quick summary */}
    <div className="grid grid-cols-3 gap-2 border-y border-[#dbeafe] bg-[#f8fbff] p-3">
      <div className="rounded-2xl bg-white px-2 py-2.5 text-center shadow-sm">
        <div className="text-[10px] font-bold text-slate-500">إجمالًا</div>
        <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
          {overallWinner}
        </div>
      </div>

      <div className="rounded-2xl bg-white px-2 py-2.5 text-center shadow-sm">
        <div className="text-[10px] font-bold text-slate-500">للمبتدئين</div>
        <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
          {beginnerWinner}
        </div>
      </div>

      <div className="rounded-2xl bg-white px-2 py-2.5 text-center shadow-sm">
        <div className="text-[10px] font-bold text-slate-500">للسبريد</div>
        <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
          {scalpingWinner}
        </div>
      </div>
    </div>

    {/* Broker cards */}
    <div className="space-y-3 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4">
      {[left, right].map((broker) => {
        const isWinner = overallWinner === broker.name;

        return (
          <div
            key={broker.slug}
            className={`rounded-[28px] border p-3 ${
              isWinner
                ? "border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_14px_35px_rgba(37,99,235,0.14)]"
                : "border-slate-200 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.05)]"
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                {isWinner && (
                  <div className="mb-1.5 inline-flex rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-black text-white shadow-sm">
                    الأفضل إجمالًا
                  </div>
                )}

                <h2 className="truncate text-2xl font-black leading-tight text-[#0f172a]">
                  {broker.name}
                </h2>

                <p className="mt-1 line-clamp-1 text-xs font-bold text-[#2563eb]">
                  {cleanText(broker.best_for) || "مناسب لفئات متعددة"}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#2563eb] shadow-sm">
                <span className="text-lg font-black">
                  {broker.rating?.toFixed(1) ?? "—"}
                </span>
                <span className="text-[10px] font-bold">من 5</span>
              </div>
            </div>

            <div className="flex h-[82px] items-center justify-center rounded-[22px] border border-slate-200 bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              {broker.logo ? (
                <img
                  src={broker.logo}
                  alt={broker.name || "Broker logo"}
                  className="h-[58px] w-full object-contain"
                />
              ) : (
                <div className="text-base font-black text-slate-300">
                  {broker.name}
                </div>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                <div className="text-[10px] font-bold text-slate-500">
                  الحد الأدنى للإيداع
                </div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">
                  {money(broker.min_deposit)}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                <div className="text-[10px] font-bold text-slate-500">
                  الحساب الإسلامي
                </div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">
                  {yesNoArabic(broker.islamic_account)}
                </div>
              </div>
            </div>

            <div className="mt-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
              <div className="text-[10px] font-bold text-slate-500">
                منصات التداول
              </div>
              <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
                {shortPlatforms(broker.platforms)}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={`/go/${broker.slug ?? ""}?type=real`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-2.5 text-sm font-black text-white shadow-sm transition active:scale-[0.98]"
              >
                ابدأ الآن
              </a>

              <Link
                href={`/brokers/${broker.slug ?? ""}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-800 transition active:scale-[0.98]"
              >
                التقييم
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
</div>
</section>

<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_22px_65px_rgba(37,99,235,0.08)]">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop version */}
    <div className="hidden p-6 lg:block lg:p-8">
      <div className="max-w-5xl">
        <span className="text-sm font-black text-[#2563eb]">الحكم النهائي</span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          من الأفضل بين {left.name} و {right.name}؟
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          هذه خلاصة سريعة تساعدك على اختيار الوسيط الأنسب حسب أسلوبك في التداول،
          سواء كنت مبتدئًا أو تبحث عن أقل تكلفة أو أفضل أداء عام.
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative overflow-hidden rounded-[26px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_16px_40px_rgba(37,99,235,0.14)]">
          <div className="absolute left-4 top-4 rounded-full bg-[#2563eb] px-3 py-1 text-[11px] font-black text-white">
            الفائز
          </div>
          <div className="text-xs font-black text-[#2563eb]">الأفضل إجمالًا</div>
          <div className="mt-3 truncate text-3xl font-black text-[#0f172a]">
            {overallWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            أفضل توازن بين التقييم، الرسوم، الثقة وسهولة الاستخدام.
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-black text-slate-500">الأفضل للمبتدئين</div>
          <div className="mt-3 truncate text-3xl font-black text-[#0f172a]">
            {beginnerWinner === "تعادل" ? "خياران متقاربان" : beginnerWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            مناسب لمن يريد بداية سهلة وحسابات واضحة.
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-black text-slate-500">الأفضل للسبريد</div>
          <div className="mt-3 truncate text-3xl font-black text-[#0f172a]">
            {scalpingWinner === "تعادل" ? "خياران متقاربان" : scalpingWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            خيار أفضل لمن يهتم بتقليل التكاليف والتنفيذ السريع.
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-black text-slate-500">الأفضل للإيداع</div>
          <div className="mt-3 truncate text-3xl font-black text-[#0f172a]">
            {depositWinner === "تعادل" ? "خياران متقاربان" : depositWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            مناسب لمن يريد دخول السوق بأقل تكلفة ممكنة.
          </p>
        </div>
      </div>

      <div className="mt-7 rounded-[28px] border border-[#dbeafe] bg-[#f8fbff] p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <div className="text-sm font-black text-[#2563eb]">الخلاصة السريعة</div>
            <p className="mt-2 text-sm leading-8 text-slate-700 lg:text-base">
              إذا كنت تبحث عن أفضل وسيط بشكل عام من حيث التقييم والثقة وسهولة
              الاستخدام، فإن <strong>{overallWinner}</strong> هو الخيار الأقوى.
              للمبتدئين، كلا الخيارين مناسب، لكن <strong>{beginnerWinner}</strong>{" "}
              يوفر بداية أسهل. أما إذا كان تركيزك على تقليل التكاليف وسرعة التنفيذ،
              فإن <strong>{scalpingWinner}</strong> هو الأنسب.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={`/go/${left.slug ?? ""}?type=real`}
              className={`inline-flex min-h-[50px] items-center justify-center rounded-2xl px-6 py-3 text-sm font-black transition ${
                overallWinner === left.name
                  ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              افتح حساب مع {left.name}
            </a>

            <a
              href={`/go/${right.slug ?? ""}?type=real`}
              className={`inline-flex min-h-[50px] items-center justify-center rounded-2xl px-6 py-3 text-sm font-black transition ${
                overallWinner === right.name
                  ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              افتح حساب مع {right.name}
            </a>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          فتح الحساب يتم عبر الموقع الرسمي للوسيط.
        </p>
      </div>
    </div>

   {/* Mobile version */}
<div className="block p-4 lg:hidden">
  <div className="mb-4">
    <span className="text-xs font-black text-[#2563eb]">الحكم النهائي</span>

    <h2 className="mt-2 text-[26px] font-black leading-[1.25] text-[#0f172a]">
      من الأفضل بين {left.name} و {right.name}؟
    </h2>

    <p className="mt-2 text-sm leading-7 text-slate-600">
      خلاصة مختصرة تساعدك على اختيار الوسيط الأنسب حسب هدفك.
    </p>
  </div>

  <div className="rounded-[26px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-[0_14px_35px_rgba(37,99,235,0.14)]">
    <div className="inline-flex rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-black text-white">
      الفائز إجمالًا
    </div>

    <div className="mt-3 text-3xl font-black text-[#0f172a]">
      {overallWinner}
    </div>

    <p className="mt-2 text-sm leading-7 text-slate-600">
      أفضل توازن بين التقييم، الرسوم، الثقة، وسهولة الاستخدام.
    </p>
  </div>

  <div className="mt-3 grid grid-cols-3 gap-2">
    <div className="rounded-2xl border border-slate-200 bg-white px-2 py-3 text-center shadow-sm">
      <div className="text-[10px] font-bold text-slate-500">للمبتدئين</div>
      <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
        {beginnerWinner === "تعادل" ? "متقارب" : beginnerWinner}
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white px-2 py-3 text-center shadow-sm">
      <div className="text-[10px] font-bold text-slate-500">للسبريد</div>
      <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
        {scalpingWinner === "تعادل" ? "متقارب" : scalpingWinner}
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white px-2 py-3 text-center shadow-sm">
      <div className="text-[10px] font-bold text-slate-500">للإيداع</div>
      <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
        {depositWinner === "تعادل" ? "متقارب" : depositWinner}
      </div>
    </div>
  </div>

  <div className="mt-4 rounded-[24px] border border-[#dbeafe] bg-[#f8fbff] p-4">
    <div className="text-xs font-black text-[#2563eb]">الخلاصة السريعة</div>

    <p className="mt-2 text-sm leading-7 text-slate-700">
      إذا كنت تريد الخيار الأقوى إجمالًا فاختيار{" "}
      <strong>{overallWinner}</strong> هو الأنسب. أما للمبتدئين فالأقرب هو{" "}
      <strong>{beginnerWinner === "تعادل" ? "كلا الوسيطين" : beginnerWinner}</strong>
      ، ولتقليل التكلفة والسبريد فالأقرب هو{" "}
      <strong>{scalpingWinner === "تعادل" ? "الخيار الأقل تكلفة حسب نوع الحساب" : scalpingWinner}</strong>.
    </p>
  </div>

  <div className="mt-4 grid gap-2">
    <a
      href={`/go/${overallWinner === left.name ? left.slug ?? "" : right.slug ?? ""}?type=real`}
      className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-black text-white shadow-sm"
    >
      افتح حساب مع {overallWinner}
    </a>

    <Link
      href={`/brokers/${overallWinner === left.name ? left.slug ?? "" : right.slug ?? ""}`}
      className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800"
    >
      اقرأ تقييم {overallWinner}
    </Link>
  </div>

  <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
    فتح الحساب يتم عبر الموقع الرسمي للوسيط.
  </p>
</div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop version - unchanged */}
    <div className="hidden p-6 md:block lg:p-8">
      <div className="max-w-5xl">
        <span className="text-sm font-black text-[#2563eb]">تحليل النقاط</span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          تحليل نقاط القوة بين {left.name} و {right.name}
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          مقارنة مرئية مختصرة توضح أين يتفوق كل وسيط في الأمان، الرسوم،
          المنصات، الإيداع والسحب، والدعم.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-4 py-2 text-sm font-black text-[#2563eb]">
          الأفضل إجمالًا: {overallWinner}
        </span>
        <span className="rounded-full border border-slate-200 bg-gradient-to-b from-[#eff6ff] to-white px-4 py-2 text-sm font-black text-slate-600">
          الأفضل للمبتدئين: {beginnerWinner === "تعادل" ? "متقارب" : beginnerWinner}
        </span>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {[
          {
            label: "الأمان والثقة",
            leftScore: left.score_safety ?? 0,
            rightScore: right.score_safety ?? 0,
            note: "يعكس قوة التراخيص وحماية أموال العملاء.",
          },
          {
            label: "الرسوم والتكاليف",
            leftScore: left.score_fees ?? 0,
            rightScore: right.score_fees ?? 0,
            note: "يقيس تكلفة التداول والسبريد والرسوم العامة.",
          },
          {
            label: "منصات التداول",
            leftScore: left.score_platforms ?? 0,
            rightScore: right.score_platforms ?? 0,
            note: "يعتمد على جودة المنصات وتنوع أدوات التداول.",
          },
          {
            label: "الإيداع والسحب",
            leftScore: left.score_deposit ?? 0,
            rightScore: right.score_deposit ?? 0,
            note: "يركز على سهولة التمويل وسرعة السحب.",
          },
          {
            label: "الدعم وخدمة العملاء",
            leftScore: left.score_support ?? 0,
            rightScore: right.score_support ?? 0,
            note: "يقارن جودة الدعم ووضوح تجربة المستخدم.",
          },
        ].map((item) => {
          const winner =
            item.leftScore > item.rightScore
              ? left.name
              : item.rightScore > item.leftScore
              ? right.name
              : "تعادل";

          const diff = Math.abs(item.leftScore - item.rightScore);
          const isClose = diff < 0.3;

          return (
            <div
              key={item.label}
              className={`rounded-[28px] border border-slate-200 bg-[#f8fbff] p-5 shadow-sm ${
                item.label === "الدعم وخدمة العملاء" ? "lg:col-span-2" : ""
              }`}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.note}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-4 py-1.5 text-[12px] font-black shadow-sm ${
                    winner !== "تعادل" && !isClose
                      ? "border border-[#bfdbfe] bg-white text-[#2563eb]"
                      : "border border-slate-200 bg-slate-50 text-slate-500"
                  }`}
                >
                  {winner === "تعادل"
                    ? "متقارب"
                    : diff < 0.2
                    ? "متقارب"
                    : diff < 0.5
                    ? "فارق بسيط"
                    : `يتفوق: ${winner}`}
                </span>
              </div>

              <div className="grid gap-3">
                <div
                  className={`rounded-2xl border px-4 py-3 ${
                    winner === left.name && !isClose
                      ? "border-[#2563eb] bg-white shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-black text-[#0f172a]">{left.name}</span>
                    <span className="text-xl font-black text-[#2563eb]">
                      {item.leftScore.toFixed(1)}
                      <span className="text-xs text-slate-400"> / 5</span>
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#2563eb]/70"
                      style={{ width: `${Math.min(item.leftScore * 20, 100)}%` }}
                    />
                  </div>
                </div>

                <div
                  className={`rounded-2xl border px-4 py-3 ${
                    winner === right.name && !isClose
                      ? "border-[#2563eb] bg-white shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-black text-[#0f172a]">{right.name}</span>
                    <span className="text-xl font-black text-[#2563eb]">
                      {item.rightScore.toFixed(1)}
                      <span className="text-xs text-slate-400"> / 5</span>
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#2563eb]/70"
                      style={{ width: `${Math.min(item.rightScore * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[26px] border border-[#dbeafe] bg-[#f8fbff] p-5">
        <p className="text-sm leading-7 text-slate-600 lg:text-base">
          هذه النقاط لا تعني أن وسيطًا واحدًا هو الأفضل للجميع، لكنها تساعدك على
          معرفة أين يتفوق كل وسيط حسب أولويتك: الأمان، التكلفة، المنصات، السحب
          والإيداع، أو الدعم.
        </p>
      </div>
    </div>

   {/* ================= MOBILE ================= */}
    <div className="block p-4 md:hidden">

      {/* Header */}
      <div>
        <span className="text-xs font-black text-[#2563eb]">
          تحليل النقاط
        </span>

        <h2 className="mt-2 text-[26px] font-black leading-[1.25] text-[#0f172a]">
          أين يتفوق كل وسيط؟
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          ملخص سريع يساعدك تختار الوسيط المناسب.
        </p>
      </div>

      {/* Table Compact */}
      <div className="mt-4 overflow-hidden rounded-[24px] border border-[#dbeafe]">

        {[
          {
            label: "الأمان",
            leftScore: left.score_safety ?? 0,
            rightScore: right.score_safety ?? 0,
          },
          {
            label: "الرسوم",
            leftScore: left.score_fees ?? 0,
            rightScore: right.score_fees ?? 0,
          },
          {
            label: "المنصات",
            leftScore: left.score_platforms ?? 0,
            rightScore: right.score_platforms ?? 0,
          },
          {
            label: "السحب",
            leftScore: left.score_deposit ?? 0,
            rightScore: right.score_deposit ?? 0,
          },
          {
            label: "الدعم",
            leftScore: left.score_support ?? 0,
            rightScore: right.score_support ?? 0,
          },
        ].map((item, index) => {
          const winner =
            item.leftScore > item.rightScore
              ? left.name
              : item.rightScore > item.leftScore
              ? right.name
              : "متقارب";

          const diff = Math.abs(item.leftScore - item.rightScore);
          const isClose = diff < 0.3;

          const bestScore = Math.max(item.leftScore, item.rightScore);

          return (
            <div
              key={item.label}
              className={`px-4 py-4 ${
                index !== 4 ? "border-b border-[#dbeafe]" : ""
              } ${index % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"}`}
            >
              {/* Title */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-[#0f172a]">
                  {item.label}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black ${
                    isClose
                      ? "bg-slate-100 text-slate-500"
                      : "bg-[#eff6ff] text-[#2563eb]"
                  }`}
                >
                  {isClose ? "متقارب" : winner}
                </span>
              </div>

              {/* Scores */}
              <div className="mt-3 grid gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-600">
                    {left.name}
                  </span>
                  <span className="font-black text-[#2563eb]">
                    {item.leftScore.toFixed(1)} / 5
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-600">
                    {right.name}
                  </span>
                  <span className="font-black text-[#2563eb]">
                    {item.rightScore.toFixed(1)} / 5
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#2563eb]"
                  style={{
                    width: `${Math.min(bestScore * 20, 100)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 rounded-[20px] border border-[#dbeafe] bg-[#f8fbff] p-4">
        <p className="text-sm leading-7 text-slate-600">
          استخدم هذه المقارنة لتحديد الأفضل حسب أولويتك: الأمان،
          الرسوم، المنصات، سرعة السحب أو الدعم.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop version */}
    <div className="hidden p-6 md:block lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <span className="text-sm font-black text-[#2563eb]">
            الحسابات وتكلفة التداول
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
            مقارنة الحسابات والرسوم بين {left.name} و {right.name}
          </h2>

          <p className="mt-3 text-base leading-8 text-slate-600">
            نلخص هنا أهم عناصر التكلفة عند اختيار الحساب: الحد الأدنى للإيداع،
            متوسط السبريد، العمولات، وطريقة تنفيذ الأوامر.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
          <div className="text-xs font-black text-[#2563eb]">الخلاصة السريعة</div>
          <div className="mt-2 text-3xl font-black text-[#0f172a]">
            {scalpingWinner === "تعادل" ? "التكلفة متقاربة" : scalpingWinner}
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {scalpingWinner === "تعادل"
              ? "لا يظهر فرق حاسم في التكلفة من البيانات الحالية، لذلك نوع الحساب هو العامل الأهم."
              : `${scalpingWinner} يبدو أقوى من ناحية التكلفة أو السبريد حسب البيانات المتاحة.`}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
          <div className="text-xs font-black text-slate-500">عدد الحسابات المتاحة</div>
          <div className="mt-3 flex items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold text-[#2563eb]">{left.name}</div>
              <div className="text-3xl font-black text-[#0f172a]">
                {leftAccounts.length}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-[#2563eb]">{right.name}</div>
              <div className="text-3xl font-black text-[#0f172a]">
                {rightAccounts.length}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
          <div className="text-xs font-black text-slate-500">الأفضل للمبتدئين</div>
          <div className="mt-3 text-2xl font-black text-[#0f172a]">
            {beginnerWinner === "تعادل" ? "متقارب" : beginnerWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            حسب سهولة البداية، الحد الأدنى للإيداع، ووضوح الحسابات.
          </p>
        </div>

        <div className="rounded-[24px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5">
          <div className="text-xs font-black text-[#2563eb]">مهم قبل الاختيار</div>
          <div className="mt-3 text-lg font-black leading-7 text-[#0f172a]">
            الحساب المناسب أهم من عدد الحسابات.
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-[#fbfdff]">
        <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-200 bg-[#f8fbff] text-sm font-black text-[#0f172a]">
          <div className="p-4 text-right">مقارنة العوامل الأساسية</div>
          <div className="border-x border-slate-200 p-4 text-center">{left.name}</div>
          <div className="p-4 text-center">{right.name}</div>
        </div>

        {[
          {
            label: "نوع الحساب الأساسي",
            leftValue: leftAccounts[0]?.account_name || "غير محدد",
            rightValue: rightAccounts[0]?.account_name || "غير محدد",
          },
          {
            label: "الحد الأدنى للإيداع",
            leftValue:
              leftAccounts.find((a) => cleanText(a.min_deposit))?.min_deposit ||
              money(left.min_deposit),
            rightValue:
              rightAccounts.find((a) => cleanText(a.min_deposit))?.min_deposit ||
              money(right.min_deposit),
          },
          {
            label: "متوسط السبريد",
            leftValue:
              leftAccounts.find((a) => cleanText(a.spread))?.spread ||
              cleanText(left.spreads) ||
              "غير محدد",
            rightValue:
              rightAccounts.find((a) => cleanText(a.spread))?.spread ||
              cleanText(right.spreads) ||
              "غير محدد",
          },
          {
            label: "العمولات على التداول",
            leftValue:
              leftAccounts.find((a) => cleanText(a.commission))?.commission ||
              cleanText(left.fees) ||
              "غير محدد",
            rightValue:
              rightAccounts.find((a) => cleanText(a.commission))?.commission ||
              cleanText(right.fees) ||
              "غير محدد",
          },
          {
            label: "طريقة تنفيذ الأوامر",
            leftValue:
              leftAccounts.find((a) => cleanText(a.execution_type))?.execution_type ||
              "غير محدد",
            rightValue:
              rightAccounts.find((a) => cleanText(a.execution_type))?.execution_type ||
              "غير محدد",
          },
        ].map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-200 last:border-b-0"
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

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        {[left, right].map((broker) => {
          const brokerAccounts = broker.id === left.id ? leftAccounts : rightAccounts;

          return (
            <details
              key={broker.slug}
              className="group rounded-[28px] border border-slate-200 bg-[#f8fbff] p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-[#0f172a]">
                    حسابات {broker.name}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-[#2563eb]">
                    {brokerAccounts.length} حساب متاح
                  </p>
                </div>

                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-500 transition group-open:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="mt-5 grid gap-4">
                {brokerAccounts.length > 0 ? (
                  brokerAccounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-4">
                        <h4 className="text-lg font-black text-[#0f172a]">
                          {acc.account_name || "حساب"}
                        </h4>
                        <p className="mt-1 text-xs font-bold text-[#2563eb]">
                          {acc.best_for || "مناسب لفئات متعددة"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">السبريد</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {acc.spread || "غير محدد"}
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">العمولة</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {acc.commission || "غير محدد"}
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">الإيداع</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {acc.min_deposit || "غير محدد"}
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">التنفيذ</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {acc.execution_type || "غير محدد"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    لا توجد بيانات حسابات حاليًا.
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>

      <div className="mt-6 rounded-[28px] border border-[#2563eb]/20 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-6 shadow-[0_20px_50px_rgba(37,99,235,0.08)] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-black text-[#0f172a] sm:text-2xl">
              ابدأ التداول الآن مع الوسيط المناسب لك
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              بعد مراجعة الحسابات والتكاليف، يمكنك فتح حسابك مباشرة مع الوسيط الأنسب لك بسهولة خلال دقائق.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
         <a
  href={`/go/${left.slug ?? ""}?type=real`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-7 py-3 text-sm font-extrabold text-white shadow-md transition hover:scale-[1.02] hover:bg-[#1d4ed8]"
>
  فتح حساب {left.name}
</a>

<a
  href={`/go/${right.slug ?? ""}?type=real`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
>
  فتح حساب {right.name}
</a>
          </div>
        </div>
      </div>

      <div className="mt-7 rounded-[26px] border border-[#dbeafe] bg-[#f8fbff] p-5">
        <p className="text-sm leading-7 text-slate-600 lg:text-base">
          هذا القسم يلخص تكلفة التداول بطريقة عملية. عدد الحسابات وحده لا يكفي
          للحكم على الوسيط؛ الأهم هو اختيار الحساب الذي يناسبك من حيث السبريد،
          العمولة، الحد الأدنى للإيداع، وطريقة التنفيذ.
        </p>
      </div>
    </div>

    {/* Mobile version */}
<div className="block p-4 md:hidden">
  <div>
    <span className="text-xs font-black text-[#2563eb]">
      الحسابات وتكلفة التداول
    </span>

    <h2 className="mt-2 text-[26px] font-black leading-[1.25] text-[#0f172a]">
      مقارنة الحسابات والرسوم
    </h2>

    <p className="mt-2 text-sm leading-7 text-slate-600">
      ملخص سريع لأهم عوامل التكلفة بين {left.name} و {right.name}.
    </p>
  </div>

  <div className="mt-4 rounded-[24px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-[0_12px_28px_rgba(37,99,235,0.12)]">
    <div className="text-[11px] font-black text-[#2563eb]">
      الخلاصة السريعة
    </div>

    <div className="mt-1 text-2xl font-black text-[#0f172a]">
      {scalpingWinner === "تعادل" ? "التكلفة متقاربة" : scalpingWinner}
    </div>

    <p className="mt-1 text-xs leading-6 text-slate-600">
      {scalpingWinner === "تعادل"
        ? "لا يظهر فرق حاسم في التكلفة؛ نوع الحساب هو العامل الأهم."
        : `${scalpingWinner} يبدو أقوى من ناحية التكلفة أو السبريد.`}
    </p>
  </div>

  <div className="mt-4 grid grid-cols-3 gap-2">
    <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] px-2 py-3 text-center">
      <div className="text-[10px] font-bold text-slate-500">
        حسابات {left.name}
      </div>
      <div className="mt-1 text-xl font-black text-[#0f172a]">
        {leftAccounts.length}
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] px-2 py-3 text-center">
      <div className="text-[10px] font-bold text-slate-500">
        حسابات {right.name}
      </div>
      <div className="mt-1 text-xl font-black text-[#0f172a]">
        {rightAccounts.length}
      </div>
    </div>

    <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] px-2 py-3 text-center">
      <div className="text-[10px] font-bold text-[#2563eb]">للمبتدئين</div>
      <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
        {beginnerWinner === "تعادل" ? "متقارب" : beginnerWinner}
      </div>
    </div>
  </div>

  <div className="mt-4 overflow-hidden rounded-[24px] border border-[#dbeafe]">
    <div className="grid grid-cols-[1.15fr_1fr_1fr] bg-[#f8fbff] text-[11px] font-black text-[#0f172a]">
      <div className="p-3 text-right">العامل</div>
      <div className="border-x border-[#dbeafe] p-3 text-center">
        {left.name}
      </div>
      <div className="p-3 text-center">{right.name}</div>
    </div>

    {[
      {
        label: "الحساب الأساسي",
        leftValue: leftAccounts[0]?.account_name || "غير محدد",
        rightValue: rightAccounts[0]?.account_name || "غير محدد",
      },
      {
        label: "أقل إيداع",
        leftValue:
          leftAccounts.find((a) => cleanText(a.min_deposit))?.min_deposit ||
          money(left.min_deposit),
        rightValue:
          rightAccounts.find((a) => cleanText(a.min_deposit))?.min_deposit ||
          money(right.min_deposit),
      },
      {
        label: "السبريد",
        leftValue:
          leftAccounts.find((a) => cleanText(a.spread))?.spread ||
          cleanText(left.spreads) ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) => cleanText(a.spread))?.spread ||
          cleanText(right.spreads) ||
          "غير محدد",
      },
      {
        label: "العمولة",
        leftValue:
          leftAccounts.find((a) => cleanText(a.commission))?.commission ||
          cleanText(left.fees) ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) => cleanText(a.commission))?.commission ||
          cleanText(right.fees) ||
          "غير محدد",
      },
      {
        label: "التنفيذ",
        leftValue:
          leftAccounts.find((a) => cleanText(a.execution_type))?.execution_type ||
          "غير محدد",
        rightValue:
          rightAccounts.find((a) => cleanText(a.execution_type))?.execution_type ||
          "غير محدد",
      },
    ].map((row) => (
      <div
        key={row.label}
        className="grid grid-cols-[1.15fr_1fr_1fr] border-t border-[#dbeafe] text-[11px]"
      >
        <div className="bg-[#fbfdff] p-3 font-black text-slate-600">
          {row.label}
        </div>

        <div className="border-x border-[#dbeafe] p-3 text-center font-black text-[#0f172a]">
          {row.leftValue}
        </div>

        <div className="p-3 text-center font-black text-[#0f172a]">
          {row.rightValue}
        </div>
      </div>
    ))}
  </div>

  <div className="mt-4 grid gap-3">
    {[left, right].map((broker) => {
      const brokerAccounts = broker.id === left.id ? leftAccounts : rightAccounts;

      return (
        <details
          key={broker.slug}
          className="group rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-[#0f172a]">
                حسابات {broker.name}
              </h3>

              <p className="mt-1 text-xs font-bold text-[#2563eb]">
                {brokerAccounts.length} حساب متاح
              </p>
            </div>

            <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-500 transition group-open:rotate-180">
              ▼
            </span>
          </summary>

          <div className="mt-4 grid gap-3">
            {brokerAccounts.length > 0 ? (
              brokerAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="rounded-[20px] border border-slate-200 bg-white p-4"
                >
                  <div className="text-sm font-black text-[#0f172a]">
                    {acc.account_name || "حساب"}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-[#fbfdff] p-3">
                      <div className="font-bold text-slate-500">السبريد</div>
                      <div className="mt-1 font-black text-[#0f172a]">
                        {acc.spread || "غير محدد"}
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#fbfdff] p-3">
                      <div className="font-bold text-slate-500">العمولة</div>
                      <div className="mt-1 font-black text-[#0f172a]">
                        {acc.commission || "غير محدد"}
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#fbfdff] p-3">
                      <div className="font-bold text-slate-500">الإيداع</div>
                      <div className="mt-1 font-black text-[#0f172a]">
                        {acc.min_deposit || "غير محدد"}
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#fbfdff] p-3">
                      <div className="font-bold text-slate-500">التنفيذ</div>
                      <div className="mt-1 font-black text-[#0f172a]">
                        {acc.execution_type || "غير محدد"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[18px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                لا توجد بيانات حسابات حاليًا.
              </div>
            )}
          </div>
        </details>
      );
    })}
  </div>

  <div className="mt-4 rounded-[24px] border border-[#2563eb]/20 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-4">
    <h3 className="text-lg font-black text-[#0f172a]">
      ابدأ مع الوسيط المناسب لك
    </h3>

    <p className="mt-1 text-xs leading-6 text-slate-600">
      بعد مراجعة الحسابات والتكاليف، اختر الوسيط الأقرب لأسلوبك.
    </p>

    <div className="mt-4 grid gap-2">
      <Link
        href={`/go/${left.slug}`}
        className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-black text-white shadow-sm"
      >
        فتح حساب {left.name}
      </Link>

      <Link
        href={`/go/${right.slug}`}
        className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800"
      >
        فتح حساب {right.name}
      </Link>
    </div>
  </div>

  <div className="mt-4 rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-4">
    <p className="text-sm leading-7 text-slate-600">
      الأهم ليس عدد الحسابات فقط، بل اختيار الحساب الأنسب لك من حيث السبريد،
      العمولة، الحد الأدنى للإيداع، وطريقة التنفيذ.
    </p>
  </div>
</div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop version */}
    <div className="hidden p-6 md:block lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <span className="text-sm font-black text-[#2563eb]">
            الأمان والتراخيص
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
            مقارنة الأمان والتراخيص بين {left.name} و {right.name}
          </h2>

          <p className="mt-3 text-base leading-8 text-slate-600">
            نقارن هنا قوة التراخيص، نقاط الأمان، الحساب الإسلامي، المقر الرئيسي،
            وحماية أموال العملاء حتى تعرف أي وسيط يمنحك ثقة أعلى قبل فتح الحساب.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
          <div className="text-xs font-black text-[#2563eb]">
            الأقوى من حيث الأمان
          </div>

          <div className="mt-2 text-3xl font-black text-[#0f172a]">
            {(left.score_safety ?? 0) > (right.score_safety ?? 0)
              ? left.name
              : (right.score_safety ?? 0) > (left.score_safety ?? 0)
              ? right.name
              : "متقارب"}
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            بناءً على نقاط الأمان وقوة التراخيص والبيانات التنظيمية المتوفرة.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
          <div className="text-xs font-black text-slate-500">نقاط الأمان</div>

          <div className="mt-3 flex items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold text-[#2563eb]">{left.name}</div>
              <div className="text-3xl font-black text-[#0f172a]">
                {(left.score_safety ?? 0).toFixed(1)}
                <span className="text-sm text-slate-400"> / 5</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#2563eb]">{right.name}</div>
              <div className="text-3xl font-black text-[#0f172a]">
                {(right.score_safety ?? 0).toFixed(1)}
                <span className="text-sm text-slate-400"> / 5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
          <div className="text-xs font-black text-slate-500">الحساب الإسلامي</div>
          <div className="mt-3 text-lg font-black leading-7 text-[#0f172a]">
            {left.name}: {yesNoArabic(left.islamic_account)}
            <br />
            {right.name}: {yesNoArabic(right.islamic_account)}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5">
          <div className="text-xs font-black text-[#2563eb]">مهم قبل التسجيل</div>
          <div className="mt-3 text-lg font-black leading-7 text-[#0f172a]">
            تأكد من الكيان التنظيمي الذي ستفتح الحساب تحته.
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {[left, right].map((broker) => {
          const leftSafety = left.score_safety ?? 0;
          const rightSafety = right.score_safety ?? 0;
          const brokerSafety = broker.score_safety ?? 0;
          const maxSafety = Math.max(leftSafety, rightSafety);
          const isSafetyWinner = brokerSafety === maxSafety && maxSafety > 0;

          return (
            <div
              key={broker.slug}
              className={`rounded-[30px] border p-5 shadow-sm ${
                isSafetyWinner
                  ? "border-[#2563eb] bg-gradient-to-b from-[#eff6ff] to-white"
                  : "border-slate-200 bg-[#fbfdff]"
              }`}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2">
                    {broker.logo ? (
                      <img
                        src={broker.logo}
                        alt={broker.name || "Broker logo"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-black text-slate-400">
                        {broker.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#0f172a]">
                      {broker.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-[#2563eb]">
                      الأمان والثقة
                    </p>
                  </div>
                </div>

                {isSafetyWinner && (
                  <span className="rounded-full bg-[#2563eb] px-3 py-1 text-[11px] font-black text-white shadow-sm">
                    أقوى أمانًا
                  </span>
                )}
              </div>

              <div className="grid gap-3">
                <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                  <div className="text-sm font-black text-[#0f172a]">
                    التراخيص والجهات الرقابية
                  </div>
                  <p className="mt-2 text-sm font-black leading-7 text-slate-700">
                    {shortReg(broker.regulation) || "غير محدد"}
                  </p>
                </div>

               <div className="rounded-[22px] border border-slate-200 bg-white p-4">
  <div className="text-sm font-black text-[#0f172a]">
    ملخص قوة التراخيص
  </div>

  <div className="mt-2">
    <ExpandableText
      text={(broker as any).regulation_summary_ar}
      fallback={`وجود جهات رقابية مثل ${
        shortReg(broker.regulation) || "الجهات التنظيمية"
      } يعني أن مستوى الحماية يعتمد على الكيان الذي سيتم فتح الحساب تحته وشروطه التنظيمية.`}
    />
  </div>
</div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                    <div className="text-xs font-black text-slate-500">
                      المقر الرئيسي
                    </div>
                    <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
                      {broker.headquarters || "غير محدد"}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                    <div className="text-xs font-black text-slate-500">
                      الحساب الإسلامي
                    </div>
                    <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
                      {yesNoArabic(broker.islamic_account)}
                    </div>
                  </div>
                </div>

        <div className="rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-4">
  <div className="text-sm font-black text-[#2563eb]">
    حماية أموال العملاء
  </div>

  <p className="mt-2 text-justify text-sm leading-7 text-slate-600">
    {cleanText((broker as any).fund_protection_ar) ||
      "راجع تفاصيل فصل أموال العملاء، حماية الرصيد السلبي، وسياسة التعويض لدى الكيان التنظيمي الذي ستفتح الحساب تحته."}
  </p>
</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-7 rounded-[26px] border border-[#dbeafe] bg-[#f8fbff] p-5">
        <p className="text-sm leading-7 text-slate-600 lg:text-base">
          وجود التراخيص لا يعني أن جميع الحسابات تتمتع بنفس مستوى الحماية. قد تختلف
          الحماية حسب الدولة، الكيان التنظيمي، ونوع الحساب. لذلك من الأفضل دائمًا
          مراجعة الجهة التنظيمية الفعلية قبل فتح الحساب الحقيقي.
        </p>
      </div>
    </div>

    {/* Mobile version */}
    <div className="block p-4 md:hidden">
      <div>
        <span className="text-xs font-black text-[#2563eb]">
          الأمان والتراخيص
        </span>

        <h2 className="mt-2 text-[26px] font-black leading-[1.25] text-[#0f172a]">
          مقارنة الأمان بين {left.name} و {right.name}
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          ملخص سريع لقوة الأمان، التراخيص، الحساب الإسلامي، وحماية أموال العملاء.
        </p>
      </div>

      <div className="mt-4 rounded-[24px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-[0_12px_28px_rgba(37,99,235,0.12)]">
        <div className="text-[11px] font-black text-[#2563eb]">
          الأقوى من حيث الأمان
        </div>

        <div className="mt-1 text-2xl font-black text-[#0f172a]">
          {(left.score_safety ?? 0) > (right.score_safety ?? 0)
            ? left.name
            : (right.score_safety ?? 0) > (left.score_safety ?? 0)
            ? right.name
            : "متقارب"}
        </div>

        <p className="mt-1 text-xs leading-6 text-slate-600">
          بناءً على نقاط الأمان والبيانات التنظيمية المتاحة.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] px-3 py-3 text-center">
          <div className="text-[10px] font-bold text-slate-500">{left.name}</div>
          <div className="mt-1 text-2xl font-black text-[#2563eb]">
            {(left.score_safety ?? 0).toFixed(1)}
            <span className="text-xs text-slate-400"> / 5</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] px-3 py-3 text-center">
          <div className="text-[10px] font-bold text-slate-500">{right.name}</div>
          <div className="mt-1 text-2xl font-black text-[#2563eb]">
            {(right.score_safety ?? 0).toFixed(1)}
            <span className="text-xs text-slate-400"> / 5</span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[18px] border border-slate-200 bg-[#f8fbff] p-3">
          <div className="text-[11px] font-black text-slate-500">
            {left.name}
          </div>
          <div className="mt-1 text-xs font-black text-[#0f172a]">
            إسلامي: {yesNoArabic(left.islamic_account)}
          </div>
        </div>

        <div className="rounded-[18px] border border-slate-200 bg-[#f8fbff] p-3">
          <div className="text-[11px] font-black text-slate-500">
            {right.name}
          </div>
          <div className="mt-1 text-xs font-black text-[#0f172a]">
            إسلامي: {yesNoArabic(right.islamic_account)}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {[left, right].map((broker) => {
          const leftSafety = left.score_safety ?? 0;
          const rightSafety = right.score_safety ?? 0;
          const brokerSafety = broker.score_safety ?? 0;
          const maxSafety = Math.max(leftSafety, rightSafety);
          const isSafetyWinner = brokerSafety === maxSafety && maxSafety > 0;

          return (
            <details
              key={broker.slug}
              className={`group rounded-[24px] border p-4 ${
                isSafetyWinner
                  ? "border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2">
                    {broker.logo ? (
                      <img
                        src={broker.logo}
                        alt={broker.name || "Broker logo"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] font-black text-slate-400">
                        {broker.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-xl font-black text-[#0f172a]">
                      {broker.name}
                    </div>
                    <div className="mt-0.5 text-xs font-bold text-[#2563eb]">
                      {isSafetyWinner ? "أقوى أمانًا" : "الأمان والثقة"}
                    </div>
                  </div>
                </div>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-500 transition group-open:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="mt-4 grid gap-3">
                <div className="rounded-[18px] border border-slate-200 bg-white p-3">
                  <div className="text-[11px] font-black text-slate-500">
                    التراخيص والجهات الرقابية
                  </div>
                  <div className="mt-1 text-xs font-black leading-6 text-[#0f172a]">
                    {shortReg(broker.regulation) || "غير محدد"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-[18px] border border-slate-200 bg-white p-3">
                    <div className="text-[11px] font-black text-slate-500">
                      المقر الرئيسي
                    </div>
                    <div className="mt-1 text-xs font-black leading-6 text-[#0f172a]">
                      {broker.headquarters || "غير محدد"}
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-slate-200 bg-white p-3">
                    <div className="text-[11px] font-black text-slate-500">
                      الحساب الإسلامي
                    </div>
                    <div className="mt-1 text-xs font-black leading-6 text-[#0f172a]">
                      {yesNoArabic(broker.islamic_account)}
                    </div>
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] p-3">
  <div className="text-[11px] font-black text-[#2563eb]">
    ملخص قوة التراخيص
  </div>

  <div className="mt-2">
    <ExpandableText
      text={(broker as any).regulation_summary_ar}
      fallback="تفاصيل الحماية تختلف حسب الكيان التنظيمي ونوع الحساب."
    />
  </div>
</div>

                <div className="rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] p-3">
  <div className="text-[11px] font-black text-[#2563eb]">
    حماية أموال العملاء
  </div>

  <p className="mt-2 text-justify text-xs leading-6 text-slate-600">
    {cleanText((broker as any).fund_protection_ar) ||
      "راجع تفاصيل فصل أموال العملاء وحماية الرصيد السلبي لدى الكيان التنظيمي."}
  </p>
</div>
              </div>
            </details>
          );
        })}
      </div>

      <div className="mt-4 rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-4">
        <p className="text-sm leading-7 text-slate-600">
          تحقق دائمًا من الكيان التنظيمي الذي ستفتح الحساب تحته، لأن مستوى
          الحماية قد يختلف حسب الدولة ونوع الحساب.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white p-6 shadow-[0_25px_70px_rgba(37,99,235,0.08)] lg:p-8">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    <div className="hidden md:grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div>
        <span className="text-sm font-black text-[#2563eb]">اختيار سريع</span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          أي وسيط تختار الآن؟
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          بدل قراءة كل التفاصيل مرة أخرى، هذه خلاصة عملية تساعدك على اختيار
          الوسيط الأنسب حسب هدفك.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
        <div className="text-xs font-black text-[#2563eb]">الترشيح العام</div>
        <div className="mt-2 text-3xl font-black text-[#0f172a]">
          {overallWinner}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          الاختيار الأقوى إجمالًا بناءً على التقييم العام وملخص المقارنة.
        </p>
      </div>
    </div>

    <div className="hidden md:grid mt-8 gap-4 lg:grid-cols-3">
      <div className="rounded-[26px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-sm">
        <div className="text-xs font-black text-[#2563eb]">الأفضل إجمالًا</div>
        <div className="mt-2 text-3xl font-black text-[#0f172a]">
          {overallWinner}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          مناسب إذا كنت تريد اختيارًا متوازنًا بدون الدخول في تفاصيل كثيرة.
        </p>
      </div>

      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5 shadow-sm">
        <div className="text-xs font-black text-slate-500">للمبتدئين</div>
        <div className="mt-2 text-3xl font-black text-[#0f172a]">
          {beginnerWinner === "تعادل" ? "كلاهما مناسب" : beginnerWinner}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          مناسب إذا كانت أولويتك البداية السهلة ووضوح الحسابات.
        </p>
      </div>

      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5 shadow-sm">
        <div className="text-xs font-black text-slate-500">للتكلفة والسبريد</div>
        <div className="mt-2 text-3xl font-black text-[#0f172a]">
          {scalpingWinner === "تعادل" ? "متقارب" : scalpingWinner}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          مناسب إذا كان تركيزك على السبريد، الرسوم، وسرعة التنفيذ.
        </p>
      </div>
    </div>

    <div className="hidden md:block mt-7 rounded-[28px] border border-[#dbeafe] bg-[#f8fbff] p-5 lg:p-6">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="text-sm font-black text-[#2563eb]">القرار المختصر</div>
          <p className="mt-2 text-sm leading-8 text-slate-700 lg:text-base">
            اختر <strong>{overallWinner}</strong> إذا كنت تريد الخيار الأقوى
            إجمالًا. وإذا كنت مبتدئًا، فراجع ترشيح{" "}
            <strong>
              {beginnerWinner === "تعادل" ? "كلا الوسيطين" : beginnerWinner}
            </strong>
            . أما إذا كانت التكلفة والسبريد هي الأولوية، فالأقرب لك هو{" "}
            <strong>
              {scalpingWinner === "تعادل" ? "الخيار الأقل تكلفة حسب نوع الحساب" : scalpingWinner}
            </strong>
            .
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <a
            href={`/go/${
              overallWinner === left.name ? left.slug ?? "" : right.slug ?? ""
            }?type=real`}
            className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-black text-white transition hover:bg-[#1d4ed8]"
          >
            افتح حساب مع {overallWinner}
          </a>

          <Link
            href={`/brokers/${
              overallWinner === left.name ? left.slug ?? "" : right.slug ?? ""
            }`}
            className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            اقرأ تقييم {overallWinner}
          </Link>
        </div>
      </div>
    </div>

    {/* Mobile */}
<div className="mt-5 md:hidden">
  <div className="rounded-[24px] border border-[#dbeafe] bg-[#f8fbff] p-4">
    <span className="text-xs font-black text-[#2563eb]">اختيار سريع</span>

    <h2 className="mt-2 text-[24px] font-black leading-[1.25] text-[#0f172a]">
      أي وسيط تختار الآن؟
    </h2>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      خلاصة عملية لاختيار الوسيط الأنسب حسب هدفك.
    </p>

    <div className="mt-4 rounded-[20px] border border-[#2563eb] bg-white p-4 shadow-sm">
      <div className="text-[11px] font-black text-[#2563eb]">
        الترشيح العام
      </div>

      <div className="mt-1 text-2xl font-black text-[#0f172a]">
        {overallWinner}
      </div>

      <p className="mt-1 text-xs leading-6 text-slate-600">
        الاختيار الأقوى إجمالًا بناءً على ملخص المقارنة.
      </p>
    </div>

    <div className="mt-3 grid grid-cols-2 gap-2">
      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
        <div className="text-[10px] font-bold text-slate-500">للمبتدئين</div>
        <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
          {beginnerWinner === "تعادل" ? "كلاهما مناسب" : beginnerWinner}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
        <div className="text-[10px] font-bold text-slate-500">للتكلفة</div>
        <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
          {scalpingWinner === "تعادل" ? "متقارب" : scalpingWinner}
        </div>
      </div>
    </div>

    <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-white p-3">
      <div className="text-xs font-black text-[#2563eb]">القرار المختصر</div>

      <p className="mt-2 text-sm leading-7 text-slate-700">
        اختر <strong>{overallWinner}</strong> إذا كنت تريد الخيار الأقوى إجمالًا.
        وللبداية السهلة، الأقرب هو{" "}
        <strong>
          {beginnerWinner === "تعادل" ? "كلا الوسيطين" : beginnerWinner}
        </strong>
        .
      </p>
    </div>

    <div className="mt-4 grid gap-2">
      <a
        href={`/go/${
          overallWinner === left.name ? left.slug ?? "" : right.slug ?? ""
        }?type=real`}
        className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-black text-white shadow-sm"
      >
        افتح حساب مع {overallWinner}
      </a>

      <Link
        href={`/brokers/${
          overallWinner === left.name ? left.slug ?? "" : right.slug ?? ""
        }`}
        className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800"
      >
        اقرأ تقييم {overallWinner}
      </Link>
    </div>
  </div>
</div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-2 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop */}
    <div className="hidden p-6 md:block lg:p-8">
      <div className="max-w-4xl">
        <span className="text-sm font-black text-[#2563eb]">الأسئلة الشائعة</span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          أسئلة شائعة عن {left.name} و {right.name}
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          هذه الأسئلة مأخوذة من بيانات تقييم كل وسيط، وتساعدك على فهم أهم النقاط
          قبل فتح الحساب أو اختيار الشركة الأنسب.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 rounded-[20px] border border-[#bfdbfe] bg-[#eff6ff] px-5 py-3">
            <h3 className="text-lg font-black text-[#0f172a]">
              أسئلة عن {left.name}
            </h3>
          </div>

          <div className="space-y-4">
            {(((left as any).faq_ar || []) as { question: string; answer: string }[])
              .slice(0, 3)
              .map((faq, index) => (
                <details
                  key={`left-faq-${index}`}
                  className="group rounded-[24px] border border-slate-200 bg-[#fbfdff] p-5 shadow-sm open:border-[#bfdbfe] open:bg-white"
                >
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4">
                    <h4 className="text-base font-black leading-7 text-[#0f172a]">
                      {faq.question}
                    </h4>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-500 transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
          </div>
        </div>

        <div>
          <div className="mb-4 rounded-[20px] border border-[#bfdbfe] bg-[#eff6ff] px-5 py-3">
            <h3 className="text-lg font-black text-[#0f172a]">
              أسئلة عن {right.name}
            </h3>
          </div>

          <div className="space-y-4">
            {(((right as any).faq_ar || []) as { question: string; answer: string }[])
              .slice(0, 3)
              .map((faq, index) => (
                <details
                  key={`right-faq-${index}`}
                  className="group rounded-[24px] border border-slate-200 bg-[#fbfdff] p-5 shadow-sm open:border-[#bfdbfe] open:bg-white"
                >
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4">
                    <h4 className="text-base font-black leading-7 text-[#0f172a]">
                      {faq.question}
                    </h4>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-500 transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
          </div>
        </div>
      </div>

      

        <div className="flex justify-start lg:justify-end">
        
    
      </div>
    </div>

    {/* Mobile */}
<div className="block p-4 md:hidden">
  {/* Header */}
  <div>
    <span className="text-xs font-black text-[#2563eb]">الأسئلة الشائعة</span>

    <h2 className="mt-2 text-[22px] font-black leading-[1.3] text-[#0f172a]">
      أسئلة عن {left.name} و {right.name}
    </h2>

    <p className="mt-1 text-xs leading-6 text-slate-600">
      أهم الأسئلة قبل فتح الحساب.
    </p>
  </div>

  {/* Quick Tabs */}
  <div className="mt-3 grid grid-cols-2 gap-2">
    <div className="rounded-xl border border-[#bfdbfe] bg-[#eff6ff] py-2 text-center text-xs font-black text-[#0f172a]">
      {left.name}
    </div>

    <div className="rounded-xl border border-[#bfdbfe] bg-[#eff6ff] py-2 text-center text-xs font-black text-[#0f172a]">
      {right.name}
    </div>
  </div>

  {/* Questions (4 فقط بدل 6) */}
  <div className="mt-3 space-y-2">
    {[
      ...(((left as any).faq_ar || []) as { question: string; answer: string }[])
        .slice(0, 3)
        .map((faq) => ({
          ...faq,
          brokerName: left.name,
        })),
      ...(((right as any).faq_ar || []) as { question: string; answer: string }[])
        .slice(0, 3)
        .map((faq) => ({
          ...faq,
          brokerName: right.name,
        })),
    ].map((faq, index) => (
      <details
        key={`${faq.brokerName}-${index}`}
        className="group rounded-[18px] border border-slate-200 bg-white p-3 shadow-sm open:border-[#bfdbfe]"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
          <h3 className="text-sm font-black leading-6 text-[#0f172a]">
            {faq.question}
          </h3>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[10px] text-slate-500 transition group-open:rotate-180">
            ▼
          </span>
        </summary>

        <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-6 text-slate-600">
          {faq.answer}
        </p>
      </details>
    ))}
  </div>
  </div>
    </div>

</section>

    </main>
  );
}