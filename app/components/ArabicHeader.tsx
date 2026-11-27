"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { usePathname } from "next/navigation";

import {
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  Scale,
  Trophy,
  Newspaper,
  ChartCandlestick,
  Calculator,
  GraduationCap,
  BookOpen,
  Globe2,
  CalendarDays,
  Clock,
  Percent,
  TrendingUp,
  Building2,
  Menu,
  X,
  Mail,
  FileText,
  type LucideIcon,
} from "lucide-react";

/* =========================================================
   BROKER ALARAB
   ARABIC HEADER — MEGA NAVIGATION V2
========================================================= */

type NavigationItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
};

type BrokerItem = {
  slug: string;
  name: string;
  logo?: string | null;
  rating?: number | string | null;
};

type CountryItem = {
  label: string;
  shortLabel: string;
  href: string;
  flag?: string;
};

type ComparisonItem = {
  label: string;
  href: string;
};

type LearningItem = {
  title: string;
  href: string;
};

type HeaderProps = {
  topBrokers?: BrokerItem[];
  countryMenuItems?: CountryItem[];
  featuredCategories?: any[];
  featuredComparisons?: ComparisonItem[];
  learnTradingMenuItems?: LearningItem[];
  wide?: boolean;
};

type MenuKey =
  | "reviews"
  | "comparisons"
  | "best-brokers"
  | "licenses"
  | "articles"
  | "markets"
  | "education";

/* =========================================================
   FUTURE SECTIONS
   ENABLE ONLY AFTER PAGES ARE PUBLISHED
========================================================= */

const NAVIGATION_FEATURES = {
  brokerNews: true,
  articleCategories: true,
};

/* =========================================================
   MAIN NAVIGATION
========================================================= */

const MAIN_NAVIGATION: {
  id: MenuKey;
  title: string;
  href: string;
  icon: LucideIcon;
  panelTitle: string;
  description: string;
}[] = [
  {
    id: "reviews",
    title: "تقييمات الوسطاء",
    href: "/brokers",
    icon: Building2,
    panelTitle: "تقييمات شركات التداول",
    description:
      "مراجعات مستقلة لشركات الفوركس ومنصات التداول العالمية",
  },
  {
    id: "comparisons",
    title: "المقارنات",
    href: "/compare",
    icon: Scale,
    panelTitle: "مقارنات شركات وحسابات التداول",
    description:
      "قارن الوسطاء والحسابات والرسوم وشروط التداول",
  },
  {
    id: "best-brokers",
    title: "أفضل الوسطاء",
    href: "/best-brokers",
    icon: Trophy,
    panelTitle: "أفضل شركات التداول",
    description:
      "استكشف أفضل شركات التداول حسب الدولة وفئة التداول",
  },
  {
    id: "licenses",
    title: "التراخيص",
    href: "/licenses",
    icon: ShieldCheck,
    panelTitle: "التراخيص والجهات الرقابية",
    description:
      "تعرف على الجهات الرقابية وتحقق من تراخيص الوسطاء",
  },
  {
    id: "articles",
    title: "المقالات والأخبار",
    href: "/articles",
    icon: Newspaper,
    panelTitle: "المقالات والأخبار",
    description:
      "مقالات اقتصادية وأدلة تداول وأخبار صناعة الفوركس",
  },
  {
    id: "markets",
    title: "الأسواق والتحليل",
    href: "/technical-analysis",
    icon: ChartCandlestick,
    panelTitle: "الأسواق المالية والتحليل الفني",
    description:
      "تابع التحليلات الفنية والبيانات الاقتصادية والأسواق العالمية",
  },
  {
    id: "education",
    title: "أدوات وتعليم التداول",
    href: "/tools",
    icon: Calculator,
    panelTitle: "أدوات وتعليم التداول",
    description:
      "حاسبات مالية وأدلة تعليمية لتطوير مهارات التداول",
  },
];

/* =========================================================
   ADDITIONAL COUNTRIES
========================================================= */

const EXTRA_COUNTRIES: CountryItem[] = [
  {
    label: "أفضل شركات التداول في الجزائر",
    shortLabel: "الجزائر",
    href: "/best-brokers/algeria",
  },
  {
    label: "أفضل شركات التداول في فلسطين",
    shortLabel: "فلسطين",
    href: "/best-brokers/palestine",
  },
  {
    label: "أفضل شركات التداول في لبنان",
    shortLabel: "لبنان",
    href: "/best-brokers/lebanon",
  },
  {
    label: "أفضل شركات التداول في العراق",
    shortLabel: "العراق",
    href: "/best-brokers/iraq",
  },
  {
    label: "أفضل شركات التداول في ليبيا",
    shortLabel: "ليبيا",
    href: "/best-brokers/libya",
  },
  {
    label: "أفضل شركات التداول في سوريا",
    shortLabel: "سوريا",
    href: "/best-brokers/syria",
  },
  {
    label: "أفضل شركات التداول في اليمن",
    shortLabel: "اليمن",
    href: "/best-brokers/yemen",
  },
];

/* =========================================================
   COUNTRY FLAGS — NO EXTERNAL IMAGE REQUESTS
========================================================= */

const COUNTRY_FLAGS: Record<string, string> = {
  "saudi-arabia": "🇸🇦",
  saudi: "🇸🇦",
  uae: "🇦🇪",
  "united-arab-emirates": "🇦🇪",
  kuwait: "🇰🇼",
  qatar: "🇶🇦",
  bahrain: "🇧🇭",
  oman: "🇴🇲",
  egypt: "🇪🇬",
  jordan: "🇯🇴",
  algeria: "🇩🇿",
  palestine: "🇵🇸",
  lebanon: "🇱🇧",
  iraq: "🇮🇶",
  libya: "🇱🇾",
  syria: "🇸🇾",
  yemen: "🇾🇪",
};

/* =========================================================
   BEST BROKER CATEGORIES
========================================================= */

const MARKET_CATEGORIES: NavigationItem[] = [
  {
    label: "أفضل وسطاء الفوركس",
    href: "/best-brokers",
  },
  {
    label: "أفضل وسطاء الأسهم",
    href: "/best-brokers/stocks",
  },
  {
    label: "أفضل وسطاء السلع",
    href: "/best-brokers/commodities",
  },
  {
    label: "أفضل وسطاء المؤشرات",
    href: "/best-brokers/indices",
  },
  {
    label: "أفضل وسطاء الذهب",
    href: "/best-brokers/gold",
  },
  {
  label: "أفضل وسطاء للمبتدئين",
  href: "/best-brokers/beginners",
},
  {
    label: "شركات التداول الأقل سبريد",
    href: "/lowest-spread-brokers",
  },
  {
    label: "شركات التداول بأقل إيداع",
    href: "/best-brokers/low-minimum-deposit",
  },
];

