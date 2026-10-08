
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
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
  max_leverage: string | number | null;
  real_account_url: string | null;
};

type Account = {
  id: number;
  broker_id: number;
  account_name: string | null;
  account_type: string | null;
  spread: string | null;
  spread_min: string | number | null;
  spread_avg: string | number | null;
  commission: string | null;
  commission_value: string | number | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  is_best_for_scalping: boolean | null;
  sort_order: number | null;
};

type Content = {
  account_id: number;
  broker_id: number;
  hero_intro_en: string | null;
  overview_en: string | null;
  expert_verdict_en: string | null;
  pros_en: unknown;
  cons_en: unknown;
  who_is_it_for_en: unknown;
  unique_content_en: unknown;
  important_notes_title_en: string | null;
  important_notes_en: unknown;
  faq_en: unknown;
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

// ======================================================
// HELPERS
// ======================================================

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

function hasArabic(value: string): boolean {
  return /[\u0600-\u06FF]/.test(value);
}

function shown(value: unknown): string {
  const text = str(value);

  if (!text) return "Not specified";

  // Never display untranslated Arabic on English pages.
  if (hasArabic(text)) return "Not specified";

  return text;
}

function name(item: Item): string {
  return str(item.account.account_name) || "Trading Account";
}

function fullName(item: Item): string {
  return `${shown(item.broker.name)} ${name(item)}`;
}

function accountLink(item: Item): string {
  return `/en/brokers/${item.broker.slug}/accounts/${slugify(
    item.account.account_name
  )}`;
}

function brokerLink(item: Item): string {
  return `/en/brokers/${item.broker.slug}`;
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
    .filter((item) => Boolean(item) && !hasArabic(item));
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
    .filter(
      (item) =>
        Boolean(item.title && item.content) &&
        !hasArabic(item.title) &&
        !hasArabic(item.content)
    );
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
    .filter(
      (item) =>
        Boolean(item.question && item.answer) &&
        !hasArabic(item.question) &&
        !hasArabic(item.answer)
    );
}

function paragraphs(value: unknown): string[] {
  return str(value)
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter((part) => Boolean(part) && !hasArabic(part));
}

function logoUrl(value: string | null): string {
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

// ======================================================
// DATABASE
// ======================================================

async function getComparison(
  slug: string
): Promise<Resolved | null> {
  const supabase = await createClient();

  const { data: brokerRows, error: brokerError } =
    await supabase
      .from("brokers")
      .select(
        "id,name,slug,logo,rating,publication_status,regulation,platforms,max_leverage,real_account_url"
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
        "id,broker_id,account_name,account_type,spread,spread_min,spread_avg,commission,commission_value,min_deposit,execution_type,best_for,is_best_for_scalping,sort_order"
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

  // Match complete account keys, including broker slugs
  // containing hyphens.
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

  // Avoid showing incorrect accounts for ambiguous URLs.
  if (matches.length !== 1) return null;

  const [first, second] = matches[0];

  const { data: contentRows, error: contentError } =
    await supabase
      .from("broker_account_content")
      .select(
        "account_id,broker_id,hero_intro_en,overview_en,expert_verdict_en,pros_en,cons_en,who_is_it_for_en,unique_content_en,important_notes_title_en,important_notes_en,faq_en,updated_at"
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

// ======================================================
// SEO METADATA
// ======================================================

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getComparison(slug);

  if (!result) {
    return {
      title: "Account Comparison Unavailable | Broker Alarab",
      robots: { index: false, follow: false },
    };
  }

  const { first, second, canonicalSlug } = result;

  const title =
    `Trading Account Comparison: ${fullName(first)} vs ${fullName(second)}`;

  const description =
    `Compare ${fullName(first)} and ${fullName(second)} ` +
    "by spreads, commissions, minimum deposits, trading platforms, " +
    "execution conditions, advantages and limitations.";

  const url =
    `${SITE}/en/compare-accounts/${canonicalSlug}`;

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
      siteName: "Broker Alarab",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

// ======================================================
// REUSABLE UI
// ======================================================

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
          alt={`${broker.name} logo`}
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

function Eyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
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

// ======================================================
// HERO ACCOUNT CARD
// ======================================================

function HeroAccount({
  item,
  number,
}: {
  item: Item;
  number: number;
}) {
  const stats = [
    {
      label: "Advertised Spread",
      value: item.account.spread,
    },
    {
      label: "Commission",
      value: item.account.commission,
    },
    {
      label: "Minimum Deposit",
      value: item.account.min_deposit,
    },
  ];

  return (
    <article className="min-w-0 rounded-[22px] border border-white/20 bg-white p-4 text-slate-950 shadow-[0_12px_30px_rgba(0,0,0,0.10)] sm:p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#eef5fd] px-3 py-1 text-[12px] font-black text-[#1E5BB8]">
          Account {number === 1 ? "One" : "Two"}
        </span>

        <span className="text-xs font-bold text-slate-400">
          {String(number).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-1 flex flex-col items-center text-center">
        <div className="flex h-[75px] w-[220px] items-center justify-center overflow-visible">
          {logoUrl(item.broker.logo) ? (
            <img
              src={logoUrl(item.broker.logo)}
              alt={`${item.broker.name} logo`}
              className="block h-[100px] w-[210px] scale-[1.35] object-contain"
            />
          ) : (
            <span className="text-2xl font-black text-[#1E5BB8]">
              {item.broker.name}
            </span>
          )}
        </div>

        <h2 className="mt-2 text-center text-[18px] font-black text-[#1E5BB8] sm:text-[20px]">
          {name(item)}
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="min-w-0 rounded-xl border border-slate-100 bg-[#f5f8fe] p-2.5 text-center"
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

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          href={accountLink(item)}
          className="flex min-h-[42px] items-center justify-center rounded-xl border border-[#1E5BB8] bg-white px-2 py-2.5 text-center text-[12px] font-black text-[#1E5BB8] transition hover:bg-[#EEF5FD] sm:text-[13px]"
        >
          Full Account Details →
        </Link>

        {item.broker.real_account_url ? (
          <a
            href={item.broker.real_account_url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="flex min-h-[42px] items-center justify-center rounded-xl bg-[#1E5BB8] px-2 py-2.5 text-center text-[12px] font-black text-white transition hover:bg-[#184A97] sm:text-[13px]"
          >
            Open Account ↗
          </a>
        ) : (
          <span className="flex min-h-[42px] items-center justify-center rounded-xl bg-slate-100 px-2 py-2.5 text-center text-[12px] font-black text-slate-400 sm:text-[13px]">
            Unavailable
          </span>
        )}
      </div>
    </article>
  );
}

// ======================================================
// COMPARISON TABLE
// EXACT SAME RESPONSIVE DESIGN AS ARABIC
// ======================================================

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
      {/* MOBILE COMPARISON — NO HORIZONTAL SCROLL */}
      <div className="space-y-4 md:hidden" dir="ltr">
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

        {/* MOBILE OPEN ACCOUNT BUTTONS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <h3 className="mb-3 text-center text-[15px] font-black">
            Open a Trading Account
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
                    Open Account ↗
                  </a>
                ) : (
                  <span className="flex min-h-[44px] items-center justify-center rounded-xl bg-slate-100 px-2 py-2 text-center text-[11px] font-bold text-slate-400">
                    Unavailable
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="px-2 text-[11px] leading-6 text-slate-500">
          Information is based on records available to Broker
          Alarab. Trading conditions may vary by account,
          country and legal entity.
        </p>
      </div>

      {/* DESKTOP TABLE — SAME ARABIC DESIGN */}
      <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="bg-[#12244b] text-white">
                <th className="w-[30%] px-4 py-5 text-[13px] font-black sm:px-6 sm:text-[15px]">
                  Comparison Criteria
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

                    <td className="border-b border-l border-slate-100 px-3 py-4 text-center align-middle sm:px-5">
                      <span className="break-words text-[13px] font-extrabold leading-7 text-slate-900 sm:text-[16px]">
                        {shown(row.a)}
                      </span>
                    </td>

                    <td className="border-b border-l border-slate-100 px-3 py-4 text-center align-middle sm:px-5">
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
                <th className="px-4 py-5 text-left text-[13px] font-black text-slate-900 sm:px-6">
                  Open a Trading Account
                </th>

                {[first, second].map((item) => (
                  <td
                    key={item.account.id}
                    className="border-l border-slate-100 px-3 py-4 text-center sm:px-5"
                  >
                    {item.broker.real_account_url ? (
                      <a
                        href={item.broker.real_account_url}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="flex min-h-[42px] w-full items-center justify-center rounded-xl bg-[#1E5BB8] px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-[#184A97]"
                      >
                        Open Account ↗
                      </a>
                    ) : (
                      <span className="flex min-h-[42px] items-center justify-center rounded-xl bg-slate-100 px-3 py-2.5 text-[13px] font-bold text-slate-400">
                        Unavailable
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="border-t border-slate-200 bg-[#f8fbff] px-5 py-4 text-[12px] leading-7 text-slate-600">
          Information is presented as recorded by Broker Alarab.
          Spread and commission figures should not be treated
          as directly comparable without verifying the
          instrument, pricing units and fee structure.
        </div>
      </div>
    </>
  );
}

// ======================================================
// END OF PART 1
// PART 2 CONTINUES BELOW
// ======================================================

 // ======================================================
 // PARAGRAPHS
 // ======================================================

function Paragraphs({ value }: { value: unknown }) {
  const parts = paragraphs(value);

  if (!parts.length) {
    return (
      <p className="text-sm leading-8 text-slate-500">
        Additional account analysis is not currently available.
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

// ======================================================
// LIST PANEL
// ======================================================

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
          No additional details are currently available.
        </p>
      )}
    </div>
  );
}

// ======================================================
// ACCOUNT ANALYSIS
// SAME DESIGN AS ARABIC VERSION
// ======================================================


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
    pros: textList(item.content?.pros_en),
    cons: textList(item.content?.cons_en),
    audience: textList(item.content?.who_is_it_for_en),
    analysis: blocks(item.content?.unique_content_en),
    notes: blocks(item.content?.important_notes_en),
  }));

  const cell = "min-w-0 rounded-[20px] border border-slate-200 bg-white p-5 sm:p-6";

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
    <div className="space-y-4">
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
            Broker Alarab's Assessment
          </h3>
          <Paragraphs value={item.content?.expert_verdict_en} />
        </section>
      ))}

      {/* ADVANTAGES */}
      {pairedRow(({ pros }) => (
        <ListPanel
          title="Account Advantages"
          items={pros}
          tone="positive"
        />
      ))}

      {/* DISADVANTAGES */}
      {pairedRow(({ cons }) => (
        <ListPanel
          title="Disadvantages and Considerations"
          items={cons}
          tone="caution"
        />
      ))}

      {/* SUITABLE TRADERS */}
      {pairedRow(({ audience }) => (
        <ListPanel
          title="Who Is This Account Suitable For?"
          items={audience}
          tone="neutral"
        />
      ))}

      {/* DETAILED ANALYSIS */}
      {pairedRow(({ analysis }) => (
        <section className={`${cell} h-full`}>
          <h3 className="mb-5 border-b border-slate-100 pb-4 text-[19px] font-black text-slate-950">
            Detailed Account Analysis
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
              Detailed account analysis is not currently available.
            </p>
          )}
        </section>
      ))}

      {/* IMPORTANT NOTES */}
      {pairedRow(({ item, notes }) => (
        <section className="flex h-full flex-col rounded-[20px] border border-amber-200 bg-amber-50/60 p-5 sm:p-6">
          <h3 className="text-[17px] font-black text-slate-950">
            {item.content?.important_notes_title_en &&
            !hasArabic(item.content.important_notes_title_en)
              ? item.content.important_notes_title_en
              : "Important Notes Before Opening an Account"}
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
              No additional account notes are currently available.
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
          Read the Full Account Review →
        </Link>
      ))}
    </div>
  );
}


