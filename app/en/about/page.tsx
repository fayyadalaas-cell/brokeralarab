import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Broker Alarab | How We Review Trading Brokers",
  description:
    "Learn about Broker Alarab, what the platform offers, how we evaluate trading brokers, our editorial approach, and the important disclaimers users should understand.",
  alternates: {
    canonical: "https://brokeralarab.com/en/about",
    languages: {
      en: "https://brokeralarab.com/en/about",
      ar: "https://brokeralarab.com/about",
      "x-default": "https://brokeralarab.com/en/about",
    },
  },
  openGraph: {
    title: "About Broker Alarab | How We Review Trading Brokers",
    description:
      "Learn how Broker Alarab reviews and compares trading brokers, the information we consider, and the principles behind our content.",
    url: "https://brokeralarab.com/en/about",
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
  title: string;
  text: string;
  icon: string;
};

/* Sections that remain visible on all screen sizes */
function Section({ title, children }: SectionProps) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:rounded-[28px]">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-white px-4 py-4 sm:px-7 sm:py-3.5 md:px-8">
        <h2 className="text-[25px] font-black leading-[1.2] text-slate-950 sm:text-[24px] sm:leading-[1.3] lg:text-[26px]">
          {title}
        </h2>
      </div>

      <div className="px-4 py-5 sm:px-7 sm:py-4 md:px-8 lg:py-5">
        <div className="max-w-[1260px] space-y-4 text-[15px] font-medium leading-8 text-slate-700 sm:max-w-none sm:space-y-3 sm:text-[15px] sm:leading-8 lg:text-[16px]">
          {children}
        </div>
      </div>
    </section>
  );
}

