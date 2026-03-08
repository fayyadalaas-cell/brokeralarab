import type { Metadata } from "next";
import Link from "next/link";
import { Cairo } from "next/font/google";
import "./globals.css";

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
    "بروكر العرب منصة عربية متخصصة في مراجعات ومقارنات شركات التداول لمساعدة المتداول العربي على اختيار الوسيط المناسب بناءً على التراخيص والرسوم والمنصات وتجربة الاستخدام.",
  metadataBase: new URL("https://brokeralarab.com"),
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} bg-[#f4f7fb] font-sans text-[#0f172a] antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-3 md:h-20 md:gap-6">
              <Link href="/" className="min-w-0 shrink-0">
                <div className="text-2xl font-black tracking-tight text-[#0f172a] md:text-3xl">
                  بروكر العرب
                </div>
                <div className="mt-0.5 text-[10px] font-semibold text-slate-500 md:mt-1 md:text-xs">
                  مراجعات ومقارنات شركات التداول
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

              <details className="relative md:hidden">
                <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-50">
                  <span className="sr-only">فتح القائمة</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M4 12h16M4 17h16"
                    />
                  </svg>
                </summary>

                <div className="absolute left-0 top-14 w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                  <div className="mb-2 px-2 text-xs font-bold text-slate-500">
                    تصفح الموقع
                  </div>

                  <div className="space-y-1">
                    {navLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3">
                    <Link
                      href="/compare"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                    >
                      تصفح المقارنات
                    </Link>

                    <Link
                      href="/brokers"
                      className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
                    >
                      أفضل الوسطاء
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-8 border-t border-slate-200 bg-[#eef3f8] md:mt-14">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            {/* MOBILE */}
            <div className="space-y-4 md:hidden">
              <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-5 shadow-sm">
                <div className="text-xl font-black text-[#0f172a]">
                  بروكر العرب
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  منصة عربية متخصصة في مراجعات ومقارنات شركات التداول، وتهدف إلى
                  مساعدة المتداول العربي على فهم الفروقات بين الوسطاء قبل فتح أي
                  حساب حقيقي أو تجريبي.
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-5 shadow-sm">
                <div className="text-sm font-black text-[#0f172a]">
                  روابط الموقع
                </div>

                <div className="mt-4 grid gap-3 text-sm">
                  {footerMainLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-slate-600 transition hover:text-[#1d4ed8]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-5 shadow-sm">
                <div className="text-sm font-black text-[#0f172a]">
                  صفحات مهمة
                </div>

                <div className="mt-4 grid gap-3 text-sm">
                  {footerLegalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-slate-600 transition hover:text-[#1d4ed8]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-5 shadow-sm">
                <div className="text-sm font-black text-[#0f172a]">
                  تواصل معنا
                </div>

                <div className="mt-3 text-sm leading-7 text-slate-600">
                  info@brokeralarab.com
                </div>
              </div>

              <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-5 py-5 shadow-sm">
                <div className="text-sm font-black text-[#0f172a]">
                  إخلاء مسؤولية
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-700">
                  المعلومات المنشورة في بروكر العرب هي لأغراض تعليمية ومعلوماتية
                  فقط، ولا تُعد توصية استثمارية أو ضمانًا لأي شركة. يتحمل
                  المستخدم مسؤولية التحقق النهائي من شروط أي وسيط قبل التسجيل أو
                  الإيداع أو بدء التداول.
                </p>
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden gap-10 md:grid md:grid-cols-4">
              <div className="text-right">
                <div className="text-2xl font-black text-[#0f172a]">
                  بروكر العرب
                </div>

                <p className="mt-4 max-w-sm text-sm leading-8 text-slate-600">
                  منصة عربية متخصصة في مراجعات ومقارنات شركات التداول، وتهدف إلى
                  مساعدة المتداول العربي على اتخاذ قرار أوضح قبل فتح الحساب.
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-[#0f172a]">
                  روابط الموقع
                </div>

                <div className="mt-4 grid gap-3 text-sm">
                  {footerMainLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-slate-600 transition hover:text-[#1d4ed8]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-[#0f172a]">
                  صفحات مهمة
                </div>

                <div className="mt-4 grid gap-3 text-sm">
                  {footerLegalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-slate-600 transition hover:text-[#1d4ed8]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="text-sm font-black text-[#0f172a]">
                    البريد الإلكتروني
                  </div>
                  <div className="mt-3 text-sm text-slate-600">
                    info@brokeralarab.com
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-[#0f172a]">
                  إخلاء مسؤولية
                </div>

                <p className="mt-4 max-w-sm text-sm leading-8 text-slate-600">
                  المعلومات المعروضة في هذا الموقع مخصصة لأغراض المقارنة
                  والتعليم فقط، ولا تعتبر نصيحة استثمارية أو توصية مباشرة بفتح
                  حساب مع أي شركة. بروكر العرب لا يدير حسابات تداول ولا يتحمل
                  مسؤولية أي تعامل يتم بين المستخدم وأي وسيط مذكور في الموقع.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5 text-center text-xs leading-6 text-slate-500">
              © {new Date().getFullYear()} بروكر العرب - جميع الحقوق محفوظة
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}