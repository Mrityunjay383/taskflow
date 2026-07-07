import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        return NextResponse.redirect(new URL(token ? "/dashboard" : "/auth", request.url));
    }

    if (pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    const isAuthPage = pathname.startsWith("/auth") || pathname.startsWith("/register");

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/auth", "/register", "/dashboard/:path*"],
};
