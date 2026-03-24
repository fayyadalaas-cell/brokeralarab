"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

type LearnTradingMenuItem = {
  href: string;
  title: string;
  description: string;
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
        className="flex w-full items-center justify-between px-4 py-3 text-right"
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
      const parts = item.label.split(" vs ");
      const leftSlug = parts[0]?.toLowerCase().replace(/\s+/g, "-") || "";
      const rightSlug = parts[1]?.toLowerCase().replace(/\s+/g, "-") || "";

      return {
        ...item,
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

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
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
  className={`fixed left-0 top-16 z-[100] w-[280px] origin-top-left transition-all duration-200 ease-out ${
    isOpen
      ? "translate-y-0 opacity-100"
      : "-translate-y-2 opacity-0 pointer-events-none"
  }`}
>
  <div className="overflow-hidden border-r border-b border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)]">
              <div className="max-h-[calc(100vh-80px)] overflow-y-auto p-2">
               <div className="mb-2">
  <Link
    href="/"
    onClick={closeMenu}
    className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right text-[14px] font-extrabold text-slate-900 transition hover:bg-white"
  >
    الرئيسية
  </Link>
</div>
                <div className="space-y-3">
                  <Section
                    title="تقييمات الوسطاء"
                    open={openSection === "reviews"}
                    onToggle={() => toggleSection("reviews")}
                  >
                    <div className="space-y-2">
                      {topBrokers.map((broker) => (
                        <Link
                          key={broker.slug}
                          href={`/brokers/${broker.slug}`}
                          onClick={closeMenu}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
                            <Image
                              src={broker.menuLogo}
                              alt={broker.name}
                              width={36}
                              height={36}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>

                          <div className="min-w-0 flex-1 text-right text-[14px] font-bold text-slate-800">
                            تقييم {broker.name}
                          </div>
                        </Link>
                      ))}

                      <Link
                        href="/brokers"
                        onClick={closeMenu}
                        className="block rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-extrabold text-blue-700"
                      >
                        جميع التقييمات
                      </Link>
                    </div>
                  </Section>

                  <Section
                    title="المقارنات"
                    open={openSection === "compare"}
                    onToggle={() => toggleSection("compare")}
                  >
                    <div className="space-y-2">
                      {comparisonItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
                            <Image
                              src={item.rightLogo}
                              alt=""
                              width={34}
                              height={34}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>

                          <div className="min-w-0 flex-1 text-center text-[13px] font-extrabold text-slate-800">
                            {item.label}
                          </div>

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
                            <Image
                              src={item.leftLogo}
                              alt=""
                              width={34}
                              height={34}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                        </Link>
                      ))}

                      <Link
                        href="/compare"
                        onClick={closeMenu}
                        className="block rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm font-extrabold text-blue-700"
                      >
                        جميع المقارنات
                      </Link>
                    </div>
                  </Section>

                  <Section
                    title="أفضل الوسطاء"
                    open={openSection === "best"}
                    onToggle={() => toggleSection("best")}
                  >
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
                  </Section>

               <Section
  title="تعلم التداول"
  open={openSection === "learn"}
  onToggle={() => toggleSection("learn")}
>
  <div className="space-y-3">
    {learnTradingMenuItems.slice(0, 1).map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={closeMenu}
        className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:bg-white"
      >
        <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
          <Image
            src={item.image || "/articles/how-to-start-trading-from-zero.png"}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[15px] font-black leading-7 text-slate-950">
            {item.title}
          </h3>
        </div>
      </Link>
    ))}
  </div>
</Section>

                  <Link
  href="/about"
  onClick={closeMenu}
  className="mt-3 block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right text-[14px] font-extrabold text-slate-900 transition hover:bg-white"
>
  عن الموقع
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