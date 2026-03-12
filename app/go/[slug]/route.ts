import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ClickType = "real" | "demo" | "mt4" | "mt5";

const allowedTypes: ClickType[] = ["real", "demo", "mt4", "mt5"];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") as ClickType | null;

  if (!slug || !type || !allowedTypes.includes(type)) {
    return NextResponse.redirect(new URL("/brokers", request.url));
  }

  const supabase = await createClient();

  const { data: broker, error } = await supabase
    .from("brokers")
    .select("slug, real_account_url, demo_account_url, mt4_download_url, mt5_download_url")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !broker) {
    return NextResponse.redirect(new URL("/brokers", request.url));
  }

  let targetUrl: string | null = null;

  if (type === "real") targetUrl = broker.real_account_url;
  if (type === "demo") targetUrl = broker.demo_account_url;
  if (type === "mt4") targetUrl = broker.mt4_download_url;
  if (type === "mt5") targetUrl = broker.mt5_download_url;

  if (!targetUrl) {
    return NextResponse.redirect(new URL(`/brokers/${slug}`, request.url));
  }

  const pageUrl = request.headers.get("referer") || null;
  const referrer = request.headers.get("referer") || null;
  const userAgent = request.headers.get("user-agent") || null;

  await supabase.from("broker_clicks").insert({
    broker_slug: slug,
    click_type: type,
    page_url: pageUrl,
    referrer,
    user_agent: userAgent,
  });

  return NextResponse.redirect(targetUrl);
}