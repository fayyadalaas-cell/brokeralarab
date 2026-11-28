import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

import ArticleLayout from "@/app/components/editorial/ArticleLayout";

import {
  ArticleSection,
  SubHeading,
  Paragraph,
  Strong,
  ArticleList,
  Note,
} from "@/app/components/editorial/ArticleComponents";

import {
  createArticleMetadata,
  ArticleStructuredData,
  type ArticleSEOConfig,
} from "@/app/components/editorial/ArticleSEO";

/* =========================================================
   BROKER ALARAB
   TRADING GUIDES
   HOW TO DETECT SCAM BROKERS
========================================================= */

const SLUG = "how-to-detect-scam-brokers";

const CATEGORY = "Trading Guides";

const CATEGORY_HREF = "/en/learn-trading";

const HERO_IMAGE =
  "/articles/how-to-detect-scam-brokers.webp";

const ARTICLE = {
  title:
    "How to Spot a Scam Forex Broker: 10 Warning Signs Before You Deposit",

  seoTitle:
    "How to Identify Scam Forex Brokers: 10 Warning Signs",

  shortTitle:
    "How to Spot a Scam Broker",

  description:
    "Learn how to identify scam forex brokers, verify financial licences, detect clone firms, recognise withdrawal scams and protect your money before opening a trading account.",

  subcategory:
    "Trading Safety & Broker Verification",

  author:
    "Broker Alarab Research Team",

  published:
    "2026-11-28",

  modified:
    "2026-11-28",
};

/* =========================================================
   OFFICIAL SOURCES
========================================================= */

const sources = [
  {
    title:
      "Financial Conduct Authority – Forex Trading Scams",
    url:
      "https://www.fca.org.uk/consumers/forex-trading-scams",
  },
  {
    title:
      "Financial Conduct Authority – Clone Firms and Individuals",
    url:
      "https://www.fca.org.uk/consumers/clone-firms-individuals",
  },
  {
    title:
      "Financial Conduct Authority – Online Trading Scams",
    url:
      "https://www.fca.org.uk/consumers/online-trading-scams",
  },
  {
    title:
      "Financial Conduct Authority – Warning List of Unauthorised Firms",
    url:
      "https://www.fca.org.uk/consumers/warning-list-unauthorised-firms",
  },
  {
    title:
      "Financial Conduct Authority – Recovery Room Scams",
    url:
      "https://www.fca.org.uk/consumers/recovery-room-scams",
  },
  {
    title:
      "Commodity Futures Trading Commission – Forex Fraud",
    url:
      "https://www.cftc.gov/LearnAndProtect/forexfrauds",
  },
  {
    title:
      "Commodity Futures Trading Commission – What You Should Know About Forex Trading",
    url:
      "https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CustomerAdvisory_MustKnowForex.html",
  },
  {
    title:
      "National Futures Association – Investor Information",
    url:
      "https://www.nfa.futures.org",
  },
  {
    title:
      "Australian Securities and Investments Commission",
    url:
      "https://asic.gov.au",
  },
  {
    title:
      "Australian Government MoneySmart – Investment Scams",
    url:
      "https://moneysmart.gov.au/investment-warnings/investment-scams",
  },
  {
    title:
      "Canadian Investment Regulatory Organization – CIRO",
    url:
      "https://www.ciro.ca",
  },
  {
    title:
      "Canadian Securities Administrators – National Registration Search",
    url:
      "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
  },
  {
    title:
      "Monetary Authority of Singapore – Financial Institutions Directory",
    url:
      "https://eservices.mas.gov.sg/fid",
  },
  {
    title:
      "Monetary Authority of Singapore – Investor Alert List",
    url:
      "https://www.mas.gov.sg/investor-alert-list",
  },
  {
    title:
      "MoneySense Singapore – How to Spot an Investment Scam",
    url:
      "https://www.moneysense.gov.sg/how-to-spot-an-investment-scam/",
  },
  {
    title:
      "Securities Commission Malaysia – Investment Checker",
    url:
      "https://www.sc.com.my/investment-checker",
  },
  {
    title:
      "Cyprus Securities and Exchange Commission – CySEC",
    url:
      "https://www.cysec.gov.cy",
  },
  {
    title:
      "German Federal Financial Supervisory Authority – BaFin",
    url:
      "https://www.bafin.de",
  },
];

/* =========================================================
   SEO CONFIGURATION
========================================================= */

const ARTICLE_SEO: ArticleSEOConfig = {
  language: "en",

  slug: SLUG,

  title: ARTICLE.title,

  seoTitle: ARTICLE.seoTitle,

  description: ARTICLE.description,

  category: CATEGORY,

  categoryHref: CATEGORY_HREF,

  categoryName: CATEGORY,

  author: ARTICLE.author,

  published: ARTICLE.published,

  modified: ARTICLE.modified,

  image: HERO_IMAGE,

  imageAlt:
    "How to identify scam forex brokers, verify financial regulation and protect trading accounts from investment fraud",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  tags: [
    "Forex Scams",
    "Scam Brokers",
    "Broker Regulation",
    "Investment Fraud",
    "Trading Safety",
    "Investor Protection",
    "Forex Trading",
    "Broker Verification",
  ],

  keywords: [
    "how to spot a scam forex broker",
    "how to identify scam brokers",
    "forex broker scam warning signs",
    "how to check if a forex broker is legitimate",
    "how to verify forex broker regulation",
    "forex trading scams",
    "fake trading platforms",
    "unregulated forex brokers",
    "forex withdrawal scams",
    "forex broker fraud",
    "fake forex broker licences",
    "clone forex brokers",
    "how to recover money from forex scams",
    "how to report a scam broker",
    "how to choose a regulated forex broker",
    "forex broker licence verification",
    "forex scams UK",
    "forex scams Australia",
    "forex scams Canada",
    "forex scams USA",
    "forex scams Singapore",
    "forex scams Malaysia",
    "regulated forex brokers",
    "online trading fraud prevention",
  ],

  about: [
    {
      "@type": "Thing",
      name: "Investment Fraud",
    },
    {
      "@type": "Thing",
      name: "Financial Regulation",
    },
    {
      "@type": "Thing",
      name: "Foreign Exchange Market",
    },
    {
      "@type": "Thing",
      name: "Investor Protection",
    },
    {
      "@type": "Organization",
      name: "Financial Conduct Authority",
      url: "https://www.fca.org.uk",
    },
    {
      "@type": "Organization",
      name: "Commodity Futures Trading Commission",
      url: "https://www.cftc.gov",
    },
    {
      "@type": "Organization",
      name: "Australian Securities and Investments Commission",
      url: "https://asic.gov.au",
    },
    {
      "@type": "Organization",
      name: "Monetary Authority of Singapore",
      url: "https://www.mas.gov.sg",
    },
  ],

  sources,
};

export const metadata =
  createArticleMetadata(ARTICLE_SEO);

/* =========================================================
   TABLE OF CONTENTS
========================================================= */

const contents = [
  {
    id: "quick-answer",
    label: "How to identify a scam forex broker",
  },
  {
    id: "how-scam-brokers-work",
    label: "How forex broker scams work",
  },
  {
    id: "warning-signs",
    label: "10 warning signs of scam brokers",
  },
  {
    id: "clone-firms",
    label: "How to identify clone brokers",
  },
  {
    id: "verify-broker-license",
    label: "How to verify a broker's licence",
  },
  {
    id: "official-regulators",
    label: "Financial regulators and official registers",
  },
  {
    id: "broker-comparison",
    label: "Regulated brokers vs suspicious platforms",
  },
  {
    id: "choose-a-broker",
    label: "How to choose a forex broker",
  },
  {
    id: "before-deposit",
    label: "Pre-deposit broker verification checklist",
  },
  {
    id: "withdrawal-problems",
    label: "Are withdrawal delays a sign of fraud?",
  },
  {
    id: "what-to-do-if-scammed",
    label: "What to do if you have been scammed",
  },
  {
    id: "recovery-scams",
    label: "Beware of fund recovery scams",
  },
  {
    id: "editorial-conclusion",
    label: "Broker Alarab's final assessment",
  },
  {
    id: "faq",
    label: "Frequently asked questions",
  },
  {
    id: "sources",
    label: "Sources and editorial methodology",
  },
];

/* =========================================================
   TEN BROKER SCAM WARNING SIGNS
========================================================= */

const warningSigns = [
  {
    number: "01",
    title:
      "Missing or Unverifiable Financial Regulation",
    description:
      "Some trading platforms display company incorporation certificates or commercial registration numbers as though they were financial services licences. Incorporating a business does not automatically authorise it to provide forex brokerage, CFD trading or investment management services. The relevant legal entity must hold the appropriate permissions for the activities it offers.",
    example:
      "A broker claims to be registered in Europe but refuses to provide the name of its financial regulator or a verifiable licence number.",
    action:
      "Request the full legal company name and its regulatory reference number. Verify both independently through the regulator's official register.",
  },
  {
    number: "02",
    title:
      "Guaranteed Profits and Unrealistic Investment Returns",
    description:
      "Financial markets are inherently uncertain. Currency prices, gold prices and stock market indices can move rapidly in either direction. A trading broker cannot guarantee the outcome of market transactions, and promises of consistently high returns without risk should be treated with considerable caution.",
    example:
      "An account manager promises a guaranteed monthly return of 20%, claiming that a proprietary trading system eliminates the possibility of losses.",
    action:
      "Do not transfer money based on verbal promises or screenshots of profits. Stop and investigate any investment opportunity that claims to eliminate trading risk.",
  },
  {
    number: "03",
    title:
      "Aggressive Sales Pressure and Urgent Deposit Requests",
    description:
      "A financial decision should allow sufficient time for research, comparison and independent verification. Persistent pressure to deposit immediately, particularly when accompanied by attempts to discourage due diligence, is an important warning sign.",
    example:
      "A representative insists that an exceptional gold trading opportunity will disappear within an hour unless you fund your account immediately.",
    action:
      "Do not make financial decisions under pressure. Review the broker's legal documents, regulatory information and trading conditions before committing funds.",
  },
  {
    number: "04",
    title:
      "Payments to Personal Bank Accounts or Unverified Recipients",
    description:
      "The recipient of trading funds should have a clear and verifiable relationship with the financial institution providing the service. Legitimate brokers may use authorised payment processors, but payment arrangements should be documented and independently verifiable.",
    example:
      "A representative asks you to transfer your deposit to a personal bank account or an unidentified cryptocurrency wallet.",
    action:
      "Verify the beneficiary and approved payment instructions through the broker's independently confirmed official channels. Do not transfer funds to unknown individuals.",
  },
  {
    number: "05",
    title:
      "Withdrawal Restrictions and Additional Payment Demands",
    description:
      "Unexpected demands for additional payments before funds can be withdrawn are a serious warning sign. Suspicious platforms may describe these demands as withdrawal taxes, account release fees, insurance payments or administrative charges.",
    example:
      "Your trading dashboard displays an account balance of $8,000, but the platform demands a separate payment of $1,500 before releasing your funds.",
    action:
      "Do not send additional money based solely on promises that your balance will be released. Independently verify any claimed legal or tax obligation and contact your payment provider if fraud is suspected.",
  },
  {
    number: "06",
    title:
      "Unverifiable Trading Platforms and Account Balances",
    description:
      "A professional-looking trading interface does not establish that a financial institution is legitimate or that the displayed funds represent genuine market transactions. Even access to recognised trading software does not replace the need to verify the broker's identity and regulatory status.",
    example:
      "Your account displays steadily increasing profits, but the company cannot provide clear statements or verifiable information about the legal entity managing your account.",
    action:
      "Review the broker's identity, execution policies, account statements and withdrawal conditions. Do not treat access to MetaTrader 4 or MetaTrader 5 as proof of financial authorisation.",
  },
  {
    number: "07",
    title:
      "Requests for Remote Access to Your Devices",
    description:
      "Allowing an unknown representative to control your computer or smartphone can expose sensitive information, including banking credentials, payment details and account passwords. Remote access may also enable transactions that you did not intend to authorise.",
    example:
      "A representative asks you to install remote-access software to help you fund your trading account or complete an online banking transaction.",
    action:
      "Never provide unknown individuals with remote access to your device, banking application, passwords or authentication codes.",
  },
  {
    number: "08",
    title:
      "Impersonation of Recognised Regulated Brokers",
    description:
      "Fraudulent websites may imitate established financial institutions by displaying their names, logos and genuine regulatory reference numbers. A valid licence number alone does not establish that the website or individual contacting you is associated with the licensed company.",
    example:
      "The licence number appears in an official register, but the website provided by the representative does not match the recognised financial institution's contact information.",
    action:
      "Independently verify the website address, legal entity, email domain and contact details. Contact the genuine institution using information obtained from trusted official sources.",
  },
  {
    number: "09",
    title:
      "Unclear Fees, Legal Agreements and Trading Conditions",
    description:
      "Clients should be able to understand the nature of the financial service, applicable fees, withdrawal conditions, complaint procedures and investment risks before transferring funds. Missing or inaccessible legal documentation makes it difficult to establish the rights and responsibilities associated with an account.",
    example:
      "The platform provides no accessible client agreement or withdrawal policy, and the representative says that these documents will become available only after your first deposit.",
    action:
      "Review the relevant legal agreements, funding policies, fees and promotional conditions before opening or funding an account.",
  },
  {
    number: "10",
    title:
      "Repeated Serious Complaints and Unresponsive Support",
    description:
      "A pattern of unresolved complaints concerning withheld funds, unexplained account restrictions or inaccessible customer support deserves further investigation. Official regulatory warnings and documented evidence should carry more weight than anonymous ratings or isolated social media claims.",
    example:
      "Your account manager communicates with you regularly before you deposit but becomes unreachable when you submit a withdrawal request.",
    action:
      "Investigate official warnings and documented complaints. Do not rely on a single review, a star rating or promotional testimonials to determine whether a broker is legitimate.",
  },
];

