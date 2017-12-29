import {Kind, xformer, make} from 'lib/element';
import {rect, mul, div} from 'lib/phasor';
import {project} from 'lib/quadripole';
import {Unit} from 'lib/unit';

import {kinds, numbers, phasors} from './util';

describe('XFormer', () => {
  it('should be default constructible', () => {
    expect(xformer().kind).toBe(Kind.xformer);
    expect(make(Kind.xformer).kind).toBe(Kind.xformer);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(xformer(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(xformer(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model a voltage source', () => {
    numbers.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {unit, model} = xformer(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([div(v, rect(value)), mul(i, rect(value))]);
          expect(unit).toBe(Unit.ratio);
        });
      });
    });
  });
});
