import {cosh, div, mul, neg, Phasor, rect, sinh} from 'lib/phasor';
import {connect, eye, Quadripole, quadripole, rotation, translation} from 'lib/quadripole';
import {Unit} from 'lib/unit';

export enum Kind {
  connector,
  ground,
  knee,
  vsrc,
  isrc,
  impedance,
  admittance,
  line,
  xformer,
  series,
  shunt,
}

type Connector = {
  readonly kind: Kind.connector,
  readonly next?: undefined,
  readonly value?: undefined,
  readonly model: Quadripole,
  readonly height: 0,
};

type Ground = {
  readonly kind: Kind.ground,
  readonly next: Element,
  readonly value?: undefined,
  readonly model: Quadripole,
  readonly height: number,
};

type Knee = {
  readonly kind: Kind.knee,
  readonly next: Element,
  readonly value?: undefined,
  readonly model: Quadripole,
  readonly height: number,
};

type Static = Connector | Ground | Knee;

type VSrc = {
  readonly kind: Kind.vsrc,
  readonly next: Element,
  readonly unit: Unit.volt,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly height: number,
};

type ISrc = {
  readonly kind: Kind.isrc,
  readonly next: Element,
  readonly unit: Unit.ampere,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly height: number,
};

type Passive = {
  readonly kind:
    | Kind.impedance
    | Kind.admittance
  ,
  readonly next: Element,
  readonly unit: Unit.ohm,
  readonly value: Phasor,
  readonly model: Quadripole,
  readonly height: number,
};

type Active = VSrc | ISrc;

type Lumped = Passive | Active;

type Line = {
  readonly kind: Kind.line,
  readonly next: Element,
  readonly unit: {y: Unit.constant, z: Unit.ohm},
  readonly value: {y: Phasor, z: Phasor},
  readonly model: Quadripole,
  readonly height: number,
};

type XFormer = {
  readonly kind: Kind.xformer,
  readonly next: Element,
  readonly unit: Unit.ratio,
  readonly value: number,
  readonly model: Quadripole,
  readonly height: number,
};

type Series = {
  readonly kind: Kind.series,
  readonly next: Ground | Knee,
  readonly value?: undefined,
  readonly model: Quadripole,
  readonly height: number,
};

type Shunt = {
  readonly kind: Kind.shunt,
  readonly next: Series,
  readonly value: Series,
  readonly model: Quadripole,
  readonly height: number,
};

export type Element = Static | Lumped | Line | XFormer | Series | Shunt;

type Params<T extends Element> = {
  readonly next?: T['next'],
  readonly value?: T['value'],
};

const collapse = (element: Element): Quadripole => element.kind !== Kind.connector
  ? connect(element.model, collapse(element.next))
  : element.model
;

export const connector = ({}: Params<Connector> = {}): Connector => ({
  kind: Kind.connector,
  model: quadripole(),
  height: 0,
});

export const ground = ({next = connector()}: Params<Ground> = {}): Ground => ({
  kind: Kind.ground,
  next,
  model: quadripole(),
  height: next.height,
});

export const knee = ({next = connector()}: Params<Knee> = {}): Knee => ({
  kind: Kind.knee,
  next,
  model: quadripole(),
  height: next.height,
});

export const vsrc = ({next = connector(), value = rect(0)}: Params<VSrc> = {}): VSrc => ({
  kind: Kind.vsrc,
  next,
  unit: Unit.volt,
  value,
  model: quadripole(eye, [value, rect(0)]),
  height: next.height,
});

export const isrc = ({next = connector(), value = rect(0)}: Params<ISrc> = {}): ISrc => ({
  kind: Kind.isrc,
  next,
  unit: Unit.ampere,
  value,
  model: quadripole(eye, [rect(0), value]),
  height: next.height,
});

export const impedance = ({next = connector(), value = rect(0)}: Params<Passive> = {}): Passive => ({
  kind: Kind.impedance,
  next,
  unit: Unit.ohm,
  value,
  model: quadripole([[rect(1), neg(value)], [rect(0), rect(1)]]),
  height: next.height,
});

export const admittance = ({next = connector(), value = rect(Infinity)}: Params<Passive> = {}): Passive => ({
  kind: Kind.admittance,
  next,
  unit: Unit.ohm,
  value,
  model: quadripole([[rect(1), rect(0)], [div(rect(-1), value), rect(1)]]),
  height: next.height,
});

export const line = ({next = connector(), value: {y, z} = {y: rect(0), z: rect(1)}}: Params<Line> = {}): Line => ({
  kind: Kind.line,
  next,
  unit: {y: Unit.constant, z: Unit.ohm},
  value: {y, z},
  model: quadripole([[cosh(y), mul(neg(z), sinh(y))], [div(sinh(y), neg(z)), cosh(y)]]),
  height: next.height,
});

export const xformer = ({next = connector(), value = 1}: Params<XFormer> = {}): XFormer => ({
  kind: Kind.xformer,
  next,
  unit: Unit.ratio,
  value,
  model: quadripole([[rect(1 / value), rect(0)], [rect(0), rect(value)]]),
  height: next.height,
});

export const series = ({next = ground()}: Params<Series> = {}): Series => ({
  kind: Kind.series,
  next,
  model: collapse(next),
  height: next.height,
});

export const shunt = ({next = series(), value = series({next: knee()})}: Params<Shunt> = {}): Shunt => ({
  kind: Kind.shunt,
  next,
  value,
  model: collapse(
    isrc({
      value: div(translation(value.model)[1], rotation(value.model)[1][1]),
      next: admittance({value: div(neg(rotation(value.model)[1][0]), rotation(value.model)[1][1])}),
    }),
  ),
  height: next.height + value.height + 1,
});

const Factory: {[kind: number]: (e?: Params<Element>) => Element} = {
  [Kind.connector]: (e) => connector(e as Params<Connector>),
  [Kind.ground]: (e) => ground(e as Params<Ground>),
  [Kind.knee]: (e) => knee(e as Params<Knee>),
  [Kind.vsrc]: (e) => vsrc(e as Params<VSrc>),
  [Kind.isrc]: (e) => isrc(e as Params<ISrc>),
  [Kind.impedance]: (e) => impedance(e as Params<Passive>),
  [Kind.admittance]: (e) => admittance(e as Params<Passive>),
  [Kind.line]: (e) => line(e as Params<Line>),
  [Kind.xformer]: (e) => xformer(e as Params<XFormer>),
  [Kind.series]: (e) => series(e as Params<Series>),
  [Kind.shunt]: (e) => shunt(e as Params<Shunt>),
};

export const create = ({kind, ...params}: Params<Element> & {kind: Kind}): Element =>
  Factory[kind]({...params});
