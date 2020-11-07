import { project, quadripole } from 'lib/quadripole';

import { phasors, samples } from './util';

describe('Quadripole', () => {
  it('should project pairs of voltage and current', () => {
    samples.forEach(({ a, b, c, d, e, f }) => {
      const q = quadripole([[a, b], [c, d]], [e, f]);
      phasors.forEach((v) => {
        const x = a.mul(v).add(e);
        const y = c.mul(v).add(f);
        phasors.forEach((i) => {
          expect(project(q, [v, i])).toBeCloseTo([
            b.mul(i).add(x),
            d.mul(i).add(y),
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
