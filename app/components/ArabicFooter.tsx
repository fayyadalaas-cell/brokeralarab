import Link from "next/link";
import Image from "next/image";

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
  { href: "/terms-and-conditions", label: "الشروط والأحكام" },
];

export default function ArabicFooter() {
  return (
    <footer className="mt-10 border-t border-slate-800 bg-[linear-gradient(180deg,#07101f_0%,#06101d_100%)] text-slate-300 md:mt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="grid gap-8 py-10 lg:grid-cols-[1.15fr_0.8fr_0.8fr]">
            <div>
             <Image
  src="/logo/Asset 2@4x.png"
  alt="Broker Al Arab"
  width={320}
  height={100}
  className="h-auto w-[220px]"
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
  );
}