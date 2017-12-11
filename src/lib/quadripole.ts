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

const _0 = rect(0);
const _1 = rect(1);

export const eye: ABCD = [[_1, _0], [_0, _1]];
export const quadripole = (abcd = eye, vi: VI = [_0, _0]): Quadripole => ({abcd, vi});

export const project = ({abcd: [[a, b], [c, d]], vi: [u, j]}: Quadripole, [v, i]: VI): VI => {
  return [
    add(add(mul(a, v), mul(b, i)), u),
    add(add(mul(c, v), mul(d, i)), j),
  ];
};

export const solve = ({abcd: [[a, b], [c, d]], vi: [u, j]}: Quadripole, [vi, io]: VI = [_0, _0]): VI => {
  const ii = div(sub(sub(io, j), mul(c, vi)), d);
  const vo = add(add(mul(a, vi), mul(b, ii)), u);

  return [vo, ii];
};

export const connect = (p: Quadripole, q: Quadripole): Quadripole => {
  const {abcd: [[a, b], [c, d]]} = p;
  const {abcd: [[e, f], [g, h]]} = q;

  return quadripole(
    [
      [add(mul(e, a), mul(f, c)), add(mul(e, b), mul(f, d))],
      [add(mul(g, a), mul(h, c)), add(mul(g, b), mul(h, d))],
    ],
    project(q, p.vi),
  );
};
