import {cosh, div, mul, neg, Phasor, rect, sinh} from 'lib/phasor';
import {cat, eye, Quadripole, quadripole} from 'lib/quadripole';
import {Unit} from 'lib/unit';

export enum Elements {
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
  [Elements.vsrc]: Unit.volt,
  [Elements.isrc]: Unit.ampere,
  [Elements.impedance]: Unit.ohm,
  [Elements.admittance]: Unit.ohm,
  [Elements.xline]: Unit.ohm,
  [Elements.xformer]: Unit.ratio,
};

type Static = {
  readonly kind:
      Elements.ground
    | Elements.knee
    | Elements.connector
  ,
  readonly value?: undefined,
};

type Lumped = {
  readonly kind:
      Elements.vsrc
    | Elements.isrc
    | Elements.impedance
    | Elements.admittance
  ,
  readonly value: Phasor,
};

type Distributed = {
  readonly kind: Elements.xline,
  readonly value: [Phasor, Phasor],
};

type XFormer = {
  readonly kind: Elements.xformer,
  readonly value: number,
};

type Series = {
  readonly kind: Elements.series,
  readonly elements: Element[],
};

type Shunt = {
  readonly kind: Elements.shunt,
  readonly branch: Element,
};

export type Element = Static | Lumped | Distributed | XFormer | Series | Shunt;

export const ElementFactory: {[kind: number]: (...args: any[]) => Element} = {
  [Elements.ground]: (): Static => ({
    kind: Elements.ground,
  }),

  [Elements.knee]: (): Static => ({
    kind: Elements.knee,
  }),

  [Elements.connector]: (): Static => ({
    kind: Elements.connector,
  }),

  [Elements.vsrc]: (value = rect(0)): Lumped => ({
    kind: Elements.vsrc,
    value,
  }),

  [Elements.isrc]: (value = rect(0)): Lumped => ({
    kind: Elements.isrc,
    value,
  }),

  [Elements.impedance]: (value = rect(0)): Lumped => ({
    kind: Elements.impedance,
    value,
  }),

  [Elements.admittance]: (value = rect(Infinity)): Lumped => ({
    kind: Elements.admittance,
    value,
  }),

  [Elements.xline]: (z = rect(1), y = rect(0)): Distributed => ({
    kind: Elements.xline,
    value: [z, y],
  }),

  [Elements.xformer]: (value = 1): XFormer => ({
    kind: Elements.xformer,
    value,
  }),

  [Elements.series]: (head = ElementFactory[Elements.ground]()): Series => ({
    kind: Elements.series,
    elements: [head, ElementFactory[Elements.connector]()],
  }),

  [Elements.shunt]: (): Shunt => ({
    kind: Elements.shunt,
    branch: ElementFactory[Elements.series](ElementFactory[Elements.knee]()),
  }),
};

const ModelFactory: {[kind: number]: (...args: any[]) => Quadripole} = {
  [Elements.ground]: (): Quadripole => quadripole(),
  [Elements.knee]: (): Quadripole => quadripole(),
  [Elements.connector]: (): Quadripole => quadripole(),
  [Elements.vsrc]: (value: Phasor): Quadripole => quadripole(eye, [value, rect(0)]),
  [Elements.isrc]: (value: Phasor): Quadripole => quadripole(eye, [rect(0), value]),
  [Elements.impedance]: (value: Phasor): Quadripole => quadripole([[rect(1), neg(value)], [rect(0), rect(1)]]),

  [Elements.admittance]: (value: Phasor): Quadripole => quadripole([
    [rect(1), rect(0)],
    [div(rect(1), neg(value)), rect(1)],
  ]),

  [Elements.xline]: ([z, y]: [Phasor, Phasor]): Quadripole => quadripole([
    [cosh(y), neg(mul(z, sinh(y)))],
    [neg(div(sinh(y), z)), cosh(y)],
  ]),

  [Elements.xformer]: (value: number): Quadripole => quadripole([[rect(1 / value), rect(0)], [rect(0), rect(value)]]),
  [Elements.series]: (models: Quadripole[]): Quadripole => models.reduce(cat, quadripole()),

  [Elements.shunt]: ({vi, abcd}: Quadripole): Quadripole => cat(
    ModelFactory[Elements.isrc](div(vi[1], abcd[1][1])),
    ModelFactory[Elements.admittance](neg(div(abcd[1][0], abcd[1][1]))),
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
    case Elements.series: {
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

    case Elements.shunt: {
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
