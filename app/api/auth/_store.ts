// app/api/auth/_store.ts

export type User = {
    id: string;
    email: string;
    passwordHash: string;
};

// 仮ユーザーストア（※DBに置き換える前提）
export const users = new Map<string, User>();