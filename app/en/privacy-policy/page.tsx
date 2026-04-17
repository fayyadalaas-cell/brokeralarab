import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Broker Alarab",
  description:
    "Learn how Broker Alarab handles data, cookies, analytics, and external links. This privacy policy explains how information is collected and used when you browse our website.",
  alternates: {
    canonical: "/en/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Broker Alarab",
    description:
      "Learn how Broker Alarab handles data, cookies, analytics, and external links when you use our website.",
    url: "https://brokeralarab.com/en/privacy-policy",
    siteName: "Broker Alarab",
    type: "website",
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-5 text-2xl font-extrabold text-slate-950">{title}</h2>
      <div className="space-y-4 leading-8 text-slate-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-50" dir="ltr">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <header className="mb-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
            Privacy & Data
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Privacy Policy
          </h1>

          <p className="max-w-4xl text-lg leading-9 text-slate-600">
            This page outlines how Broker Alarab handles data and information
            related to the use of the website. It also explains how cookies,
            analytics tools, and external links are used to improve your browsing
            experience.
          </p>
        </header>

        <div className="grid gap-6">
          <Section title="Introduction">
            <p>
              At Broker Alarab, we respect user privacy and aim to handle any
              data associated with website usage in a responsible and reasonable
              way, in line with the nature of our platform as a content, reviews,
              and comparison website.
            </p>

            <p>
              By using this website, you agree to this policy in its current
              form. We may update or modify it from time to time to reflect
              changes in the website, legal requirements, or technical
              improvements.
            </p>
          </Section>

          <Section title="What Information May Be Collected?">
            <p>
              When using the website, certain non-personal or technical data may
              be collected automatically, such as browser type, device type,
              pages visited, approximate time spent on the site, and general
              geographic location (non-precise).
            </p>

            <p>
              We may also collect information voluntarily provided by users,
              such as when contacting us via email or future contact forms.
              This may include your name, email address, or message content.
            </p>

            <p>
              We do not request or collect sensitive financial data such as
              bank card details or trading account passwords.
            </p>
          </Section>

          <Section title="How We Use Information">
            <p>Collected data may be used for the following purposes:</p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                Improving the user experience across the website.
              </li>
              <li className="list-disc">
                Understanding which pages and topics are most relevant to users.
              </li>
              <li className="list-disc">
                Enhancing content quality and website structure.
              </li>
              <li className="list-disc">
                Responding to user inquiries and messages.
              </li>
              <li className="list-disc">
                Monitoring technical performance and helping maintain website
                security.
              </li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>
              The website may use cookies or similar technologies to improve
              browsing speed, remember preferences, and better understand how
              users interact with the platform.
            </p>

            <p>
              Users can typically control or disable cookies through their
              browser settings. However, disabling cookies may affect certain
              features or functionality of the website.
            </p>
          </Section>

          <Section title="Analytics">
            <p>
              We may use general analytics tools to understand website
              performance, such as visitor numbers, traffic sources, and user
              behavior. The purpose is to improve content and structure, not to
              personally identify users or sell their data.
            </p>
          </Section>

          <Section title="External Links and Third-Party Websites">
            <p>
              The website may contain links to third-party platforms, including
              brokers or service providers. Once you leave our website, you are
              subject to the privacy policies and terms of those external sites.
            </p>

            <p>
              We strongly recommend reviewing the privacy policy and terms of any
              third-party platform before registering, sharing data, or making
              financial decisions.
            </p>
          </Section>

          <Section title="Affiliate Links and Advertising">
            <p>
              Some links on this website may be affiliate links. If you click on
              them or register through them, the relevant company may track the
              referral according to its own policies.
            </p>

            <p>
              We do not control the internal systems or tracking technologies of
              external websites, and your interaction with them is subject to
              their own terms and policies.
            </p>
          </Section>

          <Section title="Data Protection">
            <p>
              We take reasonable steps to protect any information shared with us
              directly. However, no method of transmission or storage over the
              internet can be guaranteed to be 100% secure.
            </p>

            <p>
              For that reason, any information shared online is submitted at
              your own risk. We recommend avoiding the transmission of sensitive
              information unless absolutely necessary.
            </p>
          </Section>

          <Section title="Children’s Privacy">
            <p>
              This website is intended for a general audience and is not
              directed at children. We do not knowingly collect personal data
              from minors through the website.
            </p>
          </Section>

          <Section title="Disclaimer">
            <p>
              All content provided on this website is for informational purposes
              only. Any reliance on the information is at your own risk.
              Broker Alarab is not responsible for any losses, damages, or
              claims resulting from the use of this content or from third-party
              links and services.
            </p>

            <p>
              We do not guarantee that all information is always accurate,
              complete, or fully up to date. We are also not responsible for any
              actions taken on third-party platforms after leaving our website.
            </p>
          </Section>

          <Section title="Updates to This Policy">
            <p>
              We reserve the right to update or modify this policy at any time.
              Users are encouraged to review this page periodically to stay
              informed of any changes.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}