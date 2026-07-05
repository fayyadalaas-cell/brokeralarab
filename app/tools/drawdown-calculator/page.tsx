import type { Metadata } from "next";
import DrawdownCalculatorClient from "./DrawdownCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة السحب في التداول",

  description:
    "احسب السحب في حساب التداول، الرصيد المتبقي بعد الخسارة، ونسبة الربح المطلوبة للعودة إلى نقطة التعادل. أداة مجانية لإدارة المخاطر.",

  alternates: {
    canonical: "https://brokeralarab.com/tools/drawdown-calculator",
    languages: {
      ar: "https://brokeralarab.com/tools/drawdown-calculator",
      en: "https://brokeralarab.com/en/tools/drawdown-calculator",
      "x-default": "https://brokeralarab.com/en/tools/drawdown-calculator",
    },
  },

  openGraph: {
    title: "حاسبة السحب في التداول",
    description:
      "احسب الرصيد المتبقي بعد الخسارة ونسبة الربح المطلوبة للتعافي من السحب.",
    url: "https://brokeralarab.com/tools/drawdown-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function DrawdownCalculatorPage() {
  return <DrawdownCalculatorClient />;
}