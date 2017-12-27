import {polar, div} from 'lib/phasor';

import {samples} from './util';

describe('Phasor', () => {
  it('should divide', () => {
    samples.forEach(({mag: a, ang: b}) => {
      samples.forEach(({mag: c, ang: d}) => {
        if((isFinite(a) || isFinite(c)) && (a !== 0 || c !== 0)) {
          const u = polar(a, b);
          const v = polar(c, d);
          const r = polar(a / c, b - d);
          expect(div(u, v)).toBeCloseTo(r);
        }
      });

      expect(div(polar(a, b), polar(NaN))).toBeNaN();
      expect(div(polar(a, b), polar(0, NaN))).toBeNaN();
      expect(div(polar(a, b), polar(NaN, NaN))).toBeNaN();
    });
  });
});
