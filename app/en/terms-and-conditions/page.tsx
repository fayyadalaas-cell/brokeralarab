import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Broker Alarab",
  description:
    "Read the Broker Alarab Terms and Conditions covering website use, informational content, user responsibilities, affiliate links, liability limitations, and broker-related disclaimers.",
  alternates: {
    canonical: "https://brokeralarab.com/en/terms-and-conditions",
    languages: {
      en: "https://brokeralarab.com/en/terms-and-conditions",
      ar: "https://brokeralarab.com/terms-and-conditions",
      "x-default": "https://brokeralarab.com/en/terms-and-conditions",
    },
  },
  openGraph: {
    title: "Terms & Conditions | Broker Alarab",
    description:
      "Review the terms governing the use of Broker Alarab, including content limitations, affiliate disclosure, user responsibility, and important broker-related notices.",
    url: "https://brokeralarab.com/en/terms-and-conditions",
    siteName: "Broker Alarab",
    type: "website",
    locale: "en_US",
  },
};

type SectionProps = {
  title: string;
  children: ReactNode;
};

type InfoCardItem = {
  icon: string;
  title: string;
  text: string;
};

/* Sections that remain visible on all screen sizes */
function Section({ title, children }: SectionProps) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:rounded-[28px]">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-white px-4 py-4 sm:px-7 sm:py-3.5 md:px-8">
        <h2 className="text-[24px] font-black leading-[1.25] text-slate-950 sm:text-[24px] lg:text-[26px]">
          {title}
        </h2>
      </div>

      <div className="px-4 py-5 sm:px-7 sm:py-4 md:px-8 lg:py-5">
        <div className="space-y-4 text-[15px] font-medium leading-8 text-slate-700 sm:space-y-3 sm:text-[15px] sm:leading-8 lg:text-[16px]">
          {children}
        </div>
      </div>
    </section>
  );
}

