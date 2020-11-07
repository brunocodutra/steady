import { _0, _1, Phasor, polar } from 'lib/phasor';

export const phasors: Phasor[] = [1E-3, 1, 1E3].map((mag) =>
  Array(8).fill(Math.PI / 4).map((p, k) => polar(mag, p * k)),
).flat();

type Sample = { a: Phasor, b: Phasor, c: Phasor, d: Phasor, e: Phasor, f: Phasor };

const nil: Sample[] = [];
export const samples: Sample[] = nil.concat(
  phasors.map((p) => ({ a: _1, b: p, c: _0, d: _1, e: _0, f: _0 })),
  phasors.map((p) => ({ a: _1, b: _0, c: p, d: _1, e: _0, f: _0 })),
  phasors.map((p) => ({ a: _1, b: _0, c: _0, d: _1, e: p, f: _0 })),
  phasors.map((p) => ({ a: _1, b: _0, c: _0, d: _1, e: _0, f: p })),
  phasors.map((p) => ({ a: p, b: _0, c: _0, d: p.recip(), e: _0, f: _0 })),
  phasors.map((p) => {
    const s = p.ln().sinh();
    const c = p.ln().cosh();
    return { a: c, b: s, c: s, d: c, e: _0, f: _0 };
  }),
);