/* =========================================================
   ACCOUNT TYPES
========================================================= */

const ACCOUNT_TYPES: NavigationItem[] = [
  {
    label: "أفضل وسطاء حساب سنت",
    href: "/best-brokers/accounts/cent",
    description: "حسابات التداول بأحجام صغيرة",
  },
  {
    label: "أفضل وسطاء حساب ستاندرد",
    href: "/best-brokers/accounts/standard",
    description: "حسابات التداول Standard",
  },
  {
    label: "أفضل وسطاء حساب Raw Spread",
    href: "/best-brokers/accounts/raw-spread",
    description: "حسابات بفروقات سعرية منخفضة",
  },
];

/* =========================================================
   REGULATORY AUTHORITIES
========================================================= */

/* =========================================================
   REGULATORY AUTHORITIES
========================================================= */

const REGULATORS = [
  {
    code: "FCA",
    country: "بريطانيا",
    href: "/licenses/fca",
  },
  {
    code: "CySEC",
    country: "قبرص",
    href: "/licenses/cysec",
  },
  {
    code: "ASIC",
    country: "أستراليا",
    href: "/licenses/asic",
  },
  {
    code: "DFSA",
    country: "دبي",
    href: "/licenses/dfsa",
  },
  {
    code: "SCA",
    country: "الإمارات",
    href: "/licenses/sca",
  },
  {
    code: "ADGM FSRA",
    country: "أبوظبي",
    href: "/licenses/adgm-fsra",
  },
  {
    code: "JSC",
    country: "الأردن",
    href: "/licenses/jsc",
  },
  {
    code: "FSCA",
    country: "جنوب أفريقيا",
    href: "/licenses/fsca",
  },
  {
    code: "BaFin",
    country: "ألمانيا",
    href: "/licenses/bafin",
  },
  {
    code: "NFA",
    country: "الولايات المتحدة",
    href: "/licenses/nfa",
  },
  {
    code: "CIRO",
    country: "كندا",
    href: "/licenses/ciro",
  },
  {
    code: "FSA",
    country: "سيشل",
    href: "/licenses/fsa",
  },
  {
    code: "SCB",
    country: "جزر الباهاما",
    href: "/licenses/scb",
  },
  {
    code: "FSC BVI",
    country: "جزر العذراء البريطانية",
    href: "/licenses/fsc-bvi",
  },
  {
    code: "CIMA",
    country: "جزر كايمان",
    href: "/licenses/cima",
  },
  {
    code: "FSC Mauritius",
    country: "موريشيوس",
    href: "/licenses/fsc-mauritius",
  },
];

/* =========================================================
   TRADING TOOLS
========================================================= */

const TRADING_TOOLS: NavigationItem[] = [
  {
    label: "حاسبة إدارة المخاطر",
    href: "/tools/risk-calculator",
  },
  {
    label: "حاسبة حجم اللوت",
    href: "/tools/lot-size-calculator",
  },
  {
    label: "حاسبة النقاط",
    href: "/tools/pip-calculator",
  },
  {
    label: "حاسبة الأرباح والخسائر",
    href: "/tools/profit-calculator",
  },
  {
    label: "حاسبة الهامش",
    href: "/tools/margin-calculator",
  },
  {
    label: "حاسبة فيبوناتشي",
    href: "/tools/fibonacci-calculator",
  },
  {
    label: "حاسبة نقاط الارتكاز",
    href: "/tools/pivot-point-calculator",
  },
  {
    label: "حاسبة الفائدة المركبة",
    href: "/tools/compound-calculator",
  },
];

/* =========================================================
   MARKET DATA & ANALYSIS
========================================================= */

const MARKET_LINKS: NavigationItem[] = [
  {
    label: "أسعار الفائدة العالمية",
    href: "/interest-rates",
    description:
      "قرارات واجتماعات البنوك المركزية",
    icon: Percent,
  },
  {
    label: "ساعات الأسواق العالمية",
    href: "/tools/market-hours",
    description:
      "مواعيد افتتاح وإغلاق الأسواق",
    icon: Clock,
  },
  {
    label: "المؤشرات الاقتصادية",
    href: "/learn-trading/economic-indicators",
    description:
      "فهم البيانات الاقتصادية وتأثيرها على الأسواق",
    icon: TrendingUp,
  },
];

/* =========================================================
   BROKER NAMES — COMPARISONS
========================================================= */

const BROKER_NAMES_AR: Record<string, string> = {
  exness: "Exness",
  xm: "XM",
  pepperstone: "Pepperstone",
  fxpro: "FxPro",
  avatrade: "AvaTrade",
  alpari: "Alpari",
  xs: "XS",
  equiti: "Equiti",
  vantage: "Vantage",
};

/* =========================================================
   PANEL WIDTHS
========================================================= */

const PANEL_WIDTHS: Record<MenuKey, string> = {
  reviews: "w-[780px]",
  comparisons: "w-[850px]",
  "best-brokers": "w-[880px]",
  licenses: "w-[880px]",
  articles: "w-[780px]",
  markets: "w-[740px]",
  education: "w-[920px]",
};

/* =========================================================
   SHARED MENU COMPONENTS
========================================================= */

function SectionHeading({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">

      {Icon && (
        <Icon
          size={17}
          strokeWidth={2}
          className="shrink-0 text-[#194b92]"
          aria-hidden="true"
        />
      )}

      <h4 className="text-[13px] font-black text-[#10233f]">
        {title}
      </h4>

    </div>
  );
}

/* =========================================================
   STANDARD MENU LINK
========================================================= */

