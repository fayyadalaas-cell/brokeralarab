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

export const EVENT_SLUGS = [
  "forex-expo-dubai-2026",
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