// app/(flow)/select/page.tsx
import { Suspense } from "react";
import SelectClient from "./SelectClient";

// 検索パラメータ依存なので静的生成しない（安全策）
export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <SelectClient />
        </Suspense>
    );
}