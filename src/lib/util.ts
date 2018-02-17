export const unwrap = <X>(x?: X | null, msg?: string): X => {
  if (x === null || x === undefined) {
    throw new Error(msg);
  }

  return x;
};
