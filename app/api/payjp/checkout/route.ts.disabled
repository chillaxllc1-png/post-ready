import { NextResponse } from "next/server";
const Payjp = require("payjp");

const payjp = new Payjp(process.env.PAYJP_SECRET_KEY);

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        if (!amount || typeof amount !== "number") {
            return NextResponse.json(
                { error: "invalid amount" },
                { status: 400 }
            );
        }

        // 決済実行
        const charge = await payjp.charges.create({
            amount,
            currency: "jpy",
            description: "Post Ready ポイント購入",
            capture: true,
        });

        // ===== Cookie にポイント保存（正解）=====
        const res = NextResponse.json({
            success: true,
            chargeId: charge.id,
        });

        // 既存ポイント取得（クライアント Cookie）
        const current =
            Number(req.headers.get("cookie")?.match(/points=(\d+)/)?.[1] ?? 0);

        const nextPoints = current + amount;

        res.cookies.set("points", String(nextPoints), {
            path: "/",
            httpOnly: false, // クライアント参照するため
        });

        return res;
    } catch (err) {
        return NextResponse.json(
            { error: "payment failed" },
            { status: 500 }
        );
    }
}