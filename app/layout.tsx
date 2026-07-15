import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cairo } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import HeaderSwitcher from "@/app/components/HeaderSwitcher";
import FooterSwitcher from "@/app/components/FooterSwitcher";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "بروكر العرب",
    template: "%s | بروكر العرب",
  },
  description:
    "بروكر العرب يقدم تقييمات ومقارنات شاملة لأفضل شركات التداول، مع تحليل التراخيص، الرسوم، والمنصات لمساعدة المتداول العربي على اختيار الوسيط المناسب بثقة.",
  metadataBase: new URL("https://brokeralarab.com"),

  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      en: "/en",
      "x-default": "/",
    },
  },

  verification: {
    google: "eivw8RsaxU2SPjyhov7RFqS8gdAM0VTN8YsmxQncXm4",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

type BrokerMenuItem = {
  name: string;
  name_en?: string;
  slug: string;
  menuLogo: string;
};

type MenuLink = {
  href: string;
  label: string;
  label_en?: string;
};

type CountryMenuItem = {
  href: string;
  label: string;
  label_en?: string;
  shortLabel: string;
  shortLabel_en?: string;
  flag: string;
};

type LearnTradingMenuItem = {
  href: string;
  title: string;
  description: string;
  image: string;
  isFeatured?: boolean;
};

const brokerLogoMap: Record<string, string> = {
  activtrades: "/brokers/activtrade.png",
  alpari: "/brokers/alpari.png",
  avatrade: "/brokers/avatrade.png",
  activtrade: "/brokers/activtrade.png",
  equiti: "/brokers/equiti.png",
  exness: "/brokers/exness.png",
  "exness-platform": "/brokers/exness-platform.png",
  fxpro: "/brokers/FxPro.png",
  "ic-markets": "/brokers/ic-markets.png",
  justmarkets: "/brokers/justmarkets.png",
  justmarket: "/brokers/justmarket.png",
  "just-markets": "/brokers/justmarkets.png",
  pepperstone: "/brokers/pepperstone.png",
  vantage: "/brokers/vantage.png",
  xm: "/brokers/xm.png",
  xs: "/brokers/xs.png",
};

const countryMenuItems: CountryMenuItem[] = [
  {
    href: "/best-brokers/saudi-arabia",
    label: "أفضل الوسطاء في السعودية",
    shortLabel: "السعودية",
    flag: "/flags/sa.svg",
  },
  {
    href: "/best-brokers/uae",
    label: "أفضل الوسطاء في الإمارات",
    shortLabel: "الإمارات",
    flag: "/flags/ae.svg",
  },
  {
    href: "/best-brokers/egypt",
    label: "أفضل الوسطاء في مصر",
    shortLabel: "مصر",
    flag: "/flags/eg.svg",
  },
  {
    href: "/best-brokers/jordan",
    label: "أفضل الوسطاء في الأردن",
    shortLabel: "الأردن",
    flag: "/flags/jo.svg",
  },
  {
    href: "/best-brokers/kuwait",
    label: "أفضل الوسطاء في الكويت",
    shortLabel: "الكويت",
    flag: "/flags/kw.svg",
  },
  {
    href: "/best-brokers/qatar",
    label: "أفضل الوسطاء في قطر",
    shortLabel: "قطر",
    flag: "/flags/qa.svg",
  },
  {
    href: "/best-brokers/bahrain",
    label: "أفضل الوسطاء في البحرين",
    shortLabel: "البحرين",
    flag: "/flags/bh.svg",
  },
  {
    href: "/best-brokers/oman",
    label: "أفضل الوسطاء في عُمان",
    shortLabel: "عُمان",
    flag: "/flags/om.svg",
  },
];

const featuredCategories: MenuLink[] = [
  { href: "/best-brokers", label: "أفضل الوسطاء في 2026" },
  { href: "/lowest-spread-brokers", label: "شركات التداول الأقل سبريد" },
  { href: "/best-brokers/gold", label: "أفضل منصات تداول الذهب" },
  { href: "/compare", label: "أفضل المقارنات بين الوسطاء" },
];

const featuredComparisons: MenuLink[] = [
  { href: "/compare/exness-vs-xm", label: "Exness vs XM" },
  { href: "/compare/fxpro-vs-avatrade", label: "Fxpro vs AvaTrade" },
  { href: "/compare/xm-vs-pepperstone", label: "XM vs Pepperstone" },
  { href: "/compare/alpari-vs-xs", label: "Alpari vs XS" },
  { href: "/compare/equiti-vs-vantage", label: "Equiti vs Vantage" },
];

const learnTradingMenuItems: LearnTradingMenuItem[] = [
  {
    href: "/learn-trading/how-to-start-trading-from-zero",
    title: "كيف تبدأ التداول من الصفر خطوة بخطوة",
    description: "دليل عملي للمبتدئ لفهم الأساسيات واختيار الوسيط المناسب.",
    image: "/articles/how-to-start-trading-from-zero.png",
    isFeatured: true,
  },
];

function getBrokerLogo(slug: string): string {
  return brokerLogoMap[slug] || "/brokers/BrokerLogo.png";
}

async function getTopBrokers(): Promise<BrokerMenuItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const query =
    "select=name,name_en,slug,rating&slug=not.is.null&order=rating.desc&limit=5";

  const response = await fetch(
    `${supabaseUrl}/rest/v1/brokers?${query}`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      next: {
        revalidate: 3600,
        tags: ["header-top-brokers"],
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Failed to load header brokers:",
      response.status,
      response.statusText
    );
    return [];
  }

  const brokersData: Array<{
    name: string | null;
    name_en: string | null;
    slug: string | null;
    rating: number | null;
  }> = await response.json();

  return brokersData
    .filter(
      (
        broker
      ): broker is {
        name: string;
        name_en: string | null;
        slug: string;
        rating: number | null;
      } => Boolean(broker.name && broker.slug)
    )
    .map((broker) => ({
      name: broker.name,
      name_en: broker.name_en ?? undefined,
      slug: broker.slug,
      menuLogo: getBrokerLogo(broker.slug),
    }));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const headersList = await headers();
const pathname = headersList.get("x-pathname") || "";

const isEnglish = pathname.startsWith("/en");
const isArabicHome = !isEnglish && (pathname === "/" || pathname === "");

const topBrokers = await getTopBrokers();

  return (
    <html lang={isEnglish ? "en" : "ar"} dir={isEnglish ? "ltr" : "rtl"}>
      <head>
      {/* Organization Schema */}
<Script
  id="organization-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://brokeralarab.com/#organization",

      name: "Broker AlArab",

      alternateName: [
        "Broker Alarab",
        "بروكر العرب"
      ],

      url: "https://brokeralarab.com",

      mainEntityOfPage: "https://brokeralarab.com/about",

      logo: {
        "@type": "ImageObject",
        url: "https://brokeralarab.com/brokers/BrokerLogo.png",
      },

      email: "info@brokeralarab.com",

      sameAs: [
        "https://www.facebook.com/BrokerAlArab",
        "https://x.com/brokeralarab"
      ],

      description:
        "Broker AlArab is an independent bilingual broker review and comparison platform helping traders compare forex brokers, broker regulation, trading platforms, account types, trading fees, investor protection, and trading tools in Arabic and English.",

      availableLanguage: [
        "Arabic",
        "English"
      ],

      areaServed: [
        "Saudi Arabia",
        "United Arab Emirates",
        "Kuwait",
        "Qatar",
        "Bahrain",
        "Oman",
        "Jordan",
        "Egypt",
        "Iraq",
        "Syria",
        "Libya"
      ],

      knowsAbout: [
        "Forex broker reviews",
        "Broker comparisons",
        "Broker regulation",
        "License verification",
        "Trading account types",
        "Trading platforms",
        "Trading calculators",
        "Investor protection",
        "Forex trading",
        "CFD trading",
        "Gold trading"
      ]
    }),
  }}
