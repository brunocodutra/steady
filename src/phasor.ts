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
