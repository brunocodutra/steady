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

type Static = {
  readonly kind:
      Kind.ground
    | Kind.knee
    | Kind.connector
  ,
  readonly model: Quadripole,
};

type Passive = {
  readonly kind:
    | Kind.impedance
    | Kind.admittance
  ,
  readonly unit: Unit.ohm,
  readonly value: Phasor,
  readonly model: Quadripole,
};

type VSrc = {
  readonly kind: Kind.vsrc,
  readonly unit: Unit.volt,
  readonly value: Phasor,
  readonly model: Quadripole,
};

type ISrc = {
  readonly kind: Kind.isrc,
  readonly unit: Unit.ampere,
  readonly value: Phasor,
  readonly model: Quadripole,
};

type Active = VSrc | ISrc;

type Lumped = Passive | Active;

type Distributed = {
  readonly kind: Kind.xline,
  readonly unit: [Unit.ohm, Unit.constant],
  readonly value: [Phasor, Phasor],
  readonly model: Quadripole,
};

type XFormer = {
  readonly kind: Kind.xformer,
  readonly unit: Unit.ratio,
  readonly value: number,
  readonly model: Quadripole,
};

type Series = {
  readonly kind: Kind.series,
  readonly elements: Element[],
  readonly model: Quadripole,
};

type Shunt = {
  readonly kind: Kind.shunt,
  readonly branch: Element,
  readonly model: Quadripole,
};

export type Element = Static | Lumped | Distributed | XFormer | Series | Shunt;

export const Factory: {[kind: number]: (...args: any[]) => Element} = {
  [Kind.ground]: (): Static => ({
    kind: Kind.ground,
    model: quadripole(),
  }),

  [Kind.knee]: (): Static => ({
    kind: Kind.knee,
    model: quadripole(),
  }),

  [Kind.connector]: (): Static => ({
    kind: Kind.connector,
    model: quadripole(),
  }),

  [Kind.vsrc]: (value = rect(0)): VSrc => ({
    kind: Kind.vsrc,
    unit: Unit.volt,
    value,
    model: quadripole(eye, [value, rect(0)]),
  }),

  [Kind.isrc]: (value = rect(0)): ISrc => ({
    kind: Kind.isrc,
    unit: Unit.ampere,
    value,
    model: quadripole(eye, [rect(0), value]),
  }),

  [Kind.impedance]: (value = rect(0)): Passive => ({
    kind: Kind.impedance,
    unit: Unit.ohm,
    value,
    model: quadripole([[rect(1), neg(value)], [rect(0), rect(1)]]),
  }),

  [Kind.admittance]: (value = rect(Infinity)): Passive => ({
    kind: Kind.admittance,
    unit: Unit.ohm,
    value,
    model: quadripole([[rect(1), rect(0)], [div(rect(-1), value), rect(1)]]),
  }),

  [Kind.xline]: (z = rect(1), y = rect(0)): Distributed => ({
    kind: Kind.xline,
    unit: [Unit.ohm, Unit.constant],
    value: [z, y],
    model: quadripole([[cosh(y), mul(neg(z), sinh(y))], [div(sinh(y), neg(z)), cosh(y)]]),
  }),

  [Kind.xformer]: (value = 1): XFormer => ({
    kind: Kind.xformer,
    unit: Unit.ratio,
    value,
    model: quadripole([[rect(1 / value), rect(0)], [rect(0), rect(value)]]),
  }),

  [Kind.series]: (elements = [Factory[Kind.ground](), Factory[Kind.connector]()]): Series => ({
    kind: Kind.series,
    elements,
    model: elements.reduce((q: Quadripole, {model}: Element) => connect(q, model), quadripole()),
  }),

  [Kind.shunt]: (branch = Factory[Kind.series]([Factory[Kind.knee](), Factory[Kind.connector]()])): Shunt => ({
    kind: Kind.shunt,
    branch,
    model: connect(
      Factory[Kind.isrc](div(branch.model.vi[1], branch.model.abcd[1][1])).model,
      Factory[Kind.admittance](div(neg(branch.model.abcd[1][0]), branch.model.abcd[1][1])).model,
    ),
  }),
};

type ExpandedSeries = Series & {
  readonly elements: ExpandedElement[],
};

type ExpandedShunt = Shunt & {
  readonly branch: ExpandedElement,
};

export type ExpandedElement = (Static | Lumped | Distributed | XFormer | ExpandedSeries | ExpandedShunt) & {
  readonly height: number,
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
      };
    }

    case Kind.shunt: {
      const branch = expand(element.branch);

      return {
        ...element,
        branch,
        height: 1 + branch.height,
      };
    }

    default:
      return {
        ...element,
        height: 0,
      };
  }
};
