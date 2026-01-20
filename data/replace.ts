// data/replace.ts

type ReplaceParams = {
    time?: string;
    next_date?: string;
    next_time?: string;
};

export function replaceVars(
    text: string,
    params: ReplaceParams = {}
): string {
    let result = text;

    if (params.time) {
        result = result.replaceAll("{time}", params.time);
    }

    if (params.next_date) {
        result = result.replaceAll("{next_date}", params.next_date);
    }

    if (params.next_time) {
        result = result.replaceAll("{next_time}", params.next_time);
    }

    return result;
}