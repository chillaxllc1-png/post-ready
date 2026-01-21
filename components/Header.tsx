// components/Header.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    return (
        <header className="w-full px-6 py-3">
            <button
                type="button"
                onClick={() => router.back()}
                className="text-xs text-zinc-400 hover:text-zinc-600 transition"
            >
                ← 戻る
            </button>
        </header>
    );
}