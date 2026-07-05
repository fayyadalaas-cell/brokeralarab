import type { Metadata } from "next";
import LotSizeCalculatorClient from "../LotSizeCalculatorClient";

export const metadata: Metadata = {
  title: "Forex Lot Size Calculator",

  description:
    "Calculate the optimal forex lot size based on account balance, risk percentage, stop-loss distance, and pip value. Free position size calculator for forex and gold trading.",

  alternates: {
    canonical: "https://brokeralarab.com/en/tools/lot-size-calculator",
    languages: {
      en: "https://brokeralarab.com/en/tools/lot-size-calculator",
      ar: "https://brokeralarab.com/tools/lot-size-calculator",
      "x-default":
        "https://brokeralarab.com/en/tools/lot-size-calculator",
    },
  },

  openGraph: {
    title: "Forex Lot Size Calculator",

    description:
      "Calculate position size, risk exposure, and recommended lot size for forex and gold trades.",

    url: "https://brokeralarab.com/en/tools/lot-size-calculator",

    siteName: "Broker Alarab",

    type: "website",
  },
};

export default function EnglishLotSizeCalculatorPage() {
  return <LotSizeCalculatorClient />;
}