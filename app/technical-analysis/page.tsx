
import type { Metadata } from "next";
import TechnicalAnalysisHub, {
  type TechnicalRow,
  type GoldReport,
} from "./TechnicalAnalysisHubClient";

/* =========================================================
   SEO METADATA — TECHNICAL ANALYSIS HUB
========================================================= */

export const metadata: Metadata = {
  title: "التحليل الفني للعملات والذهب والفضة اليوم",

  description:
    "تابع التحليل الفني للفوركس والذهب والفضة، واكتشف إشارات الشراء والبيع ومؤشرات RSI وADX عبر 7 أطر زمنية، مع ماسح العملات وخريطة الاتجاهات والمقارنة بين الأزواج.",

  alternates: {
    canonical: "https://brokeralarab.com/technical-analysis",
  },

  openGraph: {
    title: "التحليل الفني للعملات والذهب والفضة اليوم",
    description:
      "تحليل فني للفوركس والذهب والفضة مع ماسح العملات والمؤشرات الفنية وإشارات الشراء والبيع ومقارنة اتجاهات السوق.",
    url: "https://brokeralarab.com/technical-analysis",
    type: "website",
    siteName: "بروكر العرب",
    locale: "ar_AR",
    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 820,
        alt: "التحليل الفني للعملات والذهب والفضة",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "التحليل الفني للعملات والذهب والفضة اليوم",
    description:
      "تحليل فني للفوركس والذهب والفضة، مع إشارات الشراء والبيع ومقارنة الاتجاهات الفنية.",
    images: ["https://brokeralarab.com/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   PAGE
========================================================= */


/* =========================================================
   SERVER-SIDE TECHNICAL ANALYSIS DATA
   Provides real analysis in initial HTML for SEO
========================================================= */

async function getInitialTechnicalAnalysis(): Promise<{
  rows: TechnicalRow[];
  gold: GoldReport | null;
}> {
  const emptyResult = {
    rows: [] as TechnicalRow[],
    gold: null as GoldReport | null,
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return emptyResult;
  }

  try {
    const base = url.replace(/\/$/, "");

    const headers = {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
    };

    const [technicalResponse, goldResponse] =
      await Promise.all([
        fetch(
          `${base}/rest/v1/broker_technical_analysis_latest?select=*&limit=400`,
          {
            headers,
            cache: "no-store",
          }
        ),

        fetch(
          `${base}/rest/v1/broker_gold_analysis_latest?select=analysis&symbol=eq.XAUUSDc&limit=1`,
          {
            headers,
            cache: "no-store",
          }
        ),
      ]);

    const rows: TechnicalRow[] =
      technicalResponse.ok
        ? await technicalResponse.json()
        : [];

    const goldData: Array<{
      analysis?: GoldReport;
    }> = goldResponse.ok
      ? await goldResponse.json()
      : [];

    return {
      rows: Array.isArray(rows) ? rows : [],
      gold: Array.isArray(goldData)
        ? goldData[0]?.analysis ?? null
        : null,
    };
  } catch (error) {
    console.error(
      "Server-side technical analysis fetch failed:",
      error
    );

    return emptyResult;
  }
}

/* =========================================================
   SERVER PAGE
========================================================= */

export default async function TechnicalAnalysisPage() {
  const { rows, gold } =
    await getInitialTechnicalAnalysis();

  return (
    <TechnicalAnalysisHub
      initialRows={rows}
      initialGold={gold}
    />
  );
}

