// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { users } from "../_store";

/**
 * 🔐 審査専用・固定デモアカウント
 * PAY.JP 審査用に必ずログインできる
 */
const DEMO_EMAIL = "chillaxllc2@gmail.com";
const DEMO_PASSWORD = "chillax";
const DEMO_USER_ID = "demo-user-fixed-id";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Invalid request" },
                { status: 400 }
            );
        }

        const normalizedEmail = String(email).toLowerCase().trim();

        /**
         * =========================
         * ✅ 審査専用デモアカウント
         * =========================
         */
        if (
            normalizedEmail === DEMO_EMAIL &&
            password === DEMO_PASSWORD
        ) {
            const res = NextResponse.json({ ok: true });

            res.cookies.set("session_user", DEMO_USER_ID, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 60 * 24 * 30, // 30日
            });

            return res;
        }

        /**
         * =========================
         * 通常ログイン処理
         * =========================
         */
        const user = users.get(normalizedEmail);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const ok = await bcrypt.compare(password, user.passwordHash);

        if (!ok) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

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