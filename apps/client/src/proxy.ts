import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        return NextResponse.redirect(new URL(token ? "/dashboard" : "/login", request.url));
    }

    if (pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
