"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PointUsePage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    async function consumePoint() {
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch("/api/points/use", {
                method: "POST",
            });

            const data = await res.json().catch(() => ({}));

            // 未ログイン → ログインへ
            if (res.status === 401) {
                router.push("/login");
                return;
            }

            // 消費成功
            if (data?.success) {
                setDone(true);
                return;
            }

            // 失敗理由ごとに分岐（UX & 審査向け）
            switch (data?.reason) {
                case "insufficient_points":
                    router.push("/points/buy");
                    return;

                case "expired":
                    // ★ ここが「1行修正」
                    router.push("/points/error?reason=expired");
                    return;

                case "not_found":
                default:
                    router.push("/points/error?reason=not_found");
                    return;
            }
        } catch {
            router.push("/points/error?reason=server_error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm flex flex-col gap-8 text-center">
                <div className="text-xs text-zinc-400 tracking-wide">
                    Post Ready
                </div>

                <h1 className="text-base text-zinc-900">
                    ポイントを利用する
                </h1>

                <p className="text-sm text-zinc-600 leading-relaxed">
                    この操作を行うことで、
                    <br />
                    所定のポイントを消費し、
                    <br />
                    投稿文生成・補助機能を利用できます。
                </p>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    ※ ポイントは前払い式です。
                    <br />
                    ※ 成果や結果を保証するものではありません。
                </p>

                {done ? (
                    <div className="text-sm text-zinc-700">
                        ポイントを消費しました。
                    </div>
                ) : (
                    <button
                        onClick={consumePoint}
                        disabled={loading}
                        className="w-full rounded-xl bg-black py-4 text-white text-sm disabled:opacity-40"
                    >
                        {loading ? "処理中..." : "ポイントを消費して実行する"}
                    </button>
                )}

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