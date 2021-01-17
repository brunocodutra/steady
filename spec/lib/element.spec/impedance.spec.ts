import { branch, impedance, connect, Element, Kind, merge, next, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { cascade, project, solve } from 'lib/quadripole';

import { elements, parametric, phasors, toJSON } from '../../util';

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
      expect(connect(impedance(), e)).toEqual(impedance(e));
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

  it('should connect a single subcircuit', () => {
    elements.forEach((e) => {
      expect(impedance(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((p) => {
      expect(impedance(undefined, p).value).toEqual(p);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((p) => {
      expect(update(impedance(), p)).toEqual(impedance(undefined, p));
    });
  });

  it('should model a series impedance', () => {
    phasors.forEach((p) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = impedance(undefined, p);
          expect(project(model, [v, i])).toBeCloseTo([v.sub(i.mul(p)), i]);
        });
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const next = update(e, q);
          const self = impedance(next, p);
          expect(self.equivalent).toBeCloseTo(cascade(self.model, next.model));
        });
      });
    });
  });

  it('should be powerable', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const self = impedance(update(e, q), p);
          expect(self.power()).toMatchObject(self);
          expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
        });
      });
    });
  });

  it('should be serializable', () => {
    elements.forEach((e) => {
      phasors.forEach((p) => {
        const json = toJSON(impedance(e, p));
        expect(toJSON(Element.fromJSON(json))).toEqual(json);
      });
    });
  });
});
