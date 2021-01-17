import { branch, connect, Element, Kind, merge, series, next, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { project, solve } from 'lib/quadripole';

import { elements, parametric, phasors, toJSON } from '../../util';

describe('Series', () => {
  it('should be default constructible', () => {
    expect(series().kind).toEqual(Kind.series);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(series(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(series(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(series(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(series(), e)).toThrow();
    });
  });

  it('should connect a single subcircuit', () => {
    elements.forEach((e) => {
      expect(series(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should not allow updating', () => {
    phasors.forEach((p) => {
      expect(() => update(series(), p)).toThrow();
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const { model } = series();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        const next = update(e, p);
        expect(series(next).equivalent).toBeCloseTo(next.model);
      });
    });
  });

  it('should be powerable', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        const self = series(update(e, p));
        expect(self.power()).toMatchObject(self);
        expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
      });
    });
  });

  it('should be serializable', () => {
    elements.forEach((e) => {
      const json = toJSON(series(e));
      expect(toJSON(Element.fromJSON(json))).toEqual(json);
    });
  });
});
