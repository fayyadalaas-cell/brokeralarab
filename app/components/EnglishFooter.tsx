
import Link from "next/link";
import Image from "next/image";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

// English website routes.
// Verify these paths against your actual Next.js routes.
const routes = {
  home: "/en",
  about: "/en/about",
  contact: "/en/contact",
  privacy: "/en/privacy-policy",
  terms: "/en/terms-and-conditions",

  brokers: "/en/brokers",
  bestBrokers: "/en/best-brokers",
  compare: "/en/compare",
  compareAccounts: "/en/compare-accounts",

  stocks: "/en/best-brokers/stocks",
  indices: "/en/best-brokers/indices",
  commodities: "/en/best-brokers/commodities",

  licenses: "/en/licenses",
  fca: "/en/licenses/fca",
  asic: "/en/licenses/asic",
  ciro: "/en/licenses/ciro",

  tools: "/en/tools",
  marketHours: "/en/tools/market-hours",
  strategies: "/en/strategies",
  indicators: "/en/indicators",
  learn: "/en/learn-trading",
};

const footerSections: FooterSection[] = [
  {
    title: "Best Brokers",
    links: [
      {
        label: "Best Forex Brokers",
        href: routes.bestBrokers,
      },
      {
        label: "Best Stock Brokers",
        href: routes.stocks,
      },
      {
        label: "Best Indices Brokers",
        href: routes.indices,
      },
      {
        label: "Best Commodities Brokers",
        href: routes.commodities,
      },
    ],
  },
  {
    title: "Comparisons",
    links: [
      {
        label: "Broker Reviews",
        href: routes.brokers,
      },
      {
        label: "Compare Brokers",
        href: routes.compare,
      },
      {
        label: "Compare Trading Accounts",
        href: routes.compareAccounts,
      },
      {
        label: "Best Brokers 2026",
        href: routes.bestBrokers,
      },
    ],
  },
  {
    title: "Regulations",
    links: [
      {
        label: "All Regulatory Authorities",
        href: routes.licenses,
      },
      {
        label: "UK FCA Regulation",
        href: routes.fca,
      },
      {
        label: "Australian ASIC Regulation",
        href: routes.asic,
      },
      {
        label: "Canadian CIRO Regulation",
        href: routes.ciro,
      },
    ],
  },
  {
    title: "Tools & Education",
    links: [
      {
        label: "Trading Calculators",
        href: routes.tools,
      },
      {
        label: "Trading Strategies",
        href: routes.strategies,
      },
      {
        label: "Market Trading Hours",
        href: routes.marketHours,
      },
      {
        label: "Learn Trading",
        href: routes.learn,
      },
    ],
  },
];

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/brokeralarab",
    type: "x",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/BrokerAlArab",
    type: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/brokeralarab/",
    type: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@brokeralarab",
    type: "tiktok",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/broker-alarab",
    type: "linkedin",
  },
];

const riskWarning =
  "The information provided on this website is for educational and informational purposes only and does not constitute financial or investment advice. Broker Alarab does not provide trading services directly or hold client funds. Trading forex, contracts for difference (CFDs), and cryptocurrencies involves significant risk and may not be suitable for all investors. Depending on the product, jurisdiction, and applicable protections, losses may exceed your initial deposit.";

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SocialIcon({ type }: { type: string }) {
  if (type === "x") {
    return (
      <span className="text-[15px] font-black leading-none">
        𝕏
      </span>
    );
  }

  if (type === "facebook") {
    return (
      <span className="text-[17px] font-black leading-none">
        f
      </span>
    );
  }

  if (type === "linkedin") {
    return (
      <span className="text-[13px] font-black leading-none">
        in
      </span>
    );
  }

  if (type === "instagram") {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
        />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  return (
    <span className="text-[17px] font-black leading-none">
      ♪
    </span>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {socialLinks.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#29435f] bg-[#10243b] text-[#D6E5F8] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4B9BF4] hover:bg-[#1E5BB8] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          <SocialIcon type={item.type} />
        </a>
      ))}
    </div>
  );
}

