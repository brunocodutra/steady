export enum Models {
  ground,
  vsrc,
  isrc,
  impedance,
  admittance,
  xformer,
  xline,
  series,
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

type Series = {
  readonly kind: Models.series,
  readonly components: Model[],
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
  | Series
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

  [Models.series]: (...components: Model[]): Series => ({
    kind: Models.series,
    components: [...components, ModelFactory[Models.placeholder]()],
  }),

  [Models.placeholder]: (): Placeholder => ({
    kind: Models.placeholder,
  }),
};
