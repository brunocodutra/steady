import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Kind} from 'lib/element';

import * as Action from 'action';
import {State} from 'reducer';

type PropsBase = {
  readonly kind: Kind,
  readonly children?: React.ReactNode,
};

type Props = PropsBase & {
  readonly insert: () => void,
};

const mapDispatch = (dispatch: Dispatch<State>, props: PropsBase) => ({
  insert: () => {
    dispatch(Action.insert(props.kind));
  },
});

export default connect(null, mapDispatch)(
  ({kind, insert, children}: Props) => (
    <span
      className={classes('tool', kind)}
      onClick={insert}
      onKeyDown={({key}) => (key === ' ' || key === 'Enter') && insert()}
      tabIndex={0}
    >
    {children}
    </span>
  ),

);