// ======================================================
// STRUCTURED DATA
// ======================================================

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

// ======================================================
// MAIN PAGE
// ======================================================

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const result = await getComparison(slug);

  if (!result) notFound();

  const { first, second, canonicalSlug } = result;

  if (slug !== canonicalSlug) {
    permanentRedirect(
      `/en/compare-accounts/${canonicalSlug}`
    );
  }

  const firstName = fullName(first);
  const secondName = fullName(second);

  const canonical =
    `${SITE}/en/compare-accounts/${canonicalSlug}`;

  // ====================================================
  // COMPARISON TABLE GROUPS
  // FIVE GROUPS — SAME AS ARABIC
  //
  // REMOVED:
  // - Islamic Account Availability
  // - Islamic Account Conditions
  // - Best For
  // ====================================================

  const groups: ComparisonGroup[] = [
    {
      title: "01 — Basic Account Information",
      description:
        "Compare the broker, account name, account classification and regulatory information.",
      rows: [
        {
          label: "Broker",
          a: first.broker.name,
          b: second.broker.name,
        },
        {
          label: "Account Name",
          a: name(first),
          b: name(second),
        },
        {
          label: "Account Type",
          a: first.account.account_type,
          b: second.account.account_type,
        },
        {
          label: "Broker Regulatory Licenses",
          a: first.broker.regulation,
          b: second.broker.regulation,
          note:
            "Broker-level regulatory information. Verify which legal entity serves your country.",
        },
      ],
    },

    {
      title: "02 — Spreads and Trading Costs",
      description:
        "Compare the recorded trading costs without assuming undocumented pricing.",
      rows: [
        {
          label: "Advertised Spread Range",
          a: first.account.spread,
          b: second.account.spread,
        },
        {
          label: "Minimum Recorded Spread",
          a: first.account.spread_min,
          b: second.account.spread_min,
          note:
            "Based on the available account information.",
        },
        {
          label: "Average Recorded Spread",
          a: first.account.spread_avg,
          b: second.account.spread_avg,
        },
        {
          label: "Advertised Commission",
          a: first.account.commission,
          b: second.account.commission,
        },
      ],
    },

    {
      title: "03 — Deposits and Execution",
      description:
        "Review account funding requirements and order execution characteristics.",
      rows: [
        {
          label: "Minimum Deposit",
          a: first.account.min_deposit,
          b: second.account.min_deposit,
        },
        {
          label: "Order Execution Method",
          a: first.account.execution_type,
          b: second.account.execution_type,
        },
        {
          label: "Trading Platforms",
          a: first.broker.platforms,
          b: second.broker.platforms,
          note:
            "Available platforms may differ by account type.",
        },
      ],
    },

    {
      title: "04 — Account Features and Conditions",
      description:
        "Review relevant account characteristics and trading suitability.",
      rows: [
        {
          label: "Scalping Suitability",
          a:
            first.account.is_best_for_scalping === true
              ? "Classified as suitable for scalping"
              : "Not classified in this category",
          b:
            second.account.is_best_for_scalping === true
              ? "Classified as suitable for scalping"
              : "Not classified in this category",
          note:
            "An internal classification, not a guarantee of suitability.",
        },
      ],
    },

    {
      title: "05 — Broker Information and Regulation",
      description:
        "Broker-level information does not guarantee that every license applies to the selected account.",
      rows: [
        {
          label: "Listed Regulatory Licenses",
          a: first.broker.regulation,
          b: second.broker.regulation,
        },
        {
          label: "Broker Maximum Leverage",
          a: first.broker.max_leverage,
          b: second.broker.max_leverage,
          note:
            "Actual leverage may depend on the account, jurisdiction and legal entity.",
        },
      ],
    },
  ];

  const sameBroker =
    first.broker.id === second.broker.id;

  // ====================================================
  // FAQ
  // ====================================================

  const faqItems: FAQ[] = [
    {
      question:
        `What is the difference between ${firstName} and ${secondName}?`,
      answer:
        `The recorded spread for ${firstName} is ${shown(first.account.spread)}, ` +
        `compared with ${shown(second.account.spread)} for ${secondName}. ` +
        `The advertised commissions are ${shown(first.account.commission)} ` +
        `and ${shown(second.account.commission)}, respectively. ` +
        "You should also consider execution conditions, deposit requirements and account availability.",
    },
    {
      question:
        "Is the account with the lowest spread always better?",
      answer:
        "Not necessarily. Trading costs should be evaluated using both spreads and commissions, " +
        "while considering the financial instrument, position size and execution conditions.",
    },
    {
      question:
        "Can I compare two accounts from the same broker?",
      answer: sameBroker
        ? "Yes. Both accounts in this comparison belong to the same broker, but their characteristics may differ."
        : "Yes. Broker Alarab allows traders to compare accounts from the same broker or from different brokers.",
    },
    {
      question:
        "How can I verify the trading conditions?",
      answer:
        "Review the broker's official account specifications, applicable legal entity and trading conditions. " +
        "Spreads, commissions and leverage may vary by instrument, account and jurisdiction.",
    },
  ];

  const seenQuestions = new Set(
    faqItems.map((item) => item.question.trim())
  );

  for (const item of [first, second]) {
    for (const faq of faqs(item.content?.faq_en)) {
      const key = faq.question.trim();

      if (!seenQuestions.has(key)) {
        seenQuestions.add(key);
        faqItems.push(faq);
      }
    }
  }

  // ====================================================
  // LAST UPDATED
  // ====================================================

  const dates = [
    first.content?.updated_at,
    second.content?.updated_at,
  ].filter((date): date is string => Boolean(date));

  const lastUpdated = dates.length
    ? dates.sort().at(-1)
    : null;

  // ====================================================
  // SCHEMA
  // ====================================================

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name:
          `${firstName} vs ${secondName} Trading Account Comparison`,
        inLanguage: "en",
        description:
          `Compare ${firstName} and ${secondName} by spreads, ` +
          "commissions, deposits, trading platforms and account conditions.",
        ...(lastUpdated
          ? { dateModified: lastUpdated }
          : {}),
        isPartOf: {
          "@type": "WebSite",
          name: "Broker Alarab",
          url: SITE,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE}/en`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Compare Trading Accounts",
            item: `${SITE}/en/compare-accounts`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${firstName} vs ${secondName}`,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f2f6fc] text-slate-950"
    >
      <JsonLd data={structuredData} />

      {/* =================================================
          HERO — SAME DESIGN AS ARABIC
      ================================================= */}

      <section className="bg-[linear-gradient(135deg,#0b1831_0%,#132957_65%,#1d4380_100%)] text-white">
        <div className="mx-auto max-w-[1520px] px-4 pb-7 pt-5 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[12px] font-bold text-blue-100/80"
          >
            <Link
              href="/en"
              className="hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/en/compare-accounts"
              className="hover:text-white"
            >
              Compare Trading Accounts
            </Link>

            <span>/</span>

            <span className="text-white">
              Current Comparison
            </span>
          </nav>

          <div className="mx-auto mt-5 max-w-[1100px] text-center">
            <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-1.5 text-[11px] font-black text-blue-100">
              Detailed Trading Account Comparison
            </span>

            <h1 className="mt-3 text-[25px] font-black leading-[1.35] sm:text-[34px] lg:text-[38px]">
              Trading Account Comparison: {firstName}

              <span className="block text-[#8bc7ff]">
                vs {secondName}
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-[850px] text-[13px] leading-7 text-blue-100 sm:text-[15px]">
              Explore differences in spreads, commissions,
              deposits and trading conditions, alongside
              a detailed review of each account's
              advantages and limitations.
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
              View Comparison Table ↓
            </a>

            <Link
              href="/en/compare-accounts#compare-tool"
              className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-white/20"
            >
              Compare Other Accounts
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          INTRODUCTION
      ================================================= */}

      <section className="mx-auto max-w-[1520px] px-3 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="ACCOUNT OVERVIEW"
            title={`What Makes ${firstName} Different from ${secondName}?`}
            description="Before comparing the numbers, it is important to understand the purpose of each account and the conditions that may make it suitable for different traders."
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
                    item.content?.hero_intro_en ||
                    item.content?.overview_en
                  }
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          COMPARISON TABLE
      ================================================= */}

      <section
        id="comparison-table"
        className="mx-auto max-w-[1520px] scroll-mt-24 px-3 py-8 sm:px-6 lg:px-8"
      >
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="SIDE-BY-SIDE COMPARISON"
            title="Compare Trading Accounts, Spreads, Commissions and Platforms"
            description="Review spreads, commissions, minimum deposits, trading platforms, execution methods and broker-level regulatory information."
          />

          <DataTable
            first={first}
            second={second}
            groups={groups}
          />
        </div>
      </section>

      {/* =================================================
          EXPERT ANALYSIS
      ================================================= */}

      <section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="EXPERT ANALYSIS"
            title="Broker Alarab's Assessment of Both Accounts"
            description="We review each account independently, highlighting strengths, limitations and the types of traders it may suit, without declaring an unsupported winner."
          />

          
