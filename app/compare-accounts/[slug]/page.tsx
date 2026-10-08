
import type { Metadata } from "next";
import Link from "next/link";
import {
  notFound,
  permanentRedirect,
} from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

const SITE = "https://brokeralarab.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  publication_status: string | null;
  regulation: string | null;
  platforms: string | null;
  islamic_account: string | null;
  max_leverage: string | number | null;
  account_availability_note_ar: string | null;
  real_account_url: string | null;
};

type Account = {
  id: number;
  broker_id: number;
  account_name: string | null;
  account_name_ar: string | null;
  account_type: string | null;
  spread: string | null;
  spread_min: string | number | null;
  spread_avg: string | number | null;
  commission: string | null;
  commission_value: string | number | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  is_islamic_available: boolean | string | null;
  islamic_conditions: string | null;
  is_best_for_scalping: boolean | null;
  sort_order: number | null;
};

type Content = {
  account_id: number;
  broker_id: number;
  hero_intro_ar: string | null;
  overview_ar: string | null;
  expert_verdict_ar: string | null;
  pros_ar: unknown;
  cons_ar: unknown;
  who_is_it_for_ar: unknown;
  unique_content_ar: unknown;
  important_notes_title_ar: string | null;
  important_notes_ar: unknown;
  faq_ar: unknown;
  updated_at: string | null;
};

type Item = {
  broker: Broker;
  account: Account;
  content: Content | null;
  key: string;
};

type Resolved = {
  first: Item;
  second: Item;
  canonicalSlug: string;
};

type TextBlock = {
  title: string;
  content: string;
};

type FAQ = {
  question: string;
  answer: string;
};

function slugify(value: string | null) {
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

function str(value: unknown): string {
  if (value === null || value === undefined) return "";

  return String(value).trim();
}

function shown(value: unknown) {
  return str(value) || "غير متوفر";
}

function name(item: Item) {
  const arabicName = str(item.account.account_name_ar);

  if (
    arabicName &&
    !/^[.\s،،\-–—]+$/.test(arabicName)
  ) {
    return arabicName;
  }

  const englishName = str(item.account.account_name);

  if (englishName.toLowerCase() === "classic") {
    return "كلاسيك";
  }

  return englishName || "حساب التداول";
}

function fullName(item: Item) {
  return `${shown(item.broker.name)} ${name(item)}`;
}

function accountLink(item: Item) {
  return `/brokers/${item.broker.slug}/accounts/${slugify(
    item.account.account_name
  )}`;
}

function brokerLink(item: Item) {
  return `/brokers/${item.broker.slug}`;
}

function safeArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value
      .split("\n")
      .map((part) => part.trim())
      .filter(Boolean);
  }
}

function textList(value: unknown): string[] {
  return safeArray(value)
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function blocks(value: unknown): TextBlock[] {
  return safeArray(value)
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item)
    )
    .map((item) => ({
      title: str(item.title),
      content: str(item.content),
    }))
    .filter((item) => item.title && item.content);
}

function faqs(value: unknown): FAQ[] {
  return safeArray(value)
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item)
    )
    .map((item) => ({
      question: str(item.question),
      answer: str(item.answer),
    }))
    .filter((item) => item.question && item.answer);
}

