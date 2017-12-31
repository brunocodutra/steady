import {Kind, ground, make} from 'lib/element';
import {project} from 'lib/quadripole';

import {kinds, phasors} from './util';

describe('Ground', () => {
  it('should be default constructible', () => {
    expect(ground().kind).toBe(Kind.ground);
    expect(make(Kind.ground).kind).toBe(Kind.ground);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(ground(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(ground(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const {model} = ground();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });
});
