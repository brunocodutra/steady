export const enum Actions {
  ACTIVATE,
}

type Activate = {
  readonly type: Actions.ACTIVATE,
  readonly id: number[],
};

export const activate = (id: number[]): Activate => ({
  type: Actions.ACTIVATE,
  id,
});

export type Action = Activate;
