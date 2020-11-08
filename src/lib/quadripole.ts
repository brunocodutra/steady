import { _0, _1, Phasor } from 'lib/phasor';

type P2 = [Phasor, Phasor];

const isP2 = (p: unknown): p is P2 => (
  Array.isArray(p) && p.length === 2 &&
  p[0] instanceof Phasor &&
  p[1] instanceof Phasor
);

type P22 = [P2, P2];

const isP22 = (p: unknown): p is P22 =>
  Array.isArray(p) && p.length === 2 && isP2(p[0]) && isP2(p[1]);

export type Quadripole = {
  r: P22,
  t: P2,
};

// microsoft/TypeScript/#21732
// eslint-disable-next-line no-explicit-any
export const isQuadripole = (q: any): q is Quadripole => (
  typeof q === 'object' && q !== null &&
  'r' in q && isP22(q.r) &&
  't' in q && isP2(q.t)
);

export const eye: P22 = [[_1, _0], [_0, _1]];
export const quadripole = (r = eye, t: P2 = [_0, _0]): Quadripole => ({ r, t });

export const rotation = ({ r }: Quadripole) => r;
export const translation = ({ t }: Quadripole) => t;

export const project = ({ r: [[a, b], [c, d]], t: [u, j] }: Quadripole, [v, i]: P2): P2 => {
  return [
    u.add(a.mul(v)).add(b.mul(i)),
    j.add(c.mul(v)).add(d.mul(i)),
  ];
};

export const solve = ({ r: [[a, b], [c, d]], t: [u, j] }: Quadripole, [vi, io]: P2 = [_0, _0]): P2 => {
  const ii = io.sub(j).sub(c.mul(vi)).div(d);
  const vo = u.add(a.mul(vi)).add(b.mul(ii));

  return [vo, ii];
};

export const connect = (p: Quadripole, q: Quadripole): Quadripole => {
  const { r: [[a, b], [c, d]] } = p;
  const { r: [[e, f], [g, h]] } = q;

  return quadripole(
    [
      [e.mul(a).add(f.mul(c)), e.mul(b).add(f.mul(d))],
      [g.mul(a).add(h.mul(c)), g.mul(b).add(h.mul(d))],
    ],
    project(q, p.t),
  );
};
