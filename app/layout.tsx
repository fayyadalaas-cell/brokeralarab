import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Cairo } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import MobileNavMenu from "@/app/components/MobileNavMenu";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "بروكر العرب",
    template: "%s | بروكر العرب",
  },
  description:
    "بروكر العرب منصة عربية متخصصة في مراجعات ومقارنات شركات التداول لمساعدة المتداول العربي على اختيار الوسيط المناسب.",
  metadataBase: new URL("https://brokeralarab.com"),
  verification: {
    google: "eivw8RsaxU2SPjyhov7RFqS8gdAM0VTN8YsmxQncXm4",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

type BrokerMenuItem = {
  name: string;
  slug: string;
  menuLogo: string;
};

type MenuLink = {
  href: string;
  label: string;
};

type CountryMenuItem = {
  href: string;
  label: string;
  shortLabel: string;
  flag: string;
};

const footerMainLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/brokers", label: "تقييمات الوسطاء" },
  { href: "/compare", label: "المقارنات" },
  { href: "/best-brokers", label: "أفضل الوسطاء" },
];

const footerLegalLinks = [
  { href: "/about", label: "عن بروكر العرب" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/privacy-policy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "الشروط والأحكام" },
];

const brokerLogoMap: Record<string, string> = {
  activtrades: "/brokers/activtrade.png",
  alpari: "/brokers/alpari.png",
  avatrade: "/brokers/avatrade.png",
  activtrade: "/brokers/activtrade.png",
  equiti: "/brokers/equiti.png",
  exness: "/brokers/exness.png",
  "exness-platform": "/brokers/exness-platform.png",
  fxpro: "/brokers/FxPro.png",
  "ic-markets": "/brokers/ic-markets.png",
  justmarkets: "/brokers/justmarkets.png",
  justmarket: "/brokers/justmarket.png",
  "just-markets": "/brokers/justmarkets.png",
  pepperstone: "/brokers/pepperstone.png",
  vantage: "/brokers/vantage.png",
  xm: "/brokers/xm.png",
  xs: "/brokers/xs.png",
};

const countryMenuItems: CountryMenuItem[] = [
  {
    href: "/best-brokers/saudi-arabia",
    label: "أفضل الوسطاء في السعودية",
    shortLabel: "السعودية",
    flag: "/flags/sa.svg",
  },
  {
    href: "/best-brokers/united-arab-emirates",
    label: "أفضل الوسطاء في الإمارات",
    shortLabel: "الإمارات",
    flag: "/flags/ae.svg",
  },
  {
    href: "/best-brokers/egypt",
    label: "أفضل الوسطاء في مصر",
    shortLabel: "مصر",
    flag: "/flags/eg.svg",
  },
  {
    href: "/best-brokers/jordan",
    label: "أفضل الوسطاء في الأردن",
    shortLabel: "الأردن",
    flag: "/flags/jo.svg",
  },
  {
    href: "/best-brokers/kuwait",
    label: "أفضل الوسطاء في الكويت",
    shortLabel: "الكويت",
    flag: "/flags/kw.svg",
  },
  {
    href: "/best-brokers/qatar",
    label: "أفضل الوسطاء في قطر",
    shortLabel: "قطر",
    flag: "/flags/qa.svg",
  },
  {
    href: "/best-brokers/bahrain",
    label: "أفضل الوسطاء في البحرين",
    shortLabel: "البحرين",
    flag: "/flags/bh.svg",
  },
  {
    href: "/best-brokers/oman",
    label: "أفضل الوسطاء في عُمان",
    shortLabel: "عُمان",
    flag: "/flags/om.svg",
  },
];

const featuredCategories: MenuLink[] = [
  { href: "/best-brokers", label: "أفضل الوسطاء في 2026" },
  { href: "/lowest-spread-brokers", label: "شركات التداول الأقل سبريد" },
  { href: "/best-brokers", label: "أفضل الوسطاء بحساب إسلامي" },
  { href: "/compare", label: "أفضل المقارنات بين الوسطاء" },
];

const featuredComparisons: MenuLink[] = [
  { href: "/compare/exness-vs-xm", label: "Exness vs XM" },
  { href: "/compare/fxpro-vs-avatrade", label: "Fxpro vs AvaTrade" },
  { href: "/compare/xm-vs-pepperstone", label: "XM vs Pepperstone" },
  { href: "/compare/alpari-vs-xs", label: "Alpari vs XS" },
  { href: "/compare/equiti-vs-activtrade", label: "Equiti vs Vantage" },
];

