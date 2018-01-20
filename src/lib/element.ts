import {_0, _1, cosh, div, isPhasor, mul, neg, Phasor, rect, sinh} from 'lib/phasor';
import {connect, eye, Quadripole, quadripole, rotation, translation} from 'lib/quadripole';

export const enum Kind {
  connector = 'connector',
  ground = 'ground',
  vsrc = 'vsrc',
  isrc = 'isrc',
  impedance = 'impedance',
  admittance = 'admittance',
  line = 'line',
  xformer = 'xformer',
  series = 'series',
  shunt = 'shunt',
}

export type Connector = {
  readonly kind: Kind.connector,
  readonly next: undefined,
  readonly value: undefined,
  readonly model: Quadripole,
  readonly level: 0,
};

export type Ground = {
  readonly kind: Kind.ground,
  readonly next: Element,
  readonly value: undefined,
  readonly model: Quadripole,
  readonly level: number,
};

export type VSrc = {
  readonly kind: Kind.vsrc,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export type ISrc = {
  readonly kind: Kind.isrc,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export type Impedance = {
  readonly kind: Kind.impedance,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export type Admittance = {
  readonly kind: Kind.admittance,
  readonly next: Element,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly level: number,
};

export type Line = {
  readonly kind: Kind.line,
  readonly next: Element,
  readonly value: {y: Phasor, z: Phasor},
  readonly model: Quadripole,
  readonly level: number,
};

export type XFormer = {
  readonly kind: Kind.xformer,
  readonly next: Element,
  readonly value: number,
  readonly model: Quadripole,
  readonly level: number,
};

export type Series = {
  readonly kind: Kind.series,
  readonly next: Element,
  readonly value: undefined,
  readonly model: Quadripole,
  readonly level: number,
};

export type Shunt = {
  readonly kind: Kind.shunt,
  readonly next: Element,
  readonly value: Series,
  readonly model: Quadripole,
  readonly level: number,
};

type StaticElements = {
  [Kind.ground]: Ground;
  [Kind.series]: Series;
};

export type StaticKind = keyof StaticElements;
export type Static = StaticElements[StaticKind];

type ParametricElements = {
  [Kind.impedance]: Impedance;
  [Kind.admittance]: Admittance;
  [Kind.line]: Line;
  [Kind.xformer]: XFormer;
  [Kind.vsrc]: VSrc;
  [Kind.isrc]: ISrc;
};

export type ParametricKind = keyof ParametricElements;
export type Parametric = ParametricElements[ParametricKind];

type RemovableElements = ParametricElements & {
  [Kind.shunt]: Shunt;
};

export type RemovableKind = keyof RemovableElements;
export type Removable = RemovableElements[RemovableKind];

type ActivableElements = RemovableElements & {
  [Kind.connector]: Connector;
};

export type ActivableKind = keyof ActivableElements;
export type Activable = ActivableElements[ActivableKind];

type Elements = StaticElements & ParametricElements & RemovableElements & ActivableElements;

export type Element = Elements[keyof Elements];

const collapse = (element: Element): Quadripole => element.kind !== Kind.connector
  ? connect(element.model, collapse(element.next))
  : element.model
;

export const connector = (): Connector => ({
  kind: Kind.connector,
  next: undefined,
  value: undefined,
  model: quadripole(),
  level: 0,
});

const terminal = connector();

export const ground = (next: Ground['next'] = terminal): Ground => ({
  kind: Kind.ground,
  next,
  value: undefined,
  model: quadripole(),
  level: next.level,
});

export const vsrc = (next: VSrc['next'] = terminal, value = _0): VSrc => ({
  kind: Kind.vsrc,
  next,
  value,
  model: quadripole(eye, [value, _0]),
  level: next.level,
});

export const isrc = (next: ISrc['next'] = terminal, value = _0): ISrc => ({
  kind: Kind.isrc,
  next,
  value,
  model: quadripole(eye, [_0, value]),
  level: next.level,
});

export const impedance = (next: Impedance['next'] = terminal, value = _0): Impedance => ({
  kind: Kind.impedance,
  next,
  value,
  model: quadripole([[_1, neg(value)], [_0, _1]]),
  level: next.level,
});

export const admittance = (next: Admittance['next'] = terminal, value = rect(Infinity)): Admittance => ({
  kind: Kind.admittance,
  next,
  value,
  model: quadripole([[_1, _0], [div(rect(-1), value), _1]]),
  level: next.level,
});

export const line = (next: Line['next'] = terminal, {y, z} = {y: _0, z: _1}): Line => ({
  kind: Kind.line,
  next,
  value: {y, z},
  model: quadripole([[cosh(y), mul(neg(z), sinh(y))], [div(sinh(y), neg(z)), cosh(y)]]),
  level: next.level,
});

export const xformer = (next: XFormer['next'] = terminal, value = 1): XFormer => ({
  kind: Kind.xformer,
  next,
  value,
  model: quadripole([[rect(1 / value), _0], [_0, rect(value)]]),
  level: next.level,
});

export const series = (next: Series['next'] = ground()): Series => ({
  kind: Kind.series,
  next,
  value: undefined,
  model: collapse(next),
  level: next.level,
});

export const shunt = (next: Shunt['next'] = terminal, value = series(connector())): Shunt => ({
  kind: Kind.shunt,
  next,
  value,
  model: quadripole(
    [[_1, _0], [div(rotation(value.model)[1][0], rotation(value.model)[1][1]), _1]],
    [_0, div(translation(value.model)[1], rotation(value.model)[1][1])],
  ),
  level: next.level + value.level + 1,
});

type PartialElements = {
  [K in keyof Elements]: {
    readonly kind: Elements[K]['kind'],
    readonly next?: Elements[K]['next'],
    readonly value?: Elements[K]['value'],

    [k: string]: any,
  }
};

type PartialElement = PartialElements[keyof PartialElements];

const promote = <K extends Kind>(partial: PartialElement): Elements[K] => {
  switch (partial.kind) {
    case Kind.connector:
      return connector();
    case Kind.ground:
      return ground(partial.next);
    case Kind.vsrc:
      return vsrc(partial.next, partial.value);
    case Kind.isrc:
      return isrc(partial.next, partial.value);
    case Kind.impedance:
      return impedance(partial.next, partial.value);
    case Kind.admittance:
      return admittance(partial.next, partial.value);
    case Kind.line:
      return line(partial.next, partial.value);
    case Kind.xformer:
      return xformer(partial.next, partial.value);
    case Kind.series:
      return series(partial.next);
    case Kind.shunt:
      return shunt(partial.next, partial.value);
  }
};

export const make = <K extends Kind>(kind: K): Elements[K] =>
  promote<K>({kind} as PartialElement[K]) // tslint:disable-line:no-object-literal-type-assertion
;

export const split = (element: Element) => {
  if (element.kind === Kind.connector) {
    throw new Error(`unexpected '${Kind.connector}'`);
  }

  return element.next;
};

export const join = (element: Element, next: Element) => {
  if (element.kind === Kind.connector) {
    throw new Error(`unexpected '${Kind.connector}'`);
  }

  return promote<typeof element.kind>({...element, next});
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

  return promote<typeof element.kind>({...element, value});
};

export const update = (element: Element, value: Parametric['value']): Parametric => {
  if (typeof value === 'number' && element.kind === Kind.xformer) {
    return promote<typeof element.kind>({...element, value});
  } else if (isPhasor(value) && (
    element.kind === Kind.vsrc ||
    element.kind === Kind.isrc ||
    element.kind === Kind.impedance ||
    element.kind === Kind.admittance
  )) {
    return promote<typeof element.kind>({...element, value});
  } else if (typeof value !== 'number' && !isPhasor(value) && element.kind === Kind.line) {
    return promote<typeof element.kind>({...element, value});
  } else {
    throw new Error(`cannot update element of kind '${element.kind}' with value '${value}'`);
  }
};
