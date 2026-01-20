// app/privacy/page.tsx
import Link from "next/link";

export const metadata = {
    title: "プライバシーポリシー｜Post Ready",
    description:
        "Post Ready における情報の取り扱い方針について説明しています。",
};

export default function PrivacyPage() {
    return (
        <main className="mx-auto w-full max-w-xl px-5 py-10">
            {/* Header */}
            <header className="mb-8 space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">
                    プライバシーポリシー
                </h1>

                <p className="text-sm text-zinc-600">
                    本サービスはβ版（テスト運用）として提供されています。
                    本ポリシーは、「Post Ready」における情報の取り扱い方針を示すものです。
                </p>

                <p className="text-xs text-zinc-500">
                    最終更新日：2026年1月4日
                </p>
            </header>

            {/* Body */}
            <section className="space-y-6 text-sm leading-relaxed text-zinc-800">
                {/* 1 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">1. 基本方針</h2>

                    <p>
                        本サービスは、利用者の操作および体験を尊重し、
                        必要以上の情報を取り扱わない方針で運用されます。
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
                    <h2 className="text-base font-semibold">
                        2. 表示される投稿文の取り扱い
                    </h2>

                    <p>
                        本サービスにおいて表示される投稿文は、
                        <span className="font-semibold">原則として保存されません</span>。
                    </p>

                    <p>
                        本サービスは、表示される投稿文の内容そのものを
                        記録・分析・評価することは行いません。
                    </p>

                    <p>
                        ただし、サービスの安定運用および体験改善のため、
                        投稿文そのものを含まない
                        <span className="font-semibold">
                            匿名の利用ログ（画面遷移、操作状況等）
                        </span>
                        を取得する場合があります。
                    </p>
                </div>

                {/* 3 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">
                        3. 取得する可能性がある情報
                    </h2>

                    <p>
                        本サービスでは、必要な範囲において以下の情報を取得する場合があります。
                    </p>

                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            匿名のアクセス情報（閲覧・利用の頻度、参照ページなど）
                        </li>
                        <li>
                            匿名の操作イベント情報（画面遷移、ボタン押下など）
                        </li>
                        <li>
                            技術的情報（ブラウザ種別、OS種別、画面サイズ等、
                            動作改善に必要な範囲）
                        </li>
                        <li>
                            エラー情報（不具合調査のための例外情報等）
                        </li>
                    </ul>

                    <p className="text-xs text-zinc-500">
                        ※ これらの情報のみから、個人を特定することを目的とした運用は行いません。
                    </p>
                </div>

                {/* 4 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">4. 利用目的</h2>

                    <p>取得した情報は、主に以下の目的で利用されます。</p>

                    <ul className="list-disc pl-5 space-y-1">
                        <li>本サービスの提供・維持・保護（不正利用の抑止を含む）</li>
                        <li>表示内容や操作体験の改善</li>
                        <li>障害対応、不具合調査、問い合わせ対応</li>
                    </ul>
                </div>

                {/* 5 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">5. 保存期間</h2>

                    <p>
                        取得したログ情報は、運用上必要な期間に限り保持され、
                        不要となった場合は順次削除または集計化されます。
                    </p>

                    <p className="text-xs text-zinc-500">
                        ※ β版運用中は、改善サイクルの都合により保持期間が変動する場合があります。
                    </p>
                </div>

                {/* 6 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">6. 第三者提供</h2>

                    <p>
                        取得した情報を、個人を特定できる形で第三者に提供することはありません。
                        ただし、法令に基づく要請がある場合はこの限りではありません。
                    </p>
                </div>

                {/* 7 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">
                        7. 外部サービス・委託について
                    </h2>

                    <p>
                        本サービスの運用および改善のため、
                        アクセス解析やログ収集等の外部サービスを利用する場合があります。
                        その場合も、利用目的の範囲内で適切に取り扱われます。
                    </p>
                </div>

                {/* 8 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">8. 安全管理</h2>

                    <p>
                        取得した情報は、漏えい・改ざん・不正アクセス等を防止するため、
                        合理的な範囲での安全管理措置が講じられます。
                    </p>
                </div>

                {/* 9 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">9. お問い合わせ</h2>

                    <p>
                        本ポリシーに関するお問い合わせは、
                        サイト内の「お問い合わせ」ページよりご連絡ください。
                    </p>
                </div>

                {/* 10 */}
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">10. 改定</h2>

                    <p>
                        本ポリシーは、必要に応じて変更される場合があります。
                        変更後の内容は、本ページに掲載された時点で適用されます。
                    </p>
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