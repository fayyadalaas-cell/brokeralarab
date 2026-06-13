import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions for using Broker Alarab, including content limitations, liability disclaimer, affiliate links, and important notices before engaging with any broker.",
  alternates: {
    canonical: "https://brokeralarab.com/en/terms-and-conditions",
    languages: {
      en: "https://brokeralarab.com/en/terms-and-conditions",
      ar: "https://brokeralarab.com/terms-and-conditions",
      "x-default": "https://brokeralarab.com/en/terms-and-conditions",
    },
  },
  openGraph: {
  title: "Terms & Conditions",
    description:
      "Read the terms and conditions for using Broker Alarab, including content limitations, liability disclaimer, affiliate links, and important notices.",
    url: "https://brokeralarab.com/en/terms-and-conditions",
    siteName: "Broker Alarab",
    type: "website",
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-5 text-2xl font-extrabold text-slate-950">{title}</h2>
      <div className="space-y-4 leading-8 text-slate-700">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="bg-slate-50" dir="ltr">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <header className="mb-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
            Terms of Use
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Terms & Conditions
          </h1>

          <p className="max-w-4xl text-lg leading-9 text-slate-600">
            These Terms & Conditions govern your use of the Broker Alarab website,
            including all pages, reviews, comparisons, and content published on
            the platform. Please read this page carefully before relying on any
            information or using any links provided.
          </p>
        </header>

        <div className="grid gap-6">
          <Section title="Acceptance of Terms">
            <p>
              By accessing or using Broker Alarab, you acknowledge that you have
              read, understood, and agreed to be bound by these Terms & Conditions.
            </p>

            <p>
              If you do not agree with any part of these terms, you should stop
              using the website and avoid relying on any content or links
              provided.
            </p>
          </Section>

          <Section title="Nature of the Website">
            <p>
              Broker Alarab is an informational website focused on reviews,
              comparisons, and educational content related to brokers and
              financial services.
            </p>

            <p>
              We are not a financial broker, investment advisor, portfolio
              manager, or trading platform. We do not execute trades, manage
              accounts, or handle user funds.
            </p>

            <p>
              All content on this website is provided for informational and
              educational purposes only and should not be considered financial,
              legal, or investment advice.
            </p>
          </Section>

          <Section title="Accuracy of Information">
            <p>
              We aim to present information in a clear and structured way.
              However, we do not guarantee that all content is always accurate,
              complete, or up to date.
            </p>

            <p>
              Brokers may change their regulations, fees, platforms, services,
              or terms without prior notice. Information may also vary depending
              on your country, account type, or regulatory environment.
            </p>

            <p>
              Users are responsible for verifying any information directly with
              the official website of the broker before making any decision.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              By using this website, you agree that Broker Alarab and its team
              are not liable for any direct or indirect losses, damages, or
              claims resulting from your reliance on the content or your
              interaction with any broker or third-party service mentioned on
              the website.
            </p>

            <p>
              This includes, but is not limited to, trading losses, withdrawal
              issues, account restrictions, regulatory problems, technical
              failures, misleading promotions by third parties, or disputes with
              brokers.
            </p>

            <p>
              We are also not responsible if a broker later becomes unsuitable,
              changes its conditions, or faces complaints or regulatory actions.
            </p>
          </Section>

          <Section title="User Responsibility">
            <p>
              Users are fully responsible for evaluating any broker or financial
              service mentioned on the website.
            </p>

            <p>
              You are responsible for reviewing the broker’s official terms,
              risk disclosures, and regulatory status before opening an account
              or making any financial decision.
            </p>

            <p>
              Trading financial instruments involves significant risk, and any
              decision you make is entirely your own responsibility.
            </p>
          </Section>

          <Section title="Affiliate Links & Advertising">
            <p>
              The website may contain affiliate links or advertisements related
              to brokers or financial services.
            </p>

            <p>
              We may receive compensation if users click on certain links or
              register through them. This does not affect our content integrity,
              but it does not mean we guarantee or endorse every service for all
              users.
            </p>

            <p>
              Your decision to use any link or register with any broker remains
              entirely your own responsibility.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content, including text, design, and structure, belongs to
              Broker Alarab unless stated otherwise.
            </p>

            <p>
              You may not copy, reproduce, or republish content without prior
              permission, except where permitted by applicable laws.
            </p>
          </Section>

          <Section title="Proper Use of the Website">
            <p>
              You agree to use the website in a lawful manner and not attempt to
              misuse, damage, or interfere with its operation or systems.
            </p>
          </Section>

          <Section title="Updates to Terms">
            <p>
              We reserve the right to modify or update these Terms & Conditions
              at any time without prior notice.
            </p>

            <p>
              Continued use of the website after updates are published
              constitutes acceptance of the revised terms.
            </p>
          </Section>

          <Section title="Important Notice About Brokers">
            <p>
              Listing a broker on the website does not mean it is officially
              approved, risk-free, or suitable for all users.
            </p>

            <p>
              Broker Alarab does not guarantee broker performance, does not
              represent any company, and is not responsible for outcomes related
              to your interaction with any broker.
            </p>

            <p>
              Any action such as registration, deposit, or trading is taken at
              your own risk and responsibility.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}