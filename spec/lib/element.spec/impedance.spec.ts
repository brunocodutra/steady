import {Kind, impedance, make} from 'lib/element';
import {sub, mul} from 'lib/phasor';
import {project} from 'lib/quadripole';
import {Unit} from 'lib/unit';

import {kinds, phasors} from './util';

describe('Impedance', () => {
  it('should be default constructible', () => {
    expect(impedance().kind).toBe(Kind.impedance);
    expect(make(Kind.impedance).kind).toBe(Kind.impedance);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(impedance(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(impedance(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model a series impedance', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {unit, model} = impedance(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([sub(v, mul(i, value)), i]);
          expect(unit).toBe(Unit.ohm);
        });
      });
    });
  });
});
