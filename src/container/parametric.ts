import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Actions from 'action';
import removable, { Props as PropsBase } from 'container/removable';
import { Parametric } from 'lib/element';

export interface Props<E extends Parametric> extends PropsBase<E> {
  readonly update: (value: Parametric['value']) => void,
};

const mapDispatch = <E extends Parametric>(dispatch: Dispatch<Actions.Action>, props: PropsBase<E>) => ({
  update: (value: Parametric['value']) => {
    dispatch(Actions.update(props.id, value));
  },
});

export default <E extends Parametric>(component: React.ComponentType<Props<E>>) => (
  removable<E>(connect(null, mapDispatch)(component))
);
