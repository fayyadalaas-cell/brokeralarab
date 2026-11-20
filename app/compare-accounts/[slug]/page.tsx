
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


/* =========================================================
   BROKER ACCOUNT COMPARISON — V1 / V2 DATA ENGINE
   ========================================================= */

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
  best_for_ar?: string | null;
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
  activeV2: boolean;
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

/* =========================================================
   ORIGINAL HELPERS
   ========================================================= */

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
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
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
    .filter(
      (item) => item.question && item.answer
    );
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

function sortedPair(
  a: Item,
  b: Item
): [Item, Item] {
  return a.key <= b.key ? [a, b] : [b, a];
}

/* =========================================================
   V2 FIELD ADAPTERS
   ========================================================= */

function v2Text(
  row: Record<string, unknown>,
  ...keys: string[]
): string | null {
  for (const key of keys) {
    const value = row[key];

    if (
      typeof value === "string" &&
      value.trim()
    ) {
      return value.trim();
    }
  }

  return null;
}

function v2Number(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : null;
}

const v2BestForLabels: Record<string, string> = {
  beginners: "المبتدئين",
  small_capital: "أصحاب رأس المال الصغير",
  experienced: "المتداولين المحترفين",
  scalping: "المضاربة السريعة",
  day_trading: "التداول اليومي",
  swing_trading: "التداول متوسط الأجل",
  automated_trading: "التداول الآلي",
  low_spreads: "الباحثين عن سبريد منخفض",
  commission_free: "التداول دون عمولة",
  high_volume: "أحجام التداول الكبيرة",
};

function mapV2ComparisonAccount(
  row: Record<string, unknown>,
  legacyType: string | null
): Account {
  const accountName =
    v2Text(row, "account_name") || "";

  const spreadFrom = v2Number(
    row.spread_advertised_from
  );

  const spreadAverage = v2Number(
    row.spread_avg
  );

  const spreadValue =
    spreadFrom ?? spreadAverage;

  const spreadUnit =
    v2Text(row, "spread_unit_ar") || "نقطة";

  const commissionAmount = v2Number(
    row.commission_amount
  );

  type CommissionPolicy = {
    type?: string;
    amount_usd?: number;
    amount_qualifier?: string;
  };

  const costs: CommissionPolicy[] =
    Array.isArray(row.trading_costs_extra)
      ? row.trading_costs_extra
      : [];

  const policy = costs.find(
    (item) =>
      item.type === "advertised_commission_policy" &&
      typeof item.amount_usd === "number"
  );

  let commission: string | null = null;

  if (policy) {
    const prefix =
      policy.amount_qualifier === "up_to"
        ? "حتى "
        : policy.amount_qualifier === "from"
          ? "من "
          : "";

    commission =
      `${prefix}$${policy.amount_usd} لكل لوت/اتجاه`;
  } else if (commissionAmount === 0) {
    commission = "بدون عمولة";
  } else if (commissionAmount !== null) {
    commission =
      `${commissionAmount} ${
        v2Text(row, "commission_currency") || ""
      }`.trim();
  }

  const depositAmount = v2Number(
    row.min_deposit_amount
  );

  const depositCurrency =
    v2Text(row, "min_deposit_currency");

  const minDeposit =
    depositAmount === null
      ? null
      : depositCurrency === "USD"
        ? `$${depositAmount}`
        : `${depositAmount} ${
            depositCurrency || ""
          }`.trim();

  const category =
    v2Text(row, "best_for_category") || "";

  const islamicStatus = (
    v2Text(row, "islamic_status") || ""
  ).toLowerCase();

  let islamicAvailability:
    boolean | string | null = null;

  if (
    ["available", "yes", "true"].includes(
      islamicStatus
    )
  ) {
    islamicAvailability = true;
  } else if (
    ["unavailable", "no", "false"].includes(
      islamicStatus
    )
  ) {
    islamicAvailability = false;
  } else if (
    ["conditional", "eligible", "on_request"].includes(
      islamicStatus
    )
  ) {
    islamicAvailability = "بحسب الأهلية والشروط";
  }

  return {
    // Negative IDs distinguish V2 accounts in UI keys.
    id: -Number(row.id),

    broker_id: Number(row.broker_id),
    account_name: accountName,
    account_name_ar:
      v2Text(row, "account_name_ar"),
    account_type:
      v2Text(row, "account_type") ||
      legacyType,

    spread:
      spreadValue === null
        ? null
        : `${spreadFrom !== null ? "من " : ""}${spreadValue} ${spreadUnit}`,

    spread_min: spreadFrom,
    spread_avg: spreadAverage,

    commission,
    commission_value: commissionAmount,
    min_deposit: minDeposit,

    execution_type:
      v2Text(
        row,
        "execution_type_short_ar",
        "execution_type_ar"
      ),

    best_for:
      v2BestForLabels[category] || null,

    is_islamic_available:
      islamicAvailability,

    islamic_conditions:
      v2Text(row, "islamic_conditions_ar"),

    is_best_for_scalping:
      category === "scalping" ? true : null,

    sort_order: v2Number(row.sort_order),
  };
}

function mapV2ComparisonContent(
  row: Record<string, unknown>,
  accountId: number,
  brokerId: number
): Content {
  const sections = safeArray(
    row.sections_ar
  )
    .filter(
      (section): section is Record<string, unknown> =>
        typeof section === "object" &&
        section !== null &&
        !Array.isArray(section)
    )
    .map((section) => ({
      title: str(section.title),
      content: str(section.body),
    }))
    .filter(
      (section) =>
        section.title && section.content
    );

  const bestFor =
    v2Text(row, "best_for_ar");

  return {
    account_id: accountId,
    broker_id: brokerId,

    hero_intro_ar:
      v2Text(row, "hero_intro_ar"),

    overview_ar:
      v2Text(row, "overview_ar"),

    expert_verdict_ar:
      v2Text(row, "expert_verdict_ar"),

    best_for_ar: bestFor,

    pros_ar: safeArray(row.pros_ar),
    cons_ar: safeArray(row.cons_ar),

    // Keep the existing comparison analysis component
    // compatible with the new paragraph-based V2 field.
    who_is_it_for_ar:
      bestFor ? [bestFor] : [],

    unique_content_ar: sections,

    important_notes_title_ar: null,
    important_notes_ar: [],

    faq_ar: safeArray(row.faq_ar),

    updated_at:
      v2Text(row, "updated_at"),
  };
}

