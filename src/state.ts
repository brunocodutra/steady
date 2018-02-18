import base64 from 'base64url';
import * as msgpack from 'msgpack-lite';

import {depth, Element, ground, pack as packE, series, unpack as unpackE} from 'lib/element';

export type State = {
  readonly entry: Element,
  readonly active: number[],
};

export const init = (next?: Element): State => {
  const entry = series(ground(next));

  return {
    entry,
    active: [depth(entry)],
  };
};

export const pack = ({entry}: State): any[] => packE((entry.next && entry.next.next) as Element);
export const unpack = (packed: any): State => init(unpackE(packed));

export const serialize = (s: State): string => base64.encode(msgpack.encode(pack(s)));

export const unserialize = (encoded: string): State | undefined => {
  try {
    return unpack(msgpack.decode(base64.toBuffer(encoded)));
  } catch (_) {
    return undefined;
  }
};
