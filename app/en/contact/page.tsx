import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Broker Alarab for general inquiries, content updates, partnership opportunities, or feedback related to broker reviews and comparison pages.",
  alternates: {
    canonical: "https://brokeralarab.com/en/contact",
    languages: {
      en: "https://brokeralarab.com/en/contact",
      ar: "https://brokeralarab.com/contact",
      "x-default": "https://brokeralarab.com/en/contact",
    },
  },
  openGraph: {
    title: "Contact Us",
    description:
      "Contact Broker Alarab for general inquiries, content updates, partnership opportunities, or feedback related to broker reviews and comparison pages.",
    url: "https://brokeralarab.com/en/contact",
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
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <h2 className="mb-4 text-2xl font-extrabold text-slate-950">{title}</h2>
      <div className="space-y-4 text-base leading-8 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-slate-50" dir="ltr">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <header className="mb-5 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
            Get in Touch
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Contact Us
          </h1>

          <p className="max-w-none text-base leading-8 text-slate-600 md:text-lg md:leading-9">
            If you have feedback about a broker review, want to request a content
            update, explore a partnership opportunity, or simply have a general
            question about the website, you can contact us using the form or
            email below.
          </p>
        </header>

        <div className="grid gap-5">
          <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <div className="mb-6">
              <div className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-600">
                Contact Form
              </div>

              <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
                Send Us a Message
              </h2>

              <p className="mt-3 max-w-none text-base leading-8 text-slate-600">
                Use this form for inquiries, broker information updates,
                partnership requests, advertising opportunities, or technical
                issues related to Broker Alarab.
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                Fields marked with <span className="text-red-600">*</span> are
                required.
              </p>
            </div>

           <ContactForm lang="en" />
          </section>

          <Section title="Email">
            <p>
              For official communication with the Broker Alarab team, please use
              the following email address:
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-lg font-extrabold text-slate-950">
              info@brokeralarab.com
            </div>

            <p>
              Email is the preferred method of communication, especially for
              partnerships, content updates, or formal inquiries, as it allows us
              to handle requests in a structured and organized way.
            </p>
          </Section>

          <Section title="What Can You Contact Us About?">
            <p>You can reach out to us for topics such as:</p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                Questions about a broker review or comparison page.
              </li>
              <li className="list-disc">
                Requests to correct or update broker-related information.
              </li>
              <li className="list-disc">
                Partnership inquiries, affiliate cooperation, or advertising.
              </li>
              <li className="list-disc">
                Reporting broken links or technical issues on the website.
              </li>
              <li className="list-disc">
                General questions about the platform and its content.
              </li>
            </ul>
          </Section>

          <Section title="Important Notes Before Contacting Us">
            <p>
              Please make your message clear and specific. If your inquiry
              relates to a particular broker or page, include the relevant name
              or link so we can review it more efficiently.
            </p>

            <p>
              Broker Alarab is a content and comparison website. We are not a
              brokerage firm, we do not manage funds, and we do not execute
              trades on behalf of users.
            </p>

            <p>
              We cannot assist with deposits, withdrawals, or account-related
              issues inside trading platforms, and we do not have access to user
              accounts held with any broker listed on the website.
            </p>
          </Section>

          <Section title="Important Notice & Disclaimer">
            <p>
              Broker Alarab does not ask users to transfer money, does not manage
              trading accounts, does not guarantee profits, and does not request
              login credentials, payment details, or passwords.
            </p>

            <p>
              If anyone contacts you claiming to represent our website and asks
              for money or sensitive information, you should treat that
              communication as unauthorized and avoid engaging with them.
            </p>

            <p>
              Any dispute, complaint, or issue between a user and a broker
              mentioned on this website must be handled directly with the broker
              or the relevant regulatory authorities. Our role is limited to
              providing informational and comparison content only.
            </p>
          </Section>

          <Section title="Partnership Opportunities">
            <p>
              If you represent a brokerage firm or a related company and would
              like to discuss a marketing collaboration, data update, or
              professional partnership, please send a clear message including
              your company name, your request, and your preferred contact method.
            </p>

            <p>
              In some cases, we may request additional details via email before
              reviewing a partnership request, especially for affiliate programs,
              IB partnerships, or broker profile updates.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}