import { branch, connect, Kind, merge, pack, next, unpack, update, xformer } from 'lib/element';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

describe('XFormer', () => {
  it('should be default constructible', () => {
    expect(xformer().kind).toEqual(Kind.xformer);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(xformer(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(xformer(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(xformer(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(xformer(), e)).toThrow();
    });
  });

  it('should inherit its successor\'s subcircuits', () => {
    elements.forEach((e) => {
      expect(xformer(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(xformer(undefined, value).value).toEqual(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(xformer(), value).value).toEqual(value);
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
    elements.forEach((e) => {
      phasors.forEach((value) => {
        expect(JSON.parse(JSON.stringify(unpack(pack(xformer(e, value))))))
          .toEqual(JSON.parse(JSON.stringify(xformer(e, value))));
      });
    });
  });
});
