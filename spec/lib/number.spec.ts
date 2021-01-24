import { parse, pretty } from 'lib/number';

describe('parse', () => {
  it('should accept any valid number', () => {
    const n = Math.random() * 1E6;

    expect(parse(n.toString())).toEqual(n);

    expect(parse(n.toFixed(20))).toEqual(n);
    expect(parse(n.toExponential(20))).toEqual(n);
    expect(parse(n.toPrecision(21))).toEqual(n);

    expect(parse((-n).toFixed(20))).toEqual(-n);
    expect(parse((-n).toExponential(20))).toEqual(-n);
    expect(parse((-n).toPrecision(21))).toEqual(-n);
  });

  it('should accept empty string', () => {
    expect(parse('     ')).toEqual(0);
  });

  it('should accept individual plus or minus sign', () => {
    expect(parse('  +  ')).toEqual(+0);
    expect(parse('  -  ')).toEqual(-0);

    expect(parse(' ++ ')).toBeNaN();
    expect(parse(' +- ')).toBeNaN();
    expect(parse(' -+ ')).toBeNaN();
    expect(parse(' -- ')).toBeNaN();
    expect(parse(' +. ')).toBeNaN();
    expect(parse(' -. ')).toBeNaN();
    expect(parse(' .+ ')).toBeNaN();
    expect(parse(' .- ')).toBeNaN();
  });

  it('should accept numbers that end with exponential marker', () => {
    expect(parse(' 123456789e ')).toEqual(123456789);
    expect(parse(' 123456789E ')).toEqual(123456789);
    expect(parse('+123456789e ')).toEqual(123456789);
    expect(parse('+123456789E ')).toEqual(123456789);
    expect(parse('-123456789e ')).toEqual(-123456789);
    expect(parse('-123456789E ')).toEqual(-123456789);
    expect(parse('.123456789e ')).toEqual(.123456789);
    expect(parse('.123456789E ')).toEqual(.123456789);

    expect(parse('  e  ')).toBeNaN();
    expect(parse('  E  ')).toBeNaN();
    expect(parse(' .e  ')).toBeNaN();
    expect(parse(' .E  ')).toBeNaN();
    expect(parse(' +e  ')).toBeNaN();
    expect(parse(' +E  ')).toBeNaN();
    expect(parse(' -e  ')).toBeNaN();
    expect(parse(' -E  ')).toBeNaN();

    expect(parse(' ee ')).toBeNaN();
    expect(parse(' eE ')).toBeNaN();
    expect(parse(' Ee ')).toBeNaN();
    expect(parse(' EE ')).toBeNaN();
  });

  it('should accept numbers that end with exponential marker followed by plus or minus sign', () => {
    expect(parse(' 123456789e+')).toEqual(123456789);
    expect(parse(' 123456789E+')).toEqual(123456789);
    expect(parse(' 123456789e-')).toEqual(123456789);
    expect(parse(' 123456789E-')).toEqual(123456789);
    expect(parse('+123456789e+')).toEqual(123456789);
    expect(parse('+123456789E+')).toEqual(123456789);
    expect(parse('+123456789e-')).toEqual(123456789);
    expect(parse('+123456789E-')).toEqual(123456789);
    expect(parse('-123456789e+')).toEqual(-123456789);
    expect(parse('-123456789E+')).toEqual(-123456789);
    expect(parse('-123456789e-')).toEqual(-123456789);
    expect(parse('-123456789E-')).toEqual(-123456789);
    expect(parse('.123456789e+')).toEqual(.123456789);
    expect(parse('.123456789E+')).toEqual(.123456789);
    expect(parse('.123456789e-')).toEqual(.123456789);
    expect(parse('.123456789E-')).toEqual(.123456789);

    expect(parse('  e+ ')).toBeNaN();
    expect(parse('  E+ ')).toBeNaN();
    expect(parse('  e- ')).toBeNaN();
    expect(parse('  E- ')).toBeNaN();
  });
});

describe('Number pretty', () => {
  const N = 7;
  const digits = Array.from({ length: N }, (_, i) => i);

  it('should format a number given a minimum number of digits', () => {
    digits.map((d) => (999 / 10 ** d)).forEach((n) => {
      expect(pretty(n)).toEqual(pretty(n, 3));
      expect(pretty(-n)).toEqual(pretty(-n, 3));

      digits.forEach((d) => {
        const int = Math.floor(n).toString();
        const dec = (n - Math.floor(n)).toFixed(d + N).slice(2, - int.length - N);
        const result = dec.length ? `${int}.${dec}` : int;

        expect(pretty(n, d)).toEqual(result);
        expect(pretty(-n, d)).toEqual(+result ? `-${result}` : result);
      });
    });
  });

  it('should handle Infinity', () => {
    digits.forEach((d) => {
      expect(pretty(Infinity, d)).toEqual('∞');
      expect(pretty(-Infinity, d)).toEqual('-∞');
    });
  });

  it('should handle NaN', () => {
    digits.forEach((d) => {
      expect(pretty(NaN, d)).toEqual(NaN.toString());
      expect(pretty(-NaN, d)).toEqual(NaN.toString());
    });
  });
});
