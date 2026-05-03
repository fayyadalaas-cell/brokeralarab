import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadArabicFont() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&display=swap"
  ).then((res) => res.text());

  const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1];
  if (!fontUrl) return null;

  return await fetch(fontUrl).then((res) => res.arrayBuffer());
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: broker } = await supabase
    .from("brokers")
    .select("name, name_en, rating, logo")
    .eq("slug", slug)
    .maybeSingle();

  const arName = broker?.name || "وسيط";
  const displayName = broker?.name_en || broker?.name || "Broker";
  const rating = broker?.rating ?? 0;

  const siteUrl = "https://brokeralarab.com";
  const rawLogo = broker?.logo || "";
  const logo = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : `${siteUrl}${rawLogo.startsWith("/") ? rawLogo : `/${rawLogo}`}`
    : "";

  const arabicFont = await loadArabicFont();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #eef6ff 0%, #f8fafc 45%, #ffffff 100%)",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "ArabicFont",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "1080px",
            height: "510px",
            background: "#ffffff",
            borderRadius: "36px",
            border: "1px solid #dbeafe",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "35%",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)",
              borderRight: "1px solid #dbeafe",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "300px",
                height: "360px",
                borderRadius: "36px",
                background: "#ffffff",
                border: "1px solid #dbeafe",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "225px",
                  height: "225px",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f8fafc",
                  borderRadius: "30px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "26px",
                }}
              >
                {logo ? (
                  <img
                    src={logo}
                    width="170"
                    height="170"
                    alt={displayName}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <div style={{ display: "flex", fontSize: "34px", fontWeight: 900 }}>
                    {displayName}
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: 900,
                  direction: "rtl",
                }}
              >
                {arName}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "65%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "32px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: "#ecfdf5",
                  color: "#047857",
                  border: "1px solid #bbf7d0",
                  borderRadius: "999px",
                  padding: "10px 18px",
                  fontSize: "20px",
                  fontWeight: 800,
                  marginRight: "12px",
                }}
              >
                Independent Analysis
              </div>

              <div
                style={{
                  display: "flex",
                  background: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                  borderRadius: "999px",
                  padding: "10px 18px",
                  fontSize: "20px",
                  fontWeight: 800,
                }}
              >
                Broker Review 2026
              </div>
            </div>

          <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      display: "flex",
      fontSize: "56px",
      fontWeight: 900,
      lineHeight: 1,
      direction: "rtl",
      marginRight: "18px",
    }}
  >
  </div>

  <div
    style={{
      display: "flex",
      fontSize: displayName.length > 14 ? "54px" : "72px",
      fontWeight: 900,
      lineHeight: 1,
      direction: "ltr",
    }}
  >
    {displayName}
  </div>
</div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginBottom: "34px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: "#0f172a",
                  color: "#ffffff",
                  borderRadius: "18px",
                  padding: "14px 22px",
                  fontSize: "32px",
                  fontWeight: 900,
                  marginRight: "12px",
                }}
              >
                {rating}/5
              </div>

              <div
                style={{
                  display: "flex",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  color: "#334155",
                  borderRadius: "18px",
                  padding: "14px 22px",
                  fontSize: "23px",
                  fontWeight: 800,
                  direction: "rtl",
                }}
              >
                التقييم
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                fontSize: "23px",
                fontWeight: 900,
                color: "#2563eb",
              }}
            >
              brokeralarab.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: arabicFont
        ? [{ name: "ArabicFont", data: arabicFont, weight: 900, style: "normal" }]
        : [],
    }
  );
}