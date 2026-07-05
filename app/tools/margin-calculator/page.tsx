import type { Metadata } from "next";
import MarginCalculatorClient from "./MarginCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة الهامش في الفوركس والذهب",

  description:
    "احسب الهامش المطلوب لفتح الصفقات في الفوركس والذهب بناءً على حجم اللوت والرافعة المالية والسعر الحالي. أداة مجانية لحساب الهامش وإدارة رأس المال.",

  alternates: {
    canonical: "https://brokeralarab.com/tools/margin-calculator",
  },

  openGraph: {
    title: "حاسبة الهامش في الفوركس والذهب",
    description:
      "احسب الهامش المطلوب وقيمة الصفقة الاسمية قبل فتح أي صفقة في الفوركس أو الذهب.",
    url: "https://brokeralarab.com/tools/margin-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function MarginCalculatorPage() {
  return <MarginCalculatorClient />;
}