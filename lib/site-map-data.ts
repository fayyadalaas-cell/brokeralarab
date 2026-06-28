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
];

export const STATIC_PAGES = [
  "",
  "brokers",
  "compare",
  "best-brokers",
  "best-brokers/gold",
  "lowest-spread-brokers",
  "learn-trading/how-to-start-trading-from-zero",
  "licenses",
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
  "en/best-brokers",
  "en/best-brokers/gold",
  "en/learn-trading/how-to-start-trading-from-zero",
  "en/licenses",
];

export const EVENT_SLUGS = [
  "forex-expo-dubai-2026",
  "money-expo-abu-dhabi-2026",
  "jeddah-fintech-week-2026",
];

export function url(path: string) {
  return path ? `${BASE_URL}/${path}` : BASE_URL;
}