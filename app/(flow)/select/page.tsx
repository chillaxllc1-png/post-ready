"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/* =========================
   共通ボタンスタイル
========================= */
const btn =
    "w-full rounded-xl border border-zinc-200 py-4 text-base text-zinc-800 text-center hover:bg-zinc-50 active:bg-zinc-100 transition";

export default function SelectPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    if (!type) {
        return (
            <div className="text-sm text-zinc-500">
                最初から選び直してください
            </div>
        );
    }

    /* =========================
       thanks / leave は
       TimePage をスキップ
    ========================= */
    const isSkipTime = type === "thanks" || type === "leave";

    const buildHref = (tone: string) => {
        if (isSkipTime) {
            return `/result?type=${type}&tone=${tone}`;
        }
        return `/time?type=${type}&tone=${tone}`;
    };

    return (
        <div className="w-full max-w-sm flex flex-col items-center text-center gap-10">

            {/* サービス名（本文先頭） */}
            <div className="text-xs text-zinc-400 tracking-wide">
                Post Ready
            </div>

            <h1 className="text-2xl font-semibold text-zinc-900">
                今日は、どんなトーンにしますか？
            </h1>

            <div className="w-full flex flex-col gap-3">
                <Link href={buildHref("soft")} className={btn}>
                    やさしめ
                </Link>

                <Link href={buildHref("bright")} className={btn}>
                    明るめ
                </Link>

                <Link href={buildHref("sweet")} className={btn}>
                    ほんのり甘め
                </Link>

                <Link href={buildHref("chill")} className={btn}>
                    まったり
                </Link>

                <Link href={buildHref("energetic")} className={btn}>
                    元気め
                </Link>
            </div>

        </div>
    );
}