import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import Interactive from 'component/interactive';

import * as Action from 'action';
import {State} from 'reducer';

type Props = {
  readonly toggle: () => void,
};

const mapDispatch = (dispatch: Dispatch<State>): Props => ({
  toggle: () => {
    dispatch(Action.toggle());
  },
});

export default connect(null, mapDispatch)(
  ({toggle}: Props) => <Interactive action={toggle} className='toggler'/>,
);
