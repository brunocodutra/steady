import * as Redux from 'redux';

import {Kind, Parametric} from 'lib/element';

export const enum Type {
  activate = 'activate',
  remove = 'remove',
  insert = 'insert',
  update = 'update',
}

type Activate = Redux.Action<Type.activate> & {
  readonly id: number[],
};

type Remove = Redux.Action<Type.remove> & {
  readonly id: number[],
};

type Insert = Redux.Action<Type.insert> & {
  readonly kind: Kind,
};

type Update = Redux.Action<Type.update> & {
  readonly id: number[],
  readonly value: Parametric['value'],
};

export type Action = Activate | Remove | Insert | Update;

export const activate = (id: number[]): Activate => ({
  type: Type.activate,
  id,
});

export const remove = (id: number[]): Remove => ({
  type: Type.remove,
  id,
});

export const insert = (kind: Kind): Insert => ({
  type: Type.insert,
  kind,
});

export const update = (id: number[], value: Parametric['value']): Update => ({
  type: Type.update,
  id,
  value,
});
