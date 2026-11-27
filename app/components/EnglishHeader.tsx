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
  ArrowRight,
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
   ENGLISH HEADER — MEGA NAVIGATION V2
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
  name_en?: string | null;
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
  title_en?: string | null;
  href: string;
};

type HeaderProps = {
  topBrokers?: BrokerItem[];
  countryMenuItems?: CountryItem[];
  featuredCategories?: unknown[];
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

const EMPTY_BROKERS: BrokerItem[] = [];
const EMPTY_COMPARISONS: ComparisonItem[] = [];
const EMPTY_LEARNING_ITEMS: LearningItem[] = [];

/* =========================================================
   FUTURE SECTIONS
   ENABLE ONLY AFTER PAGES ARE PUBLISHED
========================================================= */

const NAVIGATION_FEATURES = {
  brokerNews: false,
  articleCategories: false,
};

/* =========================================================
   ENGLISH URL HELPER
========================================================= */

function englishHref(href: string): string {
  if (href === "/") {
    return "/en";
  }

  if (href === "/en" || href.startsWith("/en/")) {
    return href;
  }

  return `/en${href.startsWith("/") ? href : `/${href}`}`;
}

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
    title: "Broker Reviews",
    href: "/en/brokers",
    icon: Building2,
    panelTitle: "Forex & CFD Broker Reviews",
    description:
      "Independent reviews of global forex and CFD brokers",
  },
  {
    id: "comparisons",
    title: "Comparisons",
    href: "/en/compare",
    icon: Scale,
    panelTitle: "Broker & Trading Account Comparisons",
    description:
      "Compare brokers, trading accounts, fees and trading conditions",
  },
  {
    id: "best-brokers",
    title: "Best Brokers",
    href: "/en/best-brokers",
    icon: Trophy,
    panelTitle: "Best Forex & CFD Brokers",
    description:
      "Explore the best trading brokers by country and category",
  },
  {
    id: "licenses",
    title: "Regulation",
    href: "/en/licenses",
    icon: ShieldCheck,
    panelTitle: "Licenses & Regulatory Authorities",
    description:
      "Explore financial regulators and verify broker licenses",
  },
  {
    id: "articles",
    title: "Articles & News",
    href: "/en/articles",
    icon: Newspaper,
    panelTitle: "Articles & News",
    description:
      "Market research, trading guides and forex industry news",
  },
  {
    id: "markets",
    title: "Markets & Analysis",
    href: "/en/technical-analysis",
    icon: ChartCandlestick,
    panelTitle: "Financial Markets & Technical Analysis",
    description:
      "Explore technical analysis, financial data and global markets",
  },
  {
    id: "education",
    title: "Tools & Education",
    href: "/en/tools",
    icon: Calculator,
    panelTitle: "Trading Tools & Education",
    description:
      "Financial calculators and educational trading resources",
  },
];

/* =========================================================
   BEST BROKERS BY COUNTRY
   ENGLISH INTERNATIONAL MARKETS
========================================================= */

const COUNTRY_MENU_ITEMS: CountryItem[] = [
  {
    label: "Best Forex Brokers in Vietnam",
    shortLabel: "Vietnam",
    href: "/en/best-brokers/vietnam",
    flag: "https://flagcdn.com/w80/vn.png",
  },
  {
    label: "Best Forex Brokers in Indonesia",
    shortLabel: "Indonesia",
    href: "/en/best-brokers/indonesia",
    flag: "https://flagcdn.com/w80/id.png",
  },
  {
    label: "Best Forex Brokers in Malaysia",
    shortLabel: "Malaysia",
    href: "/en/best-brokers/malaysia",
    flag: "https://flagcdn.com/w80/my.png",
  },
  {
    label: "Best Forex Brokers in the United Kingdom",
    shortLabel: "UK",
    href: "/en/best-brokers/united-kingdom",
    flag: "https://flagcdn.com/w80/gb.png",
  },
  {
    label: "Best Forex Brokers in Australia",
    shortLabel: "Australia",
    href: "/en/best-brokers/australia",
    flag: "https://flagcdn.com/w80/au.png",
  },
  {
    label: "Best Forex Brokers in South Africa",
    shortLabel: "South Africa",
    href: "/en/best-brokers/south-africa",
    flag: "https://flagcdn.com/w80/za.png",
  },
  {
    label: "Best Forex Brokers in Singapore",
    shortLabel: "Singapore",
    href: "/en/best-brokers/singapore",
    flag: "https://flagcdn.com/w80/sg.png",
  },
  {
    label: "Best Forex Brokers in Ghana",
    shortLabel: "Ghana",
    href: "/en/best-brokers/ghana",
    flag: "https://flagcdn.com/w80/gh.png",
  },
  {
    label: "Best Forex Brokers in Nigeria",
    shortLabel: "Nigeria",
    href: "/en/best-brokers/nigeria",
    flag: "https://flagcdn.com/w80/ng.png",
  },
  {
    label: "Best Forex Brokers in Thailand",
    shortLabel: "Thailand",
    href: "/en/best-brokers/thailand",
    flag: "https://flagcdn.com/w80/th.png",
  },
  {
    label: "Best Forex Brokers in the Philippines",
    shortLabel: "Philippines",
    href: "/en/best-brokers/philippines",
    flag: "https://flagcdn.com/w80/ph.png",
  },
  {
    label: "Best Forex Brokers in Kenya",
    shortLabel: "Kenya",
    href: "/en/best-brokers/kenya",
    flag: "https://flagcdn.com/w80/ke.png",
  },
];

