import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-6 mt-16">
            <div className="max-w-sm mx-auto flex flex-col items-center gap-2 text-[10px] text-zinc-400">

                {/* 法的リンク（縦置き） */}
                <Link href="/terms" className="hover:text-zinc-600 transition">
                    利用規約
                </Link>

                <Link href="/privacy" className="hover:text-zinc-600 transition">
                    プライバシー
                </Link>

                <Link href="/tokutei" className="hover:text-zinc-600 transition">
                    特定商取引法に基づく表記
                </Link>

                {/* ★追加：料金について（審査必須） */}
                <Link href="/pricing" className="hover:text-zinc-600 transition">
                    料金について
                </Link>

                <a
                    href="mailto:chillaxllc1@gmail.com"
                    className="hover:text-zinc-600 transition"
                >
                    お問い合わせ
                </a>

                {/* 区切り */}
                <div className="pt-2">
                    <Link
                        href="https://post-checker.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-zinc-600 transition"
                    >
                        投稿前の確認が必要なときは、Post Checker
                    </Link>
                </div>

            </div>
        </footer>
    );
}