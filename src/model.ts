export enum Models {
  ground,
  placeholder,
  series,
}

type Ground = {
  readonly kind: Models.ground,
};

export const ground = (): Ground => ({
  kind: Models.ground,
});

type Placeholder = {
  readonly kind: Models.placeholder,
};

export const placeholder = (): Placeholder => ({
  kind: Models.placeholder,
});

type Series = {
  readonly kind: Models.series,
  readonly components: Model[],
};

export const series = (...components: Model[]): Series => ({
  kind: Models.series,
  components: [...components, placeholder()],
});

export type Model = Ground | Placeholder | Series;
