import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

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
      {
        source: "/how-to-start-trading-from-zero",
        destination: "/learn-trading/how-to-start-trading-from-zero",
        permanent: true,
      },
      {
        source: "/how-we-review",
        destination: "/how-we-review-brokers",
        permanent: true,
      },
      {
        source: "/en/how-we-review",
        destination: "/en/how-we-review-brokers",
        permanent: true,
      },
      {
        source: "/licenses/fsc",
        destination: "/licenses/fsc-bvi",
        permanent: true,
      },
      {
        source: "/en/licenses/fsc",
        destination: "/en/licenses/fsc-bvi",
        permanent: true,
      },

      // Redirect old Arabic URLs to the main Arabic structure
      {
        source: "/ar",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ar/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;