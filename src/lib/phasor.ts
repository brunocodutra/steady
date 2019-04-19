export * from 'phasor.js';

import { Phasor, polar } from 'phasor.js';

export const _0 = polar(0);
export const _1 = polar(1);

export const pack = (p: Phasor) => [p.mag, p.tan];

export const unpack = (packed: any): Phasor => {
  if (!Array.isArray(packed) || packed.length !== 2) {
    throw new Error(`expected '[mag, tan]', got ${packed}`);
  }

  return { mag: +packed[0], tan: +packed[1] };
};
