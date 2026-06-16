import type { Metadata } from "next";
import RiskCalculatorClient from "./RiskCalculatorClient";

export const metadata: Metadata = {
  title:
    "Forex Risk Calculator | Position Size & Lot Size Calculator | Broker Al Arab",
  description:
    "Use the Forex Risk Calculator by Broker Al Arab to calculate your risk amount, position size, and suggested lot size before opening a forex or gold trade.",
  alternates: {
    canonical: "https://brokeralarab.com/en/tools/risk-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/risk-calculator",
      ar: "https://brokeralarab.com/tools/risk-calculator",
      "x-default": "https://brokeralarab.com/en/tools/risk-calculator",
    },
  },
  openGraph: {
    title:
      "Forex Risk Calculator | Position Size & Lot Size Calculator | Broker Al Arab",
    description:
      "Calculate risk amount, position size, and suggested lot size before opening a forex or gold trade.",
    url: "https://brokeralarab.com/en/tools/risk-calculator",
    siteName: "Broker Al Arab",
    type: "website",
  },
};

export default function EnglishRiskCalculatorPage() {
  return <RiskCalculatorClient />;
}