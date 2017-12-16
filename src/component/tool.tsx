import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionFactory, Type} from 'action';
import {Factory as ElementFactory, Kind} from 'lib/element';

type PropsBase = {
  readonly kind: Kind,
};

type Props = PropsBase & {
  readonly insert: () => void,
};

const mapDispatch = (dispatch: Dispatch<any>, props: PropsBase) => ({
  insert: () => {
    dispatch(ActionFactory[Type.insert](ElementFactory[props.kind]()));
  },
});

export default connect(null, mapDispatch)(
  ({kind, insert}: Props) => (
    <span
      className={classes('tool', Kind[kind])}
      onClick={insert}
      onKeyDown={({key}) => (key === ' ' || key === 'Enter') && insert()}
      tabIndex={0}
    />
  ),
);
