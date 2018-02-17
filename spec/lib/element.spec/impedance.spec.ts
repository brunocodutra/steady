import {branch, impedance, join, Kind, merge, pack, split, unpack, update} from 'lib/element';
import {mul, sub} from 'lib/phasor';
import {project} from 'lib/quadripole';

import {elements, phasors} from './util';

describe('Impedance', () => {
  it('should be default constructible', () => {
    expect(impedance().kind).toBe(Kind.impedance);
  });

  it('should have a successor', () => {
    elements.forEach((next) => {
      expect(impedance(next).next).toBe(next);
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((next) => {
      expect(split(impedance(next))).toBe(next);
    });
  });

  it('should allow joining in', () => {
    elements.forEach((next) => {
      expect(join(impedance(), next).next).toBe(next);
    });
  });

  it('should not allow branching off', () => {
    elements.forEach((next) => {
      expect(() => branch(impedance(next))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(impedance(), next)).toThrow();
    });
  });

  it('should inherit its successor\'s level', () => {
    elements.forEach((next) => {
      expect(impedance(next).level).toBe(next.level);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(impedance(undefined, value).value).toBe(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(impedance(), value).value).toBe(value);
    });
  });

  it('should model a series impedance', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {model} = impedance(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([sub(v, mul(i, value)), i]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(impedance(next)))).toEqual(impedance(next));

      phasors.forEach((value) => {
        expect(unpack(pack(impedance(next, value)))).toEqual(impedance(next, value));
      });
    });
  });
});
