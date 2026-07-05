import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Broker Alarab | How We Review Brokers",
  description:
    "Learn about Broker Alarab, our broker review methodology, our mission, and important disclaimers before using any review or comparison.",
  alternates: {
  canonical: "https://brokeralarab.com/en/about",
  languages: {
    en: "https://brokeralarab.com/en/about",
    ar: "https://brokeralarab.com/about",
  },
},
  openGraph: {
    title: "About Broker Alarab | How We Review Brokers",
    description:
      "Discover how Broker Alarab evaluates trading brokers, our goals, and key disclaimers before using any review or comparison.",
    url: "https://brokeralarab.com/en/about",
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
    <section dir="ltr" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 text-left">
      <h2 className="mb-5 text-2xl font-extrabold text-slate-950">{title}</h2>
      <div className="space-y-4 leading-8 text-slate-700">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main dir="ltr" className="bg-slate-50 text-left">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <header className="mb-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
            About Us
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            About Broker Alarab
          </h1>

          <p className="max-w-6xl text-lg leading-9 text-slate-600">
            Broker Alarab is a specialized platform focused on reviewing and comparing trading brokers,
            with the goal of helping traders access clear, structured, and reliable information before opening a real or demo account.
          </p>
        </header>

        <div className="grid gap-6">

          <Section title="What is Broker Alarab?">
            <p>
              Broker Alarab provides structured and professional content that covers the key factors traders look for
              before choosing a broker, including regulation, trading platforms, fees and spreads, minimum deposits,
              account types, withdrawal and deposit methods, Islamic account availability, and overall suitability.
            </p>

            <p>
              We believe that choosing a trading broker should not be based on marketing claims or promises,
              but on clear comparisons and organized information that helps users make informed decisions.
            </p>

            <p>
              Our goal is to simplify complex information and present it in a way that allows users to easily understand
              the differences between brokers instead of navigating through confusing marketing content.
            </p>
          </Section>

          <Section title="What does the website offer?">
            <p>
              The platform provides a range of tools and content designed to help users compare brokers and understand
              their strengths and weaknesses. This includes:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">Detailed broker reviews.</li>
              <li className="list-disc">Side-by-side comparisons of trading conditions.</li>
              <li className="list-disc">Educational explanations of account types and platforms like MT4 and MT5.</li>
              <li className="list-disc">Insights on broker suitability for different types of traders.</li>
              <li className="list-disc">Guidance on what to look for before opening an account.</li>
            </ul>

            <p>
              The goal is not to push users toward a specific broker, but to provide clear and organized information
              that supports better decision-making.
            </p>
          </Section>

          <Section title="How do we evaluate brokers?">
            <p>
              Our evaluation process is based on collecting and organizing publicly available information from brokers,
              regulatory sources, and official documentation, then presenting it in a structured and easy-to-understand format.
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">Regulatory status and licensing.</li>
              <li className="list-disc">Account types and trading conditions.</li>
              <li className="list-disc">Spreads, commissions, and potential fees.</li>
              <li className="list-disc">Trading platforms and usability.</li>
              <li className="list-disc">Deposit and withdrawal methods.</li>
              <li className="list-disc">Support for Arabic-speaking traders.</li>
            </ul>

            <p>
              However, no rating should be considered a guarantee, as broker conditions and services may change over time
              or vary depending on the user’s location and regulatory entity.
            </p>
          </Section>

          <Section title="Do we provide investment advice?">
            <p>
              No. Broker Alarab does not provide investment advice, trading recommendations, or portfolio management.
            </p>

            <p>
              All content is for informational and educational purposes only, intended to help users understand the market,
              not to direct them toward specific financial decisions.
            </p>

            <p>
              Users are responsible for their own decisions and should always review broker terms independently
              before opening an account or making financial commitments.
            </p>
          </Section>

          <Section title="Disclaimer">
            <p>
              While we strive to keep information accurate and up to date, we cannot guarantee that all data is always
              complete or reflects the latest changes made by brokers.
            </p>

            <p>
              Listing or reviewing a broker does not imply endorsement or guarantee of reliability, nor does it mean
              that the broker is suitable for all users.
            </p>

            <p>
              Any action taken based on the information provided on this website is at your own responsibility,
              and Broker Alarab is not liable for any financial or legal outcomes resulting from such actions.
            </p>
          </Section>

          <Section title="Affiliate Links & Advertising">
            <p>
              The website may include affiliate links, meaning we may earn a commission if users register or perform
              certain actions through these links, at no additional cost to the user.
            </p>

            <p>
              Affiliate relationships do not influence our content structure, and users should always review official
              broker terms independently.
            </p>
          </Section>

          <Section title="Our Mission">
            <p>
              Our mission is to build a structured and reliable reference that helps users better understand broker options,
              offering practical insights instead of generic marketing content.
            </p>

            <p>
              We believe traders deserve transparent, clear, and useful information, while always emphasizing that the final
              decision should be based on the user’s own research and responsibility.
            </p>
          </Section>

        </div>
      </div>
    </main>
  );
}