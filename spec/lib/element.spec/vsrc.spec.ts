import {Kind, vsrc, make} from 'lib/element';
import {add} from 'lib/phasor';
import {project} from 'lib/quadripole';
import {Unit} from 'lib/unit';

import {kinds, phasors} from './util';

describe('VSrc', () => {
  it('should be default constructible', () => {
    expect(vsrc().kind).toBe(Kind.vsrc);
    expect(make(Kind.vsrc).kind).toBe(Kind.vsrc);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(vsrc(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(vsrc(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model a voltage source', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {unit, model} = vsrc(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([add(value, v), i]);
          expect(unit).toBe(Unit.volt);
        });
      });
    });
  });
});
