import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* =========================================================
   BROKER ALARAB
   ARTICLE PAGE — OPEN FOREX ACCOUNT IN KUWAIT
   English Version / Next.js App Router
   ========================================================= */

const SITE = "https://brokeralarab.com";

const SLUG = "open-forex-account-kuwait";

const PATH = `/en/articles/${SLUG}`;

const URL = `${SITE}${PATH}`;

const ARABIC_URL =
  `${SITE}/articles/${SLUG}`;

const ARTICLE = {
  title:
    "How to Open a Forex Account in Kuwait – Requirements and Registration Steps",

  seoTitle:
    "Open a Forex Account in Kuwait | Requirements & Registration",

  titleMain:
    "How to Open a Forex Account in Kuwait",

  titleHighlight:
    "Requirements and Registration Steps",

  description:
    "Learn how to open a forex account in Kuwait, including Civil ID requirements, registration for expats, address verification, KWD payments and broker licensing.",

  category: "Trading Articles & Guides",

  subcategory: "Trading in Kuwait",

  articleType: "Account Opening Guide",

  breadcrumb: "Open a Forex Account in Kuwait",

  publisher: "Broker Alarab",

  published: "2026-11-25",

  modified: "2026-11-25",

  heroAlt:
    "Forex account opening guide in Kuwait covering Civil ID, residency documents and identity verification requirements",

  heroCaption:
    "Illustration of forex account registration and identity verification requirements for Kuwaiti citizens and residents.",
};

const HERO_IMAGE =
  "/articles/open-forex-account-kuwait.webp";

const ARTICLE_READY = true;
const HERO_IMAGE_READY = true;
const ARABIC_VERSION_READY = true;

const KUWAIT_BROKERS_URL =
  "/en/best-brokers/kuwait";

const ARTICLE_KEYWORDS = [
  "open forex account in Kuwait",
  "forex account opening Kuwait",
  "forex trading account Kuwait",
  "forex account requirements Kuwait",
  "forex trading for expats in Kuwait",
  "open trading account with Kuwait Civil ID",
  "Kuwait forex account verification",
  "Kuwait Mobile ID forex verification",
  "proof of address for forex account Kuwait",
  "forex account in Kuwaiti dinar",
  "KWD trading account",
  "forex deposits from Kuwait",
  "KNET forex deposits",
  "Islamic forex account Kuwait",
  "forex broker licensing Kuwait",
];

export const metadata: Metadata = {
  title: ARTICLE.seoTitle,

  description: ARTICLE.description,

  alternates: {
    canonical: URL,

    languages: {
      en: URL,

      ...(ARABIC_VERSION_READY
        ? {
            ar: ARABIC_URL,
          }
        : {}),
    },
  },

  openGraph: {
    type: "article",

    url: URL,

    title: ARTICLE.title,

    description: ARTICLE.description,

    siteName: "Broker Alarab",

    locale: "en_US",

    ...(ARABIC_VERSION_READY
      ? { alternateLocale: ["ar_KW"] }
      : {}),

    publishedTime: ARTICLE.published,

    modifiedTime: ARTICLE.modified,

    section: ARTICLE.subcategory,

    tags: ARTICLE_KEYWORDS,

    images: HERO_IMAGE_READY
      ? [
          {
            url: `${SITE}${HERO_IMAGE}`,

            width: 1774,

            height: 887,

            alt: ARTICLE.heroAlt,
          },
        ]
      : [],
  },

  twitter: {
    card: HERO_IMAGE_READY
      ? "summary_large_image"
      : "summary",

    title: ARTICLE.seoTitle,

    description: ARTICLE.description,

    images: HERO_IMAGE_READY
      ? [`${SITE}${HERO_IMAGE}`]
      : [],
  },

  robots: {
    index: ARTICLE_READY,

    follow: true,

    googleBot: {
      index: ARTICLE_READY,

      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   ARTICLE DATA
   ========================================================= */

const contents = [
  {
    id: "before-opening",
    label: "Before Opening a Forex Account",
  },
  {
    id: "local-vs-international",
    label: "Local Investing vs International Forex",
  },
  {
    id: "kuwait-regulation",
    label: "Legal Status and Regulation",
  },
  {
    id: "license-check",
    label: "How to Verify a Broker",
  },
  {
    id: "kuwaiti-citizens",
    label: "Accounts for Kuwaiti Citizens",
  },
  {
    id: "kuwait-residents",
    label: "Accounts for Expats and Residents",
  },
  {
    id: "civil-id",
    label: "Civil ID and Kuwait Mobile ID",
  },
  {
    id: "address-verification",
    label: "Proof of Address in Kuwait",
  },
  {
    id: "kuwait-top-five",
    label: "Compare Leading Broker Accounts",
  },
  {
    id: "account-selection",
    label: "Choosing a Trading Account",
  },
  {
    id: "registration-steps",
    label: "Registration and Verification Steps",
  },
  {
    id: "kwd-account",
    label: "KWD and USD Trading Accounts",
  },
  {
    id: "kuwait-payments",
    label: "KNET and Bank Payments",
  },
  {
    id: "islamic-account",
    label: "Islamic Trading Accounts",
  },
  {
    id: "registration-problems",
    label: "Registration and Verification Issues",
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
    label: "Official Kuwaiti Sources",
  },
];

const registrationSteps = [
  {
    title: "Identify the Financial Product",

    description:
      "Determine whether you want to invest in listed securities or trade currencies and CFDs. The product determines the relevant licensing and account requirements.",
  },
  {
    title: "Verify the Legal Entity",

    description:
      "Check the registered company name, permitted activities and applicable regulatory approvals for providing financial services in Kuwait.",
  },
  {
    title: "Check Your Civil ID",

    description:
      "Ensure your Civil ID is valid and your personal details match official records, particularly if you have recently changed your residential address.",
  },
  {
    title: "Confirm Nationality and Residency",

    description:
      "Enter your actual nationality and select Kuwait as your country of residence if you live there. Review eligibility requirements applicable to your circumstances.",
  },
  {
    title: "Complete Identity Verification",

    description:
      "Submit the documents accepted by the financial institution and confirm whether Civil ID, passport or digital identification can be used.",
  },
  {
    title: "Review Currency and Payment Options",

    description:
      "Check the account base currency, KWD conversion costs, accepted payment methods and withdrawal conditions before transferring funds.",
  },
];

const requiredDocuments = [
  {
    title: "Kuwait Civil ID",

    detail:
      "A valid Civil ID for a Kuwaiti citizen or resident, provided it is accepted by the financial institution as proof of identity.",
  },
  {
    title: "Passport",

    detail:
      "A valid passport may be requested to establish nationality and confirm the English spelling of your legal name, especially for expatriates.",
  },
  {
    title: "Residency Information",

    detail:
      "Evidence of legal residence in Kuwait when required by the institution or relevant regulatory requirements.",
  },
  {
    title: "Proof of Residential Address",

    detail:
      "A recent accepted document showing your actual address in Kuwait, such as an eligible bank statement or government-issued document.",
  },
  {
    title: "Personal Payment Method",

    detail:
      "An eligible bank account or payment method registered in your own name, subject to institutional and banking restrictions.",
  },
  {
    title: "Employment and Financial Information",

    detail:
      "Information about occupation, income, source of funds and investment experience when requested for compliance purposes.",
  },
];

const accountTypes = [
  {
    name: "Standard Account",

    nameEn: "Spread-Based Trading",

    abbreviation: "STD",

    description:
      "A live trading account where costs are commonly incorporated into the spread. Conditions may differ between legal entities operating under the same broker brand.",

    consideration:
      "Review the overall cost, including currency conversion from Kuwaiti dinars, spreads and the advertised minimum deposit.",

    href: "/en/best-brokers/accounts/standard",

    linkLabel:
      "Compare Standard Account Brokers",
  },
  {
    name: "Cent Account",

    nameEn: "Smaller Trading Units",

    abbreviation: "CENT",

    description:
      "A live trading account where balances are commonly displayed in cents. Contract sizes and available instruments depend on the broker.",

    consideration:
      "Check actual contract sizes, account currency and whether the account is available to residents of Kuwait.",

    href: "/en/best-brokers/accounts/cent",

    linkLabel:
      "Compare Cent Account Brokers",
  },
  {
    name: "Raw Spread Account",

    nameEn: "Spread and Commission Pricing",

    abbreviation: "RAW",

    description:
      "A trading account that typically combines lower spreads with separate trading commissions. Minimum funding requirements may differ from standard accounts.",

    consideration:
      "Compare the combined cost of spreads, commissions and currency conversion rather than relying solely on advertised spreads.",

    href: "/en/best-brokers/accounts/raw-spread",

    linkLabel:
      "Compare Raw Spread Brokers",
  },
  {
    name: "ECN Account",

    nameEn: "Electronic Execution Model",

    abbreviation: "ECN",

    description:
      "An account associated with an electronic order execution model, potentially sharing some characteristics with raw spread accounts.",

    consideration:
      "Examine execution policies, commissions and the responsible legal entity. The ECN label alone does not establish actual execution conditions.",

    href: null,

    linkLabel: null,
  },
];

/* =========================================================
   OFFICIAL SOURCES
   ========================================================= */

const sources = [
  {
    title:
      "Kuwait Capital Markets Authority — Licensed Companies",

    url:
      "https://www.cma.gov.kw/ar/web/cma/licensed-companies",
  },
  {
    title:
      "Kuwait Capital Markets Authority — Unlicensed Companies and Entities",

    url:
      "https://cma.gov.kw/ar/web/cma/Unlicensed-Companies",
  },
  {
    title:
      "Capital Markets Authority — Circular on Client Nationality and Legal Residency Verification",

    url:
      "https://cma.gov.kw/en/web/cma/cma-board-releases/resolutions-and-regulations/-/cmaboardreleases/detail/1106237",
  },
  {
    title:
      "Central Bank of Kuwait — Supervisory Frequently Asked Questions",

    url:
      "https://www.cbk.gov.kw/ar/supervision/faq",
  },
  {
    title:
      "Public Authority for Civil Information — Kuwait Mobile ID",

    url:
      "https://hawyti.paci.gov.kw/",
  },
  {
    title:
      "Public Authority for Civil Information — Applications and Civil Information Services",

    url:
      "https://services.paci.gov.kw/applications-guide",
  },
  {
    title:
      "Kuwait Mobile ID — Integrated Service Providers",

    url:
      "https://hawyti.paci.gov.kw/Arabic/ServiceProviders.aspx",
  },
];

/* =========================================================
   SHARED ARTICLE DESIGN COMPONENTS
   English / LTR
   ========================================================= */

function ArticleSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-slate-100 py-5 last:border-0 sm:py-7"
    >
      {eyebrow && (
        <span className="mb-2 block text-[11px] font-extrabold text-[#176ac8] sm:text-xs">
          {eyebrow}
        </span>
      )}

      <h2 className="border-l-[4px] border-[#2587e7] pl-3 text-[22px] font-black leading-[1.5] tracking-tight text-[#101d35] sm:pl-4 sm:text-[29px]">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-[14px] leading-[2.05] text-slate-700 sm:text-[16px] sm:leading-[2]">
        {children}
      </div>
    </section>
  );
}

function SubHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h3 className="!mt-8 text-[17px] font-black leading-[1.7] text-[#102a4a] sm:text-[20px]">
      {children}
    </h3>
  );
}

