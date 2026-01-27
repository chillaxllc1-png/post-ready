import Link from "next/link";

/* =========================
   共通ボタンスタイル
========================= */
const btn =
  "w-full rounded-xl border border-zinc-200 py-4 text-base text-zinc-800 text-center hover:bg-zinc-50 active:bg-zinc-100 transition";

/* =========================
   Home（1画面目）
   - Headerなし
   - Footerなし
   - 戻るなし
   - Post Ready はここで1回だけ表示
   - 高さ管理はこのページ自身で完結
========================= */
export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <main className="w-full max-w-sm flex flex-col items-center text-center gap-10">

        {/* サービス名（控えめ・Home専用） */}
        <div className="text-xs text-zinc-400 tracking-wide">
          Post Ready
        </div>

        {/* 説明文 */}
        <p className="text-sm text-zinc-400 leading-relaxed">
          今の状況を選ぶだけで、<br />
          そのまま使える投稿が決まるツールです。
        </p>

        <p className="text-[11px] text-zinc-400 leading-relaxed">
          ※ 一部機能の利用にはアカウント登録およびポイント購入が必要です。
        </p>

        {/* メイン質問 */}
        <h1 className="text-2xl font-semibold text-zinc-900">
          今日は、どんな投稿にしますか？
        </h1>

        {/* 選択肢 */}
        <div className="w-full flex flex-col gap-3">
          <Link href="/select?type=before" className={btn}>
            出勤前のお知らせ
          </Link>

          <Link href="/select?type=enter" className={btn}>
            入室しました
          </Link>

          <Link href="/select?type=free" className={btn}>
            空き時間のご案内
          </Link>

          <Link href="/select?type=thanks" className={btn}>
            お礼
          </Link>

          <Link href="/select?type=leave" className={btn}>
            退勤しました
          </Link>
        </div>

        {/* 料金導線（審査用・控えめ） */}
        <div className="mt-12 text-xs text-zinc-400">
          <Link href="/pricing" className="underline">
            料金について
          </Link>
        </div>

      </main>
    </div>
  );
}