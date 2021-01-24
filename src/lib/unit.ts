export const enum Unit {
  volt = 'volt',
  ampere = 'ampere',
  ohm = 'ohm',
  ratio = 'ratio',
}

export enum Scale {
  femto = 1E-15,
  pico = 1E-12,
  nano = 1E-9,
  micro = 1E-6,
  milli = 1E-3,
  none = 1,
  kilo = 1E3,
  mega = 1E6,
  giga = 1E9,
  tera = 1E12,
  peta = 1E15,
}

export const normalize = (n: number): [number, Scale] => {
  if (isNaN(n)) {
    return [n, Scale.none];
  }

  const scales = [
    Scale.peta,
    Scale.tera,
    Scale.giga,
    Scale.mega,
    Scale.kilo,
    Scale.none,
    Scale.milli,
    Scale.micro,
    Scale.nano,
    Scale.pico,
    Scale.femto,
  ];

  const scale = scales.find((p) => p <= Math.abs(n));
  const scaled = scale ? n / scale : 0;
  const normalized = Math.abs(scaled) < 1E3 ? scaled : Infinity * scaled;

  return [normalized, isFinite(normalized) && scale || Scale.none];
};

const r2d = 180 / Math.PI;

export const radians = (x: number): number => x / r2d;
export const degrees = (x: number): number => x * r2d;
