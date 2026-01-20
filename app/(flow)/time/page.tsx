"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/* =========================
   ボタン共通スタイル
========================= */
const btn =
    "w-full rounded-xl border border-zinc-200 py-4 text-base text-zinc-800 text-center hover:bg-zinc-50 active:bg-zinc-100 transition";

/* =========================
   TimePage（時間選択）
   - Header / Footer / 高さ管理は layout 側
   - ここは「中身だけ」
========================= */
export default function TimePage() {
    /* =========================
       🔍 URLクエリ取得
    ========================= */
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const tone = searchParams.get("tone");

    /* =========================
       🔐 ガード
       - 直URL
       - 導線ミス
    ========================= */
    if (!type || !tone) {
        return (
            <div className="text-sm text-zinc-500">
                最初から選び直してください
            </div>
        );
    }

    /* =========================
       🖥 UI（中身のみ）
    ========================= */
    return (
        <div className="w-full max-w-sm flex flex-col items-center text-center gap-10">

            {/* サービス名（本文先頭） */}
            <div className="text-xs text-zinc-400 tracking-wide">
                Post Ready
            </div>

            {/* 質問 */}
            <h1 className="text-2xl font-semibold text-zinc-900">
                いつ頃のご案内ですか？
            </h1>

            <div className="w-full flex flex-col gap-3">

                {/* 出勤前 */}
                {type === "before" && (
                    <>
                        <Link
                            href={`/result?type=${type}&tone=${tone}&time=18時ごろ`}
                            className={btn}
                        >
                            18時ごろ
                        </Link>

                        <Link
                            href={`/result?type=${type}&tone=${tone}&time=夜から`}
                            className={btn}
                        >
                            夜から
                        </Link>

                        <Link
                            href={`/result?type=${type}&tone=${tone}&time=このあと`}
                            className={btn}
                        >
                            このあと
                        </Link>
                    </>
                )}

                {/* 入室・空き時間 */}
                {(type === "enter" || type === "free") && (
                    <>
                        <Link
                            href={`/result?type=${type}&tone=${tone}&time=今から`}
                            className={btn}
                        >
                            今から
                        </Link>

                        <Link
                            href={`/result?type=${type}&tone=${tone}&time=このあとすぐ`}
                            className={btn}
                        >
                            このあとすぐ
                        </Link>
                    </>
                )}

                {/* お礼・退勤（時間スキップ） */}
                {(type === "thanks" || type === "leave") && (
                    <Link
                        href={`/result?type=${type}&tone=${tone}`}
                        className={btn}
                    >
                        このまま進む
                    </Link>
                )}

            </div>
        </div>
    );
}