function Paragraph({
  children,
}: {
  children: ReactNode;
}) {
  return <p>{children}</p>;
}

function Strong({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <strong className="font-black text-[#11294b]">
      {children}
    </strong>
  );
}

function ArticleList({
  items,
}: {
  items: ReactNode[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3"
        >
          <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#2587e7]" />

          <span className="min-w-0 flex-1">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Note({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "amber";
}) {
  const amber = tone === "amber";

  return (
    <aside
      className={`!my-5 rounded-[15px] border p-4 sm:p-5 ${
        amber
          ? "border-amber-200 bg-[#fffbef]"
          : "border-blue-100 bg-[#f1f7fe]"
      }`}
    >
      <div
        className={`text-[13px] font-black sm:text-[15px] ${
          amber
            ? "text-amber-900"
            : "text-[#10549f]"
        }`}
      >
        {title}
      </div>

      <div className="mt-2 text-[13px] leading-[2] text-slate-700 sm:text-[14px]">
        {children}
      </div>
    </aside>
  );
}

/* =========================================================
   ARTICLE HERO IMAGE
   ========================================================= */

function ArticleHeroImage() {
  if (!HERO_IMAGE_READY) {
    return null;
  }

  return (
    <figure className="mt-6 sm:mt-8">

      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[#071a31] shadow-[0_12px_35px_rgba(15,23,42,0.10)] sm:rounded-[22px]">

        <Image
          src={HERO_IMAGE}
          alt={ARTICLE.heroAlt}
          fill
          priority
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, (max-width: 1520px) 92vw, 1440px"
          className="object-cover object-center"
        />

      </div>

      <figcaption className="mt-2 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
        {ARTICLE.heroCaption}
      </figcaption>

    </figure>
  );
}

/* =========================================================
   TABLE OF CONTENTS
   ========================================================= */

function TableOfContents() {
  return (
    <>
      {/* MOBILE */}

      <nav
        aria-label="Mobile article contents"
        className="my-5 sm:hidden"
      >
        <details className="group overflow-hidden rounded-[16px] border border-[#dce6f2] bg-white shadow-sm">

          <summary className="flex min-h-[65px] cursor-pointer list-none items-center gap-3 px-3.5 py-3 [&::-webkit-details-marker]:hidden">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3ff] text-[#176ac8]">

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
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M3 6h.01" />
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
              </svg>

            </span>

            <span className="min-w-0 flex-1">

              <span className="block text-[14px] font-black text-[#102747]">
                Table of Contents
              </span>

              <span className="mt-0.5 block text-[10px] text-slate-500">
                {contents.length} sections • Tap to explore
              </span>

            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-[#f5f9ff] text-[#176ac8] transition-transform group-open:rotate-180">

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>

            </span>

          </summary>

          <div className="border-t border-slate-100 bg-[#f8fbff] p-2.5">

            <div className="grid grid-cols-2 gap-2">

              {contents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex min-h-[45px] min-w-0 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-left transition active:bg-blue-50"
                >

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf3ff] text-[9px] font-black text-[#176ac8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1 text-[10px] font-extrabold leading-4 text-[#243b57]">
                    {item.label}
                  </span>

                </a>
              ))}

            </div>

          </div>

        </details>
      </nav>

      {/* DESKTOP / TABLET */}

      <nav
        aria-label="Article table of contents"
        className="my-6 hidden overflow-hidden rounded-[20px] border border-[#dce6f2] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:block"
      >

        <div className="flex items-center justify-between gap-3 border-b border-[#e5edf6] bg-[linear-gradient(90deg,#f3f8ff_0%,#ffffff_100%)] px-6 py-5">

          <div>

            <h2 className="text-[19px] font-black text-[#102747]">
              Table of Contents
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Jump directly to the section you need
            </p>

          </div>

          <span className="rounded-full border border-blue-100 bg-[#eaf3ff] px-3 py-1.5 text-[11px] font-black text-[#1765b5]">
            {contents.length} topics
          </span>

        </div>

        <div className="grid grid-cols-2 gap-2.5 p-5 xl:grid-cols-3">

          {contents.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex min-h-[54px] min-w-0 items-center gap-3 rounded-[12px] border border-[#e8eef6] bg-[#f8fafc] px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#aacdf4] hover:bg-[#edf6ff]"
            >

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-[11px] font-black text-[#176ac8] shadow-sm ring-1 ring-[#e2ebf6] transition group-hover:bg-[#176ac8] group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1 text-[12px] font-extrabold leading-5 text-[#243b57] group-hover:text-[#176ac8]">
                {item.label}
              </span>

              <span className="text-[#9aacc2] group-hover:text-[#176ac8]">
                ›
              </span>

            </a>
          ))}

        </div>

      </nav>
    </>
  );
}

/* =========================================================
   ARTICLE DATA TABLE
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
   REGISTRATION STEPS
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
   REQUIRED DOCUMENTS
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
                <rect x="4" y="3" width="16" height="18" rx="2" />
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
   ACCOUNT TYPES GRID
   ========================================================= */

function AccountTypesGrid() {
  return (
    <div className="!my-7 grid grid-cols-1 auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4">

      {accountTypes.map((account) => (
        <div
          key={account.nameEn}
          className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[17px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-md sm:p-5"
        >

          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176ac8] via-[#38bdf8] to-transparent" />

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

              <p className="mt-0.5 text-left text-[10px] font-bold text-[#176ac8] sm:text-[12px]">
                {account.nameEn}
              </p>

            </div>

          </div>

          <p className="mt-4 flex-1 text-[13px] leading-[1.95] text-slate-600 sm:text-[14px]">
            {account.description}
          </p>

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

function FAQItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 py-5 first:pt-0 last:border-0 last:pb-0">

      <h3 className="text-[15px] font-black leading-7 text-[#102747] sm:text-[17px]">
        {question}
      </h3>

      <div className="mt-2 text-[13px] leading-[2] text-slate-600 sm:text-[15px]">
        {children}
      </div>

    </div>
  );
}


/* =========================================================
   KUWAIT BROKERS — DATABASE TYPES
   ========================================================= */

type KuwaitArticleBroker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  is_full_review: boolean | null;
  publication_status: string | null;
  min_deposit: number | null;
  platforms: string | null;
};

type KuwaitArticleRanking = {
  id: number;
  rank_position: number;
  country_rating: number | null;
  brokers:
    | KuwaitArticleBroker
    | KuwaitArticleBroker[]
    | null;
};

function normalizeKuwaitBroker(
  value:
    | KuwaitArticleBroker
    | KuwaitArticleBroker[]
    | null
): KuwaitArticleBroker | null {
  if (!value) return null;

  return Array.isArray(value)
    ? value[0] ?? null
    : value;
}

/* =========================================================
   GET KUWAIT BROKERS
   Shared country ranking for AR and EN
   ========================================================= */

async function getKuwaitArticleBrokers(): Promise<
  KuwaitArticleRanking[]
> {
  const supabase = await createClient();

  const { data: country, error: countryError } =
    await supabase
      .from("country_pages")
      .select("id")
      .eq("slug", "kuwait")
      .eq("ar_enabled", true)
      .maybeSingle();

  if (countryError || !country) {
    console.error(
      "[Kuwait Article EN] Country:",
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
        publication_status,
        min_deposit,
        platforms
      )
    `)
    .eq("country_id", country.id)
    .order("rank_position", {
      ascending: true,
    });

  if (error) {
    console.error(
      "[Kuwait Article EN] Broker rankings:",
      error.message
    );

    return [];
  }

  const rankings =
    (data || []) as KuwaitArticleRanking[];

  const seenBrokerIds = new Set<number>();

  return rankings
    .filter((row) => {
      const broker =
        normalizeKuwaitBroker(row.brokers);

      if (
        !broker ||
        broker.is_full_review !== true ||
        broker.publication_status !== "published" ||
        !broker.slug ||
        seenBrokerIds.has(broker.id)
      ) {
        return false;
      }

      seenBrokerIds.add(broker.id);

      return true;
    })
    .slice(0, 5);
}

/* =========================================================
   KUWAIT BROKER — DISPLAY HELPERS
   ========================================================= */

function getKuwaitBrokerDisplay(
  row: KuwaitArticleRanking
) {
  const broker =
    normalizeKuwaitBroker(row.brokers);

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

  const ratingLabel =
    row.country_rating !== null
      ? "Kuwait Rating"
      : "Overall Rating";

  return {
    broker,
    ratingText,
    ratingLabel,
    deposit,
    platforms,
    reviewUrl,
  };
}

/* =========================================================
   KUWAIT ARTICLE BROKER CARD
   ========================================================= */

function KuwaitArticleBrokerCard({
  row,
}: {
  row: KuwaitArticleRanking;
}) {
  const display =
    getKuwaitBrokerDisplay(row);

  if (!display) {
    return null;
  }

  const {
    broker,
    ratingText,
    ratingLabel,
    deposit,
    platforms,
    reviewUrl,
  } = display;

  return (
    <div className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-md sm:p-5">

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

              {ratingText}
            </span>

            <span className="text-[10px] font-bold text-slate-500">
              {ratingLabel}
            </span>

          </div>

        </div>

      </div>

      {/* ACCOUNT DETAILS */}

      <div className="mt-4 grid grid-cols-2 gap-2.5">

        <div className="flex min-w-0 flex-col items-center justify-center rounded-[11px] border border-slate-200 bg-[#f5f8fc] px-2 py-3 text-center">

          <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
            Advertised Min. Deposit
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
          Review account requirements, accepted identity
          documents and the responsible legal entity
          before submitting an application from Kuwait.
        </p>

      </div>

      {/* BROKER REVIEW */}

      <div className="mt-4">

        <Link
          href={reviewUrl}
          className="inline-flex min-h-[45px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#176ac8] px-3 py-2.5 text-center text-[12px] font-black text-white transition hover:bg-[#10549f] sm:text-[13px]"
        >
          Broker Review & Account Details

          <span aria-hidden="true">→</span>
        </Link>

      </div>

    </div>
  );
}

/* =========================================================
   KUWAIT FEATURED BROKERS — TOP THREE
   ========================================================= */

function KuwaitBrokerComparison({
  rankings,
}: {
  rankings: KuwaitArticleRanking[];
}) {
  const brokers =
    rankings.slice(0, 3);

  return (
    <aside
      id="kuwait-broker-comparison"
      aria-label="Forex brokers and account opening requirements in Kuwait"
      className="relative !my-7 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:!my-9 sm:rounded-[24px]"
    >

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(90deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-6 sm:py-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
              Kuwait Forex Trading Guide
            </span>

            <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">
              Forex Brokers and Account Opening Requirements in Kuwait
            </h2>

            <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[13px]">
              Explore brokers featured in Broker Alarab&apos;s
              Kuwait rankings and review their ratings,
              trading platforms and account requirements.
            </p>

          </div>

          <Link
            href={KUWAIT_BROKERS_URL}
            className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-[11px] border border-blue-200 bg-white px-4 py-2.5 text-[11px] font-black text-[#176ac8] shadow-sm transition hover:bg-blue-50"
          >
            View Full Comparison

            <span aria-hidden="true">→</span>
          </Link>

        </div>

      </div>

      {brokers.length > 0 ? (

        <div className="grid grid-cols-1 auto-rows-fr gap-3 p-3 sm:gap-4 sm:p-5 lg:grid-cols-3">

          {brokers.map((row) => (
            <KuwaitArticleBrokerCard
              key={row.id}
              row={row}
            />
          ))}

        </div>

      ) : (

        <div className="p-5 text-center text-[13px] text-slate-600">

          <Link
            href={KUWAIT_BROKERS_URL}
            className="font-black text-[#176ac8] hover:underline"
          >
            Explore Forex Brokers in Kuwait
          </Link>

        </div>

      )}

      <div className="border-t border-[#d7e5f4] bg-white/70 px-4 py-3 sm:px-6">

        <p className="text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          Brokers are displayed according to Broker Alarab&apos;s
          Kuwait rankings. Inclusion does not establish
          local regulatory authorization. Account conditions
          may vary by legal entity and country of residence.
          Broker Alarab may receive commercial compensation
          from certain partners.
        </p>

      </div>

    </aside>
  );
}

/* =========================================================
   KUWAIT TOP FIVE — COMPACT BROKER COMPARISON
   ========================================================= */

function KuwaitTopFiveBrokers({
  rankings,
}: {
  rankings: KuwaitArticleRanking[];
}) {
  const brokers =
    rankings.slice(0, 5);

  return (
    <section
      id="kuwait-top-five"
      aria-label="Compare leading forex broker accounts in Kuwait"
      className="relative !my-9 scroll-mt-24 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:!my-12 sm:rounded-[24px]"
    >

      <div className="border-b border-[#d7e5f4] bg-[linear-gradient(90deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-6 sm:py-6">

        <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
          Trading Account Comparison
        </span>

        <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">
          Compare Leading Forex Broker Accounts in Kuwait
        </h2>

        <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[14px]">
          After reviewing Civil ID, residency and address
          verification requirements, compare advertised
          deposits, platforms and ratings for brokers
          featured in our Kuwait rankings.
        </p>

      </div>

      {brokers.length > 0 ? (

        <div className="space-y-2.5 p-3 sm:space-y-3 sm:p-5">

          {brokers.map((row) => {
            const display =
              getKuwaitBrokerDisplay(row);

            if (!display) {
              return null;
            }

            const {
              broker,
              ratingText,
              ratingLabel,
              deposit,
              platforms,
              reviewUrl,
            } = display;

            return (
              <div
                key={row.id}
                className="group relative grid min-w-0 grid-cols-1 gap-3 overflow-hidden rounded-[14px] border border-slate-200 bg-[#f8fbff] p-3 transition hover:border-blue-300 hover:bg-white hover:shadow-sm lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-4 sm:p-4"
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

                <div className="grid grid-cols-3 gap-2 lg:contents">

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
                      {ratingLabel}
                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 inline-flex items-center gap-1 text-[13px] font-black text-amber-700 sm:text-[16px]"
                    >
                      <span aria-hidden="true">★</span>

                      {ratingText}
                    </span>

                  </div>

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">

                    <span className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
                      Advertised Min. Deposit
                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 break-words text-[13px] font-black text-[#102747] sm:text-[16px]"
                    >
                      {deposit}
                    </span>

                  </div>

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[9px] border border-slate-200 bg-white px-2 py-2 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">

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

                {/* REVIEW BUTTON */}

                <Link
                  href={reviewUrl}
                  className="inline-flex min-h-[42px] w-full shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-4 py-2.5 text-center text-[11px] font-black text-white transition hover:bg-[#10549f] lg:w-auto sm:text-[12px]"
                >
                  Read Review

                  <span aria-hidden="true">→</span>
                </Link>

              </div>
            );
          })}

        </div>

      ) : (

        <div className="p-5 text-center text-[13px] text-slate-600">
          Explore the full Kuwait broker comparison
          for ratings and account information.
        </div>

      )}

      <div className="border-t border-[#d7e5f4] bg-[#f5f9ff] p-3 sm:p-5">

        <Link
          href={KUWAIT_BROKERS_URL}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#bdd8f5] bg-white px-4 py-3 text-center text-[12px] font-black text-[#176ac8] transition hover:border-[#176ac8] hover:bg-[#176ac8] hover:text-white sm:text-[14px]"
        >
          View Full Comparison of the Best Forex Brokers in Kuwait

          <span aria-hidden="true">→</span>
        </Link>

        <p className="mt-3 text-center text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          Rankings are based on Broker Alarab&apos;s
          Kuwait comparison. Advertised minimum deposits
          reflect general broker information and may
          differ for Kuwait residents. Inclusion does
          not establish local authorization.
          Commercial compensation may be received
          from certain partners.
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
        "Explore detailed broker reviews, ratings, regulation, trading costs and account requirements.",
    },
    {
      number: "02",
      href: "/en/best-brokers",
      title: "Best Forex Brokers",
      description:
        "Discover broker rankings by financial markets, account types and trading requirements.",
    },
    {
      number: "03",
      href: KUWAIT_BROKERS_URL,
      title: "Best Forex Brokers in Kuwait",
      description:
        "Explore our Kuwait-specific broker comparison, including ratings, platforms, account requirements and trading costs.",
    },
    {
      number: "04",
      href: "/en/compare",
      title: "Compare Forex Brokers",
      description:
        "Compare forex brokers by regulation, trading platforms, costs and trading conditions.",
    },
    {
      number: "05",
      href: "/en/compare-accounts",
      title: "Compare Trading Accounts",
      description:
        "Compare Standard, Cent and Raw Spread accounts and review their individual specifications.",
    },
    {
      number: "06",
      href: "/en/licenses",
      title: "Forex Broker Regulation",
      description:
        "Explore financial regulators, licensing requirements and different levels of regulatory protection.",
    },
  ];

  return (
    <section
      id="related-pages"
      aria-label="Related forex trading pages and guides"
      className="!my-9 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-sm sm:!my-12 sm:rounded-[24px]"
    >

      <div className="border-b border-[#d7e5f4] bg-[linear-gradient(90deg,#eaf3ff_0%,#ffffff_100%)] px-4 py-5 sm:px-7 sm:py-7">

        <span className="text-[11px] font-black text-[#176ac8] sm:text-[12px]">
          Explore More on Broker Alarab
        </span>

        <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">
          Useful Resources Before Opening a Trading Account
        </h2>

        <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:text-[14px]">
          Explore broker reviews, comparisons, account
          types and licensing information to make
          a more informed decision.
        </p>

      </div>

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
   STRUCTURED DATA
   ========================================================= */

function ArticleStructuredData() {
  if (!ARTICLE_READY) {
    return null;
  }

  const articleJsonLd = {
    "@context": "https://schema.org",

    "@type": "Article",

    "@id": `${URL}#article`,

    headline: ARTICLE.title,

    description: ARTICLE.description,

    url: URL,

    inLanguage: "en",

    datePublished: ARTICLE.published,

    dateModified: ARTICLE.modified,

    articleSection: ARTICLE.subcategory,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": URL,
    },

    ...(HERO_IMAGE_READY
      ? {
          image: {
            "@type": "ImageObject",
            url: `${SITE}${HERO_IMAGE}`,
            width: 1774,
            height: 887,
          },
        }
      : {}),

    author: {
      "@type": "Organization",
      name: ARTICLE.publisher,
      url: `${SITE}/en`,
    },

    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: SITE,
    },

    isPartOf: {
      "@type": "WebSite",
      name: "Broker Alarab",
      url: SITE,
    },

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
        name: "Kuwait Civil ID",
      },
      {
        "@type": "Thing",
        name: "Kuwait Mobile ID",
      },
      {
        "@type": "Thing",
        name: "Kuwaiti Dinar",
      },
      {
        "@type": "Thing",
        name: "Financial Regulation in Kuwait",
      },
    ],

    spatialCoverage: {
      "@type": "Country",
      name: "Kuwait",
    },

    citation: sources.map((source) => ({
      "@type": "CreativeWork",
      name: source.title,
      url: source.url,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",

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
        name: ARTICLE.breadcrumb,
        item: URL,
      },
    ],
  };

  const serialize = (value: unknown) =>
    JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialize(articleJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialize(breadcrumbJsonLd),
        }}
      />
    </>
  );
}

/* =========================================================
   MAIN ARTICLE PAGE
   ========================================================= */

export default async function OpenForexAccountKuwaitPage() {
  const kuwaitBrokers =
    await getKuwaitArticleBrokers();

  return (
    <main
      dir="ltr"
      lang="en"
      className="min-h-screen overflow-x-clip bg-[#f5f7fb] text-slate-900"
    >

      <ArticleStructuredData />

      {/* ARTICLE HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1520px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-9">

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 sm:text-[12px]"
          >

            <Link
              href="/en"
              className="transition hover:text-blue-600"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <span>{ARTICLE.category}</span>

            <span aria-hidden="true">/</span>

            <span className="text-[#145ca8]">
              {ARTICLE.breadcrumb}
            </span>

          </nav>

          {/* CATEGORY */}

          <div className="mt-6 flex flex-wrap items-center gap-2">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf3ff] px-3 py-1.5 text-[10px] font-black text-[#1765b5] sm:text-[11px]">

              <span
                aria-hidden="true"
                className="text-[16px]"
              >
                🇰🇼
              </span>

              {ARTICLE.subcategory}

            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">
              {ARTICLE.articleType}
            </span>

          </div>

          {/* H1 */}

          <h1 className="mt-5 w-full max-w-full whitespace-normal break-words text-[27px] font-black leading-[1.4] tracking-[-0.025em] text-[#0c1e38] sm:text-[34px] lg:text-[clamp(29px,3vw,48px)]">

            {ARTICLE.titleMain}{" – "}

            <span className="text-[#176ac8]">
              {ARTICLE.titleHighlight}
            </span>

          </h1>

          <p className="mt-4 w-full text-[14px] leading-[2] text-slate-600 sm:text-[17px] sm:leading-[1.9]">
            {ARTICLE.description}
          </p>

          {/* AUTHOR AND DATE */}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-500 sm:text-[12px]">

            <span>
              Prepared by:{" "}

              <strong className="text-[#102747]">
                Broker Alarab Editorial Team
              </strong>

            </span>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <time dateTime={ARTICLE.modified}>

              Last updated:{" "}

              {new Intl.DateTimeFormat("en-US", {
                calendar: "gregory",
                numberingSystem: "latn",
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(ARTICLE.modified))}

            </time>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <span>{ARTICLE.articleType}</span>

          </div>

          <ArticleHeroImage />

        </div>

      </header>

      {/* ARTICLE BODY */}

      <div className="mx-auto max-w-[1520px] px-3 py-6 sm:px-6 sm:py-10">

        <article className="overflow-hidden rounded-[19px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.035)] sm:rounded-[24px]">

          <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-12">

            {/* INTRODUCTION */}

<div className="space-y-4 text-[14px] leading-[2.1] text-slate-700 sm:text-[16px] sm:leading-[2]">

  <Paragraph>
    Opening a forex account in Kuwait involves more than
    choosing a broker and completing an online registration
    form. Kuwaiti citizens and expatriates need to consider
    Civil ID requirements, residency verification,
    accepted proof of address, account currencies and
    the regulatory status of the financial service provider.
  </Paragraph>

  <Paragraph>
    This guide by the{" "}
    <Strong>Broker Alarab</Strong>{" "}
    editorial team explains how forex account registration
    works for Kuwait residents, including the potential use
    of Kuwait Mobile ID, funding accounts in Kuwaiti dinars
    and the differences between local investment services
    and international forex platforms.
  </Paragraph>

</div>

{/* FEATURED KUWAIT BROKERS */}

<KuwaitBrokerComparison rankings={kuwaitBrokers} />

{/* TABLE OF CONTENTS */}

<TableOfContents />

{/* BEFORE OPENING */}

<ArticleSection
  id="before-opening"
  eyebrow="Kuwait Forex Account Guide"
  title="What Do You Need Before Opening a Forex Account in Kuwait?"
>

  <Paragraph>
    Before submitting an application to a forex broker,
    identify the financial product you intend to trade.
    An account used to purchase securities listed on
    Boursa Kuwait differs from an account designed
    for leveraged currency trading or contracts for
    difference through an online platform.
  </Paragraph>

  <Paragraph>
    Both Kuwaiti citizens and expatriates should review
    account eligibility, identification requirements
    and whether the institution is authorized to provide
    the relevant financial service in Kuwait.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "Before Registration",
      "What to Check",
    ]}
    rows={[
      [
        "Financial Product",
        "Determine whether you intend to purchase actual securities or trade derivative contracts such as CFDs.",
      ],
      [
        "Nationality and Residency",
        "Provide your actual nationality and country of residence.",
      ],
      [
        "Kuwait Civil ID",
        "Check document validity and ensure the information matches official records.",
      ],
      [
        "Legal Entity",
        "Identify the company that will be named in your client agreement.",
      ],
      [
        "Account Currency",
        "Check whether KWD or other base currencies are supported.",
      ],
      [
        "Regulatory Authorization",
        "Verify the license scope and applicable approvals for the financial activity.",
      ],
    ]}
    caption="A preliminary checklist for individuals considering opening a trading account from Kuwait."
  />

  <Note
    title="Kuwait appearing in a registration form does not establish local authorization"
    tone="amber"
  >
    A broker accepting a Kuwaiti telephone number or
    residential address is not necessarily authorized
    to provide financial services in Kuwait. Verify
    the responsible legal entity and its permitted
    activities independently.
  </Note>

</ArticleSection>

{/* LOCAL VS INTERNATIONAL */}

<ArticleSection
  id="local-vs-international"
  eyebrow="Understanding Financial Services"
  title="Local Investment Accounts vs International Forex Accounts in Kuwait"
>

  <Paragraph>
    The term trading account can refer to several
    different financial services in Kuwait. Some investors
    want access to locally listed shares, while others
    are interested in trading EUR/USD, gold or other
    instruments through contracts for difference.
  </Paragraph>

  <Paragraph>
    These services should not be treated as interchangeable.
    Their ownership structures, contract specifications,
    execution methods, risks and regulatory requirements
    can differ substantially.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "Account or Service",
      "Primary Purpose",
    ]}
    rows={[
      [
        "Local Securities Account",
        "Buying and selling securities listed on the domestic exchange under applicable market rules.",
      ],
      [
        "International Investment Account",
        "Accessing foreign securities or other financial instruments within the authorized scope of the provider.",
      ],
      [
        "Forex and CFD Account",
        "Exposure to changes in currency and asset prices, potentially through leveraged derivative contracts.",
      ],
      [
        "Currency Exchange Service",
        "Currency conversion or money transfers within the scope of the exchange company's license, not necessarily leveraged forex trading.",
      ],
    ]}
  />

  <SubHeading>
    Does a currency exchange license cover online forex trading?
  </SubHeading>

  <Paragraph>
    Authorization to conduct one financial activity
    does not automatically cover all other financial
    services. A company permitted to exchange currencies
    or transfer money may not be authorized to offer
    leveraged derivatives or investment products.
  </Paragraph>

  <Paragraph>
    Always verify the specific licensed activity rather
    than relying solely on a company name, commercial
    registration or the presence of financial terminology
    in its marketing materials.
  </Paragraph>

