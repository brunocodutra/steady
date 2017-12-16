import {Element} from 'lib/element';

export const enum Type {
  toggle,
  activate,
  insert,
}

type Toggle = {
  readonly type: Type.toggle,
};

type Activate = {
  readonly type: Type.activate,
  readonly id: number[],
};

type Insert = {
  readonly type: Type.insert,
  readonly element: Element,
};

export type Action = Toggle | Activate | Insert;

export const Factory: {[type: number]: (...args: any[]) => Action} = {
  [Type.toggle]: (): Toggle => ({
    type: Type.toggle,
  }),

  [Type.activate]: (id: number[]): Activate => ({
    type: Type.activate,
    id,
  }),

  [Type.insert]: (element: Element): Insert => ({
    type: Type.insert,
    element,
  }),
};
