import Link from "next/link";

import ArticleLayout from "@/app/components/editorial/ArticleLayout";

import {
  ArticleSection,
  SubHeading,
  Paragraph,
  Strong,
  ArticleList,
  Note,
  FAQItem,
} from "@/app/components/editorial/ArticleComponents";

import {
  createArticleMetadata,
  ArticleStructuredData,
  type ArticleSEOConfig,
} from "@/app/components/editorial/ArticleSEO";

/* =========================================================
   BROKER ALARAB
   FOREX BROKER NEWS
   CAPITAL.COM – SINGAPORE MAS LICENCE
========================================================= */

const SLUG = "capital-com-singapore-mas-license";

const CATEGORY = "Forex Broker News";

const CATEGORY_HREF = "/en/forex-broker-news";

const HERO_IMAGE =
  "/articles/capital-com-singapore-mas-license.webp";

const ARTICLE = {
  title:
    "Capital.com Secures MAS Licence in Singapore, Expanding into Southeast Asia",

  seoTitle:
    "Capital.com Secures MAS Licence in Singapore",

  description:
    "Capital.com has secured a Capital Markets Services licence from Singapore's MAS, marking its first regulated presence in Southeast Asia, with a planned launch in early 2027.",

  shortTitle:
    "Capital.com Secures Singapore MAS Licence",

  subcategory:
    "Licensing & Regulation",

  author:
    "Broker Alarab Editorial Team",

  published:
    "2026-11-27",

  modified:
    "2026-11-27",
};

/* =========================================================
   OFFICIAL SOURCES
========================================================= */