/>

{/* WebSite Schema */}
<Script
  id="website-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://brokeralarab.com/#website",
      url: "https://brokeralarab.com",
      name: "Broker AlArab",
      alternateName: [
        "Broker Alarab",
        "بروكر العرب"
      ],
      publisher: {
        "@id": "https://brokeralarab.com/#organization"
      },
      inLanguage: [
        "ar",
        "en"
      ],
      description:
        "Broker AlArab is an independent bilingual broker review and comparison website covering forex brokers, broker regulation, trading platforms, account types, fees, investor protection, and trading tools."
    }),
  }}
/>

        {/* Google Analytics */}
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-4V7MN48JS7"
  strategy="afterInteractive"
/>

<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-4V7MN48JS7');
    `,
  }}
/>

<Script
  id="microsoft-clarity"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "vvwf1elkgo");
    `,
  }}
/>

      </head>

      <body
        className={`${cairo.variable} bg-[#f4f7fb] font-sans text-[#0f172a] antialiased`}
      >
       <HeaderSwitcher
  wide
  topBrokers={topBrokers}
  countryMenuItems={countryMenuItems}
  featuredCategories={featuredCategories}
  featuredComparisons={featuredComparisons}
  learnTradingMenuItems={learnTradingMenuItems}
/>

        <main>{children}</main>

        <FooterSwitcher />
      </body>
    </html>
  );
}