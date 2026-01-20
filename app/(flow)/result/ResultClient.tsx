"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/* =========================
   共通ロジック・データ
========================= */
import { replaceVars } from "@/data/replace";
import { TEMPLATES } from "@/data/templates";
import { TIME_VARIANTS, pickRandom } from "@/data/timeVariants";
import { pickToneLine } from "@/data/toneVariants";

export default function ResultClient() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const tone = searchParams.get("tone");

    /* =========================
       ガード
    ========================= */
    if (!type || !tone) {
        return (
            <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
                <div className="text-xs text-zinc-400 tracking-wide">Post Ready</div>
                <div className="text-sm text-zinc-600">最初から選び直してください</div>
                <Link href="/" className="text-xs text-zinc-400 underline">
                    トップへ戻る
                </Link>
            </div>
        );
    }

    /* =========================
       状態
    ========================= */
    const [message, setMessage] = useState<string | null>(null);
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(false);

    /* =========================
       初回クライアント処理（唯一）
    ========================= */
    useEffect(() => {
        // ポイント取得
        const match = document.cookie.match(/points=(\d+)/);
        if (match) {
            setPoints(Number(match[1]));
        }

        // ===== 投稿文をここで確定 =====
        let time = "";

        if (type === "before") {
            time = pickRandom(TIME_VARIANTS.later);
        }

        if (type === "enter" || type === "free") {
            time = pickRandom(TIME_VARIANTS.now);
        }

        const next_date = searchParams.get("next_date") ?? "次回";
        const next_time = searchParams.get("next_time") ?? "また";

        const rawTemplate = TEMPLATES[type]?.[tone] ?? "投稿文が見つかりませんでした";

        const toneLine = pickToneLine(tone);
        let processedTemplate = rawTemplate;

        if (toneLine) {
            const lines = rawTemplate.split("\n");
            if (lines[3]) {
                lines[3] = toneLine;
                processedTemplate = lines.join("\n");
            }
        }

        const finalMessage = replaceVars(processedTemplate, {
            time,
            next_date,
            next_time,
        });

        setMessage(finalMessage);
    }, [type, tone, searchParams]);

    /* =========================
       投稿を使う
    ========================= */
    const usePost = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch("/api/consume", {
                method: "POST",
            });

            const data = await res.json();

            // ポイント不足 → 購入画面へ
            if (!data.success) {
                (globalThis as any).location.href = "/purchase";
                return;
            }

            // ===== 使用成功 =====
            const g = globalThis as any;

            // message を string として確定
            const text = message ?? "";

            // 自動コピー
            try {
                await g?.navigator?.clipboard?.writeText?.(text);
            } catch { }

            // X投稿画面へ遷移
            g.location.href =
                "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       表示
    ========================= */
    if (!message) {
        return null; // ← Hydration対策として「何も描画しない」
    }

    return (
        <div className="w-full max-w-sm flex flex-col items-center text-center gap-10">
            <div className="text-xs text-zinc-400 tracking-wide">Post Ready</div>

            <div className="whitespace-pre-line text-zinc-900 text-sm leading-relaxed">
                {message}
            </div>

            {/* 残りポイント（超ミニ） */}
            {points > 0 && (
                <div className="text-[10px] text-zinc-400">残り {points}pt</div>
            )}

            <button
                onClick={usePost}
                disabled={loading}
                className="w-full rounded-full bg-black py-4 text-white text-sm font-medium
                   active:opacity-80 transition"
            >
                この投稿を使う
            </button>
        </div>
    );
}