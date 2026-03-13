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
    .select("name")
    .eq("slug", slug)
    .maybeSingle();

  const name = broker?.name || "Broker";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "Arial, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "760px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            {`Review ${name}`}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 32,
              color: "#64748b",
              lineHeight: 1.4,
            }}
          >
            Full Review • Fees • Regulation
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 24,
              color: "#94a3b8",
            }}
          >
            brokeralarab.com
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "260px",
            height: "260px",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #e2e8f0",
            borderRadius: "24px",
            background: "#f8fafc",
            fontSize: "42px",
            fontWeight: 800,
            color: "#0f172a",
            textAlign: "center",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          {name}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}