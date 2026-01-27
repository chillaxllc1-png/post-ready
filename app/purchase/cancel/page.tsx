export default function PurchaseCancelPage() {
    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm flex flex-col gap-8 text-center">

                <div className="text-xs text-zinc-400 tracking-wide">
                    Post Ready
                </div>

                <h1 className="text-base text-zinc-900">
                    購入はキャンセルされました
                </h1>

                <p className="text-sm text-zinc-600 leading-relaxed">
                    決済は完了していません。
                    <br />
                    ポイントは付与されていません。
                </p>

                <a
                    href="/purchase"
                    className="w-full rounded-xl border border-zinc-200 py-4 text-sm text-zinc-800"
                >
                    もう一度購入する
                </a>

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