export type Phasor = {
  readonly mag: number,
  readonly tan: number,
};

export const isPhasor = (p: any): p is Phasor => (
  typeof p === 'object' && 'mag' in p && 'tan' in p
);

const sign = (x: number): number => (+(x > 0) - +(x < 0)) || +x;

const hypot = (x: number, y: number): number => {
  const a = Math.abs(x);
  const b = Math.abs(y);
  const [min, max] = (a > b) ? [b, a] : [a, b];
  return max && (
      (min === Infinity)
    ? Infinity
    : max * (1 + (min / max) ** 2) ** 0.5
  );
};

const phasor = (mag: number, tan: number): Phasor => ({mag, tan: mag && tan});

export const polar = (mag: number, ang = 0): Phasor => {
  ang %= 2 * Math.PI;
  mag *= (
    (ang > Math.PI / 2 && ang <= 3 * Math.PI / 2) ||
    (ang < -Math.PI / 2 && ang >= -3 * Math.PI / 2)
  ) ? -1 : 1;

  return phasor(mag, Math.tan(ang));
};

export const rect = (re: number, im = 0): Phasor => phasor(
  (re < 0) ? -hypot(re, im) : hypot(re, im),
  im && (
      (Math.abs(re) === Infinity && Math.abs(im) === Infinity)
    ? sign(im * re)
    : im / re
  ),
);

export const norm = ({mag}: Phasor): number => Math.abs(mag);
export const angle = ({mag, tan}: Phasor): number => Math.atan(tan) + (
  (mag < 0) ? (tan > 0) ? -Math.PI : Math.PI : 0
);

export const real = ({mag, tan}: Phasor): number => (1 / tan) && (mag / hypot(1, tan));
export const imag = ({mag, tan}: Phasor): number => sign(tan) * real({mag, tan: 1 / tan});

export const neg = ({mag, tan}: Phasor): Phasor => phasor(-mag, tan);
export const conj = ({mag, tan}: Phasor): Phasor => phasor(mag, -tan);

export const add = (p: Phasor, q: Phasor): Phasor => {
  const [a, b] = [real(p), imag(p)];
  const [c, d] = [real(q), imag(q)];

  return rect(a + c, b + d);
};

export const sub = (p: Phasor, q: Phasor): Phasor => {
  const [a, b] = [real(p), imag(p)];
  const [c, d] = [real(q), imag(q)];

  return rect(a - c, b - d);
};

export const mul = ({mag: a, tan: b}: Phasor, {mag: c, tan: d}: Phasor): Phasor => {
  const absb = Math.abs(b);
  const absd = Math.abs(d);

  const tan = (
      (absb === 0)
    ? d
    : (absd === 0)
    ? b
    : (absb <= 1 && absd <= 1)
    ? (b + d) / (1 - b * d)
    : (absb > 1 && absd <= 1)
    ? (1 + d / b) / (1 / b - d)
    : (absb <= 1 && absd > 1)
    ? (b / d + 1) / (1 / d - b)
    : (1 / d + 1 / b) / ((1 / b) * (1 / d) - 1)
  );

  const mag = a * c * ((
    (b > 0 && d > 0 && tan <= 0) ||
    (b < 0 && d < 0 && tan >= 0)
  ) ? -1 : 1);

  return phasor(mag, tan);
};

export const div = ({mag: a, tan: b}: Phasor, {mag: c, tan: d}: Phasor): Phasor => {
  const absb = Math.abs(b);
  const absd = Math.abs(d);

  const tan = (
      (absb === 0)
    ? -d
    : (absd === 0)
    ? b
    : (absb <= 1 && absd <= 1)
    ? (b - d) / (1 + b * d)
    : (absb > 1 && absd <= 1)
    ? (1 - d / b) / (1 / b + d)
    : (absb <= 1 && absd > 1)
    ? (b / d - 1) / (1 / d + b)
    : (1 / d - 1 / b) / ((1 / b) * (1 / d) + 1)
  );

  const mag = a / c * ((
    (b > 0 && d < 0 && tan <= 0) ||
    (b < 0 && d > 0 && tan >= 0)
  ) ? -1 : 1);

  return phasor(mag, tan);
};

export const sinh = (p: Phasor): Phasor => {
  const [a, b] = [real(p), imag(p)];

  const expa = Math.exp(a);
  const sinha = (expa - 1 / expa) / 2;
  const cosha = (expa + 1 / expa) / 2;
  const sinb = Math.sin(b);
  const cosb = Math.cos(b);

  return rect(cosb && (cosb * sinha), sinb && (sinb * cosha));
};

export const cosh = (p: Phasor): Phasor => {
  const [a, b] = [real(p), imag(p)];

  const expa = Math.exp(a);
  const sinha = (expa - 1 / expa) / 2;
  const cosha = (expa + 1 / expa) / 2;
  const sinb = Math.sin(b);
  const cosb = Math.cos(b);

  return rect(cosb && (cosb * cosha), sinb && (sinb * sinha));
};
