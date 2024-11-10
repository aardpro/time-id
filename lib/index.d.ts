export function timeId(suffixLength?: number, accumulator?: (timestamp: number) => number): string
export function timeIdSync(suffixLength?: number, accumulatorSync?: (timestamp: number) => Promise<number>): Promise<string>
