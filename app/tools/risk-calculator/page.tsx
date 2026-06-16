import type { Metadata } from "next";
import RiskCalculatorClient from "./RiskCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة إدارة المخاطر في الفوركس والذهب",
  description:
    "احسب قيمة المخاطرة وحجم اللوت المناسب في الفوركس والذهب بناءً على رأس المال ونسبة المخاطرة ووقف الخسارة.",
  alternates: {
    canonical: "https://brokeralarab.com/tools/risk-calculator",
  },
};
export default function RiskCalculatorPage() {
  return <RiskCalculatorClient />;
}