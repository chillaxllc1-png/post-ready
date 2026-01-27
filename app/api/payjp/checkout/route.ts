import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

export async function POST(req: Request) {
    try {
        const secretKey = process.env.PAYJP_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json(
                { error: "PAY.JP is not configured" },
                { status: 503 }
            );
        }

        const { amount, userId } = await req.json();

        if (
            !amount ||
            typeof amount !== "number" ||
            amount <= 0 ||
            !userId
        ) {
            return NextResponse.json(
                { error: "invalid request" },
                { status: 400 }
            );
        }

        // PAY.JP 初期化（CommonJS 安定版）
        const Payjp = require("payjp");
        const payjp = Payjp(secretKey);

        /**
         * Checkout セッション作成
         * 👉 Webhook で参照する情報は metadata に全部入れる
         */
        const session = await payjp.checkout.sessions.create({
            mode: "payment",
            success_url: `${APP_URL}/purchase/complete`,
            cancel_url: `${APP_URL}/purchase/cancel`,
            line_items: [
                {
                    name: "Post Ready ポイント購入",
                    amount: amount,
                    currency: "jpy",
                    quantity: 1,
                },
            ],
            metadata: {
                service: "post-ready",
                userId: userId,
                pointAmount: String(amount),
            },
        });

        return NextResponse.json({
            checkoutUrl: session.url,
        });
    } catch (err) {
        console.error("checkout error:", err);
        return NextResponse.json(
            { error: "checkout failed" },
            { status: 500 }
        );
    }
}