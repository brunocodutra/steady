import {add, div, mul, neg, Phasor, rect, sub} from 'phasor';

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

export const det = ({abcd: [[a, b], [c, d]]}: Quadripole): Phasor => {
  return sub(mul(a, d), mul(b, c));
};

export const inv = (q: Quadripole): Quadripole => {
  const D = det(q);
  const {abcd: [[a, b], [c, d]], vi: [v, i]} = q;

  return {
    abcd: [
      [div(d, D), neg(div(b, D))],
      [neg(div(c, D)), div(a, D)],
    ],

    vi: [
      div(sub(mul(b, i), mul(d, v)), D),
      div(sub(mul(c, v), mul(a, i)), D),
    ],
  };
};

export const cat = (q: Quadripole, p: Quadripole): Quadripole => {
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
