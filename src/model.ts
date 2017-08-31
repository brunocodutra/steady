export enum Models {
  vsrc,
  isrc,
  impedance,
  admittance,
  xformer,
  xline,
  ground,
  connector,
  series,
  shunt,
}

type Element = {
  readonly kind:
      Models.vsrc
    | Models.isrc
    | Models.impedance
    | Models.admittance
    | Models.xformer
    | Models.xline
  ,
};

type Placeholder = {
  readonly kind: Models.ground | Models.connector,
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

export type Model = Element | Placeholder | Series | Shunt;

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

  [Models.ground]: (): Placeholder => ({
    kind: Models.ground,
  }),

  [Models.connector]: (): Placeholder => ({
    kind: Models.connector,
  }),

  [Models.series]: (...components: Model[]): Series => ({
    kind: Models.series,
    components: [...components, ModelFactory[Models.connector]()],
  }),

  [Models.shunt]: (...components: Model[]): Shunt => ({
    kind: Models.shunt,
    components: [...components, ModelFactory[Models.connector]()],
    indentation: 0,
  }),
};
