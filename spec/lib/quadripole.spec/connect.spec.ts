import {_1} from 'lib/phasor';
import {connect, project, quadripole} from 'lib/quadripole';

import {samples} from './util';

describe('Quadripole', () => {
  it('should be associative', () => {
    const quadripoles = samples.map(({a, b, c, d, e, f}) => quadripole([[a, b], [c, d]], [e, f]));
    quadripoles.forEach((p) => {
      quadripoles.forEach((q) => {
        const r = project(q, project(p, [_1, _1]));
        expect(project(connect(p, q), [_1, _1])).toBeCloseTo(r);
      });
    });
  });
});
