import {Kind, shunt, series, make} from 'lib/element';
import {rect, sub} from 'lib/phasor';
import {project, solve} from 'lib/quadripole';

import {kinds, phasors, vizy} from './util';

describe('Shunt', () => {
  it('should be default constructible', () => {
    expect(shunt().kind).toBe(Kind.shunt);
    expect(make(Kind.shunt).kind).toBe(Kind.shunt);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(shunt(next).next).toBe(next);
    });
  });

  it('should accommodate both branches within its level', () => {
    kinds.forEach((k) => {
      const next = make(k);
      kinds.forEach((k) => {
        const branch = series(make(k));
        expect(shunt(next, branch).level).toBe(next.level + branch.level + 1);
      });
    });
  });

  it('should model a shunt sub-circuit', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        vizy.forEach((ky) => {
          const y = make(ky, undefined, v);
          vizy.forEach((kx) => {
            const x = series(make(kx, y, i));

            const {model} = shunt(undefined, x);
            expect(project(model, [v, i])).toBeCloseTo([v, sub(i, solve(x.model, [v, rect(0)])[1])]);
          });
        });
      });
    });
  });
});
