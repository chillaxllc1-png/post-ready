"use client";

import { useState } from "react";

export default function PointBuyClient() {
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function startPurchase() {
        // 二重クリック完全防止
        if (clicked) return;

        setClicked(true);
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/points/checkout", {
                method: "POST",
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                // 未ログイン等
                if (res.status === 401) {
                    window.location.href = "/login";
                    return;
                }
                setError(data?.error ?? "購入処理を開始できませんでした");
                setLoading(false);
                return;
            }

            // APIが { checkoutUrl } を返す前提
            if (data?.checkoutUrl) {
                window.location.href = data.checkoutUrl;
                return;
            }

            setError("購入URLを取得できませんでした");
            setLoading(false);
        } catch {
            setError("通信エラーが発生しました");
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm flex flex-col gap-8 text-center">
                <div className="text-xs text-zinc-400 tracking-wide">Post Ready</div>

                <h1 className="text-base text-zinc-900">ポイント購入</h1>

                <p className="text-sm text-zinc-600 leading-relaxed">
                    投稿文生成・補助機能の利用にポイントを使用します。
                </p>

                <div className="rounded-xl border border-zinc-200 p-4 text-sm flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="text-zinc-500">付与ポイント</span>
                        <span className="text-zinc-900">100 pt</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-zinc-500">価格</span>
                        <span className="text-zinc-900">1,280円（税込）</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-zinc-500">有効期限</span>
                        <span className="text-zinc-900">購入日から6か月</span>
                    </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    ※ ポイントは前払い式です。<br />
                    ※ 自動更新は行われません。<br />
                    ※ 有効期限を過ぎたポイントは失効します。<br />
                    ※ デジタルサービスの性質上、返金はできません。
                </p>

                {error && <div className="text-xs text-red-500">{error}</div>}

                <button
                    type="button"
                    onClick={startPurchase}
                    disabled={loading || clicked}
                    className="w-full rounded-xl bg-black py-4 text-white text-sm disabled:opacity-40"
                >
                    {loading ? "処理中..." : "購入を開始する"}
                </button>

                <a
                    href="/account"
                    className="text-xs text-zinc-400 underline underline-offset-4"
                >
                    マイページに戻る
                </a>
            </div>
        </main>
    );
}