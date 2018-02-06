export const prefix = <T>(a: T[], b: T[]): boolean =>
  a.length < b.length && a.every((x, i) => x === b[i]);

export const equal = <T>(a: T[], b: T[]): boolean =>
  a.length === b.length && a.every((x, i) => x === b[i]);
