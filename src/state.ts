import {compressToEncodedURIComponent as encode, decompressFromEncodedURIComponent as decode} from 'lz-string';

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

export const serialize = (s: State): string => encode(JSON.stringify(pack(s)));

export const unserialize = (encoded: string): State | undefined => {
  try {
    return unpack(JSON.parse(decode(encoded)));
  } catch (_) {
    return undefined;
  }
};
