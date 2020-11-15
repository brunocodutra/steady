import { branch, join, Kind, line, merge, pack, split, unpack, update } from 'lib/element';
import { polar } from 'lib/phasor';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

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
        expect(line(undefined, { y, z }).value).toBe({ y, z });
      });
    });
  });

  it('should allow updating its values', () => {
    phasors.forEach((y) => {
      phasors.forEach((z) => {
        expect(update(line(), { y, z }).value).toBe({ y, z });
      });
    });
  });

  it('should model a transmission line', () => {
    phasors.forEach((exp) => {
      const y = exp.ln();
      const z = exp;
      phasors.forEach((v) => {
        const a = v.div(polar(2));
        const d = a.div(z);
        phasors.forEach((i) => {
          const c = i.div(polar(2));
          const b = c.mul(z);

          const { model } = line(undefined, { y, z });

          expect(project(model, [v, i])).toBeCloseTo([
            a.sub(b).mul(exp).add(a.add(b).div(exp)),
            c.sub(d).mul(exp).add(c.add(d).div(exp)),
          ]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(line(next)))).toBe(line(next));

      phasors.forEach((y) => {
        phasors.forEach((z) => {
          expect(unpack(pack(line(next, { y, z })))).toBe(line(next, { y, z }));
        });
      });
    });
  });
});
