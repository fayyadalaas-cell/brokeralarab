import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ country: string }>;
  searchParams?: Promise<{ account?: string }>;
};

type CountryPage = {
  id: number;
  slug: string;
  country_name_ar: string;
  country_name_en: string;
  flag_emoji: string | null;
  currency: string | null;
  regulator_name: string | null;
  hero_title: string | null;
  hero_description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  intro_badge: string | null;
  local_trading_summary: string | null;
  last_updated: string | null;
  hero_intro: string | null;
};

type Broker = {
  id: number;
  name: string;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  best_for: string | null;
  pros: string | null;
  real_account_url: string | null;
  islamic_account?: string | null;
  arabic_support?: string | null;
};

type RankingRow = {
  id: number;
  rank_position: number;
  country_rating: number | null;
  best_for: string | null;
  local_note: string | null;
  featured: boolean | null;
  brokers: Broker | Broker[] | null;
};

type CategoryRow = {
  id: number;
  category_title: string;
  description: string | null;
  brokers: Broker | Broker[] | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  account_type: string | null;
  spread_avg?: number | null;
  spread_min?: number | null;
  sort_order?: number | null;
};

type ContentBlock = {
  id: number;
  country_id: number;
  section_key: string;
  title: string;
  content: string;
  summary: string | null;
  bullets: string[] | null;
  cta_label: string | null;
  cta_url: string | null;
  sort_order: number | null;
  block_slug: string | null;
};

type FaqRow = {
  id: number;
  country_id: number;
  question: string;
  answer: string;
  sort_order: number | null;
};

function oneBroker(value: Broker | Broker[] | null): Broker | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] || null : value;
}

async function getCountryData(slug: string) {
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("country_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) return null;

  const [rankingsResult, categoriesResult] = await Promise.all([
    supabase
      .from("country_broker_rankings")
      .select(`
        id,
        rank_position,
        country_rating,
        best_for,
        local_note,
        featured,
        brokers (
          id,
          name,
          slug,
          logo,
          rating,
          min_deposit,
          platforms,
          regulation,
          best_for,
          pros,
          real_account_url,
          islamic_account,
          arabic_support
        )
      `)
      .eq("country_id", page.id)
      .order("rank_position", { ascending: true }),

    supabase
      .from("country_broker_categories")
      .select(`
        id,
        category_title,
        description,
        brokers (
          id,
          name,
          slug,
          logo,
          rating,
          real_account_url
        )
      `)
      .eq("country_id", page.id)
      .order("id", { ascending: true }),
  ]);

  return {
    page: page as CountryPage,
    rankings: ((rankingsResult.data || []) as RankingRow[]).filter((r) =>
      oneBroker(r.brokers)
    ),
    categories: ((categoriesResult.data || []) as CategoryRow[]).filter((r) =>
      oneBroker(r.brokers)
    ),
  };
}

async function getBrokerAccounts(brokerIds: number[]) {
  if (brokerIds.length === 0) return [];

  const supabase = await createClient();

  const { data } = await supabase
    .from("broker_accounts")
    .select("*")
    .in("broker_id", brokerIds)
    .order("broker_id", { ascending: true })
    .order("sort_order", { ascending: true });

  return (data || []) as BrokerAccount[];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country } = await params;
  const data = await getCountryData(country);

  if (!data) return { title: "الصفحة غير موجودة", robots: { index: false } };

  return {
    title:
      data.page.seo_title ||
      `أفضل شركات التداول في ${data.page.country_name_ar}`,
    description:
      data.page.seo_description ||
      `مقارنة أفضل شركات التداول المناسبة للمتداولين في ${data.page.country_name_ar}.`,
  };
}

function brokerUrl(broker: Broker) {
  return broker.slug ? `/brokers/${broker.slug}` : "/brokers";
}

function openUrl(broker: Broker) {
  return broker.real_account_url?.trim() || brokerUrl(broker);
}

function isExternal(url: string) {
  return url.startsWith("http");
}

function money(v: number | null | undefined) {
  return v === null || v === undefined ? "غير محدد" : `$${v}`;
}

function logoSrc(broker: Broker) {
  return broker.logo || "/images/brokers/default.png";
}