const sources = [
  {
    title:
      "Capital.com – Global Fintech Group Capital.com Enters Singapore with MAS Licence",
    url:
      "https://capital.com/en-int/press/global-fintech-group-capital-com-enters-singapore-with-mas-licence-its-first-in-sea",
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
    "Capital.com secures a Monetary Authority of Singapore licence to expand into Southeast Asian financial markets",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  tags: [
    "Capital.com",
    "Singapore",
    "MAS",
    "CMS Licence",
    "Financial Regulation",
    "Southeast Asia",
    "Forex Broker News",
  ],

  keywords: [
    "Capital.com Singapore MAS licence",
    "Capital.com Singapore",
    "Capital.com regulation",
    "Capital.com news",
    "MAS regulated brokers",
    "Singapore forex broker regulation",
    "Capital Markets Services licence",
    "Singapore trading regulations",
    "Southeast Asia forex brokers",
    "Capital.com Singapore launch 2027",
  ],

  about: [
    {
      "@type": "Organization",
      name: "Capital.com",
      url: "https://capital.com",
    },
    {
      "@type": "Organization",
      name: "Monetary Authority of Singapore (MAS)",
      url: "https://www.mas.gov.sg",
    },
    {
      "@type": "Thing",
      name: "Singapore",
    },
    {
      "@type": "Thing",
      name: "Capital Markets Services Licence",
    },
    {
      "@type": "Thing",
      name: "Financial Regulation",
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
    id: "singapore-mas-license",
    label: "Capital.com's Singapore MAS licence",
  },
  {
    id: "mas-regulation",
    label: "What is MAS regulation?",
  },
  {
    id: "singapore-launch",
    label: "Expected Singapore launch date",
  },
  {
    id: "southeast-asia-expansion",
    label: "Expansion into Southeast Asia",
  },
  {
    id: "impact-on-clients",
    label: "What the licence means for clients",
  },
  {
    id: "editorial-analysis",
    label: "Broker Alarab editorial analysis",
  },
  {
    id: "faq",
    label: "Frequently asked questions",
  },
  {
    id: "sources",
    label: "Official sources",
  },
];

/* =========================================================
   LICENCE DETAILS
========================================================= */

const licenseDetails = [
  {
    label: "Broker",
    value: "Capital.com",
  },
  {
    label: "Local legal entity",
    value: "Capital Com Securities (Singapore) Pte. Ltd.",
  },
  {
    label: "Jurisdiction",
    value: "Singapore",
  },
  {
    label: "Regulatory authority",
    value: "Monetary Authority of Singapore (MAS)",
  },
  {
    label: "Licence type",
    value: "Capital Markets Services Licence (CMS)",
  },
  {
    label: "Licensed activities",
    value:
      "Dealing in capital markets products, including securities and over-the-counter derivatives",
  },
  {
    label: "Announcement date",
    value: "2 November 2026",
  },
  {
    label: "Expected client onboarding",
    value: "Early 2027",
  },
];

/* =========================================================
   LICENCE DETAILS TABLE
========================================================= */

function LicenseDetailsTable() {
  return (
    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      <table className="w-full table-fixed border-collapse text-center">

        <thead className="bg-[#102747] text-white">

          <tr>

            <th className="w-[38%] px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              Category
            </th>

            <th className="px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              Details
            </th>

          </tr>

        </thead>

        <tbody>

          {licenseDetails.map((item, index) => (

            <tr
              key={item.label}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f6f9fc]"
              }
            >

              <td className="break-words border-t border-[#e3eaf1] px-3 py-4 text-[13px] font-bold leading-7 text-[#102747] sm:px-5 sm:text-[15px]">
                {item.label}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-3 py-4 text-[13px] leading-7 text-[#475569] sm:px-5 sm:text-[15px]">
                {item.value}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

/* =========================================================
   NEWS KEY FACTS
========================================================= */

function LicenseKeyFacts() {

  const facts = [
    {
      label: "Regulator",
      value: "MAS",
      description: "Monetary Authority of Singapore",
    },
    {
      label: "Licence type",
      value: "CMS",
      description: "Capital Markets Services",
    },
    {
      label: "Announcement",
      value: "2 Nov",
      description: "2026",
    },
    {
      label: "Expected launch",
      value: "2027",
      description: "Early 2027",
    },
  ];

  return (

    <div className="my-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

      {facts.map((fact) => (

        <div
          key={fact.label}
          className="rounded-[15px] border border-[#dce6ef] bg-[#f7faff] px-3 py-5 text-center sm:px-4"
        >

          <div className="mb-3 text-[12px] font-bold text-[#64748b] sm:text-[13px]">
            {fact.label}
          </div>

          <div className="text-[23px] font-black leading-tight text-[#102747] sm:text-[28px]">
            {fact.value}
          </div>

          <div className="mt-2 text-[12px] font-medium leading-6 text-[#64748b] sm:text-[13px]">
            {fact.description}
          </div>

        </div>

      ))}

    </div>

  );
}

/* =========================================================
   REGULATORY IMPLICATIONS
========================================================= */

const regulatoryRows = [
  {
    label: "Singapore entity oversight",
    value:
      "Subject to Singapore's regulatory framework within the scope of its licence",
  },
  {
    label: "Client onboarding",
    value:
      "Subject to local eligibility and identity verification requirements",
  },
  {
    label: "Existing international accounts",
    value:
      "Not automatically transferred to the Singapore entity",
  },
  {
    label: "Operations in other Asian markets",
    value:
      "Subject to the regulatory requirements of each jurisdiction",
  },
  {
    label: "Trading and investment risks",
    value:
      "Remain present despite regulatory authorisation",
  },
];

function RegulatoryImplicationsTable() {

  return (

    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      <table className="w-full table-fixed border-collapse text-center">

        <thead className="bg-[#102747] text-white">

          <tr>

            <th className="w-[42%] px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              Regulatory aspect
            </th>

            <th className="px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              What it means for traders
            </th>

          </tr>

        </thead>

        <tbody>

          {regulatoryRows.map((row, index) => (

            <tr
              key={row.label}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f6f9fc]"
              }
            >

              <td className="break-words border-t border-[#e3eaf1] px-3 py-4 text-[13px] font-bold leading-7 text-[#102747] sm:px-5 sm:text-[15px]">
                {row.label}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-3 py-4 text-[13px] leading-7 text-[#475569] sm:px-5 sm:text-[15px]">
                {row.value}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

/* =========================================================
   RELATED BROKER REVIEW
========================================================= */

function BrokerReviewCard() {

  return (

    <div className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

      <div className="mb-3 text-[12px] font-bold text-[#176ac8] sm:text-[13px]">
        Broker Review
      </div>

      <h3 className="mb-3 text-[21px] font-black text-[#102747] sm:text-[25px]">
        Capital.com Broker Review
      </h3>

      <p className="mb-5 text-[14px] leading-8 text-[#475569] sm:text-[16px]">

        Explore Broker Alarab's review of Capital.com,
        covering its regulatory entities, financial
        licences, trading platforms, available
        instruments, trading costs, and the broker's
        key advantages and limitations.

      </p>

      <Link
        href="/en/brokers/capital-com"
        className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1058a9] sm:w-auto sm:text-[15px]"
      >

        Read the Full Capital.com Review

        <span aria-hidden="true">→</span>

      </Link>

    </div>

  );
}

/* =========================================================
   OFFICIAL SOURCES
========================================================= */

function ArticleSources() {

  return (

    <div className="my-5 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      {sources.map((source, index) => (

        <div
          key={source.url}
          className={`flex items-start gap-3 px-4 py-4 sm:px-5 ${
            index !== sources.length - 1
              ? "border-b border-[#e3eaf1]"
              : ""
          }`}
        >

          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf3fa] text-[12px] font-bold text-[#176ac8]"
          >

            {index + 1}

          </span>

          <div className="min-w-0">

            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words text-[13px] font-bold leading-7 text-[#176ac8] transition-colors hover:text-[#102747] hover:underline sm:text-[15px]"
            >

              {source.title}

              <span className="ms-2" aria-hidden="true">
                ↗
              </span>

            </a>

            <div className="mt-1 text-[12px] leading-6 text-[#64748b] sm:text-[13px]">
              Official press release – 2 November 2026
            </div>

          </div>

        </div>

      ))}

    </div>

  );
}

/* =========================================================
   ARTICLE PAGE
========================================================= */

export default function CapitalComSingaporeMASLicensePageEn() {

  return (

    <ArticleLayout

      language="en"

      slug={SLUG}

      title={ARTICLE.title}

      description={ARTICLE.description}

      category={CATEGORY}

      categoryHref={CATEGORY_HREF}

      subcategory={ARTICLE.subcategory}

      articleType="News & Analysis"

      breadcrumbTitle={ARTICLE.shortTitle}

      author={ARTICLE.author}

      published={ARTICLE.published}

      modified={ARTICLE.modified}

      heroImage={HERO_IMAGE}

      heroImageAlt={
        ARTICLE_SEO.imageAlt || ARTICLE.title
      }

      heroImageCaption="Image credit: Capital.com – Press Centre"

      contents={contents}

      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }

      introduction={

        <>

          <Paragraph>

            Global financial technology group{" "}

            <Link
              href="/en/brokers/capital-com"
              className="font-bold text-[#176ac8] hover:underline"
            >
              Capital.com
            </Link>

            {" "}announced on 2 November 2026 that its
            Singapore entity had secured a Capital
            Markets Services (CMS) licence from the
            Monetary Authority of Singapore (MAS),
            establishing the group's first regulated
            presence in Southeast Asia.

          </Paragraph>

          <Paragraph>

            The regulatory approval marks a significant
            step in the company's international
            expansion strategy, with client onboarding
            expected to begin in early 2027. The
            development raises important questions
            about the scope of the licence, the planned
            launch, and its implications for traders
            and the wider brokerage industry.

          </Paragraph>

        </>

      }

    >

      {/* =====================================================
          SECTION 1
          SINGAPORE MAS LICENCE
      ====================================================== */}

      <ArticleSection

        id="singapore-mas-license"

        eyebrow="Financial Licensing & Regulation"

        title="Capital.com's Singapore MAS Licence: Key Details"

      >

        <Paragraph>

          Capital Com Securities (Singapore) Pte. Ltd.
          has obtained a{" "}

          <Strong>
            Capital Markets Services Licence (CMS)
          </Strong>

          {" "}covering dealing in capital markets
          products, including securities and
          over-the-counter (OTC) derivatives,
          according to the company's official
          announcement.

        </Paragraph>

        <LicenseKeyFacts />

        <Paragraph>

          The Singapore entity represents the group's
          first regulated presence in Southeast Asia,
          adding to its international regulatory
          footprint across markets including the United
          Kingdom, the European Union, the Middle East,
          Africa and Australia.

        </Paragraph>

        <LicenseDetailsTable />

        <Note title="Scope of the new licence" tone="blue">

          The regulatory approval applies specifically
          to Capital.com's Singapore legal entity.
          It does not necessarily mean that every
          product offered by the group in other
          jurisdictions will be available in Singapore.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 2
          MAS REGULATION
      ====================================================== */}

      <ArticleSection

        id="mas-regulation"

        eyebrow="Understanding Broker Regulation"

        title="What Is MAS Regulation and Why Does It Matter?"

      >

        <Paragraph>

          The Monetary Authority of Singapore (MAS)
          serves as Singapore's central bank and
          integrated financial regulator. Its
          responsibilities include monetary policy
          and supervision of financial institutions.

        </Paragraph>

        <Paragraph>

          A Capital Markets Services licence authorises
          a financial institution to conduct specified
          regulated activities within the scope of its
          approval, subject to the relevant regulatory
          requirements.

        </Paragraph>

        <SubHeading>

          Why the scope of a broker's licence matters

        </SubHeading>

        <Paragraph>

          When assessing a regulated broker, identifying
          the regulatory authority is only one part of
          the process. Traders should also establish
          which legal entity will provide their
          services, what activities that entity is
          authorised to conduct, and which regulatory
          protections apply to their account.

        </Paragraph>

        <ArticleList

          items={[

            "Verify the legal name of the entity responsible for your trading account.",

            "Identify the regulated activities covered by its licence.",

            "Review the applicable client money protection arrangements.",

            "Understand the available complaints and dispute resolution procedures.",

            "Check product restrictions, leverage limits and other local regulatory requirements.",

          ]}

        />

        <Paragraph>

          Readers can explore the differences between
          international financial regulators through
          Broker Alarab's{" "}

          <Link
            href="/en/licenses"
            className="font-bold text-[#176ac8] hover:underline"
          >
            broker regulation and licensing section
          </Link>

          .

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 3
          SINGAPORE LAUNCH
      ====================================================== */}

      <ArticleSection

        id="singapore-launch"

        eyebrow="Local Market Launch"

        title="When Will Capital.com Launch in Singapore?"

      >

        <Paragraph>

          Capital.com expects to begin onboarding
          Singapore clients in early 2027. The local
          operation is led by Tony Lim, who brings
          more than 30 years of experience in
          Singapore's capital markets.

        </Paragraph>

        <Paragraph>

          The company's announced operational
          preparations include identity verification
          through Singpass MyInfo, completion of
          client verification before trading, and
          two-factor authentication for account
          access.

        </Paragraph>

        <Paragraph>

          Further details regarding the local platform
          and services are expected to become available
          ahead of the launch. These details will help
          establish how the Singapore offering differs
          from the group's existing international
          services.

        </Paragraph>

        <Note title="Is Capital.com available in Singapore now?" tone="blue">

          Obtaining regulatory approval does not
          necessarily mean that client onboarding
          has already commenced. The early 2027
          launch remains a target announced by
          the company and may be subject to change.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 4
          SOUTHEAST ASIA EXPANSION
      ====================================================== */}

      <ArticleSection

        id="southeast-asia-expansion"

        eyebrow="Global Brokerage Industry"

        title="Why Southeast Asia Matters to Capital.com's Expansion"

      >

        <Paragraph>

          Singapore's position as an established
          international financial centre makes it
          an important market for financial services
          companies seeking to develop their presence
          in Southeast Asia.

        </Paragraph>

        <Paragraph>

          From a business perspective, establishing
          a locally regulated entity allows an
          international broker to develop services
          around domestic regulatory requirements,
          local operating infrastructure and the
          needs of eligible investors.

        </Paragraph>

        <Paragraph>

          The move also reflects the importance of
          jurisdiction-specific regulation in the
          international brokerage industry, where
          market access increasingly depends on
          compliance with local financial services
          requirements.

        </Paragraph>

        <Paragraph>

          However, regulatory approval in Singapore
          does not automatically authorise Capital.com
          to provide regulated financial services
          throughout Southeast Asia. Other markets
          may impose separate licensing, marketing
          and product distribution requirements.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 5
          IMPACT ON CLIENTS
      ====================================================== */}

      <ArticleSection

        id="impact-on-clients"

        eyebrow="What Traders Need to Know"

        title="What Does the MAS Licence Mean for Capital.com Clients?"

      >

        <Paragraph>

          The primary implication of the new licence
          is the establishment of a local regulatory
          framework for services provided by the
          Singapore entity to eligible clients.

        </Paragraph>

        <Paragraph>

          For existing Capital.com customers registered
          under other legal entities, the announcement
          does not automatically change the jurisdiction,
          regulatory authority or contractual terms
          applicable to their trading accounts.

        </Paragraph>

        <RegulatoryImplicationsTable />

        <Paragraph>

          This distinction is equally relevant to
          clients in other international markets,
          including the United Kingdom, European Union,
          United Arab Emirates and other countries
          where the company operates.

        </Paragraph>

        <Paragraph>

          Regulatory protections depend on the legal
          entity providing the service and the rules
          applicable to that account, rather than
          simply the total number of licences held
          by a global brokerage brand.

        </Paragraph>

        <Note title="Risk warning" tone="amber">

          Regulatory authorisation does not guarantee
          investment returns or protect traders against
          market losses. CFDs and other leveraged
          financial instruments involve a high degree
          of risk, even when traded through a regulated
          financial services provider.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 6
          BROKER ALARAB EDITORIAL ANALYSIS
      ====================================================== */}

      <ArticleSection

        id="editorial-analysis"

        eyebrow="Broker Alarab Editorial Analysis"

        title="What the Singapore Licence Means for Capital.com's Global Strategy"

      >

        <Paragraph>

          From Broker Alarab's editorial perspective,
          securing local regulatory approval in
          Singapore represents a meaningful
          development in Capital.com's international
          expansion strategy.

        </Paragraph>

        <Paragraph>

          Establishing a regulated operation in a
          new jurisdiction requires more than
          geographic expansion. It involves investment
          in compliance infrastructure, operational
          systems, governance and client services
          that meet local regulatory expectations.

        </Paragraph>

        <Paragraph>

          Nevertheless, the commercial and operational
          significance of the expansion will become
          clearer following the launch. The availability
          of financial instruments, trading costs,
          execution quality, platform functionality
          and client protection arrangements will
          remain important factors when assessing
          the local offering.

        </Paragraph>

        <Paragraph>

          While the MAS licence represents an important
          regulatory milestone, it should not be
          treated as a standalone measure of broker
          quality or suitability for individual
          investors.

        </Paragraph>

        <BrokerReviewCard />

      </ArticleSection>

      {/* =====================================================
          SECTION 7
          FREQUENTLY ASKED QUESTIONS
      ====================================================== */}

      <ArticleSection

        id="faq"

        eyebrow="Questions & Answers"

        title="Frequently Asked Questions About Capital.com's Singapore Licence"

      >

        <div className="space-y-3">

          <FAQItem
            question="Is Capital.com regulated in Singapore?"
          >

            According to its announcement on
            2 November 2026, Capital.com's local
            entity, Capital Com Securities
            (Singapore) Pte. Ltd., has obtained
            a Capital Markets Services licence
            from the Monetary Authority of
            Singapore (MAS).

          </FAQItem>

          <FAQItem
            question="What is the difference between MAS and a CMS licence?"
          >

            MAS stands for the Monetary Authority
            of Singapore, the country's financial
            regulator. CMS refers to a Capital
            Markets Services licence, which authorises
            specified regulated financial activities.

          </FAQItem>

          <FAQItem
            question="Does Capital.com's MAS licence cover international clients?"
          >

            Not automatically. The regulatory
            framework applicable to an account
            depends on the legal entity providing
            the service, the client's country of
            residence and the relevant contractual
            and regulatory requirements.

          </FAQItem>

          <FAQItem
            question="When will Capital.com launch its Singapore services?"
          >

            The company expects to begin onboarding
            Singapore clients in early 2027.
            A definitive launch date was not
            specified in the announcement.

          </FAQItem>

          <FAQItem
            question="Does MAS regulation guarantee the safety of trading funds?"
          >

            Regulatory authorisation establishes
            obligations and oversight for licensed
            financial activities. However, it
            does not guarantee investment returns,
            eliminate trading risks or ensure
            that clients cannot lose their capital.

          </FAQItem>

        </div>

      </ArticleSection>

      {/* =====================================================
          SECTION 8
          OFFICIAL SOURCES
      ====================================================== */}

      <ArticleSection

        id="sources"

        eyebrow="References & Verification"

        title="Official Sources"

      >

        <Paragraph>

          The reported developments in this article
          are based on Capital.com's official press
          release dated 2 November 2026. Discussion
          of the broader regulatory and industry
          implications represents independent
          editorial analysis by Broker Alarab.

        </Paragraph>

        <ArticleSources />

        <div className="mt-7 rounded-[12px] border border-[#e3eaf1] bg-[#f8fafc] p-4 sm:p-5">

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            <strong className="text-[#102747]">
              Disclaimer:
            </strong>

            {" "}This article has been prepared by
            the Broker Alarab Editorial Team for
            informational and educational purposes
            only. It does not constitute investment
            advice, a recommendation to open a
            trading account, or an invitation to buy
            or sell financial instruments. Product
            and service availability is subject to
            applicable regulatory requirements,
            geographical restrictions and the terms
            of the relevant legal entity.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}

/* ================= END ARTICLE ================= */