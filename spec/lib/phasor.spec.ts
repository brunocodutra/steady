import { closeTo, pack, polar, unpack } from 'lib/phasor';

import { phasors } from '../util';

describe('Phasor', () => {
  it('should be comparable for approximate equality', () => {
    phasors.forEach((p) => {
      phasors.forEach((q) => {
        expect(closeTo(p, q)).toBe(p == q);
      });
    });
  });

  it('should be approximately equal if norms are close to 0', () => {
    phasors.forEach((p) => {
      phasors.forEach((q) => {
        expect(closeTo(polar(0, p.angle()), polar(0, q.angle()))).toBeTruthy();
      });
    });
  });

  it('should be packable', () => {
    phasors.forEach((p) => {
      expect(unpack(pack(p))).toBe(p);
    });

    expect(() => unpack([])).toThrowError();
  });
});