/* =========================================================
   REUSABLE GUIDE TABLE
========================================================= */

function GuideTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div className="my-7">

      <div className="overflow-x-auto rounded-[16px] border border-[#dce6ef]">

        <table className="w-full min-w-[520px] border-collapse text-center">

          <thead className="bg-[#102747] text-white">

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  scope="col"
                  className="px-3 py-4 text-[13px] font-bold leading-7 sm:px-5 sm:text-[15px]"
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
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f6f9fc]"
                }
              >

                {row.map((cell, cellIndex) => (

                  <td
                    key={cellIndex}
                    className={`border-t border-[#e3eaf1] px-3 py-4 text-[13px] leading-7 sm:px-5 sm:text-[14px] ${
                      cellIndex === 0
                        ? "font-bold text-[#102747]"
                        : "text-[#475569]"
                    }`}
                  >
                    {cell}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {caption && (

        <p className="mt-3 text-[12px] leading-7 text-[#64748b]">
          {caption}
        </p>

      )}

    </div>
  );
}

/* =========================================================
   QUICK SAFETY SUMMARY
========================================================= */

function QuickSafetyCards() {

  const cards = [
    {
      number: "01",
      title: "Verify Regulation",
      description:
        "Check the legal entity directly against the regulator's official register.",
      color: "#176ac8",
    },
    {
      number: "02",
      title: "Reject Guaranteed Profits",
      description:
        "Trading involves financial risk. Market returns cannot be guaranteed.",
      color: "#b45309",
    },
    {
      number: "03",
      title: "Check Payment Recipients",
      description:
        "Do not transfer money to personal accounts or unverified recipients.",
      color: "#176ac8",
    },
    {
      number: "04",
      title: "Avoid Account Release Fees",
      description:
        "Do not send additional funds based on promises of releasing your balance.",
      color: "#b91c1c",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-2 gap-3 lg:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.number}
          className="rounded-[16px] border border-[#dce6ef] bg-gradient-to-b from-white to-[#f5f9fd] p-4 text-center sm:p-5"
        >

          <div
            style={{ color: card.color }}
            className="mb-3 text-[30px] font-black sm:text-[36px]"
          >
            {card.number}
          </div>

          <h3 className="mb-3 text-[14px] font-black leading-7 text-[#102747] sm:text-[16px]">
            {card.title}
          </h3>

          <p className="text-[12px] leading-7 text-[#64748b]">
            {card.description}
          </p>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   SCAM WARNING INDICATORS DIAGRAM
========================================================= */

function ScamProcessDiagram() {

  const stages = [
    {
      title: "Initial Contact",
      description:
        "An unexpected investment advertisement, telephone call or social media message.",
    },
    {
      title: "Financial Promises",
      description:
        "Claims about exceptional returns or investment opportunities that require independent verification.",
    },
    {
      title: "Deposit Requests",
      description:
        "Pressure to transfer money before completing appropriate checks.",
    },
    {
      title: "Repeated Payment Requests",
      description:
        "Additional requests for funds that require careful investigation.",
    },
    {
      title: "Withdrawal Difficulties",
      description:
        "Unexplained restrictions, unexpected payment demands or loss of communication.",
    },
  ];

  return (
    <figure className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-4 sm:p-7">

      <h3 className="mb-2 text-center text-[20px] font-black text-[#102747] sm:text-[24px]">
        Warning Signs Throughout the Broker Relationship
      </h3>

      <p className="mb-7 text-center text-[13px] leading-7 text-[#64748b]">
        An educational framework for identifying suspicious behaviour
      </p>

      {stages.map((stage, index) => (

        <div key={stage.title}>

          <div
            className={`mx-auto flex max-w-[560px] items-start gap-4 rounded-[13px] border p-4 sm:p-5 ${
              index === stages.length - 1
                ? "border-[#fecaca] bg-[#fff5f5]"
                : "border-[#dce6ef] bg-white"
            }`}
          >

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[16px] font-black text-white ${
                index === stages.length - 1
                  ? "bg-[#b91c1c]"
                  : "bg-[#102747]"
              }`}
            >
              {index + 1}
            </div>

            <div>

              <h4 className="mb-1 text-[16px] font-black text-[#102747]">
                {stage.title}
              </h4>

              <p className="text-[13px] leading-7 text-[#475569]">
                {stage.description}
              </p>

            </div>

          </div>

          {index < stages.length - 1 && (

            <div
              aria-hidden="true"
              className="py-2 text-center text-[25px] font-bold text-[#94a3b8]"
            >
              ↓
            </div>

          )}

        </div>

      ))}

      <figcaption className="mt-5 text-center text-[12px] leading-7 text-[#64748b]">
        Prepared by Broker Alarab for educational purposes.
        Suspicious behaviour may appear at any stage, and
        not all fraud cases follow the same sequence.
      </figcaption>

    </figure>
  );
}

/* =========================================================
   WARNING SIGNS DISPLAY
========================================================= */

function WarningSignsList() {

  return (
    <div className="my-8 space-y-6">

      {warningSigns.map((sign) => (

        <div
          key={sign.number}
          className="overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white"
        >

          <div className="flex items-center gap-4 border-b border-[#dce6ef] bg-[#f7faff] p-4 sm:p-6">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#102747] text-[20px] font-black text-white">
              {sign.number}
            </div>

            <h3 className="text-[18px] font-black leading-8 text-[#102747] sm:text-[22px]">
              {sign.title}
            </h3>

          </div>

          <div className="space-y-5 p-4 sm:p-6">

            <p className="text-[14px] leading-8 text-[#475569] sm:text-[16px]">
              {sign.description}
            </p>

            <div className="rounded-[12px] border border-[#f0dfbf] bg-[#fffbf3] p-4">

              <div className="mb-2 text-[13px] font-black text-[#967020]">
                Illustrative Example
              </div>

              <p className="text-[13px] leading-7 text-[#475569] sm:text-[14px]">
                {sign.example}
              </p>

            </div>

            <div className="rounded-[12px] border border-[#dce6ef] bg-[#f2f7fd] p-4">

              <div className="mb-2 text-[13px] font-black text-[#176ac8]">
                What Should You Do?
              </div>

              <p className="text-[13px] leading-7 text-[#475569] sm:text-[14px]">
                {sign.action}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   CLONE FIRM EXAMPLE
========================================================= */

function CloneFirmExample() {

  const examples = [
    {
      title: "Official Regulatory Information",
      website: "broker.example",
      licence: "123456",
      email: "support@broker.example",
      color: "#15803d",
      background: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      title: "Information From a Suspicious Website",
      website: "broker-invest.example",
      licence: "123456",
      email: "support@broker-invest.example",
      color: "#b91c1c",
      background: "#fff7f7",
      border: "#fecaca",
    },
  ];

  return (
    <figure className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-4 sm:p-6">

      <h3 className="mb-2 text-center text-[19px] font-black text-[#102747] sm:text-[23px]">
        Why a Matching Licence Number Is Not Enough
      </h3>

      <p className="mb-6 text-center text-[13px] leading-7 text-[#64748b]">
        A hypothetical comparison between a regulated firm and an impersonating website
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {examples.map((item) => (

          <div
            key={item.title}
            style={{
              backgroundColor: item.background,
              borderColor: item.border,
            }}
            className="rounded-[14px] border p-4 sm:p-5"
          >

            <h4
              style={{ color: item.color }}
              className="mb-5 text-center text-[15px] font-black leading-7"
            >
              {item.title}
            </h4>

            {[
              ["Website", item.website],
              ["Licence Number", item.licence],
              ["Email Address", item.email],
            ].map(([label, value]) => (

              <div key={label} className="mb-4">

                <div className="mb-2 text-[12px] font-bold text-[#64748b]">
                  {label}
                </div>

                <div className="break-all rounded-lg bg-white p-3 text-center text-[13px] font-bold text-[#102747]">
                  {value}
                </div>

              </div>

            ))}

          </div>

        ))}

      </div>

      <div className="mt-5 rounded-[12px] border border-[#f0dfbf] bg-[#fffbf3] p-4 text-center text-[13px] font-bold leading-7 text-[#92400e]">
        Both examples display the same licence number,
        but the websites and email addresses differ.
        Independent identity verification is essential.
      </div>

      <figcaption className="mt-4 text-[12px] leading-7 text-[#64748b]">
        All names, addresses and licence numbers in this
        example are fictional and are used exclusively
        for educational purposes.
      </figcaption>

    </figure>
  );
}

/* =========================================================
   BROKER ALARAB LICENCE SEARCH
========================================================= */

function LicenseSearchPlacement() {

  return (
    <aside className="my-8 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="bg-gradient-to-r from-[#102747] to-[#184878] px-5 py-6 sm:px-7">

        <div className="mb-2 text-[12px] font-bold text-[#b9d7f5]">
          Broker Research & Verification Tools
        </div>

        <h3 className="text-[21px] font-black leading-9 text-white sm:text-[26px]">
          Research Forex Broker Regulation with Broker Alarab
        </h3>

        <p className="mt-3 text-[13px] leading-7 text-[#dce6ef] sm:text-[14px]">
          Explore financial regulators and discover
          brokers listed in our database according
          to their regulatory licences.
        </p>

      </div>

      <div className="p-5 sm:p-6">

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          <Link
            href="/en/licenses#license-search"
            className="flex min-h-[48px] items-center justify-center rounded-[10px] bg-[#176ac8] px-4 py-3 text-center text-[14px] font-bold text-white hover:bg-[#1058a9]"
          >
            Search Broker Licences →
          </Link>

          <Link
            href="/en/licenses"
            className="flex min-h-[48px] items-center justify-center rounded-[10px] border border-[#176ac8] bg-white px-4 py-3 text-center text-[14px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
          >
            Browse Financial Regulators →
          </Link>

        </div>

        <p className="mt-4 text-[12px] leading-7 text-[#64748b]">
          Broker Alarab provides regulatory information
          to support broker research and comparison.
          Always confirm the legal entity, current licence
          status and relevant permissions directly with
          the appropriate financial regulator.
        </p>

      </div>

    </aside>
  );
}

/* =========================================================
   INTERNATIONAL REGULATORY DIRECTORY
========================================================= */

const regulators = [
  {
    code: "FCA",
    name: "Financial Conduct Authority",
    country: "United Kingdom",
    description:
      "Explore UK financial regulation and brokers listed under FCA authorisation.",
    internalUrl: "/en/licenses/fca",
    officialUrl: "https://register.fca.org.uk/s/",
  },
  {
    code: "ASIC",
    name: "Australian Securities and Investments Commission",
    country: "Australia",
    description:
      "Research Australian financial services licensing and regulatory requirements.",
    internalUrl: "/en/licenses/asic",
    officialUrl: "https://asic.gov.au",
  },
  {
    code: "CySEC",
    name: "Cyprus Securities and Exchange Commission",
    country: "Cyprus / European Union",
    description:
      "Explore Cypriot investment firm regulation and the relevant European financial framework.",
    internalUrl: "/en/licenses/cysec",
    officialUrl: "https://www.cysec.gov.cy",
  },
  {
    code: "CIRO",
    name: "Canadian Investment Regulatory Organization",
    country: "Canada",
    description:
      "Review Canadian investment dealer oversight alongside provincial registration requirements.",
    internalUrl: "/en/licenses/ciro",
    officialUrl: "https://www.ciro.ca",
  },
  {
    code: "NFA",
    name: "National Futures Association",
    country: "United States",
    description:
      "Research registration and regulatory information for US derivatives and retail forex businesses.",
    internalUrl: "/en/licenses/nfa",
    officialUrl: "https://www.nfa.futures.org",
  },
  {
    code: "BaFin",
    name: "Federal Financial Supervisory Authority",
    country: "Germany",
    description:
      "Explore German financial supervision and information concerning authorised financial businesses.",
    internalUrl: "/en/licenses/bafin",
    officialUrl: "https://www.bafin.de",
  },
  {
    code: "CMVM",
    name: "Portuguese Securities Market Commission",
    country: "Portugal",
    description:
      "Research securities market regulation and authorised investment services in Portugal.",
    internalUrl: "/en/licenses/cmvm",
    officialUrl: "https://www.cmvm.pt",
  },
  {
    code: "FSCA",
    name: "Financial Sector Conduct Authority",
    country: "South Africa",
    description:
      "Review South African financial sector regulation and listed financial services providers.",
    internalUrl: "/en/licenses/fsca",
    officialUrl: "https://www.fsca.co.za",
  },
];

function RegulatoryDirectory() {

  return (
    <div className="my-7">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {regulators.map((regulator) => (

          <div
            key={regulator.code}
            className="flex flex-col rounded-[16px] border border-[#dce6ef] bg-[#f7faff] p-5 hover:border-[#176ac8]"
          >

            <div className="mb-4 flex items-center justify-between gap-3">

              <span className="rounded-[8px] bg-[#e8f0fb] px-3 py-2 text-[13px] font-black text-[#176ac8]">
                {regulator.code}
              </span>

              <span className="text-[11px] font-medium text-[#64748b]">
                {regulator.country}
              </span>

            </div>

            <Link
              href={regulator.internalUrl}
              className="mb-3 text-[16px] font-black leading-8 text-[#102747] hover:text-[#176ac8]"
            >
              {regulator.name}
            </Link>

            <p className="mb-5 flex-1 text-[13px] leading-7 text-[#475569]">
              {regulator.description}
            </p>

            <div className="flex flex-col gap-2">

              <Link
                href={regulator.internalUrl}
                className="flex min-h-[42px] items-center justify-center rounded-[8px] bg-[#176ac8] px-3 py-2 text-center text-[12px] font-bold text-white hover:bg-[#1058a9]"
              >
                Regulation Guide & Listed Brokers →
              </Link>

              <a
                href={regulator.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[42px] items-center justify-center rounded-[8px] border border-[#dce6ef] bg-white px-3 py-2 text-center text-[12px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
              >
                Official Regulator Website ↗
              </a>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-5 text-center">

        <Link
          href="/en/licenses#license-search"
          className="inline-flex items-center justify-center rounded-[10px] border border-[#176ac8] bg-white px-6 py-3 text-[14px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
        >
          Browse All Broker Licences →
        </Link>

      </div>

      <p className="mt-4 text-[12px] leading-7 text-[#64748b]">
        Regulatory information and broker listings are
        provided for research purposes. Always verify
        the current authorisation and permissions of
        the specific legal entity serving your account.
      </p>

    </div>
  );
}

/* =========================================================
   COUNTRY-SPECIFIC VERIFICATION RESOURCES
========================================================= */

const countryVerification = [
  {
    country: "United Kingdom",
    authority: "FCA",
    resource: "Financial Services Register",
    description:
      "Check the firm's authorisation, regulatory reference number and relevant permissions. Compare its official contact details with those of the website or representative contacting you.",
    url: "https://register.fca.org.uk/s/",
  },
  {
    country: "United States",
    authority: "CFTC / NFA",
    resource: "NFA BASIC and CFTC",
    description:
      "Verify whether a retail forex business has the appropriate US registration and permissions. Do not assume that an overseas CFD broker is authorised to serve US residents.",
    url: "https://www.nfa.futures.org",
  },
  {
    country: "Canada",
    authority: "CSA / CIRO",
    resource: "National Registration Search",
    description:
      "Check registration with the relevant provincial or territorial securities authority and review applicable CIRO dealer information.",
    url:
      "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
  },
  {
    country: "Australia",
    authority: "ASIC",
    resource: "ASIC Professional Registers",
    description:
      "Verify the Australian financial services licence, relevant permissions and legal entity. Confirm that the account agreement identifies the authorised business.",
    url: "https://asic.gov.au",
  },
  {
    country: "Singapore",
    authority: "MAS",
    resource: "Financial Institutions Directory",
    description:
      "Search for the financial institution and review the regulated activities it is authorised to perform. Check the MAS Investor Alert List where appropriate.",
    url: "https://eservices.mas.gov.sg/fid",
  },
  {
    country: "Malaysia",
    authority: "SC Malaysia",
    resource: "SC Investment Checker",
    description:
      "Use the Securities Commission's official verification resources to determine whether a business is authorised for the relevant capital market activities.",
    url: "https://www.sc.com.my/investment-checker",
  },
];

function CountryVerificationDirectory() {

  return (
    <div className="my-8 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="bg-[#102747] px-5 py-6 sm:px-7">

        <h3 className="text-[20px] font-black text-white sm:text-[25px]">
          How to Verify a Broker in Your Country
        </h3>

        <p className="mt-2 text-[13px] leading-7 text-[#dce6ef]">
          Official verification resources across six major
          international trading markets
        </p>

      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6">

        {countryVerification.map((country) => (

          <div
            key={country.country}
            className="flex flex-col rounded-[14px] border border-[#dce6ef] bg-[#f7faff] p-5"
          >

            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

              <h4 className="text-[17px] font-black text-[#102747]">
                {country.country}
              </h4>

              <span className="rounded-lg bg-[#e8f0fb] px-2.5 py-1.5 text-[11px] font-black text-[#176ac8]">
                {country.authority}
              </span>

            </div>

            <p className="mb-4 flex-1 text-[13px] leading-7 text-[#475569]">
              {country.description}
            </p>

            <a
              href={country.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-bold leading-7 text-[#176ac8] hover:underline"
            >
              {country.resource} ↗
            </a>

          </div>

        ))}

      </div>

      <div className="border-t border-[#dce6ef] bg-[#f8fafc] px-5 py-4 text-[12px] leading-7 text-[#64748b]">
        A foreign financial licence does not automatically
        permit a broker to offer every financial product
        in your country. Local requirements and product
        restrictions must also be considered.
      </div>

    </div>
  );
}

/* =========================================================
   BROKER TRANSPARENCY COMPARISON
========================================================= */

function BrokerTransparencyTable() {

  return (
    <GuideTable
      headers={[
        "Comparison Criteria",
        "Transparent Broker Practices",
        "Potential Warning Signs",
      ]}
      rows={[
        [
          "Financial Regulation",
          "Verifiable legal entity and permissions",
          "Unverifiable or impersonated licence",
        ],
        [
          "Investment Returns",
          "Clear disclosure of financial risk",
          "Guaranteed profits or no-risk claims",
        ],
        [
          "Deposits",
          "Documented and approved payment channels",
          "Personal bank accounts or unknown recipients",
        ],
        [
          "Withdrawals",
          "Published processing conditions and fees",
          "Additional transfers required to release funds",
        ],
        [
          "Client Agreement",
          "Accessible legal documentation before funding",
          "Terms withheld until money is deposited",
        ],
        [
          "Data Protection",
          "Secure identity verification procedures",
          "Requests for passwords or banking codes",
        ],
        [
          "Customer Support",
          "Traceable support and complaint channels",
          "Loss of communication during withdrawal disputes",
        ],
        [
          "Marketing",
          "Information that can be independently reviewed",
          "Pressure and unrealistic financial promises",
        ],
      ]}
      caption="This comparison is an educational framework, not a legal determination of fraud or a guarantee of safety with any regulated broker."
    />
  );
}

/* =========================================================
   FEATURED BROKERS – SUPABASE
========================================================= */

const featuredBrokers = [
  {
    slug: "pepperstone",
    name: "Pepperstone",
    description:
      "Explore regulatory entities, trading platforms, account types and published trading costs.",
  },
  {
    slug: "icmarkets",
    name: "IC Markets",
    description:
      "Research financial regulation, execution conditions and trading account features.",
  },
  {
    slug: "exness",
    name: "Exness",
    description:
      "Review regulatory entities, account options, funding policies and trading conditions.",
  },
  {
    slug: "capital-com",
    name: "Capital.com",
    description:
      "Explore financial regulation, available products, platforms and regional service restrictions.",
  },
];

async function FeaturedBrokerReviews() {

  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("slug, logo, rating")
    .in(
      "slug",
      featuredBrokers.map((broker) => broker.slug)
    )
    .eq("publication_status", "published");

  const brokers = featuredBrokers.flatMap((broker) => {

    const databaseBroker = data?.find(
      (item) => item.slug === broker.slug
    );

    if (!databaseBroker) return [];

    return [
      {
        ...broker,
        ...databaseBroker,
      },
    ];

  });

  if (!brokers.length) return null;

  return (
    <aside className="my-9 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="bg-gradient-to-r from-[#102747] to-[#184878] px-5 py-6 text-center sm:px-7">

        <div className="mb-2 text-[12px] font-bold text-[#b9d7f5]">
          Forex & CFD Broker Research
        </div>

        <h3 className="text-[21px] font-black leading-9 text-white sm:text-[27px]">
          Research and Compare Brokers Before Opening an Account
        </h3>

        <p className="mt-2 text-[13px] leading-7 text-[#dce6ef] sm:text-[14px]">
          Explore detailed broker reviews, financial regulation,
          account types, trading costs and funding conditions.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-4 sm:p-5">

        {brokers.map((broker) => (

          <div
            key={broker.slug}
            className="flex flex-col rounded-[14px] border border-[#dce6ef] bg-[#f9fbfd] p-3 sm:p-4"
          >

            <div className="flex h-[75px] items-center justify-center overflow-hidden">

              {broker.logo ? (

                <Image
                  src={broker.logo}
                  alt={`${broker.name} broker logo`}
                  width={170}
                  height={60}
                  unoptimized
                  className="h-[55px] w-full object-contain scale-[1.7]"
                />

              ) : (

                <span className="text-[22px] font-black text-[#102747]">
                  {broker.name}
                </span>

              )}

            </div>

            <h4 className="mt-2 text-center text-[16px] font-black text-[#102747] sm:text-[18px]">
              {broker.name}
            </h4>

            {broker.rating != null && (

              <div className="mt-3 flex justify-center">

                <span className="rounded-md bg-[#fff5dc] px-3 py-1.5 text-[13px] font-bold text-[#967020]">
                  ★ {Number(broker.rating).toFixed(2)} / 5
                </span>

              </div>

            )}

            <p className="my-4 flex-1 text-center text-[12px] leading-7 text-[#475569] sm:text-[13px]">
              {broker.description}
            </p>

            <Link
              href={`/en/brokers/${broker.slug}`}
              className="flex min-h-[44px] items-center justify-center rounded-[9px] bg-[#176ac8] px-2 py-3 text-center text-[12px] font-bold text-white hover:bg-[#1058a9]"
            >
              Read Broker Review
            </Link>

          </div>

        ))}

      </div>

      <div className="grid grid-cols-1 gap-3 px-5 pb-5 sm:grid-cols-2">

        <Link
          href="/en/best-brokers"
          className="flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#176ac8] bg-white px-4 py-3 text-center text-[14px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
        >
          Browse Best Trading Brokers →
        </Link>

        <Link
          href="/en/compare"
          className="flex min-h-[46px] items-center justify-center rounded-[9px] bg-[#102747] px-4 py-3 text-center text-[14px] font-bold text-white hover:bg-[#184878]"
        >
          Compare Trading Brokers →
        </Link>

      </div>

      <div className="border-t border-[#dce6ef] bg-[#f8fafc] p-4 text-[11px] leading-7 text-[#64748b] sm:px-6 sm:text-[12px]">
        These brokers are selected from the Broker Alarab
        directory for research and comparison purposes.
        Inclusion does not guarantee the safety of funds,
        suitability or availability in any particular
        country. Broker Alarab may receive compensation
        through commercial relationships. Regulatory
        entities, products and eligibility restrictions
        vary by jurisdiction. Verify all relevant details
        before opening an account.
      </div>

    </aside>
  );
}

/* =========================================================
   PRE-DEPOSIT CHECKLIST
========================================================= */

function PreDepositChecklist() {

  const items = [
    "I have identified the legal entity that will provide my trading services.",
    "I have verified the licence directly through the official regulator.",
    "I have independently confirmed the broker's website and contact information.",
    "I have checked whether the broker is authorised to serve clients in my country.",
    "I have reviewed relevant regulatory warnings and documented complaints.",
    "I have read the client agreement and deposit and withdrawal policies.",
    "I understand the applicable trading fees and promotional conditions.",
    "I have verified the approved payment channel and beneficiary.",
    "I understand leverage, margin requirements and the possibility of financial losses.",
    "I have not accepted guaranteed return claims or made a decision under pressure.",
  ];

  return (
    <div className="my-8 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="bg-[#102747] px-5 py-5 text-white sm:px-7">

        <h3 className="text-[20px] font-black sm:text-[24px]">
          Broker Verification Checklist
        </h3>

        <p className="mt-2 text-[13px] leading-7 text-[#dce6ef]">
          Tick each item after completing your independent checks
        </p>

      </div>

      <div className="divide-y divide-[#e3eaf1]">

        {items.map((item, index) => (

          <label
            key={item}
            className="flex cursor-pointer items-start gap-3 px-4 py-4 hover:bg-[#f7faff] sm:px-6"
          >

            <input
              type="checkbox"
              className="mt-1.5 h-5 w-5 shrink-0 cursor-pointer accent-[#176ac8]"
            />

            <span className="mt-1 text-[12px] font-bold text-[#94a3b8]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-[14px] font-medium leading-7 text-[#102747]">
              {item}
            </span>

          </label>

        ))}

      </div>

      <div className="border-t border-[#f0dfbf] bg-[#fffbf3] p-4 text-[13px] leading-7 text-[#92400e] sm:px-6">
        Completing this checklist does not establish
        that trading is risk-free. If you cannot verify
        the broker's identity, authorisation or payment
        arrangements, reconsider funding the account.
      </div>

    </div>
  );
}

/* =========================================================
   IMMEDIATE FRAUD RESPONSE
========================================================= */

function FraudResponseSteps() {

  const steps = [
    {
      title: "Stop Sending Money",
      description:
        "Do not make additional payments to release account balances or pay suspicious recovery charges.",
    },
    {
      title: "Contact Your Bank or Payment Provider",
      description:
        "Report the suspected fraud and ask whether the payment can be stopped, recalled or disputed.",
    },
    {
      title: "Preserve Evidence",
      description:
        "Save communications, transaction receipts, account statements, website addresses and recipient details.",
    },
    {
      title: "Secure Your Accounts and Devices",
      description:
        "Disable unauthorised remote access, change passwords from a secure device and review banking activity.",
    },
    {
      title: "Report the Suspected Fraud",
      description:
        "Contact the appropriate financial regulator, police or national fraud reporting authority.",
    },
    {
      title: "Beware of Recovery Scams",
      description:
        "Do not rely on unsolicited individuals who guarantee the recovery of lost funds.",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

      {steps.map((step, index) => (

        <div
          key={step.title}
          className="flex items-start gap-4 rounded-[14px] border border-[#dce6ef] bg-[#f7faff] p-5"
        >

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#102747] text-[16px] font-black text-white">
            {index + 1}
          </div>

          <div>

            <h3 className="mb-2 text-[15px] font-black text-[#102747]">
              {step.title}
            </h3>

            <p className="text-[13px] leading-7 text-[#475569]">
              {step.description}
            </p>

          </div>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   RELATED BROKER ALARAB RESOURCES
========================================================= */

function RelatedGuides() {

  const guides = [
    {
      title: "Trading Education & Guides",
      description:
        "Explore trading fundamentals, risk management and educational resources for choosing a broker.",
      href: "/en/learn-trading",
    },
    {
      title: "Search Forex Broker Licences",
      description:
        "Explore financial regulators and brokers listed under different regulatory frameworks.",
      href: "/en/licenses#license-search",
    },
    {
      title: "Best Trading Brokers",
      description:
        "Explore broker comparisons based on different trading requirements and research criteria.",
      href: "/en/best-brokers",
    },
    {
      title: "How We Review Brokers",
      description:
        "Understand Broker Alarab's approach to evaluating regulation, trading costs, accounts and services.",
      href: "/en/how-we-review-brokers",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

      {guides.map((guide) => (

        <Link
          key={guide.href}
          href={guide.href}
          className="group rounded-[15px] border border-[#dce6ef] bg-[#f7faff] p-5 hover:border-[#176ac8] hover:bg-white"
        >

          <div className="mb-2 text-[11px] font-bold text-[#176ac8]">
            Broker Alarab Research & Resources
          </div>

          <h3 className="mb-3 text-[17px] font-black leading-8 text-[#102747] group-hover:text-[#176ac8]">
            {guide.title}
          </h3>

          <p className="text-[13px] leading-7 text-[#475569]">
            {guide.description}
          </p>

          <div className="mt-4 text-[13px] font-bold text-[#176ac8]">
            Explore Resource →
          </div>

        </Link>

      ))}

    </div>
  );
}

/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question:
      "How can I tell if a forex broker is a scam?",
    answer:
      "Verify the broker's legal entity and financial authorisation directly through the relevant regulator. Check its website, contact information, payment arrangements and withdrawal policies. Guaranteed profits, payments to personal accounts and demands for additional funds to release withdrawals are important warning signs.",
  },
  {
    question:
      "How do I check if a forex broker is regulated?",
    answer:
      "Obtain the broker's legal company name and regulatory reference number. Search the regulator's official register independently and verify its current status, relevant permissions and connection to the website you intend to use.",
  },
  {
    question:
      "Is forex trading itself a scam?",
    answer:
      "No. Foreign exchange is an established global financial market. However, fraudulent businesses may exploit interest in forex trading to offer fictitious or unauthorised investment services. Leveraged retail forex and CFD trading also involve substantial financial risks even when provided by authorised firms.",
  },
  {
    question:
      "Does using MetaTrader 4 or MetaTrader 5 prove that a broker is legitimate?",
    answer:
      "No. Access to recognised trading software is not equivalent to financial authorisation. The broker's legal identity, relevant regulatory permissions and account arrangements must be independently verified.",
  },
  {
    question:
      "Are withdrawal delays always a sign of a forex scam?",
    answer:
      "No. Delays may result from identity verification, payment processing, security reviews or regulatory requirements. However, unexplained restrictions, unresponsive support and requests for additional transfers to release funds warrant further investigation.",
  },
  {
    question:
      "Can I recover money lost to a scam forex broker?",
    answer:
      "Recovery depends on the payment method, transaction timing, applicable legal requirements and circumstances of the fraud. Contact your bank or payment provider promptly, preserve evidence and report the incident to the relevant authorities. Recovery cannot be guaranteed.",
  },
  {
    question:
      "Are guaranteed forex trading profits a warning sign?",
    answer:
      "Yes. Genuine market-based trading involves uncertainty and the possibility of losses. Promises of guaranteed high returns or risk-free trading should be treated with considerable caution and independently investigated.",
  },
  {
    question:
      "Is a company registration number the same as a financial licence?",
    answer:
      "No. Business incorporation and financial services authorisation are separate matters. A registered company may still lack permission to offer brokerage, investment management or other regulated financial services.",
  },
  {
    question:
      "How do I report a fraudulent forex broker?",
    answer:
      "Contact the appropriate financial regulator and fraud reporting or law enforcement authority in your country. Inform your bank or payment provider and retain communications, transaction receipts and other relevant evidence.",
  },
  {
    question:
      "Can fund recovery companies be trusted?",
    answer:
      "Some legitimate professionals provide legal and financial dispute services, but recovery scams also target previous fraud victims. Verify the provider's identity, qualifications and fee arrangements independently. Be particularly cautious about guaranteed recovery claims and unexplained advance payment requests.",
  },
  {
    question:
      "Can an overseas forex broker legally accept clients from my country?",
    answer:
      "Not necessarily. A foreign financial licence does not automatically establish permission to offer regulated services in another country. Local authorisation requirements, client eligibility rules and product restrictions must be reviewed before opening an account.",
  },
  {
    question:
      "How should I compare regulated forex brokers?",
    answer:
      "Compare the specific legal entity, applicable regulatory protections, trading fees, account conditions, funding policies, product availability and complaint procedures. A broker's rating or global reputation should not replace independent verification.",
  },
];

/* =========================================================
   FAQ DISPLAY
========================================================= */

function ArticleFAQ() {

  return (
    <div className="my-7 space-y-3">

      {faqItems.map((item, index) => (

        <details
          key={item.question}
          className="group overflow-hidden rounded-[14px] border border-[#dce6ef] bg-white"
        >

          <summary className="flex cursor-pointer list-none items-center gap-3 bg-[#f7faff] px-4 py-5 font-black leading-8 text-[#102747] sm:px-6">

            <span className="shrink-0 text-[12px] font-bold text-[#176ac8]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="flex-1 text-[14px] sm:text-[16px]">
              {item.question}
            </span>

            <span
              aria-hidden="true"
              className="text-[20px] font-bold text-[#176ac8] transition-transform group-open:rotate-45"
            >
              +
            </span>

          </summary>

          <div className="border-t border-[#dce6ef] px-5 py-5 text-[14px] leading-8 text-[#475569] sm:px-6 sm:text-[15px]">
            {item.answer}
          </div>

        </details>

      ))}

    </div>
  );
}

/* =========================================================
   ARTICLE SOURCES
========================================================= */

function ArticleSources() {

  return (
    <div className="my-7 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      {sources.map((source, index) => (

        <div
          key={source.url}
          className="flex items-start gap-3 border-b border-[#e3eaf1] px-4 py-4 last:border-b-0 sm:px-5"
        >

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf3fa] text-[12px] font-bold text-[#176ac8]">
            {index + 1}
          </span>

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 break-words text-[13px] font-bold leading-7 text-[#176ac8] hover:underline sm:text-[15px]"
          >
            {source.title} ↗
          </a>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   MAIN ARTICLE PAGE
========================================================= */

export default async function DetectScamBrokersPage() {

  return (

    <ArticleLayout

      language="en"

      slug={SLUG}

      title={ARTICLE.title}

      description={ARTICLE.description}

      category={CATEGORY}

      categoryHref={CATEGORY_HREF}

      subcategory={ARTICLE.subcategory}

      articleType="Investor Protection & Trading Guide"

      breadcrumbTitle={ARTICLE.shortTitle}

      author={ARTICLE.author}

      published={ARTICLE.published}

      modified={ARTICLE.modified}

      heroImage={HERO_IMAGE}

      heroImageAlt={
        ARTICLE_SEO.imageAlt || ARTICLE.title
      }

      heroImageCaption="Broker Alarab's guide to identifying suspicious trading platforms, verifying financial regulation and protecting your funds before opening a trading account."

      contents={contents}

      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }

      introduction={

        <>

          <Paragraph>

            Imagine receiving a message about an
            exceptional investment opportunity in
            forex or gold.

            A representative claims that you can
            generate substantial monthly returns
            without previous trading experience.
            The company has a professional-looking
            website, impressive testimonials and
            what appears to be a financial licence.

          </Paragraph>

          <Paragraph>

            Everything may appear convincing at
            first. But one essential question
            remains: are you dealing with a
            legitimate financial institution,
            or an organisation using the appearance
            of a trading broker to obtain your money?

          </Paragraph>

          <Paragraph>

            In this guide, the Broker Alarab
            Research Team examines{" "}

            <Strong>
              10 warning signs that can help
              identify scam forex brokers
            </Strong>

            , explains how to verify financial
            licences across international markets,
            and provides practical steps for
            protecting your funds and responding
            to suspected investment fraud.

          </Paragraph>

        </>

      }

    >

      {/* =====================================================
          SECTION 1 – QUICK ANSWER
      ====================================================== */}

      <ArticleSection
        id="quick-answer"
        eyebrow="Investor Protection at a Glance"
        title="How Can You Tell If a Forex Broker Is a Scam?"
      >

        <Paragraph>

          Identifying a potentially fraudulent
          forex broker begins with verifying its
          legal identity, financial authorisation,
          deposit arrangements and withdrawal
          policies.

          The promises made by representatives,
          the transparency of trading conditions
          and the availability of independently
          verifiable information are also important
          considerations.

        </Paragraph>

        <Paragraph>

          You do not need to be an experienced
          financial analyst to recognise many of
          these warning signs.

          In numerous situations, the most important
          decision occurs before the first trade
          is placed, when a prospective client
          decides whether to transfer funds to
          an unfamiliar financial business.

        </Paragraph>

        <QuickSafetyCards />

        <Paragraph>

          It is essential to distinguish between
          a regulated financial institution offering
          high-risk trading products and an
          organisation falsely presenting itself
          as a legitimate broker.

          Losing money on a market transaction
          does not automatically mean that a broker
          is fraudulent. Equally, seeing profits
          displayed in an online account does
          not establish that the broker is legitimate.

        </Paragraph>

        <Note
          title="The First Rule Before Funding a Trading Account"
          tone="blue"
        >

          If you cannot independently establish
          the identity and financial authorisation
          of the legal entity providing the service,
          do not rely solely on a representative's
          assurances, licence screenshots, online
          testimonials or social media popularity.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 2 – HOW SCAM BROKERS WORK
      ====================================================== */}

      <ArticleSection
        id="how-scam-brokers-work"
        eyebrow="Understanding Investment Fraud"
        title="How Do Forex Broker Scams Work?"
      >

        <Paragraph>

          Fraudulent investment offers do not
          always begin with a request for a
          substantial financial commitment.

          An initial approach may involve free
          trading education, an investment opportunity
          requiring a small deposit, or an unexpected
          message from someone claiming to possess
          considerable experience in financial markets.

        </Paragraph>

        <Paragraph>

          One of the difficulties in identifying
          suspicious trading businesses is that
          they may initially appear professional.

          A website can display market charts,
          account balances, transaction histories
          and customer service channels without
          independently establishing whether the
          business behind it is authorised to
          provide financial services.

        </Paragraph>

        <ScamProcessDiagram />

        <SubHeading>
          Why a Successful Initial Withdrawal Does Not Prove Legitimacy
        </SubHeading>

        <Paragraph>

          A common misconception is that a successful
          withdrawal establishes that a trading
          platform is legitimate.

          Regulatory warnings have described fraud
          cases in which customers initially received
          limited withdrawals but subsequently encountered
          serious difficulties when attempting to
          recover larger amounts.

        </Paragraph>

        <Paragraph>

          A successful transaction is therefore
          only one piece of information. It should
          not replace independent verification of
          the financial institution, its regulatory
          permissions and the contractual entity
          responsible for client funds.

        </Paragraph>

        <SubHeading>
          Different Types of Trading-Related Investment Fraud
        </SubHeading>

        <Paragraph>

          Trading-related fraud can take different
          forms depending on the organisation involved
          and the financial service it claims to provide.

          Examples include:

        </Paragraph>

        <ArticleList
          items={[
            "Websites falsely presenting themselves as regulated forex or CFD brokers.",
            "Businesses impersonating established financial institutions.",
            "Unauthorised account management and investment services.",
            "Trading signal communities promoting unverifiable investment platforms.",
            "Applications displaying account balances and returns that cannot be independently verified.",
            "Fraudulent recovery services targeting individuals who previously lost money.",
          ]}
        />

        <Paragraph>

          Although the circumstances vary, the
          central principle remains unchanged:
          independently establish who is providing
          the financial service before transferring
          money or sharing sensitive personal
          information.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 3 – TEN WARNING SIGNS
      ====================================================== */}

      <ArticleSection
        id="warning-signs"
        eyebrow="The Main Forex Scam Red Flags"
        title="10 Warning Signs of a Scam Forex Broker"
      >

        <Paragraph>

          Drawing on investor protection guidance
          and warnings issued by financial regulators,
          the Broker Alarab Research Team has
          identified ten practical warning signs
          that prospective traders can use when
          researching an online forex or CFD broker.

        </Paragraph>

        <Paragraph>

          An individual warning sign does not
          necessarily establish that a financial
          business has committed fraud.

          However, serious inconsistencies or
          multiple suspicious practices provide
          sufficient reason to stop and conduct
          independent investigations before
          transferring additional funds.

        </Paragraph>

        <WarningSignsList />

        <Note
          title="Do All Ten Warning Signs Need to Be Present?"
          tone="blue"
        >

          No. A single serious warning sign may
          justify a decision not to fund an account,
          particularly when it involves identity
          impersonation, unverifiable payment
          arrangements or additional payment
          demands to release existing funds.

          Equally, the absence of these warning
          signs does not guarantee that a broker
          is safe or suitable.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 4 – CLONE FIRMS
      ====================================================== */}

      <ArticleSection
        id="clone-firms"
        eyebrow="Financial Identity Impersonation"
        title="How to Identify Clone Forex Brokers and Fake Regulatory Claims"
      >

        <Paragraph>

          One of the most significant mistakes
          traders can make when verifying a broker
          is to search for its licence number,
          discover that the number exists, and
          assume that the verification process
          is complete.

          What happens if the licence is genuine,
          but the website you are dealing with
          does not belong to the licence holder?

        </Paragraph>

        <Paragraph>

          Financial regulators refer to this
          type of impersonation as a{" "}

          <Strong>clone firm</Strong>

          . An unauthorised business may falsely
          present itself as an established financial
          institution, creating the impression that
          customers benefit from the regulatory
          protections associated with the genuine firm.

        </Paragraph>

        <CloneFirmExample />

        <Paragraph>

          In the hypothetical example above,
          a search for the licence number could
          return a genuine financial institution.

          However, this result would not establish
          that the alternative website or email
          address belongs to that authorised business.

        </Paragraph>

        <SubHeading>
          What Information Should You Cross-Check?
        </SubHeading>

        <GuideTable
          headers={[
            "Verification Item",
            "What You Should Confirm",
          ]}
          rows={[
            [
              "Legal Company Name",
              "The full registered name of the authorised legal entity.",
            ],
            [
              "Licence Number",
              "Its existence, current status and relevant regulatory permissions.",
            ],
            [
              "Website Address",
              "Whether the domain belongs to the verified financial institution.",
            ],
            [
              "Email Address",
              "Whether the communication channel is associated with the genuine firm.",
            ],
            [
              "Telephone Number",
              "Official contact information obtained independently.",
            ],
            [
              "Authorised Activities",
              "Whether the permissions cover the financial service being offered.",
            ],
            [
              "Contracting Entity",
              "Whether the client agreement identifies the verified legal entity.",
            ],
          ]}
        />

        <Paragraph>

          If someone claims that the contact
          information held by a regulator is
          outdated, do not rely solely on that
          person's explanation.

          Contact the regulator or genuine financial
          institution using information obtained
          independently from official sources.

        </Paragraph>

        <Paragraph>

          The{" "}

          <a
            href="https://www.fca.org.uk/consumers/clone-firms-individuals"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#176ac8] hover:underline"
          >
            FCA's consumer guidance on clone firms
          </a>

          {" "}provides further information about
          financial identity impersonation and
          the importance of verifying contact
          details before making payments.

        </Paragraph>

        <Note
          title="A Valid Licence Number Does Not Authenticate Every Website"
          tone="blue"
        >

          Regulatory verification must establish
          the relationship between the website,
          the individual contacting you and
          the authorised legal entity.

          Finding a genuine licence number is
          only one part of this process.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 5 – VERIFY BROKER LICENCE
      ====================================================== */}

      <ArticleSection
        id="verify-broker-license"
        eyebrow="Practical Broker Due Diligence"
        title="How to Verify a Forex Broker's Licence Step by Step"
      >

        <Paragraph>

          Verifying financial authorisation is
          one of the most important steps when
          researching a forex or CFD broker.

          A structured verification process can
          help establish the identity of the
          financial institution and the regulatory
          framework applicable to your account.

        </Paragraph>

        <SubHeading>
          Step 1: Identify the Legal Company Name
        </SubHeading>

        <Paragraph>

          Review the broker's website footer,
          regulatory disclosures and client agreement
          to determine the full legal name of
          the company that will provide your
          trading services.

          The commercial brand may differ from
          the legal name of the company registered
          with the financial regulator.

        </Paragraph>

        <SubHeading>
          Step 2: Identify the Regulator and Licence Number
        </SubHeading>

        <Paragraph>

          Determine which financial authority
          supervises the specific legal entity
          and obtain its regulatory reference
          or licence number.

          Do not confuse a commercial registration
          number with permission to conduct
          regulated financial activities.

        </Paragraph>

        <Paragraph>

          You can explore the{" "}

          <Link
            href="/en/licenses"
            className="font-bold text-[#176ac8] hover:underline"
          >
            Broker Alarab financial regulation directory
          </Link>

          {" "}to learn about different regulatory
          authorities and their respective
          financial oversight frameworks.

        </Paragraph>

        <SubHeading>
          Step 3: Search the Official Regulatory Register
        </SubHeading>

        <Paragraph>

          Visit the financial regulator's official
          website independently.

          Search for the legal company name or
          regulatory reference number and review
          the current authorisation status.

          Check whether its permissions remain
          active, restricted, suspended or revoked,
          and whether the relevant financial
          activities are covered.

        </Paragraph>

        <LicenseSearchPlacement />

        <SubHeading>
          Step 4: Verify the Website and Contact Information
        </SubHeading>

        <Paragraph>

          Compare the financial institution's
          official information with the website,
          email address and telephone numbers
          used by the representative contacting you.

          If relevant information is unavailable
          through the public register, seek
          independent confirmation from the
          financial institution or regulator.

        </Paragraph>

        <SubHeading>
          Step 5: Establish Which Legal Entity Will Serve Your Account
        </SubHeading>

        <Paragraph>

          International brokerage groups frequently
          operate through several legal entities
          established in different jurisdictions.

          The entity responsible for a particular
          trading account may depend on the client's
          country of residence, product selection
          and the group's regional service structure.

        </Paragraph>

        <Paragraph>

          A group may hold several recognised
          financial licences without every client
          benefiting from the regulatory protections
          associated with each of those licences.

        </Paragraph>

        <div className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

          <h3 className="mb-3 text-[20px] font-black text-[#102747] sm:text-[24px]">
            One Brokerage Brand May Operate Through Multiple Legal Entities
          </h3>

          <p className="mb-6 text-[13px] leading-7 text-[#64748b]">
            A hypothetical example illustrating the difference
            between an international broker brand and its
            individual regulated entities.
          </p>

          <div className="mx-auto max-w-[420px] rounded-[12px] bg-[#102747] p-5 text-center text-[17px] font-black text-white">
            International Brokerage Group
          </div>

          <div
            aria-hidden="true"
            className="py-3 text-center text-[25px] font-bold text-[#94a3b8]"
          >
            ↓
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {[
              {
                title: "Legal Entity A",
                location: "United Kingdom",
                licence: "FCA",
                href: "/en/licenses/fca",
              },
              {
                title: "Legal Entity B",
                location: "Australia",
                licence: "ASIC",
                href: "/en/licenses/asic",
              },
              {
                title: "Legal Entity C",
                location: "Cyprus",
                licence: "CySEC",
                href: "/en/licenses/cysec",
              },
            ].map((entity) => (

              <Link
                key={entity.title}
                href={entity.href}
                className="rounded-[12px] border border-[#dce6ef] bg-white p-4 text-center hover:border-[#176ac8]"
              >

                <div className="text-[13px] font-bold text-[#176ac8]">
                  {entity.title}
                </div>

                <h4 className="my-3 text-[16px] font-black text-[#102747]">
                  {entity.location}
                </h4>

                <div className="text-[23px] font-black text-[#176ac8]">
                  {entity.licence}
                </div>

                <p className="mt-3 text-[12px] leading-7 text-[#64748b]">
                  Explore Regulation →
                </p>

              </Link>

            ))}

          </div>

          <p className="mt-5 text-center text-[12px] leading-7 text-[#64748b]">
            Illustrative example only. Client protections,
            product restrictions and legal rights depend
            on the contracting entity and the applicable
            regulatory framework.
          </p>

        </div>

        <SubHeading>
          Step 6: Check Authorisation in Your Country of Residence
        </SubHeading>

        <Paragraph>

          A financial licence issued in one
          jurisdiction does not automatically
          authorise a broker to market or provide
          every financial service internationally.

          Different countries maintain their
          own rules governing retail forex,
          contracts for difference, investment
          services and the marketing of leveraged
          financial products.

        </Paragraph>

        <Paragraph>

          Before opening an account, establish
          whether the broker can legally provide
          the relevant service to residents of
          your country and whether the proposed
          account structure is consistent with
          local regulatory requirements.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 6 – FINANCIAL REGULATORS
      ====================================================== */}

      <ArticleSection
        id="official-regulators"
        eyebrow="International Regulatory Verification"
        title="Where Can You Check Forex Broker Regulation?"
      >

        <Paragraph>

          Official regulatory registers provide
          an important starting point for researching
          financial institutions.

          Many financial authorities maintain
          public information about authorised
          businesses, disciplinary actions,
          regulatory permissions and warnings
          concerning unauthorised activities.

        </Paragraph>

        <Paragraph>

          Broker Alarab's regulatory directory
          helps readers explore financial supervision
          across different jurisdictions and identify
          brokers listed under the relevant authorities.

          This research should be supplemented
          by direct verification through the
          appropriate official regulatory register.

        </Paragraph>

        <RegulatoryDirectory />

        <SubHeading>
          How to Verify Forex Brokers in Major International Markets
        </SubHeading>

        <Paragraph>

          The relevant verification process
          differs according to your country of
          residence and the financial products
          you intend to trade.

          Traders in the United Kingdom, Canada,
          the United States, Australia, Singapore
          and Malaysia should pay particular
          attention to the local requirements
          that apply to their proposed accounts.

        </Paragraph>

        <CountryVerificationDirectory />

        <SubHeading>
          United Kingdom and European Forex Traders
        </SubHeading>

        <Paragraph>

          In the United Kingdom, prospective
          clients should verify the relevant
          financial institution through the{" "}

          <Link
            href="/en/licenses/fca"
            className="font-bold text-[#176ac8] hover:underline"
          >
            Financial Conduct Authority
          </Link>

          {" "}and establish that its permissions
          cover the services being offered.

          Traders in European Union member states
          should consider the relevant national
          financial authority and the applicable
          cross-border authorisation arrangements.

        </Paragraph>

        <Paragraph>

          A licence issued by an authority such
          as{" "}

          <Link
            href="/en/licenses/cysec"
            className="font-bold text-[#176ac8] hover:underline"
          >
            CySEC
          </Link>

          {" "}or{" "}

          <Link
            href="/en/licenses/bafin"
            className="font-bold text-[#176ac8] hover:underline"
          >
            BaFin
          </Link>

          {" "}must still be assessed alongside
          the legal entity, authorised services
          and relevant client eligibility rules.

        </Paragraph>

        <SubHeading>
          United States and Canadian Forex Traders
        </SubHeading>

        <Paragraph>

          Retail forex traders in the United States
          should review the relevant CFTC and{" "}

          <Link
            href="/en/licenses/nfa"
            className="font-bold text-[#176ac8] hover:underline"
          >
            NFA
          </Link>

          {" "}requirements and verify whether the
          business is appropriately registered
          for the relevant activities.

          The international availability of a
          broker's website does not establish
          that its services can legally be
          offered to US residents.

        </Paragraph>

        <Paragraph>

          In Canada, securities and derivatives
          regulation involves provincial and
          territorial authorities.

          Traders should consult official
          registration resources and, where
          relevant, information provided by the{" "}

          <Link
            href="/en/licenses/ciro"
            className="font-bold text-[#176ac8] hover:underline"
          >
            Canadian Investment Regulatory Organization
          </Link>

          {" "}before choosing an investment dealer.

        </Paragraph>

        <SubHeading>
          Singapore and Malaysian Forex Traders
        </SubHeading>

        <Paragraph>

          Singapore and Malaysia maintain distinct
          regulatory frameworks for financial
          services and capital market activities.

          Investors in Singapore can use the
          Monetary Authority of Singapore's{" "}

          <a
            href="https://eservices.mas.gov.sg/fid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#176ac8] hover:underline"
          >
            Financial Institutions Directory
          </a>

          {" "}to review regulated institutions
          and their authorised activities.

        </Paragraph>

        <Paragraph>

          In Malaysia, the Securities Commission's{" "}

          <a
            href="https://www.sc.com.my/investment-checker"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#176ac8] hover:underline"
          >
            Investment Checker
          </a>

          {" "}provides an official resource for
          reviewing whether an organisation or
          individual is authorised for relevant
          capital market services.

        </Paragraph>

        <Paragraph>

          Traders in both markets should avoid
          assuming that a broker's overseas
          licence establishes permission to
          provide all financial products locally.

        </Paragraph>

        <SubHeading>
          Does Absence From a Regulatory Warning List Prove Safety?
        </SubHeading>

        <Paragraph>

          No. Regulatory warning lists contain
          information concerning businesses that
          have come to the attention of the
          relevant authorities.

          Newly established or recently discovered
          suspicious websites may not yet appear
          on those lists.

        </Paragraph>

        <Paragraph>

          Traders should seek affirmative evidence
          of the financial institution's identity
          and authorisation rather than relying
          exclusively on the absence of a warning.

        </Paragraph>

        <a
          href="https://www.fca.org.uk/consumers/warning-list-unauthorised-firms"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-[#176ac8] hover:underline"
        >
          Explore the FCA's Official Warning List ↗
        </a>

      </ArticleSection>

      {/* =====================================================
          SECTION 7 – BROKER COMPARISON
      ====================================================== */}

      <ArticleSection
        id="broker-comparison"
        eyebrow="Practical Broker Comparison"
        title="Regulated Forex Brokers vs Suspicious Trading Platforms"
      >

        <Paragraph>

          Understanding the differences between
          transparent financial business practices
          and potential warning signs can support
          more informed decisions when choosing
          a trading broker.

          The appearance of a website, the size
          of its marketing campaigns or the
          popularity of its social media channels
          should not determine whether a financial
          institution is considered legitimate.

        </Paragraph>

        <BrokerTransparencyTable />

        <SubHeading>
          Does Financial Regulation Eliminate All Broker Risks?
        </SubHeading>

        <Paragraph>

          Financial regulation establishes an
          oversight framework under which an
          authorised business is expected to
          operate.

          Depending on the jurisdiction and the
          type of financial service, this framework
          may include requirements relating to
          capital adequacy, handling client funds,
          financial disclosures and complaint
          management.

        </Paragraph>

        <Paragraph>

          However, regulation does not eliminate
          operational risks, market losses, insolvency
          risks or the possibility of misconduct.

          Investor compensation arrangements,
          negative balance protection and dispute
          resolution rights also vary depending
          on the relevant legal entity, jurisdiction
          and product classification.

        </Paragraph>

        <SubHeading>
          Are Offshore Forex Brokers Necessarily Fraudulent?
        </SubHeading>

        <Paragraph>

          An offshore licence does not, by itself,
          establish that a financial business
          is fraudulent.

          Different jurisdictions maintain
          different regulatory requirements,
          supervisory arrangements and investor
          protection frameworks.

        </Paragraph>

        <Paragraph>

          When researching an offshore broker,
          traders should pay particular attention
          to the authority issuing the licence,
          the applicable regulatory permissions,
          the legal entity providing the service
          and the available routes for resolving
          disputes.

        </Paragraph>

        <Paragraph>

          Regulatory authorisation should therefore
          be assessed in context rather than treated
          as a simple label indicating whether an
          institution is universally safe or unsafe.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 8 – CHOOSING A BROKER
      ====================================================== */}

      <ArticleSection
        id="choose-a-broker"
        eyebrow="Broker Research and Due Diligence"
        title="How to Choose a Forex Broker and Avoid Suspicious Platforms"
      >

        <Paragraph>

          Once businesses with serious unresolved
          warning signs or unverifiable identities
          have been excluded from consideration,
          the next step is to compare brokers
          whose services may meet your trading
          requirements.

          This comparison should not depend solely
          on financial regulation, minimum deposits
          or promotional offers.

        </Paragraph>

        <Paragraph>

          Broker Alarab provides detailed broker
          research covering financial regulation,
          account types, trading platforms, fees
          and deposit and withdrawal conditions.

          These resources can help traders develop
          a clearer understanding of different
          brokerage models before undertaking
          their own independent checks.

        </Paragraph>

        <FeaturedBrokerReviews />

        <SubHeading>
          Essential Criteria When Comparing Forex Brokers
        </SubHeading>

        <GuideTable
          headers={[
            "Research Criteria",
            "Questions to Consider",
          ]}
          rows={[
            [
              "Financial Regulation",
              "Which legal entity will provide my trading services?",
            ],
            [
              "Client Fund Arrangements",
              "How are client funds handled and what protections apply to my account?",
            ],
            [
              "Trading Costs",
              "What spreads, commissions, financing charges and additional fees apply?",
            ],
            [
              "Deposits and Withdrawals",
              "Which funding methods are available and what conditions govern withdrawals?",
            ],
            [
              "Trading Accounts",
              "Do the account's features correspond to my experience and financial circumstances?",
            ],
            [
              "Leverage and Margin",
              "What risks arise from leverage and margin requirements?",
            ],
            [
              "Product Availability",
              "Which financial instruments are legally available in my jurisdiction?",
            ],
            [
              "Complaint Resolution",
              "How can I submit a formal complaint and what external dispute mechanisms are available?",
            ],
          ]}
        />

        <Paragraph>

          Researching several brokerage options
          can reduce the likelihood of making
          a hurried decision based on a promotional
          advertisement or sales conversation.

          You can also explore our{" "}

          <Link
            href="/en/compare-accounts"
            className="font-bold text-[#176ac8] hover:underline"
          >
            trading account comparison tool
          </Link>

          {" "}to investigate differences between
          account structures, fees and trading
          conditions.

        </Paragraph>

        <Paragraph>

          Remember that favourable trading costs,
          high editorial ratings and an established
          commercial reputation do not replace
          independent verification of the legal
          entity serving your account.

        </Paragraph>

        <Link
          href="/en/how-we-review-brokers"
          className="inline-flex items-center gap-2 font-bold text-[#176ac8] hover:underline"
        >
          Explore How Broker Alarab Reviews Trading Brokers →
        </Link>

      </ArticleSection>

      {/* =====================================================
          SECTION 9 – PRE-DEPOSIT CHECKLIST
      ====================================================== */}

      <ArticleSection
        id="before-deposit"
        eyebrow="Interactive Broker Safety Checklist"
        title="10 Checks to Complete Before Depositing Money With a Forex Broker"
      >

        <Paragraph>

          Whether you are preparing to open your
          first live trading account or considering
          a move to a different broker, reviewing
          several fundamental questions can help
          you evaluate the proposed financial
          relationship.

        </Paragraph>

        <Paragraph>

          Use the following interactive checklist
          to record the verification steps you
          have independently completed.

          It is intended as a practical research
          aid rather than a scoring system that
          guarantees the legitimacy or suitability
          of a financial institution.

        </Paragraph>

        <PreDepositChecklist />

        <SubHeading>
          Questions You Can Send to a Broker Before Opening an Account
        </SubHeading>

        <Paragraph>

          If essential information is unavailable
          on the broker's website, consider requesting
          it in writing through independently
          verified official communication channels.

        </Paragraph>

        <div className="my-7 rounded-[16px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

          <div className="mb-3 text-[12px] font-bold text-[#176ac8]">
            Sample Broker Verification Enquiry
          </div>

          <div className="rounded-[12px] border border-[#dce6ef] bg-white p-5 text-[14px] leading-9 text-[#475569] sm:text-[15px]">

            <p className="mb-3 font-bold text-[#102747]">
              Hello,
            </p>

            <p className="mb-4">

              Before opening a trading account
              with your company, I would appreciate
              confirmation of the following information:

            </p>

            <ol className="list-decimal space-y-2 ps-5">

              <li>
                The full legal name of the entity that will provide my trading services.
              </li>

              <li>
                The applicable financial regulator and licence or registration number.
              </li>

              <li>
                A reference to the official regulatory register where I can verify the authorisation.
              </li>

              <li>
                Confirmation of whether clients residing in my country are eligible for the relevant services.
              </li>

              <li>
                Copies of the applicable client agreement, funding policies and fee information.
              </li>

              <li>
                Details of the formal complaint process and available dispute resolution mechanisms.
              </li>

            </ol>

            <p className="mt-4">
              Thank you.
            </p>

          </div>

        </div>

        <Paragraph>

          Receiving clear answers does not establish
          legitimacy on its own, but it provides
          information that can be used for independent
          regulatory and contractual verification.

          Refusal to provide fundamental details,
          particularly when combined with pressure
          to deposit money, deserves additional
          consideration.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 10 – WITHDRAWAL PROBLEMS
      ====================================================== */}

      <ArticleSection
        id="withdrawal-problems"
        eyebrow="Funding and Withdrawal Safety"
        title="Does a Withdrawal Delay Mean a Forex Broker Is a Scam?"
      >

        <Paragraph>

          Withdrawal difficulties are a common
          reason why traders begin questioning
          the legitimacy of an online broker.

          However, it is important to distinguish
          delays arising from genuine operational
          or regulatory procedures from practices
          that may indicate fraudulent activity.

        </Paragraph>

        <SubHeading>
          Potentially Legitimate Reasons for Withdrawal Delays
        </SubHeading>

        <ArticleList
          items={[
            "Incomplete customer identity verification.",
            "Additional documentation required under applicable anti-money laundering procedures.",
            "Open trading positions or margin requirements affecting available funds.",
            "Verification of ownership of the payment method.",
            "Bank holidays or payment processing schedules.",
            "Security reviews associated with account changes or unusual transactions.",
          ]}
        />

        <Paragraph>

          Such procedures should be consistent
          with the account's applicable terms
          and regulatory requirements.

          Clients should seek a clear explanation
          of the delay and any reasonable steps
          required to resolve the issue, subject
          to applicable legal restrictions.

        </Paragraph>

        <GuideTable
          headers={[
            "Situation",
            "Potential Explanation",
            "Appropriate Response",
          ]}
          rows={[
            [
              "Additional identity document requested",
              "Potential regulatory verification",
              "Use the independently verified official account portal.",
            ],
            [
              "Payment delayed during a public holiday",
              "Potential processing delay",
              "Review the published payment processing schedule.",
            ],
            [
              "Repeated unanswered withdrawal requests",
              "Situation requiring escalation",
              "Submit a formal written complaint and preserve the evidence.",
            ],
            [
              "Additional deposit required to release profits",
              "Serious warning sign",
              "Stop additional payments and seek independent verification.",
            ],
            [
              "Tax payment requested through a personal account",
              "Potential fraudulent payment demand",
              "Do not transfer funds without independent confirmation.",
            ],
            [
              "Account closed and communication discontinued",
              "Situation requiring investigation",
              "Preserve evidence and contact the relevant authorities.",
            ],
          ]}
        />

        <SubHeading>
          What Should You Do If a Broker Refuses Your Withdrawal?
        </SubHeading>

        <Paragraph>

          Request a written explanation identifying
          the reason for the refusal, the policy
          or contractual provision involved and
          the steps available to resolve the issue.

          If the matter remains unresolved,
          consider using the broker's formal
          complaint process and the appropriate
          external regulatory or dispute
          resolution channels.

        </Paragraph>

        <Note
          title="Do Not Send Additional Funds to Release an Existing Balance"
          tone="blue"
        >

          If a suspicious platform demands a new
          transfer for alleged taxes, account release
          charges or similar unexpected fees,
          do not assume that making the payment
          will recover your funds.

          Independently verify any claimed obligation
          with the relevant financial, tax or regulatory
          authority.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 11 – RESPONDING TO FRAUD
      ====================================================== */}

      <ArticleSection
        id="what-to-do-if-scammed"
        eyebrow="Responding to Suspected Investment Fraud"
        title="What to Do If You Have Been Scammed by a Forex Broker"
      >

        <Paragraph>

          If you believe that you have been
          affected by investment fraud, the
          immediate priority is preventing
          further financial losses and securing
          your personal information.

          Preserving evidence and contacting the
          appropriate authorities promptly may
          help establish the available options.

        </Paragraph>

        <FraudResponseSteps />

        <SubHeading>
          What Evidence Should You Preserve?
        </SubHeading>

        <Paragraph>

          Maintaining a secure record of events
          can assist banks, payment providers,
          regulators and law enforcement authorities
          when reviewing the circumstances of
          a suspected fraud.

          Relevant information may include:

        </Paragraph>

        <ArticleList
          items={[
            "The commercial name and claimed legal identity of the broker.",
            "Website addresses and trading platform details.",
            "Telephone numbers, email addresses and communication records.",
            "Messages containing financial promises or payment instructions.",
            "Bank transfer receipts and card transaction records.",
            "Cryptocurrency wallet addresses and transaction identifiers where applicable.",
            "Trading account statements and withdrawal request records.",
            "Complaint reference numbers, relevant dates and amounts.",
          ]}
        />

        <Paragraph>

          Store this information securely.

          Do not publicly disclose your banking
          information, identity documents or
          account passwords when seeking assistance
          through social media or online discussion
          groups.

        </Paragraph>

        <SubHeading>
          Can Money Lost to a Scam Broker Be Recovered?
        </SubHeading>

        <Paragraph>

          Recovery depends on several factors,
          including how the payment was made,
          how quickly the suspected fraud was
          identified, the recipients involved
          and the legal frameworks applicable
          to the transactions.

          No recovery outcome can be guaranteed.

        </Paragraph>

        <GuideTable
          headers={[
            "Payment Method",
            "Options to Discuss With Your Provider",
          ]}
          rows={[
            [
              "Debit or Credit Card",
              "Report the suspected fraud and ask whether the transaction can be disputed under applicable rules and deadlines.",
            ],
            [
              "Bank Transfer",
              "Ask whether the payment can be stopped or recalled and whether the recipient institution can be contacted.",
            ],
            [
              "Electronic Payment Provider",
              "Submit an official report and review the applicable transaction dispute procedures.",
            ],
            [
              "Cryptocurrency",
              "Notify the exchange or service provider and relevant authorities, providing transaction identifiers where appropriate.",
            ],
          ]}
          caption="Recovery options differ according to the transaction, payment provider and applicable legal framework. None of these procedures guarantees reimbursement."
        />

        <SubHeading>
          Reporting Suspected Broker Fraud in Different Countries
        </SubHeading>

        <Paragraph>

          Reporting arrangements vary internationally.
          Depending on the circumstances, individuals
          may need to contact both financial
          regulators and their national fraud
          reporting or law enforcement authorities.

          A regulatory report does not automatically
          result in the recovery of individual
          financial losses.

        </Paragraph>

        <GuideTable
          headers={[
            "Country",
            "Relevant Financial Authority",
            "Additional Reporting Route",
          ]}
          rows={[
            [
              "United Kingdom",
              "Financial Conduct Authority",
              "National fraud reporting service or police",
            ],
            [
              "United States",
              "CFTC and other relevant authorities",
              "FTC or appropriate law enforcement authorities",
            ],
            [
              "Canada",
              "Provincial securities regulator / CIRO where relevant",
              "Canadian Anti-Fraud Centre and local police",
            ],
            [
              "Australia",
              "ASIC",
              "Scamwatch and relevant police authorities",
            ],
            [
              "Singapore",
              "Monetary Authority of Singapore",
              "Singapore Police Force",
            ],
            [
              "Malaysia",
              "Securities Commission Malaysia where relevant",
              "National Scam Response Centre and police",
            ],
          ]}
          caption="The appropriate reporting route depends on the financial product, service provider and circumstances of the suspected fraud."
        />

        <Paragraph>

          Some transactions may be difficult
          to reverse once the funds have been
          transferred.

          Nevertheless, contacting your bank,
          payment provider and the relevant
          authorities promptly can help establish
          which options remain available.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 12 – RECOVERY SCAMS
      ====================================================== */}

      <ArticleSection
        id="recovery-scams"
        eyebrow="Secondary Investment Fraud"
        title="Beware of Forex Fund Recovery Scams"
      >

        <Paragraph>

          Investment fraud may not end when
          someone discovers that a trading
          platform is suspicious.

          Individuals who have previously lost
          money may subsequently receive unexpected
          communications from people claiming
          to be lawyers, regulatory representatives
          or specialist fund recovery professionals.

        </Paragraph>

        <Paragraph>

          Such individuals may offer to recover
          the lost money in exchange for an
          advance payment or administrative
          charge.

          Financial regulators, including the
          FCA, have issued specific warnings
          concerning fraudulent recovery services,
          sometimes referred to as recovery room
          scams.

        </Paragraph>

        <div className="my-8 rounded-[18px] border border-[#fecaca] bg-[#fff7f7] p-5 sm:p-7">

          <h3 className="mb-5 text-[21px] font-black leading-9 text-[#102747] sm:text-[25px]">
            Do Not Allow a Recovery Attempt to Cause Additional Financial Losses
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {[
              "Promises of guaranteed or 100% fund recovery.",
              "Payment requests involving personal or unverifiable bank accounts.",
              "Claims of acting on behalf of a regulator without independent confirmation.",
              "Unexplained access to information about your previous financial losses.",
              "Requests for banking credentials or account authentication codes.",
              "Pressure to make payments before reviewing professional engagement terms.",
            ].map((item) => (

              <div
                key={item}
                className="flex items-start gap-3 rounded-[11px] border border-[#fecaca] bg-white p-4"
              >

                <span className="text-[17px] font-black text-[#b91c1c]">
                  !
                </span>

                <span className="text-[13px] font-bold leading-7 text-[#475569]">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

        <Paragraph>

          The existence of professional legal
          fees does not automatically establish
          that a service is fraudulent.

          However, the identity, qualifications,
          professional registration, scope of
          work and fee agreement of any legal
          representative should be independently
          verified.

        </Paragraph>

        <Paragraph>

          If an individual claims to represent
          a financial regulator, contact the
          regulator directly using communication
          details obtained from its official
          website.

        </Paragraph>

        <a
          href="https://www.fca.org.uk/consumers/recovery-room-scams"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-[#176ac8] hover:underline"
        >
          Read the FCA's Guidance on Recovery Room Scams ↗
        </a>

      </ArticleSection>

      {/* =====================================================
          SECTION 13 – EDITORIAL CONCLUSION
      ====================================================== */}

      <ArticleSection
        id="editorial-conclusion"
        eyebrow="Broker Alarab Research Team"
        title="Final Assessment: Protecting Your Money When Choosing a Forex Broker"
      >

        <Paragraph>

          Protecting a trading account does not
          begin with selecting a profitable
          strategy, analysing market indicators
          or identifying the next trading
          opportunity.

          It begins much earlier, with establishing
          the identity and regulatory status
          of the financial institution that
          will provide the trading services.

        </Paragraph>

        <Paragraph>

          Spending additional time reviewing
          a broker's legal structure, financial
          authorisation and contractual conditions
          may be considerably more valuable than
          acting quickly on a promotional offer
          or an unexpected investment opportunity.

        </Paragraph>

        <Paragraph>

          From the perspective of the Broker
          Alarab Research Team, broker selection
          should incorporate four fundamental
          areas of due diligence:

        </Paragraph>

        <div className="my-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {[
            {
              number: "01",
              title: "Independent Verification",
              description:
                "Confirm the legal identity and applicable financial authorisation through official sources rather than relying on promotional claims.",
            },
            {
              number: "02",
              title: "Financial and Contractual Transparency",
              description:
                "Understand trading costs, funding policies, legal rights and account obligations before opening a trading account.",
            },
            {
              number: "03",
              title: "Research and Comparison",
              description:
                "Investigate differences between brokerage groups, individual legal entities and available account structures.",
            },
            {
              number: "04",
              title: "Financial Risk Management",
              description:
                "Understand leverage, market volatility and the possibility of losses, and avoid committing funds you cannot afford to lose.",
            },
          ].map((item) => (

            <div
              key={item.number}
              className="rounded-[15px] border border-[#dce6ef] bg-[#f7faff] p-5"
            >

              <div className="mb-3 text-[26px] font-black text-[#176ac8]">
                {item.number}
              </div>

              <h3 className="mb-2 text-[17px] font-black text-[#102747]">
                {item.title}
              </h3>

              <p className="text-[13px] leading-7 text-[#475569]">
                {item.description}
              </p>

            </div>

          ))}

        </div>

        <Paragraph>

          No financial institution can eliminate
          market risk or guarantee investment
          profits.

          However, traders can take meaningful
          steps to reduce their exposure to
          fraudulent businesses by conducting
          independent research, verifying financial
          permissions and understanding the
          legal relationship established when
          opening a trading account.

        </Paragraph>

        <RelatedGuides />

        <Note
          title="A Trading Opportunity Is Never a Substitute for Due Diligence"
          tone="blue"
        >

          Missing a potential market opportunity
          is preferable to transferring money to
          an organisation whose identity and
          financial authorisation cannot be
          independently established.

          Financial decisions should be based
          on verifiable information rather than
          pressure, promises or fear of missing out.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 14 – FAQ
      ====================================================== */}

      <ArticleSection
        id="faq"
        eyebrow="Frequently Asked Questions"
        title="Frequently Asked Questions About Scam Forex Brokers"
      >

        <ArticleFAQ />

      </ArticleSection>

      {/* =====================================================
          SECTION 15 – SOURCES
      ====================================================== */}

      <ArticleSection
        id="sources"
        eyebrow="Research Methodology & Official References"
        title="Sources and Editorial Methodology"
      >

        <Paragraph>

          This guide was prepared by the Broker
          Alarab Research Team using publicly
          available investor protection guidance
          and regulatory information concerning
          forex fraud, online trading scams,
          financial identity impersonation and
          fraudulent recovery services.

        </Paragraph>

        <SubHeading>
          Editorial Methodology
        </SubHeading>

        <ArticleList
          items={[
            "Reviewing official guidance concerning forex and online investment fraud.",
            "Identifying warning signs associated with financial authorisation, payment arrangements and withdrawal restrictions.",
            "Preparing hypothetical examples to illustrate potentially suspicious financial practices.",
            "Distinguishing market-related investment risks from indicators of financial fraud.",
            "Providing practical steps for independent broker and regulatory verification.",
            "Identifying relevant official verification resources across international trading markets.",
            "Separating educational investor protection content from commercial broker research and comparison features.",
          ]}
        />

        <Paragraph>

          The hypothetical examples, financial
          amounts, website addresses and fictional
          company information used throughout
          this article are provided for educational
          purposes.

          They are not intended to represent
          allegations against any identified
          individual or financial institution.

        </Paragraph>

        <Paragraph>

          This guide does not provide an exhaustive
          description of every form of investment
          fraud.

          Financial products, technological
          developments and fraudulent practices
          may evolve over time, making continuing
          independent verification important.

        </Paragraph>

        <SubHeading>
          Official Regulatory and Investor Protection Sources
        </SubHeading>

        <ArticleSources />

        <div className="mt-7 rounded-[14px] border border-[#e3eaf1] bg-[#f8fafc] p-5 sm:p-6">

          <h3 className="mb-3 text-[15px] font-black text-[#102747]">
            Disclaimer
          </h3>

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            Broker Alarab provides this content
            for financial education, research and
            general information purposes.

            It does not constitute investment advice,
            legal advice or a legal determination
            concerning any financial institution.

            The inclusion or rating of a broker
            on Broker Alarab does not guarantee
            the safety of client funds, product
            suitability or authorisation to provide
            services in every jurisdiction.

            Regulatory protections, account
            conditions and product availability
            may differ according to the legal
            entity, country and financial
            instrument involved.

            Broker Alarab may receive compensation
            through certain commercial partnerships
            and broker referral arrangements.

            Broker Alarab does not provide
            direct trading services or hold
            client trading funds.

            Leveraged forex and CFD trading
            involve substantial financial risk
            and may result in the loss of
            invested capital.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}