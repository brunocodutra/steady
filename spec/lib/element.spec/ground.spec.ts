import { ground, Element, Kind, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { project, solve } from 'lib/quadripole';

import { elements, parametric, phasors, toJSON } from '../../util';

describe('Ground', () => {
  it('should be default constructible', () => {
    expect(ground().kind).toEqual(Kind.ground);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(ground(e).next).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(ground().connect(e)).toEqual(ground(e));
    });
  });

  it('should connect a single subcircuit', () => {
    elements.forEach((e) => {
      expect(ground(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should not allow updating', () => {
    phasors.forEach((p) => {
      expect(() => update(ground(), p)).toThrow();
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const { model } = ground();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        const next = update(e, p);
        expect(ground(next).equivalent).toBeCloseTo(next.model);
      });
    });
  });

  it('should be powerable', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        const self = ground(update(e, p));
        expect(self.power()).toMatchObject(self);
        expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
      });
    });
  });

  it('should be serializable', () => {
    elements.forEach((e) => {
      const json = toJSON(ground(e));
      expect(toJSON(Element.fromJSON(json))).toEqual(json);
    });
  });
});
