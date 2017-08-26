import * as React from 'react';

import {Models} from 'model';

type Props = {
  readonly kind: Models,
};

export default class extends React.Component< Props, {} > {
  public render() {
    return (
      <span className={'tool'}>
        <span className={Models[this.props.kind]}/>
      </span>
    );
  }
}
