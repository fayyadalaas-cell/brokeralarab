import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Cairo } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import MobileNavMenu from "@/app/components/MobileNavMenu";
import HeaderSwitcher from "@/app/components/HeaderSwitcher";



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
  "بروكر العرب يقدم تقييمات ومقارنات شاملة لأفضل شركات التداول، مع تحليل التراخيص، الرسوم، والمنصات لمساعدة المتداول العربي على اختيار الوسيط المناسب بثقة.",
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
  name_en?: string;
  slug: string;
  menuLogo: string;
};

type MenuLink = {
  href: string;
  label: string;
  label_en?: string;
};

type CountryMenuItem = {
  href: string;
  label: string;
  label_en?: string;
  shortLabel: string;
  shortLabel_en?: string;
  flag: string;
};

type LearnTradingMenuItem = {
  href: string;
  title: string;
  description: string;
  image: string;
  isFeatured?: boolean;
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
    href: "/best-brokers/uae",
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
  { href: "/best-brokers/gold", label: "أفضل منصات تداول الذهب" },
  { href: "/compare", label: "أفضل المقارنات بين الوسطاء" },
];

const featuredComparisons: MenuLink[] = [
  { href: "/compare/exness-vs-xm", label: "Exness vs XM" },
  { href: "/compare/fxpro-vs-avatrade", label: "Fxpro vs AvaTrade" },
  { href: "/compare/xm-vs-pepperstone", label: "XM vs Pepperstone" },
  { href: "/compare/alpari-vs-xs", label: "Alpari vs XS" },
  { href: "/compare/equiti-vs-vantage", label: "Equiti vs Vantage" },
];

const learnTradingMenuItems: LearnTradingMenuItem[] = [
  {
    href: "/learn-trading/how-to-start-trading-from-zero",
    title: "كيف تبدأ التداول من الصفر خطوة بخطوة",
    description: "دليل عملي للمبتدئ لفهم الأساسيات واختيار الوسيط المناسب.",
    image: "/articles/how-to-start-trading-from-zero.png",
    isFeatured: true,
  },
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
    .select("name, name_en, slug, rating")
    .not("slug", "is", null)
    .order("rating", { ascending: false })
    .limit(5);

  const topBrokers: BrokerMenuItem[] =
  brokersData?.map((broker) => ({
    name: broker.name,
    name_en: broker.name_en,
    slug: broker.slug,
    menuLogo: getBrokerLogo(broker.slug),
  })) ?? [];

  return (
    <html lang="ar" dir="rtl">
    <head>
  {/* Organization Schema */}
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

{/* Google Analytics */}
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-4V7MN48JS7"
  strategy="afterInteractive"
/>

<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-4V7MN48JS7');
    `,
  }}
/>
</head>

     <body
  className={`${cairo.variable} bg-[#f4f7fb] font-sans text-[#0f172a] antialiased`}
>

<HeaderSwitcher
  topBrokers={topBrokers}
  countryMenuItems={countryMenuItems}
  featuredCategories={featuredCategories}
  featuredComparisons={featuredComparisons}
  learnTradingMenuItems={learnTradingMenuItems}
/>
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