export enum Models {
  ground,
  vsrc,
  isrc,
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

type Series = {
  readonly kind: Models.series,
  readonly components: Model[],
};

type Placeholder = {
  readonly kind: Models.placeholder,
};

export type Model = Ground | Vsrc | Isrc | Series | Placeholder;

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

  [Models.series]: (...components: Model[]): Series => ({
    kind: Models.series,
    components: [...components, ModelFactory[Models.placeholder]()],
  }),

  [Models.placeholder]: (): Placeholder => ({
    kind: Models.placeholder,
  }),
};
