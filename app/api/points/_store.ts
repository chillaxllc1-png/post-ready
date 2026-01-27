// app/api/points/_store.ts

export type PointBalance = {
    points: number;
    expiresAt?: string; // YYYY-MM-DD
};

// v1: 仮ストア（DB置換前提）
const balances = new Map<string, PointBalance>();

/**
 * 有効期限チェック
 */
function isExpired(expiresAt?: string): boolean {
    if (!expiresAt) return false;
    const d = new Date(`${expiresAt}T00:00:00.000Z`);
    return Date.now() > d.getTime();
}

/**
 * 残高取得
 */
export function getBalance(userId: string): PointBalance | null {
    const current = balances.get(userId);
    if (!current) return null;

    // 期限切れは 0pt 扱い（v1簡易仕様）
    if (isExpired(current.expiresAt)) {
        return {
            points: 0,
            expiresAt: current.expiresAt,
        };
    }

    return current;
}

/**
 * ポイント付与（Webhook 専用）
 * - Webhook が唯一の加算元
 */
export function addPoints(
    userId: string,
    amount: number,
    expiresAt?: string
) {
    const current = getBalance(userId);
    const nextPoints = (current?.points ?? 0) + amount;

    balances.set(userId, {
        points: nextPoints,
        // v1: 最後に購入した期限で上書き
        expiresAt: expiresAt ?? current?.expiresAt,
    });
}

/**
 * ポイント消費
 */
export function consumePoints(
    userId: string,
    cost: number
): {
    ok: boolean;
    reason?: "not_found" | "expired" | "insufficient_points";
    points: number;
    expiresAt?: string;
} {
    const current = balances.get(userId);

    if (!current) {
        return { ok: false, reason: "not_found", points: 0 };
    }

    if (isExpired(current.expiresAt)) {
        return {
            ok: false,
            reason: "expired",
            points: 0,
            expiresAt: current.expiresAt,
        };
    }

    if (current.points < cost) {
        return {
            ok: false,
            reason: "insufficient_points",
            points: current.points,
            expiresAt: current.expiresAt,
        };
    }

    const nextPoints = current.points - cost;
    balances.set(userId, { ...current, points: nextPoints });

    return {
        ok: true,
        points: nextPoints,
        expiresAt: current.expiresAt,
    };
}