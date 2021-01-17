import classes from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Interactive from 'component/interactive';
import { Action, insert, Insertable } from 'action';

interface PropsBase {
  readonly kind: Insertable,
  readonly children?: React.ReactNode,
}

interface Props extends PropsBase {
  readonly insert: () => void,
}

const mapDispatch = (dispatch: Dispatch<Action>, props: PropsBase) => ({
  insert: () => {
    dispatch(insert(props.kind));
  },
});

export default connect(null, mapDispatch)(
  ({ kind, insert, children }: Props) => (
    <Interactive action={insert} className={classes('tool', kind)}>
      {children}
    </Interactive>
  ),
);
