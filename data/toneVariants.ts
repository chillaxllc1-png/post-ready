export const TONE_VARIANTS: Record<string, string[]> = {
    soft: [
        "今日は少しゆったりな気分です☺️",
        "今日は落ち着いた気分です🌷",
        "今日は穏やかに過ごせそうです☺️",
    ],

    bright: [
        "今日は元気に過ごせそうです😊",
        "今日は明るめな気分です✨",
        "楽しい一日になりそうです😊",
    ],

    sweet: [
        "今日はちょっと甘めな気分です☺️",
        "今日はふんわりした気分です🥰",
        "甘めに過ごせたら嬉しいな☺️",
    ],

    chill: [
        "今日はまったりな気分です🌿",
        "今日は落ち着いた空気です☕️",
        "ゆっくり過ごせそうです🌿",
    ],

    energetic: [
        "今日は元気めです😊",
        "今日はテンション高めです🙌",
        "楽しく過ごせそうです✨",
    ],
};

export function pickToneLine(tone: string): string | null {
    const list = TONE_VARIANTS[tone];
    if (!list) return null;
    return list[Math.floor(Math.random() * list.length)];
}