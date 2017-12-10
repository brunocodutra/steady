import {add, div, mul, Phasor, rect, sub} from 'lib/phasor';

type ABCD = [
  [Phasor, Phasor],
  [Phasor, Phasor]
];

type VI = [Phasor, Phasor];

export type Quadripole = {
  abcd: ABCD,
  vi: VI,
};

export const eye: ABCD = [[rect(1), rect(0)], [rect(0), rect(1)]];
export const quadripole = (abcd = eye, vi: VI = [rect(0), rect(0)]): Quadripole => ({abcd, vi});

export const connect = (q: Quadripole, p: Quadripole): Quadripole => {
  const {abcd: [[a, b], [c, d]], vi: [v, i]} = p;
  const {abcd: [[e, f], [g, h]], vi: [u, j]} = q;

  return {
    abcd: [
      [add(mul(a, e), mul(b, g)), add(mul(a, f), mul(b, h))],
      [add(mul(c, e), mul(d, g)), add(mul(c, f), mul(d, h))],
    ],

    vi: [
      add(add(mul(a, u), mul(b, j)), v),
      add(add(mul(c, u), mul(d, j)), i),
    ],
  };
};

export const solve = ({abcd: [[a, b], [c, d]], vi: [v, i]}: Quadripole, [vi, io]: VI = [rect(0), rect(0)]): VI => {
  const ii = div(sub(io, add(i, mul(c, vi))), d);
  const vo = add(add(mul(a, vi), mul(b, ii)), v);

  return [vo, ii];
};

export const project = ({abcd: [[a, b], [c, d]], vi: [v, i]}: Quadripole, [vi, ii]: VI): VI => {
  return [
    add(add(mul(a, vi), mul(b, ii)), v),
    add(add(mul(c, vi), mul(d, ii)), i),
  ];
};
