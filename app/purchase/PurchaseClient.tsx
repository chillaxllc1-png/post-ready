"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const PLANS = [
    { price: 1200, pt: 1200, label: "おすすめ" },
    { price: 600, pt: 600 },
    { price: 3000, pt: 3000 },
    { price: 6000, pt: 6000 },
    { price: 12000, pt: 12000 },
];

export default function PurchasePage() {
    const [loadingPrice, setLoadingPrice] = useState<number | null>(null);
    const searchParams = useSearchParams();

    // 戻り先（なければ /result）
    const from = searchParams.get("from") || "/result";

    const startCheckout = async (amount: number) => {
        try {
            setLoadingPrice(amount);

            const res = await fetch("/api/payjp/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            if (!res.ok) {
                alert("決済に失敗しました");
                return;
            }

            // 購入成功 → 戻る
            (globalThis as any).location.href = from;
        } finally {
            setLoadingPrice(null);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-sm flex flex-col gap-6 text-center">
                <h1 className="text-xl font-semibold text-zinc-900">ポイントを購入する</h1>

                <div className="flex flex-col gap-3">
                    {PLANS.map((plan) => (
                        <button
                            key={plan.price}
                            onClick={() => startCheckout(plan.price)}
                            disabled={loadingPrice === plan.price}
                            className={`w-full rounded-xl border py-4 text-left px-5 transition
                ${plan.label ? "border-zinc-900" : "border-zinc-200"}
                ${loadingPrice === plan.price ? "opacity-60" : "hover:bg-zinc-50"}
              `}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-base text-zinc-900">
                                        ¥{plan.price.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-zinc-400">{plan.pt.toLocaleString()}pt</div>
                                </div>

                                {plan.label && (
                                    <div className="text-[10px] text-zinc-500 border border-zinc-300 rounded-full px-2 py-0.5">
                                        {plan.label}
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <p className="text-[10px] text-zinc-400 mt-2">
                    ※ 1投稿の使用につき、100ptを消費します
                </p>
            </div>
        </div>
    );
}