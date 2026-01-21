// app/contact/page.tsx
import Link from "next/link";

export const metadata = {
    title: "お問い合わせ｜Post Ready",
    description:
        "Post Ready に関するご質問や不具合のご報告はこちらから受け付けています。",
};

export default function ContactPage() {
    return (
        <main className="mx-auto w-full max-w-xl px-5 py-10">
            {/* Header */}
            <header className="mb-8 space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">
                    お問い合わせ
                </h1>

                <p className="text-sm text-zinc-600">
                    Post Ready に関するご質問や、不具合のご報告がありましたら
                    こちらからご連絡ください。
                </p>

                <p className="text-xs text-zinc-500">
                    ※ 本サービスは現在β版として提供しており、
                    返信にお時間をいただく場合があります。
                </p>
            </header>

            {/* Content */}
            <section className="space-y-5 text-sm leading-relaxed text-zinc-800">
                <div className="rounded-2xl bg-white p-5 border border-zinc-200">
                    <p className="mb-2 text-zinc-700">
                        お問い合わせは、以下のメールアドレスにて受け付けています。
                    </p>

                    {/* メールアドレス */}
                    <p className="text-base font-semibold">
                        <a
                            href="mailto:chillaxllc1@gmail.com"
                            className="underline underline-offset-4 text-zinc-700"
                        >
                            chillaxllc1@gmail.com
                        </a>
                    </p>

                    <p className="mt-4 text-xs text-zinc-500">
                        可能であれば、以下の情報を添えていただけると対応がスムーズになります。
                    </p>

                    <ul className="mt-2 list-disc pl-5 text-xs text-zinc-500 space-y-1">
                        <li>ご利用の端末（例：iPhone / Android / PC など）</li>
                        <li>ブラウザ（例：Safari / Chrome など）</li>
                        <li>発生した内容や表示されたメッセージ</li>
                    </ul>

                    {/* ★ 重要：期待値コントロール */}
                    <p className="mt-4 text-xs text-zinc-500">
                        ※ 投稿文の内容そのものに関するご相談や、
                        文章表現の個別調整・添削依頼には対応できない場合があります。
                    </p>

                    <p className="mt-2 text-xs text-zinc-500">
                        ※ 内容によっては、すべてのお問い合わせに返信できない場合があります。
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