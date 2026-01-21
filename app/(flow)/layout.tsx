// app/(flow)/layout.tsx
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FlowLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-white">

            {/* 上部固定ヘッダー */}
            <Header />

            {/* メイン（常に中央） */}
            <main className="flex-1 flex items-center justify-center px-6">
                {children}
            </main>

            {/* フッター */}
            <Footer />

        </div>
    );
}