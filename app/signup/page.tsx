"use client";

import { useState } from "react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!agree) {
            setError("利用規約とプライバシーポリシーへの同意が必要です");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error();
            }

            // 登録成功 → マイページへ
            window.location.href = "/account";
        } catch {
            setError("登録に失敗しました。入力内容をご確認ください。");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm flex flex-col gap-6">

                <div className="text-center text-xs text-zinc-400 tracking-wide">
                    Post Ready
                </div>

                <h1 className="text-center text-base text-zinc-800">
                    新規登録
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        required
                        placeholder="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm"
                    />

                    <input
                        type="password"
                        required
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm"
                    />

                    <label className="flex items-start gap-2 text-[11px] text-zinc-500">
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="mt-0.5"
                        />
                        <span>
                            <a href="/terms" className="underline">利用規約</a>
                            ・
                            <a href="/privacy" className="underline">プライバシーポリシー</a>
                            に同意します
                        </span>
                    </label>

                    {error && (
                        <div className="text-xs text-red-500 text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-black py-3 text-white text-sm disabled:opacity-40"
                    >
                        {loading ? "登録中..." : "登録して続ける"}
                    </button>
                </form>

                <div className="text-center text-xs text-zinc-400">
                    すでにアカウントをお持ちの方は{" "}
                    <a href="/login" className="underline underline-offset-4">
                        ログイン
                    </a>
                </div>

            </div>
        </main>
    );
}