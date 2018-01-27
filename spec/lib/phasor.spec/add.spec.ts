import {add, rect} from 'lib/phasor';

import {samples} from './util';

describe('Phasor', () => {
  it('should add', () => {
    samples.forEach(({real: a, imag: b}) => {
      samples.forEach(({real: c, imag: d}) => {
        if ((isFinite(a) || isFinite(c) || a === c) && (isFinite(b) || isFinite(d) || b === d)) {
          const u = rect(a, b);
          const v = rect(c, d);
          const r = rect(a + c, b + d);
          expect(add(u, v)).toBeCloseTo(r);
        }
      });

      expect(add(rect(a, b), rect(NaN))).toBeNaN();
      expect(add(rect(a, b), rect(0, NaN))).toBeNaN();
      expect(add(rect(a, b), rect(NaN, NaN))).toBeNaN();
    });
  });
});
