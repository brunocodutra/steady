export const enum Unit {
  volt = 'volt',
  ampere = 'ampere',
  ohm = 'ohm',
  ratio = 'ratio',
}

export enum Prefix {
  femto = 1E-15,
  pico = 1E-12,
  nano = 1E-9,
  micro = 1E-6,
  milli = 1E-3,
  mono = 1,
  kilo = 1E3,
  mega = 1E6,
  giga = 1E9,
  tera = 1E12,
  peta = 1E15,
  exa = 1E18,
}

const r2d = 180 / Math.PI;

/* istanbul ignore next */
export const radians = (x: number) => x / r2d;

/* istanbul ignore next */
export const degrees = (x: number) => x * r2d;
