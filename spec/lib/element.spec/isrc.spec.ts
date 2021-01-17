import { branch, isrc, connect, Element, Kind, merge, next, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { cascade, project, solve } from 'lib/quadripole';

import { elements, parametric, phasors, toJSON } from '../../util';

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
      expect(connect(isrc(), e)).toEqual(isrc(e));
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

  it('should connect a single subcircuit', () => {
    elements.forEach((e) => {
      expect(isrc(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((p) => {
      expect(isrc(undefined, p).value).toEqual(p);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((p) => {
      expect(update(isrc(), p)).toEqual(isrc(undefined, p));
    });
  });

  it('should model a current source', () => {
    phasors.forEach((p) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = isrc(undefined, p);
          expect(project(model, [v, i])).toBeCloseTo([v, p.add(i)]);
        });
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const next = update(e, q);
          const self = isrc(next, p);
          expect(self.equivalent).toBeCloseTo(cascade(self.model, next.model));
        });
      });
    });
  });

  it('should be powerable', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const self = isrc(update(e, q), p);
          expect(self.power()).toMatchObject(self);
          expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
        });
      });
    });
  });

  it('should be serializable', () => {
    elements.forEach((e) => {
      phasors.forEach((p) => {
        const json = toJSON(isrc(e, p));
        expect(toJSON(Element.fromJSON(json))).toEqual(json);
      });
    });
  });
});