/* Long sections: accordion on mobile and fully visible on desktop */
function ResponsiveTextSection({ title, children }: SectionProps) {
  return (
    <>
      {/* MOBILE */}
      <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] sm:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-white px-4 py-3.5 text-left">
          <h2 className="text-[17px] font-black leading-6 text-slate-950">
            {title}
          </h2>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-[#f8fbff] text-[11px] font-black text-brand-600 transition duration-300 group-open:rotate-180">
            ▼
          </span>
        </summary>

        <div className="border-t border-slate-100 px-4 py-5">
          <div className="space-y-4 text-[15px] font-medium leading-8 text-slate-700">
            {children}
          </div>
        </div>
      </details>

      {/* TABLET / DESKTOP */}
      <section className="hidden overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:block">
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-white px-7 py-3.5 md:px-8">
          <h2 className="text-[24px] font-black leading-[1.3] text-slate-950 lg:text-[26px]">
            {title}
          </h2>
        </div>

        <div className="px-7 py-4 md:px-8 lg:py-5">
          <div className="space-y-3 text-[15px] font-medium leading-8 text-slate-700 lg:text-[16px]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

/* User responsibility cards */
function InfoCards({ items }: { items: InfoCardItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="group min-h-[122px] rounded-[18px] border border-slate-200 bg-[#fbfdff] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:min-h-0 sm:rounded-[18px] sm:p-4"
        >
          {/* MOBILE */}
          <div className="flex h-full flex-col items-center justify-center text-center sm:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-white text-[17px] shadow-sm">
              {item.icon}
            </span>

            <h3 className="mt-3 text-[13px] font-black leading-5 text-slate-950">
              {item.title}
            </h3>
          </div>

          {/* TABLET / DESKTOP */}
          <div className="hidden items-start gap-3 sm:flex">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-[16px] shadow-sm lg:h-10 lg:w-10 lg:text-[18px]">
              {item.icon}
            </span>

            <div className="min-w-0">
              <h3 className="text-[15px] font-black leading-6 text-slate-950 lg:text-[16px]">
                {item.title}
              </h3>

              <p className="mt-1.5 text-[13px] font-medium leading-6 text-slate-600 lg:text-[14px] lg:leading-7">
                {item.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TermsPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-left text-slate-900">
      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* PAGE HERO */}
        <header className="mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
          <div className="bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-brand-600 shadow-sm sm:py-1 sm:text-[11px]">
              Terms of Use
            </div>

            <h1 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.025em] text-slate-950 sm:mt-3 sm:text-[38px] lg:text-[44px]">
              Terms & Conditions
            </h1>

            {/* MOBILE DESCRIPTION */}
            <p className="mt-4 text-[15px] font-medium leading-8 text-slate-600 sm:hidden">
              These terms explain how Broker Alarab may be used and outline the
              responsibilities, limitations, and important notices that apply to
              visitors.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-3 hidden max-w-[1380px] text-[15px] font-medium leading-8 text-slate-600 sm:block lg:text-[16px]">
              These Terms & Conditions govern your access to and use of Broker
              Alarab, including its broker reviews, comparisons, educational
              guides, calculators, event pages, regulatory information, and
              external links. They explain the informational nature of the
              website, the limits of our responsibility, the obligations of
              users, and the conditions that apply when interacting with brokers
              or third-party services featured on the platform.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-5">
          <Section title="Acceptance of These Terms">
            <p>
              By accessing, browsing, or using Broker Alarab, you confirm that
              you have read and understood these Terms & Conditions and agree to
              follow them while using the website.
            </p>

            <p>
              These terms apply to all visitors and users, whether they access a
              broker review, comparison, educational article, trading tool,
              country ranking, event page, or any other part of the website.
            </p>

            <p>
              If you do not agree with any part of these terms, you should stop
              using the website and avoid relying on its content, tools, or
              external links.
            </p>

            <p>
              Your continued use of Broker Alarab after any revised terms are
              published will be treated as acceptance of the updated version.
            </p>
          </Section>

          <Section title="Nature and Purpose of Broker Alarab">
            <p>
              Broker Alarab is an informational and educational platform focused
              on trading brokers, financial service providers, trading accounts,
              platforms, regulations, market terminology, and related tools.
            </p>

            <p>
              We publish broker reviews, comparisons, country-specific pages,
              trading guides, calculators, account explanations, regulatory
              information, and other content intended to help users conduct their
              own research.
            </p>

            <p>
              Broker Alarab is not a broker, investment firm, financial adviser,
              portfolio manager, bank, payment processor, regulator, or trading
              platform. We do not receive client deposits, execute trades, manage
              accounts, process withdrawals, or hold funds on behalf of users.
            </p>

            <p>
              All website content is provided for general informational and
              educational purposes. It should not be treated as personalized
              financial, investment, tax, legal, or regulatory advice.
            </p>
          </Section>

          <Section title="Your Responsibilities as a User">
            <p>
              Every user is responsible for conducting independent research and
              deciding whether a broker, account, platform, or financial service
              is appropriate for their own circumstances.
            </p>

            <InfoCards
              items={[
                {
                  icon: "🔍",
                  title: "Verify Information",
                  text: "Check important details directly with the broker and its official documents before making a decision.",
                },
                {
                  icon: "🛡️",
                  title: "Review Regulation",
                  text: "Confirm the legal entity, licence, regulator, and protections that apply in your country.",
                },
                {
                  icon: "📄",
                  title: "Read Official Terms",
                  text: "Review account agreements, risk disclosures, fees, withdrawal rules, and applicable conditions.",
                },
                {
                  icon: "⚠️",
                  title: "Understand the Risk",
                  text: "Consider the risks of leverage, market volatility, financial loss, and unsuitable trading products.",
                },
                {
                  icon: "💳",
                  title: "Protect Your Information",
                  text: "Avoid sharing passwords, payment details, account credentials, or sensitive documents unnecessarily.",
                },
                {
                  icon: "🧠",
                  title: "Make Your Own Decision",
                  text: "Use the website as a research resource and take responsibility for any registration, deposit, or trade.",
                },
              ]}
            />

            <p>
              You should not rely on a rating, ranking, review, comparison, or
              calculator result as the only basis for a financial decision.
              Personal circumstances, location, financial knowledge, risk
              tolerance, and applicable laws may affect whether a service is
              suitable.
            </p>
          </Section>

          <ResponsiveTextSection title="Accuracy and Availability of Information">
            <p>
              We aim to present information in a clear, practical, and structured
              format. However, we cannot guarantee that every detail published on
              Broker Alarab will always be complete, error-free, or immediately
              updated.
            </p>

            <p>
              Brokers and third-party providers may change their fees, spreads,
              account types, minimum deposits, payment methods, platforms,
              regulations, promotional offers, and other conditions without
              notifying us in advance.
            </p>

            <p>
              Information may also differ depending on the user’s country,
              regulatory entity, account category, payment method, client status,
              or date of access.
            </p>

            <p>
              Before opening an account or transferring funds, users should
              verify important information through the broker’s official website,
              legal documents, client agreement, and the relevant regulator.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="No Financial or Investment Advice">
            <p>
              Broker Alarab does not provide personalized investment advice,
              trading signals, portfolio recommendations, financial planning, or
              instructions to buy or sell a particular financial instrument.
            </p>

            <p>
              We do not assess your income, financial position, objectives,
              trading knowledge, or ability to accept losses. As a result, the
              content cannot determine whether a broker, account, product, or
              trading strategy is suitable for you.
            </p>

            <p>
              Educational explanations, broker rankings, comparison tables, and
              calculator results are provided as general reference material and
              should not be interpreted as a recommendation or guarantee.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Trading Risk">
            <p>
              Trading forex, contracts for difference, cryptocurrencies,
              commodities, indices, shares, and other leveraged instruments may
              involve a high level of risk.
            </p>

            <p>
              Market movements can result in rapid losses, and leverage may
              increase both potential gains and potential losses. Some products
              may not be appropriate for inexperienced users or for individuals
              who cannot afford to lose the money they deposit.
            </p>

            <p>
              Users should review the broker’s official risk warning, understand
              how margin and leverage operate, and consider seeking independent
              professional advice where appropriate.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Limitation of Liability">
            <p>
              To the extent permitted by applicable law, Broker Alarab and its
              team will not be responsible for direct, indirect, incidental, or
              consequential losses resulting from the use of the website or
              reliance on its content.
            </p>

            <p>
              This includes, without limitation, trading losses, rejected
              withdrawals, account restrictions, verification problems,
              regulatory disputes, technical interruptions, data inaccuracies,
              missed opportunities, or losses connected with third-party
              services.
            </p>

            <p>
              We are not responsible for a broker changing its terms, licence
              structure, ownership, service quality, payment procedures, or
              availability after information has been published on the website.
            </p>

            <p>
              We also do not guarantee that the website will always be available,
              uninterrupted, secure, or free from technical errors.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="External Brokers and Third-Party Services">
            <p>
              Broker Alarab may include links to brokers, regulators, financial
              service providers, technology companies, event organizers, payment
              services, and other external websites.
            </p>

            <p>
              These external companies operate independently from Broker Alarab.
              We do not control their platforms, internal procedures, account
              approvals, customer support, deposits, withdrawals, or treatment of
              users.
            </p>

            <p>
              Once you visit an external website, your use of that website is
              governed by its own terms, privacy policy, risk disclosures, and
              legal documents.
            </p>

            <p>
              A link to an external website does not mean that Broker Alarab
              guarantees its safety, legality, performance, availability, or
              suitability.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Affiliate Links and Advertising">
            <p>
              Some pages may contain affiliate links, referral links, sponsored
              placements, or advertising related to brokers and other service
              providers.
            </p>

            <p>
              Broker Alarab may receive compensation when a visitor clicks a
              link, opens an account, or completes an eligible action through one
              of these links. In most cases, this does not create an additional
              charge for the visitor.
            </p>

            <p>
              Compensation does not mean that a broker is suitable for every
              user, and it does not remove the user’s responsibility to review
              official information and assess the risks independently.
            </p>

            <p>
              We aim to maintain a reasonable separation between editorial
              content and commercial arrangements, but users should always treat
              affiliate links as promotional relationships.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Intellectual Property">
            <p>
              Unless otherwise stated, the written content, page structure,
              layouts, branding, graphics, comparisons, tables, tools, and
              original design elements published on Broker Alarab belong to the
              website or are used with appropriate permission.
            </p>

            <p>
              You may access the content for personal and non-commercial use.
              You may not copy, reproduce, republish, scrape, distribute, sell,
              modify, or create derivative versions of substantial website
              content without prior written permission.
            </p>

            <p>
              Broker names, trademarks, platform names, and third-party logos
              remain the property of their respective owners. Their appearance on
              the website does not imply ownership by Broker Alarab.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Acceptable Use of the Website">
            <p>
              You agree to use Broker Alarab only for lawful and legitimate
              purposes.
            </p>

            <p>
              You must not attempt to damage, overload, disrupt, reverse
              engineer, bypass security controls, introduce malicious code, or
              interfere with the operation of the website.
            </p>

            <p>
              You must also not use automated systems to extract substantial
              content, impersonate another person, submit misleading information,
              or use the website in a way that violates the rights of Broker
              Alarab or any third party.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Important Notice About Broker Listings">
            <p>
              The presence of a broker on Broker Alarab does not mean that the
              company is officially approved, risk-free, endorsed for every user,
              or guaranteed to provide a particular level of service.
            </p>

            <p>
              A broker may appear because it is being reviewed, compared,
              researched, included in a country page, or referenced for
              informational purposes.
            </p>

            <p>
              Ratings and rankings represent an assessment based on available
              information at a particular time. They may change when new
              information becomes available or when broker conditions change.
            </p>

            <p>
              Registration, account verification, depositing funds, withdrawing
              money, and trading are decisions made directly between the user and
              the selected broker.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Changes to These Terms">
            <p>
              Broker Alarab may revise, expand, or update these Terms &
              Conditions when needed to reflect changes to the website, its
              services, business practices, or applicable requirements.
            </p>

            <p>
              Updated terms become effective when they are published on this
              page. We are not required to provide individual notice of every
              change.
            </p>

            <p>
              Users are encouraged to review this page periodically. Continued
              use of the website after an update means that the revised terms
              have been accepted.
            </p>
          </ResponsiveTextSection>
        </div>
      </div>
    </main>
  );
}