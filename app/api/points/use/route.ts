// app/api/points/use/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * 1投稿 = 100pt 消費
 * Cookie ベース（暫定）
 */
export async function POST(req: NextRequest) {
    try {
        // ✅ 既存ポイント取得（Request Cookie）
        const current = Number(req.cookies.get("points")?.value ?? 0);

        // ポイント不足（200で返す設計）
        if (current < 100) {
            return NextResponse.json({
                success: false,
                reason: "insufficient_points",
                points: current,
            });
        }

        const next = current - 100;

        // ✅ Cookie更新は「レスポンス」に対して行う
        const res = NextResponse.json({
            success: true,
            points: next,
        });

        res.cookies.set("points", String(next), {
            path: "/",
            httpOnly: false, // クライアントで読む想定なら false（暫定）
            sameSite: "lax",
            // secure: process.env.NODE_ENV === "production", // 本番は推奨
        });

        return res;
    } catch (err) {
        return NextResponse.json(
            { success: false, reason: "server_error" },
            { status: 500 }
        );
    }
}