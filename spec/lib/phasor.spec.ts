import nan from 'jest/nan';
import closeTo from 'jest/closeTo';

import {
  rect, polar,
  real, imag,
  norm, angle,
  neg, conj,
  add, sub,
  mul, div,
  sinh, cosh,
} from 'lib/phasor';

expect.extend(nan);
expect.extend(closeTo);

type Sample = {mag: number, ang: number, real: number, imag: number};

const samples: Sample[] = [].concat.apply(
  [{mag: 0, ang: 0, real: 0, imag: 0}],
  [1E-6, 1E-3, 1, 1E3, 1E6, Infinity].map((mag) =>
    Array(33).fill(Math.PI / 8).map((p, k) => {
      const ang = p * k - 2 * Math.PI;
      const cos = Math.cos(ang % (Math.PI * 2));
      const sin = Math.sin(ang % (Math.PI * 2));

      const real = cos && (cos * mag);
      const imag = sin && (sin * mag);

      return {mag, ang, real, imag};
    })
  ),
);

describe('Phasor', () => {
  it('should have a real part', () => {
    samples.forEach(({real: re, imag: im}) => {
      expect(real(rect(re))).toBeCloseTo(re);
      expect(real(rect(re, im))).toBeCloseTo(re);
    });

    expect(real(rect(NaN))).toBeNaN();
    expect(real(rect(0, NaN))).toBeNaN();
    expect(real(rect(NaN, NaN))).toBeNaN();
  });

  it('should have an imaginary part', () => {
    samples.forEach(({real: re, imag: im}) => {
      expect(imag(rect(re))).toBeCloseTo(0);
      expect(imag(rect(re, im))).toBeCloseTo(im);
    });

    expect(imag(rect(NaN))).toBeNaN();
    expect(imag(rect(0, NaN))).toBeNaN();
    expect(imag(rect(NaN, NaN))).toBeNaN();
  });

  it('should have a magnitude', () => {
    samples.forEach(({mag, ang}) => {
      const r = Math.abs(mag);
      expect(norm(polar(mag))).toBeCloseTo(r);
      expect(norm(polar(mag, ang))).toBeCloseTo(r);
    });

    expect(norm(rect(NaN))).toBeNaN();
    expect(norm(rect(0, NaN))).toBeNaN();
    expect(norm(rect(NaN, NaN))).toBeNaN();
  });

  it('should have an angle', () => {
    samples.forEach(({mag, ang}) => {
      const r = mag && Math.atan2(Math.sin(ang), Math.cos(ang));
      expect(angle(polar(mag))).toBeCloseTo(0);
      expect(angle(polar(mag, ang))).toBeCloseTo(r);
    });

    expect(angle(rect(NaN))).toBeNaN();
    expect(angle(rect(0, NaN))).toBeNaN();
    expect(angle(rect(NaN, NaN))).toBeNaN();
  });

  it('should have a complement', () => {
    samples.forEach(({real:re, imag: im, mag, ang}) => {
      expect(neg(rect(re, im))).toBeCloseTo(rect(-re, -im));
      expect(neg(polar(mag, ang))).toBeCloseTo(polar(-mag, ang));
    });

    expect(neg(rect(NaN))).toBeNaN();
    expect(neg(rect(0, NaN))).toBeNaN();
    expect(neg(rect(NaN, NaN))).toBeNaN();
  });

  it('should have a conjugate', () => {
    samples.forEach(({real:re, imag: im, mag, ang}) => {
      expect(conj(rect(re, im))).toBeCloseTo(rect(re, -im));
      expect(conj(polar(mag, ang))).toBeCloseTo(polar(mag, -ang));
    });

    expect(conj(rect(NaN))).toBeNaN();
    expect(conj(rect(0, NaN))).toBeNaN();
    expect(conj(rect(NaN, NaN))).toBeNaN();
  });

  it('should add', () => {
    samples.forEach(({real: a, imag: b}) => {
      samples.forEach(({real: c, imag: d}) => {
        if((isFinite(a) || isFinite(c) || a === c) && (isFinite(b) || isFinite(d) || b === d)) {
          const u = rect(a, b);
          const v = rect(c, d);
          const r = rect(a + c, b + d);
          expect(add(u, v)).toBeCloseTo(r);
        }
      });

      expect(add(rect(a, b), rect(NaN))).toBeNaN();
      expect(add(rect(a, b), rect(0, NaN))).toBeNaN();
      expect(add(rect(a, b), rect(NaN, NaN))).toBeNaN();
    });
  });

  it('should subtract', () => {
    samples.forEach(({real: a, imag: b}) => {
      samples.forEach(({real: c, imag: d}) => {
        if((isFinite(a) || isFinite(c) || a !== c) && (isFinite(b) || isFinite(d) || b !== d)) {
          const u = rect(a, b);
          const v = rect(c, d);
          const r = rect(a - c, b - d);
          expect(sub(u, v)).toBeCloseTo(r);
        }
      });

      expect(sub(rect(a, b), rect(NaN))).toBeNaN();
      expect(sub(rect(a, b), rect(0, NaN))).toBeNaN();
      expect(sub(rect(a, b), rect(NaN, NaN))).toBeNaN();
    });
  });

  it('should multiply', () => {
    samples.forEach(({mag: a, ang: b}) => {
      samples.forEach(({mag: c, ang: d}) => {
        if((isFinite(a) || c !== 0) && (a !== 0 || isFinite(c))) {
          const u = polar(a, b);
          const v = polar(c, d);
          const r = polar(a * c, b + d);
          expect(mul(u, v)).toBeCloseTo(r);
        }
      });

      expect(mul(polar(a, b), polar(NaN))).toBeNaN();
      expect(mul(polar(a, b), polar(0, NaN))).toBeNaN();
      expect(mul(polar(a, b), polar(NaN, NaN))).toBeNaN();
    });
  });

  it('should divide', () => {
    samples.forEach(({mag: a, ang: b}) => {
      samples.forEach(({mag: c, ang: d}) => {
        if((isFinite(a) || isFinite(c)) && (a !== 0 || c !== 0)) {
          const u = polar(a, b);
          const v = polar(c, d);
          const r = polar(a / c, b - d);
          expect(div(u, v)).toBeCloseTo(r);
        }
      });

      expect(div(polar(a, b), polar(NaN))).toBeNaN();
      expect(div(polar(a, b), polar(0, NaN))).toBeNaN();
      expect(div(polar(a, b), polar(NaN, NaN))).toBeNaN();
    });
  });

  it('should have a hyperbolic sine', () => {
    samples.forEach(({real, imag, mag}) => {
      if(isFinite(mag)) {
        const s = rect(real, imag);
        const u = rect(Math.log(norm(s)), angle(s));
        const r = sub(div(s, rect(2)), div(rect(0.5), s));
        expect(sinh(u)).toBeCloseTo(r);
      }
    });

    expect(sinh(rect(NaN))).toBeNaN();
    expect(sinh(rect(0, NaN))).toBeNaN();
    expect(sinh(rect(NaN, NaN))).toBeNaN();
  });

  it('should have a hyperbolic cosine', () => {
    samples.forEach(({real, imag, mag}) => {
      if(isFinite(mag)) {
        const s = rect(real, imag);
        const u = rect(Math.log(norm(s)), angle(s));
        const r = add(div(s, rect(2)), div(rect(0.5), s));
        expect(cosh(u)).toBeCloseTo(r);
      }
    });

    expect(cosh(rect(NaN))).toBeNaN();
    expect(cosh(rect(0, NaN))).toBeNaN();
    expect(cosh(rect(NaN, NaN))).toBeNaN();
  });
});
