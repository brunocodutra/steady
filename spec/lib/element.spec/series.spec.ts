import { branch, connect, Kind, merge, pack, series, next, unpack, update } from 'lib/element';
import { cascade } from 'lib/quadripole';

import { elements, parametric, phasors } from '../../util';

describe('Series', () => {
  it('should be default constructible', () => {
    expect(series().kind).toEqual(Kind.series);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(series(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(series(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(series(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(series(), e)).toThrow();
    });
  });

  it('should inherit its successor\'s subcircuits', () => {
    elements.forEach((e) => {
      expect(series(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should not allow updating', () => {
    phasors.forEach((value) => {
      expect(() => update(series(), value)).toThrow();
    });
  });

  it('should model a series sub-circuit', () => {
    phasors.forEach((value) => {
      const elms = parametric.map((e) => update(e, value));

      elms.forEach((x) => {
        elms.forEach((y) => {
          elms.forEach((z) => {
            const { model } = series(connect(x, connect(y, z)));
            expect(model).toBeCloseTo(cascade(cascade(x.model, y.model), z.model));
          });
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((e) => {
      expect(JSON.parse(JSON.stringify(unpack(pack(series(e))))))
        .toEqual(JSON.parse(JSON.stringify(series(e))));
    });
  });
});
