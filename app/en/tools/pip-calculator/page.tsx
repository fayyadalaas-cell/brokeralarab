import type { Metadata } from "next";
import PipCalculatorClient from "./PipCalculatorClient";

export const metadata: Metadata = {
  title: "Forex Pip Value Calculator",

  description:
    "Calculate pip value for forex pairs and gold using lot size, contract size, and current market price. Free pip value calculator for risk management and trade planning.",

  alternates: {
    canonical: "https://brokeralarab.com/en/tools/pip-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/pip-calculator",
      ar: "https://brokeralarab.com/tools/pip-calculator",
      "x-default": "https://brokeralarab.com/en/tools/pip-calculator",
    },
  },

  openGraph: {
    title: "Forex Pip Value Calculator",
    description:
      "Calculate the value of one pip in forex and gold trading based on lot size, contract size, and current market price.",
    url: "https://brokeralarab.com/en/tools/pip-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function EnglishPipCalculatorPage() {
  return <PipCalculatorClient />;
}