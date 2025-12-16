import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect staff areas
  const isStaffArea = pathname.startsWith("/admin") || pathname.startsWith("/portal");
  if (!isStaffArea) return NextResponse.next();

  // Allow access to login page + login API
  if (pathname.startsWith("/login") || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  // Check staff cookie
  const authed = req.cookies.get("osms_staff")?.value === "1";
  if (authed) return NextResponse.next();

  // Redirect to /login and remember destination
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};