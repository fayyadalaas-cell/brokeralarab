import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Broker AlArab",
    template: "%s | Broker AlArab",
  },
  description: "Best brokers and trading reviews on Broker AlArab.",
  metadataBase: new URL("https://brokeralarab.com"),
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}