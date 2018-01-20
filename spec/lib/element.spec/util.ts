import closeTo from 'jest/closeTo';

import {Phasor, polar} from 'lib/phasor';
import {Kind, make} from 'lib/element';

expect.extend(closeTo);

export const numbers: number[] = [1E-3, 1, 1E3];

export const phasors: Phasor[] = [].concat.apply(
  [],
  numbers.map((mag) =>
    Array(8).fill(Math.PI / 4).map((p, k) => polar(mag, p * k))
  ),
);

export const parametric = [
  Kind.vsrc,
  Kind.isrc,
  Kind.impedance,
  Kind.admittance,
].map(make);

export const elements = parametric.concat([
  Kind.connector,
  Kind.ground,
  Kind.xformer,
  Kind.line,
  Kind.series,
  Kind.shunt,
].map(make));
