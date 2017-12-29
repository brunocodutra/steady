import {Kind, line, make} from 'lib/element';
import {rect, norm, angle, add, sub, mul, div} from 'lib/phasor';
import {project} from 'lib/quadripole';
import {Unit} from 'lib/unit';

import {kinds, phasors} from './util';

describe('Line', () => {
  it('should be default constructible', () => {
    expect(line().kind).toBe(Kind.line);
    expect(make(Kind.line).kind).toBe(Kind.line);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(line(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(line(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model a voltage source', () => {
    phasors.forEach((exp) => {
      const y = rect(Math.log(norm(exp)), angle(exp));
      const z = exp;
      phasors.forEach((v) => {
        const a = div(v, rect(2));
        const d = div(a, z);
        phasors.forEach((i) => {
          const c = div(i, rect(2));
          const b = mul(c, z);

          const {unit, model} = line(undefined, {y, z});

          expect(project(model, [v, i])).toBeCloseTo([
            add(mul(sub(a, b), exp), div(add(a, b), exp)),
            add(mul(sub(c, d), exp), div(add(c, d), exp)),
          ]);

          expect(unit.y).toBe(Unit.constant);
          expect(unit.z).toBe(Unit.ohm);
        });
      });
    });
  });
});
