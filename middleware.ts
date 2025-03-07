import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply to /api/usage routes
  if (!request.nextUrl.pathname.startsWith("/api/usage")) {
    return NextResponse.next();
  }

  // Allow GET requests with credentials
  if (request.method === "GET") {
    const username = request.nextUrl.searchParams.get("username");
    const password = request.nextUrl.searchParams.get("password");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    return NextResponse.next();
  }

  // Block all other methods
  return new NextResponse(null, { status: 405 });
}

export const config = {
  matcher: "/api/usage/:path*",
};
