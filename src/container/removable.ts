import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';

import activable, {Props as PropsBase} from 'container/activable';

export type Props = PropsBase & {
  readonly remove: () => void,
};

const mapDispatch = (dispatch: Dispatch<Actions.Action>, props: PropsBase) => ({
  remove: () => {
    dispatch(Actions.remove(props.id));
  },
});

export default <P extends Props>(component: React.ComponentType<P>) => activable(connect(null, mapDispatch)(component));
