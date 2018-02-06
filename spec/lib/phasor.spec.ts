import {angle, conj, imag, neg, norm, polar, real, rect} from 'lib/phasor';

import {samples} from './phasor.spec/util';

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
    samples.forEach(({real: re, imag: im, mag, ang}) => {
      expect(neg(rect(re, im))).toBeCloseTo(rect(-re, -im));
      expect(neg(polar(mag, ang))).toBeCloseTo(polar(-mag, ang));
    });

    expect(neg(rect(NaN))).toBeNaN();
    expect(neg(rect(0, NaN))).toBeNaN();
    expect(neg(rect(NaN, NaN))).toBeNaN();
  });

  it('should have a conjugate', () => {
    samples.forEach(({real: re, imag: im, mag, ang}) => {
      expect(conj(rect(re, im))).toBeCloseTo(rect(re, -im));
      expect(conj(polar(mag, ang))).toBeCloseTo(polar(mag, -ang));
    });

    expect(conj(rect(NaN))).toBeNaN();
    expect(conj(rect(0, NaN))).toBeNaN();
    expect(conj(rect(NaN, NaN))).toBeNaN();
  });
});
