import {Prefix} from 'lib/unit';

describe('Prefix', () => {
  const values = Object.keys(Prefix).filter(p => Number(p)).map(p => Number(p)).sort((a, b) => a - b);

  it('should contain only powers of 1000', () => {
    for (let i = 0; i < values.length; ++i) {
      expect(Math.log10(values[i]) % 3).toBeCloseTo(0);
    }
  });

  const labels = Object.keys(Prefix).filter(p => !Number(p));

  it('should map powers of 1000 to their labels', () => {
    for (let i = 0; i < values.length; ++i) {
      expect(Prefix[values[i]]).toBe(labels[i]);
    }
  });
});