<AccountAnalysis first={first} second={second} />

        </div>
      </section>

      {/* =================================================
          HOW TO CHOOSE
      ================================================= */}

      <section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="DECISION GUIDE"
            title="How to Choose the Right Trading Account"
            description="Numbers alone are not enough. Account suitability depends on your trading strategy, capital, financial instruments and the conditions applicable to you."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                number: "01",
                title: "Compare Spreads and Commissions Together",
                text:
                  `The recorded spread for ${firstName} is ${shown(first.account.spread)}, ` +
                  `while ${secondName} shows ${shown(second.account.spread)}. ` +
                  "Evaluating overall trading costs also requires checking commission rates, pricing units, instruments and position sizes.",
              },
              {
                number: "02",
                title: "Review Minimum Deposit Requirements",
                text:
                  `The recorded minimum deposit for ${firstName} is ${shown(first.account.min_deposit)}, ` +
                  `compared with ${shown(second.account.min_deposit)} for ${secondName}. ` +
                  "A lower deposit requirement may provide more flexibility, but it does not automatically make an account better.",
              },
              {
                number: "03",
                title: "Compare Trading Platforms and Execution",
                text:
                  "Check which trading platforms each broker actually offers for the selected account, " +
                  "including MetaTrader 4 or MetaTrader 5 where supported. " +
                  "Also review execution policies and potential slippage. Availability and conditions may vary by account and country.",
              },
              {
                number: "04",
                title: "Verify Regulation and Eligibility",
                text:
                  "Confirm the legal entity that will serve your account, " +
                  "the regulatory framework applicable to that entity, " +
                  "and whether the selected account is available in your country.",
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

                  <h3 className="text-[17px] font-black leading-7 text-slate-950">
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

      {/* =================================================
          FAQ
      ================================================= */}

      <section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title={`FAQs About ${firstName} vs ${secondName}`}
            description="Answers to common questions about account comparisons, trading costs and account conditions."
          />

          
<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
  {[faqItems.slice(0, 5), faqItems.slice(5, 10)].map(
    (column, columnIndex) => (
      <div
        key={columnIndex}
        className="flex min-w-0 flex-col gap-3"
      >
        {column.map((faq, index) => (
          <details
            key={`${faq.question}-${columnIndex}-${index}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fbff]"
          >
            <summary className="flex min-h-[62px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-black leading-6 text-slate-950 marker:hidden sm:text-[15px] [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1">
                {faq.question}
              </span>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e6f0ff] text-[#1E5BB8] transition group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="border-t border-slate-200 px-5 py-4 text-[14px] leading-8 text-slate-700">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    )
  )}
</div>

        </div>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="mx-auto max-w-[1520px] px-3 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] bg-[linear-gradient(135deg,#10244a_0%,#1d4380_100%)] p-6 text-center text-white sm:p-10">
          <h2 className="text-[23px] font-black leading-tight sm:text-[30px]">
            Explore Both Trading Accounts in Detail
          </h2>

          <p className="mx-auto mt-4 max-w-[850px] text-[14px] leading-8 text-blue-100">
            Review the full account information, compare trading
            conditions and verify the broker's requirements
            before opening an account.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[first, second].map((item) => (
              <Link
                key={item.account.id}
                href={accountLink(item)}
                className="flex min-h-[50px] items-center justify-center rounded-xl border border-white/25 bg-white px-4 py-3 text-center text-[13px] font-black text-[#184A97] transition hover:bg-[#EEF5FD]"
              >
                View {fullName(item)} →
              </Link>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Link
              href="/en/compare-accounts#compare-tool"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-white/20"
            >
              Compare Two Other Accounts →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
