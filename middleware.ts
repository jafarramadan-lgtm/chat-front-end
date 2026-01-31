import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
const name=request.cookies.get("username")?.value
const email=request.cookies.get("email")?.value

  const authpage = ["/log", "/regist", "/msg"];
  const protectpage = pathname.startsWith("/base");
  if (email) {
    if (authpage.includes(pathname)) {
      return NextResponse.redirect(new URL("/base", request.url));
    }
    return NextResponse.next();
  }
  if (!email) {
    if (protectpage) {
      return NextResponse.redirect(new URL("/log", request.url));
    }
    return NextResponse.next();
  }
  if (authpage.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