/* Long sections: accordion on mobile, fully visible on desktop */
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
          <div className="max-w-none space-y-3 text-[15px] font-medium leading-8 text-slate-700 lg:text-[16px]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCards({ items }: { items: InfoCardItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
      {items.map((item) => {
        const hideOnMobile = item.title === "Transparency and Data Updates";

        return (
          <div
            key={item.title}
            className={`group min-h-[132px] rounded-[18px] border border-slate-200 bg-[#fbfdff] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-brand-50/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:min-h-0 sm:rounded-[18px] sm:p-4 ${
              hideOnMobile ? "hidden sm:block" : "block"
            }`}
          >
            {/* MOBILE */}
            <div className="flex h-full flex-col items-center justify-center text-center sm:hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-white text-[17px] shadow-sm">
                {item.icon}
              </span>

              <h3 className="mt-3 text-[14px] font-black leading-5 text-slate-950">
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
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-left text-slate-900">
      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* PAGE HERO */}
        <header className="mb-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
          <div className="bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-brand-600 shadow-sm sm:px-3 sm:py-1 sm:text-[11px]">
              About Us
            </div>

            <h1 className="mt-4 text-[34px] font-black leading-[1.12] tracking-[-0.025em] text-slate-950 sm:mt-3 sm:text-[38px] sm:leading-[1.2] lg:text-[44px]">
              About Broker Alarab
            </h1>

            {/* MOBILE DESCRIPTION */}
            <p className="mt-4 text-[15px] font-medium leading-8 text-slate-600 sm:hidden">
              Broker Alarab reviews and compares trading brokers to help users
              understand regulation, fees, accounts, platforms, and trading
              conditions before making a decision.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-3 hidden max-w-[1380px] text-[15px] font-medium leading-8 text-slate-600 sm:block lg:text-[16px]">
              Broker Alarab is an independent broker review and comparison
              platform built to help traders access clear, structured, and
              practical information before opening a live or demo trading
              account. We organize key details about regulation, fees, account
              types, platforms, payment methods, and trading conditions so users
              can compare brokers more efficiently and make decisions based on
              their own needs and level of experience.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-5">
          <ResponsiveTextSection title="What Is Broker Alarab?">
            <p>
              Broker Alarab publishes structured content covering the main
              factors traders usually review before choosing a broker. These
              include regulatory status, trading platforms, spreads and
              commissions, minimum deposits, account types, payment methods,
              Islamic account availability, and the quality of customer support.
            </p>

            <p>
              We believe that choosing a broker should not be based only on
              promotional claims, bonus offers, or promises of fast results.
              Users need clear information that allows them to understand how
              brokers differ in areas that may directly affect their trading
              experience.
            </p>

            <p>
              Our role is to collect, organize, and explain this information in a
              practical format. Instead of leaving users to search through long
              marketing pages and scattered documents, we aim to make the most
              relevant details easier to find and compare.
            </p>
          </ResponsiveTextSection>

          <Section title="What Does the Website Offer?">
            <p>
              Broker Alarab provides reviews, comparisons, educational guides,
              and practical tools designed to help users evaluate brokers and
              understand the strengths and limitations of different services.
            </p>

            <InfoCards
              items={[
                {
                  icon: "⭐",
                  title: "Broker Reviews",
                  text: "Structured reviews covering regulation, accounts, platforms, fees, payment methods, and key broker features.",
                },
                {
                  icon: "⚖️",
                  title: "Broker Comparisons",
                  text: "Side-by-side comparisons that highlight differences in fees, licensing, platforms, and account conditions.",
                },
                {
                  icon: "📘",
                  title: "Educational Guides",
                  text: "Clear explanations of trading accounts, platforms, risk concepts, and commonly used market terminology.",
                },
                {
                  icon: "🌍",
                  title: "Brokers by Country",
                  text: "Country-focused pages that help users identify brokers and services available in their region.",
                },
                {
                  icon: "🧮",
                  title: "Trading Calculators",
                  text: "Practical tools for estimating risk, margin, pip value, position size, leverage, and potential results.",
                },
                {
                  icon: "✓",
                  title: "Pre-Registration Guidance",
                  text: "Information on what users should verify before opening an account, depositing funds, or choosing a broker.",
                },
              ]}
            />

            <p>
              The purpose is not to direct every visitor toward the same broker.
              It is to provide enough organized information for users to compare
              available options and decide what may be suitable for their own
              circumstances.
            </p>
          </Section>

          <Section title="How Do We Evaluate Trading Brokers?">
            <p>
              Our reviews are based primarily on information published by
              brokers, regulatory authorities, account documentation, platform
              pages, and other official sources. We then organize the findings
              into a format that supports practical comparison.
            </p>

            <InfoCards
              items={[
                {
                  icon: "🛡️",
                  title: "Regulation and Licensing",
                  text: "We review the licences a broker claims to hold and consider the standing of the relevant regulatory authorities.",
                },
                {
                  icon: "💰",
                  title: "Client Fund Protection",
                  text: "We examine published information about fund segregation, account safeguards, and client protection measures.",
                },
                {
                  icon: "📂",
                  title: "Account Types",
                  text: "We compare available accounts, minimum deposits, pricing structures, and the users each account may suit.",
                },
                {
                  icon: "📊",
                  title: "Fees and Trading Costs",
                  text: "We review spreads, commissions, overnight charges, inactivity fees, and other potential costs.",
                },
                {
                  icon: "💻",
                  title: "Platforms and Execution",
                  text: "We consider platform availability, ease of use, mobile access, trading tools, and published execution information.",
                },
                {
                  icon: "🏦",
                  title: "Deposits and Withdrawals",
                  text: "We compare funding methods, processing information, possible charges, and the clarity of payment policies.",
                },
                {
                  icon: "☪️",
                  title: "Islamic Accounts",
                  text: "We check whether swap-free accounts are available and review any conditions or restrictions that may apply.",
                },
                {
                  icon: "🎧",
                  title: "Support and User Experience",
                  text: "We consider support channels, accessibility of information, response options, and the overall website experience.",
                },
                {
                  icon: "🔄",
                  title: "Transparency and Data Updates",
                  text: "We assess how clearly information is published and update broker details when significant changes are identified.",
                },
              ]}
            />

            <p>
              No score, rating, or ranking should be treated as a permanent
              guarantee of quality. Broker services, licence arrangements, fees,
              and account conditions can change, and availability may differ by
              country or regulatory entity.
            </p>
          </Section>

          <ResponsiveTextSection title="Does Broker Alarab Provide Investment Advice?">
            <p>
              No. Broker Alarab does not provide personalized investment advice,
              trading signals, portfolio management, or instructions to buy or
              sell a particular financial instrument.
            </p>

            <p>
              The content published on the website is provided for general
              informational and educational purposes. It is intended to help
              users understand brokers, trading services, account structures,
              platforms, tools, and related market concepts.
            </p>

            <p>
              Every user remains responsible for reviewing official broker terms,
              considering personal financial circumstances, assessing risk, and
              deciding whether a service is appropriate for their location,
              knowledge, and objectives.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Disclaimer">
            <p>
              We make reasonable efforts to organize and update the information
              published on Broker Alarab, but we cannot guarantee that every
              detail will always be complete, error-free, or immediately reflect
              changes introduced by a broker or third party.
            </p>

            <p>
              The inclusion of a broker in a review, comparison, ranking, or
              country page does not represent a guarantee, legal approval, or
              confirmation that the broker will be suitable for every user.
            </p>

            <p>
              Opening an account, depositing money, using leverage, or trading
              financial instruments involves personal decisions and financial
              risk. Any action taken after reading content on the website remains
              the responsibility of the user.
            </p>

            <p>
              Broker Alarab does not control the services, platforms, account
              decisions, withdrawals, or internal procedures of the brokers and
              external companies featured on the website.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Affiliate Links and Advertising">
            <p>
              Some pages may contain affiliate or promotional links to brokers
              and service providers. Broker Alarab may receive a commission when
              a visitor registers or completes an eligible action through one of
              these links, generally without an additional cost to the visitor.
            </p>

            <p>
              An affiliate relationship does not mean that a broker is the best
              option for every user, and it does not give Broker Alarab control
              over the broker’s services, account conditions, or treatment of
              clients.
            </p>

            <p>
              We aim to keep editorial information separate from promotional
              arrangements. Users should still review official terms,
              regulations, fees, and account documentation before making a
              decision.
            </p>
          </ResponsiveTextSection>

          <ResponsiveTextSection title="Our Mission">
            <p>
              Our mission is to build a useful and well-organized reference for
              users researching trading brokers, account types, platforms,
              regulations, and trading tools.
            </p>

            <p>
              We aim to publish practical content that explains meaningful
              differences between brokers rather than repeating broad marketing
              claims or presenting every company in the same way.
            </p>

            <p>
              Broker Alarab continues to develop both its English and Arabic
              content to serve users across multiple countries and markets while
              maintaining a clear focus on transparency, comparison, and
              responsible decision-making.
            </p>
          </ResponsiveTextSection>
        </div>
      </div>
    </main>
  );
}