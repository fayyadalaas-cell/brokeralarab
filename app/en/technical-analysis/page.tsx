
import type { Metadata } from "next";

import TechnicalAnalysisHub, {
  type TechnicalRow,
  type GoldReport,
} from "./TechnicalAnalysisHubClient";

/* ============================================================
   BROKER ALARAB — ENGLISH TECHNICAL ANALYSIS HUB

   Route: /en/technical-analysis

   SEO:
   - English metadata
   - Self canonical
   - Arabic / English hreflang
   - Server-rendered initial analysis
   - No fabricated market data

   Broker Alarab is appended by the root metadata
   title template when configured.
============================================================ */

const BASE_URL = "https://brokeralarab.com";

const PAGE_URL = `${BASE_URL}/en/technical-analysis`;

const ARABIC_URL = `${BASE_URL}/technical-analysis`;

const SEO_TITLE =
  "Forex, Gold & Silver Technical Analysis | Signals & Indicators";

const SEO_DESCRIPTION =
  "Explore forex, gold and silver technical analysis across 7 timeframes. Compare RSI, MACD and ADX signals, support and resistance, pivot points and market trends.";

/* ============================================================
   ENGLISH SEO METADATA
============================================================ */

export const metadata: Metadata = {
  title: SEO_TITLE,

  description: SEO_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,

    languages: {
      "en": PAGE_URL,
      "ar": ARABIC_URL,
      "x-default": PAGE_URL,
    },
  },

  openGraph: {
    title: SEO_TITLE,

    description:
      "Explore forex and precious metals technical analysis with trend indicators, market scanners, support and resistance levels, pivot points and multi-timeframe comparisons.",

    url: PAGE_URL,

    type: "website",

    siteName: "Broker Alarab",

    locale: "en_US",

    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1560,
        height: 820,
        alt: "Forex, Gold and Silver Technical Analysis — Broker Alarab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: SEO_TITLE,

    description:
      "Forex, gold and silver technical analysis across 7 timeframes, including indicators, trend signals, pivot points and market comparisons.",

    images: [`${BASE_URL}/og-image.png`],
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

/* ============================================================
   SERVER-SIDE TECHNICAL ANALYSIS DATA

   Sources:
   public.broker_technical_analysis_latest
   public.broker_gold_analysis_latest

   Same database and calculations as the Arabic hub.

   Data is loaded on the server so the page can
   deliver meaningful initial HTML to search engines.
============================================================ */

type InitialTechnicalAnalysis = {
  rows: TechnicalRow[];
  gold: GoldReport | null;
};

async function getInitialTechnicalAnalysis(): Promise<InitialTechnicalAnalysis> {
  const emptyResult: InitialTechnicalAnalysis = {
    rows: [],
    gold: null,
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
            method: "GET",
            headers,
            cache: "no-store",
          }
        ),

        fetch(
          `${base}/rest/v1/broker_gold_analysis_latest?select=analysis&symbol=eq.XAUUSDc&limit=1`,
          {
            method: "GET",
            headers,
            cache: "no-store",
          }
        ),
      ]);

    if (!technicalResponse.ok) {
      throw new Error(
        `Technical analysis request failed: ${technicalResponse.status}`
      );
    }

    const technicalData: unknown =
      await technicalResponse.json();

    const rows: TechnicalRow[] =
      Array.isArray(technicalData)
        ? (technicalData as TechnicalRow[])
        : [];

    let gold: GoldReport | null = null;

    if (goldResponse.ok) {
      const goldData: unknown =
        await goldResponse.json();

      if (Array.isArray(goldData)) {
        const first = goldData[0] as
          | { analysis?: GoldReport | null }
          | undefined;

        gold = first?.analysis ?? null;
      }
    }

    return {
      rows,
      gold,
    };

  } catch (error) {
    console.error(
      "English technical analysis SSR fetch failed:",
      error
    );

    return emptyResult;
  }
}

/* ============================================================
   SERVER PAGE

   Initial rows are passed into the interactive
   English dashboard.

   Additional live quote and technical levels
   requests remain inside the client component.
============================================================ */

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
