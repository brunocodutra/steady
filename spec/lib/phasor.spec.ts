import { Phasor, polar } from 'lib/phasor';

import { phasors, toJSON } from '../util';

describe('Phasor', () => {
  it('should be comparable for approximate equality', () => {
    phasors.forEach((p) => {
      phasors.forEach((q) => {
        expect(p.closeTo(q)).toEqual(p == q);
      });
    });
  });

  it('should be approximately equal if norms are close to 0', () => {
    phasors.forEach((p) => {
      phasors.forEach((q) => {
        expect(polar(0, p.angle()).closeTo(polar(0, q.angle()))).toBeTruthy();
      });
    });
  });

  it('should be serializable', () => {
    phasors.forEach((p) => {
      const json = toJSON(p);
      expect(toJSON(Phasor.fromJSON(json))).toEqual(json);
    });

    expect(() => Phasor.fromJSON(undefined)).toThrow();
    expect(() => Phasor.fromJSON(null)).toThrow();
    expect(() => Phasor.fromJSON({})).toThrow();
    expect(() => Phasor.fromJSON({ mag: {} })).toThrow();
    expect(() => Phasor.fromJSON({ tan: {} })).toThrow();
    expect(() => Phasor.fromJSON({ mag: Math.random(), tan: {} })).toThrow();
    expect(() => Phasor.fromJSON({ mag: {}, tan: Math.random() })).toThrow();
  });
});
