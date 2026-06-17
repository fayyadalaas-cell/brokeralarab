import type { Metadata } from "next";
import ProfitCalculatorClient from "./ProfitCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة الأرباح والخسائر",

  description:
    "احسب الربح أو الخسارة في الفوركس والذهب بناءً على سعر الدخول والخروج، نوع الصفقة، حجم اللوت، والعمولة. أداة مجانية لتقدير نتيجة الصفقة قبل التداول.",

  alternates: {
    canonical: "https://brokeralarab.com/tools/profit-calculator",
    languages: {
      ar: "https://brokeralarab.com/tools/profit-calculator",
      en: "https://brokeralarab.com/en/tools/profit-calculator",
      "x-default": "https://brokeralarab.com/en/tools/profit-calculator",
    },
  },

  openGraph: {
    title: "حاسبة الأرباح والخسائر",
    description:
      "احسب الربح والخسارة المتوقعة في الفوركس والذهب حسب سعر الدخول والخروج وحجم اللوت.",
    url: "https://brokeralarab.com/tools/profit-calculator",
    siteName: "Broker Al Arab",
    type: "website",
  },
};

export default function ProfitCalculatorPage() {
  return <ProfitCalculatorClient />;
}