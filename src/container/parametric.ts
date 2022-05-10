import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Action, update } from 'action';
import removable, { Props as PropsBase } from 'container/removable';
import { ParametricElement, Value } from 'lib/element';

export type Parametric = ParametricElement;

export interface Props<E extends Parametric> extends PropsBase<E> {
  readonly update: (value: Value) => void,
}

const mapDispatch = <E extends Parametric>(dispatch: Dispatch<Action>, props: PropsBase<E>) => ({
  update: (value: Value) => {
    dispatch(update(props.id, value));
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default <E extends Parametric>(component: ComponentType<Props<E>>) => (
  removable<E>(connect(null, mapDispatch)(component))
);
