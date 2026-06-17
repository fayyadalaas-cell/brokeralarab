import type { Metadata } from "next";
import LotSizeCalculatorClient from "./LotSizeCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة حجم اللوت",

  description:
    "احسب حجم اللوت المناسب في الفوركس والذهب بناءً على رصيد الحساب، نسبة المخاطرة، وقف الخسارة، وقيمة النقطة. أداة مجانية لإدارة رأس المال وتحديد حجم الصفقة.",

  alternates: {
    canonical: "https://brokeralarab.com/tools/lot-size-calculator",
    languages: {
      ar: "https://brokeralarab.com/tools/lot-size-calculator",
      en: "https://brokeralarab.com/en/tools/lot-size-calculator",
      "x-default":
        "https://brokeralarab.com/en/tools/lot-size-calculator",
    },
  },

  openGraph: {
    title: "حاسبة حجم اللوت",

    description:
      "احسب حجم اللوت المناسب في الفوركس والذهب بناءً على نسبة المخاطرة ووقف الخسارة وقيمة النقطة.",

    url: "https://brokeralarab.com/tools/lot-size-calculator",

    siteName: "Broker Al Arab",

    type: "website",
  },
};

export default function LotSizeCalculatorPage() {
  return <LotSizeCalculatorClient />;
}