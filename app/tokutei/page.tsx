// app/tokutei/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "特定商取引法に基づく表記｜Post Ready",
    description:
        "Post Ready の特定商取引法に基づく表記を掲載しています。有料サービスに関する重要事項をご確認ください。",
    openGraph: {
        type: "website",
        siteName: "Post Ready",
        title: "特定商取引法に基づく表記｜Post Ready",
        description:
            "Post Ready の特定商取引法に基づく表記を掲載しています。",
        url: "https://postready.app/tokutei",
    },
    twitter: {
        card: "summary_large_image",
        title: "特定商取引法に基づく表記｜Post Ready",
        description:
            "Post Ready の特定商取引法に基づく表記を掲載しています。",
    },
};

export default function TokuteiPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <main className="mx-auto w-full max-w-xl px-5 py-10">
                {/* Header */}
                <header className="mb-8 space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        特定商取引法に基づく表記
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        最終更新日：2026年1月4日
                    </p>
                </header>

                {/* Body */}
                <section className="space-y-6 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                    <div className="rounded-2xl bg-white p-5 border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    サービス名
                                </dt>
                                <dd className="mt-1">Post Ready</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    事業者名
                                </dt>
                                <dd className="mt-1">合同会社 chillax</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    代表責任者
                                </dt>
                                <dd className="mt-1">代表社員 矢嶋 弘和</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    所在地
                                </dt>
                                <dd className="mt-1">
                                    請求があった場合には、法令に基づき遅滞なく開示いたします。
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    連絡先メールアドレス
                                </dt>
                                <dd className="mt-1">
                                    <a
                                        href="mailto:chillaxllc1@gmail.com"
                                        className="underline underline-offset-4"
                                    >
                                        chillaxllc1@gmail.com
                                    </a>
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        ※ 原則として3営業日以内にご返信いたします。
                                    </p>
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    電話番号
                                </dt>
                                <dd className="mt-1">
                                    請求があった場合には、法令に基づき遅滞なく開示いたします。
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    販売価格
                                </dt>
                                <dd className="mt-1">
                                    投稿文提供サービスに関する各プランの料金を、
                                    画面上に表示された金額（税込）で提供します。
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    商品代金以外の必要料金
                                </dt>
                                <dd className="mt-1">
                                    インターネット接続にかかる通信費用は、利用者のご負担となります。
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    支払方法
                                </dt>
                                <dd className="mt-1">クレジットカード決済</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    支払時期
                                </dt>
                                <dd className="mt-1">
                                    購入手続き完了時にお支払いが確定します。
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    サービス提供時期
                                </dt>
                                <dd className="mt-1">
                                    決済完了後、直ちに利用可能となります。
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    返品・キャンセル
                                </dt>
                                <dd className="mt-1 space-y-2">
                                    <p>
                                        デジタルサービスの性質上、決済完了後の返品・返金には
                                        原則として対応しておりません。
                                    </p>
                                    <p>
                                        ただし、システム障害等によりサービスが提供できなかった場合は、
                                        個別に対応いたします。
                                    </p>
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    動作環境
                                </dt>
                                <dd className="mt-1">
                                    最新の主要ブラウザ（Chrome / Safari 等）を推奨します。
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        ※ 本ページの内容は、提供内容の変更等により更新される場合があります。
                    </p>
                </section>

                {/* Footer */}
                <footer className="mt-10 pt-6 text-center space-x-4">
                    <Link href="/" className="text-sm underline">
                        トップへ戻る
                    </Link>
                    <Link href="/contact" className="text-sm underline">
                        お問い合わせ
                    </Link>
                </footer>
            </main>
        </div>
    );
}