import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action, remove } from 'action';
import activable, { Props as PropsBase } from 'container/activable';
import { Removable } from 'lib/element';

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
