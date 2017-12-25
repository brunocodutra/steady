import closeTo from 'jest/closeTo';

import {quadripole, eye, rotation, translation, project, solve, connect} from 'lib/quadripole';
import {Phasor, polar, rect, add, sub, mul, div} from 'lib/phasor';

expect.extend(closeTo);

const _0 = rect(0);
const _1 = rect(1);

const Ps: Phasor[] = [].concat.apply(
  [],
  [1E-3, 1, 1E3].map((mag) =>
    Array(8).fill(Math.PI / 4).map((p, k) => polar(mag, p * k))
  ),
);

type Sample = {a: Phasor, b: Phasor, c: Phasor, d: Phasor, e: Phasor, f: Phasor};

const nil: Sample[] = [];
const samples: Sample[] = nil.concat(
  Ps.map((p) => ({a: _1, b: p, c: _0, d: _1, e: _0, f: _0})),
  Ps.map((p) => ({a: _1, b: _0, c: p, d: _1, e: _0, f: _0})),
  Ps.map((p) => ({a: _1, b: _0, c: _0, d: _1, e: p, f: _0})),
  Ps.map((p) => ({a: _1, b: _0, c: _0, d: _1, e: _0, f: p})),
  Ps.map((p) => ({a: p, b: _0, c: _0, d: div(_1, p), e: _0, f: _0})),
  Ps.map((p) => {
    const s = sub(div(p, rect(2)), div(rect(0.5), p));
    const c = add(div(p, rect(2)), div(rect(0.5), p));
    return {a: c, b: s, c: s, d: c, e: _0, f: _0};
  }),
);

describe('Quadripole', () => {
  it('should be member of the special linear group', () => {
    samples.forEach(({a, b, c, d}) => {
      expect(sub(mul(a, d), mul(b, c))).toBeCloseTo(_1);
    });
  });

  it('should have a rotation part', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      expect(rotation(quadripole([[a, b], [c, d]]))).toBeCloseTo([[a, b], [c, d]]);
      expect(rotation(quadripole([[a, b], [c, d]], [e, f]))).toBeCloseTo([[a, b], [c, d]]);
    });
  });

  it('should have a translation part', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      expect(translation(quadripole([[a, b], [c, d]]))).toBeCloseTo([_0, _0]);
      expect(translation(quadripole([[a, b], [c, d]], [e, f]))).toBeCloseTo([e, f]);
    });
  });

  it('should be composed of rotation followed by translation', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      const r = quadripole([[a, b], [c, d]]);
      const t = quadripole(eye, [e, f]);
      expect(connect(r, t)).toBeCloseTo(quadripole([[a, b], [c, d]], [e, f]));
    });
  });

  it('should project pairs of voltage and current', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      const q = quadripole([[a, b], [c, d]], [e, f]);
      Ps.forEach((v) => {
        const x = add(mul(a, v), e);
        const y = add(mul(c, v), f);
        Ps.forEach((i) => {
          expect(project(q, [v, i])).toBeCloseTo([
            add(mul(b, i), x),
            add(mul(d, i), y),
          ]);
        });
      });
    });

    Ps.forEach((v) => {
      Ps.forEach((i) => {
        expect(project(quadripole(), [v, i])).toBeCloseTo([v, i]);
      });
    });
  });

  it('should have a unique solution', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      const q = quadripole([[a, b], [c, d]], [e, f]);
      const [v, i] = solve(q);
      expect(project(q, [_0, i])).toBeCloseTo([v, _0]);
      Ps.forEach((vi) => {
        Ps.forEach((io) => {
          const [vo, ii] = solve(q, [vi, io]);
          expect(project(q, [vi, ii])).toBeCloseTo([vo, io]);
        });
      });
    });
  });

  it('should be associative', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      const p = quadripole([[a, b], [c, d]], [e, f]);
      samples.forEach(({a, b, c, d, e, f}) => {
        const q = quadripole([[a, b], [c, d]], [e, f]);
        const r = project(q, project(p, [_1, _1]));
        expect(project(connect(p, q), [_1, _1])).toBeCloseTo(r);
      });
    });
  });
});
