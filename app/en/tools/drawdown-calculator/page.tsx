import type { Metadata } from "next";
import DrawdownCalculatorClient from "./DrawdownCalculatorClient";

export const metadata: Metadata = {
  title: "Forex Drawdown Calculator",

  description:
    "Calculate trading drawdown, remaining account balance, and recovery percentage required to return to break-even. Free Forex Drawdown Calculator for traders and investors.",

  alternates: {
    canonical: "https://brokeralarab.com/en/tools/drawdown-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/drawdown-calculator",
      ar: "https://brokeralarab.com/tools/drawdown-calculator",
      "x-default":
        "https://brokeralarab.com/en/tools/drawdown-calculator",
    },
  },

  openGraph: {
    title: "Forex Drawdown Calculator",

    description:
      "Calculate drawdown, remaining balance, and the percentage return required to recover from trading losses.",

    url: "https://brokeralarab.com/en/tools/drawdown-calculator",

    siteName: "Broker Al Arab",

    type: "website",
  },
};

export default function EnglishDrawdownCalculatorPage() {
  return <DrawdownCalculatorClient />;
}