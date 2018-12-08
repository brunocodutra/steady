import {pack, Phasor, polar, unpack} from 'lib/phasor';

export const samples: Phasor[] = [
  polar(0),
  ...[1E-6, 1E-3, 1, 1E3, 1E6, Infinity].map((mag) =>
    Array(16).fill(Math.PI / 8).map((p, k) => polar(mag, p * k - 2 * Math.PI)),
  ).flat(),
];

describe('Phasor', () => {
  it('should be packable', () => {
    samples.forEach((p) => {
      expect(unpack(pack(p))).toEqual(p);
    });

    expect(() => unpack([])).toThrowError();
  });
});