</ArticleSection>

{/* KUWAIT REGULATION */}

<ArticleSection
  id="kuwait-regulation"
  eyebrow="Financial Regulation"
  title="Is Opening a Forex Account in Kuwait Legal?"
>

  <Paragraph>
    The regulatory status of a forex service depends
    on the financial product involved, the activities
    carried out by the provider and the jurisdiction
    of the responsible supervisory authority.
  </Paragraph>

  <Paragraph>
    The Kuwait Capital Markets Authority is an important
    reference for checking entities authorized to conduct
    securities activities. The Central Bank of Kuwait
    supervises financial institutions and activities
    within its own regulatory remit.
  </Paragraph>

  <SubHeading>
    Kuwait Capital Markets Authority (CMA)
  </SubHeading>

  <Paragraph>
    The CMA publishes information about licensed
    companies and the financial activities they
    are permitted to perform. It also provides
    warnings concerning entities offering regulated
    services without the required authorization.
  </Paragraph>

  <Paragraph>
    Review the official{" "}

    <a
      href={sources[0].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      Kuwait CMA register of licensed companies
    </a>

    {" "}to check the relevant company and its
    authorized activities.
  </Paragraph>

  <SubHeading>
    Central Bank of Kuwait (CBK)
  </SubHeading>

  <Paragraph>
    The Central Bank of Kuwait supervises institutions
    falling within its regulatory responsibilities.
    Its official resources can help consumers understand
    financial supervision and verify institutions
    within that scope.
  </Paragraph>

  <Paragraph>
    The ability to make a bank transfer to a trading
    company does not, by itself, demonstrate that the
    company has the regulatory approvals required to
    provide investment services.
  </Paragraph>

  <Note title="International licenses and local authorization">

    A forex broker may hold authorization from
    a regulator in the United Kingdom, Australia
    or another jurisdiction.

    <br />
    <br />

    However, an overseas license does not automatically
    authorize every financial service in Kuwait.
    Verify the legal entity responsible for the account
    and whether the relevant activity is permitted
    under applicable rules.

  </Note>

</ArticleSection>

{/* LICENSE CHECK */}

<ArticleSection
  id="license-check"
  eyebrow="Broker Verification"
  title="How to Verify a Forex Broker Before Registering from Kuwait"
>

  <Paragraph>
    Forex companies may reach potential clients in
    Kuwait through online advertising, social media
    campaigns or representatives claiming to offer
    investment services to local residents.
  </Paragraph>

  <Paragraph>
    Before uploading your Civil ID or transferring
    funds, establish the exact legal identity of
    the institution rather than relying only on
    its commercial brand.
  </Paragraph>

  <ArticleList
    items={[
      "Identify the full registered company name in the client agreement.",
      "Record the regulator and advertised license number.",
      "Search the official register of the relevant regulatory authority.",
      "Review the activities and products covered by the license.",
      "Check whether the registered website and contact details match.",
      "Consult the Kuwait CMA's published warnings about unlicensed entities.",
    ]}
  />

  <Paragraph>
    The Kuwait Capital Markets Authority maintains
    information about{" "}

    <a
      href={sources[1].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      unlicensed companies and websites
    </a>

    {" "}that may be relevant when evaluating
    providers promoting financial services in Kuwait.
  </Paragraph>

  <Note
    title="Absence from a warning list does not prove authorization"
    tone="amber"
  >
    Regulatory warning lists are an additional
    verification resource, not a comprehensive
    register of every unauthorized business.
    Always confirm licensing and the permitted
    activities directly with the relevant authority.
  </Note>

</ArticleSection>

{/* KUWAITI CITIZENS */}

<ArticleSection
  id="kuwaiti-citizens"
  eyebrow="Accounts for Kuwaiti Nationals"
  title="Forex Account Opening Requirements for Kuwaiti Citizens"
>

  <Paragraph>
    Kuwaiti nationals will typically have access to
    documents such as a Civil ID, passport and local
    banking information that may be used during
    account verification, subject to the requirements
    of the financial institution.
  </Paragraph>

  <Paragraph>
    Local and international providers may apply
    different verification procedures, particularly
    regarding the English spelling of names,
    residential address evidence, employment
    information and the source of funds.
  </Paragraph>

  <RequiredDocuments />

  <SubHeading>
    Is a Kuwait Civil ID sufficient to open a forex account?
  </SubHeading>

  <Paragraph>
    A financial institution may accept a valid Civil ID
    as proof of identity. However, acceptance of that
    document does not necessarily mean all account
    verification requirements have been satisfied.
  </Paragraph>

  <Paragraph>
    Additional documents may include a passport,
    separate proof of residential address or information
    about employment, income and the purpose
    of opening the account.
  </Paragraph>

  <Note title="Match your legal name with your bank account">

    Before completing an English-language registration
    form, compare the spelling of your name across
    your passport, Civil ID and banking records.

    If there are inconsistencies, ask the financial
    institution how they should be resolved before
    making a deposit or requesting a withdrawal.

  </Note>

</ArticleSection>

{/* KUWAIT RESIDENTS */}

<ArticleSection
  id="kuwait-residents"
  eyebrow="Forex Trading for Expatriates"
  title="How to Open a Forex Trading Account as an Expat in Kuwait"
>

  <Paragraph>
    Kuwait is home to expatriates from many countries.
    Account eligibility may therefore depend on both
    the country of residence and the nationality
    of the applicant, alongside immigration status
    and the regulatory obligations of the provider.
  </Paragraph>

  <Paragraph>
    A circular issued by the Kuwait Capital Markets
    Authority to licensed persons emphasizes the
    importance of obtaining accurate information
    concerning client nationality and legal residency
    in Kuwait for non-Kuwaiti residents.
  </Paragraph>

  <Paragraph>
    Consult the official{" "}

    <a
      href={sources[2].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      CMA circular on nationality and legal residency verification
    </a>

    {" "}for the relevant requirements applicable
    to institutions supervised by the authority.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "Required Information",
      "What Expatriates Should Provide",
    ]}
    rows={[
      [
        "Nationality",
        "Actual nationality as recorded in the passport.",
      ],
      [
        "Country of Residence",
        "Kuwait, if it is the applicant's actual country of residence.",
      ],
      [
        "Kuwait Civil ID",
        "A valid Civil ID if accepted by the institution's verification system.",
      ],
      [
        "Passport",
        "A valid passport when requested for identity and nationality verification.",
      ],
      [
        "Legal Residency",
        "Accepted documents establishing legal residence in Kuwait.",
      ],
      [
        "Tax Residency",
        "Accurate tax residency information based on the applicant's circumstances.",
      ],
    ]}
  />

  <SubHeading>
    What happens if your Kuwait residency expires or you relocate?
  </SubHeading>

  <Paragraph>
    A change in residency or immigration status
    may affect account eligibility and ongoing
    verification requirements. Some institutions
    apply different restrictions when a client
    relocates to another jurisdiction.
  </Paragraph>

  <Paragraph>
    If you move outside Kuwait or your legal residency
    status changes, contact the financial institution
    to update your profile and confirm whether you
    remain eligible to use the account.
  </Paragraph>

  <Note
    title="Do not misrepresent your country of residence"
    tone="amber"
  >
    It is normal for expatriates to have different
    countries of nationality and residence. Providing
    an inaccurate address or selecting another country
    to bypass eligibility restrictions may result
    in verification rejection or account restrictions.
  </Note>

</ArticleSection>

{/* CIVIL ID */}

<ArticleSection
  id="civil-id"
  eyebrow="Identity Verification"
  title="Opening a Forex Account with Kuwait Civil ID and Kuwait Mobile ID"
>

  <Paragraph>
    The Kuwait Civil ID is a key identification
    document for citizens and residents. The Public
    Authority for Civil Information also provides
    Kuwait Mobile ID, a digital identity service
    offering electronic authentication and
    digital signature capabilities.
  </Paragraph>

  <Paragraph>
    Information about these services is available
    through the official{" "}

    <a
      href={sources[4].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      Kuwait Mobile ID (Hawyti) website
    </a>.

  </Paragraph>

  <ArticleDataTable
    headers={[
      "Identification Method",
      "What Applicants Should Know",
    ]}
    rows={[
      [
        "Physical Kuwait Civil ID",
        "May be used if the institution accepts it as a valid identity document.",
      ],
      [
        "Kuwait Mobile ID",
        "Availability depends on the verification systems supported by the institution.",
      ],
      [
        "Passport",
        "May be accepted as an alternative or requested as an additional document.",
      ],
      [
        "Facial Verification",
        "Some providers may request a selfie or another facial verification procedure to confirm identity.",
      ],
    ]}
  />

  <SubHeading>
    Can international forex brokers verify accounts using Kuwait Mobile ID?
  </SubHeading>

  <Paragraph>
    The availability of a nationally recognized
    digital identity service does not mean that
    every international forex broker has a technical
    integration with Kuwait Mobile ID.
  </Paragraph>

  <Paragraph>
    Applicants can consult the{" "}

    <a
      href={sources[6].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      Kuwait Mobile ID service provider directory
    </a>

    {" "}and contact the financial institution directly
    to confirm which authentication and identification
    methods are supported.
  </Paragraph>

  <Note title="Digital identity and broker verification are not identical">

    Recognition of a digital Civil ID in Kuwait
    does not necessarily mean that screenshots
    from the application are accepted by an
    international verification system. Follow the
    document format and submission procedures
    specified by the institution.

  </Note>

</ArticleSection>

{/* ADDRESS VERIFICATION */}

<ArticleSection
  id="address-verification"
  eyebrow="Residential Address Requirements"
  title="Proof of Address Requirements for Forex Accounts in Kuwait"
>

  <Paragraph>
    Residential addresses in Kuwait may contain
    a governorate, area, block number, street,
    building number and apartment or unit number.
    This structure can differ from the address
    format used by international registration systems.
  </Paragraph>

  <Paragraph>
    When completing an English-language application,
    applicants should enter the address consistently
    with the documentation they intend to submit
    as proof of residence.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "Kuwait Address Component",
      "Common Registration Field",
    ]}
    rows={[
      [
        "Governorate",
        "Governorate or State/Province, depending on the form.",
      ],
      [
        "Residential Area",
        "Area or City, depending on the available fields.",
      ],
      [
        "Block Number",
        "Block.",
      ],
      [
        "Street",
        "Street.",
      ],
      [
        "Building Number",
        "Building or House Number.",
      ],
      [
        "Apartment Number",
        "Apartment or Unit Number, where applicable.",
      ],
    ]}
    caption="Field names vary between registration platforms. Enter genuine address information and do not invent missing details."
  />

  <SubHeading>
    Documents that may be accepted as proof of address
  </SubHeading>

  <ArticleList
    items={[
      "A recent bank statement showing the required name and residential address.",
      "A government-issued document containing the actual Kuwait residential address.",
      "A Kuwait Civil ID, if accepted separately as proof of address.",
      "A rental agreement meeting the institution's document requirements.",
      "A utility bill issued in the applicant's name, where accepted.",
    ]}
  />

  <Paragraph>
    If you have recently moved, consult the official
    services provided by the{" "}

    <a
      href={sources[5].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      Public Authority for Civil Information (PACI)
    </a>

    {" "}for information about updating residential
    address and Civil ID records.
  </Paragraph>

  <Note title="What if your utility bill is registered in the landlord's name?">

    Expatriates and tenants may not have a utility
    bill issued in their own name. Ask the financial
    institution which alternatives it accepts,
    such as an eligible bank statement,
    government-issued document or rental agreement.

  </Note>

</ArticleSection>

{/* KUWAIT TOP FIVE BROKERS */}

<KuwaitTopFiveBrokers rankings={kuwaitBrokers} />

{/* ACCOUNT SELECTION */}

<ArticleSection
  id="account-selection"
  eyebrow="Trading Account Comparison"
  title="How to Choose a Forex Trading Account in Kuwait"
>

  <Paragraph>
    Choosing a trading account involves more than
    comparing minimum deposits. Account currency,
    trading commissions, spreads, leverage and
    currency conversion costs can all affect the
    overall cost and risk of trading.
  </Paragraph>

  <Paragraph>
    Traders who maintain their savings in Kuwaiti
    dinars should pay particular attention to
    supported account currencies and the potential
    cost of converting funds between KWD and
    the trading account currency.
  </Paragraph>

  <AccountTypesGrid />

  <Paragraph>
    To examine individual account specifications,
    pricing structures and trading conditions, visit
    the{" "}

    <Link
      href="/en/compare-accounts"
      className="font-bold text-[#176ac8] hover:underline"
    >
      trading account comparison
    </Link>

    {" "}section on Broker Alarab.
  </Paragraph>

  <Note title="Is the lowest minimum deposit enough to choose a broker?">

    A low minimum deposit does not establish the
    quality or suitability of a trading account.
    Review contract specifications, position sizes,
    trading costs, leverage and withdrawal conditions
    before making a decision.

  </Note>

</ArticleSection>

{/* REGISTRATION STEPS */}

<ArticleSection
  id="registration-steps"
  eyebrow="Practical Registration Guide"
  title="Step-by-Step Guide to Opening a Forex Account from Kuwait"
>

  <Paragraph>
    Once you have identified the financial service
    you require and verified the relevant regulatory
    authorization, review the registration procedures
    and prepare the documents requested by the provider.
  </Paragraph>

  <RegistrationSteps />

  <SubHeading>
    Prepare your information before starting registration
  </SubHeading>

  <Paragraph>
    Keep your official identification documents
    available when completing the application.
    These may be needed to confirm your legal name
    in English, date of birth, nationality,
    residency status and residential address in Kuwait.
  </Paragraph>

  <Paragraph>
    When entering a Kuwaiti telephone number,
    use your actual number and the Kuwait
    international dialing code, +965,
    where required by the registration form.
  </Paragraph>

  <SubHeading>
    Check verification status before funding the account
  </SubHeading>

  <Paragraph>
    Some financial institutions allow applicants
    to create an initial client profile before
    completing identity verification. Receiving
    an account number does not necessarily mean
    that every financial service is available.
  </Paragraph>

  <Paragraph>
    Confirm the verification status, applicable
    account restrictions and eligibility to use
    payment and withdrawal methods before
    conducting a financial transaction.
  </Paragraph>

</ArticleSection>

{/* KWD ACCOUNT */}

<ArticleSection
  id="kwd-account"
  eyebrow="Trading Account Currency"
  title="Can You Open a Forex Account in Kuwaiti Dinars Instead of US Dollars?"
>

  <Paragraph>
    There is an important distinction between
    the currency of your Kuwaiti bank account
    and the base currency of your forex trading account.
  </Paragraph>

  <Paragraph>
    A client may be able to make a payment
    from a bank account denominated in Kuwaiti
    dinars while maintaining a trading account
    denominated in US dollars, euros or another
    supported currency.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "Currency Term",
      "What It Means",
    ]}
    rows={[
      [
        "Deposit Currency",
        "The currency used to send funds through a bank or payment method.",
      ],
      [
        "Account Base Currency",
        "The currency in which the trading account balance is maintained.",
      ],
      [
        "Instrument Currency",
        "The currency used to price an instrument or calculate its results under the relevant contract specifications.",
      ],
      [
        "Currency Conversion",
        "Converting Kuwaiti dinars into another currency or vice versa, potentially involving additional costs.",
      ],
    ]}
  />

  <SubHeading>
    Illustrative example of Kuwaiti dinar conversion costs
  </SubHeading>

  <Paragraph>
    Suppose a Kuwait resident wants to transfer
    KWD 100 into a US dollar trading account.
    Using a hypothetical conversion rate of
    USD 3.25 per Kuwaiti dinar, the amount
    before fees would be USD 325.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "Example Details",
      "Hypothetical Amount",
    ]}
    rows={[
      [
        "Original Amount",
        "100 KWD",
      ],
      [
        "Illustrative Exchange Rate",
        "3.25 USD per KWD",
      ],
      [
        "Amount Before Fees",
        "325 USD",
      ],
      [
        "Hypothetical Conversion Fee",
        "5 USD",
      ],
      [
        "Net Amount After Fees",
        "320 USD",
      ],
    ]}
    caption="This example is for illustration only. It does not represent a live exchange rate or the actual fees of any broker or bank."
  />

  <Paragraph>
    When withdrawing funds to a Kuwaiti dinar
    bank account, another currency conversion
    may take place based on the exchange rate
    and fees applicable when the transaction
    is processed.
  </Paragraph>

  <Note title="Compare the final amount, not only the exchange rate">

    Check how much money will actually reach
    the receiving account after any bank charges,
    payment processing costs and currency
    conversion fees have been applied.

  </Note>

