import type { Metadata } from "next";
import RiskCalculatorClient from "./RiskCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة إدارة المخاطر في التداول | حساب حجم الصفقة واللوت | بروكر العرب",
  description:
    "استخدم حاسبة إدارة المخاطر من بروكر العرب لحساب قيمة المخاطرة وحجم اللوت المناسب في الفوركس والذهب بناءً على رأس المال، نسبة المخاطرة، ووقف الخسارة.",
  alternates: {
    canonical: "https://brokeralarab.com/tools/risk-calculator",
  },
};

export default function RiskCalculatorPage() {
  return <RiskCalculatorClient />;
}