import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "@/utils/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isApiRoute = pathname.startsWith("/api/admin");
  const isLoginRoute =
    pathname === "/admin/login" || pathname === "/api/admin/login";

  if (isLoginRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  const verifiedToken = token && (await verifyJwtToken(token));

  if (!verifiedToken) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
