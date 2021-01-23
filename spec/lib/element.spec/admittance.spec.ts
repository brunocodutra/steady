import { admittance, Element, Kind, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { cascade, project, solve } from 'lib/quadripole';

import { elements, parametric, phasors, toJSON } from '../../util';

describe('Admittance', () => {
  it('should be default constructible', () => {
    expect(admittance().kind).toEqual(Kind.admittance);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(admittance(e).next).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(admittance().connect(e)).toEqual(admittance(e));
    });
  });

  it('should connect a single subcircuit', () => {
    elements.forEach((e) => {
      expect(admittance(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((p) => {
      expect(admittance(undefined, p).value).toEqual(p);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((p) => {
      expect(update(admittance(), p)).toEqual(admittance(undefined, p));
    });
  });

  it('should model a shunt impedance', () => {
    phasors.forEach((p) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = admittance(undefined, p);
          expect(project(model, [v, i])).toBeCloseTo([v, i.sub(v.div(p))]);
        });
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const next = update(e, q);
          const self = admittance(next, p);
          expect(self.equivalent).toBeCloseTo(cascade(self.model, next.model));
        });
      });
    });
  });

  it('should be powerable', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const self = admittance(update(e, q), p);
          expect(self.power()).toMatchObject(self);
          expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
        });
      });
    });
  });

  it('should be serializable', () => {
    elements.forEach((e) => {
      phasors.forEach((p) => {
        const json = toJSON(admittance(e, p));
        expect(toJSON(Element.fromJSON(json))).toEqual(json)
      });
    });
  });
});
