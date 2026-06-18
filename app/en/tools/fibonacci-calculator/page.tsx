import type { Metadata } from "next";
import FibonacciCalculatorClient from "./FibonacciCalculatorClient";

export const metadata: Metadata = {
  title: "Fibonacci Retracement Calculator",
  description:
    "Calculate Fibonacci retracement and extension levels for Forex, stocks, indices, commodities, and cryptocurrencies. Identify potential support, resistance, pullback zones, and profit targets using Fibonacci trading levels.",
  alternates: {
    canonical:
      "https://brokeralarab.com/en/tools/fibonacci-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/fibonacci-calculator",
      ar: "https://brokeralarab.com/tools/fibonacci-calculator",
      "x-default":
        "https://brokeralarab.com/en/tools/fibonacci-calculator",
    },
  },
  openGraph: {
    title: "Fibonacci Retracement Calculator",
    description:
      "Free Fibonacci calculator for traders. Calculate retracement levels, extension levels, support and resistance zones, and potential price targets.",
    url: "https://brokeralarab.com/en/tools/fibonacci-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function FibonacciCalculatorPage() {
  return <FibonacciCalculatorClient />;
}