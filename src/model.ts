import {cosh, div, mul, neg, Phasor, rect, sinh} from 'phasor';
import {cat, eye, Quadripole, quadripole} from 'quadripole';

export enum Elements {
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
      Elements.ground
    | Elements.knee
    | Elements.connector
  ,

  model(): Quadripole,
};

type Lumped = {
  readonly kind:
      Elements.vsrc
    | Elements.isrc
    | Elements.impedance
    | Elements.admittance
    | Elements.xformer
  ,
  value: Phasor,
  model(): Quadripole,
};

type Distributed = {
  readonly kind: Elements.xline,
  value: [Phasor, Phasor],
  model(): Quadripole,
};

type Series = {
  readonly kind: Elements.series,
  readonly elements: Element[],
  model(): Quadripole,
};

type Shunt = {
  readonly kind: Elements.shunt,
  readonly indentation: number,
  readonly branch: Element,
  model(): Quadripole,
};

export type Element = Static | Lumped | Distributed | Series | Shunt;

export const ElementFactory: {[kind: number]: (...args: any[]) => Element} = {
  [Elements.ground]: (): Static => ({
    kind: Elements.ground,
    model() {
      return quadripole();
    },
  }),

  [Elements.knee]: (): Static => ({
    kind: Elements.knee,
    model() {
      return quadripole();
    },
  }),

  [Elements.connector]: (): Static => ({
    kind: Elements.connector,
    model() {
      return quadripole();
    },
  }),

  [Elements.vsrc]: (value = rect(0)): Lumped => ({
    kind: Elements.vsrc,
    value,
    model() {
      return quadripole(eye, [this.value, rect(0)]);
    },
  }),

  [Elements.isrc]: (value = rect(0)): Lumped => ({
    kind: Elements.isrc,
    value,
    model() {
      return quadripole(eye, [rect(0), this.value]);
    },
  }),

  [Elements.impedance]: (value = rect(0)): Lumped => ({
    kind: Elements.impedance,
    value,
    model() {
      return quadripole([[rect(1), neg(this.value)], [rect(0), rect(1)]]);
    },
  }),

  [Elements.admittance]: (value = rect(0)): Lumped => ({
    kind: Elements.admittance,
    value,
    model() {
      return quadripole([[rect(1), rect(0)], [neg(this.value), rect(1)]]);
    },
  }),

  [Elements.xformer]: (value = rect(1)): Lumped => ({
    kind: Elements.xformer,
    value,
    model() {
      return quadripole([[this.value, rect(0)], [rect(0), div(rect(1), this.value)]]);
    },
  }),

  [Elements.xline]: (z = rect(1), y = rect(0)): Distributed => ({
    kind: Elements.xline,
    value: [z, y],
    model() {
      const [zz, yy] = this.value;

      return quadripole([
        [cosh(yy), neg(mul(zz, sinh(yy)))],
        [neg(div(sinh(yy), zz)), cosh(yy)],
      ]);
    },
  }),

  [Elements.series]: (head = ElementFactory[Elements.ground]()): Series => ({
    kind: Elements.series,
    elements: [head, ElementFactory[Elements.connector]()],
    model() {
      return this.elements.map((e) => e.model()).reduce(cat, quadripole());
    },
  }),

  [Elements.shunt]: (): Shunt => ({
    kind: Elements.shunt,
    indentation: 0,
    branch: ElementFactory[Elements.series](ElementFactory[Elements.knee]()),
    model() {
      const {vi, abcd} = this.branch.model();

      return cat(
        ElementFactory[Elements.isrc](div(vi[1], abcd[1][1])).model(),
        ElementFactory[Elements.admittance](neg(div(abcd[1][0], abcd[1][1]))).model(),
      );
    },
  }),
};
