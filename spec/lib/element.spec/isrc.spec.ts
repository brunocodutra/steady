import { branch, isrc, connect, Kind, merge, pack, next, unpack, update } from 'lib/element';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

describe('ISrc', () => {
  it('should be default constructible', () => {
    expect(isrc().kind).toEqual(Kind.isrc);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(isrc(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(isrc(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(isrc(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(isrc(), e)).toThrow();
    });
  });

  it('should inherit its successor\'s subcircuits', () => {
    elements.forEach((e) => {
      expect(isrc(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(isrc(undefined, value).value).toEqual(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(isrc(), value).value).toEqual(value);
    });
  });

  it('should model a current source', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = isrc(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([v, value.add(i)]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((e) => {
      phasors.forEach((value) => {
        expect(JSON.parse(JSON.stringify(unpack(pack(isrc(e, value))))))
          .toEqual(JSON.parse(JSON.stringify(isrc(e, value))));
      });
    });
  });
});
