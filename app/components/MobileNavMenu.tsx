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
  alpari: "/brokers/alpari.png",
  avatrade: "/brokers/avatrade.png",
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

function getBrokerLogo(slug: string): string {
  return brokerLogoMap[slug] || "/brokers/BrokerLogo.png";
}

function withLangHref(href: string, isEnglish: boolean) {
  if (!isEnglish) return href;
  if (href === "/") return "/en";
  if (href.startsWith("/en")) return href;
  return `/en${href}`;
}

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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
      aria-hidden="true"
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
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-[15px] font-extrabold text-slate-900">{title}</span>
        <span className="text-slate-500">
          <ChevronIcon open={open} />
        </span>
      </button>

      {open ? <div className="border-t border-slate-100 px-3 py-3">{children}</div> : null}
    </div>
  );
}

export default function MobileNavMenu({
  topBrokers,
  countryMenuItems,
  featuredCategories,
  featuredComparisons,
  learnTradingMenuItems,
}: MobileNavMenuProps) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

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
      const label = item.label_en || item.label;
      const parts = label.split(" vs ");
      const leftSlug = parts[0]?.toLowerCase().replace(/\s+/g, "-") || "";
      const rightSlug = parts[1]?.toLowerCase().replace(/\s+/g, "-") || "";

      return {
        ...item,
        displayLabel: label,
        leftLogo: getBrokerLogo(leftSlug),
        rightLogo: getBrokerLogo(rightSlug),
      };
    });
  }, [featuredComparisons]);

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
          <div className="fixed inset-0 z-[90] bg-slate-950/10" onClick={closeMenu} />

          <div
            dir={isEnglish ? "ltr" : "rtl"}
            className={`fixed top-16 z-[100] w-[280px] transition-all duration-200 ease-out ${
              isEnglish ? "left-0 origin-top-left" : "right-0 origin-top-right"
            } ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`overflow-hidden border-b border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)] ${
                isEnglish ? "border-r" : "border-l"
              }`}
            >
              <div className="max-h-[calc(100vh-80px)] overflow-y-auto p-2">
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className={`rounded-2xl border px-4 py-3 text-center text-[13px] font-black transition ${
                      !isEnglish
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
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
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    English
                  </Link>
                </div>

                <div className="mb-2">
                  <Link
                    href={isEnglish ? "/en" : "/"}
                    onClick={closeMenu}
                    className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-extrabold text-slate-900 transition hover:bg-white"
                  >
                    {text.home}
                  </Link>
                </div>

                <div className="space-y-3">
                  <Section
                    title={text.reviews}
                    open={openSection === "reviews"}
                    onToggle={() => toggleSection("reviews")}
                  >
                    <div className="space-y-2">
                      {topBrokers.map((broker) => {
                        const brokerName = isEnglish ? broker.name_en || broker.name : broker.name;

                        return (
                          <Link
                            key={broker.slug}
                            href={withLangHref(`/brokers/${broker.slug}`, isEnglish)}
                            onClick={closeMenu}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
                              <Image
                                src={broker.menuLogo}
                                alt={brokerName}
                                width={36}
                                height={36}
                                className="h-full w-full object-contain p-1"
                              />
                            </div>

                            <div className="min-w-0 flex-1 text-[14px] font-bold text-slate-800">
                              {text.reviewPrefix}
                              {brokerName}
                              {text.reviewSuffix}
                            </div>
                          </Link>
                        );
                      })}

                      <Link
                        href={withLangHref("/brokers", isEnglish)}
                        onClick={closeMenu}
                        className="block rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-extrabold text-blue-700"
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
                          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
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

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
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
                        className="block rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-extrabold text-blue-700"
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
        className="block rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-[14px] font-extrabold text-slate-900 transition hover:bg-white"
      >
        Best Forex Brokers in 2026
      </Link>

      <Link
        href="/en/best-brokers/gold"
        onClick={closeMenu}
        className="block rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-[14px] font-extrabold text-slate-900 transition hover:bg-white"
      >
        Best Gold Brokers
      </Link>
    </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 text-[13px] font-extrabold text-slate-900">
                            حسب الدولة
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {countryMenuItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                              >
                                <Image
                                  src={item.flag}
                                  alt={item.shortLabel}
                                  width={18}
                                  height={18}
                                  className="h-[18px] w-[18px] rounded-full object-cover"
                                />
                                <span className="truncate text-[13px] font-bold text-slate-800">
                                  {item.shortLabel}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 text-[13px] font-extrabold text-slate-900">
                            حسب الفئة
                          </div>

                          <div className="grid gap-2">
                            {featuredCategories.map((item) => (
                              <Link
                                key={`${item.href}-${item.label}`}
                                href={item.href}
                                onClick={closeMenu}
                                className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-[14px] font-bold text-slate-800"
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
                    title={text.learn}
                    open={openSection === "learn"}
                    onToggle={() => toggleSection("learn")}
                  >
                    <div className="space-y-3">
                      {learnTradingMenuItems.slice(0, 1).map((item) => (
                        <Link
                          key={item.href}
                          href={withLangHref(item.href, isEnglish)}
                          onClick={closeMenu}
                          className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:bg-white"
                        >
                          <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                            <Image
                              src={item.image || "/articles/how-to-start-trading-from-zero.png"}
                              alt={isEnglish
  ? item.href === "/learn-trading/how-to-start-trading-from-zero"
    ? "How to Start Trading from Zero"
    : item.title_en || item.title
  : item.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-2 text-[15px] font-black leading-7 text-slate-950">
                              {isEnglish
  ? item.href === "/learn-trading/how-to-start-trading-from-zero"
    ? "How to Start Trading from Zero"
    : item.title_en || item.title
  : item.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Section>

                  <Link
                    href={withLangHref("/about", isEnglish)}
                    onClick={closeMenu}
                    className="mt-3 block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-extrabold text-slate-900 transition hover:bg-white"
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