export default function PurchaseCompletePage() {
    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm flex flex-col gap-8 text-center">

                <div className="text-xs text-zinc-400 tracking-wide">
                    Post Ready
                </div>

                <h1 className="text-base text-zinc-900">
                    購入を受け付けました
                </h1>

                <p className="text-sm text-zinc-600 leading-relaxed">
                    ポイントの購入手続きを受け付けました。
                    <br />
                    決済が確認され次第、
                    <br />
                    ポイントが付与されます。
                </p>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    ※ ポイントの反映には数分かかる場合があります。<br />
                    ※ ポイントは前払い式です。<br />
                    ※ 有効期限を過ぎたポイントは失効します。<br />
                    ※ 成果や結果を保証するものではありません。
                </p>

                <a
                    href="/account"
                    className="w-full rounded-xl bg-black py-4 text-white text-sm"
                >
                    マイページへ
                </a>

            </div>
        </main>
    );
}