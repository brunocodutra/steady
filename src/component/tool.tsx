import classes from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Kind } from 'lib/element';
import Interactive from 'component/interactive';
import * as Actions from 'action';

interface PropsBase {
  readonly kind: Kind,
  readonly children?: React.ReactNode,
};

interface Props extends PropsBase {
  readonly insert: () => void,
};

const mapDispatch = (dispatch: Dispatch<Actions.Action>, props: PropsBase) => ({
  insert: () => {
    dispatch(Actions.insert(props.kind));
  },
});

export default connect(null, mapDispatch)(
  ({ kind, insert, children }: Props) => (
    <Interactive action={insert} className={classes('tool', kind)}>
      {children}
    </Interactive>
  ),
);
