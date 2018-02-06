import {_0, _1, mul, sub} from 'lib/phasor';
import {connect, eye, quadripole, rotation, translation} from 'lib/quadripole';

import {samples} from './quadripole.spec/util';

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
});
