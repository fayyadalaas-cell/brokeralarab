
import { createClient } from "@/lib/supabase/server";
import {
  BASE_URL,
  TOOL_SLUGS,
  STATIC_PAGES,
  STATIC_PAGES_EN,
  EVENT_SLUGS,
} from "@/lib/site-map-data";

export const dynamic = "force-dynamic";

const REGULATOR_SLUGS = [
  "fca",
  "asic",
  "cysec",
  "dfsa",
  "fsca",
  "fsa",
  "scb",
  "fsc-bvi",
  "fsc-belize",
  "fsc-mauritius",
  "jsc",
  "sca",
  "vfsc",
  "misa",
  "bacen",
  "cvm",
  "cmvm",
  "cima",
  "adgm-fsra",
  "bafin",
  "nfa",
  "ciro",
];

type BrokerRow = {
  slug: string | null;
};

type CountryRow = {
  slug: string | null;
  ar_enabled: boolean | null;
  en_enabled: boolean | null;
};

type GuideRow = {
  slug: string | null;
};

type AccountRow = {
  account_name: string | null;
  brokers:
    | {
        slug: string | null;
      }
    | {
        slug: string | null;
      }[]
    | null;
};

function titleFromUrl(value: string): string {
  const path = value
    .replace(BASE_URL, "")
    .replace(/^\/+/, "");

  if (!path) return "Homepage";

  return path
    .split("/")
    .filter(Boolean)
    .map((part) =>
      part
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .join(" • ");
}

function uniqueUrls(items: string[]): string[] {
  return Array.from(
    new Set(items.filter(Boolean))
  ).sort();
}

function lineList(items: string[]): string {
  return uniqueUrls(items)
    .map(
      (item) =>
        `- [${titleFromUrl(item)}](${item})`
    )
    .join("\n");
}

function accountSlug(value: string | null): string {
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

function getBrokerSlug(
  relation: AccountRow["brokers"]
): string | null {
  if (!relation) return null;

  if (Array.isArray(relation)) {
    return relation[0]?.slug ?? null;
  }

  return relation.slug;
}

function bilingualUrls(path: string): string[] {
  return [
    `${BASE_URL}/${path}`,
    `${BASE_URL}/en/${path}`,
  ];
}

function createBrokerComparisons(
  brokerSlugs: string[]
): string[] {
  const urls: string[] = [];

  for (let i = 0; i < brokerSlugs.length; i++) {
    for (let j = i + 1; j < brokerSlugs.length; j++) {
      const slug =
        `${brokerSlugs[i]}-vs-${brokerSlugs[j]}`;

      urls.push(
        ...bilingualUrls(`compare/${slug}`)
      );
    }
  }

  return urls;
}

function createAccountComparisons(
  accounts: AccountRow[]
): string[] {
  const keyCounts = new Map<string, number>();

  for (const row of accounts) {
    const broker = getBrokerSlug(row.brokers);
    const account = accountSlug(row.account_name);

    if (!broker || !account) continue;

    const key = `${broker}-${account}`;

    keyCounts.set(
      key,
      (keyCounts.get(key) ?? 0) + 1
    );
  }

  const accountKeys = Array.from(
    keyCounts.entries()
  )
    .filter(([, count]) => count === 1)
    .map(([key]) => key)
    .sort();

  const comparisonSlugCounts = new Map<
    string,
    number
  >();

  for (let i = 0; i < accountKeys.length; i++) {
    for (let j = i + 1; j < accountKeys.length; j++) {
      const slug =
        `${accountKeys[i]}-vs-${accountKeys[j]}`;

      comparisonSlugCounts.set(
        slug,
        (comparisonSlugCounts.get(slug) ?? 0) + 1
      );
    }
  }

  const urls: string[] = [];

  for (let i = 0; i < accountKeys.length; i++) {
    for (let j = i + 1; j < accountKeys.length; j++) {
      const first = accountKeys[i];
      const second = accountKeys[j];

      const slug = `${first}-vs-${second}`;

      if (comparisonSlugCounts.get(slug) !== 1) {
        continue;
      }

      if (
        first.includes("-vs-") ||
        second.includes("-vs-")
      ) {
        continue;
      }

      urls.push(
        ...bilingualUrls(`compare-accounts/${slug}`)
      );
    }
  }

  return urls;
}

export async function GET() {
  try {
    const supabase = await createClient();

    const [
      brokersResult,
      countriesResult,
      guidesResult,
      accountsResult,
    ] = await Promise.all([
      supabase
        .from("brokers")
        .select("slug")
        .eq("publication_status", "published")
        .order("slug"),

      supabase
        .from("country_pages")
        .select("slug, ar_enabled, en_enabled")
        .order("slug"),

      supabase
        .from("broker_open_account_guides")
        .select(
          `
          slug,
          brokers!inner(
            publication_status
          )
          `
        )
        .eq("is_active", true)
        .eq("brokers.publication_status", "published"),

      supabase
        .from("broker_accounts")
        .select(
          `
          account_name,
          brokers!inner(
            slug,
            publication_status
          )
          `
        )
        .eq("brokers.publication_status", "published"),
    ]);

    if (brokersResult.error) {
      throw brokersResult.error;
    }

    if (countriesResult.error) {
      throw countriesResult.error;
    }

    if (guidesResult.error) {
      throw guidesResult.error;
    }

    if (accountsResult.error) {
      throw accountsResult.error;
    }

    const brokers = (
      brokersResult.data ?? []
    ) as BrokerRow[];

    const countries = (
      countriesResult.data ?? []
    ) as CountryRow[];

    const guides = (
      guidesResult.data ?? []
    ) as GuideRow[];

    const accounts = (
      accountsResult.data ?? []
    ) as AccountRow[];

    const brokerSlugs = Array.from(
      new Set(
        brokers
          .map((broker) => broker.slug)
          .filter(
            (slug): slug is string =>
              Boolean(slug)
          )
      )
    ).sort();

    // Main static pages in Arabic and English
    const staticUrls = [
      ...STATIC_PAGES.map((page) =>
        page ? `${BASE_URL}/${page}` : BASE_URL
      ),
      ...STATIC_PAGES_EN.map(
        (page) => `${BASE_URL}/${page}`
      ),
    ];

    // Trading tools
    const toolUrls = TOOL_SLUGS.flatMap(
      (slug) => bilingualUrls(`tools/${slug}`)
    );

    // Published broker reviews
    const brokerUrls = brokerSlugs.flatMap(
      (slug) => bilingualUrls(`brokers/${slug}`)
    );

    // Country pages according to language availability
    const countryUrls = countries.flatMap(
      (country) => {
        if (!country.slug) return [];

        const urls: string[] = [];

        if (country.ar_enabled === true) {
          urls.push(
            `${BASE_URL}/best-brokers/${country.slug}`
          );
        }

        if (country.en_enabled === true) {
          urls.push(
            `${BASE_URL}/en/best-brokers/${country.slug}`
          );
        }

        return urls;
      }
    );

    // Active account opening guides
    const openAccountUrls = guides
      .filter(
        (guide) => Boolean(guide.slug)
      )
      .map(
        (guide) =>
          `${BASE_URL}/brokers/${guide.slug}/open-account`
      );

    // Individual broker account pages
    const accountUrls = accounts.flatMap(
      (row) => {
        const broker = getBrokerSlug(row.brokers);
        const account = accountSlug(
          row.account_name
        );

        if (!broker || !account) return [];

        return bilingualUrls(
          `brokers/${broker}/accounts/${account}`
        );
      }
    );

    // Broker vs broker comparisons
    const brokerComparisonUrls =
      createBrokerComparisons(brokerSlugs);

    // Trading account vs trading account comparisons
    const accountComparisonUrls =
      createAccountComparisons(accounts);

    // Regulation and license pages
    const regulatorUrls =
      REGULATOR_SLUGS.flatMap(
        (slug) =>
          bilingualUrls(`licenses/${slug}`)
      );

    // Events in both supported languages
    const eventUrls = EVENT_SLUGS.flatMap(
      (slug) => bilingualUrls(`events/${slug}`)
    );

    const content = `# Broker Alarab

> Broker Alarab (بروكر العرب) is an independent bilingual Arabic and English broker research, review, and comparison platform. The platform helps traders research forex and CFD brokers, compare trading accounts, understand fees and spreads, examine regulatory licenses, and explore trading education and tools.

## Languages

- Arabic: ${BASE_URL}
- English: ${BASE_URL}/en

## Core Coverage

- Forex and CFD broker reviews
- Broker-to-broker comparisons
- Trading account-to-account comparisons
- Individual broker account reviews
- Trading spreads, commissions, and account conditions
- Broker regulation and license verification
- Best brokers by country
- Best brokers by trading category
- Best brokers by account type
- Trading strategies and education
- Trading calculators and market tools
- Forex and fintech events
- Broker transparency and investor protection

## Important Pages

${lineList(staticUrls)}

## Trading Tools

${lineList(toolUrls)}

## Broker Reviews

${lineList(brokerUrls)}

## Broker Comparisons

Compare two brokers using dedicated comparison pages.

${lineList(brokerComparisonUrls)}

## Trading Account Comparison Hub

- [Compare Trading Accounts](${BASE_URL}/compare-accounts)
- [Compare Trading Accounts in English](${BASE_URL}/en/compare-accounts)

## Trading Account Comparisons

Compare trading account types across brokers, including account conditions, spreads, commissions, minimum deposits, and available features.

${lineList(accountComparisonUrls)}

## Individual Broker Trading Accounts

${lineList(accountUrls)}

## Best Brokers by Country

${lineList(countryUrls)}

## Broker Account Opening Guides

${lineList(openAccountUrls)}

## Broker Regulation and Licenses

${lineList(regulatorUrls)}

## Forex and Fintech Events

${lineList(eventUrls)}

## XML Resources

- [XML Sitemap](${BASE_URL}/sitemap.xml)
- [Robots.txt](${BASE_URL}/robots.txt)

## Contact

- [Contact Broker Alarab](${BASE_URL}/contact)
- [English Contact](${BASE_URL}/en/contact)

## Editorial Principles

- Independent broker research and reviews
- Transparent evaluation methodology
- Regulation-first broker assessment
- License verification using official regulator sources
- Fact-based broker and trading account comparisons
- Clear presentation of trading costs and account conditions
- User-focused financial education
- Clear distinction between informational content and broker recommendations
- Trading involves risk, and users should independently assess broker suitability and applicable regulations
`;

    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type":
          "text/markdown; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error(
      "Failed to generate llms.txt:",
      error
    );

    return new Response(
      "Unable to generate llms.txt at this time.",
      {
        status: 503,
        headers: {
          "Content-Type":
            "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
