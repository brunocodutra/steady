export const enum Models {
  GROUND,
  SERIES,
};

export type Ground = {
  readonly kind: Models.GROUND,
};

export type Series = {
  readonly kind: Models.SERIES,
  readonly components: Model[],
};

export type Model = Ground | Series;

