import {Kind, xformer, update, split, join, branch, merge} from 'lib/element';
import {rect, mul, div} from 'lib/phasor';
import {project} from 'lib/quadripole';

import {elements, numbers, phasors} from './util';

describe('XFormer', () => {
  it('should be default constructible', () => {
    expect(xformer().kind).toBe(Kind.xformer);
  });

  it('should have a successor', () => {
    elements.forEach((next) => {
      expect(xformer(next).next).toBe(next);
    });
  });

  it('should allow splitting off', () => {
    elements.forEach((next) => {
      expect(split(xformer(next))).toBe(next);
    });
  });

  it('should allow joining in', () => {
    elements.forEach((next) => {
      expect(join(xformer(), next).next).toBe(next);
    });
  });

  it('should not allow branching off', () => {
    elements.forEach((next) => {
      expect(() => branch(xformer(next))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(xformer(), next)).toThrow();
    });
  });

  it('should inherit its successor\'s level', () => {
    elements.forEach((next) => {
      expect(xformer(next).level).toBe(next.level);
    });
  });

  it('should have a value', () => {
    numbers.forEach((value) => {
      expect(xformer(undefined, value).value).toBe(value);
    });
  });

  it('should allow updating its value', () => {
    numbers.forEach((value) => {
      expect(update(xformer(), value).value).toBe(value);
    });
  });

  it('should model an ideal transformer', () => {
    numbers.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {model} = xformer(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([div(v, rect(value)), mul(i, rect(value))]);
        });
      });
    });
  });
});
