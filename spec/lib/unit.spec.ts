import {Prefix} from 'lib/unit';

const values = Object.keys(Prefix).filter((p) => Number(p)).map((p) => Number(p)).sort((a, b) => a - b);
const labels = Object.keys(Prefix).filter((p) => !Number(p));

describe('Prefix', () => {
  it('should contain only powers of 1000', () => {
    for (const value of values) {
      expect(Math.log10(value) % 3).toBeCloseTo(0);
    }
  });

  it('should map powers of 1000 to their labels', () => {
    for (let i = 0; i < values.length; ++i) {
      expect(Prefix[values[i]]).toBe(labels[i]);
    }
  });
});
