"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  title_en?: string;
  description: string;
  description_en?: string;
  image: string;
  isFeatured?: boolean;
};

type MobileNavMenuProps = {
  topBrokers: BrokerMenuItem[];
  countryMenuItems: CountryMenuItem[];
  featuredCategories: MenuLink[];
  featuredComparisons: MenuLink[];
  learnTradingMenuItems: LearnTradingMenuItem[];
};

const brokerLogoMap: Record<string, string> = {
  activtrades: "/brokers/activtrade.png",
  activtrade: "/brokers/activtrade.png",
  alpari: "/brokers/alpari.png",
  avatrade: "/brokers/avatrade.png",
  equiti: "/brokers/equiti.png",
  exness: "/brokers/exness.png",
  fxpro: "/brokers/FxPro.png",
  "ic-markets": "/brokers/ic-markets.png",
  icmarkets: "/brokers/ic-markets.png",
  pepperstone: "/brokers/pepperstone.png",
  vantage: "/brokers/vantage.png",
  xm: "/brokers/xm.png",
  xs: "/brokers/xs.png",
  multibank: "/brokers/MultibankGroup.png",
};

const brokerNamesAr: Record<string, string> = {
  exness: "إكسنس",
  xm: "إكس إم",
  pepperstone: "بيبرستون",
  fxpro: "اف اكس برو",
  avatrade: "افاتريد",
  alpari: "الباري",
  xs: "اكس اس",
  equiti: "اكويتي",
  vantage: "فانتج",
};

function getBrokerLogo(slug: string): string {
  return brokerLogoMap[slug] || "/brokers/BrokerLogo.png";
}

function withLangHref(href: string, isEnglish: boolean) {
  if (!isEnglish) return href;
  if (href === "/") return "/en";
  if (href.startsWith("/en")) return href;
  return `/en${href}`;
}

function getComparisonLabel(label: string, isEnglish: boolean) {
  if (isEnglish) return label;

  const parts = label.split(" vs ");
  if (parts.length !== 2) return label;

  const leftSlug = parts[0].toLowerCase().replace(/\s+/g, "-");
  const rightSlug = parts[1].toLowerCase().replace(/\s+/g, "-");

  const leftName = brokerNamesAr[leftSlug] || parts[0];
  const rightName = brokerNamesAr[rightSlug] || parts[1];

  return `${leftName} ضد ${rightName}`;
}

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5.5 7.5L10 12l4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left"
      >
        <span className="text-[15px] font-extrabold text-slate-900">{title}</span>
        <span className="text-slate-500">
          <ChevronIcon open={open} />
        </span>
      </button>

      {open ? <div className="border-t border-slate-100 p-3">{children}</div> : null}
    </div>
  );
}

const mobileCardClass =
  "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-[13px] font-extrabold text-slate-800 transition hover:border-blue-300 hover:bg-white";