/* =========================================================
   BEST BROKER CATEGORIES
========================================================= */

const MARKET_CATEGORIES: NavigationItem[] = [
  {
    label: "Best Forex Brokers",
    href: "/en/best-brokers",
  },
  {
    label: "Best Stock Brokers",
    href: "/en/best-brokers/stocks",
  },
  {
    label: "Best Commodity Brokers",
    href: "/en/best-brokers/commodities",
  },
  {
    label: "Best Indices Brokers",
    href: "/en/best-brokers/indices",
  },
  {
    label: "Best Gold Brokers",
    href: "/en/best-brokers/gold",
  },
  {
    label: "Best Brokers for Beginners",
    href: "/en/best-brokers/beginners",
  },
  {
    label: "Lowest Spread Brokers",
    href: "/en/lowest-spread-brokers",
  },
  {
    label: "Low Deposit Brokers",
    href: "/en/best-brokers/low-minimum-deposit",
  },
];

/* =========================================================
   ACCOUNT TYPES
   DISPLAYED IN COMPARISONS ONLY
========================================================= */

const ACCOUNT_TYPES: NavigationItem[] = [
  {
    label: "Best Cent Account Brokers",
    href: "/en/best-brokers/accounts/cent",
    description: "Trading accounts with smaller trade sizes",
  },
  {
    label: "Best Standard Account Brokers",
    href: "/en/best-brokers/accounts/standard",
    description: "Explore standard trading accounts",
  },
  {
    label: "Best Raw Spread Account Brokers",
    href: "/en/best-brokers/accounts/raw-spread",
    description: "Trading accounts with low raw spreads",
  },
];

/* =========================================================
   REGULATORY AUTHORITIES
========================================================= */

const REGULATORS = [
  {
    code: "FCA",
    country: "United Kingdom",
    href: "/en/licenses/fca",
  },
  {
    code: "CySEC",
    country: "Cyprus",
    href: "/en/licenses/cysec",
  },
  {
    code: "ASIC",
    country: "Australia",
    href: "/en/licenses/asic",
  },
  {
    code: "DFSA",
    country: "Dubai",
    href: "/en/licenses/dfsa",
  },
  {
    code: "SCA",
    country: "United Arab Emirates",
    href: "/en/licenses/sca",
  },
  {
    code: "ADGM FSRA",
    country: "Abu Dhabi",
    href: "/en/licenses/adgm-fsra",
  },
  {
    code: "JSC",
    country: "Jordan",
    href: "/en/licenses/jsc",
  },
  {
    code: "FSCA",
    country: "South Africa",
    href: "/en/licenses/fsca",
  },
  {
    code: "BaFin",
    country: "Germany",
    href: "/en/licenses/bafin",
  },
  {
    code: "NFA",
    country: "United States",
    href: "/en/licenses/nfa",
  },
  {
    code: "CIRO",
    country: "Canada",
    href: "/en/licenses/ciro",
  },
  {
    code: "FSA",
    country: "Seychelles",
    href: "/en/licenses/fsa",
  },
  {
    code: "SCB",
    country: "The Bahamas",
    href: "/en/licenses/scb",
  },
  {
    code: "FSC BVI",
    country: "British Virgin Islands",
    href: "/en/licenses/fsc-bvi",
  },
  {
    code: "CIMA",
    country: "Cayman Islands",
    href: "/en/licenses/cima",
  },
  {
    code: "FSC Mauritius",
    country: "Mauritius",
    href: "/en/licenses/fsc-mauritius",
  },
];

/* =========================================================
   TRADING TOOLS & CALCULATORS
========================================================= */

const TRADING_TOOLS: NavigationItem[] = [
  {
    label: "Risk Calculator",
    href: "/en/tools/risk-calculator",
  },
  {
    label: "Lot Size Calculator",
    href: "/en/tools/lot-size-calculator",
  },
  {
    label: "Pip Calculator",
    href: "/en/tools/pip-calculator",
  },
  {
    label: "Profit Calculator",
    href: "/en/tools/profit-calculator",
  },
  {
    label: "Margin Calculator",
    href: "/en/tools/margin-calculator",
  },
  {
    label: "Fibonacci Calculator",
    href: "/en/tools/fibonacci-calculator",
  },
  {
    label: "Pivot Point Calculator",
    href: "/en/tools/pivot-point-calculator",
  },
  {
    label: "Compound Calculator",
    href: "/en/tools/compound-calculator",
  },
];

