import {quadripole, connect, project} from 'lib/quadripole';

import {_1, samples} from './util';

describe('Quadripole', () => {
  it('should be associative', () => {
    samples.forEach(({a, b, c, d, e, f}) => {
      const p = quadripole([[a, b], [c, d]], [e, f]);
      samples.forEach(({a, b, c, d, e, f}) => {
        const q = quadripole([[a, b], [c, d]], [e, f]);
        const r = project(q, project(p, [_1, _1]));
        expect(project(connect(p, q), [_1, _1])).toBeCloseTo(r);
      });
    });
  });
});
