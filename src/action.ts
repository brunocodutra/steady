import {Kind} from 'lib/element';

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
  readonly kind: Kind,
};

export type Action = Toggle | Activate | Insert;

export const toggle = (): Toggle => ({
  type: Type.toggle,
});

export const activate = (id: number[]): Activate => ({
  type: Type.activate,
  id,
});

export const insert = (kind: Kind): Insert => ({
  type: Type.insert,
  kind,
});
