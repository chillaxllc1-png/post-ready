export const TIME_VARIANTS = {
    now: [
        "今から",
        "このあと",
        "すぐご案内できます",
    ],
    later: [
        "18時ごろ",
        "夕方から",
        "夜にかけて",
    ],
};

export function pickRandom(list: string[]): string {
    return list[Math.floor(Math.random() * list.length)];
}