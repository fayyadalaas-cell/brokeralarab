import type { Metadata } from "next";
import type { ReactNode } from "react";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Broker Alarab | Support, Updates & Partnerships",
  description:
    "Contact Broker Alarab for broker review updates, partnership opportunities, advertising inquiries, technical feedback, or general questions about the website.",
  alternates: {
    canonical: "https://brokeralarab.com/en/contact",
    languages: {
      en: "https://brokeralarab.com/en/contact",
      ar: "https://brokeralarab.com/contact",
      "x-default": "https://brokeralarab.com/en/contact",
    },
  },
  openGraph: {
    title: "Contact Broker Alarab | Support, Updates & Partnerships",
    description:
      "Contact Broker Alarab about broker information updates, partnerships, advertising, technical feedback, or general website inquiries.",
    url: "https://brokeralarab.com/en/contact",
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

/* Sections that stay visible on all screen sizes */
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

/* Longer sections: accordion on mobile, open on tablet and desktop */
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

/* Contact reason cards */
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

export default function ContactPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f4f7fb] text-left text-slate-900"
    >
      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* PAGE HERO */}
        <header className="mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
          <div className="bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-brand-600 shadow-sm sm:py-1 sm:text-[11px]">
              Get in Touch
            </div>

            <h1 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.025em] text-slate-950 sm:mt-3 sm:text-[38px] lg:text-[44px]">
              Contact Broker Alarab
            </h1>

            {/* MOBILE DESCRIPTION */}
            <p className="mt-4 text-[15px] font-medium leading-8 text-slate-600 sm:hidden">
              Contact us about broker information, website feedback,
              partnerships, advertising, or technical issues.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-3 hidden max-w-[1380px] text-[15px] font-medium leading-8 text-slate-600 sm:block lg:text-[16px]">
              Contact Broker Alarab if you would like to report outdated broker
              information, request a content correction, discuss a professional
              partnership, explore advertising opportunities, or provide
              feedback about the website. We also welcome technical reports,
              suggestions for improving our reviews and comparison pages, and
              general questions related to the platform.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-5">

           {/* CONTACT FORM */}
          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:rounded-[28px]">
            <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-white px-4 py-4 sm:px-7 sm:py-4 md:px-8">
              <div className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                Contact Form
              </div>

              <h2 className="mt-3 text-[24px] font-black leading-[1.25] text-slate-950 sm:text-[26px] lg:text-[28px]">
                Send Us a Message
              </h2>

              <p className="mt-2 max-w-[1100px] text-[14px] font-medium leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                Use the form below for broker information updates, partnerships,
                advertising inquiries, technical feedback, or general questions
                about Broker Alarab.
              </p>

              <p className="mt-2 text-[12px] font-semibold text-slate-500">
                Fields marked with <span className="text-red-600">*</span> are
                required.
              </p>
            </div>

            <div className="px-4 py-5 sm:px-7 sm:py-6 md:px-8">
              <ContactForm lang="en" />
            </div>
          </section>
          
          {/* INTRODUCTION */}
          <Section title="How Can We Help?">
            <p>
              Broker Alarab publishes broker reviews, comparison pages,
              educational guides, regulatory information, trading tools, and
              other resources designed to help users research trading services.
              Clear and accurate feedback helps us keep this content useful and
              up to date.
            </p>

            <p>
              You can contact us if you notice information that may need
              correction, if a broker has changed its account conditions or
              services, or if a page contains a technical issue, broken link, or
              unclear explanation.
            </p>

            <p>
              We also welcome inquiries from brokers, financial service
              providers, event organizers, media companies, and other
              organizations interested in content partnerships, advertising,
              data updates, or professional collaboration.
            </p>

            <p>
              Please provide enough detail for us to understand your request.
              When your message relates to a particular broker, comparison, or
              page, include the relevant name or page link whenever possible.
            </p>
          </Section>

         

          {/* CONTACT REASONS */}
          <Section title="What Can You Contact Us About?">
            <p>
              Select the topic closest to your request and include the relevant
              details in your message.
            </p>

            <InfoCards
              items={[
                {
                  icon: "📝",
                  title: "Content Updates",
                  text: "Report broker information that may be outdated, incomplete, or in need of correction.",
                },
                {
                  icon: "⚖️",
                  title: "Review or Comparison Feedback",
                  text: "Ask a question or share feedback about a broker review, rating, or comparison page.",
                },
                {
                  icon: "🤝",
                  title: "Partnership Inquiries",
                  text: "Discuss media partnerships, affiliate programs, broker listings, or professional collaboration.",
                },
                {
                  icon: "📣",
                  title: "Advertising Opportunities",
                  text: "Request information about sponsored placements, campaigns, or promotional opportunities.",
                },
                {
                  icon: "🛠️",
                  title: "Technical Issues",
                  text: "Report broken links, display problems, form errors, or other website-related issues.",
                },
                {
                  icon: "💬",
                  title: "General Questions",
                  text: "Contact us with a general inquiry about the platform, its content, or how the website works.",
                },
              ]}
            />
          </Section>

          {/* EMAIL */}
          <ResponsiveTextSection title="Email">
            <p>
              For direct and official communication with the Broker Alarab team,
              use the email address below:
            </p>

            <a
              href="mailto:info@brokeralarab.com"
              className="flex min-h-[58px] items-center justify-center rounded-2xl border border-brand-100 bg-[#f8fbff] px-4 py-3 text-center text-[16px] font-black text-brand-600 transition hover:border-brand-200 hover:bg-brand-50 sm:justify-start sm:text-[18px]"
            >
              info@brokeralarab.com
            </a>

            <p>
              Email is usually the best option for formal requests, partnership
              inquiries, company information updates, and communications that
              may require supporting details or follow-up.
            </p>
          </ResponsiveTextSection>

          {/* IMPORTANT NOTES */}
          <ResponsiveTextSection title="Before Sending Your Message">
            <p>
              Keep your message clear and specific. Mention the broker, page,
              tool, or issue involved, and include a relevant URL when possible.
              This helps us understand and review your request more efficiently.
            </p>

            <p>
              Broker Alarab is a broker information, review, comparison, and
              educational website. We are not a brokerage company, trading
              platform, investment adviser, payment processor, or account
              management service.
            </p>

            <p>
              We do not have access to client accounts held with brokers and
              cannot process deposits, withdrawals, account verification,
              password recovery, or trading platform complaints on behalf of
              users.
            </p>
          </ResponsiveTextSection>

          {/* SAFETY NOTICE */}
          <ResponsiveTextSection title="Security and Important Notice">
            <p>
              Broker Alarab does not ask users to transfer money, share trading
              account passwords, provide payment card details, or send login
              credentials.
            </p>

            <p>
              We do not manage trading accounts, execute trades, offer guaranteed
              returns, or collect deposits from website visitors.
            </p>

            <p>
              If someone contacts you while claiming to represent Broker Alarab
              and requests money, passwords, payment information, or confidential
              account details, do not provide the requested information.
            </p>
          </ResponsiveTextSection>

          {/* BROKER ISSUES */}
          <ResponsiveTextSection title="Broker Account and Withdrawal Issues">
            <p>
              Complaints involving deposits, withdrawals, account restrictions,
              identity verification, platform access, or trade execution must
              normally be addressed directly with the relevant broker.
            </p>

            <p>
              When appropriate, users may also contact the regulator or dispute
              resolution body connected with the legal entity that operates
              their account.
            </p>

            <p>
              Broker Alarab may publish general information about a broker, but
              we do not control its account decisions, payment procedures,
              customer support, or internal complaint process.
            </p>
          </ResponsiveTextSection>

          {/* PARTNERSHIPS */}
          <ResponsiveTextSection title="Partnership Opportunities">
            <p>
              Companies interested in working with Broker Alarab should provide
              a clear introduction, the company name, website address, purpose of
              the inquiry, and preferred contact information.
            </p>

            <p>
              Potential opportunities may include media partnerships, event
              coverage, broker profile updates, advertising, affiliate programs,
              sponsored campaigns, data collaboration, or other relevant
              projects.
            </p>

            <p>
              Submitting an inquiry does not guarantee acceptance. We may request
              additional company or campaign information before reviewing a
              proposed collaboration.
            </p>
          </ResponsiveTextSection>

          {/* RESPONSE TIMES */}
          <ResponsiveTextSection title="Response Times">
            <p>
              We aim to review legitimate messages as reasonably as possible,
              but response times may vary depending on the subject, the amount of
              information provided, and whether additional verification or
              research is needed.
            </p>

            <p>
              Messages that are unclear, unrelated to the website, promotional
              spam, or requests for individual trading advice may not receive a
              response.
            </p>
          </ResponsiveTextSection>
        </div>
      </div>
    </main>
  );
}