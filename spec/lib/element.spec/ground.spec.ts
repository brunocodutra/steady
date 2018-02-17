import {branch, ground, join, Kind, merge, pack, split, unpack, update} from 'lib/element';
import {project} from 'lib/quadripole';

import {elements, phasors} from './util';

describe('Ground', () => {
  it('should be default constructible', () => {
    expect(ground().kind).toBe(Kind.ground);
  });

  it('should have a successor', () => {
    elements.forEach((next) => {
      expect(ground(next).next).toBe(next);
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((next) => {
      expect(split(ground(next))).toBe(next);
    });
  });

  it('should allow joining in', () => {
    elements.forEach((next) => {
      expect(join(ground(), next).next).toBe(next);
    });
  });

  it('should not allow branching off', () => {
    elements.forEach((next) => {
      expect(() => branch(ground(next))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(ground(), next)).toThrow();
    });
  });

  it('should inherit its successor\'s level', () => {
    elements.forEach((next) => {
      expect(ground(next).level).toBe(next.level);
    });
  });

  it('should have no value', () => {
    expect(ground().value).toBeUndefined();
  });

  it('should not allow updating', () => {
    phasors.forEach((value) => {
      expect(() => update(ground(), value)).toThrow();
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const {model} = ground();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(ground(next)))).toEqual(ground(next));
    });
  });
});
