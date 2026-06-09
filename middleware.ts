import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateAdminSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/en" || pathname === "/so") {
    const url = request.nextUrl.clone();
    url.pathname = "/";

    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/en/") || pathname.startsWith("/so/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/(en|so)/, "") || "/";

    return NextResponse.rewrite(url);
  }

  return updateAdminSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/en/:path*", "/so/:path*"]
};
