// app/api/points/use/route.ts
import { NextRequest, NextResponse } from "next/server";
import { consumePoints } from "@/app/api/points/_store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 1投稿 = 100pt 消費
 * - Store が唯一の真実
 * - 未ログインは 401
 * - 不足・期限切れは 200 + success:false
 */
export async function POST(req: NextRequest) {
    try {
        const sessionUser = req.cookies.get("session_user")?.value;

        if (!sessionUser) {
            return NextResponse.json(
                { success: false, reason: "unauthorized" },
                { status: 401 }
            );
        }

        const result = consumePoints(sessionUser, 100);

        if (!result.ok) {
            return NextResponse.json({
                success: false,
                reason: result.reason, // "insufficient_points" | "expired" | "not_found"
                points: result.points,
                expiresAt: result.expiresAt ?? null,
            });
        }

        return NextResponse.json({
            success: true,
            points: result.points,
            expiresAt: result.expiresAt ?? null,
        });
    } catch (err) {
        console.error("points/use error:", err);
        return NextResponse.json(
            { success: false, reason: "server_error" },
            { status: 500 }
        );
    }
}