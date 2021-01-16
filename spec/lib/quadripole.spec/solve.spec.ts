import { _0 } from 'lib/phasor';
import { project, solve } from 'lib/quadripole';

import { phasors, quadripoles } from '../../util';

describe('Quadripole', () => {
  it('should have a unique solution', () => {
    quadripoles.forEach((q) => {
      expect(solve(q)).toBeCloseTo(solve(q, [_0, _0]));
      phasors.forEach((vi) => {
        phasors.forEach((io) => {
          const [vo, ii] = solve(q, [vi, io]);
          expect(project(q, [vi, ii])).toBeCloseTo([vo, io], 1E-4);
        });
      });
    });
  });
});
