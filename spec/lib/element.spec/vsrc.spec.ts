import { branch, connect, Kind, merge, pack, next, unpack, update, vsrc } from 'lib/element';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

describe('VSrc', () => {
  it('should be default constructible', () => {
    expect(vsrc().kind).toEqual(Kind.vsrc);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(vsrc(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(vsrc(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(vsrc(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(vsrc(), e)).toThrow();
    });
  });

  it('should inherit its successor\'s subcircuits', () => {
    elements.forEach((e) => {
      expect(vsrc(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(vsrc(undefined, value).value).toEqual(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(vsrc(), value).value).toEqual(value);
    });
  });

  it('should model a voltage source', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = vsrc(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([value.add(v), i]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((e) => {
      phasors.forEach((value) => {
        expect(JSON.parse(JSON.stringify(unpack(pack(vsrc(e, value))))))
          .toEqual(JSON.parse(JSON.stringify(vsrc(e, value))));
      });
    });
  });
});
