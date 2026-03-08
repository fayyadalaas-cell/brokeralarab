import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
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
      url: "https://brokeralarab.com/best-brokers/jordan",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers/oman",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/best-brokers/qatar",
      lastModified: new Date(),
    },
  ];
}