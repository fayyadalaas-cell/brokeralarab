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

  if (!leftSlug || !rightSlug) {
    return {
      title: "مقارنة شركات التداول | بروكر العرب",
      description:
        "مقارنات تفصيلية بين شركات التداول من حيث الحسابات والرسوم والتراخيص والمنصات لمساعدة المتداول العربي على اختيار الوسيط المناسب.",
      alternates: {
        canonical: "https://brokeralarab.com/compare",
      },
      openGraph: {
        title: "مقارنة شركات التداول | بروكر العرب",
        description:
          "مقارنات تفصيلية بين شركات التداول من حيث الحسابات والرسوم والتراخيص والمنصات.",
        url: "https://brokeralarab.com/compare",
        siteName: "بروكر العرب",
        type: "website",
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

  return {
    title: `مقارنة ${leftName} و ${rightName} | الرسوم والمنصات والتراخيص`,
    description: `مقارنة شاملة بين ${leftName} و ${rightName} من حيث الحسابات والرسوم والتراخيص والمنصات والحد الأدنى للإيداع لمعرفة أيهما أنسب للمتداول العربي.`,
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
      canonical: `https://brokeralarab.com/compare/${slug}`,
    },
    openGraph: {
      title: `مقارنة ${leftName} و ${rightName} | بروكر العرب`,
      description: `مقارنة تفصيلية بين ${leftName} و ${rightName} من حيث الرسوم والمنصات والتراخيص والحسابات.`,
      url: `https://brokeralarab.com/compare/${slug}`,
      siteName: "بروكر العرب",
      type: "article",
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
          <span className="text-[10px] font-bold">من 10</span>
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
      leftValue: `${left.rating?.toFixed(1) ?? "—"} / 10`,
      rightValue: `${right.rating?.toFixed(1) ?? "—"} / 10`,
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
    {/* Top intro */}
    <div className="mb-5 rounded-[28px] border border-[#dbeafe] bg-white/85 p-5 shadow-sm sm:p-6">
      <div className="text-xs font-bold text-[#1d4ed8] sm:text-sm">
        المقارنات / {left.name} vs {right.name}
      </div>

      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
            

          <h1 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] sm:text-4xl lg:whitespace-nowrap lg:text-[52px] lg:leading-none">
            {left.name} vs {right.name}: أيهما أفضل للتداول؟
          </h1>

          <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
            مقارنة سريعة وواضحة بين <strong>{left.name}</strong> و{" "}
            <strong>{right.name}</strong> من حيث التقييم، الإيداع، الحساب
            الإسلامي، التراخيص، وأنواع الحسابات حتى تصل إلى قرار أوضح.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-[#dbeafe] bg-white px-4 py-3 text-center shadow-sm">
          <div className="text-[11px] font-bold text-slate-500">الفائز السريع</div>
          <div className="mt-1 text-base font-black text-[#0f172a]">{overallWinner}</div>
        </div>
      </div>
    </div>

    {/* Desktop / Tablet */}
    <div className="hidden md:block">
      <div className="rounded-[32px] border border-[#dbeafe] bg-white/95 p-4 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:p-6 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Left broker */}
          <div
            className={`rounded-[28px] border p-4 sm:p-5 lg:p-6 ${
              overallWinner === left.name
                ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">
                    {left.name}
                  </h2>
                  {overallWinner === left.name ? (
                    <span className="rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-extrabold text-white">
                      الأفضل إجمالًا
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm font-bold leading-6 text-[#1d4ed8]">
                  {cleanText(left.best_for) || "مناسب لفئات متعددة من المتداولين"}
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8] sm:h-20 sm:w-20">
                <span className="text-xl font-black sm:text-2xl">
                  {left.rating?.toFixed(1) ?? "—"}
                </span>
                <span className="text-[10px] font-bold">من 10</span>
              </div>
            </div>

            <div className="mt-5 flex min-h-[130px] items-center justify-center rounded-[24px] border border-slate-200 bg-[#fbfdff] p-5">
              {left.logo ? (
                <img
                  src={left.logo}
                  alt={left.name || "Broker logo"}
                  className="h-[120px] w-full scale-125 object-contain"
                />
              ) : (
                <div className="text-xl font-black text-slate-300">{left.name}</div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-[11px] font-bold text-slate-500">الإيداع</div>
                <div className="mt-1 text-base font-black text-[#0f172a]">
                  {money(left.min_deposit)}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-[11px] font-bold text-slate-500">الحساب الإسلامي</div>
                <div className="mt-1 text-base font-black text-[#0f172a]">
                  {yesNoArabic(left.islamic_account)}
                </div>
              </div>

              <div className="col-span-2 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-[11px] font-bold text-slate-500">التراخيص</div>
                <div className="mt-1 text-sm font-black leading-7 text-[#0f172a]">
                  {shortReg(left.regulation)}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={`/go/${left.slug ?? ""}?type=real`}
                className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
              >
                ابدأ مع {left.name}
              </a>

              <Link
                href={`/brokers/${left.slug ?? ""}`}
                className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
              >
                التقييم
              </Link>
            </div>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#bfdbfe] bg-[radial-gradient(circle,#2563eb_0%,#1d4ed8_100%)] text-2xl font-black text-white shadow-lg sm:h-24 sm:w-24">
              VS
            </div>

            <div className="grid w-full gap-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-[#dbeafe] bg-white px-4 py-3 text-center shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">الأفضل إجمالًا</div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">{overallWinner}</div>
              </div>
              <div className="rounded-2xl border border-[#dbeafe] bg-white px-4 py-3 text-center shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">الأفضل للمبتدئين</div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">{beginnerWinner}</div>
              </div>
              <div className="rounded-2xl border border-[#dbeafe] bg-white px-4 py-3 text-center shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">الأفضل للسبريد</div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">{scalpingWinner}</div>
              </div>
            </div>
          </div>

          {/* Right broker */}
          <div
            className={`rounded-[28px] border p-4 sm:p-5 lg:p-6 ${
              overallWinner === right.name
                ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">
                    {right.name}
                  </h2>
                  {overallWinner === right.name ? (
                    <span className="rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-extrabold text-white">
                      الأفضل إجمالًا
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm font-bold leading-6 text-[#1d4ed8]">
                  {cleanText(right.best_for) || "مناسب لفئات متعددة من المتداولين"}
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8] sm:h-20 sm:w-20">
                <span className="text-xl font-black sm:text-2xl">
                  {right.rating?.toFixed(1) ?? "—"}
                </span>
                <span className="text-[10px] font-bold">من 10</span>
              </div>
            </div>

            <div className="mt-5 flex min-h-[130px] items-center justify-center rounded-[24px] border border-slate-200 bg-[#fbfdff] p-5">
              {right.logo ? (
                <img
                  src={right.logo}
                  alt={right.name || "Broker logo"}
                  className="h-[120px] w-full scale-125 object-contain"
                />
              ) : (
                <div className="text-xl font-black text-slate-300">{right.name}</div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-[11px] font-bold text-slate-500">الإيداع</div>
                <div className="mt-1 text-base font-black text-[#0f172a]">
                  {money(right.min_deposit)}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-[11px] font-bold text-slate-500">الحساب الإسلامي</div>
                <div className="mt-1 text-base font-black text-[#0f172a]">
                  {yesNoArabic(right.islamic_account)}
                </div>
              </div>

              <div className="col-span-2 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-[11px] font-bold text-slate-500">التراخيص</div>
                <div className="mt-1 text-sm font-black leading-7 text-[#0f172a]">
                  {shortReg(right.regulation)}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={`/go/${right.slug ?? ""}?type=real`}
                className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
              >
                ابدأ مع {right.name}
              </a>

              <Link
                href={`/brokers/${right.slug ?? ""}`}
                className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
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
      <div className="rounded-[28px] border border-[#dbeafe] bg-white/95 p-4 shadow-[0_20px_60px_rgba(37,99,235,0.08)]">
        <div className="grid gap-3">
          {/* top quick result */}
          <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fbff] px-4 py-3 text-center">
            <div className="text-[11px] font-bold text-slate-500">الفائز السريع</div>
            <div className="mt-1 text-base font-black text-[#0f172a]">{overallWinner}</div>
          </div>

          {/* broker 1 */}
          <div
            className={`rounded-[24px] border p-4 ${
              overallWinner === left.name
                ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black text-[#0f172a]">{left.name}</h2>
                  {overallWinner === left.name ? (
                    <span className="rounded-full bg-[#2563eb] px-2.5 py-1 text-[10px] font-extrabold text-white">
                      الأفضل
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                  {cleanText(left.best_for) || "مناسب لفئات متعددة"}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8]">
                <span className="text-lg font-black">{left.rating?.toFixed(1) ?? "—"}</span>
                <span className="text-[10px] font-bold">من 10</span>
              </div>
            </div>

            <div className="mt-4 flex h-[86px] items-center justify-center rounded-[20px] border border-slate-200 bg-[#fbfdff] p-4">
              {left.logo ? (
                <img
                  src={left.logo}
                  alt={left.name || "Broker logo"}
                  className="h-[85px] w-full scale-125 object-contain"
                />
              ) : (
                <div className="text-base font-black text-slate-300">{left.name}</div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
                <div className="text-[10px] font-bold text-slate-500">الإيداع</div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">{money(left.min_deposit)}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
                <div className="text-[10px] font-bold text-slate-500">الإسلامي</div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">
                  {yesNoArabic(left.islamic_account)}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={`/go/${left.slug ?? ""}?type=real`}
                className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white"
              >
                ابدأ الآن
              </a>
              <Link
                href={`/brokers/${left.slug ?? ""}`}
                className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800"
              >
                التقييم
              </Link>
            </div>
          </div>

          {/* vs */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 rounded-full border border-[#bfdbfe] bg-white px-4 py-2 shadow-sm">
              <span className="text-sm font-bold text-slate-500">{left.name}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle,#2563eb_0%,#1d4ed8_100%)] text-sm font-black text-white">
                VS
              </span>
              <span className="text-sm font-bold text-slate-500">{right.name}</span>
            </div>
          </div>

          {/* broker 2 */}
          <div
            className={`rounded-[24px] border p-4 ${
              overallWinner === right.name
                ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black text-[#0f172a]">{right.name}</h2>
                  {overallWinner === right.name ? (
                    <span className="rounded-full bg-[#2563eb] px-2.5 py-1 text-[10px] font-extrabold text-white">
                      الأفضل
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                  {cleanText(right.best_for) || "مناسب لفئات متعددة"}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8]">
                <span className="text-lg font-black">{right.rating?.toFixed(1) ?? "—"}</span>
                <span className="text-[10px] font-bold">من 10</span>
              </div>
            </div>

            <div className="mt-4 flex h-[86px] items-center justify-center rounded-[20px] border border-slate-200 bg-[#fbfdff] p-4">
              {right.logo ? (
                <img
                  src={right.logo}
                  alt={right.name || "Broker logo"}
                  className="h-[85px] w-full scale-125 object-contain"
                />
              ) : (
                <div className="text-base font-black text-slate-300">{right.name}</div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
                <div className="text-[10px] font-bold text-slate-500">الإيداع</div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">
                  {money(right.min_deposit)}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
                <div className="text-[10px] font-bold text-slate-500">الإسلامي</div>
                <div className="mt-1 text-sm font-black text-[#0f172a]">
                  {yesNoArabic(right.islamic_account)}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={`/go/${right.slug ?? ""}?type=real`}
                className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white"
              >
                ابدأ الآن
              </a>
              <Link
                href={`/brokers/${right.slug ?? ""}`}
                className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800"
              >
                التقييم
              </Link>
            </div>
          </div>

          {/* bottom quick comparison */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-[#dbeafe] bg-white px-3 py-3 text-center">
              <div className="text-[10px] font-bold text-slate-500">إجمالًا</div>
              <div className="mt-1 text-xs font-black text-[#0f172a]">{overallWinner}</div>
            </div>
            <div className="rounded-2xl border border-[#dbeafe] bg-white px-3 py-3 text-center">
              <div className="text-[10px] font-bold text-slate-500">المبتدئين</div>
              <div className="mt-1 text-xs font-black text-[#0f172a]">{beginnerWinner}</div>
            </div>
            <div className="rounded-2xl border border-[#dbeafe] bg-white px-3 py-3 text-center">
              <div className="text-[10px] font-bold text-slate-500">السبريد</div>
              <div className="mt-1 text-xs font-black text-[#0f172a]">{scalpingWinner}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">

    {/* Title */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">الحكم النهائي</span>

      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:whitespace-nowrap lg:text-5xl">
        من الأفضل بين {left.name} و {right.name}؟
      </h2>

      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        بعد مراجعة التقييم العام، الحد الأدنى للإيداع، الحساب الإسلامي،
        والتراخيص، يمكن تلخيص المقارنة بين <strong>{left.name}</strong> و{" "}
        <strong>{right.name}</strong> في النقاط التالية.
      </p>
    </div>

    {/* Comparison Cards */}
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-[22px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 sm:p-5">
        <div className="text-xs font-bold text-slate-500 sm:text-sm">
          الأفضل إجمالًا
        </div>
        <div className="mt-2 text-xl font-black text-[#0f172a] sm:text-2xl lg:text-3xl">
          {overallWinner}
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
          ترشيح عام بناءً على صورة الوسيط الكاملة.
        </p>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="text-xs font-bold text-slate-500 sm:text-sm">
          الأفضل للمبتدئين
        </div>
        <div className="mt-2 text-xl font-black text-[#0f172a] sm:text-2xl lg:text-3xl">
          {beginnerWinner}
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
          يعتمد على سهولة البداية ووضوح الحسابات.
        </p>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="text-xs font-bold text-slate-500 sm:text-sm">
          الأفضل للسبريد
        </div>
        <div className="mt-2 text-xl font-black text-[#0f172a] sm:text-2xl lg:text-3xl">
          {scalpingWinner}
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
          مناسب أكثر لمن يهتم بالتنفيذ السريع.
        </p>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="text-xs font-bold text-slate-500 sm:text-sm">
          الأفضل للإيداع
        </div>
        <div className="mt-2 text-xl font-black text-[#0f172a] sm:text-2xl lg:text-3xl">
          {depositWinner}
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
          خيار أفضل لمن يركز على بداية أقل تكلفة.
        </p>
      </div>

    </div>

    {/* Analysis */}
    <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-6">
      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        إذا كنت تبحث عن الخيار الأفضل إجمالًا فاختيار{" "}
        <strong>{overallWinner}</strong> هو الأنسب. أما إذا كانت أولويتك هي
        سهولة البداية فراجع ترشيح <strong>{beginnerWinner}</strong>. وإذا كان
        تركيزك على السبريد والتنفيذ السريع فابدأ بـ{" "}
        <strong>{scalpingWinner}</strong>.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:justify-end">

        <Link
          href={`/brokers/${left.slug ?? ""}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50 lg:min-w-[260px]"
        >
          اقرأ تقييم {left.name}
        </Link>

        <Link
          href={`/brokers/${right.slug ?? ""}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8] lg:min-w-[260px]"
        >
          اقرأ تقييم {right.name}
        </Link>

      </div>

      <p className="mt-3 text-xs text-slate-500">
        فتح الحساب يتم عبر الموقع الرسمي للوسيط.
      </p>
    </div>

  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">المميزات الأساسية</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:whitespace-nowrap lg:text-5xl">
        مقارنة المميزات الأساسية بين {left.name} و {right.name}
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        نظرة سريعة على أهم العناصر التي يهتم بها المتداول العربي، مثل الإيداع،
        الحساب الإسلامي، الدعم العربي، التراخيص، والمنصات.
      </p>
    </div>

    {/* Desktop */}
    <div className="mt-6 hidden md:block">
      <div className="overflow-hidden rounded-[24px] border border-slate-200">
        <div className="grid grid-cols-[220px_1fr_1fr] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]">
          <div className="border-b border-slate-200 p-4 text-right font-black text-[#0f172a]">
            الميزة
          </div>
          <div className="border-b border-r border-slate-200 p-4 text-center font-black text-[#0f172a]">
            {left.name}
          </div>
          <div className="border-b border-r border-slate-200 p-4 text-center font-black text-[#0f172a]">
            {right.name}
          </div>
        </div>

        {comparisonRows.slice(0, 8).map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-[220px_1fr_1fr] ${
              index % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"
            }`}
          >
            <div className="flex items-center border-b border-slate-200 p-4">
              <div className="font-black text-[#0f172a]">{row.label}</div>
            </div>

            <div
              className={`flex items-center justify-center border-b border-r border-slate-200 p-4 text-center ${
                row.winner === left.name ? "bg-[#f8fbff]" : ""
              }`}
            >
              <div
                className={`text-base font-black ${
                  row.winner === left.name ? "text-[#0f172a]" : "text-slate-700"
                }`}
              >
                {row.leftValue}
              </div>
            </div>

            <div
              className={`flex items-center justify-center border-b border-r border-slate-200 p-4 text-center ${
                row.winner === right.name ? "bg-[#f8fbff]" : ""
              }`}
            >
              <div
                className={`text-base font-black ${
                  row.winner === right.name ? "text-[#0f172a]" : "text-slate-700"
                }`}
              >
                {row.rightValue}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
        <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          هذه النظرة السريعة تساعدك على معرفة الفروقات الأساسية بين{" "}
          <strong>{left.name}</strong> و <strong>{right.name}</strong> قبل الدخول
          إلى تفاصيل الحسابات والرسوم. إذا كان هدفك هو قرار سريع، فابدأ من النقاط
          التي يظهر فيها الفائز بوضوح.
        </p>
      </div>
    </div>

    {/* Mobile */}
    <div className="mt-5 space-y-3 md:hidden">
      {comparisonRows.slice(0, 4).map((row) => (
        <div
          key={row.label}
          className="rounded-[20px] border border-slate-200 bg-white p-3 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-black text-[#0f172a]">{row.label}</div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                row.winner === "تعادل"
                  ? "border border-slate-200 bg-white text-slate-700"
                  : "border border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]"
              }`}
            >
              {row.winner === "تعادل" ? "تعادل" : row.winner}
            </span>
          </div>

          <div className="space-y-2">
            <div
              className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                row.winner === left.name
                  ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                  : "border-slate-200 bg-[#fbfdff]"
              }`}
            >
              <span className="text-[11px] font-bold text-[#1d4ed8]">{left.name}</span>
              <span className="text-base font-black text-[#0f172a] break-words text-left">
                {row.leftValue}
              </span>
            </div>

            <div
              className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                row.winner === right.name
                  ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                  : "border-slate-200 bg-[#fbfdff]"
              }`}
            >
              <span className="text-[11px] font-bold text-[#1d4ed8]">{right.name}</span>
              <span className="text-base font-black text-[#0f172a] break-words text-left">
                {row.rightValue}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">الرسوم والسبريد</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        مقارنة الرسوم والسبريد بين {left.name} و {right.name}
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        هذا القسم يركز على الجوانب التي تؤثر مباشرة على تكلفة التداول، مثل
        السبريد، الرسوم، وطريقة السحب والإيداع، مع عرض مستقل لكل وسيط حتى تبقى
        المقارنة واضحة ومريحة في الموبايل والديسكتوب.
      </p>
    </div>

    {/* Quick summary */}
    <div className="mt-6 hidden md:grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="text-xs font-bold text-slate-500">ملخص السبريد</div>
        <div className="mt-2 text-lg font-black text-[#0f172a]">
          {cleanText(left.spreads) || cleanText(right.spreads) ? "متوفر" : "غير واضح"}
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="text-xs font-bold text-slate-500">ملخص الرسوم</div>
        <div className="mt-2 text-lg font-black text-[#0f172a]">
          {cleanText(left.fees) || cleanText(right.fees) ? "متوفر" : "غير واضح"}
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="text-xs font-bold text-slate-500">السحب والإيداع</div>
        <div className="mt-2 text-lg font-black text-[#0f172a]">
          {cleanText(left.deposit_withdrawal) || cleanText(right.deposit_withdrawal)
            ? "مدعوم"
            : "غير واضح"}
        </div>
      </div>

      <div className="rounded-[22px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4">
        <div className="text-xs font-bold text-[#1d4ed8]">ملاحظة مهمة</div>
        <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
          التكلفة تختلف حسب نوع الحساب، وليس اسم الوسيط فقط.
        </div>
      </div>
    </div>

    {/* Broker cards */}
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {/* Left broker */}
      <div className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{left.name}</h3>
            <p className="mt-1 text-xs font-bold text-[#1d4ed8]">الرسوم والتكاليف</p>
          </div>

          <span className="rounded-full border border-slate-200 bg-[#f8fbff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
            ملخص {left.name}
          </span>
        </div>

        <div className="space-y-3">
          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">ملخص السبريد</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(left.spreads) || "غير محدد حاليًا."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">ملخص الرسوم</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(left.fees) || "غير محدد حاليًا."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">الإيداع والسحب</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(left.deposit_withdrawal) || "غير محدد حاليًا."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
            <div className="text-sm font-black text-[#0f172a]">ملاحظات مهمة</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(left.spreads) || cleanText(left.fees)
                ? `يفضل مراجعة نوع الحساب لدى ${left.name} لأن السبريد أو الرسوم قد تختلف بين الحسابات القياسية والاحترافية.`
                : `لا توجد تفاصيل كافية حاليًا عن رسوم ${left.name} داخل هذه المقارنة.`}
            </div>
          </div>
        </div>
      </div>

      {/* Right broker */}
      <div className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{right.name}</h3>
            <p className="mt-1 text-xs font-bold text-[#1d4ed8]">الرسوم والتكاليف</p>
          </div>

          <span className="rounded-full border border-slate-200 bg-[#f8fbff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
            ملخص {right.name}
          </span>
        </div>

        <div className="space-y-3">
          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">ملخص السبريد</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(right.spreads) || "غير محدد حاليًا."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">ملخص الرسوم</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(right.fees) || "غير محدد حاليًا."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">الإيداع والسحب</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(right.deposit_withdrawal) || "غير محدد حاليًا."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
            <div className="text-sm font-black text-[#0f172a]">ملاحظات مهمة</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(right.spreads) || cleanText(right.fees)
                ? `يفضل مراجعة نوع الحساب لدى ${right.name} لأن السبريد أو الرسوم قد تختلف بين الحسابات القياسية والاحترافية.`
                : `لا توجد تفاصيل كافية حاليًا عن رسوم ${right.name} داخل هذه المقارنة.`}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="hidden md:block mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        مقارنة الرسوم لا تعني فقط النظر إلى السبريد، بل أيضًا إلى نوع الحساب
        وطريقة السحب والإيداع، وأي عمولات إضافية قد تظهر في بعض الحسابات. لذلك
        من الأفضل قراءة صفحة التقييم الكاملة قبل فتح الحساب.
      </p>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">أنواع الحسابات</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        مقارنة أنواع الحسابات بين {left.name} و {right.name}
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        بدل عرض صف مقابل صف بشكل يسبب فراغات عند اختلاف عدد الحسابات، نعرض هنا
        حسابات كل وسيط بطريقة مستقلة ومنظمة حتى تبقى المقارنة واضحة ومريحة.
      </p>
    </div>

    {/* Summary */}
    <div className="mt-6 grid gap-3 md:grid-cols-3">
      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="text-xs font-bold text-slate-500">عدد الحسابات</div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-[#1d4ed8]">{left.name}</div>
            <div className="text-2xl font-black text-[#0f172a]">{leftAccounts.length}</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#1d4ed8]">{right.name}</div>
            <div className="text-2xl font-black text-[#0f172a]">{rightAccounts.length}</div>
          </div>
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="text-xs font-bold text-slate-500">تنوع الحسابات</div>
        <div className="mt-3 text-base font-black leading-7 text-[#0f172a]">
          {leftAccounts.length > rightAccounts.length
            ? `${left.name} يقدم تنوعًا أكبر`
            : rightAccounts.length > leftAccounts.length
            ? `${right.name} يقدم تنوعًا أكبر`
            : "التنوع متقارب بين الشركتين"}
        </div>
      </div>

      <div className="rounded-[22px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4">
        <div className="text-xs font-bold text-[#1d4ed8]">ملاحظة مهمة</div>
        <div className="mt-3 text-base font-black leading-7 text-[#0f172a]">
          الأهم ليس العدد، بل اختيار الحساب المناسب لأسلوب تداولك.
        </div>
      </div>
    </div>

    {/* Desktop + Tablet */}
    <div className="mt-6 hidden space-y-5 md:block">
      {/* Left broker section */}
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{left.name}</h3>
            <p className="mt-1 text-sm font-bold text-[#1d4ed8]">
              {leftAccounts.length} حساب متاح
            </p>
          </div>

          <Link
            href={`/brokers/${left.slug ?? ""}`}
            className="inline-flex min-h-[42px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
          >
            اقرأ تقييم {left.name}
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {leftAccounts.length > 0 ? (
            leftAccounts.map((acc) => (
              <div
                key={acc.id}
                className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-black text-[#0f172a]">
                      {acc.account_name || "حساب"}
                    </h4>
                    <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                      {acc.best_for || "مناسب لفئات متعددة"}
                    </p>
                  </div>

                  <span className="rounded-full border border-slate-200 bg-[#f8fbff] px-2.5 py-1 text-[10px] font-bold text-slate-600">
                    حساب
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
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
            <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
              لا توجد بيانات حسابات متاحة حاليًا.
            </div>
          )}
        </div>
      </div>

      {/* Right broker section */}
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{right.name}</h3>
            <p className="mt-1 text-sm font-bold text-[#1d4ed8]">
              {rightAccounts.length} حساب متاح
            </p>
          </div>

          <Link
            href={`/brokers/${right.slug ?? ""}`}
            className="inline-flex min-h-[42px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
          >
            اقرأ تقييم {right.name}
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {rightAccounts.length > 0 ? (
            rightAccounts.map((acc) => (
              <div
                key={acc.id}
                className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-black text-[#0f172a]">
                      {acc.account_name || "حساب"}
                    </h4>
                    <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                      {acc.best_for || "مناسب لفئات متعددة"}
                    </p>
                  </div>

                  <span className="rounded-full border border-slate-200 bg-[#f8fbff] px-2.5 py-1 text-[10px] font-bold text-slate-600">
                    حساب
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
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
            <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
              لا توجد بيانات حسابات متاحة حاليًا.
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Mobile */}
    <div className="mt-5 space-y-4 md:hidden">
      

      <div className="space-y-4">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-[#0f172a]">{left.name}</h3>
              <p className="mt-1 text-[11px] font-bold text-[#1d4ed8]">
                {leftAccounts.length} حساب
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {leftAccounts.length > 0 ? (
              leftAccounts.map((acc) => (
                <details
                  key={acc.id}
                  className="group rounded-[18px] border border-slate-200 bg-[#fbfdff]"
                >
                  <summary className="cursor-pointer list-none p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-black text-[#0f172a]">
                          {acc.account_name || "حساب"}
                        </div>
                        <div className="mt-1 text-[11px] font-bold text-[#1d4ed8]">
                          {acc.best_for || "مناسب لفئات متعددة"}
                        </div>
                      </div>

                      <span className="text-xs font-bold text-slate-400 transition group-open:rotate-180">
                        ▼
                      </span>
                    </div>
                  </summary>

                  <div className="border-t border-slate-200 px-3 pb-3 pt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                        <div className="text-[10px] font-bold text-slate-500">السبريد</div>
                        <div className="mt-1 text-xs font-black text-[#0f172a]">
                          {acc.spread || "غير محدد"}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                        <div className="text-[10px] font-bold text-slate-500">العمولة</div>
                        <div className="mt-1 text-xs font-black text-[#0f172a]">
                          {acc.commission || "غير محدد"}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                        <div className="text-[10px] font-bold text-slate-500">الإيداع</div>
                        <div className="mt-1 text-xs font-black text-[#0f172a]">
                          {acc.min_deposit || "غير محدد"}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                        <div className="text-[10px] font-bold text-slate-500">التنفيذ</div>
                        <div className="mt-1 text-xs font-black text-[#0f172a]">
                          {acc.execution_type || "غير محدد"}
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              ))
            ) : (
              <div className="rounded-[18px] border border-slate-200 bg-[#f8fbff] p-3 text-sm text-slate-600">
                لا توجد بيانات حسابات حاليًا.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">

          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-[#0f172a]">{right.name}</h3>
              <p className="mt-1 text-[11px] font-bold text-[#1d4ed8]">
                {rightAccounts.length} حساب
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {rightAccounts.length > 0 ? (
              rightAccounts.map((acc) => (
                <details
                  key={acc.id}
                  className="group rounded-[18px] border border-slate-200 bg-[#fbfdff]"
                >
                  <summary className="cursor-pointer list-none p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-black text-[#0f172a]">
                          {acc.account_name || "حساب"}
                        </div>
                        <div className="mt-1 text-[11px] font-bold text-[#1d4ed8]">
                          {acc.best_for || "مناسب لفئات متعددة"}
                        </div>
                      </div>

                      <span className="text-xs font-bold text-slate-400 transition group-open:rotate-180">
                        ▼
                      </span>
                    </div>
                  </summary>

                  <div className="border-t border-slate-200 px-3 pb-3 pt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                        <div className="text-[10px] font-bold text-slate-500">السبريد</div>
                        <div className="mt-1 text-xs font-black text-[#0f172a]">
                          {acc.spread || "غير محدد"}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                        <div className="text-[10px] font-bold text-slate-500">العمولة</div>
                        <div className="mt-1 text-xs font-black text-[#0f172a]">
                          {acc.commission || "غير محدد"}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                        <div className="text-[10px] font-bold text-slate-500">الإيداع</div>
                        <div className="mt-1 text-xs font-black text-[#0f172a]">
                          {acc.min_deposit || "غير محدد"}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                        <div className="text-[10px] font-bold text-slate-500">التنفيذ</div>
                        <div className="mt-1 text-xs font-black text-[#0f172a]">
                          {acc.execution_type || "غير محدد"}
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              ))
            ) : (
              <div className="rounded-[18px] border border-slate-200 bg-[#f8fbff] p-3 text-sm text-slate-600">
                لا توجد بيانات حسابات حاليًا.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        العدد الأكبر من الحسابات لا يعني دائمًا أن الوسيط أفضل. الأهم هو أن تجد
        حسابًا يناسب أسلوبك في التداول من حيث السبريد، العمولة، الحد الأدنى
        للإيداع، وطريقة التنفيذ.
      </p>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">اختيار سريع</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        متى تختار {left.name} ومتى تختار {right.name}؟
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        إذا كنت تريد قرارًا أسرع، فهذا القسم يلخص لك بشكل مباشر متى يكون كل وسيط
        هو الخيار الأنسب، بدل الاكتفاء بقراءة الأرقام والجداول فقط.
      </p>
    </div>

    {/* Desktop */}
    <div className="mt-6 hidden gap-4 md:grid lg:grid-cols-2">
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{left.name}</h3>
            <p className="mt-1 text-sm font-bold text-[#1d4ed8]">اختر {left.name} إذا كنت...</p>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-[#1d4ed8]">
            خيار مناسب
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            تبحث عن تجربة تداول أوضح من ناحية الحسابات والشروط.
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            تريد وسيطًا يناسب أسلوبك إذا كانت أولويتك {cleanText(left.best_for) || "المرونة في التداول"}.
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            تفضل مراجعة خيارات الحسابات المتاحة بتفصيل قبل فتح الحساب.
          </div>
        </div>

        <div className="mt-5">
          <Link
            href={`/brokers/${left.slug ?? ""}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
          >
            اقرأ تقييم {left.name}
          </Link>
        </div>
      </div>

      <div className="rounded-[26px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{right.name}</h3>
            <p className="mt-1 text-sm font-bold text-[#1d4ed8]">اختر {right.name} إذا كنت...</p>
          </div>

          <span className="rounded-full border border-[#bfdbfe] bg-white px-3 py-1 text-xs font-bold text-[#1d4ed8]">
            مرشح قوي
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            تريد وسيطًا يقدم صورة قوية من حيث التقييم العام والانطباع العام.
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            تبحث عن خيار مناسب إذا كانت أولويتك {cleanText(right.best_for) || "البدء السهل أو التداول النشط"}.
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            تفضل الوصول بسرعة إلى خيار عملي دون الحاجة إلى مقارنة مطولة جدًا.
          </div>
        </div>

        <div className="mt-5">
          <Link
            href={`/brokers/${right.slug ?? ""}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
          >
            اقرأ تقييم {right.name}
          </Link>
        </div>
      </div>
    </div>

    {/* Mobile */}
    <div className="mt-5 space-y-3 md:hidden">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-[#0f172a]">{left.name}</h3>
            <p className="mt-1 text-[11px] font-bold text-[#1d4ed8]">اختره إذا كنت...</p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3 text-sm leading-7 text-slate-600">
            تريد تجربة حسابات أوضح ومعلومات مفصلة أكثر.
          </div>
          <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3 text-sm leading-7 text-slate-600">
            كانت أولويتك {cleanText(left.best_for) || "المرونة في التداول"}.
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={`/brokers/${left.slug ?? ""}`}
            className="inline-flex min-h-[46px] w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800"
          >
            تقييم {left.name}
          </Link>
        </div>
      </div>

      <div className="rounded-[22px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-[#0f172a]">{right.name}</h3>
            <p className="mt-1 text-[11px] font-bold text-[#1d4ed8]">اختره إذا كنت...</p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-7 text-slate-600">
            تريد قرارًا سريعًا وخيارًا قويًا إجمالًا.
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-7 text-slate-600">
            كانت أولويتك {cleanText(right.best_for) || "البدء السهل أو التداول النشط"}.
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={`/brokers/${right.slug ?? ""}`}
            className="inline-flex min-h-[46px] w-full items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white"
          >
            تقييم {right.name}
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="mx-auto max-w-4xl text-center">
      <span className="text-sm font-bold text-[#2563eb]">الأمان والتراخيص</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        مدى أمان التداول مع {left.name} و {right.name}
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        الأمان يعتمد على قوة التراخيص، وضوح الجهة التنظيمية، والمقر، إضافة إلى
        توفر الحساب الإسلامي. هنا مقارنة مباشرة بين {left.name} و {right.name}
        بناءً على البيانات المتوفرة.
      </p>
    </div>

    {/* Top summary */}
    <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
  <div className="text-xs font-bold text-slate-500">التراخيص</div>
  <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
    تراخيص متعددة لدى الوسيطين
  </div>
</div>

      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="text-xs font-bold text-slate-500">الحساب الإسلامي</div>
        <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
          {yesNoArabic(left.islamic_account)} / {yesNoArabic(right.islamic_account)}
        </div>
      </div>

      <div className="rounded-[22px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4">
        <div className="text-xs font-bold text-[#1d4ed8]">ملاحظة مهمة</div>
        <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
          راجع دائمًا الجهة التنظيمية الفعلية التي سيتم فتح الحساب تحتها قبل التسجيل.
        </div>
      </div>
    </div>

    {/* Cards */}
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {/* Left */}
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2">
              {left.logo ? (
                <img
                  src={left.logo}
                  alt={left.name || "Broker logo"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs font-black text-slate-400">{left.name}</span>
              )}
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0f172a] sm:text-2xl">
                {left.name}
              </h3>
              <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                الأمان والثقة
              </p>
            </div>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-[#1d4ed8]">
            أمان {left.name}
          </span>
        </div>

        <div className="space-y-3">
          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">التراخيص</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {shortReg(left.regulation)}
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">الحساب الإسلامي</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {yesNoArabic(left.islamic_account)}
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">المقر</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {left.headquarters || "غير محدد"}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2">
              {right.logo ? (
                <img
                  src={right.logo}
                  alt={right.name || "Broker logo"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs font-black text-slate-400">{right.name}</span>
              )}
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0f172a] sm:text-2xl">
                {right.name}
              </h3>
              <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                الأمان والثقة
              </p>
            </div>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-[#1d4ed8]">
            أمان {right.name}
          </span>
        </div>

        <div className="space-y-3">
          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">التراخيص</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {shortReg(right.regulation)}
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">الحساب الإسلامي</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {yesNoArabic(right.islamic_account)}
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">المقر</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {right.headquarters || "غير محدد"}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile note */}
    <div className="hidden md:block mt-5 rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
      <div className="text-sm font-black text-[#0f172a]">ملاحظة مهمة</div>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        راجع دائمًا الجهة التنظيمية الفعلية التي سيتم فتح الحساب تحتها قبل التسجيل.
      </p>
    </div>

    {/* Footer */}
    <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        وجود التراخيص لا يعني وحده أن جميع الحسابات متطابقة في مستوى الحماية،
        لذلك من الأفضل دائمًا مراجعة تفاصيل الكيان التنظيمي الذي ستفتح تحته
        الحساب قبل اتخاذ القرار النهائي.
      </p>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">الحكم النهائي</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        من الأفضل بين {left.name} و {right.name}؟
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        بعد مراجعة المميزات الأساسية، الرسوم، الحسابات، والأمان، هذه هي الخلاصة
        النهائية التي تساعدك على اتخاذ قرار أسرع.
      </p>
    </div>

    {/* Verdict cards */}
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center">
        <div className="text-xs font-bold text-slate-500">أفضل للمبتدئين</div>
        <div className="mt-2 text-2xl font-black text-[#0f172a]">
          {beginnerWinner}
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center">
        <div className="text-xs font-bold text-slate-500">أفضل للتداول النشط</div>
        <div className="mt-2 text-2xl font-black text-[#0f172a]">
          {scalpingWinner}
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center sm:col-span-2 xl:col-span-1">
        <div className="text-xs font-bold text-slate-500">أفضل إجمالًا</div>
        <div className="mt-2 text-2xl font-black text-[#0f172a]">
          {overallWinner}
        </div>
      </div>
    </div>

    {/* Analysis */}
    <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5">
      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        إذا كنت تبحث عن الخيار الأفضل إجمالًا، فقد يكون{" "}
        <strong>{overallWinner}</strong> هو الأنسب لك. أما إذا كانت أولويتك
        سهولة البداية ووضوح الحسابات، فراجع ترشيح{" "}
        <strong>{beginnerWinner}</strong>. وإذا كان تركيزك الأكبر على التداول
        النشط والسبريد، فابدأ بمراجعة <strong>{scalpingWinner}</strong>.
      </p>
    </div>

    {/* CTA */}
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <a
        href={`/go/${left.slug ?? ""}?type=real`}
        className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
      >
        افتح حساب لدى {left.name}
      </a>

      <a
        href={`/go/${right.slug ?? ""}?type=real`}
        className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
      >
        افتح حساب لدى {right.name}
      </a>
    </div>

    {/* Small note - desktop only */}
    <p className="mt-4 hidden text-xs text-slate-500 md:block">
      القرار النهائي يعتمد دائمًا على نوع الحساب الذي ستفتحه فعليًا وطبيعة أسلوبك
      في التداول.
    </p>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
<div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

<h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">
الأسئلة الشائعة
</h2>

<div className="mt-6 space-y-3">

<details className="rounded-xl border border-slate-200 p-4">
<summary className="cursor-pointer font-bold text-[#0f172a]">
هل {left.name} أفضل من {right.name}؟
</summary>
<p className="mt-2 text-sm text-slate-600">
يعتمد ذلك على احتياجات المتداول، حيث تختلف الشركات في الرسوم
والمنصات وأنواع الحسابات.
</p>
</details>

<details className="rounded-xl border border-slate-200 p-4">
<summary className="cursor-pointer font-bold text-[#0f172a]">
ما أقل إيداع لفتح حساب تداول؟
</summary>
<p className="mt-2 text-sm text-slate-600">
يختلف الحد الأدنى للإيداع بين الشركات ونوع الحساب المستخدم.
</p>
</details>

<details className="rounded-xl border border-slate-200 p-4">
<summary className="cursor-pointer font-bold text-[#0f172a]">
هل يوجد حساب إسلامي؟
</summary>
<p className="mt-2 text-sm text-slate-600">
توفر العديد من شركات التداول حسابات إسلامية خالية من الفوائد.
</p>
</details>

</div>

</div>
</section>

    </main>
  );
}