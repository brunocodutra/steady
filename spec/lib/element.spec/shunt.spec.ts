import { shunt, Element, Kind, update } from 'lib/element';
import { rect, _0 } from 'lib/phasor';
import { cascade, project, solve } from 'lib/quadripole';

import { elements, parametric, phasors, toJSON } from '../../util';

describe('Shunt', () => {
  it('should be default constructible', () => {
    expect(shunt().kind).toEqual(Kind.shunt);
  });

  it('should have a successor', () => {
    elements.forEach((x) => {
      elements.forEach((y) => {
        expect(shunt(x, y).next).toEqual(x);
      });
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(shunt().connect(e).next).toEqual(e);
    });
  });

  it('should have a branch', () => {
    elements.forEach((x) => {
      elements.forEach((y) => {
        expect(shunt(x, y).branch).toEqual(y);
      });
    });
  });

  it('should allow merging in', () => {
    elements.forEach((y) => {
      expect(shunt().merge(y).branch).toEqual(y);
    });
  });

  it('should connect two subcircuits', () => {
    elements.forEach((x) => {
      elements.forEach((y) => {
        expect(shunt(x, y).subcircuits).toEqual(x.subcircuits + y.subcircuits);
      });
    });
  });

  it('should not allow updating', () => {
    phasors.forEach((p) => {
      expect(() => update(shunt(), p)).toThrow();
    });
  });

  it('should model a shunt sub-circuit', () => {
    phasors.forEach((v) => {
      parametric.map((e) => update(e, v)).forEach((x) => {
        phasors.forEach((i) => {
          parametric.map((e) => update(e, i)).forEach((y) => {
            const { model, branch } = shunt(undefined, x.connect(y));
            expect(project(model, [v, i])).toBeCloseTo([v, i.sub(solve(branch.equivalent, [v, rect(0)])[1])]);
          });
        });
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    phasors.forEach((v) => {
      parametric.map((e) => update(e, v)).forEach((x) => {
        phasors.forEach((i) => {
          parametric.map((e) => update(e, i)).forEach((y) => {
            const self = shunt(x, y);
            expect(self.equivalent).toBeCloseTo(cascade(self.model, x.model));
          });
        });
      });
    });
  });

  it('should be powerable', () => {
    phasors.forEach((v) => {
      parametric.map((e) => update(e, v)).forEach((x) => {
        phasors.forEach((i) => {
          parametric.map((e) => update(e, i)).forEach((y) => {
            const self = shunt(x, y);
            expect(self.power()).toMatchObject(self);
            expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
          });
        });
      });
    });
  });

  it('should be serializable', () => {
    elements.forEach((x) => {
      elements.forEach((y) => {
        const json = toJSON(shunt(x, y));
        expect(toJSON(Element.fromJSON(json))).toEqual(json);
      });
    });
  });
});
