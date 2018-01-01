import closeTo from 'jest/closeTo';

import {Phasor, polar} from 'lib/phasor';
import {Kind} from 'lib/element';

expect.extend(closeTo);

export const numbers: number[] = [1E-3, 1, 1E3];

export const phasors: Phasor[] = [].concat.apply(
  [],
  numbers.map((mag) =>
    Array(8).fill(Math.PI / 4).map((p, k) => polar(mag, p * k))
  ),
);

export const kinds: Kind[] = [
  Kind.ground,
  Kind.vsrc,
  Kind.isrc,
  Kind.impedance,
  Kind.admittance,
  Kind.line,
  Kind.xformer,
  Kind.series,
  Kind.shunt,
];

export const vizy = [Kind.vsrc, Kind.isrc, Kind.impedance, Kind.admittance];
