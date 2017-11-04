import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionFactory, Actions} from 'action';

type Props = {
  readonly toggle: () => void,
};

const mapDispatch = (dispatch: Dispatch<any>): Props => ({
  toggle: () => {
    dispatch(ActionFactory[Actions.toggle]());
  },
});

export default connect(null, mapDispatch)(
  ({toggle}: Props) => (
    <button
      className='navbar-toggler p-1 ml-3'
      type='button'
      onMouseDown={() => toggle()}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && toggle()}
    >
      <span className='navbar-toggler-icon'></span>
    </button>
  ),
);
