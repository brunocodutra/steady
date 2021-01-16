import { branch, connect, Kind, line, merge, pack, next, unpack, update } from 'lib/element';
import { polar, _0 } from 'lib/phasor';
import { cascade, project, solve } from 'lib/quadripole';

import { elements, parametric, phasors } from '../../util';

describe('Line', () => {
  it('should be default constructible', () => {
    expect(line().kind).toEqual(Kind.line);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(line(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(line(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(line(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(line(), e)).toThrow();
    });
  });

  it('should connect a single subcircuit', () => {
    elements.forEach((e) => {
      expect(line(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should have two values', () => {
    phasors.forEach((y) => {
      phasors.forEach((z) => {
        expect(line(undefined, { y, z }).value).toEqual({ y, z });
      });
    });
  });

  it('should allow updating its values', () => {
    phasors.forEach((y) => {
      phasors.forEach((z) => {
        expect(update(line(), { y, z }).value).toEqual({ y, z });
      });
    });
  });

  it('should model a transmission line', () => {
    phasors.forEach((exp) => {
      const y = exp.ln();
      const z = exp;
      phasors.forEach((v) => {
        const a = v.div(polar(2));
        const d = a.div(z);
        phasors.forEach((i) => {
          const c = i.div(polar(2));
          const b = c.mul(z);

          const { model } = line(undefined, { y, z });

          expect(project(model, [v, i])).toBeCloseTo([
            a.sub(b).mul(exp).add(a.add(b).div(exp)),
            c.sub(d).mul(exp).add(c.add(d).div(exp)),
          ]);
        });
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const next = update(e, q);
          const self = line(next, { y: q.ln(), z: p });
          expect(self.equivalent).toBeCloseTo(cascade(self.model, next.model));
        });
      });
    });
  });

  it('should be powerable', () => {
    parametric.forEach((e) => {
      phasors.forEach((p) => {
        phasors.forEach((q) => {
          const self = line(update(e, q), { y: q.ln(), z: p });
          expect(self.power()).toMatchObject(self);
          expect(self.power().vi).toBeCloseTo([_0, solve(self.equivalent)[1]]);
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((e) => {
      phasors.forEach((y) => {
        phasors.forEach((z) => {
          expect(JSON.parse(JSON.stringify(unpack(pack(line(e, { y, z }))))))
            .toEqual(JSON.parse(JSON.stringify(line(e, { y, z }))));
        });
      });
    });
  });
});
