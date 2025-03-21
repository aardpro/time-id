const KEY = Symbol("timestamp_key");

/**
 * A function that accumulates a number for each given timestamp.
 * The given timestamp's accumulation number is returned.
 * The accumulation numbers are stored in the global scope and are
 * removed when a newer timestamp is given.
 * @param timestamp the timestamp to accumulate
 * @returns the accumulation number for the given timestamp
 */
function myAccumulator(timestamp: number): number {
  /* @ts-expect-error global */
  if (typeof globalThis[KEY] === "undefined") {
    /* @ts-expect-error global */
    globalThis[KEY] = new Map();
  }
  /* @ts-expect-error global */
  const g = globalThis[KEY];
  for (const k of g.keys()) {
    if (k < timestamp) {
      g.delete(k);
    }
  }
  const cur = g.get(timestamp) || 0;
  if (!cur) {
    g.set(timestamp, 1);
  } else {
    g.set(timestamp, cur + 1);
  }

  return cur + 1;
}

// converts a number to a corresponding lowercase letter, where 0 maps to 'a', 1 maps to 'b', and so on.
const num2c = (num: number): string => String.fromCharCode(num + 97);

/**
 * Converts a number to a corresponding base26 string, where 0 maps to 'a', 1 maps to 'b', and so on.
 * @param {number} num the number to convert
 * @param {number} [length=0] the length of the output string. If the actual length of the string is shorter than the specified length, it will be padded with 'a'.
 * @returns {string}
 */
function toBase26(num: number, length = 0): string {
  if (num < 0) {
    return `0${toBase26(-num, length)}`;
  }
  if (num === 0) {
    return num2c(num).padStart(length, num2c(0));
  }
  const arr = [];
  let n = num;
  while (n > 0) {
    const m = n % 26;
    arr.push(m);
    n = (n - m) / 26;
  }
  return arr
    .reverse()
    .map((item) => num2c(item))
    .join("")
    .padStart(length, num2c(0));
}

/**
 * Generates a unique id string based on the current timestamp in milliseconds.
 * @param {number} [suffixLength=3] the length of the suffix to append to the id string.
 * If 0 or negative, no suffix is appended.
 * @param {function} [accumulator=myAccumulator] the accumulator function that is
 * used to generate a unique number for each given timestamp.
 * The accumulator function is called with the current timestamp and should return
 * a number that is unique for the given timestamp.
 * If the accumulator function is not provided, the myAccumulator function is used.
 * @returns {string} the generated unique id string.
 */
export function timeId(suffixLength = 3, accumulator = myAccumulator): string {
  const num = Date.now();
  const id = toBase26(num);
  if (suffixLength < 1 || typeof accumulator !== "function") {
    return id;
  }
  const suffix = toBase26(myAccumulator(num), suffixLength);
  return `${id}${suffix}`;
}

/**
 * Generates a unique id string based on the current timestamp in milliseconds,
 * with a suffix generated by calling the given accumulatorAsync function.
 * @param {number} [suffixLength=3] the length of the suffix to append to the id string.
 * If 0 or negative, no suffix is appended.
 * @param {function} [accumulatorAsync=myAccumulatorAsync] the accumulator function that is
 * used to generate a unique number for each given timestamp.
 * The accumulator function is called with the current timestamp and should return
 * a number that is unique for the given timestamp.
 * If the accumulator function is not provided, the myAccumulatorAsync function is used.
 * @returns {Promise<string>} the generated unique id string.
 */
export async function timeIdAsync(
  suffixLength = 3,
  accumulatorAsync = (num: number) => Promise.resolve(myAccumulator(num))
): Promise<string> {
  const num = Date.now();
  const id = toBase26(num);
  if (suffixLength < 1 || typeof accumulatorAsync !== "function") {
    return id;
  }
  const seq = await accumulatorAsync(num);
  const suffix = toBase26(seq, suffixLength);
  return `${id}${suffix}`;
}
