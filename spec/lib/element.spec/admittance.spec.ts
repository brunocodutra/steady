import {Kind, admittance, make} from 'lib/element';
import {sub, div} from 'lib/phasor';
import {project} from 'lib/quadripole';

import {kinds, phasors} from './util';

describe('Admittance', () => {
  it('should be default constructible', () => {
    expect(admittance().kind).toBe(Kind.admittance);
    expect(make(Kind.admittance).kind).toBe(Kind.admittance);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(admittance(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(admittance(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model a shunt impedance', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {model} = admittance(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([v, sub(i, div(v, value))]);
        });
      });
    });
  });
});
