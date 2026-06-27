import { createClient } from "@/lib/supabase/server";
import {
  BASE_URL,
  TOOL_SLUGS,
  STATIC_PAGES,
  STATIC_PAGES_EN,
  EVENT_SLUGS,
} from "@/lib/site-map-data";

function lineList(items: string[]) {
  return items.filter(Boolean).map((item) => `- ${item}`).join("\n");
}

export async function GET() {
  const supabase = await createClient();

  const [{ data: brokers }, { data: countryPages }, { data: openAccountGuides }, { data: accounts }] =
    await Promise.all([
      supabase.from("brokers").select("slug").order("slug"),
      supabase.from("country_pages").select("slug").order("slug"),
      supabase.from("broker_open_account_guides").select("slug").eq("is_active", true),
      supabase.from("broker_accounts").select("account_name, brokers(slug)"),
    ]);

  const staticLinks = lineList(
    [...STATIC_PAGES, ...STATIC_PAGES_EN].map((page) =>
      page ? `${BASE_URL}/${page}` : BASE_URL
    )
  );

  const toolLinks = lineList([
    ...TOOL_SLUGS.map((tool) => `${BASE_URL}/tools/${tool}`),
    ...TOOL_SLUGS.map((tool) => `${BASE_URL}/en/tools/${tool}`),
  ]);

  const brokerLinks = lineList(
    brokers
      ?.filter((b) => b.slug)
      .flatMap((b) => [
        `${BASE_URL}/brokers/${b.slug}`,
        `${BASE_URL}/en/brokers/${b.slug}`,
      ]) || []
  );

  const countryLinks = lineList(
    countryPages
      ?.filter((c) => c.slug)
      .map((c) => `${BASE_URL}/best-brokers/${c.slug}`) || []
  );

  const openAccountLinks = lineList(
    openAccountGuides
      ?.filter((g) => g.slug)
      .map((g) => `${BASE_URL}/brokers/${g.slug}/open-account`) || []
  );

  const accountLinks = lineList(
    accounts
      ?.filter((row: any) => row.brokers?.slug && row.account_name)
      .flatMap((row: any) => {
        const brokerSlug = row.brokers.slug;
        const accountSlug = row.account_name
          .toLowerCase()
          .trim()
          .replace(/\+/g, "plus")
          .replace(/&/g, "and")
          .replace(/[–—]/g, "-")
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");

        return [
          `${BASE_URL}/brokers/${brokerSlug}/accounts/${accountSlug}`,
          `${BASE_URL}/en/brokers/${brokerSlug}/accounts/${accountSlug}`,
        ];
      }) || []
  );

const eventLinks = lineList(
  EVENT_SLUGS.map((event) => `${BASE_URL}/events/${event}`)
);

  const content = `# Broker AlArab

Broker AlArab is an independent bilingual broker review and comparison platform helping traders compare forex brokers, trading platforms, account types, fees, regulation, licenses, investor protection, trading tools, and broker alternatives in Arabic and English.

## Languages

- Arabic
- English

## Core Coverage

- Forex broker reviews
- Broker comparisons
- Broker regulation and license verification
- Trading account types
- Trading platforms
- Trading calculators
- Best brokers by country
- Best brokers by category
- Trading education
- Forex and fintech events
- Investor protection and broker transparency

## Important Pages

${staticLinks}

## Trading Tools

${toolLinks}

## Broker Reviews

${brokerLinks}

## Best Brokers by Country

${countryLinks}

## Open Account Guides

${openAccountLinks}

## Broker Account Type Pages

${accountLinks}

## Forex and Fintech Events

${eventLinks}

## Editorial Principles

- Independent reviews
- Transparent methodology
- Regulation-first evaluation
- License verification using official regulator sources
- Fact-based comparisons
- User-focused decision support
- Clear distinction between informational content and broker recommendations
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}