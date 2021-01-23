import { vsrc, Element, Kind, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { cascade, project, solve } from 'lib/quadripole';

import { elements, parametric, phasors, toJSON } from '../../util';

describe('VSrc', () => {
  it('should be default constructible', () => {
    expect(vsrc().kind).toEqual(Kind.vsrc);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(vsrc(e).next).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(vsrc().connect(e).next).toEqual(e);
    });
  });

  it('should connect a single subcircuit', () => {
    elements.forEach((e) => {
      expect(vsrc(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((p) => {
      expect(vsrc(undefined, p).value).toEqual(p);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((p) => {
      expect(update(vsrc(), p)).toEqual(vsrc(undefined, p));
    });
  });

  it('should model a voltage source', () => {
    phasors.forEach((p) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = vsrc(undefined, p);
          expect(project(model, [v, i])).toBeCloseTo([p.add(v), i]);
        });
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const next = update(e, q);
          const self = vsrc(next, p);
          expect(self.equivalent).toBeCloseTo(cascade(self.model, next.model));
        });
      });
    });
  });

  it('should be powerable', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const self = vsrc(update(e, q), p);
          expect(self.power()).toMatchObject(self);
          expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
        });
      });
    });
  });

  it('should be serializable', () => {
    elements.forEach((e) => {
      phasors.forEach((p) => {
        const json = toJSON(vsrc(e, p));
        expect(toJSON(Element.fromJSON(json))).toEqual(json);
      });
    });
  });
});
