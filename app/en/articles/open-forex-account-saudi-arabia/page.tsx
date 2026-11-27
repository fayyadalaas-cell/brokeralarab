import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

import {
  ArticleSection,
  SubHeading,
  Paragraph,
  Strong,
  ArticleList,
  Note,
  FAQItem,
} from "@/app/components/editorial/ArticleComponents";

import ArticleLayout from "@/app/components/editorial/ArticleLayout";

import {
  createArticleMetadata,
  ArticleStructuredData,
  type ArticleSEOConfig,
} from "@/app/components/editorial/ArticleSEO";

export const dynamic = "force-dynamic";

/* =========================================================
   BROKER ALARAB
   ENGLISH ARTICLE — OPEN FOREX ACCOUNT IN SAUDI ARABIA
========================================================= */

const SLUG = "open-forex-account-saudi-arabia";

const ARTICLE = {

  title:
    "How to Open a Forex Account in Saudi Arabia – Requirements and Registration Steps",

  seoTitle:
    "Open a Forex Account in Saudi Arabia | Requirements",

  titleMain:
    "How to Open a Forex Account in Saudi Arabia",

  titleHighlight:
    "Requirements and Registration Steps",

  description:
    "Learn how to open a forex trading account in Saudi Arabia, including requirements for citizens and expats, Iqama verification, registration and deposits.",

  category: "Forex Trading Guides by Country",

  subcategory: "Trading in Saudi Arabia",

  articleType: "Account Opening Guide",

  breadcrumb: "Open a Forex Account in Saudi Arabia",

  publisher: "Broker Alarab",

  published: "2026-11-24",

  modified: "2026-11-25",

  heroAlt:
    "Forex trading account opening in Saudi Arabia, featuring identity verification, registration documents and trading platforms in Riyadh",

  heroCaption:
    "Illustration of forex trading account registration and identity verification for Saudi citizens and expatriates residing in Saudi Arabia.",

};

const HERO_IMAGE =
  "/articles/open-forex-account-saudi-arabia.webp";

const SAUDI_BROKERS_URL =
  "/en/best-brokers/saudi-arabia";

const ARTICLE_KEYWORDS = [
  "Open Forex Account in Saudi Arabia",
  "Forex Trading Account Saudi Arabia",
  "How to Open a Forex Trading Account",
  "Forex Account Opening Requirements",
  "Forex Trading for Expats in Saudi Arabia",
  "Forex Account for Saudi Residents",
  "Open Forex Account with Iqama",
  "Forex Account Verification",
  "Saudi National ID Forex Account",
  "Forex Trading Account Registration",
  "Islamic Forex Account Saudi Arabia",
  "Forex Minimum Deposit Saudi Arabia",
  "Forex Deposits and Withdrawals Saudi Arabia",
  "Forex Broker Regulation Saudi Arabia",
];

/* =========================================================
   SEO METADATA
========================================================= */

const ARTICLE_SEO: ArticleSEOConfig = {

  language: "en",

  slug: SLUG,

  title: ARTICLE.title,

  seoTitle: ARTICLE.seoTitle,

  description: ARTICLE.description,

  category: ARTICLE.subcategory,

  categoryName: ARTICLE.category,

  categoryHref:
    "/en/articles/category/forex-trading-guides-by-country",

  author: ARTICLE.publisher,

  published: ARTICLE.published,

  modified: ARTICLE.modified,

  image: HERO_IMAGE,

  imageAlt: ARTICLE.heroAlt,

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  indexable: true,

  tags: ARTICLE_KEYWORDS,

  keywords: ARTICLE_KEYWORDS,

  about: [
    {
      "@type": "Thing",
      name: "Foreign Exchange Trading",
    },
    {
      "@type": "Thing",
      name: "Forex Trading Accounts",
    },
    {
      "@type": "Thing",
      name: "Know Your Customer",
    },
    {
      "@type": "Thing",
      name: "Financial Regulation",
    },
  ],

};

const baseMetadata =
  createArticleMetadata(ARTICLE_SEO);

export const metadata = {

  ...baseMetadata,

  openGraph: {
    ...baseMetadata.openGraph,
    locale: "en_US",
    alternateLocale: ["ar_SA"],
  },

};

/* =========================================================
   ARTICLE DATA
   ========================================================= */

const contents = [
  {
    id: "quick-answer",
    label: "Account Opening Overview",
  },
  {
    id: "legal-status",
    label: "Legal Status and Regulation",
  },
  {
    id: "requirements",
    label: "Forex Account Requirements",
  },
  {
    id: "documents",
    label: "Required Documents",
  },
  {
    id: "saudi-citizens",
    label: "Accounts for Saudi Citizens",
  },
  {
    id: "saudi-residents",
    label: "Accounts for Expats and Residents",
  },
  {
    id: "account-types",
    label: "Forex Account Types",
  },
  {
    id: "registration-steps",
    label: "Account Opening Steps",
  },
  {
    id: "verification",
    label: "Account Verification",
  },
  {
    id: "verification-rejection",
    label: "Verification Rejection Reasons",
  },
  {
    id: "saudi-top-five",
    label: "Forex Broker Comparison",
  },
  {
    id: "minimum-deposit",
    label: "Minimum Deposit Requirements",
  },
  {
    id: "payments",
    label: "Deposits and Withdrawals",
  },
  {
    id: "islamic-account",
    label: "Islamic Trading Accounts",
  },
  {
    id: "trading-costs",
    label: "Trading Fees and Costs",
  },
  {
    id: "security",
    label: "Account and Fund Protection",
  },
  {
    id: "faq",
    label: "Frequently Asked Questions",
  },
  {
    id: "conclusion",
    label: "Conclusion",
  },
  {
    id: "sources",
    label: "Sources and References",
  },
];

const registrationSteps = [
  {
    title: "Verify the Broker's Authorization",
    description:
      "Check the broker's legal entity, regulatory licenses and authorization to provide the relevant financial services in Saudi Arabia.",
  },
  {
    title: "Review Account Conditions",
    description:
      "Review the client agreement, trading costs, deposit and withdrawal policies, and the legal entity responsible for your trading account.",
  },
  {
    title: "Complete Your Registration",
    description:
      "Provide your legal name, actual country of residence, email address and telephone number using accurate personal information.",
  },
  {
    title: "Complete Identity Verification",
    description:
      "Submit accepted identity and address documents when required, and complete any applicable suitability and source-of-funds assessments.",
  },
  {
    title: "Choose an Account and Platform",
    description:
      "Compare account types, base currencies, leverage conditions and execution costs before selecting a forex trading account.",
  },
  {
    title: "Review Payment Methods",
    description:
      "Once the account is approved and the provider's authorization has been verified, review permitted payment methods, funding conditions and withdrawal policies.",
  },
];

const requiredDocuments = [
  {
    title: "Proof of Identity",
    detail:
      "A valid Saudi National ID, passport or Iqama residence permit, depending on the financial institution's verification policy.",
  },
  {
    title: "Proof of Address",
    detail:
      "An accepted official document showing your full legal name and actual residential address.",
  },
  {
    title: "Email Address",
    detail:
      "A personal email address that you can access and verify during the account opening process.",
  },
  {
    title: "Mobile Phone Number",
    detail:
      "An active telephone number capable of receiving verification codes when required.",
  },
  {
    title: "Financial Information",
    detail:
      "Employment, income, trading experience and source-of-funds information, depending on compliance requirements.",
  },
  {
    title: "Payment Method",
    detail:
      "An accepted payment method registered in the account holder's name when conducting financial transactions.",
  },
];

const accountTypes = [
  {
    name: "Standard Account",
    nameEn: "Spread-Based Trading",
    abbreviation: "STD",

    description:
      "A live forex trading account where trading costs are commonly based on bid-ask spreads. Some brokers offer standard accounts without separate trading commissions.",

    consideration:
      "Compare average spreads, minimum deposit requirements, commissions and order execution conditions.",

    href:
      "/en/best-brokers/accounts/standard",

    linkLabel:
      "Best Standard Account Brokers",
  },
  {
    name: "Cent Account",
    nameEn: "Cent-Based Trading",

    abbreviation: "CENT",

    description:
      "A live trading account that typically displays balances in cents and may support smaller contract sizes, depending on the broker's account specifications.",

    consideration:
      "Check the actual contract size, available financial instruments and minimum permitted trade volume.",

    href:
      "/en/best-brokers/accounts/cent",

    linkLabel:
      "Best Cent Account Brokers",
  },
  {
    name: "Raw Spread Account",
    nameEn: "Raw Pricing + Commission",

    abbreviation: "RAW",

    description:
      "A forex trading account that typically offers lower spreads, potentially starting from zero pips on selected instruments, alongside separate trading commissions.",

    consideration:
      "Compare the total cost of spreads and commissions when opening and closing trading positions.",

    href:
      "/en/best-brokers/accounts/raw-spread",

    linkLabel:
      "Best Raw Spread Account Brokers",
  },
  {
    name: "ECN Account",
    nameEn: "Electronic Communication Network",

    abbreviation: "ECN",

    description:
      "An account commonly associated with an electronic execution model connecting orders to a network of market participants or liquidity providers, depending on the broker's actual execution arrangements.",

    consideration:
      "Review execution policies, liquidity arrangements and commissions. The ECN label alone does not establish how orders are executed.",

    href: null,
    linkLabel: null,
  },
];

const sources = [
  {
    title:
      "Saudi Capital Market Authority (CMA) — Authorized Capital Market Institutions",

    url:
      "https://cma.org.sa/Market/AuthorisedPersons/Pages/default.aspx",
  },
  {
    title:
      "Saudi Central Bank (SAMA) — Unlicensed Financial Activities",

    url:
      "https://www.sama.gov.sa/en-US/Supervision/Pages/unlicensed_activities.aspx",
  },
  {
    title:
      "Saudi Central Bank — Standing Committee Warning Against Unlicensed Forex Companies",

    url:
      "https://sama.gov.sa/en-US/MediaCenter/News/Pages/news-590.aspx",
  },
  {
    title:
      "Standing Committee — Public Warning Against Fraudulent Methods Used by Unlicensed Forex Companies",

    url:
      "https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-624.aspx",
  },
  {
    title:
      "Saudi Authorities — Regulatory Authorization and Warnings Against Unlicensed Forex Activities",

    url:
      "https://sama.gov.sa/ar-sa/MediaCenter/News/Pages/news029042018.aspx",
  },
  {
    title:
      "Exness Help Center — Identity and Address Verification Document Requirements",

    url:
      "https://get.exness.help/hc/en-us/articles/17537772392732-Verification-document-requirements",
  },
];



