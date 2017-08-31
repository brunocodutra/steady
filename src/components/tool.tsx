import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionFactory, Actions} from 'action';
import {ModelFactory, Models} from 'model';

type PropsBase = {
  readonly kind: Models,
};

type Props = PropsBase & {
  readonly insert: () => void,
};

const mapDispatch = (dispatch: Dispatch<any>, props: PropsBase) => ({
  insert: () => {
    dispatch(ActionFactory[Actions.insert](ModelFactory[props.kind]()));
  },
});

export default connect(null, mapDispatch)(
  ({kind, insert}: Props) => (
    <span
      className={classes('tool', Models[kind])}
      onClick={insert}
      onKeyDown={({key}) => (key === ' ' || key === 'Enter') && insert()}
      tabIndex={0}
    />
  ),
);
