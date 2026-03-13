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
  const rating = broker?.rating ?? 0;

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
          position: "relative",
          background: "linear-gradient(135deg, #0f172a 0%, #111827 55%, #1e293b 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* soft glow */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            left: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "9999px",
            background: "rgba(245, 158, 11, 0.16)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "9999px",
            background: "rgba(16, 185, 129, 0.10)",
            display: "flex",
          }}
        />

        {/* left content */}
        <div
          style={{
            width: "68%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "68px 64px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#e5e7eb",
                borderRadius: "999px",
                padding: "10px 18px",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              Broker Review 2026
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "78px",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "26px",
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            {name}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f59e0b",
                color: "#111827",
                borderRadius: "18px",
                padding: "12px 20px",
                fontSize: "34px",
                fontWeight: 800,
              }}
            >
              {`⭐ ${rating} / 5`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "30px",
              color: "#cbd5e1",
              marginBottom: "46px",
            }}
          >
            Fees • Platforms • Regulation
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "28px",
              color: "#94a3b8",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#10b981",
              }}
            />
            brokeralarab.com
          </div>
        </div>

        {/* right panel */}
        <div
          style={{
            width: "32%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px 48px 50px 0",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "290px",
              height: "290px",
              borderRadius: "30px",
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {logo ? (
              <img
                src={logo}
                width="190"
                height="190"
                alt={name}
                style={{
                  objectFit: "contain",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  fontSize: "44px",
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                {name}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}