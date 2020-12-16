import { branch, impedance, connect, Kind, merge, pack, next, unpack, update } from 'lib/element';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

describe('Impedance', () => {
  it('should be default constructible', () => {
    expect(impedance().kind).toEqual(Kind.impedance);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(impedance(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(impedance(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(impedance(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(impedance(), e)).toThrow();
    });
  });

  it('should inherit its successor\'s subcircuits', () => {
    elements.forEach((e) => {
      expect(impedance(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(impedance(undefined, value).value).toEqual(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(impedance(), value).value).toEqual(value);
    });
  });

  it('should model a series impedance', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = impedance(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([v.sub(i.mul(value)), i]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((e) => {
      phasors.forEach((value) => {
        expect(JSON.parse(JSON.stringify(unpack(pack(impedance(e, value))))))
          .toEqual(JSON.parse(JSON.stringify(impedance(e, value))));
      });
    });
  });
});
