export enum Models {
  ground,
  vsrc,
  series,
  placeholder,
}

type Ground = {
  readonly kind: Models.ground,
};

export const ground = (): Ground => ({
  kind: Models.ground,
});

type Vsrc = {
  readonly kind: Models.vsrc,
};

export const vsrc = (): Vsrc => ({
  kind: Models.vsrc,
});

type Series = {
  readonly kind: Models.series,
  readonly components: Model[],
};

export const series = (...components: Model[]): Series => ({
  kind: Models.series,
  components: [...components, placeholder()],
});

type Placeholder = {
  readonly kind: Models.placeholder,
};

export const placeholder = (): Placeholder => ({
  kind: Models.placeholder,
});

export type Model = Ground | Vsrc | Series | Placeholder;
