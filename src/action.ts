import { State } from 'state';
import { Kind, Parametric } from 'lib/element';

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
};

interface Activate {
  readonly type: Type.activate,
  readonly id: number[],
};

interface Remove {
  readonly type: Type.remove,
  readonly id: number[],
};

interface Insert {
  readonly type: Type.insert,
  readonly kind: Kind,
};

interface Update {
  readonly type: Type.update,
  readonly id: number[],
  readonly value: Parametric['value'],
};

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

export const insert = (kind: Kind): Insert => ({
  type: Type.insert,
  kind,
});

export const update = (id: number[], value: Parametric['value']): Update => ({
  type: Type.update,
  id,
  value,
});
