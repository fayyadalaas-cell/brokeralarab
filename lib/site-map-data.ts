export const BASE_URL = "https://brokeralarab.com";

export const TOOL_SLUGS = [
  "risk-calculator",
  "margin-calculator",
  "pip-calculator",
  "lot-size-calculator",
  "profit-calculator",
  "leverage-calculator",
  "drawdown-calculator",
  "compound-calculator",
  "fibonacci-calculator",
  "pivot-point-calculator",
  "market-hours",
];

export const STATIC_PAGES = [
  "",
  "brokers",
  "compare",
  "compare-accounts",

  // Best Brokers
  "best-brokers",
  "best-brokers/gold",
  "best-brokers/low-minimum-deposit",
  "best-brokers/scalping",
  "best-brokers/stocks",
  "best-brokers/indices",
  "best-brokers/commodities",

  // Best Brokers by Account Type
  "best-brokers/accounts/cent",
  "best-brokers/accounts/standard",
  "best-brokers/accounts/raw-spread",

  // Broker Rankings
  "lowest-spread-brokers",

  // Learn Trading
  "learn-trading",
  "learn-trading/how-to-start-trading-from-zero",
  "learn-trading/economic-indicators",
  "learn-trading/spread",
  "learn-trading/leverage",
  "learn-trading/margin",
  "learn-trading/lot",
  "learn-trading/stop-loss",
  "learn-trading/take-profit",
  "learn-trading/hedging",
  "learn-trading/liquidity",
  "learn-trading/margin-call",

  // Licenses
  "licenses",

    // Technical Analysis Hub
  "technical-analysis",

  // Forex Strategies Hub
  "strategies",

  // Forex Strategies
  "strategies/ict",
  "strategies/scalping",
  "strategies/price-action",
  "strategies/swing-trading",
  "strategies/rsi",
  "strategies/trend-following",
  "strategies/smart-money-concepts",
  "strategies/supply-and-demand",
  "strategies/order-blocks",
  "strategies/liquidity-sweep",
  "strategies/support-and-resistance",
  "strategies/moving-average-crossover",

  // Company & Legal
  "about",
  "contact",
  "how-we-review-brokers",
  "privacy-policy",
  "terms-and-conditions",
];

export const STATIC_PAGES_EN = [
  "en",
  "en/brokers",
  "en/compare",
  "en/compare-accounts",

  // Best Brokers
  "en/best-brokers",
  "en/best-brokers/gold",
  "en/best-brokers/low-minimum-deposit",
  "en/best-brokers/scalping",
  "en/best-brokers/stocks",
  "en/best-brokers/indices",
  "en/best-brokers/commodities",

  // Best Brokers by Account Type
  "en/best-brokers/accounts/cent",
  "en/best-brokers/accounts/standard",
  "en/best-brokers/accounts/raw-spread",

  // Broker Rankings
  "en/lowest-spread-brokers",

  // Learn Trading
  "en/learn-trading",
  "en/learn-trading/how-to-start-trading-from-zero",
  "en/learn-trading/economic-indicators",
  "en/learn-trading/spread",
  "en/learn-trading/margin",
  "en/learn-trading/leverage",
  "en/learn-trading/lot",
  "en/learn-trading/stop-loss",
  "en/learn-trading/take-profit",
  "en/learn-trading/hedging",
  "en/learn-trading/liquidity",
  "en/learn-trading/margin-call",

  // Licenses
  "en/licenses",

    // Technical Analysis Hub
  "en/technical-analysis",
  
  // Forex Strategies Hub
  "en/strategies",

  // Forex Strategies
  "en/strategies/ict",
  "en/strategies/scalping",
  "en/strategies/price-action",
  "en/strategies/swing-trading",
  "en/strategies/rsi",
  "en/strategies/trend-following",
  "en/strategies/smart-money-concepts",
  "en/strategies/supply-and-demand",
  "en/strategies/order-blocks",
  "en/strategies/liquidity-sweep",
  "en/strategies/support-and-resistance",
  "en/strategies/moving-average-crossover",

  // Company & Legal
  "en/about",
  "en/contact",
  "en/how-we-review-brokers",
  "en/privacy-policy",
  "en/terms-and-conditions",
];


/* =========================================================
   ARTICLES — CENTRAL SITEMAP REGISTRY

   Add every newly published article here.

   The sitemap automatically generates:
   - Arabic article URL
   - English article URL
   - Accurate lastModified date
   - Reciprocal hreflang when both languages exist

   Set ar / en to true only when the actual
   corresponding page is published and indexable.
   ========================================================= */

export type ArticleSitemapEntry = {
  slug: string;
  lastModified: string;
  publishedAt: string;
  ar: boolean;
  en: boolean;

  image?: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categoryAr: string;
  categoryEn: string;
};

