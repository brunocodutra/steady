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
};

type Series = {
  readonly kind: Models.series,
  readonly components: Model[],
};

type Shunt = {
  readonly kind: Models.shunt,
  readonly components: Model[],
  readonly indentation: number,
};

export type Model = Element | Series | Shunt;

export const ModelFactory: {[kind: number]: (...args: any[]) => Model} = {
  [Models.vsrc]: (): Element => ({
    kind: Models.vsrc,
  }),

  [Models.isrc]: (): Element => ({
    kind: Models.isrc,
  }),

  [Models.impedance]: (): Element => ({
    kind: Models.impedance,
  }),

  [Models.admittance]: (): Element => ({
    kind: Models.admittance,
  }),

  [Models.xformer]: (): Element => ({
    kind: Models.xformer,
  }),

  [Models.xline]: (): Element => ({
    kind: Models.xline,
  }),

  [Models.ground]: (): Element => ({
    kind: Models.ground,
  }),

  [Models.knee]: (): Element => ({
    kind: Models.knee,
  }),

  [Models.connector]: (): Element => ({
    kind: Models.connector,
  }),

  [Models.series]: (): Series => ({
    kind: Models.series,
    components: [ModelFactory[Models.ground](), ModelFactory[Models.connector]()],
  }),

  [Models.shunt]: (): Shunt => ({
    kind: Models.shunt,
    components: [ModelFactory[Models.knee](), ModelFactory[Models.connector]()],
    indentation: 0,
  }),
};
