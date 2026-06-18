import type { Metadata } from "next";
import CompoundCalculatorClient from "./CompoundCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة الفائدة المركبة",

  description:
    "احسب نمو رأس المال باستخدام الفائدة المركبة مع الإيداعات الشهرية وإعادة استثمار الأرباح. أداة مجانية لحساب الاستثمار المركب ونمو الحساب.",

  alternates: {
    canonical: "https://brokeralarab.com/tools/compound-calculator",
    languages: {
      ar: "https://brokeralarab.com/tools/compound-calculator",
      en: "https://brokeralarab.com/en/tools/compound-calculator",
      "x-default": "https://brokeralarab.com/en/tools/compound-calculator",
    },
  },

  openGraph: {
    title: "حاسبة الفائدة المركبة",
    description:
      "احسب الرصيد النهائي ونمو رأس المال مع إعادة استثمار الأرباح والإيداعات الشهرية.",
    url: "https://brokeralarab.com/tools/compound-calculator",
    siteName: "Broker Al Arab",
    type: "website",
  },
};

export default function CompoundCalculatorPage() {
  return <CompoundCalculatorClient />;
}