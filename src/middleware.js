import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path == "/login" || path == "/signup";

  const token =
    request.cookies.get("token") || request.cookies.get("refreshToken");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
