import {Kind, knee, make} from 'lib/element';
import {project} from 'lib/quadripole';

import {kinds, phasors} from './util';

describe('Knee', () => {
  it('should be default constructible', () => {
    expect(knee().kind).toBe(Kind.knee);
    expect(make(Kind.knee).kind).toBe(Kind.knee);;
  });

  it('should have a successor', () => {
    kinds.forEach((k) => {
      const next = make(k);
      expect(knee(next).next).toBe(next);
    });
  });

  it('should inherit its successor\'s height', () => {
    kinds.forEach((k) => {
      expect(knee(make(k)).height).toBe(make(k).height);
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const {model} = knee();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });
});
