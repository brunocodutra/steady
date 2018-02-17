import {branch, join, Kind, merge, pack, series, split, unpack, update} from 'lib/element';
import {connect} from 'lib/quadripole';

import {elements, parametric, phasors} from './util';

describe('Series', () => {
  it('should be default constructible', () => {
    expect(series().kind).toBe(Kind.series);
  });

  it('should have a successor', () => {
    elements.forEach((next) => {
      expect(series(next).next).toBe(next);
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((next) => {
      expect(split(series(next))).toBe(next);
    });
  });

  it('should allow joining in', () => {
    elements.forEach((next) => {
      expect(join(series(), next).next).toBe(next);
    });
  });

  it('should not allow branching off', () => {
    elements.forEach((next) => {
      expect(() => branch(series(next))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(series(), next)).toThrow();
    });
  });

  it('should inherit its successor\'s level', () => {
    elements.forEach((next) => {
      expect(series(next).level).toBe(next.level);
    });
  });

  it('should have no value', () => {
    expect(series().value).toBeUndefined();
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
            const {model} = series(join(x, join(y, z)));
            expect(model).toBeCloseTo(connect(connect(x.model, y.model), z.model));
          });
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(series(next)))).toEqual(series(next));
    });
  });
});
