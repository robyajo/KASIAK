import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const token = request.nextauth.token;
    const path = request.nextUrl.pathname;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect("/login");
    }

    // Check for admin dashboard access
    if (path.startsWith("/dashboard")) {
      if (token.user?.role !== "admin") {
        // Redirect to home or unauthorized page if not admin
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
