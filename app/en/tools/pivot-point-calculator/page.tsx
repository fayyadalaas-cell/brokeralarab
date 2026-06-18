import type { Metadata } from "next";
import PivotPointCalculatorClient from "./PivotPointCalculatorClient";

export const metadata: Metadata = {
  title: "Pivot Point Calculator",
  description:
    "Calculate Pivot Points, support levels, and resistance levels using the classic Pivot Point formula. Identify PP, R1, R2, R3, S1, S2, and S3 levels for Forex, stocks, gold, indices, and cryptocurrency trading.",
  alternates: {
    canonical:
      "https://brokeralarab.com/en/tools/pivot-point-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/pivot-point-calculator",
      ar: "https://brokeralarab.com/tools/pivot-point-calculator",
      "x-default":
        "https://brokeralarab.com/en/tools/pivot-point-calculator",
    },
  },
  openGraph: {
    title: "Pivot Point Calculator",
    description:
      "Free Pivot Point Calculator for traders. Calculate PP, R1, R2, R3, S1, S2, and S3 levels to identify potential support, resistance, breakout zones, and trading opportunities.",
    url: "https://brokeralarab.com/en/tools/pivot-point-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function PivotPointCalculatorPage() {
  return <PivotPointCalculatorClient />;
}