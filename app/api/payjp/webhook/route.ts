import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { addPoints } from "@/app/api/points/_store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PAY.JP Webhook（完全FIX / 本番耐久）
 *
 * - PAY.JP 正式署名方式対応（t + body）
 * - metadata から userId / pointAmount を取得
 * - 成功イベントのみポイント付与
 * - Webhook が「唯一の真実」
 */
export async function POST(req: NextRequest) {
    const webhookSecret = process.env.PAYJP_WEBHOOK_SECRET;

    // 🔐 未設定フェーズは ACK（審査・再送ループ防止）
    if (!webhookSecret) {
        return NextResponse.json({ ok: false }, { status: 200 });
    }

    try {
        // raw body（署名検証必須）
        const body = await req.text();
        const signatureHeader = req.headers.get("payjp-signature") ?? "";

        /**
         * payjp-signature 例:
         * t=1710000000,v1=abcdef...
         */
        const sigParts = Object.fromEntries(
            signatureHeader.split(",").map((p) => p.split("="))
        );

        const timestamp = sigParts["t"];
        const signature = sigParts["v1"];

        if (!timestamp || !signature) {
            return new NextResponse("invalid signature header", { status: 400 });
        }

        // 正式な署名検証
        const signedPayload = `${timestamp}.${body}`;
        const expected = crypto
            .createHmac("sha256", webhookSecret)
            .update(signedPayload)
            .digest("hex");

        if (!crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expected)
        )) {
            return new NextResponse("invalid signature", { status: 400 });
        }

        const payload = JSON.parse(body);
        const eventType = payload?.type;
        const obj = payload?.data?.object;

        // 成功イベントのみ処理
        const isSuccess =
            eventType === "charge.succeeded" ||
            eventType === "checkout.session.completed";

        if (!isSuccess) {
            return NextResponse.json({ received: true }, { status: 200 });
        }

        // metadata 抽出
        const metadata = obj?.metadata ?? {};
        const userId = metadata.userId;
        const pointAmountRaw = metadata.pointAmount;

        const pointAmount =
            typeof pointAmountRaw === "string" && /^\d+$/.test(pointAmountRaw)
                ? Number(pointAmountRaw)
                : typeof pointAmountRaw === "number"
                    ? pointAmountRaw
                    : null;

        // userId / pointAmount 不正でも ACK
        if (!userId || !pointAmount || pointAmount <= 0) {
            return NextResponse.json({ received: true }, { status: 200 });
        }

        // 6か月有効期限
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 6);
        const expiresAtISO = expiresAt.toISOString().slice(0, 10);

        // ポイント付与（唯一の更新点）
        addPoints(userId, pointAmount, expiresAtISO);

        console.log("✅ PAY.JP Webhook OK", {
            eventType,
            userId,
            pointAmount,
            expiresAtISO,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error("Webhook error:", err);
        // 本当に壊れたときだけ 500（再送させる）
        return NextResponse.json({ error: "webhook failed" }, { status: 500 });
    }
}