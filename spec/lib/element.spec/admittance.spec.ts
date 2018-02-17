import {admittance, branch, join, Kind, merge, pack, split, unpack, update} from 'lib/element';
import {div, sub} from 'lib/phasor';
import {project} from 'lib/quadripole';

import {elements, phasors} from './util';

describe('Admittance', () => {
  it('should be default constructible', () => {
    expect(admittance().kind).toBe(Kind.admittance);
  });

  it('should have a successor', () => {
    elements.forEach((next) => {
      expect(admittance(next).next).toBe(next);
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((next) => {
      expect(split(admittance(next))).toBe(next);
    });
  });

  it('should allow joining in', () => {
    elements.forEach((next) => {
      expect(join(admittance(), next).next).toBe(next);
    });
  });

  it('should not allow branching off', () => {
    elements.forEach((next) => {
      expect(() => branch(admittance(next))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(admittance(), next)).toThrow();
    });
  });

  it('should inherit its successor\'s level', () => {
    elements.forEach((next) => {
      expect(admittance(next).level).toBe(next.level);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(admittance(undefined, value).value).toBe(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(admittance(), value).value).toBe(value);
    });
  });

  it('should model a shunt impedance', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {model} = admittance(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([v, sub(i, div(v, value))]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(admittance(next)))).toEqual(admittance(next));

      phasors.forEach((value) => {
        expect(unpack(pack(admittance(next, value)))).toEqual(admittance(next, value));
      });
    });
  });
});
