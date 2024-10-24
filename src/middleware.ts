import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./actions/AuthActions";

const AuthRoutes = ["/login", "/register"];
const roleBaseRoutes = {
  user: ["/profile", "/profile/:path*", "/posts/create", "/posts/edit/:path*", "/dashboard", "/dashboard/posts", "/dashboard/follow-users", "/dashboard/my-profile"],
  admin: ["/dashboard", "/dashboard/posts", "/dashboard/users" , "/dashboard/my-profile"],
};

type TRole = keyof typeof roleBaseRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if (!user?.userEmail) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
  }

  if ((user?.role) && roleBaseRoutes[user?.role as TRole]) {
    const routes = roleBaseRoutes[user?.role as TRole];
    if (routes.includes(pathname) || routes.some((route) => pathname.startsWith(route.split("/:path*")[0]))) {
        return NextResponse.next();
      }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/profile", "/profile/:path*", "/posts/create", "/posts/edit/:path*", "/dashboard", "/dashboard/:path*", "/login", "/register"],
};