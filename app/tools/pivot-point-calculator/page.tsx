import type { Metadata } from "next";
import PivotPointCalculatorClient from "./PivotPointCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة نقاط الارتكاز Pivot Point",
  description:
    "احسب نقاط الارتكاز Pivot Point ومستويات الدعم والمقاومة R1 وR2 وR3 وS1 وS2 وS3 بناءً على أعلى سعر وأدنى سعر وسعر الإغلاق، مع شرح طريقة استخدامها في التداول اليومي.",
  alternates: {
    canonical: "https://brokeralarab.com/tools/pivot-point-calculator",
    languages: {
      ar: "https://brokeralarab.com/tools/pivot-point-calculator",
      en: "https://brokeralarab.com/en/tools/pivot-point-calculator",
      "x-default": "https://brokeralarab.com/tools/pivot-point-calculator",
    },
  },
  openGraph: {
    title: "حاسبة نقاط الارتكاز Pivot Point",
    description:
      "أداة مجانية لحساب Pivot Point ومستويات الدعم والمقاومة للمتداولين في الفوركس والذهب والأسهم والمؤشرات.",
    url: "https://brokeralarab.com/tools/pivot-point-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function PivotPointCalculatorPage() {
  return <PivotPointCalculatorClient />;
}