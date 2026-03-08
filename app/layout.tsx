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
  description: "مراجعات ومقارنات شركات التداول للمتداول العربي",
};

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
            <div className="flex h-20 items-center justify-between gap-6">
              <Link href="/" className="shrink-0">
                <div className="text-3xl font-black tracking-tight text-[#0f172a]">
                  بروكر العرب
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-500">
                  مراجعات ومقارنات شركات التداول
                </div>
              </Link>

              <nav className="hidden items-center gap-2 md:flex">
                <Link
                  href="/"
                  className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-100"
                >
                  الرئيسية
                </Link>
                <Link
                  href="/brokers"
                  className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-100"
                >
                  التقييمات
                </Link>
                <Link
                  href="/compare"
                  className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-100"
                >
                  المقارنات
                </Link>
                <Link
                  href="/best-brokers"
                  className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-100"
                >
                  أفضل الوسطاء
                </Link>
                <Link
                  href="/about"
                  className="rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-100"
                >
                  عن الموقع
                </Link>
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
                  className="rounded-xl bg-[#2563eb] px-4 py-2.5 text-sm font-extrabold !text-white transition hover:bg-[#1d4ed8]"
                >
                  أفضل الوسطاء
                </Link>
              </div>
            </div>
          </div>
        </header>

        {children}

        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-2xl font-black text-[#0f172a]">
                  بروكر العرب
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  منصة عربية لمراجعة ومقارنة شركات التداول ومساعدة المتداول
                  العربي على اتخاذ قرار أوضح قبل فتح الحساب.
                </p>
              </div>

              <div>
                <div className="text-sm font-black text-[#0f172a]">
                  روابط مهمة
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <Link href="/" className="text-slate-600 hover:text-[#1d4ed8]">
                      الرئيسية
                    </Link>
                  </div>
                  <div>
                    <Link href="/brokers" className="text-slate-600 hover:text-[#1d4ed8]">
                      التقييمات
                    </Link>
                  </div>
                  <div>
                    <Link href="/compare" className="text-slate-600 hover:text-[#1d4ed8]">
                      المقارنات
                    </Link>
                  </div>
                  <div>
                    <Link href="/best-brokers" className="text-slate-600 hover:text-[#1d4ed8]">
                      أفضل الوسطاء
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-black text-[#0f172a]">
                  تنويه
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  المعلومات المعروضة لأغراض تعليمية ومقارنة فقط، ويجب على
                  المستخدم مراجعة التفاصيل النهائية لدى الشركة قبل فتح أي حساب.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} بروكر العرب - جميع الحقوق محفوظة
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}