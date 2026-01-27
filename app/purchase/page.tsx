// app/purchase/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PurchaseClient from "./PurchaseClient";

export const dynamic = "force-dynamic";

export default async function PurchasePage() {
    const cookieStore = await cookies();
    const sessionUser = cookieStore.get("session_user")?.value;

    // 未ログインはログインへ
    if (!sessionUser) {
        redirect("/login");
    }

    // ログイン済みなら購入UI
    return <PurchaseClient />;
}