/* =========================================================
   GLOBAL MARKET DATA
========================================================= */

const MARKET_LINKS: NavigationItem[] = [
  {
    label: "Global Interest Rates",
    href: "/en/interest-rates",
    description:
      "Central bank decisions and meetings",
    icon: Percent,
  },
  {
    label: "Global Market Hours",
    href: "/en/tools/market-hours",
    description:
      "Global market opening and closing times",
    icon: Clock,
  },
];

/* =========================================================
   TRADING EDUCATION
========================================================= */

const EDUCATION_LINKS: NavigationItem[] = [
  {
    label: "Trading Strategies",
    description:
      "Explore forex trading methods and strategies",
    href: "/en/strategies",
    icon: TrendingUp,
  },
  {
    label: "Economic Indicators",
    description:
      "Understand economic data and its market impact",
    href: "/en/learn-trading/economic-indicators",
    icon: ChartCandlestick,
  },
];

/* =========================================================
   PANEL WIDTHS
   MATCHING ARABIC HEADER V2
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
   SHARED SECTION HEADING
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

      <ArrowRight
        size={14}
        strokeWidth={2}
        className="shrink-0 text-slate-400 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-[#194b92]"
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

      <ArrowRight
        size={15}
        strokeWidth={2}
        className="shrink-0"
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
      className="group/featured flex min-h-[76px] min-w-0 items-center gap-3 rounded-[14px] border border-[#d5e3f5] bg-gradient-to-r from-[#edf3fc] to-white p-3.5 transition-colors hover:border-[#94b5e3] hover:bg-[#edf3fc]"
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

      <ArrowRight
        size={17}
        strokeWidth={2}
        className="shrink-0 text-[#194b92]"
        aria-hidden="true"
      />

    </Link>
  );
}

/* =========================================================
   STANDARD BORDERED CARD
   USED BY MARKETS & EDUCATION
========================================================= */

function BorderedMenuLink({
  item,
  onClose,
}: {
  item: NavigationItem;
  onClose?: () => void;
}) {
  const Icon = item.icon ?? TrendingUp;

  return (
    <Link
      href={item.href}
      prefetch={false}
      onClick={onClose}
      className="group/entry flex min-h-[74px] min-w-0 flex-1 items-center gap-3 rounded-[12px] border border-slate-200 bg-[#f8fafc] px-3 py-2.5 transition-colors duration-200 hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
    >

      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e7eef9] text-[#194b92] transition-colors group-hover/entry:bg-[#194b92] group-hover/entry:text-white">

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

      <ArrowRight
        size={14}
        strokeWidth={2}
        aria-hidden="true"
        className="shrink-0 text-slate-400 transition-transform group-hover/entry:translate-x-0.5 group-hover/entry:text-[#194b92]"
      />

    </Link>
  );
}

/* =========================================================
   FUTURE SECTION
   COMING SOON — WITHOUT BROKEN LINKS
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

        Soon

      </span>

    </div>
  );
}

/* =========================================================
   BROKER DISPLAY NAMES
========================================================= */

const BROKER_DISPLAY_NAMES: Record<string, string> = {
  exness: "Exness",
  xm: "XM",
  pepperstone: "Pepperstone",
  fxpro: "FxPro",
  avatrade: "AvaTrade",
  alpari: "Alpari",
  xs: "XS",
  equiti: "Equiti",
  vantage: "Vantage",
  "ic-markets": "IC Markets",
  "capital-com": "Capital.com",
  "markets-com": "Markets.com",
  "fp-markets": "FP Markets",
  activtrades: "ActivTrades",
  justmarkets: "JustMarkets",
  tickmill: "Tickmill",
  multibank: "MultiBank Group",
  "multibank-group": "MultiBank Group",
  thinkmarkets: "ThinkMarkets",
  hfm: "HFM",
  plus500: "Plus500",
  oneroyal: "OneRoyal",
  "ultima-markets": "Ultima Markets",
  "moneta-markets": "Moneta Markets",
  admirals: "Admirals",
  fbs: "FBS",
  infinox: "INFINOX",
  etoro: "eToro",
  eightcap: "Eightcap",
};

function getComparisonSlugs(
  href: string
): [string, string] | null {

  const slug = href
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean)
    .pop();

  if (!slug) {
    return null;
  }

  const parts = slug.split("-vs-");

  if (parts.length !== 2) {
    return null;
  }

  if (!parts[0] || !parts[1]) {
    return null;
  }

  return [parts[0], parts[1]];
}

/* =========================================================
   RANDOM HEADER COMPARISONS
   SIX COMPARISONS — UNIQUE BROKERS WHEN POSSIBLE
========================================================= */

