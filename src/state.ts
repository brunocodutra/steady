import base64 from 'base64url';
import msgpack from 'msgpack-lite';

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

export const pack = ({ entry, active }: State): any[] => (
  [packE((entry.next && entry.next.next) as Element), active]
);

export const unpack = (packed: any): State => {
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

export const serialize = (s: State): string => base64.encode(msgpack.encode(pack(s)));

export const unserialize = (encoded: string): State | undefined => {
  try {
    return unpack(msgpack.decode(base64.toBuffer(encoded)));
  } catch (_) {
    return undefined;
  }
};
