import { Suspense } from "react";
import ResultClient from "./ResultClient";

// 検索パラメータ依存なので静的生成にしない（安全策）
export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <ResultClient />
        </Suspense>
    );
}