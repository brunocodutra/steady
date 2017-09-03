import {cosh, div, mul, neg, rect, sinh} from 'phasor';
import {eye, Quadripole, quadripole} from 'quadripole';

export enum Models {
  vsrc,
  isrc,
  impedance,
  admittance,
  xformer,
  xline,
  ground,
  knee,
  connector,
  series,
  shunt,
}

type Element = {
  readonly kind:
      Models.ground
    | Models.vsrc
    | Models.isrc
    | Models.impedance
    | Models.admittance
    | Models.xformer
    | Models.xline
    | Models.knee
    | Models.connector
  ,

  readonly params: Quadripole,
};

type Series = {
  readonly kind: Models.series,
  readonly components: Model[],
  readonly params: Quadripole,
};

type Shunt = {
  readonly kind: Models.shunt,
  readonly indentation: number,
  readonly components: Model[],
  readonly params: Quadripole,
};

export type Model = Element | Series | Shunt;

export const ModelFactory: {[kind: number]: (...args: any[]) => Model} = {
  [Models.vsrc]: (v = rect(0)): Element => ({
    kind: Models.vsrc,
    params: quadripole(eye, [v, rect(0)]),
  }),

  [Models.isrc]: (i = rect(0)): Element => ({
    kind: Models.isrc,
    params: quadripole(eye, [rect(0), i]),
  }),

  [Models.impedance]: (z = rect(0)): Element => ({
    kind: Models.impedance,
    params: quadripole([[rect(1), neg(z)], [rect(0), rect(1)]]),
  }),

  [Models.admittance]: (y = rect(0)): Element => ({
    kind: Models.admittance,
    params: quadripole([[rect(1), rect(0)], [neg(y), rect(1)]]),
  }),

  [Models.xformer]: (n = 1): Element => ({
    kind: Models.xformer,
    params: quadripole([[rect(n), rect(0)], [rect(0), rect(1 / n)]]),
  }),

  [Models.xline]: (z = rect(1), y = rect(0)): Element => ({
    kind: Models.xline,
    params: quadripole([
      [cosh(y), neg(mul(z, sinh(y)))],
      [neg(div(sinh(y), z)), cosh(y)],
    ]),
  }),

  [Models.ground]: (): Element => ({
    kind: Models.ground,
    params: quadripole(),
  }),

  [Models.knee]: (): Element => ({
    kind: Models.knee,
    params: quadripole(),
  }),

  [Models.connector]: (): Element => ({
    kind: Models.connector,
    params: quadripole(),
  }),

  [Models.series]: (): Series => ({
    kind: Models.series,
    components: [ModelFactory[Models.ground](), ModelFactory[Models.connector]()],
    params: quadripole(),
  }),

  [Models.shunt]: (): Shunt => ({
    kind: Models.shunt,
    indentation: 0,
    components: [ModelFactory[Models.knee](), ModelFactory[Models.connector]()],
    params: quadripole(),
  }),
};
