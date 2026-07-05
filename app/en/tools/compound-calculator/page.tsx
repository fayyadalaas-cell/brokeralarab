import type { Metadata } from "next";
import CompoundCalculatorClient from "./CompoundCalculatorClient";

export const metadata: Metadata = {
  title: "Compound Interest Calculator",

  description:
    "Calculate compound interest, investment growth, future value, monthly contributions, and portfolio growth over time. Free compound interest calculator for investors and traders.",

  alternates: {
    canonical: "https://brokeralarab.com/en/tools/compound-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/compound-calculator",
      ar: "https://brokeralarab.com/tools/compound-calculator",
      "x-default": "https://brokeralarab.com/en/tools/compound-calculator",
    },
  },

  openGraph: {
    title: "Compound Interest Calculator",
    description:
      "Estimate future value, compound growth, total profit, and monthly investment growth over time.",
    url: "https://brokeralarab.com/en/tools/compound-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function EnglishCompoundCalculatorPage() {
  return <CompoundCalculatorClient />;
}