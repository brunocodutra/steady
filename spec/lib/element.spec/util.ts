import {Kind, make} from 'lib/element';
import {Phasor, polar} from 'lib/phasor';

export const phasors: Phasor[] = [1E-3, 1, 1E3].map((mag) =>
  Array(8).fill(Math.PI / 4).map((p, k) => polar(mag, p * k)),
).flat();

export const parametric = [
  Kind.vsrc,
  Kind.isrc,
  Kind.impedance,
  Kind.admittance,
  Kind.xformer,
].map(make);

export const elements = parametric.concat([
  Kind.connector,
  Kind.ground,
  Kind.line,
  Kind.series,
  Kind.shunt,
].map(make));
