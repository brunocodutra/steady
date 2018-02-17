import {branch, join, Kind, merge, pack, split, unpack, update, vsrc} from 'lib/element';
import {add} from 'lib/phasor';
import {project} from 'lib/quadripole';

import {elements, phasors} from './util';

describe('VSrc', () => {
  it('should be default constructible', () => {
    expect(vsrc().kind).toBe(Kind.vsrc);
  });

  it('should have a successor', () => {
    elements.forEach((next) => {
      expect(vsrc(next).next).toBe(next);
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((next) => {
      expect(split(vsrc(next))).toBe(next);
    });
  });

  it('should allow joining in', () => {
    elements.forEach((next) => {
      expect(join(vsrc(), next).next).toBe(next);
    });
  });

  it('should not allow branching off', () => {
    elements.forEach((next) => {
      expect(() => branch(vsrc(next))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(vsrc(), next)).toThrow();
    });
  });

  it('should inherit its successor\'s level', () => {
    elements.forEach((next) => {
      expect(vsrc(next).level).toBe(next.level);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(vsrc(undefined, value).value).toBe(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(vsrc(), value).value).toBe(value);
    });
  });

  it('should model a voltage source', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {model} = vsrc(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([add(value, v), i]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(vsrc(next)))).toEqual(vsrc(next));

      phasors.forEach((value) => {
        expect(unpack(pack(vsrc(next, value)))).toEqual(vsrc(next, value));
      });
    });
  });
});
