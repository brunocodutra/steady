import { Phasor, polar } from 'phasor.js';

export * from 'phasor.js';

export const _0 = polar(0);
export const _1 = polar(1);

export const closeTo = (p: Phasor, q: Phasor, e: number = Number.EPSILON) => (
  p.ulpsEq(q, e, e / Number.EPSILON) || (
    polar(p.norm()).ulpsEq(_0, e, 0) &&
    polar(q.norm()).ulpsEq(_0, e, 0)
  )
);

export const pack = (p: Phasor) => [p.mag, p.tan];

export const unpack = (packed: unknown): Phasor => {
  if (!Array.isArray(packed) || packed.length !== 2) {
    throw new Error(`expected '[mag, tan]', got ${packed}`);
  }

  return new Phasor(+packed[0], +packed[1]);
};
