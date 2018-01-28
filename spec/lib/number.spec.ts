import {pretty} from 'lib/number';


describe('Number pretty', () => {
  it('should format a number given then minimum number of digits', () => {
    const N = 7;
    const digits = Array.from(Array(N).keys());
    const samples = digits.map((d) => (999 / 10 ** d));

    samples.forEach((n) => {
      expect(pretty(n)).toBe(pretty(n, 3));
      expect(pretty(-n)).toBe(pretty(-n, 3));

      digits.forEach((d) => {
        const int = Math.floor(n).toString();
        const dec = (n - Math.floor(n)).toFixed(d + N).slice(2, - int.length - N);
        const result = dec.length ? `${int}.${dec}` : int;

        expect(pretty(n, d)).toBe(result);
        expect(pretty(-n, d)).toBe(+result ? `-${result}` : result);
      });
    });
  });
});