function selectHeaderComparisons(
  comparisons: ComparisonItem[],
  count: number = 6,
  randomize: boolean = true
): ComparisonItem[] {

  if (count <= 0) {
    return [];
  }

  const uniqueComparisons = Array.from(
    new Map(
      comparisons
        .filter(
          (item) => item.href && item.label
        )
        .map((item) => [
          englishHref(item.href),
          {
            ...item,
            href: englishHref(item.href),
          },
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

  /* FIRST PASS — NO REPEATED BROKERS */

  for (const comparison of available) {

    const parts =
      getComparisonSlugs(comparison.href) ??
      comparison.label
        .split(/\s+vs\s+/i)
        .map((name) => name.trim().toLowerCase());

    if (parts.length !== 2) {
      continue;
    }

    const [broker1, broker2] = parts;

    if (
      !broker1 ||
      !broker2 ||
      broker1 === broker2 ||
      usedBrokers.has(broker1) ||
      usedBrokers.has(broker2)
    ) {
      continue;
    }

    const pairKey = [
      broker1,
      broker2,
    ].sort().join("-vs-");

    if (usedComparisons.has(pairKey)) {
      continue;
    }

    selected.push(comparison);

    usedBrokers.add(broker1);
    usedBrokers.add(broker2);

    usedComparisons.add(pairKey);

    if (selected.length >= count) {
      return selected;
    }

  }

  /* SECOND PASS — FILL EMPTY POSITIONS */

  for (const comparison of available) {

    const parts =
      getComparisonSlugs(comparison.href) ??
      comparison.label
        .split(/\s+vs\s+/i)
        .map((name) => name.trim().toLowerCase());

    if (
      parts.length !== 2 ||
      !parts[0] ||
      !parts[1] ||
      parts[0] === parts[1]
    ) {
      continue;
    }

    const pairKey = [...parts]
      .sort()
      .join("-vs-");

    if (usedComparisons.has(pairKey)) {
      continue;
    }

    selected.push(comparison);

    usedComparisons.add(pairKey);

    if (selected.length >= count) {
      break;
    }

  }

  return selected;

}

/* =========================================================
   MAIN ENGLISH HEADER
========================================================= */

export default function EnglishHeader({
  topBrokers = EMPTY_BROKERS,
  featuredComparisons = EMPTY_COMPARISONS,
  learnTradingMenuItems = EMPTY_LEARNING_ITEMS,
  wide = true,
}: HeaderProps) {

  const pathname = usePathname();

  const headerRef =
    useRef<HTMLElement>(null);

  const mobileButtonRef =
    useRef<HTMLButtonElement>(null);

  const desktopButtonsRef = useRef<
    Partial<
      Record<MenuKey, HTMLButtonElement | null>
    >
  >({});

  const [activeMenu, setActiveMenu] =
    useState<MenuKey | null>(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [mobileSection, setMobileSection] =
    useState<MenuKey | null>(null);

  /* =====================================================
     RANDOM COMPARISONS — SIX PER PAGE LOAD
  ====================================================== */

  const [
    visibleComparisons,
    setVisibleComparisons,
  ] = useState<ComparisonItem[]>(() =>
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
     UNIQUE BROKERS — MAXIMUM FIFTEEN
  ====================================================== */

  const visibleBrokers = Array.from(
    new Map(
      topBrokers
        .filter(
          (broker) =>
            broker.slug &&
            (broker.name_en || broker.name)
        )
        .map((broker) => [
          broker.slug,
          broker,
        ] as const)
    ).values()
  ).slice(0, 15);

  /* =====================================================
     BROKER NAME LOOKUP
  ====================================================== */

  const brokerNameMap = new Map(
    topBrokers.map((broker) => [
      broker.slug,
      broker.name_en || broker.name,
    ] as const)
  );

  function getBrokerDisplayName(
    slug: string | undefined,
    fallback: string
  ) {

    if (!slug) {
      return fallback;
    }

    return (
      BROKER_DISPLAY_NAMES[slug] ||
      brokerNameMap.get(slug) ||
      fallback
    );

  }

  /* =====================================================
     LEARN TRADING STARTER GUIDE
  ====================================================== */

  const starterGuide =
    learnTradingMenuItems.find(
      (item) =>
        item.href?.endsWith(
          "/how-to-start-trading-from-zero"
        )
    );

  const starterGuideHref = starterGuide
    ? englishHref(starterGuide.href)
    : "/en/learn-trading";

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
     OUTSIDE CLICK & ESCAPE KEY
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

      if (event.key !== "Escape") {
        return;
      }

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
     RESET MENUS ON SCREEN SIZE CHANGE
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
     SHARED BY DESKTOP, TABLET & MOBILE
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
      href={`/en/brokers/${broker.slug}`}
      prefetch={false}
      onClick={closeMenus}
      className={`group/broker min-h-[48px] min-w-0 items-center justify-between gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-2.5 transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc] ${
        index >= 10
          ? "hidden sm:flex"
          : "flex"
      }`}
    >

      <span className="min-w-0 text-[13px] font-extrabold leading-5 text-[#10233f] group-hover/broker:text-[#194b92]">

        {broker.name_en || broker.name} Review

      </span>

      <ArrowRight
        size={13}
        className="shrink-0 text-slate-400 group-hover/broker:text-[#194b92]"
        aria-hidden="true"
      />

    </Link>

  ))}

</div>

            ) : (

              <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">

                Explore our broker directory to view all reviews.

              </p>

            )}

            <div className="grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2">

              <FooterLink
                href="/en/brokers"
                label="View All Broker Reviews"
                onClose={closeMenus}
                primary
              />

              <FooterLink
                href="/en/how-we-review-brokers"
                label="How We Review Brokers"
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

          <div className="grid min-w-0 gap-5 sm:grid-cols-2">

            {/* =========================================
                BROKER COMPARISONS
            ========================================== */}

            <div className="flex min-w-0 flex-col">

              <SectionHeading
                title="Broker Comparisons"
                icon={Scale}
              />

              <div className="space-y-2">

                {visibleComparisons.map((item) => {

                  const parts =
                    item.label.split(/\s+vs\s+/i);

                  const slugs =
                    getComparisonSlugs(item.href);

                  const firstName =
                    getBrokerDisplayName(
                      slugs?.[0],
                      parts[0] || ""
                    );

                  const secondName =
                    getBrokerDisplayName(
                      slugs?.[1],
                      parts[1] || ""
                    );

                  if (!firstName || !secondName) {

                    return (

                      <MenuLink
                        key={item.href}
                        item={{
                          label: item.label,
                          href: englishHref(item.href),
                        }}
                        onClose={closeMenus}
                      />

                    );

                  }

                  return (

                    <Link
                      key={item.href}
                      href={englishHref(item.href)}
                      prefetch={false}
                      onClick={closeMenus}
                      className="group/comparison grid min-h-[44px] grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] items-center gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-2 transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
                    >

                      <span className="min-w-0 text-center text-[12px] font-extrabold leading-5 text-[#10233f] group-hover/comparison:text-[#194b92]">

                        {firstName}

                      </span>

                      <span className="flex h-7 w-8 items-center justify-center rounded-full bg-[#e5edf9] text-[10px] font-black text-[#194b92]">

                        VS

                      </span>

                      <span className="min-w-0 text-center text-[12px] font-extrabold leading-5 text-[#10233f] group-hover/comparison:text-[#194b92]">

                        {secondName}

                      </span>

                    </Link>

                  );

                })}

              </div>

              <div className="mt-auto pt-4">

                <FooterLink
                  href="/en/compare"
                  label="All Broker Comparisons"
                  onClose={closeMenus}
                  primary
                />

              </div>

            </div>

            {/* =========================================
                TRADING ACCOUNT COMPARISONS
            ========================================== */}

            <div className="flex min-w-0 flex-col border-slate-200 sm:border-l sm:pl-5">

              <SectionHeading
                title="Trading Account Comparisons"
                icon={Scale}
              />

              <FeaturedLink
                item={{
                  label: "Compare Any Two Trading Accounts",
                  href: "/en/compare-accounts",
                  description:
                    "Compare spreads, commissions, deposits and platforms",
                  icon: Scale,
                }}
                onClose={closeMenus}
              />

              <div className="mt-3 space-y-2">

                {ACCOUNT_TYPES.map((item) => (

                  <MenuLink
                    key={item.href}
                    item={item}
                    onClose={closeMenus}
                  />

                ))}

              </div>

              <div className="mt-auto pt-4">

                <FooterLink
                  href="/en/compare-accounts"
                  label="All Account Comparisons"
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

              {/* =======================================
                  BEST BROKERS BY COUNTRY
              ======================================== */}

              <div className="min-w-0">

                <SectionHeading
                  title="Best Brokers by Country"
                  icon={Globe2}
                />

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

                  {COUNTRY_MENU_ITEMS.map((item) => (

                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={false}
                      title={item.label}
                      onClick={closeMenus}
                      className="group/country flex min-h-[48px] min-w-0 items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-2 py-2 transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
                    >

                      {item.flag && (

                        <img
                          src={item.flag}
                          alt=""
                          loading="lazy"
                          width={24}
                          height={24}
                          className="h-6 w-6 shrink-0 rounded-full border border-white object-cover shadow-sm"
                        />

                      )}

                      <span className="min-w-0 text-center text-[12px] font-bold leading-5 text-[#10233f] transition-colors group-hover/country:text-[#194b92]">

                        {item.shortLabel}

                      </span>

                    </Link>

                  ))}

                </div>

              </div>

              {/* =======================================
                  BEST BROKERS BY CATEGORY
              ======================================== */}

              <div className="min-w-0 border-slate-200 sm:border-l sm:pl-5">

                <SectionHeading
                  title="Best Brokers by Category"
                  icon={Trophy}
                />

                <div className="grid grid-cols-2 gap-2">

                  {MARKET_CATEGORIES.map((item) => (

                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={false}
                      onClick={closeMenus}
                      className="group/category flex min-h-[48px] min-w-0 items-center justify-between gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-2 transition-colors hover:border-[#c5d9f2] hover:bg-[#edf3fc]"
                    >

                      <span className="min-w-0 flex-1 text-[12px] font-bold leading-5 text-[#10233f] transition-colors group-hover/category:text-[#194b92]">

                        {item.label}

                      </span>

                      <ArrowRight
                        size={13}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="shrink-0 text-slate-400 transition-transform group-hover/category:translate-x-0.5 group-hover/category:text-[#194b92]"
                      />

                    </Link>

                  ))}

                </div>

              </div>

            </div>

            <div className="border-t border-slate-200 pt-4">

              <FooterLink
                href="/en/best-brokers"
                label="Explore All Best Broker Categories"
                onClose={closeMenus}
                primary
              />

            </div>

          </div>

        );

      /* =================================================
         04 — LICENSES & REGULATION
      ================================================== */

      case "licenses":

        return (

          <div className="space-y-3">

            {/* =========================================
                REGULATORY AUTHORITIES
            ========================================== */}

            <div>

              <SectionHeading
                title="Global Regulatory Authorities"
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

      <span className="text-[14px] font-black leading-5 text-[#194b92] transition-colors group-hover/license:text-brand-600">

        {regulator.code}

      </span>

      <span className="text-[11px] font-semibold leading-5 text-slate-500">

        {regulator.country}

      </span>

    </Link>

  ))}

