import * as Phasors from 'lib/phasor';
import { _0, _1, Phasor, polar } from 'lib/phasor';
import { connect, eye, Quadripole, quadripole } from 'lib/quadripole';

export enum Kind {
  connector = 'connector',
  ground = 'ground',
  vsrc = 'vsrc',
  isrc = 'isrc',
  impedance = 'impedance',
  admittance = 'admittance',
  xformer = 'xformer',
  line = 'line',
  series = 'series',
  shunt = 'shunt',
}

export const isKind = (k: unknown): k is Kind => typeof k === 'string' && k in Kind;

export interface Connector {
  readonly kind: Kind.connector,
  readonly next: undefined,
  readonly value: undefined,
  readonly model: Quadripole,
  readonly level: 0,
};

export interface Ground {
  readonly kind: Kind.ground,
  readonly next: Element,
  readonly value: undefined,
  readonly model: Quadripole,
  readonly level: number,
};

export interface VSrc {
  readonly kind: Kind.vsrc,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export interface ISrc {
  readonly kind: Kind.isrc,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export interface Impedance {
  readonly kind: Kind.impedance,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export interface Admittance {
  readonly kind: Kind.admittance,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export interface XFormer {
  readonly kind: Kind.xformer,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export interface Line {
  readonly kind: Kind.line,
  readonly next: Element,
  readonly value: { y: Phasor, z: Phasor },
  readonly model: Quadripole,
  readonly level: number,
};

export interface Series {
  readonly kind: Kind.series,
  readonly next: Element,
  readonly value: undefined,
  readonly model: Quadripole,
  readonly level: number,
};

export interface Shunt {
  readonly kind: Kind.shunt,
  readonly next: Element,
  readonly value: Series,
  readonly model: Quadripole,
  readonly level: number,
};

export type Static = Ground | Series;
export type Parametric = Impedance | Admittance | XFormer | Line | VSrc | ISrc;
export type Removable = Parametric | Shunt;
export type Activable = Removable | Connector;
export type Element = Static | Parametric | Removable | Activable;

const collapse = (element: Element): Quadripole => element.kind !== Kind.connector
  ? connect(element.model, collapse(element.next))
  : element.model
  ;

const terminal: Connector = {
  kind: Kind.connector,
  next: undefined,
  value: undefined,
  model: quadripole(),
  level: 0,
};

export const connector = (): Connector => terminal;

export const ground = (next: Ground['next'] = connector()): Ground => ({
  kind: Kind.ground,
  next,
  value: undefined,
  model: quadripole(),
  level: next.level,
});

export const vsrc = (next: VSrc['next'] = connector(), value = _0): VSrc => ({
  kind: Kind.vsrc,
  next,
  value,
  model: quadripole(eye, [value, _0]),
  level: next.level,
});

export const isrc = (next: ISrc['next'] = connector(), value = _0): ISrc => ({
  kind: Kind.isrc,
  next,
  value,
  model: quadripole(eye, [_0, value]),
  level: next.level,
});

export const impedance = (next: Impedance['next'] = connector(), value = _0): Impedance => ({
  kind: Kind.impedance,
  next,
  value,
  model: quadripole([[_1, value.neg()], [_0, _1]]),
  level: next.level,
});

export const admittance = (next: Admittance['next'] = connector(), value = polar(Infinity)): Admittance => ({
  kind: Kind.admittance,
  next,
  value,
  model: quadripole([[_1, _0], [value.recip().neg(), _1]]),
  level: next.level,
});

export const xformer = (next: XFormer['next'] = connector(), value = _1): XFormer => ({
  kind: Kind.xformer,
  next,
  value,
  model: quadripole([[value.recip(), _0], [_0, value]]),
  level: next.level,
});

export const line = (next: Line['next'] = connector(), { y, z } = { y: _0, z: _1 }): Line => ({
  kind: Kind.line,
  next,
  value: { y, z },
  model: quadripole([[y.cosh(), y.sinh().mul(z.neg())], [y.sinh().div(z.neg()), y.cosh()]]),
  level: next.level,
});

export const series = (next: Series['next'] = connector()): Series => ({
  kind: Kind.series,
  next,
  value: undefined,
  model: collapse(next),
  level: next.level,
});

export const shunt = (next: Shunt['next'] = connector(), value = series()): Shunt => ({
  kind: Kind.shunt,
  next,
  value,
  model: quadripole(
    [[_1, _0], [value.model.r[1][0].div(value.model.r[1][1]), _1]],
    [_0, value.model.t[1].div(value.model.r[1][1])],
  ),
  level: next.level + value.level + 1,
});

export const depth = (element: Element): number =>
  element.kind === Kind.connector ? 0 : 1 + depth(element.next);

export const make = (kind: Kind): Element => {
  switch (kind) {
    case Kind.connector:
      return connector();
    case Kind.ground:
      return ground();
    case Kind.vsrc:
      return vsrc();
    case Kind.isrc:
      return isrc();
    case Kind.impedance:
      return impedance();
    case Kind.admittance:
      return admittance();
    case Kind.xformer:
      return xformer();
    case Kind.line:
      return line();
    case Kind.series:
      return series();
    case Kind.shunt:
      return shunt();
  }
};

export const split = (element: Element) => {
  if (element.kind === Kind.connector) {
    throw new Error(`unexpected '${Kind.connector}'`);
  }

  return element.next;
};

export const join = (element: Element, next: Element) => {
  switch (element.kind) {
    case Kind.connector:
      throw new Error(`unexpected '${Kind.connector}'`);
    case Kind.ground:
      return ground(next);
    case Kind.vsrc:
      return vsrc(next, element.value);
    case Kind.isrc:
      return isrc(next, element.value);
    case Kind.impedance:
      return impedance(next, element.value);
    case Kind.admittance:
      return admittance(next, element.value);
    case Kind.xformer:
      return xformer(next, element.value);
    case Kind.line:
      return line(next, element.value);
    case Kind.series:
      return series(next);
    case Kind.shunt:
      return shunt(next, element.value);
  }
};

export const branch = (element: Element): Series => {
  if (element.kind !== Kind.shunt) {
    throw new Error(`expected '${Kind.shunt}', got '${element.kind}'`);
  }

  return element.value;
};

export const merge = (element: Element, value: Element): Shunt => {
  if (element.kind !== Kind.shunt) {
    throw new Error(`expected '${Kind.shunt}', got '${element.kind}'`);
  }

  if (value.kind !== Kind.series) {
    throw new Error(`expected '${Kind.series}', got '${value.kind}'`);
  }

  return shunt(element.next, value);
};

// microsoft/TypeScript/#21732
// eslint-disable-next-line no-explicit-any
const isLineValue = (v: any): v is Line['value'] => (
  typeof v === 'object' && v !== null &&
  'y' in v && v.y instanceof Phasor &&
  'z' in v && v.z instanceof Phasor
);

export const update = (element: Element, value: Phasor | Line['value']): Parametric => {
  if (value instanceof Phasor) {
    switch (element.kind) {
      case Kind.vsrc:
        return vsrc(element.next, value);
      case Kind.isrc:
        return isrc(element.next, value);
      case Kind.impedance:
        return impedance(element.next, value);
      case Kind.admittance:
        return admittance(element.next, value);
      case Kind.xformer:
        return xformer(element.next, value);
    }
  }

  if (isLineValue(value)) {
    switch (element.kind) {
      case Kind.line:
        return line(element.next, value);
    }
  }

  throw new Error(`cannot update element of kind '${element.kind}' with value '${value}'`);
};

export const pack = (element?: Element): unknown => {
  switch (element?.kind) {
    case Kind.connector:
      return [Object.keys(Kind).indexOf(element.kind)];
    case Kind.ground:
    case Kind.series:
      return [Object.keys(Kind).indexOf(element.kind), pack(element.next)];
    case Kind.vsrc:
    case Kind.isrc:
    case Kind.impedance:
    case Kind.admittance:
    case Kind.xformer:
      return [Object.keys(Kind).indexOf(element.kind), pack(element.next), Phasors.pack(element.value)];

    case Kind.line: {
      const { y, z } = element.value;
      return [Object.keys(Kind).indexOf(element.kind), pack(element.next), [Phasors.pack(y), Phasors.pack(z)]];
    }

    case Kind.shunt:
      return [Object.keys(Kind).indexOf(element.kind), pack(element.next), pack(element.value)];

    case undefined:
      return [];
  }
};

export const unpack = (packed: unknown): Element => {
  if (!Array.isArray(packed) || !packed.length || packed.length > 3) {
    throw new Error(`expected '[kind, next?, value?]', got ${packed}`);
  }

  const kind = Object.keys(Kind)[packed[0]];

  if (!isKind(kind)) {
    throw new Error(`unknown element kind '${kind}'`);
  }

  switch (kind) {
    case Kind.connector:
      return connector();

    case Kind.ground:
    case Kind.series:
      return join(make(kind), unpack(packed[1]));

    case Kind.vsrc:
    case Kind.isrc:
    case Kind.impedance:
    case Kind.admittance:
    case Kind.xformer:
      return update(join(make(kind), unpack(packed[1])), Phasors.unpack(packed[2]));

    case Kind.line: {
      /* istanbul ignore next */
      if (!Array.isArray(packed[2]) || packed[2].length !== 2) {
        throw new Error(`expected '[y, z]', got ${packed}`);
      }

      const value = {
        y: Phasors.unpack(packed[2][0]),
        z: Phasors.unpack(packed[2][1]),
      };

      return update(join(make(kind), unpack(packed[1])), value);
    }

    case Kind.shunt:
      return merge(join(make(kind), unpack(packed[1])), unpack(packed[2]));
  }
};
