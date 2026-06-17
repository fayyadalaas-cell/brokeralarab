import type { Metadata } from "next";
import PipCalculatorClient from "./PipCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة قيمة النقطة في الفوركس والذهب",

  description:
    "احسب قيمة النقطة في الفوركس والذهب حسب حجم اللوت، نوع الأصل المالي، السعر الحالي، وحجم العقد. أداة مجانية لتقدير الربح والخسارة قبل فتح الصفقة.",

  alternates: {
    canonical: "https://brokeralarab.com/tools/pip-calculator",
  },

  openGraph: {
    title: "حاسبة قيمة النقطة في الفوركس والذهب",
    description:
      "احسب قيمة النقطة بالدولار لأزواج الفوركس والذهب بناءً على حجم اللوت والسعر الحالي.",
    url: "https://brokeralarab.com/tools/pip-calculator",
    siteName: "Broker Al Arab",
    type: "website",
  },
};

export default function PipCalculatorPage() {
  return <PipCalculatorClient />;
}