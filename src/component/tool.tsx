import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionFactory, Actions} from 'action';
import {ElementFactory, Elements} from 'lib/element';

type PropsBase = {
  readonly kind: Elements,
};

type Props = PropsBase & {
  readonly insert: () => void,
};

const mapDispatch = (dispatch: Dispatch<any>, props: PropsBase) => ({
  insert: () => {
    dispatch(ActionFactory[Actions.insert](ElementFactory[props.kind]()));
  },
});

export default connect(null, mapDispatch)(
  ({kind, insert}: Props) => (
    <span
      className={classes('tool', Elements[kind])}
      onClick={insert}
      onKeyDown={({key}) => (key === ' ' || key === 'Enter') && insert()}
      tabIndex={0}
    />
  ),
);
