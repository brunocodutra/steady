import { parse, pretty } from 'lib/number';

describe('Number parse', () => {
  it('should format a number to the significant figures', () => {
    expect(parse('     ')).toEqual(+0);
    expect(parse('  .  ')).toEqual(+0);
    expect(parse('   0 ')).toEqual(+0);
    expect(parse('  .0 ')).toEqual(+0);
    expect(parse(' +   ')).toEqual(+0);
    expect(parse(' +.  ')).toEqual(+0);
    expect(parse(' +.0 ')).toEqual(+0);
    expect(parse(' -   ')).toEqual(-0);
    expect(parse(' -.  ')).toEqual(-0);
    expect(parse(' -.0 ')).toEqual(-0);

    expect(parse('   e1 ')).toEqual(10);
    expect(parse('  .e1 ')).toEqual(10);
    expect(parse(' .1e1 ')).toEqual(1);
    expect(parse('  +e1 ')).toEqual(10);
    expect(parse(' +.e1 ')).toEqual(10);
    expect(parse('+.1e1 ')).toEqual(1);
    expect(parse('  -e1 ')).toEqual(-10);
    expect(parse(' -.e1 ')).toEqual(-10);
    expect(parse('-.1e1 ')).toEqual(-1);

    expect(parse('  e+1 ')).toEqual(10);
    expect(parse(' .e+1 ')).toEqual(10);
    expect(parse(' +e+1 ')).toEqual(10);
    expect(parse('+.e+1 ')).toEqual(10);
    expect(parse(' -e+1 ')).toEqual(-10);
    expect(parse('-.e+1 ')).toEqual(-10);

    expect(parse('  e-1 ')).toEqual(.1);
    expect(parse(' .e-1 ')).toEqual(.1);
    expect(parse(' +e-1 ')).toEqual(.1);
    expect(parse('+.e-1 ')).toEqual(.1);
    expect(parse(' -e-1 ')).toEqual(-.1);
    expect(parse('-.e-1 ')).toEqual(-.1);

    expect(parse('  E1 ')).toEqual(10);
    expect(parse(' .E1 ')).toEqual(10);
    expect(parse(' +E1 ')).toEqual(10);
    expect(parse('+.E1 ')).toEqual(10);
    expect(parse(' -E1 ')).toEqual(-10);
    expect(parse('-.E1 ')).toEqual(-10);

    expect(parse('  E+1 ')).toEqual(10);
    expect(parse(' .E+1 ')).toEqual(10);
    expect(parse(' +E+1 ')).toEqual(10);
    expect(parse('+.E+1 ')).toEqual(10);
    expect(parse(' -E+1 ')).toEqual(-10);
    expect(parse('-.E+1 ')).toEqual(-10);

    expect(parse('  E-1 ')).toEqual(.1);
    expect(parse(' .E-1 ')).toEqual(.1);
    expect(parse(' +E-1 ')).toEqual(.1);
    expect(parse('+.E-1 ')).toEqual(.1);
    expect(parse(' -E-1 ')).toEqual(-.1);
    expect(parse('-.E-1 ')).toEqual(-.1);

    expect(parse('00000')).toEqual(+0);
    expect(parse('00.00')).toEqual(+0);
    expect(parse('+0000')).toEqual(+0);
    expect(parse('+0.00')).toEqual(+0);
    expect(parse('-0000')).toEqual(-0);
    expect(parse('-0.00')).toEqual(-0);

    expect(parse(' 0123456789 ')).toEqual(123456789);
    expect(parse(' 0123456789.')).toEqual(123456789);
    expect(parse('.0123456789 ')).toEqual(.0123456789);
    expect(parse(' 01234.56789')).toEqual(1234.56789);
    expect(parse(' 01234e56789')).toEqual(Infinity);
    expect(parse(' 01234E56789')).toEqual(Infinity);
    expect(parse('+0123456789 ')).toEqual(123456789);
    expect(parse('+0123456789.')).toEqual(123456789);
    expect(parse('+.0123456789')).toEqual(.0123456789);
    expect(parse('+01234.56789')).toEqual(1234.56789);
    expect(parse('+01234e56789')).toEqual(Infinity);
    expect(parse('+01234E56789')).toEqual(Infinity);
    expect(parse('-0123456789 ')).toEqual(-123456789);
    expect(parse('-0123456789.')).toEqual(-123456789);
    expect(parse('-.0123456789')).toEqual(-.0123456789);
    expect(parse('-01234.56789')).toEqual(-1234.56789);
    expect(parse('-01234e56789')).toEqual(-Infinity);
    expect(parse('-01234E56789')).toEqual(-Infinity);

    expect(parse('  e ')).toBeNaN();
    expect(parse('  E ')).toBeNaN();
    expect(parse(' 1e ')).toBeNaN();
    expect(parse(' 1E ')).toBeNaN();
    expect(parse(' ee ')).toBeNaN();
    expect(parse(' eE ')).toBeNaN();
    expect(parse(' Ee ')).toBeNaN();
    expect(parse(' EE ')).toBeNaN();
    expect(parse(' .. ')).toBeNaN();
    expect(parse(' ++ ')).toBeNaN();
    expect(parse(' +- ')).toBeNaN();
    expect(parse(' -+ ')).toBeNaN();
    expect(parse(' -- ')).toBeNaN();
    expect(parse(' .+ ')).toBeNaN();
    expect(parse(' .- ')).toBeNaN();

    expect(parse(' 01234 56789')).toBeNaN();
    expect(parse('.0123456789.')).toBeNaN();
    expect(parse('.01234.56789')).toBeNaN();
    expect(parse('01234..56789')).toBeNaN();
    expect(parse('e0123456789e')).toBeNaN();
    expect(parse('e01234e56789')).toBeNaN();
    expect(parse('01234ee56789')).toBeNaN();
    expect(parse('E0123456789E')).toBeNaN();
    expect(parse('E01234E56789')).toBeNaN();
    expect(parse('01234EE56789')).toBeNaN();
    expect(parse(' 0123456789+')).toBeNaN();
    expect(parse('+0123456789+')).toBeNaN();
    expect(parse(' 01234+56789')).toBeNaN();
    expect(parse('+01234+56789')).toBeNaN();
    expect(parse('.01234+56789')).toBeNaN();
    expect(parse(' 0123456789-')).toBeNaN();
    expect(parse('-0123456789-')).toBeNaN();
    expect(parse(' 01234-56789')).toBeNaN();
    expect(parse('-01234-56789')).toBeNaN();
    expect(parse('.01234-56789')).toBeNaN();
  });
});

describe('Number pretty', () => {
  it('should format a number given then minimum number of digits', () => {
    const N = 7;
    const digits = Array.from({ length: N }, (_, i) => i);
    const samples = digits.map((d) => (999 / 10 ** d));

    samples.forEach((n) => {
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
});
