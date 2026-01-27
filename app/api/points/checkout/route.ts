// app/api/points/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/points/checkout
 * - ログイン必須（session_user Cookie）
 * - 成功時 { checkoutUrl } を返す（PointBuyClient と整合）
 * - 環境変数未設定でも build を落とさない（審査フェーズガード）
 */
export async function POST(req: NextRequest) {
    const sessionUser = req.cookies.get("session_user")?.value;

    // ログイン必須
    if (!sessionUser) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const secretKey = process.env.PAYJP_SECRET_KEY;
    const appUrl = process.env.APP_URL;

    /**
     * 価格/商品は運用に合わせて環境変数で差し替え
     * - PAYJP_POINT_PRICE_ID を優先
     * - 無ければ PAYJP_PRICE_ID を参照（保険）
     */
    const priceId =
        process.env.PAYJP_POINT_PRICE_ID ?? process.env.PAYJP_PRICE_ID;

    // 審査中でも build を落とさない（ただし決済は開始しない）
    if (!secretKey || !appUrl || !priceId) {
        return NextResponse.json(
            {
                error: "payment_not_enabled",
                message:
                    "決済機能は現在有効化されていません（PAY.JP設定完了後に利用可能です）",
            },
            { status: 503 }
        );
    }

    // CommonJS require（ビルド安定策）
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Payjp = require("payjp");
    const payjp = Payjp(secretKey);

    /**
     * PAY.JP Checkout Session（都度課金＝ポイント購入）
     * ※ PAY.JP 側の仕様に合わせて mode / items の形は調整対象
     * ※ 審査では「画面遷移が成立すること」が重要
     */
    const session = await payjp.checkout.sessions.create({
        mode: "payment",
        success_url: `${appUrl}/purchase/complete`,
        cancel_url: `${appUrl}/purchase/cancel`,
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: {
            service: "post-ready",
            user: sessionUser,
            kind: "points",
        },
    });

    return NextResponse.json({
        checkoutUrl: session.url,
    });
}

/**
 * GET は許可しない（直叩き対策）
 * - 405 を返すだけ（ブラウザで開かれても変な挙動にしない）
 */
export async function GET() {
    return NextResponse.json(
        { error: "method_not_allowed" },
        { status: 405 }
    );
}