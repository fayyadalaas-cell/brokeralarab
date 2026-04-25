import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Broker AlArab",
    template: "%s | Broker AlArab",
  },
  description: "Best brokers and trading reviews on Broker AlArab.",
  metadataBase: new URL("https://brokeralarab.com"),

  // 🔥 hreflang
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      ar: "/",
      "x-default": "/",
    },
  },
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        {children}
      </body>
    </html>
  );
}