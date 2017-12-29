import {Kind, isrc, make} from 'lib/element';
import {add} from 'lib/phasor';
import {project} from 'lib/quadripole';
import {Unit} from 'lib/unit';

import {kinds, phasors} from './util';

describe('ISrc', () => {
  it('should be default constructible', () => {
    expect(isrc().kind).toBe(Kind.isrc);
    expect(make(Kind.isrc).kind).toBe(Kind.isrc);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(isrc(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(isrc(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model a current source', () => {
    phasors.forEach((value) => {
      phasors.forEach((v) => {
        phasors.forEach((i) => {
          const {unit, model} = isrc(undefined, value);
          expect(project(model, [v, i])).toBeCloseTo([v, add(value, i)]);
          expect(unit).toBe(Unit.ampere);
        });
      });
    });
  });
});
