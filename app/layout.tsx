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
  { href: "/compare/equiti-vs-vantage", label: "Equiti vs Vantage" },
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
            <div className="relative flex h-16 items-center justify-between lg:h-20">
  <Link href="/" className="min-w-0 shrink-0 lg:justify-self-end">
                <Image
                  src="/brokers/BrokerLogo.png"
                  alt="بروكر العرب"
                  width={300}
                  height={90}
                  priority
                  className="h-auto w-[120px] sm:w-[135px] lg:w-[200px]"
                />
              </Link>

              <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
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

                  <div className="invisible absolute right-0 top-full z-50 mt-1 w-[640px] max-w-[calc(100vw-40px)] translate-y-2 rounded-[30px] border border-slate-200 bg-white p-5 opacity-0 shadow-[0_28px_80px_rgba(15,23,42,0.15)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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

        <footer className="mt-10 border-t border-slate-800 bg-[linear-gradient(180deg,#07101f_0%,#06101d_100%)] text-slate-300 md:mt-14">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Desktop */}
    <div className="hidden md:block">
      <div className="grid gap-8 py-10 lg:grid-cols-[1.15fr_0.8fr_0.8fr]">
        <div>
          <Image
            src="/brokers/BrokerLogo.png"
            alt="بروكر العرب"
            width={320}
            height={100}
            className="h-auto w-[210px] brightness-0 invert"
          />

          <p className="mt-4 max-w-xl text-[15px] leading-8 text-slate-300">
            بروكر العرب منصة عربية متخصصة في مراجعات ومقارنات شركات التداول،
            تساعد المتداول العربي على اختيار الوسيط المناسب وفهم الفروقات بين
            الشركات والحسابات والمنصات قبل فتح الحساب.
          </p>

          <div className="mt-5">
            <a
              href="mailto:info@brokeralarab.com"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-white transition hover:border-blue-400/30 hover:bg-white/[0.08]"
            >
              info@brokeralarab.com
            </a>
          </div>
        </div>

        <div>
          <div className="text-sm font-black tracking-wide text-white">
            روابط الموقع
          </div>

          <div className="mt-5 space-y-3">
            {footerMainLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-xl border border-white/8 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-blue-400/25 hover:bg-white/[0.04] hover:text-white"
              >
                <span>{item.label}</span>
                <span className="text-slate-500 transition group-hover:text-blue-300">
                  ←
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-black tracking-wide text-white">
            صفحات مهمة
          </div>

          <div className="mt-5 space-y-3">
            {footerLegalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-xl border border-white/8 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-blue-400/25 hover:bg-white/[0.04] hover:text-white"
              >
                <span>{item.label}</span>
                <span className="text-slate-500 transition group-hover:text-blue-300">
                  ←
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="text-right">
          <div className="mb-2 text-sm font-black text-white">تحذير المخاطر</div>
          <p className="text-sm leading-8 text-slate-400">
            المعلومات المعروضة في هذا الموقع لأغراض تعليمية ومعلوماتية فقط،
            ولا تشكل نصيحة مالية أو استثمارية. لا يقدم بروكر العرب خدمات تداول
            مباشرة ولا يحتفظ بأموال العملاء. ينطوي تداول الفوركس وعقود الفروقات
            والعملات الرقمية على مخاطر مرتفعة وقد لا يكون مناسبًا لجميع
            المستثمرين، وقد تتجاوز خسائرك قيمة الإيداع الأولي.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div>© {new Date().getFullYear()} بروكر العرب — جميع الحقوق محفوظة</div>

          <div className="flex items-center gap-3">
            <Link href="/privacy-policy" className="transition hover:text-white">
              سياسة الخصوصية
            </Link>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <Link href="/terms-and-conditions" className="transition hover:text-white">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile */}
    <div className="md:hidden">
      <div className="py-6">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#0a1730_0%,#07101f_100%)] shadow-[0_20px_60px_rgba(2,6,23,0.32)]">
          <div className="px-4 py-5">
            <Image
              src="/brokers/BrokerLogo.png"
              alt="بروكر العرب"
              width={260}
              height={90}
              className="mx-auto h-auto w-[170px] brightness-0 invert"
            />

            <p className="mt-4 text-center text-[14px] leading-8 text-slate-300">
              بروكر العرب منصة عربية متخصصة في مراجعات ومقارنات شركات التداول،
              تساعد المتداول العربي على اختيار الوسيط المناسب وفهم الفروقات بين
              الشركات قبل فتح الحساب.
            </p>

            <div className="mt-5">
              <a
                href="mailto:info@brokeralarab.com"
                className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm font-bold text-white"
              >
                info@brokeralarab.com
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-4">
            <details className="group rounded-2xl border border-white/8 bg-white/[0.03]">
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3.5 text-sm font-black text-white marker:content-none">
                <span>روابط الموقع</span>
                <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="space-y-2 border-t border-white/8 px-3 py-3">
                {footerMainLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            <details className="group mt-3 rounded-2xl border border-white/8 bg-white/[0.03]">
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3.5 text-sm font-black text-white marker:content-none">
                <span>صفحات مهمة</span>
                <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="space-y-2 border-t border-white/8 px-3 py-3">
                {footerLegalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            <details className="group mt-3 rounded-2xl border border-white/8 bg-white/[0.03]">
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3.5 text-sm font-black text-white marker:content-none">
                <span>تحذير المخاطر</span>
                <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="border-t border-white/8 px-4 py-3">
                <p className="text-[13px] leading-7 text-slate-300">
                  المعلومات المعروضة في هذا الموقع لأغراض تعليمية ومعلوماتية فقط،
                  ولا تشكل نصيحة مالية أو استثمارية. لا يقدم بروكر العرب خدمات تداول
                  مباشرة ولا يحتفظ بأموال العملاء. ينطوي تداول الفوركس وعقود
                  الفروقات والعملات الرقمية على مخاطر مرتفعة وقد لا يكون مناسبًا
                  لجميع المستثمرين.
                </p>
              </div>
            </details>
          </div>

          <div className="border-t border-white/10 px-4 py-4 text-center">
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} بروكر العرب — جميع الحقوق محفوظة
            </div>

            <div className="mt-2 flex items-center justify-center gap-3 text-[12px] text-slate-500">
              <Link href="/privacy-policy" className="transition hover:text-white">
                سياسة الخصوصية
              </Link>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <Link href="/terms-and-conditions" className="transition hover:text-white">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
      </body>
    </html>
  );
}