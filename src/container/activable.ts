import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';
import {State} from 'state';

import {Props as PropsBase} from 'component/element';

import {equal} from 'lib/array';
import {Activable} from 'lib/element';

export type Props<E extends Activable> = PropsBase<E> & {
  readonly active: boolean,
  readonly activate: () => void,
};

const mapState = ({active}: State, props: PropsBase) => ({
  active: equal(props.id, active),
});

const mapDispatch = (dispatch: Dispatch<Actions.Action>, props: PropsBase) => ({
  activate: () => {
    dispatch(Actions.activate(props.id));
  },
});

export default <E extends Activable>(component: React.ComponentType<Props<E>>) => (
  connect(mapState, mapDispatch)(component)
);
