import {Element} from 'lib/element';

export const enum Actions {
  toggle,
  activate,
  insert,
}

type Toggle = {
  readonly type: Actions.toggle,
};

type Activate = {
  readonly type: Actions.activate,
  readonly id: number[],
};

type Insert = {
  readonly type: Actions.insert,
  readonly element: Element,
};

export type Action = Toggle | Activate | Insert;

export const ActionFactory: {[type: number]: (...args: any[]) => Action} = {
  [Actions.toggle]: (): Toggle => ({
    type: Actions.toggle,
  }),

  [Actions.activate]: (id: number[]): Activate => ({
    type: Actions.activate,
    id,
  }),

  [Actions.insert]: (element: Element): Insert => ({
    type: Actions.insert,
    element,
  }),
};
