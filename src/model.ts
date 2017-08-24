export const enum Models {
  GROUND,
  PLACEHOLDER,
  SERIES,
}

type Ground = {
  readonly kind: Models.GROUND,
};

export const ground = (): Ground => ({
  kind: Models.GROUND,
});

type Placeholder = {
  readonly kind: Models.PLACEHOLDER,
};

export const placeholder = (): Placeholder => ({
  kind: Models.PLACEHOLDER,
});

type Series = {
  readonly kind: Models.SERIES,
  readonly components: Model[],
};

export const series = (...components: Model[]): Series => ({
  kind: Models.SERIES,
  components: [...components, placeholder()],
});

export type Model = Ground | Placeholder | Series;
