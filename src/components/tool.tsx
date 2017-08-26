import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {insert} from 'action';
import {ModelFactory, Models} from 'model';

type PropsBase = {
  readonly kind: Models,
};

type Props = PropsBase & {
  readonly insert: () => void,
};

const mapDispatch = (dispatch: Dispatch<any>, props: PropsBase) => ({
  insert: () => {
    dispatch(insert(ModelFactory[props.kind]()));
  },
});

export default connect(null, mapDispatch)(
  class extends React.Component< Props, {} > {
    public render() {
      return (
        <span className={'tool'} onClick={this.props.insert}>
          <span className={Models[this.props.kind]}/>
        </span>
      );
    }
  },
);
