export const unwrap = <X>(x?: X | null, msg?: string): X => {
  if (x === null || x === undefined) {
    throw new Error(msg);
  }

  return x;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const hasProperty = <O extends {}, P extends PropertyKey>(o: O, p: P): o is O & Record<P, unknown> => p in o;