function getBrokerLogo(slug: string): string {
  return brokerLogoMap[slug] || "/brokers/BrokerLogo.png";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: brokersData } = await supabase
    .from("brokers")
    .select("name, slug, rating")
    .not("slug", "is", null)
    .order("rating", { ascending: false })
    .limit(5);

  const topBrokers: BrokerMenuItem[] =
    brokersData?.map((broker) => ({
      name: broker.name,
      slug: broker.slug,
      menuLogo: getBrokerLogo(broker.slug),
    })) ?? [];

  return (
    <html lang="ar" dir="rtl">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "بروكر العرب",
              alternateName: "Broker Al Arab",
              url: "https://brokeralarab.com",
              logo: "https://brokeralarab.com/brokers/BrokerLogo.png",
              sameAs: [
                "https://www.facebook.com/BrokerAlArab",
                "https://x.com/brokeralarab",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${cairo.variable} bg-[#f4f7fb] font-sans text-[#0f172a] antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-3 lg:h-20">
              <Link href="/" className="min-w-0 shrink-0">
                <Image
                  src="/brokers/BrokerLogo.png"
                  alt="بروكر العرب"
                  width={300}
                  height={90}
                  priority
                  className="h-auto w-[120px] sm:w-[135px] lg:w-[200px]"
                />
              </Link>

              <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
                <Link
                  href="/"
                  className="rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
                >
                  الرئيسية
                </Link>

                {/* REVIEWS */}
                <div className="group relative">
                  <Link
                    href="/brokers"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
                  >
                    تقييمات الوسطاء
                    <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                      ▼
                    </span>
                  </Link>

                  <div className="invisible absolute right-0 top-full z-50 mt-1 w-[360px] translate-y-2 rounded-[28px] border border-slate-200 bg-white p-3 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="px-3 pb-2 pt-1 text-xs font-black tracking-wide text-slate-500">
                      أعلى 5 تقييمات حاليًا
                    </div>

                    {topBrokers.length > 0 ? (
                      topBrokers.map((broker) => (
                        <Link
                          key={broker.slug}
                          href={`/brokers/${broker.slug}`}
                          className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3 transition hover:bg-blue-50"
                        >
                          <div className="min-w-0 text-right">
                            <div className="text-[15px] font-extrabold text-slate-800">
                              تقييم {broker.name}
                            </div>
                          </div>

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
  <Image
    src={broker.menuLogo}
    alt={broker.name}
    width={40}
    height={40}
    className="h-full w-full object-contain p-1"
  />
</div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-3 py-3 text-sm font-bold text-slate-500">
                        لا توجد تقييمات متاحة حاليًا.
                      </div>
                    )}

                    <Link
                      href="/brokers"
                      className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                    >
                      جميع المراجعات ←
                    </Link>
                  </div>
                </div>

                {/* COMPARE */}
<div className="group relative">
  <Link
    href="/compare"
    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
  >
    المقارنات
    <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
      ▼
    </span>
  </Link>

  <div className="invisible absolute right-0 top-full z-50 mt-1 w-[340px] translate-y-2 rounded-[28px] border border-slate-200 bg-white p-3 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
    <div className="px-3 pb-2 pt-1 text-xs font-black tracking-wide text-slate-500">
      أشهر المقارنات
    </div>

    {featuredComparisons.map((item) => {
      const parts = item.label.split(" vs ");
      const leftSlug = parts[0]?.toLowerCase().replace(/\s+/g, "-");
      const rightSlug = parts[1]?.toLowerCase().replace(/\s+/g, "-");

      return (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center justify-between gap-3 rounded-2xl px-3 py-3 transition hover:bg-blue-50"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
  <Image
    src={getBrokerLogo(rightSlug)}
    alt={rightSlug || ""}
    width={40}
    height={40}
    className="h-full w-full object-contain p-1"
  />
</div>

          <div className="flex-1 text-center text-[14px] font-bold text-slate-700">
            {item.label}
          </div>

         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
  <Image
    src={getBrokerLogo(leftSlug)}
    alt={leftSlug || ""}
    width={40}
    height={40}
    className="h-full w-full object-contain p-1"
  />
</div>
        </Link>
      );
    })}

    <Link
      href="/compare"
      className="mt-1 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
    >
      جميع المقارنات ←
    </Link>
  </div>
</div>

                {/* BEST BROKERS */}
                <div className="group relative">
                  <Link
                    href="/best-brokers"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
                  >
                    أفضل الوسطاء
                    <span className="text-[10px] text-slate-400 transition duration-200 group-hover:rotate-180">
                      ▼
                    </span>
                  </Link>

                  <div className="invisible absolute right-0 top-full z-50 mt-1 w-[min(92vw,840px)] translate-y-2 rounded-[30px] border border-slate-200 bg-white p-5 opacity-0 shadow-[0_28px_80px_rgba(15,23,42,0.15)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid grid-cols-[1.15fr_0.95fr] gap-6 divide-x divide-slate-200 divide-x-reverse">
                      {/* COUNTRIES */}
                      <div className="pr-1">
                        <div className="mb-4 text-sm font-black text-slate-900">
                          أفضل الوسطاء حسب الدولة
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {countryMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-blue-50"
                              title={item.label}
                            >
                              <Image
                                src={item.flag}
                                alt={item.shortLabel}
                                width={22}
                                height={22}
                                className="h-[22px] w-[22px] shrink-0 rounded-full object-cover"
                              />
                              <span className="whitespace-nowrap text-[14px] font-bold text-slate-700 transition hover:text-blue-700">
                                {item.shortLabel}
                              </span>
                            </Link>
                          ))}
                        </div>

                        <Link
                          href="/best-brokers"
                          className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                        >
                          جميع الدول ←
                        </Link>
                      </div>

                      {/* CATEGORIES */}
                      <div className="pl-5">
                        <div className="mb-4 text-sm font-black text-slate-900">
                          أفضل الوسطاء حسب الفئة
                        </div>

                        <div className="grid gap-2">
                          {featuredCategories.map((item) => (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              className="rounded-2xl px-3 py-3 text-[15px] font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        <Link
                          href="/best-brokers"
                          className="mt-3 block rounded-2xl px-3 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                        >
                          جميع التصنيفات ←
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="rounded-full px-4 py-2.5 text-[15px] font-extrabold text-slate-700 transition hover:bg-slate-100"
                >
                  عن الموقع
                </Link>
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <Link
                  href="/compare"
                  className="hidden xl:inline-flex rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  تصفح المقارنات
                </Link>

                <Link
                  href="/best-brokers"
                  className="rounded-2xl bg-[#2563eb] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
                >
                  أفضل الوسطاء
                </Link>
              </div>

              <MobileNavMenu
                topBrokers={topBrokers}
                countryMenuItems={countryMenuItems}
                featuredCategories={featuredCategories}
                featuredComparisons={featuredComparisons}
              />
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-8 border-t border-slate-800 bg-[#081224] text-slate-300 md:mt-12">
          <div className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.9fr_0.9fr] md:gap-10">
              <div>
                <Image
                  src="/brokers/BrokerLogo.png"
                  alt="بروكر العرب"
                  width={280}
                  height={90}
                  className="h-auto w-[160px] brightness-0 invert md:w-[210px]"
                />

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                  منصة عربية متخصصة في مراجعات ومقارنات شركات التداول، تساعد
                  المتداول العربي على اختيار الوسيط المناسب وفهم الفروقات بين
                  الشركات قبل فتح الحساب.
                </p>

                <div className="mt-4 text-sm">
                  <span className="font-bold text-white">البريد:</span>{" "}
                  <a
                    href="mailto:info@brokeralarab.com"
                    className="text-slate-300 transition hover:text-white"
                  >
                    info@brokeralarab.com
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 md:hidden">
                <div>
                  <div className="text-sm font-bold text-white">روابط الموقع</div>
                  <div className="mt-3 grid gap-2 text-sm">
                    {footerMainLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-slate-300 transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold text-white">صفحات مهمة</div>
                  <div className="mt-3 grid gap-2 text-sm">
                    {footerLegalLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-slate-300 transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="text-sm font-bold text-white">روابط الموقع</div>
                <div className="mt-4 grid gap-3 text-sm">
                  {footerMainLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-slate-300 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hidden md:block">
                <div className="text-sm font-bold text-white">صفحات مهمة</div>
                <div className="mt-4 grid gap-3 text-sm">
                  {footerLegalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-slate-300 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-800 pt-3 text-right text-[12px] leading-7 text-slate-400 md:text-sm">
              <p>
                <span className="font-semibold text-slate-300">
                  تحذير المخاطر:
                </span>{" "}
                المعلومات المعروضة في هذا الموقع لأغراض تعليمية فقط ولا تشكل
                نصيحة مالية أو استثمارية، ولا يقدم بروكر العرب خدمات تداول مباشرة
                ولا يحتفظ بأموال العملاء. ينطوي تداول الفوركس وعقود الفروقات
                والعملات الرقمية على مستوى مرتفع من المخاطر وقد لا يكون مناسبًا
                لجميع المستثمرين، وقد تتجاوز خسائرك قيمة الإيداع الأولي.
              </p>
            </div>

            <div className="mt-4 border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} بروكر العرب - جميع الحقوق محفوظة
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}