/* =========================================================
   ARTICLE DATA TABLE
   Responsive two-column layout
   Centered headers and content
   ========================================================= */

function ArticleDataTable({
  headers,
  rows,
  caption,
}: {
  headers: [string, string];
  rows: [string, string][];
  caption?: string;
}) {
  return (
    <figure className="!my-6 w-full min-w-0">

      <div className="overflow-hidden rounded-[16px] border border-slate-200 shadow-sm">

        <table className="w-full table-fixed !text-center">

          <colgroup>
            <col className="w-[35%] sm:w-[32%]" />
            <col className="w-[65%] sm:w-[68%]" />
          </colgroup>

          <thead className="bg-[#092443] text-white">

            <tr>

              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  style={{ textAlign: "center" }}
                  className="!px-2.5 !py-3.5 !text-center !align-middle text-[11px] font-black leading-5 sm:!px-5 sm:!py-4 sm:text-[13px]"
                >
                  {header}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (
              <tr
                key={index}
                className={`border-t border-slate-200 ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f7f9fc]"
                }`}
              >

                <th
                  scope="row"
                  style={{ textAlign: "center" }}
                  className="break-words border-r border-slate-200 !px-2.5 !py-3.5 !text-center !align-middle text-[11px] font-black leading-[1.9] text-[#102747] [overflow-wrap:anywhere] sm:!px-5 sm:!py-4 sm:text-[14px]"
                >

                  <div className="w-full !text-center">
                    {row[0]}
                  </div>

                </th>

                <td
                  style={{ textAlign: "center" }}
                  className="break-words !px-2.5 !py-3.5 !text-center !align-middle text-[11px] font-medium leading-[1.95] text-slate-700 [overflow-wrap:anywhere] sm:!px-5 sm:!py-4 sm:text-[14px]"
                >

                  <div className="w-full !text-center">
                    {row[1]}
                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {caption && (
        <figcaption className="mt-3 !text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
          {caption}
        </figcaption>
      )}

    </figure>
  );
}

/* =========================================================
   FOREX ACCOUNT REGISTRATION STEPS
   ========================================================= */

function RegistrationSteps() {
  return (
    <div className="!my-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">

      {registrationSteps.map((step, index) => (
        <div
          key={step.title}
          className="relative min-w-0 overflow-hidden rounded-[17px] border border-[#dce6f2] bg-[#f8fbff] p-4 shadow-sm sm:p-5"
        >

          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176ac8] via-[#38bdf8] to-transparent" />

          <div className="mb-3 flex items-center gap-3">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#176ac8] text-[15px] font-black text-white">

              {String(index + 1).padStart(2, "0")}

            </span>

            <h3 className="text-[14px] font-black leading-6 text-[#102747] sm:text-[16px]">
              {step.title}
            </h3>

          </div>

          <p className="text-[12px] leading-[1.95] text-slate-600 sm:text-[14px]">
            {step.description}
          </p>

        </div>
      ))}

    </div>
  );
}

/* =========================================================
   REQUIRED ACCOUNT OPENING DOCUMENTS
   ========================================================= */

function RequiredDocuments() {
  return (
    <div className="!my-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">

      {requiredDocuments.map((item, index) => (
        <div
          key={item.title}
          className="flex min-w-0 flex-col rounded-[16px] border border-slate-200 bg-[#f8fbff] p-4 shadow-sm sm:p-5"
        >

          <div className="mb-4 flex items-center justify-between gap-3">

            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3ff] text-[#176ac8] sm:h-11 sm:w-11">

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="3"
                  width="16"
                  height="18"
                  rx="2"
                />

                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="m8 16 2 2 5-5" />

              </svg>

            </span>

            <span className="inline-flex min-w-[42px] items-center justify-center rounded-full bg-[#176ac8] px-2.5 py-1 text-[10px] font-black text-white">

              {String(index + 1).padStart(2, "0")}

            </span>

          </div>

          <h3 className="text-[14px] font-black leading-7 text-[#102747] sm:text-[16px]">
            {item.title}
          </h3>

          <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">
            {item.detail}
          </p>

        </div>
      ))}

    </div>
  );
}

/* =========================================================
   FOREX ACCOUNT TYPES GRID
   Standard / Cent / Raw Spread / ECN
   ========================================================= */

function AccountTypesGrid() {
  return (
    <div className="!my-7 grid grid-cols-1 auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4">

      {accountTypes.map((account) => (
        <div
          key={account.nameEn}
          className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[17px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-md sm:p-5"
        >

          {/* TOP ACCENT */}

          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176ac8] via-[#38bdf8] to-transparent" />

          {/* ACCOUNT HEADER */}

          <div className="flex min-w-0 items-center gap-3">

            <div
              dir="ltr"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-blue-100 bg-[#eaf3ff] text-[11px] font-black text-[#176ac8] sm:h-[58px] sm:w-[58px] sm:text-[13px]"
            >

              {account.abbreviation}

            </div>

            <div className="min-w-0 flex-1">

              <h3 className="text-[15px] font-black leading-7 text-[#102747] sm:text-[18px]">
                {account.name}
              </h3>

              <p
                dir="ltr"
                className="mt-0.5 text-left text-[10px] font-bold text-[#176ac8] sm:text-[12px]"
              >
                {account.nameEn}
              </p>

            </div>

          </div>

          {/* ACCOUNT DESCRIPTION */}

          <p className="mt-4 flex-1 text-[13px] leading-[1.95] text-slate-600 sm:text-[14px]">
            {account.description}
          </p>

          {/* IMPORTANT CONSIDERATION */}

          <div className="mt-4 rounded-[11px] border border-blue-100 bg-[#f1f7fe] p-3 sm:p-4">

            <div className="flex items-center gap-2">

              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#176ac8] text-[10px] font-black text-white">
                ✓
              </span>

              <p className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
                What to Check
              </p>

            </div>

            <p className="mt-2 text-[11px] leading-6 text-slate-600 sm:text-[13px] sm:leading-7">
              {account.consideration}
            </p>

          </div>

          {/* INTERNAL LINK */}

          {account.href && account.linkLabel ? (
            <Link
              href={account.href}
              className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[11px] border border-[#bdd8f5] bg-[#eaf3ff] px-3 py-3 text-center text-[11px] font-black text-[#176ac8] transition hover:border-[#176ac8] hover:bg-[#176ac8] hover:text-white sm:text-[13px]"
            >

              {account.linkLabel}

              <span aria-hidden="true">
                →
              </span>

            </Link>
          ) : (
            <div
              className="mt-4 min-h-[44px]"
              aria-hidden="true"
            />
          )}

        </div>
      ))}

    </div>
  );
}

/* =========================================================
   FAQ COMPONENT
   ========================================================= */


   /* =========================================================
   SAUDI BROKERS — DATABASE TYPES
   ========================================================= */

type SaudiArticleBroker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  is_full_review: boolean | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  real_account_url: string | null;
};

type SaudiArticleRanking = {
  id: number;
  rank_position: number;
  country_rating: number | null;
  brokers:
    | SaudiArticleBroker
    | SaudiArticleBroker[]
    | null;
};

function normalizeSaudiBroker(
  value:
    | SaudiArticleBroker
    | SaudiArticleBroker[]
    | null
): SaudiArticleBroker | null {
  if (!value) return null;

  return Array.isArray(value)
    ? value[0] ?? null
    : value;
}

/* =========================================================
   GET SAUDI BROKERS
   Same ranking source as Saudi Arabia country page
   ========================================================= */

async function getSaudiArticleBrokers(): Promise<
  SaudiArticleRanking[]
> {
  const supabase = await createClient();

  const { data: country, error: countryError } =
    await supabase
      .from("country_pages")
      .select("id")
      .eq("slug", "saudi-arabia")
      .eq("ar_enabled", true)
      .maybeSingle();

  if (countryError || !country) {
    console.error(
      "Saudi article country:",
      countryError?.message
    );

    return [];
  }

  const { data, error } = await supabase
    .from("country_broker_rankings")
    .select(`
      id,
      rank_position,
      country_rating,
      brokers (
        id,
        name,
        slug,
        logo,
        rating,
        is_full_review,
        min_deposit,
        platforms,
        regulation,
        regulation_short,
        real_account_url
      )
    `)
    .eq("country_id", country.id)
    .order("rank_position", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Saudi article broker rankings:",
      error.message
    );

    return [];
  }

  const rankings =
    (data || []) as SaudiArticleRanking[];

  return rankings
    .filter((row) => {
      const broker =
        normalizeSaudiBroker(row.brokers);

      return (
        broker?.is_full_review === true &&
        Boolean(broker.slug)
      );
    })
    .slice(0, 5);
}

/* =========================================================
   SAUDI ARTICLE BROKER CARD
   ========================================================= */

function SaudiArticleBrokerCard({
  row,
}: {
  row: SaudiArticleRanking;
}) {
  const broker =
    normalizeSaudiBroker(row.brokers);

  if (!broker || !broker.slug) {
    return null;
  }

  const rating =
    row.country_rating ?? broker.rating;

  const ratingText =
    rating !== null &&
    Number.isFinite(Number(rating))
      ? Number(rating).toFixed(2)
      : "—";

  const deposit =
    broker.min_deposit !== null
      ? `$${broker.min_deposit}`
      : "Not specified";

  const platforms =
    broker.platforms
      ?.split("|")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 2)
      .join(" • ") || "Not specified";

  const reviewUrl =
    `/en/brokers/${broker.slug}`;

  return (
    <div
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-md sm:p-5"
    >

      {/* TOP ACCENT */}

      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176ac8] via-[#38bdf8] to-transparent" />

      {/* BROKER LOGO AND NAME */}

      <div className="flex min-w-0 items-center gap-3">

        <Link
          href={reviewUrl}
          className="relative flex h-[57px] w-[85px] shrink-0 items-center justify-center rounded-[11px] border border-slate-200 bg-white p-2 sm:h-[65px] sm:w-[100px]"
        >

          {broker.logo ? (
            <Image
              src={broker.logo}
              alt={`${broker.name || "Forex broker"} logo`}
              fill
              sizes="100px"
              className="object-contain p-2"
            />
          ) : (
            <span className="text-[13px] font-black text-[#176ac8]">
              {(broker.name || "BA")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          )}

        </Link>

        <div className="min-w-0 flex-1">

          <Link
            href={reviewUrl}
            className="block break-words text-[17px] font-black leading-6 text-[#102747] transition hover:text-[#176ac8] sm:text-[20px]"
          >
            <bdi>
              {broker.name || "Forex Broker"}
            </bdi>
          </Link>

          <div className="mt-2 flex flex-wrap items-center gap-2">

            <span
              dir="ltr"
              className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700 sm:text-[12px]"
            >
              <span aria-hidden="true">★</span>

              {ratingText}/5

            </span>

            <span className="text-[10px] font-bold text-slate-500">
              {row.country_rating !== null
                ? "Saudi Arabia Rating"
                : "Overall Rating"}
            </span>

          </div>

        </div>

      </div>

      {/* ACCOUNT DETAILS */}

      <div className="mt-4 grid grid-cols-2 gap-2.5">

        <div className="flex min-w-0 flex-col items-center justify-center rounded-[11px] border border-slate-200 bg-[#f5f8fc] px-2 py-3 text-center">

          <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
            Listed Min. Deposit
          </span>

          <span
            dir="ltr"
            className="mt-1 text-[16px] font-black text-[#102747] sm:text-[18px]"
          >
            {deposit}
          </span>

        </div>

        <div className="flex min-w-0 flex-col items-center justify-center rounded-[11px] border border-slate-200 bg-[#f5f8fc] px-2 py-3 text-center">

          <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
            Trading Platforms
          </span>

          <span
            dir="ltr"
            className="mt-1 break-words text-[12px] font-black text-[#102747] sm:text-[14px]"
          >
            {platforms}
          </span>

        </div>

      </div>

      {/* REGISTRATION INFORMATION */}

      <div className="mt-3 flex-1 rounded-[11px] border border-blue-100 bg-[#f1f7fe] p-3">

        <p className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
          Account Opening and Verification
        </p>

        <p className="mt-1.5 text-[11px] leading-6 text-slate-600 sm:text-[12px]">
          Review the broker&apos;s legal entity,
          accepted identity documents, account
          conditions and registration requirements
          before submitting an application.
        </p>

      </div>

      {/* BROKER REVIEW */}

      <div className="mt-4">

        <Link
          href={reviewUrl}
          className="inline-flex min-h-[45px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#176ac8] px-3 py-2.5 text-center text-[12px] font-black text-white transition hover:bg-[#10549f] sm:text-[13px]"
        >
          Broker Review & Account Details

          <span aria-hidden="true">
            →
          </span>

        </Link>

      </div>

    </div>
  );
}

/* =========================================================
   SAUDI BROKERS — ARTICLE SECTION
   ========================================================= */

function SaudiBrokerComparison({
  rankings,
}: {
  rankings: SaudiArticleRanking[];
}) {
  const brokers = rankings.slice(0, 3);

  return (
    <aside
      id="saudi-broker-comparison"
      aria-label="Forex brokers and account opening requirements in Saudi Arabia"
      className="relative !my-7 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:!my-9 sm:rounded-[24px]"
    >

      {/* SECTION HEADER */}

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(90deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-6 sm:py-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
              Saudi Arabia Trading Guide
            </span>

            <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">
              Forex Brokers and Account Opening Requirements
            </h2>

            <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">
              Explore brokers featured in Broker Alarab&apos;s
              Saudi Arabia rankings and review their
              account conditions, regulatory licenses
              and registration requirements.
            </p>

          </div>

          <Link
            href={SAUDI_BROKERS_URL}
            className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-[11px] border border-blue-200 bg-white px-4 py-2.5 text-[11px] font-black text-[#176ac8] shadow-sm transition hover:bg-blue-50 sm:text-[12px]"
          >
            View Full Comparison

            <span aria-hidden="true">
              →
            </span>

          </Link>

        </div>

      </div>

      {/* BROKER CARDS */}

      {brokers.length > 0 ? (
        <div className="grid grid-cols-1 auto-rows-fr gap-3 p-3 sm:gap-4 sm:p-5 lg:grid-cols-3">

          {brokers.map((row) => (
            <SaudiArticleBrokerCard
              key={row.id}
              row={row}
            />
          ))}

        </div>
      ) : (
        <div className="p-5 text-center text-[13px] text-slate-600">

          <Link
            href={SAUDI_BROKERS_URL}
            className="font-black text-[#176ac8] hover:underline"
          >
            Explore Forex Broker Reviews for Saudi Arabia
          </Link>

        </div>
      )}

      {/* DISCLOSURE */}

      <div className="border-t border-[#d7e5f4] bg-white/70 px-4 py-3 sm:px-6">

        <p className="text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          Featured brokers are based on Broker Alarab&apos;s
          Saudi Arabia rankings. Inclusion does not imply
          authorization by Saudi regulatory authorities.
          Account conditions and deposit requirements may
          vary by legal entity. Verify applicable local
          authorization before registering or depositing
          funds. Broker Alarab may receive compensation
          from certain commercial partners.
        </p>

      </div>

    </aside>
  );
}

/* =========================================================
   SAUDI TOP FIVE — COMPACT BROKER COMPARISON
   English Version
   ========================================================= */

function SaudiTopFiveBrokers({
  rankings,
}: {
  rankings: SaudiArticleRanking[];
}) {
  const brokers = rankings.slice(0, 5);

  return (
    <section
      id="saudi-top-five"
      aria-label="Compare leading forex brokers in Saudi Arabia"
      className="relative !my-9 scroll-mt-24 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:!my-12 sm:rounded-[24px]"
    >

      {/* SECTION HEADER */}

      <div className="border-b border-[#d7e5f4] bg-[linear-gradient(90deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-6 sm:py-6">

        <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">

          Forex Broker Comparison

        </span>

        <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">

          Compare Leading Forex Brokers in Saudi Arabia

        </h2>

        <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[14px]">

          After reviewing account opening and
          verification requirements, compare broker
          ratings, trading platforms and advertised
          minimum deposits based on Broker Alarab&apos;s
          Saudi Arabia rankings.

        </p>

      </div>

      {/* BROKER LIST */}

      {brokers.length > 0 ? (

        <div className="space-y-2.5 p-3 sm:space-y-3 sm:p-5">

          {brokers.map((row) => {
            const broker =
              normalizeSaudiBroker(row.brokers);

            if (!broker || !broker.slug) {
              return null;
            }

            const rating =
              row.country_rating ?? broker.rating;

            const ratingText =
              rating !== null &&
              Number.isFinite(Number(rating))
                ? `${Number(rating).toFixed(2)}/5`
                : "N/A";

            const deposit =
              broker.min_deposit !== null &&
              Number.isFinite(Number(broker.min_deposit))
                ? `$${broker.min_deposit}`
                : "Not specified";

            const platforms =
              broker.platforms
                ?.split(/[|,]/)
                .map((item) => item.trim())
                .filter(Boolean)
                .slice(0, 2)
                .join(" • ") || "Not specified";

            const reviewUrl =
              `/en/brokers/${broker.slug}`;

            const accountUrl =
              broker.real_account_url?.trim();

            const canOpenAccount =
              Boolean(
                accountUrl &&
                /^https:\/\//i.test(accountUrl)
              );

            return (
              <div
                key={row.id}
                className="group relative grid min-w-0 grid-cols-1 gap-3 overflow-hidden rounded-[14px] border border-slate-200 bg-[#f8fbff] p-3 transition hover:border-blue-300 hover:bg-white hover:shadow-sm xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,1fr)_auto] xl:items-center xl:gap-4 sm:p-4"
              >

                {/* BROKER IDENTITY */}

                <div className="flex min-w-0 items-center gap-3">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#eaf3ff] text-[12px] font-black text-[#176ac8]">

                    {String(row.rank_position).padStart(2, "0")}

                  </span>

                  <Link
                    href={reviewUrl}
                    className="relative flex h-[48px] w-[72px] shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-white sm:h-[54px] sm:w-[85px]"
                  >

                    {broker.logo ? (
                      <Image
                        src={broker.logo}
                        alt={`${broker.name || "Forex broker"} logo`}
                        fill
                        sizes="85px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-[12px] font-black text-[#176ac8]">

                        {(broker.name || "BA")
                          .slice(0, 2)
                          .toUpperCase()}

                      </span>
                    )}

                  </Link>

                  <div className="min-w-0 flex-1">

                    <Link
                      href={reviewUrl}
                      className="block break-words text-[14px] font-black leading-6 text-[#102747] transition hover:text-[#176ac8] sm:text-[17px]"
                    >

                      <bdi>
                        {broker.name || "Forex Broker"}
                      </bdi>

                    </Link>

                  </div>

                </div>

                {/* ACCOUNT DETAILS */}

                <div className="grid grid-cols-3 gap-2 xl:contents">

                  {/* RATING */}

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">

                      {row.country_rating !== null
                        ? "Saudi Arabia Rating"
                        : "Overall Rating"}

                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 inline-flex items-center gap-1 text-[13px] font-black text-amber-700 sm:text-[16px]"
                    >

                      <span aria-hidden="true">
                        ★
                      </span>

                      {ratingText}

                    </span>

                  </div>

                  {/* MINIMUM DEPOSIT */}

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">

                      Listed Min. Deposit

                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 break-words text-[13px] font-black text-[#102747] sm:text-[16px]"
                    >

                      {deposit}

                    </span>

                  </div>

                  {/* TRADING PLATFORMS */}

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">

                      Platforms

                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 break-words text-[11px] font-black text-[#102747] [overflow-wrap:anywhere] sm:text-[13px]"
                    >

                      {platforms}

                    </span>

                  </div>

                </div>

                {/* BROKER ACTION BUTTONS */}

                <div className="grid grid-cols-2 gap-2 xl:flex xl:items-center">

                  {/* REVIEW BUTTON */}

                  <Link
                    href={reviewUrl}
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] border border-[#bdd8f5] bg-white px-3 py-2.5 text-center text-[11px] font-black text-[#176ac8] transition hover:border-[#176ac8] hover:bg-[#eaf3ff] sm:text-[12px]"
                  >

                    Read Review

                  </Link>

                  {/* OPEN ACCOUNT BUTTON */}

                  {canOpenAccount && accountUrl ? (

                    <a
                      href={accountUrl}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] bg-[#15803d] px-3 py-2.5 text-center text-[11px] font-black text-white transition hover:bg-[#166534] sm:text-[12px]"
                    >

                      Open Account

                      <span aria-hidden="true">
                        ↗
                      </span>

                    </a>

                  ) : (

                    <span
                      aria-disabled="true"
                      className="inline-flex min-h-[42px] cursor-not-allowed items-center justify-center whitespace-nowrap rounded-[10px] border border-slate-200 bg-slate-100 px-3 py-2.5 text-center text-[11px] font-bold text-slate-400 sm:text-[12px]"
                    >

                      Unavailable

                    </span>

                  )}

                </div>

              </div>
            );
          })}

        </div>

      ) : (

        <div className="p-5 text-center text-[13px] text-slate-600">

          Explore our full Saudi Arabia forex broker
          comparison for ratings and account information.

        </div>

      )}

      {/* FULL COUNTRY COMPARISON */}

      <div className="border-t border-[#d7e5f4] bg-[#f5f9ff] p-3 sm:p-5">

        <Link
          href={SAUDI_BROKERS_URL}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#bdd8f5] bg-white px-4 py-3 text-center text-[12px] font-black text-[#176ac8] transition hover:border-[#176ac8] hover:bg-[#176ac8] hover:text-white sm:text-[14px]"
        >

          View Full Comparison of the Best Forex Brokers in Saudi Arabia

          <span aria-hidden="true">
            →
          </span>

        </Link>

        <p className="mt-3 text-center text-[10px] leading-6 text-slate-500 sm:text-[11px]">

          Brokers are displayed according to Broker Alarab&apos;s
          Saudi Arabia rankings. Deposit and registration
          requirements may vary by legal entity and country
          of residence. Inclusion does not establish
          local regulatory authorization. Verify applicable
          approvals before opening an account.
          Broker Alarab may receive commercial compensation
          when certain account opening links are used.

        </p>

      </div>

    </section>
  );
}

/* =========================================================
   RELATED PAGES — INTERNAL LINKS
   ========================================================= */

function ImportantInternalLinks() {
  const links = [
    {
      number: "01",
      href: "/en/brokers",

      title: "Forex Broker Reviews",

      description:
        "Explore detailed forex and CFD broker reviews, regulatory licenses, trading costs and account conditions.",
    },
    {
      number: "02",
      href: "/en/best-brokers",

      title: "Best Forex Brokers",

      description:
        "Explore broker rankings across financial markets, trading account types and different trading requirements.",
    },
    {
      number: "03",
      href: "/en/best-brokers/saudi-arabia",

      title: "Best Forex Brokers in Saudi Arabia",

      description:
        "Explore our Saudi Arabia broker comparison, including account conditions, broker features and regulatory considerations.",
    },
    {
      number: "04",
      href: "/en/compare",

      title: "Compare Forex Brokers",

      description:
        "Compare forex and CFD brokers by regulation, trading platforms, costs and trading conditions.",
    },
    {
      number: "05",
      href: "/en/compare-accounts",

      title: "Compare Trading Accounts",

      description:
        "Compare Standard, Cent and Raw Spread trading accounts, including their pricing structures and specifications.",
    },
    {
      number: "06",
      href: "/en/licenses",

      title: "Forex Broker Regulation",

      description:
        "Learn about financial regulatory authorities, broker licenses, regulatory jurisdictions and investor protection.",
    },
  ];

  return (
    <section
      id="related-pages"
      aria-label="Related forex broker comparisons and trading guides"
      className="!my-9 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-sm sm:!my-12 sm:rounded-[24px]"
    >

      {/* SECTION HEADER */}

      <div className="border-b border-[#d7e5f4] bg-[linear-gradient(90deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-7 sm:py-7">

        <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
          Discover More on Broker Alarab
        </span>

        <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">
          Useful Resources Before Opening a Forex Account
        </h2>

        <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[14px]">
          Explore broker reviews, account comparisons,
          trading conditions and regulatory information
          to make a more informed financial decision.
        </p>

      </div>

      {/* INTERNAL LINKS GRID */}

      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-5 lg:grid-cols-3 lg:p-6">

        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex min-w-0 flex-col overflow-hidden rounded-[15px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md sm:p-5"
          >

            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176ac8] to-[#38bdf8]" />

            <div className="flex min-w-0 items-center gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3ff] text-[12px] font-black text-[#176ac8]">

                {item.number}

              </span>

              <h3 className="min-w-0 flex-1 text-[14px] font-black leading-6 text-[#102747] transition group-hover:text-[#176ac8] sm:text-[16px]">

                {item.title}

              </h3>

              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f1f7fe] text-[#176ac8] transition group-hover:bg-[#176ac8] group-hover:text-white"
              >
                →
              </span>

            </div>

            <p className="mt-3 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">

              {item.description}

            </p>

          </Link>
        ))}

      </div>

    </section>
  );
}

/* =========================================================
   MAIN ENGLISH ARTICLE PAGE
========================================================= */

export default async function OpenForexAccountSaudiArabiaPage() {

  const saudiBrokers =
    await getSaudiArticleBrokers();

  return (

    <ArticleLayout

      language="en"

      slug={SLUG}

      title={`${ARTICLE.titleMain} –`}

      titleHighlight={ARTICLE.titleHighlight}

      description={ARTICLE.description}

      category={ARTICLE.category}

      categoryHref="/en/articles/category/forex-trading-guides-by-country"

      subcategory={`🇸🇦 ${ARTICLE.subcategory}`}

      articleType={ARTICLE.articleType}

      breadcrumbTitle={ARTICLE.breadcrumb}

      author="Broker Alarab Team"

      published={ARTICLE.published}

      modified={ARTICLE.modified}

      heroImage={HERO_IMAGE}

      heroImageAlt={ARTICLE.heroAlt}

      heroImageCaption={ARTICLE.heroCaption}

      contents={contents}

      structuredData={
        <ArticleStructuredData
          config={{
            ...ARTICLE_SEO,
            sources,
          }}
        />
      }

      introduction={

        <>

          <Paragraph>
            Opening a forex trading account in Saudi
            Arabia involves several important steps,
            whether you are a Saudi citizen or an
            expatriate residing in the Kingdom.
            Before registering, it is important to
            understand account opening requirements,
            identity verification, accepted documents,
            trading account types, minimum deposits
            and available funding methods.
          </Paragraph>

          <Paragraph>
            This practical guide from{" "}
            <Strong>Broker Alarab</Strong>{" "}
            explains how forex account registration
            works in Saudi Arabia, from reviewing
            brokers and verifying their authorization
            to understanding identity verification
            requirements and selecting a suitable
            trading account.
          </Paragraph>

          {/* FEATURED SAUDI BROKERS */}

          <SaudiBrokerComparison
            rankings={saudiBrokers}
          />

        </>

      }

    >

            {/* QUICK ANSWER */}

            <ArticleSection
              id="quick-answer"
              eyebrow="Account Opening Overview"
              title="How to Open a Forex Account in Saudi Arabia: A Quick Overview"
            >

              <Paragraph>
                Opening a live forex trading account
                generally involves verifying the financial
                institution&apos;s authorization, meeting
                age and residency requirements, completing
                an application, submitting identity
                documents and reviewing the account&apos;s
                financial and contractual conditions.
              </Paragraph>

              <Note
                title="Before Opening a Forex Account"
                tone="amber"
              >
                A forex broker accepting a Saudi mobile
                number, National ID or residential address
                does not automatically mean it is
                authorized to provide financial services
                in Saudi Arabia. Verify the relevant
                licenses and local regulatory approvals
                before proceeding.
              </Note>

              <ArticleDataTable
                headers={[
                  "Requirement",
                  "Details",
                ]}
                rows={[
                  [
                    "Minimum age",

                    "Meet the minimum age and legal eligibility requirements specified by the financial institution.",
                  ],
                  [
                    "Residency",

                    "Declare your actual country of residence and verify the provider's authorization to offer its services there.",
                  ],
                  [
                    "Proof of identity",

                    "Provide a valid identity document accepted by the relevant financial institution.",
                  ],
                  [
                    "Proof of address",

                    "A separate document confirming your actual residential address may be required.",
                  ],
                  [
                    "Initial deposit",

                    "Requirements vary by broker, account type, payment method and legal entity.",
                  ],
                  [
                    "Regulatory authorization",

                    "Verify the contracting legal entity, scope of its license and applicable local regulatory approvals.",
                  ],
                ]}
                caption="These are general account opening requirements, not universal conditions or confirmation of regulatory approval for any individual broker."
              />

            </ArticleSection>

            {/* LEGAL STATUS */}

            <ArticleSection
              id="legal-status"
              eyebrow="Financial Regulation"
              title="Is Forex Trading Legal in Saudi Arabia? Understanding Broker Authorization"
            >

              <Paragraph>
                When considering opening a forex account
                in Saudi Arabia, it is important to
                distinguish between being able to access
                an international broker&apos;s website
                and that broker being authorized to
                provide financial services within
                the Kingdom.
              </Paragraph>

              <Paragraph>
                Saudi authorities, including the Standing
                Committee for Awareness and Warning
                Against Unauthorized Forex Activities,
                have warned citizens and residents about
                the risks of dealing with unlicensed
                forex businesses, including companies
                promoting their services from outside
                Saudi Arabia.
              </Paragraph>

              <Paragraph>
                Official regulatory warnings are available
                through the{" "}

                <a
                  href={sources[2].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  Saudi Central Bank (SAMA)
                </a>

                .
              </Paragraph>

              <SubHeading>
                Local Saudi Authorization vs. International Forex Broker Licenses
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "Regulatory Factor",
                  "What It Means",
                ]}
                rows={[
                  [
                    "Saudi authorization",

                    "Permission granted by a competent Saudi authority to conduct specified financial activities within its approved scope.",
                  ],
                  [
                    "International license",

                    "A license issued by a foreign financial regulator that does not automatically authorize financial services in Saudi Arabia.",
                  ],
                  [
                    "Client acceptance",

                    "Allowing residents of a particular country to register does not establish local regulatory authorization.",
                  ],
                  [
                    "Contracting legal entity",

                    "The specific financial institution or subsidiary identified in the client agreement.",
                  ],
                  [
                    "Investor protection",

                    "Depends on the financial product, contracting entity and applicable regulatory framework.",
                  ],
                ]}
              />

              <Paragraph>
                International forex brokers may operate
                through multiple subsidiaries regulated
                in different jurisdictions. A license
                held by one subsidiary does not
                necessarily apply to every trading
                account opened under the same
                commercial brand.
              </Paragraph>

              <Paragraph>
                Before opening a trading account,
                identify the specific legal entity
                that will hold your account and verify
                the regulatory permissions applicable
                to that entity and the financial
                services it provides.
              </Paragraph>

              <Paragraph>
                You can consult the{" "}

                <a
                  href={sources[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  Saudi Capital Market Authority&apos;s
                  register of authorized capital market
                  institutions
                </a>

                {" "}and check the scope of the
                financial activities each institution
                is permitted to conduct.
              </Paragraph>

              <Note
                title="Important Regulatory Consideration"
                tone="amber"
              >
                This guide does not constitute legal
                advice or authorization to trade with
                an international forex broker. If you
                cannot verify whether a provider is
                authorized to offer its services in
                Saudi Arabia, do not transfer funds
                and seek clarification from the
                relevant Saudi regulatory authority.
              </Note>

            </ArticleSection>

            {/* ACCOUNT REQUIREMENTS */}

            <ArticleSection
              id="requirements"
              eyebrow="Account Opening Requirements"
              title="What Are the Requirements to Open a Forex Trading Account in Saudi Arabia?"
            >

              <Paragraph>
                Forex account opening requirements
                depend on the financial institution,
                the contracting legal entity and
                the type of trading product being
                offered. However, several general
                eligibility and verification requirements
                are commonly applied by financial
                service providers.
              </Paragraph>

              <ArticleList
                items={[
                  "Meet the applicable minimum age and legal eligibility requirements, commonly 18 years or older depending on the provider.",

                  "Provide accurate nationality and country of residence information.",

                  "Hold valid identification documents accepted by the financial institution.",

                  "Provide an email address and mobile phone number that can be verified.",

                  "Complete Know Your Customer (KYC) and identity verification procedures.",

                  "Provide information about employment, income and source of funds when requested.",

                  "Complete any applicable trading knowledge, experience or suitability assessment.",

                  "Review the client agreement, risk disclosures and applicable fees before accepting the account terms.",
                ]}
              />

              <SubHeading>
                Do You Need Previous Forex Trading Experience?
              </SubHeading>

              <Paragraph>
                Previous trading experience is not
                required for every type of financial
                account. However, some providers
                require applicants to complete a
                questionnaire assessing their knowledge
                of leveraged products, financial markets
                and trading risks.
              </Paragraph>

              <Paragraph>
                Applicants should provide accurate
                answers to suitability and experience
                assessments. These assessments may
                help determine whether particular
                financial products are appropriate
                for the applicant&apos;s experience
                and financial circumstances.
              </Paragraph>

            </ArticleSection>

            {/* DOCUMENTS */}

            <ArticleSection
              id="documents"
              eyebrow="Identity and Address Verification"
              title="Documents Required to Open and Verify a Forex Account in Saudi Arabia"
            >

              <Paragraph>
                Most forex account opening documents
                relate to proof of identity and proof
                of residential address. Financial
                institutions may also request additional
                information to verify the source of
                funds and comply with applicable
                customer due diligence requirements.
              </Paragraph>

              <RequiredDocuments />

              <SubHeading>
                Which Documents Can Be Used as Proof of Address in Saudi Arabia?
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "Document",
                  "Acceptance Conditions",
                ]}
                rows={[
                  [
                    "Bank statement",

                    "May be accepted if it is sufficiently recent and displays the required legal name and residential address.",
                  ],
                  [
                    "Utility bill",

                    "Electricity, water or other utility bills may be accepted depending on the institution's verification policy.",
                  ],
                  [
                    "Saudi National Address",

                    "Check whether an official Saudi National Address certificate is accepted. Acceptance is not universal.",
                  ],
                  [
                    "Government-issued document",

                    "May be accepted if issued by an official authority and containing the required personal and address information.",
                  ],
                  [
                    "Rental agreement",

                    "Acceptance depends on the type of rental agreement and the financial institution's verification requirements.",
                  ],
                ]}
                caption="Accepted documents and maximum document age vary between financial institutions and legal entities. Always check the applicable verification requirements."
              />

              <Note title="Is a Saudi National ID or Iqama Enough to Open a Forex Account?">

                Some registration systems may allow
                applicants to begin opening an account
                using a single identity document.

                Other providers may require separate
                proof of address, additional identification
                or further compliance information.

                Completing the initial registration
                does not necessarily mean the account
                has been fully verified.

              </Note>

              <Paragraph>
                An example of a broker&apos;s published
                identity verification requirements is
                available through the{" "}

                <a
                  href={sources[5].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  Exness Help Center
                </a>

                , which distinguishes between proof
                of identity and proof of residence.

                This reference is provided as an example
                of account verification procedures,
                not as evidence of authorization
                to offer forex trading services
                in Saudi Arabia.
              </Paragraph>

            </ArticleSection>

            {/* SAUDI CITIZENS */}

            <ArticleSection
              id="saudi-citizens"
              eyebrow="Account Opening for Saudi Citizens"
              title="How to Open a Forex Account Using a Saudi National ID"
            >

              <Paragraph>
                A Saudi National ID is an official
                identity document used by Saudi
                citizens. It may be among the accepted
                identification documents requested by
                financial institutions authorized
                to provide the relevant services
                in the Kingdom.
              </Paragraph>

              <Paragraph>
                Identity verification procedures
                differ between institutions. Depending
                on the verification system and account
                requirements, applicants may also be
                asked to provide a passport or
                additional supporting documentation.
              </Paragraph>

              <SubHeading>
                Saudi National ID Verification Checklist
              </SubHeading>

              <ArticleList
                items={[
                  "Ensure that your Saudi National ID is valid and has not expired.",

                  "Use your legal name and date of birth exactly as recorded in official documents.",

                  "Provide the correct English spelling of your legal name when required.",

                  "Submit clear images of the requested document without concealing information required for verification.",

                  "Ensure that the name registered with your payment provider matches the name on your trading account.",

                  "Provide separate proof of residential address if required by the financial institution.",
                ]}
              />

              <Note title="Differences in English Name Spelling">

                Differences in the English spelling
                of your name between your passport,
                bank account and trading account
                application may result in additional
                verification requests.

                Use the official spelling shown
                in your accepted identity documents
                wherever possible.

              </Note>

            </ArticleSection>

            {/* SAUDI RESIDENTS */}

            <ArticleSection
              id="saudi-residents"
              eyebrow="Forex Trading for Expatriates"
              title="How to Open a Forex Trading Account as an Expat in Saudi Arabia"
            >

              <Paragraph>
                Expatriates living in Saudi Arabia
                may encounter different account
                opening requirements from Saudi
                citizens, particularly regarding
                nationality, residence permits
                and accepted proof of address.
              </Paragraph>

              <Paragraph>
                Whether an expatriate is eligible
                to open a particular forex account
                depends on the financial institution&apos;s
                regulatory authorization, the applicant&apos;s
                nationality and residency, and the
                conditions applicable to the requested
                financial product.
              </Paragraph>

              <SubHeading>
                Can Expats Open a Forex Account with an Iqama?
              </SubHeading>

              <Paragraph>
                An Iqama is an official Saudi residence
                permit. Some financial institutions
                may accept it as evidence of identity
                or residency, while others may require
                a passport and separate proof of
                address.
              </Paragraph>

              <Paragraph>
                Expats should confirm whether their
                Iqama is accepted before starting
                the application and check whether
                any additional documentation is
                required for their nationality or
                residency status.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Required Information",
                  "What to Provide or Verify",
                ]}
                rows={[
                  [
                    "Nationality",

                    "Your actual citizenship as recorded in your passport.",
                  ],
                  [
                    "Country of residence",

                    "Saudi Arabia if it is your actual country of residence.",
                  ],
                  [
                    "Passport",

                    "A valid passport if required by the financial institution.",
                  ],
                  [
                    "Iqama residence permit",

                    "A valid Saudi residence permit if accepted or required for account verification.",
                  ],
                  [
                    "Residential address",

                    "Your actual residential address within Saudi Arabia.",
                  ],
                  [
                    "Tax residency",

                    "Accurate tax residency information based on your circumstances and the institution's requirements.",
                  ],
                ]}
              />

              <SubHeading>
                Can Your Nationality Be Different from Your Country of Residence?
              </SubHeading>

              <Paragraph>
                Financial institutions may allow
                applicants to declare a nationality
                that differs from their country of
                residence. However, eligibility
                conditions and geographical
                restrictions may vary according to
                nationality, residency and the
                regulatory framework applicable
                to the account.
              </Paragraph>

              <Paragraph>
                Applicants must accurately disclose
                their nationality and actual country
                of residence. Selecting another
                country to bypass geographical
                restrictions or account opening
                requirements may violate the
                institution&apos;s terms and applicable
                regulatory requirements.
              </Paragraph>

            </ArticleSection>

            {/* ACCOUNT TYPES */}

            <ArticleSection
              id="account-types"
              eyebrow="Choosing a Trading Account"
              title="Which Type of Forex Trading Account Should You Choose?"
            >

              <Paragraph>
                Before opening a live forex trading
                account in Saudi Arabia, it is
                important to understand the
                differences between available
                account types.
              </Paragraph>

              <Paragraph>
                The account type can affect trading
                costs, contract sizes, available
                financial instruments, margin
                requirements and order execution
                conditions.
              </Paragraph>

              <AccountTypesGrid />

              <Paragraph>
                Use Broker Alarab&apos;s{" "}

                <Link
                  href="/en/compare-accounts"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  forex trading account comparison tool
                </Link>

                {" "}to explore differences between
                account types and review available
                information about spreads, trading
                commissions and minimum deposit
                requirements.
              </Paragraph>

              <Note title="Trading Account Types vs. Account Features">

                A demo account is a practice environment
                that uses virtual funds rather than
                a type of live trading account.

                <br />
                <br />

                An Islamic or swap-free account
                refers to a feature or classification
                related to overnight financing
                conditions. This feature may be
                available on Standard, Cent, Raw
                Spread or other account types,
                depending on the broker&apos;s terms.

                <br />
                <br />

                Similarly, the ECN label is commonly
                associated with an order execution
                model and may overlap with the
                characteristics of Raw Spread accounts.
                Always review the actual account
                specifications rather than relying
                on its commercial name alone.

              </Note>

            </ArticleSection>

            {/* REGISTRATION STEPS */}

            <ArticleSection
              id="registration-steps"
              eyebrow="Step-by-Step Registration Guide"
              title="How to Open a Forex Trading Account in Saudi Arabia: Step-by-Step Guide"
            >

              <Paragraph>
                Although forex broker registration
                interfaces differ, the account
                opening process commonly involves
                several stages related to regulatory
                verification, personal information,
                identity checks and account selection.
              </Paragraph>

              <RegistrationSteps />

              <SubHeading>
                Step 1: Verify the Broker and Its Legal Entity
              </SubHeading>

              <Paragraph>
                Identify the financial institution&apos;s
                full legal name, regulatory license
                number and supervising authority.

                Compare this information with the
                relevant official regulatory registers
                and verify whether the institution
                is authorized to provide the requested
                financial product in Saudi Arabia.
              </Paragraph>

              <SubHeading>
                Step 2: Review the Client Agreement
              </SubHeading>

              <Paragraph>
                The client agreement identifies
                the legal entity responsible for
                your account and sets out the
                applicable terms regarding client
                funds, order execution, trading
                fees, complaints and account closure.
              </Paragraph>

              <Paragraph>
                Marketing statements should not
                replace a review of the actual
                contractual conditions, particularly
                where differences exist between
                promotional information and the
                client agreement.
              </Paragraph>

              <SubHeading>
                Step 3: Complete the Forex Account Registration Form
              </SubHeading>

              <Paragraph>
                After confirming the provider&apos;s
                authorization, the registration
                process may require your legal
                name, date of birth, nationality,
                country of residence, email address
                and mobile telephone number.
              </Paragraph>

              <SubHeading>
                Step 4: Complete Identity and Address Verification
              </SubHeading>

              <Paragraph>
                This stage may involve submitting
                identification documents, completing
                electronic identity or facial
                verification, providing proof of
                residential address and answering
                questions about the source of
                your funds.
              </Paragraph>

              <SubHeading>
                Step 5: Select a Trading Account and Platform
              </SubHeading>

              <Paragraph>
                Available trading platforms depend
                on the financial institution and
                the selected account type. These
                may include MetaTrader 4 (MT4),
                MetaTrader 5 (MT5), or a proprietary
                trading platform developed by
                the broker.
              </Paragraph>

              <Paragraph>
                Access to a well-known trading
                platform does not independently
                establish the financial institution&apos;s
                reliability or authorization to
                provide services in Saudi Arabia.
              </Paragraph>

              <SubHeading>
                Step 6: Confirm That Your Account Is Ready
              </SubHeading>

              <Paragraph>
                Before considering an initial
                deposit, confirm that identity
                verification has been completed,
                review all financial conditions
                and verify the permitted withdrawal
                methods and the legal beneficiary
                of any payment.
              </Paragraph>

            </ArticleSection>

            {/* =========================================================
                END OF PART 2 / 3
                ========================================================= */}
                            {/* VERIFICATION */}

            <ArticleSection
              id="verification"
              eyebrow="Account Verification"
              title="How to Verify a Forex Trading Account in Saudi Arabia: KYC Requirements"
            >

              <Paragraph>
                Know Your Customer (KYC) refers to
                the verification procedures used by
                financial institutions to confirm
                a client&apos;s identity and understand
                the nature of the financial relationship.
              </Paragraph>

              <Paragraph>
                These procedures may include identity
                verification, confirmation of residential
                address, source-of-funds checks and
                assessments of risks associated with
                the account or its financial transactions.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Verification Stage",
                  "Purpose",
                ]}
                rows={[
                  [
                    "Email verification",
                    "Confirms access to the registered email address.",
                  ],
                  [
                    "Phone verification",
                    "Confirms access to the registered mobile phone number.",
                  ],
                  [
                    "Proof of Identity (POI)",
                    "Verifies the identity and legal information of the account holder.",
                  ],
                  [
                    "Proof of Address (POA)",
                    "Confirms the applicant's actual residential address when required.",
                  ],
                  [
                    "Source of funds",
                    "Establishes the source of money used for financial transactions according to compliance requirements.",
                  ],
                  [
                    "Suitability assessment",
                    "Assesses the client's knowledge of financial products and trading risks where applicable.",
                  ],
                ]}
              />

              <SubHeading>
                How Long Does Forex Account Verification Take?
              </SubHeading>

              <Paragraph>
                There is no universal verification
                timeframe for forex trading accounts.
                Some identity checks may be completed
                automatically, while others require
                manual review or additional supporting
                documentation.
              </Paragraph>

              <Paragraph>
                Verification times depend on the
                quality of the submitted documents,
                completeness of the application,
                the verification system and the
                requirements of the contracting
                legal entity.
              </Paragraph>

            </ArticleSection>

            {/* VERIFICATION REJECTION */}

            <ArticleSection
              id="verification-rejection"
              eyebrow="Account Registration Troubleshooting"
              title="Why Was Your Forex Account Verification Rejected?"
            >

              <Paragraph>
                Forex account applicants may receive
                a notification stating that their
                documents have been rejected or that
                identity verification remains incomplete.
              </Paragraph>

              <Paragraph>
                This does not necessarily mean that
                the account application has been
                permanently rejected. In some cases,
                the issue relates to document quality,
                missing information or differences
                between the submitted documents and
                the registration details.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Possible Rejection Reason",
                  "Recommended Action",
                ]}
                rows={[
                  [
                    "Expired identity document",
                    "Submit a valid identity document from the provider's accepted document list.",
                  ],
                  [
                    "Unclear document image",
                    "Retake the photograph so that all required information is clearly visible.",
                  ],
                  [
                    "Name mismatch",
                    "Contact official customer support to correct the account details and provide supporting documents.",
                  ],
                  [
                    "Unacceptable proof of address",
                    "Review the financial institution's accepted proof-of-address documents.",
                  ],
                  [
                    "Outdated document",
                    "Submit a recent document that meets the applicable document-age requirements.",
                  ],
                  [
                    "Country of residence mismatch",
                    "Correct your actual residency information and provide appropriate supporting evidence.",
                  ],
                  [
                    "Regulatory or geographical restrictions",
                    "Do not attempt to bypass restrictions. Ask the provider to clarify the reason for ineligibility.",
                  ],
                ]}
              />

              <Note
                title="Never Alter Official Verification Documents"
                tone="amber"
              >
                Do not modify information appearing
                on your Saudi National ID, Iqama,
                passport or proof-of-address documents
                using image editing software.

                If the information is incorrect,
                request a correction through the
                issuing authority or the financial
                institution&apos;s official support
                procedures.
              </Note>

            </ArticleSection>

            {/* SAUDI TOP FIVE BROKERS */}

