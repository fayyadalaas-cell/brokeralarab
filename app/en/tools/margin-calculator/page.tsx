import type { Metadata } from "next";
import MarginCalculatorClient from "./MarginCalculatorClient";

export const metadata: Metadata = {
  title: "Forex Margin Calculator",

  description:
    "Calculate required margin, position value, and leverage impact before opening a forex or gold trade.",

  alternates: {
    canonical: "https://brokeralarab.com/en/tools/margin-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/margin-calculator",
      ar: "https://brokeralarab.com/tools/margin-calculator",
      "x-default": "https://brokeralarab.com/en/tools/margin-calculator",
    },
  },

  openGraph: {
    title: "Forex Margin Calculator",
    description:
      "Calculate margin requirements, leverage impact, and position value before opening forex or gold trades.",
    url: "https://brokeralarab.com/en/tools/margin-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function EnglishMarginCalculatorPage() {
  return <MarginCalculatorClient />;
}