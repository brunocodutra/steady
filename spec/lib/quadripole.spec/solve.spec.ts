import {_0} from 'lib/phasor';
import {project, quadripole, solve} from 'lib/quadripole';

import {phasors, samples} from './util';

describe('Quadripole', () => {
  it('should have a unique solution', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      const q = quadripole([[a, b], [c, d]], [e, f]);
      const [v, i] = solve(q);
      expect(project(q, [_0, i])).toBeCloseTo([v, _0]);
      phasors.forEach((vi) => {
        phasors.forEach((io) => {
          const [vo, ii] = solve(q, [vi, io]);
          expect(project(q, [vi, ii])).toBeCloseTo([vo, io], 1E-4);
        });
      });
    });
  });
});
