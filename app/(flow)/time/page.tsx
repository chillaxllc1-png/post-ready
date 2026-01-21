import { Suspense } from "react";
import TimeClient from "./TimeClient";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <TimeClient />
        </Suspense>
    );
}