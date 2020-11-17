// eslint-disable-next-line @typescript-eslint/ban-types
export const traverse = <L extends { next?: L } | {}>(l?: L): L[] =>
  l !== undefined ? [l, ...traverse({ next: undefined, ...l }.next)] : [];

export const prefix = <T>(a: T[], b: T[]): boolean =>
  a.length < b.length && a.every((x, i) => x === b[i]);

export const equal = <T>(a: T[], b: T[]): boolean =>
  a.length === b.length && a.every((x, i) => x === b[i]);