function FooterTextLink({
  label,
  href,
}: FooterLink) {
  return (
    <Link
      href={href}
      className="group inline-flex max-w-full items-center gap-1.5 text-[13px] font-medium leading-6 text-[#BED2EC] transition-colors duration-200 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-[#4399F2] opacity-0 transition-opacity group-hover:opacity-100" />
      <span>{label}</span>
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: FooterSection) {
  return (
    <nav
      aria-label={title}
      className="min-w-0"
    >
      <h3 className="text-[14px] font-extrabold text-white">
        {title}
      </h3>

      <div className="mt-2 h-[3px] w-7 rounded-full bg-gradient-to-r from-[#1E5BB8] to-[#4AA3FF]" />

      <ul className="mt-3 space-y-1.5">
        {links.map((item) => (
          <li key={`${title}-${item.label}`}>
            <FooterTextLink {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}


function MobileFooterSection({
  title,
  links,
}: FooterSection) {
  return (
    <details className="group col-span-1 open:col-span-2 overflow-hidden rounded-2xl border border-[#29435F] bg-[#10243B] transition-colors duration-200 open:border-[#376BA5] open:bg-[#112B4B]">
      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-2 px-3 py-3 text-[12px] font-extrabold text-white outline-none transition-colors hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#4AA3FF]" />
          {title}
        </span>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#9DB8D8] transition-transform duration-200 group-open:rotate-180">
          <ChevronIcon />
        </span>
      </summary>

      <div className="border-t border-white/10 px-3 pb-3 pt-2">
        <ul className="space-y-1">
          {links.map((item) => (
            <li key={`${title}-${item.href}-${item.label}`}>
              <Link
                href={item.href}
                className="flex min-h-[42px] items-center justify-between gap-3 rounded-xl px-3 py-2 text-[12px] font-medium leading-5 text-[#BED2EC] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[15px] text-[#559BEA]"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}


function RiskWarning({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  
if (mobile) {
  return (
    <details className="group mb-4 overflow-hidden rounded-2xl border border-[#29435F] bg-[#10243B]">
      <summary className="flex min-h-[54px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[13px] font-bold text-white [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2.5">
          <span className="text-[#F3C777]">!</span>
          Risk Warning
        </span>

        <span className="text-[#9DB8D8] transition-transform duration-200 group-open:rotate-180">
          <ChevronIcon />
        </span>
      </summary>

      <p className="border-t border-white/10 px-4 pb-4 pt-3 text-[12px] leading-7 text-[#AFC5E1]">
        {riskWarning}
      </p>
    </details>
  );
}


  return (
    <div className="border-t border-[#284363] py-4">
      <p className="text-[12px] leading-6 text-[#AFC5E1]">
        <strong className="font-extrabold text-white">
          Risk Warning:
        </strong>{" "}
        {riskWarning}
      </p>
    </div>
  );
}

const legalLinks: FooterLink[] = [
  {
    label: "About Us",
    href: routes.about,
  },
  {
    label: "Contact Us",
    href: routes.contact,
  },
  {
    label: "Privacy Policy",
    href: routes.privacy,
  },
  {
    label: "Terms & Conditions",
    href: routes.terms,
  },
];

function LegalLinks({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <nav
      aria-label="Legal links"
      className="flex flex-wrap items-center gap-3"
    >
      {legalLinks.map((item, index) => (
        <span
          key={item.href}
          className="inline-flex items-center gap-3"
        >
          {index > 0 && !compact && (
            <span
              className="text-[#4B6685]"
              aria-hidden="true"
            >
              •
            </span>
          )}

          <Link
            href={item.href}
            className="transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

function FooterBrand({
  variant = "desktop",
}: {
  variant?: "desktop" | "tablet" | "mobile";
}) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "flex flex-col items-center text-center"
          : "min-w-0"
      }
    >
      <Link
        href={routes.home}
        aria-label="Broker Alarab - Home"
        className="inline-block"
      >
        <Image
          src="/logo/Asset 2@4x.png"
          alt="Broker Alarab"
          width={320}
          height={100}
          className={
            variant === "desktop"
              ? "h-auto w-[190px]"
              : "h-auto w-[175px]"
          }
        />
      </Link>

      <p
        className={
          isMobile
            ? "mt-3 max-w-[330px] text-[12px] leading-6 text-[#BED2EC]"
            : "mt-3 max-w-[295px] text-[12px] leading-7 text-[#BED2EC]"
        }
      >
        Broker Alarab is an independent platform
        for broker reviews, trading account
        comparisons, and regulatory information,
        helping traders make informed decisions.
      </p>

      <div className="mt-4">
        <SocialLinks />
      </div>
    </div>
  );
}

function FooterBottom({
  year,
  compact = false,
}: {
  year: number;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#284363] py-4 text-[12px] text-[#9FB5D1]">
      <p>
        © {year} Broker Alarab — All rights reserved.
      </p>

      <LegalLinks compact={compact} />
    </div>
  );
}

export default function EnglishFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      dir="ltr"
      className="relative mt-10 overflow-hidden border-t border-[#193B63] bg-[#071426] text-[#BED2EC] md:mt-12"
    >
      {/* SUBTLE BACKGROUND LIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(ellipse_at_25%_0%,rgba(43,111,208,0.13),transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">

        

        {/* DESKTOP */}
        <div className="hidden lg:block">

          <div className="grid grid-cols-[1.45fr_repeat(4,minmax(0,1fr))] gap-x-7 py-8 xl:gap-x-10">

            <FooterBrand variant="desktop" />

            {footerSections.map((section) => (
              <FooterColumn
                key={section.title}
                {...section}
              />
            ))}

          </div>

          <RiskWarning />

          <FooterBottom year={year} />
        </div>

        {/* TABLET */}
        <div className="hidden md:block lg:hidden">

          <div className="grid grid-cols-3 gap-x-7 gap-y-8 py-8">

            <FooterBrand variant="tablet" />

            {footerSections.map((section) => (
              <FooterColumn
                key={section.title}
                {...section}
              />
            ))}

          </div>

          <RiskWarning />

          <FooterBottom
            year={year}
            compact
          />
        </div>

        {/* MOBILE */}
        <div className="md:hidden">

          {/* MOBILE BRAND */}
          <div className="py-5">
            <FooterBrand variant="mobile" />
          </div>

          

{/* MOBILE NAVIGATION */}
<nav
  aria-label="Footer navigation"
  className="border-t border-[#284363] py-4"
>
  

  <div className="grid grid-cols-2 items-start gap-2">
    {footerSections.map((section) => (
      <MobileFooterSection
        key={section.title}
        {...section}
      />
    ))}

    <div className="col-span-2">
      <MobileFooterSection
        title="About Broker Alarab"
        links={legalLinks}
      />
    </div>
  </div>
</nav>



          {/* MOBILE RISK WARNING */}
          <RiskWarning mobile />

          {/* MOBILE BOTTOM */}
          <div className="border-t border-[#284363] py-4 text-center">
            <p className="text-[11px] leading-6 text-[#9FB5D1]">
              © {year} Broker Alarab — All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
