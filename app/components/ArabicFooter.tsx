
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

/*
  IMPORTANT:
  المسارات القديمة مأخوذة من الفوتر الأصلي.
  المسارات الجديدة تحتاج مطابقة مع sitemap.ts
  قبل النشر، خصوصاً التراخيص والتعلم والتصنيفات.
*/

const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",

  brokers: "/brokers",
  bestBrokers: "/best-brokers",
  compare: "/compare",
  compareAccounts: "/compare-accounts",

  // Verify these newer routes
  stocks: "/best-brokers/stocks",
indices: "/best-brokers/indices",
  commodities: "/best-brokers/commodities",
  countries: "/best-brokers",

  licenses: "/licenses",
  fca: "/licenses/fca",
  asic: "/licenses/asic",
  ciro: "/licenses/ciro",

  tools: "/tools",
  marketHours: "/tools/market-hours",
  strategies: "/strategies",
  indicators: "/indicators",
  learn: "/learn-trading",
};

const footerSections: FooterSection[] = [
  {
    title: "أفضل الوسطاء",
    links: [
      { label: "أفضل وسطاء الفوركس", href: routes.bestBrokers },
      { label: "أفضل وسطاء الأسهم", href: routes.stocks },
      { label: "أفضل وسطاء المؤشرات", href: routes.indices },
      { label: "أفضل وسطاء السلع", href: routes.commodities },
    ],
  },
  {
  title: "المقارنات",
  links: [
    { label: "تقييمات الوسطاء", href: routes.brokers },
    { label: "مقارنة شركات التداول", href: routes.compare },
    { label: "مقارنة حسابات التداول", href: routes.compareAccounts },
    { label: "أفضل الوسطاء 2026", href: routes.bestBrokers },
  ],
},
  {
    title: "التراخيص",
    links: [
      { label: "جميع التراخيص", href: routes.licenses },
      { label: "الترخيص البريطاني FCA", href: routes.fca },
      { label: "الترخيص الأسترالي ASIC", href: routes.asic },
      { label: "الترخيص الكندي CIRO", href: routes.ciro },
    ],
  },
  {
    title: "الأدوات والتعلم",
    links: [
      { label: "حاسبات التداول", href: routes.tools },
      { label: "استراتيجيات التداول", href: routes.strategies },
      { label: "ساعات تداول الأسواق", href: routes.marketHours },
      { label: "تعلم التداول", href: routes.learn },
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
  "المعلومات المعروضة في هذا الموقع لأغراض تعليمية ومعلوماتية فقط، ولا تشكل نصيحة مالية أو استثمارية. لا يقدم بروكر العرب خدمات تداول مباشرة ولا يحتفظ بأموال العملاء. ينطوي تداول الفوركس وعقود الفروقات والعملات الرقمية على مخاطر مرتفعة وقد لا يكون مناسبًا لجميع المستثمرين، وقد تتجاوز خسائرك قيمة الإيداع الأولي.";

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
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
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

function FooterTextLink({ label, href }: FooterLink) {
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

function FooterColumn({ title, links }: FooterSection) {
  return (
    <nav aria-label={title} className="min-w-0">
      <h3 className="text-[14px] font-extrabold text-white">
        {title}
      </h3>

      <div className="mt-2 h-[3px] w-7 rounded-full bg-gradient-to-l from-[#4AA3FF] to-[#1E5BB8]" />

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
          <span>{title}</span>
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
                  ←
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
          تحذير المخاطر
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
          تحذير المخاطر:
        </strong>{" "}
        {riskWarning}
      </p>
    </div>
  );
}

export default function ArabicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      className="relative mt-10 overflow-hidden border-t border-[#193B63] bg-[#071426] text-[#BED2EC] md:mt-12"
    >
      {/* SUBTLE BACKGROUND LIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(ellipse_at_75%_0%,rgba(43,111,208,0.13),transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">

        {/* PREMIUM TOP STRIP */}
        <div className="hidden pt-5 md:block lg:pt-6">
          <div className="relative overflow-hidden rounded-2xl border border-[#2A507D] bg-[linear-gradient(110deg,#102B4D_0%,#102542_55%,#0C203B_100%)] px-5 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)] sm:px-6">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-[#2B6FD0]/10 blur-3xl"
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#42A5FF]" />

                  <h2 className="text-[16px] font-extrabold text-white sm:text-[18px]">
                    تداول بوعي. قارن بثقة.
                  </h2>
                </div>

                <p className="text-[12px] leading-6 text-[#BED2EC] sm:text-[13px]">
                  اكتشف مراجعات الوسطاء والمقارنات والأدوات
                  التي تساعدك على اتخاذ قرارات مدروسة.
                </p>
              </div>

              <Link
  href={routes.brokers}
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-[#438DE8] bg-[#2563B9] px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_6px_20px_rgba(37,99,185,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#75B5FF] hover:bg-[#2B6FD0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 sm:self-auto"
              >
                <span>استكشف الوسطاء</span>
                <ArrowIcon />
              </Link>

            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block">

          <div className="grid grid-cols-[1.45fr_repeat(4,minmax(0,1fr))] gap-x-7 py-8 xl:gap-x-10">

            {/* BRAND */}
            <div className="min-w-0">
              <Link
                href={routes.home}
                aria-label="بروكر العرب - الرئيسية"
                className="inline-block"
              >
                <Image
                  src="/logo/Asset 2@4x.png"
                  alt="بروكر العرب | Broker Alarab"
                  width={320}
                  height={100}
                  className="h-auto w-[190px]"
                />
              </Link>

              <p className="mt-3 max-w-[295px] text-[12px] leading-7 text-[#BED2EC]">
                بروكر العرب منصة مستقلة لمراجعة ومقارنة
                شركات التداول والحسابات والتراخيص،
                لمساعدة المتداولين على اتخاذ قرارات مدروسة.
              </p>

              <div className="mt-4">
                <SocialLinks />
              </div>
            </div>

            {footerSections.map((section) => (
              <FooterColumn
                key={section.title}
                {...section}
              />
            ))}

          </div>

          <RiskWarning />

          {/* BOTTOM BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#284363] py-4 text-[12px] text-[#9FB5D1]">
            <p>
              © {year} بروكر العرب — جميع الحقوق محفوظة
            </p>

            <nav
              aria-label="روابط الموقع القانونية"
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href={routes.about}
                className="transition hover:text-white"
              >
                عن الموقع
              </Link>

              <span className="text-[#4B6685]">•</span>

              <Link
                href={routes.contact}
                className="transition hover:text-white"
              >
                اتصل بنا
              </Link>

              <span className="text-[#4B6685]">•</span>

              <Link
                href={routes.privacy}
                className="transition hover:text-white"
              >
                سياسة الخصوصية
              </Link>

              <span className="text-[#4B6685]">•</span>

              <Link
                href={routes.terms}
                className="transition hover:text-white"
              >
                الشروط والأحكام
              </Link>
            </nav>
          </div>
        </div>

        {/* TABLET */}
        <div className="hidden md:block lg:hidden">

          <div className="grid grid-cols-3 gap-x-7 gap-y-8 py-8">

            {/* BRAND */}
            <div>
              <Link
                href={routes.home}
                aria-label="بروكر العرب"
              >
                <Image
                  src="/logo/Asset 2@4x.png"
                  alt="بروكر العرب"
                  width={320}
                  height={100}
                  className="h-auto w-[175px]"
                />
              </Link>

              <p className="mt-3 text-[12px] leading-6 text-[#BED2EC]">
                منصة مستقلة لمراجعة ومقارنة شركات
                التداول والحسابات والتراخيص.
              </p>

              <div className="mt-4">
                <SocialLinks />
              </div>
            </div>

            {footerSections.map((section) => (
              <FooterColumn
                key={section.title}
                {...section}
              />
            ))}

          </div>

          <RiskWarning />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#284363] py-4 text-[12px] text-[#9FB5D1]">
            <p>
              © {year} بروكر العرب — جميع الحقوق محفوظة
            </p>

            <nav
              aria-label="روابط قانونية"
              className="flex flex-wrap gap-3"
            >
              <Link href={routes.about} className="hover:text-white">
                عن الموقع
              </Link>
              <Link href={routes.contact} className="hover:text-white">
                اتصل بنا
              </Link>
              <Link href={routes.privacy} className="hover:text-white">
                الخصوصية
              </Link>
              <Link href={routes.terms} className="hover:text-white">
                الشروط
              </Link>
            </nav>
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden">

          {/* MOBILE BRAND */}
          <div className="flex flex-col items-center py-5 text-center">

            <Link
              href={routes.home}
              aria-label="بروكر العرب"
            >
              <Image
                src="/logo/Asset 2@4x.png"
                alt="بروكر العرب | Broker Alarab"
                width={300}
                height={100}
                className="h-auto w-[175px]"
              />
            </Link>

            <p className="mt-3 max-w-[330px] text-[12px] leading-6 text-[#BED2EC]">
              منصة مستقلة لمراجعة ومقارنة شركات التداول
              والحسابات والتراخيص، لمساعدة المتداولين
              على اتخاذ قرارات مدروسة.
            </p>

            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>

          
{/* MOBILE NAVIGATION */}
<nav
  aria-label="روابط الفوتر"
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
        title="عن بروكر العرب"
        links={[
          {
            label: "عن الموقع",
            href: routes.about,
          },
          {
            label: "اتصل بنا",
            href: routes.contact,
          },
          {
            label: "سياسة الخصوصية",
            href: routes.privacy,
          },
          {
            label: "الشروط والأحكام",
            href: routes.terms,
          },
        ]}
      />
    </div>
  </div>
</nav>


          <RiskWarning mobile />

          {/* MOBILE BOTTOM */}
          <div className="border-t border-[#284363] py-4 text-center">
            <p className="text-[11px] leading-6 text-[#9FB5D1]">
              © {year} بروكر العرب — جميع الحقوق محفوظة
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
