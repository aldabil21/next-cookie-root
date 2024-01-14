import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const userId = cookies.get("user_id")?.value;

  if (!userId) {
    const response = NextResponse.redirect(request.url);
    const randomId = Math.random().toString(36).substring(7);
    response.cookies.set("user_id", `RANDOM_ID: ${randomId}`);
    return response;
  }
}