export const ARTICLE_PAGES: ArticleSitemapEntry[] = [

  /* =====================================================
     ARTICLE 01 — GOLD PRICE CRASHES
  ===================================================== */

  {
    slug: "gold-price-crashes-history",
    lastModified: "2026-11-23",
    publishedAt: "2026-11-23",

    ar: true,
    en: true,

    image: "/articles/gold-crashes-hero-updated.webp",

    titleAr: "أكبر انهيارات أسعار الذهب عبر التاريخ",

    titleEn: "Major Gold Price Crashes Throughout History",

    descriptionAr:
      "دراسة تاريخية لأبرز انهيارات أسعار الذهب والعوامل التي أدت إلى تراجع الأسعار.",

    descriptionEn:
      "A historical study of major gold price crashes and the factors behind them.",

    categoryAr: "الذهب والأسواق",
    categoryEn: "Gold and Financial Markets",
  },

  /* =====================================================
     ARTICLE 02 — GOLD AND FED DECISIONS
  ===================================================== */

  {
    slug: "gold-reaction-fed-decisions",
    lastModified: "2026-11-23",
    publishedAt: "2026-11-23",

    ar: true,
    en: true,

    image: "/articles/gold-fed-decisions-hero.webp",

    titleAr:
      "كيف تتفاعل أسعار الذهب مع قرارات الفيدرالي الأمريكي؟",

    titleEn:
      "How Gold Prices React to Federal Reserve Decisions",

    descriptionAr:
      "تحليل العلاقة بين قرارات الفائدة الأمريكية وتحركات أسعار الذهب في الأسواق المالية.",

    descriptionEn:
      "An analysis of the relationship between Federal Reserve interest rate decisions and gold prices.",

    categoryAr: "الذهب والأسواق",
    categoryEn: "Gold and Financial Markets",
  },

  /* =====================================================
     ARTICLE 03 — SAUDI ARABIA
  ===================================================== */

  {
    slug: "open-forex-account-saudi-arabia",
    lastModified: "2026-11-25",
    publishedAt: "2026-11-24",

    ar: true,
    en: true,

    image: "/articles/open-forex-account-saudi-arabia.webp",

    titleAr:
      "كيفية فتح حساب فوركس في السعودية – الشروط وخطوات التسجيل",

    titleEn:
      "How to Open a Forex Trading Account in Saudi Arabia",

    descriptionAr:
      "تعرف على شروط فتح حساب فوركس في السعودية للمواطنين والمقيمين، والمستندات المطلوبة للتوثيق، وخطوات التسجيل والإيداع والتحقق من تراخيص شركات التداول.",

    descriptionEn:
      "A guide to opening a forex trading account, choosing a broker and understanding registration requirements in Saudi Arabia.",

    categoryAr: "أدلة التداول",
    categoryEn: "Trading Guides",
  },

  /* =====================================================
     ARTICLE 04 — KUWAIT
  ===================================================== */

  {
    slug: "open-forex-account-kuwait",
    lastModified: "2026-11-25",
    publishedAt: "2026-11-25",

    ar: true,
    en: true,

    image: "/articles/open-forex-account-kuwait.webp",

    titleAr:
      "كيفية فتح حساب فوركس في الكويت – الشروط وخطوات التسجيل",

    titleEn:
      "How to Open a Forex Trading Account in Kuwait",

    descriptionAr:
      "دليل فتح حساب فوركس في الكويت للمواطنين والمقيمين، يشمل البطاقة المدنية وتوثيق الحساب وإثبات العنوان والتسجيل ووسائل الدفع بالدينار الكويتي والتحقق من التراخيص.",

    descriptionEn:
      "A guide to opening a forex trading account and choosing a suitable broker in Kuwait.",

    categoryAr: "أدلة التداول",
    categoryEn: "Trading Guides",
  },

  /* =====================================================
     ARTICLE 05 — BEST TIME TO TRADE GOLD
  ===================================================== */

  {
    slug: "best-time-to-trade-gold",
    lastModified: "2026-11-25",
    publishedAt: "2026-11-25",

    ar: true,
    en: true,

    image: "/articles/best-time-to-trade-gold.webp",

    titleAr:
      "أفضل أوقات تداول الذهب خلال اليوم – دراسة إحصائية لحركة الأسعار",

    titleEn:
      "Best Time to Trade Gold (XAU/USD): A Statistical Study of Intraday Price Movements",

    descriptionAr:
      "دراسة إحصائية لأفضل أوقات تداول الذهب بناءً على بيانات تاريخية تمتد لأكثر من 16 عاماً.",

    descriptionEn:
      "A statistical study of the best gold trading hours based on more than 16 years of historical data.",

    categoryAr: "الذهب والأسواق",
    categoryEn: "Gold and Financial Markets",
  },

];

export const EVENT_SLUGS = [
  "forex-expo-dubai-2026",
  "forex-traders-expo-summit-dubai-2026", // New - November 2026
  "money-expo-abu-dhabi-2026",
  "jeddah-fintech-week-2026",
  "profx-expo-africa-2026",
  "profin-expo-bangkok-2026",
  "ifx-expo-asia-2026",
  "blockchain-life-ai-future-week-dubai-2026",
];


export function url(path: string) {
  return path ? `${BASE_URL}/${path}` : BASE_URL;
}