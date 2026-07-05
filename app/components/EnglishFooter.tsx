import Link from "next/link";
import Image from "next/image";

const footerMainLinks = [
  { href: "/en", label: "Home" },
  { href: "/en/brokers", label: "Broker Reviews" },
  { href: "/en/compare", label: "Comparisons" },
  { href: "/en/best-brokers", label: "Best Brokers" },
];

const footerLegalLinks = [
  { href: "/en/about", label: "About Broker Alarab" },
  { href: "/en/contact", label: "Contact Us" },
  { href: "/en/privacy-policy", label: "Privacy Policy" },
  { href: "/en/terms-and-conditions", label: "Terms & Conditions" },
];

const socialLinks = [
  { href: "https://x.com/brokeralarab", label: "X", type: "x" },
  { href: "https://www.linkedin.com/company/broker-alarab", label: "LinkedIn", type: "linkedin" },
  { href: "https://www.facebook.com/BrokerAlArab", label: "Facebook", type: "facebook" },
  { href: "https://www.tiktok.com/@brokeralarab", label: "TikTok", type: "tiktok" },
];

function SocialIcon({ type }: { type: string }) {
  if (type === "x") {
    return <span className="text-[16px] font-black leading-none">𝕏</span>;
  }

  if (type === "linkedin") {
    return <span className="text-[14px] font-black leading-none">in</span>;
  }

  if (type === "facebook") {
    return <span className="text-[18px] font-black leading-none">f</span>;
  }

  return <span className="text-[17px] font-black leading-none">♪</span>;
}

function SocialLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? "mt-5 text-center" : "mt-5"}>
      <div
        className={
          mobile
            ? "mb-3 text-xs font-black text-slate-400"
            : "mb-3 text-sm font-black text-white"
        }
      >
        Follow Us
      </div>

      <div className={mobile ? "flex items-center justify-center gap-3" : "flex items-center gap-3"}>
        {socialLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={
              mobile
                ? "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-blue-400/30 hover:bg-brand-500 hover:text-white"
                : "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-blue-400/30 hover:bg-brand-500 hover:text-white"
            }
          >
            <SocialIcon type={item.type} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function EnglishFooter() {
  return (
    <footer
      dir="ltr"
      className="mt-10 border-t border-slate-800 bg-[linear-gradient(180deg,#07101f_0%,#06101d_100%)] text-slate-300 md:mt-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="grid gap-8 py-10 lg:grid-cols-[1.15fr_0.8fr_0.8fr]">
            <div>
              <Image
                src="/logo/Asset 5@5x.png"
                alt="Broker Alarab"
                width={420}
                height={120}
                className="h-auto w-[240px]"
              />

              <p className="mt-4 max-w-xl text-[15px] leading-8 text-slate-300">
                Broker Alarab is an Arabic-focused platform specializing in
                broker reviews and comparisons, helping traders choose the right
                broker and understand the differences between companies,
                accounts, and platforms before opening an account.
              </p>

              <SocialLinks />
            </div>

            <div>
              <div className="text-sm font-black tracking-wide text-white">
                Site Links
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
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-black tracking-wide text-white">
                Important Pages
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
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 py-4">
            <div className="text-left">
              <div className="mb-2 text-sm font-black text-white">
                Risk Warning
              </div>
              <p className="text-sm leading-8 text-slate-400">
                The information provided on this website is for educational and
                informational purposes only and does not constitute financial or
                investment advice. Broker Alarab does not offer direct trading
                services and does not hold client funds. Forex, CFDs, and
                cryptocurrency trading involve significant risk and may not be
                suitable for all investors. Your losses may exceed your initial
                deposit.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 py-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div>© {new Date().getFullYear()} Broker Alarab — All rights reserved</div>

              <div className="flex items-center gap-3">
                <Link href="/en/privacy-policy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                <Link href="/en/terms-and-conditions" className="transition hover:text-white">
                  Terms & Conditions
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
                  src="/logo/Asset 5@5x.png"
                  alt="Broker Alarab"
                  width={320}
                  height={100}
                  className="mx-auto h-auto w-[190px]"
                />

                <p className="mt-4 text-center text-[14px] leading-8 text-slate-300">
                  Broker Alarab is a specialized platform for broker reviews
                  and comparisons, helping traders understand key differences
                  between brokers before opening an account.
                </p>

                <SocialLinks mobile />
              </div>

              <div className="border-t border-white/10 px-4 py-4">
                <details className="group rounded-2xl border border-white/8 bg-white/[0.03]">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-3.5 text-sm font-black text-white marker:content-none">
                    <span>Site Links</span>
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
                    <span>Important Pages</span>
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
                    <span>Risk Warning</span>
                    <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="border-t border-white/8 px-4 py-3">
                    <p className="text-[13px] leading-7 text-slate-300">
                      The information on this website is for educational and
                      informational purposes only and does not constitute
                      financial or investment advice. Broker Alarab does not
                      provide direct trading services or hold client funds.
                      Forex, CFDs, and cryptocurrency trading involve high risk
                      and may not be suitable for all investors.
                    </p>
                  </div>
                </details>
              </div>

              <div className="border-t border-white/10 px-4 py-4 text-center">
                <div className="text-xs text-slate-500">
                  © {new Date().getFullYear()} Broker Alarab — All rights reserved
                </div>

                <div className="mt-2 flex items-center justify-center gap-3 text-[12px] text-slate-500">
                  <Link href="/en/privacy-policy" className="transition hover:text-white">
                    Privacy Policy
                  </Link>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <Link href="/en/terms-and-conditions" className="transition hover:text-white">
                    Terms & Conditions
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