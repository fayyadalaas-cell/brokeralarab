import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // تحويل www إلى بدون www
  if (request.headers.get("host") === "www.brokeralarab.com") {
    url.hostname = "brokeralarab.com"
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}