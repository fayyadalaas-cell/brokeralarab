import type { Metadata } from "next";
import RiskCalculatorClient from "./RiskCalculatorClient";

export const metadata: Metadata = {
  title: "Forex Risk Calculator & Position Size Calculator",

  description:
    "Calculate your trading risk, position size, and suggested lot size for forex and gold based on account balance, risk percentage, and stop-loss distance.",

  alternates: {
    canonical: "https://brokeralarab.com/en/tools/risk-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/risk-calculator",
      ar: "https://brokeralarab.com/tools/risk-calculator",
      "x-default": "https://brokeralarab.com/en/tools/risk-calculator",
    },
  },

  openGraph: {
    title: "Forex Risk Calculator & Position Size Calculator",

    description:
      "Calculate trading risk, position size, and lot size before opening a forex or gold trade.",

    url: "https://brokeralarab.com/en/tools/risk-calculator",
    siteName: "Broker Al Arab",
    type: "website",
  },
};

export default function EnglishRiskCalculatorPage() {
  return <RiskCalculatorClient />;
}