function short(text: string | null | undefined, max = 130) {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trim()}…` : clean;
}

function splitPros(text: string | null | undefined) {
  if (!text) return [];
  return text
    .split(/[\n|،]/)
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function accountSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function getBestAccount(
  accounts: BrokerAccount[],
  brokerId: number,
  accountType: string = "standard"
) {
  const brokerAccounts = accounts.filter((a) => a.broker_id === brokerId);
  if (brokerAccounts.length === 0) return null;

  const selected = brokerAccounts.find((a) => a.account_type === accountType);

  return selected || brokerAccounts[0];
}

function accountUrl(broker: Broker, account: BrokerAccount | null) {
  if (!broker.slug || !account) return brokerUrl(broker);
  return `/brokers/${broker.slug}/accounts/${accountSlug(account.account_name)}`;
}

function getBlock(blocks: ContentBlock[], key: string) {
  return blocks.find((block) => block.section_key === key) || null;
}

function getBlockText(block: ContentBlock | null) {
  return block?.summary || block?.content || "";
}

function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
}) {
  const external = isExternal(href);

  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-center text-sm font-black leading-[1.2] transition duration-200";

  const style =
    variant === "primary"
      ? "bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.22)] hover:bg-blue-700 hover:-translate-y-0.5"
      : variant === "dark"
      ? "bg-slate-950 text-white shadow-[0_10px_22px_rgba(15,23,42,0.18)] hover:bg-slate-800 hover:-translate-y-0.5"
      : "border border-slate-300 bg-white text-slate-900 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-0.5";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "nofollow sponsored noopener noreferrer" : undefined}
      className={`${base} ${style} ${className}`}
    >
      {children}
    </Link>
  );
}

function BrokerLogo({
  broker,
  large = false,
}: {
  broker: Broker;
  large?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm ${
        large ? "h-20 w-20" : "h-14 w-14"
      }`}
    >
      <Image
        src={logoSrc(broker)}
        alt={broker.name}
        width={large ? 80 : 56}
        height={large ? 80 : 56}
        className="h-full w-full scale-125 object-contain"
      />
    </div>
  );
}