function paragraphs(value: unknown): string[] {
  return str(value)
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function yesNo(value: boolean | string | null) {
  if (value === true) return "متاح بحسب الشروط";
  if (value === false) return "غير متاح";

  const normalized = str(value).toLowerCase();

  if (["true", "yes", "1"].includes(normalized)) {
    return "متاح بحسب الشروط";
  }

  if (["false", "no", "0"].includes(normalized)) {
    return "غير متاح";
  }

  return shown(value);
}

function logoUrl(value: string | null) {
  const src = str(value);

  if (!src) return "";

  if (src.startsWith("/")) return src;

  try {
    const url = new URL(src);

    if (["http:", "https:"].includes(url.protocol)) {
      return url.toString();
    }
  } catch {
    return "";
  }

  return "";
}

function sortedPair(a: Item, b: Item): [Item, Item] {
  return a.key <= b.key ? [a, b] : [b, a];
}

async function getComparison(
  slug: string
): Promise<Resolved | null> {
  const supabase = await createClient();

  const { data: brokerRows, error: brokerError } =
    await supabase
      .from("brokers")
.select(
  "id,name,slug,logo,rating,publication_status,regulation,platforms,islamic_account,max_leverage,account_availability_note_ar,real_account_url"
)
      
      .eq("publication_status", "published");

  if (brokerError || !brokerRows) return null;

  const brokers = brokerRows as Broker[];

  const brokerMap = new Map<number, Broker>();

  for (const broker of brokers) {
    if (broker.slug && broker.name) {
      brokerMap.set(broker.id, broker);
    }
  }

  const { data: accountRows, error: accountError } =
    await supabase
      .from("broker_accounts")
      .select(
        "id,broker_id,account_name,account_name_ar,account_type,spread,spread_min,spread_avg,commission,commission_value,min_deposit,execution_type,best_for,is_islamic_available,islamic_conditions,is_best_for_scalping,sort_order"
      );

  if (accountError || !accountRows) return null;

  const accounts = accountRows as Account[];

  const keys = new Map<string, Item[]>();

  for (const account of accounts) {
    const broker = brokerMap.get(account.broker_id);

    if (!broker?.slug || !account.account_name) continue;

    const accountSlug = slugify(account.account_name);

    if (!accountSlug) continue;

    const key = `${broker.slug}-${accountSlug}`;

    const item: Item = {
      broker,
      account,
      content: null,
      key,
    };

    const existing = keys.get(key) || [];
    existing.push(item);
    keys.set(key, existing);
  }

  // Match the entire account key. Never split broker names
  // or account names using a simple hyphen.
  const matches: Array<[Item, Item]> = [];
  const seen = new Set<string>();

  for (const [firstKey, firstItems] of keys) {
    const prefix = `${firstKey}-vs-`;

    if (!slug.startsWith(prefix)) continue;

    const secondKey = slug.slice(prefix.length);
    const secondItems = keys.get(secondKey) || [];

    for (const first of firstItems) {
      for (const second of secondItems) {
        if (first.account.id === second.account.id) {
          continue;
        }

        const identity = [
          first.account.id,
          second.account.id,
        ]
          .sort((a, b) => a - b)
          .join(":");

        if (seen.has(identity)) continue;

        seen.add(identity);
        matches.push(sortedPair(first, second));
      }
    }
  }

  // An ambiguous URL must never show the wrong account.
  if (matches.length !== 1) return null;

  const [first, second] = matches[0];

  const { data: contentRows, error: contentError } =
    await supabase
      .from("broker_account_content")
      .select(
        "account_id,broker_id,hero_intro_ar,overview_ar,expert_verdict_ar,pros_ar,cons_ar,who_is_it_for_ar,unique_content_ar,important_notes_title_ar,important_notes_ar,faq_ar,updated_at"
      )
      .in("account_id", [
        first.account.id,
        second.account.id,
      ]);

  if (!contentError && contentRows) {
    const contentMap = new Map<number, Content>();

    for (const row of contentRows as Content[]) {
      contentMap.set(row.account_id, row);
    }

    first.content =
      contentMap.get(first.account.id) || null;

    second.content =
      contentMap.get(second.account.id) || null;
  }

  return {
    first,
    second,
    canonicalSlug: `${first.key}-vs-${second.key}`,
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getComparison(slug);

  if (!result) {
    return {
      title: "المقارنة غير متاحة | بروكر العرب",
      robots: { index: false, follow: false },
    };
  }

  const { first, second, canonicalSlug } = result;

  

const title =
  `مقارنة حسابات التداول: ${fullName(first)} و${fullName(second)}`;


const description =
  `قارن بين ${fullName(first)} و${fullName(second)} من حيث السبريد والعمولات والحد الأدنى للإيداع ومنصات التداول المتاحة. اكتشف مميزات وعيوب الحسابين وشروط التداول.`;


  const url =
    `${SITE}/compare-accounts/${canonicalSlug}`;

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    alternates: {
      canonical: url,
    },
          openGraph: {
        title,
        description,
        url,
        siteName: "بروكر العرب",
        locale: "ar_AR",
        type: "article",
        images: [
          {
            url: "/og-image.webp",
            alt: "مقارنة حسابات التداول | بروكر العرب",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.webp"],
      },
  };
}

function Logo({
  broker,
  large = false,
}: {
  broker: Broker;
  large?: boolean;
}) {
  const src = logoUrl(broker.logo);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 ${
        large
          ? "h-[90px] w-[130px] sm:h-[110px] sm:w-[160px]"
          : "h-[62px] w-[90px]"
      }`}
    >
      {src ? (
        <img
          src={src}
          alt={`شعار ${broker.name}`}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-center text-sm font-black text-[#1E5BB8]">
          {broker.name}
        </span>
      )}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-black tracking-wide text-[#1E5BB8]">
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-7">
      <Eyebrow>{eyebrow}</Eyebrow>

      <h2 className="mt-2 text-[24px] font-black leading-tight text-slate-950 sm:text-[32px]">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[16px]">
          {description}
        </p>
      )}
    </div>
  );
}



function HeroAccount({
  item,
  number,
}: {
  item: Item;
  number: number;
}) {
  const stats = [
    {
      label: "السبريد المعلن",
      value: item.account.spread,
    },
    {
      label: "العمولة",
      value: item.account.commission,
    },
    {
      label: "الحد الأدنى للإيداع",
      value: item.account.min_deposit,
    },
  ];

  const brokerLogo = logoUrl(item.broker.logo);

  return (
    <article className="flex h-full min-w-0 flex-col rounded-[22px] border border-white/20 bg-white p-5 text-slate-950 shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
      {/* Account label */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#eef5fd] px-3 py-1 text-[12px] font-black text-[#1E5BB8]">
          الحساب {number === 1 ? "الأول" : "الثاني"}
        </span>

        <span className="text-xs font-bold text-slate-400">
          {String(number).padStart(2, "0")}
        </span>
      </div>

      {/* Broker logo and account name */}
      <div className="mt-1 flex flex-col items-center text-center">
        <div className="flex h-[82px] w-full items-center justify-center overflow-visible sm:h-[88px]">
  {brokerLogo ? (
    <img
      src={brokerLogo}
      alt={`شعار ${item.broker.name}`}
      className="block h-[100px] w-[220px] max-w-full object-contain sm:h-[115px] sm:w-[240px]"
    />
  ) : (
    <span className="text-center text-2xl font-black text-[#1E5BB8]">
      {item.broker.name}
    </span>
  )}
</div>

        <h2 className="mt-1 flex min-h-[28px] items-center justify-center text-center text-[18px] font-black leading-7 text-[#1E5BB8] sm:text-[20px]">
          {name(item)}
        </h2>
      </div>

      {/* Account statistics */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-h-[70px] min-w-0 flex-col items-center justify-center rounded-xl border border-slate-100 bg-[#f5f8fe] p-2.5 text-center"
          >
            <div className="text-[11px] font-bold leading-5 text-slate-500">
              {stat.label}
            </div>

            <div className="mt-1 break-words text-[14px] font-black text-slate-950 sm:text-[16px]">
              {shown(stat.value)}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
        <Link
          href={accountLink(item)}
          className="flex min-h-[42px] items-center justify-center rounded-xl border border-[#1E5BB8] bg-white px-2 py-2.5 text-center text-[12px] font-black text-[#1E5BB8] transition hover:bg-[#EEF5FD] sm:text-[13px]"
        >
          التفاصيل الكاملة للحساب ←
        </Link>

        {item.broker.real_account_url ? (
          <a
            href={item.broker.real_account_url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="flex min-h-[42px] items-center justify-center rounded-xl bg-[#1E5BB8] px-2 py-2.5 text-center text-[12px] font-black text-white transition hover:bg-[#184A97] sm:text-[13px]"
          >
            فتح حساب ↗
          </a>
        ) : (
          <span className="flex min-h-[42px] items-center justify-center rounded-xl bg-slate-100 px-2 py-2.5 text-center text-[12px] font-black text-slate-400 sm:text-[13px]">
            فتح حساب غير متاح
          </span>
        )}
      </div>
    </article>
  );
}



type ComparisonRow = {
  label: string;
  a: unknown;
  b: unknown;
  note?: string;
};

type ComparisonGroup = {
  title: string;
  description: string;
  rows: ComparisonRow[];
};

function DataTable({
  first,
  second,
  groups,
}: {
  first: Item;
  second: Item;
  groups: ComparisonGroup[];
}) {
    return (
    <>
      {/* MOBILE COMPARISON - NO HORIZONTAL SCROLL */}
      <div className="space-y-4 md:hidden" dir="rtl">

        {/* ACCOUNT HEADERS */}
        <div className="grid grid-cols-2 gap-2">
          {[first, second].map((item) => (
            <div
              key={item.account.id}
              className="min-w-0 rounded-2xl bg-[#12244b] p-3 text-center text-white"
            >
              <div className="break-words text-[14px] font-black leading-6">
                {item.broker.name}
              </div>

              <div className="mt-1 text-[12px] font-bold text-blue-200">
                {name(item)}
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON GROUPS */}
        {groups.map((group) => (
          <section
            key={group.title}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="bg-[#eaf2ff] px-4 py-4">
              <h3 className="text-[15px] font-black leading-7 text-[#184A97]">
                {group.title}
              </h3>

              <p className="mt-1 text-[12px] leading-6 text-slate-600">
                {group.description}
              </p>
            </div>

            <div className="space-y-3 p-3">
              {group.rows.map((row, index) => (
                <div
                  key={`${group.title}-${row.label}-${index}`}
                  className="rounded-xl border border-slate-100 bg-[#f8fbff] p-3"
                >
                  <h4 className="text-center text-[14px] font-black leading-6 text-slate-900">
                    {row.label}
                  </h4>

                  {row.note && (
                    <p className="mt-1 text-center text-[11px] leading-5 text-slate-500">
                      {row.note}
                    </p>
                  )}

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      { item: first, value: row.a },
                      { item: second, value: row.b },
                    ].map(({ item, value }) => (
                      <div
                        key={item.account.id}
                        className="min-w-0 rounded-xl border border-slate-100 bg-white p-2.5 text-center"
                      >
                        <div className="break-words text-[11px] font-black leading-5 text-[#1E5BB8]">
                          {item.broker.name}
                        </div>

                        <div className="mt-2 break-words text-[13px] font-extrabold leading-6 text-slate-900 [overflow-wrap:anywhere]">
                          {shown(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* OPEN ACCOUNT BUTTONS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <h3 className="mb-3 text-center text-[15px] font-black">
            فتح حساب تداول
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {[first, second].map((item) => (
              <div key={item.account.id} className="min-w-0">
                <div className="mb-2 text-center text-[12px] font-black text-slate-800">
                  {item.broker.name}
                </div>

                {item.broker.real_account_url ? (
                  <a
                    href={item.broker.real_account_url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="flex min-h-[44px] items-center justify-center rounded-xl bg-[#1E5BB8] px-2 py-2 text-center text-[12px] font-black text-white"
                  >
                    فتح حساب ↗
                  </a>
                ) : (
                  <span className="flex min-h-[44px] items-center justify-center rounded-xl bg-slate-100 px-2 py-2 text-center text-[11px] font-bold text-slate-400">
                    غير متاح
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="px-2 text-[11px] leading-6 text-slate-500">
          تُعرض البيانات كما هي مسجلة في بروكر العرب. قد تختلف
          شروط التداول بحسب الحساب والدولة والكيان القانوني.
        </p>
      </div>

      {/* DESKTOP TABLE - KEEP ORIGINAL DESIGN */}
      <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-right">
          <thead>
            <tr className="bg-[#12244b] text-white">
              <th className="w-[30%] px-4 py-5 text-[13px] font-black sm:px-6 sm:text-[15px]">
                معيار المقارنة
              </th>

              {[first, second].map((item) => (
                <th
                  key={item.account.id}
                  className="w-[35%] px-3 py-5 text-center sm:px-5"
                >
                  <div className="text-[15px] font-black sm:text-[19px]">
                    {item.broker.name}
                  </div>

                  <div className="mt-1 text-[12px] font-bold text-blue-200 sm:text-[14px]">
                    {name(item)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {groups.map((group) => (
            <tbody key={group.title}>
              <tr className="bg-[#eaf2ff]">
                <th
                  colSpan={3}
                  className="border-y border-blue-100 px-4 py-4 sm:px-6"
                >
                  <div className="text-[15px] font-black text-[#184A97] sm:text-[18px]">
                    {group.title}
                  </div>

                  <div className="mt-1 text-[12px] font-medium leading-6 text-slate-600">
                    {group.description}
                  </div>
                </th>
              </tr>

              {group.rows.map((row, index) => (
                <tr
                  key={`${group.title}-${row.label}`}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-[#f8fbff]"
                  }
                >
                  <th className="border-b border-slate-100 px-4 py-4 align-middle text-[13px] font-extrabold text-slate-800 sm:px-6 sm:py-5 sm:text-[15px]">
                    {row.label}

                    {row.note && (
                      <div className="mt-1 text-[11px] font-normal leading-5 text-slate-500">
                        {row.note}
                      </div>
                    )}
                  </th>

                  <td className="border-b border-r border-slate-100 px-3 py-4 text-center align-middle sm:px-5">
                    <span className="break-words text-[13px] font-extrabold leading-7 text-slate-900 sm:text-[16px]">
                      {shown(row.a)}
                    </span>
                  </td>

                  <td className="border-b border-r border-slate-100 px-3 py-4 text-center align-middle sm:px-5">
                    <span className="break-words text-[13px] font-extrabold leading-7 text-slate-900 sm:text-[16px]">
                      {shown(row.b)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
          <tfoot>
  <tr className="border-t-2 border-blue-100 bg-[#f8fbff]">
    <th className="px-4 py-5 text-right text-[13px] font-black text-slate-900 sm:px-6">
      فتح حساب تداول
    </th>

    {[first, second].map((item) => (
      <td
        key={item.account.id}
        className="border-r border-slate-100 px-3 py-4 text-center sm:px-5"
      >
        {item.broker.real_account_url ? (
          <a
            href={item.broker.real_account_url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="flex min-h-[42px] w-full items-center justify-center rounded-xl bg-[#1E5BB8] px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-[#184A97]"
          >
            فتح حساب ↗
          </a>
        ) : (
          <span className="flex min-h-[42px] items-center justify-center rounded-xl bg-slate-100 px-3 py-2.5 text-[13px] font-bold text-slate-400">
            فتح حساب غير متاح
          </span>
        )}
      </td>
    ))}
  </tr>
</tfoot>
        </table>
      </div>

      <div className="border-t border-slate-200 bg-[#f8fbff] px-5 py-4 text-[12px] leading-7 text-slate-600">
        اسحب الجدول أفقياً على الشاشات الصغيرة عند الحاجة.
        تُعرض البيانات كما هي مسجلة في بروكر العرب.
        لا نفترض أن قيم السبريد أو العمولة قابلة للمقارنة
        حسابياً دون التحقق من الوحدة والأداة المالية
        وطريقة احتساب الرسوم.
      </div>
          </div>
    </>
  );
}

function Paragraphs({ value }: { value: unknown }) {
  const parts = paragraphs(value);

  if (!parts.length) {
    return (
      <p className="text-sm leading-8 text-slate-500">
        لا يتوفر تحليل إضافي لهذا الحساب حالياً.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {parts.map((part, index) => (
        <p
          key={index}
          className="text-[14px] leading-[2.1] text-slate-700 sm:text-[15px]"
        >
          {part}
        </p>
      ))}
    </div>
  );
}

function ListPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "positive" | "caution" | "neutral";
}) {
  const positive = tone === "positive";
  const caution = tone === "caution";

  return (
    <div className="h-full rounded-[20px] border border-slate-200 bg-[#f8fbff] p-5">
      <h4 className="text-[17px] font-black text-slate-950">
        {title}
      </h4>

      {items.length ? (
        <ul className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-[13px] leading-7 text-slate-700 sm:text-[14px]"
            >
              <span
                className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                  positive
                    ? "bg-emerald-50 text-emerald-700"
                    : caution
                      ? "bg-amber-50 text-amber-700"
                      : "bg-blue-50 text-[#1E5BB8]"
                }`}
              >
                {positive ? "✓" : caution ? "!" : "•"}
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          لا توجد تفاصيل إضافية مسجلة.
        </p>
      )}
    </div>
  );
}


