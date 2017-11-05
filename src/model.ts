import {cosh, div, mul, neg, Phasor, rect, sinh} from 'phasor';
import {cat, eye, Quadripole, quadripole} from 'quadripole';

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

type Static = {
  readonly kind:
      Models.ground
    | Models.knee
    | Models.connector
  ,

  params(): Quadripole,
};

type Lumped = {
  readonly kind:
      Models.vsrc
    | Models.isrc
    | Models.impedance
    | Models.admittance
    | Models.xformer
  ,
  value: Phasor,
  params(): Quadripole,
};

type Distributed = {
  readonly kind: Models.xline,
  value: [Phasor, Phasor],
  params(): Quadripole,
};

type Series = {
  readonly kind: Models.series,
  readonly components: Model[],
  params(): Quadripole,
};

type Shunt = {
  readonly kind: Models.shunt,
  readonly indentation: number,
  readonly branch: Model,
  params(): Quadripole,
};

export type Model = Static | Lumped | Distributed | Series | Shunt;

export const ModelFactory: {[kind: number]: (...args: any[]) => Model} = {
  [Models.ground]: (): Static => ({
    kind: Models.ground,
    params() {
      return quadripole();
    },
  }),

  [Models.knee]: (): Static => ({
    kind: Models.knee,
    params() {
      return quadripole();
    },
  }),

  [Models.connector]: (): Static => ({
    kind: Models.connector,
    params() {
      return quadripole();
    },
  }),

  [Models.vsrc]: (value = rect(0)): Lumped => ({
    kind: Models.vsrc,
    value,
    params() {
      return quadripole(eye, [this.value, rect(0)]);
    },
  }),

  [Models.isrc]: (value = rect(0)): Lumped => ({
    kind: Models.isrc,
    value,
    params() {
      return quadripole(eye, [rect(0), this.value]);
    },
  }),

  [Models.impedance]: (value = rect(0)): Lumped => ({
    kind: Models.impedance,
    value,
    params() {
      return quadripole([[rect(1), neg(this.value)], [rect(0), rect(1)]]);
    },
  }),

  [Models.admittance]: (value = rect(0)): Lumped => ({
    kind: Models.admittance,
    value,
    params() {
      return quadripole([[rect(1), rect(0)], [neg(this.value), rect(1)]]);
    },
  }),

  [Models.xformer]: (value = rect(1)): Lumped => ({
    kind: Models.xformer,
    value,
    params() {
      return quadripole([[this.value, rect(0)], [rect(0), div(rect(1), this.value)]]);
    },
  }),

  [Models.xline]: (z = rect(1), y = rect(0)): Distributed => ({
    kind: Models.xline,
    value: [z, y],
    params() {
      const [zz, yy] = this.value;

      return quadripole([
        [cosh(yy), neg(mul(zz, sinh(yy)))],
        [neg(div(sinh(yy), zz)), cosh(yy)],
      ]);
    },
  }),

  [Models.series]: (head = ModelFactory[Models.ground]()): Series => ({
    kind: Models.series,
    components: [head, ModelFactory[Models.connector]()],
    params() {
      return this.components.map((m) => m.params()).reduce(cat, quadripole());
    },
  }),

  [Models.shunt]: (): Shunt => ({
    kind: Models.shunt,
    indentation: 0,
    branch: ModelFactory[Models.series](ModelFactory[Models.knee]()),
    params() {
      const {vi, abcd} = this.branch.params();

      return cat(
        ModelFactory[Models.isrc](div(vi[1], abcd[1][1])).params(),
        ModelFactory[Models.admittance](neg(div(abcd[1][0], abcd[1][1]))).params(),
      );
    },
  }),
};
