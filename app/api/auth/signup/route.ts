// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import crypto from "crypto";
import { users } from "../_store";
import { addPoints } from "@/app/api/points/_store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Signup API（仮実装・構造FIX版 / PostReady）
 *
 * - DBなし（Mapで代替）
 * - session_user を発行
 * - ✅ 初回登録時の無償ポイントを付与（審査・UX整合のため）
 *   ※ 本番ではDBで管理し、無償付与の条件・回数もDBで制御する
 */

function toYMD(d: Date) {
    return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const normalizedEmail = String(email).toLowerCase().trim();

        // 既存ユーザー確認
        if (users.has(normalizedEmail)) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // パスワードをハッシュ化
        const passwordHash = await bcrypt.hash(String(password), 10);
        const userId = crypto.randomUUID();

        users.set(normalizedEmail, {
            id: userId,
            email: normalizedEmail,
            passwordHash,
        });

        /**
         * ✅ 初回無償ポイント付与（v1: 固定 100pt）
         * - 期限は「付与日から6か月」
         * - v1は store 上書き方式でOK（厳密なロット管理は次フェーズ）
         */
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 6);

        addPoints(userId, 100, toYMD(expiresAt));

        // セッション Cookie 発行
        const res = NextResponse.json({
            ok: true,
            redirectTo: "/account",
        });

        res.cookies.set("session_user", userId, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30日
        });

        return res;
    } catch {
        return NextResponse.json({ error: "Signup failed" }, { status: 500 });
    }
}