function AccountAnalysis({
  first,
  second,
}: {
  first: Item;
  second: Item;
}) {
  const items = [first, second];

  const data = items.map((item) => ({
    item,
    pros: textList(item.content?.pros_ar),
    cons: textList(item.content?.cons_ar),
    audience: textList(item.content?.who_is_it_for_ar),
    analysis: blocks(item.content?.unique_content_ar),
    notes: blocks(item.content?.important_notes_ar),
  }));

  const cell =
    "min-w-0 rounded-[20px] border border-slate-200 bg-white p-5 sm:p-6";

  const pairedRow = (
    render: (entry: (typeof data)[number]) => React.ReactNode
  ) => (
    <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
      {data.map((entry) => (
        <div key={entry.item.account.id} className="min-w-0">
          {render(entry)}
        </div>
      ))}
    </div>
  );

  return (
    <div dir="rtl" className="space-y-4">
      {/* ACCOUNT HEADERS */}
      {pairedRow(({ item }) => (
        <div className="flex h-full min-h-[112px] items-center gap-4 rounded-[22px] border border-slate-200 bg-[#f1f6ff] p-5 shadow-sm sm:p-6">
          <Logo broker={item.broker} />

          <div className="min-w-0">
            <h3 className="break-words text-[20px] font-black text-slate-950 sm:text-[23px]">
              {item.broker.name}
            </h3>

            <p className="mt-1 text-[15px] font-bold text-[#1E5BB8]">
              {name(item)}
            </p>
          </div>
        </div>
      ))}

      {/* EXPERT ASSESSMENT */}
      {pairedRow(({ item }) => (
        <section className={`${cell} h-full`}>
          <h3 className="mb-3 text-[18px] font-black text-slate-950">
            رأي بروكر العرب
          </h3>

          <Paragraphs value={item.content?.expert_verdict_ar} />
        </section>
      ))}

      {/* ADVANTAGES */}
      {pairedRow(({ pros }) => (
        <ListPanel
          title="مميزات الحساب"
          items={pros}
          tone="positive"
        />
      ))}

      {/* DISADVANTAGES */}
      {pairedRow(({ cons }) => (
        <ListPanel
          title="العيوب والنقاط التي يجب الانتباه لها"
          items={cons}
          tone="caution"
        />
      ))}

      {/* SUITABLE TRADERS */}
      {pairedRow(({ audience }) => (
        <ListPanel
          title="لمن يناسب هذا الحساب؟"
          items={audience}
          tone="neutral"
        />
      ))}

      {/* DETAILED ANALYSIS */}
      {pairedRow(({ analysis }) => (
        <section className={`${cell} h-full`}>
          <h3 className="mb-5 border-b border-slate-100 pb-4 text-[19px] font-black text-slate-950">
            تحليل الحساب بالتفصيل
          </h3>

          {analysis.length ? (
            <div className="space-y-6">
              {analysis.map((block, index) => (
                <div key={index}>
                  <h4 className="text-[16px] font-black leading-7 text-[#184A97]">
                    {block.title}
                  </h4>

                  <p className="mt-2 whitespace-pre-line text-[14px] leading-8 text-slate-700">
                    {block.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-8 text-slate-500">
              لا يتوفر تحليل تفصيلي إضافي لهذا الحساب حالياً.
            </p>
          )}
        </section>
      ))}

      {/* IMPORTANT NOTES */}
      {pairedRow(({ item, notes }) => (
        <section className="flex h-full flex-col rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 sm:p-6">
          <h3 className="text-[17px] font-black text-slate-950">
            {item.content?.important_notes_title_ar ||
              "ملاحظات مهمة قبل فتح الحساب"}
          </h3>

          {notes.length ? (
            <div className="mt-4 space-y-5">
              {notes.map((note, index) => (
                <div key={index}>
                  <h4 className="text-[14px] font-black text-slate-900">
                    {note.title}
                  </h4>

                  <p className="mt-1 whitespace-pre-line text-[13px] leading-7 text-slate-700">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] leading-7 text-slate-600">
              لا توجد ملاحظات إضافية مسجلة لهذا الحساب حالياً.
            </p>
          )}
        </section>
      ))}

      {/* ACCOUNT REVIEW BUTTONS */}
      {pairedRow(({ item }) => (
        <Link
          href={accountLink(item)}
          className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-[#1E5BB8] px-5 py-3 text-center text-[14px] font-black text-white transition hover:bg-[#184A97]"
        >
          اقرأ التقييم الكامل للحساب ←
        </Link>
      ))}
    </div>
  );
}


function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const result = await getComparison(slug);

  if (!result) notFound();

  const { first, second, canonicalSlug } = result;

  if (slug !== canonicalSlug) {
    permanentRedirect(
      `/compare-accounts/${canonicalSlug}`
    );
  }

  const firstName = fullName(first);
  const secondName = fullName(second);

  const canonical =
    `${SITE}/compare-accounts/${canonicalSlug}`;

  const groups: ComparisonGroup[] = [
    {
      title: "01 — معلومات الحساب الأساسية",
      description:
        "التعريف بالحسابين ونوع كل حساب.",
      rows: [
        {
          label: "شركة التداول",
          a: first.broker.name,
          b: second.broker.name,
        },
        {
          label: "اسم الحساب",
          a: name(first),
          b: name(second),
        },
        
        {
          label: "تصنيف الحساب",
          a: first.account.account_type,
          b: second.account.account_type,
        },
        {
  label: "التراخيص التنظيمية للشركة",
  a: first.broker.regulation,
  b: second.broker.regulation,
  note: "تراخيص الشركة العامة؛ تحقق من الكيان القانوني الذي يقدم الحساب في بلدك.",
},
      ],
    },
    {
      title: "02 — السبريد وتكاليف التداول",
      description:
        "الرسوم المسجلة لكل حساب، دون افتراض تكاليف غير موثقة.",
      rows: [
        {
          label: "نطاق السبريد المعلن",
          a: first.account.spread,
          b: second.account.spread,
        },
        {
          label: "أقل سبريد مسجل",
          a: first.account.spread_min,
          b: second.account.spread_min,
          note: "بحسب البيانات المتاحة للحساب",
        },
        {
          label: "متوسط السبريد المسجل",
          a: first.account.spread_avg,
          b: second.account.spread_avg,
        },
        {
          label: "العمولة المعلنة",
          a: first.account.commission,
          b: second.account.commission,
        },
        
      ],
    },
    {
      title: "03 — الإيداع والتنفيذ",
      description:
        "المتطلبات التشغيلية وخصائص تنفيذ الأوامر.",
      rows: [
        {
          label: "الحد الأدنى للإيداع",
          a: first.account.min_deposit,
          b: second.account.min_deposit,
        },
        {
          label: "طريقة تنفيذ الأوامر",
          a: first.account.execution_type,
          b: second.account.execution_type,
        },
        {
          label: "منصات الشركة",
          a: first.broker.platforms,
          b: second.broker.platforms,
          note: "قد تختلف المنصات المتاحة حسب الحساب",
        },
      ],
    },
    {
      title: "04 — ملاءمة الحساب وشروطه",
      description:
        "خصائص مهمة لاختيار الحساب بحسب احتياجات المتداول.",
      rows: [
        {
          label: "الفئة المناسبة",
          a: first.account.best_for,
          b: second.account.best_for,
        },
        {
          label: "ملاءمة السكالبينج",
          a:
            first.account.is_best_for_scalping === true
              ? "مصنف ضمن الحسابات المناسبة للسكالبينج"
              : "غير مصنف ضمن هذه الفئة",
          b:
            second.account.is_best_for_scalping === true
              ? "مصنف ضمن الحسابات المناسبة للسكالبينج"
              : "غير مصنف ضمن هذه الفئة",
          note: "تصنيف داخلي وليس ضماناً لملاءمة الحساب",
        },
        {
          label: "توفر الحساب الإسلامي",
          a: yesNo(first.account.is_islamic_available),
          b: yesNo(second.account.is_islamic_available),
        },
        {
          label: "شروط الحساب الإسلامي",
          a: first.account.islamic_conditions,
          b: second.account.islamic_conditions,
        },
      ],
    },
    {
      title: "05 — معلومات الشركة والتنظيم",
      description:
        "هذه بيانات على مستوى الشركة، وليست ضماناً بانطباق كل ترخيص على الحساب.",
      rows: [
        {
          label: "التراخيص المذكورة",
          a: first.broker.regulation,
          b: second.broker.regulation,
        },
        {
          label: "الرافعة المالية العامة",
          a: first.broker.max_leverage,
          b: second.broker.max_leverage,
          note: "قد تختلف حسب الحساب والدولة والكيان",
        },
        {
          label: "ملاحظات توفر الحسابات",
          a: first.broker.account_availability_note_ar,
          b: second.broker.account_availability_note_ar,
        },
      ],
    },
  ];

  const sameBroker =
    first.broker.id === second.broker.id;

  const faqItems: FAQ[] = [
    {
      question: `ما الفرق بين ${firstName} و${secondName}؟`,
      answer:
        `السبريد المسجل في ${firstName} هو ${shown(first.account.spread)}، ` +
        `مقابل ${shown(second.account.spread)} في ${secondName}. ` +
        `العمولة المعلنة هي ${shown(first.account.commission)} للحساب الأول ` +
        `و${shown(second.account.commission)} للحساب الثاني. ` +
        "يجب أيضاً مقارنة شروط التنفيذ والإيداع وتوفر الحساب حسب الدولة.",
    },
    {
      question: "هل الحساب الأقل سبريداً هو الأفضل؟",
      answer:
        "ليس بالضرورة. ينبغي احتساب العمولة والسبريد معاً، " +
        "مع مراعاة الأداة المالية وحجم الصفقة وطريقة التنفيذ.",
    },
    {
      question: "هل يمكن مقارنة حسابين من الشركة نفسها؟",
      answer:
        sameBroker
          ? "نعم، والحسابان المعروضان هنا تابعان للشركة نفسها، لكن تختلف خصائصهما وفق البيانات المسجلة."
          : "نعم، يتيح محرك بروكر العرب مقارنة حسابين من الشركة نفسها أو من شركتين مختلفتين.",
    },
    {
      question: "هل الحساب الإسلامي متاح لجميع العملاء؟",
      answer:
        "ليس بالضرورة. قد يتوقف توفر الحساب الإسلامي على الدولة والكيان القانوني وشروط الأهلية الخاصة بالوسيط.",
    },
  ];

  // Add account-specific questions without repeating identical questions.
  const seenQuestions = new Set(
    faqItems.map((item) => item.question.trim())
  );

  for (const item of [first, second]) {
    for (const faq of faqs(item.content?.faq_ar)) {
      const key = faq.question.trim();

      if (!seenQuestions.has(key)) {
        seenQuestions.add(key);
        faqItems.push(faq);
      }
    }
  }

  const dates = [
    first.content?.updated_at,
    second.content?.updated_at,
  ].filter((date): date is string => Boolean(date));

  const lastUpdated = dates.length
    ? dates.sort().at(-1)
    : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: `مقارنة ${firstName} مع ${secondName}`,
        inLanguage: "ar",
        
description:
  `مقارنة بين ${firstName} و${secondName} تشمل السبريد والعمولات والإيداع ومنصات التداول وشروط الحسابين.`,

        ...(lastUpdated
          ? { dateModified: lastUpdated }
          : {}),
        isPartOf: {
          "@type": "WebSite",
          name: "بروكر العرب",
          url: SITE,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: SITE,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "مقارنة حسابات التداول",
            item: `${SITE}/compare-accounts`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${firstName} مقابل ${secondName}`,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f2f6fc] text-slate-950"
    >
      <JsonLd data={structuredData} />

      
{/* HERO */}
<section className="bg-[linear-gradient(135deg,#0b1831_0%,#132957_65%,#1d4380_100%)] text-white">
  <div className="mx-auto max-w-[1520px] px-4 pb-7 pt-5 sm:px-6 lg:px-8">
    <nav
      aria-label="مسار التنقل"
      className="flex flex-wrap items-center gap-2 text-[12px] font-bold text-blue-100/80"
    >
      <Link href="/" className="hover:text-white">
        الرئيسية
      </Link>
      <span>/</span>
      <Link
        href="/compare-accounts"
        className="hover:text-white"
      >
        مقارنة حسابات التداول
      </Link>
      <span>/</span>
      <span className="text-white">المقارنة الحالية</span>
    </nav>

    <div className="mx-auto mt-5 max-w-[1100px] text-center">
      <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-1.5 text-[11px] font-black text-blue-100">
        مقارنة تفصيلية لحسابات التداول
      </span>

      
<h1 className="mt-3 text-[25px] font-black leading-[1.35] sm:text-[34px] lg:text-[38px]">
  مقارنة حسابات التداول: {firstName}
  <span className="block text-[#8bc7ff]">
    مقابل {secondName}
  </span>
</h1>


      <p className="mx-auto mt-3 max-w-[850px] text-[13px] leading-7 text-blue-100 sm:text-[15px]">
        اكتشف الفروقات في السبريد والعمولات والإيداع،
        مع تحليل شامل لمميزات وعيوب كل حساب.
      </p>
    </div>

    <div className="mx-auto mt-5 grid max-w-[1050px] grid-cols-1 gap-4 md:grid-cols-2">
      <HeroAccount item={first} number={1} />
      <HeroAccount item={second} number={2} />
    </div>

    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
      <a
        href="#comparison-table"
        className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#2B6FD0] px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-[#1E5BB8]"
      >
        شاهد جدول المقارنة ↓
      </a>

      <Link
        href="/compare-accounts#compare-tool"
        className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-white/20"
      >
        قارن حسابين آخرين
      </Link>
    </div>
  </div>
</section>


      {/* INTRODUCTION */}
      <section className="mx-auto max-w-[1520px] px-3 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="نظرة عامة"
            title={`ما الذي يميز ${firstName} عن ${secondName}؟`}
            description="قبل مقارنة الأرقام، من المهم فهم طبيعة كل حساب والشروط التي قد تجعله مناسباً لفئة معينة من المتداولين."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {[first, second].map((item) => (
              <article
                key={item.account.id}
                className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 sm:p-6"
              >
                <h3 className="mb-4 text-[19px] font-black text-[#184A97]">
                  {fullName(item)}
                </h3>

                <Paragraphs
                  value={
                    item.content?.hero_intro_ar ||
                    item.content?.overview_ar
                  }
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section
        id="comparison-table"
        className="mx-auto max-w-[1520px] scroll-mt-24 px-3 py-8 sm:px-6 lg:px-8"
      >
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="المقارنة المباشرة"
            
title="مقارنة حسابات التداول والسبريد والعمولات والمنصات"
description="قارن بين الحسابين من حيث فروقات الأسعار والعمولات والحد الأدنى للإيداع ومنصات التداول المتاحة وشروط التنفيذ والحساب الإسلامي."

          />

          <DataTable
            first={first}
            second={second}
            groups={groups}
          />
        </div>
      </section>

      {/* EXPERT ANALYSIS */}
      <section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="التحليل المتخصص"
            title="رأي بروكر العرب في الحسابين"
            description="نستعرض تحليل كل حساب بصورة مستقلة حتى تتمكن من مقارنة نقاط القوة والقيود والفئات المناسبة له، دون إعلان فائز غير مدعوم بالبيانات."
          />

          
<AccountAnalysis first={first} second={second} />

        </div>
      </section>

      {/* HOW TO CHOOSE */}
      <section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="دليل اتخاذ القرار"
            title="كيف تختار الحساب الأنسب لك؟"
            description="الأرقام وحدها لا تكفي. تعتمد ملاءمة الحساب على استراتيجية التداول وحجم رأس المال والأدوات المالية والشروط المطبقة عليك."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                number: "01",
                title: "قارن السبريد والعمولة معاً",
                text:
                  `السبريد المسجل في ${firstName} هو ${shown(first.account.spread)}، ` +
                  `وفي ${secondName} هو ${shown(second.account.spread)}. ` +
                  "لكن الحكم على التكلفة يتطلب معرفة العمولة ووحدة السبريد والأداة المالية وحجم الصفقة.",
              },
              {
                number: "02",
                title: "راجع متطلبات الإيداع",
                text:
                  `الحد الأدنى المسجل للحساب الأول ${shown(first.account.min_deposit)}، ` +
                  `مقابل ${shown(second.account.min_deposit)} للحساب الثاني. ` +
                  "الإيداع الأقل قد يوفر مرونة أكبر، لكنه لا يعني أن الحساب أفضل من جميع الجوانب.",
              },
              
{
  number: "03",
  title: "قارن منصات التداول وطرق تنفيذ الأوامر",
  text:
    "عند مقارنة حسابات التداول، تحقق من منصات التداول المتاحة لدى كل وسيط، مثل MetaTrader 4 أو MetaTrader 5 إذا كانت مدعومة فعلياً، بالإضافة إلى طريقة تنفيذ الأوامر وسياسة الانزلاق السعري. قد تختلف المنصات والشروط بحسب نوع الحساب والدولة.",
},

              {
                number: "04",
                title: "تأكد من التراخيص والأهلية",
                text:
                  "تأكد من الكيان القانوني الذي سيخدم حسابك وبلد الإقامة، وتحقق من شروط الحساب الإسلامي إذا كنت تحتاج إليه.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f0ff] text-[14px] font-black text-[#1E5BB8]">
                    {step.number}
                  </span>

                  <h3 className="text-[17px] font-black text-slate-950 sm:text-[19px]">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-4 text-[14px] leading-8 text-slate-700">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACCOUNT LINKS */}
      <section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="مزيد من المعلومات"
            title="استكشف الحسابين والشركتين"
            description="انتقل إلى صفحة الحساب الفردية أو تقييم الشركة للحصول على معلومات أكثر تفصيلاً."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[first, second].map((item) => (
              <article
                key={item.account.id}
                className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5"
              >
                <div className="flex items-center gap-4">
                  <Logo broker={item.broker} />

                  <div className="min-w-0">
                    <h3 className="text-[18px] font-black">
                      {item.broker.name}
                    </h3>

                    <p className="mt-1 text-[14px] font-bold text-[#1E5BB8]">
                      {name(item)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={accountLink(item)}
                    className="rounded-xl bg-[#1E5BB8] px-5 py-3 text-[13px] font-black text-white hover:bg-[#184A97]"
                  >
                    تفاصيل الحساب ←
                  </Link>

                  <Link
                    href={brokerLink(item)}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-black text-slate-800 hover:bg-slate-50"
                  >
                    تقييم الشركة ←
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="الأسئلة الشائعة"
            title={`أسئلة حول ${firstName} و${secondName}`}
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
  {[0, 1].map((column) => (
    <div key={column} className="flex min-w-0 flex-col gap-3">
      {faqItems
        .filter((_, index) => index % 2 === column)
        .map((faq, index) => (
          <details
            key={`${column}-${index}`}
            className="group rounded-[18px] border border-slate-200 bg-[#f8fbff] p-4 open:bg-white sm:p-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-black leading-7 text-slate-950 sm:text-[16px]">
              {faq.question}

              <span className="shrink-0 text-xl font-black text-[#1E5BB8]">
                +
              </span>
            </summary>

            <p className="mt-4 border-t border-slate-100 pt-4 text-[14px] leading-8 text-slate-700">
              {faq.answer}
            </p>
          </details>
        ))}
    </div>
  ))}
</div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1520px] px-3 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] bg-[linear-gradient(135deg,#10203f_0%,#1c3e79_100%)] px-5 py-10 text-center text-white sm:px-8">
          <h2 className="text-[24px] font-black sm:text-[32px]">
            هل تريد مقارنة حسابات أخرى؟
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-[14px] leading-8 text-blue-100">
            اختر حسابين من شركات التداول المتاحة
            لدى بروكر العرب، واستعرض الفروقات
            بينهما في صفحة مقارنة مستقلة.
          </p>

          <Link
            href="/compare-accounts#compare-tool"
            className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-7 py-3 text-[14px] font-black text-[#1E5BB8] transition hover:bg-blue-50"
          >
            ابدأ مقارنة جديدة ←
          </Link>
        </div>
      </section>
    </main>
  );
}
