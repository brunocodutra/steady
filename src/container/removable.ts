import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as Actions from 'action';

import activable, { Props as PropsBase } from 'container/activable';

import { Removable } from 'lib/element';

export type Props<E extends Removable> = PropsBase<E> & {
  readonly remove: () => void,
};

const mapDispatch = <E extends Removable>(dispatch: Dispatch<Actions.Action>, props: PropsBase<E>) => ({
  remove: () => {
    dispatch(Actions.remove(props.id));
  },
});

export default <E extends Removable>(component: React.ComponentType<Props<E>>) => (
  activable<E>(connect(null, mapDispatch)(component))
);
