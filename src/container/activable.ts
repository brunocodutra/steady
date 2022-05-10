import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Action, activate } from 'action';
import { State } from 'state';
import { Props as PropsBase } from 'component/element';
import { Removable } from 'container/removable';
import { Terminal } from 'lib/element';
import { equal } from 'lib/util';

export type Activable = Removable | Terminal;

export interface Props<E extends Activable> extends PropsBase<E> {
  readonly active: boolean,
  readonly activate: () => void,
}

const mapState = <E extends Activable>({ active }: State, props: PropsBase<E>) => ({
  active: equal(props.id, active),
});

const mapDispatch = <E extends Activable>(dispatch: Dispatch<Action>, props: PropsBase<E>) => ({
  activate: () => {
    dispatch(activate(props.id));
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default <E extends Activable>(component: ComponentType<Props<E>>) => (
  connect(mapState, mapDispatch)(component)
);