<SaudiTopFiveBrokers rankings={saudiBrokers} />

{/* MINIMUM DEPOSIT */}

            <ArticleSection
              id="minimum-deposit"
              eyebrow="Financial Requirements"
              title="What Is the Minimum Deposit to Open a Forex Account in Saudi Arabia?"
            >

              <Paragraph>
                There is no universal minimum deposit
                requirement for opening a forex trading
                account in Saudi Arabia.
              </Paragraph>

              <Paragraph>
                Minimum deposit requirements vary
                depending on the broker, trading
                account type, contracting legal entity,
                payment method and the applicant&apos;s
                country of residence.
              </Paragraph>

              <Paragraph>
                It is also important to distinguish
                between the minimum initial deposit
                required to activate a trading account
                and the minimum amount accepted for
                an individual payment transaction.

                These requirements may differ even
                within the same brokerage company.
              </Paragraph>

              <SubHeading>
                Minimum Deposit vs. Required Trading Capital
              </SubHeading>

              <Paragraph>
                A broker accepting a small initial
                deposit does not mean that the amount
                is sufficient to withstand trading
                losses, particularly when trading
                leveraged financial products or
                instruments with substantial price
                volatility.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Financial Term",
                  "Definition",
                ]}
                rows={[
                  [
                    "Minimum deposit",
                    "The smallest deposit accepted by the broker or payment provider under the applicable conditions.",
                  ],
                  [
                    "Required margin",
                    "The amount required to open or maintain a trading position under the account's margin rules.",
                  ],
                  [
                    "Account balance",
                    "The recorded account balance after deposits, withdrawals and realized trading results.",
                  ],
                  [
                    "Account equity",
                    "The account balance adjusted for unrealized profits and losses on open positions.",
                  ],
                  [
                    "Capital at risk",
                    "The amount of money that may be exposed to trading losses.",
                  ],
                ]}
              />

              <Paragraph>
                To understand how margin requirements
                are calculated, you can use Broker
                Alarab&apos;s{" "}

                <Link
                  href="/en/tools/margin-calculator"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  forex margin calculator
                </Link>

                {" "}while taking into consideration
                the actual leverage conditions and
                margin requirements applicable to
                your broker and financial instrument.
              </Paragraph>

              <Note
                title="A Minimum Deposit Is Not a Trading Capital Recommendation"
                tone="amber"
              >
                A minimum deposit is an operational
                account requirement, not an indication
                that leveraged trading is suitable
                for a particular individual.

                Never risk money needed for essential
                living expenses or existing financial
                obligations.
              </Note>

            </ArticleSection>

            {/* PAYMENTS */}

            <ArticleSection
              id="payments"
              eyebrow="Forex Account Funding"
              title="Forex Deposits and Withdrawals in Saudi Arabia: Payment Methods and Requirements"
            >

              <Paragraph>
                Available forex deposit and withdrawal
                methods depend on the financial
                institution, payment provider, bank,
                contracting legal entity and the
                client&apos;s country of residence.
              </Paragraph>

              <Paragraph>
                Payment availability may change as
                a result of banking policies,
                regulatory requirements and financial
                compliance procedures.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Payment Method",
                  "What You Should Verify",
                ]}
                rows={[
                  [
                    "Bank transfer",
                    "The beneficiary's legal name, authorization to receive the funds and applicable banking charges.",
                  ],
                  [
                    "Debit or credit card",
                    "Whether the issuing bank permits the transaction and the applicable refund and withdrawal conditions.",
                  ],
                  [
                    "Electronic wallets",
                    "The payment provider's authorization, availability in Saudi Arabia and withdrawal conditions.",
                  ],
                  [
                    "Local payment methods",
                    "Actual availability within the trading account and the applicable regulatory permissions.",
                  ],
                ]}
              />

              <SubHeading>
                Can You Deposit and Withdraw Forex Funds in Saudi Riyals (SAR)?
              </SubHeading>

              <Paragraph>
                The ability to deposit or withdraw
                money in Saudi riyals depends on
                the currencies supported by the
                financial institution and the
                selected payment method.
              </Paragraph>

              <Paragraph>
                It is important to distinguish
                between a broker accepting a payment
                denominated in Saudi riyals and
                offering a trading account with
                SAR as its base currency.
              </Paragraph>

              <Paragraph>
                If the trading account uses a
                different base currency, such as
                USD, the deposited funds may
                require currency conversion.
                Exchange rate differences and
                conversion fees may apply depending
                on the institution responsible for
                processing the transaction.
              </Paragraph>

              <SubHeading>
                What Should You Do If a Saudi Bank Rejects a Forex Deposit?
              </SubHeading>

              <Paragraph>
                If your Saudi bank declines a
                payment or bank transfer, contact
                the bank to understand the reason
                for the rejection.
              </Paragraph>

              <Paragraph>
                Verify the financial institution&apos;s
                authorization to receive the funds
                and whether the transaction is
                permitted under the applicable
                banking and regulatory requirements.

                Do not attempt to bypass banking
                restrictions through alternative
                payment arrangements.
              </Paragraph>

              <Note
                title="Avoid Transfers to Personal Bank Accounts"
                tone="amber"
              >
                Do not transfer money to a personal
                bank account provided by someone
                claiming to be a forex account
                manager, broker representative
                or introducing agent.

                Payment instructions should be
                verified through the financial
                institution&apos;s official channels.
              </Note>

            </ArticleSection>

            {/* ISLAMIC ACCOUNT */}

            <ArticleSection
              id="islamic-account"
              eyebrow="Islamic Forex Trading Accounts"
              title="How to Open an Islamic Forex Account in Saudi Arabia"
            >

              <Paragraph>
                Some traders in Saudi Arabia look
                for forex trading accounts that
                do not apply conventional overnight
                swap charges to positions held
                beyond the daily rollover time.
              </Paragraph>

              <Paragraph>
                These arrangements are commonly
                marketed as Islamic trading accounts
                or swap-free forex accounts.
              </Paragraph>

              <Paragraph>
                Islamic account conditions differ
                between financial institutions.
                Eligibility may depend on the
                client&apos;s country of residence,
                the financial instrument being
                traded and the length of time
                a position remains open.
              </Paragraph>

              <Paragraph>
                Some providers may also apply
                alternative administrative or
                holding fees under their
                swap-free account policies.
              </Paragraph>

              <SubHeading>
                What Should You Check Before Opening an Islamic Forex Account?
              </SubHeading>

              <ArticleList
                items={[
                  "Which forex pairs and financial instruments qualify for swap-free trading.",

                  "How long the swap-free exemption remains available.",

                  "Whether administrative fees or alternative holding charges apply.",

                  "The conditions under which swap-free status can be removed or modified.",

                  "The nature of the financial contract, order execution model and leverage conditions.",
                ]}
              />

              <Note title="Is Every Swap-Free Forex Account Sharia-Compliant?">

                The absence of overnight swap
                charges does not independently
                establish that a financial product
                or transaction complies with
                Islamic finance principles.

                Sharia compliance also depends on
                the nature of the contract,
                possession, ownership, settlement,
                leverage and other contractual
                conditions.

                Individuals seeking a religious
                determination should consult a
                qualified Islamic finance or
                Sharia specialist.

              </Note>

            </ArticleSection>

            {/* TRADING COSTS */}

            <ArticleSection
              id="trading-costs"
              eyebrow="Forex Trading Fees and Costs"
              title="Is It Free to Open a Forex Trading Account in Saudi Arabia?"
            >

              <Paragraph>
                Some forex brokers allow clients
                to register and open trading
                accounts without charging a
                separate account opening fee.
              </Paragraph>

              <Paragraph>
                However, free account registration
                does not mean that trading,
                maintaining the account or
                processing financial transactions
                is entirely free of charge.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Trading Cost",
                  "Explanation",
                ]}
                rows={[
                  [
                    "Spread",
                    "The difference between the bid and ask prices of a financial instrument.",
                  ],
                  [
                    "Trading commission",
                    "A separate charge that may apply when opening or closing trading positions.",
                  ],
                  [
                    "Overnight financing fees",
                    "Potential charges associated with holding trading positions beyond a specified rollover time.",
                  ],
                  [
                    "Currency conversion fees",
                    "Potential charges when the trading account currency differs from the payment currency.",
                  ],
                  [
                    "Deposit and withdrawal fees",
                    "Charges that may be applied by the financial institution, bank or payment service provider.",
                  ],
                  [
                    "Inactivity fees",
                    "Charges that may apply after a specified period without account activity, depending on the client agreement.",
                  ],
                ]}
              />

              <Paragraph>
                Understanding the total cost of
                trading is particularly important
                when comparing different forex
                account types.
              </Paragraph>

              <Paragraph>
                A Raw Spread or ECN account may
                advertise lower spreads while
                charging separate commissions.
                A Standard account may incorporate
                a larger proportion of its
                trading costs into the spread.
              </Paragraph>

              <Paragraph>
                For a more detailed explanation
                of forex trading costs, read our
                guide to{" "}

                <Link
                  href="/en/learn-trading/spread"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  spreads in forex trading
                </Link>

                {" "}and explore how{" "}

                <Link
                  href="/en/learn-trading/leverage"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  forex trading leverage
                </Link>

                {" "}affects margin requirements,
                financial exposure and potential
                trading losses.
              </Paragraph>

            </ArticleSection>

            {/* SECURITY */}

            <ArticleSection
              id="security"
              eyebrow="Account Security and Investor Protection"
              title="How to Protect Your Money and Personal Information When Opening a Forex Account"
            >

              <Paragraph>
                Saudi regulatory authorities have
                warned about fraudulent financial
                activities involving company names,
                websites and promotional messages
                that falsely suggest regulatory
                authorization or promise guaranteed
                investment returns.
              </Paragraph>

              <Paragraph>
                Protecting personal information
                and financial assets begins with
                verifying the identity of the
                financial institution before
                submitting registration documents
                or communicating with anyone
                claiming to represent the broker.
              </Paragraph>

              <ArticleList
                items={[
                  "Verify the institution's legal name and license number through the official regulatory authority's website.",

                  "Check whether the website domain and contact information match the official regulatory records.",

                  "Do not submit your Saudi National ID, Iqama or passport through unofficial WhatsApp accounts.",

                  "Never share account passwords, one-time passwords or verification codes with another person.",

                  "Use a unique password and enable two-factor authentication when available.",

                  "Do not install remote-access software at the request of someone claiming to represent a forex broker.",

                  "Reject offers promising guaranteed profits or risk-free trading.",

                  "Keep copies of the client agreement, official communications and financial transaction receipts.",
                ]}
              />

              <SubHeading>
                Where Can You Report Unlicensed Forex Activities in Saudi Arabia?
              </SubHeading>

              <Paragraph>
                Individuals can consult the official
                reporting and complaint channels of
                the Saudi Capital Market Authority
                and the Saudi Central Bank, depending
                on the nature of the activity and
                the authority responsible for its
                supervision.
              </Paragraph>

              <Paragraph>
                The Saudi Central Bank also provides
                information regarding{" "}

                <a
                  href={sources[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  unlicensed financial activities
                </a>

                {" "}and relevant public awareness
                resources.
              </Paragraph>

              <Note
                title="Important Withdrawal Scam Warning"
                tone="amber"
              >
                If an unverified financial provider
                asks you to transfer additional
                money to a personal bank account
                to pay taxes, release frozen
                profits or activate a withdrawal,
                do not transfer the funds before
                independently verifying the
                legitimacy of the request and
                consulting the appropriate authority.
              </Note>

            </ArticleSection>

            {/* FAQ */}

            <ArticleSection
              id="faq"
              eyebrow="Frequently Asked Questions"
              title="Frequently Asked Questions About Opening a Forex Account in Saudi Arabia"
            >

              <div className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4 sm:p-6">

                <FAQItem question="Can I open a forex trading account using a Saudi National ID?">

                  A valid Saudi National ID may
                  be accepted by some financial
                  institutions as proof of identity.

                  Acceptance depends on the
                  institution&apos;s verification
                  requirements and authorization
                  to provide services in Saudi
                  Arabia. A passport or separate
                  proof of address may also be
                  required.

                </FAQItem>

                <FAQItem question="Can expatriates open a forex trading account in Saudi Arabia?">

                  Eligibility depends on the
                  applicant&apos;s nationality,
                  country of residence, financial
                  product and the regulatory
                  authorization of the financial
                  institution.

                  Expatriates may be required
                  to provide a valid passport,
                  Saudi Iqama residence permit
                  and proof of residential address.

                </FAQItem>

                <FAQItem question="Do I need a Saudi bank account to open a forex trading account?">

                  A Saudi bank account is not
                  necessarily required for the
                  initial registration process.

                  However, an accepted payment
                  method registered in the account
                  holder&apos;s name may be required
                  when conducting financial
                  transactions.

                  Conditions vary depending on
                  the financial institution,
                  payment provider and applicable
                  regulations.

                </FAQItem>

                <FAQItem question="Can I open a forex trading account without making a deposit?">

                  Some forex trading platforms
                  allow users to register and
                  create a demo account or an
                  unfunded live trading account.

                  However, using a live account
                  to place trades remains subject
                  to identity verification,
                  margin requirements and
                  applicable regulatory restrictions.

                </FAQItem>

                <FAQItem question="What is the minimum age to open a forex account in Saudi Arabia?">

                  Many financial institutions
                  require applicants to be at
                  least 18 years old.

                  However, the applicable minimum
                  age and legal eligibility
                  requirements depend on the
                  jurisdiction, financial institution
                  and type of financial product.

                </FAQItem>

                <FAQItem question="Can I use my Saudi National Address to verify a forex account?">

                  Acceptance of an official
                  Saudi National Address document
                  depends on the financial
                  institution&apos;s verification
                  policy.

                  Applicants should confirm
                  whether the document is
                  accepted before submitting it.
                  A recent bank statement or
                  another approved proof-of-address
                  document may be required instead.

                </FAQItem>

                <FAQItem question="How long does it take to open and verify a forex account in Saudi Arabia?">

                  The timeframe depends on the
                  completeness of the application,
                  quality of the submitted documents
                  and applicable compliance
                  requirements.

                  Initial registration may be
                  completed quickly, while full
                  identity verification can take
                  longer if additional review
                  or documentation is required.

                </FAQItem>

                <FAQItem question="Can I open a forex account denominated in Saudi riyals (SAR)?">

                  This depends on the base
                  currencies supported by the
                  financial institution.

                  A forex broker accepting
                  deposits in Saudi riyals does
                  not necessarily offer a live
                  trading account with SAR as
                  its base currency.

                  Currency conversion fees may
                  apply when the deposit currency
                  differs from the account currency.

                </FAQItem>

                <FAQItem question="Is an FCA or ASIC license sufficient to offer forex trading services in Saudi Arabia?">

                  No. A foreign regulatory license,
                  including a license issued by
                  the UK Financial Conduct Authority
                  (FCA) or the Australian Securities
                  and Investments Commission (ASIC),
                  does not automatically authorize
                  a financial institution to provide
                  its services in Saudi Arabia.

                  The contracting legal entity,
                  scope of its license and
                  applicable local regulatory
                  approvals must be verified.

                </FAQItem>

                <FAQItem question="Are there any fees for opening a forex trading account?">

                  Account opening fees vary
                  between financial institutions.

                  Even when registration is
                  free, traders may incur costs
                  related to spreads, commissions,
                  overnight financing, currency
                  conversion, deposits, withdrawals
                  or account inactivity.

                </FAQItem>

              </div>

            </ArticleSection>

            {/* CONCLUSION */}

            <ArticleSection
              id="conclusion"
              eyebrow="Final Account Opening Checklist"
              title="What Should You Check Before Opening a Forex Trading Account in Saudi Arabia?"
            >

              <Paragraph>
                Opening a forex account in Saudi
                Arabia involves more than selecting
                a trading platform and completing
                an online registration form.
              </Paragraph>

              <Paragraph>
                Saudi citizens and expatriates
                should first verify the financial
                institution&apos;s authorization,
                identify the contracting legal
                entity and understand the legal
                and financial conditions applicable
                to their trading account.
              </Paragraph>

              <Paragraph>
                Applicants should also confirm
                which identity and residency
                documents are accepted, understand
                account verification requirements
                and review the applicable deposit,
                withdrawal and trading fee policies.
              </Paragraph>

              <Paragraph>
                If you are still comparing financial
                service providers, you can explore
                Broker Alarab&apos;s guide to the{" "}

                <Link
                  href={SAUDI_BROKERS_URL}
                  className="font-black text-[#176ac8] hover:underline"
                >
                  best forex brokers in Saudi Arabia
                </Link>

                {" "}to review broker features,
                account conditions and regulatory
                information.

                Always independently verify the
                required local authorization before
                making a financial decision.
              </Paragraph>

              <Note title="Forex Account Opening Checklist">

                <ArticleList
                  items={[
                    "Verify the financial institution's authorization and the scope of its permitted services.",

                    "Identify the legal entity responsible for your forex trading account.",

                    "Review the client agreement and financial risk disclosures.",

                    "Confirm that your Saudi National ID, Iqama or other identity documents are accepted.",

                    "Understand the minimum deposit, trading costs and withdrawal conditions.",

                    "Understand the financial risks of leveraged forex and CFD trading without relying on promises of guaranteed profits.",
                  ]}
                />

              </Note>

            </ArticleSection>

            {/* SOURCES */}

            <ArticleSection
              id="sources"
              eyebrow="Official Sources and Editorial References"
              title="Official Regulatory Sources and Forex Account Opening References"
            >

              <Paragraph>
                This guide was prepared using
                regulatory warnings and official
                registers published by Saudi
                financial authorities, together
                with an example of published
                identity and address verification
                requirements from a forex broker.
              </Paragraph>

              <Paragraph>
                The article distinguishes between
                commonly applied account opening
                requirements and the specific
                contractual and verification
                conditions of individual financial
                institutions.
              </Paragraph>

              <Paragraph>
                No individual identity document,
                payment method, minimum deposit
                requirement or account eligibility
                condition should be assumed to
                apply universally to every forex
                broker.
              </Paragraph>

              <div className="space-y-3">

                {sources.map((source, index) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-3 rounded-[12px] border border-slate-200 bg-[#f8fafc] p-3 transition hover:border-blue-300 hover:bg-blue-50 sm:p-4"
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf3ff] text-[11px] font-black text-[#176ac8]">

                      {String(index + 1).padStart(2, "0")}

                    </span>

                    <span className="min-w-0 flex-1 break-words text-[12px] font-bold leading-6 text-[#102747] group-hover:text-[#176ac8] sm:text-[14px]">

                      {source.title}

                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[#176ac8]"
                    >
                      ↗
                    </span>

                  </a>
                ))}

              </div>

              <Note title="Information and Editorial Update Policy">

                Financial regulations, broker
                licenses, account opening
                requirements and available
                payment methods may change
                over time.

                Readers should consult official
                regulatory registers and the
                financial institution&apos;s current
                contractual conditions before
                opening an account or transferring
                funds.

              </Note>

            </ArticleSection>

            {/* RELATED PAGES — INTERNAL LINKS */}

            <ImportantInternalLinks />

            {/* DISCLAIMER */}

            <div className="mt-8 rounded-[16px] border border-amber-200 bg-[#fffbef] p-4 sm:p-6">

              <h2 className="text-[15px] font-black text-amber-900">

                Financial Disclaimer and Forex Trading Risk Warning

              </h2>

              <p className="mt-2 text-[12px] leading-[2] text-slate-700 sm:text-[14px]">

                This content is provided for
                informational and educational
                purposes only. It does not
                constitute financial advice,
                legal advice or a recommendation
                to open an account with any
                particular financial institution.

                Leveraged forex and CFD trading
                involves a high level of risk
                and may result in the loss of
                invested capital.

                Verify all applicable regulatory
                licenses and local authorizations
                before dealing with any provider
                of financial trading services.

              </p>

              <p className="mt-3 text-[11px] leading-7 text-slate-600 sm:text-[12px]">

                Broker Alarab may receive
                commercial compensation from
                certain partners when readers
                use referral links available
                on the website.

                A commercial relationship does
                not establish regulatory
                authorization or guarantee that
                a financial product is suitable
                for an individual investor.

              </p>

            </div>

            {/* ARTICLE FOOTER */}

            <footer className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="text-[13px] font-black text-[#102747]">

                  Broker Alarab Team

                </div>

                <p className="mt-1 text-[11px] leading-6 text-slate-500">

                  Forex and CFD broker reviews,
                  trading account comparisons
                  and specialized financial guides.

                </p>

              </div>

              <Link
                href="/en/how-we-review-brokers"
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-blue-200 bg-[#f1f7ff] px-5 py-2 text-[12px] font-black text-[#155da9] transition hover:bg-blue-100"
              >

                How We Review Forex Brokers

                <span
                  className="ml-2"
                  aria-hidden="true"
                >
                  →
                </span>

              </Link>

                        </footer>

    </ArticleLayout>

  );

}

/* =========================================================
   END OF ENGLISH SAUDI ARABIA ARTICLE
========================================================= */