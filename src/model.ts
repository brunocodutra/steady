export const enum Models {
  GROUND,
  PLACEHOLDER,
  SERIES,
};

export type Ground = {
  readonly kind: Models.GROUND,
};

export type Placeholder = {
  readonly kind: Models.PLACEHOLDER,
};

export type Series = {
  readonly kind: Models.SERIES,
  readonly components: Model[],
};

export type Model = Ground | Placeholder | Series;

