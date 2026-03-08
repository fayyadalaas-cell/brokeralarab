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
      url: "https://brokeralarab.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/contact",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://brokeralarab.com/terms",
      lastModified: new Date(),
    },
  ];
}