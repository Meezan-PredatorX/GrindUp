import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const supabase = await createClient();
  const {data: { user }} = await supabase.auth.getUser();

  const userType = user?.user_metadata.userType;

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  // If user not logged in and trying to access protected routes
  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is logged in and trying to access auth pages
  if (user && isAuthPage) {
    if (userType === 'college') return NextResponse.redirect(new URL("/dashboard/college", req.url))
    else return NextResponse.redirect(new URL("/dashboard/company", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