export default function MobileNavMenu({
  topBrokers,
  countryMenuItems,
  featuredCategories,
  featuredComparisons,
  learnTradingMenuItems,
}: MobileNavMenuProps) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  const mobileCountryMenuItems = [
    ...countryMenuItems,
    {
      label: "أفضل شركات التداول في العراق",
      shortLabel: "العراق",
      href: "/best-brokers/iraq",
      flag: "https://flagcdn.com/w80/iq.png",
    },
    {
      label: "أفضل شركات التداول في ليبيا",
      shortLabel: "ليبيا",
      href: "/best-brokers/libya",
      flag: "https://flagcdn.com/w80/ly.png",
    },
    {
      label: "أفضل شركات التداول في سوريا",
      shortLabel: "سوريا",
      href: "/best-brokers/syria",
      flag: "https://flagcdn.com/w80/sy.png",
    },
  ];

  const mobileTradingTools = [
    { label: isEnglish ? "Risk Calculator" : "حاسبة إدارة المخاطر", href: "/tools/risk-calculator" },
    { label: isEnglish ? "Lot Size Calculator" : "حاسبة حجم اللوت", href: "/tools/lot-size-calculator" },
    { label: isEnglish ? "Pip Calculator" : "حاسبة النقاط", href: "/tools/pip-calculator" },
    { label: isEnglish ? "Profit Calculator" : "حاسبة الأرباح والخسائر", href: "/tools/profit-calculator" },
    { label: isEnglish ? "Margin Calculator" : "حاسبة الهامش", href: "/tools/margin-calculator" },
    { label: isEnglish ? "Fibonacci Calculator" : "حاسبة فيبوناتشي", href: "/tools/fibonacci-calculator" },
    { label: isEnglish ? "Pivot Point Calculator" : "حاسبة نقاط الارتكاز", href: "/tools/pivot-point-calculator" },
    { label: isEnglish ? "Compound Calculator" : "حاسبة الفائدة المركبة", href: "/tools/compound-calculator" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    setIsOpen(false);
    setOpenSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const comparisonItems = useMemo(() => {
    return featuredComparisons.map((item) => {
      const rawLabel = item.label_en || item.label;
      const parts = rawLabel.split(" vs ");
      const leftSlug = parts[0]?.toLowerCase().replace(/\s+/g, "-") || "";
      const rightSlug = parts[1]?.toLowerCase().replace(/\s+/g, "-") || "";

      return {
        ...item,
        displayLabel: getComparisonLabel(rawLabel, isEnglish),
        leftLogo: getBrokerLogo(leftSlug),
        rightLogo: getBrokerLogo(rightSlug),
      };
    });
  }, [featuredComparisons, isEnglish]);

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSection(null);
  };

  const text = {
    open: isEnglish ? "Open menu" : "فتح القائمة",
    close: isEnglish ? "Close menu" : "إغلاق القائمة",
    home: isEnglish ? "Home" : "الرئيسية",
    reviews: isEnglish ? "Broker Reviews" : "تقييمات الوسطاء",
    reviewPrefix: isEnglish ? "" : "تقييم ",
    reviewSuffix: isEnglish ? " Review" : "",
    allReviews: isEnglish ? "View All Reviews" : "جميع التقييمات",
    comparisons: isEnglish ? "Comparisons" : "المقارنات",
    allComparisons: isEnglish ? "View All Comparisons" : "جميع المقارنات",
    best: isEnglish ? "Best Brokers" : "أفضل الوسطاء",
    countries: isEnglish ? "By Country" : "حسب الدولة",
    categories: isEnglish ? "By Category" : "حسب الفئة",
    tools: isEnglish ? "Tools" : "الأدوات",
    license: isEnglish ? "Verify Broker License" : "التحقق من تراخيص الوسطاء",
    licenseDesc: isEnglish
      ? "Search by broker name or license number."
      : "ابحث باسم الشركة أو رقم الترخيص.",
    allTools: isEnglish ? "View All Tools" : "عرض جميع الأدوات",
    learn: isEnglish ? "Learn Trading" : "تعلم التداول",
    about: isEnglish ? "About" : "عن الموقع",
  };
    return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? text.close : text.open}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm"
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-slate-950/20"
            onClick={closeMenu}
          />

          <div
            dir={isEnglish ? "ltr" : "rtl"}
            className={`fixed top-16 z-[100] w-[310px] transition-all duration-200 ease-out ${
              isEnglish ? "left-0 origin-top-left" : "right-0 origin-top-right"
            }`}
          >
            <div
              className={`overflow-hidden rounded-b-[28px] border-b border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] ${
                isEnglish ? "border-r" : "border-l"
              }`}
            >
              <div className="max-h-[calc(100vh-82px)] overflow-y-auto p-3">
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className={`rounded-2xl border px-4 py-3 text-center text-[13px] font-black transition ${
                      !isEnglish
                        ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    العربية
                  </Link>

                  <Link
                    href="/en"
                    onClick={closeMenu}
                    className={`rounded-2xl border px-4 py-3 text-center text-[13px] font-black transition ${
                      isEnglish
                        ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    English
                  </Link>
                </div>

                <Link
                  href={isEnglish ? "/en" : "/"}
                  onClick={closeMenu}
                  className="mb-3 block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-extrabold text-slate-900 transition hover:bg-white"
                >
                  {text.home}
                </Link>

                <div className="space-y-2.5">
                  <Section
                    title={text.reviews}
                    open={openSection === "reviews"}
                    onToggle={() => toggleSection("reviews")}
                  >
                    <div className="space-y-2">
                      {topBrokers.map((broker) => {
                        const brokerName = isEnglish
                          ? broker.name_en || broker.name
                          : broker.name;

                        return (
                          <Link
                            key={broker.slug}
                            href={withLangHref(`/brokers/${broker.slug}`, isEnglish)}
                            onClick={closeMenu}
                            className={`${mobileCardClass} flex items-center justify-between gap-3`}
                          >
                            <div className="min-w-0 flex-1">
                              {text.reviewPrefix}
                              {brokerName}
                              {text.reviewSuffix}
                            </div>

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                              <Image
                                src={broker.menuLogo || getBrokerLogo(broker.slug)}
                                alt={brokerName}
                                width={36}
                                height={36}
                                className="h-full w-full object-contain p-1"
                              />
                            </div>
                          </Link>
                        );
                      })}

                      <Link
                        href={withLangHref("/brokers", isEnglish)}
                        onClick={closeMenu}
                        className="block rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                      >
                        {text.allReviews}
                      </Link>
                    </div>
                  </Section>

                  <Section
                    title={text.comparisons}
                    open={openSection === "compare"}
                    onToggle={() => toggleSection("compare")}
                  >
                    <div className="space-y-2">
                      {comparisonItems.map((item) => (
                        <Link
                          key={item.href}
                          href={withLangHref(item.href, isEnglish)}
                          onClick={closeMenu}
                          className={`${mobileCardClass} flex items-center gap-2`}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                            <Image
                              src={item.leftLogo}
                              alt=""
                              width={34}
                              height={34}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>

                          <div className="min-w-0 flex-1 text-center text-[13px] font-extrabold text-slate-800">
                            {item.displayLabel}
                          </div>

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                            <Image
                              src={item.rightLogo}
                              alt=""
                              width={34}
                              height={34}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                        </Link>
                      ))}

                      <Link
                        href={withLangHref("/compare", isEnglish)}
                        onClick={closeMenu}
                        className="block rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                      >
                        {text.allComparisons}
                      </Link>
                    </div>
                  </Section>

                  <Section
                    title={text.best}
                    open={openSection === "best"}
                    onToggle={() => toggleSection("best")}
                  >
                    {isEnglish ? (
                      <div className="space-y-2">
                        <Link
                          href="/en/best-brokers"
                          onClick={closeMenu}
                          className={`${mobileCardClass} block`}
                        >
                          Best Forex Brokers in 2026
                        </Link>

                        <Link
                          href="/en/best-brokers/gold"
                          onClick={closeMenu}
                          className={`${mobileCardClass} block`}
                        >
                          Best Gold Brokers
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 px-1 text-[13px] font-black text-slate-900">
                            {text.countries}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {mobileCountryMenuItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className="flex h-[48px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-[13px] font-extrabold text-slate-800 transition hover:border-blue-300 hover:bg-white"
                              >
                                <img
                                  src={item.flag}
                                  alt={item.shortLabel}
                                  className="h-[20px] w-[20px] shrink-0 rounded-full object-cover"
                                />
                                <span className="flex-1 text-center">
                                  {item.shortLabel}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 px-1 text-[13px] font-black text-slate-900">
                            {text.categories}
                          </div>

                          <div className="grid gap-2">
                            {featuredCategories.map((item) => (
                              <Link
                                key={`${item.href}-${item.label}`}
                                href={item.href}
                                onClick={closeMenu}
                                className={`${mobileCardClass} block text-center`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </Section>

                  <Section
                    title={text.tools}
                    open={openSection === "tools"}
                    onToggle={() => toggleSection("tools")}
                  >
                    <div className="grid gap-3">
                      <Link
                        href={withLangHref("/licenses", isEnglish)}
                        onClick={closeMenu}
                        className="group rounded-[22px] border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-slate-50 p-4 transition hover:border-brand-200 hover:shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="text-[14px] font-black leading-5 text-slate-950 group-hover:text-brand-600">
                              {text.license}
                            </div>

                            <div className="mt-1 text-[11.5px] font-bold leading-5 text-slate-500">
                              {text.licenseDesc}
                            </div>
                          </div>

                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-base font-black text-brand-600 shadow-sm transition group-hover:bg-brand-500 group-hover:text-white">
                            {isEnglish ? "→" : "←"}
                          </span>
                        </div>
                      </Link>

                      <div className="h-px bg-slate-200" />

                      <div className="grid gap-2">
  {mobileTradingTools.slice(0, 5).map((tool) => (
    <Link
      key={tool.href}
      href={withLangHref(tool.href, isEnglish)}
      onClick={closeMenu}
      className="flex h-[46px] items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[13px] font-extrabold text-slate-800 transition hover:border-blue-300 hover:bg-white"
    >
      <span>{tool.label}</span>
      <span className="text-brand-600">{isEnglish ? "→" : "←"}</span>
    </Link>
  ))}
</div>

                      <Link
                        href={withLangHref("/tools", isEnglish)}
                        onClick={closeMenu}
                        className="block rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-extrabold text-brand-600 transition hover:bg-brand-50"
                      >
                        {text.allTools}
                      </Link>
                    </div>
                  </Section>

                  <Section
                    title={text.learn}
                    open={openSection === "learn"}
                    onToggle={() => toggleSection("learn")}
                  >
                    <div className="space-y-2">
                      {learnTradingMenuItems.slice(0, 1).map((item) => (
                        <Link
                          key={item.href}
                          href={withLangHref(item.href, isEnglish)}
                          onClick={closeMenu}
                          className={`${mobileCardClass} flex items-center gap-3`}
                        >
                          <div className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                            <Image
                              src={
                                item.image ||
                                "/articles/how-to-start-trading-from-zero.png"
                              }
                              alt={isEnglish ? item.title_en || item.title : item.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-2 text-[14px] font-black leading-6 text-slate-950">
                              {isEnglish ? item.title_en || item.title : item.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Section>

                  <Link
                    href={withLangHref("/about", isEnglish)}
                    onClick={closeMenu}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-extrabold text-slate-900 transition hover:bg-white"
                  >
                    {text.about}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}