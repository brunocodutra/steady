import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

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
  ({toggle}: Props) => (
    <button
      type='button'
      className='toggler'
      onMouseDown={() => toggle()}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && toggle()}
    />
  ),
);
