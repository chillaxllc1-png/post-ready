// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { users } from "../_store";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Invalid request" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = users.get(normalizedEmail);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // ★ここが超重要
        const ok = await bcrypt.compare(password, user.passwordHash);

        if (!ok) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // セッション Cookie
        const res = NextResponse.json({ ok: true });

        res.cookies.set("session_user", user.id, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });

        return res;
    } catch {
        return NextResponse.json(
            { error: "Login failed" },
            { status: 500 }
        );
    }
}