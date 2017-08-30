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

type Ground = {
  readonly kind: Models.ground,
};

type Vsrc = {
  readonly kind: Models.vsrc,
};

type Isrc = {
  readonly kind: Models.isrc,
};

type Impedance = {
  readonly kind: Models.impedance,
};

type Admittance = {
  readonly kind: Models.admittance,
};

type Xformer = {
  readonly kind: Models.xformer,
};

type Xline = {
  readonly kind: Models.xline,
};

type Circuit = {
  readonly kind: Models.series | Models.shunt,
  readonly components: Model[],
  readonly indentation: number,
};

type Placeholder = {
  readonly kind: Models.placeholder,
};

export type Model =
    Ground
  | Vsrc
  | Isrc
  | Impedance
  | Admittance
  | Xformer
  | Xline
  | Circuit
  | Placeholder
;

export const ModelFactory: {[kind: number]: (...args: any[]) => Model} = {
  [Models.ground]: (): Ground => ({
    kind: Models.ground,
  }),

  [Models.vsrc]: (): Vsrc => ({
    kind: Models.vsrc,
  }),

  [Models.isrc]: (): Isrc => ({
    kind: Models.isrc,
  }),

  [Models.impedance]: (): Impedance => ({
    kind: Models.impedance,
  }),

  [Models.admittance]: (): Admittance => ({
    kind: Models.admittance,
  }),

  [Models.xformer]: (): Xformer => ({
    kind: Models.xformer,
  }),

  [Models.xline]: (): Xline => ({
    kind: Models.xline,
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

  [Models.placeholder]: (): Placeholder => ({
    kind: Models.placeholder,
  }),
};
