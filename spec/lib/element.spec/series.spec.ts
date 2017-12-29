import {Kind, series, make} from 'lib/element';
import {connect} from 'lib/quadripole';

import {kinds, phasors, vizy} from './util';

describe('Series', () => {
  it('should be default constructible', () => {
    expect(series().kind).toBe(Kind.series);
    expect(make(Kind.series).kind).toBe(Kind.series);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(series(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(series(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model a series sub-circuit', () => {
    phasors.forEach((value) => {
      vizy.forEach((kz) => {
        const z = make(kz, undefined, value);
        vizy.forEach((ky) => {
          const y = make(ky, z, value);
          vizy.forEach((kx) => {
            const x = make(kx, y, value);

            const {unit, model} = series(x);
            expect(model).toBeCloseTo(connect(connect(x.model, y.model), z.model));
            expect(unit).toBeUndefined();
          });
        });
      });
    });
  });
});
