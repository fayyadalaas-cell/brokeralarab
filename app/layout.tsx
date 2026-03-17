import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Cairo } from "next/font/google";
import "./globals.css";
import Script from "next/script";
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

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/brokers", label: "التقييمات" },
  { href: "/compare", label: "المقارنات" },
  { href: "/best-brokers", label: "أفضل الوسطاء" },
  { href: "/about", label: "عن الموقع" },
];

const footerMainLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/brokers", label: "التقييمات" },
  { href: "/compare", label: "المقارنات" },
  { href: "/best-brokers", label: "أفضل الوسطاء" },
];

const footerLegalLinks = [
  { href: "/about", label: "عن بروكر العرب" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/privacy-policy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "الشروط والأحكام" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-3 md:h-20 md:gap-6">
              <Link href="/" className="min-w-0 shrink-0">
                <div className="flex items-center">
                  <Image
                    src="/brokers/BrokerLogo.png"
                    alt="بروكر العرب"
                    width={260}
                    height={80}
                    priority
                    className="h-auto w-[150px] -translate-y-1 md:w-[220px] md:-translate-y-0"
                  />
                </div>
              </Link>

              <nav className="hidden items-center gap-2 md:flex">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden items-center gap-3 md:flex">
                <Link
                  href="/compare"
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  تصفح المقارنات
                </Link>

                <Link
                  href="/best-brokers"
                  className="rounded-xl bg-[#2563eb] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
                >
                  أفضل الوسطاء
                </Link>
              </div>

              <MobileNavMenu navLinks={navLinks} />
            </div>
          </div>
        </header>

        <main>{children}</main>

        {/* FOOTER */}
<footer className="mt-8 border-t border-slate-800 bg-[#081224] text-slate-300 md:mt-12">
  <div className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">

    {/* TOP */}
    <div className="grid gap-8 md:grid-cols-[1.2fr_0.9fr_0.9fr] md:gap-10">

      {/* BRAND */}
      <div>
        <Image
          src="/brokers/BrokerLogo.png"
          alt="بروكر العرب"
          width={280}
          height={90}
          className="h-auto w-[160px] brightness-0 invert md:w-[210px]"
        />

        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
          منصة عربية متخصصة في مراجعات ومقارنات شركات التداول، تساعد المتداول
          العربي على اختيار الوسيط المناسب وفهم الفروقات بين الشركات قبل فتح الحساب.
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

      {/* MOBILE: LINKS GRID */}
      <div className="grid grid-cols-2 gap-6 md:hidden">
        {/* SITE LINKS */}
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

        {/* LEGAL LINKS */}
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

      {/* DESKTOP LINKS */}
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

    {/* LEGAL STRIP */}
    <div className="mt-6 border-t border-slate-800 pt-3 text-right text-[12px] leading-7 text-slate-400 md:text-sm">
      <p>
        <span className="font-semibold text-slate-300">تحذير المخاطر:</span>{" "}
        المعلومات المعروضة في هذا الموقع لأغراض تعليمية فقط ولا تشكل نصيحة مالية أو استثمارية،
        ولا يقدم بروكر العرب خدمات تداول مباشرة ولا يحتفظ بأموال العملاء. ينطوي تداول الفوركس
        وعقود الفروقات والعملات الرقمية على مستوى مرتفع من المخاطر وقد لا يكون مناسبًا لجميع المستثمرين،
        وقد تتجاوز خسائرك قيمة الإيداع الأولي.
      </p>
    </div>

    {/* COPYRIGHT */}
    <div className="mt-4 border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} بروكر العرب - جميع الحقوق محفوظة
    </div>

  </div>
</footer>
      </body>
    </html>
  );
}