// app/api/consume/route.ts
import { NextResponse } from "next/server";

/**
 * consume API（暫定・Cookieベース）
 *
 * - 完全な同時実行防止は目的としない
 * - UI側の即時 disable + consuming cookie により
 *   実用上の二重消費を防ぐ
 * - 厳密な排他制御はログイン＋DB導入フェーズで対応
 */

export async function POST(req: Request) {
    try {
        const cookie = req.headers.get("cookie") ?? "";

        // points 取得
        const pointsMatch = cookie.match(/(?:^|;\s*)points=(\d+)/);
        const current = pointsMatch ? Number(pointsMatch[1]) : 0;

        // ポイント不足
        if (current < 100) {
            return NextResponse.json(
                { success: false, reason: "insufficient_points" },
                { status: 200 }
            );
        }

        /**
         * ===== Phase 1: locking =====
         * 処理開始の合図として consuming を返す
         * （ここではまだ points は減らさない）
         */
        const lockRes = NextResponse.json(
            { success: true, locking: true },
            { status: 200 }
        );

        lockRes.cookies.set("consuming", "1", {
            path: "/",
            httpOnly: false,
            sameSite: "lax",
            maxAge: 3, // 超短時間ロック
        });

        /**
         * ===== Phase 2: points 減算 =====
         * ※ 実際の減算は「このレスポンスを返した後」
         * UI 側は locking === true を受けたら
         * 次の consume を送らない前提
         */
        const next = current - 100;

        lockRes.cookies.set("points", String(next), {
            path: "/",
            httpOnly: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365,
        });

        return lockRes;
    } catch {
        return NextResponse.json(
            { success: false, reason: "server_error" },
            { status: 500 }
        );
    }
}