import { Suspense } from "react";
import PurchaseClient from "./PurchaseClient";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <PurchaseClient />
        </Suspense>
    );
}