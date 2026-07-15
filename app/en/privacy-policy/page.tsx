import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | Broker Alarab",
  description:
    "Read the Broker Alarab Privacy Policy to learn how we handle website data, analytics, cookies, contact information, affiliate links, and third-party services.",
  alternates: {
    canonical: "https://brokeralarab.com/en/privacy-policy",
    languages: {
      en: "https://brokeralarab.com/en/privacy-policy",
      ar: "https://brokeralarab.com/privacy-policy",
      "x-default": "https://brokeralarab.com/en/privacy-policy",
    },
  },
  openGraph: {
    title: "Privacy Policy | Broker Alarab",
    description:
      "Learn how Broker Alarab handles website data, cookies, analytics, contact information, affiliate links, and external services.",
    url: "https://brokeralarab.com/en/privacy-policy",
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

/* Long sections: accordion on mobile, fully visible on larger screens */
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

/* Information usage cards */
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

export default function PrivacyPolicyPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* PAGE HERO */}
        <header className="mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
          <div className="bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-brand-600 shadow-sm sm:py-1 sm:text-[11px]">
              Privacy & Data
            </div>

            <h1 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.025em] text-slate-950 sm:mt-3 sm:text-[38px] lg:text-[44px]">
              Privacy Policy
            </h1>

            {/* MOBILE DESCRIPTION */}
            <p className="mt-4 text-[15px] font-medium leading-8 text-slate-600 sm:hidden">
              This policy explains how Broker Alarab handles website data,
              cookies, analytics, contact details, and third-party services.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-3 hidden max-w-[1380px] text-[15px] font-medium leading-8 text-slate-600 sm:block lg:text-[16px]">
              This Privacy Policy explains how Broker Alarab handles information
              connected with your use of the website. It covers technical data
              collected during browsing, information you may provide when
              contacting us, the use of cookies and analytics services, and the
              role of affiliate links and third-party websites. It also explains
              the practical steps we take to improve website performance and
              protect information shared through our available communication
              channels.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-5">
          <Section title="Introduction">
            <p>
              Broker Alarab respects the privacy of its visitors and aims to
              handle website-related information responsibly and transparently.
              Our platform provides educational content, broker reviews,
              comparisons, trading tools, and general information about financial
              service providers.
            </p>

            <p>
              This policy is intended to help you understand what information may
              be collected when you visit the website, why that information may
              be used, and how external services may support the operation and
              improvement of the platform.
            </p>

            <p>
              We do not design the website to collect unnecessary sensitive
              personal information. We also do not ask visitors to provide bank
              card numbers, broker account passwords, trading platform login
              details, or other confidential financial credentials through the
              website.
            </p>

            <p>
              By continuing to use Broker Alarab, you acknowledge this Privacy
              Policy in its current form. We may revise the policy when the
              website changes, when new services are introduced, or when
              technical, legal, or operational requirements need to be addressed.
            </p>
          </Section>

          <Section title="What Information May Be Collected?">
            <p>
              When you browse the website, certain technical and non-personal
              information may be collected automatically. This may include your
              browser type, operating system, device category, preferred
              language, pages visited, approximate session duration, and the
              source that referred you to the website.
            </p>

            <p>
              We may also receive general technical information such as an IP
              address, approximate country or city-level location, visit time,
              page-loading errors, and information about features that may not
              have worked correctly.
            </p>

            <p>
              Personal information may be collected when you choose to contact us
              directly. For example, an email or contact form submission may
              include your name, email address, subject line, and the content of
              your message.
            </p>

            <p>
              You should not send payment card details, trading account
              credentials, passwords, identification documents, or other highly
              sensitive information unless a specific and legitimate reason has
              been clearly communicated.
            </p>
          </Section>

          <Section title="How We Use Information">
            <p>
              Technical and general usage information may be used to operate,
              maintain, and improve the website and to better understand what
              visitors find useful.
            </p>

            <InfoCards
              items={[
                {
                  icon: "✨",
                  title: "Improve User Experience",
                  text: "Make pages easier to navigate, improve loading speed, and help users find relevant information more efficiently.",
                },
                {
                  icon: "📊",
                  title: "Review Page Performance",
                  text: "Understand which pages receive the most visits, where users spend time, and which topics attract interest.",
                },
                {
                  icon: "📝",
                  title: "Improve Our Content",
                  text: "Update articles, broker reviews, comparisons, and tools based on how visitors use the website.",
                },
                {
                  icon: "✉️",
                  title: "Respond to Messages",
                  text: "Use voluntarily provided contact details to answer inquiries, feedback, or partnership requests.",
                },
                {
                  icon: "🛡️",
                  title: "Protect the Website",
                  text: "Identify technical problems, unusual activity, attempted misuse, and potential security issues.",
                },
                {
                  icon: "⚙️",
                  title: "Develop Website Features",
                  text: "Test and improve new tools, layouts, services, and device compatibility across the platform.",
                },
              ]}
            />

            <p>
              We do not use this information to open brokerage accounts on behalf
              of users, execute financial transactions, or sell visitors’
              personal details as a standalone commercial product.
            </p>
          </Section>

          <ResponsiveTextSection title="Cookies">
            <p>
              Broker Alarab may use cookies and similar technologies to support
              website functionality, improve loading performance, remember
              general preferences, and better understand how visitors interact
              with different pages.
            </p>

            <p>
              Cookies are small files stored on a user’s device. They may help a
              website remember previous activity, measure traffic, or support
              specific features and integrations.
            </p>

            <p>
              Most browsers allow users to view, block, or delete cookies through
              their settings. Disabling certain cookies may affect how some parts
              of the website function or may limit the availability of selected
              features.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Analytics and Website Measurement">
            <p>
              We may use analytics services to understand how the website
              performs. These services may provide aggregated information about
              visitor numbers, traffic sources, popular pages, session duration,
              device types, and browsing patterns.
            </p>

            <p>
              This information helps us identify pages that need improvement,
              understand which subjects are most useful to visitors, and refine
              the structure and presentation of our content.
            </p>

            <p>
              Our use of analytics is intended to improve the website rather than
              to personally identify individual users or sell their personal
              information.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="External Links and Third-Party Websites">
            <p>
              Broker Alarab contains links to external websites, which may include
              brokers, financial service providers, regulators, event organizers,
              technology providers, or other third parties.
            </p>

            <p>
              Once you leave Broker Alarab, your activity is governed by the
              privacy policy, terms, security practices, and data procedures of
              the external website you visit.
            </p>

            <p>
              We do not control how third-party websites collect, store, or use
              information. You should review their privacy policies and terms
              before creating an account, submitting personal details, making a
              deposit, or using their services.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Affiliate Links and Advertising">
            <p>
              Some links displayed on Broker Alarab may be affiliate or
              promotional links. We may receive a commission when a visitor
              registers or completes a qualifying action through one of these
              links, usually without an additional cost to the visitor.
            </p>

            <p>
              When you follow an affiliate link, the relevant broker or service
              provider may use a referral code, cookie, or similar technology to
              identify that the visit originated from Broker Alarab.
            </p>

            <p>
              We do not control the internal tracking systems used by external
              companies. Your interaction with those companies is therefore also
              governed by their own privacy policies and commercial terms.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Data Protection">
            <p>
              We aim to apply reasonable technical and organizational safeguards
              to information shared directly with us through the communication
              methods available on the website.
            </p>

            <p>
              These safeguards may include secure connections, restricted access
              to administrative services, website monitoring, and measures
              intended to identify technical or security-related problems.
            </p>

            <p>
              No method of online transmission, electronic storage, or website
              security can be guaranteed to be completely secure. Information
              sent over the internet is therefore submitted at the user’s own
              discretion and risk.
            </p>

            <p>
              Visitors should avoid sending passwords, payment information,
              trading credentials, or other sensitive information through email
              or general contact forms.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="How Long We Keep Information">
            <p>
              We may retain technical data or contact information for as long as
              it is reasonably needed for the purpose for which it was collected.
              This may include responding to an inquiry, resolving a technical
              problem, maintaining website security, or improving website
              performance.
            </p>

            <p>
              Depending on the type of information, it may later be deleted,
              anonymized, or retained in an aggregated form that does not directly
              identify an individual.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Children’s Privacy">
            <p>
              Broker Alarab is intended for a general audience interested in
              trading, financial markets, brokers, and related services. The
              website is not designed specifically for children.
            </p>

            <p>
              We do not knowingly seek to collect personal information from
              minors. If we become aware that such information has been submitted
              unintentionally, we may take reasonable steps to remove it.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Your Privacy Choices">
            <p>
              You may contact us to ask about personal information that you have
              previously provided directly to Broker Alarab. Where appropriate
              and reasonably possible, you may also request that the information
              be corrected, updated, or deleted.
            </p>

            <p>
              We may need to verify the identity or authority of the person making
              a request before disclosing, changing, or deleting information.
              This helps prevent unauthorized access to information.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Disclaimer">
            <p>
              Your use of Broker Alarab and any reliance on its content is at
              your own discretion and risk. The website provides general
              educational and informational material and does not provide
              personalized investment, legal, or financial advice.
            </p>

            <p>
              Broker Alarab is not responsible for losses, damages, disputes, or
              claims resulting from the use of website content, external links,
              brokerage services, or products operated by third parties.
            </p>

            <p>
              We do not guarantee that every page will always be error-free,
              continuously available, complete, or immediately updated. We are
              also not responsible for activity that occurs on an external
              website after a visitor leaves Broker Alarab.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy when necessary to reflect changes
              to the website, new features, technical systems, business
              practices, or relevant legal and regulatory requirements.
            </p>

            <p>
              Any revised version becomes effective when it is published on this
              page. Visitors are encouraged to review the policy periodically to
              remain informed about how website-related information is handled.
            </p>
          </ResponsiveTextSection>
        </div>
      </div>
    </main>
  );
}