import { branch, connect, Element, Kind, merge, next, update, xformer } from 'lib/element';
import { _0 } from 'lib/phasor';
import { cascade, project, solve } from 'lib/quadripole';

import { elements, parametric, phasors, toJSON } from '../../util';

describe('XFormer', () => {
  it('should be default constructible', () => {
    expect(xformer().kind).toEqual(Kind.xformer);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(xformer(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(xformer(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(xformer(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(xformer(), e)).toThrow();
    });
  });

  it('should connect a single subcircuit', () => {
    elements.forEach((e) => {
      expect(xformer(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have a value', () => {
    phasors.forEach((p) => {
      expect(xformer(undefined, p).value).toEqual(p);
    });
  });

  it('should allow updating its value', () => {
    phasors.forEach((p) => {
      expect(update(xformer(), p)).toEqual(xformer(undefined, p));
    });
  });

  it('should model an ideal transformer', () => {
    phasors.forEach((p) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const { model } = xformer(undefined, p);
          expect(project(model, [v, i])).toBeCloseTo([v.div(p), i.mul(p)]);
        });
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const next = update(e, q);
          const self = xformer(next, p);
          expect(self.equivalent).toBeCloseTo(cascade(self.model, next.model));
        });
      });
    });
  });

  it('should be powerable', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const self = xformer(update(e, q), p);
          expect(self.power()).toMatchObject(self);
          expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
        });
      });
    });
  });

  it('should be serializable', () => {
    elements.forEach((e) => {
      phasors.forEach((p) => {
        const json = toJSON(xformer(e, p));
        expect(toJSON(Element.fromJSON(json))).toEqual(json);
      });
    });
  });
});