function MenuLink({
  item,
  onClose,
}: {
  item: NavigationItem;
  onClose?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      prefetch={false}
      onClick={onClose}
      className="group/item flex min-h-[44px] min-w-0 items-center gap-3 rounded-[11px] border border-transparent px-3 py-2.5 transition-colors duration-150 hover:border-[#d5e3f5] hover:bg-[#edf3fc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
    >

      {Icon && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#edf3fc] text-[#194b92] transition-colors group-hover/item:bg-[#194b92] group-hover/item:text-white">

          <Icon
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />

        </span>
      )}

      <div className="min-w-0 flex-1">

        <span className="block text-[13px] font-bold leading-6 text-[#10233f] group-hover/item:text-[#194b92]">
          {item.label}
        </span>

        {item.description && (
          <span className="mt-0.5 block text-[11px] font-medium leading-5 text-slate-500">
            {item.description}
          </span>
        )}

      </div>

      <ArrowLeft
        size={14}
        strokeWidth={2}
        className="shrink-0 text-slate-400 transition-transform group-hover/item:-translate-x-0.5 group-hover/item:text-[#194b92]"
        aria-hidden="true"
      />

    </Link>
  );
}

/* =========================================================
   MENU FOOTER LINK
========================================================= */

function FooterLink({
  href,
  label,
  onClose,
  primary = false,
}: {
  href: string;
  label: string;
  onClose?: () => void;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={onClose}
      className={`flex min-h-[44px] items-center justify-center gap-2 rounded-[11px] border px-3 py-2.5 text-center text-[12px] font-black transition-colors ${
        primary
          ? "border-[#194b92] bg-[#194b92] text-white hover:bg-[#123c79]"
          : "border-[#d5e3f5] bg-[#edf3fc] text-[#194b92] hover:bg-[#e1ebfa]"
      }`}
    >

      {label}

      <ArrowLeft
        size={15}
        strokeWidth={2}
        aria-hidden="true"
      />

    </Link>
  );
}

/* =========================================================
   FEATURED MENU CARD
========================================================= */

function FeaturedLink({
  item,
  onClose,
}: {
  item: NavigationItem;
  onClose?: () => void;
}) {
  const Icon = item.icon ?? FileText;

  return (
    <Link
      href={item.href}
      prefetch={false}
      onClick={onClose}
      className="group/featured flex min-h-[76px] min-w-0 items-center gap-3 rounded-[14px] border border-[#d5e3f5] bg-gradient-to-l from-[#edf3fc] to-white p-3.5 transition-colors hover:border-[#94b5e3] hover:bg-[#edf3fc]"
    >

      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#194b92] text-white">

        <Icon
          size={22}
          strokeWidth={1.8}
          aria-hidden="true"
        />

      </span>

      <div className="min-w-0 flex-1">

        <span className="block text-[13px] font-black leading-6 text-[#10233f] group-hover/featured:text-[#194b92]">
          {item.label}
        </span>

        {item.description && (
          <span className="mt-0.5 block text-[11px] leading-5 text-slate-500">
            {item.description}
          </span>
        )}

      </div>

      <ArrowLeft
        size={17}
        strokeWidth={2}
        className="shrink-0 text-[#194b92]"
        aria-hidden="true"
      />

    </Link>
  );
}

/* =========================================================
   FUTURE SECTION — NOT A BROKEN LINK
========================================================= */

function UpcomingLink({
  label,
  description,
  icon: Icon,
}: {
  label: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex min-h-[66px] items-center gap-3 rounded-[12px] border border-dashed border-slate-200 bg-slate-50 p-3">

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-200/70 text-slate-500">
        <Icon
          size={17}
          aria-hidden="true"
        />
      </span>

      <div className="min-w-0 flex-1">

        <span className="block text-[13px] font-bold text-slate-600">
          {label}
        </span>

        <span className="mt-1 block text-[10px] leading-5 text-slate-500">
          {description}
        </span>

      </div>

      <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500">
        قريبًا
      </span>

    </div>
  );
}

/* =========================================================
   RANDOM HEADER COMPARISONS
   SIX COMPARISONS — NO REPEATED BROKERS WHEN POSSIBLE
========================================================= */

function selectHeaderComparisons(
  comparisons: ComparisonItem[],
  count: number = 6,
  randomize: boolean = true
): ComparisonItem[] {

  const uniqueComparisons = Array.from(
    new Map(
      comparisons
        .filter(
          (item) =>
            item.href && item.label
        )
        .map((item) => [
          item.href,
          item,
        ] as const)
    ).values()
  );

  const available = [...uniqueComparisons];

  /* RANDOM SHUFFLE */

  if (randomize) {

    for (
      let i = available.length - 1;
      i > 0;
      i--
    ) {

      const j = Math.floor(
        Math.random() * (i + 1)
      );

      [available[i], available[j]] = [
        available[j],
        available[i],
      ];

    }

  }

  const selected: ComparisonItem[] = [];

  const usedBrokers = new Set<string>();

  const usedComparisons = new Set<string>();

  /* FIRST PASS — UNIQUE BROKERS */

  for (const comparison of available) {

    const parts = comparison.label
      .split(/\s+vs\s+/i)
      .map(
        (name) =>
          name.trim().toLowerCase()
      );

    if (parts.length !== 2) {
      continue;
    }

    const [broker1, broker2] = parts;

    if (
      broker1 === broker2 ||
      usedBrokers.has(broker1) ||
      usedBrokers.has(broker2)
    ) {
      continue;
    }

    selected.push(comparison);

    usedBrokers.add(broker1);
    usedBrokers.add(broker2);

    usedComparisons.add(
      comparison.href
    );

    if (selected.length >= count) {

      return selected;

    }

  }

  /* SECOND PASS — FILL REMAINING POSITIONS */

  for (const comparison of available) {

    if (
      usedComparisons.has(
        comparison.href
      )
    ) {
      continue;
    }

    selected.push(comparison);

    usedComparisons.add(
      comparison.href
    );

    if (selected.length >= count) {
      break;
    }

  }

  return selected;

}

/* ================= END RANDOM COMPARISONS ================= */

/* =========================================================
   MAIN HEADER
========================================================= */

