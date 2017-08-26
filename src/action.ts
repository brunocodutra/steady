import {Model} from 'model';

export const enum Actions {
  ACTIVATE,
  INSERT,
}

type Activate = {
  readonly type: Actions.ACTIVATE,
  readonly id: number[],
};

export const activate = (id: number[]): Activate => ({
  type: Actions.ACTIVATE,
  id,
});

type Insert = {
  readonly type: Actions.INSERT,
  readonly model: Model,
};

export const insert = (model: Model): Insert => ({
  type: Actions.INSERT,
  model,
});

export type Action = Activate | Insert;