</div>

            </div>

            {/* =========================================
                LICENSE VERIFICATION
            ========================================== */}

            <div className="border-t border-slate-200 pt-3">

              <FeaturedLink
                item={{
                  label: "Verify a Broker License",
                  description:
                    "Search by broker name or license number and explore its regulatory status",
                  href: "/en/licenses#license-search",
                  icon: ShieldCheck,
                }}
                onClose={closeMenus}
              />

            </div>

            <FooterLink
              href="/en/licenses"
              label="View All Licenses & Regulatory Authorities"
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

      <div className="grid min-w-0 gap-5 sm:grid-cols-2 sm:max-2xl:[&>div>div:last-child]:grid sm:max-2xl:[&>div>div:last-child]:grid-rows-2 sm:max-2xl:[&>div>div:last-child>*]:min-h-[72px]">

        {/* =======================================
            ARTICLES & GUIDES
        ======================================== */}

        <div className="min-w-0">

          <SectionHeading
            title="Articles & Guides"
            icon={BookOpen}
          />

          <div className="space-y-2 sm:max-2xl:space-y-0 sm:max-2xl:gap-2 [&_span.text-slate-500]:truncate">

            <MenuLink
              item={{
                label: "Markets & Economy Articles",
                description: "Financial research and reports",
                href:
                  NAVIGATION_FEATURES.articleCategories
                    ? "/en/articles/category/markets-economy"
                    : "/en/articles",
                icon: TrendingUp,
              }}
              onClose={closeMenus}
            />

            <MenuLink
              item={{
                label: "Trading Guides by Country",
                description: "Accounts, payments and regulation",
                href:
                  NAVIGATION_FEATURES.articleCategories
                    ? "/en/articles/category/country-guides"
                    : "/en/articles",
                icon: Globe2,
              }}
              onClose={closeMenus}
            />

          </div>

        </div>

        {/* =======================================
            TRADING INDUSTRY NEWS
        ======================================== */}

        <div className="min-w-0 border-slate-200 sm:border-l sm:pl-5">

          <SectionHeading
            title="Trading Industry News"
            icon={Newspaper}
          />

          <div className="space-y-2 sm:max-2xl:space-y-0 sm:max-2xl:gap-2 [&_span.text-slate-500]:truncate">

            {NAVIGATION_FEATURES.brokerNews ? (

              <MenuLink
                item={{
                  label: "Forex Broker News",
                  description: "Latest broker news and updates",
                  href: "/en/forex-broker-news",
                  icon: Newspaper,
                }}
                onClose={closeMenus}
              />

            ) : (

              <UpcomingLink
                label="Forex Broker News"
                description="Latest broker news and updates"
                icon={Newspaper}
              />

            )}

            <MenuLink
              item={{
                label: "Financial Expos & Conferences",
                description: "Global financial events",
                href: "/en/events",
                icon: CalendarDays,
              }}
              onClose={closeMenus}
            />

          </div>

        </div>

      </div>

      {/* =======================================
          ALL ARTICLES & REPORTS
      ======================================== */}

      <div className="border-t border-slate-200 pt-4">

        <FooterLink
          href="/en/articles"
          label="View All Articles & Reports"
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
                label: "Financial Market Technical Analysis",
                description:
                  "Technical analysis of gold, silver, currencies and technical indicators",
                href: "/en/technical-analysis",
                icon: ChartCandlestick,
              }}
              onClose={closeMenus}
            />

            {/* =========================================
                GLOBAL MARKET DATA
            ========================================== */}

            <div>

              <SectionHeading
                title="Global Markets & Financial Data"
                icon={TrendingUp}
              />

              <div className="grid gap-2 sm:grid-cols-2">

                {MARKET_LINKS.map((item) => (

                  <BorderedMenuLink
                    key={item.href}
                    item={item}
                    onClose={closeMenus}
                  />

                ))}

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
                title="Trading Tools & Calculators"
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

                    <ArrowRight
                      size={13}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="shrink-0 text-slate-400 transition-transform group-hover/tool:translate-x-0.5 group-hover/tool:text-[#194b92]"
                    />

                  </Link>

                ))}

              </div>

              <div className="mt-auto pt-4">

                <FooterLink
                  href="/en/tools"
                  label="All Trading Tools & Calculators"
                  onClose={closeMenus}
                  primary
                />

              </div>

            </div>

            {/* =========================================
                TRADING EDUCATION
            ========================================== */}

            <div className="flex min-w-0 flex-col border-slate-200 sm:border-l sm:pl-5">

              <SectionHeading
                title="Learn Trading"
                icon={GraduationCap}
              />

              <div className="flex flex-1 flex-col gap-2">

                <FeaturedLink
                  item={{
                    label: "Learn Trading from Scratch",
                    description:
                      "A complete guide to trading fundamentals and financial markets",
                    href: starterGuideHref,
                    icon: BookOpen,
                  }}
                  onClose={closeMenus}
                />

                {EDUCATION_LINKS.map((item) => (

                  <BorderedMenuLink
                    key={item.href}
                    item={item}
                    onClose={closeMenus}
                  />

                ))}

              </div>

              <div className="mt-auto pt-4">

                <FooterLink
                  href="/en/learn-trading"
                  label="All Trading Lessons & Guides"
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
      dir="ltr"
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
              BROKER ALARAB — ENGLISH LOGO
          ============================================ */}

          <Link
            href="/en"
            aria-label="Broker Alarab — Homepage"
            onClick={closeMenus}
            className="shrink-0"
          >

            <Image
              src="/logo/Asset 1@3x.png"
              alt="Broker Alarab"
              width={300}
              height={90}
              priority
              className="h-auto w-[130px] sm:w-[155px] 2xl:w-[160px]"
            />

          </Link>

          {/* ===========================================
              DESKTOP NAVIGATION
          ============================================ */}

          <nav
            aria-label="Main navigation"
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

            {/* =========================================
                MAIN NAVIGATION ITEMS
            ========================================== */}

            <div className="flex min-w-0 items-center justify-center gap-1 min-[1700px]:gap-3">

              {MAIN_NAVIGATION.map((item) => {

                const isOpen =
                  activeMenu === item.id;

                const isCurrent =
                  pathname === item.href ||
                  pathname.startsWith(
                    `${item.href}/`
                  ) ||
                  (
                    item.id === "comparisons" &&
                    pathname.startsWith(
                      "/en/compare-accounts"
                    )
                  ) ||
                  (
                    item.id === "markets" &&
                    (
                      pathname.startsWith(
                        "/en/interest-rates"
                      ) ||
                      pathname.startsWith(
                        "/en/tools/market-hours"
                      )
                    )
                  ) ||
                  (
                    item.id === "articles" &&
                    (
                      pathname.startsWith(
                        "/en/events"
                      ) ||
                      pathname.startsWith(
                        "/en/forex-broker-news"
                      )
                    )
                  ) ||
                  (
                    item.id === "education" &&
                    (
                      pathname.startsWith(
                        "/en/learn-trading"
                      ) ||
                      pathname.startsWith(
                        "/en/strategies"
                      )
                    )
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
                      aria-controls={
                        isOpen
                          ? `desktop-menu-en-${item.id}`
                          : undefined
                      }
                      onClick={() => {

                        setActiveMenu(
                          isOpen
                            ? null
                            : item.id
                        );

                      }}
                      onKeyDown={(event) => {

                        if (
                          event.key === "ArrowDown"
                        ) {

                          event.preventDefault();

                          setActiveMenu(item.id);

                          requestAnimationFrame(() => {

                            document
                              .getElementById(
                                `desktop-menu-en-${item.id}`
                              )
                              ?.querySelector<HTMLAnchorElement>(
                                "a"
                              )
                              ?.focus();

                          });

                        }

                      }}
                      className={`inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-[10px] px-2.5 text-[13px] font-extrabold transition-colors min-[1700px]:gap-2 min-[1700px]:px-3 min-[1700px]:text-[14px] ${
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

              })}

              {/* =======================================
                  CONTACT US
              ======================================== */}

              <Link
                href="/en/contact"
                prefetch={false}
                onMouseEnter={() => {
                  setActiveMenu(null);
                }}
                onClick={closeMenus}
                className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-[10px] px-2.5 text-[13px] font-extrabold text-[#263b55] transition-colors hover:bg-[#edf3fc] hover:text-[#194b92] min-[1700px]:px-3 min-[1700px]:text-[14px]"
              >

                Contact Us

              </Link>

            </div>

            {/* =========================================
                DESKTOP MEGA MENU
            ========================================== */}

            {activeMenu && activeMenuInfo && (

              <div
                id={`desktop-menu-en-${activeMenu}`}
                className={`absolute left-1/2 top-full z-50 max-w-[calc(100vw-40px)] -translate-x-1/2 pt-1.5 ${PANEL_WIDTHS[activeMenu]}`}
              >

                <div className="max-h-[calc(100dvh-100px)] overflow-y-auto rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_65px_rgba(15,23,42,0.16)]">

                  {/* ===================================
                      TOP BLUE ACCENT
                  ==================================== */}

                  <div className="h-[3px] bg-gradient-to-r from-[#194b92] via-[#4b9bd5] to-[#194b92]" />

                  {/* ===================================
                      PANEL HEADER
                  ==================================== */}

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
                      aria-label="Close menu"
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

                  {/* ===================================
                      PANEL CONTENT
                  ==================================== */}

                  <div className="p-5">

                    {renderMenuContent(activeMenu)}

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
              href="/"
              lang="ar"
              prefetch={false}
              onClick={closeMenus}
              className="inline-flex min-h-[35px] items-center gap-1.5 rounded-full border border-[#c5d9f2] px-3 text-[12px] font-extrabold text-[#194b92] transition-colors hover:border-[#194b92] hover:bg-[#edf3fc]"
            >

              <Globe2
                size={13}
                aria-hidden="true"
              />

              العربية

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
                ? "Close main menu"
                : "Open main menu"
            }
            aria-expanded={mobileOpen}
            aria-controls={
              mobileOpen
                ? "mobile-navigation-en"
                : undefined
            }
            onClick={() => {

              setActiveMenu(null);

              setMobileOpen(
                (previous) => !previous
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
            id="mobile-navigation-en"
            aria-label="Mobile and tablet navigation"
            className="mx-auto max-h-[calc(100dvh-64px)] w-full overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-4 py-4 shadow-[0_20px_45px_rgba(15,23,42,0.15)] sm:px-6"
          >

            <div className="mx-auto max-w-3xl space-y-2">

              {/* =======================================
                  MOBILE MENU HEADING
              ======================================== */}

              <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-4">

                <span className="text-[14px] font-black text-[#10233f] md:max-2xl:text-[17px]">

                  Explore Broker Alarab

                </span>

                <Link
                  href="/"
                  lang="ar"
                  prefetch={false}
                  onClick={closeMenus}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#c5d9f2] px-3 py-1.5 text-[12px] font-bold text-[#194b92]"
                >

                  <Globe2
                    size={13}
                    aria-hidden="true"
                  />

                  العربية

                </Link>

              </div>

              {/* =======================================
                  MOBILE ACCORDION SECTIONS
              ======================================== */}

              {MAIN_NAVIGATION.map((item) => {

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
                      aria-expanded={isExpanded}
                      aria-controls={
                        isExpanded
                          ? `mobile-menu-en-${item.id}`
                          : undefined
                      }
                      onClick={() => {

                        setMobileSection(
                          isExpanded
                            ? null
                            : item.id
                        );

                      }}
                      className={`flex min-h-[54px] w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
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
                        id={`mobile-menu-en-${item.id}`}
                        className="border-t border-[#d5e3f5] bg-white p-3 sm:p-4"
                      >

                        {renderMenuContent(item.id)}

                      </div>

                    )}

                  </div>

                );

              })}

              {/* =======================================
                  MOBILE CONTACT US
              ======================================== */}

              <Link
                href="/en/contact"
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

                  Contact Us

                </span>

                <ArrowRight
                  size={17}
                  className="text-slate-400"
                  aria-hidden="true"
                />

              </Link>

              {/* =======================================
                  MOBILE FOOTER
              ======================================== */}

              <div className="pt-3">

                <FooterLink
                  href="/en/brokers"
                  label="Explore All Forex & CFD Brokers"
                  onClose={closeMenus}
                  primary
                />

              </div>

              <p className="pb-2 pt-3 text-center text-[10px] font-medium leading-5 text-slate-400">

                Broker Alarab — Independent Broker Reviews & Comparisons

              </p>

            </div>

          </nav>

        </div>

      )}

    </header>

  );

}