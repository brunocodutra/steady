import closeTo from 'jest/closeTo';

import {Phasor, polar, rect, add, sub, div} from 'lib/phasor';

expect.extend(closeTo);

export const _0 = rect(0);
export const _1 = rect(1);

export const phasors: Phasor[] = [].concat.apply(
  [],
  [1E-3, 1, 1E3].map((mag) =>
    Array(8).fill(Math.PI / 4).map((p, k) => polar(mag, p * k))
  ),
);

type Sample = {a: Phasor, b: Phasor, c: Phasor, d: Phasor, e: Phasor, f: Phasor};

const nil: Sample[] = [];
export const samples: Sample[] = nil.concat(
  phasors.map((p) => ({a: _1, b: p, c: _0, d: _1, e: _0, f: _0})),
  phasors.map((p) => ({a: _1, b: _0, c: p, d: _1, e: _0, f: _0})),
  phasors.map((p) => ({a: _1, b: _0, c: _0, d: _1, e: p, f: _0})),
  phasors.map((p) => ({a: _1, b: _0, c: _0, d: _1, e: _0, f: p})),
  phasors.map((p) => ({a: p, b: _0, c: _0, d: div(_1, p), e: _0, f: _0})),
  phasors.map((p) => {
    const s = sub(div(p, rect(2)), div(rect(0.5), p));
    const c = add(div(p, rect(2)), div(rect(0.5), p));
    return {a: c, b: s, c: s, d: c, e: _0, f: _0};
  }),
);
