/* eslint-disable @typescript-eslint/ban-types */

export const traverse = <L extends { next?: L } | {}>(l?: L): L[] =>
  l !== undefined ? [l, ...traverse({ next: undefined, ...l }.next)] : [];

export const prefix = <T>(a: T[], b: T[]): boolean =>
  a.length < b.length && a.every((x, i) => x === b[i]);

export const equal = <T>(a: T[], b: T[]): boolean =>
  a.length === b.length && a.every((x, i) => x === b[i]);

export const unwrap = <X>(x?: X | null, msg?: string): X => {
  if (x === null || x === undefined) {
    throw new Error(msg);
  }

  return x;
};

export const hasProperty = <O extends {}, P extends PropertyKey>(o: O, p: P): o is O & Record<P, unknown> => p in o;
