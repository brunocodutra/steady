import closeTo from 'jest/closeTo';
import nan from 'jest/nan';

expect.extend(nan);
expect.extend(closeTo);

type Sample = {mag: number, ang: number, real: number, imag: number};

export const samples: Sample[] = [].concat.apply(
  [{mag: 0, ang: 0, real: 0, imag: 0}],
  [1E-6, 1E-3, 1, 1E3, 1E6, Infinity].map((mag) =>
    Array(33).fill(Math.PI / 8).map((p, k) => {
      const ang = p * k - 2 * Math.PI;
      const cos = Math.cos(ang % (Math.PI * 2));
      const sin = Math.sin(ang % (Math.PI * 2));

      const real = cos && (cos * mag);
      const imag = sin && (sin * mag);

      return {mag, ang, real, imag};
    }),
  ),
);
