import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Cairo } from "next/font/google";
import "./globals.css";
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
  src="/brokers/BrokerAlarab.png"
  alt="بروكر العرب"
  width={260}
  height={80}
  priority
  className="h-auto w-[150px] translate-y-2 md:w-[220px] md:translate-y-2"
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
                  href="/brokers"
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
        <footer className="mt-6 border-t border-slate-800 bg-[#0f172a] text-slate-300 md:mt-12">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {/* MOBILE */}
            <div className="space-y-6 md:hidden">
              <div>
                <Image
                  src="/brokers/BrokerAlarab.png"
                  alt="بروكر العرب"
                  width={240}
                  height={80}
                  className="h-auto w-[150px] brightness-0 invert"
                />
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  منصة عربية متخصصة في مراجعات ومقارنات شركات التداول
                  لمساعدة المتداول العربي على اختيار الوسيط المناسب.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-black text-white">روابط الموقع</div>
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
                  <div className="text-sm font-black text-white">صفحات مهمة</div>
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

              <div className="text-sm">
                <span className="font-black text-white">البريد:</span>{" "}
                info@brokeralarab.com
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-10">
              <div>
                <Image
                  src="/brokers/BrokerAlarab.png"
                  alt="بروكر العرب"
                  width={280}
                  height={90}
                  className="h-auto w-[180px] brightness-0 invert"
                />
                <p className="mt-4 text-sm leading-8 text-slate-300">
                  منصة عربية متخصصة في مراجعات ومقارنات شركات التداول
                  لمساعدة المتداول العربي على اتخاذ قرار أفضل قبل فتح الحساب.
                </p>
              </div>

              <div>
                <div className="text-sm font-black text-white">روابط الموقع</div>
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

              <div>
                <div className="text-sm font-black text-white">صفحات مهمة</div>
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

                <div className="mt-6">
                  <div className="text-sm font-black text-white">البريد</div>
                  <div className="mt-2 text-sm text-slate-300">
                    info@brokeralarab.com
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-black text-white">إخلاء مسؤولية</div>
                <p className="mt-4 text-sm leading-8 text-slate-300">
                  المعلومات المعروضة في هذا الموقع لأغراض تعليمية فقط
                  ولا تعتبر نصيحة استثمارية أو توصية بفتح حساب تداول.
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} بروكر العرب - جميع الحقوق محفوظة
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}