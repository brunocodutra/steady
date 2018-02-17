import {Kind, Parametric} from 'lib/element';

export const enum Type {
  activate = 'activate',
  remove = 'remove',
  insert = 'insert',
  update = 'update',
  _ = '_', // FIXME with Redux 4.0.0
}

type Activate = {
  readonly type: Type.activate,
  readonly id: number[],
};

type Remove = {
  readonly type: Type.remove,
  readonly id: number[],
};

type Insert = {
  readonly type: Type.insert,
  readonly kind: Kind,
};

type Update = {
  readonly type: Type.update,
  readonly id: number[],
  readonly value: Parametric['value'],
};

export type Action = Activate | Remove | Insert | Update | {readonly type: Type._};

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
