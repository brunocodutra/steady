import { normalize, Scale } from 'lib/unit';

const values = Object.keys(Scale).filter((p) => +p).map((p) => +p).sort((a, b) => a - b);
const labels = Object.keys(Scale).filter((p) => !+p);

describe('Scale', () => {
  it('should contain only powers of 1000', () => {
    for (const value of values) {
      expect(Math.log10(value) % 3).toBeCloseTo(0);
    }
  });

  it('should map powers of 1000 to their labels', () => {
    for (let i = 0; i < values.length; ++i) {
      expect(Scale[values[i]]).toEqual(labels[i]);
    }
  });
});

describe('normalize', () => {
  it('should decompose number in two multiplicative factors', () => {
    const n = Math.max(Math.random() * 0.9999999999999999E18, 1E-15);

    {
      const [v, s] = normalize(n);
      expect(v * s).toBeCloseTo(n, Number.EPSILON);
    }

    {
      const [v, s] = normalize(-n);
      expect(v * s).toBeCloseTo(-n, Number.EPSILON);
    }
  });

  it('should return a number smaller than 1E3 in magnitude for numbers between 1E-15 and 1E18 in magnitude', () => {
    for (const value of values) {
      expect(normalize(value)).toEqual([1, value]);
      expect(normalize(-value)).toEqual([-1, value]);

      expect(normalize(9.99999999999999 * value)).toBeCloseTo([9.99999999999999, value], Number.EPSILON);
      expect(normalize(99.9999999999999 * value)).toBeCloseTo([99.9999999999999, value], Number.EPSILON);
      expect(normalize(999.999999999999 * value)).toBeCloseTo([999.999999999999, value], Number.EPSILON);

      expect(normalize(-9.99999999999999 * value)).toBeCloseTo([-9.99999999999999, value], Number.EPSILON);
      expect(normalize(-99.9999999999999 * value)).toBeCloseTo([-99.9999999999999, value], Number.EPSILON);
      expect(normalize(-999.999999999999 * value)).toBeCloseTo([-999.999999999999, value], Number.EPSILON);
    }
  });

  it('should return infinity for numbers greater than 1E18 in magnitude', () => {
    expect(normalize(1E18)).toEqual([Infinity, Scale.none]);
    expect(normalize(-1E18)).toEqual([-Infinity, Scale.none]);

    expect(normalize(Number.MAX_VALUE)).toEqual([Infinity, Scale.none]);
    expect(normalize(-Number.MAX_VALUE)).toEqual([-Infinity, Scale.none]);

    expect(normalize(Infinity)).toEqual([Infinity, Scale.none]);
    expect(normalize(-Infinity)).toEqual([-Infinity, Scale.none]);
  });

  it('should return zero for numbers smaller than 1E-15 in magnitude', () => {
    expect(normalize(0.9999999999999999E-15)).toEqual([0, Scale.none]);
    expect(normalize(-0.9999999999999999E-15)).toEqual([0, Scale.none]);

    expect(normalize(Number.EPSILON)).toEqual([0, Scale.none]);
    expect(normalize(-Number.EPSILON)).toEqual([0, Scale.none]);

    expect(normalize(Number.MIN_VALUE)).toEqual([0, Scale.none]);
    expect(normalize(-Number.MIN_VALUE)).toEqual([0, Scale.none]);

    expect(normalize(0)).toEqual([0, Scale.none]);
    expect(normalize(-0)).toEqual([0, Scale.none]);
  });

  it('should preserve NaN', () => {
    expect(normalize(NaN)).toEqual([NaN, Scale.none]);
    expect(normalize(-NaN)).toEqual([-NaN, Scale.none]);
  });
});
