import { equal, prefix, traverse } from 'lib/algorithm';

const rand = (N = 10) => Math.floor(Math.random() * N) - N / 2;

interface List {
  readonly value: number,
  readonly next?: List
}

describe('traverse', () => {
  it('should flatten a linked list into an array', () => {
    for (let length = 0; length < 10; ++length) {
      const a = Array.from({ length }, rand);
      const l = a.reduceRight((next: List | undefined, value) => ({ value, next }), undefined);

      expect(traverse(l).map((e) => e.value)).toBe(a);
    }
  });
});

describe('prefix', () => {
  it('should check whether one array is a prefix of another', () => {
    for (let length = 0; length < 10; ++length) {
      const x = Array.from({ length }, rand);
      for (let i = x.length; i >= 0; --i) {
        const y = x.slice(0, i);

        expect(prefix(y, x)).toBe(i !== length);
        expect(prefix(x, y)).toBe(false);
      }
    }
  });
});

describe('equal', () => {
  it('should check whether two arrays represent the same sequence', () => {
    for (let length = 0; length < 10; ++length) {
      const x = Array.from({ length }, rand);
      for (let i = x.length; i >= 0; --i) {
        expect(equal(x, x.slice(0, i))).toBe(i === length);
      }
    }
  });
});
