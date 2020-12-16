import { admittance, branch, connect, Kind, merge, pack, next, unpack, update } from 'lib/element';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

describe('Admittance', () => {
  it('should be default constructible', () => {
    expect(admittance().kind).toEqual(Kind.admittance);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(admittance(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(admittance(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(admittance(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(admittance(), e)).toThrow();
    });
  });

  it('should inherit its successor\'s subcircuits', () => {
    elements.forEach((e) => {
      expect(admittance(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((value) => {
      expect(admittance(undefined, value).value).toEqual(value);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((value) => {
      expect(update(admittance(), value).value).toEqual(value);
    });
  });

  it('should model a shunt impedance', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = admittance(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([v, i.sub(v.div(value))]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((e) => {
      phasors.forEach((value) => {
        expect(JSON.parse(JSON.stringify(unpack(pack(admittance(e, value))))))
          .toEqual(JSON.parse(JSON.stringify(admittance(e, value))));
      });
    });
  });
});
