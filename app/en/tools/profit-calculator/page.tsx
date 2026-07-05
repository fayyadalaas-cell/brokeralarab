import type { Metadata } from "next";
import ProfitCalculatorClient from "./ProfitCalculatorClient";

export const metadata: Metadata = {
  title: "Forex Profit and Loss Calculator",

  description:
    "Calculate forex and gold profit or loss using entry price, exit price, trade direction, lot size, and fees. Free P&L calculator for trade planning.",

  alternates: {
    canonical: "https://brokeralarab.com/en/tools/profit-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/profit-calculator",
      ar: "https://brokeralarab.com/tools/profit-calculator",
      "x-default": "https://brokeralarab.com/en/tools/profit-calculator",
    },
  },

  openGraph: {
    title: "Forex Profit and Loss Calculator",
    description:
      "Calculate estimated profit, loss, pips, and account impact for forex and gold trades.",
    url: "https://brokeralarab.com/en/tools/profit-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function EnglishProfitCalculatorPage() {
  return <ProfitCalculatorClient />;
}