import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: broker } = await supabase
    .from("brokers")
    .select("name, rating, logo")
    .eq("slug", slug)
    .maybeSingle();

  const name = broker?.name || "Broker";
  const rating = broker?.rating || 0;

  const siteUrl = "https://brokeralarab.com";

  const rawLogo = broker?.logo || "";
  const logo = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : `${siteUrl}${rawLogo.startsWith("/") ? rawLogo : `/${rawLogo}`}`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "Arial",
        }}
      >
        {/* Left section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "700px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            {name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 36,
              color: "#f59e0b",
              fontWeight: 700,
            }}
          >
            ⭐ {rating} / 5
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 50,
              fontSize: 28,
              color: "#64748b",
            }}
          >
            brokeralarab.com
          </div>
        </div>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            width: "260px",
            height: "260px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "24px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          {logo ? (
            <img
              src={logo}
              width="200"
              height="200"
              style={{ objectFit: "contain" }}
              alt={name}
            />
          ) : (
            <div style={{ fontSize: 40 }}>{name}</div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}