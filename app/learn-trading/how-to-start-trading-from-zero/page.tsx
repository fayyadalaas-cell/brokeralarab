import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  section_slug: string | null;
  is_published: boolean;
  is_featured: boolean | null;
  featured_order: number | null;
  seo_title: string | null;
  seo_description: string | null;
};

type Broker = {
  id: number;
  name: string;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  best_for: string | null;
  logo: string | null;
  slug: string | null;
  real_account_url: string | null;
};

type BrokerAccount = {
  broker_id: number;
  account_name: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
  execution_type: string | null;
  is_islamic_available: boolean | null;
  sort_order: number | null;
};

type AccountRow = BrokerAccount & {
  broker_name: string;
  broker_slug: string | null;
  broker_logo: string | null;
};

const FEATURED_BROKER_IDS = [1, 3, 11]; // Exness, XM, Pepperstone

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("title, seo_title, seo_description, cover_image")
    .eq("slug", "how-to-start-trading-from-zero")
    .eq("is_published", true)
    .maybeSingle();

  if (!article) {
    return { title: "المقال غير موجود" };
  }

  const title = article.seo_title || article.title;
  const description =
    article.seo_description ||
    "دليل عملي مفصل للمبتدئين في التداول، مع مقارنة حقيقية بين الوسطاء وأنواع الحسابات والحد الأدنى للإيداع والسبريد.";

 return {
  title,
  description,
  alternates: {
    canonical: "https://brokeralarab.com/how-to-start-trading-from-zero",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: "https://brokeralarab.com/how-to-start-trading-from-zero",
    type: "article",
    locale: "ar_AR",
    images: article.cover_image
  ? [`https://brokeralarab.com${article.cover_image}`]
  : [],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: article.cover_image
  ? [`https://brokeralarab.com${article.cover_image}`]
  : [],
  },
};
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function parseMinDeposit(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;

  const normalized = value.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (!normalized) return null;

  const parsed = Number(normalized[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseSpreadMin(value: string | null | undefined): number | null {
  if (!value) return null;

  const cleaned = value.replace(/,/g, "");
  const matches = cleaned.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length === 0) return null;

  const nums = matches.map(Number).filter((n) => Number.isFinite(n));
  if (!nums.length) return null;

  return Math.min(...nums);
}

function formatMoney(value: number | null) {
  if (value === null) return "-";
  return `$${value}`;
}

function getBestRatedBroker(brokers: Broker[]) {
  return [...brokers]
    .filter((b) => b.rating !== null)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0];
}

function getLowestDepositBroker(brokers: Broker[]) {
  return [...brokers]
    .filter((b) => b.min_deposit !== null)
    .sort((a, b) => (a.min_deposit ?? 999999) - (b.min_deposit ?? 999999))[0];
}

function getLowestSpreadAccount(accounts: AccountRow[]) {
  return [...accounts]
    .map((a) => ({
      ...a,
      parsedSpread: parseSpreadMin(a.spread),
    }))
    .filter((a) => a.parsedSpread !== null)
    .sort((a, b) => (a.parsedSpread ?? 999) - (b.parsedSpread ?? 999))[0];
}

function getIslamicAccounts(accounts: AccountRow[]) {
  return accounts.filter((a) => a.is_islamic_available);
}

function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("mb-6", centered && "text-center")}>
      {eyebrow && (
        <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
          {eyebrow}
        </span>
      )}

      <h2 className="mt-3 text-[26px] font-black leading-[1.35] text-slate-950 md:text-[34px]">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-4xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
          {description}
        </p>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-[13px] font-black text-slate-500">{title}</div>
      <div className="mt-2 text-[22px] font-black leading-tight text-slate-950">
        {value}
      </div>
      <p className="mt-2 text-[13px] leading-7 text-slate-600">{hint}</p>
    </div>
  );
}

function ActionButtonRow() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/best-brokers"
        className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#16a34a_0%,#22c55e_100%)] px-6 py-3.5 text-sm font-black text-white transition hover:opacity-95"
      >
        ابدأ باختيار وسيط مناسب
      </Link>

      <Link
        href="/compare"
        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-900 transition hover:bg-slate-50"
      >
        قارن بين الوسطاء
      </Link>
    </div>
  );
}

