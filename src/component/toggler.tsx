import React from 'react';
import ReactDOM from 'react-dom';

import Interactive from 'component/interactive';

import { unwrap } from 'lib/util';

type Props = {
  readonly toggle: () => void,
};

export default class extends React.PureComponent<Props> {
  private toggler = unwrap(document.getElementById('toggler'), '#toggler not found');

  public render() {
    return ReactDOM.createPortal(
      <Interactive action={this.props.toggle} className='toggler' />,
      this.toggler,
    );
  }
}
