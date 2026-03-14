import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function normalizeLogo(siteUrl: string, rawLogo: string | null | undefined) {
  if (!rawLogo) return "";
  if (rawLogo.startsWith("http")) return rawLogo;
  return `${siteUrl}${rawLogo.startsWith("/") ? rawLogo : `/${rawLogo}`}`;
}

function formatRating(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return Number(value).toFixed(1);
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [leftSlug, rightSlug] = slug.split("-vs-");

  const siteUrl = "https://brokeralarab.com";

  if (!leftSlug || !rightSlug) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b1b35",
            color: "#fff",
            fontSize: "42px",
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
          }}
        >
          Broker Comparison
        </div>
      ),
      { ...size }
    );
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("name, slug, rating, logo")
    .in("slug", [leftSlug, rightSlug]);

  const brokers =
    (data as
      | {
          name: string | null;
          slug: string | null;
          rating: number | null;
          logo: string | null;
        }[]
      | null) ?? [];

  const left = brokers.find((b) => b.slug === leftSlug);
  const right = brokers.find((b) => b.slug === rightSlug);

  const leftName = left?.name || leftSlug;
  const rightName = right?.name || rightSlug;

  const leftRating = left?.rating ?? null;
  const rightRating = right?.rating ?? null;

  const leftLogo = normalizeLogo(siteUrl, left?.logo);
  const rightLogo = normalizeLogo(siteUrl, right?.logo);

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
            "linear-gradient(135deg, #081224 0%, #0b1b35 48%, #102746 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* background shapes */}
        <div
          style={{
            position: "absolute",
            top: "-110px",
            left: "-70px",
            width: "290px",
            height: "290px",
            borderRadius: "9999px",
            background: "rgba(245, 158, 11, 0.10)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-40px",
            width: "230px",
            height: "230px",
            borderRadius: "9999px",
            background: "rgba(16, 185, 129, 0.08)",
            display: "flex",
          }}
        />

        {/* top header */}
        <div
          style={{
            position: "absolute",
            top: "42px",
            left: "60px",
            right: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#e5e7eb",
              borderRadius: "999px",
              padding: "10px 18px",
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "18px",
            }}
          >
            Broker Comparison 2026
          </div>

          <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "18px",
    fontSize: "64px",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-1px",
    marginBottom: "14px",
    textAlign: "center",
    color: "#ffffff",
  }}
>
  <span>{leftName}</span>
  <span
    style={{
      display: "flex",
      color: "#f59e0b",
      textShadow: "0 6px 18px rgba(245, 158, 11, 0.35)",
    }}
  >
    VS
  </span>
  <span>{rightName}</span>
</div>

          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#cbd5e1",
              textAlign: "center",
            }}
          >
            Fees • Accounts • Platforms • Regulation
          </div>
        </div>

        {/* comparison area */}
        <div
          style={{
            position: "absolute",
            left: "80px",
            right: "80px",
            top: "210px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 2,
          }}
        >
          {/* left broker */}
          <div
            style={{
              width: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "34px",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "10px",
                }}
              >
                {leftName}
              </div>

              <div
                style={{
                  display: "flex",
                  background: "#f59e0b",
                  color: "#111827",
                  borderRadius: "16px",
                  padding: "8px 16px",
                  fontSize: "24px",
                  fontWeight: 800,
                  boxShadow: "0 10px 24px rgba(245, 158, 11, 0.22)",
                }}
              >
                {formatRating(leftRating)} / 5
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "290px",
                height: "250px",
                borderRadius: "28px",
                background: "rgba(255,255,255,0.98)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {leftLogo ? (
                <img
                  src={leftLogo}
                  width="210"
                  height="150"
                  alt={leftName}
                  style={{
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    fontSize: "38px",
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  {leftName}
                </div>
              )}
            </div>
          </div>

          {/* VS */}
          <div
  style={{
    display: "flex",
    width: "122px",
    height: "122px",
    borderRadius: "9999px",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)",
    color: "#ffffff",
    fontSize: "42px",
    fontWeight: 800,
    boxShadow: "0 18px 40px rgba(37, 99, 235, 0.35)",
    border: "6px solid rgba(255,255,255,0.10)",
    marginTop: "34px",
  }}
>
  VS
</div>

          {/* right broker */}
          <div
            style={{
              width: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "34px",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "10px",
                }}
              >
                {rightName}
              </div>

              <div
                style={{
                  display: "flex",
                  background: "#f59e0b",
                  color: "#111827",
                  borderRadius: "16px",
                  padding: "8px 16px",
                  fontSize: "24px",
                  fontWeight: 800,
                  boxShadow: "0 10px 24px rgba(245, 158, 11, 0.22)",
                }}
              >
                {formatRating(rightRating)} / 5
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "290px",
                height: "250px",
                borderRadius: "28px",
                background: "rgba(255,255,255,0.98)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {rightLogo ? (
                <img
                  src={rightLogo}
                  width="210"
                  height="150"
                  alt={rightName}
                  style={{
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    fontSize: "38px",
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  {rightName}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* centered footer */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "0",
            right: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 18px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "#cbd5e1",
              fontSize: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
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
      </div>
    ),
    {
      ...size,
    }
  );
}