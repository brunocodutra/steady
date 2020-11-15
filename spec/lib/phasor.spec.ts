import { pack, unpack } from 'lib/phasor';

import { phasors } from '../util';

describe('Phasor', () => {
  it('should be packable', () => {
    phasors.forEach((p) => {
      expect(unpack(pack(p))).toBe(p);
    });

    expect(() => unpack([])).toThrowError();
  });
});
