import { _0, _1, add, div, isPhasor, mul, Phasor, sub } from 'lib/phasor';

type P2 = [Phasor, Phasor];

const isP2 = (p: any): p is P2 => (
  typeof p === 'object' &&
  '0' in p && isPhasor(p[0]) &&
  '1' in p && isPhasor(p[1])
);

type P22 = [P2, P2];

const isP22 = (p: any): p is P22 => (
  typeof p === 'object' &&
  '0' in p && isP2(p[0]) &&
  '1' in p && isP2(p[1])
);

export type Quadripole = {
  r: P22,
  t: P2,
};

export const isQuadripole = (q: any): q is Quadripole => (
  typeof q === 'object' &&
  'r' in q && isP22(q.r) &&
  't' in q && isP2(q.t)
);

export const eye: P22 = [[_1, _0], [_0, _1]];
export const quadripole = (r = eye, t: P2 = [_0, _0]): Quadripole => ({ r, t });

export const rotation = ({ r }: Quadripole) => r;
export const translation = ({ t }: Quadripole) => t;

export const project = ({ r: [[a, b], [c, d]], t: [u, j] }: Quadripole, [v, i]: P2): P2 => {
  return [
    add(add(mul(a, v), mul(b, i)), u),
    add(add(mul(c, v), mul(d, i)), j),
  ];
};

export const solve = ({ r: [[a, b], [c, d]], t: [u, j] }: Quadripole, [vi, io]: P2 = [_0, _0]): P2 => {
  const ii = div(sub(sub(io, j), mul(c, vi)), d);
  const vo = add(add(mul(a, vi), mul(b, ii)), u);

  return [vo, ii];
};

export const connect = (p: Quadripole, q: Quadripole): Quadripole => {
  const { r: [[a, b], [c, d]] } = p;
  const { r: [[e, f], [g, h]] } = q;

  return quadripole(
    [
      [add(mul(e, a), mul(f, c)), add(mul(e, b), mul(f, d))],
      [add(mul(g, a), mul(h, c)), add(mul(g, b), mul(h, d))],
    ],
    project(q, p.t),
  );
};