</ArticleSection>

{/* KUWAIT PAYMENTS */}

<ArticleSection
  id="kuwait-payments"
  eyebrow="Local Payment Methods"
  title="Can You Fund a Forex Account Using KNET and Kuwaiti Banks?"
>

  <Paragraph>
    Residents of Kuwait may want to use local
    payment methods, including Kuwaiti bank cards,
    KNET services and bank transfers, when
    funding or withdrawing from a trading account.
  </Paragraph>

  <Paragraph>
    However, widespread acceptance of a payment
    method by merchants or financial institutions
    in Kuwait does not establish its availability
    with international forex brokers.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "Payment Method",
      "What to Verify",
    ]}
    rows={[
      [
        "KNET",
        "Actual availability with the financial institution and eligibility for the intended transaction.",
      ],
      [
        "Local Debit Card",
        "Acceptance of the card and transaction by the issuing bank and payment provider.",
      ],
      [
        "Visa or Mastercard",
        "Applicable banking restrictions, refund policies and currency conversion conditions.",
      ],
      [
        "International Bank Transfer",
        "The legal beneficiary name, transfer charges and applicable banking approvals.",
      ],
    ]}
  />

  <SubHeading>
    Are the same payment methods available to every client?
  </SubHeading>

  <Paragraph>
    Payment availability may vary according to
    country of residence, the legal entity responsible
    for the account, the payment service provider
    and the type of transaction.
  </Paragraph>

  <Paragraph>
    Review the methods actually available to your
    account or contact the financial institution
    directly. A general list of payment options
    advertised for other markets may not apply
    to residents of Kuwait.
  </Paragraph>

  <Note
    title="What should you do if a Kuwaiti bank rejects a forex deposit?"
    tone="amber"
  >
    Contact your bank to understand the reason
    for the rejection and verify the legitimacy
    of the intended transaction and beneficiary.
    Do not use third-party bank accounts or
    unofficial payment arrangements to bypass
    banking or regulatory restrictions.
  </Note>

