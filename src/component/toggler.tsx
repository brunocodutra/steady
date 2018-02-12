import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Interactive from 'component/interactive';

type Props = {
  readonly toggle: () => void,
};

export default class extends React.PureComponent<Props> {
  private toggler = document.getElementById('toggler');

  public render() {
    /* istanbul ignore next */
    if (!this.toggler) {
      throw new Error('placeholder not found');
    }

    return ReactDOM.createPortal(
      <Interactive action={this.props.toggle} className='toggler'/>,
      this.toggler,
    );
  }
}
