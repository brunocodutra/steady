import { branch, join, Kind, merge, pack, split, unpack, update, xformer } from 'lib/element';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

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

  it('should inherit its successor\'s subcircuits', () => {
    elements.forEach((next) => {
      expect(xformer(next).subcircuits).toBe(next.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(xformer(undefined, value).value).toBe(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(xformer(), value).value).toBe(value);
    });
  });

  it('should model an ideal transformer', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = xformer(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([v.div(value), i.mul(value)]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((next) => {
      expect(unpack(pack(xformer(next)))).toBe(xformer(next));

      phasors.forEach((value) => {
        expect(unpack(pack(xformer(next, value)))).toBe(xformer(next, value));
      });
    });
  });
});
