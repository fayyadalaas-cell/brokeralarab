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
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #081224 0%, #0b1b35 50%, #102746 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-90px",
            width: "320px",
            height: "320px",
            borderRadius: "9999px",
            background: "rgba(245, 158, 11, 0.14)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-60px",
            width: "260px",
            height: "260px",
            borderRadius: "9999px",
            background: "rgba(16, 185, 129, 0.10)",
            display: "flex",
          }}
        />

        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 40px 56px 64px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "18px",
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
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Broker Review 2026
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 800,
              lineHeight: 1,
              color: "#ffffff",
              letterSpacing: "-1px",
              marginBottom: "22px",
            }}
          >
            {name}
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#f59e0b",
                color: "#111827",
                borderRadius: "18px",
                padding: "12px 22px",
                fontSize: "34px",
                fontWeight: 800,
                boxShadow: "0 12px 30px rgba(245, 158, 11, 0.22)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  color: "#ffffff",
                  fontSize: "30px",
                  lineHeight: 1,
                }}
              >
                
              </span>
              <span style={{ display: "flex" }}>{rating} / 5</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "29px",
              color: "#dbe4f0",
              marginBottom: "30px",
            }}
          >
            Fees • Platforms • Regulation
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "26px",
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

        <div
          style={{
            width: "40%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "44px 56px 44px 24px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "300px",
              height: "300px",
              borderRadius: "30px",
              background: "rgba(255,255,255,0.97)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {logo ? (
              <img
                src={logo}
                width="195"
                height="195"
                alt={name}
                style={{
                  objectFit: "contain",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  fontSize: "42px",
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