export enum Models {
  ground,
  vsrc,
  isrc,
  impedance,
  admittance,
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

  [Models.series]: (...components: Model[]): Series => ({
    kind: Models.series,
    components: [...components, ModelFactory[Models.placeholder]()],
  }),

  [Models.placeholder]: (): Placeholder => ({
    kind: Models.placeholder,
  }),
};
