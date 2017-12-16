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

export const ElementUnit: {[kind: number]: Unit} = {
  [Kind.vsrc]: Unit.volt,
  [Kind.isrc]: Unit.ampere,
  [Kind.impedance]: Unit.ohm,
  [Kind.admittance]: Unit.ohm,
  [Kind.xline]: Unit.ohm,
  [Kind.xformer]: Unit.ratio,
};

type Static = {
  readonly kind:
      Kind.ground
    | Kind.knee
    | Kind.connector
  ,
  readonly value?: undefined,
};

type Lumped = {
  readonly kind:
      Kind.vsrc
    | Kind.isrc
    | Kind.impedance
    | Kind.admittance
  ,
  readonly value: Phasor,
};

type Distributed = {
  readonly kind: Kind.xline,
  readonly value: [Phasor, Phasor],
};

type XFormer = {
  readonly kind: Kind.xformer,
  readonly value: number,
};

type Series = {
  readonly kind: Kind.series,
  readonly elements: Element[],
};

type Shunt = {
  readonly kind: Kind.shunt,
  readonly branch: Element,
};

export type Element = Static | Lumped | Distributed | XFormer | Series | Shunt;

export const Factory: {[kind: number]: (...args: any[]) => Element} = {
  [Kind.ground]: (): Static => ({
    kind: Kind.ground,
  }),

  [Kind.knee]: (): Static => ({
    kind: Kind.knee,
  }),

  [Kind.connector]: (): Static => ({
    kind: Kind.connector,
  }),

  [Kind.vsrc]: (value = rect(0)): Lumped => ({
    kind: Kind.vsrc,
    value,
  }),

  [Kind.isrc]: (value = rect(0)): Lumped => ({
    kind: Kind.isrc,
    value,
  }),

  [Kind.impedance]: (value = rect(0)): Lumped => ({
    kind: Kind.impedance,
    value,
  }),

  [Kind.admittance]: (value = rect(Infinity)): Lumped => ({
    kind: Kind.admittance,
    value,
  }),

  [Kind.xline]: (z = rect(1), y = rect(0)): Distributed => ({
    kind: Kind.xline,
    value: [z, y],
  }),

  [Kind.xformer]: (value = 1): XFormer => ({
    kind: Kind.xformer,
    value,
  }),

  [Kind.series]: (head = Factory[Kind.ground]()): Series => ({
    kind: Kind.series,
    elements: [head, Factory[Kind.connector]()],
  }),

  [Kind.shunt]: (): Shunt => ({
    kind: Kind.shunt,
    branch: Factory[Kind.series](Factory[Kind.knee]()),
  }),
};

const ModelFactory: {[kind: number]: (...args: any[]) => Quadripole} = {
  [Kind.ground]: (): Quadripole => quadripole(),
  [Kind.knee]: (): Quadripole => quadripole(),
  [Kind.connector]: (): Quadripole => quadripole(),
  [Kind.vsrc]: (value: Phasor): Quadripole => quadripole(eye, [value, rect(0)]),
  [Kind.isrc]: (value: Phasor): Quadripole => quadripole(eye, [rect(0), value]),
  [Kind.impedance]: (value: Phasor): Quadripole => quadripole([[rect(1), neg(value)], [rect(0), rect(1)]]),

  [Kind.admittance]: (value: Phasor): Quadripole => quadripole([
    [rect(1), rect(0)],
    [div(rect(1), neg(value)), rect(1)],
  ]),

  [Kind.xline]: ([z, y]: [Phasor, Phasor]): Quadripole => quadripole([
    [cosh(y), neg(mul(z, sinh(y)))],
    [neg(div(sinh(y), z)), cosh(y)],
  ]),

  [Kind.xformer]: (value: number): Quadripole => quadripole([[rect(1 / value), rect(0)], [rect(0), rect(value)]]),
  [Kind.series]: (models: Quadripole[]): Quadripole => models.reduce(connect, quadripole()),

  [Kind.shunt]: ({vi, abcd}: Quadripole): Quadripole => connect(
    ModelFactory[Kind.isrc](div(vi[1], abcd[1][1])),
    ModelFactory[Kind.admittance](neg(div(abcd[1][0], abcd[1][1]))),
  ),
};

type ExpandedSeries = Series & {
  readonly elements: ExpandedElement[],
};

type ExpandedShunt = Shunt & {
  readonly branch: ExpandedElement,
};

export type ExpandedElement = (Static | Lumped | Distributed | XFormer | ExpandedSeries | ExpandedShunt) & {
  readonly height: number,
  readonly model: Quadripole,
};

export const expand = (element: Element): ExpandedElement => {
  switch (element.kind) {
    case Kind.series: {
      const elements = element.elements.map(expand);

      let height = 0;
      for (let i = elements.length; i > 0; --i) {
        elements[i - 1] = {
          ...elements[i - 1],
          height: elements[i - 1].height + height,
        };

        height = elements[i - 1].height;
      }

      return {
        ...element,
        elements,
        height,
        model: ModelFactory[element.kind](elements.map(({model}) => model)),
      };
    }

    case Kind.shunt: {
      const branch = expand(element.branch);

      return {
        ...element,
        branch,
        height: 1 + branch.height,
        model: ModelFactory[element.kind](branch.model),
      };
    }

    default:
      return {
        ...element,
        height: 0,
        model: ModelFactory[element.kind](element.value),
      };
  }
};
