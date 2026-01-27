export default function PricingPage() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md flex flex-col gap-6 text-center">
                {/* サービス名 */}
                <div className="text-xs text-zinc-400 tracking-wide">
                    Post Ready
                </div>

                {/* 見出し */}
                <h1 className="text-base text-zinc-800">
                    料金について
                </h1>

                {/* 説明（審査用・事実のみ） */}
                <p className="text-sm text-zinc-600 leading-relaxed">
                    Post Ready は、投稿文作成を補助するWebサービスです。
                    本サービスでは、アカウント登録のうえポイントを購入し、
                    投稿文を使用する際にポイントを消費する仕組みを採用しています。
                </p>

                {/* 料金表 */}
                <div className="flex flex-col gap-3 text-sm text-zinc-700">
                    <div className="flex justify-between border-b pb-2 font-medium">
                        <span>ポイント購入</span>
                        <span>¥1,200（税込）</span>
                    </div>
                </div>

                {/* 補足（PAY.JP必須観点） */}
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    ※ 表示価格は税込です。
                    <br />
                    ※ 本サービスはポイント制です。月額課金や自動更新は行われません。
                    <br />
                    ※ 購入したポイントは、投稿文を使用した際に消費されます。
                    <br />
                    ※ ポイントには有効期限（購入日から6か月）があります。
                    <br />
                    ※ ポイントの管理・利用にはアカウント登録が必要です。
                </p>

                {/* 戻る導線 */}
                <a
                    href="/"
                    className="text-xs text-zinc-400 underline"
                >
                    トップページに戻る
                </a>
            </div>
        </main>
    );
}