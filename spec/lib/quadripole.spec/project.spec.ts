import { project, quadripole } from 'lib/quadripole';

import { phasors, quadripoles } from '../../util';

describe('Quadripole', () => {
  it('should project pairs of voltage and current', () => {
    quadripoles.forEach((q) => {
      const { r: [[a, b], [c, d]], t: [e, f] } = q;

      phasors.forEach((v) => {
        phasors.forEach((i) => {
          expect(project(q, [v, i])).toBeCloseTo([
            e.add(a.mul(v)).add(b.mul(i)),
            f.add(c.mul(v)).add(d.mul(i)),
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
