import { depth, Element, ground, pack as packE, series, unpack as unpackE } from 'lib/element';

export type State = {
  readonly entry: Element,
  readonly active: number[],
};

const schematics = (next?: Element) => series(ground(next));

export const init = (next?: Element): State => {
  const entry = schematics(next);

  return {
    entry,
    active: [depth(entry)],
  };
};

export const pack = ({ entry, active }: State): unknown => (
  [packE(entry?.next?.next), active]
);

export const unpack = (packed: unknown): State => {
  if (
    !Array.isArray(packed) || packed.length !== 2 ||
    !Array.isArray(packed[1]) || !packed[1].every(Number.isInteger)
  ) {
    throw new Error(`expected '[entry, active]', got ${packed}`);
  }

  return {
    entry: schematics(unpackE(packed[0])),
    active: packed[1],
  };
};

export const serialize = (s: State): string => encodeURIComponent(btoa(JSON.stringify(pack(s))));

export const unserialize = (encoded: string): State | undefined => {
  try {
    return unpack(JSON.parse(atob(decodeURIComponent(encoded))));
  } catch (_) {
    return undefined;
  }
};
