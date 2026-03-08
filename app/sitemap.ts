import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: brokers } = await supabase
    .from("brokers")
    .select("slug");

  const brokerPages =
    brokers?.map((b) => ({
      url: `https://brokeralarab.com/brokers/${b.slug}`,
      lastModified: new Date(),
    })) || [];

  return [
    {
      url: "https://brokeralarab.com",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/brokers",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/compare",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers",
      lastModified: new Date(),
    },

    {
      url: "https://brokeralarab.com/best-brokers/saudi-arabia",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers/uae",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers/kuwait",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers/egypt",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers/qatar",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers/jordan",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers/oman",
      lastModified: new Date(),
    },

    ...brokerPages,
  ];
}