function MiniBrokerRow({ row }: { row: RankingRow }) {
  const broker = oneBroker(row.brokers);
  if (!broker) return null;

  return (
   <article className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_10px_25px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-4">
      <details className="group lg:hidden">
       <summary className="grid cursor-pointer list-none grid-cols-[40px_56px_minmax(0,1fr)] items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
            {row.rank_position}
          </div>

         <div className="scale-100">
  <BrokerLogo broker={broker} />
</div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-black leading-tight text-slate-950">
              {broker.name}
            </h3>

          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700 border border-amber-200">
  <span>⭐</span>
  <span>
    {row.country_rating || broker.rating || "—"} / 5
  </span>
</div>
                        <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 group-open:hidden">
                عرض التفاصيل
              </span>

            
            </div>
          </div>
        </summary>

        {row.best_for ? (
          <div className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
            {row.best_for}
          </div>
        ) : null}

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {short(
            row.local_note ||
              broker.best_for ||
              "خيار مناسب حسب بيانات المقارنة.",
            135
          )}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            href={brokerUrl(broker)}
            variant="secondary"
            className="min-h-[48px] w-full px-4"
          >
            التقييم
          </Button>

          <Button href={openUrl(broker)} className="min-h-[48px] w-full px-4">
            فتح حساب
          </Button>
        </div>
      </details>

      <div className="hidden lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
            {row.rank_position}
          </div>

          <BrokerLogo broker={broker} large />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-black leading-tight text-slate-950">
                {broker.name}
              </h3>

              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                {row.country_rating || broker.rating || "—"} / 5
              </span>

              {row.best_for ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                  {row.best_for}
                </span>
              ) : null}
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              {short(
                row.local_note ||
                  broker.best_for ||
                  "خيار مناسب حسب بيانات المقارنة.",
                155
              )}
            </p>
          </div>
        </div>

        <div className="grid w-full items-stretch gap-2 lg:w-[340px] lg:grid-cols-3 lg:justify-self-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
            <div className="text-[10px] font-black text-slate-500">
              الإيداع
            </div>
            <div className="mt-1 text-sm font-black text-slate-950">
              {money(broker.min_deposit)}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button
              href={brokerUrl(broker)}
              variant="secondary"
              className="min-h-[58px] w-full px-4"
            >
              التقييم
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <Button
              href={openUrl(broker)}
              className="min-h-[58px] w-full px-4"
            >
              فتح حساب
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
function ComparisonSection({
  topFive,
  countryName,
  countrySlug,
  accounts,
  selectedAccountType,
}: {
  topFive: RankingRow[];
  countryName: string;
  countrySlug: string;
  accounts: BrokerAccount[];
  selectedAccountType: string;
}) {
  return (
    <section
      id="comparison"
     className="mt-6 rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:mt-8 sm:rounded-[32px] sm:p-7"
    >
      <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
        مقارنة الحسابات
      </span>

      <h2 className="mt-3 text-[24px] font-black leading-tight text-slate-950 sm:text-3xl">
        مقارنة الحسابات والتكاليف لأفضل الوسطاء في {countryName}
      </h2>

      <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
        مقارنة عملية توضّح نوع الحساب، السبريد، العمولة، وأقل إيداع قبل فتح الحساب.
      </p>
     

      <div className="mt-6 hidden overflow-hidden rounded-3xl border border-slate-200 lg:block">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-right text-slate-700">
              <th className="p-4">الشركة</th>
              <th className="p-4">الحساب القياسي</th>
<th className="p-4">الحساب الاحترافي</th>
              <th className="p-4">السبريد</th>
              <th className="p-4">العمولة</th>
              <th className="p-4">أقل إيداع</th>
              
              <th className="p-4 text-center">روابط مهمة</th>
            </tr>
          </thead>

          <tbody>
            {topFive.map((row) => {
              const broker = oneBroker(row.brokers);
              if (!broker) return null;

      const standardAccount =
  accounts.find(
    (a) => a.broker_id === broker.id && a.account_type === "standard"
  ) || null;

const proAccount =
  accounts.find(
    (a) => a.broker_id === broker.id && a.account_type === "raw"
  ) || null;

const mainAccount = proAccount || standardAccount;
const accUrl = accountUrl(broker, mainAccount);

              return (
                <tr key={row.id} className="border-t border-slate-200 align-middle">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <BrokerLogo broker={broker} />
                      <div>
                        <div className="font-black text-slate-950">
                          {broker.name}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          #{row.rank_position} في {countryName}
                        </div>
                      </div>
                    </div>
                  </td>

                 <td className="p-4">
  {standardAccount ? (
    <Link
      href={accountUrl(broker, standardAccount)}
      className="font-black text-blue-700 hover:underline"
    >
      {standardAccount.account_name}
    </Link>
  ) : (
    <span className="text-slate-400">—</span>
  )}
</td>

<td className="p-4">
  {proAccount ? (
    <Link
      href={accountUrl(broker, proAccount)}
      className="font-black text-emerald-700 hover:underline"
    >
      {proAccount.account_name}
    </Link>
  ) : (
    <span className="text-slate-400">—</span>
  )}
</td>

                  <td className="p-4 font-bold text-slate-900">
                    {mainAccount?.spread || "غير محدد"}
                  </td>

                  <td className="p-4 text-slate-700">
                    {mainAccount?.commission || "غير محدد"}
                  </td>

                  <td className="p-4 font-bold text-slate-900">
                    {mainAccount?.min_deposit || money(broker.min_deposit)}
                  </td>

                  

                  <td className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        href={accUrl}
                        variant="secondary"
                        className="min-h-[44px] px-4 py-2.5 text-center"
                      >
                        تفاصيل الحساب
                      </Button>

                      <Button
                        href={openUrl(broker)}
                        className="min-h-[44px] px-4 py-2.5 text-center"
                      >
                        فتح حساب تداول
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    <div className="mt-5 grid gap-3 lg:hidden">
  {topFive.map((row) => {
    const broker = oneBroker(row.brokers);
    if (!broker) return null;

    const standardAccount =
      accounts.find(
        (a) => a.broker_id === broker.id && a.account_type === "standard"
      ) || null;

    const proAccount =
      accounts.find(
        (a) => a.broker_id === broker.id && a.account_type === "raw"
      ) || null;

    const mainAccount = proAccount || standardAccount;
    const accUrl = accountUrl(broker, mainAccount);

    return (
      <article
        key={row.id}
      className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-2.5 shadow-sm"
      >
        <details className="group">
       <summary className="grid cursor-pointer list-none grid-cols-[40px_52px_minmax(0,1fr)_auto] items-center gap-2">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
    {row.rank_position}
  </div>

  <div className="scale-95">
    <BrokerLogo broker={broker} />
  </div>

  <div className="min-w-0">
            <h3 className="line-clamp-1 text-[19px] font-black leading-tight text-slate-950">
                {broker.name}
              </h3>

              <div className="mt-1 text-xs font-bold text-slate-500">
               {mainAccount?.account_name || "الحسابات"}
              </div>

<div className="mt-2 flex items-center justify-between">
  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700">
    <span>⭐</span>
    <span>{row.country_rating || broker.rating || "—"} / 5</span>
  </span>

  <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-700">
    التفاصيل
  </span>
</div>
            </div>

          
          </summary>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white p-3 text-center">
              <div className="text-[10px] font-black text-slate-500">
                السبريد
              </div>
              <div className="mt-1 text-xs font-black text-slate-950">
                {mainAccount?.spread || "غير محدد"}
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 text-center">
              <div className="text-[10px] font-black text-slate-500">
                العمولة
              </div>
              <div className="mt-1 text-xs font-black text-slate-950">
                {mainAccount?.commission || "غير محدد"}
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 text-center">
              <div className="text-[10px] font-black text-slate-500">
                أقل إيداع
              </div>
              <div className="mt-1 text-xs font-black text-slate-950">
                {mainAccount?.min_deposit || money(broker.min_deposit)}
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 text-center">
              <div className="text-[10px] font-black text-slate-500">
                مناسب لـ
              </div>
              <div className="mt-1 text-xs font-black text-slate-950">
                {short(
                  mainAccount?.best_for ||
                    row.best_for ||
                    broker.best_for ||
                    "التداول العام",
                  32
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button href={accUrl} variant="secondary" className="px-4 py-3">
              تفاصيل الحساب
            </Button>

            <Button href={openUrl(broker)} className="px-4 py-3">
              فتح حساب
            </Button>
          </div>
        </details>
      </article>
    );
  })}
</div>
    </section>
  );
}

function ProfessionalCountryGuideSection({
  blocks,
  country,
}: {
  blocks: ContentBlock[];
  country: CountryPage;
}) {
  const guideBlocks = [
    getBlock(blocks, "regulation"),
    getBlock(blocks, "islamic_accounts"),
    getBlock(blocks, "taxes_fees"),
    getBlock(blocks, "local_banking"),
    getBlock(blocks, "how_to_open_account"),
  ].filter(Boolean) as ContentBlock[];

  const overview = getBlock(blocks, "overview");
  const finalVerdict = getBlock(blocks, "final_verdict");
  const featuredBlock = getBlock(blocks, "regulation") || guideBlocks[0];

  if (guideBlocks.length === 0 && !overview && !finalVerdict) return null;

  return (
    <section
      id="country-guide"
      className="mt-8 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:p-7"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
        <div>
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
            دليل التداول
          </span>

          <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
            دليل التداول في {country.country_name_ar}
          </h2>

          {overview ? (
            <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-[15px]">
              {getBlockText(overview)}
            </p>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {guideBlocks.map((block) => (
              <article
                key={block.id}
                className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4"
              >
                <h3 className="text-[15px] font-black text-slate-950">
                  {block.title}
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600">
                  {short(getBlockText(block), 230)}
                </p>

                {block.bullets && block.bullets.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {block.bullets.slice(0, 3).map((bullet, index) => (
                      <li
                        key={index}
                        className="rounded-xl bg-white px-3 py-2 text-xs font-bold leading-6 text-slate-700"
                      >
                        ✓ {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          {finalVerdict ? (
            <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h3 className="font-black text-slate-950">
                الخلاصة: كيف تختار أفضل وسيط؟
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {getBlockText(finalVerdict)}
              </p>
            </div>
          ) : null}
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-[#f8fbff] p-5 lg:sticky lg:top-24 lg:self-start">
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-black text-blue-700">
            معلومات مهمة
          </span>

          <h3 className="mt-3 text-xl font-black text-slate-950">
            {country.regulator_name || "الجهة التنظيمية"}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {featuredBlock
              ? short(getBlockText(featuredBlock), 190)
              : `قبل فتح حساب تداول في ${country.country_name_ar}، تأكد من الترخيص، الرسوم، ونوع الحساب المناسب لك.`}
          </p>

          {featuredBlock?.bullets && featuredBlock.bullets.length > 0 ? (
            <div className="mt-4 space-y-2">
              {featuredBlock.bullets.slice(0, 4).map((bullet, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold leading-6 text-slate-700"
                >
                  {bullet}
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-5 grid gap-2">
            <Button href="#top-brokers" className="w-full">
              شاهد أفضل الشركات
            </Button>
            <Button href="/brokers" variant="secondary" className="w-full">
              استعرض جميع التقييمات
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FaqSection({
  faqs,
  countryName,
}: {
  faqs: FaqRow[];
  countryName: string;
}) {
  if (faqs.length === 0) return null;

  const leftFaqs = faqs.slice(0, 5);
  const rightFaqs = faqs.slice(5, 10);

  return (
    <section
      id="faq"
      className="mt-8 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:p-7"
    >
      <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
        الأسئلة الشائعة
      </span>

      <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
        أسئلة شائعة حول التداول في {countryName}
      </h2>


  <div className="mt-6 grid gap-4 lg:grid-cols-2">

  <div className="space-y-4">
    {rightFaqs.map((faq) => (
      <details
        key={faq.id}
        className="group rounded-2xl border border-slate-200 bg-[#f8fbff] p-4"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-slate-950">
          <span>{faq.question}</span>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-blue-700 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <div
          className="mt-3 border-t border-slate-200 pt-3 text-sm leading-7 text-slate-600 [&_a]:font-black [&_a]:text-blue-700 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      </details>
    ))}
  </div>

  <div className="space-y-4">
    {leftFaqs.map((faq) => (
      <details
        key={faq.id}
        className="group rounded-2xl border border-slate-200 bg-[#f8fbff] p-4"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-slate-950">
          <span>{faq.question}</span>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-blue-700 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <div
          className="mt-3 border-t border-slate-200 pt-3 text-sm leading-7 text-slate-600 [&_a]:font-black [&_a]:text-blue-700 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      </details>
    ))}
  </div>

</div>
    </section>
  );
}

function FinalCtaSection({
  countryName,
  winner,
}: {
  countryName: string;
  winner: Broker | null;
}) {
  return (
    <section className="mt-8 rounded-[32px] border border-blue-200 bg-blue-50 p-6 text-center shadow-[0_14px_40px_rgba(37,99,235,0.08)] sm:p-8">
      <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-black text-blue-700">
        الخلاصة
      </span>

      <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
        ما أفضل شركة تداول في {countryName}؟
      </h2>

      <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-700">
        أفضل شركة تختلف حسب احتياجك، لكن المقارنة أعلاه تساعدك على اختيار وسيط
        مناسب من حيث الترخيص، الحسابات، السبريد، الإيداع والسحب، والدعم العربي.
      </p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        {winner ? (
          <Button href={openUrl(winner)} className="sm:min-w-[190px]">
            افتح حساب مع {winner.name}
          </Button>
        ) : null}

        <Button href="#comparison" variant="secondary" className="sm:min-w-[190px]">
          قارن الحسابات
        </Button>
      </div>
    </section>
  );
}
export default async function BestBrokersCountryPage({
  params,
  searchParams,
}: PageProps) {
  const { country } = await params;
  const search = searchParams ? await searchParams : {};
  const selectedAccountType = ["standard", "raw", "cent"].includes(
    search.account || ""
  )
    ? search.account!
    : "standard";
  const data = await getCountryData(country);

  if (!data) notFound();

  const { page, rankings, categories } = data;
  const topFive = rankings.slice(0, 5);
  const winnerRow = topFive[0];
  const winner = oneBroker(winnerRow?.brokers || null);
  const winnerPros = splitPros(winner?.pros);

  const mobileCategories = categories
  .filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (x) => oneBroker(x.brokers)?.id === oneBroker(item.brokers)?.id
      )
  )
  .slice(0, 5);

  const brokerIds = topFive
    .map((row) => oneBroker(row.brokers)?.id)
    .filter(Boolean) as number[];

  const accounts = await getBrokerAccounts(brokerIds);

  const supabase = await createClient();

  const { data: contentBlocksData } = await supabase
    .from("country_content_blocks")
    .select("*")
    .eq("country_id", page.id)
    .order("sort_order", { ascending: true });

  const contentBlocks = (contentBlocksData || []) as ContentBlock[];

  const { data: faqData } = await supabase
    .from("country_faqs")
    .select("*")
    .eq("country_id", page.id)
    .order("sort_order", { ascending: true });

  const faqs = (faqData || []) as FaqRow[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.seo_title || page.hero_title,
    description: page.seo_description || page.hero_description,
    url: `https://brokeralarab.com/best-brokers/${page.slug}`,
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f7fc]">
      <Script
        id={`country-page-schema-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1240px] px-3 py-3 sm:px-6 sm:py-6 lg:px-8">
        <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:rounded-[38px] sm:shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
            <div className="relative p-5 sm:p-9 lg:p-11">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_34%)]" />

              <div className="relative">
                <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
                  {page.intro_badge ||
                    `دليل محدث للمتداولين في ${page.country_name_ar}`}
                </span>

                <h1 className="mt-4 max-w-3xl text-[30px] font-black leading-[1.12] text-slate-950 sm:text-[42px] lg:text-[54px]">
                  {page.hero_title ||
                    `أفضل شركات التداول في ${page.country_name_ar}`}
                </h1>

                        <details className="group mt-4 max-w-4xl text-[14px] leading-7 text-slate-600 sm:hidden">
                <summary className="list-none">
                  <div className="max-h-[112px] overflow-hidden text-justify group-open:max-h-none">
                    {(page.hero_intro ||
                      page.hero_description ||
                      page.local_trading_summary ||
                      `قارن أفضل شركات التداول المناسبة للمتداولين في ${page.country_name_ar}`)
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-3">
                          {paragraph}
                        </p>
                      ))}
                  </div>

                  <span className="mt-2 inline-flex text-sm font-black text-blue-700 group-open:hidden">
                    عرض المزيد
                  </span>

                  <span className="mt-2 hidden text-sm font-black text-blue-700 group-open:inline-flex">
                    عرض أقل
                  </span>
                </summary>
              </details>
<div
  className="mt-4 hidden max-w-4xl space-y-3 text-[15px] leading-8 text-slate-600 sm:block"
  style={{ textAlign: "justify" }}
>
  {(page.hero_intro ||
    page.hero_description ||
    page.local_trading_summary ||
    `قارن أفضل شركات التداول المناسبة للمتداولين في ${page.country_name_ar}`)
    .split("\n\n")
    .map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
</div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button href="#top-brokers">شاهد أفضل الشركات</Button>
                  <Button href="#quick-picks" variant="dark">
                    اختر حسب احتياجك
                  </Button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-xs font-black text-slate-500">
                      أفضل اختيار
                    </div>
                    <div className="mt-1 text-lg font-black leading-6 text-slate-950">
                      {winner?.name || "قيد التحديث"}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-xs font-black text-slate-500">
                      الجهة المحلية
                    </div>
                    <div className="mt-1 text-sm font-black leading-6 text-slate-950">
                      {page.regulator_name || "حسب نوع الأداة المالية"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden border-t border-slate-200 bg-[#f8fbff] p-6 sm:p-9 lg:block lg:border-r lg:border-t-0 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-black text-emerald-700">
                    الشركة الأعلى تقييمًا
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                    {winner?.name || "قيد التحديث"}
                  </h2>
                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {winnerRow?.best_for ||
                      winner?.best_for ||
                      "وسيط مناسب للتداول"}
                  </p>
                </div>

                {winner ? <BrokerLogo broker={winner} large /> : null}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                  <div className="text-[10px] font-black text-slate-500">
                    التقييم
                  </div>
                  <div className="mt-1 text-xl font-black text-blue-700">
                    {winnerRow?.country_rating || winner?.rating || "—"}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                  <div className="text-[10px] font-black text-slate-500">
                    الإيداع
                  </div>
                  <div className="mt-1 text-xl font-black text-slate-950">
                    {money(winner?.min_deposit)}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                  <div className="text-[10px] font-black text-slate-500">
                    المنصات
                  </div>
                  <div className="mt-1 truncate text-sm font-black text-slate-950">
                    {winner?.platforms || "—"}
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                {short(
                  winnerRow?.local_note ||
                    winner?.best_for ||
                    `تم اختيار ${
                      winner?.name || "هذا الوسيط"
                    } كأفضل خيار بناءً على بيانات المقارنة المحلية.`,
                  210
                )}
              </p>

              {winnerPros.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {winnerPros.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              ) : null}

              {winner ? (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button href={openUrl(winner)}>افتح حساب</Button>
                  <Button href={brokerUrl(winner)} variant="secondary">
                    اقرأ التقييم
                  </Button>
                </div>
              ) : null}
            </aside>
          </div>
        </section>

       <section
  id="top-brokers"
  className="mt-4 rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:mt-8 sm:rounded-[32px] sm:p-7"
>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
                أفضل الشركات
              </span>
              <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl">
                أفضل 5 شركات تداول في {page.country_name_ar}
              </h2>
             <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:block">
                قائمة مختصرة تركز على القرار العملي: التقييم، الإيداع،
                المنصات، وأفضل استخدام لكل وسيط.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {topFive.map((row) => (
              <MiniBrokerRow key={row.id} row={row} />
            ))}
          </div>
        </section>

        <section
          id="quick-picks"
          className="mt-8 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:p-7"
        >
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
            اختيارات حسب الحاجة
          </span>

          <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
            اختر الوسيط حسب نوع المتداول
          </h2>

          <div className="mt-5 hidden gap-4 lg:grid lg:grid-cols-4">
           {categories.slice(0, 8).map((item) => {
              const broker = oneBroker(item.brokers);
              if (!broker) return null;

              return (
                <Link
                  key={item.id}
                  href={brokerUrl(broker)}
                className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-3 transition hover:border-blue-300 hover:bg-white hover:shadow-sm sm:p-4"
                >
                  <div className="text-xs font-black text-blue-700">
                    {item.category_title}
                  </div>

                 <div className="mt-3 flex items-center justify-between gap-3">
  <div className="min-w-0">
    <div className="line-clamp-1 text-lg font-black text-slate-950">
      {broker.name}
    </div>
    <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-700">
      <span>⭐</span>
      <span>{broker.rating || "—"} / 5</span>
    </div>
  </div>

  <BrokerLogo broker={broker} />
</div>

                 <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
                   {short(
  item.description || "اختيار مناسب حسب هذه الفئة.",
  45
)}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 lg:hidden">
  {mobileCategories.map((item) => {
    const broker = oneBroker(item.brokers);
    if (!broker) return null;

    return (
      <Link
        key={item.id}
        href={brokerUrl(broker)}
        className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-3 transition hover:border-blue-300 hover:bg-white hover:shadow-sm"
      >
        <div className="text-xs font-black text-blue-700">
          {item.category_title}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="line-clamp-1 text-lg font-black text-slate-950">
              {broker.name}
            </div>

            <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-700">
              <span>⭐</span>
              <span>{broker.rating || "—"} / 5</span>
            </div>
          </div>

          <BrokerLogo broker={broker} />
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-600">
          {short(item.description || "اختيار مناسب حسب هذه الفئة.", 45)}
        </p>
      </Link>
    );
  })}
</div>
        </section>

     <ComparisonSection
  topFive={topFive}
  countryName={page.country_name_ar}
  countrySlug={page.slug}
  accounts={accounts}
  selectedAccountType={selectedAccountType}
/>

        <ProfessionalCountryGuideSection
          blocks={contentBlocks}
          country={page}
        />

        <FaqSection faqs={faqs} countryName={page.country_name_ar} />

        <FinalCtaSection countryName={page.country_name_ar} winner={winner} />
      </div>
    </main>
  );
}