function BrokerMiniCard({ broker }: { broker: Broker }) {
  const reviewHref = broker.slug ? `/brokers/${broker.slug}` : "/best-brokers";
  const accountHref = broker.real_account_url || reviewHref;

  return (
    <article className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {broker.logo ? (
            <Image
              src={broker.logo}
              alt={broker.name}
              fill
              className="object-contain p-2"
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-[16px] font-black text-slate-950">
              {broker.name}
            </h3>
           

            {broker.rating !== null && (
              <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-black text-amber-700">
                {Number(broker.rating).toFixed(2)} ★
              </span>
            )}
          </div>

          {broker.best_for && (
            <p className="mt-1 text-[12px] leading-6 text-slate-500">
              الأفضل لـ: {broker.best_for}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-[12px] leading-6 text-slate-600">
        {broker.platforms && (
          <p>
            <span className="font-black text-slate-900">المنصات:</span>{" "}
            {broker.platforms}
          </p>
        )}

        {broker.min_deposit !== null && (
          <p>
            <span className="font-black text-slate-900">الحد الأدنى:</span>{" "}
            {formatMoney(broker.min_deposit)}
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          href={reviewHref}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-900 transition hover:bg-slate-50"
        >
          التقييم
        </Link>

        <Link
          href={accountHref}
          className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#16a34a_0%,#22c55e_100%)] px-3 py-2 text-xs font-black text-white transition hover:opacity-95"
        >
          افتح حساب
        </Link>
      </div>
    </article>
  );
}

function FeaturedBrokerCard({
  broker,
  badge,
}: {
  broker: Broker;
  badge: string;
}) {
  const reviewHref = broker.slug ? `/brokers/${broker.slug}` : "/best-brokers";
  const accountHref = broker.real_account_url || reviewHref;

  return (
    <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black text-amber-700">
            {badge}
          </span>

          {broker.rating !== null && (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-black text-white">
              {Number(broker.rating).toFixed(2)} / 5
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-[62px] w-[62px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {broker.logo ? (
              <Image
                src={broker.logo}
                alt={broker.name}
                fill
                className="object-contain p-2"
              />
            ) : null}
          </div>

          <div className="min-w-0">
            <h3 className="text-[20px] font-black text-slate-950">{broker.name}</h3>
            {broker.best_for && (
              <p className="mt-1 text-[13px] leading-7 text-slate-600">
                {broker.best_for}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-3">
            <div className="text-[12px] font-black text-slate-500">الحد الأدنى</div>
            <div className="mt-1 text-[18px] font-black text-slate-950">
              {broker.min_deposit !== null ? formatMoney(broker.min_deposit) : "-"}
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-3">
            <div className="text-[12px] font-black text-slate-500">المنصات</div>
            <div className="mt-1 text-[15px] font-black text-slate-950">
              {broker.platforms || "-"}
            </div>
          </div>
        </div>

        {broker.regulation && (
          <p className="mt-4 text-[13px] leading-7 text-slate-600">
            <span className="font-black text-slate-900">التراخيص:</span>{" "}
            {broker.regulation}
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href={reviewHref}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
          >
            عرض التقييم
          </Link>

          <Link
            href={accountHref}
            className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#16a34a_0%,#22c55e_100%)] px-4 py-3 text-sm font-black text-white transition hover:opacity-95"
          >
            افتح حساب
          </Link>
        </div>
      </div>
    </article>
  );
}

function StepCard({
  number,
  title,
  text,
  hint,
}: {
  number: string;
  title: string;
  text: string;
  hint: string;
}) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[30px] font-black leading-none text-brand-600">
          {number}
        </span>
        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
          خطوة عملية
        </span>
      </div>

      <h3 className="mt-4 text-[21px] font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-[15px] leading-8 text-slate-600">{text}</p>

      <div className="mt-4 rounded-[16px] border border-slate-200 bg-slate-50 p-3 text-[13px] leading-7 text-slate-700">
        <span className="font-black text-slate-950">المهم هنا:</span> {hint}
      </div>
    </article>
  );
}

function MistakeCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-[18px] font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-[16px] leading-8 text-slate-600">{text}</p>
    </div>
  );
}

function BrokerComparisonTable({ brokers }: { brokers: Broker[] }) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 md:px-6">
        <h2 className="text-[24px] font-black leading-[1.45] text-slate-950 md:text-[30px]">
  أفضل شركات التداول للمبتدئين في 2026
</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          هذه المقارنة تركّز على ما يهم المتداول الجديد فعلاً: سهولة البداية،
          قوة المنصات، الحد الأدنى للإيداع، والملاءمة العملية لأول حساب.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-right">
          <thead className="bg-white">
            <tr className="border-b border-slate-200">
              <th className="p-4 text-sm font-black text-slate-950">الشركة</th>
              <th className="p-4 text-sm font-black text-slate-950">التقييم</th>
              <th className="p-4 text-sm font-black text-slate-950">
                الحد الأدنى
              </th>
              <th className="p-4 text-sm font-black text-slate-950">المنصات</th>
              <th className="p-4 text-sm font-black text-slate-950">
                الأنسب لـ
              </th>
              <th className="p-4 text-sm font-black text-slate-950">الإجراء</th>
            </tr>
          </thead>

          <tbody>
            {brokers.map((broker) => (
              <tr
                key={broker.id}
                className="border-b border-slate-200 last:border-b-0"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      {broker.logo ? (
                        <Image
                          src={broker.logo}
                          alt={broker.name}
                          fill
                          className="object-contain p-2"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0">
                      <div className="text-[15px] font-black text-slate-950">
                        {broker.name}
                      </div>
                      {broker.regulation && (
                        <div className="mt-1 text-[12px] leading-6 text-slate-500">
                          {broker.regulation}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td className="p-4 text-sm font-black text-slate-900">
                  {broker.rating !== null
                    ? Number(broker.rating).toFixed(2)
                    : "-"}
                </td>

                <td className="p-4 text-sm text-slate-700">
                  {broker.min_deposit !== null ? formatMoney(broker.min_deposit) : "-"}
                </td>

                <td className="p-4 text-sm text-slate-700">
                  {broker.platforms || "-"}
                </td>

                <td className="p-4 text-sm text-slate-700">
                  {broker.best_for || "-"}
                </td>

                <td className="p-4">
                  <Link
                    href={broker.slug ? `/brokers/${broker.slug}` : "/best-brokers"}
                    className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2563eb_0%,#3b82f6_100%)] px-4 py-2.5 text-xs font-black text-white transition hover:opacity-95"
                  >
                    عرض التقييم
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AccountsComparisonTable({ accounts }: { accounts: AccountRow[] }) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-[24px] font-black text-slate-950 md:text-[28px]">
          مقارنة عملية بين أنواع الحسابات
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          بدل الكلام النظري فقط، هذا جدول فعلي يوضح الفروقات بين بعض الحسابات
          المتاحة لدى الوسطاء الذين اخترناهم لهذا الدليل.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-right">
          <thead className="bg-white">
            <tr className="border-b border-slate-200">
              <th className="p-4 text-sm font-black text-slate-950">الشركة</th>
              <th className="p-4 text-sm font-black text-slate-950">الحساب</th>
              <th className="p-4 text-sm font-black text-slate-950">السبريد</th>
              <th className="p-4 text-sm font-black text-slate-950">العمولة</th>
              <th className="p-4 text-sm font-black text-slate-950">
                الحد الأدنى
              </th>
              <th className="p-4 text-sm font-black text-slate-950">التنفيذ</th>
              <th className="p-4 text-sm font-black text-slate-950">إسلامي</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account, index) => (
              <tr
                key={`${account.broker_id}-${account.account_name}-${index}`}
                className="border-b border-slate-200 last:border-b-0"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-[44px] w-[44px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      {account.broker_logo ? (
                        <Image
                          src={account.broker_logo}
                          alt={account.broker_name}
                          fill
                          className="object-contain p-2"
                        />
                      ) : null}
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {account.broker_name}
                    </div>
                  </div>
                </td>

                <td className="p-4 text-sm font-bold text-slate-900">
                  {account.account_name || "-"}
                </td>

                <td className="p-4 text-sm text-slate-700">
                  {account.spread || "-"}
                </td>

                <td className="p-4 text-sm text-slate-700">
                  {account.commission || "-"}
                </td>

                <td className="p-4 text-sm text-slate-700">
                  {account.min_deposit || "-"}
                </td>

                <td className="p-4 text-sm text-slate-700">
                  {account.execution_type || "-"}
                </td>

                <td className="p-4 text-sm text-slate-700">
                  {account.is_islamic_available ? "متوفر" : "غير واضح"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function Page() {
  const supabase = await createClient();

  const article = {
  title: "كيف تبدأ التداول من الصفر خطوة بخطوة",
  excerpt:
    "إذا كنت تبحث عن طريقة واضحة لفهم كيف تبدأ التداول من الصفر، فهذا الدليل يأخذك خطوة بخطوة من أساسيات السوق إلى اختيار أفضل شركة تداول وفتح حساب حقيقي.",
  cover_image: "/articles/how-to-start-trading-from-zero.png",
};

  const { data: brokersData, error: brokersError } = await supabase
    .from("brokers")
    .select(
      "id, name, rating, min_deposit, platforms, regulation, best_for, logo, slug, real_account_url"
    )
    .in("id", FEATURED_BROKER_IDS);

  if (brokersError) {
    console.error("Brokers error:", brokersError);
  }

  const brokerOrderMap = new Map(FEATURED_BROKER_IDS.map((id, index) => [id, index]));
  const topBrokers: Broker[] = (brokersData ?? []).sort(
    (a, b) =>
      (brokerOrderMap.get(a.id) ?? 999) - (brokerOrderMap.get(b.id) ?? 999)
  );

  let accountsData: BrokerAccount[] = [];

  if (FEATURED_BROKER_IDS.length) {
    const { data: fetchedAccounts, error: accountsError } = await supabase
      .from("broker_accounts")
      .select(
        "broker_id, account_name, spread, commission, min_deposit, execution_type, is_islamic_available, sort_order"
      )
      .in("broker_id", FEATURED_BROKER_IDS)
      .order("sort_order", { ascending: true });

    if (accountsError) {
      console.error("Accounts error:", accountsError);
    }

    accountsData = (fetchedAccounts as BrokerAccount[] | null) ?? [];
  }

  const brokerMap = new Map(topBrokers.map((broker) => [broker.id, broker]));
  const accountRows: AccountRow[] = accountsData
    .map((account) => {
      const broker = brokerMap.get(account.broker_id);
      if (!broker) return null;

      return {
        ...account,
        broker_name: broker.name,
        broker_slug: broker.slug,
        broker_logo: broker.logo,
      };
    })
    .filter(Boolean) as AccountRow[];

  const quickAccounts = accountRows.slice(0, 8);

  const bestRatedBroker = getBestRatedBroker(topBrokers);
  const lowestDepositBroker = getLowestDepositBroker(topBrokers);
  const lowestSpreadAccount = getLowestSpreadAccount(accountRows);
  const islamicAccountsCount = getIslamicAccounts(accountRows).length;

  return (
    <main className="bg-[#f5f7fb]">
              <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://brokeralarab.com/how-to-start-trading-from-zero#article",
                headline: "كيف تبدأ التداول من الصفر خطوة بخطوة للمبتدئين",
                datePublished: "2026-03-23",
                dateModified: "2026-03-23",
                description:
                  "دليل شامل للمبتدئين لتعلم التداول من الصفر، اختيار أفضل شركة تداول، وفهم أساسيات السوق.",
                inLanguage: "ar",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": "https://brokeralarab.com/how-to-start-trading-from-zero",
                },
                author: {
  "@type": "Organization",
  name: "Broker Alarab",
  url: "https://brokeralarab.com",
},
                publisher: {
                  "@type": "Organization",
                  name: "Broker Alarab",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://brokeralarab.com/logo.png",
                  },
                },
                image: [
                  "https://brokeralarab.com/articles/how-to-start-trading-from-zero.png",
                ],
              },
              {
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
                    name: "تعلم التداول",
                    item: "https://brokeralarab.com/learn-trading",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "كيف تبدأ التداول من الصفر خطوة بخطوة",
                    item: "https://brokeralarab.com/how-to-start-trading-from-zero",
                  },
                ],
              },
              {
                "@type": "HowTo",
                name: "كيف تبدأ التداول من الصفر",
                inLanguage: "ar",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "افهم السوق أولًا",
                    text: "تعلّم أساسيات التداول مثل الفوركس والسبريد والحساب التجريبي قبل الدخول للسوق الحقيقي.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "اختر وسيطًا موثوقًا",
                    text: "ركّز على الترخيص، أنواع الحسابات، المنصة، ووضوح شروط الإيداع والسحب.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "ابدأ صغيرًا وبخطة",
                    text: "ابدأ بحساب تجريبي، ثم انتقل لحساب حقيقي بمبلغ صغير وخطة واضحة بدون استعجال.",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "هل يمكن البدء في التداول بدون خبرة؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "نعم، يمكن البدء في التداول بدون خبرة من خلال التعلم التدريجي واستخدام الحساب التجريبي قبل الانتقال إلى الحساب الحقيقي.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "كم يحتاج رأس مال لبدء التداول؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "يمكن البدء بمبلغ صغير مثل 50 إلى 200 دولار، لكن الأهم هو إدارة المخاطر وعدم المخاطرة بنسبة كبيرة من رأس المال في الصفقة الواحدة.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "ما هو أفضل سوق للمبتدئين؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "سوق الفوركس يعتبر من أكثر الأسواق شيوعًا للمبتدئين بسبب السيولة العالية وسهولة الوصول إليه عبر منصات التداول.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-5 md:px-6 md:pb-6 md:pt-8">
        <div className="mx-auto max-w-7xl">
          <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            {/* ========================= */}
{/* ========================= */}
{/* DESKTOP (UNCHANGED) */}
{/* ========================= */}
<div className="hidden md:block">

  {/* Hero */}
  <div className="border-b border-slate-200 px-5 py-5 md:px-8 md:py-6">
    <div className="mb-1" />

    <h1 className="text-[30px] font-black leading-[1.25] text-slate-950 md:text-[44px] md:leading-[1.18]">
  كيف تبدأ التداول من الصفر خطوة بخطوة للمبتدئين
</h1>
<div className="mt-3 flex items-center gap-3 text-[13px] text-slate-500">
  <span>📅 23 مارس 2026</span>
  <span>•</span>
  <span>آخر تحديث: 23 مارس 2026</span>
</div>

    {article.excerpt && (
      <div className="mt-4 space-y-3">
       <p className="w-full text-[16px] leading-8 text-slate-600 md:text-[18px] md:leading-9">
  إذا كنت تبحث عن طريقة واضحة لفهم كيف تبدأ التداول من الصفر، فهذا الدليل يأخذك خطوة بخطوة من أساسيات السوق إلى اختيار{" "}
  <Link href="/best-brokers" className="font-black text-brand-600 hover:underline">
    أفضل شركات التداول
  </Link>{" "}
  وفتح حساب حقيقي. ويمكنك أيضًا مراجعة{" "}
  <Link href="/compare" className="font-black text-brand-600 hover:underline">
    مقارنة الوسطاء
  </Link>{" "}
  قبل اتخاذ القرار النهائي.
</p>

        <p className="w-full text-[16px] leading-8 text-slate-700 md:text-[18px] md:leading-9">
          إذا كنت تتساءل <strong className="font-black text-slate-900">كيف تبدأ التداول من الصفر</strong> بدون أخطاء
          شائعة تؤدي إلى خسارة أول حساب، فهذا الدليل يشرح لك الطريق الصحيح خطوة
          بخطوة.
        </p>
      </div>
    )}
  </div>

  {/* Cover */}
  <div className="px-5 pt-5 md:px-8 md:pt-8">
    <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
      <div className="relative aspect-[16/8] w-full">
        <Image
          src={article.cover_image || "/articles/how-to-start-trading-from-zero.jpg"}
          alt="كيف تبدأ التداول من الصفر شرح عملي للمبتدئين"
          fill
          className="object-cover scale-[1.02]"
          priority
        />
      </div>
    </div>
  </div>

  {/* KEEP ALL YOUR ORIGINAL DESKTOP BELOW (UNCHANGED) */}
</div>

{/* ========================= */}
{/* 🔥 MOBILE HERO FINAL PRO */}
{/* ========================= */}
<div className="md:hidden px-4 pt-4 space-y-4">

  {/* 🔥 MAIN TITLE OUTSIDE */}
  <h1 className="text-[24px] font-black leading-[1.4] text-slate-900">
  كيف تبدأ التداول من الصفر خطوة بخطوة للمبتدئين
</h1>

  {/* CARD */}
  <div className="bg-white rounded-[20px] p-[14px] shadow-sm border border-slate-200">

    {/* Image */}
    <div className="relative h-[160px] w-full overflow-hidden rounded-[14px]">
      <Image
        src={article.cover_image || "/articles/how-to-start-trading-from-zero.jpg"}
        alt="كيف تبدأ التداول من الصفر شرح عملي للمبتدئين"
        fill
        className="object-cover"
      />
    </div>

    {/* Description */}
    <p className="w-full text-[16px] leading-8 text-slate-600 md:text-[18px] md:leading-9">
  إذا كنت تبحث عن طريقة واضحة لفهم كيف تبدأ التداول من الصفر، فهذا الدليل يأخذك خطوة بخطوة من أساسيات السوق إلى اختيار{" "}
  <Link href="/best-brokers" className="font-black text-brand-600 hover:underline">
    أفضل شركات التداول
  </Link>{" "}
  وفتح حساب حقيقي. ويمكنك أيضًا مراجعة{" "}
  <Link href="/compare" className="font-black text-brand-600 hover:underline">
    مقارنة الوسطاء
  </Link>{" "}
  قبل اتخاذ القرار النهائي.
</p>

    {/* Supporting */}
    <p className="mt-2 text-[13px] leading-7 text-slate-600 font-medium">
      هذا الدليل يشرح لك كيف تبدأ التداول من الصفر بطريقة صحيحة بدون أخطاء شائعة.
    </p>

  </div>

</div>

           {/* ========================= */}
{/* Quick summary */}
{/* ========================= */}

{/* DESKTOP (UNCHANGED) */}
<div className="hidden md:block px-5 py-6 md:px-8 md:py-6">
  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7ff_100%)] px-5 pt-3 pb-5 md:px-6 md:pt-4 md:pb-6">
      <div>
        <div className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black text-amber-700">
          البداية الصحيحة أهم من الربح السريع
        </div>

        <h2 className="mt-0 text-[24px] font-black leading-[1.45] text-slate-950 md:text-[30px]">
          كيف تبدأ التداول من الصفر (دليل شامل للمبتدئين 2026)
        </h2>

        <p className="mt-3 text-[16px] leading-8 text-slate-700 md:text-[15px]">
          كثير من المبتدئين يدخلون التداول وهم يركزون على الربح فقط، لكن الحقيقة أن
          البداية الخاطئة هي السبب الرئيسي في خسارة أول حساب. لهذا السبب، إذا كنت تريد
          فهم <strong className="font-black text-slate-900">كيف تبدأ التداول من الصفر</strong> بشكل صحيح،
          فابدأ أولًا بهذه الخطوات الثلاث: فهم السوق، اختيار وسيط موثوق، ثم التدريب
          العملي بحساب تجريبي قبل المخاطرة بأي مال حقيقي.
        </p>
      </div>
    </div>

    <div className="p-4 md:p-5">
      <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/70 p-4 md:p-5">
        <h3 className="text-[16px] font-black text-slate-900 md:text-[17px]">
          مثال سريع: كيف يبدأ المبتدئ عمليًا؟
        </h3>

        <p className="mt-2 text-[14px] leading-7 text-slate-700 md:text-[15px]">
          لنفترض أنك بدأت بمبلغ <strong className="font-black text-slate-900">500 دولار</strong>.
          الأفضل ألا تخاطر بأكثر من <strong className="font-black text-slate-900">1%</strong> في الصفقة الواحدة،
          أي حوالي <strong className="font-black text-slate-900">5 دولارات</strong> فقط لكل صفقة.
          بهذه الطريقة تتعلم بهدوء، وتحمي رأس مالك، وتتجنب خسارة الحساب بسرعة بسبب قرارات متسرعة.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute right-0 top-0 h-1.5 w-full bg-[linear-gradient(90deg,#2563eb_0%,#60a5fa_100%)] opacity-90" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-[16px] font-black text-white shadow-sm">
              01
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
              الأساس
            </span>
          </div>

          <h3 className="mt-4 text-[21px] font-black leading-8 text-slate-950">
            افهم السوق أولًا
          </h3>

          <p className="mt-3 text-[16px] leading-8 text-slate-600">
            افهم أساسيات التداول مثل الفوركس والسبريد والحساب التجريبي قبل الدخول
            للسوق الحقيقي.
          </p>

          <div className="mt-auto pt-4 min-h-[70px] rounded-[16px] border border-brand-100 bg-brand-50/70 px-3 py-2 text-[12px] font-bold leading-7 line-clamp-2 text-blue-800">
            كل بداية قوية تبدأ من فهم واضح، لا من استعجال الدخول.
          </div>
        </article>

        <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute right-0 top-0 h-1.5 w-full bg-[linear-gradient(90deg,#0f172a_0%,#475569_100%)] opacity-90" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-[16px] font-black text-white shadow-sm">
              02
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
              القرار
            </span>
          </div>

          <h3 className="mt-4 text-[21px] font-black leading-8 text-slate-950">
            اختر وسيطًا موثوقًا
          </h3>

          <p className="mt-3 text-[16px] leading-8 text-slate-600">
            لا تنخدع باسم مشهور فقط؛ الأهم هو الترخيص، نوع الحسابات، المنصات،
            ووضوح شروط الإيداع والسحب.
          </p>

          <div className="mt-auto pt-4 min-h-[70px] rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-bold leading-7 line-clamp-2 text-slate-700">
            اختيار الشركة من البداية يختصر عليك كثيرًا من الأخطاء لاحقًا.
          </div>
        </article>

        <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute right-0 top-0 h-1.5 w-full bg-[linear-gradient(90deg,#16a34a_0%,#4ade80_100%)] opacity-90" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-[16px] font-black text-white shadow-sm">
              03
            </div>

            <span className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-[11px] font-black text-green-700">
              التنفيذ
            </span>
          </div>

          <h3 className="mt-4 text-[21px] font-black leading-8 text-slate-950">
            ابدأ صغيرًا وبخطة
          </h3>

          <p className="mt-3 text-[16px] leading-8 text-slate-600">
            ابدأ بحساب تجريبي ثم انتقل لحساب حقيقي بمبلغ صغير وخطة واضحة
            بدون استعجال.
          </p>

          <div className="mt-auto pt-4 min-h-[70px] rounded-[16px] border border-green-100 bg-green-50/70 px-3 py-2 text-[12px] font-bold leading-7 text-green-800">
            الهدف في البداية ليس الربح السريع، بل بناء عادة تداول صحيحة.
          </div>
        </article>
      </div>
    </div>
  </div>
</div>

{/* MOBILE (NEW DESIGN) */}
<div className="md:hidden px-4 py-5">
  <section className="space-y-4">
    <div className="rounded-[22px] border border-slate-200 bg-white p-[14px] shadow-sm">
      <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black text-amber-700">
        البداية الصحيحة أهم من الربح السريع
      </div>

      <h2 className="mt-3 text-[21px] font-black leading-[1.45] text-slate-950">
        كيف تبدأ التداول من الصفر
      </h2>

      <p className="mt-3 text-[14px] leading-7 text-slate-600">
        كثير من المبتدئين يركزون على الربح أولًا، لكن البداية الصحيحة تكون بفهم
        السوق، ثم اختيار وسيط مناسب، ثم التدريب العملي قبل المخاطرة.
      </p>
    </div>

    <div className="rounded-[22px] border border-brand-100 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)] p-[14px] shadow-sm">
      <h3 className="text-[16px] font-black leading-7 text-slate-900">
        مثال سريع: كيف يبدأ المبتدئ عمليًا؟
      </h3>

      <p className="mt-2 text-[14px] leading-7 text-slate-700">
        لو بدأت بمبلغ <strong className="font-black text-slate-900">500 دولار</strong>،
        فالأفضل ألا تخاطر بأكثر من <strong className="font-black text-slate-900">1%</strong>
        في الصفقة، أي حوالي <strong className="font-black text-slate-900">5 دولارات</strong>.
        بهذه الطريقة تتعلم بهدوء وتحمي رأس مالك.
      </p>
    </div>

    <div className="space-y-3">
      <article className="overflow-hidden rounded-[22px] border border-brand-100 bg-white shadow-sm">
        <div className="h-1.5 w-full bg-[linear-gradient(90deg,#2563eb_0%,#60a5fa_100%)]" />
        <div className="p-[14px]">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
              الأساس
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-[15px] font-black text-white shadow-sm">
              01
            </div>
          </div>

          <h3 className="mt-4 text-[18px] font-black leading-7 text-slate-950">
            افهم السوق أولًا
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-slate-600">
            تعلّم أساسيات التداول مثل الفوركس والسبريد والحساب التجريبي قبل الدخول
            للسوق الحقيقي.
          </p>

          <div className="mt-4 rounded-[16px] border border-brand-100 bg-brand-50/70 px-3 py-3 text-[12px] font-bold leading-6 text-blue-800">
            كل بداية قوية تبدأ من فهم واضح، لا من استعجال الدخول.
          </div>
        </div>
      </article>

      <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 w-full bg-[linear-gradient(90deg,#0f172a_0%,#475569_100%)]" />
        <div className="p-[14px]">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
              القرار
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-[15px] font-black text-white shadow-sm">
              02
            </div>
          </div>

          <h3 className="mt-4 text-[18px] font-black leading-7 text-slate-950">
            اختر وسيطًا موثوقًا
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-slate-600">
            لا تنخدع بالاسم فقط؛ ركّز على الترخيص، أنواع الحسابات، المنصة، ووضوح
            شروط الإيداع والسحب.
          </p>

          <div className="mt-4 rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-3 text-[12px] font-bold leading-6 text-slate-700">
            اختيار الشركة من البداية يختصر عليك كثيرًا من الأخطاء لاحقًا.
          </div>
        </div>
      </article>

      <article className="overflow-hidden rounded-[22px] border border-green-100 bg-white shadow-sm">
        <div className="h-1.5 w-full bg-[linear-gradient(90deg,#16a34a_0%,#4ade80_100%)]" />
        <div className="p-[14px]">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-[11px] font-black text-green-700">
              التنفيذ
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-[15px] font-black text-white shadow-sm">
              03
            </div>
          </div>

          <h3 className="mt-4 text-[18px] font-black leading-7 text-slate-950">
            ابدأ صغيرًا وبخطة
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-slate-600">
            ابدأ بحساب تجريبي، ثم انتقل لحساب حقيقي بمبلغ صغير وخطة واضحة بدون
            استعجال.
          </p>

          <div className="mt-4 rounded-[16px] border border-green-100 bg-green-50/70 px-3 py-3 text-[12px] font-bold leading-6 text-green-800">
            الهدف في البداية ليس الربح السريع، بل بناء عادة تداول صحيحة.
          </div>
        </div>
      </article>
    </div>
  </section>
</div>

{/* ========================= */}
{/* What is trading + beginner roadmap */}
{/* ========================= */}

{/* DESKTOP (UNCHANGED) */}
<div className="hidden md:block px-5 py-6 md:px-8 md:py-6">
  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7ff_100%)] px-5 py-6 md:px-7 md:py-2">
      <h2 className="mt-3 text-[28px] font-black leading-[1.4] text-slate-950 md:text-[36px]">
        ما هو التداول؟ شرح مبسط للمبتدئين + كيف تبدأ خطوة بخطوة
      </h2>

      <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
        اختيار <strong className="font-black text-slate-900">أفضل شركة تداول للمبتدئين</strong>
        لا يعتمد فقط على شهرة العلامة التجارية، بل على عوامل مهمة مثل الترخيص، سهولة
        استخدام المنصة، الحد الأدنى للإيداع، جودة الدعم الفني، ووضوح الرسوم. لهذا قمنا
        بعرض مجموعة من الشركات المناسبة للمبتدئ العربي مع نظرة سريعة تساعدك على المقارنة
        واختيار الوسيط الأنسب لك.
      </p>
    </div>

    <div className="p-5 md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] border border-brand-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5">
          <div className="mb-4 inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
            لماذا يدخل الناس هذا المجال؟
          </div>

          <h3 className="text-[22px] font-black text-slate-950">
            لماذا يجذب التداول هذا العدد الكبير من الناس؟
          </h3>

          <ul className="mt-4 space-y-2.5 pr-5 text-[15px] leading-8 text-slate-600">
            <li>سهولة الوصول إلى الأسواق عبر الجوال أو الكمبيوتر في أي وقت تقريبًا.</li>
            <li>إمكانية البدء بمبالغ صغيرة لدى بعض شركات التداول المناسبة للمبتدئين.</li>
            <li>وجود حسابات تجريبية تسمح بالتعلم وفهم المنصة بدون مخاطرة مالية.</li>
            <li>تنوع الأدوات المالية مثل الفوركس والذهب والمؤشرات والعملات.</li>
            <li>إمكانية تطوير مهارة عملية قد تتحول مع الوقت إلى أسلوب تداول منظم.</li>
          </ul>
        </div>

        <div className="rounded-[22px] border border-rose-100 bg-[linear-gradient(180deg,#fff8f8_0%,#ffffff_100%)] p-5">
          <div className="mb-4 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-[11px] font-black text-rose-700">
            أخطاء شائعة
          </div>

          <h3 className="text-[22px] font-black text-slate-950">
            أين يفشل معظم المبتدئين في التداول؟
          </h3>

          <ul className="mt-4 space-y-2.5 pr-5 text-[15px] leading-8 text-slate-600">
            <li>الاعتقاد بإمكانية الربح السريع خلال أيام قليلة بدون تعلم حقيقي.</li>
            <li>اختيار شركة تداول فقط لأنها مشهورة أو بسبب إعلان تسويقي.</li>
            <li>إيداع مبلغ كبير قبل تجربة الحساب التجريبي وفهم المنصة.</li>
            <li>التداول بدون فهم السبريد والرافعة المالية وإدارة المخاطر.</li>
            <li>فتح صفقات عشوائية بدون خطة دخول وخروج واضحة.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

{/* MOBILE (NEW DESIGN) */}
<div className="md:hidden px-4 pb-5">
  <section className="space-y-4">
    <div className="rounded-[22px] border border-slate-200 bg-white p-[14px] shadow-sm">
      <h2 className="text-[20px] font-black leading-7 text-slate-950">
        ما هو التداول؟
      </h2>

      <p className="mt-3 text-[14px] leading-7 text-slate-600">
        التداول هو شراء وبيع الأصول بهدف الاستفادة من تغير الأسعار، لكن النجاح
        فيه يحتاج إلى فهم صحيح وليس استعجال.
      </p>
    </div>

    <div className="rounded-[22px] border border-brand-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-[14px] shadow-sm">
      <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
        لماذا يدخل الناس هذا المجال؟
      </div>

      <h3 className="mt-3 text-[17px] font-black leading-7 text-slate-950">
        لماذا يجذب التداول هذا العدد الكبير من الناس؟
      </h3>

      <ul className="mt-3 space-y-2 text-[14px] leading-7 text-slate-600">
        <li>• سهولة الوصول إلى الأسواق عبر الجوال أو الكمبيوتر.</li>
        <li>• إمكانية البدء بمبالغ صغيرة لدى بعض الوسطاء.</li>
        <li>• وجود حسابات تجريبية للتعلم بدون مخاطرة.</li>
        <li>• تنوع الأدوات مثل الفوركس والذهب والمؤشرات.</li>
      </ul>
    </div>

    <div className="rounded-[22px] border border-rose-100 bg-[linear-gradient(180deg,#fff8f8_0%,#ffffff_100%)] p-[14px] shadow-sm">
      <div className="inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-[11px] font-black text-rose-700">
        أخطاء شائعة
      </div>

      <h3 className="mt-3 text-[17px] font-black leading-7 text-slate-950">
        أين يفشل معظم المبتدئين في التداول؟
      </h3>

      <ul className="mt-3 space-y-2 text-[14px] leading-7 text-slate-600">
        <li>• الاعتقاد بإمكانية الربح السريع بدون تعلم.</li>
        <li>• اختيار شركة تداول بسبب إعلان أو شهرة فقط.</li>
        <li>• إيداع مبلغ كبير قبل تجربة الحساب التجريبي.</li>
        <li>• التداول بدون خطة أو إدارة مخاطر واضحة.</li>
      </ul>
    </div>
  </section>
</div>

{/* Best brokers for beginners */}
<div className="px-5 pb-10 md:px-8 md:pb-12">

  {/* ========================= */}
  {/* DESKTOP (UNCHANGED + 2 LINK FIXES) */}
  {/* ========================= */}
  <div className="hidden md:block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7ff_100%)] px-5 py-6 md:px-7 md:py-7">
      <div>
        <h2 className="text-[28px] font-black leading-[1.35] text-slate-950 md:text-[34px]">
          أفضل شركات التداول للمبتدئين
        </h2>

        <p className="mt-3 w-full text-[16px] leading-8 text-slate-600 md:text-[15px]">
          اخترنا أفضل شركات التداول للمبتدئين بناءً على التراخيص، أنواع الحسابات، وتجربة الاستخدام الفعلية، لضمان بداية آمنة وواضحة بدون تعقيد.
          يساعدك هذا الجدول على مقارنة شركات التداول واختيار أفضل وسيط فوركس مناسب لك من حيث الحد الأدنى للإيداع، السبريد، وسهولة فتح الحساب للمبتدئ.
        </p>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] text-right">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200">
            <th className="px-5 py-4 text-sm font-black text-slate-900">الشركة</th>
            <th className="px-5 py-4 text-sm font-black text-slate-900">التقييم</th>
            <th className="px-5 py-4 text-sm font-black text-slate-900">الأنسب لـ</th>
            <th className="px-5 py-4 text-sm font-black text-slate-900">الحد الأدنى</th>
            <th className="px-5 py-4 text-sm font-black text-slate-900">نوع الحساب</th>
            <th className="px-5 py-4 text-sm font-black text-slate-900">السبريد</th>
            <th className="px-5 py-4 text-sm font-black text-slate-900">الإجراء</th>
          </tr>
        </thead>

        <tbody>
          {topBrokers.slice(0, 3).map((broker, index) => {
            const account = accountRows.find((acc) => acc.broker_id === broker.id);
            const isTopPick = index === 0;
            const reviewHref = broker.slug ? `/brokers/${broker.slug}` : "/best-brokers";

            return (
              <tr
                key={broker.id}
                className={`border-b border-slate-200 align-middle transition ${
                  isTopPick ? "bg-brand-50" : "bg-white hover:bg-slate-50"
                }`}
              >
                {/* Company */}
                <td className="px-5 py-5">
                  <div className="flex items-center gap-4">
                    <Link
                      href={reviewHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      {broker.logo ? (
                        <Image
                          src={broker.logo}
                          alt={broker.name}
                          fill
                          className="object-contain p-1.5"
                        />
                      ) : null}
                    </Link>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={reviewHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[20px] font-black text-slate-950 transition hover:text-brand-600"
                        >
                          {broker.name}
                        </Link>

                        {isTopPick && (
                          <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                            اختيار قوي للمبتدئ
                          </span>
                        )}
                      </div>

                      {broker.regulation && (
                        <div className="mt-1 text-[11px] leading-6 text-slate-400">
                          {broker.regulation}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="px-5 py-5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] px-3 py-1.5 text-[13px] font-black text-white shadow-sm">
                    <span>★</span>
                    <span>{broker.rating ?? "4.5"}</span>
                  </span>
                </td>

                {/* Best for */}
                <td className="px-5 py-5">
                  <div className="max-w-[180px] text-[16px] font-semibold leading-7 text-slate-700">
                    {index === 0
                      ? "مناسب للمبتدئين"
                      : index === 1
                      ? "إيداع منخفض"
                      : "سبريد منخفض"}
                  </div>
                </td>

                {/* Min deposit */}
                <td className="px-5 py-5">
                  <div className="inline-flex rounded-xl border border-brand-100 bg-[linear-gradient(135deg,#eff6ff_0%,#dbeafe_100%)] px-3 py-2 text-[16px] font-black text-blue-800">
                    {account?.min_deposit ||
                      (broker.min_deposit ? `$${broker.min_deposit}` : "$10")}
                  </div>
                </td>

                {/* Account type */}
                <td className="px-5 py-5">
                  <div className="text-[16px] font-bold text-slate-900">
                    {account?.account_name || "Standard"}
                  </div>
                  <div className="mt-1 text-[12px] text-slate-500">
                    مناسب كبداية بسيطة
                  </div>
                </td>

                {/* Spread */}
                <td className="px-5 py-5">
                  <div className="text-[16px] font-bold text-slate-900">
                    {account?.spread || "-"}
                  </div>
                  <div className="mt-1 text-[12px] text-slate-500">
                    سبريد معلن
                  </div>
                </td>

                {/* Actions */}
                <td className="px-5 py-5">
                  <div className="flex min-w-[150px] flex-col gap-2">
                    <Link
                      href={broker.real_account_url || reviewHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#16a34a_0%,#22c55e_100%)] px-4 py-2.5 text-sm font-black text-white shadow-md transition hover:scale-[1.03] hover:opacity-95"
                    >
                      افتح حساب تداول
                    </Link>

                    <Link
                      href={reviewHref}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-900 transition hover:bg-slate-50"
                    >
                      التقييم
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 md:px-6">
      <p className="text-[13px] leading-7 text-slate-600">
        ملاحظة: المقارنة أعلاه مناسبة للمبتدئ الذي يبحث عن بداية سهلة، لكن قرار
        فتح الحساب يجب أن يتم بعد قراءة تقييم كل شركة ومراجعة تفاصيل الحسابات
        والرسوم.
      </p>
    </div>
  </div>

 {/* ========================= */}
{/* MOBILE CLEAN FIXED VERSION */}
{/* ========================= */}
<div className="md:hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fc_100%)] px-4 py-5">
    <h2 className="text-[23px] font-black leading-[1.35] text-slate-950">
      أفضل شركات التداول للمبتدئين
    </h2>

    <p className="mt-3 text-[14px] leading-7 text-slate-600">
      اخترنا لك شركات مناسبة للبداية من حيث الترخيص، سهولة الاستخدام، والحد الأدنى
      لفتح الحساب.
    </p>
  </div>

  <div className="space-y-3 p-3">
    {topBrokers.slice(0, 3).map((broker, index) => {
      const account = accountRows.find((acc) => acc.broker_id === broker.id);
      const reviewHref = broker.slug ? `/brokers/${broker.slug}` : "/best-brokers";

      const badgeText =
        index === 0 ? "اختيار قوي" : index === 1 ? "إيداع منخفض" : "سبريد منخفض";

      return (
        <details
          key={broker.id}
          className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
        >
          <summary className="list-none cursor-pointer p-4">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm">
                {broker.logo ? (
                  <Image
                    src={broker.logo}
                    alt={broker.name}
                    fill
                    className="object-contain p-2"
                  />
                ) : null}
              </div>

              {/* Main text */}
              <div className="min-w-0 flex-1">
                <div>
  <h3 className="text-[20px] font-black leading-6 text-slate-950">
    {broker.name}
  </h3>

  <span className="mt-2 inline-flex rounded-full border border-brand-100 bg-brand-50 px-2 py-0.5 text-[9px] font-bold text-brand-600">
    {badgeText}
  </span>
</div>

                
              </div>

              {/* Toggle */}
              <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
                  ⌄
              </div>
            </div>
          </summary>

          <div className="border-t border-slate-200 bg-slate-50/60 px-4 pb-4 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] px-3 py-1.5 text-[11px] font-black text-white shadow-sm">
                ★ {broker.rating ?? "4.5"}
              </span>

              {broker.min_deposit !== null && (
                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[11px] font-black text-brand-600">
                  من ${broker.min_deposit}
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="rounded-[18px] border border-slate-200 bg-white px-3 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.04)]">
                <div className="text-[11px] font-black tracking-tight text-slate-500">
                  نوع الحساب
                </div>
                <div className="mt-1.5 text-[15px] font-black leading-6 text-slate-950">
                  {account?.account_name || "Standard"}
                </div>
              </div>

              <div className="rounded-[18px] border border-slate-200 bg-white px-3 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.04)]">
                <div className="text-[11px] font-black tracking-tight text-slate-500">
                  السبريد
                </div>
                <div className="mt-1.5 text-[15px] font-black leading-6 text-slate-950">
                  {account?.spread || "-"}
                </div>
              </div>

              <div className="rounded-[18px] border border-slate-200 bg-white px-3 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.04)]">
                <div className="text-[11px] font-black tracking-tight text-slate-500">
                  الحد الأدنى
                </div>
                <div className="mt-1.5 text-[15px] font-black leading-6 text-slate-950">
                  {account?.min_deposit ||
                    (broker.min_deposit ? `$${broker.min_deposit}` : "$10")}
                </div>
              </div>

              <div className="rounded-[18px] border border-slate-200 bg-white px-3 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.04)]">
                <div className="text-[11px] font-black tracking-tight text-slate-500">
                  الأنسب لـ
                </div>
                <div className="mt-1.5 text-[15px] font-black leading-6 text-slate-950">
                  {index === 0
                    ? "المبتدئين"
                    : index === 1
                    ? "الحسابات الصغيرة"
                    : "الباحثين عن سبريد أقل"}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href={reviewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[16px] border border-brand-100 bg-white px-3 py-3 text-center text-[14px] font-black leading-5 text-brand-600 transition hover:bg-brand-50"
              >
                التقييم
              </Link>

              <Link
                href={broker.real_account_url || reviewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[16px] border border-brand-100 bg-white px-3 py-3 text-center text-[14px] font-black leading-5 text-brand-600 transition hover:bg-brand-50"
              >
                افتح حساب
              </Link>
            </div>
          </div>
        </details>
      );
    })}
  </div>

  <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
    <p className="text-[12px] leading-7 text-slate-600">
      ملاحظة: هذه المقارنة مناسبة للمبتدئ الذي يبحث عن بداية سهلة، لكن الأفضل
      دائمًا قراءة تقييم كل شركة قبل فتح الحساب.
    </p>
  </div>
</div>
</div>

{/* Forex Full Guide Section */}
<div className="px-5 pb-12 md:px-8 md:pb-14">

  {/* ========================= */}
  {/* DESKTOP (UNCHANGED 100%) */}
  {/* ========================= */}
  <div className="hidden md:block rounded-[28px] border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
  
    {/* Title */}
    <h2 className="text-right text-[28px] font-black leading-[1.4] text-slate-950 md:text-[34px]">
     أساسيات التداول في الفوركس للمبتدئين (شرح مبسط خطوة بخطوة)
    </h2>

    {/* Intro */}
    <p className="mt-5 text-[18px] leading-10 text-slate-700">
      إذا كنت تبحث عن طريقة واضحة لفهم كيف تبدأ التداول من الصفر، فلابد أن تبدأ من الأساس الصحيح: 
      فهم سوق الفوركس وطريقة عمله. الكثير من المبتدئين يدخلون السوق بهدف الربح السريع، 
      لكن الحقيقة أن التداول ليس لعبة حظ، بل مهارة تحتاج إلى تعلم وصبر وانضباط.
    </p>

    <p className="mt-4 text-right text-[18px] leading-10 text-slate-700">
      في هذا الدليل، سنشرح لك أساسيات التداول في الفوركس خطوة بخطوة، بطريقة عملية تساعدك على 
      اتخاذ قرارات أفضل وتجنب الأخطاء التي يقع فيها معظم المبتدئين.
    </p>

    {/* Divider */}
    <div className="my-8 h-[1px] bg-slate-200"></div>

    {/* Section 1 */}
    <h3 className="text-[22px] font-black text-slate-900">
      ما هو سوق الفوركس؟
    </h3>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      سوق الفوركس (Forex) هو أكبر سوق مالي في العالم، يتم فيه تداول العملات مثل الدولار الأمريكي، 
      اليورو، الجنيه الإسترليني، والين الياباني. يتم التداول عبر شراء عملة وبيع عملة أخرى في نفس الوقت.
    </p>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      يتميز هذا السوق بسيولة ضخمة جدًا، حيث يتجاوز حجم التداول اليومي تريليونات الدولارات، 
      مما يجعله سوقًا سريع التنفيذ ومتاحًا للجميع، سواء كنت مبتدئًا أو محترفًا.
    </p>

    <div className="mt-5 rounded-xl bg-brand-50 border border-brand-100 p-4 text-[15px] leading-8 text-blue-800">
      الفوركس ليس استثمارًا تقليديًا، بل يعتمد على توقع حركة الأسعار، لذلك الفهم أهم من رأس المال.
    </div>

    {/* Section 2 */}
    <h3 className="mt-8 text-[22px] font-black text-slate-900">
      كيف يتم التداول في الفوركس؟
    </h3>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      التداول في الفوركس يتم من خلال أزواج العملات مثل EUR/USD أو GBP/USD. 
      عند فتح صفقة، لديك خياران:
    </p>

    <ul className="mt-3 space-y-2 text-[17px] leading-8 text-slate-700">
      <li>• شراء (Buy): إذا كنت تتوقع أن السعر سيرتفع</li>
      <li>• بيع (Sell): إذا كنت تتوقع أن السعر سينخفض</li>
    </ul>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      الفرق بين سعر الدخول وسعر الخروج هو ما يحدد الربح أو الخسارة. 
      كل حركة صغيرة في السعر يمكن أن تؤثر على نتيجتك، لذلك التحكم في الصفقة مهم جدًا.
    </p>

    {/* Section 3 */}
    <h3 className="mt-8 text-[22px] font-black text-slate-900">
      ما هي أزواج العملات؟
    </h3>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      كل صفقة في الفوركس تتكون من زوج عملات. العملة الأولى تسمى العملة الأساسية، 
      والثانية تسمى عملة التسعير.
    </p>

    <ul className="mt-3 space-y-2 text-[17px] leading-8 text-slate-700">
      <li>• الأزواج الرئيسية: مثل EUR/USD (الأكثر استقرارًا)</li>
      <li>• الأزواج الثانوية: مثل EUR/GBP</li>
      <li>• الأزواج الغريبة: مثل USD/TRY (أكثر مخاطرة)</li>
    </ul>

    {/* Section 4 */}
    <h3 className="mt-8 text-[22px] font-black text-slate-900">
      أهم مصطلحات التداول التي يجب أن تعرفها
    </h3>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      قبل أن تبدأ، هناك مصطلحات أساسية يجب فهمها:
    </p>

    <ul className="mt-3 space-y-3 text-[17px] leading-8 text-slate-700">
      <li><strong>• السبريد:</strong> الفرق بين سعر الشراء والبيع (تكلفة التداول)</li>
      <li><strong>• اللوت:</strong> حجم الصفقة (0.01 مناسب للمبتدئين)</li>
      <li><strong>• الرافعة المالية:</strong> تضاعف رأس المال لكنها تزيد المخاطر</li>
      <li><strong>• الحساب التجريبي:</strong> للتعلم بدون مخاطرة</li>
    </ul>

    {/* Section 5 */}
    <h3 className="mt-8 text-[22px] font-black text-slate-900">
      إدارة المخاطر: أهم من الربح
    </h3>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      أكبر خطأ يقع فيه المبتدئون هو التركيز على الربح فقط. 
      في الواقع، إدارة المخاطر هي العامل الأهم للاستمرار في السوق.
    </p>

    <ul className="mt-3 space-y-2 text-[17px] leading-8 text-slate-700">
      <li>• لا تخاطر بأكثر من 1-2% من رأس مالك</li>
      <li>• استخدم وقف الخسارة دائمًا</li>
      <li>• لا تدخل صفقات عشوائية</li>
    </ul>

    <div className="mt-5 rounded-xl bg-red-50 border border-red-100 p-4 text-[15px] leading-8 text-red-700">
      الدخول بدون إدارة مخاطر هو أسرع طريق لخسارة الحساب.
    </div>

    {/* Section 6 */}
    <h3 className="mt-8 text-[22px] font-black text-slate-900">
      الحساب التجريبي: البداية الصحيحة
    </h3>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      قبل التداول بأموال حقيقية، يجب أن تبدأ بحساب تجريبي. 
      هذا الحساب يسمح لك بتجربة السوق وفهم المنصة بدون أي مخاطرة.
    </p>

    <p className="mt-3 text-[18px] leading-10 text-slate-700">
      استخدم الحساب التجريبي لتعلم كيفية فتح الصفقات، فهم حركة السوق، 
      وتجربة استراتيجيات مختلفة قبل الانتقال للحساب الحقيقي.
    </p>

    {/* Conclusion */}
    <div className="mt-8 rounded-xl bg-slate-100 p-5 text-[16px] leading-8 text-slate-800">
      الخلاصة: التداول ليس طريقًا سريعًا للربح، بل مهارة تحتاج إلى وقت وتعلم. 
      إذا بدأت بشكل صحيح وفهمت الأساسيات، يمكنك بناء تجربة تداول ناجحة ومستقرة على المدى الطويل.
    </div>
  </div>

  {/* ========================= */}
  {/* MOBILE (FULL CONTENT / BETTER UX) */}
  {/* ========================= */}
  <div className="md:hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fc_100%)] px-4 py-5">
      <h2 className="text-[22px] font-black leading-[1.45] text-slate-950">
        أساسيات التداول في الفوركس للمبتدئين
      </h2>

      <p className="mt-3 text-[14px] leading-7 text-slate-600">
        هذا الدليل الكامل يشرح أساسيات الفوركس خطوة بخطوة بطريقة أسهل للقراءة على الجوال، مع الحفاظ على كل المحتوى كما هو.
      </p>
    </div>

    <div className="space-y-3 p-3">

      {/* Intro */}
<div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
  <div className="px-4 pb-3 pt-4">
    <h3 className="text-[18px] font-black leading-7 text-slate-950">
      مقدمة الدليل
    </h3>

    <p className="mt-3 text-[15px] leading-8 text-slate-700">
      إذا كنت تبحث عن طريقة واضحة لفهم كيف تبدأ التداول من الصفر، فلابد أن تبدأ
      من الأساس الصحيح: فهم سوق الفوركس وطريقة عمله. الكثير من المبتدئين يدخلون
      السوق بهدف الربح السريع، لكن الحقيقة أن التداول ليس لعبة حظ، بل مهارة
      تحتاج إلى تعلم وصبر وانضباط.
    </p>

    <details className="mt-2 group">
      <summary className="cursor-pointer list-none text-[13px] font-black text-brand-600">
        اقرأ المزيد
      </summary>

      <p className="mt-3 text-[15px] leading-8 text-slate-700">
        في هذا الدليل، سنشرح لك أساسيات التداول في الفوركس خطوة بخطوة، بطريقة
        عملية تساعدك على اتخاذ قرارات أفضل وتجنب الأخطاء التي يقع فيها معظم
        المبتدئين.
      </p>
    </details>
  </div>
</div>

      {/* Section 1 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <div>
            <h3 className="text-[18px] font-black leading-7 text-slate-950">
              ما هو سوق الفوركس؟
            </h3>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            سوق الفوركس (Forex) هو أكبر سوق مالي في العالم، يتم فيه تداول العملات مثل الدولار الأمريكي، 
            اليورو، الجنيه الإسترليني، والين الياباني. يتم التداول عبر شراء عملة وبيع عملة أخرى في نفس الوقت.
          </p>

          <p className="mt-4 text-[15px] leading-8 text-slate-700">
            يتميز هذا السوق بسيولة ضخمة جدًا، حيث يتجاوز حجم التداول اليومي تريليونات الدولارات، 
            مما يجعله سوقًا سريع التنفيذ ومتاحًا للجميع، سواء كنت مبتدئًا أو محترفًا.
          </p>

          <div className="mt-4 rounded-[16px] border border-brand-100 bg-brand-50 p-4 text-[14px] leading-7 text-blue-800">
            الفوركس ليس استثمارًا تقليديًا، بل يعتمد على توقع حركة الأسعار، لذلك الفهم أهم من رأس المال.
          </div>
        </div>
      </details>

      {/* Section 2 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <div>
            <h3 className="text-[18px] font-black leading-7 text-slate-950">
              كيف يتم التداول في الفوركس؟
            </h3>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            التداول في الفوركس يتم من خلال أزواج العملات مثل EUR/USD أو GBP/USD. 
            عند فتح صفقة، لديك خياران:
          </p>

          <ul className="mt-3 space-y-2 text-[15px] leading-8 text-slate-700">
            <li>• شراء (Buy): إذا كنت تتوقع أن السعر سيرتفع</li>
            <li>• بيع (Sell): إذا كنت تتوقع أن السعر سينخفض</li>
          </ul>

          <p className="mt-4 text-[15px] leading-8 text-slate-700">
            الفرق بين سعر الدخول وسعر الخروج هو ما يحدد الربح أو الخسارة. 
            كل حركة صغيرة في السعر يمكن أن تؤثر على نتيجتك، لذلك التحكم في الصفقة مهم جدًا.
          </p>
        </div>
      </details>

      {/* Section 3 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <div>
            <h3 className="text-[18px] font-black leading-7 text-slate-950">
              ما هي أزواج العملات؟
            </h3>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            كل صفقة في الفوركس تتكون من زوج عملات. العملة الأولى تسمى العملة الأساسية، 
            والثانية تسمى عملة التسعير.
          </p>

          <ul className="mt-3 space-y-2 text-[15px] leading-8 text-slate-700">
            <li>• الأزواج الرئيسية: مثل EUR/USD (الأكثر استقرارًا)</li>
            <li>• الأزواج الثانوية: مثل EUR/GBP</li>
            <li>• الأزواج الغريبة: مثل USD/TRY (أكثر مخاطرة)</li>
          </ul>
        </div>
      </details>

      {/* Section 4 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <div>
            <h3 className="text-[18px] font-black leading-7 text-slate-950">
              أهم مصطلحات التداول التي يجب أن تعرفها
            </h3>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            قبل أن تبدأ، هناك مصطلحات أساسية يجب فهمها:
          </p>

          <ul className="mt-3 space-y-3 text-[15px] leading-8 text-slate-700">
            <li><strong>• السبريد:</strong> الفرق بين سعر الشراء والبيع (تكلفة التداول)</li>
            <li><strong>• اللوت:</strong> حجم الصفقة (0.01 مناسب للمبتدئين)</li>
            <li><strong>• الرافعة المالية:</strong> تضاعف رأس المال لكنها تزيد المخاطر</li>
            <li><strong>• الحساب التجريبي:</strong> للتعلم بدون مخاطرة</li>
          </ul>
        </div>
      </details>

      {/* Section 5 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <div>
            <h3 className="text-[18px] font-black leading-7 text-slate-950">
              إدارة المخاطر: أهم من الربح
            </h3>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            أكبر خطأ يقع فيه المبتدئون هو التركيز على الربح فقط. 
            في الواقع، إدارة المخاطر هي العامل الأهم للاستمرار في السوق.
          </p>

          <ul className="mt-3 space-y-2 text-[15px] leading-8 text-slate-700">
            <li>• لا تخاطر بأكثر من 1-2% من رأس مالك</li>
            <li>• استخدم وقف الخسارة دائمًا</li>
            <li>• لا تدخل صفقات عشوائية</li>
          </ul>

          <div className="mt-4 rounded-[16px] border border-red-100 bg-red-50 p-4 text-[14px] leading-7 text-red-700">
            الدخول بدون إدارة مخاطر هو أسرع طريق لخسارة الحساب.
          </div>
        </div>
      </details>

      {/* Section 6 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <div>
            <h3 className="text-[18px] font-black leading-7 text-slate-950">
              الحساب التجريبي: البداية الصحيحة
            </h3>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            قبل التداول بأموال حقيقية، يجب أن تبدأ بحساب تجريبي. 
            هذا الحساب يسمح لك بتجربة السوق وفهم المنصة بدون أي مخاطرة.
          </p>

          <p className="mt-4 text-[15px] leading-8 text-slate-700">
            استخدم الحساب التجريبي لتعلم كيفية فتح الصفقات، فهم حركة السوق، 
            وتجربة استراتيجيات مختلفة قبل الانتقال للحساب الحقيقي.
          </p>
        </div>
      </details>

      {/* Conclusion */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <div>
            <h3 className="text-[18px] font-black leading-7 text-slate-950">
              الخلاصة
            </h3>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <div className="rounded-[16px] bg-slate-100 p-4 text-[15px] leading-8 text-slate-800">
            الخلاصة: التداول ليس طريقًا سريعًا للربح، بل مهارة تحتاج إلى وقت وتعلم. 
            إذا بدأت بشكل صحيح وفهمت الأساسيات، يمكنك بناء تجربة تداول ناجحة ومستقرة على المدى الطويل.
          </div>
        </div>
      </details>

    </div>
  </div>
</div>

{/* How to choose broker */}
<div className="px-5 pb-12 md:px-8 md:pb-14">

  {/* ========================= */}
  {/* DESKTOP (UNCHANGED 100%) */}
  {/* ========================= */}
  <div className="hidden md:block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7ff_100%)] px-6 py-6 md:px-8 md:py-8">
      <h2 className="text-[28px] font-black leading-[1.4] text-slate-950 md:text-[34px]">
       كيف تختار أفضل شركة تداول للمبتدئين؟ (دليل عملي 2026)
      </h2>

      <p className="mt-4 text-[16px] leading-9 text-slate-700 md:text-[17px]">
        اختيار شركة التداول هو من أهم القرارات التي ستؤثر على تجربتك من البداية.
        حتى لو تعلمت الأساسيات جيدًا، فإن اختيار وسيط غير مناسب قد يسبب لك مشاكل
        في التنفيذ أو الإيداع أو الرسوم. لذلك لا تعتمد على الاسم فقط، بل على
        معايير واضحة تساعدك على اتخاذ قرار أذكى.
      </p>

      <p className="mt-4 text-[16px] leading-9 text-slate-700 md:text-[17px]">
        إذا كنت تبدأ من الصفر، فهذه أهم النقاط التي يجب التركيز عليها قبل فتح أي
        حساب حقيقي.
      </p>
    </div>

    <div className="p-6 md:p-8">
      <div className="space-y-6">

        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-[20px] font-black text-slate-950">
            1) الترخيص والأمان
          </h3>
          <p className="mt-3 text-[16px] leading-9 text-slate-700">
            أول معيار يجب النظر إليه هو الترخيص. الشركات الموثوقة تكون مرخصة من
            جهات قوية مثل FCA أو ASIC، وهذا يعطيك مستوى أعلى من الأمان مقارنة
            بالشركات غير المنظمة أو غير الواضحة.
          </p>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-[20px] font-black text-slate-950">
            2) نوع الحساب المناسب للمبتدئ
          </h3>
          <p className="mt-3 text-[16px] leading-9 text-slate-700">
            ليس كل حساب مناسب للبداية. بعض الشركات توفر حسابات بسيطة مثل
            Standard أو Micro، وهي غالبًا أسهل للمبتدئ من الحسابات التي تتطلب
            فهمًا أعمق للعمولات والتنفيذ وخصائص السكالبينغ.
          </p>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-[20px] font-black text-slate-950">
            3) الحد الأدنى للإيداع
          </h3>
          <p className="mt-3 text-[16px] leading-9 text-slate-700">
            لا يوجد سبب منطقي لأن تبدأ بمبلغ كبير في أول تجربة. الأفضل اختيار
            شركة تسمح لك بالبدء بإيداع منخفض مثل 5 أو 10 دولارات حتى تتعلم
            بهدوء وبدون ضغط نفسي.
          </p>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-[20px] font-black text-slate-950">
            4) السبريد والرسوم
          </h3>
          <p className="mt-3 text-[16px] leading-9 text-slate-700">
            السبريد هو تكلفة التداول الأساسية. كلما كان أوضح وأقل، كانت فرصتك
            أفضل خصوصًا في البداية. لذلك اختر شركة تقدم سبريد مناسبًا ورسومًا
            واضحة بدون مفاجآت.
          </p>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-[20px] font-black text-slate-950">
            5) منصة التداول وسهولة الاستخدام
          </h3>
          <p className="mt-3 text-[16px] leading-9 text-slate-700">
            تأكد أن الشركة توفر منصة سهلة مثل MT4 أو MT5، وأن التطبيق يعمل بشكل
            جيد على الجوال، لأن سهولة الاستخدام عامل مهم جدًا للمبتدئ الذي ما زال
            يتعلم كيفية فتح الصفقات وإدارتها.
          </p>
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-emerald-100 bg-[linear-gradient(180deg,#ecfdf5_0%,#f8fffb_100%)] p-5 text-[16px] leading-8 text-emerald-800">
        أهم نصيحة: لا تختار الشركة بناءً على إعلان أو بونص فقط، بل بناءً على
        تجربة حقيقية وشروط واضحة تناسب أسلوبك كمبتدئ.
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-[15px] leading-8 text-slate-700">
        💡 الجدول أعلاه يساعدك على مقارنة أفضل شركات التداول للمبتدئين من حيث
        الترخيص، الإيداع، نوع الحساب، والسبريد، لذلك يمكنك الرجوع إليه واختيار
        الشركة التي تناسبك بسهولة أكبر.
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/best-brokers"
          className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563eb_0%,#3b82f6_100%)] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:scale-[1.03] hover:shadow-blue-300"
        >
          تصفح أفضل الوسطاء
        </Link>

        <Link
          href="/compare"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-900 transition hover:bg-slate-50"
        >
          اذهب إلى المقارنات
        </Link>
      </div>
    </div>
  </div>

  {/* ========================= */}
  {/* MOBILE (NEW ACCORDION DESIGN) */}
  {/* ========================= */}
  <div className="md:hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fc_100%)] px-4 py-5">
      <h2 className="text-[22px] font-black leading-[1.45] text-slate-950">
        كيف تختار أفضل شركة تداول للمبتدئين؟
      </h2>

      <p className="mt-3 text-[14px] leading-7 text-slate-600">
        اختيار شركة التداول قرار مهم جدًا في بداية رحلتك. في الموبايل، الأفضل أن
        نعرض النقاط الأساسية كبطاقات تفتح عند الضغط بدل جدار نص طويل.
      </p>
    </div>

    <div className="space-y-3 p-3">

      {/* Intro short note */}
      <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
        <p className="text-[14px] leading-7 text-slate-700">
          إذا كنت تبدأ من الصفر، فهذه أهم المعايير التي يجب التركيز عليها قبل فتح
          أي حساب حقيقي.
        </p>
      </div>

      {/* 1 */}
      <details open className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <h3 className="text-[18px] font-black leading-7 text-slate-950">
            1) الترخيص والأمان
          </h3>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            أول معيار يجب النظر إليه هو الترخيص. الشركات الموثوقة تكون مرخصة من
            جهات قوية مثل FCA أو ASIC، وهذا يعطيك مستوى أعلى من الأمان مقارنة
            بالشركات غير المنظمة أو غير الواضحة.
          </p>
        </div>
      </details>

      {/* 2 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <h3 className="text-[18px] font-black leading-7 text-slate-950">
            2) نوع الحساب المناسب للمبتدئ
          </h3>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            ليس كل حساب مناسب للبداية. بعض الشركات توفر حسابات بسيطة مثل
            Standard أو Micro، وهي غالبًا أسهل للمبتدئ من الحسابات التي تتطلب
            فهمًا أعمق للعمولات والتنفيذ وخصائص السكالبينغ.
          </p>
        </div>
      </details>

      {/* 3 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <h3 className="text-[18px] font-black leading-7 text-slate-950">
            3) الحد الأدنى للإيداع
          </h3>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            لا يوجد سبب منطقي لأن تبدأ بمبلغ كبير في أول تجربة. الأفضل اختيار
            شركة تسمح لك بالبدء بإيداع منخفض مثل 5 أو 10 دولارات حتى تتعلم
            بهدوء وبدون ضغط نفسي.
          </p>
        </div>
      </details>

      {/* 4 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <h3 className="text-[18px] font-black leading-7 text-slate-950">
            4) السبريد والرسوم
          </h3>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            السبريد هو تكلفة التداول الأساسية. كلما كان أوضح وأقل، كانت فرصتك
            أفضل خصوصًا في البداية. لذلك اختر شركة تقدم سبريد مناسبًا ورسومًا
            واضحة بدون مفاجآت.
          </p>
        </div>
      </details>

      {/* 5 */}
      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          <h3 className="text-[18px] font-black leading-7 text-slate-950">
            5) منصة التداول وسهولة الاستخدام
          </h3>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 transition group-open:rotate-180">
            ⌄
          </div>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-8 text-slate-700">
            تأكد أن الشركة توفر منصة سهلة مثل MT4 أو MT5، وأن التطبيق يعمل بشكل
            جيد على الجوال، لأن سهولة الاستخدام عامل مهم جدًا للمبتدئ الذي ما زال
            يتعلم كيفية فتح الصفقات وإدارتها.
          </p>
        </div>
      </details>

          <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
        <p className="text-[14px] leading-7 text-slate-700">
          💡 الجدول أعلاه يساعدك على مقارنة أفضل شركات التداول للمبتدئين من حيث
          الترخيص، الإيداع، نوع الحساب، والسبريد، لذلك يمكنك الرجوع إليه واختيار
          الشركة التي تناسبك بسهولة أكبر.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <Link
          href="/best-brokers"
          className="inline-flex min-h-[48px] items-center justify-center rounded-[16px] border border-brand-100 bg-white px-3 py-3 text-center text-[14px] font-black leading-5 text-brand-600"
        >
          أفضل الوسطاء
        </Link>

        <Link
          href="/compare"
          className="inline-flex min-h-[48px] items-center justify-center rounded-[16px] border border-brand-100 bg-white px-3 py-3 text-center text-[14px] font-black leading-5 text-brand-600"
        >
          المقارنات
        </Link>
      </div>
    </div>
  </div>
</div>

{/* FAQ Section */}
<div className="px-5 pb-14 md:px-8 md:pb-12">

  {/* ========================= */}
  {/* DESKTOP (UNCHANGED 100%) */}
  {/* ========================= */}
  <div className="hidden md:block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

    {/* Header */}
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7ff_100%)] px-6 py-6 md:px-8 md:py-8">
      <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
        أسئلة يبحث عنها المبتدئون قبل فتح أول حساب
      </div>

      <h2 className="mt-3 text-[28px] font-black leading-[1.4] text-slate-950 md:text-[34px]">
        أهم الأسئلة الشائعة عن التداول للمبتدئين
      </h2>

      <p className="mt-4 text-[16px] leading-9 text-slate-700">
        قبل أن تبدأ التداول، من الطبيعي أن يكون لديك الكثير من الأسئلة. في هذا
        القسم جمعنا أهم الأسئلة التي يبحث عنها المبتدئون في التداول مع إجابات
        واضحة وعملية تساعدك على فهم الصورة بشكل أفضل قبل فتح أي حساب حقيقي.
      </p>
    </div>

    {/* FAQ Items */}
    <div className="space-y-3 p-4 md:p-6">

      {/* Item */}
      <details open className="group rounded-2xl border border-brand-100 bg-brand-50/70 p-5 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-black text-slate-950">
          كيف تبدأ التداول من الصفر؟
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-[18px] font-black text-brand-600 shadow-sm transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <p className="mt-4 text-[15px] leading-8 text-slate-700">
          تبدأ التداول من الصفر عبر 3 مراحل أساسية: فهم أساسيات السوق مثل
          الفوركس أو الأسهم، ثم اختيار شركة تداول موثوقة، وبعدها استخدام حساب
          تجريبي للتدريب بدون مخاطرة. بعد ذلك فقط يمكنك الانتقال إلى حساب حقيقي
          بمبلغ صغير وخطة واضحة. أكبر خطأ يقع فيه المبتدئ هو القفز مباشرة إلى
          السوق قبل الفهم والتجربة.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          كم تحتاج من المال لبدء التداول؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          يمكنك البدء في التداول بمبلغ صغير مثل 100 إلى 500 دولار، وأحيانًا أقل
          حسب نوع الحساب والشركة. لكن الأهم من حجم رأس المال هو طريقة إدارته.
          ينصح دائمًا بألا تخاطر بنسبة كبيرة في الصفقة الواحدة، وأن تبدأ بمبلغ
          يمكنك تحمل خسارته أثناء التعلم بدل إيداع مبلغ كبير من البداية.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          ما أفضل شركة تداول للمبتدئين؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          أفضل شركة تداول للمبتدئين هي التي توفر ترخيصًا قويًا، منصة سهلة
          الاستخدام، حسابًا بسيطًا، حدًا أدنى منخفضًا للإيداع، ودعمًا فنيًا
          واضحًا. لذلك لا يكفي أن تختار شركة مشهورة فقط، بل يجب أن تختار وسيطًا
          يمنحك بداية عملية ومفهومة بدون تعقيد في الرسوم أو أنواع الحسابات.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          هل التداول مربح فعلًا؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          نعم، التداول يمكن أن يكون مربحًا، لكنه ليس سهلًا ولا سريعًا كما يعتقد
          البعض. الربح في التداول يحتاج إلى تعلم، تدريب، إدارة مخاطر، وانضباط
          نفسي. أغلب المبتدئين يخسرون في البداية بسبب التسرع، لذلك يجب التعامل
          مع التداول كمهارة تحتاج إلى وقت وتطوير مستمر، وليس كطريقة سريعة
          للثراء.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          هل الحساب التجريبي مهم قبل التداول الحقيقي؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          نعم، الحساب التجريبي خطوة مهمة جدًا لأنه يسمح لك بفهم المنصة، تجربة فتح
          وإغلاق الصفقات، والتعود على حركة السوق بدون مخاطرة مالية. الحساب
          التجريبي لا يمنحك الخبرة النفسية الكاملة للحساب الحقيقي، لكنه يختصر
          عليك كثيرًا من الأخطاء التقنية في البداية ويمنحك فهمًا أوضح لطبيعة
          التنفيذ.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          هل التداول حلال أم حرام؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          يعتمد الحكم على نوع الأداة المالية وطريقة تنفيذ التداول وشروط الحساب.
          بعض الحسابات الإسلامية التي لا تحتوي على فوائد تبييت قد تكون أقرب
          للقبول، بينما بعض الممارسات الأخرى قد تكون محل خلاف أو رفض. لذلك من
          المهم دائمًا قراءة شروط الحساب جيدًا والتأكد من تفاصيل الرسوم والرافعة
          واختيار شركة توفر حسابات إسلامية واضحة.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          ما هو أفضل نوع حساب للمبتدئ؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          غالبًا ما يكون حساب Standard أو Micro هو الأنسب للمبتدئ، لأنه أبسط من
          الحسابات الاحترافية مثل Raw أو ECN. هذا النوع من الحسابات يسهل فهم
          الرسوم والتنفيذ ويجعل البداية أقل تعقيدًا، خاصة إذا كنت ما زلت تتعلم
          أساسيات السوق وإدارة رأس المال.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          ما هو السبريد ولماذا هو مهم؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          السبريد هو الفرق بين سعر الشراء وسعر البيع، ويعتبر من أهم تكاليف
          التداول. كلما كان السبريد أقل، كانت تكلفة الدخول والخروج من الصفقة أقل.
          وهذا مهم جدًا للمبتدئ الذي يبدأ برأس مال صغير، لأن الرسوم المرتفعة قد
          تؤثر على النتائج بشكل واضح حتى لو كانت الصفقات نفسها جيدة.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          هل يمكن التداول من الجوال؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          نعم، معظم شركات التداول القوية توفر تطبيقات ممتازة على الجوال مثل MT4
          وMT5، ويمكنك من خلالها متابعة السوق وفتح الصفقات وإدارتها بسهولة. لكن
          يفضل أن تتعلم أولًا الأساسيات جيدًا من شاشة أكبر في البداية، لأن
          الاعتماد الكامل على الهاتف قد يجعل التحليل والمتابعة أقل دقة للمبتدئ.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          هل التداول مناسب للجميع؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          التداول ليس مناسبًا لكل شخص يبحث عن ربح سريع أو يدخل السوق بدون صبر.
          لكنه قد يكون مناسبًا لمن لديه استعداد للتعلم والانضباط وتقبل فكرة
          التطور التدريجي. إذا كنت مستعدًا لفهم السوق، والتدرب، والالتزام بخطة
          واضحة، فالتداول قد يكون خيارًا جيدًا لك على المدى الطويل.
        </p>
      </details>

      <details className="group px-6 py-5 md:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-black text-slate-950">
          ما أهم نصيحة قبل فتح أول حساب تداول؟
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[16px] font-black text-brand-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <p className="mt-4 text-[16px] leading-9 text-slate-700">
          أهم نصيحة هي ألا تفتح حسابًا حقيقيًا قبل أن تقارن بين الشركات وتفهم نوع
          الحساب الذي يناسبك. ابدأ بحساب تجريبي، ثم بإيداع صغير، وركز على التعلم
          أكثر من الربح. اختيار الوسيط الصحيح من البداية مع إدارة مخاطر واضحة
          يختصر عليك كثيرًا من الأخطاء والخسائر.
        </p>
      </details>
    </div>
  </div>

  {/* ========================= */}
  {/* MOBILE (NEW DESIGN) */}
  {/* ========================= */}
  <div className="md:hidden overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

    {/* Header */}
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fc_100%)] px-4 py-5">
      <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
        أسئلة قبل أول حساب
      </div>

      <h2 className="mt-3 text-[22px] font-black leading-[1.45] text-slate-950">
        أهم الأسئلة الشائعة عن التداول للمبتدئين
      </h2>

      <p className="mt-3 text-[14px] leading-7 text-slate-600">
        جمعنا هنا أكثر الأسئلة التي تدور في ذهن المبتدئ، مع إجابات مختصرة وواضحة
        تساعدك على فهم الأساس قبل فتح أي حساب حقيقي.
      </p>
    </div>

    {/* Mobile FAQ Items */}
    <div className="space-y-3 p-3">

      <details open className="group overflow-hidden rounded-[22px] border border-brand-100 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[17px] font-black leading-7 text-slate-950">
            كيف تبدأ التداول من الصفر؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[13px] font-black text-brand-600 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-brand-100 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            تبدأ التداول من الصفر عبر 3 مراحل أساسية: فهم أساسيات السوق مثل
            الفوركس أو الأسهم، ثم اختيار شركة تداول موثوقة، وبعدها استخدام حساب
            تجريبي للتدريب بدون مخاطرة. بعد ذلك فقط يمكنك الانتقال إلى حساب حقيقي
            بمبلغ صغير وخطة واضحة.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            كم تحتاج من المال لبدء التداول؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            يمكنك البدء في التداول بمبلغ صغير مثل 100 إلى 500 دولار، وأحيانًا أقل
            حسب نوع الحساب والشركة. لكن الأهم من حجم رأس المال هو طريقة إدارته.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            ما أفضل شركة تداول للمبتدئين؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            أفضل شركة تداول للمبتدئين هي التي توفر ترخيصًا قويًا، منصة سهلة
            الاستخدام، حسابًا بسيطًا، حدًا أدنى منخفضًا للإيداع، ودعمًا فنيًا
            واضحًا.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            هل التداول مربح فعلًا؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            نعم، التداول يمكن أن يكون مربحًا، لكنه ليس سهلًا ولا سريعًا كما يعتقد
            البعض. الربح يحتاج إلى تعلم، تدريب، إدارة مخاطر، وانضباط نفسي.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            هل الحساب التجريبي مهم قبل بدل التداول؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            نعم، الحساب التجريبي خطوة مهمة جدًا لأنه يسمح لك بفهم المنصة، تجربة
            فتح وإغلاق الصفقات، والتعود على حركة السوق بدون مخاطرة مالية.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            هل التداول حلال أم حرام؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            يعتمد الحكم على نوع الأداة المالية وطريقة تنفيذ التداول وشروط الحساب.
            لذلك من المهم دائمًا قراءة شروط الحساب جيدًا والتأكد من تفاصيل الرسوم
            والرافعة.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            ما هو أفضل نوع حساب للمبتدئ؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            غالبًا ما يكون حساب Standard أو Micro هو الأنسب للمبتدئ، لأنه أبسط
            من الحسابات الاحترافية ويجعل البداية أقل تعقيدًا.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            ما هو السبريد ولماذا هو مهم؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            السبريد هو الفرق بين سعر الشراء وسعر البيع، ويعتبر من أهم تكاليف
            التداول. كلما كان السبريد أقل، كانت تكلفة الصفقة أقل.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            هل يمكن التداول من الجوال؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            نعم، معظم شركات التداول القوية توفر تطبيقات ممتازة على الجوال مثل
            MT4 وMT5، ويمكنك من خلالها متابعة السوق وفتح الصفقات وإدارتها بسهولة.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            هل التداول مناسب للجميع؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            التداول ليس مناسبًا لكل شخص يبحث عن ربح سريع، لكنه قد يكون مناسبًا
            لمن لديه استعداد للتعلم والانضباط والتطور التدريجي.
          </p>
        </div>
      </details>

      <details className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <h3 className="text-[16px] font-black leading-7 text-slate-950">
            ما أهم نصيحة قبل فتح أول حساب تداول؟
          </h3>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black text-slate-500 transition group-open:rotate-180">
            ⌄
          </span>
        </summary>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          <p className="text-[14px] leading-7 text-slate-700">
            أهم نصيحة هي ألا تفتح حسابًا حقيقيًا قبل أن تقارن بين الشركات وتفهم
            نوع الحساب الذي يناسبك. ابدأ بحساب تجريبي ثم بإيداع صغير.
          </p>
        </div>
      </details>

    </div>
  </div>
</div>
          </article>

            </div>
      </section>
           </main>
  );
}