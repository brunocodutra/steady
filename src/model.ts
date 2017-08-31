export enum Models {
  ground,
  vsrc,
  isrc,
  impedance,
  admittance,
  xformer,
  xline,
  series,
  shunt,
  placeholder,
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
  readonly kind: Models.ground | Models.placeholder,
};

type Circuit = {
  readonly kind: Models.series | Models.shunt,
  readonly components: Model[],
  readonly indentation: number,
};

export type Model = Element | Placeholder | Circuit;

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

  [Models.placeholder]: (): Placeholder => ({
    kind: Models.placeholder,
  }),

  [Models.series]: (...components: Model[]): Circuit => ({
    kind: Models.series,
    components: [...components, ModelFactory[Models.placeholder]()],
    indentation: 0,
  }),

  [Models.shunt]: (...components: Model[]): Circuit => ({
    kind: Models.shunt,
    components: [...components, ModelFactory[Models.placeholder]()],
    indentation: 0,
  }),
};
