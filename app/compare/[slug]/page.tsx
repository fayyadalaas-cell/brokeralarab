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
    (cleanText(left.islamic_account).toLowerCase().includes("yes") ? 1 : 0);

  const rScore =
    (rDeposit <= 50 ? 2 : 0) +
    (cleanText(right.best_for).includes("مبتد") ? 2 : 0) +
    (cleanText(right.islamic_account).toLowerCase().includes("yes") ? 1 : 0);

  return lScore > rScore ? left.name : rScore > lScore ? right.name : "تعادل";
}

function getScalpingWinner(left: Broker, right: Broker) {
  const lText = `${left.spreads || ""} ${left.fees || ""} ${left.best_for || ""}`;
  const rText = `${right.spreads || ""} ${right.fees || ""} ${right.best_for || ""}`;

  const lScore =
    (lText.includes("0.0") ? 2 : 0) +
    (lText.includes("سبريد") ? 1 : 0) +
    (lText.includes("سريع") ? 1 : 0);

  const rScore =
    (rText.includes("0.0") ? 2 : 0) +
    (rText.includes("سبريد") ? 1 : 0) +
    (rText.includes("سريع") ? 1 : 0);

  return lScore > rScore ? left.name : rScore > lScore ? right.name : "تعادل";
}

function compareTitle(left: Broker, right: Broker) {
  return `${left.name} vs ${right.name}: أيهما أفضل للمتداول العربي؟`;
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

  const maxAccountsLength = Math.max(leftAccounts.length, rightAccounts.length);
  const mobileAccountRows = Array.from({ length: maxAccountsLength }, (_, i) => ({
    left: leftAccounts[i] ?? null,
    right: rightAccounts[i] ?? null,
    key: `mobile-row-${i}`,
  }));

  const overallWinner = getHigherRatingLabel(left, right);
  const beginnerWinner = getBeginnerWinner(left, right);
  const scalpingWinner = getScalpingWinner(left, right);
  const depositWinner = getBetterValueLabel(left, right);

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
    ["التقييم", `${left.rating?.toFixed(1) ?? "—"} / 10`, `${right.rating?.toFixed(1) ?? "—"} / 10`],
    ["الحد الأدنى للإيداع", money(left.min_deposit), money(right.min_deposit)],
    ["المنصات", shortPlatforms(left.platforms), shortPlatforms(right.platforms)],
    ["الحساب الإسلامي", yesNoArabic(left.islamic_account), yesNoArabic(right.islamic_account)],
    ["التراخيص", shortReg(left.regulation), shortReg(right.regulation)],
    ["المقر", left.headquarters || "غير محدد", right.headquarters || "غير محدد"],
    ["سنة التأسيس", left.founded_year || "غير محدد", right.founded_year || "غير محدد"],
    ["الرافعة", left.max_leverage || "غير محدد", right.max_leverage || "غير محدد"],
    ["الأصول", left.trading_assets || "غير محدد", right.trading_assets || "غير محدد"],
  ] as const;

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

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-4 text-xs font-bold text-[#1d4ed8] sm:text-sm">
            المقارنات / {left.name} vs {right.name}
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                {compareTitle(left, right)}
              </h1>

              <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 sm:mt-5 sm:text-lg">
                تعد شركتا <strong>{left.name}</strong> و <strong>{right.name}</strong> من
                أشهر شركات التداول في العالم العربي. في هذه المقارنة سنقارن بين
                الشركتين من حيث التراخيص، الحسابات، الرسوم، المنصات، الحد الأدنى
                للإيداع، والحساب الإسلامي لمعرفة أيهما الأنسب لك.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
                <Link
                  href={`/brokers/${left.slug}`}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
                >
                  اقرأ تقييم {left.name}
                </Link>
                <Link
                  href={`/brokers/${right.slug}`}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                >
                  اقرأ تقييم {right.name}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[28px] border border-slate-200 bg-[#f8fbff] p-4 shadow-sm sm:p-5">
                <div className="text-sm font-bold text-[#1d4ed8]">القرار السريع</div>

                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-bold text-slate-500">الأفضل إجمالًا</div>
                    <div className="mt-1 text-lg font-black text-[#0f172a]">{overallWinner}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-bold text-slate-500">الأفضل للمبتدئين</div>
                    <div className="mt-1 text-lg font-black text-[#0f172a]">{beginnerWinner}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-bold text-slate-500">الأفضل للسبريد/النشاط</div>
                    <div className="mt-1 text-lg font-black text-[#0f172a]">{scalpingWinner}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-bold text-slate-500">الأفضل من حيث الإيداع</div>
                    <div className="mt-1 text-lg font-black text-[#0f172a]">{depositWinner}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 hidden gap-3 sm:mt-8 md:grid md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: `اختر ${left.name}`,
                desc: `إذا كنت تميل إلى ${cleanText(left.best_for) || "تجربة تداول أقوى"}.`,
              },
              {
                title: `اختر ${right.name}`,
                desc: `إذا كنت تميل إلى ${cleanText(right.best_for) || "تجربة تداول أسهل"}.`,
              },
              {
                title: `${left.name} مقابل ${right.name}`,
                desc: `هذه الصفحة تبني قرارًا أسرع من قراءة صفحتين منفصلتين.`,
              },
              {
                title: "مقارنة للمتداول العربي",
                desc: "تركيز على الإيداع، الحساب الإسلامي، والتراخيص والمنصات.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="text-base font-black">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <div className="text-sm font-bold text-[#1d4ed8]">مقارنة سريعة</div>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            من الأفضل بين {left.name} و {right.name}؟
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {[left, right].map((broker) => (
            <div
              key={broker.id}
              className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black sm:text-2xl">{broker.name}</h3>
                  <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                    {broker.best_for || "مناسب لفئات متعددة"}
                  </p>
                </div>

                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8] sm:h-16 sm:w-16">
                  <span className="text-lg font-black sm:text-xl">
                    {broker.rating?.toFixed(1) ?? "—"}
                  </span>
                  <span className="text-[10px] font-bold">من 10</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">الحد الأدنى للإيداع</span>
                  <span className="text-sm font-black text-[#0f172a]">{money(broker.min_deposit)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">المنصات</span>
                  <span className="text-sm font-black text-[#0f172a]">{shortPlatforms(broker.platforms)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">التراخيص</span>
                  <span className="text-sm font-black text-[#0f172a]">{shortReg(broker.regulation)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">الحساب الإسلامي</span>
                  <span className="text-sm font-black text-[#0f172a]">{yesNoArabic(broker.islamic_account)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">الرافعة</span>
                  <span className="text-sm font-black text-[#0f172a]">{broker.max_leverage || "غير محدد"}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href={`/brokers/${broker.slug}`}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
                >
                  اقرأ التقييم
                </Link>
                <a
  href={`/go/${broker.slug}?type=real`}
  className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
>
  افتح حساب حقيقي
</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-4 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="mb-6">
            <div className="text-sm font-bold text-[#1d4ed8]">جدول المقارنة</div>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              جدول مقارنة {left.name} و {right.name}
            </h2>
          </div>

          {/* Mobile comparison cards */}
          <div className="space-y-3 md:hidden">
            {comparisonRows.map((row) => (
              <div
                key={row[0]}
                className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4"
              >
                <div className="mb-3 text-sm font-black text-[#0f172a]">{row[0]}</div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-1 text-xs font-bold text-[#1d4ed8]">{left.name}</div>
                    <div className="text-sm font-black leading-6 text-slate-700 break-words">
                      {row[1]}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-1 text-xs font-bold text-[#1d4ed8]">{right.name}</div>
                    <div className="text-sm font-black leading-6 text-slate-700 break-words">
                      {row[2]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/tablet original table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-slate-200">
              <thead className="bg-[#f8fbff]">
                <tr className="text-sm">
                  <th className="border-b border-slate-200 p-4 text-right font-black">الميزة</th>
                  <th className="border-b border-slate-200 p-4 text-center font-black">{left.name}</th>
                  <th className="border-b border-slate-200 p-4 text-center font-black">{right.name}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {comparisonRows.map((row) => (
                  <tr key={row[0]} className="bg-white">
                    <td className="border-b border-slate-200 p-4 font-black">{row[0]}</td>
                    <td className="border-b border-slate-200 p-4 text-center text-slate-700">{row[1]}</td>
                    <td className="border-b border-slate-200 p-4 text-center text-slate-700">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <div className="text-sm font-bold text-[#1d4ed8]">أنواع الحسابات</div>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            مقارنة الحسابات بين {left.name} و {right.name}
          </h2>
        </div>

        {/* Mobile redesigned accounts comparison */}
        <div className="space-y-4 md:hidden">
          {mobileAccountRows.length > 0 ? (
            mobileAccountRows.map((row, index) => (
              <div
                key={row.key}
                className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-bold text-[#1d4ed8]">مقارنة حساب #{index + 1}</div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="text-base font-black">{left.name}</div>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#1d4ed8]">
                        {row.left?.account_name || "لا يوجد حساب مطابق"}
                      </span>
                    </div>

                    {row.left ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                          <span className="text-slate-500">السبريد</span>
                          <span className="font-black text-[#0f172a]">{row.left.spread || "غير محدد"}</span>
                        </div>
                        <div className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                          <span className="text-slate-500">العمولة</span>
                          <span className="font-black text-[#0f172a]">{row.left.commission || "غير محدد"}</span>
                        </div>
                        <div className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                          <span className="text-slate-500">الحد الأدنى للإيداع</span>
                          <span className="font-black text-[#0f172a]">{row.left.min_deposit || "غير محدد"}</span>
                        </div>
                        <div className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                          <span className="text-slate-500">التنفيذ</span>
                          <span className="font-black text-[#0f172a]">{row.left.execution_type || "غير محدد"}</span>
                        </div>
                        <div className="rounded-xl bg-white px-3 py-2">
                          <div className="mb-1 text-slate-500">مناسب لـ</div>
                          <div className="font-black leading-6 text-[#0f172a]">
                            {row.left.best_for || "فئات متعددة"}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-white px-3 py-3 text-sm text-slate-500">
                        لا توجد بيانات لهذا الحساب.
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="text-base font-black">{right.name}</div>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#1d4ed8]">
                        {row.right?.account_name || "لا يوجد حساب مطابق"}
                      </span>
                    </div>

                    {row.right ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                          <span className="text-slate-500">السبريد</span>
                          <span className="font-black text-[#0f172a]">{row.right.spread || "غير محدد"}</span>
                        </div>
                        <div className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                          <span className="text-slate-500">العمولة</span>
                          <span className="font-black text-[#0f172a]">{row.right.commission || "غير محدد"}</span>
                        </div>
                        <div className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                          <span className="text-slate-500">الحد الأدنى للإيداع</span>
                          <span className="font-black text-[#0f172a]">{row.right.min_deposit || "غير محدد"}</span>
                        </div>
                        <div className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                          <span className="text-slate-500">التنفيذ</span>
                          <span className="font-black text-[#0f172a]">{row.right.execution_type || "غير محدد"}</span>
                        </div>
                        <div className="rounded-xl bg-white px-3 py-2">
                          <div className="mb-1 text-slate-500">مناسب لـ</div>
                          <div className="font-black leading-6 text-[#0f172a]">
                            {row.right.best_for || "فئات متعددة"}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-white px-3 py-3 text-sm text-slate-500">
                        لا توجد بيانات لهذا الحساب.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
              لا توجد بيانات حسابات متاحة حاليًا.
            </div>
          )}
        </div>

        {/* Desktop original layout */}
        <div className="hidden gap-6 md:grid lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black">{left.name}</h3>
              <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
                الحسابات
              </span>
            </div>

            <div className="space-y-3">
              {leftAccounts.length > 0 ? (
                leftAccounts.map((acc) => (
                  <div key={acc.id} className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4">
                    <div className="text-lg font-black">{acc.account_name || "حساب"}</div>
                    <div className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      <div>
                        السبريد:{" "}
                        <span className="font-black text-[#0f172a]">{acc.spread || "غير محدد"}</span>
                      </div>
                      <div>
                        العمولة:{" "}
                        <span className="font-black text-[#0f172a]">{acc.commission || "غير محدد"}</span>
                      </div>
                      <div>
                        الحد الأدنى للإيداع:{" "}
                        <span className="font-black text-[#0f172a]">{acc.min_deposit || "غير محدد"}</span>
                      </div>
                      <div>
                        التنفيذ:{" "}
                        <span className="font-black text-[#0f172a]">{acc.execution_type || "غير محدد"}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      مناسب لـ:{" "}
                      <span className="font-black text-[#0f172a]">{acc.best_for || "فئات متعددة"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 text-sm text-slate-600">
                  لا توجد بيانات حسابات متاحة حاليًا.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black">{right.name}</h3>
              <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
                الحسابات
              </span>
            </div>

            <div className="space-y-3">
              {rightAccounts.length > 0 ? (
                rightAccounts.map((acc) => (
                  <div key={acc.id} className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4">
                    <div className="text-lg font-black">{acc.account_name || "حساب"}</div>
                    <div className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      <div>
                        السبريد:{" "}
                        <span className="font-black text-[#0f172a]">{acc.spread || "غير محدد"}</span>
                      </div>
                      <div>
                        العمولة:{" "}
                        <span className="font-black text-[#0f172a]">{acc.commission || "غير محدد"}</span>
                      </div>
                      <div>
                        الحد الأدنى للإيداع:{" "}
                        <span className="font-black text-[#0f172a]">{acc.min_deposit || "غير محدد"}</span>
                      </div>
                      <div>
                        التنفيذ:{" "}
                        <span className="font-black text-[#0f172a]">{acc.execution_type || "غير محدد"}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      مناسب لـ:{" "}
                      <span className="font-black text-[#0f172a]">{acc.best_for || "فئات متعددة"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 text-sm text-slate-600">
                  لا توجد بيانات حسابات متاحة حاليًا.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-4 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="text-sm font-bold text-[#1d4ed8]">اختر {left.name}</div>
            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              متى تكون {left.name} الخيار الأنسب؟
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>• إذا كنت تبحث عن تنفيذ سريع وبيئة تداول نشطة.</li>
              <li>• إذا كانت أولويةك هي التقييم الأعلى إجمالًا.</li>
              <li>• إذا كنت تفضل مزيدًا من المرونة في بيئة التداول.</li>
              <li>• إذا كانت تفاصيل الرسوم والسبريد أقرب لما تحتاجه.</li>
            </ul>
            <div className="mt-5">
              <Link
                href={`/brokers/${left.slug}`}
                className="inline-flex min-h-[46px] w-full items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8] sm:w-auto"
              >
                افتح تقييم {left.name}
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="text-sm font-bold text-[#1d4ed8]">اختر {right.name}</div>
            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              متى تكون {right.name} الخيار الأنسب؟
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>• إذا كنت مبتدئًا وتريد بداية أوضح وأبسط.</li>
              <li>• إذا كان الحد الأدنى للإيداع عاملًا أساسيًا لك.</li>
              <li>• إذا كنت تفضل تجربة تداول تعليمية أو أسهل من حيث البداية.</li>
              <li>• إذا كانت أنواع الحسابات أقرب لأسلوبك.</li>
            </ul>
            <div className="mt-5">
              <Link
                href={`/brokers/${right.slug}`}
                className="inline-flex min-h-[46px] w-full items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8] sm:w-auto"
              >
                افتح تقييم {right.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="text-sm font-bold text-[#1d4ed8]">الخلاصة النهائية</div>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            خلاصة مقارنة {left.name} و {right.name}
          </h2>

          <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:gap-5">
            <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5">
              <div className="text-sm font-bold text-slate-500">الأفضل إجمالًا</div>
              <div className="mt-2 text-xl font-black sm:text-2xl">{overallWinner}</div>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5">
              <div className="text-sm font-bold text-slate-500">الأفضل للمبتدئين</div>
              <div className="mt-2 text-xl font-black sm:text-2xl">{beginnerWinner}</div>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5">
              <div className="text-sm font-bold text-slate-500">الأفضل للسبريد</div>
              <div className="mt-2 text-xl font-black sm:text-2xl">{scalpingWinner}</div>
            </div>
          </div>

          <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
            إذا كنت تبحث عن قرار سريع، فابدأ من البطاقات أعلاه: اختر{" "}
            <strong>{overallWinner}</strong> إذا كنت تريد الخيار الأقوى إجمالًا،
            أو راجع ترشيح المبتدئين والسبريد إذا كانت أولوياتك مختلفة. هذه
            المقارنة بين {left.name} و {right.name} هدفها مساعدتك على الوصول إلى
            قرار عملي، لا مجرد قراءة معلومات عامة.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
            <Link
              href={`/brokers/${left.slug}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
            >
              اقرأ تقييم {left.name}
            </Link>
            <Link
              href={`/brokers/${right.slug}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
            >
              اقرأ تقييم {right.name}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}