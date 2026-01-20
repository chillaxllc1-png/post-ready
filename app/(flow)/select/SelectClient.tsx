// app/(flow)/select/SelectClient.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * ここに「元の /select/page.tsx に書いてあった中身」を移植する。
 * 重要: useSearchParams() を使うロジックは必ずこの Client 内に閉じる。
 */
export default function SelectClient() {
    const searchParams = useSearchParams();

    // 例: 既存コードで使ってた値をここで取る
    // const type = searchParams.get("type");
    // const tone = searchParams.get("tone");

    // ↓↓↓ ここから下を、あなたの「元の select/page.tsx のUI」に置き換える（そのまま移植）
    return (
        <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
            <div className="text-xs text-zinc-400 tracking-wide">Post Ready</div>

            <div className="text-sm text-zinc-600">
                SelectClient に分離済み（ここに元のUIを移植）
            </div>

            <Link href="/" className="text-xs text-zinc-400 underline">
                トップへ戻る
            </Link>
        </div>
    );
}