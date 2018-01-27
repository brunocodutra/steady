import {add, mul} from 'lib/phasor';
import {project, quadripole} from 'lib/quadripole';

import {phasors, samples} from './util';

describe('Quadripole', () => {
  it('should project pairs of voltage and current', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      const q = quadripole([[a, b], [c, d]], [e, f]);
      phasors.forEach((v) => {
        const x = add(mul(a, v), e);
        const y = add(mul(c, v), f);
        phasors.forEach((i) => {
          expect(project(q, [v, i])).toBeCloseTo([
            add(mul(b, i), x),
            add(mul(d, i), y),
          ]);
        });
      });
    });

    phasors.forEach((v) => {
      phasors.forEach((i) => {
        expect(project(quadripole(), [v, i])).toBeCloseTo([v, i]);
      });
    });
  });
});
