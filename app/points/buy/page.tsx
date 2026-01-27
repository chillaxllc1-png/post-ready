// app/points/buy/page.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import PointBuyClient from "./PointBuyClient";

export const dynamic = "force-dynamic";

export default async function PointBuyPage() {
    const cookieStore = await cookies();
    const sessionUser = cookieStore.get("session_user")?.value;

    // 未ログイン：購入はできないので、ログイン/新規登録へ誘導
    if (!sessionUser) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="w-full max-w-sm flex flex-col gap-8 text-center">
                    <div className="text-xs text-zinc-400 tracking-wide">Post Ready</div>

                    <h1 className="text-base text-zinc-900">ポイント購入</h1>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                        ポイントの購入には、アカウント登録（ログイン）が必要です。
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

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/login"
                            className="w-full rounded-xl bg-black py-4 text-white text-sm"
                        >
                            ログインして購入する
                        </Link>

                        <Link
                            href="/signup"
                            className="w-full rounded-xl border border-zinc-200 py-4 text-sm text-zinc-800"
                        >
                            新規登録して購入する
                        </Link>
                    </div>

                    <Link
                        href="/"
                        className="text-xs text-zinc-400 underline underline-offset-4"
                    >
                        トップページに戻る
                    </Link>
                </div>
            </main>
        );
    }

    // ログイン済み：購入開始ボタンを表示（APIへPOST）
    return <PointBuyClient />;
}