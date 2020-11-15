import { Kind, make } from 'lib/element';
import { Phasor, polar, _0, _1 } from 'lib/phasor';
import { eye, quadripole, Quadripole } from 'lib/quadripole';

export const phasors: Phasor[] = [1E-3, 1, 1E3].map((mag) =>
  Array(8).fill(Math.PI / 4).map((p, k) => polar(mag, p * k)),
).flat();

const nil: Quadripole[] = [];
export const quadripoles: Quadripole[] = nil.concat(
  phasors.map((p) => quadripole(eye, [p, _0])),
  phasors.map((p) => quadripole(eye, [_0, p])),
  phasors.map((p) => quadripole([[_1, p], [_0, _1]])),
  phasors.map((p) => quadripole([[_1, _0], [p, _1]])),
  phasors.map((p) => quadripole([[p, _0], [_0, p.recip()]])),
  phasors.map((p) => [p.ln().sinh(), p.ln().cosh()])
    .map(([s, c]) => quadripole([[c, s], [s, c]])),
);

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
