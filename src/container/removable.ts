import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Action, remove } from 'action';
import activable, { Props as PropsBase } from 'container/activable';
import { Parametric } from 'container/parametric';
import { Shunt } from 'lib/element';

export type Removable = Parametric | Shunt;

export interface Props<E extends Removable> extends PropsBase<E> {
  readonly remove: () => void,
}

const mapDispatch = <E extends Removable>(dispatch: Dispatch<Action>, props: PropsBase<E>) => ({
  remove: () => {
    dispatch(remove(props.id));
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default <E extends Removable>(component: ComponentType<Props<E>>) => (
  activable<E>(connect(null, mapDispatch)(component))
);
