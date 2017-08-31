import {Model} from 'model';

export const enum Actions {
  activate,
  insert,
}

type Activate = {
  readonly type: Actions.activate,
  readonly id: number[],
};

type Insert = {
  readonly type: Actions.insert,
  readonly model: Model,
};

export type Action = Activate | Insert;

export const ActionFactory: {[type: number]: (...args: any[]) => Action} = {
  [Actions.activate]: (id: number[]): Activate => ({
    type: Actions.activate,
    id,
  }),

  [Actions.insert]: (model: Model): Insert => ({
    type: Actions.insert,
    model,
  }),
};
