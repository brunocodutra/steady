export const enum Models {
  SERIES,
};

export type Series = {
  readonly kind: Models.SERIES,
  readonly components: Model[],
};

export type Model = Series;

