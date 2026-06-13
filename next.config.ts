import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/en/terms",
        destination: "/en/terms-and-conditions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;