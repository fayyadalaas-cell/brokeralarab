import type { Metadata } from "next";
import LeverageCalculatorClient from "./LeverageCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة الرافعة المالية",

  description:
    "احسب الرافعة المالية الفعلية، قيمة الصفقة، والهامش المطلوب في الفوركس والذهب بناءً على رصيد الحساب، حجم اللوت، والرافعة المختارة.",

  alternates: {
    canonical: "https://brokeralarab.com/tools/leverage-calculator",
    languages: {
      ar: "https://brokeralarab.com/tools/leverage-calculator",
      en: "https://brokeralarab.com/en/tools/leverage-calculator",
      "x-default": "https://brokeralarab.com/en/tools/leverage-calculator",
    },
  },

  openGraph: {
    title: "حاسبة الرافعة المالية",
    description:
      "احسب الرافعة الفعلية والهامش المطلوب وقيمة الصفقة في الفوركس والذهب.",
    url: "https://brokeralarab.com/tools/leverage-calculator",
    siteName: "Broker Al Arab",
    type: "website",
  },
};

export default function LeverageCalculatorPage() {
  return <LeverageCalculatorClient />;
}