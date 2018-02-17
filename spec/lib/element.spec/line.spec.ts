import {branch, join, Kind, line, merge, pack, split, unpack, update} from 'lib/element';
import {add, angle, div, mul, norm, rect, sub} from 'lib/phasor';
import {project} from 'lib/quadripole';

import {elements, phasors} from './util';

describe('Line', () => {
  it('should be default constructible', () => {
    expect(line().kind).toBe(Kind.line);
  });

  it('should have a successor', () => {
    elements.forEach((next) => {
      expect(line(next).next).toBe(next);
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((next) => {
      expect(split(line(next))).toBe(next);
    });
  });

  it('should allow joining in', () => {
    elements.forEach((next) => {
      expect(join(line(), next).next).toBe(next);
    });
  });

  it('should not allow branching off', () => {
    elements.forEach((next) => {
      expect(() => branch(line(next))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(line(), next)).toThrow();
    });
  });

  it('should inherit its successor\'s level', () => {
    elements.forEach((next) => {
      expect(line(next).level).toBe(next.level);
    });
  });

  it('should have two values', () => {
    phasors.forEach((y) => {
      phasors.forEach((z) => {
        expect(line(undefined, {y, z}).value).toEqual({y, z});
      });
    });
  });

  it('should allow updating its values', () => {
    phasors.forEach((y) => {
      phasors.forEach((z) => {
        expect(update(line(), {y, z}).value).toEqual({y, z});
      });
    });
  });

  it('should model a transmission line', () => {
    phasors.forEach((exp) => {
      const y = rect(Math.log(norm(exp)), angle(exp));
      const z = exp;
      phasors.forEach((v) => {
        const a = div(v, rect(2));
        const d = div(a, z);
        phasors.forEach((i) => {
          const c = div(i, rect(2));
          const b = mul(c, z);

          const {model} = line(undefined, {y, z});

          expect(project(model, [v, i])).toBeCloseTo([
            add(mul(sub(a, b), exp), div(add(a, b), exp)),
            add(mul(sub(c, d), exp), div(add(c, d), exp)),
          ]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(line(next)))).toEqual(line(next));

      phasors.forEach((y) => {
        phasors.forEach((z) => {
          expect(unpack(pack(line(next, {y, z})))).toEqual(line(next, {y, z}));
        });
      });
    });
  });
});
