import { State } from 'state';
import { Kind, Value } from 'lib/element';

export type Insertable = Exclude<Kind, Kind.terminal | Kind.ground | Kind.series>;

export const enum Type {
  hydrate = 'hydrate',
  activate = 'activate',
  remove = 'remove',
  insert = 'insert',
  update = 'update',
}

interface Hydrate {
  readonly type: Type.hydrate,
  readonly state: State,
}

interface Activate {
  readonly type: Type.activate,
  readonly id: number[],
}

interface Remove {
  readonly type: Type.remove,
  readonly id: number[],
}

interface Insert {
  readonly type: Type.insert,
  readonly kind: Insertable,
}

interface Update {
  readonly type: Type.update,
  readonly id: number[],
  readonly value: Value,
}

export type Action = Hydrate | Activate | Remove | Insert | Update;

export const hydrate = (state: State): Hydrate => ({
  type: Type.hydrate,
  state,
});

export const activate = (id: number[]): Activate => ({
  type: Type.activate,
  id,
});

export const remove = (id: number[]): Remove => ({
  type: Type.remove,
  id,
});

export const insert = (kind: Insertable): Insert => ({
  type: Type.insert,
  kind,
});

export const update = (id: number[], value: Value): Update => ({
  type: Type.update,
  id,
  value,
});
