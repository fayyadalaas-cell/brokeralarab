import type { Metadata } from "next";
import LeverageCalculatorClient from "./LeverageCalculatorClient";

export const metadata: Metadata = {
  title: "Forex Leverage Calculator",

  description:
    "Calculate effective leverage, required margin, position value, and margin usage for forex and gold trades. Free leverage calculator for better risk management.",

  alternates: {
    canonical: "https://brokeralarab.com/en/tools/leverage-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/leverage-calculator",
      ar: "https://brokeralarab.com/tools/leverage-calculator",
      "x-default": "https://brokeralarab.com/en/tools/leverage-calculator",
    },
  },

  openGraph: {
    title: "Forex Leverage Calculator",
    description:
      "Calculate effective leverage, margin requirements, and position exposure before opening forex or gold trades.",
    url: "https://brokeralarab.com/en/tools/leverage-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function EnglishLeverageCalculatorPage() {
  return <LeverageCalculatorClient />;
}