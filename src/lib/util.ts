export const unwrap = <X>(x?: X | null, msg?: string): X => {
  if (x === null || x === undefined) {
    throw new Error(msg);
  }

  return x;
};

export const hasProperty = <P extends PropertyKey>(o: object, p: P): o is { [K in P]: unknown } => (
  p in o && (o as any)[p] !== undefined
);