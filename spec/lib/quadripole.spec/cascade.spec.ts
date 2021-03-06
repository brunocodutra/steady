import { _1 } from 'lib/phasor';
import { cascade, project } from 'lib/quadripole';

import { quadripoles } from '../../util';

describe('Quadripole', () => {
  it('should be associative', () => {
    quadripoles.forEach((p) => {
      quadripoles.forEach((q) => {
        const r = project(q, project(p, [_1, _1]));
        expect(project(cascade(p, q), [_1, _1])).toBeCloseTo(r);
      });
    });
  });
});
