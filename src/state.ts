import {compressToEncodedURIComponent as encode, decompressFromEncodedURIComponent as decode} from 'lz-string';

import {Element, series} from 'lib/element';

export type State = {
  readonly entry: Element,
  readonly active: number[],
};

export const init: State = {
  entry: series(),
  active: [2],
};

// best effort
const isState = (s: any): s is State => typeof s === 'object' && 'entry' in s && 'active' in s;

export const serialize = (state: State): string => encode(JSON.stringify(state));

export const unserialize = (encoded: string): State | undefined => {
  try {
    const obj = JSON.parse(decode(encoded));
    return isState(obj) ? obj : undefined;
  } catch (_) {
    return undefined;
  }
};
