import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ClickType = "real" | "demo" | "mt4" | "mt5";

const allowedTypes: ClickType[] = ["real", "demo", "mt4", "mt5"];

const botPattern =
  /bot|crawler|spider|slurp|preview|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegrambot|discordbot|googlebot|bingbot|yandex|baiduspider|headless|lighthouse|pagespeed|uptimerobot|pingdom/i;

function getCountryName(countryCode: string): string {
  if (!countryCode || countryCode.toLowerCase() === "unknown") {
    return "Unknown";
  }

  try {
    const displayNames = new Intl.DisplayNames(["en"], {
      type: "region",
    });

    return displayNames.of(countryCode.toUpperCase()) || countryCode;
  } catch {
    return countryCode;
  }
}

function getSourcePage(referer: string | null): string | null {
  if (!referer) return null;

  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`;
  } catch {
    return referer;
  }
}

function normalizeCountryCode(countryCode: string | null): string {
  if (!countryCode) return "unknown";

  const normalized = countryCode.trim().toUpperCase();

  if (
    !normalized ||
    normalized === "XX" ||
    normalized === "UNKNOWN"
  ) {
    return "unknown";
  }

  return normalized;
}

function detectClickLocation(sourcePage: string | null): string {
  if (!sourcePage) {
    return "direct-or-unknown";
  }

  const path = sourcePage.split("?")[0].replace(/\/+$/, "") || "/";

  if (path === "/" || path === "/en") {
    return "homepage";
  }

  if (
    path.includes("/compare/") ||
    path === "/compare" ||
    path === "/en/compare"
  ) {
    return "comparison";
  }

  if (
    path.includes("/best-brokers") ||
    path.includes("/lowest-spread-brokers")
  ) {
    return "best-brokers";
  }

  if (path.includes("/brokers/")) {
    return path.startsWith("/en/")
      ? "broker-review-en"
      : "broker-review-ar";
  }

  if (path.includes("/licenses/")) {
    return "licenses";
  }

  if (path.includes("/regulators/")) {
    return "regulators";
  }

  if (path.includes("/learn-trading/")) {
    return "learn-trading";
  }

  if (path.includes("/tools/")) {
    return "tools";
  }

  if (path.includes("/events")) {
    return "events";
  }

  if (path.includes("/accounts/")) {
    return "account-page";
  }

  if (path.includes("/open-account")) {
    return "open-account-guide";
  }

  return "other-page";
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") as ClickType | null;

  const explicitSource =
    searchParams.get("source")?.trim().slice(0, 100) || null;

  if (!slug || !type || !allowedTypes.includes(type)) {
    return NextResponse.redirect(new URL("/brokers", request.url));
  }

  const supabase = await createClient();

  const { data: broker, error: brokerError } = await supabase
    .from("brokers")
    .select(
      "slug, real_account_url, demo_account_url, mt4_download_url, mt5_download_url"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (brokerError) {
    console.error("Broker lookup failed:", brokerError);
  }

  if (!broker) {
    return NextResponse.redirect(new URL("/brokers", request.url));
  }

  let targetUrl: string | null = null;

  if (type === "real") {
    targetUrl = broker.real_account_url;
  }

  if (type === "demo") {
    targetUrl = broker.demo_account_url;
  }

  if (type === "mt4") {
    targetUrl = broker.mt4_download_url;
  }

  if (type === "mt5") {
    targetUrl = broker.mt5_download_url;
  }

  if (!targetUrl) {
    return NextResponse.redirect(
      new URL(`/brokers/${slug}`, request.url)
    );
  }

  const userAgent = request.headers.get("user-agent") || "";

  if (botPattern.test(userAgent)) {
    return NextResponse.redirect(targetUrl);
  }

  const referer = request.headers.get("referer");
  const sourcePage = getSourcePage(referer);

  const clickLocation =
    explicitSource || detectClickLocation(sourcePage);

  const forwardedIp = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  const ip =
    forwardedIp ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rawCountryCode =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry");

  const countryCode = normalizeCountryCode(rawCountryCode);
  const countryName = getCountryName(countryCode);

  const hashSecret =
    process.env.CLICK_HASH_SECRET ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "broker-alarab-click-tracking";

  const visitorHash = createHash("sha256")
    .update(
      [
        ip,
        userAgent,
        slug,
        type,
        clickLocation,
        hashSecret,
      ].join("|")
    )
    .digest("hex");

  const thirtyMinutesAgo = new Date(
    Date.now() - 30 * 60 * 1000
  ).toISOString();

  const {
    data: duplicateClick,
    error: duplicateError,
  } = await supabase
    .from("broker_clicks")
    .select("id")
    .eq("visitor_hash", visitorHash)
    .gte("created_at", thirtyMinutesAgo)
    .limit(1)
    .maybeSingle();

  if (duplicateError) {
    console.error("Click duplicate check failed:", duplicateError);
  }

  if (!duplicateClick) {
    const { error: insertError } = await supabase
      .from("broker_clicks")
      .insert({
        broker_slug: slug,
        click_type: type,
        page_url: sourcePage,
        referrer: referer,
        user_agent: userAgent,
        country: countryName,
        country_code: countryCode,
        country_name: countryName,
        click_location: clickLocation,
        visitor_hash: visitorHash,

        // لا نخزن عنوان IP الحقيقي
        ip: null,
      });

    if (insertError) {
      console.error("Click insert failed:", insertError);
    }
  }

  return NextResponse.redirect(targetUrl);
}