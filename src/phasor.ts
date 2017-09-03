const enum PhasorNotations {
  rect,
  polar,
}

type Rect = {
  readonly notation: PhasorNotations.rect,
  readonly real: number,
  readonly imag: number,
};

type Polar = {
  readonly notation: PhasorNotations.polar,
  readonly mag: number,
  readonly ang: number,
};

export type Phasor = Rect | Polar;

const UnhandledPhasorNotation = (_: never): never => {
  throw new Error('UnhandledPhasorNotation');
};

export const toRect = (p: Phasor): Rect => {
  switch (p.notation) {
    case PhasorNotations.rect:
      return p;

    case PhasorNotations.polar:
      return {
        notation: PhasorNotations.rect,
        real: p.mag * Math.cos(p.ang),
        imag: p.mag * Math.sin(p.ang),
      };

    default:
      return UnhandledPhasorNotation(p);
  }
};

export const toPolar = (p: Phasor): Polar => {
  switch (p.notation) {
    case PhasorNotations.polar:
      return p;

    case PhasorNotations.rect:
      return {
        notation: PhasorNotations.polar,
        mag: Math.sqrt(p.real * p.real + p.imag * p.imag),
        ang: Math.atan2(p.imag, p.real),
      };

    default:
      return UnhandledPhasorNotation(p);
  }
};

export const rect = (real: number, imag: number = 0): Rect => ({
  notation: PhasorNotations.rect,
  real,
  imag,
});

export const polar = (mag: number, ang: number = 0): Polar => ({
  notation: PhasorNotations.polar,
  mag,
  ang,
});

export const neg = (p: Phasor): Phasor => {
  const {real: a, imag: b} = toRect(p);

  return rect(-a, -b);
};

export const add = (p: Phasor, q: Phasor): Phasor => {
  const {real: a, imag: b} = toRect(p);
  const {real: c, imag: d} = toRect(q);

  return rect(a + c, b + d);
};

export const sub = (p: Phasor, q: Phasor): Phasor => {
  const {real: a, imag: b} = toRect(p);
  const {real: c, imag: d} = toRect(q);

  return rect(a - c, b - d);
};

export const mul = (p: Phasor, q: Phasor): Phasor => {
  const {real: a, imag: b} = toRect(p);
  const {real: c, imag: d} = toRect(q);

  return rect(a * c - b * d, a * d + b * c);
};

export const div = (p: Phasor, q: Phasor): Phasor => {
  const {real: a, imag: b} = toRect(p);
  const {real: c, imag: d} = toRect(q);

  const D = (c * c + d * d);
  return rect((a * c + b * d) / D, (b * c - a * d) / D);
};

export const sinh = (p: Phasor): Phasor => {
  const {real: a, imag: b} = toRect(p);

  const cosha = (Math.exp(a) + Math.exp(-a)) / 2;
  const sinha = (Math.exp(a) - Math.exp(-a)) / 2;

  return rect(sinha * Math.cos(b), cosha * Math.sin(b));
};

export const cosh = (p: Phasor): Phasor => {
  const {real: a, imag: b} = toRect(p);

  const cosha = (Math.exp(a) + Math.exp(-a)) / 2;
  const sinha = (Math.exp(a) - Math.exp(-a)) / 2;

  return rect(cosha * Math.cos(b), sinha * Math.sin(b));
};