/* =========================================================
   COMPARISON RESOLVER
   Mixed V1/V2 supported.
   Original URLs and category matching preserved.
   ========================================================= */

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
      .eq("publication_status", "published")
      .eq("is_full_review", true);

  if (brokerError || !brokerRows) {
    return null;
  }

  const brokers = brokerRows as Broker[];

  const brokerMap = new Map<number, Broker>();

  for (const broker of brokers) {
    if (broker.slug && broker.name) {
      brokerMap.set(broker.id, broker);
    }
  }

  /* Legacy accounts are retained for:
     1. Companies still on V1
     2. Account category matching during migration
  */

  const { data: legacyRows, error: legacyError } =
    await supabase
      .from("broker_accounts")
      .select(
        "id,broker_id,account_name,account_name_ar,account_type,spread,spread_min,spread_avg,commission,commission_value,min_deposit,execution_type,best_for,is_islamic_available,islamic_conditions,is_best_for_scalping,sort_order"
      );

  if (legacyError || !legacyRows) {
    return null;
  }

  const legacyAccounts = legacyRows as Account[];

  const legacyByBroker = new Map<number, Account[]>();

  for (const legacy of legacyAccounts) {
    const previous =
      legacyByBroker.get(legacy.broker_id) || [];

    previous.push(legacy);

    legacyByBroker.set(
      legacy.broker_id,
      previous
    );
  }

  const keys = new Map<string, Item[]>();

  function registerItem(item: Item) {
    const existing = keys.get(item.key) || [];

    existing.push(item);
    keys.set(item.key, existing);
  }

  /* =========================================================
     Select only brokers involved in this URL.
     This avoids checking every broker's readiness.
     ========================================================= */

  const candidateBrokers = brokers.filter(
    (broker) =>
      broker.slug &&
      (
        slug.startsWith(`${broker.slug}-`) ||
        slug.includes(`-vs-${broker.slug}-`)
      )
  );

  if (!candidateBrokers.length) {
    return null;
  }

  for (const broker of candidateBrokers) {
    if (!broker.slug) continue;

    const brokerLegacyAccounts =
      legacyByBroker.get(broker.id) || [];

    let useV2 = false;

    if (broker.slug !== "capital-com") {
      const { data: ready, error: readyError } =
        await supabase.rpc(
          "is_broker_v2_ready",
          {
            p_broker_id: broker.id,
          }
        );

      if (readyError) {
        console.error(
          "[Compare Accounts AR] V2 readiness:",
          readyError.message
        );
      }

      useV2 =
        !readyError && ready === true;
    }

    /* =========================================================
       V2: require verified, published accounts and
       approved matching editorial content.
       ========================================================= */

    if (useV2) {
      const { data: v2Accounts, error: accountError } =
        await supabase
          .from("broker_accounts_v2")
          .select("*")
          .eq("broker_id", broker.id)
          .eq("publication_status", "published")
          .eq("verification_status", "verified")
          .order("sort_order", {
            ascending: true,
          });

      if (
        accountError ||
        !v2Accounts?.length
      ) {
        return null;
      }

      const v2Ids = v2Accounts.map(
        (account) => account.id
      );

      const { data: v2Contents, error: contentError } =
        await supabase
          .from("broker_account_content_v2")
          .select("*")
          .in("account_id", v2Ids);

      const validContent =
        !contentError &&
        v2Contents?.length === v2Accounts.length &&
        v2Contents.every(
          (content) =>
            content.editorial_status === "approved"
        ) &&
        new Set(
          v2Contents.map(
            (content) => content.account_id
          )
        ).size === v2Accounts.length;

      if (
        !validContent ||
        !v2Contents
      ) {
        return null;
      }

      const contentByAccount = new Map(
        v2Contents.map(
          (content) => [
            Number(content.account_id),
            content,
          ] as const
        )
      );

      for (const rawAccount of v2Accounts) {
        if (!rawAccount.account_name) {
          continue;
        }

        const originalLegacy =
          brokerLegacyAccounts.find(
            (legacy) =>
              slugify(legacy.account_name) ===
                rawAccount.slug ||
              slugify(legacy.account_name) ===
                slugify(rawAccount.account_name)
          );

        const account = mapV2ComparisonAccount(
          rawAccount as Record<string, unknown>,
          originalLegacy?.account_type || null
        );

        const editorial = contentByAccount.get(
          Number(rawAccount.id)
        );

        if (!editorial) {
          return null;
        }

        const accountSlug =
          str(rawAccount.slug) ||
          slugify(account.account_name);

        const key =
          `${broker.slug}-${accountSlug}`;

        registerItem({
          broker,
          account,
          content: mapV2ComparisonContent(
            editorial as Record<string, unknown>,
            account.id,
            broker.id
          ),
          key,
          activeV2: true,
        });
      }

      // Important: no legacy account from this
      // broker is registered once V2 is active.
      continue;
    }

    /* =========================================================
       V1: untouched data for all non-ready brokers.
       ========================================================= */

    for (const account of brokerLegacyAccounts) {
      if (!account.account_name) continue;

      const accountSlug = slugify(
        account.account_name
      );

      if (!accountSlug) continue;

      registerItem({
        broker,
        account,
        content: null,
        key: `${broker.slug}-${accountSlug}`,
        activeV2: false,
      });
    }
  }

  /* =========================================================
     Match entire account keys, not partial names.
     ========================================================= */

  const matches: Array<[Item, Item]> = [];
  const seen = new Set<string>();

  for (const [firstKey, firstItems] of keys) {
    const prefix = `${firstKey}-vs-`;

    if (!slug.startsWith(prefix)) {
      continue;
    }

    const secondKey =
      slug.slice(prefix.length);

    const secondItems =
      keys.get(secondKey) || [];

    for (const first of firstItems) {
      for (const second of secondItems) {
        if (
          first.key === second.key ||
          first.broker.id === second.broker.id
        ) {
          continue;
        }

        const firstType =
          first.account.account_type
            ?.trim()
            .toLowerCase();

        const secondType =
          second.account.account_type
            ?.trim()
            .toLowerCase();

        // No cross-category comparisons.
        if (
          !firstType ||
          !secondType ||
          firstType !== secondType
        ) {
          continue;
        }

        const identity = [
          first.key,
          second.key,
        ]
          .sort()
          .join(":");

        if (seen.has(identity)) {
          continue;
        }

        seen.add(identity);

        matches.push(
          sortedPair(first, second)
        );
      }
    }
  }

  if (matches.length !== 1) {
    return null;
  }

  const [first, second] = matches[0];

  /* =========================================================
     Fetch legacy editorial ONLY for V1 accounts.
     Never overwrite V2 approved editorial.
     ========================================================= */

  const legacySelected = [
    first,
    second,
  ].filter((item) => !item.activeV2);

  if (legacySelected.length) {
    const legacyIds = legacySelected.map(
      (item) => item.account.id
    );

    const { data: legacyContent, error: contentError } =
      await supabase
        .from("broker_account_content")
        .select(
          "account_id,broker_id,hero_intro_ar,overview_ar,expert_verdict_ar,pros_ar,cons_ar,who_is_it_for_ar,unique_content_ar,important_notes_title_ar,important_notes_ar,faq_ar,updated_at"
        )
        .in("account_id", legacyIds);

    if (!contentError && legacyContent) {
      const contentMap = new Map<number, Content>();

      for (const content of legacyContent as Content[]) {
        contentMap.set(
          content.account_id,
          content
        );
      }

      for (const item of legacySelected) {
        item.content =
          contentMap.get(item.account.id) || null;
      }
    }
  }

  return {
    first,
    second,
    canonicalSlug:
      `${first.key}-vs-${second.key}`,
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
  const modernComparison =
    first.activeV2 || second.activeV2;

  /* =========================================================
     V2 COMPARISON — ENHANCED TABLE
     ========================================================= */

  if (modernComparison) {
    return (
      <div dir="rtl" className="space-y-5">
        {/* Account headers */}
        <div className="grid grid-cols-2 gap-3">
          {[first, second].map((item) => (
            <div
              key={`header-${item.key}`}
              className="flex min-w-0 flex-col items-center justify-center rounded-2xl border border-blue-200 bg-blue-50/70 px-3 py-5 text-center"
            >
              <p className="break-words text-[14px] font-black text-slate-950 sm:text-[18px]">
                {item.broker.name}
              </p>

              <p className="mt-1 break-words text-[13px] font-bold text-blue-700 sm:text-[15px]">
                {name(item)}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison groups */}
        {groups.map((group, groupIndex) => (
          <section
            key={group.title}
            className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm"
          >
            {/* Group heading */}
            <div className="border-b border-blue-100 bg-blue-50/80 px-4 py-4 text-center sm:px-6 sm:py-5">
              <h3 className="text-[17px] font-black leading-7 text-blue-950 sm:text-[20px]">
                {group.title}
              </h3>

              <div className="mx-auto mt-2 h-[3px] w-14 rounded-full bg-brand-500" />

              <p className="mx-auto mt-3 max-w-4xl text-[12px] leading-6 text-slate-600 sm:text-[13px]">
                {group.description}
              </p>
            </div>

            {/* Desktop column headers */}
            <div className="hidden grid-cols-[30%_35%_35%] bg-[#12244b] text-white md:grid">
              <div className="px-5 py-4 text-right text-[13px] font-black">
                معيار المقارنة
              </div>

              {[first, second].map((item) => (
                <div
                  key={`column-${groupIndex}-${item.key}`}
                  className="border-r border-white/10 px-4 py-4 text-center"
                >
                  <p className="text-[14px] font-black">
                    {item.broker.name}
                  </p>

                  <p className="mt-1 text-[12px] text-blue-200">
                    {name(item)}
                  </p>
                </div>
              ))}
            </div>

            
{/* Comparison rows */}
<div className="divide-y divide-slate-100">
  {group.rows.map((row, index) => {
    const isLicenseRow =
      row.label === "التراخيص المذكورة";

    const isLeverageRow =
      row.label === "الرافعة المالية العامة";

    const renderValue = (value: unknown) => {
      const textValue = str(value);

      if (!textValue) {
        return "غير متوفر";
      }

      // Licenses: clean text with separators, no badges.
      if (isLicenseRow) {
        const licenses = textValue
          .split(/\s*[|,،;/]\s*/)
          .map((license) => license.trim())
          .filter(Boolean);

        if (!licenses.length) {
          return "غير موثق";
        }

        return (
          <span
            dir="ltr"
            className="inline-block max-w-full text-center text-[14px] font-extrabold leading-8 tracking-[0.2px] text-slate-900 sm:text-[15px]"
          >
            {licenses.map((license, licenseIndex) => (
              <span key={`${license}-${licenseIndex}`}>
                {licenseIndex > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-2 inline-block align-middle text-blue-500"
                  >
                    •
                  </span>
                )}
                <span className="inline-block whitespace-nowrap">
                  {license}
                </span>
              </span>
            ))}
          </span>
        );
      }

      // Leverage: clear number with correct LTR direction.
      if (isLeverageRow) {
        return (
          <span
            dir="ltr"
            className="inline-block text-[16px] font-extrabold leading-8 tracking-wide text-slate-950 sm:text-[17px]"
          >
            {textValue}
          </span>
        );
      }

      // All other rows remain unchanged.
      return shown(value);
    };

    return (
      <div
        key={`${group.title}-${row.label}-${index}`}
        className={
          index % 2 === 0
            ? "bg-white"
            : "bg-slate-50/70"
        }
      >
        {/* Desktop row */}
        <div className="hidden grid-cols-[30%_35%_35%] md:grid">
          <div className="flex flex-col justify-center px-5 py-5">
            <h4 className="text-[14px] font-extrabold leading-7 text-slate-900">
              {row.label}
            </h4>

            {row.note && (
              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                {row.note}
              </p>
            )}
          </div>

          {/* First account */}
          <div className="flex min-w-0 items-center justify-center border-r border-slate-100 px-5 py-5 text-center">
            <div className="min-w-0 break-words text-[14px] font-bold leading-7 text-slate-900 [overflow-wrap:anywhere]">
              {renderValue(row.a)}
            </div>
          </div>

          {/* Second account */}
          <div className="flex min-w-0 items-center justify-center border-r border-slate-100 px-5 py-5 text-center">
            <div className="min-w-0 break-words text-[14px] font-bold leading-7 text-slate-900 [overflow-wrap:anywhere]">
              {renderValue(row.b)}
            </div>
          </div>
        </div>

        {/* Mobile row */}
        <div className="p-3 md:hidden">
          <div className="mb-3 text-center">
            <h4 className="text-[13px] font-extrabold leading-6 text-slate-950">
              {row.label}
            </h4>

            {row.note && (
              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                {row.note}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { item: first, value: row.a },
              { item: second, value: row.b },
            ].map(({ item, value }) => (
              <div
                key={`${row.label}-${item.key}`}
                className="flex min-w-0 flex-col justify-center rounded-xl border border-blue-100 bg-blue-50/40 px-3 py-3 text-center"
              >
                <p className="break-words text-[11px] font-bold text-blue-700">
                  {item.broker.name}
                </p>

                <div className="mt-2 min-w-0 break-words text-[12px] font-extrabold leading-6 text-slate-950 [overflow-wrap:anywhere]">
                  {renderValue(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  })}
</div>

          </section>
        ))}

        {/* Account actions */}
        <div className="rounded-[22px] border border-blue-200 bg-blue-50/70 p-4 sm:p-6">
          <h3 className="text-center text-lg font-black text-slate-950">
            الاطلاع على الحسابات ومتابعة التسجيل
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[first, second].map((item) => (
              <div
                key={`action-${item.key}`}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 text-center sm:p-4"
              >
                <p className="text-[13px] font-black text-slate-950">
                  {item.broker.name}
                </p>

                <p className="mt-1 text-[12px] font-semibold text-blue-700">
                  {name(item)}
                </p>

                <Link
                  href={accountLink(item)}
                  className="mt-4 flex min-h-[42px] items-center justify-center rounded-xl border border-blue-200 px-2 py-2 text-[12px] font-bold text-blue-800 transition hover:bg-blue-50"
                >
                  تفاصيل الحساب
                </Link>

                {item.broker.real_account_url ? (
                  <a
                    href={item.broker.real_account_url}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="mt-2 flex min-h-[42px] items-center justify-center rounded-xl bg-[#1E5BB8] px-2 py-2 text-[12px] font-black text-white transition hover:bg-[#184A97]"
                  >
                    فتح حساب
                  </a>
                ) : (
                  <div className="mt-2 flex min-h-[42px] items-center justify-center rounded-xl bg-slate-100 px-2 text-[12px] font-bold text-slate-500">
                    فتح الحساب غير متاح
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="px-2 text-center text-[11px] leading-6 text-slate-500">
          تعتمد المقارنة على البيانات المسجلة لكل حساب.
          قد تختلف فروقات الأسعار والعمولات وشروط
          التداول بحسب الأداة المالية والدولة والكيان
          القانوني. ولا تعني القيم الابتدائية أنها
          تكاليف تنفيذ ثابتة أو مضمونة.
        </p>
      </div>
    );
  }

  /* =========================================================
     ORIGINAL V1 TABLE — KEEP EVERYTHING BELOW UNCHANGED
     ========================================================= */

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

  
  /* =========================================================
     V2 EDITORIAL COMPARISON
     Improved layout for approved V2 accounts.
     Original V1 analysis remains unchanged below.
     ========================================================= */

  if (first.activeV2 || second.activeV2) {
    const modernCard =
      "min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6";

    const modernPair = (
      render: (entry: (typeof data)[number]) => React.ReactNode
    ) => (
      
<div className="hidden gap-4 lg:grid lg:grid-cols-2">

        {data.map((entry) => (
          <div
            key={`v2-${entry.item.key}`}
            className="min-w-0"
          >
            {render(entry)}
          </div>
        ))}
      </div>
    );

    const entriesWithNotes = data.filter(
      (entry) => entry.notes.length > 0
    );

    return (
      <div dir="rtl" className="space-y-5">


{/* =====================================================
    V2 MOBILE — ARABIC COLLAPSIBLE EDITORIAL
    Desktop and V1 remain unchanged.
    ===================================================== */}

<div className="space-y-4 lg:hidden">
  {data.map(
    ({
      item,
      pros,
      cons,
      audience,
      analysis,
      notes,
    }) => {
      const accordionClass =
        "group overflow-hidden rounded-2xl border border-slate-200 bg-white";

      const summaryClass =
        "flex min-h-[54px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-right [&::-webkit-details-marker]:hidden";

      const headingClass =
        "min-w-0 text-[14px] font-extrabold leading-6 text-slate-900";

      const contentClass =
        "border-t border-slate-100 px-3 pb-4 pt-3";

      const accordionIcon = (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
          <span className="text-lg leading-none transition-transform group-open:rotate-45">
            +
          </span>
        </span>
      );

      return (
        <article
          key={`mobile-ar-analysis-${item.key}`}
          className="overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-sm"
        >
          {/* اسم الشركة والحساب */}
          <div className="border-b border-blue-200 bg-blue-50/70 px-3 py-3">
            <div className="flex items-center gap-3">
              <Logo broker={item.broker} />

              <div className="min-w-0">
                <h3 className="text-[17px] font-black leading-6 text-slate-950">
                  {item.broker.name}
                </h3>

                <p className="mt-1 text-[12px] font-bold text-blue-700">
                  حساب {name(item)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-3">

            {/* رأي بروكر العرب — مفتوح دائماً */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50/20 p-4">
              <h4 className="text-[15px] font-black leading-7 text-slate-950">
                رأي بروكر العرب
              </h4>

              <p className="mt-1 text-[11px] text-slate-500">
                التقييم التحريري لحساب {name(item)}
              </p>

              <div className="mt-3 border-t border-blue-100 pt-3">
                <Paragraphs
                  value={item.content?.expert_verdict_ar}
                />
              </div>
            </section>

            {/* مميزات الحساب */}
            <details className={accordionClass}>
              <summary className={summaryClass}>
                <span className={headingClass}>
                  مميزات الحساب
                  <span className="mr-2 text-[11px] font-medium text-slate-400">
                    ({pros.length})
                  </span>
                </span>

                {accordionIcon}
              </summary>

              <div className={contentClass}>
                {pros.length > 0 ? (
                  <ul className="space-y-3">
                    {pros.map((point, index) => (
                      <li
                        key={`${item.key}-pros-${index}`}
                        className="flex items-start gap-3 text-[13px] leading-7 text-slate-700"
                      >
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-700">
                          ✓
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13px] text-slate-500">
                    لا توجد مميزات إضافية موثقة حالياً.
                  </p>
                )}
              </div>
            </details>

            {/* العيوب */}
            <details className={accordionClass}>
              <summary className={summaryClass}>
                <span className={headingClass}>
                  العيوب والنقاط التي يجب الانتباه لها
                  <span className="mr-2 text-[11px] font-medium text-slate-400">
                    ({cons.length})
                  </span>
                </span>

                {accordionIcon}
              </summary>

              <div className={contentClass}>
                {cons.length > 0 ? (
                  <ul className="space-y-3">
                    {cons.map((point, index) => (
                      <li
                        key={`${item.key}-cons-${index}`}
                        className="flex items-start gap-3 text-[13px] leading-7 text-slate-700"
                      >
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-black text-amber-700">
                          !
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13px] text-slate-500">
                    لا توجد ملاحظات إضافية موثقة حالياً.
                  </p>
                )}
              </div>
            </details>

            {/* لمن يناسب الحساب */}
            <details className={accordionClass}>
              <summary className={summaryClass}>
                <span className={headingClass}>
                  لمن يناسب هذا الحساب؟
                </span>

                {accordionIcon}
              </summary>

              <div className={contentClass}>
                {item.activeV2 &&
                item.content?.best_for_ar?.trim() ? (
                  <p className="whitespace-pre-line text-[13px] leading-8 text-slate-700">
                    {item.content.best_for_ar.trim()}
                  </p>
                ) : audience.length > 0 ? (
                  <ul className="space-y-3">
                    {audience.map((point, index) => (
                      <li
                        key={`${item.key}-audience-${index}`}
                        className="flex items-start gap-2 text-[13px] leading-8 text-slate-700"
                      >
                        <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13px] leading-7 text-slate-500">
                    لا تتوفر تفاصيل إضافية عن الفئة المناسبة حالياً.
                  </p>
                )}
              </div>
            </details>

            {/* تحليل الحساب بالتفصيل */}
            <details className={accordionClass}>
              <summary className={summaryClass}>
                <span className={headingClass}>
                  تحليل الحساب بالتفصيل
                  <span className="mr-2 text-[11px] font-medium text-slate-400">
                    ({analysis.length})
                  </span>
                </span>

                {accordionIcon}
              </summary>

              <div className={contentClass}>
                {analysis.length > 0 ? (
                  <div className="space-y-3">
                    {analysis.map((block, index) => (
                      <section
                        key={`${item.key}-analysis-${index}`}
                        className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                      >
                        <h5 className="text-[13px] font-extrabold leading-7 text-blue-900">
                          {block.title}
                        </h5>

                        <p className="mt-2 whitespace-pre-line text-[13px] leading-8 text-slate-700">
                          {block.content}
                        </p>
                      </section>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-slate-500">
                    لا يتوفر تحليل تفصيلي إضافي لهذا الحساب حالياً.
                  </p>
                )}
              </div>
            </details>

            {/* الملاحظات المهمة */}
            {notes.length > 0 && (
              <details className={accordionClass}>
                <summary className={summaryClass}>
                  <span className={headingClass}>
                    {item.content?.important_notes_title_ar ||
                      "ملاحظات مهمة حول الحساب"}
                  </span>

                  {accordionIcon}
                </summary>

                <div className={contentClass}>
                  <div className="space-y-3">
                    {notes.map((note, index) => (
                      <div
                        key={`${item.key}-note-${index}`}
                        className="rounded-xl border border-amber-100 bg-amber-50/60 p-3"
                      >
                        <h5 className="text-[13px] font-bold leading-7 text-slate-900">
                          {note.title}
                        </h5>

                        <p className="mt-2 whitespace-pre-line text-[13px] leading-8 text-slate-700">
                          {note.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            )}

            {/* رابط التقييم الكامل */}
            <Link
              href={accountLink(item)}
              className="flex min-h-[46px] items-center justify-center rounded-xl bg-[#1E5BB8] px-3 py-3 text-center text-[13px] font-black text-white transition hover:bg-[#184A97]"
            >
              اقرأ التقييم الكامل لحساب {name(item)} ←
            </Link>

          </div>
        </article>
      );
    }
  )}
</div>

        {/* Broker and account headers */}
        {modernPair(({ item }) => (
          <div className="flex min-h-[94px] items-center gap-4 rounded-2xl border border-blue-200 bg-blue-50/70 p-4 sm:p-5">
            <Logo broker={item.broker} />

            <div className="min-w-0">
              <h3 className="text-[18px] font-black text-slate-950 sm:text-xl">
                {item.broker.name}
              </h3>

              <p className="mt-1 text-[14px] font-bold text-blue-700">
                {name(item)}
              </p>
            </div>
          </div>
        ))}

        {/* Editorial verdict */}
        {modernPair(({ item }) => (
          <section className={`${modernCard} h-full`}>
            <div className="mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-[18px] font-black text-slate-950">
                رأي بروكر العرب
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                التقييم التحريري لحساب {name(item)}
              </p>
            </div>

            <Paragraphs
              value={item.content?.expert_verdict_ar}
            />
          </section>
        ))}

        {/* Advantages */}
        {modernPair(({ pros }) => (
          <ListPanel
            title="مميزات الحساب"
            items={pros}
            tone="positive"
          />
        ))}

        {/* Disadvantages */}
        {modernPair(({ cons }) => (
          <ListPanel
            title="العيوب والنقاط التي يجب الانتباه لها"
            items={cons}
            tone="caution"
          />
        ))}

        {/* Best for — V2 paragraph / V1 list */}
        {modernPair(({ item, audience }) => (
          <section
            className={`${modernCard} h-full border-blue-100 bg-blue-50/30`}
          >
            <h3 className="border-b border-blue-100 pb-3 text-[18px] font-black text-slate-950">
              لمن يناسب هذا الحساب؟
            </h3>

            {item.activeV2 &&
            item.content?.best_for_ar?.trim() ? (
              <div className="mt-4">
                <p className="whitespace-pre-line text-[14px] leading-8 text-slate-700 sm:text-[15px]">
                  {item.content.best_for_ar.trim()}
                </p>
              </div>
            ) : audience.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {audience.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[14px] leading-8 text-slate-700"
                  >
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                لا تتوفر تفاصيل إضافية عن الفئة المناسبة حالياً.
              </p>
            )}
          </section>
        ))}

        {/* Detailed account analysis */}
        {modernPair(({ item, analysis }) => (
          <section className={`${modernCard} h-full`}>
            <div className="mb-5 border-b border-slate-200 pb-3">
              <h3 className="text-[18px] font-black text-slate-950">
                تحليل الحساب بالتفصيل
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                تفاصيل التكلفة والتنفيذ وشروط التداول
              </p>
            </div>

            {analysis.length > 0 ? (
              <div className="space-y-4">
                {analysis.map((block, index) => (
                  <section
                    key={`${item.key}-analysis-${index}`}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                  >
                    <h4 className="text-[15px] font-extrabold leading-7 text-blue-900">
                      {block.title}
                    </h4>

                    <div className="mt-2 h-[2px] w-10 rounded-full bg-blue-400" />

                    <p className="mt-3 whitespace-pre-line text-[13px] leading-8 text-slate-700 sm:text-[14px]">
                      {block.content}
                    </p>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-8 text-slate-500">
                لا يتوفر تحليل تفصيلي إضافي لهذا الحساب حالياً.
              </p>
            )}
          </section>
        ))}

        {/* Important notes: show only when real notes exist.
            Never render empty V2 placeholder cards. */}
        {entriesWithNotes.length > 0 && (
          <div
            
className={
  entriesWithNotes.length === 2
    ? "hidden gap-4 lg:grid lg:grid-cols-2"
    : "hidden gap-4 lg:grid"
}

          >
            {entriesWithNotes.map(({ item, notes }) => (
              <section
                key={`notes-${item.key}`}
                className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 sm:p-6"
              >
                <h3 className="text-[17px] font-black text-slate-950">
                  {item.content?.important_notes_title_ar ||
                    `ملاحظات مهمة حول حساب ${fullName(item)}`}
                </h3>

                <div className="mt-4 space-y-4">
                  {notes.map((note, index) => (
                    <div key={index}>
                      <h4 className="text-[14px] font-extrabold leading-7 text-slate-900">
                        {note.title}
                      </h4>

                      <p className="mt-1 whitespace-pre-line text-[13px] leading-7 text-slate-700">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Full account reviews */}
        {modernPair(({ item }) => (
          <Link
            href={accountLink(item)}
            className="flex min-h-[50px] w-full items-center justify-center rounded-xl bg-[#1E5BB8] px-5 py-3 text-center text-[14px] font-black text-white shadow-sm transition hover:bg-[#184A97]"
          >
            اقرأ التقييم الكامل لحساب {name(item)} ←
          </Link>
        ))}
      </div>
    );
  }

  /* =========================================================
     ORIGINAL V1 EDITORIAL LAYOUT — UNCHANGED
     ========================================================= */

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

  
/* =========================================================
   V2 COMPARISON TABLE DATA
   Original V1 groups remain untouched.
   ========================================================= */

if (first.activeV2 || second.activeV2) {
  const comparisonUnit = (item: Item) => {
    const spread = str(item.account.spread);

    if (spread.includes("نقطة")) return "نقطة";
    if (spread.includes("بيب")) return "بيب";

    return "نقطة";
  };

  const spreadNumber = (
    item: Item,
    value: string | number | null
  ) => {
    if (
      value === null ||
      value === undefined ||
      str(value) === ""
    ) {
      return "غير موثق";
    }

    if (!item.activeV2) {
      return value;
    }

    return `${value} ${comparisonUnit(item)}`;
  };

  const available = (value: unknown) => {
    const result = str(value);
    return result || "غير موثق";
  };

  const islamicLabel = (item: Item) => {
    if (item.account.is_islamic_available === null) {
      return "غير محدد";
    }

    return yesNo(item.account.is_islamic_available);
  };

  const comparisonCategory = (item: Item) => {
    const category = str(item.account.account_type);

    if (!category) return "غير مصنف";

    
const labels: Record<string, string> = {
  standard: "ستاندرد",
  professional: "احترافي",
  pro: "احترافي",
  cent: "سنت",
  raw: "سبريد خام",
  zero: "سبريد صفري",
  islamic: "إسلامي",
};


    return labels[category.toLowerCase()] || category;
  };

  const modernGroups: ComparisonGroup[] = [
    {
      title: "01 — التعريف بالحسابين",
      description:
        "اسم الشركة والحساب وتصنيف المقارنة المستخدم لمطابقة الحسابات المتشابهة.",
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
          label: "تصنيف المقارنة",
          a: comparisonCategory(first),
          b: comparisonCategory(second),
          note:
            "تصنيف داخلي يُستخدم لمطابقة الحسابات، ولا يُعد اسماً تجارياً للحساب.",
        },
      ],
    },
    {
      title: "02 — السبريد وتكاليف التداول",
      description:
        "قارن الرسوم المعلنة مع مراعاة اختلاف الأدوات المالية وطريقة احتساب العمولة.",
      rows: [
        {
          label: "السبريد المعلن",
          a: available(first.account.spread),
          b: available(second.account.spread),
          note:
            "السبريد المعلن ليس بالضرورة متوسط تكلفة التنفيذ الفعلية.",
        },
        {
          label: "بداية السبريد المعلنة",
          a: spreadNumber(
            first,
            first.account.spread_min
          ),
          b: spreadNumber(
            second,
            second.account.spread_min
          ),
          note:
            "القيمة الابتدائية عند توفرها، وليست سبريداً ثابتاً.",
        },
        
...(first.account.spread_avg !== null &&
first.account.spread_avg !== undefined &&
second.account.spread_avg !== null &&
second.account.spread_avg !== undefined
  ? [
      {
        label: "متوسط السبريد المسجل",
        a: spreadNumber(
          first,
          first.account.spread_avg
        ),
        b: spreadNumber(
          second,
          second.account.spread_avg
        ),
        note:
          "متوسطات مسجلة وفق البيانات المتاحة، وقد تختلف الأداة المرجعية وطريقة القياس.",
      },
    ]
  : []),

        {
          label: "عمولة التداول",
          a: available(first.account.commission),
          b: available(second.account.commission),
          note:
            "انتبه إلى ما إذا كانت العمولة لكل اتجاه أو لكل صفقة كاملة.",
        },
      ],
    },
    {
      title: "03 — الإيداع وتنفيذ الأوامر",
      description:
        "متطلبات فتح الحساب ونوع التنفيذ والمنصات المعلنة.",
      rows: [
        {
          label: "الحد الأدنى للإيداع",
          a: available(first.account.min_deposit),
          b: available(second.account.min_deposit),
          note:
            "قد تختلف متطلبات الإيداع حسب المنطقة وطريقة الدفع.",
        },
        {
          label: "نوع تنفيذ الأوامر",
          a: available(first.account.execution_type),
          b: available(second.account.execution_type),
        },
        {
          label: "منصات التداول",
          a: available(first.broker.platforms),
          b: available(second.broker.platforms),
          note:
            "هذه منصات الشركة العامة، وقد لا تتوفر جميعها لكل نوع حساب.",
        },
      ],
    },
    
{
  title: "04 — ملاءمة الحساب وشروطه",
  description:
    "الفئات المستهدفة وشروط توفر الحساب الإسلامي لدى كل وسيط.",
  rows: [
    {
      label: "الفئة الأنسب للحساب",
      a: available(first.account.best_for),
      b: available(second.account.best_for),
      note:
        "تستند الفئة المناسبة إلى تصنيف الحساب، ولا تعني ملاءمته لجميع المتداولين.",
    },
    {
      label: "توفر الحساب الإسلامي",
      a: islamicLabel(first),
      b: islamicLabel(second),
      note:
        "قد يخضع توفر الحساب الإسلامي لشروط الأهلية والدولة والكيان القانوني.",
    },
    {
      label: "شروط الحساب الإسلامي",
      a: available(first.account.islamic_conditions),
      b: available(second.account.islamic_conditions),
      note:
        "يُنصح بالتحقق من الشروط لدى الشركة قبل فتح الحساب.",
    },
  ],
},
{
  title: "05 — التنظيم وخصائص الشركة",
  description:
    "معلومات عامة عن الوسيط وليست ضماناً بانطباق جميع الشروط على الحساب المحدد.",
  rows: [
    {
      label: "التراخيص المذكورة",
      a: available(first.broker.regulation),
      b: available(second.broker.regulation),
      note:
        "هذه تراخيص على مستوى الشركة. تحقق من الكيان القانوني المسؤول عن حسابك في بلد إقامتك.",
    },
    {
      label: "الرافعة المالية العامة",
      a: available(first.broker.max_leverage),
      b: available(second.broker.max_leverage),
      note:
        "القيمة المعروضة على مستوى الشركة، وقد تختلف الرافعة المتاحة بحسب الحساب والدولة والأداة المالية والجهة التنظيمية.",
    },

    // Show regional availability only when at least
    // one broker has an actual documented note.
    ...(str(first.broker.account_availability_note_ar) ||
    str(second.broker.account_availability_note_ar)
      ? [
          {
            label: "توفر الحساب حسب المنطقة",
            a: available(
              first.broker.account_availability_note_ar
            ),
            b: available(
              second.broker.account_availability_note_ar
            ),
            note:
              "معلومات التوفر بحسب البيانات المسجلة، ويجب التحقق منها لدى الشركة قبل التسجيل.",
          },
        ]
      : []),
  ],
},

  ];

  // Replace displayed groups only when V2 is involved.
  // The original groups stay unchanged for V1 comparisons.
  groups.splice(0, groups.length, ...modernGroups);
}

const sameBroker =
  first.broker.id === second.broker.id;


  
/* =========================================================
   COMPARISON FAQ — V1 / V2
   V2: comparison-specific questions only.
   V1: preserve the original FAQ behavior.
   ========================================================= */

const modernComparison =
  first.activeV2 || second.activeV2;

const faqItems: FAQ[] = modernComparison
  ? [
      {
        question:
          `ما الفرق بين ${firstName} و${secondName}؟`,
        answer:
          `يبدأ الاختلاف من شروط كل حساب وتكاليف التداول. ` +
          `السبريد المعلن لحساب ${firstName} هو ` +
          `${shown(first.account.spread)}، ` +
          `مقابل ${shown(second.account.spread)} ` +
          `لحساب ${secondName}. ` +
          `أما العمولة فهي ${shown(first.account.commission)} ` +
          `للحساب الأول و${shown(second.account.commission)} ` +
          `للحساب الثاني. ` +
          `يجب مراعاة طريقة احتساب الرسوم ونوع الأداة المالية ` +
          `قبل اعتبار أي حساب أقل تكلفة.`,
      },
      {
        question:
          `أي الحسابين أقل تكلفة في التداول: ${firstName} أم ${secondName}؟`,
        answer:
          `لا يمكن تحديد الحساب الأقل تكلفة اعتماداً على ` +
          `السبريد الابتدائي وحده. ` +
          `يعرض ${firstName} سبريداً معلناً بقيمة ` +
          `${shown(first.account.spread)} وعمولة ` +
          `${shown(first.account.commission)}، ` +
          `بينما يعرض ${secondName} سبريداً معلناً بقيمة ` +
          `${shown(second.account.spread)} وعمولة ` +
          `${shown(second.account.commission)}. ` +
          `تختلف التكلفة الفعلية باختلاف الأداة وحجم الصفقة ` +
          `وظروف التنفيذ، وقد لا تتوفر متوسطات سبريد ` +
          `موثقة قابلة للمقارنة بين الحسابين.`,
      },
      {
        question:
          `ما الحد الأدنى للإيداع في ${firstName} و${secondName}؟`,
        answer:
          `الحد الأدنى المرجعي للإيداع في ${firstName} ` +
          `هو ${shown(first.account.min_deposit)}، ` +
          `مقابل ${shown(second.account.min_deposit)} ` +
          `في ${secondName}. ` +
          `قد تختلف متطلبات الإيداع الفعلية بحسب ` +
          `المنطقة والكيان القانوني وطريقة الدفع. ` +
          `يُنصح بالتحقق من المتطلبات عند التسجيل.`,
      },
      {
        question:
          `هل تتوفر حسابات إسلامية لدى ${first.broker.name} و${second.broker.name}؟`,
        answer:
          `حالة الحساب الإسلامي المسجلة لحساب ` +
          `${firstName}: ${yesNo(first.account.is_islamic_available)}. ` +
          `أما حالة ${secondName}: ` +
          `${yesNo(second.account.is_islamic_available)}. ` +
          `قد تعتمد الأهلية على دولة الإقامة ` +
          `والكيان القانوني وسياسة الوسيط. ` +
          `ويجب مراجعة الشروط الخاصة بكل حساب قبل التسجيل.`,
      },
      {
        question:
          `كيف أختار بين ${firstName} و${secondName}؟`,
        answer:
          `ابدأ بمقارنة السبريد والعمولة معاً، ` +
          `ثم راجع الحد الأدنى للإيداع ` +
          `وطريقة تنفيذ الأوامر والمنصات المتاحة. ` +
          `التصنيف المسجل لحساب ${firstName} هو ` +
          `${shown(first.account.best_for)}، ` +
          `بينما التصنيف المسجل لحساب ${secondName} هو ` +
          `${shown(second.account.best_for)}. ` +
          `هذه التصنيفات إرشادية، ويجب اختيار الحساب ` +
          `بناءً على استراتيجية التداول والمخاطر والشروط ` +
          `المطبقة على العميل.`,
      },
    ]
  : [
      {
        question:
          `ما الفرق بين ${firstName} و${secondName}؟`,
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

/* Original V1 account-specific FAQs.
   Do not append individual-account FAQs to V2 pages:
   those questions already belong to account review pages.
*/

if (!modernComparison) {
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
  key={item.key}
  className="flex h-full min-w-0 flex-col rounded-[24px] border border-blue-100 bg-[#f8fbff] px-5 py-7 text-center shadow-sm transition-all hover:border-blue-200 hover:shadow-md sm:px-7"
>
  {/* Brand / Logo block */}
  <div className="flex flex-col items-center">
    <div className="flex min-h-[110px] items-center justify-center">
      <div className="flex h-[92px] w-[92px] items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="[&_img]:h-auto [&_img]:max-h-[54px] [&_img]:w-auto [&_img]:max-w-[72px]">
          <Logo broker={item.broker} />
        </div>
      </div>
    </div>

    <h3 className="mt-4 text-[22px] font-black leading-8 text-slate-950">
      {item.broker.name}
    </h3>

    <p className="mt-1 text-[15px] font-bold text-[#1E5BB8]">
      حساب {name(item)}
    </p>

    <div
      aria-hidden="true"
      className="mt-3 h-[3px] w-12 rounded-full bg-blue-500"
    />
  </div>

  {/* Description */}
  <p className="mx-auto mt-5 max-w-[360px] text-[13px] leading-7 text-slate-500">
    اطلع على تفاصيل الحساب وشروط التداول والتقييم الكامل للوسيط.
  </p>

  {/* Buttons */}
  <div className="mt-6 grid w-full max-w-[430px] grid-cols-1 gap-3 self-center sm:grid-cols-2">
    <Link
      href={brokerLink(item)}
      className="flex min-h-[46px] items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-center text-[14px] font-black text-blue-800 transition hover:border-blue-400 hover:bg-blue-50"
    >
      تقييم الشركة
      <span aria-hidden="true" className="mr-2">
        ←
      </span>
    </Link>

    <Link
      href={accountLink(item)}
      className="flex min-h-[46px] items-center justify-center rounded-xl bg-[#1E5BB8] px-4 py-2.5 text-center text-[14px] font-black text-white transition hover:bg-[#184A97]"
    >
      تفاصيل الحساب
      <span aria-hidden="true" className="mr-2">
        ←
      </span>
    </Link>
  </div>
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

      {/* HOW TO CHOOSE — V1 ONLY */}
{!(first.activeV2 || second.activeV2) && (
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
      )}


      
{/* ACCOUNT LINKS */}
<section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
    <SectionTitle
      eyebrow="مزيد من المعلومات"
      title="استكشف الحسابين والشركتين"
      description="انتقل إلى صفحة الحساب الفردية أو تقييم الشركة للحصول على معلومات أكثر تفصيلاً."
    />

    
{first.activeV2 || second.activeV2 ? (
  /* V2 — larger logos and balanced centered cards */
  <div className="grid gap-4 md:grid-cols-2">
    {[first, second].map((item) => {
      const brokerLogo = logoUrl(item.broker.logo);

      return (
        <article
          key={item.key}
          className="flex h-full min-w-0 flex-col items-center rounded-[22px] border border-blue-100 bg-[#f8fbff] px-5 py-6 text-center transition-all duration-200 hover:border-blue-200 hover:shadow-sm sm:px-7"
        >
          {/* Larger actual broker logo */}
          <div className="flex h-[100px] w-full items-center justify-center sm:h-[110px]">
            {brokerLogo ? (
              <img
                src={brokerLogo}
                alt={`شعار ${item.broker.name}`}
                className="block h-[90px] w-[220px] max-w-full object-contain sm:h-[100px] sm:w-[260px]"
              />
            ) : (
              <span className="text-[24px] font-black text-[#1E5BB8]">
                {item.broker.name}
              </span>
            )}
          </div>

          {/* Broker name and account */}
          <h3 className="mt-2 text-[21px] font-black leading-8 text-slate-950 sm:text-[23px]">
            {item.broker.name}
          </h3>

          <p className="mt-1 text-[15px] font-bold leading-7 text-[#1E5BB8]">
            حساب {name(item)}
          </p>

          <span
            aria-hidden="true"
            className="mt-3 h-[3px] w-12 rounded-full bg-blue-500"
          />

          {/* Short description */}
          <p className="mx-auto mt-4 max-w-[380px] text-[13px] leading-7 text-slate-600">
            اطلع على تفاصيل الحساب وشروط التداول
            والتقييم الكامل للوسيط.
          </p>

          {/* Account and broker links */}
          <div className="mt-auto grid w-full max-w-[440px] grid-cols-1 gap-3 pt-5 sm:grid-cols-2">
            <Link
              href={accountLink(item)}
              className="flex min-h-[46px] items-center justify-center rounded-xl bg-[#1E5BB8] px-4 py-2.5 text-center text-[13px] font-black text-white transition hover:bg-[#184A97]"
            >
              تفاصيل الحساب
              <span aria-hidden="true" className="mr-2">
                ←
              </span>
            </Link>

            <Link
              href={brokerLink(item)}
              className="flex min-h-[46px] items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-center text-[13px] font-black text-blue-800 transition hover:border-blue-400 hover:bg-blue-50"
            >
              تقييم الشركة
              <span aria-hidden="true" className="mr-2">
                ←
              </span>
            </Link>
          </div>
        </article>
      );
    })}
  </div>

    ) : (
      /* V1 — preserve original cards */
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
    )}
  </div>
</section>


      
{/* FAQ */}
<section className="mx-auto max-w-[1520px] px-3 pb-8 sm:px-6 lg:px-8">
  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
    <SectionTitle
      eyebrow="الأسئلة الشائعة"
      title={`أسئلة حول ${firstName} و${secondName}`}
    />

    {modernComparison ? (
      /* V2 — five questions in one column */
      <div className="mx-auto flex max-w-[1150px] flex-col gap-3">
        {faqItems.slice(0, 5).map((faq, index) => (
          <details
            key={`v2-faq-${index}`}
            className="group overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8fbff] transition-colors open:border-blue-200 open:bg-white"
          >
            <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-right text-[14px] font-extrabold leading-7 text-slate-950 marker:hidden sm:px-6 sm:text-[16px] [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1">
                {faq.question}
              </span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-[20px] font-bold text-[#1E5BB8] transition-colors group-open:border-blue-200 group-open:bg-blue-50">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>

            <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6">
              <p className="text-[14px] leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    ) : (
      /* V1 — preserve the original two-column FAQ layout */
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        {[0, 1].map((column) => (
          <div
            key={column}
            className="flex min-w-0 flex-col gap-3"
          >
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
    )}
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