</ArticleSection>

{/* ISLAMIC ACCOUNT */}

<ArticleSection
  id="islamic-account"
  eyebrow="Swap-Free Trading"
  title="Are Islamic Forex Trading Accounts Available in Kuwait?"
>

  <Paragraph>
    Some financial institutions offer trading
    accounts or arrangements marketed as Islamic
    or swap-free accounts. These typically involve
    specific conditions regarding overnight
    financing charges and holding open positions.
  </Paragraph>

  <Paragraph>
    Residency in Kuwait does not automatically
    establish eligibility for swap-free trading.
    Requirements may vary between financial
    institutions, account types and the instruments
    available for trading.
  </Paragraph>

  <ArticleList
    items={[
      "Is swap-free status activated automatically or only upon request?",
      "Does the arrangement cover every instrument or only selected products?",
      "Are administrative or alternative fees charged after a specified period?",
      "Can the institution change or withdraw swap-free status?",
      "What are the underlying contract, ownership, execution and settlement arrangements?",
    ]}
  />

  <Note title="Is a swap-free account necessarily Sharia-compliant?">

    Removing overnight swap charges is not,
    by itself, sufficient to establish Sharia
    compliance. A qualified assessment should
    consider the underlying contract, ownership,
    possession, leverage and other relevant
    financial arrangements.

  </Note>

