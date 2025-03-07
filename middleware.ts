import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the current path is a portal path
  const isPortalPath =
    request.nextUrl.pathname.startsWith("/patient") ||
    request.nextUrl.pathname.startsWith("/patient") ||
    request.nextUrl.pathname.startsWith("/admin")

  // Add both the pathname and portal status to headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", request.nextUrl.pathname)
  requestHeaders.set("x-is-portal", isPortalPath.toString())

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

