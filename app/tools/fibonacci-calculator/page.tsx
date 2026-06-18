import type { Metadata } from "next";
import FibonacciCalculatorClient from "./FibonacciCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة فيبوناتشي للتداول",
  description:
    "احسب مستويات فيبوناتشي للتصحيح والامتداد بناءً على أعلى سعر وأدنى سعر، مع شرح مبسط لاستخدام Fibonacci في التحليل الفني وإدارة الصفقات.",
  alternates: {
    canonical: "https://brokeralarab.com/tools/fibonacci-calculator",
    languages: {
      ar: "https://brokeralarab.com/tools/fibonacci-calculator",
      en: "https://brokeralarab.com/en/tools/fibonacci-calculator",
      "x-default": "https://brokeralarab.com/tools/fibonacci-calculator",
    },
  },
  openGraph: {
    title: "حاسبة فيبوناتشي للتداول",
    description:
      "أداة مجانية لحساب مستويات Fibonacci retracement وFibonacci extension للمتداولين في الفوركس والأسهم والذهب والمؤشرات.",
    url: "https://brokeralarab.com/tools/fibonacci-calculator",
    siteName: "Broker Alarab",
    type: "website",
  },
};

export default function FibonacciCalculatorPage() {
  return <FibonacciCalculatorClient />;
}