</ArticleSection>

{/* REGISTRATION PROBLEMS */}

<ArticleSection
  id="registration-problems"
  eyebrow="Common Registration Issues"
  title="Why Forex Account Applications or Verification May Be Rejected in Kuwait"
>

  <Paragraph>
    Registration problems may arise from expired
    identification documents, discrepancies in
    personal information, address verification
    difficulties or failure to meet the financial
    institution&apos;s eligibility requirements.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "Potential Problem",
      "Appropriate Action",
    ]}
    rows={[
      [
        "Expired Kuwait Civil ID",
        "Provide a valid document included in the institution's accepted identification list.",
      ],
      [
        "Different English Name Spellings",
        "Review the name in your passport and contact support to correct inconsistent records.",
      ],
      [
        "Kuwait Mobile ID Screenshot Rejected",
        "Ask whether a physical Civil ID or passport is accepted as an alternative.",
      ],
      [
        "Recent Change of Address",
        "Update official residency information and submit a current document showing the correct address.",
      ],
      [
        "Utility Bill in Landlord's Name",
        "Request a list of acceptable alternative documents for tenants.",
      ],
      [
        "Nationality and Residency Differences",
        "Provide your actual nationality and legal residency details without misrepresenting your circumstances.",
      ],
      [
        "Payment Method Rejected",
        "Review the requirements of your bank and the financial institution, including applicable restrictions.",
      ],
      [
        "Account Eligibility Rejected",
        "Request clarification and do not attempt to bypass geographical or regulatory restrictions.",
      ],
    ]}
  />

  <SubHeading>
    How to protect your Civil ID information during registration
  </SubHeading>

  <Paragraph>
    Kuwait Civil ID documents contain personal
    information that should be handled securely.
    Avoid sharing identification documents with
    individuals claiming to represent a financial
    institution through unofficial channels.
  </Paragraph>

  <ArticleList
    items={[
      "Use the institution's verified official website after checking its identity and authorization.",
      "Never share passwords or one-time authentication codes with another person.",
      "Do not approve Kuwait Mobile ID authentication requests that you did not initiate.",
      "Avoid transferring money to personal bank accounts belonging to individuals.",
      "Retain copies of official agreements, correspondence and payment receipts.",
    ]}
  />

  <Paragraph>
    The{" "}

    <a
      href={sources[3].url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#176ac8] hover:underline"
    >
      Central Bank of Kuwait
    </a>

    {" "}provides financial supervision information
    that can assist consumers in understanding
    institutional verification and reporting
    concerns within its regulatory scope.
  </Paragraph>

</ArticleSection>

{/* FAQ */}

<ArticleSection
  id="faq"
  eyebrow="Frequently Asked Questions"
  title="Frequently Asked Questions About Opening a Forex Account in Kuwait"
>

  <div className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4 sm:p-6">

    <FAQItem question="Can I open a forex account using my Kuwait Civil ID?">

      Some financial institutions may accept
      a valid Kuwait Civil ID as proof of identity.
      Acceptance depends on verification procedures
      and eligibility to receive the relevant
      financial service. A passport or separate
      proof of address may also be required.

    </FAQItem>

    <FAQItem question="Can expatriates open a forex trading account in Kuwait?">

      Eligibility depends on nationality, legal
      residency, the financial service involved
      and applicable regulatory requirements.
      Expatriates may be asked to provide a
      passport, Civil ID, residency information
      and proof of residential address.

    </FAQItem>

    <FAQItem question="Can I verify my forex account using Kuwait Mobile ID?">

      Kuwait Mobile ID provides digital identification
      and electronic authentication services.
      However, its acceptance by a forex broker
      depends on the verification methods and
      technical integrations supported by that
      institution. Confirm availability directly.

    </FAQItem>

    <FAQItem question="Do I need a Kuwaiti bank account to open a forex account?">

      A local bank account may not be required
      to create an initial client profile.
      However, financial transactions may require
      an accepted payment method registered
      in your own name and compliant with
      applicable banking requirements.

    </FAQItem>

    <FAQItem question="Can I deposit into a forex account using KNET?">

      KNET is not available with every forex
      broker. Confirm actual payment availability
      for Kuwait residents and whether the
      intended transaction is permitted by
      the relevant financial institutions.

    </FAQItem>

    <FAQItem question="Can I open a forex trading account in Kuwaiti dinars?">

      This depends on the base currencies
      supported by the institution. Accepting
      a payment in KWD does not necessarily
      mean that a KWD-denominated trading
      account is available.

    </FAQItem>

    <FAQItem question="How can I prove my address if I rent an apartment in Kuwait?">

      Ask the institution which proof-of-address
      documents it accepts. Eligible alternatives
      may include a bank statement, government-issued
      document or rental agreement that meets
      the required conditions and reflects
      your actual residential address.

    </FAQItem>

    <FAQItem question="Is an international forex broker license sufficient in Kuwait?">

      An overseas license does not automatically
      authorize the provision of financial services
      in Kuwait. Verify the responsible legal
      entity, scope of its license and applicable
      local regulatory approvals.

    </FAQItem>

    <FAQItem question="What is the minimum deposit for opening a forex account in Kuwait?">

      There is no universal minimum deposit
      across all brokers and account types.
      Requirements vary according to the account,
      payment method and legal entity.
      Currency conversion costs may also affect
      the amount ultimately credited.

    </FAQItem>

    <FAQItem question="Where can I check unlicensed forex brokers in Kuwait?">

      Consult the official registers and warnings
      published by the Kuwait Capital Markets
      Authority and other relevant supervisory
      authorities. Absence from a warning list
      does not establish that a company is
      licensed or authorized.

    </FAQItem>

  </div>

</ArticleSection>

{/* CONCLUSION */}

<ArticleSection
  id="conclusion"
  eyebrow="Final Considerations"
  title="What Should You Do Before Opening a Forex Account in Kuwait?"
>

  <Paragraph>
    Opening a forex account from Kuwait starts
    with identifying the financial product
    you intend to use and verifying the
    institution responsible for providing it.
    The next considerations include Civil ID,
    legal residency, proof of address, account
    requirements and payment arrangements.
  </Paragraph>

  <Paragraph>
    Advertising claims and low minimum deposits
    should not be the only factors influencing
    your decision. Understand the responsible
    legal entity, financial contract, actual
    trading costs and potential risks before
    applying for a live trading account.
  </Paragraph>

  <div className="!my-6 overflow-hidden rounded-[17px] border border-[#bdd8f5] bg-[#f1f7fe] p-4 sm:p-6">

    <h3 className="text-[17px] font-black leading-7 text-[#102747] sm:text-[20px]">

      Still Comparing Forex Brokers in Kuwait?

    </h3>

    <p className="mt-2 text-[13px] leading-[1.9] text-slate-600 sm:text-[14px]">

      Explore Broker Alarab&apos;s Kuwait-specific
      broker rankings and compare account
      specifications, trading platforms,
      ratings and costs before reviewing
      the detailed requirements of individual brokers.

    </p>

    <Link
      href={KUWAIT_BROKERS_URL}
      className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#176ac8] px-4 py-3 text-center text-[12px] font-black text-white transition hover:bg-[#10549f] sm:w-auto sm:text-[14px]"
    >

      Best Forex Brokers in Kuwait

      <span aria-hidden="true">
        →
      </span>

    </Link>

    <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">

      Editorial comparison only. Inclusion does
      not establish local regulatory authorization
      or constitute a recommendation to open
      an account with a specific institution.

    </p>

  </div>

</ArticleSection>

{/* SOURCES */}

<ArticleSection
  id="sources"
  eyebrow="Official References"
  title="Official Kuwaiti Sources Used in This Forex Account Opening Guide"
>

  <Paragraph>
    The Kuwait-specific information in this guide
    draws on resources published by the Kuwait
    Capital Markets Authority, the Central Bank
    of Kuwait and the Public Authority for Civil
    Information, covering licensing, residency,
    Civil ID and digital identity services.
  </Paragraph>

  <Paragraph>
    Individual account and payment requirements
    vary between financial institutions.
    This guide does not assume universal
    acceptance of Kuwait Mobile ID, KNET
    or Kuwaiti dinar-denominated accounts
    among international forex brokers.
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

  <Note title="Information and update methodology">

    Financial regulations, identity verification
    requirements, payment availability and
    client eligibility rules may change over time.
    Consult current official resources and
    applicable institutional requirements
    before making a financial decision.

  </Note>

</ArticleSection>

{/* RELATED PAGES — INTERNAL LINKS */}

<ImportantInternalLinks />

{/* DISCLAIMER */}

<div className="mt-8 rounded-[16px] border border-amber-200 bg-[#fffbef] p-4 sm:p-6">

  <h2 className="text-[15px] font-black text-amber-900">

    Disclaimer and Trading Risk Warning

  </h2>

  <p className="mt-2 text-[12px] leading-[2] text-slate-700 sm:text-[14px]">

    This content is provided for informational
    and educational purposes only. It does not
    constitute financial or legal advice, or a
    recommendation to open an account with a
    specific institution.

    Leveraged forex and CFD trading involves
    significant risk and may result in the loss
    of your invested capital. Verify applicable
    licenses and regulatory approvals before
    dealing with any financial service provider.

  </p>

  <p className="mt-3 text-[11px] leading-7 text-slate-600 sm:text-[12px]">

    Broker Alarab may receive commercial
    compensation from certain partners when
    visitors use referral links on the website.
    A commercial relationship does not establish
    regulatory authorization or guarantee that
    a financial product is suitable for a client.

  </p>

</div>

{/* ARTICLE FOOTER */}

<footer className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

  <div>

    <div className="text-[13px] font-black text-[#102747]">

      Broker Alarab Editorial Team

    </div>

    <p className="mt-1 text-[11px] leading-6 text-slate-500">

      Forex broker reviews, trading comparisons
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

          </div>

        </article>

      </div>

    </main>
  );
}