// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 🔓 常に通していいページ
    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname === "/"
    ) {
        return NextResponse.next();
    }

    // 🔐 ログイン必須判定
    const session = req.cookies.get("session_user");

    if (!session) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// 対象パスを限定（超重要）
export const config = {
    matcher: [
        "/account/:path*",
        "/points/:path*",
    ],
};