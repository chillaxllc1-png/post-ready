// app/account/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getBalance } from "@/app/api/points/_store";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
    const cookieStore = await cookies();
    const sessionUser = cookieStore.get("session_user")?.value;

    // 未ログインは即リダイレクト
    if (!sessionUser) {
        redirect("/login");
    }

    const balance = getBalance(sessionUser);

    const points = balance?.points ?? 0;
    const expiresAt = balance?.expiresAt ?? "—";

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm flex flex-col gap-8 text-center">
                <div className="text-xs text-zinc-400 tracking-wide">
                    Post Ready
                </div>

                <h1 className="text-base text-zinc-900">
                    マイページ
                </h1>

                {/* 残高 */}
                <div className="rounded-xl border border-zinc-200 p-4 text-sm flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="text-zinc-500">保有ポイント</span>
                        <span className="text-zinc-900">
                            {points} pt
                        </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 text-left">
                        ※ 初回登録時に無償で提供されるポイントを含む場合があります
                    </p>

                    <div className="flex justify-between">
                        <span className="text-zinc-500">有効期限</span>
                        <span className="text-zinc-900">
                            {expiresAt === "—" ? "期限なし" : `${expiresAt} まで`}
                        </span>
                    </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    ※ ポイントは前払い式です。<br />
                    ※ 有効期限を過ぎたポイントは失効します。<br />
                    ※ 成果や結果を保証するものではありません。
                </p>

                <div className="flex flex-col gap-3">
                    <a
                        href="/points/use"
                        className="w-full rounded-xl bg-black py-3 text-white text-sm"
                    >
                        ポイントを利用する
                    </a>

                    <a
                        href="/points/buy"
                        className="w-full rounded-xl border border-zinc-200 py-3 text-sm"
                    >
                        ポイントを購入する
                    </a>
                </div>

                <a
                    href="/contact"
                    className="text-xs text-zinc-400 underline underline-offset-4"
                >
                    退会をご希望の場合はお問い合わせください
                </a>

                {/* 法的情報 */}
                <div className="mt-4 text-[11px] text-zinc-400 flex flex-col gap-1">
                    <a href="/terms" className="underline underline-offset-4">
                        利用規約
                    </a>
                    <a href="/privacy" className="underline underline-offset-4">
                        プライバシーポリシー
                    </a>
                    <a href="/tokutei" className="underline underline-offset-4">
                        特定商取引法に基づく表記
                    </a>
                </div>
            </div>
        </main>
    );
}