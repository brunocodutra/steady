import {branch, join, Kind, merge, pack, series, shunt, split, unpack, update} from 'lib/element';
import {rect, sub} from 'lib/phasor';
import {project, solve} from 'lib/quadripole';

import {elements, parametric, phasors} from './util';

describe('Shunt', () => {
  it('should be default constructible', () => {
    expect(shunt().kind).toBe(Kind.shunt);
  });

  it('should have two successors', () => {
    elements.forEach((x) => {
      elements.map(series).forEach((y) => {
        expect(shunt(x, y).next).toBe(x);
        expect(shunt(x, y).value).toBe(y);
      });
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((x) => {
      elements.map(series).forEach((y) => {
        expect(split(shunt(x, y))).toBe(x);
      });
    });
  });

  it('should allow joining in', () => {
    elements.forEach((x) => {
      expect(join(shunt(), x).next).toBe(x);
    });
  });

  it('should allow branching off', () => {
    elements.forEach((x) => {
      elements.map(series).forEach((y) => {
        expect(branch(shunt(x, y))).toBe(y);
      });
    });
  });

  it('should allow merging in', () => {
    elements.forEach((y) => {
      if (y.kind === Kind.series) {
        expect(merge(shunt(), y).value).toBe(y);
      } else {
        expect(() => merge(shunt(), y)).toThrow();
      }
    });
  });

  it('should add its successors\' levels plus one', () => {
    elements.forEach((x) => {
      elements.map(series).forEach((y) => {
        expect(shunt(x, y).level).toBe(x.level + y.level + 1);
      });
    });
  });

  it('should model a shunt sub-circuit', () => {
    phasors.forEach((v) => {
      parametric.map((e) => update(e, v)).forEach((x) => {
        phasors.forEach((i) => {
          parametric.map((e) => update(e, i)).forEach((y) => {
            const {model, value} = shunt(undefined, series(join(x, y)));
            expect(project(model, [v, i])).toBeCloseTo([v, sub(i, solve(value.model, [v, rect(0)])[1])]);
          });
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(shunt(next)))).toEqual(shunt(next));

      elements.forEach((value) => {
        expect(unpack(pack(shunt(next, series(value))))).toEqual(shunt(next, series(value)));
      });
    });
  });
});
