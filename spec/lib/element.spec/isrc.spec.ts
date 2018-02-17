import {branch, isrc, join, Kind, merge, pack, split, unpack, update} from 'lib/element';
import {add} from 'lib/phasor';
import {project} from 'lib/quadripole';

import {elements, phasors} from './util';

describe('ISrc', () => {
  it('should be default constructible', () => {
    expect(isrc().kind).toBe(Kind.isrc);
  });

  it('should have a successor', () => {
    elements.forEach((next) => {
      expect(isrc(next).next).toBe(next);
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((next) => {
      expect(split(isrc(next))).toBe(next);
    });
  });

  it('should allow joining in', () => {
    elements.forEach((next) => {
      expect(join(isrc(), next).next).toBe(next);
    });
  });

  it('should not allow branching off', () => {
    elements.forEach((next) => {
      expect(() => branch(isrc(next))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(isrc(), next)).toThrow();
    });
  });

  it('should inherit its successor\'s level', () => {
    elements.forEach((next) => {
      expect(isrc(next).level).toBe(next.level);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(isrc(undefined, value).value).toBe(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(isrc(), value).value).toBe(value);
    });
  });

  it('should model a current source', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {model} = isrc(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([v, add(value, i)]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(isrc(next)))).toEqual(isrc(next));

      phasors.forEach((value) => {
        expect(unpack(pack(isrc(next, value)))).toEqual(isrc(next, value));
      });
    });
  });
});
