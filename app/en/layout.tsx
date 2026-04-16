import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Broker Al Arab",
    template: "%s | Broker Al Arab",
  },
  description: "Best brokers and trading reviews on Broker Al Arab.",
  metadataBase: new URL("https://brokeralarab.com"),
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}