import { _0, _1 } from 'lib/phasor';
import { closeTo, connect, eye, quadripole } from 'lib/quadripole';

import { quadripoles } from '../util';

describe('Quadripole', () => {
  it('should be member of the special linear group', () => {
    quadripoles.forEach(({ r: [[a, b], [c, d]] }) => {
      expect(a.mul(d).sub(b.mul(c))).toBeCloseTo(_1);
    });
  });

  it('should be composed of rotation followed by translation', () => {
    quadripoles.forEach((q) => {
      const r = quadripole(q.r);
      const t = quadripole(eye, q.t);
      expect(connect(r, t)).toBeCloseTo(q);
    });
  });

  it('should be comparable for approximate equality', () => {
    quadripoles.forEach((p) => {
      quadripoles.forEach((q) => {
        expect(closeTo(p, q)).toBe(p == q);
      });
    });
  });
});
