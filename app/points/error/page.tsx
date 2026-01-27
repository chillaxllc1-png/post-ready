// app/points/error/page.tsx
import { useSearchParams } from "next/navigation";

export default function PointErrorPage() {
    const searchParams = useSearchParams();
    const reason = searchParams.get("reason");

    let message = (
        <>
            ポイントの消費処理を
            <br />
            正常に完了できませんでした。
        </>
    );

    if (reason === "insufficient_points") {
        message = (
            <>
                保有ポイントが不足しています。
                <br />
                ポイントを購入してから再度お試しください。
            </>
        );
    }

    if (reason === "expired") {
        message = (
            <>
                ポイントの有効期限が
                <br />
                切れている可能性があります。
            </>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm flex flex-col gap-6 text-center">
                <div className="text-xs text-zinc-400 tracking-wide">
                    Post Ready
                </div>

                <h1 className="text-base text-zinc-900">
                    処理を完了できませんでした
                </h1>

                <p className="text-sm text-zinc-600 leading-relaxed">
                    {message}
                </p>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    ※ この操作によって、
                    <br />
                    ポイントが消費されることはありません。
                </p>

                <a
                    href="/points/use"
                    className="w-full rounded-xl border border-zinc-200 py-4 text-sm text-center text-zinc-800"
                >
                    もう一度試す
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