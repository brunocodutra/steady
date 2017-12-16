import {cosh, div, mul, neg, Phasor, rect, sinh} from 'lib/phasor';
import {connect, eye, Quadripole, quadripole} from 'lib/quadripole';
import {Unit} from 'lib/unit';

export enum Kind {
  vsrc,
  isrc,
  impedance,
  admittance,
  xline,
  xformer,
  ground,
  knee,
  connector,
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

type Active = VSrc | ISrc;

type Lumped = Passive | Active;

type Distributed = {
  readonly kind: Kind.xline,
  readonly next: Element,
  readonly unit: [Unit.ohm, Unit.constant],
  readonly value: [Phasor, Phasor],
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

export type Element = Static | Lumped | Distributed | XFormer | Series | Shunt;

const collapse = (element: Element): Quadripole => element.kind !== Kind.connector
  ? connect(element.model, collapse(element.next))
  : element.model
;

export const Factory: {[kind: number]: (...args: any[]) => Element} = {
  [Kind.connector]: (): Connector => ({
    kind: Kind.connector,
    model: quadripole(),
    height: 0,
  }),

  [Kind.ground]: ({next = Factory[Kind.connector]({})}): Ground => ({
    kind: Kind.ground,
    next,
    model: quadripole(),
    height: next.height,
  }),

  [Kind.knee]: ({next = Factory[Kind.connector]({})}): Knee => ({
    kind: Kind.knee,
    next,
    model: quadripole(),
    height: next.height,
  }),

  [Kind.vsrc]: ({next = Factory[Kind.connector]({}), value = rect(0)}): VSrc => ({
    kind: Kind.vsrc,
    next,
    unit: Unit.volt,
    value,
    model: quadripole(eye, [value, rect(0)]),
    height: next.height,
  }),

  [Kind.isrc]: ({next = Factory[Kind.connector]({}), value = rect(0)}): ISrc => ({
    kind: Kind.isrc,
    next,
    unit: Unit.ampere,
    value,
    model: quadripole(eye, [rect(0), value]),
    height: next.height,
  }),

  [Kind.impedance]: ({next = Factory[Kind.connector]({}), value = rect(0)}): Passive => ({
    kind: Kind.impedance,
    next,
    unit: Unit.ohm,
    value,
    model: quadripole([[rect(1), neg(value)], [rect(0), rect(1)]]),
    height: next.height,
  }),

  [Kind.admittance]: ({next = Factory[Kind.connector]({}), value = rect(Infinity)}): Passive => ({
    kind: Kind.admittance,
    next,
    unit: Unit.ohm,
    value,
    model: quadripole([[rect(1), rect(0)], [div(rect(-1), value), rect(1)]]),
    height: next.height,
  }),

  [Kind.xline]: ({next = Factory[Kind.connector]({}), value: [z, y] = [rect(1), rect(0)]}): Distributed => ({
    kind: Kind.xline,
    next,
    unit: [Unit.ohm, Unit.constant],
    value: [z, y],
    model: quadripole([[cosh(y), mul(neg(z), sinh(y))], [div(sinh(y), neg(z)), cosh(y)]]),
    height: next.height,
  }),

  [Kind.xformer]: ({next = Factory[Kind.connector]({}), value = 1}): XFormer => ({
    kind: Kind.xformer,
    next,
    unit: Unit.ratio,
    value,
    model: quadripole([[rect(1 / value), rect(0)], [rect(0), rect(value)]]),
    height: next.height,
  }),

  [Kind.series]: ({next = Factory[Kind.ground]({})}): Series => ({
    kind: Kind.series,
    next,
    model: collapse(next),
    height: next.height,
  }),

  [Kind.shunt]: ({
    next = Factory[Kind.series]({}),
    value = Factory[Kind.series]({next: Factory[Kind.knee]({})})},
  ): Shunt => ({
    kind: Kind.shunt,
    next,
    value,
    model: collapse(
      Factory[Kind.isrc]({
        value: div(value.model.vi[1], value.model.abcd[1][1]),
        next: Factory[Kind.admittance]({value: div(neg(value.model.abcd[1][0]), value.model.abcd[1][1])}),
      }),
    ),
    height: next.height + value.height + 1,
  }),
};
