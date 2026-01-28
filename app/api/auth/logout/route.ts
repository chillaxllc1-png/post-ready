// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.redirect(
        new URL("/login", process.env.APP_URL ?? "http://localhost:3000")
    );

    res.cookies.set("session_user", "", {
        path: "/",
        maxAge: 0, // 即削除
    });

    return res;
}