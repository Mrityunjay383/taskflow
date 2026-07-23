import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        return NextResponse.redirect(new URL(token ? "/workspace" : "/login", request.url));
    }

    if (pathname.startsWith("/workspace") && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/workspace", request.url));
    }

    return NextResponse.next();
}
