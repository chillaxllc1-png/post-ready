// app/terms/page.tsx
import Link from "next/link";

export const metadata = {
    title: "利用規約｜Post Ready",
    description:
        "Post Ready の利用条件および免責事項について記載しています。本サービスをご利用の際は事前にご確認ください。",
};

export default function TermsPage() {
    return (
        <main className="mx-auto w-full max-w-xl px-5 py-10">
            {/* Header */}
            <header className="mb-8 space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">利用規約</h1>

                <p className="text-sm text-zinc-600">
                    本ページは、「Post Ready」のβ版（テスト運用）としての利用条件を定めるものです。
                </p>

                <p className="text-xs text-zinc-500">最終更新日：2026年1月4日</p>
            </header>

            {/* Body */}
            <section className="space-y-6 text-sm leading-relaxed text-zinc-800">
                {/* 1 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">1. 本サービスについて</h2>

                    <p>
                        「Post Ready」（以下「本サービス」）は、
                        ジャンルや状況に応じた投稿文を、そのまま利用できる形で表示するためのツールです。
                    </p>

                    <p>
                        本サービスは、投稿内容の良否、適切性、効果、反応、結果等を判断・評価・助言するものではありません。
                    </p>

                    <p>
                        本サービスは{" "}
                        <span className="font-semibold">
                            X（旧Twitter）およびその運営会社とは一切関係のない非公式サービス
                        </span>{" "}
                        です。
                    </p>
                </div>

                {/* 2 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">2. 利用条件</h2>

                    <p>
                        利用者は、自己の判断と責任において本サービスを利用するものとします。
                        本サービスの利用により生じたいかなる損害についても、
                        本サービスの運営者は、原則として責任を負いません。
                    </p>

                    <p>
                        本サービスは現在β版（テスト運用）として提供されており、
                        予告なく表示内容、文面、構成等が変更される場合があります。
                    </p>

                    <p>本サービスが表示する投稿文は、原則として保存されません。</p>

                    <p>
                        ただし、サービス改善および利用状況把握のため、
                        投稿内容そのものを含まない匿名の利用ログを、必要な範囲で取得する場合があります。
                    </p>

                    <p>
                        本サービスにおいて購入されるポイントには有効期限があります。
                        ポイントの有効期限は、各ポイントの購入日から起算して6ヶ月以内とし、
                        有効期限を経過したポイントは自動的に失効し、以後利用することはできません。
                        失効したポイントについては、返金、再発行、または再付与は行われません。
                    </p>
                </div>

                {/* 3 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">3. 禁止事項</h2>

                    <p>利用者は、以下の行為を行ってはならないものとします。</p>

                    <ul className="list-disc space-y-1 pl-5">
                        <li>本サービスの運営を妨げる行為</li>
                        <li>不正アクセス、またはそれに準ずる行為</li>
                        <li>法令または公序良俗に反する目的での利用</li>
                        <li>その他、運営者が不適切と判断する行為</li>
                    </ul>
                </div>

                {/* 4 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">4. 免責事項</h2>

                    <p>
                        本サービスが表示する投稿文は、あくまで文章の一例を示すものであり、
                        投稿結果、反応、表示状況等を保証するものではありません。
                    </p>

                    <p>
                        投稿の表示制限、凍結、その他の措置については、
                        外部プラットフォーム側の判断および運用により行われるものであり、
                        本サービスが関与するものではありません。
                    </p>

                    <p>
                        本サービスは、予告なく提供内容の変更、停止、または終了を行う場合があります。
                    </p>
                </div>

                {/* 5 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">5. 規約の変更</h2>

                    <p>本サービスの運営者は、必要に応じて本規約の内容を変更できるものとします。</p>

                    <p>変更後の利用規約は、本ページに掲載した時点で効力を生じるものとします。</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-10 pt-6 text-center">
                <Link href="/" className="text-sm text-zinc-500 underline">
                    トップへ戻る
                </Link>
            </footer>
        </main>
    );
}