export default function ArabicHeader({
  topBrokers = [],
  countryMenuItems = [],
  featuredComparisons = [],
  learnTradingMenuItems = [],
  wide = false,
}: HeaderProps) {

  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);

  const desktopNavRef = useRef<HTMLElement>(null);

  const mobileButtonRef =
    useRef<HTMLButtonElement>(null);

  const desktopButtonsRef = useRef<
    Partial<Record<MenuKey, HTMLButtonElement | null>>
  >({});

  const [activeMenu, setActiveMenu] =
    useState<MenuKey | null>(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [mobileSection, setMobileSection] =
    useState<MenuKey | null>(null);

    /* =====================================================
   RANDOM BROKER COMPARISONS — 6 PER PAGE LOAD
====================================================== */

const [visibleComparisons, setVisibleComparisons] =
  useState<ComparisonItem[]>(() =>
    selectHeaderComparisons(
      featuredComparisons,
      6,
      false
    )
  );

useEffect(() => {

  setVisibleComparisons(
    selectHeaderComparisons(
      featuredComparisons,
      6,
      true
    )
  );

}, [featuredComparisons]);

  /* =====================================================
     UNIQUE BROKERS — MAXIMUM 15
  ====================================================== */

  const visibleBrokers = Array.from(
    new Map(
      topBrokers
        .filter(
          (broker) =>
            broker.slug && broker.name
        )
        .map(
          (broker) =>
            [broker.slug, broker] as const
        )
    ).values()
  ).slice(0, 15);

  /* =====================================================
     UNIQUE COUNTRIES
  ====================================================== */

  const countries = Array.from(
    new Map(
      [
        ...countryMenuItems,
        ...EXTRA_COUNTRIES,
      ].map(
        (item) =>
          [item.href, item] as const
      )
    ).values()
  );

  /* =====================================================
     CLOSE MENUS
  ====================================================== */

  function closeMenus() {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  /* =====================================================
     CLOSE AFTER NAVIGATION
  ====================================================== */

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  /* =====================================================
     OUTSIDE CLICK AND ESCAPE KEY
  ====================================================== */

  useEffect(() => {

    function handleOutsideClick(
      event: PointerEvent
    ) {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node
        )
      ) {
        setActiveMenu(null);
        setMobileOpen(false);
        setMobileSection(null);
      }
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key !== "Escape") return;

      if (mobileOpen) {
        setMobileOpen(false);
        setMobileSection(null);
        mobileButtonRef.current?.focus();
      } else if (activeMenu) {
        const previousMenu = activeMenu;

        setActiveMenu(null);

        desktopButtonsRef.current[
          previousMenu
        ]?.focus();
      }
    }

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [activeMenu, mobileOpen]);

  /* =====================================================
     RESET MENUS WHEN CHANGING SCREEN SIZE
  ====================================================== */

  useEffect(() => {

    const mediaQuery = window.matchMedia(
      "(min-width: 1536px)"
    );

    function handleScreenChange() {

      setActiveMenu(null);
      setMobileOpen(false);
      setMobileSection(null);

    }

    mediaQuery.addEventListener(
      "change",
      handleScreenChange
    );

    return () => {

      mediaQuery.removeEventListener(
        "change",
        handleScreenChange
      );

    };

  }, []);

  /* =====================================================
     MENU CONTENT
     SHARED BY DESKTOP AND MOBILE
  ====================================================== */

  function renderMenuContent(
    menu: MenuKey
  ): ReactNode {

    switch (menu) {

      /* =================================================
         01 — BROKER REVIEWS
      ================================================== */

      case "reviews":

        return (
          <div className="space-y-3">

            

            {visibleBrokers.length > 0 ? (

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

  {visibleBrokers.map((broker, index) => (

    <Link
      key={broker.slug}
      href={`/brokers/${broker.slug}`}
      prefetch={false}
      onClick={closeMenus}
      className={`group/broker min-h-[48px] min-w-0 items-center justify-between gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-2.5 transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc] ${
        index >= 10
          ? "hidden sm:flex"
          : "flex"
      }`}
    >

      <span className="min-w-0 text-[13px] font-extrabold leading-5 text-[#10233f] group-hover/broker:text-[#194b92]">

        تقييم{" "}

        <bdi>
          {broker.name}
        </bdi>

      </span>

      <ArrowLeft
        size={13}
        className="shrink-0 text-slate-400 group-hover/broker:text-[#194b92]"
        aria-hidden="true"
      />

    </Link>

  ))}

</div>

            ) : (

              <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                تصفح دليل شركات التداول للاطلاع على جميع التقييمات.
              </p>

            )}

            <div className="grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2">

              <FooterLink
                href="/brokers"
                label="عرض جميع تقييمات الوسطاء"
                onClose={closeMenus}
                primary
              />

              <FooterLink
                href="/how-we-review-brokers"
                label="كيف نقيم شركات التداول؟"
                onClose={closeMenus}
              />

            </div>

          </div>
        );

      /* =================================================
         02 — BROKER & ACCOUNT COMPARISONS
      ================================================== */

      case "comparisons":

        return (
          <div className="grid gap-5 sm:grid-cols-2">

            {/* BROKER COMPARISONS */}

            <div className="flex min-w-0 flex-col">

              <SectionHeading
                title="مقارنة شركات التداول"
                icon={Scale}
              />

              <div className="space-y-2">

                {visibleComparisons.map((item) => {

                    const parts =
                      item.label.split(
                        /\s+vs\s+/i
                      );

                    const firstName =
                      BROKER_NAMES_AR[
                        parts[0]
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")
                      ] || parts[0];

                    const secondName =
                      BROKER_NAMES_AR[
                        parts[1]
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")
                      ] || parts[1];

                    if (!secondName) {

                      return (
                        <MenuLink
                          key={item.href}
                          item={item}
                          onClose={closeMenus}
                        />
                      );

                    }

                    return (

                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={false}
                        onClick={closeMenus}
                        className="group/comparison grid min-h-[44px] grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] items-center gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-2 transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
                      >

                        <bdi className="text-center text-[12px] font-extrabold text-[#10233f] group-hover/comparison:text-[#194b92]">
                          {firstName}
                        </bdi>

                        <span className="flex h-7 w-8 items-center justify-center rounded-full bg-[#e5edf9] text-[10px] font-black text-[#194b92]">
                          VS
                        </span>

                        <bdi className="text-center text-[12px] font-extrabold text-[#10233f] group-hover/comparison:text-[#194b92]">
                          {secondName}
                        </bdi>

                      </Link>

                    );

                  })}

              </div>

              <div className="mt-auto pt-4">

                <FooterLink
                  href="/compare"
                  label="جميع مقارنات شركات التداول"
                  onClose={closeMenus}
                  primary
                />

              </div>

            </div>

            {/* ACCOUNT COMPARISONS */}

            <div className="flex min-w-0 flex-col border-slate-200 sm:border-r sm:pr-5">

              <SectionHeading
                title="مقارنة حسابات التداول"
                icon={Scale}
              />

              <FeaturedLink
                item={{
                  label:
                    "قارن بين أي حسابين للتداول",
                  href: "/compare-accounts",
                  description:
                    "قارن السبريد والعمولات والإيداع والمنصات",
                  icon: Scale,
                }}
                onClose={closeMenus}
              />

              <div className="mt-3 space-y-2">

                {ACCOUNT_TYPES.map(
                  (item) => (

                    <MenuLink
                      key={item.href}
                      item={item}
                      onClose={closeMenus}
                    />

                  )
                )}

              </div>

              <div className="mt-auto pt-4">

                <FooterLink
                  href="/compare-accounts"
                  label="جميع مقارنات حسابات التداول"
                  onClose={closeMenus}
                />

              </div>

            </div>

          </div>
        );

      /* =================================================
         03 — BEST BROKERS
      ================================================== */

      case "best-brokers":

  return (

    <div className="space-y-4">

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">

        {/* =============================================
            BEST BROKERS BY COUNTRY
        ============================================== */}

        <div className="min-w-0">

          <SectionHeading
            title="أفضل الوسطاء حسب الدولة"
            icon={Globe2}
          />

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

            {countries.map((item) => {

              const countrySlug =
                item.href
                  .split("/")
                  .filter(Boolean)
                  .pop() ?? "";

              const flagMap: Record<string, string> = {
                "saudi-arabia": "/flags/sa.svg",
                uae: "/flags/ae.svg",
                egypt: "/flags/eg.svg",
                jordan: "/flags/jo.svg",
                kuwait: "/flags/kw.svg",
                qatar: "/flags/qa.svg",
                bahrain: "/flags/bh.svg",
                oman: "/flags/om.svg",
                algeria: "https://flagcdn.com/w80/dz.png",
                palestine: "https://flagcdn.com/w80/ps.png",
                lebanon: "https://flagcdn.com/w80/lb.png",
                iraq: "https://flagcdn.com/w80/iq.png",
                libya: "https://flagcdn.com/w80/ly.png",
                syria: "https://flagcdn.com/w80/sy.png",
                yemen: "https://flagcdn.com/w80/ye.png",
              };

              const flag =
                item.flag || flagMap[countrySlug];

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  title={item.label}
                  onClick={closeMenus}
                  className="group/country flex min-h-[48px] min-w-0 items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-2 py-2 transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc] last:odd:col-span-2 sm:last:odd:col-span-1"
                >

                  {flag && (

                    <img
                      src={flag}
                      alt=""
                      loading="lazy"
                      width={24}
                      height={24}
                      className="h-6 w-6 shrink-0 rounded-full border border-white object-cover shadow-sm"
                    />

                  )}

                  <span className="text-[12px] font-bold text-[#10233f] transition-colors group-hover/country:text-[#194b92]">

                    {item.shortLabel}

                  </span>

                </Link>

              );

            })}

          </div>

        </div>

        {/* =============================================
            BEST BROKERS BY CATEGORY
        ============================================== */}

        <div className="min-w-0 border-slate-200 sm:border-r sm:pr-5">

          <SectionHeading
            title="أفضل الوسطاء حسب الفئة"
            icon={Trophy}
          />

          <div className="grid grid-cols-2 gap-2">

            {MARKET_CATEGORIES.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={closeMenus}
                className="group/category flex min-h-[62px] min-w-0 items-center justify-between gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-2.5 transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
              >

                <span className="min-w-0 flex-1 text-[12px] font-bold leading-6 text-[#10233f] transition-colors group-hover/category:text-[#194b92]">

                  {item.label}

                </span>

                <ArrowLeft
                  size={13}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="shrink-0 text-slate-400 transition-transform group-hover/category:-translate-x-0.5 group-hover/category:text-[#194b92]"
                />

              </Link>

            ))}

          </div>

        </div>

      </div>

      {/* =============================================
          PANEL FOOTER
      ============================================== */}

      <div className="border-t border-slate-200 pt-4">

        <FooterLink
          href="/best-brokers"
          label="استكشف جميع تصنيفات أفضل الوسطاء"
          onClose={closeMenus}
          primary
        />

      </div>

    </div>

  );

      /* =================================================
         04 — REGULATION
      ================================================== */

      case "licenses":

  return (

    <div className="space-y-4">

      {/* =============================================
          REGULATORY AUTHORITIES
      ============================================== */}

      <div>

        <SectionHeading
          title="الجهات الرقابية العالمية والعربية"
          icon={ShieldCheck}
        />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

          {REGULATORS.map((regulator, index) => (

            <Link
              key={regulator.code}
              href={regulator.href}
              prefetch={false}
              onClick={closeMenus}
              className={`group/license relative min-h-[52px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-2 py-1.5 text-center transition-colors duration-200 hover:border-[#c5d9f2] hover:bg-[#edf3fc] ${
  index >= 10
    ? "hidden sm:flex"
    : "flex"
}`}
            >

              {/* REGULATOR CODE */}

              <span
                dir="ltr"
                className="text-[14px] font-black leading-5 text-[#194b92] transition-colors group-hover/license:text-brand-600"
              >

                {regulator.code}

              </span>

              {/* REGULATOR COUNTRY */}

              <span className="text-[11px] font-semibold leading-5 text-slate-500">

                {regulator.country}

              </span>

              

            </Link>

          ))}

        </div>

      </div>

      {/* =============================================
          LICENSE VERIFICATION
      ============================================== */}

      <div className="border-t border-slate-200 pt-3">

        <FeaturedLink
          item={{
            label: "تحقق من ترخيص شركة التداول",
            description:
              "ابحث باسم الشركة أو رقم الترخيص وتعرف على الجهة الرقابية",
            href: "/licenses#license-search",
            icon: ShieldCheck,
          }}
          onClose={closeMenus}
        />

      </div>

      {/* =============================================
          ALL REGULATORY AUTHORITIES
      ============================================== */}

      <FooterLink
        href="/licenses"
        label="عرض جميع التراخيص والجهات الرقابية"
        onClose={closeMenus}
        primary
      />

    </div>

  );

      /* =================================================
         05 — ARTICLES & BROKER NEWS
      ================================================== */

      case "articles":

  return (

    <div className="space-y-4">

      <div className="grid gap-5 sm:grid-cols-2 sm:max-2xl:[&>div>div:last-child]:grid sm:max-2xl:[&>div>div:last-child]:grid-rows-2 sm:max-2xl:[&>div>div:last-child>*]:min-h-[72px]">

        {/* ARTICLES & GUIDES */}

        <div className="min-w-0">

          <SectionHeading
            title="المقالات والأدلة"
            icon={BookOpen}
          />

          <div className="space-y-2 sm:max-2xl:space-y-0 sm:max-2xl:gap-2 [&_span.text-slate-500]:truncate">

            <MenuLink
  item={{
    label: "مقالات الأسواق والاقتصاد",
    description: "تقارير ودراسات مالية",
    href:
      NAVIGATION_FEATURES.articleCategories
        ? "/articles/category/financial-markets-economy"
        : "/articles",
    icon: TrendingUp,
  }}
  onClose={closeMenus}
/>

<MenuLink
  item={{
    label: "أدلة التداول حسب الدولة",
    description: "الحسابات والإيداع والتراخيص",
    href:
      NAVIGATION_FEATURES.articleCategories
        ? "/articles/category/forex-trading-guides-by-country"
        : "/articles",
    icon: Globe2,
  }}
  onClose={closeMenus}
/>

          </div>

        </div>

        {/* INDUSTRY NEWS & EVENTS */}

        <div className="min-w-0 border-slate-200 sm:border-r sm:pr-5">

          <SectionHeading
            title="أخبار صناعة التداول"
            icon={Newspaper}
          />

          <div className="space-y-2 sm:max-2xl:space-y-0 sm:max-2xl:gap-2 [&_span.text-slate-500]:truncate">

            {NAVIGATION_FEATURES.brokerNews ? (

              <MenuLink
                item={{
                  label: "أخبار شركات الفوركس",
                  description: "أحدث أخبار وتحديثات الوسطاء",
                  href: "/forex-broker-news",
                  icon: Newspaper,
                }}
                onClose={closeMenus}
              />

            ) : (

              <UpcomingLink
                label="أخبار شركات الفوركس"
                description="أحدث أخبار وتحديثات الوسطاء"
                icon={Newspaper}
              />

            )}

            <MenuLink
              item={{
                label: "المعارض والمؤتمرات المالية",
                description: "أبرز الفعاليات المالية العالمية",
                href: "/events",
                icon: CalendarDays,
              }}
              onClose={closeMenus}
            />

          </div>

        </div>

      </div>

      <div className="border-t border-slate-200 pt-4">

        <FooterLink
          href="/articles"
          label="عرض جميع المقالات والتقارير"
          onClose={closeMenus}
          primary
        />

      </div>

    </div>

  );

            /* =================================================
         06 — MARKETS & ANALYSIS
      ================================================== */

      case "markets":

        return (

          <div className="space-y-3">

            {/* =========================================
                TECHNICAL ANALYSIS
            ========================================== */}

            <FeaturedLink
              item={{
                label: "التحليل الفني للأسواق المالية",
                description:
                  "تحليل الذهب والفضة والعملات والمؤشرات الفنية",
                href: "/technical-analysis",
                icon: ChartCandlestick,
              }}
              onClose={closeMenus}
            />

            {/* =========================================
                GLOBAL MARKET DATA
            ========================================== */}

            <div>

              <SectionHeading
                title="البيانات والأسواق العالمية"
                icon={TrendingUp}
              />

              <div className="grid gap-2 sm:grid-cols-2">

                {MARKET_LINKS.filter(
                  (item) =>
                    item.href !==
                    "/learn-trading/economic-indicators"
                ).map((item) => {

                  const Icon = item.icon ?? TrendingUp;

                  return (

                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={false}
                      onClick={closeMenus}
                      className="group/market flex min-h-[76px] min-w-0 items-center gap-3 rounded-[12px] border border-slate-200 bg-[#f8fafc] px-3 py-3 transition-colors duration-200 hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
                    >

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e7eef9] text-[#194b92] transition-colors group-hover/market:bg-[#194b92] group-hover/market:text-white">

                        <Icon
                          size={19}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />

                      </span>

                      <div className="min-w-0 flex-1">

                        <span className="block text-[13px] font-extrabold leading-6 text-[#10233f]">

                          {item.label}

                        </span>

                        {item.description && (

                          <span className="mt-0.5 block text-[11px] font-medium leading-5 text-slate-500">

                            {item.description}

                          </span>

                        )}

                      </div>

                      <ArrowLeft
                        size={14}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="shrink-0 text-slate-400 transition-transform group-hover/market:-translate-x-0.5 group-hover/market:text-[#194b92]"
                      />

                    </Link>

                  );

                })}

              </div>

            </div>

          </div>

        );

      /* =================================================
         07 — TRADING TOOLS & EDUCATION
      ================================================== */

      case "education":

        return (

          <div className="grid min-w-0 gap-5 sm:grid-cols-[1.15fr_1fr]">

            {/* =========================================
                TRADING TOOLS & CALCULATORS
            ========================================== */}

            <div className="flex min-w-0 flex-col">

              <SectionHeading
                title="أدوات وحاسبات التداول"
                icon={Calculator}
              />

              <div className="grid flex-1 grid-cols-2 gap-2">

                {TRADING_TOOLS.map((item) => (

                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={closeMenus}
                    className="group/tool flex min-h-[58px] min-w-0 items-center justify-between gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-2.5 transition-colors duration-200 hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
                  >

                    <span className="min-w-0 flex-1 text-[12px] font-bold leading-5 text-[#10233f] transition-colors group-hover/tool:text-[#194b92]">

                      {item.label}

                    </span>

                    <ArrowLeft
                      size={13}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="shrink-0 text-slate-400 transition-transform group-hover/tool:-translate-x-0.5 group-hover/tool:text-[#194b92]"
                    />

                  </Link>

                ))}

              </div>

              {/* ALL TRADING TOOLS */}

              <div className="mt-auto pt-4">

                <FooterLink
                  href="/tools"
                  label="جميع أدوات وحاسبات التداول"
                  onClose={closeMenus}
                  primary
                />

              </div>

            </div>

            {/* =========================================
                TRADING EDUCATION
            ========================================== */}

            <div className="flex min-w-0 flex-col border-slate-200 sm:border-r sm:pr-5">

              <SectionHeading
                title="تعلم التداول"
                icon={GraduationCap}
              />

              <div className="flex flex-1 flex-col gap-2">

                {/* LEARN TRADING FROM ZERO */}

                <FeaturedLink
                  item={{
                    label: "تعلم التداول من الصفر",
                    description:
                      "دليل شامل لفهم أساسيات التداول والأسواق",
                    href:
                      learnTradingMenuItems[0]?.href ||
                      "/learn-trading",
                    icon: BookOpen,
                  }}
                  onClose={closeMenus}
                />

                {/* STRATEGIES & ECONOMIC INDICATORS */}

                {[
                  {
                    label: "استراتيجيات التداول",
                    description:
                      "استراتيجيات وأساليب تداول الفوركس",
                    href: "/strategies",
                    icon: TrendingUp,
                  },
                  {
                    label: "المؤشرات الاقتصادية",
                    description:
                      "أهم المؤشرات الاقتصادية وتأثيرها على الأسواق",
                    href: "/learn-trading/economic-indicators",
                    icon: ChartCandlestick,
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (

                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={false}
                      onClick={closeMenus}
                      className="group/learning flex min-h-[74px] flex-1 min-w-0 items-center gap-3 rounded-[12px] border border-slate-200 bg-[#f8fafc] px-3 py-2.5 transition-colors duration-200 hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
                    >

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e7eef9] text-[#194b92] transition-colors group-hover/learning:bg-[#194b92] group-hover/learning:text-white">

                        <Icon
                          size={19}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />

                      </span>

                      <div className="min-w-0 flex-1">

                        <span className="block text-[13px] font-extrabold leading-6 text-[#10233f]">

                          {item.label}

                        </span>

                        <span className="mt-0.5 block text-[11px] font-medium leading-5 text-slate-500">

                          {item.description}

                        </span>

                      </div>

                      <ArrowLeft
                        size={14}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="shrink-0 text-slate-400 transition-transform group-hover/learning:-translate-x-0.5 group-hover/learning:text-[#194b92]"
                      />

                    </Link>

                  );

                })}

              </div>

              {/* ALL TRADING EDUCATION */}

              <div className="mt-auto pt-4">

                <FooterLink
                  href="/learn-trading"
                  label="جميع دروس وأدلة التداول"
                  onClose={closeMenus}
                />

              </div>

            </div>

          </div>

        );

      default:
        return null;

    }

  }

  /* =====================================================
     ACTIVE MENU INFORMATION
  ====================================================== */

  const activeMenuInfo =
    MAIN_NAVIGATION.find(
      (item) => item.id === activeMenu
    );

  /* =====================================================
     HEADER RENDER
  ====================================================== */

  return (

    <header
      ref={headerRef}
      dir="rtl"
      className="sticky top-0 z-50 border-b border-slate-200 bg-white"
    >

      <div
        className={`relative mx-auto w-full ${
          wide
            ? "max-w-[1560px]"
            : "max-w-7xl"
        } px-4 sm:px-6`}
      >

        <div className="flex h-16 items-center justify-between gap-3 2xl:h-[76px] 2xl:gap-4">

          {/* ===========================================
              BROKER ALARAB LOGO
          ============================================ */}

          <Link
            href="/"
            aria-label="بروكر العرب — الصفحة الرئيسية"
            onClick={closeMenus}
            className="shrink-0"
          >

            <Image
              src="/logo/Asset 4@6x.png"
              alt="بروكر العرب Broker Alarab"
              width={500}
              height={160}
              priority
              className="h-auto w-[130px] sm:w-[150px] 2xl:w-[160px]"
            />

          </Link>

          {/* ===========================================
              DESKTOP NAVIGATION
          ============================================ */}

          <nav
            ref={desktopNavRef}
            aria-label="القائمة الرئيسية"
            onMouseLeave={() => {
              setActiveMenu(null);
            }}
            onBlur={(event) => {

              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node
                )
              ) {
                setActiveMenu(null);
              }

            }}
            className="hidden min-w-0 flex-1 items-center justify-center 2xl:flex"
          >

            {/* MAIN NAVIGATION ITEMS */}

            <div className="flex min-w-0 items-center justify-center gap-2 2xl:gap-3">

              {MAIN_NAVIGATION.map(
                (item) => {

                  const isOpen =
                    activeMenu === item.id;

                  const isCurrent =
                    pathname === item.href ||
                    pathname.startsWith(
                      `${item.href}/`
                    );

                  return (

                    <div
                      key={item.id}
                      onMouseEnter={() => {
                        setActiveMenu(item.id);
                      }}
                      className="flex h-[76px] items-center"
                    >

                      <button
                        ref={(element) => {
                          desktopButtonsRef.current[
                            item.id
                          ] = element;
                        }}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`desktop-menu-${item.id}`}
                        onClick={() => {

                          setActiveMenu(
                            isOpen
                              ? null
                              : item.id
                          );

                        }}
                        onKeyDown={(event) => {

                          if (
                            event.key ===
                            "ArrowDown"
                          ) {

                            event.preventDefault();

                            setActiveMenu(
                              item.id
                            );

                            requestAnimationFrame(
                              () => {

                                document
                                  .getElementById(
                                    `desktop-menu-${item.id}`
                                  )
                                  ?.querySelector<HTMLAnchorElement>(
                                    "a"
                                  )
                                  ?.focus();

                              }
                            );

                          }

                        }}
                        className={`inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-[10px] px-3 text-[14px] font-extrabold transition-colors ${
  isOpen || isCurrent
    ? "bg-[#edf3fc] text-[#194b92]"
    : "text-[#263b55] hover:bg-slate-100 hover:text-[#194b92]"
}`}
                      >

                        {item.title}

                        <ChevronDown
                          size={13}
                          strokeWidth={2.3}
                          aria-hidden="true"
                          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                            isOpen
                              ? "rotate-180 text-[#194b92]"
                              : ""
                          }`}
                        />

                      </button>

                    </div>

                  );

                }
              )}

              {/* CONTACT US */}

              <Link
                href="/contact"
                prefetch={false}
                onMouseEnter={() =>
                  setActiveMenu(null)
                }
                onClick={closeMenus}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] px-3 text-[14px] font-extrabold text-[#263b55] transition-colors hover:bg-[#edf3fc] hover:text-[#194b92]"
              >

                اتصل بنا

              </Link>

            </div>

            {/* =========================================
                DESKTOP MEGA MENU
            ========================================== */}

            {activeMenu && activeMenuInfo && (

              <div
                id={`desktop-menu-${activeMenu}`}
                className={`absolute right-1/2 top-full z-50 max-w-[calc(100vw-40px)] translate-x-1/2 pt-1.5 ${PANEL_WIDTHS[activeMenu]}`}
              >

                <div className="max-h-[calc(100dvh-100px)] overflow-y-auto rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_65px_rgba(15,23,42,0.16)]">

                  {/* TOP BLUE ACCENT */}

                  <div className="h-[3px] bg-gradient-to-l from-[#194b92] via-[#4b9bd5] to-[#194b92]" />

                  {/* PANEL HEADER */}

                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-[#f8fafc] px-5 py-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e7eef9] text-[#194b92]">

                        <activeMenuInfo.icon
                          size={22}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />

                      </div>

                      <div className="min-w-0">

                        <div className="text-[16px] font-black text-[#10233f]">

                          {activeMenuInfo.panelTitle}

                        </div>

                        <p className="mt-1 text-[11px] font-medium leading-5 text-slate-500">

                          {activeMenuInfo.description}

                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      aria-label="إغلاق القائمة"
                      onClick={() => {

                        const previousMenu =
                          activeMenu;

                        setActiveMenu(null);

                        desktopButtonsRef.current[
                          previousMenu
                        ]?.focus();

                      }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200 hover:text-[#10233f]"
                    >

                      <X
                        size={17}
                        aria-hidden="true"
                      />

                    </button>

                  </div>

                  {/* PANEL CONTENT */}

                  <div className="p-5">

                    {renderMenuContent(
                      activeMenu
                    )}

                  </div>

                </div>

              </div>

            )}

          </nav>

          {/* ===========================================
              DESKTOP LANGUAGE SWITCH
          ============================================ */}

          <div className="hidden shrink-0 2xl:flex">

            <Link
              href="/en"
              prefetch={false}
              onClick={closeMenus}
              className="inline-flex min-h-[35px] items-center gap-1.5 rounded-full border border-[#c5d9f2] px-3 text-[11px] font-extrabold text-[#194b92] transition-colors hover:border-[#194b92] hover:bg-[#edf3fc]"
            >

              <Globe2
                size={13}
                aria-hidden="true"
              />

              English

            </Link>

          </div>

          {/* ===========================================
              MOBILE & TABLET MENU BUTTON
          ============================================ */}

          <button
            ref={mobileButtonRef}
            type="button"
            aria-label={
              mobileOpen
                ? "إغلاق القائمة الرئيسية"
                : "فتح القائمة الرئيسية"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {

              setActiveMenu(null);

              setMobileOpen(
                !mobileOpen
              );

              setMobileSection(null);

            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#10233f] transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc] 2xl:hidden"
          >

            {mobileOpen ? (

              <X
                size={21}
                strokeWidth={2}
                aria-hidden="true"
              />

            ) : (

              <Menu
                size={21}
                strokeWidth={2}
                aria-hidden="true"
              />

            )}

          </button>

        </div>

      </div>

      {/* ===============================================
          MOBILE & TABLET NAVIGATION
      ================================================ */}

      {mobileOpen && (

        <div className="absolute inset-x-0 top-full z-50 2xl:hidden">

          <nav
            id="mobile-navigation"
            aria-label="قائمة الهاتف والتابلت"
            className="mx-auto max-h-[calc(100dvh-64px)] w-full overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-4 py-4 shadow-[0_20px_45px_rgba(15,23,42,0.15)] sm:px-6"
          >

            <div className="mx-auto max-w-3xl space-y-2">

              {/* MOBILE MENU HEADING */}

              <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-4">

                <span className="text-[14px] font-black text-[#10233f] md:max-2xl:text-[17px]">
                  استكشف بروكر العرب
                </span>

                <Link
                  href="/en"
                  prefetch={false}
                  onClick={closeMenus}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#c5d9f2] px-3 py-1.5 text-[11px] font-bold text-[#194b92]"
                >

                  <Globe2
                    size={13}
                    aria-hidden="true"
                  />

                  English

                </Link>

              </div>

              {/* MOBILE ACCORDION SECTIONS */}

              {MAIN_NAVIGATION.map(
                (item) => {

                  const Icon = item.icon;

                  const isExpanded =
                    mobileSection === item.id;

                  return (

                    <div
                      key={item.id}
                      className={`overflow-hidden rounded-[13px] border transition-colors ${
                        isExpanded
                          ? "border-[#c5d9f2]"
                          : "border-slate-200"
                      }`}
                    >

                      <button
                        type="button"
                        aria-expanded={
                          isExpanded
                        }
                        aria-controls={`mobile-menu-${item.id}`}
                        onClick={() => {

                          setMobileSection(
                            isExpanded
                              ? null
                              : item.id
                          );

                        }}
                        className={`flex min-h-[54px] w-full items-center gap-3 px-3 py-2.5 text-right transition-colors ${
                          isExpanded
                            ? "bg-[#edf3fc]"
                            : "bg-[#f8fafc]"
                        }`}
                      >

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#194b92]">

                          <Icon
                            size={18}
                            strokeWidth={2}
                            aria-hidden="true"
                          />

                        </span>

                        <span className="min-w-0 flex-1 text-[13px] font-black text-[#10233f] md:max-2xl:text-[16px]">

                          {item.title}

                        </span>

                        <ChevronDown
                          size={17}
                          strokeWidth={2}
                          aria-hidden="true"
                          className={`shrink-0 text-slate-400 transition-transform ${
                            isExpanded
                              ? "rotate-180 text-[#194b92]"
                              : ""
                          }`}
                        />

                      </button>

                      {isExpanded && (

                        <div
                          id={`mobile-menu-${item.id}`}
                          className="border-t border-[#d5e3f5] bg-white p-3 sm:p-4"
                        >

                          {renderMenuContent(
                            item.id
                          )}

                        </div>

                      )}

                    </div>

                  );

                }
              )}

              {/* CONTACT US */}

              <Link
                href="/contact"
                prefetch={false}
                onClick={closeMenus}
                className="flex min-h-[54px] items-center gap-3 rounded-[13px] border border-slate-200 bg-[#f8fafc] px-3 py-2.5 transition-colors hover:bg-[#edf3fc]"
              >

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#194b92]">

                  <Mail
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                  />

                </span>

                <span className="flex-1 text-[13px] font-black text-[#10233f] md:max-2xl:text-[16px]">

                  اتصل بنا

                </span>

                <ArrowLeft
                  size={17}
                  className="text-slate-400"
                  aria-hidden="true"
                />

              </Link>

              {/* MOBILE FOOTER */}

              <div className="pt-3">

                <FooterLink
                  href="/brokers"
                  label="استكشف جميع شركات التداول"
                  onClose={closeMenus}
                  primary
                />

              </div>

              <p className="pb-2 pt-3 text-center text-[10px] font-medium leading-5 text-slate-400">

                بروكر العرب — تقييمات مستقلة ومقارنات شاملة

              </p>

            </div>

          </nav>

        </div>

      )}

    </header>

  );

}