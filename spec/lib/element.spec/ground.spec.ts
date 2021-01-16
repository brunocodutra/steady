import { branch, ground, connect, Kind, merge, pack, next, unpack, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { project, solve } from 'lib/quadripole';

import { elements, parametric, phasors } from '../../util';

describe('Ground', () => {
  it('should be default constructible', () => {
    expect(ground().kind).toEqual(Kind.ground);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(ground(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(connect(ground(), e)).toEqual(ground(e));
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(ground(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(ground(), e)).toThrow();
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

  it('should be packable', () => {
    elements.forEach((e) => {
      expect(JSON.parse(JSON.stringify(unpack(pack(ground(e))))))
        .toEqual(JSON.parse(JSON.stringify(ground(e))));
    });
  });
});
