"use client";

import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error();
            }

            const data = await res.json();
            window.location.href = data.redirectTo ?? "/account";
        } catch {
            setError("メールアドレスまたはパスワードが正しくありません");
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
                    ログイン
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
                        {loading ? "ログイン中..." : "ログイン"}
                    </button>
                </form>

                <div className="text-center text-xs text-zinc-400">
                    アカウントをお持ちでない方は{" "}
                    <a href="/signup" className="underline underline-offset-4">
                        新規登録
                    </a>
                </div>

            </div>
        </main>
    );
}